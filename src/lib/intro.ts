/**
 * Intro de entrada: «entrar a través de Lintel».
 *
 * El símbolo real (viga y jamba cobalto, cuadrado de luz ámbar; geometría en config/logo.ts)
 * es la estructura. En su hueco hay dos hojas de puerta cobalto; el cuadrado ámbar está sobre
 * ellas con las puertas cerradas y, al abrirse, se convierte en la luz que sale del hueco.
 *
 * Una sola línea temporal (ms) con fases solapadas, para que se sienta como un movimiento:
 *   0–800      puertas cerradas y quietas
 *   800–2800   apertura de las dos hojas
 *   1000–3000  la luz crece con la apertura
 *   2400–3500  acercamiento al hueco (solapado con el final de la apertura)
 *   3300–4100  la luz cubre la pantalla y el overlay se funde con la portada
 *
 * 1. Fondo papel, símbolo centrado y puertas cerradas.
 * 2. Las puertas giran hacia dentro sobre sus bordes exteriores (perspectiva simulada:
 *    el borde interior se estrecha y se oscurece al alejarse). La viga y la jamba no se mueven.
 * 3. Por la separación central sale luz ámbar que crece al abrirse y alumbra los bordes.
 *    Dentro solo hay luz: la web todavía no se ve.
 * 4. Con las puertas abiertas, la cámara avanza hacia el hueco hasta que la luz llena
 *    la pantalla, y el overlay se funde con la portada.
 *
 * Solo en la primera visita de cada pestaña (sessionStorage), nunca con ancla en la URL
 * ni con movimiento reducido. Se puede saltar con el botón o con Escape.
 * Se ejecuta antes del primer render de React, así la página no asoma antes de tiempo.
 */
import { LOGO_BEAM, LOGO_LIGHT, LOGO_OPENING, LOGO_POST } from '../config/logo';

const STORAGE_KEY = 'lintel-intro-vista';
const NS = 'http://www.w3.org/2000/svg';

/** Línea temporal en ms: [inicio, fin] de cada fase. */
const T = {
  doors: [800, 2800],
  light: [1000, 3000],
  square: [800, 1700],
  zoom: [2400, 3500],
  fade: [3300, 4100],
  total: 4100,
} as const;
/** Ángulo final de las puertas (grados): casi de canto, sin llegar a desaparecer. */
const OPEN_ANGLE = 80;

const COLORS = {
  paper: '#F4F4F1',
  cobalt: '#2340C8',
  cobaltDeep: '#16288A',
  amber: '#FFB547',
  lightCore: '#FFF4DE',
};

/** Holgura entre marco y puertas (unidades de la retícula de 48): mantiene legible la escuadra. */
const GAP = 0.7;
const DOOR = {
  x: LOGO_OPENING.x + GAP,
  y: LOGO_OPENING.y + GAP,
  width: LOGO_OPENING.width - GAP,
  height: LOGO_OPENING.height - GAP,
};
const LEAF = DOOR.width / 2;

/** cubic-bezier(x1, 0, x2, 1) como en CSS: resuelve x por Newton y devuelve y. */
function bezier(x1: number, x2: number) {
  const coord = (t: number, p1: number, p2: number) => 3 * (1 - t) * (1 - t) * t * p1 + 3 * (1 - t) * t * t * p2 + t * t * t;
  const slope = (t: number, p1: number, p2: number) => 3 * (1 - t) * (1 - t) * p1 + 6 * (1 - t) * t * (p2 - p1) + 3 * t * t * (1 - p2);
  return (x: number) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const d = slope(t, x1, x2);
      if (Math.abs(d) < 1e-6) break;
      t -= (coord(t, x1, x2) - x) / d;
    }
    return coord(Math.min(1, Math.max(0, t)), 0, 1);
  };
}
/** Arranca suave, gana algo de velocidad y frena al final, sin rebote. */
const ease = bezier(0.45, 0.55);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const phase = (now: number, [start, end]: readonly [number, number]) => ease(clamp01((now - start) / (end - start)));
const mix = (a: string, b: string, k: number) => {
  const c = (h: string, i: number) => parseInt(h.slice(1 + i * 2, 3 + i * 2), 16);
  return `rgb(${[0, 1, 2].map((i) => Math.round(c(a, i) + (c(b, i) - c(a, i)) * k)).join(' ')})`;
};

