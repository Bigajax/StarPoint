import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Brand } from "@/data/brands";

/**
 * Card editorial de marca: foto de produto quando existe,
 * wordmark tipográfico sobre o split preto/amarelo quando não.
 */
export function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link
      href={`/marcas/${brand.slug}`}
      className="group relative block overflow-hidden rounded-lg bg-ink text-paper"
    >
      <span className="relative block aspect-[4/5]">
        {brand.image ? (
          <>
            <Image
              src={brand.image}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span
              className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent"
              aria-hidden
            />
          </>
        ) : (
          <span className="absolute inset-0" aria-hidden>
            <span className="absolute inset-0 bg-ink" />
            <span className="clip-diag absolute inset-0 bg-star opacity-[0.08] transition-opacity group-hover:opacity-20" />
            <span className="display-black absolute inset-0 grid place-items-center px-4 text-center text-3xl uppercase leading-none text-paper/90">
              {brand.name}
            </span>
          </span>
        )}
      </span>
      <span className="absolute inset-x-0 bottom-0 p-4 md:p-5">
        <span className="display block text-lg uppercase">{brand.name}</span>
        <span className="mt-1 block text-xs text-paper/75">{brand.tagline}</span>
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-star">
          Ver produtos
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </span>
    </Link>
  );
}
