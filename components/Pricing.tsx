import { LeadButton } from "@/components/LeadButton";
import { Check } from "lucide-react";
import type { LeadQuantity } from "@/components/LeadModal";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { SectionMarker } from "@/components/SectionMarker";

type Plan = {
  range: LeadQuantity;
  price: string;
  suffix?: string;
  popular?: boolean;
  features: readonly string[];
};

const plans: readonly Plan[] = [
  {
    range: "1-9 карт",
    price: "3 000 ₸",
    suffix: "за карту",
    features: [
      "Стандартный дизайн",
      "Настройка на месте",
      "Гарантия замены",
    ],
  },
  {
    range: "10-49 карт",
    price: "2 600 ₸",
    suffix: "за карту",
    popular: true,
    features: [
      "Условия базового пакета",
      "Настольная табличка в комплекте",
      "Закрывающие документы",
    ],
  },
  {
    range: "50+ карт",
    price: "договорная",
    features: [
      "Индивидуальный дизайн с вашим логотипом",
      "Договор поставки",
      "Предоплата 30-50%, срок 8-20 дней",
    ],
  },
];

export function Pricing() {
  return (
    <section className="dark-section section-shell pricing-section" id="pricing">
      <div className="site-container">
        <SectionMarker index="07" label="ЦЕНЫ" />
        <Reveal className="section-heading section-heading-wide">
          <h2 className="section-title">
            Разовая оплата - без абонентских подписок
          </h2>
          <p className="section-subtitle">
            Окупается с первых клиентов, пришедших благодаря свежим отзывам.
          </p>
        </Reveal>
        <Stagger className="pricing-grid">
          {plans.map((plan) => (
            <StaggerItem
              className={`pricing-card ${plan.popular ? "pricing-card-popular" : ""}`}
              key={plan.range}
              glow
            >
              {plan.popular && (
                <span className="popular-pill">оптимальный пакет</span>
              )}
              <p className="plan-range">{plan.range}</p>
              <p className="plan-price">
                {plan.price}
                {plan.suffix && <span>{plan.suffix}</span>}
              </p>
              <ul className="plan-features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span aria-hidden="true">
                      <Check size={15} strokeWidth={2.4} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <LeadButton
                className="pricing-button"
                quantity={plan.range}
                variant={plan.popular ? "primary" : "ghost"}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
