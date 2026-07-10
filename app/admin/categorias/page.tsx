"use client";

import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { filterProducts } from "@/lib/catalog";
import { toast } from "@/components/Toaster";

export default function AdminCategorias() {
  return (
    <div>
      <h1 className="display text-3xl uppercase">Categorias</h1>
      <p className="mt-1 text-sm text-steel">
        Estrutura de navegação do site — editável em <code>data/categories.ts</code>.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const count = filterProducts({ categoria: c.slug }).length;
          return (
            <div key={c.slug} className="rounded-lg bg-paper p-5">
              <p className="display text-lg uppercase">{c.name}</p>
              <p className="mt-1 text-xs text-steel">
                /{c.slug} · {count} de {products.length} produtos
              </p>
              <button
                type="button"
                onClick={() => toast("Demonstração: edição entra na integração")}
                className="mt-4 rounded border border-ink/15 px-3 py-1.5 text-xs font-bold hover:border-ink"
              >
                Editar
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
