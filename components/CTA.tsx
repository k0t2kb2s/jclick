import { SignalArcs } from "@/components/Arcs";
import { LeadButton } from "@/components/LeadButton";
import { Magnetic } from "@/components/Magnetic";
import { Reveal } from "@/components/Motion";

export function CTA() {
  return (
    <section className="dark-section cta-section">
      <SignalArcs className="cta-arcs" />
      <div className="site-container cta-inner">
        <Reveal>
          <h2 className="cta-title">Начните собирать новые отзывы уже сегодня.</h2>
          <p className="cta-text">
            Оставьте заявку, и мы оперативно подготовим карты для вашего
            бизнеса.
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
