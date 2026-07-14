import { Eyebrow } from "@/components/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";

const qrItems = [
  "Достать и открыть камеру",
  "Навести, поймать фокус",
  "Часть гостей бросает на полпути",
  "Выцветает, мнётся, теряется",
];

const jclickItems = [
  "Просто приложить телефон",
  "Без приложений и камеры",
  "Открывается за долю секунды",
  "Солидно выглядит на столе",
];

export function Comparison() {
  return (
    <section className="dark-section section-shell comparison-section section-glow">
      <div className="glow-orb glow-orb-right" aria-hidden="true" />
      <div className="site-container">
        <Reveal className="section-heading">
          <Eyebrow>СРАВНЕНИЕ</Eyebrow>
          <h2 className="section-title">Карта jclick против QR-кода</h2>
        </Reveal>
        <Stagger className="comparison-grid">
          <StaggerItem className="comparison-card comparison-card-qr">
            <h3>QR-код</h3>
            <ul>
              {qrItems.map((item) => (
                <li key={item}>
                  <span className="comparison-x" aria-hidden="true">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </StaggerItem>
          <StaggerItem className="comparison-card comparison-card-jclick">
            <h3>jclick</h3>
            <ul>
              {jclickItems.map((item) => (
                <li key={item}>
                  <span className="comparison-check" aria-hidden="true">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
