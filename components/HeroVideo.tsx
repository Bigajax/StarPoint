"use client";

import { useEffect, useRef } from "react";

/**
 * Vídeo de ambiente do hero: mudo, em loop, sem controles, sempre em
 * autoplay (vídeo mudo é permitido pelos navegadores). O useEffect é um
 * reforço para navegadores que ignoram o atributo em SSR.
 */
export function HeroVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // reforço: o React nem sempre serializa o atributo muted
    v.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      tabIndex={-1}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
