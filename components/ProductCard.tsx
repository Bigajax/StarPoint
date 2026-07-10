"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import type { Product } from "@/data/products";
import { getBrand } from "@/data/brands";
import { brl, discountPct, installmentText } from "@/lib/format";
import { waProduct } from "@/lib/whatsapp";
import { useFavorites } from "@/lib/favorites";
import { toast } from "@/components/Toaster";

export function ProductCard({
  product,
  badge,
}: {
  product: Product;
  badge?: string;
}) {
  const { has, toggle, ready } = useFavorites();
  const fav = ready && has(product.slug);
  const pct = discountPct(product.price, product.oldPrice);
  const parcelas = installmentText(product.price, product.installments);
  const availableSizes = product.sizes.filter(
    (s) => s.status !== "indisponivel"
  );
  const selo =
    badge ?? (product.newArrival ? "Novo" : pct ? `-${pct}%` : undefined);

  return (
    <article className="group relative flex flex-col">
      <Link
        href={`/produto/${product.slug}`}
        className="relative block overflow-hidden rounded-lg bg-cloud"
        aria-label={`${product.name} — ver detalhes`}
      >
        <span className="relative block aspect-[3/4]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
          <Image
            src={product.images[1] ?? product.images[0]}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </span>
        {selo && (
          <span
            className={`absolute left-2.5 top-2.5 rounded px-2 py-1 text-[11px] font-extrabold uppercase tracking-wide ${
              pct && !badge && !product.newArrival
                ? "bg-alert text-white"
                : "bg-star text-ink"
            }`}
          >
            {selo}
          </span>
        )}
      </Link>

      <button
        type="button"
        onClick={() => {
          toggle(product.slug);
          toast(fav ? "Removido dos favoritos" : "Salvo nos favoritos");
        }}
        aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        aria-pressed={fav}
        className="absolute right-2.5 top-2.5 grid size-9 place-items-center rounded-full bg-paper/90 shadow-sm transition-transform hover:scale-110"
      >
        <Heart
          className={`size-4.5 ${fav ? "fill-alert stroke-alert" : "stroke-ink"}`}
        />
      </button>

      <div className="flex flex-1 flex-col pt-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-steel">
          {getBrand(product.brand)?.name ?? product.brand}
        </p>
        <h3 className="mt-0.5 text-sm font-semibold leading-snug">
          <Link href={`/produto/${product.slug}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 flex items-baseline gap-2">
          <span className="font-display text-base font-extrabold tabular-nums">
            {brl(product.price)}
          </span>
          {product.oldPrice && (
            <s className="text-xs tabular-nums text-steel">
              {brl(product.oldPrice)}
            </s>
          )}
        </p>
        {parcelas && <p className="text-xs text-steel">{parcelas}</p>}

        <p className="mt-2 flex flex-wrap items-center gap-1 text-[11px] text-steel">
          {availableSizes.slice(0, 6).map((s) => (
            <span key={s.label} className="rounded border border-ink/15 px-1.5 py-0.5">
              {s.label}
            </span>
          ))}
          <span className="ml-auto flex gap-1">
            {product.colors.map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="size-3 rounded-full border border-ink/20"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </span>
        </p>

        <a
          href={waProduct(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-ink/15 px-3 py-2.5 text-sm font-bold transition-colors hover:border-whats hover:bg-whats hover:text-white"
        >
          <MessageCircle className="size-4" aria-hidden />
          Consultar
        </a>
      </div>
    </article>
  );
}
