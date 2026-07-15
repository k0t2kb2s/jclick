import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { SectionMarker } from "@/components/SectionMarker";

const steps = [
  {
    number: "01",
    title: "Гость подносит телефон",
    text: "К NFC-карте на столе или стойке. Без приложений и камеры.",
  },
  {
    number: "02",
    title: "Открывается ваш профиль",
    text: "На экране мгновенно открывается профиль заведения в 2GIS, Google или другая заданная ссылка.",
  },
  {
    number: "03",
    title: "Отзыв пишется на месте",
    text: "Клиент оставляет отзыв сразу, пока впечатления от визита ещё свежие.",
  },
];

export function HowItWorks() {
  return (
    <section className="dark-section dark-section-elev section-shell" id="how">
      <div className="site-container">
        <SectionMarker index="02" label="КАК РАБОТАЕТ" />
        <Reveal className="section-heading">
          <h2 className="section-title">Весь процесс занимает не более 30 секунд</h2>
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
