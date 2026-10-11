import type React from "react";
import type { IconType } from "react-icons";
import { LuArrowUpRight, LuGraduationCap, LuHandCoins, LuRocket, LuTrophy } from "react-icons/lu";

import { logos, startup, type Milestone } from "@/content/profile";
import { AwardGallery } from "./award-gallery";
import { OrgLogo } from "./org-logo";
import { SectionHeading } from "./section-heading";
import { SourceLink } from "./source-link";

const KIND: Record<Milestone["kind"], { icon: IconType; tone: string }> = {
  funding: { icon: LuHandCoins, tone: "bg-copper-soft text-copper" },
  award: { icon: LuTrophy, tone: "bg-accent-soft text-accent" },
  program: { icon: LuRocket, tone: "bg-accent-soft text-accent" },
  scholarship: { icon: LuGraduationCap, tone: "bg-copper-soft text-copper" },
};

function MilestoneCard({ m, delay }: { m: Milestone; delay: number }) {
  const { icon: Icon, tone } = KIND[m.kind];
  return (
    <article
      data-reveal
      data-spot
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
      className="card lift flex flex-col overflow-hidden"
    >
      {m.photo ? <AwardGallery images={[m.photo]} title={m.title} /> : null}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          {m.logo ? (
            <OrgLogo logo={m.logo} compact className="h-10 w-16" />
          ) : (
            <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${tone}`}>
              <Icon className="size-5" aria-hidden="true" />
            </span>
          )}
          <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide">
            {m.badge}
          </span>
          <span className="ml-auto font-mono text-xs text-muted">{m.date}</span>
        </div>
        <h3 className="mt-5 font-display text-lg leading-snug font-semibold text-balance">{m.title}</h3>
        <p className="mt-1 text-sm text-muted">{m.org}</p>
        <p className="mt-3 text-sm leading-relaxed text-pretty">{m.description}</p>
        <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 pt-5" aria-label="Sources">
          {m.sources.map((s) => (
            <li key={s.href}>
              <SourceLink {...s} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function Startup() {
  return (
    <section id="startup" aria-labelledby="startup-title" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="startup-title"
          index="03"
          eyebrow="Startup"
          title="Building FTES, AI learning for tech learners."
          description="The company I co-founded and lead technically — from first users to funding and national recognition in its first year."
        />

        {/* Overview */}
        <div
          data-reveal
          data-spot
          className="card grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:p-10"
        >
          <div>
            <div className="flex items-center gap-4">
              <OrgLogo logo={logos.ftes} className="h-14 w-28" />
              <div>
                <p className="font-display text-2xl font-semibold">{startup.name}</p>
                <p className="text-sm text-muted">{startup.tagline}</p>
              </div>
            </div>
            <p className="mt-6 leading-relaxed text-pretty text-muted">{startup.summary}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-copper-soft px-3 py-1 text-xs font-medium text-copper">{startup.role}</span>
              <a
                href={startup.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent"
              >
                Visit ftes.vn
                <LuArrowUpRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          <div>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {startup.metrics.map((m) => (
                <div key={m.label} className="flex flex-col-reverse bg-surface p-5">
                  <dt className="mt-1 text-xs leading-snug text-muted">{m.label}</dt>
                  <dd className="font-display text-3xl font-semibold tracking-tight tabular-nums">{m.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-right text-[11px] text-muted">
              Learners &amp; revenue:{" "}
              <a
                href={startup.metricsSource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-line-strong underline-offset-4 hover:text-accent"
              >
                {startup.metricsSource.label}
              </a>
            </p>
          </div>
        </div>

        {/* Milestones */}
        <h3 className="mt-14 mb-6 font-mono text-xs tracking-[0.2em] text-muted uppercase">Milestones · 2025</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {startup.milestones.map((m, i) => (
            <MilestoneCard key={m.title} m={m} delay={(i % 3) * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
