/* Волосяные NFC-дуги - «волны сигнала» от карты. Общий рисунок
   для хиро и финального CTA, позиционируется классом-обёрткой. */
export function SignalArcs({ className }: { className: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 700 700">
        <circle cx="350" cy="350" r="120" />
        <circle cx="350" cy="350" r="190" />
        <circle cx="350" cy="350" r="260" />
        <circle cx="350" cy="350" r="330" />
        <circle className="arc-accent" cx="350" cy="350" r="190" />
      </svg>
    </div>
  );
}
