import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Política de privacidade do site da Star Point Maringá.",
  alternates: { canonical: "/politica-privacidade" },
};

export default function PrivacidadePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <p className="star-eyebrow text-ink/70">Políticas</p>
      <h1 className="display mt-2 text-4xl uppercase md:text-5xl">
        Política de privacidade
      </h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink/80">
        <p>
          Este site é uma vitrine digital: não realizamos vendas online nem
          armazenamos dados de pagamento.
        </p>
        <p>
          Os dados informados nos formulários (nome, telefone e mensagem) são
          usados exclusivamente para atendimento e envio de novidades, quando
          autorizado, e nunca são repassados a terceiros.
        </p>
        <p>
          A lista de favoritos fica salva apenas no seu navegador
          (localStorage) e não é enviada aos nossos servidores.
        </p>
        <p>
          Para solicitar a exclusão dos seus dados de contato, fale com a
          equipe pelo WhatsApp.
        </p>
      </div>
    </div>
  );
}
