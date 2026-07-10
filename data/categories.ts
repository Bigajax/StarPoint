/**
 * Categorias e estilos exibidos no site — editáveis.
 * `virtual: true` = agrupamento (não é valor de Product.category).
 */
export type Category = {
  slug: string;
  name: string;
  image?: string;
  /** filtro aplicado ao catálogo */
  match: { categories?: string[]; gender?: "masculino" | "feminino" };
};

export const categories: Category[] = [
  { slug: "tenis", name: "Tênis", image: "/images/categorias/tenis.jpg", match: { categories: ["tenis"] } },
  { slug: "camisetas", name: "Camisetas", image: "/images/categorias/camisetas.jpg", match: { categories: ["camisetas"] } },
  { slug: "moletons", name: "Moletons", image: "/images/categorias/moletons.jpg", match: { categories: ["moletons", "jaquetas"] } },
  { slug: "calcas-bermudas", name: "Calças e bermudas", image: "/images/categorias/calcas.jpg", match: { categories: ["calcas-bermudas"] } },
  { slug: "acessorios", name: "Acessórios", image: "/images/categorias/acessorios.jpg", match: { categories: ["acessorios"] } },
  { slug: "feminino", name: "Feminino", image: "/images/categorias/feminino.jpg", match: { gender: "feminino" } },
  { slug: "roupas", name: "Roupas", match: { categories: ["camisetas", "moletons", "calcas-bermudas", "jaquetas"] } },
  { slug: "masculino", name: "Masculino", match: { gender: "masculino" } },
  { slug: "jaquetas", name: "Jaquetas", match: { categories: ["jaquetas"] } },
];

export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);

/** as 6 exibidas na home */
export const homeCategories = categories.slice(0, 6);

export type Style = { slug: string; name: string; image: string; blurb: string };

export const styles: Style[] = [
  { slug: "casual", name: "Casual", image: "/images/estilos/casual.jpg", blurb: "Pra todo dia, sem esforço." },
  { slug: "streetwear", name: "Streetwear", image: "/images/estilos/streetwear.jpg", blurb: "Gráficos fortes, corte largo." },
  { slug: "skate", name: "Skate", image: "/images/estilos/skate.jpg", blurb: "Feito pra rodar e durar." },
  { slug: "retro", name: "Retrô", image: "/images/estilos/retro.jpg", blurb: "Os clássicos de volta." },
  { slug: "esportivo", name: "Esportivo", image: "/images/estilos/esportivo.jpg", blurb: "Técnico dentro e fora do treino." },
  { slug: "essentials", name: "Essentials", image: "/images/estilos/essentials.jpg", blurb: "Básicos bem-feitos." },
];

export const getStyle = (slug: string) => styles.find((s) => s.slug === slug);
