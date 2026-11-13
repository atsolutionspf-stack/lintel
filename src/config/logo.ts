/**
 * Geometría del símbolo «Escuadra» (manual de marca v2.0), en una retícula de 48 × 48.
 * La usan el menú y la intro de entrada: cambia aquí la forma y cambia en los dos sitios.
 */
export const LOGO_VIEWBOX = 48;

/** Viga (dintel) y jamba: forman la escuadra. */
export const LOGO_BEAM = { x: 6, y: 7, width: 36, height: 9 };
export const LOGO_POST = { x: 6, y: 16, width: 9, height: 26 };
/** Cuadrado de luz que entra por la abertura. */
export const LOGO_LIGHT = { x: 25, y: 25, width: 11, height: 11 };

/** Hueco del símbolo: bajo la viga y a la derecha de la jamba. Por aquí se «entra» en la intro. */
export const LOGO_OPENING = {
  x: LOGO_POST.x + LOGO_POST.width,
  y: LOGO_BEAM.y + LOGO_BEAM.height,
  width: LOGO_BEAM.x + LOGO_BEAM.width - (LOGO_POST.x + LOGO_POST.width),
  height: LOGO_POST.y + LOGO_POST.height - (LOGO_BEAM.y + LOGO_BEAM.height),
};
