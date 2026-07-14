"use client";

import { useLeadModal } from "@/components/LeadModal";

export function LeadButton({
  arrow = false,
  className = "",
}: {
  arrow?: boolean;
  className?: string;
}) {
  const { openModal } = useLeadModal();

  return (
    <button
      type="button"
      className={`primary-button ${className}`}
      onClick={openModal}
    >
      <span>Оставить заявку{arrow ? " " : ""}</span>
      {arrow && (
        <span className="button-arrow" aria-hidden="true">
          →
        </span>
      )}
    </button>
  );
}
