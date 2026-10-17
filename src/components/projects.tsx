import Image from "next/image";
import { LuArrowUpRight } from "react-icons/lu";
import { SiGithub } from "react-icons/si";

import type { Project } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { fill } from "@/i18n/format";
import { getI18n } from "@/i18n/server";
import { ProjectVisual } from "./project-visuals";
import { Rail } from "./rail";
import { SectionHeading } from "./section-heading";

function CaseStudy({ project, index, t }: { project: Project; index: number; t: Dictionary["projects"] }) {
  const flip = index % 2 === 1;
  return (
    <article
      aria-labelledby={`p-${project.slug}`}
      className="grid items-center gap-8 max-sm:content-start max-sm:gap-6 max-sm:rounded-[1.75rem] max-sm:border max-sm:border-line max-sm:bg-surface/60 max-sm:p-2.5 max-sm:pb-6 lg:grid-cols-12 lg:gap-14"
    >
      {/* Visual */}
      <div data-reveal="scale" className={`group relative lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <div aria-hidden className="glow absolute -z-10 opacity-70 max-sm:hidden sm:-inset-10" />
        <div className="bg-dots relative overflow-hidden rounded-[1.75rem] border border-line bg-surface-2/60 p-3 max-sm:rounded-[1.4rem] sm:p-7 [perspective:1600px]">
          <div
            className={`aspect-[16/11] transition-transform duration-700 ease-out-expo will-change-transform sm:aspect-[16/10] lg:[transform:rotateX(6deg)_rotateY(var(--ry))] lg:group-hover:[transform:none] ${flip ? "[--ry:6deg]" : "[--ry:-6deg]"}`}
          >
            {project.photo ? (
              <div className="relative h-full overflow-hidden rounded-xl border border-line-strong shadow-2xl shadow-black/25">
                <Image
                  src={project.photo.src}
                  alt={project.photo.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <ProjectVisual slug={project.slug} />
            )}
          </div>
          <span className="absolute top-4 right-4 grid size-12 place-items-center rounded-full bg-accent font-display text-base font-bold text-bg shadow-lg shadow-black/20 sm:top-5 sm:right-5">
            {project.grade}
            <span className="sr-only"> {t.grade}</span>
          </span>
        </div>
        {project.photo ? null : (
          <p className="mt-3 text-center font-mono text-[11px] text-muted">
            {t.caption}
          </p>
        )}
      </div>

      {/* Copy */}
      <div data-reveal className={`max-sm:px-2.5 lg:col-span-5 ${flip ? "lg:order-1" : ""}`} style={{ "--d": "120ms" } as React.CSSProperties}>
        <div className="flex items-center gap-3 font-mono text-xs text-muted">
          <span className="text-accent">0{index + 1}</span>
          <span aria-hidden className="h-px w-6 bg-line-strong" />
          <span>{project.kind}</span>
          <span aria-hidden>·</span>
          <span>{project.period}</span>
        </div>
        <h3 id={`p-${project.slug}`} className="mt-4 font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-4 leading-relaxed text-pretty text-muted">{project.summary}</p>

        <dl className="mt-6 grid grid-cols-2 gap-2">
          {project.specs.map((s) => (
            <div key={`${s.label}-${s.value}`} className="rounded-xl border border-line bg-surface px-3.5 py-2.5">
              <dt className="font-mono text-[10px] tracking-wider text-muted uppercase">{s.label}</dt>
              <dd className="mt-0.5 text-sm font-medium">{s.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 space-y-2.5">
          {project.points.map((p) => (
            <li key={p} className="flex gap-3 text-sm leading-relaxed">
              <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rotate-45 bg-copper" />
              {p}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-4">
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-transform duration-300 hover:-translate-y-0.5"
          >
            <SiGithub className="size-4" aria-hidden="true" />
            {t.viewSource}
            <span className="sr-only"> {fill(t.viewSourceSr, { title: project.title })}</span>
            <LuArrowUpRight className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden="true" />
          </a>
          <ul className="flex flex-wrap gap-1.5" aria-label={t.techStack}>
            {project.stack.slice(0, 5).map((s) => (
              <li key={s} className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export async function Projects() {
  const { dict, content } = await getI18n();
  const t = dict.projects;
  return (
    <section id="projects" aria-labelledby="projects-title" className="overflow-x-clip py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="projects-title"
          index="04"
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
        />
        <Rail label={t.eyebrow} labels={dict.carousel} wide grid="sm:gap-24 lg:gap-32">
          {content.projects.map((p, i) => (
            <CaseStudy key={p.slug} project={p} index={i} t={t} />
          ))}
        </Rail>
      </div>
    </section>
  );
}
