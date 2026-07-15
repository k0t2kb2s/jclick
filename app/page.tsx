import { Comparison } from "@/components/Comparison";
import { CTA } from "@/components/CTA";
import { Demo } from "@/components/Demo";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Included } from "@/components/Included";
import { Objections } from "@/components/Objections";
import { Pricing } from "@/components/Pricing";
import { Problem } from "@/components/Problem";
import { Stat } from "@/components/Stat";
import { Ticker } from "@/components/Ticker";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://j-click.app/#organization",
      name: "jclick",
      url: "https://j-click.app",
      sameAs: [
        "https://instagram.com/jcl1ck",
        "https://justcl1ck.t.me",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+7-706-701-01-25",
        contactType: "sales",
        availableLanguage: ["Russian"],
      },
    },
    {
      "@type": "Product",
      name: "NFC-карта jclick для отзывов на 2GIS",
      description:
        "NFC-карта для сбора отзывов в 2GIS: открывает профиль заведения одним касанием телефона. Без приложений и подписки.",
      brand: { "@type": "Brand", name: "jclick" },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "KZT",
        lowPrice: "2600",
        highPrice: "3000",
        offerCount: "3",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Это дорого?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Это разовая покупка, которая окупается с первых клиентов, пришедших благодаря свежим отзывам. Можно начать с минимального объёма - от 1 карты.",
          },
        },
        {
          "@type": "Question",
          name: "У нас уже хорошая база отзывов - зачем карта?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Алгоритмы 2GIS продвигают карточки, где отзывы обновляются регулярно. Карта помогает поддерживать активность и удерживать позиции в топе.",
          },
        },
        {
          "@type": "Question",
          name: "Сейчас нет времени - что делать?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Внедрение не требует усилий с вашей стороны. Мы полностью берём на себя техническую настройку - вам нужно только разместить готовые карты в заведении.",
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Problem />
        <HowItWorks />
        <Demo />
        <Comparison />
        <Stat />
        <Included />
        <Pricing />
        <Objections />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
