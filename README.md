# Lintel: estudio de diseño web

Web *one page* de Lintel, el estudio que vende webs para cualquier negocio (packs Simple, Avanzada, Profesional y Personalizada; el Profesional va conectado al TPV EasyHost). Vite + React + TypeScript, mismo sistema que la web del TPV.

Dirección de diseño: **el plano**. La página es una lámina técnica (papel cuadriculado, tinta azul, anotaciones en rojo) y los packs se eligen sobre un plano de web que se va construyendo: Simple → Avanzada → Profesional.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # versión de producción en /dist
```

## Idiomas
Español en `/` (`index.html`) e inglés en `/en/` (`en/index.html`). Los textos están en los bloques `es` y `en` de cada archivo de `src/config`.

## Dónde cambiar cada cosa
| Qué | Archivo |
| --- | --- |
| Precios (una sola vez, valen para los dos idiomas) | `src/config/packs.ts` → `prices` |
| Textos de los packs, mantenimiento y planes del TPV | `src/config/packs.ts` |
| Resto de textos, email, destino del formulario, enlace a la web del TPV | `src/config/site.ts` |
| Plano de la web (dibujo de los packs) | `src/components/Blueprint.tsx` |
| Plano animado de la portada | `src/components/HeroBlueprint.tsx` |
| Cinta, comparativa, «Cómo trabajamos» y preguntas frecuentes | `src/components/Ticker.tsx`, `Compare.tsx`, `Process.tsx`, `Faq.tsx` (textos en `src/config/site.ts`) |
| Colores, tipografía y espaciados | `src/styles/tokens.css` |
| SEO y dominio | `index.html` y `en/index.html` |
| Páginas legales | `public/aviso-legal/`, `public/politica-de-*/`, `public/en/*/` |

## Pendiente antes de publicar
- Email y teléfono reales (`src/config/site.ts`) y dominio (`index.html`, `en/index.html`).
- `formEndpoint`: con `null`, el formulario abre el correo del visitante con la solicitud redactada.
- `tpvUrl`: URL de la web del TPV para el enlace del pack Profesional.
- Textos legales.
- Qué «otras ventajas» incluye Avanzada y qué plan del TPV incluye Profesional.

## Despliegue
Cloudflare Workers (sitio estático), configurado en `wrangler.jsonc`: Cloudflare ejecuta `npm run build` y publica `./dist`.
