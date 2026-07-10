import Link from "next/link";
import Image from "next/image";
import { Instagram, MessageCircle } from "lucide-react";
import { site } from "@/config/site";
import { waDefault } from "@/lib/whatsapp";

const columns = [
  {
    title: "Produtos",
    links: [
      { href: "/produtos", label: "Todos os produtos" },
      { href: "/produtos?novidades=1", label: "Novidades" },
      { href: "/categorias/tenis", label: "Tênis" },
      { href: "/categorias/roupas", label: "Roupas" },
      { href: "/categorias/acessorios", label: "Acessórios" },
      { href: "/produtos?ofertas=1", label: "Ofertas" },
    ],
  },
  {
    title: "A loja",
    links: [
      { href: "/sobre", label: "Nossa loja" },
      { href: "/marcas", label: "Marcas" },
      { href: "/contato", label: "Contato" },
      { href: "/reserva-retirada", label: "Reserva e retirada" },
    ],
  },
  {
    title: "Políticas",
    links: [
      { href: "/reserva-retirada", label: "Política de reserva" },
      { href: "/trocas", label: "Trocas" },
      { href: "/politica-privacidade", label: "Política de privacidade" },
      { href: "/termos", label: "Termos de uso" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Star Point Maringá"
                width={48}
                height={48}
                className="rounded-full"
              />
              <span className="leading-none">
                <span className="display block text-xl">STAR POINT</span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-star">
                  Maringá
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-paper/70">
              Tênis, roupas e acessórios das marcas que você procura. Reserve
              pelo WhatsApp e retire na loja.
            </p>
            <address className="mt-5 space-y-1 text-sm not-italic text-paper/70">
              <p>{site.address}</p>
              <p>{site.city} · CEP {site.zip}</p>
              {site.hours.map((h) => (
                <p key={h.days}>
                  {h.days}: {h.time}
                </p>
              ))}
            </address>
            <div className="mt-5 flex gap-3">
              <a
                href={waDefault()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-whats px-4 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-paper/25 px-4 py-2.5 text-sm font-bold transition-colors hover:border-star hover:text-star"
              >
                <Instagram className="size-4" />
                @{site.instagram}
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="star-eyebrow text-star">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-paper/70 transition-colors hover:text-paper"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-paper/50 md:flex-row">
          <p>
            © {new Date().getFullYear()} Star Point Maringá. Todos os direitos
            reservados.
          </p>
          <p>
            Produtos originais · Reserve pelo WhatsApp · Retire na loja
          </p>
        </div>
      </div>
    </footer>
  );
}
