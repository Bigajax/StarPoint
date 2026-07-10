"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const assuntos = ["Consultar produto", "Reserva", "Tamanhos", "Trocas", "Outros"];

/** Formulário de contato — envio simulado (sem backend). */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-lg bg-paper p-8 text-center" role="status">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-star">
          <Check className="size-6" aria-hidden />
        </span>
        <p className="mt-4 text-lg font-bold">Mensagem registrada!</p>
        <p className="mt-1 text-sm text-steel">
          A equipe retorna em horário de atendimento. Se for urgente, chame no
          WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold">
          Nome
          <input
            required
            name="nome"
            className="mt-1.5 w-full rounded-lg border border-ink/15 bg-paper px-4 py-3"
          />
        </label>
        <label className="text-sm font-semibold">
          Telefone
          <input
            required
            name="telefone"
            type="tel"
            inputMode="tel"
            className="mt-1.5 w-full rounded-lg border border-ink/15 bg-paper px-4 py-3"
          />
        </label>
      </div>
      <label className="text-sm font-semibold">
        Assunto
        <select
          name="assunto"
          className="mt-1.5 w-full rounded-lg border border-ink/15 bg-paper px-4 py-3"
        >
          {assuntos.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </label>
      <label className="text-sm font-semibold">
        Mensagem
        <textarea
          required
          name="mensagem"
          rows={4}
          className="mt-1.5 w-full rounded-lg border border-ink/15 bg-paper px-4 py-3"
        />
      </label>
      <button
        type="submit"
        className="rounded-lg bg-ink px-6 py-3.5 font-extrabold text-paper transition-transform hover:-translate-y-0.5"
      >
        Enviar mensagem
      </button>
    </form>
  );
}
