import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { site } from "@/config/site";
import { waDefault } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Reserva e retirada",
  description:
    "Como funciona a reserva pelo WhatsApp e a retirada na loja Star Point Maringá.",
  alternates: { canonical: "/reserva-retirada" },
};

const etapas = [
  { title: "Escolha o produto", text: "Navegue pelo site e encontre o que combina com você." },
  { title: "Selecione o tamanho", text: "Confira os tamanhos disponíveis na página do produto." },
  { title: "Fale com a equipe pelo WhatsApp", text: "O botão do produto já abre a conversa com tudo preenchido." },
  { title: "Confirme a disponibilidade", text: "A equipe verifica o estoque físico e confirma a reserva." },
  { title: "Retire na loja", text: `Passe na ${site.address} e leve o seu produto.` },
];

const observacoes = [
  "A reserva depende de confirmação da equipe pelo WhatsApp.",
  "A disponibilidade pode mudar entre a consulta e a confirmação.",
  "O prazo de retirada da reserva é combinado com o atendimento.",
  "A compra é concluída na loja ou pelo método informado pelo estabelecimento.",
  "O produto só estará reservado após a confirmação da equipe.",
];

export default function ReservaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
      <header className="mb-12">
        <p className="star-eyebrow text-ink/70">Como funciona</p>
        <h1 className="display mt-2 text-4xl uppercase md:text-5xl">
          Reserve online. <span className="text-steel">Retire na loja.</span>
        </h1>
        <p className="mt-3 max-w-xl text-steel">
          Sem checkout, sem frete, sem espera pelos Correios: você consulta,
          a equipe confirma e o produto te espera no balcão.
        </p>
      </header>

      {/* aqui a numeração é informação: é uma sequência real */}
      <ol className="relative space-y-8 border-l-2 border-ink/10 pl-8">
        {etapas.map((e, i) => (
          <li key={e.title} className="relative">
            <span
              className="display absolute -left-[3.35rem] grid size-9 place-items-center rounded-full bg-star text-sm font-black text-ink"
              aria-hidden
            >
              {i + 1}
            </span>
            <h2 className="display text-xl uppercase">{e.title}</h2>
            <p className="mt-1 text-sm text-steel">{e.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12 rounded-lg bg-cloud p-6 md:p-8">
        <h2 className="display text-xl uppercase">Bom saber</h2>
        <ul className="mt-4 space-y-2.5 text-sm text-ink/75">
          {observacoes.map((o) => (
            <li key={o} className="flex gap-2.5">
              <span className="text-star" aria-hidden>★</span>
              {o}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 text-center">
        <a
          href={waDefault()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-whats px-8 py-4 font-extrabold text-white transition-transform hover:-translate-y-0.5"
        >
          <MessageCircle className="size-5" aria-hidden />
          Começar uma reserva
        </a>
      </div>
    </div>
  );
}
