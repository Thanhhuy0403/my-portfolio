import type { StaticImageData } from "next/image";

import innoworksCeremony from "@/assets/awards/innoworks-ceremony.jpg";
import innoworksAnnouncement from "@/assets/awards/innoworks-announcement.jpg";
import siuFirstPrize from "@/assets/awards/siu-first-prize.jpg";
import vifotecCertificate from "@/assets/awards/vifotec-certificate.jpg";
import moetCertificate from "@/assets/awards/moet-certificate.jpg";
import outstandingStudent from "@/assets/awards/outstanding-student.jpg";
import advantechLogo from "@/assets/logos/advantech.png";
import banvienLogo from "@/assets/logos/banvien.png";
import fptUniversityLogo from "@/assets/logos/fpt-university.png";
import ftesLogo from "@/assets/logos/ftes.png";
import hcmutLogo from "@/assets/logos/hcmut.png";
import siuLogo from "@/assets/logos/siu.png";
import techfestLogo from "@/assets/logos/techfest.png";
import youthUnionLogo from "@/assets/logos/youth-union.png";

/**
 * Single source of truth for every piece of content on the site.
 * Edit this file to update the portfolio — components only render it.
 */

export const site = {
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  title: "Phan Thanh Huy — Embedded Software Engineer",
  description:
    "Portfolio of Phan Thanh Huy, Embedded Software Engineer at Ban Vien and Co-Founder of FTES. Embedded C/C++, STM32, ESP32, FreeRTOS and FPGA SoC design. Computer Engineering, HCMUT.",
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
    "Ho Chi Minh City",
  ],
  locale: "en_US",
};

export const person = {
  name: "Phan Thanh Huy",
  shortName: "Thanh Huy",
  role: "Embedded Software Engineer",
  tagline:
    "I write firmware that talks to hardware — from STM32 registers and RTOS tasks to FPGA accelerators running real-time ECG classification.",
  location: "Binh Thanh, Ho Chi Minh City, Vietnam",
  email: "huythanhphan2020fpt@gmail.com",
  phone: "+84 343 704 397",
  phoneHref: "tel:+84343704397",
  cv: "/cv/Phan-Thanh-Huy-CV.pdf",
  toeic: "TOEIC L&R 675",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/Thanhhuy0403", icon: "github" },
  {
    label: "Facebook",
    href: "https://www.facebook.com/thanhhuy.phan.52035772",
    icon: "facebook",
  },
  { label: "FTES", href: "https://ftes.vn/vi", icon: "globe" },
] as const;

export const stats = [
  { value: "3", label: "Thesis & projects graded A / A+" },
  { value: "5", label: "Competition & academic awards" },
  { value: "2+", label: "Years mentoring C/C++ & CP" },
  { value: "3.1", label: "GPA / 4.0 at HCMUT" },
];

export const overview = [
  "Strong in C/C++, OOP, data structures & algorithms, and problem-solving.",
  "Solid Embedded C fundamentals — pointers, memory layout, bitwise operations, volatile and interrupts.",
  "Hands-on with STM32, ESP32, Arduino, Micro:bit and FPGA; GPIO, ADC, PWM, timers and UART / SPI / I²C.",
  "Co-Founder & Technical Leader of FTES, mentoring C/C++ and competitive programming for 2+ years.",
];

export type OrgLogoImage = { src: StaticImageData; alt: string };

/**
 * Official logos, used wherever these organisations appear.
 * FTES and Ban Vien were supplied by the owner; the rest come from Wikimedia Commons
 * (HCMUT, Advantech, FPT University, TECHFEST, HCM Communist Youth Union) and siu.edu.vn.
 */
export const logos = {
  banvien: { src: banvienLogo, alt: "Ban Vien logo" },
  ftes: { src: ftesLogo, alt: "FTES logo" },
  hcmut: { src: hcmutLogo, alt: "HCMUT logo" },
  advantech: { src: advantechLogo, alt: "Advantech logo" },
  fptUniversity: { src: fptUniversityLogo, alt: "FPT University logo" },
  techfest: { src: techfestLogo, alt: "TECHFEST Vietnam logo" },
  youthUnion: { src: youthUnionLogo, alt: "Ho Chi Minh Communist Youth Union logo" },
  siu: { src: siuLogo, alt: "Saigon International University logo" },
} satisfies Record<string, OrgLogoImage>;

