import { LuArrowUpRight, LuMapPin } from "react-icons/lu";

import { education, experience } from "@/content/profile";
import { OrgLogo } from "./org-logo";
import { SectionHeading } from "./section-heading";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-16 sm:py-24">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:linear-gradient(transparent,black_20%,black_80%,transparent)]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="experience-title"
          index="02"
          eyebrow="Experience"
          title="Shipping firmware by day, building a startup alongside."
          description="Professional embedded work, a company I co-founded, and the engineering degree behind both."
        />

        <ol className="relative space-y-6 pl-6 sm:pl-10">
          <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-line" />
          <span aria-hidden className="timeline-fill absolute inset-y-0 left-0 w-px origin-top bg-gradient-to-b from-accent via-accent to-copper shadow-[0_0_12px_var(--glow)]" />
          {experience.map((job) => (
            <li key={job.company} data-reveal className="relative">
              <span
                aria-hidden
                className="absolute top-7 -left-[31px] grid size-3.5 place-items-center rounded-full border-2 border-bg bg-accent ring-4 ring-accent-soft sm:-left-[47px]"
              />
              <article data-spot className="card lift p-6 sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    {job.logo ? <OrgLogo logo={job.logo} className="h-12 w-24 sm:h-14 sm:w-28" /> : null}
                    <div>
                    <h3 className="font-display text-xl font-semibold sm:text-2xl">{job.role}</h3>
                    <p className="mt-1 text-muted">
                      {job.href ? (
                        <a
                          href={job.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-fg underline decoration-line-strong underline-offset-4 hover:decoration-accent"
                        >
                          {job.company}
                          <LuArrowUpRight className="size-3.5" aria-hidden="true" />
                        </a>
                      ) : (
                        job.company
                      )}{" "}
                      · {job.location}
                    </p>
                    </div>
                  </div>
                  <p className="flex shrink-0 items-center gap-2 font-mono text-xs text-muted sm:text-sm">
                    {job.current ? (
                      <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] text-accent">Now</span>
                    ) : null}
                    {job.period}
                  </p>
                </div>
                {job.client ? (
                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-line bg-surface-2/60 px-4 py-3">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">On-site client</span>
                    <OrgLogo logo={job.client.logo} compact className="h-8 w-20" />
                    <a
                      href={job.client.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium underline decoration-line-strong underline-offset-4 hover:decoration-accent"
                    >
                      {job.client.name}
                      <LuArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                    <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                      <LuMapPin className="size-3.5 text-copper" aria-hidden="true" />
                      {job.client.site}
                    </span>
                  </div>
                ) : null}
                <p className="mt-5 leading-relaxed text-pretty text-muted">{job.summary}</p>
                <ul className="mt-4 space-y-2">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm leading-relaxed sm:text-[15px]">
                      <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Skills used">
                  {job.tags.map((t) => (
                    <li key={t} className="rounded-md bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}

          <li data-reveal className="relative">
            <span
              aria-hidden
              className="absolute top-7 -left-[31px] size-3.5 rounded-full border-2 border-bg bg-copper ring-4 ring-copper-soft sm:-left-[47px]"
            />
            <article data-spot className="card lift flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div className="flex gap-4">
                <OrgLogo logo={education.logo} className="size-12 sm:size-14" />
                <div>
                  <h3 className="font-display text-lg font-semibold sm:text-xl">{education.degree}</h3>
                  <p className="mt-1 text-sm text-muted">{education.school}</p>
                  <p className="mt-2 text-sm">Thesis: {education.thesis}</p>
                </div>
              </div>
              <p className="shrink-0 font-mono text-xs text-muted sm:text-sm">{education.period}</p>
            </article>
          </li>
        </ol>
      </div>
    </section>
  );
}
