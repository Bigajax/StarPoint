import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function CategoryCard({
  href,
  name,
  image,
  className = "",
  imgClassName = "",
  sizes = "(max-width: 768px) 50vw, 33vw",
}: {
  href: string;
  name: string;
  image: string;
  className?: string;
  /** ajuste fino do enquadramento, ex.: object-[50%_20%] */
  imgClassName?: string;
  sizes?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden rounded-lg bg-ink ${className}`}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes={sizes}
        className={`object-cover transition-transform duration-500 group-hover:scale-105 ${imgClassName}`}
      />
      <span
        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent"
        aria-hidden
      />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 md:p-5">
        <span className="display text-xl uppercase text-paper md:text-2xl">
          {name}
        </span>
        <span className="grid size-9 place-items-center rounded-full bg-star text-ink transition-transform group-hover:rotate-45">
          <ArrowUpRight className="size-4.5" aria-hidden />
        </span>
      </span>
    </Link>
  );
}
