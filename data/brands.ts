/**
 * ============================================================
 * MARCAS — lista totalmente editável.
 * Adicione/remova marcas conforme o mix real da loja.
 * `image` é opcional: sem foto, o card usa o wordmark tipográfico.
 * ============================================================
 */
export type Brand = {
  slug: string;
  name: string;
  /** frase curta exibida no card editorial */
  tagline: string;
  /** descrição da página da marca */
  description: string;
  image?: string;
  /** logo oficial (SVG em /public/images/logos) — usado na faixa rotativa */
  logo?: string;
  featured: boolean;
};

export const brands: Brand[] = [
  {
    slug: "adidas",
    logo: "/images/logos/adidas.svg",
    name: "Adidas",
    tagline: "Clássicos que atravessam gerações.",
    description:
      "Do Samba ao Campus, as três listras seguem definindo o que é clássico no streetwear. Na Star Point Maringá você encontra os modelos mais procurados da linha Originals.",
    image: "/images/marcas/adidas.jpg",
    featured: true,
  },
  {
    slug: "nike",
    logo: "/images/logos/nike.svg",
    name: "Nike",
    tagline: "O swoosh que move a cultura.",
    description:
      "Performance e rua no mesmo par. Consulte pelo WhatsApp os modelos Nike disponíveis na loja — o estoque muda toda semana.",
    featured: true,
  },
  {
    slug: "vans",
    logo: "/images/logos/vans.svg",
    name: "Vans",
    tagline: "Off the wall desde sempre.",
    description:
      "A marca que calça o skate mundial. Old Skool, Skate Classics e a linha MTE para qualquer terreno.",
    image: "/images/marcas/vans.jpg",
    featured: true,
  },
  {
    slug: "new-balance",
    logo: "/images/logos/new-balance.svg",
    name: "New Balance",
    tagline: "O conforto virou desejo.",
    description:
      "Dos clássicos 550 ao pro model do brasileiro Tiago Lemos, a NB é presença certa nas vitrines — e nos pés — de Maringá.",
    image: "/images/marcas/new-balance.jpg",
    featured: true,
  },
  {
    slug: "lacoste",
    logo: "/images/logos/lacoste.svg",
    name: "Lacoste",
    tagline: "Elegância esportiva de quadra.",
    description:
      "O crocodilo francês entre o tênis e a rua: polos piquet, moletons e couro branco impecável.",
    image: "/images/marcas/lacoste.jpg",
    featured: true,
  },
  {
    slug: "champion",
    logo: "/images/logos/champion.svg",
    name: "Champion",
    tagline: "O moletom original.",
    description:
      "Inventora do hoodie como conhecemos. Felpa grossa, logo Script e décadas de história no atletismo americano.",
    image: "/images/marcas/champion.jpg",
    featured: true,
  },
  {
    slug: "oakley",
    logo: "/images/logos/oakley.svg",
    name: "Oakley",
    tagline: "A estética técnica dos anos 2000.",
    description:
      "Óculos, bonés e camisetas da fase mais cultuada da marca — de volta ao centro do streetwear.",
    image: "/images/marcas/oakley.jpg",
    featured: true,
  },
  {
    slug: "puma",
    logo: "/images/logos/puma.svg",
    name: "Puma",
    tagline: "Terrace culture e velocidade.",
    description:
      "Do futebol de arquibancada ao lifestyle: couro, sola gum e o formstrip inconfundível.",
    image: "/images/marcas/puma.jpg",
    featured: false,
  },
  {
    slug: "asics",
    logo: "/images/logos/asics.svg",
    name: "Asics",
    tagline: "Running japonês, culto mundial.",
    description:
      "Os runners técnicos que dominaram as ruas. Consulte a disponibilidade dos modelos GEL pelo WhatsApp.",
    featured: false,
  },
  {
    slug: "approve",
    name: "Approve",
    tagline: "Streetwear nacional de peso.",
    description:
      "Gráficos autorais e malhas pesadas de uma das marcas brasileiras mais fortes da cena.",
    image: "/images/marcas/approve.jpg",
    featured: false,
  },
  {
    slug: "ous",
    name: "Ous",
    tagline: "Skate brasileiro, orgulho local.",
    description:
      "Tênis de skate desenhados e feitos no Brasil, com identidade própria e qualidade de exportação.",
    image: "/images/marcas/ous.jpg",
    featured: true,
  },
  {
    slug: "high",
    name: "High Company",
    tagline: "A cara do street nacional.",
    description:
      "Gráficos ousados e drops disputados — a High é presença obrigatória no guarda-roupa streetwear.",
    featured: false,
  },
  {
    slug: "kost",
    name: "Kost",
    tagline: "Gráficos com atitude.",
    description: "Camisetas de malha grossa e estampas autorais.",
    featured: false,
  },
  {
    slug: "thesaint",
    name: "TheSaint",
    tagline: "Estampas em spray, feitas a dois.",
    description: "Camisetas com gráficos manuais para usar em dupla — ou não.",
    featured: false,
  },
  {
    slug: "g-shock",
    name: "G-Shock",
    tagline: "Indestrutível por definição.",
    description: "Os relógios que aguentam qualquer corre, do skate ao mar.",
    featured: false,
  },
];

export const getBrand = (slug: string) => brands.find((b) => b.slug === slug);
