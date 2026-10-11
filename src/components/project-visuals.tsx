import { LuArrowLeftRight, LuChevronRight, LuCpu, LuDroplets, LuLeaf, LuPower, LuThermometer, LuWifi } from "react-icons/lu";

import type { Project } from "@/content/profile";

/**
 * Product-style UI mockups for each project, recreated from the software in the repos
 * (SDL2 ECG viewer, LittleFS web dashboard, React plant dashboard). Pure HTML/SVG/CSS:
 * crisp at any size, theme-aware and animated without JavaScript.
 */
export function ProjectVisual({ slug }: { slug: Project["slug"] }) {
  if (slug === "fpga-ecg") return <FpgaVisual />;
  if (slug === "esp32-iot") return <Esp32Visual />;
  return <PlantVisual />;
}

function Window({
  title,
  children,
  bar,
}: {
  title: string;
  children: React.ReactNode;
  bar?: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line-strong bg-surface shadow-2xl shadow-black/25">
      <div className="flex items-center gap-2 border-b border-line bg-surface-2/70 px-3.5 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate font-mono text-[10px] text-muted sm:text-[11px]">{title}</span>
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
      {bar ? (
        <div className="flex items-center gap-3 overflow-hidden border-t border-line bg-surface-2/70 px-3.5 py-1.5 font-mono text-[9px] whitespace-nowrap text-muted sm:text-[10px]">
          {bar}
        </div>
      ) : null}
    </div>
  );
}

/* ---------------- FPGA · ECG ---------------- */

// Builds a repeating P-QRS-T waveform — a nod to the FPGA ECG classifier thesis.
function buildEcgPath(beats: number, beatWidth: number, baseline: number, amp = 1) {
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

// A still snapshot of the scope (6 beats across the frame) — the page stays calm.
const ECG = buildEcgPath(6, 200, 60, 0.85);
// PEs drawn as busy in this frame of the accelerator.
const ACTIVE = [0, 3, 5, 6, 9, 10, 12, 15];

function FpgaVisual() {
  return (
    <Window
      title="ecg_classifier — kria-kv260 (SDL2)"
      bar={
        <>
          <span className="flex items-center gap-1.5 text-accent">
            <span className="size-1.5 rounded-full bg-accent" /> DMA ready
          </span>
          <span>mmap 0xA000_0000</span>
          <span>int8</span>
          <span className="ml-auto">SEG_LEN 320</span>
        </>
      }
    >
      <div className="grid h-full grid-cols-[1fr_auto]">
        {/* Scope */}
        <div className="relative overflow-hidden border-r border-line bg-[#04110c] dark:bg-[#03100b]">
          <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgb(62_230_160/.09)_1px,transparent_1px),linear-gradient(90deg,rgb(62_230_160/.09)_1px,transparent_1px)] [background-size:20px_20px]" />
          <p className="absolute top-2.5 left-3 font-mono text-[9px] text-[#3ee6a0]/80 sm:text-[10px]">LEAD II · 25 mm/s</p>
          <div className="absolute inset-x-0 top-1/2 h-[55%] -translate-y-1/2 overflow-hidden">
            <svg viewBox="0 0 1200 110" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
              <path d={ECG} fill="none" stroke="#3ee6a0" strokeWidth="1.8" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="absolute bottom-2.5 left-3 flex items-center gap-2 rounded-md border border-[#3ee6a0]/30 bg-black/40 px-2 py-1 font-mono text-[9px] text-[#3ee6a0] backdrop-blur sm:text-[10px]">
            <span className="size-1.5 rounded-full bg-[#3ee6a0]" /> prediction: NORMAL
          </div>
        </div>
        {/* Accelerator */}
        <div className="flex w-[7.5rem] flex-col gap-3 bg-surface p-3 sm:w-36">
          <p className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider text-muted uppercase sm:text-[10px]">
            <LuCpu className="size-3" aria-hidden="true" /> CGRA · 16 PE
          </p>
          <div className="grid grid-cols-4 gap-1">
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className={`aspect-square rounded-[3px] border ${ACTIVE.includes(i) ? "border-transparent bg-accent/80" : "border-line bg-surface-2"}`}
              />
            ))}
          </div>
          <div className="space-y-1.5 font-mono text-[9px] text-muted sm:text-[10px]">
            {["ARM A53", "AXI / DMA", "CNN core"].map((s, i) => (
              <div key={s} className="flex items-center gap-1.5">
                <span className={`size-1.5 rounded-full ${i === 2 ? "bg-copper" : "bg-accent"}`} />
                {s}
              </div>
            ))}
          </div>
          <div className="mt-auto">
            <p className="font-mono text-[9px] text-muted">class prob.</p>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-2">
              <div className="h-full w-[88%] rounded-full bg-accent" />
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}

