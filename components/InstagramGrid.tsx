import Image from "next/image";
import { Instagram } from "lucide-react";
import { site } from "@/config/site";
import { SectionHeader } from "@/components/SectionHeader";

/**
 * Grade inspirada no feed real da loja.
 * Preparada para futura integração com API/feed externo:
 * basta substituir `photos` pelos dados do feed.
 */
const photos = Array.from({ length: 12 }, (_, i) => ({
  src: `/images/insta/insta-${String(i + 1).padStart(2, "0")}.jpg`,
  href: site.instagramUrl,
}));

export function InstagramGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-20" aria-labelledby="insta">
      <SectionHeader
        eyebrow={`@${site.instagram}`}
        title="Acompanhe as novidades de perto"
        subtitle="Lançamentos, combinações, novidades e bastidores da Star Point Maringá."
      />
      <div className="grid grid-cols-3 gap-1.5 md:grid-cols-6 md:gap-2">
        {photos.map((p, i) => (
          <a
            key={p.src}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative block overflow-hidden rounded-md ${
              i > 8 ? "hidden md:block" : ""
            }`}
            aria-label="Abrir Instagram da Star Point Maringá"
          >
            <span className="relative block aspect-square">
              <Image
                src={p.src}
                alt=""
                fill
                sizes="(max-width: 768px) 33vw, 16vw"
                className="object-cover transition-transform duration-400 group-hover:scale-105"
              />
            </span>
            <span className="absolute inset-0 grid place-items-center bg-ink/0 opacity-0 transition-all group-hover:bg-ink/40 group-hover:opacity-100">
              <Instagram className="size-6 text-paper" aria-hidden />
            </span>
          </a>
        ))}
      </div>
      <div className="mt-8 text-center">
        <a
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-3.5 font-bold text-paper transition-transform hover:-translate-y-0.5"
        >
          <Instagram className="size-5" aria-hidden />
          Seguir no Instagram
        </a>
      </div>
    </section>
  );
}
