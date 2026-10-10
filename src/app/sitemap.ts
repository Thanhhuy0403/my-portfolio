import type { MetadataRoute } from "next";

import { site } from "@/content/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: "2026-10-10",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
