import type { StaticImageData } from "next/image";

import innoworksCeremony from "@/assets/awards/innoworks-ceremony.jpg";
import innoworksAnnouncement from "@/assets/awards/innoworks-announcement.jpg";
import siuFirstPrize from "@/assets/awards/siu-first-prize.jpg";
import vifotecCertificate from "@/assets/awards/vifotec-certificate.jpg";
import moetCertificate from "@/assets/awards/moet-certificate.jpg";
import minathon from "@/assets/awards/minathon.jpg";
import outstandingStudent from "@/assets/awards/outstanding-student.jpg";
import advantechLogo from "@/assets/logos/advantech.png";
import banvienLogo from "@/assets/logos/banvien.png";
import boschLogo from "@/assets/logos/bosch.png";
import fptUniversityLogo from "@/assets/logos/fpt-university.png";
import ftesLogo from "@/assets/logos/ftes.png";
import hcmutLogo from "@/assets/logos/hcmut.png";
import siuLogo from "@/assets/logos/siu.png";
import techfestLogo from "@/assets/logos/techfest.png";
import youthUnionLogo from "@/assets/logos/youth-union.png";
import type { Locale } from "@/i18n/config";
import { resolve, t, type L, type Resolved } from "@/i18n/localize";

/**
 * Single source of truth for every piece of content on the site, in English, Vietnamese and
 * Japanese: `t(en, vi, ja)` keeps each translation next to its source text. Components read the
 * resolved, single-language version through `getContent()` (src/i18n/server.ts).
 * UI chrome (buttons, headings, labels) lives in src/i18n/dictionaries instead.
 */

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

type Img = { src: StaticImageData; alt: L };
export type OrgLogoImage = { src: StaticImageData; alt: string };

/**
 * Official logos, used wherever these organisations appear.
 * FTES and Ban Vien were supplied by the owner; the rest come from Wikimedia Commons
 * (Bosch, HCMUT, Advantech, FPT University, TECHFEST, HCM Communist Youth Union) and siu.edu.vn.
 */
const logos = {
  banvien: { src: banvienLogo, alt: t("Ban Vien logo", "Logo Ban Vien", "Ban Vien ロゴ") },
  bosch: { src: boschLogo, alt: t("Bosch logo", "Logo Bosch", "Bosch ロゴ") },
  ftes: { src: ftesLogo, alt: t("FTES logo", "Logo FTES", "FTES ロゴ") },
  hcmut: { src: hcmutLogo, alt: t("HCMUT logo", "Logo ĐH Bách khoa TP.HCM", "ホーチミン市工科大学 ロゴ") },
  advantech: { src: advantechLogo, alt: t("Advantech logo", "Logo Advantech", "Advantech ロゴ") },
  fptUniversity: { src: fptUniversityLogo, alt: t("FPT University logo", "Logo ĐH FPT", "FPT大学 ロゴ") },
  techfest: { src: techfestLogo, alt: t("TECHFEST Vietnam logo", "Logo TECHFEST Việt Nam", "TECHFEST Vietnam ロゴ") },
  youthUnion: {
    src: youthUnionLogo,
    alt: t("Ho Chi Minh Communist Youth Union logo", "Huy hiệu Đoàn TNCS Hồ Chí Minh", "ホーチミン共産青年団 エンブレム"),
  },
  siu: {
    src: siuLogo,
    alt: t("Saigon International University logo", "Logo ĐH Quốc tế Sài Gòn", "サイゴン国際大学 ロゴ"),
  },
} satisfies Record<string, Img>;

const FPTU_STORY =
  "https://daihoc.fpt.edu.vn/tin-tuc/do-an-khoi-nghiep-cua-sinh-vien-fptu-dat-doanh-thu-gan-1-ty-dong-sau-1-nam/";

const CSE_HCMUT = t("Faculty of Computer Science and Engineering, HCMUT", "Khoa Khoa học và Kỹ thuật Máy tính, ĐH Bách khoa TP.HCM", "ホーチミン市工科大学 コンピュータ科学工学部");
const CSE_LINK = { label: t("Faculty of CSE, HCMUT", "Khoa KH&KT Máy tính, ĐH Bách khoa", "ホーチミン市工科大学 CSE 学部"), href: "https://cse.hcmut.edu.vn" };
const SYSMA = t("Sysma Team", "Đội Sysma", "チーム Sysma");
const FTES_ANNOUNCEMENT = t("FTES announcement", "Thông báo của FTES", "FTES の発表");
const FPTU_LABEL = t("FPT University", "ĐH FPT", "FPT大学");
const ROLE = t("Embedded Software Engineer", "Kỹ sư Phần mềm Nhúng", "組込みソフトウェアエンジニア");
const COFOUNDER = t("Co-Founder & Technical Leader", "Đồng sáng lập & Trưởng nhóm Kỹ thuật", "共同創業者・技術リーダー");
const HCMC = t("Ho Chi Minh City", "TP. Hồ Chí Minh", "ホーチミン市");

