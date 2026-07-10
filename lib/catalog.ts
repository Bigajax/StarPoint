import { products, type Product } from "@/data/products";
import { getBrand } from "@/data/brands";
import { getCategory } from "@/data/categories";

export type Filters = {
  q?: string;
  categoria?: string; // slug de data/categories (aceita virtuais: roupas, feminino…)
  marca?: string[];
  tamanho?: string[];
  cor?: string[];
  genero?: string;
  precoMin?: number;
  precoMax?: number;
  novidades?: boolean;
  ofertas?: boolean;
  disponivel?: boolean;
  estilo?: string;
};

export type SortKey =
  | "recentes"
  | "procurados"
  | "menor-preco"
  | "maior-preco"
  | "a-z";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "recentes", label: "Mais recentes" },
  { value: "procurados", label: "Mais procurados" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "a-z", label: "Nome A–Z" },
];

const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function matchesQuery(p: Product, q: string): boolean {
  const brand = getBrand(p.brand)?.name ?? p.brand;
  const hay = norm(
    [p.name, brand, p.category, p.subcategory ?? "", p.sku, ...p.colors.map((c) => c.name), ...p.tags].join(" ")
  );
  return norm(q)
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => hay.includes(term));
}

export function filterProducts(f: Filters): Product[] {
  let list = [...products];

  if (f.categoria) {
    const cat = getCategory(f.categoria);
    if (cat) {
      if (cat.match.categories)
        list = list.filter((p) => cat.match.categories!.includes(p.category));
      if (cat.match.gender)
        list = list.filter(
          (p) => p.gender === cat.match.gender || p.gender === "unissex"
        );
    }
  }
  if (f.estilo) list = list.filter((p) => p.tags.includes(f.estilo!));
  if (f.marca?.length) list = list.filter((p) => f.marca!.includes(p.brand));
  if (f.tamanho?.length)
    list = list.filter((p) =>
      p.sizes.some(
        (s) => f.tamanho!.includes(s.label) && s.status !== "indisponivel"
      )
    );
  if (f.cor?.length)
    list = list.filter((p) =>
      p.colors.some((c) => f.cor!.map(norm).includes(norm(c.name)))
    );
  if (f.genero)
    list = list.filter(
      (p) => p.gender === f.genero || p.gender === "unissex"
    );
  if (f.precoMin != null) list = list.filter((p) => p.price >= f.precoMin!);
  if (f.precoMax != null) list = list.filter((p) => p.price <= f.precoMax!);
  if (f.novidades) list = list.filter((p) => p.newArrival);
  if (f.ofertas) list = list.filter((p) => p.onSale);
  if (f.disponivel) list = list.filter((p) => p.availableInStore);
  if (f.q) list = list.filter((p) => matchesQuery(p, f.q!));

  return list;
}

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const sorted = [...list];
  switch (sort) {
    case "menor-preco":
      return sorted.sort((a, b) => a.price - b.price);
    case "maior-preco":
      return sorted.sort((a, b) => b.price - a.price);
    case "a-z":
      return sorted.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    case "procurados":
      return sorted.sort(
        (a, b) => Number(b.bestSeller) - Number(a.bestSeller)
      );
    case "recentes":
    default:
      return sorted.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
  }
}

/** valores disponíveis para montar os filtros */
export function facets() {
  const sizes = new Set<string>();
  const colors = new Set<string>();
  let min = Infinity;
  let max = 0;
  for (const p of products) {
    p.sizes.forEach((s) => sizes.add(s.label));
    p.colors.forEach((c) => colors.add(c.name));
    min = Math.min(min, p.price);
    max = Math.max(max, p.price);
  }
  const sizeOrder = (a: string, b: string) => {
    const na = parseInt(a), nb = parseInt(b);
    if (!isNaN(na) && !isNaN(nb)) return na - nb;
    if (!isNaN(na)) return 1;
    if (!isNaN(nb)) return -1;
    const order = ["P", "M", "G", "GG"];
    return order.indexOf(a) - order.indexOf(b);
  };
  return {
    sizes: [...sizes].sort(sizeOrder),
    colors: [...colors].sort((a, b) => a.localeCompare(b, "pt-BR")),
    priceMin: Math.floor(min),
    priceMax: Math.ceil(max),
  };
}
