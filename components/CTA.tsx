import { LeadButton } from "@/components/LeadButton";
import { Magnetic } from "@/components/Magnetic";
import { Reveal } from "@/components/Motion";

export function CTA() {
  return (
    <section className="dark-section cta-section">
      <div className="site-container cta-inner">
        <Reveal>
          <h2 className="cta-title">Протестируйте карту в вашем заведении.</h2>
          <p className="cta-text">
            Оставим образец на пару дней. Если результат вас устроит -
            подготовим полный комплект. Ничего не теряете.
          </p>
          <Magnetic strength={0.28}>
            <LeadButton arrow />
          </Magnetic>
          <p className="cta-trust">
            Разовая покупка · Работаем по договору · Гарантия замены
          </p>
        </Reveal>
      </div>
    </section>
  );
}
