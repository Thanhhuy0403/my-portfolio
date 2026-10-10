"use client";

import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";

import { nav, person } from "@/content/profile";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Scroll-spy: highlight the section currently in the middle band of the viewport.
  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));

    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      // Hide while reading downwards, reveal as soon as the user scrolls up.
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 480);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("scroll-lock", { detail: true }));
    return () => {
      window.dispatchEvent(new CustomEvent("scroll-lock", { detail: false }));
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,transform] duration-500 ease-out-expo ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled || open
          ? "border-b border-line bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight"
        >
          <span className="sr-only">{person.name} — back to top: </span>
          <span className="relative grid size-8 place-items-center rounded-md border border-accent/40 bg-accent-soft text-[11px] text-accent">
            {person.initials}
            {/* chip pins */}
            <span aria-hidden className="absolute -left-[5px] top-1.5 h-[2px] w-1 bg-accent/60 shadow-[0_6px_0_var(--accent),0_12px_0_var(--accent)] opacity-70" />
            <span aria-hidden className="absolute -right-[5px] top-1.5 h-[2px] w-1 bg-accent/60 shadow-[0_6px_0_var(--accent),0_12px_0_var(--accent)] opacity-70" />
          </span>
          <span className="hidden sm:inline">
            thanhhuy<span className="text-accent">.dev</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-surface/60 p-1 backdrop-blur">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`block rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    active === item.id
                      ? "bg-accent-soft text-accent"
                      : "text-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={person.cv}
            download
            className="hidden items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85 sm:inline-flex"
          >
            <Download className="size-4" aria-hidden="true" />
            Resume
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        data-lenis-prevent
        aria-label="Mobile"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg px-4 pb-10 pt-4 md:hidden"
      >
        <ul className="flex flex-col">
          {nav.map((item, i) => (
            <li key={item.id} className="border-b border-line">
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-4 font-display text-2xl font-medium"
              >
                {item.label}
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <a
          href={person.cv}
          download
          className="mt-8 flex items-center justify-center gap-2 rounded-full bg-fg px-5 py-3 font-medium text-bg"
        >
          <Download className="size-4" aria-hidden="true" />
          Download resume
        </a>
      </nav>
    </header>
  );
}
