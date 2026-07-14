import { LeadButton } from "@/components/LeadButton";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Motion";

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
          <LeadButton arrow />
        </Reveal>
      </div>
    </section>
  );
}
