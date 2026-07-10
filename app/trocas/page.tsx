import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Trocas",
  description: "Política de trocas da Star Point Maringá.",
  alternates: { canonical: "/trocas" },
};

export default function TrocasPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <p className="star-eyebrow text-ink/70">Políticas</p>
      <h1 className="display mt-2 text-4xl uppercase md:text-5xl">Trocas</h1>
      <div className="prose-sm mt-8 space-y-4 text-sm leading-relaxed text-ink/80">
        <p>
          As trocas são feitas diretamente na loja física ({site.address},{" "}
          {site.city}), mediante apresentação da nota fiscal e com o produto
          sem sinais de uso, com etiquetas originais.
        </p>
        <p>
          Prazos e condições específicas (defeito, tamanho, modelo) são
          informados pela equipe no momento da compra e podem ser consultados
          pelo WhatsApp antes de ir à loja.
        </p>
        <p>
          Produtos em promoção podem ter condições diferenciadas de troca —
          confirme com o atendimento.
        </p>
      </div>
    </div>
  );
}
