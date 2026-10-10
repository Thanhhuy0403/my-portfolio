import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Download, MapPin } from "lucide-react";

import portrait from "@/assets/profile.jpg";
import { person, socials, stats } from "@/content/profile";
import { SocialIcon } from "./brand-icons";
import { EcgTrace } from "./ecg-trace";
import { RoleRotator } from "./role-rotator";

const ROLES = ["bare-metal drivers", "FreeRTOS firmware", "FPGA accelerators", "IoT systems"];

const BOOT = [
  { t: "0.000", tag: "boot", msg: "phan-thanh-huy v2026.10" },
  { t: "0.012", tag: "hw", msg: "STM32 · ESP32 · KV260 ok" },
  { t: "0.031", tag: "rtos", msg: "scheduler started" },
  { t: "0.058", tag: "fpga", msg: "CGRA ready · 16 PE" },
  { t: "0.074", tag: "net", msg: "open to collaborate ✓" },
];

const NAME = ["Phan", "Thanh", "Huy"];

function Letters() {
  let n = 0;
  return NAME.map((word, wi) => (
    <span key={word} className={`inline-block whitespace-nowrap ${wi === 2 ? "text-accent" : ""}`}>
      {word.split("").map((ch) => (
        <span key={n} className="animate-letter" style={{ animationDelay: `${120 + n++ * 38}ms` }}>
          {ch}
        </span>
      ))}
      {wi < 2 ? " " : null}
    </span>
  ));
}

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 sm:pt-36">
      {/* Background */}
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div aria-hidden className="glow absolute -top-48 left-1/2 -z-10 h-[42rem] w-[64rem] -translate-x-1/2" />
      <div aria-hidden className="absolute top-0 left-1/2 -z-10 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="mx-auto grid max-w-6xl items-center gap-20 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        <div>
          <p className="animate-rise inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-full border border-line bg-surface/70 py-1.5 pr-4 pl-1.5 text-xs text-muted shadow-sm backdrop-blur sm:text-sm">
            <span className="flex items-center gap-1.5 rounded-full bg-accent-soft px-2 py-0.5 font-medium text-accent">
              <span className="animate-pulse-dot size-1.5 rounded-full bg-accent" />
              Now
            </span>
            Embedded Software Engineer @ <span className="font-medium text-fg">Ban Vien</span>
            <span aria-hidden className="text-line-strong">/</span>
            Co-Founder <span className="font-medium text-fg">FTES</span>
          </p>

          <h1
            id="hero-title"
            className="mt-8 font-display text-[3.4rem] leading-[0.92] font-semibold tracking-[-0.035em] sm:text-7xl lg:text-[6.25rem]"
          >
            <span className="sr-only">
              {person.name} — {person.role}
            </span>
            <span aria-hidden>
              <Letters />
            </span>
          </h1>

          <p className="animate-rise mt-7 max-w-xl text-lg leading-relaxed text-pretty text-muted [animation-delay:450ms] sm:text-xl">
            <span className="sr-only">
              Embedded engineer building bare-metal drivers, FreeRTOS firmware, FPGA accelerators and IoT systems — close to the metal, from registers and RTOS tasks to edge AI.
            </span>
            <span aria-hidden>
              Embedded engineer building{" "}
              <RoleRotator words={ROLES} />
              <br />— close to the metal, from registers and RTOS tasks to edge AI.
            </span>
          </p>

          <div className="animate-rise mt-10 flex flex-wrap items-center gap-3 [animation-delay:560ms]">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-3.5 font-medium text-bg shadow-[0_10px_30px_-10px_var(--glow)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              View my work
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
            <a
              href={person.cv}
              download
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/60 px-6 py-3.5 font-medium backdrop-blur transition-colors hover:bg-surface"
            >
              <Download className="size-4" aria-hidden="true" />
              Download CV
            </a>
            <ul className="flex items-center gap-1 sm:ml-1" aria-label="Social profiles">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-11 place-items-center rounded-full text-muted transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface hover:text-fg"
                  >
                    <SocialIcon name={s.icon} className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <p className="animate-rise mt-8 flex items-center gap-2 font-mono text-xs text-muted [animation-delay:640ms]">
            <MapPin className="size-3.5 text-copper" aria-hidden="true" />
            {person.location}
          </p>
        </div>

        {/* Portrait mounted like a chip, with a live serial monitor */}
        <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm lg:mr-0">
          <div aria-hidden className="glow absolute -inset-12 -z-10" />
          <div aria-hidden className="absolute inset-y-12 -left-3 flex flex-col justify-between">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="h-[3px] w-3 rounded-l-sm bg-copper/70" />
            ))}
          </div>
          <div aria-hidden className="absolute inset-y-12 -right-3 flex flex-col justify-between">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="h-[3px] w-3 rounded-r-sm bg-copper/70" />
            ))}
          </div>

          <div className="relative rounded-[2rem] border border-line-strong bg-surface p-2.5 shadow-2xl shadow-black/25">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-surface-2">
              <Image
                src={portrait}
                alt="Portrait of Phan Thanh Huy"
                fill
                loading="eager"
                fetchPriority="high"
                placeholder="blur"
                sizes="(min-width: 640px) 384px, 304px"
                className="object-cover object-[50%_20%]"
              />
            </div>
            <div className="flex items-center justify-between px-2 pt-3 pb-1 font-mono text-[11px] text-muted">
              <span>U1 · PTH-2004</span>
              <span className="flex items-center gap-1.5">
                <span className="animate-pulse-dot size-1.5 rounded-full bg-accent" /> online
              </span>
            </div>
          </div>

          {/* Floating chips */}
          <span aria-hidden className="animate-float absolute -top-4 -left-4 rounded-xl border border-line bg-surface px-3 py-1.5 font-mono text-xs shadow-xl sm:-left-10">
            <span className="text-accent">#include</span> &lt;stm32f1xx.h&gt;
          </span>
          <span aria-hidden className="animate-float absolute top-1/3 -right-4 rounded-xl border border-line bg-surface px-3 py-1.5 font-mono text-xs shadow-xl [animation-delay:-2s] sm:-right-10">
            xTaskCreate<span className="text-copper">()</span>
          </span>

          {/* Serial monitor */}
          <div
            aria-hidden
            className="animate-float absolute -bottom-14 -left-3 w-[16.5rem] rounded-xl border border-white/10 bg-[#050a08] p-3 font-mono text-[10.5px] leading-[1.7] text-[#a9bcb1] shadow-2xl shadow-black/40 [animation-delay:-4s] sm:-left-16 sm:w-[19rem]"
          >
            <div className="mb-1.5 flex items-center justify-between text-[9.5px] text-[#6f8278]">
              <span>/dev/ttyUSB0 · 115200</span>
              <span className="text-[#3ee6a0]">● RX</span>
            </div>
            {BOOT.map((l, i) => (
              <p key={l.tag} className="animate-line truncate" style={{ animationDelay: `${0.8 + i * 0.28}s` } as CSSProperties}>
                <span className="text-[#7f948a]">[{l.t}]</span> <span className="text-[#f2b25c]">{l.tag}</span> {l.msg}
              </p>
            ))}
            <p className="text-[#3ee6a0]">
              $ <span className="animate-blink">▍</span>
            </p>
          </div>
        </div>
      </div>

      {/* Key numbers */}
      <div className="mx-auto mt-28 max-w-6xl px-4 sm:px-6">
        <dl data-reveal className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-surface/70 shadow-sm backdrop-blur lg:grid-cols-4">
          {stats.map((s, i) => {
            const num = s.value.replace(/[^\d.]/g, "");
            const suffix = s.value.replace(/[\d.]/g, "");
            return (
              <div
                key={s.label}
                className={`flex flex-col-reverse p-5 sm:p-7 ${i % 2 === 1 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
              >
                <dt className="mt-1.5 text-xs leading-snug text-muted sm:text-sm">{s.label}</dt>
                <dd className="font-display text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
                  <span data-count={num} data-suffix={suffix}>
                    {s.value}
                  </span>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>

      <div className="relative mt-10">
        <EcgTrace className="h-16 w-full opacity-70 sm:h-20" />
        <a
          href="#about"
          aria-label="Scroll to About"
          className="absolute top-1/2 left-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg text-muted transition-colors hover:text-accent"
        >
          <ArrowDown className="animate-float size-4 [animation-duration:2.4s]" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
