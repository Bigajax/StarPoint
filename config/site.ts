/**
 * ============================================================
 * CONFIGURAÇÃO DA LOJA — edite aqui, o site inteiro acompanha.
 * ============================================================
 */
export const site = {
  name: "Star Point Maringá",
  tagline: "Tênis, Roupas e Streetwear",
  description:
    "Encontre tênis, roupas e acessórios na Star Point Maringá. Consulte tamanhos, reserve pelo WhatsApp e retire diretamente na loja.",

  /** EDITAR: número do WhatsApp com DDI+DDD, só dígitos (55 44 9....) */
  whatsapp: "5544999999999",

  /** EDITAR: telefone exibido no site */
  phone: "(44) 99999-9999",

  /** EDITAR: endereço da unidade */
  address: "Av. São Paulo, 1099 — Shopping Maringá Park, 4º piso",
  city: "Maringá — PR",
  zip: "87013-040",

  /** EDITAR: link de rota (Google Maps) */
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Shopping+Maringa+Park+Av.+S%C3%A3o+Paulo+1099+Maring%C3%A1",

  /** EDITAR: horário de atendimento */
  hours: [
    { days: "Segunda a sábado", time: "10h às 22h" },
    { days: "Domingos e feriados", time: "14h às 20h" },
  ],

  /** EDITAR: Instagram da unidade */
  instagram: "starpoint.maringa",
  instagramUrl: "https://www.instagram.com/starpoint.maringa/",

  /** EDITAR: URL pública do site quando publicado (usada em SEO/sitemap) */
  url: "https://starpoint-maringa.vercel.app",

  /** Mensagem padrão do botão flutuante de WhatsApp */
  whatsappDefaultMessage:
    "Olá! Vim pelo site da Star Point Maringá e gostaria de atendimento.",
} as const;

export type Site = typeof site;
