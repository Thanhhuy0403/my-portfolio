import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "../globals.css";

import { localeMeta, localePath, locales } from "@/i18n/config";
import { getI18n } from "@/i18n/server";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

/** Every language is prerendered at build time. */
export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { locale, content } = await getI18n();
  const { site, person } = content;
  const path = localePath(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: site.title, template: `%s · ${person.name}` },
    description: site.description,
    keywords: site.keywords,
    applicationName: person.name,
    authors: [{ name: person.name, url: site.url }],
    creator: person.name,
    alternates: {
      canonical: path,
      // hreflang: tells search engines the three pages are translations of each other.
      languages: { ...Object.fromEntries(locales.map((l) => [l, localePath(l)])), "x-default": "/" },
    },
    openGraph: {
      type: "profile",
      url: path,
      siteName: person.name,
      title: site.title,
      description: site.description,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      firstName: "Thanh Huy",
      lastName: "Phan",
    },
    twitter: { card: "summary_large_image", title: site.title, description: site.description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    category: "technology",
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#06090d" },
  ],
  colorScheme: "dark light",
};

// Runs before paint so the saved / system theme is applied without a flash.
const themeScript = `(function(){document.documentElement.dataset.js='';try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`;

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const { locale, dict, content } = await getI18n();
  const { site, person, socials } = content;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    url: site.url,
    image: `${site.url}/${locale}/opengraph-image`,
    jobTitle: person.role,
    description: site.description,
    email: `mailto:${person.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Ho Chi Minh City", addressCountry: "VN" },
    worksFor: [
      { "@type": "Organization", name: "Ban Vien Corporation", url: "https://banvien.com" },
      { "@type": "Organization", name: "FTES", url: "https://ftes.vn" },
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Ho Chi Minh City University of Technology",
      url: "https://hcmut.edu.vn",
    },
    knowsLanguage: ["vi", "en"],
    knowsAbout: ["Embedded C", "C++", "STM32", "ESP32", "FreeRTOS", "FPGA", "UART", "SPI", "I2C", "IoT"],
    sameAs: socials.filter((s) => s.icon !== "globe").map((s) => s.href),
  };

  return (
    <html
      lang={locale}
      data-theme="dark"
      suppressHydrationWarning
      className={`${geist.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-dvh bg-bg text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-medium focus:text-bg"
        >
          {dict.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
