import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { contentFor } from "@/content/profile";
import { locales } from "@/i18n/config";

// Shared by all languages: the image only uses Latin text, which the OG renderer's default font covers.
const { person } = contentFor("en");

export const alt = `${person.name} — ${person.role}`;

// Prerender one image per language at build time instead of rendering on request.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const photo = await readFile(join(process.cwd(), "src/assets/profile.jpg"));
const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#06090d",
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          color: "#e7edf3",
          padding: 72,
          alignItems: "center",
          gap: 64,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 26,
              color: "#3ee6a0",
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#3ee6a0" }} />
            Embedded Software Engineer
          </div>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1, marginTop: 28, letterSpacing: -2 }}>
            Phan Thanh Huy
          </div>
          <div style={{ fontSize: 30, color: "#8f9cad", marginTop: 28, lineHeight: 1.35 }}>
            Ban Vien (on site at Bosch) · Co-Founder FTES · HCMUT
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
            {["Embedded C/C++", "STM32", "ESP32", "FreeRTOS", "FPGA"].map((t) => (
              <div
                key={t}
                style={{
                  fontSize: 22,
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(148,163,184,0.3)",
                  color: "#c9d3de",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: 10,
            borderRadius: 32,
            border: "2px solid rgba(242,178,92,0.6)",
            background: "#0c1219",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            alt=""
            width={330}
            height={412}
            style={{ borderRadius: 24, objectFit: "cover", objectPosition: "50% 20%" }}
          />
        </div>
      </div>
    ),
    size,
  );
}
