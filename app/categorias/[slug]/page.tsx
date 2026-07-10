import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { categories, getCategory } from "@/data/categories";
import { CatalogClient } from "@/components/CatalogClient";
import { ProductGridSkeleton } from "@/components/Skeleton";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};
  return {
    title: cat.name,
    description: `${cat.name} disponíveis na Star Point Maringá. Consulte tamanhos e reserve pelo WhatsApp.`,
    alternates: { canonical: `/categorias/${cat.slug}` },
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <header className="mb-8">
        <p className="star-eyebrow text-ink/70">Categoria</p>
        <h1 className="display mt-2 text-4xl uppercase md:text-5xl">
          {cat.name}
        </h1>
        <p className="mt-2 text-steel">
          Consulte tamanhos e disponibilidade na loja pelo WhatsApp.
        </p>
      </header>
      <Suspense fallback={<ProductGridSkeleton />}>
        <CatalogClient lock={{ categoria: cat.slug }} />
      </Suspense>
    </div>
  );
}
