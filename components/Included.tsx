import { FileCheck2, ShieldCheck, Sticker } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { SectionMarker } from "@/components/SectionMarker";

function CardPreview() {
  return (
    <span className="bento-visual" aria-hidden="true">
      <span className="bento-visual-wordmark">jclick</span>
      <svg viewBox="0 0 42 42" fill="none">
        <path d="M12 16c3 2.7 3 7.3 0 10" />
        <path d="M18 10c6.8 5.9 6.8 16.1 0 22" />
        <path d="M24 5c10 8.6 10 23.4 0 32" />
      </svg>
      <span className="bento-visual-hint">ВАШ ЛОГОТИП · ВАШИ ЦВЕТА</span>
    </span>
  );
}

export function Included() {
  return (
    <section className="dark-section dark-section-elev section-shell">
      <div className="site-container">
        <SectionMarker index="06" label="ЧТО ВХОДИТ" />
        <Reveal className="section-heading section-heading-wide">
          <h2 className="section-title">Что входит в услугу</h2>
          <p className="section-subtitle">
            Карта, дизайн, настройка и документы. Можно сразу ставить на стол.
          </p>
        </Reveal>
        <Stagger className="bento-grid">
          <StaggerItem className="bento-card bento-card-design" glow>
            <CardPreview />
            <div>
              <h3>
                Индивидуальный дизайн под бренд
                <span className="lime-badge">бесплатно</span>
              </h3>
              <p>
                Оформим карту в фирменном стиле вашего бренда. Бесплатно при
                любом заказе.
              </p>
            </div>
          </StaggerItem>
          <StaggerItem className="bento-card" glow>
            <span className="bento-icon" aria-hidden="true">
              <Sticker size={22} strokeWidth={1.8} />
            </span>
            <h3>ПВХ-пластик на самоклеящейся основе</h3>
            <p>
              Прочная карта, которая клеится на стол или стойку и не
              изнашивается.
            </p>
          </StaggerItem>
          <StaggerItem className="bento-card" glow>
            <span className="bento-icon" aria-hidden="true">
              <ShieldCheck size={22} strokeWidth={1.8} />
            </span>
            <h3>Техническая настройка и гарантия</h3>
            <p>
              Сами запрограммируем нужные ссылки. Брак подлежит бесплатной
              замене.
            </p>
          </StaggerItem>
          <StaggerItem className="bento-card bento-card-wide" glow>
            <span className="bento-icon" aria-hidden="true">
              <FileCheck2 size={22} strokeWidth={1.8} />
            </span>
            <div>
              <h3>Работа по договору</h3>
              <p>
                Полный пакет закрывающих документов для бухгалтерии при любом
                заказе.
              </p>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
