import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="display-black text-8xl text-cloud" aria-hidden>
        4★4
      </p>
      <h1 className="display mt-4 text-3xl uppercase">
        Essa página saiu de linha
      </h1>
      <p className="mt-2 text-steel">
        O endereço não existe ou o produto não está mais no site — mas o
        estoque da loja é bem maior.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-ink px-6 py-3.5 font-bold text-paper transition-transform hover:-translate-y-0.5"
        >
          Voltar ao início
        </Link>
        <Link
          href="/produtos"
          className="rounded-lg border-2 border-ink px-6 py-3.5 font-bold transition-colors hover:bg-ink hover:text-paper"
        >
          Ver produtos
        </Link>
      </div>
    </div>
  );
}
