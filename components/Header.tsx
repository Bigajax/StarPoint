"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, MessageCircle, Search, X } from "lucide-react";
import { site } from "@/config/site";
import { waDefault } from "@/lib/whatsapp";
import { useFavorites } from "@/lib/favorites";
import { SearchModal } from "@/components/SearchModal";

const topMessages = [
  "Produtos originais",
  "Reserve pelo WhatsApp",
  "Retire na loja em Maringá",
];

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/produtos?novidades=1", label: "Novidades" },
  { href: "/categorias/tenis", label: "Tênis" },
  { href: "/categorias/roupas", label: "Roupas" },
  { href: "/categorias/acessorios", label: "Acessórios" },
  { href: "/categorias/feminino", label: "Feminino" },
  { href: "/categorias/masculino", label: "Masculino" },
  { href: "/marcas", label: "Marcas" },
  { href: "/produtos?ofertas=1", label: "Ofertas" },
  { href: "/sobre", label: "Nossa loja" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { slugs, ready } = useFavorites();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Barra superior */}
      <div className="bg-ink text-star">
        <div className="mx-auto hidden max-w-7xl items-center justify-center gap-8 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] md:flex">
          {topMessages.map((m, i) => (
            <span key={m} className="flex items-center gap-8">
              {i > 0 && <span aria-hidden>★</span>}
              {m}
            </span>
          ))}
        </div>
        <div className="h-8 overflow-hidden md:hidden" aria-hidden>
          <div className="animate-topbar flex flex-col">
            {topMessages.map((m) => (
              <span
                key={m}
                className="flex h-8 items-center justify-center text-[11px] font-bold uppercase tracking-[0.18em]"
              >
                ★ {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Navegação principal */}
      <div
        className={`border-b border-ink/10 bg-paper transition-shadow ${
          scrolled ? "shadow-[0_2px_16px_rgba(10,10,10,0.08)]" : ""
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all ${
            scrolled ? "py-2" : "py-3.5"
          }`}
        >
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Star Point Maringá — início">
            <Image
              src="/images/logo.png"
              alt=""
              width={44}
              height={44}
              className={`rounded-full transition-all ${scrolled ? "size-9" : "size-11"}`}
              priority
            />
            <span className="leading-none">
              <span className="display block text-lg">STAR POINT</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-steel">
                Maringá
              </span>
            </span>
          </Link>

          <nav aria-label="Principal" className="hidden xl:block">
            <ul className="flex items-center gap-5">
              {navLinks.slice(1).map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[13px] font-semibold text-ink/80 transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="grid size-10 place-items-center rounded-lg transition-colors hover:bg-cloud sm:size-11"
              aria-label="Buscar produtos"
            >
              <Search className="size-5" />
            </button>
            <Link
              href="/favoritos"
              className="relative grid size-10 place-items-center rounded-lg transition-colors hover:bg-cloud sm:size-11"
              aria-label={`Favoritos${ready && slugs.length ? ` (${slugs.length})` : ""}`}
            >
              <Heart className="size-5" />
              {ready && slugs.length > 0 && (
                <span className="absolute right-0.5 top-0.5 grid size-4.5 place-items-center rounded-full bg-star text-[10px] font-extrabold text-ink">
                  {slugs.length}
                </span>
              )}
            </Link>
            <a
              href={waDefault()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden size-11 place-items-center rounded-lg text-whats transition-colors hover:bg-whats/10 sm:grid"
              aria-label="Falar no WhatsApp"
            >
              <MessageCircle className="size-5" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid size-10 place-items-center rounded-lg transition-colors hover:bg-cloud sm:size-11 xl:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Drawer mobile */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Fechar menu"
              className="fixed inset-0 z-50 bg-ink/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-label="Menu"
              className="fixed inset-y-0 right-0 z-50 flex w-[min(20rem,85vw)] flex-col bg-paper"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between border-b border-ink/10 p-4">
                <span className="display text-lg">MENU</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="grid size-11 place-items-center rounded-lg hover:bg-cloud"
                  aria-label="Fechar menu"
                >
                  <X className="size-5" />
                </button>
              </div>
              <nav aria-label="Menu mobile" className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-1">
                  {navLinks.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="block rounded-lg px-3 py-3 font-semibold hover:bg-cloud"
                        onClick={() => setMenuOpen(false)}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="border-t border-ink/10 p-4">
                <a
                  href={waDefault()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-whats px-4 py-3 font-bold text-white"
                >
                  <MessageCircle className="size-5" />
                  Falar com a loja
                </a>
                <p className="mt-3 text-center text-xs text-steel">
                  {site.address} · {site.city}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