export type Experience = {
  company: string;
  logo?: OrgLogoImage;
  href?: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    company: "Ban Vien Corporation",
    logo: logos.banvien,
    href: "https://banvien.com",
    role: "Embedded Software Engineer",
    period: "2026 — Present",
    location: "Ho Chi Minh City",
    current: true,
    summary:
      "Building embedded software at a Vietnamese technology company focused on firmware, driver development and embedded systems for global clients.",
    highlights: [
      "Developing and maintaining embedded software in C/C++ for microcontroller-based products.",
      "Working across the firmware stack — peripherals, drivers, RTOS tasks and hardware bring-up.",
      "Following a structured engineering process: code review, testing and documentation.",
    ],
    tags: ["Embedded C", "C/C++", "MCU", "RTOS", "Drivers"],
  },
  {
    company: "FTES",
    logo: logos.ftes,
    href: "https://ftes.vn/vi",
    role: "Co-Founder & Technical Leader",
    period: "2025 — Present",
    location: "Ho Chi Minh City",
    current: true,
    summary:
      "FTES is a tech-education startup — “your learning operating system” — combining structured programming courses, live mentoring and FrosTES, an AI teaching assistant.",
    highlights: [
      "Co-founded the company (incorporated 08/2025) and lead its technical direction and product.",
      "Mentor for C/C++ and competitive programming for 2+ years, guiding students from fundamentals to contests.",
      "Grew FTES to 4,000+ learners and close to 1B VND revenue in its first year; raised a 100M VND first round.",
    ],
    tags: ["Leadership", "Mentoring", "EdTech", "AI", "Product"],
  },
];

export const education = {
  school: "Ho Chi Minh City University of Technology (HCMUT)",
  logo: logos.hcmut,
  degree: "Bachelor of Engineering in Computer Engineering",
  period: "08/2022 — 06/2026",
  gpa: "3.1 / 4.0",
  thesis: "FPGA-Based SoC for ECG Signal Classification — Grade A",
  coursework: [
    "Digital Logic Design",
    "Computer Architecture",
    "Computer Organization",
    "Operating Systems",
    "Data Structures & Algorithms",
    "OOP",
  ],
};

export type Project = {
  slug: "fpga-ecg" | "esp32-iot" | "plant-health";
  title: string;
  kind: string;
  period: string;
  grade: string;
  repo: string;
  summary: string;
  /** Short facts pulled from the source code, shown as spec chips */
  specs: { label: string; value: string }[];
  points: string[];
  stack: string[];
  /** Optional real/AI photo (see docs/AI-IMAGE-PROMPTS.md). When set it replaces the UI mockup. */
  photo?: { src: StaticImageData; alt: string };
};

