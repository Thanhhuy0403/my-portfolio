import type { CSSProperties } from "react";

// 12 copper leads, listed clockwise (top → right → bottom → left) so animations travel around the chip.
const PINS: [number, number, number, number][] = [
  [12, 4.5, 12, 8], [16, 4.5, 16, 8], [20, 4.5, 20, 8],
  [24, 12, 27.5, 12], [24, 16, 27.5, 16], [24, 20, 27.5, 20],
  [20, 24, 20, 27.5], [16, 24, 16, 27.5], [12, 24, 12, 27.5],
  [4.5, 20, 8, 20], [4.5, 16, 8, 16], [4.5, 12, 8, 12],
];

/**
 * Brand mark: a microchip — copper leads, light package, mint die, pin-1 dot.
 * With `animated`, it "boots" once on load (leads light up clockwise, then the die powers on)
 * and sends a signal around its leads on hover of the nearest `.group`. See .chip-* in globals.css.
 */
export function LogoMark({ className, animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className={`${animated ? "chip-animated" : ""} ${className ?? ""}`} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#0b1118" />
      <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="none" stroke="#ffffff" strokeOpacity="0.1" />
      <g stroke="#f2b25c" strokeWidth="1.8" strokeLinecap="round">
        {PINS.map(([x1, y1, x2, y2], i) => (
          <line key={i} className="chip-pin" x1={x1} y1={y1} x2={x2} y2={y2} style={{ "--i": i } as CSSProperties} />
        ))}
      </g>
      <rect x="8" y="8" width="16" height="16" rx="3.5" fill="#0b1118" stroke="#e8eef4" strokeWidth="1.8" />
      <rect className="chip-die" x="12.5" y="12.5" width="7" height="7" rx="1.6" fill="#3ee6a0" />
      <circle cx="11.1" cy="11.1" r="1" fill="#e8eef4" fillOpacity="0.55" />
    </svg>
  );
}

/** Wordmark "huyhamhoc" — "huy" carries the weight, "hamhoc" (ham học: eager to learn) stays quiet. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`font-display font-semibold tracking-[-0.02em] ${className ?? ""}`}>
      huy
      <span className="text-muted transition-colors duration-300 group-hover:text-fg">hamhoc</span>
    </span>
  );
}
