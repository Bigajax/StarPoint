"use client";

import { useState } from "react";
import { Check } from "lucide-react";

/**
 * Lista VIP — cadastro simulado (sem envio real).
 * Para integrar futuramente, troque o handleSubmit por uma chamada de API.
 */
export function VipForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-lg bg-paper/10 p-8 text-center" role="status">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-star text-ink">
          <Check className="size-6" aria-hidden />
        </span>
        <p className="mt-4 text-lg font-bold text-paper">
          Pronto! Você está na lista.
        </p>
        <p className="mt-1 text-sm text-paper/70">
          As novidades da Star Point Maringá vão chegar no seu WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label className="sm:col-span-1">
        <span className="sr-only">Nome</span>
        <input
          required
          name="nome"
          placeholder="Seu nome"
          className="w-full rounded-lg border border-paper/25 bg-transparent px-4 py-3.5 text-paper placeholder:text-paper/50"
        />
      </label>
      <label>
        <span className="sr-only">Telefone (WhatsApp)</span>
        <input
          required
          name="telefone"
          type="tel"
          inputMode="tel"
          placeholder="WhatsApp com DDD"
          className="w-full rounded-lg border border-paper/25 bg-transparent px-4 py-3.5 text-paper placeholder:text-paper/50"
        />
      </label>
      <button
        type="submit"
        className="rounded-lg bg-star px-6 py-3.5 font-extrabold text-ink transition-transform hover:-translate-y-0.5"
      >
        Quero receber novidades
      </button>
      <label className="flex items-start gap-2.5 text-xs text-paper/70 sm:col-span-3">
        <input type="checkbox" required className="mt-0.5 size-4 accent-[#FFD500]" />
        Autorizo a Star Point Maringá a me enviar novidades pelo WhatsApp.
        Posso sair da lista quando quiser.
      </label>
    </form>
  );
}
