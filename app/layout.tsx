import type { Metadata, Viewport } from "next";
import { LenisProvider } from "@/components/LenisProvider";
import { LeadModalProvider } from "@/components/LeadModal";
import { ScrollProgress } from "@/components/ScrollProgress";
import "@fontsource-variable/inter/wght.css";
import "@fontsource/jetbrains-mono/index.css";
import "./globals.css";

const description =
  "NFC-карты, которые превращают каждого гостя в свежий отзыв на 2GIS. Без приложений. Быстрее QR.";

export const metadata: Metadata = {
  title: "jclick — NFC-карты для отзывов на 2GIS",
  description,
  openGraph: {
    title: "jclick — NFC-карты для отзывов на 2GIS",
    description,
    locale: "ru_RU",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0E0C",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <LenisProvider>
          <LeadModalProvider>
            <ScrollProgress />
            {children}
          </LeadModalProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
