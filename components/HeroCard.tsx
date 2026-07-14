"use client";

import dynamic from "next/dynamic";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Suspense, type PointerEvent as ReactPointerEvent } from "react";

const CardScene = dynamic(() => import("@/components/HeroCardScene"), {
  ssr: false,
  loading: () => <div className="hero-card-scene-fallback" />,
});

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
  const reduceMotion = useReducedMotion();
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(rawRotateY, { stiffness: 150, damping: 20 });

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rawRotateX.set(y * -9);
    rawRotateY.set(x * 11);
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
      <div className="hero-card-orbit" aria-hidden="true" />
      <motion.div
        className="hero-card-float"
        animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 5.8, ease: "easeInOut", repeat: Infinity }}
      >
        <motion.div
          className="hero-card-shell"
          style={{ rotateX, rotateY, transformPerspective: 1100 }}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
        >
          <Suspense fallback={<div className="hero-card-scene-fallback" />}>
            <CardScene />
          </Suspense>
          <div className="hero-card-content" aria-hidden="true">
            <span className="hero-card-wordmark">jclick</span>
            <span className="hero-card-nfc">
              <NfcWaves />
            </span>
            <span className="hero-card-hint">• ПРИЛОЖИТЕ ТЕЛЕФОН</span>
          </div>
        </motion.div>
      </motion.div>
    </figure>
  );
}
