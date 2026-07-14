import { Eyebrow } from "@/components/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";

const steps = [
  {
    number: "01",
    title: "Гость подносит телефон",
    text: "Карта на столе рядом с табличкой «оставьте отзыв». Тап - и всё.",
  },
  {
    number: "02",
    title: "Открывается ваша страница",
    text: "Сразу 2GIS, Google или что настроите: WiFi, меню, соцсети.",
  },
  {
    number: "03",
    title: "Отзыв за 30 секунд",
    text: "Человек пишет прямо у вас, пока сидит. Дома он не вспоминает.",
  },
];

export function HowItWorks() {
  return (
    <section className="dark-section section-shell how-section">
      <div className="site-container">
        <Reveal className="section-heading">
          <Eyebrow>КАК ЭТО РАБОТАЕТ</Eyebrow>
          <h2 className="section-title">От касания до отзыва за 30 секунд</h2>
        </Reveal>
        <Stagger className="steps-list">
          {steps.map((step) => (
            <StaggerItem className="step-row" key={step.number}>
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
