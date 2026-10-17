import type React from "react";
import type { IconType } from "react-icons";
import {
  LuCable,
  LuCircuitBoard,
  LuCode,
  LuCpu,
  LuHandshake,
  LuLayers,
  LuWrench,
} from "react-icons/lu";
import {
  SiArduino,
  SiC,
  SiCplusplus,
  SiEspressif,
  SiFirebase,
  SiGit,
  SiGithub,
  SiLinux,
  SiPlatformio,
  SiPython,
  SiStmicroelectronics,
} from "react-icons/si";

import { getI18n } from "@/i18n/server";
import { SectionHeading } from "./section-heading";

const GROUP_ICONS: Record<string, IconType> = {
  languages: LuCode,
  hardware: LuCpu,
  protocols: LuCable,
  peripherals: LuCircuitBoard,
  systems: LuLayers,
  tools: LuWrench,
};

// Official logos only where one exists; everything else stays as plain text rather than a guessed icon.
const ITEM_LOGOS: Record<string, IconType> = {
  C: SiC,
  "C++": SiCplusplus,
  "Python (basic)": SiPython,
  STM32: SiStmicroelectronics,
  ESP32: SiEspressif,
  Arduino: SiArduino,
  "Embedded Linux": SiLinux,
  STM32CubeIDE: SiStmicroelectronics,
  PlatformIO: SiPlatformio,
  Git: SiGit,
  GitHub: SiGithub,
  Firebase: SiFirebase,
};

export async function Skills() {
  const { dict, content } = await getI18n();
  const { skills, softSkills } = content;
  const t = dict.skills;
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="skills-title"
          index="06"
          eyebrow={t.eyebrow}
          title={t.title}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => {
            const GroupIcon = GROUP_ICONS[group.key] ?? LuCpu;
            return (
              <article
                key={group.key}
                data-reveal
                data-spot
                style={{ "--d": `${(i % 3) * 80}ms` } as React.CSSProperties}
                className="card lift p-6"
              >
                <h3 className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                    <GroupIcon className="size-[18px]" aria-hidden="true" />
                  </span>
                  {group.group}
                  <span className="ml-auto text-accent/80">
                    0x{(i + 1).toString(16).padStart(2, "0").toUpperCase()}
                  </span>
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const Logo = ITEM_LOGOS[item];
                    return (
                      <li
                        key={item}
                        className="flex items-center gap-1.5 rounded-lg border border-line bg-surface-2/60 px-3 py-1.5 text-sm transition-colors hover:border-accent/50 hover:text-accent"
                      >
                        {Logo ? (
                          <Logo
                            className="size-3.5 shrink-0 opacity-80"
                            aria-hidden="true"
                          />
                        ) : null}
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })}
        </div>

        <div
          data-reveal
          data-spot
          style={{ "--d": "0ms" } as React.CSSProperties}
          className="card mt-4 flex flex-col gap-4 p-6 sm:flex-row sm:items-center"
        >
          <h3 className="flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            <LuHandshake className="size-4 text-copper" aria-hidden="true" />{" "}
            {t.softSkills}
          </h3>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {softSkills.map((s) => (
              <li key={s} className="flex items-center gap-2">
                <span aria-hidden className="size-1 rounded-full bg-copper" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
