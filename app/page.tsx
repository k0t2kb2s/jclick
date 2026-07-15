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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://j-click.app/#organization",
      name: "jclick",
      url: "https://j-click.app",
      sameAs: ["https://instagram.com/jcl1ck"],
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
        "NFC-карта, которая открывает страницу отзыва вашего заведения на 2GIS одним касанием телефона. Без приложений и подписки.",
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
            text: "Это разовая покупка, не подписка. Окупается с первых пары гостей, которых приведут отзывы. Можно взять одну карту на пробу.",
          },
        },
        {
          "@type": "Question",
          name: "У нас уже есть отзывы — зачем карта?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Отзывы должны появляться регулярно: 2GIS выше ставит заведения со свежими отзывами. Карта помогает держаться наверху.",
          },
        },
        {
          "@type": "Question",
          name: "Сейчас не до этого — что делать?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Оставим карту и номер. Протестируете, когда будет минута. Ничего не теряете.",
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
