import type { MetadataRoute } from "next";

import { contentFor } from "@/content/profile";

const { site } = contentFor("en");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
