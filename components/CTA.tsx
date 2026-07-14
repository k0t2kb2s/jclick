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
          <h2 className="cta-title">Попробуйте карту на своих гостях.</h2>
          <p className="cta-text">
            Оставим карту на пару дней. Понравится - соберём комплект. Ничего не
            теряете.
          </p>
          <LeadButton arrow />
        </Reveal>
      </div>
    </section>
  );
}
