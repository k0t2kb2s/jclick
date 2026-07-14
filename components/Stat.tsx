"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Motion";

export function Stat() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.45 });
  const reduceMotion = useReducedMotion();
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
    <section className="dark-section section-shell stat-section section-glow">
      <div className="stat-glow" aria-hidden="true" />
      <div className="site-container stat-inner" ref={ref}>
        <Reveal>
          <Eyebrow>ЗАЧЕМ ЭТО БИЗНЕСУ</Eyebrow>
          <div className="stat-number" aria-label="+40%">
            +<motion.span aria-hidden="true">{rounded}</motion.span>%
          </div>
          <p className="stat-caption">свежих отзывов за первый месяц с картой</p>
          <p className="stat-text">
            2GIS показывает выше тех, у кого отзывы свежие и их много. Больше
            отзывов → выше в поиске → больше гостей.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
