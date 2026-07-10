import Link from "next/link";
import { brands } from "@/data/brands";

/**
 * Faixa rotativa com os logos oficiais das marcas da loja.
 * Entram as marcas de data/brands.ts que tiverem `logo` definido
 * (SVGs em /public/images/logos). O conteúdo é duplicado para o loop
 * ser contínuo; com reduced-motion a animação para (regra global).
 */
export function BrandMarquee() {
  const withLogo = brands.filter((b) => b.logo);

  return (
    <Link
      href="/marcas"
      aria-label={`Marcas na loja: ${withLogo.map((b) => b.name).join(", ")}. Ver todas`}
      className="group block overflow-hidden border-y-2 border-ink bg-star py-4"
    >
      <div
        aria-hidden
        className="animate-marquee flex w-max items-center group-hover:[animation-play-state:paused]"
      >
        {/* 4 cópias: mantém a tela sempre preenchida e o loop sem emenda */}
        {[0, 1, 2, 3].map((half) => (
          <div key={half} className="flex w-max items-center">
            {withLogo.map((b) => (
              <span key={b.slug} className="flex items-center text-ink">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.logo}
                  alt={b.name}
                  className="mx-8 h-6 w-auto max-w-32 object-contain md:h-7 md:max-w-40"
                  loading="eager"
                  draggable={false}
                />
                <span className="text-sm" aria-hidden>
                  ★
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </Link>
  );
}
