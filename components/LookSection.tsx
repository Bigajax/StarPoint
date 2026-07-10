"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { getProduct } from "@/data/products";
import { getBrand } from "@/data/brands";
import { brl } from "@/lib/format";
import { SectionHeader } from "@/components/SectionHeader";

/**
 * Monte o look — imagem com pontos clicáveis no desktop,
 * lista horizontal de produtos no mobile. Itens editáveis abaixo.
 */
const hotspots = [
  { slug: "oakley-oculos-boné", label: "Óculos", x: 58, y: 13 },
  { slug: "thesaint-camiseta-tempo", label: "Camiseta", x: 52, y: 36 },
  { slug: "high-bermuda-jeans", label: "Bermuda", x: 48, y: 64 },
  { slug: "vans-old-skool-skate", label: "Tênis", x: 42, y: 88 },
];

export function LookSection() {
  const [open, setOpen] = useState<string | null>(null);
  const items = hotspots
    .map((h) => ({ ...h, product: getProduct(h.slug) }))
    .filter((h) => h.product);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-20" aria-labelledby="look">
      <SectionHeader
        eyebrow="Editorial"
        title="Monte o look"
        subtitle="Toque nos pontos para ver cada peça do visual."
      />
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg">
          <span className="relative block aspect-[3/4]">
            <Image
              src="/images/look.jpg"
              alt="Look completo: óculos, camiseta oversized, bermuda escura e tênis Vans"
              fill
              sizes="(max-width: 768px) 100vw, 28rem"
              className="object-cover"
            />
          </span>
          {/* pontos clicáveis — desktop */}
          {items.map((h) => (
            <div
              key={h.slug}
              className="absolute hidden -translate-x-1/2 -translate-y-1/2 md:block"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
            >
              <button
                type="button"
                onClick={() => setOpen(open === h.slug ? null : h.slug)}
                aria-expanded={open === h.slug}
                aria-label={`Ver ${h.label}`}
                className={`grid size-8 place-items-center rounded-full shadow-lg transition-all ${
                  open === h.slug
                    ? "rotate-45 bg-ink text-star"
                    : "bg-star text-ink hover:scale-110"
                }`}
              >
                <Plus className="size-4.5" aria-hidden />
              </button>
              <AnimatePresence>
                {open === h.slug && h.product && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute left-1/2 top-11 z-10 w-52 -translate-x-1/2 rounded-lg bg-paper p-3 shadow-xl"
                  >
                    <Link href={`/produto/${h.product.slug}`} className="flex gap-3">
                      <Image
                        src={h.product.images[0]}
                        alt=""
                        width={48}
                        height={64}
                        className="rounded object-cover"
                      />
                      <span className="text-xs">
                        <span className="block font-bold uppercase tracking-wide text-steel">
                          {getBrand(h.product.brand)?.name}
                        </span>
                        <span className="mt-0.5 block font-semibold leading-snug">
                          {h.product.name}
                        </span>
                        <span className="mt-1 block font-display font-extrabold">
                          {brl(h.product.price)}
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Lista das peças — sempre visível no mobile, complementar no desktop */}
        <ul className="grid gap-3">
          {items.map((h) => (
            <li key={h.slug}>
              <Link
                href={`/produto/${h.product!.slug}`}
                className="flex items-center gap-4 rounded-lg border border-ink/10 p-3 transition-colors hover:border-ink"
              >
                <Image
                  src={h.product!.images[0]}
                  alt=""
                  width={64}
                  height={85}
                  className="rounded object-cover"
                />
                <span className="flex-1">
                  <span className="star-eyebrow !text-[10px] text-steel">
                    {h.label}
                  </span>
                  <span className="block font-semibold">{h.product!.name}</span>
                  <span className="text-sm text-steel">
                    {getBrand(h.product!.brand)?.name}
                  </span>
                </span>
                <span className="font-display font-extrabold tabular-nums">
                  {brl(h.product!.price)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
