export const runtime = "nodejs";

const RATE_LIMIT_WINDOW = 30 * 1000;
const quantities = new Set(["1-9 карт", "10-49 карт", "50+ карт"]);

type RateLimitEntry = {
  resetAt: number;
};

const globalRateLimit = globalThis as typeof globalThis & {
  jclickLeadRateLimit?: Map<string, RateLimitEntry>;
};

const leadRateLimit =
  globalRateLimit.jclickLeadRateLimit ?? new Map<string, RateLimitEntry>();
globalRateLimit.jclickLeadRateLimit = leadRateLimit;

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  venue?: unknown;
  quantity?: unknown;
  company?: unknown;
};

function clean(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    ""
  );
}

function isRateLimited(ip: string) {
  if (!ip) return false;
  const now = Date.now();

  if (leadRateLimit.size > 500) {
    for (const [key, entry] of leadRateLimit) {
      if (entry.resetAt <= now) leadRateLimit.delete(key);
    }
  }

  const current = leadRateLimit.get(ip);
  if (!current || current.resetAt <= now) {
    leadRateLimit.set(ip, { resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  return true;
}

export async function POST(request: Request) {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return Response.json({ ok: false }, { status: 403 });
  }

  if (isRateLimited(getClientIp(request))) {
    return Response.json(
      { ok: false, error: "Подождите 30 секунд перед следующей заявкой." },
      {
        status: 429,
        headers: {
          "Retry-After": "30",
        },
      },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 10_000) {
    return Response.json({ ok: false }, { status: 413 });
  }

  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const honeypot = clean(payload.company, 120);
  if (honeypot) return Response.json({ ok: true });

  const name = clean(payload.name, 80);
  const phone = clean(payload.phone, 40);
  const venue = clean(payload.venue, 120);
  const requestedQuantity = clean(payload.quantity, 40);
  const quantity = quantities.has(requestedQuantity)
    ? requestedQuantity
    : "не указано";
  const phoneDigits = phone.replace(/\D/g, "");

  if (name.length < 2 || phoneDigits.length < 7) {
    return Response.json({ ok: false }, { status: 422 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return Response.json({ ok: false }, { status: 503 });
  }

  const message = [
    "🟢 Новая заявка с jclick",
    "",
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Заведение: ${venue || "не указано"}`,
    `Количество карт: ${quantity}`,
  ].join("\n");

  try {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          disable_web_page_preview: true,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(8_000),
      },
    );

    if (!telegramResponse.ok) {
      return Response.json({ ok: false }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 502 });
  }
}
