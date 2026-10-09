export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#1F3FD8" />
      <path d="M17 21 L32 37 L47 21 M32 37 V52" fill="none" stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="16" r="6" fill="#FFC83D" />
    </svg>
  );
}

export function Wordmark({ fontSize = 26, starColor = "var(--blue)", inkColor = "var(--ink)" }: { fontSize?: number; starColor?: string; inkColor?: string }) {
  return (
    <span className="disp wordmark" style={{ fontSize, color: inkColor }}>
      you<span style={{ color: starColor }}>more</span>
    </span>
  );
}
