import { LeadButton } from "@/components/LeadButton";
import { Reveal } from "@/components/Motion";

export function CTA() {
  return (
    <section className="dark-section cta-section">
      <div className="site-container cta-inner">
        <Reveal>
          <h2 className="cta-title">Попробуйте карту на своих гостях.</h2>
          <p className="cta-text">
            Оставим карту на пару дней. Понравится — соберём комплект. Ничего
            не теряете.
          </p>
          <LeadButton arrow />
          <p className="cta-trust">
            Разовая покупка · Работаем по договору · Гарантия замены
          </p>
        </Reveal>
      </div>
    </section>
  );
}
