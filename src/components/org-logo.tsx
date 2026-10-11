import Image, { type StaticImageData } from "next/image";

/**
 * An organisation's real logo on a white plate, so brand colours stay true on both themes
 * (the same treatment LinkedIn uses for company logos). Plates are landscape because most
 * logos here are wordmarks; pass `className` to size the plate.
 */
export function OrgLogo({
  logo,
  className = "h-10 w-20",
}: {
  logo: { src: StaticImageData; alt: string };
  className?: string;
}) {
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-xl bg-white px-2 py-1.5 ring-1 ring-black/5 ${className}`}>
      <Image src={logo.src} alt={logo.alt} className="h-full w-full object-contain" sizes="128px" />
    </span>
  );
}
