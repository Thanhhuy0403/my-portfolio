import Image, { type StaticImageData } from "next/image";

/**
 * An organisation's real logo on a white plate, so brand colours stay true on both themes
 * (the same treatment LinkedIn uses for company logos). Plates are landscape because most
 * logos here are wordmarks; pass `className` (sizes only) to size the plate, and `compact`
 * for small inline plates. Padding and radius live here so they never conflict with callers.
 */
export function OrgLogo({
  logo,
  className = "h-10 w-20",
  compact = false,
}: {
  logo: { src: StaticImageData; alt: string };
  className?: string;
  compact?: boolean;
}) {
  const shape = compact ? "rounded-lg px-1.5 py-1" : "rounded-xl px-2 py-1.5";
  return (
    <span className={`flex shrink-0 items-center justify-center bg-white ring-1 ring-black/5 ${shape} ${className}`}>
      <Image src={logo.src} alt={logo.alt} className="h-full w-full object-contain" sizes="128px" />
    </span>
  );
}
