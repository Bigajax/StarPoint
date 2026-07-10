import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Cabeçalho editorial de seção: eyebrow com estrela, título display
 * alinhado à esquerda e link de ação na mesma linha (desktop).
 */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  href,
  linkLabel,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <p className={`star-eyebrow ${dark ? "text-star" : "text-ink/70"}`}>
          {eyebrow}
        </p>
        <h2 className="display mt-2 text-3xl uppercase md:text-4xl">{title}</h2>
        {subtitle && (
          <p className={`mt-2 text-sm md:text-base ${dark ? "text-paper/70" : "text-steel"}`}>
            {subtitle}
          </p>
        )}
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className={`group flex items-center gap-2 text-sm font-bold ${
            dark ? "text-star" : "text-ink"
          }`}
        >
          {linkLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