export const projects: Project[] = [
  {
    slug: "fpga-ecg",
    title: "FPGA-Based SoC for ECG Signal Classification",
    kind: "Graduation Thesis",
    period: "11/2025 — 05/2026",
    grade: "A",
    repo: "https://github.com/Thanhhuy0403/FPGA-ECG-Classifier",
    summary:
      "A heterogeneous SoC on the AMD Kria KV260: a custom CGRA accelerator in Verilog runs an int8-quantised 1D-CNN, while Linux software on the ARM cores streams ECG segments over AXI/DMA and renders results live.",
    specs: [
      { label: "Platform", value: "Kria KV260" },
      { label: "Accelerator", value: "CGRA · 16 PE" },
      { label: "Model", value: "1D-CNN · int8" },
      { label: "Input", value: "320-sample segments" },
    ],
    points: [
      "Integrated a custom CGRA/CNN accelerator (Verilog: PE array, MAC, quantiser, load/store units, AXI interface) with the ARM processing system.",
      "Trained the 1D-CNN in Keras, quantised it to int8 and ported inference to C/C++ to bit-match the hardware.",
      "Wrote the Linux user-space driver: mmap of AXI register windows and DDR, DMA transfers, start/finish handshakes.",
      "Built a real-time SDL2 dashboard that plots each ECG segment next to the predicted class.",
    ],
    stack: ["Verilog", "C/C++", "Embedded Linux", "AXI", "DMA", "MMIO", "Keras", "TFLite int8", "SDL2"],
  },
  {
    slug: "esp32-iot",
    title: "ESP32 IoT Monitoring & Control System",
    kind: "Embedded Project",
    period: "08/2025 — 10/2025",
    grade: "A+",
    repo: "https://github.com/Thanhhuy0403/Big_Project_Embedded",
    summary:
      "An ESP32-S3 node that monitors temperature and humidity and drives a water pump, LCD and RGB LED — every job is its own FreeRTOS task, controlled from an on-device web dashboard and Firebase.",
    specs: [
      { label: "MCU", value: "ESP32-S3 (Yolo UNO)" },
      { label: "RTOS", value: "FreeRTOS multitasking" },
      { label: "Cloud", value: "Firebase RTDB" },
      { label: "UI", value: "Web app on LittleFS" },
    ],
    points: [
      "Split the firmware into independent FreeRTOS tasks: Wi-Fi, web server, Firebase sync, sensing, pump, LCD and LED.",
      "DHT20 over I²C, PWM-driven actuators and NeoPixel status feedback.",
      "Served a responsive HTML/JS dashboard from LittleFS and synced configuration both ways with Firebase as JSON.",
    ],
    stack: ["ESP32-S3", "FreeRTOS", "C++", "PlatformIO", "I²C", "PWM", "Wi-Fi", "Firebase", "LittleFS"],
  },
  {
    slug: "plant-health",
    title: "AI-Integrated Plant Health Monitoring",
    kind: "Embedded Project",
    period: "04/2025 — 06/2025",
    grade: "A+",
    repo: "https://github.com/Thanhhuy0403/Plant_Health_Monitoring",
    summary:
      "A dual-MCU plant monitor: bare-metal STM32 firmware with its own task scheduler collects sensor data, hands it to an ESP32 over UART, and an AI model classifies plant health for a React dashboard.",
    specs: [
      { label: "MCU", value: "STM32F103RB" },
      { label: "Firmware", value: "Bare-metal + scheduler" },
      { label: "Link", value: "UART → ESP32" },
      { label: "App", value: "React + TypeScript" },
    ],
    points: [
      "Wrote HAL-based drivers for the DHT20 sensor, I²C LCD and RGB status LED in Embedded C (STM32CubeIDE).",
      "Built a lightweight task scheduler to run sensing, display and communication jobs periodically without an RTOS.",
      "Framed sensor packets over UART to an ESP32 gateway feeding the AI health classifier and web dashboard.",
    ],
    stack: ["STM32F103", "Embedded C", "HAL", "UART", "I²C", "DHT20", "ESP32", "AI", "React"],
  },
];

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

/* ---------------- FTES startup ---------------- */

const FPTU_STORY =
  "https://daihoc.fpt.edu.vn/tin-tuc/do-an-khoi-nghiep-cua-sinh-vien-fptu-dat-doanh-thu-gan-1-ty-dong-sau-1-nam/";

export type Milestone = {
  kind: "funding" | "award" | "program" | "scholarship";
  badge: string;
  title: string;
  org: string;
  date: string;
  description: string;
  sources: { label: string; href: string }[];
  /** Optional event photo (e.g. from ftes.vn/achievements). Shown above the card, opens in a lightbox. */
  photo?: { src: StaticImageData; alt: string };
  /** Organiser's logo; replaces the generic kind icon when present. */
  logo?: OrgLogoImage;
};

