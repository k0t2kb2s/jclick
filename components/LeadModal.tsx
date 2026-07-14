"use client";

import { AnimatePresence, motion } from "framer-motion";
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
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type LeadModalContextValue = {
  openModal: (quantity?: LeadQuantity) => void;
};

type FormStatus = "idle" | "submitting" | "success" | "error";
export type LeadQuantity = "1-9 карт" | "10-49 карт" | "50+ карт";

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

const flyingCards = [
  { x: -150, y: -118, rotate: -72, delay: 0.03 },
  { x: -82, y: -156, rotate: -36, delay: 0.08 },
  { x: 12, y: -172, rotate: 18, delay: 0.01 },
  { x: 105, y: -142, rotate: 58, delay: 0.11 },
  { x: 158, y: -72, rotate: 92, delay: 0.05 },
  { x: 156, y: 28, rotate: 132, delay: 0.14 },
  { x: 96, y: 108, rotate: 168, delay: 0.07 },
  { x: -2, y: 126, rotate: 205, delay: 0.12 },
  { x: -105, y: 102, rotate: 242, delay: 0.02 },
  { x: -160, y: 30, rotate: 286, delay: 0.1 },
];

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M27.1 15.7A11.1 11.1 0 0 1 10.7 25.5L5 27l1.5-5.5A11.1 11.1 0 1 1 27.1 15.7Z"
        fill="currentColor"
      />
      <path
        d="M11.5 9.8c.3-.7.6-.7 1-.7h.8c.2 0 .5.1.6.5l1.1 2.6c.1.3.1.5-.1.8l-.8 1c-.2.2-.2.4 0 .7 1 1.8 2.4 3.2 4.3 4.1.3.1.5.1.7-.1l1.2-1.5c.2-.3.5-.3.8-.2l2.4 1.1c.3.1.5.3.5.6 0 .4-.2 2-1.2 2.7-.8.6-1.9.9-3 .6-1.4-.3-3.3-1-5.5-2.9-2.6-2.2-4.2-5-4.7-6.6-.3-1.1 0-2 .4-2.7Z"
        fill="#0D130F"
      />
    </svg>
  );
}

function SuccessState({
  onClose,
  titleId,
  descriptionId,
}: {
  onClose: () => void;
  titleId: string;
  descriptionId: string;
}) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className="lead-success"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="success-animation" aria-hidden="true">
        {flyingCards.map((card, index) => (
          <motion.span
            className="success-flying-card"
            key={`${card.x}-${card.y}`}
            initial={
              reduceMotion
                ? false
                : { opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.25 }
            }
            animate={
              reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: [0, 1, 1, 0],
                    x: [0, card.x, card.x * 1.08],
                    y: [0, card.y, card.y + 115],
                    rotate: [0, card.rotate, card.rotate + 48],
                    scale: [0.25, 1, 0.78],
                  }
            }
            transition={{
              duration: 1.65,
              delay: card.delay,
              ease: [0.22, 0.72, 0.2, 1],
            }}
          >
            <span>{index % 3 === 0 ? "j" : ""}</span>
          </motion.span>
        ))}
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

function LeadDialog({
  onClose,
  initialQuantity,
}: {
  onClose: () => void;
  initialQuantity: LeadQuantity;
}) {
  const reduceMotion = usePrefersReducedMotion();
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
                Оставьте имя и телефон. Мы свяжемся с вами и всё настроим.
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
                      pattern={"[+0-9 .\\(\\)\\-]{7,40}"}
                      minLength={7}
                      maxLength={40}
                      title="Введите номер телефона цифрами"
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
                  <select name="quantity" defaultValue={initialQuantity}>
                    <option>1-9 карт</option>
                    <option>10-49 карт</option>
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
                <div className="lead-or" aria-hidden="true">
                  <span />
                  или
                  <span />
                </div>
                <a
                  className="lead-whatsapp"
                  href="https://wa.me/77067010125?text=Здравствуйте!%20Хочу%20попробовать%20карту%20jclick%20для%20отзывов."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="lead-whatsapp-icon">
                    <WhatsAppIcon />
                  </span>
                  <span className="lead-whatsapp-copy">
                    <strong>Написать в WhatsApp</strong>
                    <small>+7 706 701 01 25</small>
                  </span>
                  <span className="lead-whatsapp-arrow" aria-hidden="true">↗</span>
                </a>
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
  const [initialQuantity, setInitialQuantity] =
    useState<LeadQuantity>("1-9 карт");
  const triggerRef = useRef<HTMLElement | null>(null);
  const openModal = useCallback((quantity: LeadQuantity = "1-9 карт") => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setInitialQuantity(quantity);
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
      <AnimatePresence>
        {isOpen && (
          <LeadDialog
            onClose={closeModal}
            initialQuantity={initialQuantity}
          />
        )}
      </AnimatePresence>
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
