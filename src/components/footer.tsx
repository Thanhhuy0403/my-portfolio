import { ArrowUp } from "lucide-react";

import { nav, person, socials } from "@/content/profile";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <p className="font-display text-lg font-semibold">{person.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Embedded Software Engineer in Ho Chi Minh City. Firmware, RTOS, FPGA and the people who learn them.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-14 gap-y-2 text-sm">
            <p className="col-span-2 mb-1 font-mono text-xs tracking-widest text-muted uppercase sm:col-span-1">Sitemap</p>
            <p className="hidden font-mono text-xs tracking-widest text-muted uppercase sm:block">Elsewhere</p>
            <ul className="space-y-2">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="text-muted transition-colors hover:text-fg">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-fg">
                    {s.label} ↗
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${person.email}`} className="text-muted transition-colors hover:text-fg">
                  Email ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-14 bg-gradient-to-b from-fg/15 to-transparent bg-clip-text text-center font-display text-[17vw] leading-[0.8] font-semibold tracking-[-0.05em] text-transparent select-none lg:text-[13.5rem]"
        >
          thanhhuy
        </p>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted sm:flex-row sm:px-6">
          <p>© 2026 {person.name}. Designed &amp; built with Next.js · Hosted on Vercel.</p>
          <a href="#top" className="group inline-flex items-center gap-1.5 font-mono hover:text-accent">
            Back to top
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
