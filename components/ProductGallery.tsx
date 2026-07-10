"use client";

import Image from "next/image";
import { useState } from "react";

/** Galeria com miniaturas (desktop) e rolagem lateral (mobile). */
export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  return (
    <div className="min-w-0">
      {/* Mobile: swipe */}
      <div
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 md:hidden"
        aria-label={`Fotos de ${name}`}
      >
        {images.map((src, i) => (
          <span
            key={src + i}
            className="relative block aspect-[3/4] w-[82vw] max-w-sm shrink-0 snap-center overflow-hidden rounded-lg bg-cloud"
          >
            <Image
              src={src}
              alt={`${name} — foto ${i + 1}`}
              fill
              sizes="82vw"
              priority={i === 0}
              className="object-cover"
            />
          </span>
        ))}
      </div>

      {/* Desktop: principal + miniaturas */}
      <div className="hidden gap-3 md:flex">
        <div className="flex flex-col gap-3">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={active === i}
              className={`relative aspect-[3/4] w-20 overflow-hidden rounded-md bg-cloud transition-all ${
                active === i
                  ? "ring-2 ring-ink"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setZoom((z) => !z)}
          className="relative flex-1 cursor-zoom-in overflow-hidden rounded-lg bg-cloud"
          aria-label={zoom ? "Reduzir zoom" : "Ampliar foto"}
        >
          <span className="relative block aspect-[3/4]">
            <Image
              src={images[active]}
              alt={`${name} — foto ${active + 1}`}
              fill
              sizes="(max-width: 1280px) 45vw, 540px"
              priority
              className={`object-cover transition-transform duration-300 ${
                zoom ? "scale-150 cursor-zoom-out" : ""
              }`}
            />
          </span>
        </button>
      </div>
    </div>
  );
}
