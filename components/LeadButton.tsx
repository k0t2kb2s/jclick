"use client";

import { useLeadModal } from "@/components/LeadModal";
import type { LeadQuantity } from "@/components/LeadModal";

export function LeadButton({
  arrow = false,
  className = "",
  quantity,
  variant = "primary",
}: {
  arrow?: boolean;
  className?: string;
  quantity?: LeadQuantity;
  variant?: "primary" | "ghost";
}) {
  const { openModal } = useLeadModal();
  const baseClass = variant === "ghost" ? "ghost-button" : "primary-button";

  return (
    <button
      type="button"
      className={`${baseClass} ${className}`}
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
