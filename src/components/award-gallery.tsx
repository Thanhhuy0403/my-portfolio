"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

type Img = { src: StaticImageData; alt: string; position?: string };

export function AwardGallery({
  images,
  title,
  tall = false,
}: {
  images: Img[];
  title: string;
  tall?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const cover = images[0];

  const open = () => {
    setIndex(0);
    dialogRef.current?.showModal();
    window.dispatchEvent(new CustomEvent("scroll-lock", { detail: true }));
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || images.length < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dialog.addEventListener("keydown", onKey);
    return () => dialog.removeEventListener("keydown", onKey);
  }, [images.length, step]);

  const current = images[index];

  return (
    <>
      <button
        type="button"
        onClick={open}
        className={`group/img relative block w-full overflow-hidden bg-surface-2 ${tall ? "aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[28rem]" : "aspect-[4/3]"}`}
        aria-label={`Open photos for ${title}`}
      >
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          placeholder="blur"
          sizes={tall ? "(min-width: 1024px) 380px, 100vw" : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"}
          style={{ objectPosition: cover.position ?? "50% 0%" }}
          className="object-cover transition-transform duration-500 group-hover/img:scale-[1.04]"
        />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-xs text-white backdrop-blur">
          <Expand className="size-3.5" aria-hidden="true" />
          {images.length > 1 ? `${images.length} photos` : "View"}
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={title}
        onClick={(e) => e.target === e.currentTarget && close()}
        onClose={() => window.dispatchEvent(new CustomEvent("scroll-lock", { detail: false }))}
        className="m-auto max-h-[92dvh] w-[min(64rem,94vw)] overflow-visible bg-transparent p-0 text-white"
      >
        <div className="relative">
          <div className="relative h-[min(80dvh,46rem)] w-full">
            <Image
              key={current.src.src}
              src={current.src}
              alt={current.alt}
              fill
              sizes="94vw"
              className="object-contain"
            />
          </div>
          <div className="mt-3 flex items-center justify-between gap-4 px-1">
            <p className="text-sm text-white/80">
              {current.alt}
              {images.length > 1 ? (
                <span className="ml-2 font-mono text-xs text-white/50">
                  {index + 1}/{images.length}
                </span>
              ) : null}
            </p>
            <div className="flex shrink-0 gap-2">
              {images.length > 1 ? (
                <>
                  <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                    <ChevronLeft className="size-5" aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => step(1)} aria-label="Next photo" className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                    <ChevronRight className="size-5" aria-hidden="true" />
                  </button>
                </>
              ) : null}
              <button type="button" onClick={close} aria-label="Close" className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
