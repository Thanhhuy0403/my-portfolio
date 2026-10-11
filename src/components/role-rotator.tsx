"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const INTERVAL = 2600;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Rotating keyword: the outgoing word slides up and fades, the next one rises in from below,
 * and the slot eases its width to fit each word — so the sentence never jumps or leaves a gap.
 * Only the active word is in normal flow (it sets the baseline and the server-rendered width);
 * the others are absolutely stacked on top of it. clip-path trims the motion without shifting
 * the inline baseline the way overflow:hidden would.
 */
export function RoleRotator({ words }: { words: string[] }) {
  const [{ index, prev }, setState] = useState<{ index: number; prev: number | null }>({ index: 0, prev: null });
  const [width, setWidth] = useState<number>();
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const root = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (root.current) io.observe(root.current);

    const id = window.setInterval(() => {
      if (!visible || document.hidden) return;
      setState((s) => ({ index: (s.index + 1) % words.length, prev: s.index }));
    }, INTERVAL);
    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, [words.length]);

  // Measure before paint so the slot width animates in the same frame as the words.
  useLayoutEffect(() => {
    const el = refs.current[index];
    if (el) setWidth(el.offsetWidth);
  }, [index]);

  return (
    <span
      ref={root}
      className="relative inline-block align-baseline whitespace-nowrap [clip-path:inset(-0.1em_-0.4em_-0.3em_-0.4em)]"
      style={{ width, transition: `width 700ms ${EASE}` }}
    >
      {words.map((w, k) => {
        const state = k === index ? "in" : k === prev ? "out" : "wait";
        return (
          <span
            key={w}
            ref={(el) => {
              refs.current[k] = el;
            }}
            aria-hidden={state !== "in"}
            className={`${state === "in" ? "relative" : "absolute top-0 left-0"} inline-block bg-gradient-to-r from-accent to-copper bg-clip-text font-medium text-transparent will-change-transform`}
            style={{
              transform: state === "in" ? "translateY(0)" : state === "out" ? "translateY(-90%)" : "translateY(90%)",
              opacity: state === "in" ? 1 : 0,
              // Waiting words snap below without animating, so the next one always enters from underneath.
              // Delay lives inside the shorthand: mixing `transition` with `transitionDelay` makes React warn.
              transition:
                state === "wait"
                  ? "none"
                  : `transform 900ms ${EASE} ${state === "in" ? "90ms" : "0ms"}, opacity 600ms ${EASE} ${state === "in" ? "90ms" : "0ms"}`,
            }}
          >
            {w}
          </span>
        );
      })}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-[0.12em] h-px bg-gradient-to-r from-accent/80 via-accent/30 to-transparent"
      />
    </span>
  );
}
