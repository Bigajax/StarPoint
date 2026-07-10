import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { site } from "@/config/site";
import { waDefault } from "@/lib/whatsapp";
import { newArrivals, bestSellers } from "@/data/products";
import { brands } from "@/data/brands";
import { homeCategories, styles } from "@/data/categories";
import { SectionHeader } from "@/components/SectionHeader";
import { ProductCarousel } from "@/components/ProductCarousel";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryCard } from "@/components/CategoryCard";
import { BrandCard } from "@/components/BrandCard";
import { StoreSection } from "@/components/StoreSection";
import { HeroVideo } from "@/components/HeroVideo";
import { BrandMarquee } from "@/components/BrandMarquee";
import { InstagramGrid } from "@/components/InstagramGrid";
import { LookSection } from "@/components/LookSection";
import { VipForm } from "@/components/VipForm";
import { Reveal } from "@/components/Reveal";

/* Mosaico de categorias: Tênis e Feminino largos (2:1), demais 1×1 */
const catOrder = [
  "tenis",
  "camisetas",
  "moletons",
  "feminino",
  "calcas-bermudas",
  "acessorios",
];

const catLayout: Record<
  string,
  { className: string; imgClassName?: string; sizes: string }
> = {
  tenis: {
    className: "col-span-2 aspect-[2/1]",
    sizes: "(max-width: 768px) 100vw, 50vw",
  },
  camisetas: {
    className: "aspect-[4/5] md:aspect-auto",
    imgClassName: "object-[50%_62%]",
    sizes: "(max-width: 768px) 50vw, 25vw",
  },
  moletons: {
    className: "aspect-[4/5] md:aspect-auto",
    imgClassName: "object-[50%_30%]",
    sizes: "(max-width: 768px) 50vw, 25vw",
  },
  feminino: {
    className: "col-span-2 aspect-[2/1]",
    imgClassName: "object-[72%_55%]",
    sizes: "(max-width: 768px) 100vw, 50vw",
  },
  "calcas-bermudas": {
    className: "aspect-[4/5] md:aspect-auto",
    imgClassName: "object-[50%_68%]",
    sizes: "(max-width: 768px) 50vw, 25vw",
  },
  acessorios: {
    className: "aspect-[4/5] md:aspect-auto",
    sizes: "(max-width: 768px) 50vw, 25vw",
  },
};

