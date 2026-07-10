"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

/** Carrossel horizontal com scroll-snap e setas (desktop). */
export function ProductCarousel({ products }: { products: Product[] }) {
  const track = useRef<HTMLUListElement>(null);

  const scroll = (dir: 1 | -1) => {
    track.current?.scrollBy({
      left: dir * track.current.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="mb-4 hidden justify-end gap-2 md:flex">
        <button
          type="button"
          onClick={() => scroll(-1)}
          className="grid size-11 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-paper"
          aria-label="Anteriores"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          className="grid size-11 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-paper"
          aria-label="Próximos"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
      <ul
        ref={track}
        className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2"
      >
        {products.map((p) => (
          <li
            key={p.id}
            className="w-[44vw] shrink-0 snap-start sm:w-56 md:w-64"
          >
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
