import type { MetadataRoute } from "next";

import { contentFor } from "@/content/profile";

// The web-app manifest is shared by all languages, so it uses the English copy.
const { person, site } = contentFor("en");

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: person.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#06090d",
    theme_color: "#06090d",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
