/**
 * Intro de entrada: el visitante atraviesa la abertura del dintel («la abertura: tu web»).
 *
 * 1. Fondo papel a pantalla completa con el dintel centrado: viga ámbar, jambas y umbral cobalto.
 * 2. Tras 150 ms, la abertura deja ver la página real, ya renderizada detrás (es un hueco
 *    recortado en el overlay, no una captura). Fuera del hueco el overlay sigue opaco.
 * 3. El dintel y su hueco crecen juntos, con escala uniforme y origen en el centro del hueco,
 *    hasta que el hueco cubre toda la pantalla. Entonces se retira el overlay.
 *
 * La página no se escala: solo crece la abertura por la que se ve.
 * Solo en la primera visita de cada pestaña (sessionStorage), nunca con ancla en la URL
 * ni con movimiento reducido. Se puede saltar con el botón o con Escape.
 * Se ejecuta antes del primer render de React, así la página no asoma antes de tiempo.
 */
import { LINTEL_BEAM, LINTEL_OPENING, LINTEL_POSTS, LINTEL_THRESHOLD } from '../config/logo';

const STORAGE_KEY = 'lintel-intro-vista';
const NS = 'http://www.w3.org/2000/svg';

/** Tiempos en ms (total 1400). La portada empieza a animarse cuando ya se ve por el hueco. */
const T = { hold: 150, reveal: 300, zoomStart: 300, total: 1400 };

const COLORS = { paper: '#F4F4F1', beam: '#FFB547', frame: '#2340C8' };

/** Ancho total del dintel (lo marca el umbral) y alto de la viga al umbral. */
const SYMBOL_W = LINTEL_THRESHOLD.width;
const SYMBOL_H = LINTEL_THRESHOLD.y + LINTEL_THRESHOLD.height - LINTEL_BEAM.y;

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const progress = (now: number, start: number, length: number) => clamp01((now - start) / length);

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

    // Máscara: todo el overlay es opaco salvo la abertura
    const mask = el('mask', { id: 'intro-mask', maskUnits: 'userSpaceOnUse' }, defs);
    const maskBg = el('rect', { x: 0, y: 0, fill: 'white' }, mask);
    const maskGroup = el('g', {}, mask);
    el('rect', { ...LINTEL_OPENING, fill: 'black' }, maskGroup);

    const ground = el('rect', { x: 0, y: 0, fill: COLORS.paper, mask: 'url(#intro-mask)' }, svg);

    // El dintel: la abertura empieza cubierta de papel y se aclara para dejar ver la web
    const symbol = el('g', {}, svg);
    const cover = el('rect', { ...LINTEL_OPENING, fill: COLORS.paper }, symbol);
    el('rect', { ...LINTEL_BEAM, fill: COLORS.beam }, symbol);
    for (const post of LINTEL_POSTS) el('rect', { ...post, fill: COLORS.frame }, symbol);
    el('rect', { ...LINTEL_THRESHOLD, fill: COLORS.frame }, symbol);

    // Escala uniforme (nunca deforma el dintel). La final hace que la abertura cubra la pantalla
    // con un pequeño margen, así jambas, viga y umbral quedan fuera antes de retirar el overlay.
    let startScale = 1;
    let endScale = 1;
    let cx = 0;
    let cy = 0;
    const ox = LINTEL_OPENING.x + LINTEL_OPENING.width / 2;
    const oy = LINTEL_OPENING.y + LINTEL_OPENING.height / 2;
    layout = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      for (const r of [maskBg, ground]) {
        r.setAttribute('width', String(w));
        r.setAttribute('height', String(h));
      }
      startScale = Math.min((w * 0.62) / SYMBOL_W, (h * 0.42) / SYMBOL_H, 1.2);
      endScale = Math.max(w / LINTEL_OPENING.width, h / LINTEL_OPENING.height) * 1.04;
      cx = w / 2;
      cy = h / 2;
    };
    layout();

    const place = (k: number) => {
      // Interpolación geométrica: el acercamiento se percibe a ritmo constante, sin tirón final
      const s = startScale * Math.pow(endScale / startScale, k);
      // El centro de la abertura queda en el centro de la pantalla y todo crece desde ahí
      const tf = `translate(${cx} ${cy}) scale(${s}) translate(${-ox} ${-oy})`;
      symbol.setAttribute('transform', tf);
      maskGroup.setAttribute('transform', tf);
    };

    const frame = (now: number) => {
      if (done) return;
      const t = now - start;
      cover.setAttribute('opacity', String(1 - easeInOut(progress(t, T.hold, T.reveal))));
      place(easeInOut(progress(t, T.zoomStart, T.total - T.zoomStart)));
      if (t >= T.hold) root.classList.remove('intro-playing');
      if (t >= T.total) {
        finish();
        return;
      }
      raf = requestAnimationFrame(frame);
    };

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