/* ---------------- ESP32 · IoT ---------------- */

const TASKS = [
  { name: "taskWebServer", stack: "8192" },
  { name: "taskConnectWifi", stack: "4096" },
  { name: "taskSendConfigToFirebase", stack: "4096" },
  { name: "taskReceiveFirebaseHandle", stack: "4096" },
];
const SPARK = [42, 48, 45, 55, 52, 60, 58, 66, 62, 70, 68, 74];

function Esp32Visual() {
  return (
    <Window
      title="192.168.4.1 — yolo-uno dashboard"
      bar={
        <>
          <span className="flex items-center gap-1.5 text-accent">
            <LuWifi className="size-3" aria-hidden="true" /> connected
          </span>
          <span>LittleFS /index.html</span>
          <span className="ml-auto flex items-center gap-1">
            firebase <LuArrowLeftRight className="size-3" aria-hidden="true" /> synced
          </span>
        </>
      }
    >
      <div className="grid h-full grid-cols-2 gap-2.5 bg-surface-2/40 p-3 sm:gap-3 sm:p-4">
        <div className="rounded-lg border border-line bg-surface p-2.5 sm:p-3">
          <p className="flex items-center gap-1.5 text-[10px] text-muted sm:text-[11px]">
            <LuThermometer className="size-3.5 text-copper" aria-hidden="true" /> Temperature
          </p>
          <p className="mt-1 font-display text-lg font-semibold sm:text-2xl">
            28.4<span className="text-xs text-muted sm:text-sm">°C</span>
          </p>
          <div className="mt-1.5 flex h-7 items-end gap-[3px] sm:h-9">
            {SPARK.map((h, i) => (
              <span key={i} className="flex-1 rounded-sm bg-copper/70 animate-bar" style={{ height: `${h}%`, animationDelay: `${i * 60}ms` }} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2.5 rounded-lg border border-line bg-surface p-2.5 sm:gap-3 sm:p-3">
          <svg viewBox="0 0 36 36" className="size-12 shrink-0 -rotate-90 sm:size-16" aria-hidden="true">
            <circle cx="18" cy="18" r="15" fill="none" stroke="var(--surface-2)" strokeWidth="4" />
            <circle cx="18" cy="18" r="15" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" strokeDasharray="94.2" strokeDashoffset="33" />
          </svg>
          <div>
            <p className="flex items-center gap-1.5 text-[10px] text-muted sm:text-[11px]">
              <LuDroplets className="size-3.5 text-accent" aria-hidden="true" /> Humidity
            </p>
            <p className="font-display text-lg font-semibold sm:text-2xl">65%</p>
          </div>
        </div>
        <div className="col-span-2 rounded-lg border border-line bg-surface p-2.5 sm:p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-mono text-[9px] tracking-wider text-muted uppercase sm:text-[10px]">FreeRTOS tasks</p>
            <span className="flex items-center gap-1.5 rounded-full bg-accent-soft px-2 py-0.5 text-[9px] text-accent sm:text-[10px]">
              <LuPower className="size-3" aria-hidden="true" /> Pump ON
            </span>
          </div>
          <ul className="space-y-1.5">
            {TASKS.map((t) => (
              <li key={t.name} className="grid grid-cols-[auto_1fr_auto] items-center gap-2 font-mono text-[9px] sm:text-[10px]">
                <span className="size-1.5 rounded-full bg-accent" />
                <span className="truncate">{t.name}</span>
                <span className="text-muted">{t.stack} B</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Window>
  );
}

/* ---------------- STM32 · Plant ---------------- */

const LOG = [
  { dir: "STM32 → ESP32", msg: "{T:29.1,H:63}" },
  { dir: "ESP32 → AI", msg: "classify(segment)" },
  { dir: "AI → APP", msg: "status: healthy" },
];
const CHART = "M0 46 C 20 40, 34 30, 52 32 S 86 18, 104 22 S 140 10, 160 14 S 196 6, 220 8";

function PlantVisual() {
  return (
    <Window
      title="plant-health — react dashboard"
      bar={
        <>
          <span className="flex items-center gap-1.5 text-accent">
            <span className="size-1.5 rounded-full bg-accent" /> UART link
          </span>
          <span>STM32F103RB</span>
          <span className="ml-auto">task scheduler</span>
        </>
      }
    >
      <div className="grid h-full grid-cols-[auto_1fr] gap-2.5 bg-surface-2/40 p-3 sm:gap-3 sm:p-4">
        <div className="flex w-[6.5rem] flex-col items-center justify-center rounded-lg border border-line bg-surface p-2.5 text-center sm:w-32 sm:p-3">
          <div className="relative grid size-14 place-items-center sm:size-20">
            <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90" aria-hidden="true">
              <circle cx="18" cy="18" r="16" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            </svg>
            <span className="grid size-10 place-items-center rounded-full bg-accent-soft text-accent sm:size-14">
              <LuLeaf className="size-5 sm:size-7" aria-hidden="true" />
            </span>
          </div>
          <p className="mt-2 font-display text-sm font-semibold text-accent sm:text-base">Healthy</p>
          <p className="font-mono text-[9px] text-muted">AI classifier</p>
        </div>
        <div className="flex min-w-0 flex-col gap-2.5 sm:gap-3">
          <div className="rounded-lg border border-line bg-surface p-2.5 sm:p-3">
            <div className="flex items-center justify-between text-[10px] text-muted sm:text-[11px]">
              <span>Soil climate · 24h</span>
              <span className="flex gap-2 font-mono text-[9px]">
                <span className="flex items-center gap-1 text-accent">
                  <span className="size-1.5 rounded-full bg-accent" /> H
                </span>
                <span className="flex items-center gap-1 text-copper">
                  <span className="size-1.5 rounded-full bg-copper" /> T
                </span>
              </span>
            </div>
            <svg viewBox="0 0 220 52" className="mt-1.5 h-10 w-full sm:h-14" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="plant-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="var(--accent)" stopOpacity="0.25" />
                  <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={`${CHART} L220 52 L0 52 Z`} fill="url(#plant-fill)" />
              <path d={CHART} fill="none" stroke="var(--accent)" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
              <path d="M0 30 C 30 34, 50 26, 80 30 S 130 36, 160 28 S 200 30, 220 26" fill="none" stroke="var(--copper)" strokeWidth="1.4" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="flex-1 overflow-hidden rounded-lg border border-line bg-[#04110c] p-2.5 font-mono text-[9px] leading-relaxed text-[#9fb3a8] sm:p-3 sm:text-[10px]">
            {LOG.map((l, i) => (
              <p key={l.dir} className="animate-line truncate" style={{ animationDelay: `${0.3 + i * 0.35}s` }}>
                <LuChevronRight className="inline size-3 -translate-y-px text-[#3ee6a0]" aria-hidden="true" /> <span className="text-[#f2b25c]">{l.dir}</span> {l.msg}
              </p>
            ))}
            <p className="text-[#3ee6a0]">
              <LuChevronRight className="inline size-3 -translate-y-px" aria-hidden="true" />{" "}
              <span className="inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] bg-[#3ee6a0]/80" />
            </p>
          </div>
        </div>
      </div>
    </Window>
  );
}
