import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { SectionMarker } from "@/components/SectionMarker";

const chain = [
  {
    index: "01",
    title: "Гость доволен",
    text: "Доволен обслуживанием, обещает написать отзыв, но уходит.",
  },
  {
    index: "02",
    title: "Дома - забыл",
    text: "Сканировать QR-код в заведении было неудобно или не было времени, а дома обещание забывается.",
  },
  {
    index: "03",
    title: "Отзывов нет",
    text: "Свежие отзывы перестают появляться.",
  },
  {
    index: "04",
    title: "2GIS понижает",
    text: "Карточка заведения опускается в поиске, поток новых клиентов снижается.",
  },
];

export function Problem() {
  return (
    <section className="dark-section shell-tight">
      <div className="site-container">
        <SectionMarker index="01" label="ПРОБЛЕМА" />
        <Reveal className="section-heading section-heading-wide">
          <h2 className="section-title">
            Почему клиенты редко оставляют отзывы
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
