# AI image prompts — portfolio Phan Thanh Huy

Prompt viết cho **Midjourney v7 / FLUX 1.1 Pro / GPT-Image / Ideogram**. Tất cả cùng một "art direction" để các ảnh đồng bộ với website:

> **Style chung:** photoreal product photography, dark graphite background (#06090D), soft rim light, a single accent of emerald phosphor green (#3EE6A0) and warm copper (#F2B25C), shallow depth of field, 35–50 mm lens, clean, minimal, no clutter, no text, no logos, no watermark.

Quy tắc chung (rất quan trọng để ảnh trông chuyên nghiệp, không "lộ AI"):
- **Không** để AI vẽ chữ, logo hãng, nhãn chip — AI hay viết sai. Chữ đã có trong UI của site.
- **Không** tạo ảnh có người (khuôn mặt AI dễ bị "uncanny"). Chỉ dùng ảnh thật của bạn cho chân dung/giải thưởng.
- Xuất ảnh **16:10, ≥ 2000 px**, sau đó nén JPG chất lượng ~85 (site tự chuyển AVIF/WebP).
- Nên tạo 4 biến thể, chọn ảnh có bo mạch "hợp lý" nhất (đếm chân linh kiện, dây không lơ lửng).

---

## 1. FPGA-Based SoC for ECG Classification (thesis)

```
Photoreal product shot of an AMD Kria KV260 style FPGA starter kit on a dark graphite desk, fan heatsink and carrier board visible, a slim monitor softly out of focus behind it showing a glowing emerald ECG waveform on a black oscilloscope grid, thin copper PCB traces catching warm rim light, cinematic low-key lighting, shallow depth of field, 45mm lens, minimal and premium, engineering lab aesthetic, no text, no logos, no people --ar 16:10 --style raw --v 7
```
Negative (FLUX/SD): `text, letters, watermark, logo, brand name, people, hands, messy cables, oversaturated, cartoon`

## 2. ESP32 IoT Monitoring & Control

```
Top-down 3/4 angle product photo of a compact ESP32-S3 development board connected to a small temperature-humidity sensor module, a tiny water pump and a 16x2 LCD, neat jumper wires, on a matte dark slate surface, a smartphone beside it showing a minimal dark dashboard with an emerald humidity gauge (abstract, no readable text), soft diffused key light with copper rim light, shallow depth of field, clean maker-lab minimalism, no text, no logos --ar 16:10 --style raw --v 7
```

## 3. AI-Integrated Plant Health Monitoring

```
Photoreal close-up of a small potted green plant on a dark wooden desk next to an STM32 Nucleo-style microcontroller board and a soil sensor probe in the soil, thin wires, soft morning window light from the left, subtle emerald glow from a status LED, warm copper highlights on the PCB, shallow depth of field, calm and premium editorial tech photography, no text, no logos, no people --ar 16:10 --style raw --v 7
```

## 4. Ảnh OG / banner chia sẻ (tuỳ chọn, site đã tự sinh OG)

```
Abstract dark hero background, macro photo of a printed circuit board with fine copper traces fading into black, a single thin emerald ECG line crossing the frame, generous empty space on the left for a title, ultra clean, premium, no text --ar 1200:630 --style raw --v 7
```

## 5. CSE MINATHON 2024 (chưa có ảnh)

Khuyên dùng **ảnh thật** của đội (giấy chứng nhận / ảnh nhận giải). Nếu chưa có, site đang hiển thị icon cúp — đẹp và trung thực hơn ảnh AI giả lập sự kiện.

---

## Cách gắn ảnh vào site

1. Lưu ảnh vào `src/assets/projects/` (ví dụ `fpga-ecg.jpg`).
2. Trong `src/content/profile.ts`, import và thêm field `photo` cho dự án:

```ts
import fpgaPhoto from "@/assets/projects/fpga-ecg.jpg";
// ...
{
  slug: "fpga-ecg",
  // ...
  photo: { src: fpgaPhoto, alt: "Kria KV260 FPGA board running the ECG classifier" },
}
```

Khi có `photo`, ảnh sẽ thay cho mockup UI (vẫn giữ hiệu ứng nghiêng 3D, blur placeholder, AVIF/WebP).
Gợi ý: **ảnh thật** chụp bo mạch của bạn bằng điện thoại trên nền tối luôn được nhà tuyển dụng đánh giá cao hơn ảnh AI.
