import { Fragment, type CSSProperties } from "react";

/** Splits text into words so each one can slide up from a mask (see `.word` in globals.css). */
export function Words({ text, offset = 0 }: { text: string; offset?: number }) {
  // The space must sit outside the inline-block, otherwise it collapses and words run together.
  return text.split(" ").map((w, i) => (
    <Fragment key={i}>
      {i > 0 ? " " : null}
      <span className="word">
        <span style={{ "--w": i + offset } as CSSProperties}>{w}</span>
      </span>
    </Fragment>
  ));
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  id,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  id: string;
  align?: "left" | "center";
}) {
  return (
    <div data-reveal="words" className={`mb-12 max-w-3xl sm:mb-16 ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className={`mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-accent uppercase ${align === "center" ? "justify-center" : ""}`}>
        <span className="text-muted">{index}</span>
        <span aria-hidden className="h-px w-8 bg-accent/50" />
        {eyebrow}
      </p>
      <h2 id={id} className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
        <Words text={title} />
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg [.text-center_&]:mx-auto">
          {description}
        </p>
      ) : null}
    </div>
  );
}
