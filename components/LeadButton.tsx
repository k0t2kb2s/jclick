"use client";

import { useLeadModal } from "@/components/LeadModal";
import type { LeadQuantity } from "@/components/LeadModal";

export function LeadButton({
  arrow = false,
  className = "",
  quantity,
}: {
  arrow?: boolean;
  className?: string;
  quantity?: LeadQuantity;
}) {
  const { openModal } = useLeadModal();

  return (
    <button
      type="button"
      className={`primary-button ${className}`}
      onClick={() => openModal(quantity)}
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
