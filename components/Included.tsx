import { FileCheck2, Palette, ShieldCheck, Sticker } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";

const items = [
  {
    title: "Самоклеящийся ПВХ-пластик",
    text: "Прочная карта, которая клеится на стол или стойку и не мнётся.",
    icon: Sticker,
  },
  {
    title: "Настройка и гарантия",
    text: "Пропишем вашу ссылку 2GIS. Если будет брак - бесплатно заменим.",
    icon: ShieldCheck,
  },
  {
    title: "Документы для бизнеса",
    text: "Работаем по договору, даём закрывающие документы для бухгалтерии.",
    icon: FileCheck2,
  },
  {
    title: "Уникальный дизайн под бренд",
    text: "Оформим карту в стиле вашего заведения. Дизайн бесплатный при любом заказе.",
    icon: Palette,
    badge: "бесплатно",
  },
];

export function Included() {
  return (
    <section className="dark-section section-shell included-section section-glow">
      <div className="glow-orb glow-orb-left" aria-hidden="true" />
      <div className="site-container">
        <Reveal className="section-heading section-heading-wide">
          <Eyebrow>ЧТО ВХОДИТ</Eyebrow>
          <h2 className="section-title">Всё для запуска с первого дня</h2>
          <p className="section-subtitle">
            Карта, настройка, дизайн и документы. Можно сразу ставить на стол.
          </p>
        </Reveal>
        <Stagger className="included-grid">
          {items.map(({ title, text, icon: Icon, badge }) => (
            <StaggerItem className="glass-card included-card" key={title}>
              <span className="icon-tile" aria-hidden="true">
                <Icon size={25} strokeWidth={1.8} />
              </span>
              <h3>
                {title}
                {badge && <span className="lime-badge">{badge}</span>}
              </h3>
              <p>{text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