export const startup = {
  name: "FTES",
  href: "https://ftes.vn/vi",
  tagline: "AI-learning platform for technology learners",
  role: "Co-Founder & Technical Leader",
  summary:
    "FTES (First Technology Education Solution) pairs human mentors with AI tools — real-time code help, AI grading, personalised roadmaps and auto-generated quizzes — so IT students learn by building real projects.",
  metrics: [
    { value: "4,000+", label: "learners across 5 FPTU campuses" },
    { value: "~1B", label: "VND revenue in the first year" },
    { value: "100M", label: "VND raised in the first round" },
    { value: "6", label: "startup milestones in 2025" },
  ],
  metricsSource: { label: "FPT University, 05/2026", href: FPTU_STORY },
  milestones: [
    {
      kind: "funding",
      badge: "100M VND",
      title: "First funding round closed",
      org: "Investment-connection day · Vietnam National Startup Association",
      date: "2025",
      description: "Raised 100 million VND in FTES’s very first fundraising round, pitching to investors and startup experts.",
      sources: [{ label: "FTES announcement", href: "https://www.facebook.com/share/r/1CqoWaFiN8/" }],
    },
    {
      kind: "award",
      badge: "Top 100",
      logo: logos.techfest,
      title: "Top 100 startups — TECHFEST Vietnam 2025",
      org: "Ministry of Science & Technology · Hanoi People’s Committee",
      date: "Dec 2025",
      description:
        "Named among the 100 outstanding startups at Vietnam’s national innovation & startup festival in Hanoi.",
      sources: [
        { label: "FTES announcement", href: "https://www.facebook.com/share/p/1DHzPpWe8W/" },
        {
          label: "About TECHFEST 2025",
          href: "https://english.hanoi.gov.vn/featured-news/techfest-vietnam-2025-to-take-place-on-december-12-14-2655251204160753642.htm",
        },
      ],
    },
    {
      kind: "award",
      badge: "Top 4",
      title: "Top 4 innovative startups — Gia Lai 2025",
      org: "Gia Lai Department of Science & Technology",
      date: "Dec 2025",
      description:
        "One of four startups selected to pitch for investment at the province’s 2025 innovation Demo Day.",
      sources: [
        {
          label: "Báo Gia Lai",
          href: "https://baogialai.com.vn/gia-lai-ket-noi-va-goi-von-dau-tu-cho-4-du-an-khoi-nghiep-nam-2025-post575022.html",
        },
      ],
    },
    {
      kind: "award",
      badge: "3rd Prize",
      logo: logos.youthUnion,
      title: "Third Prize — Gia Lai Youth Startup Innovation 2025",
      org: "Gia Lai Provincial Youth Union",
      date: "Dec 2025",
      description: "From 70 entries to the 10-team final, then third place overall for the FTES AI-learning platform.",
      sources: [
        {
          label: "Báo Gia Lai — finalists",
          href: "https://baogialai.com.vn/10-du-an-vao-chung-ket-cuoc-thi-thanh-nien-gia-lai-khoi-nghiep-sang-tao-post573678.html",
        },
        { label: "FPT University", href: FPTU_STORY },
      ],
    },
    {
      kind: "program",
      badge: "Top 30 · 80M VND",
      title: "Incubated startup — Innovation Quest 2025",
      org: "Innovation & startup programme · Ho Chi Minh City",
      date: "2025",
      description: "Selected into the Top 30 of the incubation programme and awarded 80 million VND in sponsorship.",
      sources: [
        { label: "FTES announcement", href: "https://www.facebook.com/share/p/1D2j1sS8Uo/" },
        { label: "FPT University", href: FPTU_STORY },
      ],
    },
    {
      kind: "scholarship",
      logo: logos.fptUniversity,
      badge: "Scholarship",
      title: "Startup Scholarship — FPT University 2025",
      org: "FPT University",
      date: "2025",
      description: "Backed by FPT University’s startup scholarship, including a 50 million VND seed grant for the project.",
      sources: [
        { label: "FTES announcement", href: "https://www.facebook.com/share/p/1ANtcVpcoY/" },
        { label: "FPT University", href: FPTU_STORY },
      ],
    },
  ] satisfies Milestone[] as Milestone[],
};

export type Award = {
  title: string;
  prize: string;
  date: string;
  /** ISO-ish date used for ordering and structured data */
  year: number;
  org: string;
  team?: string;
  description: string;
  images: { src: StaticImageData; alt: string; position?: string }[];
  /** Where a visitor can read about the competition (press, official page or organiser). */
  links: { label: string; href: string }[];
  /** Organisers' logos, shown next to the organiser line. */
  logos?: OrgLogoImage[];
  highlight?: boolean;
};

