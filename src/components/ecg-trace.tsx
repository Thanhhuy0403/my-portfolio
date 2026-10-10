// Builds a repeating P-QRS-T waveform — a nod to the FPGA ECG classifier thesis.
export function buildEcgPath(beats: number, beatWidth: number, baseline: number, amp = 1) {
  let d = `M0 ${baseline}`;
  for (let i = 0; i < beats; i++) {
    const x = i * beatWidth;
    const p = (n: number) => (x + n * beatWidth).toFixed(1);
    const y = (n: number) => (baseline + n * amp).toFixed(1);
    d +=
      ` L${p(0.18)} ${y(0)}` +
      ` Q${p(0.23)} ${y(-9)} ${p(0.28)} ${y(0)}` + // P wave
      ` L${p(0.36)} ${y(0)}` +
      ` L${p(0.39)} ${y(8)}` + // Q
      ` L${p(0.43)} ${y(-58)}` + // R
      ` L${p(0.47)} ${y(16)}` + // S
      ` L${p(0.5)} ${y(0)}` +
      ` L${p(0.6)} ${y(0)}` +
      ` Q${p(0.68)} ${y(-15)} ${p(0.76)} ${y(0)}` + // T wave
      ` L${p(1)} ${y(0)}`;
  }
  return d;
}

const PATH = buildEcgPath(12, 200, 70);

/** Endless monitor-style trace: the path is two identical halves translated by -50% in a loop. */
export function EcgTrace({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)] ${className ?? ""}`}>
      <svg viewBox="0 0 2400 110" preserveAspectRatio="none" className="animate-ecg h-full w-[200%]">
        <path
          d={PATH}
          fill="none"
          stroke="var(--accent)"
          strokeOpacity="0.85"
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
