import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

// Kept in sync with src/i18n/config.ts (LOCALE_COOKIE and the non-default locales).
const LOCALE_COOKIE = "NEXT_LOCALE";
const otherLocales = ["vi", "ja"];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  experimental: {
    // The root layout lives under app/[lang], so unmatched URLs need a layout-independent 404.
    globalNotFound: true,
  },
  async redirects() {
    return [
      // English is served at "/", so "/en" would be duplicate content.
      { source: "/en", destination: "/", permanent: true },
      // A language the visitor picked before (cookie set by the language menu) wins on "/".
      ...otherLocales.map((locale) => ({
        source: "/",
        has: [{ type: "cookie" as const, key: LOCALE_COOKIE, value: locale }],
        destination: `/${locale}`,
        permanent: false,
      })),
      // First visit: follow the browser's top language preference. Crawlers send no cookie and
      // usually no Vietnamese/Japanese preference, so they index English at "/" (hreflang covers the rest).
      ...otherLocales.map((locale) => ({
        source: "/",
        has: [{ type: "header" as const, key: "accept-language", value: `${locale}.*` }],
        missing: [{ type: "cookie" as const, key: LOCALE_COOKIE }],
        destination: `/${locale}`,
        permanent: false,
      })),
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Serve the prerendered English page at "/" without changing the URL.
        { source: "/", destination: "/en" },
        // A single path segment that is not a locale (e.g. "/fr") would otherwise match [lang] and
        // fall back to the bare default 404; send it to a path no route matches, so the branded
        // global-not-found page renders (still with a 404 status). Files with a dot are untouched.
        { source: "/:segment((?!en$|vi$|ja$)[^/.]+)", destination: "/_not-found/:segment" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        source: "/cv/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
