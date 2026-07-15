"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Motion";
import { SectionMarker } from "@/components/SectionMarker";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export function Stat() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.45 });
  const reduceMotion = usePrefersReducedMotion();
  const value = useMotionValue(reduceMotion ? 40 : 0);
  const rounded = useTransform(value, (latest) => Math.round(latest));

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      value.set(40);
      return;
    }

    const controls = animate(value, 40, {
      duration: 1.7,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [isInView, reduceMotion, value]);

  return (
    <section className="dark-section shell-roomy stat-section">
      <div className="site-container">
        <SectionMarker index="05" label="ЗАЧЕМ ЭТО БИЗНЕСУ" />
      </div>
      <div className="site-container stat-inner" ref={ref}>
        <Reveal>
          <Eyebrow>РЕЗУЛЬТАТ</Eyebrow>
          <div className="stat-number" aria-label="до +40%">
            <span className="stat-upto" aria-hidden="true">
              до
            </span>
            +<motion.span aria-hidden="true">{rounded}</motion.span>%
          </div>
          <p className="stat-caption">
            новых отзывов за первый месяц использования
          </p>
          <p className="stat-text">
            Регулярные свежие отзывы повышают рейтинг карточки в поиске 2GIS.
            Выше позиция в выдаче - больше новых гостей.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
