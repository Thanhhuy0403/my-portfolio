import type { IconType } from "react-icons";
import {
  SiAmd,
  SiArduino,
  SiArm,
  SiC,
  SiCplusplus,
  SiEspressif,
  SiFirebase,
  SiGit,
  SiLinux,
  SiPlatformio,
  SiPython,
  SiStmicroelectronics,
  SiTensorflow,
} from "react-icons/si";

import { techLogos } from "@/content/profile";

const ICONS: Record<(typeof techLogos)[number]["icon"], IconType> = {
  c: SiC,
  cplusplus: SiCplusplus,
  stmicroelectronics: SiStmicroelectronics,
  espressif: SiEspressif,
  arduino: SiArduino,
  amd: SiAmd,
  arm: SiArm,
  linux: SiLinux,
  platformio: SiPlatformio,
  tensorflow: SiTensorflow,
  firebase: SiFirebase,
  git: SiGit,
  python: SiPython,
};

export function TechStrip() {
  return (
    <section aria-labelledby="tech-strip-title" className="border-y border-line bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p id="tech-strip-title" className="text-center font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
          Platforms &amp; tools I build with
        </p>
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-12">
          {techLogos.map((t) => {
            const Icon = ICONS[t.icon];
            // Wordmark logos (AMD, Arm) are wide and short inside their square viewBox, so they need more room.
            const wordmark = "wordmark" in t && t.wordmark;
            const logoOnly = "logoOnly" in t && t.logoOnly;
            return (
              <li key={t.name} className="flex items-center gap-2 text-muted transition-colors duration-300 hover:text-fg">
                <Icon
                  className={wordmark ? "-my-2 size-10" : "size-5"}
                  aria-hidden={!logoOnly}
                  aria-label={logoOnly ? t.name : undefined}
                  role={logoOnly ? "img" : undefined}
                />
                {logoOnly ? null : <span className="text-[15px] font-medium whitespace-nowrap">{t.name}</span>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
