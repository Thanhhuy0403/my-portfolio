"use client";

import { LuMoon, LuSun } from "react-icons/lu";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked (private mode); the theme still applies for this visit.
    }
  }

  // Both icons are rendered and swapped with CSS, so server and client markup always match.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      <LuSun className="hidden size-[18px] dark:block" aria-hidden="true" />
      <LuMoon className="size-[18px] dark:hidden" aria-hidden="true" />
    </button>
  );
}
