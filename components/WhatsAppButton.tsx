"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { waDefault } from "@/lib/whatsapp";

export function WhatsAppButton() {
  const pathname = usePathname();
  // some no admin; nas páginas de produto o CTA fixo mobile já cobre a função
  if (pathname.startsWith("/admin")) return null;
  const productPage = pathname.startsWith("/produto/");

  return (
    <a
      href={waDefault()}
      target="_blank"
      rel="noopener noreferrer"
      title="Fale com a Star Point Maringá"
      aria-label="Fale com a Star Point Maringá no WhatsApp"
      className={`group fixed bottom-5 right-5 z-40 items-center gap-2 rounded-full bg-whats p-3.5 text-white shadow-lg shadow-whats/30 transition-transform hover:-translate-y-1 ${
        productPage ? "hidden md:flex" : "flex"
      }`}
    >
      <MessageCircle className="size-6" aria-hidden />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-300 group-hover:max-w-56 group-hover:pr-1 md:inline-block">
        Fale com a Star Point Maringá
      </span>
    </a>
  );
}
