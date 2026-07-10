"use client";

import { useMemo, useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import {
  facets,
  filterProducts,
  sortOptions,
  sortProducts,
  type Filters,
  type SortKey,
} from "@/lib/catalog";
import { ProductGrid } from "@/components/ProductGrid";
import { EmptyState } from "@/components/EmptyState";

const PAGE = 12;

const priceRanges = [
  { id: "ate-200", label: "Até R$ 200", min: 0, max: 200 },
  { id: "200-500", label: "R$ 200 a R$ 500", min: 200, max: 500 },
  { id: "500-800", label: "R$ 500 a R$ 800", min: 500, max: 800 },
  { id: "800-mais", label: "Acima de R$ 800", min: 800, max: Infinity },
];

/** filtros travados pela rota (página de categoria/estilo/marca) não aparecem na UI */
export type CatalogLock = Partial<
  Pick<Filters, "categoria" | "estilo" | "marca">
>;

export function CatalogClient({ lock = {} }: { lock?: CatalogLock }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [drawer, setDrawer] = useState(false);
  const [visible, setVisible] = useState(PAGE);

  const csv = (key: string) =>
    params.get(key)?.split(",").filter(Boolean) ?? [];

  const state = {
    q: params.get("q") ?? "",
    categoria: lock.categoria ?? params.get("categoria") ?? "",
    marca: lock.marca ?? csv("marca"),
    tamanho: csv("tamanho"),
    cor: csv("cor"),
    genero: params.get("genero") ?? "",
    preco: csv("preco"),
    novidades: params.get("novidades") === "1",
    ofertas: params.get("ofertas") === "1",
    disponivel: params.get("disponivel") === "1",
    ordenar: (params.get("ordenar") as SortKey) ?? "recentes",
  };

  const set = (patch: Partial<Record<string, string>>) => {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const toggleCsv = (key: string, value: string, current: string[]) => {
    const nextList = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    set({ [key]: nextList.join(",") });
  };

  useEffect(() => setVisible(PAGE), [params]);

  const results = useMemo(() => {
    const selectedRanges = priceRanges.filter((r) =>
      state.preco.includes(r.id)
    );
    const f: Filters = {
      q: state.q || undefined,
      categoria: state.categoria || undefined,
      estilo: lock.estilo,
      marca: state.marca.length ? state.marca : undefined,
      tamanho: state.tamanho.length ? state.tamanho : undefined,
      cor: state.cor.length ? state.cor : undefined,
      genero: state.genero || undefined,
      precoMin: selectedRanges.length
        ? Math.min(...selectedRanges.map((r) => r.min))
        : undefined,
      precoMax: selectedRanges.length
        ? Math.max(...selectedRanges.map((r) => r.max === Infinity ? 99999 : r.max))
        : undefined,
      novidades: state.novidades || undefined,
      ofertas: state.ofertas || undefined,
      disponivel: state.disponivel || undefined,
    };
    return sortProducts(filterProducts(f), state.ordenar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, lock.estilo]);

  const activeCount =
    state.marca.length +
    state.tamanho.length +
    state.cor.length +
    state.preco.length +
    (state.genero ? 1 : 0) +
    (state.categoria && !lock.categoria ? 1 : 0) +
    (state.novidades ? 1 : 0) +
    (state.ofertas ? 1 : 0) +
    (state.disponivel ? 1 : 0);

  const clearAll = () => {
    const keep = new URLSearchParams();
    if (state.q) keep.set("q", state.q);
    router.replace(`${pathname}?${keep.toString()}`, { scroll: false });
  };

  const f = facets();

  const panel = (
    <div className="space-y-6">
      {!lock.categoria && (
        <FilterGroup title="Categoria">
          {categories.slice(0, 6).map((c) => (
            <Check
              key={c.slug}
              label={c.name}
              checked={state.categoria === c.slug}
              onChange={() =>
                set({ categoria: state.categoria === c.slug ? "" : c.slug })
              }
            />
          ))}
        </FilterGroup>
      )}
      {!lock.marca && (
        <FilterGroup title="Marca">
          {brands.map((b) => (
            <Check
              key={b.slug}
              label={b.name}
              checked={state.marca.includes(b.slug)}
              onChange={() => toggleCsv("marca", b.slug, state.marca)}
            />
          ))}
        </FilterGroup>
      )}
      <FilterGroup title="Tamanho">
        <div className="flex flex-wrap gap-1.5">
          {f.sizes.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={state.tamanho.includes(s)}
              onClick={() => toggleCsv("tamanho", s, state.tamanho)}
              className={`min-w-10 rounded border px-2 py-1.5 text-xs font-bold transition-colors ${
                state.tamanho.includes(s)
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/20 hover:border-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Cor">
        {f.colors.map((c) => (
          <Check
            key={c}
            label={c}
            checked={state.cor.includes(c)}
            onChange={() => toggleCsv("cor", c, state.cor)}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Preço">
        {priceRanges.map((r) => (
          <Check
            key={r.id}
            label={r.label}
            checked={state.preco.includes(r.id)}
            onChange={() => toggleCsv("preco", r.id, state.preco)}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Gênero">
        {["masculino", "feminino"].map((g) => (
          <Check
            key={g}
            label={g === "masculino" ? "Masculino" : "Feminino"}
            checked={state.genero === g}
            onChange={() => set({ genero: state.genero === g ? "" : g })}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Mais filtros">
        <Check
          label="Novidades"
          checked={state.novidades}
          onChange={() => set({ novidades: state.novidades ? "" : "1" })}
        />
        <Check
          label="Ofertas"
          checked={state.ofertas}
          onChange={() => set({ ofertas: state.ofertas ? "" : "1" })}
        />
        <Check
          label="Disponível na loja"
          checked={state.disponivel}
          onChange={() => set({ disponivel: state.disponivel ? "" : "1" })}
        />
      </FilterGroup>
      {activeCount > 0 && (
        <button
          type="button"
          onClick={clearAll}
          className="w-full rounded-lg border border-ink/20 px-4 py-2.5 text-sm font-bold hover:border-alert hover:text-alert"
        >
          Limpar filtros ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
      {/* Filtros — sidebar desktop */}
      <aside className="hidden lg:block" aria-label="Filtros">
        {panel}
      </aside>

      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-steel" aria-live="polite">
            <strong className="text-ink">{results.length}</strong>{" "}
            {results.length === 1 ? "produto" : "produtos"}
            {state.q && (
              <>
                {" "}
                para <strong className="text-ink">“{state.q}”</strong>
              </>
            )}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="flex items-center gap-2 rounded-lg border border-ink/20 px-4 py-2.5 text-sm font-bold lg:hidden"
            >
              <SlidersHorizontal className="size-4" aria-hidden />
              Filtrar
              {activeCount > 0 && (
                <span className="grid size-5 place-items-center rounded-full bg-star text-[11px] font-extrabold">
                  {activeCount}
                </span>
              )}
            </button>
            <label className="flex items-center gap-2 text-sm">
              <span className="sr-only">Ordenar por</span>
              <select
                value={state.ordenar}
                onChange={(e) => set({ ordenar: e.target.value })}
                className="rounded-lg border border-ink/20 bg-paper px-3 py-2.5 text-sm font-semibold"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {results.length === 0 ? (
          <EmptyState
            title="Não encontramos produtos para esta busca."
            subtitle="Ajuste os filtros ou fale com a loja — o estoque muda toda semana."
            actionLabel="Limpar filtros"
            onAction={clearAll}
          />
        ) : (
          <>
            <ProductGrid products={results.slice(0, visible)} />
            {visible < results.length && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + PAGE)}
                  className="rounded-lg border-2 border-ink px-8 py-3.5 font-bold transition-colors hover:bg-ink hover:text-paper"
                >
                  Carregar mais ({results.length - visible} restantes)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Drawer mobile */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.button
              type="button"
              aria-label="Fechar filtros"
              className="fixed inset-0 z-50 bg-ink/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
            />
            <motion.div
              role="dialog"
              aria-label="Filtros"
              className="fixed inset-y-0 left-0 z-50 w-[min(20rem,88vw)] overflow-y-auto bg-paper p-5 lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="display text-lg uppercase">Filtrar</span>
                <button
                  type="button"
                  onClick={() => setDrawer(false)}
                  className="grid size-11 place-items-center rounded-lg hover:bg-cloud"
                  aria-label="Fechar filtros"
                >
                  <X className="size-5" />
                </button>
              </div>
              {panel}
              <button
                type="button"
                onClick={() => setDrawer(false)}
                className="mt-6 w-full rounded-lg bg-ink px-4 py-3.5 font-bold text-paper"
              >
                Ver {results.length}{" "}
                {results.length === 1 ? "produto" : "produtos"}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-b border-ink/10 pb-5">
      <legend className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em]">
        {title}
      </legend>
      <div className="space-y-2">{children}</div>
    </fieldset>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-4 accent-ink"
      />
      {label}
    </label>
  );
}
