/**
 * IDIOMAS
 * -------
 * La web existe en dos versiones:
 *   - Español: /        (index.html, <html lang="es">)
 *   - Inglés:  /en/     (en/index.html, <html lang="en">)
 *
 * El idioma se lee del atributo `lang` de cada página. Los textos de cada
 * idioma están en los archivos de src/config, dentro de los bloques `es` y `en`.
 */
export type Lang = 'es' | 'en';

export const lang: Lang = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'es';

/** Devuelve la versión del idioma actual: pick({ es: 'Hola', en: 'Hello' }). */
export function pick<T>(byLang: Record<Lang, T>): T {
  return byLang[lang];
}

/** Dirección de cada versión, para el selector de idioma y los enlaces hreflang. */
export const langHome: Record<Lang, string> = { es: '/', en: '/en/' };

/** Formato de precio: "40 €" en español, "€40" en inglés. */
export function formatMoney(amount: string, currency = '€'): string {
  return lang === 'en' ? `${currency}${amount}` : `${amount} ${currency}`;
}
