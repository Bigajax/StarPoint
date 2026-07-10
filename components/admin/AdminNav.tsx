"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Inbox,
  LayoutDashboard,
  Package,
  Shapes,
  Star,
  Tags,
  Ticket,
} from "lucide-react";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/produtos", label: "Produtos", icon: Package },
  { href: "/admin/categorias", label: "Categorias", icon: Shapes },
  { href: "/admin/marcas", label: "Marcas", icon: Tags },
  { href: "/admin/reservas", label: "Reservas", icon: Ticket },
  { href: "/admin/contatos", label: "Contatos", icon: Inbox },
  { href: "/admin/destaques", label: "Destaques da home", icon: Star },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Painel" className="mt-5">
      <ul className="flex gap-1 overflow-x-auto lg:flex-col">
        {items.map((i) => {
          const active = pathname === i.href;
          return (
            <li key={i.href} className="shrink-0">
              <Link
                href={i.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-ink text-paper"
                    : "text-ink/70 hover:bg-paper hover:text-ink"
                }`}
              >
                <i.icon className="size-4.5" aria-hidden />
                {i.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