const raw = {
  site: {
    url: siteUrl,
    title: t(
      "Phan Thanh Huy — Embedded Software Engineer",
      "Phan Thanh Huy — Kỹ sư Phần mềm Nhúng",
      "Phan Thanh Huy — 組込みソフトウェアエンジニア",
    ),
    description: t(
      "Portfolio of Phan Thanh Huy, Embedded Software Engineer at Ban Vien (on site at Bosch) and Co-Founder of FTES. Embedded C/C++, STM32, ESP32, FreeRTOS and FPGA SoC design. Computer Engineering, HCMUT.",
      "Portfolio của Phan Thanh Huy — Kỹ sư Phần mềm Nhúng tại Ban Vien (làm việc on-site tại Bosch), đồng sáng lập FTES. Embedded C/C++, STM32, ESP32, FreeRTOS và thiết kế SoC trên FPGA. Kỹ thuật Máy tính, ĐH Bách khoa TP.HCM.",
      "Phan Thanh Huy のポートフォリオ。Ban Vien 所属の組込みソフトウェアエンジニア（Bosch に常駐）、FTES 共同創業者。Embedded C/C++、STM32、ESP32、FreeRTOS、FPGA による SoC 設計。ホーチミン市工科大学 コンピュータ工学専攻。",
    ),
    keywords: [
      "Phan Thanh Huy",
      "Embedded Software Engineer",
      "Firmware Engineer",
      "Embedded C",
      "C/C++",
      "STM32",
      "ESP32",
      "FreeRTOS",
      "FPGA",
      "Kria KV260",
      "IoT",
      "HCMUT",
      "Computer Engineering",
      "FTES",
      "Ban Vien",
      "Bosch",
      "Ho Chi Minh City",
    ],
  },

  person: {
    name: "Phan Thanh Huy",
    shortName: "Thanh Huy",
    role: ROLE,
    location: t("Binh Thanh, Ho Chi Minh City, Vietnam", "Bình Thạnh, TP. Hồ Chí Minh, Việt Nam", "ベトナム・ホーチミン市 ビンタン区"),
    email: "huythanhphan2020fpt@gmail.com",
    phone: "+84 343 704 397",
    phoneHref: "tel:+84343704397",
    cv: "/cv/Phan-Thanh-Huy-CV.pdf",
    toeic: "TOEIC L&R 675",
  },

  socials: [
    { label: "GitHub", href: "https://github.com/Thanhhuy0403", icon: "github" as const },
    { label: "Facebook", href: "https://www.facebook.com/thanhhuy.phan.52035772", icon: "facebook" as const },
    { label: "FTES", href: "https://ftes.vn/vi", icon: "globe" as const },
  ],

  stats: [
    { value: "3", label: t("Thesis & projects graded A / A+", "Đồ án & dự án đạt điểm A / A+", "A / A+ 評価の卒業研究・プロジェクト") },
    { value: "5", label: t("Competition & academic awards", "Giải thưởng thi đấu & học thuật", "コンテスト・学業での受賞") },
    { value: "2+", label: t("Years mentoring C/C++ & CP", "Năm mentor C/C++ & lập trình thi đấu", "年間の C/C++・競技プログラミング指導") },
    { value: "3.1", label: t("GPA / 4.0 at HCMUT", "GPA / 4.0 tại ĐH Bách khoa", "GPA / 4.0（ホーチミン市工科大学）") },
  ],

  overview: [
    t(
      "Strong in C/C++, OOP, data structures & algorithms, and problem-solving.",
      "Vững C/C++, OOP, cấu trúc dữ liệu & giải thuật và kỹ năng giải quyết vấn đề.",
      "C/C++、オブジェクト指向、データ構造とアルゴリズム、問題解決力に強み。",
    ),
    t(
      "Solid Embedded C fundamentals — pointers, memory layout, bitwise operations, volatile and interrupts.",
      "Nền tảng Embedded C chắc chắn — con trỏ, tổ chức bộ nhớ, thao tác bit, volatile và ngắt.",
      "Embedded C の確かな基礎 — ポインタ、メモリ配置、ビット演算、volatile、割り込み。",
    ),
    t(
      "Hands-on with STM32, ESP32, Arduino, Micro:bit and FPGA; GPIO, ADC, PWM, timers and UART / SPI / I²C.",
      "Thực chiến với STM32, ESP32, Arduino, Micro:bit và FPGA; GPIO, ADC, PWM, timer và UART / SPI / I²C.",
      "STM32、ESP32、Arduino、Micro:bit、FPGA の実装経験。GPIO、ADC、PWM、タイマ、UART / SPI / I²C。",
    ),
    t(
      "Co-Founder & Technical Leader of FTES, mentoring C/C++ and competitive programming for 2+ years.",
      "Đồng sáng lập & Trưởng nhóm Kỹ thuật FTES, hơn 2 năm mentor C/C++ và lập trình thi đấu.",
      "FTES 共同創業者・技術リーダー。C/C++ と競技プログラミングの指導歴 2 年以上。",
    ),
  ],

  logos,

  experience: [
    {
      company: "Ban Vien Corporation",
      logo: logos.banvien,
      href: "https://banvien.com",
      /** Client the role is delivered to on site (outsourcing engagement); the employer stays `company`. */
      client: {
        name: "Bosch Global Software Technologies Vietnam",
        logo: logos.bosch,
        href: "https://www.bosch-softwaretechnologies.com",
        site: t("OfficeHaus, Tan Phu, Ho Chi Minh City", "OfficeHaus, Tân Phú, TP. Hồ Chí Minh", "OfficeHaus（ホーチミン市タンフー区）"),
      },
      role: ROLE,
      period: t("2026 — Present", "2026 — Nay", "2026年 — 現在"),
      location: HCMC,
      current: true,
      summary: t(
        "Ban Vien engineer assigned on site to Bosch Global Software Technologies Vietnam (BGSV), Bosch’s software and engineering centre in Ho Chi Minh City.",
        "Kỹ sư của Ban Vien, làm việc on-site tại Bosch Global Software Technologies Vietnam (BGSV) — trung tâm phần mềm và kỹ thuật của Bosch tại TP. Hồ Chí Minh.",
        "Ban Vien のエンジニアとして、ホーチミン市にある Bosch のソフトウェア・エンジニアリング拠点 Bosch Global Software Technologies Vietnam（BGSV）に常駐。",
      ),
      highlights: [
        t(
          "Developing and maintaining embedded software in C/C++ for Bosch, working day-to-day inside the Bosch team.",
          "Phát triển và bảo trì phần mềm nhúng C/C++ cho Bosch, làm việc hằng ngày cùng đội ngũ Bosch.",
          "Bosch 向け組込みソフトウェア（C/C++）の開発・保守を担当。Bosch チームの一員として日々の業務に参画。",
        ),
        t(
          "Working across the firmware stack — peripherals, drivers, RTOS tasks and hardware bring-up.",
          "Làm việc xuyên suốt tầng firmware — ngoại vi, driver, tác vụ RTOS và bring-up phần cứng.",
          "ペリフェラル、ドライバ、RTOS タスク、ハードウェア立ち上げまで、ファームウェア全層に携わる。",
        ),
        t(
          "Following Bosch engineering processes: code review, testing and documentation. Project specifics are under NDA.",
          "Tuân thủ quy trình kỹ thuật của Bosch: review code, kiểm thử và tài liệu hoá. Chi tiết dự án thuộc NDA.",
          "コードレビュー、テスト、ドキュメント作成など Bosch の開発プロセスに準拠。プロジェクトの詳細は NDA により非公開。",
        ),
      ],
      tags: ["Bosch", "Embedded C", "C/C++", "MCU", "RTOS", "Drivers"],
    },
    {
      company: "FTES",
      logo: logos.ftes,
      href: "https://ftes.vn/vi",
      role: COFOUNDER,
      period: t("2025 — Present", "2025 — Nay", "2025年 — 現在"),
      location: HCMC,
      current: true,
      summary: t(
        "FTES is a tech-education startup — “your learning operating system” — combining structured programming courses, live mentoring and FrosTES, an AI teaching assistant.",
        "FTES là startup giáo dục công nghệ — “hệ điều hành học tập của bạn” — kết hợp khoá học lập trình bài bản, mentor trực tiếp và FrosTES, trợ giảng AI.",
        "FTES は「あなたの学習オペレーティングシステム」を掲げるテック教育スタートアップ。体系的なプログラミング講座、ライブメンタリング、AI ティーチングアシスタント FrosTES を組み合わせています。",
      ),
      highlights: [
        t(
          "Co-founded the company (incorporated 08/2025) and lead its technical direction and product.",
          "Đồng sáng lập công ty (thành lập 08/2025), dẫn dắt định hướng kỹ thuật và sản phẩm.",
          "会社を共同創業（2025年8月設立）し、技術方針とプロダクトを統括。",
        ),
        t(
          "Mentor for C/C++ and competitive programming for 2+ years, guiding students from fundamentals to contests.",
          "Hơn 2 năm mentor C/C++ và lập trình thi đấu, đồng hành cùng học viên từ nền tảng đến các kỳ thi.",
          "C/C++ と競技プログラミングのメンターとして 2 年以上、基礎からコンテストまで学生を指導。",
        ),
        t(
          "Grew FTES to 4,000+ learners and close to 1B VND revenue in its first year; raised a 100M VND first round.",
          "Đưa FTES đạt hơn 4.000 học viên và gần 1 tỷ đồng doanh thu trong năm đầu; gọi vốn vòng đầu 100 triệu đồng.",
          "初年度で受講者 4,000 名超・売上約 10 億ドンを達成し、初回ラウンドで 1 億ドンを調達。",
        ),
      ],
      tags: ["Leadership", "Mentoring", "EdTech", "AI", "Product"],
    },
  ] as {
    company: string;
    logo: Img;
    href: string;
    client?: { name: string; logo: Img; href: string; site: L };
    role: L;
    period: L;
    location: L;
    current: boolean;
    summary: L;
    highlights: L[];
    tags: string[];
  }[],

  education: {
    school: t(
      "Ho Chi Minh City University of Technology (HCMUT)",
      "Trường Đại học Bách khoa – ĐHQG-HCM (HCMUT)",
      "ホーチミン市工科大学（HCMUT）",
    ),
    logo: logos.hcmut,
    degree: t("Bachelor of Engineering in Computer Engineering", "Kỹ sư Kỹ thuật Máy tính", "コンピュータ工学 学士（工学）"),
    period: "08/2022 — 06/2026",
    gpa: "3.1 / 4.0",
    thesis: t(
      "FPGA-Based SoC for ECG Signal Classification — Grade A",
      "SoC trên FPGA phân loại tín hiệu ECG — Điểm A",
      "FPGA ベースの ECG 信号分類 SoC — 評価 A",
    ),
  },

  projects: [
    {
      slug: "fpga-ecg" as const,
      title: t(
        "FPGA-Based SoC for ECG Signal Classification",
        "SoC trên FPGA phân loại tín hiệu ECG",
        "FPGA ベース SoC による ECG 信号分類",
      ),
      kind: t("Graduation Thesis", "Đồ án tốt nghiệp", "卒業研究"),
      period: "11/2025 — 05/2026",
      grade: "A",
      repo: "https://github.com/Thanhhuy0403/FPGA-ECG-Classifier",
      summary: t(
        "A heterogeneous SoC on the AMD Kria KV260: a custom CGRA accelerator in Verilog runs an int8-quantised 1D-CNN, while Linux software on the ARM cores streams ECG segments over AXI/DMA and renders results live.",
        "SoC dị thể trên AMD Kria KV260: bộ tăng tốc CGRA viết bằng Verilog chạy mô hình 1D-CNN lượng tử hoá int8, còn phần mềm Linux trên lõi ARM truyền các đoạn ECG qua AXI/DMA và hiển thị kết quả theo thời gian thực.",
        "AMD Kria KV260 上のヘテロジニアス SoC。Verilog で実装したカスタム CGRA アクセラレータが int8 量子化 1D-CNN を実行し、ARM コア上の Linux ソフトウェアが AXI/DMA で ECG セグメントを転送して結果をリアルタイム表示します。",
      ),
      specs: [
        { label: t("Platform", "Nền tảng", "プラットフォーム"), value: "Kria KV260" },
        { label: t("Accelerator", "Bộ tăng tốc", "アクセラレータ"), value: "CGRA · 16 PE" },
        { label: t("Model", "Mô hình", "モデル"), value: "1D-CNN · int8" },
        { label: t("Input", "Đầu vào", "入力"), value: t("320-sample segments", "Đoạn 320 mẫu", "320 サンプル単位") },
      ],
      points: [
        t(
          "Integrated a custom CGRA/CNN accelerator (Verilog: PE array, MAC, quantiser, load/store units, AXI interface) with the ARM processing system.",
          "Tích hợp bộ tăng tốc CGRA/CNN tuỳ biến (Verilog: mảng PE, MAC, bộ lượng tử hoá, khối load/store, giao tiếp AXI) với hệ xử lý ARM.",
          "カスタム CGRA/CNN アクセラレータ（Verilog：PE アレイ、MAC、量子化器、ロード/ストアユニット、AXI インタフェース）を ARM プロセッシングシステムと統合。",
        ),
        t(
          "Trained the 1D-CNN in Keras, quantised it to int8 and ported inference to C/C++ to bit-match the hardware.",
          "Huấn luyện 1D-CNN bằng Keras, lượng tử hoá int8 và chuyển phần suy luận sang C/C++ để khớp từng bit với phần cứng.",
          "Keras で 1D-CNN を学習して int8 に量子化し、推論を C/C++ に移植してハードウェアとビット単位で一致させる。",
        ),
        t(
          "Wrote the Linux user-space driver: mmap of AXI register windows and DDR, DMA transfers, start/finish handshakes.",
          "Viết driver user-space trên Linux: mmap vùng thanh ghi AXI và DDR, truyền DMA, cơ chế bắt tay start/finish.",
          "Linux ユーザ空間ドライバを実装：AXI レジスタ領域と DDR の mmap、DMA 転送、開始/完了ハンドシェイク。",
        ),
        t(
          "Built a real-time SDL2 dashboard that plots each ECG segment next to the predicted class.",
          "Xây dựng dashboard SDL2 thời gian thực hiển thị từng đoạn ECG cùng lớp dự đoán.",
          "各 ECG セグメントと予測クラスを並べて表示するリアルタイム SDL2 ダッシュボードを構築。",
        ),
      ],
      stack: ["Verilog", "C/C++", "Embedded Linux", "AXI", "DMA", "MMIO", "Keras", "TFLite int8", "SDL2"],
    },
    {
      slug: "esp32-iot" as const,
      title: t("ESP32 IoT Monitoring & Control System", "Hệ thống giám sát & điều khiển IoT với ESP32", "ESP32 による IoT 監視・制御システム"),
      kind: t("Embedded Project", "Dự án nhúng", "組込みプロジェクト"),
      period: "08/2025 — 10/2025",
      grade: "A+",
      repo: "https://github.com/Thanhhuy0403/Big_Project_Embedded",
      summary: t(
        "An ESP32-S3 node that monitors temperature and humidity and drives a water pump, LCD and RGB LED — every job is its own FreeRTOS task, controlled from an on-device web dashboard and Firebase.",
        "Node ESP32-S3 giám sát nhiệt độ, độ ẩm và điều khiển bơm nước, LCD, LED RGB — mỗi chức năng là một tác vụ FreeRTOS riêng, điều khiển qua web dashboard trên thiết bị và Firebase.",
        "温湿度を監視し、ウォーターポンプ・LCD・RGB LED を制御する ESP32-S3 ノード。各機能を独立した FreeRTOS タスクとして実装し、デバイス内蔵の Web ダッシュボードと Firebase から操作します。",
      ),
      specs: [
        { label: "MCU", value: "ESP32-S3 (Yolo UNO)" },
        { label: "RTOS", value: t("FreeRTOS multitasking", "Đa nhiệm FreeRTOS", "FreeRTOS マルチタスク") },
        { label: t("Cloud", "Đám mây", "クラウド"), value: "Firebase RTDB" },
        { label: "UI", value: t("Web app on LittleFS", "Web app trên LittleFS", "LittleFS 上の Web アプリ") },
      ],
      points: [
        t(
          "Split the firmware into independent FreeRTOS tasks: Wi-Fi, web server, Firebase sync, sensing, pump, LCD and LED.",
          "Chia firmware thành các tác vụ FreeRTOS độc lập: Wi-Fi, web server, đồng bộ Firebase, cảm biến, bơm, LCD và LED.",
          "ファームウェアを独立した FreeRTOS タスク（Wi-Fi、Web サーバ、Firebase 同期、センシング、ポンプ、LCD、LED）に分割。",
        ),
        t(
          "DHT20 over I²C, PWM-driven actuators and NeoPixel status feedback.",
          "DHT20 qua I²C, cơ cấu chấp hành điều khiển bằng PWM và LED NeoPixel báo trạng thái.",
          "I²C 接続の DHT20、PWM 駆動のアクチュエータ、NeoPixel によるステータス表示。",
        ),
        t(
          "Served a responsive HTML/JS dashboard from LittleFS and synced configuration both ways with Firebase as JSON.",
          "Phục vụ dashboard HTML/JS responsive từ LittleFS và đồng bộ cấu hình hai chiều với Firebase dưới dạng JSON.",
          "LittleFS からレスポンシブな HTML/JS ダッシュボードを配信し、Firebase と JSON で設定を双方向同期。",
        ),
      ],
      stack: ["ESP32-S3", "FreeRTOS", "C++", "PlatformIO", "I²C", "PWM", "Wi-Fi", "Firebase", "LittleFS"],
    },
    {
      slug: "plant-health" as const,
      title: t("AI-Integrated Plant Health Monitoring", "Giám sát sức khoẻ cây trồng tích hợp AI", "AI を活用した植物ヘルスモニタリング"),
      kind: t("Embedded Project", "Dự án nhúng", "組込みプロジェクト"),
      period: "04/2025 — 06/2025",
      grade: "A+",
      repo: "https://github.com/Thanhhuy0403/Plant_Health_Monitoring",
      summary: t(
        "A dual-MCU plant monitor: bare-metal STM32 firmware with its own task scheduler collects sensor data, hands it to an ESP32 over UART, and an AI model classifies plant health for a React dashboard.",
        "Hệ giám sát cây trồng hai vi điều khiển: firmware STM32 bare-metal với bộ lập lịch riêng thu thập dữ liệu cảm biến, gửi sang ESP32 qua UART, và mô hình AI phân loại tình trạng cây cho dashboard React.",
        "2 つの MCU による植物モニタ。独自スケジューラを持つベアメタル STM32 ファームウェアがセンサデータを収集して UART で ESP32 に送り、AI モデルが植物の状態を分類して React ダッシュボードに表示します。",
      ),
      specs: [
        { label: "MCU", value: "STM32F103RB" },
        { label: t("Firmware", "Firmware", "ファームウェア"), value: t("Bare-metal + scheduler", "Bare-metal + bộ lập lịch", "ベアメタル + スケジューラ") },
        { label: t("Link", "Kết nối", "通信"), value: "UART → ESP32" },
        { label: t("App", "Ứng dụng", "アプリ"), value: "React + TypeScript" },
      ],
      points: [
        t(
          "Wrote HAL-based drivers for the DHT20 sensor, I²C LCD and RGB status LED in Embedded C (STM32CubeIDE).",
          "Viết driver dựa trên HAL cho cảm biến DHT20, LCD I²C và LED RGB trạng thái bằng Embedded C (STM32CubeIDE).",
          "DHT20 センサ、I²C LCD、ステータス用 RGB LED の HAL ベースドライバを Embedded C（STM32CubeIDE）で実装。",
        ),
        t(
          "Built a lightweight task scheduler to run sensing, display and communication jobs periodically without an RTOS.",
          "Xây dựng bộ lập lịch tác vụ gọn nhẹ chạy định kỳ các công việc đo, hiển thị và truyền thông mà không cần RTOS.",
          "RTOS を使わず、計測・表示・通信の処理を周期実行する軽量タスクスケジューラを構築。",
        ),
        t(
          "Framed sensor packets over UART to an ESP32 gateway feeding the AI health classifier and web dashboard.",
          "Đóng gói dữ liệu cảm biến qua UART tới gateway ESP32, cung cấp cho bộ phân loại AI và web dashboard.",
          "センサデータを UART でフレーミングし、AI 分類器と Web ダッシュボードにつながる ESP32 ゲートウェイへ送信。",
        ),
      ],
      stack: ["STM32F103", "Embedded C", "HAL", "UART", "I²C", "DHT20", "ESP32", "AI", "React"],
    },
  ] as {
    slug: "fpga-ecg" | "esp32-iot" | "plant-health";
    title: L;
    kind: L;
    period: string;
    grade: string;
    repo: string;
    summary: L;
    /** Short facts pulled from the source code, shown as spec chips */
    specs: { label: L | string; value: L | string }[];
    points: L[];
    stack: string[];
    /** Optional real/AI photo (see docs/AI-IMAGE-PROMPTS.md). When set it replaces the UI mockup. */
    photo?: Img;
  }[],

  /* ---------------- FTES startup ---------------- */
  startup: {
    name: "FTES",
    href: "https://ftes.vn/vi",
    tagline: t("AI-learning platform for technology learners", "Nền tảng AI-learning cho người học công nghệ", "テクノロジー学習者のための AI ラーニングプラットフォーム"),
    role: COFOUNDER,
    summary: t(
      "FTES (First Technology Education Solution) pairs human mentors with AI tools — real-time code help, AI grading, personalised roadmaps and auto-generated quizzes — so IT students learn by building real projects.",
      "FTES (First Technology Education Solution) kết hợp mentor với các công cụ AI — hỗ trợ code thời gian thực, chấm bài bằng AI, lộ trình cá nhân hoá và câu hỏi ôn tập tự sinh — để sinh viên IT học qua việc làm dự án thật.",
      "FTES（First Technology Education Solution）は、メンターと AI ツール（リアルタイムのコード支援、AI 採点、個別最適化された学習ロードマップ、自動生成クイズ）を組み合わせ、IT 学生が実際のプロジェクトを通じて学べる環境を提供します。",
    ),
    metrics: [
      { value: t("4,000+", "4.000+", "4,000+"), label: t("learners across 5 FPTU campuses", "học viên tại 5 cơ sở ĐH FPT", "名の受講者（FPT大学 5 キャンパス）") },
      { value: t("~1B", "~1 tỷ", "約10億"), label: t("VND revenue in the first year", "đồng doanh thu năm đầu", "ドンの初年度売上") },
      { value: t("100M", "100 tr", "1億"), label: t("VND raised in the first round", "đồng gọi vốn vòng đầu", "ドンを初回ラウンドで調達") },
      { value: "6", label: t("startup milestones in 2025", "cột mốc khởi nghiệp năm 2025", "件のマイルストーン（2025年）") },
    ],
    metricsSource: { label: t("FPT University, 05/2026", "ĐH FPT, 05/2026", "FPT大学（2026年5月）"), href: FPTU_STORY },
    milestones: [
      {
        kind: "funding",
        badge: t("100M VND", "100 triệu đồng", "1億ドン"),
        title: t("First funding round closed", "Hoàn tất vòng gọi vốn đầu tiên", "初回資金調達を完了"),
        org: t(
          "Investment-connection day · Vietnam National Startup Association",
          "Ngày hội kết nối đầu tư · Hiệp hội Khởi nghiệp Quốc gia",
          "投資マッチングデー · ベトナム国家スタートアップ協会",
        ),
        date: t("2025", "2025", "2025年"),
        description: t(
          "Raised 100 million VND in FTES’s very first fundraising round, pitching to investors and startup experts.",
          "Gọi vốn thành công 100 triệu đồng ngay vòng đầu tiên, trình bày trước nhà đầu tư và chuyên gia khởi nghiệp.",
          "初回の資金調達ラウンドで投資家・スタートアップ専門家に向けてピッチを行い、1 億ドンを調達。",
        ),
        sources: [{ label: FTES_ANNOUNCEMENT, href: "https://www.facebook.com/share/r/1CqoWaFiN8/" }],
      },
      {
        kind: "award",
        badge: "Top 100",
        logo: logos.techfest,
        title: t("Top 100 startups — TECHFEST Vietnam 2025", "Top 100 startup — TECHFEST Việt Nam 2025", "TECHFEST Vietnam 2025 トップ100 スタートアップ"),
        org: t(
          "Ministry of Science & Technology · Hanoi People’s Committee",
          "Bộ Khoa học & Công nghệ · UBND TP. Hà Nội",
          "ベトナム科学技術省 · ハノイ市人民委員会",
        ),
        date: t("Dec 2025", "12/2025", "2025年12月"),
        description: t(
          "Named among the 100 outstanding startups at Vietnam’s national innovation & startup festival in Hanoi.",
          "Lọt Top 100 startup xuất sắc tại Ngày hội khởi nghiệp đổi mới sáng tạo quốc gia ở Hà Nội.",
          "ハノイで開催された全国イノベーション・スタートアップフェスティバルで、優秀スタートアップ 100 社に選出。",
        ),
        sources: [
          { label: FTES_ANNOUNCEMENT, href: "https://www.facebook.com/share/p/1DHzPpWe8W/" },
          {
            label: t("About TECHFEST 2025", "Về TECHFEST 2025", "TECHFEST 2025 について"),
            href: "https://english.hanoi.gov.vn/featured-news/techfest-vietnam-2025-to-take-place-on-december-12-14-2655251204160753642.htm",
          },
        ],
      },
      {
        kind: "award",
        badge: "Top 4",
        title: t("Top 4 innovative startups — Gia Lai 2025", "Top 4 startup đổi mới sáng tạo — Gia Lai 2025", "ザライ省 イノベーションスタートアップ トップ4（2025）"),
        org: t("Gia Lai Department of Science & Technology", "Sở Khoa học & Công nghệ tỉnh Gia Lai", "ザライ省科学技術局"),
        date: t("Dec 2025", "12/2025", "2025年12月"),
        description: t(
          "One of four startups selected to pitch for investment at the province’s 2025 innovation Demo Day.",
          "Một trong bốn startup được chọn gọi vốn tại Demo Day đổi mới sáng tạo 2025 của tỉnh.",
          "同省の 2025 年イノベーション Demo Day で投資ピッチを行う 4 社のうちの 1 社に選出。",
        ),
        sources: [
          {
            label: "Báo Gia Lai",
            href: "https://baogialai.com.vn/gia-lai-ket-noi-va-goi-von-dau-tu-cho-4-du-an-khoi-nghiep-nam-2025-post575022.html",
          },
        ],
      },
      {
        kind: "award",
        badge: t("3rd Prize", "Giải Ba", "第3位"),
        logo: logos.youthUnion,
        title: t(
          "Third Prize — Gia Lai Youth Startup Innovation 2025",
          "Giải Ba — Thanh niên Gia Lai khởi nghiệp sáng tạo 2025",
          "ザライ省 青年スタートアップコンテスト 2025 第3位",
        ),
        org: t("Gia Lai Provincial Youth Union", "Tỉnh Đoàn Gia Lai", "ザライ省ホーチミン共産青年団"),
        date: t("Dec 2025", "12/2025", "2025年12月"),
        description: t(
          "From 70 entries to the 10-team final, then third place overall for the FTES AI-learning platform.",
          "Từ 70 dự án vào chung kết 10 đội, giành Giải Ba với nền tảng AI-learning FTES.",
          "応募 70 件から決勝 10 チームに進出し、AI ラーニングプラットフォーム FTES で第 3 位を獲得。",
        ),
        sources: [
          {
            label: t("Báo Gia Lai — finalists", "Báo Gia Lai — chung kết", "Báo Gia Lai — 決勝進出"),
            href: "https://baogialai.com.vn/10-du-an-vao-chung-ket-cuoc-thi-thanh-nien-gia-lai-khoi-nghiep-sang-tao-post573678.html",
          },
          { label: FPTU_LABEL, href: FPTU_STORY },
        ],
      },
      {
        kind: "program",
        badge: t("Top 30 · 80M VND", "Top 30 · 80 triệu đồng", "トップ30 · 8,000万ドン"),
        title: t("Incubated startup — Innovation Quest 2025", "Startup được ươm tạo — Innovation Quest 2025", "インキュベーション採択 — Innovation Quest 2025"),
        org: t(
          "Innovation & startup programme · Ho Chi Minh City",
          "Chương trình đổi mới sáng tạo & khởi nghiệp · TP. Hồ Chí Minh",
          "イノベーション・スタートアップ支援プログラム · ホーチミン市",
        ),
        date: t("2025", "2025", "2025年"),
        description: t(
          "Selected into the Top 30 of the incubation programme and awarded 80 million VND in sponsorship.",
          "Lọt Top 30 chương trình ươm tạo và nhận tài trợ 80 triệu đồng.",
          "インキュベーションプログラムのトップ 30 に選ばれ、8,000 万ドンの支援金を獲得。",
        ),
        sources: [
          { label: FTES_ANNOUNCEMENT, href: "https://www.facebook.com/share/p/1D2j1sS8Uo/" },
          { label: FPTU_LABEL, href: FPTU_STORY },
        ],
      },
      {
        kind: "scholarship",
        logo: logos.fptUniversity,
        badge: t("Scholarship", "Học bổng", "奨学金"),
        title: t("Startup Scholarship — FPT University 2025", "Học bổng Khởi nghiệp — ĐH FPT 2025", "FPT大学 スタートアップ奨学金 2025"),
        org: t("FPT University", "Trường Đại học FPT", "FPT大学"),
        date: t("2025", "2025", "2025年"),
        description: t(
          "Backed by FPT University’s startup scholarship, including a 50 million VND seed grant for the project.",
          "Nhận học bổng khởi nghiệp của ĐH FPT, gồm 50 triệu đồng vốn khởi nghiệp cho dự án.",
          "FPT大学のスタートアップ奨学金を受給（プロジェクト向けシード資金 5,000 万ドンを含む）。",
        ),
        sources: [
          { label: FTES_ANNOUNCEMENT, href: "https://www.facebook.com/share/p/1ANtcVpcoY/" },
          { label: FPTU_LABEL, href: FPTU_STORY },
        ],
      },
    ] as {
      kind: "funding" | "award" | "program" | "scholarship";
      badge: L | string;
      title: L;
      org: L;
      date: L;
      description: L;
      sources: { label: L | string; href: string }[];
      /** Optional event photo (e.g. from ftes.vn/achievements). Shown above the card, opens in a lightbox. */
      photo?: Img;
      /** Organiser's logo; replaces the generic kind icon when present. */
      logo?: Img;
    }[],
  },

  awards: [
    {
      title: "Startup SIU 2023",
      prize: t("First Prize", "Giải Nhất", "第1位"),
      date: t("Apr 2023", "04/2023", "2023年4月"),
      org: t(
        "Saigon International University — 5th Student Scientific Research & Startup Competition",
        "ĐH Quốc tế Sài Gòn — Cuộc thi Sinh viên NCKH & Khởi nghiệp lần 5",
        "サイゴン国際大学 — 第5回 学生研究・スタートアップコンテスト",
      ),
      team: SYSMA,
      highlight: true,
      logos: [logos.siu],
      description: t(
        "Won first prize at the final round of the 5th Student Scientific Research and Startup Competition (academic year 2022–2023).",
        "Giành Giải Nhất vòng chung kết Cuộc thi Sinh viên Nghiên cứu khoa học và Khởi nghiệp lần 5 (năm học 2022–2023).",
        "第 5 回 学生科学研究・スタートアップコンテスト（2022–2023 年度）の決勝で第 1 位を獲得。",
      ),
      links: [{ label: t("Saigon International University", "ĐH Quốc tế Sài Gòn", "サイゴン国際大学"), href: "https://siu.edu.vn" }],
      images: [
        {
          src: siuFirstPrize,
          alt: t(
            "Phan Thanh Huy holding the First Prize board at the Startup SIU 2023 final round",
            "Phan Thanh Huy cầm bảng Giải Nhất tại chung kết Startup SIU 2023",
            "Startup SIU 2023 決勝で第1位のボードを持つ Phan Thanh Huy",
          ),
          position: "50% 62%",
        },
      ],
    },
    {
      title: "AIoT Developer InnoWorks 2022",
      prize: t("Fourth Prize", "Giải Khuyến khích", "奨励賞"),
      date: t("Dec 2022 — May 2023", "12/2022 — 05/2023", "2022年12月 — 2023年5月"),
      org: t(
        "Advantech × HCMUT — “Code the future”",
        "Advantech × ĐH Bách khoa TP.HCM — “Code the future”",
        "Advantech × ホーチミン市工科大学 —「Code the future」",
      ),
      logos: [logos.advantech, logos.hcmut],
      team: SYSMA,
      description: t(
        "Reached the final round of the AIoT application development contest hosted by Advantech (WISE-PaaS) and HCMUT, receiving the Encouragement (Fourth) Prize of 6,000,000 VND.",
        "Vào chung kết cuộc thi phát triển ứng dụng AIoT do Advantech (WISE-PaaS) và ĐH Bách khoa tổ chức, nhận Giải Khuyến khích trị giá 6.000.000 đồng.",
        "Advantech（WISE-PaaS）とホーチミン市工科大学が主催する AIoT アプリ開発コンテストで決勝に進出し、奨励賞（600 万ドン）を受賞。",
      ),
      links: [
        { label: "Advantech InnoWorks", href: "https://page.advantech.com/innoworks" },
        {
          label: t("InnoWorks 2022 in Vietnam", "InnoWorks 2022 tại Việt Nam", "InnoWorks 2022（ベトナム）"),
          href: "https://en.hcmute.edu.vn/ArticleId/c4d21cfe-777a-43cc-8af2-98748e3be719",
        },
      ],
      images: [
        {
          src: innoworksCeremony,
          alt: t(
            "Sysma team receiving the Fourth Prize at the AIoT Developer InnoWorks 2022 final round",
            "Đội Sysma nhận Giải Khuyến khích tại chung kết AIoT Developer InnoWorks 2022",
            "AIoT Developer InnoWorks 2022 決勝で奨励賞を受けるチーム Sysma",
          ),
        },
        {
          src: innoworksAnnouncement,
          alt: t(
            "Award announcement slide for Sysma team at AIoT Developer InnoWorks 2022",
            "Màn hình công bố giải của đội Sysma tại AIoT Developer InnoWorks 2022",
            "AIoT Developer InnoWorks 2022 でのチーム Sysma の受賞発表スライド",
          ),
        },
      ],
    },
    {
      title: t("National Science & Technology Award for Students", "Giải thưởng KH&CN dành cho sinh viên toàn quốc", "全国学生科学技術賞"),
      prize: t("Fourth Prize", "Giải Khuyến khích", "奨励賞"),
      date: t("Nov — Dec 2023", "11 — 12/2023", "2023年11月 — 12月"),
      org: t("Ministry of Education and Training & VIFOTEC", "Bộ Giáo dục và Đào tạo & VIFOTEC", "ベトナム教育訓練省 & VIFOTEC"),
      team: t("Team of 5 students", "Nhóm 5 sinh viên", "学生 5 名のチーム"),
      description: t(
        "Encouragement (Fourth) Prize in the 2023 Science and Technology Award for Students in Higher Education Institutions — certified by the Ministry of Education and Training and the Vietnam Fund for Supporting Technological Creations.",
        "Giải Khuyến khích Giải thưởng Khoa học và Công nghệ dành cho sinh viên trong các cơ sở giáo dục đại học năm 2023 — được Bộ Giáo dục và Đào tạo và Quỹ Hỗ trợ Sáng tạo Kỹ thuật Việt Nam chứng nhận.",
        "2023 年度「高等教育機関の学生を対象とした科学技術賞」奨励賞。ベトナム教育訓練省およびベトナム技術創造支援基金（VIFOTEC）が認定。",
      ),
      links: [{ label: t("Nhân Dân — 2023 award", "Báo Nhân Dân — giải thưởng 2023", "Nhân Dân 紙 — 2023 年度"), href: "https://nhandan.vn/post-769324.html" }],
      images: [
        {
          src: vifotecCertificate,
          alt: t(
            "VIFOTEC certificate of merit for the 2023 student science and technology award",
            "Giấy khen của VIFOTEC cho Giải thưởng KH&CN sinh viên 2023",
            "2023 年学生科学技術賞の VIFOTEC 表彰状",
          ),
          position: "50% 50%",
        },
        {
          src: moetCertificate,
          alt: t(
            "Ministry of Education and Training certificate for the 2023 student science and technology award",
            "Giấy chứng nhận của Bộ GD&ĐT cho Giải thưởng KH&CN sinh viên 2023",
            "2023 年学生科学技術賞の教育訓練省認定証",
          ),
        },
      ],
    },
    {
      title: "CSE MINATHON 2024",
      prize: t("Most Voted Team Award", "Đội được bình chọn nhiều nhất", "最多得票チーム賞"),
      // Dates from the event banner (06–07/04/2024); the CV lists Jan 2024.
      date: t("Apr 2024", "04/2024", "2024年4月"),
      org: CSE_HCMUT,
      logos: [logos.hcmut],
      description: t(
        "Most Voted Team Award at CSE MINATHON 2024, the faculty’s programming contest held on 6–7 April 2024 at the VNU-HCM Student Cultural House, with atWare Vietnam as partner.",
        "Giải Đội được bình chọn nhiều nhất tại CSE MINATHON 2024 — cuộc thi lập trình của khoa, diễn ra ngày 6–7/4/2024 tại Nhà Văn hoá Sinh viên ĐHQG-HCM, đơn vị đồng hành atWare Việt Nam.",
        "学部主催のプログラミングコンテスト CSE MINATHON 2024（2024年4月6–7日、ホーチミン市国家大学 学生文化会館、協賛 atWare Vietnam）で最多得票チーム賞を受賞。",
      ),
      images: [
        {
          src: minathon,
          alt: t(
            "Team at the CSE MINATHON 2024 programming contest beside the event banner",
            "Đội tại cuộc thi lập trình CSE MINATHON 2024 bên banner sự kiện",
            "CSE MINATHON 2024 のバナー前に立つチーム",
          ),
          position: "50% 45%",
        },
      ],
      links: [CSE_LINK],
    },
    {
      title: t("Outstanding Student Award", "Sinh viên tiêu biểu", "優秀学生賞"),
      prize: t("Outstanding Student 2022–2023", "Sinh viên tiêu biểu 2022–2023", "2022–2023 年度 優秀学生"),
      date: t("Mar 2024", "03/2024", "2024年3月"),
      org: CSE_HCMUT,
      logos: [logos.hcmut],
      description: t(
        "Recognised as an outstanding student of the Faculty of Computer Science and Engineering for the 2022–2023 academic year.",
        "Được khoa Khoa học và Kỹ thuật Máy tính tuyên dương Sinh viên tiêu biểu năm học 2022–2023.",
        "コンピュータ科学工学部より 2022–2023 年度の優秀学生として表彰。",
      ),
      links: [CSE_LINK],
      images: [
        {
          src: outstandingStudent,
          alt: t(
            "Framed Outstanding Student certificate from the HCMUT Faculty of Computer Science and Engineering",
            "Giấy khen Sinh viên tiêu biểu đóng khung của Khoa KH&KT Máy tính, ĐH Bách khoa",
            "ホーチミン市工科大学 コンピュータ科学工学部の優秀学生表彰状（額装）",
          ),
          position: "50% 40%",
        },
      ],
    },
  ] as {
    title: L | string;
    prize: L;
    date: L;
    org: L;
    team?: L;
    description: L;
    images: { src: StaticImageData; alt: L; position?: string }[];
    /** Where a visitor can read about the competition (press, official page or organiser). */
    links: { label: L | string; href: string }[];
    /** Organisers' logos, shown next to the organiser line. */
    logos?: Img[];
    highlight?: boolean;
  }[],

  /** `key` drives the group icon in skills.tsx; items stay in English, the industry's working language. */
  skills: [
    { key: "languages", group: t("Languages", "Ngôn ngữ", "言語"), items: ["C", "C++", "Embedded C", "Verilog", "Python (basic)"] },
    {
      key: "hardware",
      group: t("Microcontrollers & HW", "Vi điều khiển & phần cứng", "マイコン・ハードウェア"),
      items: ["STM32", "ESP32", "Arduino", "Micro:bit", "FPGA (Kria KV260)"],
    },
    { key: "protocols", group: t("Protocols & Buses", "Giao thức & bus", "通信プロトコル・バス"), items: ["UART", "SPI", "I²C", "AXI", "Wi-Fi", "REST"] },
    {
      key: "peripherals",
      group: t("Peripherals", "Ngoại vi", "ペリフェラル"),
      items: ["GPIO", "ADC", "PWM", "Timers", "Interrupts", "DMA", "Sensors", "Relays"],
    },
    {
      key: "systems",
      group: t("Systems", "Hệ thống", "システム"),
      items: ["FreeRTOS", "Embedded Linux", "Computer Architecture", "Operating Systems", "Digital Logic", "HW/SW Co-design"],
    },
    { key: "tools", group: t("Tools", "Công cụ", "ツール"), items: ["STM32CubeIDE", "PlatformIO", "VS Code", "Git", "GitHub", "Firebase"] },
  ],

  softSkills: [
    t("Technical Leadership", "Lãnh đạo kỹ thuật", "技術リーダーシップ"),
    t("Mentoring", "Mentoring", "メンタリング"),
    t("Problem Solving", "Giải quyết vấn đề", "問題解決"),
    t("Analytical Thinking", "Tư duy phân tích", "分析的思考"),
    t("Teamwork", "Làm việc nhóm", "チームワーク"),
    t("Communication", "Giao tiếp", "コミュニケーション"),
  ],
};

