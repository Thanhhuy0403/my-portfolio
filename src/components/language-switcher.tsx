"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { LuCheck, LuChevronDown, LuLanguages } from "react-icons/lu";

import { LOCALE_COOKIE, localeMeta, localePath, locales, type Locale } from "@/i18n/config";

/** Remembers an explicit choice for a year; next.config.ts redirects "/" to it on later visits. */
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * Language menu next to the theme toggle (WAI-ARIA menu-button pattern).
 * Options are real links (/, /vi, /ja), so it still works without JavaScript; with JS it also
 * keeps the current section (#hash) and remembers the choice in a cookie for later visits to "/".
 */
export function LanguageSwitcher({
  locale,
  labels,
}: {
  locale: Locale;
  labels: { language: string; changeLanguage: string };
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const items = useRef<(HTMLAnchorElement | null)[]>([]);
  /** Item to focus once the menu has rendered visible (hidden elements cannot take focus). */
  const pendingFocus = useRef<number | null>(null);
  const menuId = useId();

  const focusItem = (index: number) => {
    const i = (index + locales.length) % locales.length;
    items.current[i]?.focus();
  };

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  // Move focus into the menu after the open state has been committed.
  useEffect(() => {
    if (open && pendingFocus.current !== null) {
      focusItem(pendingFocus.current);
      pendingFocus.current = null;
    }
  }, [open]);

  // Close on outside pointer down.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!menuRef.current?.contains(target) && !buttonRef.current?.contains(target)) close(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open, close]);

  const openAndFocus = (index: number) => {
    if (open) {
      focusItem(index);
      return;
    }
    pendingFocus.current = index;
    setOpen(true);
  };

  const onButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openAndFocus(locales.indexOf(locale));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      openAndFocus(locales.length - 1);
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      close(true);
    }
  };

  const onMenuKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    const current = items.current.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusItem(current + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusItem(current - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusItem(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusItem(locales.length - 1);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close(true);
    } else if (e.key === "Tab") {
      close(false);
    }
  };

  const choose = (e: MouseEvent<HTMLAnchorElement>, next: Locale) => {
    e.preventDefault();
    rememberLocale(next);
    if (next === locale) {
      close(true);
      return;
    }
    // Stay on the same section in the new language.
    window.location.assign(localePath(next) + window.location.hash);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${labels.changeLanguage} — ${localeMeta[locale].name}`}
        onClick={() => (open ? close(false) : setOpen(true))}
        onKeyDown={onButtonKeyDown}
        className={`flex h-10 items-center gap-1.5 rounded-full border px-3 text-sm transition-colors ${
          open ? "border-line-strong text-fg" : "border-line text-muted hover:border-line-strong hover:text-fg"
        }`}
      >
        <LuLanguages className="size-[17px]" aria-hidden="true" />
        <span className="font-mono text-xs font-medium tracking-wide">{localeMeta[locale].short}</span>
        <LuChevronDown
          className={`size-3.5 transition-transform duration-300 ease-out-expo ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <ul
        ref={menuRef}
        id={menuId}
        role="menu"
        aria-label={labels.language}
        onKeyDown={onMenuKeyDown}
        // Visibility flips instantly on open (so focus can move in before the first frame) and only
        // after the fade-out on close; opacity/scale carry the animation.
        className={`absolute top-full right-0 z-50 mt-2 w-52 origin-top-right rounded-2xl border border-line bg-surface p-1.5 shadow-2xl shadow-black/30 ${
          open
            ? "visible scale-100 opacity-100 [transition:opacity_200ms_var(--ease-out),transform_200ms_var(--ease-out),visibility_0s]"
            : "invisible scale-95 opacity-0 [transition:opacity_150ms_ease-in,transform_150ms_ease-in,visibility_0s_linear_150ms]"
        }`}
      >
        {locales.map((l, i) => {
          const active = l === locale;
          return (
            <li key={l} role="none">
              <a
                ref={(el) => {
                  items.current[i] = el;
                }}
                role="menuitemradio"
                aria-checked={active}
                href={localePath(l)}
                hrefLang={l}
                lang={l}
                tabIndex={open ? 0 : -1}
                onClick={(e) => choose(e, l)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm outline-none transition-colors focus-visible:bg-surface-2 ${
                  active ? "text-fg" : "text-muted hover:bg-surface-2 hover:text-fg"
                }`}
              >
                <span
                  className={`grid h-6 w-8 place-items-center rounded-md font-mono text-[10px] font-semibold tracking-wide ${
                    active ? "bg-accent-soft text-accent" : "bg-surface-2 text-muted"
                  }`}
                >
                  {localeMeta[l].short}
                </span>
                <span className="flex-1">{localeMeta[l].name}</span>
                {active ? <LuCheck className="size-4 text-accent" aria-hidden="true" /> : null}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
