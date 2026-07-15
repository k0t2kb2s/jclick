import { Fragment } from "react";
import { SignalArcs } from "@/components/Arcs";
import { Eyebrow } from "@/components/Eyebrow";
import { HeroCard } from "@/components/HeroCard";
import { LeadButton } from "@/components/LeadButton";
import { Magnetic } from "@/components/Magnetic";

const headline = "Касание смартфона - и отзыв готов.";

/* Вход героя сделан на CSS-анимациях: контент виден сразу после первой
   отрисовки, не дожидаясь гидрации JS-бандла. */
export function Hero() {
  const words = headline.split(" ");

  return (
    <section id="top" className="hero dark-section">
      <SignalArcs className="hero-arcs" />
      <div className="site-container">
        <div className="hero-fade-up">
          <Eyebrow>NFC-КАРТЫ · ОТЗЫВЫ · 2GIS</Eyebrow>
        </div>
        <h1 className="hero-title" aria-label={headline}>
          {words.map((word, index) => (
            <Fragment key={index}>
              <span className="hero-word-clip" aria-hidden="true">
                <span
                  className={`hero-word ${
                    index === words.length - 1 ? "hero-title-accent" : ""
                  }`}
                  style={{
                    animationDelay: `${(0.12 + index * 0.08).toFixed(2)}s`,
                  }}
                >
                  {word}
                </span>
              </span>
              {index < words.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </h1>
        <div className="hero-row">
          <div className="hero-copy">
            <p className="hero-subtitle hero-fade-up hero-delay-copy">
              NFC-карты для сбора отзывов в 2GIS. Работают без установки
              приложений. Быстрее и удобнее QR-кодов.
            </p>
            <div className="hero-fade-up hero-delay-actions">
              <div className="hero-actions">
                <Magnetic>
                  <LeadButton arrow />
                </Magnetic>
                <Magnetic>
                  <a className="ghost-button" href="#pricing">
                    Смотреть цены
                  </a>
                </Magnetic>
              </div>
              <p className="hero-trust">
                Без подписки · Настройка за 30 секунд · Гарантия замены
              </p>
            </div>
          </div>
          <div className="hero-card-column hero-card-enter">
            <HeroCard />
          </div>
        </div>
      </div>
    </section>
  );
}
