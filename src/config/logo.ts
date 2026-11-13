/**
 * Geometría del símbolo «Escuadra» (manual de marca v2.0), en una retícula de 48 × 48.
 * La usa el menú.
 */
export const LOGO_VIEWBOX = 48;

/** Viga (dintel) y jamba: forman la escuadra. */
export const LOGO_BEAM = { x: 6, y: 7, width: 36, height: 9 };
export const LOGO_POST = { x: 6, y: 16, width: 9, height: 26 };
/** Cuadrado de luz que entra por la abertura. */
export const LOGO_LIGHT = { x: 25, y: 25, width: 11, height: 11 };

/**
 * Esquema del dintel del manual de marca («la abertura: tu web»), en su retícula de 360 × 230:
 * viga sobre dos jambas y el umbral. Lo usa la intro de entrada.
 */
export const LINTEL_BEAM = { x: 50, y: 40, width: 260, height: 34 };
export const LINTEL_POSTS = [
  { x: 88, y: 74, width: 40, height: 118 },
  { x: 232, y: 74, width: 40, height: 118 },
];
export const LINTEL_THRESHOLD = { x: 30, y: 192, width: 300, height: 10 };
/** La abertura: entre las jambas, bajo la viga y sobre el umbral. */
export const LINTEL_OPENING = {
  x: LINTEL_POSTS[0].x + LINTEL_POSTS[0].width,
  y: LINTEL_BEAM.y + LINTEL_BEAM.height,
  width: LINTEL_POSTS[1].x - (LINTEL_POSTS[0].x + LINTEL_POSTS[0].width),
  height: LINTEL_THRESHOLD.y - (LINTEL_BEAM.y + LINTEL_BEAM.height),
};