export default function HomePage() {
  return (
    <>
      {/* ============ 6.1 HERO ============ */}
      <section className="relative overflow-hidden bg-ink text-paper">
        {/* campo diagonal amarelo — o split do logo */}
        <div
          className="clip-diag absolute inset-y-0 right-0 hidden w-[46%] bg-star lg:block"
          aria-hidden
        />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div className="relative z-10">
            <Reveal>
              <p className="star-eyebrow text-star">
                Star Point Maringá · Sneakers &amp; Streetwear
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="display-black mt-4 text-[2.6rem] uppercase leading-[0.95] sm:text-6xl xl:text-7xl">
                As marcas que você procura.{" "}
                <span className="word-outline-star">Perto de você.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-md text-base text-paper/75 md:text-lg">
                Tênis, roupas e acessórios selecionados para o seu estilo,
                disponíveis na Star Point Maringá.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/produtos?novidades=1"
                  className="flex items-center gap-2 rounded-lg bg-star px-6 py-4 font-extrabold text-ink transition-transform hover:-translate-y-0.5"
                >
                  Ver novidades
                  <ArrowRight className="size-4.5" aria-hidden />
                </Link>
                <a
                  href={waDefault()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border-2 border-whats px-6 py-[0.875rem] font-extrabold text-whats transition-colors hover:bg-whats hover:text-white"
                >
                  <MessageCircle className="size-4.5" aria-hidden />
                  Reservar pelo WhatsApp
                </a>
              </div>
              <p className="mt-4 text-xs text-paper/55">
                Consulte tamanhos e disponibilidade antes de retirar na loja.
              </p>
            </Reveal>
          </div>

          {/* colagem editorial — vídeos do feed da loja */}
          <div className="relative z-10 mx-auto grid w-full max-w-md grid-cols-2 gap-3 lg:max-w-none">
            <Reveal delay={0.1} className="relative">
              <span className="relative block aspect-[3/4] -rotate-1 overflow-hidden rounded-lg bg-ink shadow-2xl">
                <HeroVideo src="/videos/hero-1.mp4" poster="/images/hero-1.jpg" />
              </span>
            </Reveal>
            <Reveal delay={0.2} className="relative mt-10">
              <span className="relative block aspect-[3/4] rotate-1 overflow-hidden rounded-lg bg-ink shadow-2xl">
                <HeroVideo src="/videos/hero-2.mp4#t=0.5" poster="/images/hero-2-poster.jpg" />
              </span>
              <span
                className="display-black absolute -bottom-5 -left-10 rotate-[-4deg] rounded bg-ink px-3 py-1 text-lg uppercase text-star shadow-lg"
                aria-hidden
              >
                Retire na loja ★
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ FAIXA ROTATIVA DE MARCAS ============ */}
      <BrandMarquee />

      {/* ============ 6.3 CATEGORIAS ============ */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20" aria-labelledby="cat">
        <SectionHeader
          eyebrow="Categorias"
          title="O que você procura hoje?"
          href="/produtos"
          linkLabel="Ver tudo"
        />
        <Reveal>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {catOrder.map((slug) => {
              const c = homeCategories.find((x) => x.slug === slug);
              if (!c) return null;
              const layout = catLayout[slug];
              return (
                <CategoryCard
                  key={c.slug}
                  href={`/categorias/${c.slug}`}
                  name={c.name}
                  image={c.image!}
                  className={layout.className}
                  imgClassName={layout.imgClassName}
                  sizes={layout.sizes}
                />
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* ============ 6.4 NOVIDADES ============ */}
      <section className="bg-cloud" aria-labelledby="novidades">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <SectionHeader
            eyebrow="Novidades da semana"
            title="Acabou de chegar"
            subtitle="Novidades disponíveis na Star Point Maringá."
            href="/produtos?novidades=1"
            linkLabel="Ver todas"
          />
          <ProductCarousel products={newArrivals().slice(0, 10)} />
        </div>
      </section>

      {/* ============ 6.5 BANNER DE RESERVA ============ */}
      <section className="bg-star" aria-labelledby="reserva-banner">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:grid-cols-[1.2fr_1fr] md:py-16">
          <div>
            <p className="star-eyebrow text-ink/70">
              Encontre online · Reserve · Retire
            </p>
            <h2
              id="reserva-banner"
              className="display-black mt-3 text-4xl uppercase text-ink md:text-5xl"
            >
              Gostou? Reserve e retire na loja.
            </h2>
            <p className="mt-4 max-w-md font-medium text-ink/80">
              Escolha o produto, consulte o tamanho pelo WhatsApp e retire na
              Star Point Maringá.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href={waDefault()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-ink px-7 py-4 font-extrabold text-paper transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="size-5 text-whats" aria-hidden />
                Reservar agora
              </a>
              <Link href="/reserva-retirada" className="font-bold text-ink underline">
                Como funciona
              </Link>
            </div>
          </div>
          <Reveal className="relative mx-auto w-full max-w-72">
            <span className="relative block rotate-2 overflow-hidden rounded-lg border-4 border-ink shadow-2xl">
              <span className="relative block aspect-[3/4]">
                <Image
                  src="/images/reserva.jpg"
                  alt="Placa da Star Point em parede urbana de Maringá"
                  fill
                  sizes="(max-width: 768px) 80vw, 18rem"
                  className="object-cover"
                />
              </span>
            </span>
            <span
              className="display-black absolute -left-6 top-6 -rotate-6 rounded bg-ink px-3 py-1 text-xl uppercase text-star"
              aria-hidden
            >
              ★ Reservado
            </span>
          </Reveal>
        </div>
      </section>

      {/* ============ 6.6 MARCAS ============ */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20" aria-labelledby="marcas">
        <SectionHeader
          eyebrow="Marcas"
          title="Marcas que fazem parte do seu estilo"
          href="/marcas"
          linkLabel="Todas as marcas"
        />
        <Reveal>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {brands
              .filter((b) => b.featured)
              .slice(0, 8)
              .map((b) => (
                <BrandCard key={b.slug} brand={b} />
              ))}
          </div>
        </Reveal>
      </section>

      {/* ============ 6.7 ESTILOS ============ */}
      <section className="bg-cloud" aria-labelledby="estilos">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <SectionHeader
            eyebrow="Compre por estilo"
            title="Encontre o seu estilo"
          />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {styles.map((s) => (
              <Link
                key={s.slug}
                href={`/estilos/${s.slug}`}
                className="group overflow-hidden rounded-lg bg-paper"
              >
                <span className="relative block aspect-square overflow-hidden">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, 16vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </span>
                <span className="block p-3">
                  <span className="display block text-sm uppercase group-hover:underline">
                    {s.name}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-steel">
                    {s.blurb}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6.8 MAIS PROCURADOS ============ */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20" aria-labelledby="procurados">
        <SectionHeader
          eyebrow="Prova social"
          title="Os favoritos da Star Point"
          subtitle="Os produtos mais consultados pelos clientes da loja."
          href="/produtos?ordenar=procurados"
          linkLabel="Ver mais"
        />
        <ProductGrid products={bestSellers().slice(0, 8)} />
      </section>

      {/* ============ 6.9 MONTE O LOOK ============ */}
      <LookSection />

      {/* ============ 6.10 BLOCO LOCAL ============ */}
      <StoreSection />

      {/* ============ 6.11 INSTAGRAM ============ */}
      <InstagramGrid />

      {/* ============ 6.12 LISTA VIP ============ */}
      <section className="border-b border-paper/10 bg-ink" aria-labelledby="vip">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center md:py-20">
          <p className="star-eyebrow justify-center text-star">Lista VIP</p>
          <h2 id="vip" className="display mt-3 text-3xl uppercase text-paper md:text-4xl">
            Receba lançamentos antes de todo mundo
          </h2>
          <p className="mx-auto mt-3 max-w-md text-paper/70">
            Lançamentos, reposições e promoções diretamente no WhatsApp.
          </p>
          <div className="mt-8 text-left">
            <VipForm />
          </div>
          <p className="mt-6 text-xs text-paper/50">
            {site.name} · {site.address}
          </p>
        </div>
      </section>
    </>
  );
}
