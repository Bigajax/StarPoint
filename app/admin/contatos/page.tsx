"use client";

/** Mensagens mockadas do formulário de contato. */
const contatos = [
  { nome: "Carla R.", assunto: "Tamanhos", msg: "O Samba OG tem 35?", quando: "hoje" },
  { nome: "Felipe A.", assunto: "Consultar produto", msg: "Vocês têm o Forum em outras cores?", quando: "hoje" },
  { nome: "Bruna L.", assunto: "Trocas", msg: "Comprei um moletom G e preciso trocar por M.", quando: "ontem" },
  { nome: "Rafael D.", assunto: "Reserva", msg: "Como reservo o 808 do Tiago Lemos?", quando: "ontem" },
];

export default function AdminContatos() {
  return (
    <div>
      <h1 className="display text-3xl uppercase">Contatos</h1>
      <p className="mt-1 text-sm text-steel">
        Mensagens enviadas pelo formulário do site (exemplo de visualização).
      </p>
      <ul className="mt-6 space-y-3">
        {contatos.map((c, i) => (
          <li key={i} className="rounded-lg bg-paper p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-bold">{c.nome}</p>
              <p className="text-xs text-steel">{c.quando}</p>
            </div>
            <span className="mt-1 inline-block rounded bg-cloud px-2 py-0.5 text-xs font-bold">
              {c.assunto}
            </span>
            <p className="mt-2 text-sm text-ink/80">{c.msg}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
