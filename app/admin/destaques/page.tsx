"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { toast } from "@/components/Toaster";

/** Ordem das seções da home — reordenação visual de demonstração. */
const initial = [
  "Hero principal",
  "Faixa de confiança",
  "Categorias em destaque",
  "Acabou de chegar",
  "Banner de reserva",
  "Marcas",
  "Encontre o seu estilo",
  "Os favoritos da Star Point",
  "Monte o look",
  "Bloco local",
  "Instagram",
  "Lista VIP",
];

export default function AdminDestaques() {
  const [sections, setSections] = useState(initial);

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= sections.length) return;
    const next = [...sections];
    [next[i], next[j]] = [next[j], next[i]];
    setSections(next);
    toast("Ordem atualizada (demonstração)");
  };

  return (
    <div>
      <h1 className="display text-3xl uppercase">Destaques da home</h1>
      <p className="mt-1 text-sm text-steel">
        Reorganize as seções e banners da página inicial. Nesta demonstração a
        ordem não altera o site publicado.
      </p>
      <ol className="mt-6 space-y-2">
        {sections.map((s, i) => (
          <li
            key={s}
            className="flex items-center gap-3 rounded-lg bg-paper px-4 py-3"
          >
            <span className="display w-8 text-lg tabular-nums text-steel">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 text-sm font-semibold">{s}</span>
            <button
              type="button"
              onClick={() => move(i, -1)}
              disabled={i === 0}
              aria-label={`Subir ${s}`}
              className="grid size-8 place-items-center rounded hover:bg-cloud disabled:opacity-30"
            >
              <ArrowUp className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => move(i, 1)}
              disabled={i === sections.length - 1}
              aria-label={`Descer ${s}`}
              className="grid size-8 place-items-center rounded hover:bg-cloud disabled:opacity-30"
            >
              <ArrowDown className="size-4" />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
