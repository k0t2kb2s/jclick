type LogoProps = {
  compact?: boolean;
  className?: string;
};

export function Logo({ compact = false, className = "" }: LogoProps) {
  return (
    <span className={`logo ${compact ? "logo-compact" : ""} ${className}`}>
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" fill="none">
          <rect x="8.5" y="12" width="15.5" height="16" rx="3" fill="#0A0E0C" />
          <path
            d="M25.5 15.5c2.7 2.2 2.7 6.8 0 9M29 12.5c4.8 4 4.8 11 0 15"
            stroke="#0A0E0C"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path d="M11.5 17h9" stroke="#B5F23C" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <span className="logo-word">jclick</span>
    </span>
  );
}
