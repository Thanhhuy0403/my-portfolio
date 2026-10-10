import type React from "react";
import { Cpu } from "lucide-react";

import { skills, softSkills } from "@/content/profile";
import { SectionHeading } from "./section-heading";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="skills-title"
          index="05"
          eyebrow="Toolkit"
          title="The stack I reach for."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <article
              key={group.group}
              data-reveal
              data-spot
              style={{ "--d": `${(i % 3) * 80}ms` } as React.CSSProperties}
              className="card lift p-6"
            >
              <h3 className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] text-muted">
                {group.group}
                <span className="text-accent">0x{(i + 1).toString(16).padStart(2, "0").toUpperCase()}</span>
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-line bg-surface-2/60 px-3 py-1.5 text-sm transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div data-reveal data-spot style={{ "--d": "0ms" } as React.CSSProperties} className="card mt-4 flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <h3 className="flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            <Cpu className="size-4 text-copper" aria-hidden="true" /> Soft skills
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
