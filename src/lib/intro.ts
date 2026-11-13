/**
 * Intro de entrada: el visitante atraviesa la puerta del logo.
 *
 * 1. Fondo tinta a pantalla completa con el símbolo centrado y dos puertas cerradas en su hueco.
 * 2. Tras 150 ms, las puertas se deslizan hacia los lados. La viga y la jamba no se mueven.
 *    Por el hueco (una máscara recortada en el overlay) se ve la página real, ya renderizada.
 * 3. El símbolo crece hasta que el hueco cubre la pantalla; el marco sale y el overlay desaparece.
 *
 * Solo en la primera visita de cada pestaña (sessionStorage), nunca con ancla en la URL
 * ni con movimiento reducido. Se puede saltar con el botón o con Escape.
 * Se ejecuta antes del primer render de React, así la página no asoma antes de tiempo.
 */
import { LOGO_BEAM, LOGO_LIGHT, LOGO_OPENING, LOGO_POST } from '../config/logo';

const STORAGE_KEY = 'lintel-intro-vista';
const NS = 'http://www.w3.org/2000/svg';

/** Tiempos en ms (total 1400). */
const T = { hold: 150, doors: 500, zoomStart: 560, zoom: 740, fadeStart: 1250, total: 1400, heroStart: 620 };

const COLORS = { ink: '#12141C', frame: '#9DB0FF', light: '#FFB547', door: '#232838', seam: '#3A4157' };

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const progress = (now: number, start: number, length: number) => clamp01((now - start) / length);

function shouldPlay(): boolean {
  if (location.hash) return false;
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
  // Siempre marcamos la sesión, aunque se omita por ancla: así no salta a mitad de la visita.
  const anchored = Boolean(location.hash);
  if (anchored) {
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

    // Máscara: todo el overlay es opaco salvo el hueco del logo
    const mask = el('mask', { id: 'intro-mask', maskUnits: 'userSpaceOnUse' }, defs);
    const maskBg = el('rect', { x: 0, y: 0, fill: 'white' }, mask);
    const maskGroup = el('g', {}, mask);
    el('rect', { ...LOGO_OPENING, fill: 'black' }, maskGroup);

    // Recorte de las puertas: no salen del hueco (un clipPath solo admite formas, no grupos)
    const clip = el('clipPath', { id: 'intro-doors', clipPathUnits: 'userSpaceOnUse' }, defs);
    const clipRect = el('rect', { ...LOGO_OPENING }, clip);

    const ground = el('rect', { x: 0, y: 0, fill: COLORS.ink, mask: 'url(#intro-mask)' }, svg);

    const logo = el('g', {}, svg);
    const doors = el('g', { 'clip-path': 'url(#intro-doors)' }, svg);
    const doorsInner = el('g', {}, doors);
    const half = LOGO_OPENING.width / 2;
    const leftDoor = el('g', {}, doorsInner);
    el('rect', { x: LOGO_OPENING.x, y: LOGO_OPENING.y, width: half, height: LOGO_OPENING.height, fill: COLORS.door }, leftDoor);
    el('rect', { x: LOGO_OPENING.x + half - 0.35, y: LOGO_OPENING.y, width: 0.35, height: LOGO_OPENING.height, fill: COLORS.seam }, leftDoor);
    const rightDoor = el('g', {}, doorsInner);
    el('rect', { x: LOGO_OPENING.x + half, y: LOGO_OPENING.y, width: half, height: LOGO_OPENING.height, fill: COLORS.door }, rightDoor);
    el('rect', { x: LOGO_OPENING.x + half, y: LOGO_OPENING.y, width: 0.35, height: LOGO_OPENING.height, fill: COLORS.seam }, rightDoor);

    // El símbolo real encima: viga, jamba y el cuadrado de luz
    el('rect', { ...LOGO_BEAM, fill: COLORS.frame }, logo);
    el('rect', { ...LOGO_POST, fill: COLORS.frame }, logo);
    const light = el('rect', { ...LOGO_LIGHT, fill: COLORS.light }, logo);

    // Escala uniforme (nunca deforma el logo) y zoom necesario para que el hueco cubra la pantalla
    let unit = 1;
    let zoomTo = 1;
    let cx = 0;
    let cy = 0;
    const ox = LOGO_OPENING.x + LOGO_OPENING.width / 2;
    const oy = LOGO_OPENING.y + LOGO_OPENING.height / 2;
    layout = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      for (const r of [maskBg, ground]) {
        r.setAttribute('width', String(w));
        r.setAttribute('height', String(h));
      }
      unit = Math.min(Math.max(Math.min(w, h) * 0.32, 120), 220) / 48;
      cx = w / 2;
      cy = h / 2;
      zoomTo = Math.max(w / (LOGO_OPENING.width * unit), h / (LOGO_OPENING.height * unit)) * 1.25;
    };
    layout();

    const place = (zoom: number) => {
      const s = unit * zoom;
      // El centro del hueco queda en el centro de la pantalla y crece desde ahí
      const tf = `translate(${cx} ${cy}) scale(${s}) translate(${-ox} ${-oy})`;
      for (const g of [logo, maskGroup, clipRect, doorsInner]) g.setAttribute('transform', tf);
    };

    const frame = (now: number) => {
      if (done) return;
      const t = now - start;
      const d = easeInOut(progress(t, T.hold, T.doors));
      leftDoor.setAttribute('transform', `translate(${-half * d} 0)`);
      rightDoor.setAttribute('transform', `translate(${half * d} 0)`);
      light.setAttribute('opacity', String(1 - easeInOut(progress(t, T.hold, T.doors * 0.7))));
      place(1 + (zoomTo - 1) * easeInOut(progress(t, T.zoomStart, T.zoom)));
      overlay.style.opacity = String(1 - progress(t, T.fadeStart, T.total - T.fadeStart));
      if (t >= T.heroStart) root.classList.remove('intro-playing');
      if (t >= T.total) {
        finish();
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    place(1);
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
