import { Eyebrow } from "@/components/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";

const objections = [
  {
    title: "«Дорого»",
    text: "Это разовая покупка, не подписка. Окупается с первых пары гостей, которых приведут отзывы. Возьмите одну на пробу.",
  },
  {
    title: "«Уже есть отзывы»",
    text: "Отлично, база есть. Но отзывы должны появляться регулярно. 2GIS выше ставит тех, у кого они свежее. Карта помогает держаться наверху.",
  },
  {
    title: "«Сейчас не до этого»",
    text: "Без проблем. Оставим карту и номер. Протестируете, когда будет минута. Ничего не теряете.",
  },
];

export function Objections() {
  return (
    <section className="dark-section section-shell objections-section section-glow">
      <div className="glow-orb glow-orb-right" aria-hidden="true" />
      <div className="site-container">
        <Reveal className="section-heading">
          <Eyebrow>ЧАСТЫЕ СОМНЕНИЯ</Eyebrow>
          <h2 className="section-title">Отвечаем на частые вопросы</h2>
        </Reveal>
        <Stagger className="three-card-grid">
          {objections.map((objection) => (
            <StaggerItem className="glass-card objection-card" key={objection.title}>
              <h3>{objection.title}</h3>
              <p>{objection.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
