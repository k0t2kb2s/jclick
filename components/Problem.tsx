import { Clock3, ScanLine, TrendingDown } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";

const problems = [
  {
    title: "Дома не вспоминает",
    text: "Гость думает: «оставлю потом», а дома уже забывает.",
    icon: Clock3,
  },
  {
    title: "QR - это лишние действия",
    text: "Достать камеру, навести, подождать. Половина бросает.",
    icon: ScanLine,
  },
  {
    title: "2GIS это видит",
    text: "Мало свежих отзывов → ниже в поиске → меньше гостей.",
    icon: TrendingDown,
  },
];

export function Problem() {
  return (
    <section className="dark-section section-shell section-glow">
      <div className="glow-orb glow-orb-left" aria-hidden="true" />
      <div className="site-container">
        <Reveal className="section-heading section-heading-wide">
          <Eyebrow>ПРОБЛЕМА</Eyebrow>
          <h2 className="section-title">
            Гость доволен, но отзыв так и не появляется.
          </h2>
        </Reveal>
        <Stagger className="three-card-grid">
          {problems.map(({ title, text, icon: Icon }) => (
            <StaggerItem className="glass-card problem-card" key={title}>
              <span className="icon-tile" aria-hidden="true">
                <Icon size={24} strokeWidth={1.8} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
