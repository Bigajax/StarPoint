"use client";

import { brands } from "@/data/brands";
import { products } from "@/data/products";
import { toast } from "@/components/Toaster";

export default function AdminMarcas() {
  return (
    <div>
      <h1 className="display text-3xl uppercase">Marcas</h1>
      <p className="mt-1 text-sm text-steel">
        Mix de marcas exibido no site — totalmente editável em{" "}
        <code>data/brands.ts</code>.
      </p>
      <div className="mt-6 overflow-hidden rounded-lg bg-paper">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-steel">
              <th className="px-4 py-3">Marca</th>
              <th className="px-2 py-3">Produtos no site</th>
              <th className="px-2 py-3">Destaque na home</th>
              <th className="px-2 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {brands.map((b) => (
              <tr key={b.slug}>
                <td className="px-4 py-3">
                  <span className="font-semibold">{b.name}</span>
                  <span className="block text-xs text-steel">{b.tagline}</span>
                </td>
                <td className="px-2 py-3 tabular-nums">
                  {products.filter((p) => p.brand === b.slug).length}
                </td>
                <td className="px-2 py-3">
                  {b.featured ? (
                    <span className="rounded bg-star px-2 py-0.5 text-xs font-extrabold">
                      ★ Sim
                    </span>
                  ) : (
                    <span className="text-xs text-steel">Não</span>
                  )}
                </td>
                <td className="px-2 py-3 text-right">
                  <button
                    type="button"
                    onClick={() =>
                      toast("Demonstração: edição entra na integração")
                    }
                    className="rounded border border-ink/15 px-3 py-1.5 text-xs font-bold hover:border-ink"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
