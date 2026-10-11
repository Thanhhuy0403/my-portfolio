import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { person, site, socials } from "@/content/profile";

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${person.name}`,
  },
  description: site.description,
  keywords: site.keywords,
  applicationName: person.name,
  authors: [{ name: person.name, url: site.url }],
  creator: person.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: person.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
    firstName: "Thanh Huy",
    lastName: "Phan",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#06090d" },
  ],
  colorScheme: "dark light",
};

// Runs before paint so the saved / system theme is applied without a flash.
const themeScript = `(function(){document.documentElement.dataset.js='';try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  url: site.url,
  image: `${site.url}/opengraph-image`,
  jobTitle: person.role,
  email: `mailto:${person.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ho Chi Minh City",
    addressCountry: "VN",
  },
  worksFor: [
    { "@type": "Organization", name: "Ban Vien Corporation", url: "https://banvien.com" },
    { "@type": "Organization", name: "FTES", url: "https://ftes.vn" },
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Ho Chi Minh City University of Technology",
    url: "https://hcmut.edu.vn",
  },
  knowsAbout: [
    "Embedded C",
    "C++",
    "STM32",
    "ESP32",
    "FreeRTOS",
    "FPGA",
    "UART",
    "SPI",
    "I2C",
    "IoT",
  ],
  sameAs: socials.filter((s) => s.icon !== "globe").map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geist.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-dvh bg-bg text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-medium focus:text-bg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
