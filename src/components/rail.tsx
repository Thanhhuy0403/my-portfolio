"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import { fill } from "@/i18n/format";

export type RailLabels = { previous: string; next: string; goTo: string };

/**
 * Phones: a swipeable, snap-aligned row of cards with the next card peeking in, plus a pager
 * (counter, progress dots, prev/next) so the row is discoverable without a swipe.
 * From `sm` up the same children lay out as the grid given in `grid` (pass `sm:`/`lg:` classes).
 * Native scrolling keeps momentum, rubber-banding and accessibility; nothing is hidden on mobile.
 */
export function Rail({
  children,
  label,
  labels,
  grid,
  wide = false,
}: {
  children: ReactNode;
  label: string;
  labels: RailLabels;
  /** Desktop layout, e.g. "sm:grid-cols-2 lg:grid-cols-3 sm:gap-4". */
  grid: string;
  /** Wider slides (less peek) for content-heavy cards. */
  wide?: boolean;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  const slides = () => Array.from(scroller.current?.children ?? []) as HTMLElement[];

  // Track the slide closest to the left edge while the user swipes.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const items = slides();
      if (items.length === 0) return;
      const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
      // At the end of the row the last slide cannot reach the left edge, so treat "fully scrolled" as last.
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
        setActive(items.length - 1);
        return;
      }
      let best = 0;
      let bestDist = Infinity;
      items.forEach((item, i) => {
        const dist = Math.abs(item.offsetLeft - pad - el.scrollLeft);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = useCallback((index: number) => {
    const el = scroller.current;
    const item = slides()[index];
    if (!el || !item) return;
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: item.offsetLeft - pad, behavior: reduced ? "auto" : "smooth" });
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div role="group" aria-label={label}>
      <div
        ref={scroller}
        data-rail
        className={`relative -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto overscroll-x-contain px-4 pt-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden *:shrink-0 *:snap-start ${
          wide ? "*:w-[90%]" : "*:w-[84%]"
        } sm:mx-0 sm:grid sm:snap-none sm:overflow-visible sm:p-0 sm:*:w-auto ${grid}`}
      >
        {children}
      </div>

      {count > 1 ? (
        <div className="mt-4 flex items-center gap-3 sm:hidden">
          <p className="font-mono text-xs text-muted tabular-nums" aria-live="polite">
            <span className="text-fg">{pad(active + 1)}</span> / {pad(count)}
          </p>
          <div className="flex flex-1 items-center gap-1.5">
            {Array.from({ length: count }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={fill(labels.goTo, { n: i + 1, total: count })}
                aria-current={i === active ? "true" : undefined}
                // 24px tall hit area around a 4px bar.
                className="group grid h-6 place-items-center"
              >
                <span
                  className={`block h-1 rounded-full transition-all duration-300 ease-out-expo ${
                    i === active ? "w-6 bg-accent" : "w-2.5 bg-line-strong group-active:bg-muted"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => goTo(Math.max(0, active - 1))}
              disabled={active === 0}
              aria-label={labels.previous}
              className="grid size-10 place-items-center rounded-full border border-line text-fg transition-colors active:bg-surface-2 disabled:opacity-35"
            >
              <LuChevronLeft className="size-[18px]" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => goTo(Math.min(count - 1, active + 1))}
              disabled={active === count - 1}
              aria-label={labels.next}
              className="grid size-10 place-items-center rounded-full border border-line text-fg transition-colors active:bg-surface-2 disabled:opacity-35"
            >
              <LuChevronRight className="size-[18px]" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
