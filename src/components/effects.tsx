"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";

/**
 * One client island that powers every ambient effect on the page:
 *  - Lenis smooth scrolling (skipped for reduced-motion users)
 *  - [data-reveal] enter animations driven by a single IntersectionObserver
 *  - [data-count] number count-up
 *  - [data-spot] pointer-tracking spotlight (sets --mx / --my)
 *  - the reading-progress bar (transform written straight to the element)
 *  - [data-offscreen] on sections out of view, which pauses their looping animations
 *  - "scroll-lock" window events (detail: boolean) so overlays can pause smooth scrolling
 * Progressive: reveal styles only apply once the inline head script sets html[data-js], so no-JS visitors see everything.
 */
export function Effects() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- Smooth scroll (started when the browser is idle so it never delays first paint) ----
    let lenis: Lenis | null = null;
    let raf = 0;
    let disposed = false;
    const startLenis = async () => {
      // Loaded on demand so it stays out of the initial bundle.
      const { default: LenisCtor } = await import("lenis");
      if (disposed) return;
      lenis = new LenisCtor({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        anchors: true, // honours html { scroll-padding-top } for the fixed header
        autoRaf: false,
      });
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
    const idleId = reduced ? 0 : idle(() => void startLenis());

    // ---- Overlays (lightbox, mobile menu) lock the page behind them ----
    const onLock = (e: Event) => {
      const locked = (e as CustomEvent<boolean>).detail;
      if (locked) lenis?.stop();
      else lenis?.start();
    };
    window.addEventListener("scroll-lock", onLock);

    // ---- Ambient loops start only after the page has loaded, keeping the first paint cheap ----
    const markLoaded = () => idle(() => (root.dataset.loaded = ""));
    if (document.readyState === "complete") markLoaded();
    else window.addEventListener("load", markLoaded, { once: true });

    // ---- Scroll progress (reads layout only on scroll, never during hydration) ----
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = root.scrollHeight - window.innerHeight;
        if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ---- Count-up ----
    const countUp = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.count ?? "0");
      const decimals = (el.dataset.count ?? "").split(".")[1]?.length ?? 0;
      const suffix = el.dataset.suffix ?? "";
      if (reduced) {
        el.textContent = target.toFixed(decimals) + suffix;
        return;
      }
      const start = performance.now();
      const dur = 1400;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    // ---- Reveal ----
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.dataset.shown = "true";
          if (el.dataset.count !== undefined) countUp(el);
          el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    // ---- Pause looping animations of off-screen sections ----
    const visibility = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) delete el.dataset.offscreen;
        else el.dataset.offscreen = "";
      }
    });
    document.querySelectorAll("main > section, footer").forEach((el) => visibility.observe(el));

    // ---- Spotlight ----
    const onPointer = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-spot]");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      disposed = true;
      if (idleId) (window.cancelIdleCallback ?? window.clearTimeout)(idleId);
      window.removeEventListener("load", markLoaded);
      window.removeEventListener("scroll-lock", onLock);
      cancelAnimationFrame(raf);
      lenis?.destroy();
      io.disconnect();
      visibility.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div
      ref={bar}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left scale-x-0 bg-gradient-to-r from-accent via-accent to-copper"
    />
  );
}
