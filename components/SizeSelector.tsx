"use client";

import type { ProductSize } from "@/data/products";

/**
 * Seletor de tamanho com três estados:
 * disponível · poucas unidades (ponto amarelo) · indisponível (riscado, não selecionável)
 */
export function SizeSelector({
  sizes,
  selected,
  onSelect,
}: {
  sizes: ProductSize[];
  selected: string | null;
  onSelect: (label: string) => void;
}) {
  const hasFew = sizes.some((s) => s.status === "poucas");
  return (
    <fieldset>
      <legend className="sr-only">Escolha o tamanho</legend>
      <div className="flex flex-wrap gap-2">
        {sizes.map((s) => {
          const off = s.status === "indisponivel";
          const active = selected === s.label;
          return (
            <button
              key={s.label}
              type="button"
              disabled={off}
              aria-pressed={active}
              onClick={() => onSelect(s.label)}
              className={`relative min-w-12 rounded-lg border px-3 py-2.5 text-sm font-bold transition-colors ${
                off
                  ? "cursor-not-allowed border-ink/10 text-steel/60 line-through"
                  : active
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/20 hover:border-ink"
              }`}
            >
              {s.label}
              {s.status === "poucas" && !off && (
                <span
                  className="absolute -right-1 -top-1 size-2.5 rounded-full bg-star ring-2 ring-paper"
                  aria-hidden
                />
              )}
              {s.status === "poucas" && (
                <span className="sr-only"> — poucas unidades</span>
              )}
              {off && <span className="sr-only"> — indisponível</span>}
            </button>
          );
        })}
      </div>
      {hasFew && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-steel">
          <span className="size-2 rounded-full bg-star" aria-hidden />
          Poucas unidades na loja
        </p>
      )}
    </fieldset>
  );
}
