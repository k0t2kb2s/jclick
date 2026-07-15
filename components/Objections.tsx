import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { SectionMarker } from "@/components/SectionMarker";

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
    <section className="dark-section shell-tight" id="faq">
      <div className="site-container">
        <SectionMarker index="08" label="ВОПРОСЫ" />
        <Reveal className="section-heading">
          <h2 className="section-title">Частые сомнения</h2>
        </Reveal>
        <Stagger className="faq-list">
          {objections.map((objection) => (
            <StaggerItem className="faq-row" key={objection.title}>
              <h3>{objection.title}</h3>
              <p>{objection.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
