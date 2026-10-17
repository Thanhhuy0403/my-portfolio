import type React from "react";
import { LuArrowUpRight, LuMail, LuMapPin, LuPhone } from "react-icons/lu";

import { getI18n } from "@/i18n/server";
import { SocialIcon } from "./brand-icons";
import { CopyEmail } from "./copy-email";

export async function Contact() {
  const { dict, content } = await getI18n();
  const { person, socials } = content;
  const c = dict.contact;
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal data-spot style={{ "--d": "0ms" } as React.CSSProperties} className="card relative isolate overflow-hidden px-6 pt-14 pb-10 sm:px-12 sm:pt-20 sm:pb-14">
          <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-70" />
          <div aria-hidden className="glow absolute -top-32 -right-24 -z-10 size-[30rem]" />

          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span className="text-muted">07</span>
            <span aria-hidden className="h-px w-8 bg-accent/50" />
            {c.eyebrow}
          </p>
          <h2 id="contact-title" className="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            {c.titleBefore} <span className="text-accent">{c.titleHighlight}</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg text-pretty text-muted">
            {c.body}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${person.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-bg transition-transform hover:-translate-y-0.5"
            >
              <LuMail className="size-4" aria-hidden="true" />
              {c.sayHello}
              <LuArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
            <CopyEmail email={person.email} labels={{ copy: c.copyEmail, copied: c.copied }} />
          </div>

          <dl className="mt-12 grid gap-6 border-t border-line pt-8 text-sm sm:grid-cols-2 lg:flex lg:gap-16">
            <div>
              <dt className="flex items-center gap-2 font-mono text-xs text-muted"><LuMail className="size-3.5" aria-hidden="true" /> {c.email}</dt>
              <dd className="mt-1.5 whitespace-nowrap">
                <a href={`mailto:${person.email}`} className="hover:text-accent">{person.email}</a>
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 font-mono text-xs text-muted"><LuPhone className="size-3.5" aria-hidden="true" /> {c.phone}</dt>
              <dd className="mt-1.5">
                <a href={person.phoneHref} className="hover:text-accent">{person.phone}</a>
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 font-mono text-xs text-muted"><LuMapPin className="size-3.5" aria-hidden="true" /> {c.basedIn}</dt>
              <dd className="mt-1.5">{c.basedInValue}</dd>
            </div>
          </dl>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label={c.socialProfiles}>
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  <SocialIcon name={s.icon} className="size-4" />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
