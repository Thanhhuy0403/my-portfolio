# Phan Thanh Huy — Portfolio

Personal portfolio built with **Next.js 16 (App Router)**, **Tailwind CSS v4** and TypeScript. Fully static, deployed on **Vercel**.

## Chạy local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start   # kiểm tra bản production
```

## Sửa nội dung

Toàn bộ nội dung nằm trong **một file duy nhất**: `src/content/profile.ts`
(thông tin cá nhân, kinh nghiệm, dự án, giải thưởng, kỹ năng). Component chỉ render dữ liệu.

| Muốn thay | Ở đâu |
| --- | --- |
| Ảnh chân dung | `src/assets/profile.jpg` (tỉ lệ ~3:4) |
| Ảnh giải thưởng | `src/assets/awards/*.jpg` rồi khai báo trong `awards` |
| CV tải về | `public/cv/Phan-Thanh-Huy-CV.pdf` |
| Ảnh dự án | mặc định là mockup UI động (`src/components/project-visuals.tsx`); thêm `photo` trong `profile.ts` để dùng ảnh thật/AI — xem `docs/AI-IMAGE-PROMPTS.md` |
| Màu sắc / theme | tokens ở đầu `src/app/globals.css` |

Ảnh được tối ưu tự động (AVIF/WebP, responsive, blur placeholder) qua `next/image`.

## Motion & hiệu năng

- `src/components/effects.tsx` — một client island duy nhất: Lenis smooth scroll (lazy-load khi trình duyệt rảnh), reveal theo viewport, count-up, spotlight theo con trỏ, thanh tiến trình đọc, tạm dừng animation khi section ra khỏi màn hình.
- Mọi animation chỉ dùng `transform`/`opacity` (chạy trên GPU) và tự tắt khi người dùng bật *Reduce motion*.
- Thêm hiệu ứng reveal cho phần tử mới: gắn `data-reveal` (tuỳ chọn `style={{ "--d": "120ms" }}` để stagger); thêm spotlight: `data-spot` + class `card`.

## SEO

- Metadata + Open Graph + Twitter card (`src/app/layout.tsx`)
- Ảnh OG tự sinh: `src/app/opengraph-image.tsx`
- JSON-LD `Person` schema, `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, icon

## Deploy lên Vercel

1. Push repo lên GitHub.
2. Vào [vercel.com/new](https://vercel.com/new) → Import repo → Framework: Next.js (tự nhận) → Deploy.
3. Khi có domain riêng, thêm biến môi trường `NEXT_PUBLIC_SITE_URL=https://ten-mien-cua-ban.com`
   (Project → Settings → Environment Variables) rồi redeploy để canonical/sitemap/OG dùng đúng domain.
   Nếu không đặt, site tự dùng domain production `*.vercel.app`.
4. Sau khi lên production: gửi `https://<domain>/sitemap.xml` vào Google Search Console.
