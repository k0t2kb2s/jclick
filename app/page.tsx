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

export default function Home() {
  return (
    <>
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
