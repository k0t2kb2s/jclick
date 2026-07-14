import { Reveal, Stagger, StaggerItem } from "@/components/Motion";

const chain = [
  {
    index: "01",
    title: "Гость доволен",
    text: "Говорит «обязательно оставлю отзыв» — и уходит.",
  },
  {
    index: "02",
    title: "Дома — забыл",
    text: "QR так и не отсканировал: камера, фокус, лень.",
  },
  {
    index: "03",
    title: "Отзывов нет",
    text: "Свежие отзывы не появляются неделями.",
  },
  {
    index: "04",
    title: "2GIS понижает",
    text: "Карточка опускается в поиске, новых гостей меньше.",
  },
];

export function Problem() {
  return (
    <section className="dark-section shell-tight">
      <div className="site-container">
        <Reveal className="section-heading section-heading-wide">
          <h2 className="section-title">
            Гость доволен, но отзыв так и не появляется.
          </h2>
        </Reveal>
        <Stagger className="chain-grid">
          {chain.map((node) => (
            <StaggerItem className="chain-node" key={node.index}>
              <span className="chain-index" aria-hidden="true">
                {node.index}
              </span>
              <h3>{node.title}</h3>
              <p>{node.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
