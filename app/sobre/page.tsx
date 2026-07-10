import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, Instagram, MessageCircle, Sparkles, Users } from "lucide-react";
import { site } from "@/config/site";
import { waDefault } from "@/lib/whatsapp";
import { StoreSection } from "@/components/StoreSection";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Nossa loja",
  description:
    "Conheça a Star Point Maringá: sneakers, streetwear e atendimento próximo no Shopping Maringá Park.",
  alternates: { canonical: "/sobre" },
};

const valores = [
  {
    icon: BadgeCheck,
    title: "Nossa seleção",
    text: "Curadoria de marcas reconhecidas e produtos originais — do clássico ao lançamento que acabou de chegar.",
  },
  {
    icon: Users,
    title: "Atendimento local",
    text: "Equipe que entende de tênis e moda urbana, pronta pra ajudar na escolha pelo WhatsApp ou no balcão.",
  },
  {
    icon: Sparkles,
    title: "Sempre em movimento",
    text: "O estoque muda toda semana. Acompanhe o Instagram e a lista VIP pra não perder reposição.",
  },
];

export default function SobrePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="clip-diag absolute inset-y-0 right-0 hidden w-2/5 bg-star lg:block" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:py-20 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="star-eyebrow text-star">Quem somos</p>
            <h1 className="display-black mt-3 text-5xl uppercase md:text-6xl">
              Star Point <span className="word-outline-star">Maringá</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-paper/80">
              Uma loja feita para quem vive moda, sneakers e cultura urbana.
              Aqui você encontra marcas reconhecidas, produtos originais e
              atendimento próximo para escolher com mais segurança.
            </p>
          </div>
          <Reveal className="relative z-10 mx-auto w-full max-w-72">
            <span className="relative block rotate-2 overflow-hidden rounded-lg border-4 border-ink shadow-2xl">
              <span className="relative block aspect-[3/4]">
                <Image
                  src="/images/loja-fachada.jpg"
                  alt="Fachada da Star Point no Shopping Maringá Park"
                  fill
                  sizes="18rem"
                  className="object-cover"
                />
              </span>
            </span>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20" aria-label="Nossos valores">
        <div className="grid gap-4 md:grid-cols-3">
          {valores.map((v) => (
            <div key={v.title} className="rounded-lg border border-ink/10 p-6">
              <v.icon className="size-7" strokeWidth={1.5} aria-hidden />
              <h2 className="display mt-4 text-xl uppercase">{v.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-steel">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-8 rounded-lg bg-cloud p-6 md:grid-cols-[1fr_1.4fr] md:p-10">
          <span className="relative block aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src="/images/loja-interior.jpg"
              alt="Interior da loja com a parede de tênis"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </span>
          <div>
            <p className="star-eyebrow text-ink/70">Visite a loja</p>
            <h2 className="display mt-2 text-3xl uppercase">
              Experimente antes de levar
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/75">
              Prove o tamanho, sinta o material e saia com o produto na
              sacola. Estamos no {site.address}, {site.city}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={waDefault()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-whats px-5 py-3 font-bold text-white"
              >
                <MessageCircle className="size-4.5" aria-hidden />
                WhatsApp
              </a>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border-2 border-ink px-5 py-3 font-bold hover:bg-ink hover:text-paper"
              >
                <Instagram className="size-4.5" aria-hidden />
                @{site.instagram}
              </a>
            </div>
          </div>
        </div>
      </section>

      <StoreSection />
    </div>
  );
}
