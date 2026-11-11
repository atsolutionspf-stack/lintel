# CLAUDE.md

Instrucciones para trabajar en este repositorio. Léelas antes de cambiar nada.

## Qué es

**Lintel** es el estudio de AT Solutions que vende webs para **cualquier negocio** (no solo restaurantes). Esta es su web: una *one page* en español e inglés con cuatro packs (Simple, Avanzada, Profesional y Personalizada), la hora de mantenimiento y un formulario de contacto.

- Lintel es una marca **separada** de **Clientia** (antes EasyHost), el software TPV y CRM. Clientia solo aparece en la tarjeta «¿Eres un restaurante?», en Servicios adicionales (no va dentro de ningún pack).
- La web de Clientia es otro proyecto: repositorio `atsolutionspf-stack/EasyHost`, publicada en https://easyhost.atsolutionspf.workers.dev.

## Dónde vive la web

Hay **dos versiones publicadas** con el mismo contenido. Antes de cambiar algo, pregunta cuál hay que tocar si no está claro.

| Versión | Dónde se edita | Publicada en |
| --- | --- | --- |
| Código (este repo) | Vite + React + TypeScript | https://lintel.atsolutionspf.workers.dev (Cloudflare Worker `lintel`) |
| Framer | Proyecto «Lintel» en el workspace de Framer de GIO | https://early-galaxy-770441.framer.app |

**Rediseño (9/11/2026):** portada oscura con el plano animado, cinta con lo que incluyen los packs, pack Avanzada «Recomendado» con plazos de entrega, comparativa, «Cómo trabajamos», preguntas frecuentes y contacto oscuro como cierre. **Las dos versiones (código y Framer) tienen el mismo diseño.** Si cambias una, avisa de que la otra queda desactualizada.

En Framer, el plano de los packs es un componente de código (`PacksBlueprint.tsx`) con el mismo contenido que `src/components/Blueprint.tsx` y `src/components/Packs.tsx`. Si cambias los packs o los precios en un sitio, avisa de que el otro queda desactualizado.

## Comandos

```bash
npm install
npm run dev       # desarrollo
npm run build     # comprueba tipos (tsc) y genera /dist
npx wrangler deploy   # publica /dist en el Worker `lintel` de Cloudflare
```

`npm run build` debe pasar sin errores antes de cualquier commit o despliegue.

## Estructura

| Qué | Archivo |
| --- | --- |
| Precios (una sola vez, valen para los dos idiomas) | `src/config/packs.ts` → `prices` |
| Textos de los packs y del mantenimiento | `src/config/packs.ts` |
| Resto de textos, email, destino del formulario, bloque y enlace de Clientia (`clientia`, `clientiaUrl`) | `src/config/site.ts` |
| Plano de la web (dibujo SVG que cambia según el pack) | `src/components/Blueprint.tsx` |
| Portada y su plano animado | `src/components/Hero.tsx`, `src/components/HeroBlueprint.tsx` |
| Cinta (ticker) | `src/components/Ticker.tsx` (textos en `site.ticker`) |
| Selector de packs y ficha del pack | `src/components/Packs.tsx` |
| Comparativa (matriz de incluido / no incluido) | `src/components/Compare.tsx`, `compareMatrix` en `src/config/packs.ts` |
| Cómo trabajamos | `src/components/Process.tsx` (textos en `site.process`) |
| Preguntas frecuentes | `src/components/Faq.tsx` (textos en `site.faq`) |
| Servicios adicionales: hora de mantenimiento y tarjeta de Clientia | `src/components/Maintenance.tsx` |
| Envío del formulario (`mailto` o endpoint) | `src/lib/contact.ts` |
| Colores, tipografía y espaciados | `src/styles/tokens.css` |
| SEO y dominio | `index.html` (español) y `en/index.html` (inglés) |
| Páginas legales | `public/aviso-legal/`, `public/politica-de-*/`, `public/en/*/` |
| Despliegue | `wrangler.jsonc` |

## Reglas del proyecto

- **Dos idiomas siempre a la par.** Español en `/`, inglés en `/en/`. Cada texto está en los bloques `es` y `en` de `src/config`; si cambias uno, cambia el otro.
- **Precios en un solo sitio:** `prices` en `src/config/packs.ts`. No los escribas a mano en los textos.
- **Todos los packs son de pago único, sin suscripción.**
- **Sin «TPV» ni «CRM» en los packs.** La parte de datos se llama siempre **«Base de datos»** (solo en Profesional), porque los packs son para cualquier negocio. «TPV» y «CRM» solo aparecen al hablar de Clientia.
- **Clientia:** «Planes desde 19 €/mes» debe coincidir con el plan más barato de la web de Clientia (ahora Essential).
- **Datos confirmados por AT Solutions (9/11/2026):** dominio y hosting se contratan aparte (ayudamos a configurarlos); plazos de entrega: Simple hasta 48 h, Avanzada hasta 7 días, Profesional hasta 12 días. Están en las preguntas frecuentes de Framer.
- **Sin datos inventados:** nada de testimonios, cifras de clientes, ejemplos de webs hechas, teléfonos ni emails falsos. Lo que falte va como placeholder entre corchetes (`[Teléfono de contacto]`) o con dominio `.example`.
- **Textos generales**, para cualquier negocio: «tu negocio», «catálogo», «reservas y citas». No vuelvas a hablar solo de restaurantes.
- **Diseño «el plano»:** la página es una lámina técnica (papel cuadriculado, líneas en azul tinta, anotaciones y cotas en rojo carmín, rótulos «Lámina 0X / 04», pie con forma de cajetín). Tipografías: Young Serif (titulares), Schibsted Grotesk (texto) y JetBrains Mono (anotaciones). Usa los tokens de `src/styles/tokens.css`; no añadas colores sueltos.
- **Logotipo:** un dintel (dos pilares y una viga roja) sobre un cuadrado azul. Está en `src/components/Nav.tsx` y `public/favicon.svg`.
- **Responsive:** la web debe verse bien de 375 px a 1440 px, sin scroll horizontal. Compruébalo en el navegador después de cambios visuales.
- **Accesibilidad:** etiquetas visibles en el formulario, foco visible, y `prefers-reduced-motion` respetado.

## Commits y despliegue

- Mensajes de commit en español, describiendo el cambio para una persona (no para el código).
- Rama `main` en `atsolutionspf-stack/lintel` (privado).
- Publicar en Cloudflare o en Framer es visible para todo el mundo: hazlo solo cuando te lo pidan.

## Pendiente

- Teléfono real (`src/config/site.ts`). El email de contacto es `atsolutionspf@gmail.com`.
- Dominio definitivo (libres a 5/11/2026: `lintelstudio.com`, `lintelwebs.com`) en `index.html` y `en/index.html`.
- Textos legales.
- Avanzada: qué «otras ventajas» incluye además de reservas, pedidos y catálogo.
- Clientia vende el add-on «Página web propia conectada» a +29 €/mes y dice que la web se diseña con Lintel; en Lintel las webs son de pago único. Falta decidir cómo se combinan y explicarlo igual en las dos webs.
- Decidir cuál de las dos versiones (Cloudflare o Framer) es la principal y retirar la otra.

## Cómo trabajar

- Piensa antes de programar: di tus suposiciones y, si algo no está claro, pregunta.
- El mínimo código que resuelva el problema; nada especulativo ni configurable «por si acaso».
- Cambios quirúrgicos: toca solo lo necesario y respeta el estilo existente.
- Define cómo comprobarás el resultado (build, navegador, móvil) y compruébalo antes de dar algo por hecho.
