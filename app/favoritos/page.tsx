"use client";

import { MessageCircle, Trash2 } from "lucide-react";
import { products } from "@/data/products";
import { useFavorites } from "@/lib/favorites";
import { waFavorites } from "@/lib/whatsapp";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductGridSkeleton } from "@/components/Skeleton";
import { EmptyState } from "@/components/EmptyState";
import { toast } from "@/components/Toaster";

export default function FavoritosPage() {
  const { slugs, ready, clear } = useFavorites();
  const items = products.filter((p) => slugs.includes(p.slug));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="star-eyebrow text-ink/70">Sua seleção</p>
          <h1 className="display mt-2 text-4xl uppercase md:text-5xl">
            Seus favoritos
          </h1>
          <p className="mt-2 text-steel">
            Salvos neste navegador — envie a lista pra loja e consulte tudo de
            uma vez.
          </p>
        </div>
        {ready && items.length > 0 && (
          <div className="flex gap-2">
            <a
              href={waFavorites(items.map((p) => p.name))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-whats px-5 py-3 font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="size-4.5" aria-hidden />
              Consultar tudo
            </a>
            <button
              type="button"
              onClick={() => {
                clear();
                toast("Lista de favoritos limpa");
              }}
              className="flex items-center gap-2 rounded-lg border border-ink/20 px-5 py-3 font-bold transition-colors hover:border-alert hover:text-alert"
            >
              <Trash2 className="size-4.5" aria-hidden />
              Limpar
            </button>
          </div>
        )}
      </header>

      {!ready ? (
        <ProductGridSkeleton count={4} />
      ) : items.length === 0 ? (
        <EmptyState
          title="Você ainda não salvou nenhum produto."
          subtitle="Toque no coração de qualquer produto para guardar aqui."
          actionLabel="Explorar novidades"
          actionHref="/produtos?novidades=1"
        />
      ) : (
        <ProductGrid products={items} />
      )}
    </div>
  );
}
