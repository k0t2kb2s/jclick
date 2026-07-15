"use client";

import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { SectionMarker } from "@/components/SectionMarker";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const demoSteps = [
  {
    number: "1",
    title: "Подносит телефон",
    text: "Без приложений, без наведения камеры.",
  },
  {
    number: "2",
    title: "Открывается 2GIS",
    text: "Быстрее, чем достать и открыть камеру.",
  },
  {
    number: "3",
    title: "Отзыв за 30 секунд",
    text: "Пока гость сидит у вас, а не когда уйдёт.",
  },
];

function DemoCard() {
  return (
    <div className="demo-nfc-card">
      <span className="demo-card-wordmark">jclick</span>
      <svg viewBox="0 0 42 42" fill="none" aria-hidden="true">
        <path d="M12 16c3 2.7 3 7.3 0 10" />
        <path d="M18 10c6.8 5.9 6.8 16.1 0 22" />
        <path d="M24 5c10 8.6 10 23.4 0 32" />
      </svg>
      <span className="demo-card-hint">• ПРИЛОЖИТЕ ТЕЛЕФОН</span>
    </div>
  );
}

function DemoPhone() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className="phone-shell"
      initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.35 }}
    >
      <div className="phone-speaker" />
      <div className="phone-screen">
        <span className="phone-url">2gis.kz/review</span>
        <div className="phone-profile">
          <span className="phone-avatar">А</span>
          <strong>Кафе «Астана»</strong>
        </div>
        <div className="phone-stars" aria-label="5 звёзд">
          {Array.from({ length: 5 }).map((_, index) => (
            <motion.span
              key={index}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.55 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.32,
                delay: reduceMotion ? 0 : 0.72 + index * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
              aria-hidden="true"
            >
              ★
            </motion.span>
          ))}
        </div>
        <div className="phone-action phone-action-lime">Оценить на 2GIS</div>
        <div className="phone-action phone-action-dark">Оценить в Google</div>
      </div>
    </motion.div>
  );
}

export function Demo() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="light-section section-shell demo-section">
      <div className="site-container">
        <SectionMarker index="03" label="ЖИВОЕ ДЕМО" />
        <Reveal className="section-heading section-heading-wide">
          <h2 className="section-title light-title">
            Один тап — и страница отзыва уже открыта
          </h2>
        </Reveal>
        <div className="demo-grid">
          <Stagger className="demo-steps">
            {demoSteps.map((step) => (
              <StaggerItem className="demo-step" key={step.number}>
                <span className="demo-step-number">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <figure
            className="demo-visual"
            role="img"
            aria-label="NFC-карта jclick открывает страницу отзыва на телефоне"
          >
            <div aria-hidden="true" className="demo-flow">
              <DemoCard />
              <div className="demo-arrow">
                <motion.span
                  className="demo-arrow-line"
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.2 }}
                />
                <motion.span
                  className="demo-arrow-head"
                  initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.75 }}
                >
                  →
                </motion.span>
              </div>
              <DemoPhone />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
