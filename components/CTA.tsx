import { LeadButton } from "@/components/LeadButton";
import { Magnetic } from "@/components/Magnetic";
import { Reveal } from "@/components/Motion";

function CtaArcs() {
  return (
    <div className="cta-arcs" aria-hidden="true">
      <svg viewBox="0 0 700 700">
        <circle cx="350" cy="350" r="120" />
        <circle cx="350" cy="350" r="190" />
        <circle cx="350" cy="350" r="260" />
        <circle cx="350" cy="350" r="330" />
        <circle className="arc-accent" cx="350" cy="350" r="190" />
      </svg>
    </div>
  );
}

export function CTA() {
  return (
    <section className="dark-section cta-section">
      <CtaArcs />
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