/** Technologies shown in the logo strip; `icon` keys map to react-icons/si in tech-strip.tsx. */
export const techLogos = [
  { name: "C", icon: "c" },
  { name: "C++", icon: "cplusplus" },
  { name: "STMicroelectronics", icon: "stmicroelectronics" },
  { name: "Espressif", icon: "espressif" },
  { name: "Arduino", icon: "arduino" },
  { name: "Kria", icon: "amd", wordmark: true },
  { name: "Arm", icon: "arm", wordmark: true, logoOnly: true },
  { name: "Embedded Linux", icon: "linux" },
  { name: "PlatformIO", icon: "platformio" },
  { name: "TensorFlow Lite", icon: "tensorflow" },
  { name: "Firebase", icon: "firebase" },
  { name: "Git", icon: "git" },
  { name: "Python", icon: "python" },
] as const;

/** Section anchors, in page order; labels come from the dictionary (`dict.nav`). */
export const sectionIds = ["about", "experience", "startup", "projects", "awards", "skills", "contact"] as const;
export type SectionId = (typeof sectionIds)[number];

export type Content = Resolved<typeof raw>;
export type Experience = Content["experience"][number];
export type Project = Content["projects"][number];
export type Milestone = Content["startup"]["milestones"][number];
export type Award = Content["awards"][number];

const cache = new Map<Locale, Content>();

/** The whole site content in one language. Prefer `getContent()` from src/i18n/server.ts in components. */
export function contentFor(locale: Locale): Content {
  let resolved = cache.get(locale);
  if (!resolved) {
    resolved = resolve(raw, locale);
    cache.set(locale, resolved);
  }
  return resolved;
}
