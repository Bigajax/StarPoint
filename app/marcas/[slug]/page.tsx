import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { brands, getBrand } from "@/data/brands";
import { products } from "@/data/products";
import { waLink } from "@/lib/whatsapp";
import { ProductGrid } from "@/components/ProductGrid";
import { EmptyState } from "@/components/EmptyState";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return {};
  return {
    title: brand.name,
    description: `${brand.name} na Star Point Maringá — ${brand.tagline} Consulte disponibilidade pelo WhatsApp.`,
    alternates: { canonical: `/marcas/${brand.slug}` },
  };
}

export default async function MarcaPage({ params }: Props) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  const items = products.filter((p) => p.brand === brand.slug);

  return (
    <div>
      {/* banner da marca */}
      <section className="relative overflow-hidden bg-ink text-paper">
        {brand.image && (
          <>
            <Image
              src={brand.image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-35"
            />
            <span
              className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent"
              aria-hidden
            />
          </>
        )}
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-20">
          <p className="star-eyebrow text-star">Marca</p>
          <h1 className="display-black mt-3 text-5xl uppercase md:text-6xl">
            {brand.name}
          </h1>
          <p className="mt-3 max-w-lg text-paper/80">{brand.description}</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        {items.length > 0 ? (
          <>
            <p className="mb-6 text-sm text-steel">
              <strong className="text-ink">{items.length}</strong>{" "}
              {items.length === 1 ? "produto" : "produtos"} da {brand.name} no
              site — o estoque completo está na loja.
            </p>
            <ProductGrid products={items} />
          </>
        ) : (
          <EmptyState
            title={`Os produtos ${brand.name} chegam primeiro na loja.`}
            subtitle="Consulte os modelos disponíveis agora pelo WhatsApp — o estoque muda toda semana."
            actionLabel="Consultar disponibilidade"
            actionHref={waLink(
              `Olá! Gostaria de saber quais produtos ${brand.name} estão disponíveis na Star Point Maringá.`
            )}
          />
        )}

        <div className="mt-12 rounded-lg bg-ink p-6 text-center text-paper md:p-8">
          <p className="display text-xl uppercase md:text-2xl">
            Procurando um modelo específico da {brand.name}?
          </p>
          <a
            href={waLink(
              `Olá! Estou procurando um produto da ${brand.name}. Pode me ajudar?`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-whats px-6 py-3.5 font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="size-5" aria-hidden />
            Perguntar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
