import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { products } from "@/data/products";
import { brands } from "@/data/brands";
import { categories, styles } from "@/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/produtos",
    "/marcas",
    "/favoritos",
    "/sobre",
    "/contato",
    "/reserva-retirada",
    "/trocas",
    "/politica-privacidade",
    "/termos",
  ].map((p) => ({ url: `${site.url}${p}` }));

  return [
    ...staticPages,
    ...products.map((p) => ({ url: `${site.url}/produto/${p.slug}` })),
    ...brands.map((b) => ({ url: `${site.url}/marcas/${b.slug}` })),
    ...categories.map((c) => ({ url: `${site.url}/categorias/${c.slug}` })),
    ...styles.map((s) => ({ url: `${site.url}/estilos/${s.slug}` })),
  ];
}
