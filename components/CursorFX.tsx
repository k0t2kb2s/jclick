"use client";

import { useEffect, useState } from "react";

const INTERACTIVE = "a, button, [role='button'], label, input, select, textarea";
const TORCH_SIZE = 560;

/* Кастомный курсор + «фонарик», подсвечивающий сетку фона. Один rAF-цикл,
   только transform/opacity — ничего не уходит с композитора. */
export function CursorFX() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setEnabled(finePointer.matches && !reducedMotion.matches);
    update();

    finePointer.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      finePointer.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.classList.add("has-cursor-fx");

    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    const torch = document.getElementById("backdrop-torch");
    const torchGrid = torch?.firstElementChild as HTMLElement | null;
    if (!dot || !ring) return;

    let pointerX = -100;
    let pointerY = -100;
    let ringX = -100;
    let ringY = -100;
    let torchX = -100;
    let torchY = -100;
    let ringScale = 1;
    let targetScale = 1;
    let pressed = false;
    let visible = false;
    let frame = 0;

    const render = () => {
      ringX += (pointerX - ringX) * 0.22;
      ringY += (pointerY - ringY) * 0.22;
      torchX += (pointerX - torchX) * 0.12;
      torchY += (pointerY - torchY) * 0.12;
      ringScale += ((pressed ? targetScale * 0.8 : targetScale) - ringScale) * 0.2;

      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${ringScale})`;

      if (torch && torchGrid) {
        const offsetX = torchX - TORCH_SIZE / 2;
        const offsetY = torchY - TORCH_SIZE / 2;
        torch.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
        torchGrid.style.transform = `translate3d(${-offsetX}px, ${-offsetY}px, 0)`;
      }

      frame = requestAnimationFrame(render);
    };

    const handleMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!visible) {
        visible = true;
        ringX = pointerX;
        ringY = pointerY;
        torchX = pointerX;
        torchY = pointerY;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        root.classList.add("torch-on");
      }

      const glowCard = (event.target as Element | null)?.closest<HTMLElement>("[data-glow]");
      if (glowCard) {
        const bounds = glowCard.getBoundingClientRect();
        glowCard.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
        glowCard.style.setProperty("--my", `${event.clientY - bounds.top}px`);
      }
    };

    const handleOver = (event: PointerEvent) => {
      const interactive = (event.target as Element | null)?.closest(INTERACTIVE);
      targetScale = interactive ? 1.75 : 1;
      ring.classList.toggle("is-active", Boolean(interactive));
    };

    const handleDown = () => {
      pressed = true;
    };

    const handleUp = () => {
      pressed = false;
    };

    const handleLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      root.classList.remove("torch-on");
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerover", handleOver, { passive: true });
    window.addEventListener("pointerdown", handleDown, { passive: true });
    window.addEventListener("pointerup", handleUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", handleLeave);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
      root.classList.remove("has-cursor-fx", "torch-on");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div id="cursor-dot" className="cursor-dot" aria-hidden="true" />
      <div id="cursor-ring" className="cursor-ring" aria-hidden="true" />
    </>
  );
}
