import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getStyle, styles } from "@/data/categories";
import { CatalogClient } from "@/components/CatalogClient";
import { ProductGridSkeleton } from "@/components/Skeleton";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return styles.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const style = getStyle(slug);
  if (!style) return {};
  return {
    title: `Estilo ${style.name}`,
    description: `Produtos no estilo ${style.name} na Star Point Maringá.`,
    alternates: { canonical: `/estilos/${style.slug}` },
  };
}

export default async function EstiloPage({ params }: Props) {
  const { slug } = await params;
  const style = getStyle(slug);
  if (!style) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <header className="mb-8">
        <p className="star-eyebrow text-ink/70">Estilo</p>
        <h1 className="display mt-2 text-4xl uppercase md:text-5xl">
          {style.name}
        </h1>
        <p className="mt-2 text-steel">{style.blurb}</p>
      </header>
      <Suspense fallback={<ProductGridSkeleton />}>
        <CatalogClient lock={{ estilo: style.slug }} />
      </Suspense>
    </div>
  );
}
