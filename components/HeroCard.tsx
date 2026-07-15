"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { type PointerEvent as ReactPointerEvent } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

function NfcWaves() {
  return (
    <svg viewBox="0 0 42 42" fill="none" aria-hidden="true">
      <path d="M13 16c3.2 2.8 3.2 7.2 0 10" />
      <path d="M18 11c6.4 5.5 6.4 14.5 0 20" />
      <path d="M23 6c9.6 8.3 9.6 21.7 0 30" />
    </svg>
  );
}

export function HeroCard() {
  const reduceMotion = usePrefersReducedMotion();
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 180, damping: 26 });
  const rotateY = useSpring(rawRotateY, { stiffness: 180, damping: 26 });

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rawRotateX.set(y * -3.5);
    rawRotateY.set(x * 4.5);
  };

  const resetTilt = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <figure
      className="hero-visual"
      role="img"
      aria-label="Тёмная NFC-карта jclick"
    >
      <div className="hero-card-stage" aria-hidden="true">
        <div className="hero-stage-grid" />
        <div className="hero-stage-halo" />
        <span className="hero-pulse" />
        <span className="hero-pulse hero-pulse-late" />
        <motion.div
          className="hero-card-shell"
          style={{ rotateX, rotateY, transformPerspective: 1100 }}
          animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
        >
          <div className="hero-card-body" />
          <div className="hero-card-content" aria-hidden="true">
            <span className="hero-card-wordmark">jclick</span>
            <span className="hero-card-nfc">
              <NfcWaves />
            </span>
            <span className="hero-card-chip" />
          </div>
          <span className="hero-card-glint" />
        </motion.div>
        <div className="hero-stage-shadow" />
      </div>
    </figure>
  );
}
