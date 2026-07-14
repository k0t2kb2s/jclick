"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";

type LeadModalContextValue = {
  openModal: () => void;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

const burstPoints = [
  [0, -70],
  [50, -50],
  [70, 0],
  [50, 50],
  [0, 70],
  [-50, 50],
  [-70, 0],
  [-50, -50],
];

function SuccessState({
  onClose,
  titleId,
  descriptionId,
}: {
  onClose: () => void;
  titleId: string;
  descriptionId: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="lead-success"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="success-animation" aria-hidden="true">
        {burstPoints.map(([x, y], index) => (
          <motion.span
            className="success-particle"
            key={`${x}-${y}`}
            initial={reduceMotion ? false : { opacity: 0, x: 0, y: 0, scale: 0 }}
            animate={{
              opacity: reduceMotion ? 1 : [0, 1, 0],
              x: reduceMotion ? x * 0.55 : x,
              y: reduceMotion ? y * 0.55 : y,
              scale: reduceMotion ? 1 : [0, 1, 0.55],
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              delay: reduceMotion ? 0 : 0.15 + index * 0.025,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
        <motion.div
          className="success-ring"
          initial={reduceMotion ? false : { scale: 0.55, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55, type: "spring", bounce: 0.35 }}
        >
          <motion.div
            initial={reduceMotion ? false : { rotate: -30, scale: 0.4 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: reduceMotion ? 0 : 0.18, type: "spring" }}
          >
            <Check size={43} strokeWidth={2.8} />
          </motion.div>
        </motion.div>
      </div>
      <p className="lead-success-kicker">ГОТОВО</p>
      <h2 id={titleId}>Заявка отправлена</h2>
      <p id={descriptionId}>Спасибо! Скоро свяжемся с вами.</p>
      <button type="button" className="primary-button lead-success-button" onClick={onClose}>
        Закрыть
      </button>
    </motion.div>
  );
}

function LeadDialog({ onClose }: { onClose: () => void }) {
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const descriptionId = useId();
  const firstInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    const frame = requestAnimationFrame(() => firstInputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable?.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          venue: formData.get("venue"),
          quantity: formData.get("quantity"),
          company: formData.get("company"),
        }),
      });

      if (!response.ok) throw new Error("Lead request failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.div
      className="lead-overlay"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        className="lead-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        onKeyDown={handleKeyDown}
      >
        <div className="lead-dialog-glow" aria-hidden="true" />
        <button
          type="button"
          className="lead-close"
          onClick={onClose}
          aria-label="Закрыть"
        >
          <X size={20} />
        </button>

        <AnimatePresence mode="wait" initial={false}>
          {status === "success" ? (
            <SuccessState
              key="success"
              onClose={onClose}
              titleId={titleId}
              descriptionId={descriptionId}
            />
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.22 }}
            >
              <p className="lead-kicker">ЗАЯВКА · JCLICK</p>
              <h2 id={titleId}>Оставить заявку</h2>
              <p className="lead-description" id={descriptionId}>
                Оставьте контакты — свяжемся с вами и всё настроим.
              </p>

              <form className="lead-form" onSubmit={handleSubmit}>
                <div className="lead-field-grid">
                  <label className="lead-field">
                    <span>Ваше имя</span>
                    <input
                      ref={firstInputRef}
                      type="text"
                      name="name"
                      autoComplete="name"
                      maxLength={80}
                      required
                    />
                  </label>
                  <label className="lead-field">
                    <span>Телефон</span>
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      inputMode="tel"
                      maxLength={40}
                      required
                    />
                  </label>
                </div>
                <label className="lead-field">
                  <span>Название заведения</span>
                  <input
                    type="text"
                    name="venue"
                    autoComplete="organization"
                    maxLength={120}
                  />
                </label>
                <label className="lead-field">
                  <span>Количество карт</span>
                  <select name="quantity" defaultValue="1–9 карт">
                    <option>1–9 карт</option>
                    <option>10–49 карт</option>
                    <option>50+ карт</option>
                  </select>
                </label>
                <label className="lead-honeypot" aria-hidden="true">
                  Компания
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                </label>

                <button
                  type="submit"
                  className="primary-button lead-submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <>
                      <span className="submit-spinner" aria-hidden="true" />
                      Отправляем
                    </>
                  ) : (
                    <>
                      Отправить заявку
                      <span className="button-arrow" aria-hidden="true">→</span>
                    </>
                  )}
                </button>
                <p className="lead-privacy">
                  Нажимая кнопку, вы соглашаетесь на обработку данных.
                </p>
                <AnimatePresence>
                  {status === "error" && (
                    <motion.p
                      className="lead-error"
                      role="alert"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      Не удалось отправить. Попробуйте ещё раз.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const openModal = useCallback(() => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, isOpen]);

  return (
    <LeadModalContext.Provider value={{ openModal }}>
      {children}
      <AnimatePresence>{isOpen && <LeadDialog onClose={closeModal} />}</AnimatePresence>
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  const context = useContext(LeadModalContext);
  if (!context) {
    throw new Error("useLeadModal must be used inside LeadModalProvider");
  }
  return context;
}
