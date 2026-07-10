import type { Metadata } from "next";
import Link from "next/link";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: "Painel de gestão",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cloud">
      <div className="bg-star px-4 py-2 text-center text-xs font-extrabold uppercase tracking-wide text-ink">
        ★ Painel de demonstração — os ajustes ficam salvos apenas neste
        navegador
      </div>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[13rem_1fr]">
        <aside>
          <Link href="/admin" className="display block text-xl uppercase">
            Gestão <span className="text-steel">SP</span>
          </Link>
          <AdminNav />
          <Link
            href="/"
            className="mt-6 block text-xs font-semibold text-steel hover:text-ink hover:underline"
          >
            ← Voltar para o site
          </Link>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
