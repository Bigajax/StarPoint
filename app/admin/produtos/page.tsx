"use client";

import Image from "next/image";
import { Plus, RotateCcw, Trash2 } from "lucide-react";
import { useAdminProducts } from "@/lib/adminStore";
import { getBrand } from "@/data/brands";
import { brl } from "@/lib/format";
import { toast } from "@/components/Toaster";

export default function AdminProdutos() {
  const { list, ready, update, resetAll, hasChanges } = useAdminProducts();
  if (!ready) return <p className="text-sm text-steel">Carregando…</p>;

  const active = list.filter((p) => !p.removed);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="display text-3xl uppercase">Produtos</h1>
          <p className="mt-1 text-sm text-steel">
            {active.length} ativos · alterações salvas automaticamente neste
            navegador
          </p>
        </div>
        <div className="flex gap-2">
          {hasChanges && (
            <button
              type="button"
              onClick={() => {
                resetAll();
                toast("Dados originais restaurados");
              }}
              className="flex items-center gap-2 rounded-lg border border-ink/20 bg-paper px-4 py-2.5 text-sm font-bold"
            >
              <RotateCcw className="size-4" aria-hidden />
              Restaurar padrão
            </button>
          )}
          <button
            type="button"
            onClick={() =>
              toast("Demonstração: o cadastro completo entra na integração")
            }
            className="flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-bold text-paper"
          >
            <Plus className="size-4" aria-hidden />
            Adicionar produto
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg bg-paper">
        <table className="w-full min-w-[44rem] text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-steel">
              <th className="px-4 py-3">Produto</th>
              <th className="px-2 py-3">Preço</th>
              <th className="px-2 py-3 text-center">Novo</th>
              <th className="px-2 py-3 text-center">Destaque</th>
              <th className="px-2 py-3 text-center">Oferta</th>
              <th className="px-2 py-3 text-center">Na loja</th>
              <th className="px-2 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {active.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-2.5">
                  <span className="flex items-center gap-3">
                    <Image
                      src={p.images[0]}
                      alt=""
                      width={36}
                      height={48}
                      className="rounded object-cover"
                    />
                    <span>
                      <span className="block font-semibold">{p.name}</span>
                      <span className="text-xs text-steel">
                        {getBrand(p.brand)?.name} · {p.sku}
                      </span>
                    </span>
                  </span>
                </td>
                <td className="px-2 py-2.5">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={p.price}
                    onChange={(e) =>
                      update(p.slug, { price: Number(e.target.value) })
                    }
                    aria-label={`Preço de ${p.name}`}
                    className="w-24 rounded border border-ink/15 px-2 py-1.5 tabular-nums"
                  />
                  <span className="sr-only">{brl(p.price)}</span>
                </td>
                {(
                  [
                    ["newArrival", p.newArrival],
                    ["featured", p.featured],
                    ["onSale", p.onSale],
                    ["availableInStore", p.availableInStore],
                  ] as const
                ).map(([key, value]) => (
                  <td key={key} className="px-2 py-2.5 text-center">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => update(p.slug, { [key]: !value })}
                      aria-label={`${key} de ${p.name}`}
                      className="size-4 accent-ink"
                    />
                  </td>
                ))}
                <td className="px-2 py-2.5 text-right">
                  <button
                    type="button"
                    onClick={() => {
                      update(p.slug, { removed: true });
                      toast(`"${p.name}" removido da vitrine`);
                    }}
                    aria-label={`Remover ${p.name}`}
                    className="grid size-8 place-items-center rounded text-steel hover:bg-alert/10 hover:text-alert"
                  >
                    <Trash2 className="size-4" />
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
