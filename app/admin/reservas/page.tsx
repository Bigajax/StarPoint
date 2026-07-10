"use client";

/** Reservas mockadas — na integração, esta tela lê as conversas/CRM. */
const reservas = [
  { id: "R-1042", cliente: "João P.", produto: "Campus 00s Core Black", tamanho: "41", status: "aguardando" },
  { id: "R-1041", cliente: "Marina S.", produto: "Calça Adibreak Adicolor", tamanho: "M", status: "confirmada" },
  { id: "R-1040", cliente: "Lucas T.", produto: "808 Tiago Lemos", tamanho: "42", status: "retirada" },
  { id: "R-1039", cliente: "Ana C.", produto: "Hoodie Script Navy", tamanho: "P", status: "confirmada" },
  { id: "R-1038", cliente: "Pedro M.", produto: "Skate Old Skool", tamanho: "40", status: "cancelada" },
] as const;

const statusStyle: Record<string, string> = {
  aguardando: "bg-star text-ink",
  confirmada: "bg-whats/15 text-whats",
  retirada: "bg-ink text-paper",
  cancelada: "bg-alert/10 text-alert",
};

export default function AdminReservas() {
  return (
    <div>
      <h1 className="display text-3xl uppercase">Reservas</h1>
      <p className="mt-1 text-sm text-steel">
        Exemplo de acompanhamento — as reservas reais acontecem no WhatsApp da
        loja.
      </p>
      <div className="mt-6 overflow-x-auto rounded-lg bg-paper">
        <table className="w-full min-w-[36rem] text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-steel">
              <th className="px-4 py-3">Código</th>
              <th className="px-2 py-3">Cliente</th>
              <th className="px-2 py-3">Produto</th>
              <th className="px-2 py-3">Tam.</th>
              <th className="px-2 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {reservas.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-3 font-mono text-xs">{r.id}</td>
                <td className="px-2 py-3 font-semibold">{r.cliente}</td>
                <td className="px-2 py-3">{r.produto}</td>
                <td className="px-2 py-3">{r.tamanho}</td>
                <td className="px-2 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-extrabold capitalize ${statusStyle[r.status]}`}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
