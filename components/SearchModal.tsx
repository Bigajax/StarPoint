"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import { products } from "@/data/products";
import { getBrand } from "@/data/brands";
import { matchesQuery } from "@/lib/catalog";
import { brl } from "@/lib/format";

export function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQ("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    if (q.trim().length < 2) return [];
    return products.filter((p) => matchesQuery(p, q)).slice(0, 6);
  }, [q]);

  const submit = () => {
    if (!q.trim()) return;
    onClose();
    router.push(`/produtos?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Buscar produtos"
          className="fixed inset-0 z-[60] bg-ink/95 text-paper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div className="mx-auto flex h-full max-w-3xl flex-col px-4 py-6">
            <div className="flex items-center justify-between">
              <span className="star-eyebrow text-star">Buscar</span>
              <button
                type="button"
                onClick={onClose}
                className="grid size-11 place-items-center rounded-lg hover:bg-paper/10"
                aria-label="Fechar busca"
              >
                <X className="size-6" />
              </button>
            </div>

            <form
              className="mt-6 flex items-center gap-3 border-b-2 border-paper/30 pb-3 focus-within:border-star"
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <Search className="size-6 shrink-0 text-steel" aria-hidden />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Nome, marca, cor, código…"
                className="w-full bg-transparent text-xl outline-none placeholder:text-steel md:text-2xl"
                aria-label="Termo de busca"
              />
            </form>

            <div className="mt-6 flex-1 overflow-y-auto">
              {q.trim().length >= 2 && results.length === 0 && (
                <div className="pt-10 text-center">
                  <p className="text-lg text-paper/80">
                    Não encontramos produtos para esta busca.
                  </p>
                  <p className="mt-1 text-sm text-steel">
                    Tente outro termo ou fale com a loja pelo WhatsApp.
                  </p>
                </div>
              )}
              <ul className="space-y-2">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/produto/${p.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-paper/10"
                    >
                      <Image
                        src={p.images[0]}
                        alt=""
                        width={56}
                        height={74}
                        className="rounded-md object-cover"
                      />
                      <span className="flex-1">
                        <span className="block text-xs font-bold uppercase tracking-wider text-steel">
                          {getBrand(p.brand)?.name}
                        </span>
                        <span className="block font-semibold">{p.name}</span>
                      </span>
                      <span className="font-bold text-star">{brl(p.price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {results.length > 0 && (
                <button
                  type="button"
                  onClick={submit}
                  className="mt-4 flex items-center gap-2 font-bold text-star hover:underline"
                >
                  Ver todos os resultados
                  <ArrowRight className="size-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
