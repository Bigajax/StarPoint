import type { Metadata } from "next";
import { brands } from "@/data/brands";
import { BrandCard } from "@/components/BrandCard";

export const metadata: Metadata = {
  title: "Marcas",
  description:
    "As marcas disponíveis na Star Point Maringá: Adidas, Nike, Vans, New Balance, Lacoste, Champion, Oakley e mais.",
  alternates: { canonical: "/marcas" },
};

export default function MarcasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <header className="mb-8 max-w-2xl">
        <p className="star-eyebrow text-ink/70">Marcas</p>
        <h1 className="display mt-2 text-4xl uppercase md:text-5xl">
          Marcas que fazem parte do seu estilo
        </h1>
        <p className="mt-2 text-steel">
          Curadoria de marcas reconhecidas, disponíveis na loja de Maringá. O
          mix muda com frequência — consulte pelo WhatsApp.
        </p>
      </header>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
        {brands.map((b) => (
          <BrandCard key={b.slug} brand={b} />
        ))}
      </div>
    </div>
  );
}