export const awards: Award[] = [
  {
    title: "Startup SIU 2023",
    prize: "First Prize",
    date: "Apr 2023",
    year: 2023,
    org: "Saigon International University — 5th Student Scientific Research & Startup Competition",
    team: "Sysma Team",
    highlight: true,
    logos: [logos.siu],
    description:
      "Won first prize at the final round of the 5th Student Scientific Research and Startup Competition (academic year 2022–2023).",
    links: [{ label: "Saigon International University", href: "https://siu.edu.vn" }],
    images: [
      { src: siuFirstPrize, alt: "Phan Thanh Huy holding the First Prize board at the Startup SIU 2023 final round", position: "50% 62%" },
    ],
  },
  {
    title: "AIoT Developer InnoWorks 2022",
    prize: "Fourth Prize",
    date: "Dec 2022 — May 2023",
    year: 2023,
    org: "Advantech × HCMUT — “Code the future”",
    logos: [logos.advantech, logos.hcmut],
    team: "Sysma Team",
    description:
      "Reached the final round of the AIoT application development contest hosted by Advantech (WISE-PaaS) and HCMUT, receiving the Encouragement (Fourth) Prize of 6,000,000 VND.",
    links: [
      { label: "Advantech InnoWorks", href: "https://page.advantech.com/innoworks" },
      { label: "InnoWorks 2022 in Vietnam", href: "https://en.hcmute.edu.vn/ArticleId/c4d21cfe-777a-43cc-8af2-98748e3be719" },
    ],
    images: [
      { src: innoworksCeremony, alt: "Sysma team receiving the Fourth Prize at the AIoT Developer InnoWorks 2022 final round" },
      { src: innoworksAnnouncement, alt: "Award announcement slide for Sysma team at AIoT Developer InnoWorks 2022" },
    ],
  },
  {
    title: "National Science & Technology Award for Students",
    prize: "Fourth Prize",
    date: "Nov — Dec 2023",
    year: 2023,
    org: "Ministry of Education and Training & VIFOTEC",
    team: "Team of 5 students",
    description:
      "Encouragement (Fourth) Prize in the 2023 Science and Technology Award for Students in Higher Education Institutions — certified by the Ministry of Education and Training and the Vietnam Fund for Supporting Technological Creations.",
    links: [{ label: "Nhân Dân — 2023 award", href: "https://nhandan.vn/post-769324.html" }],
    images: [
      { src: vifotecCertificate, alt: "VIFOTEC certificate of merit for the 2023 student science and technology award", position: "50% 50%" },
      { src: moetCertificate, alt: "Ministry of Education and Training certificate for the 2023 student science and technology award" },
    ],
  },
  {
    title: "CSE MINATHON 2024",
    prize: "Most Voted Team Award",
    date: "Jan 2024",
    year: 2024,
    org: "Faculty of Computer Science and Engineering, HCMUT",
    logos: [logos.hcmut],
    description:
      "Received the Most Voted Team Award at CSE MINATHON 2024, organised by the Faculty of Computer Science and Engineering.",
    images: [],
    links: [{ label: "Faculty of CSE, HCMUT", href: "https://cse.hcmut.edu.vn" }],
  },
  {
    title: "Outstanding Student Award",
    prize: "Outstanding Student 2022–2023",
    date: "Mar 2024",
    year: 2024,
    org: "Faculty of Computer Science and Engineering, HCMUT",
    logos: [logos.hcmut],
    description:
      "Recognised as an outstanding student of the Faculty of Computer Science and Engineering for the 2022–2023 academic year.",
    links: [{ label: "Faculty of CSE, HCMUT", href: "https://cse.hcmut.edu.vn" }],
    images: [
      { src: outstandingStudent, alt: "Framed Outstanding Student certificate from the HCMUT Faculty of Computer Science and Engineering", position: "50% 40%" },
    ],
  },
];

export const skills = [
  { group: "Languages", items: ["C", "C++", "Embedded C", "Verilog", "Python (basic)"] },
  { group: "Microcontrollers & HW", items: ["STM32", "ESP32", "Arduino", "Micro:bit", "FPGA (Kria KV260)"] },
  { group: "Protocols & Buses", items: ["UART", "SPI", "I²C", "AXI", "Wi-Fi", "REST"] },
  { group: "Peripherals", items: ["GPIO", "ADC", "PWM", "Timers", "Interrupts", "DMA", "Sensors", "Relays"] },
  { group: "Systems", items: ["FreeRTOS", "Embedded Linux", "Computer Architecture", "Operating Systems", "Digital Logic", "HW/SW Co-design"] },
  { group: "Tools", items: ["STM32CubeIDE", "PlatformIO", "VS Code", "Git", "GitHub", "Firebase"] },
];

export const softSkills = [
  "Technical Leadership",
  "Mentoring",
  "Problem Solving",
  "Analytical Thinking",
  "Teamwork",
  "Communication",
];

export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "startup", label: "Startup" },
  { id: "projects", label: "Projects" },
  { id: "awards", label: "Awards" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];
