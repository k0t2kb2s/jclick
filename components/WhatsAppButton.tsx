import { WHATSAPP_URL } from "@/lib/constants";

export function WhatsAppButton({
  arrow = false,
  className = "",
}: {
  arrow?: boolean;
  className?: string;
}) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`primary-button ${className}`}
    >
      <span>Оставить заявку{arrow ? " " : ""}</span>
      {arrow && (
        <span className="button-arrow" aria-hidden="true">
          →
        </span>
      )}
    </a>
  );
}
