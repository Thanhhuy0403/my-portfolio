import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — Page not found · Phan Thanh Huy",
  description: "This page does not exist.",
};

// Same pre-paint theme logic as the main layout (this page bypasses that layout).
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`;

const links = [
  { href: "/", label: "Back to the portfolio", lang: "en" },
  { href: "/vi", label: "Về trang portfolio", lang: "vi" },
  { href: "/ja", label: "ポートフォリオへ戻る", lang: "ja" },
];

export default function GlobalNotFound() {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-grid grid min-h-dvh place-items-center bg-bg px-6 text-fg">
        <main className="max-w-md text-center">
          <p className="font-mono text-sm tracking-[0.2em] text-accent">404</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">Page not found</h1>
          <p className="mt-3 text-muted">
            The address may be mistyped, or the page has moved.
          </p>
          <ul className="mt-8 flex flex-col items-center gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} lang={l.lang} hrefLang={l.lang} className="text-sm underline decoration-line-strong underline-offset-4 hover:text-accent">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </main>
      </body>
    </html>
  );
}
