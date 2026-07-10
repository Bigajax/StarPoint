import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogClient } from "@/components/CatalogClient";
import { ProductGridSkeleton } from "@/components/Skeleton";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Explore tênis, roupas e acessórios disponíveis na Star Point Maringá. Filtre por marca, tamanho, cor e preço.",
  alternates: { canonical: "/produtos" },
};

export default function ProdutosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <header className="mb-8">
        <p className="star-eyebrow text-ink/70">Catálogo</p>
        <h1 className="display mt-2 text-4xl uppercase md:text-5xl">
          Explore os produtos
        </h1>
        <p className="mt-2 text-steel">
          Consulte novidades, tamanhos e disponibilidade na loja.
        </p>
      </header>
      <Suspense fallback={<ProductGridSkeleton />}>
        <CatalogClient />
      </Suspense>
    </div>
  );
}
