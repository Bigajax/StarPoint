"use client";

/**
 * "Backend" simulado do painel: os ajustes ficam no localStorage
 * e são aplicados sobre os dados mockados de data/products.ts.
 *
 * Para integrar de verdade (Supabase, Firebase, Nuvemshop, ERP…),
 * substitua estas funções por chamadas à API mantendo as assinaturas.
 */
import { useCallback, useEffect, useState } from "react";
import { products, type Product } from "@/data/products";

export type ProductOverride = Partial<
  Pick<
    Product,
    "price" | "newArrival" | "featured" | "onSale" | "availableInStore" | "bestSeller"
  >
> & { removed?: boolean };

const KEY = "starpoint:admin-overrides";

function read(): Record<string, ProductOverride> {
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function useAdminProducts() {
  const [overrides, setOverrides] = useState<Record<string, ProductOverride>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOverrides(read());
    setReady(true);
  }, []);

  const update = useCallback((slug: string, patch: ProductOverride) => {
    setOverrides((prev) => {
      const next = {
        ...prev,
        [slug]: { ...prev[slug], ...patch },
      };
      window.localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    window.localStorage.removeItem(KEY);
    setOverrides({});
  }, []);

  const list: (Product & { removed?: boolean })[] = products.map((p) => ({
    ...p,
    ...overrides[p.slug],
  }));

  return { list, ready, update, resetAll, hasChanges: Object.keys(overrides).length > 0 };
}
