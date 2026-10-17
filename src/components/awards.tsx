import type React from "react";
import { LuCalendarDays, LuTrophy, LuUsers } from "react-icons/lu";

import type { Award } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { fill } from "@/i18n/format";
import { getI18n } from "@/i18n/server";
import { AwardGallery } from "./award-gallery";
import { OrgLogo } from "./org-logo";
import { SectionHeading } from "./section-heading";
import { SourceLink } from "./source-link";

function NoPhoto({ award }: { award: Award }) {
  return (
    <div className="bg-grid relative grid aspect-[4/3] place-items-center overflow-hidden bg-surface-2">
      <div aria-hidden className="glow absolute inset-0" />
      <div className="relative flex flex-col items-center gap-3 text-center">
        <span className="grid size-16 place-items-center rounded-2xl border border-accent/40 bg-accent-soft text-accent">
          <LuTrophy className="size-8" aria-hidden="true" />
        </span>
        <span className="font-mono text-xs tracking-widest text-muted uppercase">{award.prize}</span>
      </div>
    </div>
  );
}

function AwardCard({
  award,
  tall,
  delay = 0,
  dict,
}: {
  award: Award;
  tall?: boolean;
  delay?: number;
  dict: Dictionary;
}) {
  return (
    <article
      data-reveal
      data-spot
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
      className={`card lift flex flex-col overflow-hidden ${tall ? "lg:row-span-2" : ""}`}
    >
      {award.images.length > 0 ? (
        <div className={tall ? "lg:flex-1" : ""}>
          <AwardGallery images={award.images} title={award.title} tall={tall} labels={dict.gallery} />
        </div>
      ) : (
        <NoPhoto award={award} />
      )}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p
          className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
            award.highlight ? "bg-copper text-bg" : "bg-copper-soft text-copper"
          }`}
        >
          <LuTrophy className="size-3.5" aria-hidden="true" />
          {award.prize}
        </p>
        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-balance sm:text-xl">
          {award.title}
        </h3>
        <div className="mt-2 flex items-center gap-2.5">
          {award.logos?.map((l) => (
            <OrgLogo key={l.alt} logo={l} compact className="h-9 w-[4.5rem]" />
          ))}
          <p className="min-w-0 text-sm text-muted">{award.org}</p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-pretty">{award.description}</p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <LuCalendarDays className="size-3.5" aria-hidden="true" />
            {award.date}
          </span>
          {award.team ? (
            <span className="inline-flex items-center gap-1.5">
              <LuUsers className="size-3.5" aria-hidden="true" />
              {award.team}
            </span>
          ) : null}
        </div>
        {award.links.length > 0 ? (
          // mt-auto pins the links to the card bottom; pt-4 keeps a minimum gap above the divider.
          <div className="mt-auto pt-4">
            <ul className="flex flex-wrap gap-x-4 gap-y-1.5 border-t border-line pt-4" aria-label={fill(dict.awards.learnMore, { title: award.title })}>
              {award.links.map((l) => (
                <li key={l.href}>
                  <SourceLink {...l} newTabLabel={dict.opensInNewTab} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export async function Awards() {
  const { dict, content } = await getI18n();
  const t = dict.awards;
  return (
    <section id="awards" aria-labelledby="awards-title" className="relative py-16 sm:py-24">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:linear-gradient(transparent,black_20%,black_80%,transparent)]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="awards-title"
          index="05"
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.awards.map((a, i) => (
            <AwardCard key={a.title} award={a} tall={i === 0} delay={(i % 3) * 90} dict={dict} />
          ))}
        </div>
      </div>
    </section>
  );
}
