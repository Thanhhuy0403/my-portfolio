import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { cache } from "react";

import { contentFor } from "@/content/profile";
import { isLocale, type Locale } from "./config";
import { en, type Dictionary } from "./dictionaries/en";
import { ja } from "./dictionaries/ja";
import { vi } from "./dictionaries/vi";

const dictionaries: Record<Locale, Dictionary> = { en, vi, ja };

/**
 * The locale of the current route, read from the `[lang]` root segment via next/root-params,
 * so Server Components don't need `lang` passed down. Unknown values render the 404 page.
 */
export const getLocale = cache(async (): Promise<Locale> => {
  const value = await lang();
  if (!isLocale(value)) notFound();
  return value;
});

export async function getDictionary() {
  return dictionaries[await getLocale()];
}

export async function getContent() {
  return contentFor(await getLocale());
}

/** Dictionary, content and locale in one call — what most section components need. */
export async function getI18n() {
  const locale = await getLocale();
  return { locale, dict: dictionaries[locale], content: contentFor(locale) };
}

export { dictionaries };