function shouldPlay(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return false;
    sessionStorage.setItem(STORAGE_KEY, '1');
    return true;
  } catch {
    // Sin acceso a sessionStorage no sabemos si ya se vio: mejor no repetirla.
    return false;
  }
}

function el<K extends keyof SVGElementTagNameMap>(name: K, attrs: Record<string, string | number>, parent?: Element) {
  const node = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  parent?.appendChild(node);
  return node;
}

export function startIntro(): void {
  // Con ancla se omite, pero marcamos la sesión: así no salta a mitad de la visita.
  if (location.hash) {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* sin almacenamiento: no pasa nada */
    }
    return;
  }
  if (!shouldPlay()) return;

  const root = document.documentElement;
  const lang = root.lang.toLowerCase().startsWith('en') ? 'en' : 'es';
  let raf = 0;
  let failsafe = 0;
  let done = false;

  const overlay = document.createElement('div');
  overlay.className = 'intro';
  overlay.setAttribute('aria-hidden', 'true');

  const skip = document.createElement('button');
  skip.type = 'button';
  skip.className = 'intro-skip';
  skip.textContent = lang === 'en' ? 'Skip intro' : 'Saltar intro';

  const prevOverflow = root.style.overflow;
  let layout: () => void = () => {};

  const finish = () => {
    if (done) return;
    done = true;
    cancelAnimationFrame(raf);
    clearTimeout(failsafe);
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('resize', layout);
    overlay.remove();
    skip.remove();
    root.style.overflow = prevOverflow;
    root.classList.remove('intro-playing');
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') finish();
  };

  try {
    const svg = el('svg', { width: '100%', height: '100%' }, overlay);
    const defs = el('defs', {}, svg);
    const ox = LOGO_OPENING.x + LOGO_OPENING.width / 2;
    const oy = LOGO_OPENING.y + LOGO_OPENING.height / 2;

    // Luz: cálida y más clara en el centro del hueco
    const lightGrad = el('radialGradient', { id: 'intro-light', cx: '50%', cy: '50%', r: '70%' }, defs);
    el('stop', { offset: '0', 'stop-color': COLORS.lightCore }, lightGrad);
    el('stop', { offset: '1', 'stop-color': COLORS.amber }, lightGrad);
    // Halo que se derrama sobre el marco y el borde inferior (el umbral)
    const glowGrad = el('radialGradient', { id: 'intro-glow' }, defs);
    el('stop', { offset: '0', 'stop-color': COLORS.amber, 'stop-opacity': 0.55 }, glowGrad);
    el('stop', { offset: '1', 'stop-color': COLORS.amber, 'stop-opacity': 0 }, glowGrad);

    const ground = el('rect', { x: 0, y: 0, fill: COLORS.paper }, svg);
    const scene = el('g', {}, svg);

    const glow = el('ellipse', { cx: ox, cy: oy + 4, rx: 30, ry: 26, fill: 'url(#intro-glow)', opacity: 0 }, scene);
    // Dentro del hueco solo hay luz
    const light = el('rect', { ...LOGO_OPENING, fill: 'url(#intro-light)', opacity: 0 }, scene);

    // Hojas de puerta: polígonos que se recalculan en cada fotograma
    const leftDoor = el('polygon', { fill: COLORS.cobalt }, scene);
    const rightDoor = el('polygon', { fill: COLORS.cobalt }, scene);
    const leftEdge = el('line', { stroke: COLORS.amber, 'stroke-width': 0.35, opacity: 0 }, scene);
    const rightEdge = el('line', { stroke: COLORS.amber, 'stroke-width': 0.35, opacity: 0 }, scene);

    // El marco del logo, encima y fijo
    el('rect', { ...LOGO_BEAM, fill: COLORS.cobalt }, scene);
    el('rect', { ...LOGO_POST, fill: COLORS.cobalt }, scene);
    // El cuadrado de luz del logo, sobre las puertas cerradas: al abrirse se convierte en la luz
    const square = el('rect', { ...LOGO_LIGHT, fill: COLORS.amber }, scene);

    const top = DOOR.y;
    const bottom = DOOR.y + DOOR.height;
    const mid = (top + bottom) / 2;
    /** Coloca una hoja girada `deg` grados. side = -1 izquierda (bisagra a la izquierda), 1 derecha. */
    const setDoor = (door: SVGPolygonElement, edge: SVGLineElement, side: -1 | 1, deg: number, lit: number) => {
      const a = (deg * Math.PI) / 180;
      const hinge = side < 0 ? DOOR.x : DOOR.x + DOOR.width;
      const inner = hinge - side * LEAF * Math.cos(a);
      // Al alejarse, el borde interior se ve más corto (perspectiva)
      const half = (DOOR.height / 2) * (1 - 0.16 * Math.sin(a));
      door.setAttribute('points', `${hinge},${top} ${inner},${mid - half} ${inner},${mid + half} ${hinge},${bottom}`);
      door.setAttribute('fill', mix(COLORS.cobalt, COLORS.cobaltDeep, Math.sin(a) * 0.85));
      edge.setAttribute('x1', String(inner));
      edge.setAttribute('x2', String(inner));
      edge.setAttribute('y1', String(mid - half));
      edge.setAttribute('y2', String(mid + half));
      edge.setAttribute('opacity', String(lit * 0.9));
    };

    // Escala uniforme (nunca deforma el símbolo). La final hace que la parte del hueco que solo
    // tiene luz (entre las hojas abiertas) cubra la pantalla.
    let startScale = 1;
    let endScale = 1;
    let cx = 0;
    let cy = 0;
    const openLeaf = LEAF * Math.cos((OPEN_ANGLE * Math.PI) / 180);
    const clearW = DOOR.width - 2 * openLeaf;
    const clearH = DOOR.height * (1 - 0.16 * Math.sin((OPEN_ANGLE * Math.PI) / 180));
    layout = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ground.setAttribute('width', String(w));
      ground.setAttribute('height', String(h));
      startScale = Math.min(Math.max(Math.min(w, h) * 0.34, 128), 230) / 48;
      // Margen amplio: la luz ya cubre la pantalla antes de que empiece el fundido
      endScale = Math.max(w / clearW, h / clearH) * 1.4;
      cx = w / 2;
      cy = h / 2;
    };
    layout();

    const place = (k: number) => {
      // Interpolación geométrica: la cámara avanza a ritmo constante, sin tirón final.
      // El símbolo entero va centrado al principio y el hueco al final.
      const s = startScale * Math.pow(endScale / startScale, k);
      const fx = 24 + (ox - 24) * k;
      const fy = 24 + (oy - 24) * k;
      scene.setAttribute('transform', `translate(${cx} ${cy}) scale(${s}) translate(${-fx} ${-fy})`);
    };

    const frame = (now: number) => {
      if (done) return;
      const t = now - start;
      // Cada valor sale del mismo reloj: ninguna fase reinicia lo que dejó la anterior
      const o = phase(t, T.doors);
      const lit = phase(t, T.light);
      setDoor(leftDoor, leftEdge, -1, OPEN_ANGLE * o, lit);
      setDoor(rightDoor, rightEdge, 1, OPEN_ANGLE * o, lit);
      light.setAttribute('opacity', String(lit));
      glow.setAttribute('opacity', String(lit));
      square.setAttribute('opacity', String(1 - phase(t, T.square)));
      place(phase(t, T.zoom));
      overlay.style.opacity = String(1 - phase(t, T.fade));
      if (t >= T.fade[0]) root.classList.remove('intro-playing');
      if (t >= T.total) {
        finish();
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    setDoor(leftDoor, leftEdge, -1, 0, 0);
    setDoor(rightDoor, rightEdge, 1, 0, 0);
    place(0);
    root.classList.add('intro-playing');
    root.style.overflow = 'hidden';
    document.body.append(overlay, skip);
    skip.addEventListener('click', finish);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', layout);
    const start = performance.now();
    raf = requestAnimationFrame(frame);
    // Red de seguridad: si el navegador no pinta fotogramas (pestaña en segundo plano, error),
    // el overlay se retira igualmente y la página nunca se queda bloqueada.
    failsafe = window.setTimeout(finish, T.total + 800);
  } catch {
    finish();
  }
}
