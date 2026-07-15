import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "jclick - NFC-карты для отзывов на 2GIS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const lime = "#B5F23C";
const bg = "#0A0E0C";

async function loadFont(file: string) {
  return readFile(join(process.cwd(), "assets", "og", file));
}

export default async function OpengraphImage() {
  const [interLatin, interCyrillic, monoLatin, monoCyrillic] =
    await Promise.all([
      loadFont("inter-latin-700.woff"),
      loadFont("inter-cyrillic-700.woff"),
      loadFont("jbmono-latin-700.woff"),
      loadFont("jbmono-cyrillic-700.woff"),
    ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: bg,
          color: "#F4F6F3",
          fontFamily: "Inter",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: 620,
            background:
              "radial-gradient(circle, rgba(181, 242, 60, 0.16), rgba(181, 242, 60, 0) 65%)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                background: lime,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: bg,
                fontSize: 40,
              }}
            >
              j
            </div>
            <div style={{ fontSize: 44, letterSpacing: -2 }}>jclick</div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}
          >
            <div
              style={{
                fontFamily: "JetBrains Mono",
                fontSize: 22,
                letterSpacing: 5,
                color: lime,
                marginBottom: 26,
              }}
            >
              NFC-КАРТЫ · ОТЗЫВЫ · 2GIS
            </div>
            <div
              style={{
                fontSize: 84,
                lineHeight: 1.02,
                letterSpacing: -4,
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              Касание смартфона -&nbsp;
              <span style={{ color: lime }}>и отзыв готов.</span>
            </div>
          </div>
          <div
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: 20,
              letterSpacing: 1,
              color: "#8E9A93",
            }}
          >
            Без подписки · Настройка за 30 секунд · j-click.app
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: 72,
            top: 210,
            width: 330,
            height: 208,
            borderRadius: 26,
            border: `1px solid rgba(216, 249, 140, 0.35)`,
            background:
              "linear-gradient(150deg, #1A221C 0%, #10150F 48%, #0A0E0C 100%)",
            boxShadow: "0 40px 90px rgba(0, 0, 0, 0.55)",
            display: "flex",
            padding: 26,
          }}
        >
          <div
            style={{
              fontSize: 34,
              letterSpacing: -1.5,
              display: "flex",
            }}
          >
            jclick
          </div>
          <div
            style={{
              position: "absolute",
              right: 24,
              top: 22,
              fontSize: 30,
              color: lime,
              display: "flex",
            }}
          >
            )))
          </div>
          <div
            style={{
              position: "absolute",
              left: 26,
              bottom: 22,
              width: 44,
              height: 32,
              borderRadius: 8,
              border: "1px solid rgba(216, 249, 140, 0.5)",
              display: "flex",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interLatin, weight: 700, style: "normal" },
        { name: "Inter", data: interCyrillic, weight: 700, style: "normal" },
        { name: "JetBrains Mono", data: monoLatin, weight: 700, style: "normal" },
        {
          name: "JetBrains Mono",
          data: monoCyrillic,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
