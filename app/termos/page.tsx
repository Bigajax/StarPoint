import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: "Termos de uso do site da Star Point Maringá.",
  alternates: { canonical: "/termos" },
};

export default function TermosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <p className="star-eyebrow text-ink/70">Políticas</p>
      <h1 className="display mt-2 text-4xl uppercase md:text-5xl">
        Termos de uso
      </h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink/80">
        <p>
          Este site funciona como vitrine digital da Star Point Maringá. Os
          preços, tamanhos e disponibilidades exibidos são informativos e
          podem mudar sem aviso — a confirmação vale sempre pelo atendimento
          no WhatsApp ou na loja.
        </p>
        <p>
          A reserva de produtos não constitui compra: ela depende de
          confirmação da equipe e a transação é concluída na loja física.
        </p>
        <p>
          As marcas exibidas pertencem aos seus respectivos detentores e são
          usadas apenas para identificar os produtos comercializados.
        </p>
      </div>
    </div>
  );
}
