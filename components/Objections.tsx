import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { SectionMarker } from "@/components/SectionMarker";

const objections = [
  {
    title: "«Это дорого?»",
    text: "Это разовая покупка, которая окупается с первых клиентов, пришедших благодаря свежим отзывам. Для начала можно взять одну карту для теста.",
  },
  {
    title: "«У нас уже хорошая база отзывов»",
    text: "Алгоритмы 2GIS продвигают карточки, где отзывы обновляются регулярно. Карта помогает поддерживать активность и удерживать позиции в топе.",
  },
  {
    title: "«Сейчас нет на это времени»",
    text: "Оставим тестовую карту на несколько дней. Проверите её эффективность в удобное для вас время.",
  },
];

export function Objections() {
  return (
    <section className="dark-section shell-tight" id="faq">
      <div className="site-container">
        <SectionMarker index="08" label="ВОПРОСЫ" />
        <Reveal className="section-heading">
          <h2 className="section-title">Частые вопросы</h2>
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
