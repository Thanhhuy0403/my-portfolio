import { LuArrowUp, LuArrowUpRight } from "react-icons/lu";

import { sectionIds } from "@/content/profile";
import { getI18n } from "@/i18n/server";
import { LogoMark, Wordmark } from "./logo";

export async function Footer() {
  const { dict, content } = await getI18n();
  const { person, socials } = content;
  const f = dict.footer;
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-3">
              <LogoMark className="size-9" />
              <div>
                <p className="font-display text-lg leading-tight font-semibold">{person.name}</p>
                <Wordmark className="text-sm text-muted" />
              </div>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {f.blurb}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-14 gap-y-2 text-sm">
            <p className="col-span-2 mb-1 font-mono text-xs tracking-widest text-muted uppercase sm:col-span-1">{f.sitemap}</p>
            <p className="hidden font-mono text-xs tracking-widest text-muted uppercase sm:block">{f.elsewhere}</p>
            <ul className="space-y-2">
              {sectionIds.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-muted transition-colors hover:text-fg">
                    {dict.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted transition-colors hover:text-fg">
                    {s.label}
                    <LuArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${person.email}`} className="inline-flex items-center gap-1 text-muted transition-colors hover:text-fg">
                  {f.email}
                  <LuArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-14 border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted sm:flex-row sm:px-6">
          <p>
            © 2026 {person.name}. {f.credits}
          </p>
          <a href="#top" className="group inline-flex items-center gap-1.5 font-mono hover:text-accent">
            {f.backToTop}
            <LuArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
