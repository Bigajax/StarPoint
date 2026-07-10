"use client";

import Link from "next/link";
import Image from "next/image";
import { useAdminProducts } from "@/lib/adminStore";
import { brands } from "@/data/brands";
import { brl } from "@/lib/format";

export default function AdminDashboard() {
  const { list, ready } = useAdminProducts();
  const active = list.filter((p) => !p.removed);
  const stats = [
    { label: "Produtos ativos", value: active.length, href: "/admin/produtos" },
    { label: "Novidades", value: active.filter((p) => p.newArrival).length, href: "/admin/produtos" },
    { label: "Em oferta", value: active.filter((p) => p.onSale).length, href: "/admin/produtos" },
    { label: "Marcas", value: brands.length, href: "/admin/marcas" },
  ];

  return (
    <div>
      <h1 className="display text-3xl uppercase">Dashboard</h1>
      <p className="mt-1 text-sm text-steel">
        Visão geral da vitrine digital da Star Point Maringá.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-lg bg-paper p-5 transition-shadow hover:shadow-md"
          >
            <p className="display text-4xl tabular-nums">
              {ready ? s.value : "–"}
            </p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-steel">
              {s.label}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-lg bg-paper p-6">
        <div className="flex items-center justify-between">
          <h2 className="display text-xl uppercase">Últimas novidades no ar</h2>
          <Link href="/admin/produtos" className="text-sm font-bold underline">
            Gerenciar produtos
          </Link>
        </div>
        <ul className="mt-4 divide-y divide-ink/5">
          {active
            .filter((p) => p.newArrival)
            .slice(0, 6)
            .map((p) => (
              <li key={p.id} className="flex items-center gap-4 py-3">
                <Image
                  src={p.images[0]}
                  alt=""
                  width={40}
                  height={53}
                  className="rounded object-cover"
                />
                <span className="flex-1 text-sm font-semibold">{p.name}</span>
                <span className="text-sm tabular-nums text-steel">
                  {brl(p.price)}
                </span>
                <Link
                  href={`/produto/${p.slug}`}
                  className="text-xs font-bold underline"
                >
                  Ver no site
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
