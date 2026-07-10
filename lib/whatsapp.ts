import { site } from "@/config/site";
import type { Product } from "@/data/products";

/** Monta o link wa.me com a mensagem pré-preenchida. */
export function waLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Mensagem padrão do atendimento (botão flutuante, header etc.). */
export function waDefault(): string {
  return waLink(site.whatsappDefaultMessage);
}

/** Mensagem de consulta de produto, com tamanho e cor selecionados. */
export function waProduct(
  product: Pick<Product, "name">,
  size?: string,
  color?: string
): string {
  let msg = `Olá! Vi o produto ${product.name} no site da Star Point Maringá. Gostaria de consultar a disponibilidade`;
  if (size) msg += ` no tamanho ${size}`;
  if (color) msg += ` na cor ${color}`;
  msg += ".";
  return waLink(msg);
}

/** Mensagem de reserva para retirada. */
export function waReserve(
  product: Pick<Product, "name" | "sku">,
  size?: string,
  color?: string
): string {
  let msg = `Olá! Gostaria de reservar para retirada na loja o produto ${product.name} (cód. ${product.sku})`;
  if (size) msg += `, tamanho ${size}`;
  if (color) msg += `, cor ${color}`;
  msg += ". Pode confirmar a disponibilidade?";
  return waLink(msg);
}

/** Mensagem com a lista de favoritos. */
export function waFavorites(names: string[]): string {
  const list = names.map((n) => `• ${n}`).join("\n");
  return waLink(
    `Olá! Salvei estes produtos no site da Star Point Maringá e queria consultar a disponibilidade:\n${list}`
  );
}
