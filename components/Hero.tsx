"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/Eyebrow";
import { HeroCard } from "@/components/HeroCard";
import { LeadButton } from "@/components/LeadButton";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const headline = "Гость тапнул — оставил отзыв.";

export function Hero() {
  const reduceMotion = usePrefersReducedMotion();
  const words = headline.split(" ");

  return (
    <section id="top" className="hero dark-section">
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Eyebrow>NFC-КАРТЫ · ОТЗЫВЫ · 2GIS</Eyebrow>
          </motion.div>
          <h1 className="hero-title" aria-label={headline}>
            {words.map((word, index) => (
              <span className="hero-word-clip" aria-hidden="true" key={word}>
                <motion.span
                  className={`hero-word ${
                    index === words.length - 1 ? "hero-title-accent" : ""
                  }`}
                  initial={reduceMotion ? false : { y: "115%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.75,
                    delay: reduceMotion ? 0 : 0.12 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                  {index < words.length - 1 ? " " : ""}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="hero-subtitle"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.55 }}
          >
            NFC-карты, которые превращают каждого гостя в свежий отзыв на 2GIS.
            Без приложений. Быстрее QR.
          </motion.p>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.7 }}
          >
            <div className="hero-actions">
              <LeadButton arrow />
              <a className="ghost-button" href="#pricing">
                Смотреть цены
              </a>
            </div>
            <p className="hero-trust">
              Без подписки · Настройка за 30 секунд · Гарантия замены
            </p>
          </motion.div>
        </div>
        <motion.div
          className="hero-card-column"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            duration: 1,
            delay: reduceMotion ? 0 : 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <HeroCard />
        </motion.div>
      </div>
    </section>
  );
}
