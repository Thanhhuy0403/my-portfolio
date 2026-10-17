import type { StaticImageData } from "next/image";

import type { Locale } from "./config";

/**
 * A string in every supported language. Content keeps its translations next to the source text
 * (see src/content/profile.ts), so one edit updates all three versions of the site.
 */
export type L = { readonly __l: true; en: string; vi: string; ja: string };

export const t = (en: string, vi: string, ja: string): L => ({ __l: true, en, vi, ja });

/** The shape of `T` after every `L` has been replaced by the string for one locale. */
export type Resolved<T> = T extends L
  ? string
  : T extends StaticImageData
    ? T
    : T extends readonly (infer U)[]
      ? Resolved<U>[]
      : T extends object
        ? { [K in keyof T]: Resolved<T[K]> }
        : T;

const isL = (value: unknown): value is L =>
  typeof value === "object" && value !== null && (value as { __l?: unknown }).__l === true;

/** Deep-resolves every `L` in `data` to `locale`, leaving other values (images, numbers, URLs) untouched. */
export function resolve<T>(data: T, locale: Locale): Resolved<T> {
  if (isL(data)) return data[locale] as Resolved<T>;
  if (Array.isArray(data)) return data.map((item) => resolve(item, locale)) as Resolved<T>;
  if (data && typeof data === "object" && Object.getPrototypeOf(data) === Object.prototype) {
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) out[key] = resolve(value, locale);
    return out as Resolved<T>;
  }
  return data as Resolved<T>;
}
