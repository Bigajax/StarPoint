import Image from "next/image";
import { Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { site } from "@/config/site";
import { waDefault } from "@/lib/whatsapp";

/** Bloco local: endereço, horário, contato e fotos reais da unidade. */
export function StoreSection() {
  return (
    <section className="bg-ink text-paper" aria-labelledby="loja-titulo">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:py-20">
        <div>
          <p className="star-eyebrow text-star">Loja física</p>
          <h2 id="loja-titulo" className="display mt-3 text-4xl uppercase md:text-5xl">
            Da tela para a loja,{" "}
            <span className="word-outline">sem complicação.</span>
          </h2>
          <p className="mt-4 max-w-md text-paper/75">
            Veja os produtos, confirme a disponibilidade e retire diretamente
            na Star Point Maringá.
          </p>

          <dl className="mt-8 space-y-4 text-sm">
            <div className="flex gap-3">
              <dt>
                <MapPin className="size-5 text-star" aria-label="Endereço" />
              </dt>
              <dd>
                {site.address}
                <br />
                {site.city} · CEP {site.zip}
              </dd>
            </div>
            <div className="flex gap-3">
              <dt>
                <Clock className="size-5 text-star" aria-label="Horário" />
              </dt>
              <dd>
                {site.hours.map((h) => (
                  <p key={h.days}>
                    {h.days}: <strong>{h.time}</strong>
                  </p>
                ))}
              </dd>
            </div>
            <div className="flex gap-3">
              <dt>
                <Phone className="size-5 text-star" aria-label="Telefone" />
              </dt>
              <dd>{site.phone}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-star px-5 py-3 font-bold text-ink transition-transform hover:-translate-y-0.5"
            >
              <Navigation className="size-4.5" aria-hidden />
              Como chegar
            </a>
            <a
              href={waDefault()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-paper/30 px-5 py-3 font-bold transition-colors hover:border-whats hover:text-whats"
            >
              <MessageCircle className="size-4.5" aria-hidden />
              Falar com a loja
            </a>
          </div>
        </div>

        <div className="relative grid grid-cols-2 gap-3 self-center">
          <span className="relative block aspect-[3/4] overflow-hidden rounded-lg">
            <Image
              src="/images/loja-fachada.jpg"
              alt="Fachada da Star Point no Shopping Maringá Park"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </span>
          <span className="relative mt-8 block aspect-[3/4] overflow-hidden rounded-lg">
            <Image
              src="/images/loja-interior.jpg"
              alt="Interior da loja, com parede de tênis e atendimento"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </span>
          <span
            className="display-black pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-5xl uppercase text-star md:text-6xl"
            aria-hidden
          >
            ★ Maringá
          </span>
        </div>
      </div>
    </section>
  );
}
