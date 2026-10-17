import type React from "react";
import { LuGraduationCap, LuLanguages } from "react-icons/lu";

import { getI18n } from "@/i18n/server";
import { OrgLogo } from "./org-logo";
import { SectionHeading } from "./section-heading";

export async function About() {
  const { dict, content } = await getI18n();
  const { education, logos, overview, person } = content;
  const a = dict.about;
  return (
    <section id="about" aria-labelledby="about-title" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="about-title"
          index="01"
          eyebrow={a.eyebrow}
          title={a.title}
          description={a.description}
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Overview */}
          <article data-reveal data-spot style={{ "--d": "0ms" } as React.CSSProperties} className="card p-6 sm:p-8 lg:col-span-2 lg:row-span-2">
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{a.overview}</h3>
            <p className="mt-4 font-display text-xl leading-snug text-pretty sm:text-2xl">
              {a.introBefore ? <>{a.introBefore} </> : null}
              <span className="text-accent">{person.shortName}</span>
              {a.introAfter}
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {overview.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 rounded-xl border border-line bg-surface-2/60 p-4 text-sm leading-relaxed text-muted"
                >
                  <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  {line}
                </li>
              ))}
            </ul>
          </article>

          {/* Currently */}
          <article data-reveal data-spot style={{ "--d": "80ms" } as React.CSSProperties} className="card p-6 sm:p-7">
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{a.currently}</h3>
            <ul className="mt-5 space-y-5">
              <li className="flex items-center gap-4">
                <OrgLogo logo={logos.banvien} className="h-10 w-[4.5rem]" />
                <div className="min-w-0">
                  <p className="font-medium">{person.role}</p>
                  <p className="text-sm text-muted">{a.banvienLine}</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <OrgLogo logo={logos.ftes} className="h-10 w-[4.5rem]" />
                <div className="min-w-0">
                  <p className="font-medium">{content.startup.role}</p>
                  <p className="text-sm text-muted">{a.ftesLine}</p>
                </div>
              </li>
            </ul>
          </article>

          {/* Education */}
          <article data-reveal data-spot style={{ "--d": "160ms" } as React.CSSProperties} className="card p-6 sm:p-7">
            <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              <LuGraduationCap className="size-4" aria-hidden="true" /> {a.education}
            </h3>
            <div className="mt-4 flex items-start gap-3">
              <OrgLogo logo={education.logo} className="size-11" />
              <div className="min-w-0">
                <p className="font-medium leading-snug">{education.school}</p>
                <p className="mt-1 text-sm text-muted">{education.degree}</p>
              </div>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-surface-2 p-3">
                <dt className="text-xs text-muted">{a.period}</dt>
                <dd className="mt-0.5 font-mono text-[13px]">{education.period}</dd>
              </div>
              <div className="rounded-xl bg-surface-2 p-3">
                <dt className="text-xs text-muted">{a.gpa}</dt>
                <dd className="mt-0.5 font-mono text-[13px]">{education.gpa}</dd>
              </div>
            </dl>
          </article>

          {/* Code card */}
          <article data-reveal data-spot style={{ "--d": "240ms" } as React.CSSProperties} className="card overflow-hidden lg:col-span-2" aria-label={a.codeSample}>
            <div className="flex items-center gap-2 border-b border-line px-5 py-3">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-muted">main.c — STM32F103</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6 sm:p-6 sm:text-sm">
              <code>
                <span className="text-muted">{"/* toggle the status LED from a timer ISR */"}</span>
                {"\n"}
                <span className="text-copper">#define</span> GPIOC_ODR (*(<span className="text-accent">volatile</span> uint32_t *)0x4001100C)
                {"\n\n"}
                <span className="text-accent">void</span> <span className="text-copper">TIM2_IRQHandler</span>(<span className="text-accent">void</span>) {"{"}
                {"\n"}  TIM2-&gt;SR &amp;= ~TIM_SR_UIF;   <span className="text-muted">{"// clear update flag"}</span>
                {"\n"}  GPIOC_ODR ^= (1U &lt;&lt; 13);    <span className="text-muted">{"// PC13 heartbeat"}</span>
                {"\n"}
                {"}"}
              </code>
            </pre>
          </article>

          {/* Interests + language */}
          <article data-reveal data-spot style={{ "--d": "320ms" } as React.CSSProperties} className="card p-6 sm:p-7">
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{a.focus}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {a.interests.map((i) => (
                <li key={i} className="rounded-full border border-line px-3 py-1 text-sm">
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-center gap-2 text-sm text-muted">
              <LuLanguages className="size-4 text-copper" aria-hidden="true" />
              {a.languages} — {person.toeic}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
