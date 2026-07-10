import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, ChevronRight, Store } from "lucide-react";
import { getProduct, products } from "@/data/products";
import { getBrand } from "@/data/brands";
import { site } from "@/config/site";
import { brl, discountPct, installmentText } from "@/lib/format";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductActions } from "@/components/ProductActions";
import { ProductCarousel } from "@/components/ProductCarousel";
import { SectionHeader } from "@/components/SectionHeader";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const brand = getBrand(p.brand)?.name ?? p.brand;
  return {
    title: `${brand} ${p.name}`,
    description: `${p.name} da ${brand} por ${brl(p.price)} na Star Point Maringá. Consulte tamanhos e reserve pelo WhatsApp para retirar na loja.`,
    alternates: { canonical: `/produto/${p.slug}` },
    openGraph: { images: [{ url: p.images[0] }] },
  };
}

const categoryNames: Record<string, string> = {
  tenis: "Tênis",
  camisetas: "Camisetas",
  moletons: "Moletons",
  "calcas-bermudas": "Calças e bermudas",
  jaquetas: "Jaquetas",
  acessorios: "Acessórios",
};

export default async function ProdutoPage({ params }: Props) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const brand = getBrand(p.brand);
  const pct = discountPct(p.price, p.oldPrice);
  const parcelas = installmentText(p.price, p.installments);

  const relacionados = products
    .filter((x) => x.category === p.category && x.slug !== p.slug)
    .slice(0, 8);
  const completeOLook = products
    .filter(
      (x) =>
        x.category !== p.category &&
        x.slug !== p.slug &&
        x.tags.some((t) => p.tags.includes(t))
    )
    .slice(0, 8);
  const daMarca = products
    .filter((x) => x.brand === p.brand && x.slug !== p.slug)
    .slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    sku: p.sku,
    brand: { "@type": "Brand", name: brand?.name ?? p.brand },
    description: p.description,
    image: p.images.map((i) => `${site.url}${i}`),
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: "BRL",
      availability: p.availableInStore
        ? "https://schema.org/InStoreOnly"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "ClothingStore", name: site.name },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryNames[p.category],
        item: `${site.url}/categorias/${p.category}`,
      },
      { "@type": "ListItem", position: 3, name: p.name },
    ],
  };

  return (
    <div className="pb-24 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jsonLd, breadcrumbLd]),
        }}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        {/* breadcrumb */}
        <nav aria-label="Você está em" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-steel">
            <li>
              <Link href="/" className="hover:text-ink hover:underline">
                Início
              </Link>
            </li>
            <ChevronRight className="size-3.5" aria-hidden />
            <li>
              <Link
                href={`/categorias/${p.category}`}
                className="hover:text-ink hover:underline"
              >
                {categoryNames[p.category]}
              </Link>
            </li>
            <ChevronRight className="size-3.5" aria-hidden />
            <li aria-current="page" className="font-semibold text-ink">
              {p.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <ProductGallery images={p.images} name={p.name} />

          <div className="min-w-0">
            <p className="flex items-center justify-between">
              <Link
                href={`/marcas/${p.brand}`}
                className="text-xs font-extrabold uppercase tracking-[0.18em] text-steel hover:text-ink hover:underline"
              >
                {brand?.name ?? p.brand}
              </Link>
              <span className="text-[11px] tabular-nums text-steel">
                Cód. {p.sku}
              </span>
            </p>
            <h1 className="display mt-2 text-3xl uppercase md:text-4xl">
              {p.name}
            </h1>

            <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="display text-3xl tabular-nums">
                {brl(p.price)}
              </span>
              {p.oldPrice && (
                <>
                  <s className="tabular-nums text-steel">{brl(p.oldPrice)}</s>
                  <span className="rounded bg-alert px-2 py-0.5 text-xs font-extrabold text-white">
                    -{pct}%
                  </span>
                </>
              )}
            </p>
            {parcelas && <p className="mt-1 text-sm text-steel">{parcelas}</p>}

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {p.availableInStore && (
                <span className="flex items-center gap-1.5 rounded-full bg-cloud px-3 py-1.5 font-semibold">
                  <Store className="size-3.5" aria-hidden />
                  Disponível na loja de Maringá
                </span>
              )}
              <span className="flex items-center gap-1.5 rounded-full bg-cloud px-3 py-1.5 font-semibold">
                <BadgeCheck className="size-3.5" aria-hidden />
                Produto original
              </span>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-ink/80">
              {p.description}
            </p>

            <div className="mt-7">
              <ProductActions product={p} />
            </div>

            {/* acordeões */}
            <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
              <Accordion title="Detalhes do produto">
                <ul className="list-disc space-y-1 pl-5">
                  {p.material && <li>Material: {p.material}</li>}
                  <li>Categoria: {categoryNames[p.category]}</li>
                  {p.gender && <li>Gênero: {p.gender}</li>}
                  <li>Código: {p.sku}</li>
                  {p.care?.map((c) => <li key={c}>{c}</li>)}
                </ul>
              </Accordion>
              <Accordion title="Guia de tamanho" id="guia-de-tamanho">
                <p>
                  Em dúvida entre dois tamanhos? Nossa equipe confere a
                  modelagem da peça e te ajuda a escolher pelo WhatsApp — cada
                  marca veste de um jeito.
                </p>
              </Accordion>
              <Accordion title="Reserva e retirada">
                <p>
                  Consulte a disponibilidade pelo WhatsApp, confirme com a
                  equipe e retire na loja: {site.address}, {site.city}. A
                  reserva só é confirmada após retorno do atendimento.{" "}
                  <Link href="/reserva-retirada" className="font-semibold underline">
                    Ver política completa
                  </Link>
                  .
                </p>
              </Accordion>
              <Accordion title="Trocas">
                <p>
                  Trocas na loja física mediante etiqueta e nota. Condições
                  completas na{" "}
                  <Link href="/trocas" className="font-semibold underline">
                    política de trocas
                  </Link>
                  .
                </p>
              </Accordion>
              <Accordion title="Produtos originais">
                <p>
                  Trabalhamos apenas com produtos originais das marcas
                  oficiais. Qualquer dúvida sobre procedência, é só chamar a
                  equipe.
                </p>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12" aria-label="Produtos relacionados">
          <SectionHeader eyebrow="Relacionados" title="Você também pode gostar" />
          <ProductCarousel products={relacionados} />
        </section>
      )}
      {completeOLook.length > 0 && (
        <section className="bg-cloud" aria-label="Complete o look">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <SectionHeader eyebrow="Combina com" title="Complete o look" />
            <ProductCarousel products={completeOLook} />
          </div>
        </section>
      )}
      {daMarca.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12" aria-label="Mais da marca">
          <SectionHeader
            eyebrow={brand?.name ?? p.brand}
            title={`Outros produtos ${brand ? `da ${brand.name}` : "da marca"}`}
            href={`/marcas/${p.brand}`}
            linkLabel="Ver a marca"
          />
          <ProductCarousel products={daMarca} />
        </section>
      )}
    </div>
  );
}

function Accordion({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <details id={id} className="group py-1">
      <summary className="flex cursor-pointer items-center justify-between py-3 text-sm font-extrabold uppercase tracking-wide marker:content-none">
        {title}
        <span
          className="text-lg transition-transform group-open:rotate-45"
          aria-hidden
        >
          +
        </span>
      </summary>
      <div className="pb-4 text-sm leading-relaxed text-ink/75">{children}</div>
    </details>
  );
}
