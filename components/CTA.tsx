import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Motion";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function CTA() {
  return (
    <section className="dark-section cta-section section-glow">
      <div className="cta-glow" aria-hidden="true" />
      <div className="site-container cta-inner">
        <Reveal>
          <Logo className="cta-logo" />
          <h2 className="cta-title">Оставим карту на пробу.</h2>
          <p className="cta-text">
            Протестируете на гостях пару дней. Зашло — соберём комплект. Ничего
            не теряете.
          </p>
          <WhatsAppButton arrow />
        </Reveal>
      </div>
    </section>
  );
}
