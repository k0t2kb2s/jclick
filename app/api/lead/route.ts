export const runtime = "nodejs";

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

export async function POST(request: Request) {
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
  const quantity = clean(payload.quantity, 40);

  if (name.length < 2 || phone.length < 5) {
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
    `Количество карт: ${quantity || "не указано"}`,
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
