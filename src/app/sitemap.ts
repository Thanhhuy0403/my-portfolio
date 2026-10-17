import type { MetadataRoute } from "next";

import { contentFor } from "@/content/profile";
import { localePath, locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const { url } = contentFor("en").site;
  const href = (path: string) => (path === "/" ? url : `${url}${path}`);
  // One entry per language, each listing all three as alternates (hreflang in the sitemap).
  const languages = Object.fromEntries(locales.map((l) => [l, href(localePath(l))]));
  return locales.map((l) => ({
    url: href(localePath(l)),
    lastModified: "2026-10-17",
    changeFrequency: "monthly",
    priority: l === "en" ? 1 : 0.9,
    alternates: { languages },
  }));
}
