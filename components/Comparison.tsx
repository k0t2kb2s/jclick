import { Check, X } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { SectionMarker } from "@/components/SectionMarker";

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
    <section className="dark-section shell-tight">
      <div className="site-container">
        <SectionMarker index="04" label="JCLICK VS QR" />
        <Reveal className="section-heading">
          <h2 className="section-title">Почему jclick проще QR-кода</h2>
        </Reveal>
        <Reveal>
          <div className="vs-panel">
            <div className="vs-side vs-side-qr">
              <h3>QR-код</h3>
              <ul className="vs-list">
                {qrItems.map((item) => (
                  <li key={item}>
                    <span className="vs-x" aria-hidden="true">
                      <X size={16} strokeWidth={2.2} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="vs-side vs-side-jclick">
              <h3>jclick</h3>
              <ul className="vs-list">
                {jclickItems.map((item) => (
                  <li key={item}>
                    <span className="vs-check" aria-hidden="true">
                      <Check size={16} strokeWidth={2.4} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <span className="vs-badge" aria-hidden="true">
              vs
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
