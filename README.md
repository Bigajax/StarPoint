# ★ Star Point Maringá — Vitrine Digital

Vitrine digital premium da loja Star Point Maringá: o cliente explora os
produtos no site, consulta disponibilidade, **reserva pelo WhatsApp e retira
na loja**. Sem checkout, sem carrinho — o WhatsApp é o canal de conversão.

> **Dados demonstrativos**: os produtos, preços, tamanhos e reservas são
> fictícios, criados para apresentação da proposta.

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Para gerar a versão de produção: `npm run build && npm start`.
Para publicar: o projeto está pronto para deploy na [Vercel](https://vercel.com) (importar a pasta e clicar em Deploy).

## O que editar (sem mexer no código das páginas)

| O quê | Onde |
| --- | --- |
| **WhatsApp da loja** | `config/site.ts` → `whatsapp` (só dígitos, com 55) |
| Telefone, endereço, horário | `config/site.ts` |
| Instagram e link do Maps | `config/site.ts` |
| URL pública (SEO/sitemap) | `config/site.ts` → `url` |
| **Produtos** (nome, preço, tamanhos, fotos, selos) | `data/products.ts` |
| **Marcas** (adicionar/remover/destacar) | `data/brands.ts` |
| Categorias e estilos | `data/categories.ts` |
| Fotos | `public/images/` (produtos em `produtos/`, feed em `insta/`) |
| Vídeos do hero | `public/videos/hero-1.mp4` e `hero-2.mp4` (720×1280, mudos, em loop) |
| Itens do "Monte o look" | `components/LookSection.tsx` → `hotspots` |

## Páginas

- `/` — home completa (hero, confiança, categorias, novidades, banner de reserva, marcas, estilos, mais procurados, monte o look, loja, Instagram, lista VIP)
- `/produtos` — catálogo com busca, filtros (categoria, marca, tamanho, cor, preço, gênero, novidades, ofertas), ordenação e paginação progressiva
- `/produto/[slug]` — galeria, tamanhos com 3 estados, reserva via WhatsApp com mensagem preenchida, acordeões e relacionados
- `/categorias/[slug]`, `/estilos/[slug]`, `/marcas`, `/marcas/[slug]`
- `/favoritos` — salvos no navegador (localStorage), envio da lista pelo WhatsApp
- `/sobre`, `/contato`, `/reserva-retirada`, `/trocas`, `/politica-privacidade`, `/termos`
- `/admin` — painel de gestão **simulado** (dashboard, produtos, categorias, marcas, reservas, contatos, destaques). As alterações ficam no navegador; a estrutura em `lib/adminStore.ts` está pronta para trocar por Supabase/Firebase/Nuvemshop/ERP.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide Icons

SEO configurado (metadata, Open Graph, sitemap, robots, JSON-LD de loja e
produto), acessibilidade (foco visível, navegação por teclado, contraste,
`prefers-reduced-motion`) e imagens otimizadas via `next/image`.
