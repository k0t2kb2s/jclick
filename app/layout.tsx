import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { LenisProvider } from "@/components/LenisProvider";
import { LeadModalProvider } from "@/components/LeadModal";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

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
    <html
      lang="ru"
      className={`${inter.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        <LenisProvider>
          <LeadModalProvider>{children}</LeadModalProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
