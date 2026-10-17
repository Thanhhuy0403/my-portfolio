/**
 * Supported languages. English is the default and lives at "/" so existing links keep working;
 * the others live under "/vi" and "/ja". Routing rules for this live in next.config.ts.
 */
export const locales = ["en", "vi", "ja"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Cookie that remembers the visitor's explicit choice (read by the redirects in next.config.ts). */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** Public URL path of a locale's home page. */
export const localePath = (locale: Locale) => (locale === defaultLocale ? "/" : `/${locale}`);

export const localeMeta: Record<Locale, { name: string; short: string; ogLocale: string }> = {
  en: { name: "English", short: "EN", ogLocale: "en_US" },
  vi: { name: "Tiếng Việt", short: "VI", ogLocale: "vi_VN" },
  ja: { name: "日本語", short: "JA", ogLocale: "ja_JP" },
};
