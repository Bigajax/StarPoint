"use client";

import { useState } from "react";
import { Heart, MessageCircle, Store } from "lucide-react";
import type { Product } from "@/data/products";
import { waProduct, waReserve } from "@/lib/whatsapp";
import { useFavorites } from "@/lib/favorites";
import { SizeSelector } from "@/components/SizeSelector";
import { toast } from "@/components/Toaster";

/**
 * Bloco interativo da página de produto: cor, tamanho e CTAs.
 * Com tamanhos disponíveis, o WhatsApp só abre após selecionar um tamanho.
 */
export function ProductActions({ product }: { product: Product }) {
  const single =
    product.sizes.length === 1 && product.sizes[0].label === "Único";
  const [size, setSize] = useState<string | null>(
    single ? product.sizes[0].label : null
  );
  const [color, setColor] = useState<string>(product.colors[0]?.name ?? "");
  const { has, toggle, ready } = useFavorites();
  const fav = ready && has(product.slug);

  const needsSize = !single && product.sizes.length > 0;
  const blocked = needsSize && !size;

  const guard = (e: React.MouseEvent) => {
    if (blocked) {
      e.preventDefault();
      toast("Selecione um tamanho para consultar");
      document
        .getElementById("tamanhos")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="space-y-6">
      {product.colors.length > 1 && (
        <fieldset>
          <legend className="mb-2 text-sm font-bold">
            Cor: <span className="font-normal text-steel">{color}</span>
          </legend>
          <div className="flex gap-2">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setColor(c.name)}
                aria-pressed={color === c.name}
                aria-label={`Cor ${c.name}`}
                className={`size-9 rounded-full border-2 transition-all ${
                  color === c.name
                    ? "border-ink ring-2 ring-star"
                    : "border-ink/20 hover:border-ink/50"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </fieldset>
      )}

      {needsSize && (
        <div id="tamanhos">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-bold">
              Tamanho:{" "}
              <span className="font-normal text-steel">
                {size ?? "selecione"}
              </span>
            </p>
            <a href="#guia-de-tamanho" className="text-xs font-semibold underline">
              Guia de tamanho
            </a>
          </div>
          <SizeSelector
            sizes={product.sizes}
            selected={size}
            onSelect={setSize}
          />
        </div>
      )}

      <div className="space-y-2.5">
        <a
          href={blocked ? "#tamanhos" : waProduct(product, size ?? undefined, color)}
          onClick={guard}
          target={blocked ? undefined : "_blank"}
          rel="noopener noreferrer"
          aria-disabled={blocked}
          className={`flex items-center justify-center gap-2 rounded-lg px-5 py-4 font-extrabold text-white transition-all ${
            blocked
              ? "cursor-not-allowed bg-whats/50"
              : "bg-whats hover:-translate-y-0.5 hover:shadow-lg hover:shadow-whats/25"
          }`}
        >
          <MessageCircle className="size-5" aria-hidden />
          Consultar no WhatsApp
        </a>
        <a
          href={blocked ? "#tamanhos" : waReserve(product, size ?? undefined, color)}
          onClick={guard}
          target={blocked ? undefined : "_blank"}
          rel="noopener noreferrer"
          aria-disabled={blocked}
          className={`flex items-center justify-center gap-2 rounded-lg border-2 border-ink px-5 py-3.5 font-extrabold transition-colors ${
            blocked
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-ink hover:text-paper"
          }`}
        >
          <Store className="size-5" aria-hidden />
          Reservar para retirada
        </a>
        <button
          type="button"
          onClick={() => {
            toggle(product.slug);
            toast(fav ? "Removido dos favoritos" : "Salvo nos favoritos");
          }}
          aria-pressed={fav}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold text-ink/70 transition-colors hover:bg-cloud"
        >
          <Heart
            className={`size-4.5 ${fav ? "fill-alert stroke-alert" : ""}`}
            aria-hidden
          />
          {fav ? "Nos favoritos" : "Adicionar aos favoritos"}
        </button>
      </div>

      <p className="rounded-lg bg-cloud px-4 py-3 text-xs leading-relaxed text-ink/70">
        A reserva depende de confirmação da equipe pelo WhatsApp. A
        disponibilidade pode mudar ao longo do dia — consulte antes de ir à
        loja.
      </p>

      {/* CTA fixo no mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper p-3 md:hidden">
        <a
          href={blocked ? "#tamanhos" : waProduct(product, size ?? undefined, color)}
          onClick={guard}
          target={blocked ? undefined : "_blank"}
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 font-extrabold text-white ${
            blocked ? "bg-whats/50" : "bg-whats"
          }`}
        >
          <MessageCircle className="size-5" aria-hidden />
          {blocked ? "Selecione um tamanho" : "Consultar no WhatsApp"}
        </a>
      </div>
    </div>
  );
}
