import type { Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export function ProductGrid({
  products,
  columns = 4,
}: {
  products: Product[];
  columns?: 3 | 4;
}) {
  return (
    <div
      className={`grid grid-cols-2 gap-x-4 gap-y-8 ${
        columns === 4
          ? "md:grid-cols-3 xl:grid-cols-4"
          : "md:grid-cols-3"
      }`}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
