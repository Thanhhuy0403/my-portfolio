import * as icons from "simple-icons";

import { techMarquee } from "@/content/profile";

type SimpleIcon = { path: string; title: string };

function iconFor(slug: string): SimpleIcon | undefined {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}` as keyof typeof icons;
  return icons[key] as SimpleIcon | undefined;
}

function Row() {
  return (
    <ul className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16">
      {techMarquee.map((t) => {
        const icon = iconFor(t.icon);
        return (
          <li key={t.name} className="flex items-center gap-3 text-muted transition-colors duration-300 hover:text-fg">
            {icon ? (
              <svg viewBox="0 0 24 24" className="size-6 fill-current" aria-hidden="true">
                <path d={icon.path} />
              </svg>
            ) : null}
            <span className="font-display text-lg font-medium whitespace-nowrap">{t.name}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function TechMarquee() {
  return (
    <section aria-label="Technologies I work with" className="border-y border-line bg-surface/40 py-7">
      <div className="group/marquee flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex w-max">
          <Row />
          <div aria-hidden>
            <Row />
          </div>
        </div>
      </div>
    </section>
  );
}
