"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/* Магнитная обёртка для CTA: кнопка тянется к курсору в пределах пары
   миллиметров и пружиной возвращается на место. */
export function Magnetic({
  children,
  className = "",
  strength = 0.22,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 20 });
  const y = useSpring(rawY, { stiffness: 260, damping: 20 });

  const handlePointerMove = (event: ReactPointerEvent<HTMLSpanElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - bounds.left - bounds.width / 2) * strength);
    rawY.set((event.clientY - bounds.top - bounds.height / 2) * strength);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.span
      className={`magnetic ${className}`}
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}
