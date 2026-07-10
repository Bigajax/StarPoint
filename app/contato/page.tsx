import type { Metadata } from "next";
import { Clock, Instagram, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { site } from "@/config/site";
import { waDefault } from "@/lib/whatsapp";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Star Point Maringá: WhatsApp, telefone, Instagram e endereço no Shopping Maringá Park.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <header className="mb-10 max-w-2xl">
        <p className="star-eyebrow text-ink/70">Contato</p>
        <h1 className="display mt-2 text-4xl uppercase md:text-5xl">
          Fala com a gente
        </h1>
        <p className="mt-2 text-steel">
          O WhatsApp é o caminho mais rápido — mas todo canal chega na mesma
          equipe.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5">
          <a
            href={waDefault()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-lg bg-whats p-5 text-white transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="size-7" aria-hidden />
            <span>
              <span className="block font-extrabold">WhatsApp</span>
              <span className="text-sm text-white/85">
                Atendimento rápido em horário de loja
              </span>
            </span>
          </a>
          <div className="space-y-4 rounded-lg border border-ink/10 p-5 text-sm">
            <p className="flex gap-3">
              <Phone className="size-5 shrink-0" aria-label="Telefone" />
              {site.phone}
            </p>
            <p className="flex gap-3">
              <Instagram className="size-5 shrink-0" aria-label="Instagram" />
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:underline"
              >
                @{site.instagram}
              </a>
            </p>
            <p className="flex gap-3">
              <MapPin className="size-5 shrink-0" aria-label="Endereço" />
              <span>
                {site.address}
                <br />
                {site.city} · CEP {site.zip}
              </span>
            </p>
            <div className="flex gap-3">
              <Clock className="size-5 shrink-0" aria-label="Horário" />
              <span>
                {site.hours.map((h) => (
                  <p key={h.days}>
                    {h.days}: <strong>{h.time}</strong>
                  </p>
                ))}
              </span>
            </div>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 font-bold text-paper transition-transform hover:-translate-y-0.5"
            >
              <Navigation className="size-4.5" aria-hidden />
              Como chegar
            </a>
          </div>
          <iframe
            title="Mapa — Star Point Maringá"
            src="https://www.google.com/maps?q=Shopping+Maringa+Park,+Av.+S%C3%A3o+Paulo,+1099,+Maring%C3%A1&output=embed"
            className="h-64 w-full rounded-lg border border-ink/10"
            loading="lazy"
          />
        </div>

        <div className="rounded-lg bg-cloud p-6 md:p-8">
          <h2 className="display text-2xl uppercase">Envie uma mensagem</h2>
          <p className="mt-1 text-sm text-steel">
            Respondemos em horário de atendimento da loja.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
