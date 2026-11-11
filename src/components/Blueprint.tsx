import type { PackId } from '../config/packs';
import { site } from '../config/site';

/**
 * Plano de la web de un negocio. Cada pack enciende sus capas:
 * Simple (One Page) → Avanzada (+ reservas, pedidos y catálogo) → Profesional (+ base de datos y panel de administración).
 * Las marcas rojas numeradas corresponden a la lista de "Incluye" del pack.
 */
const LEVEL: Record<PackId, number> = { simple: 1, avanzada: 2, profesional: 3, personalizada: 0 };

/** Posición de las marcas numeradas de cada pack, en el orden de su lista de funcionalidades. */
const MARKERS: Record<PackId, [number, number][]> = {
  simple: [[286, 132]],
  avanzada: [[60, 206], [440, 82], [60, 312]],
  profesional: [[540, 236], [16, 318], [16, 365]],
  personalizada: [],
};

export function Blueprint({ pack, label }: { pack: PackId; label: string }) {
  const p = site.preview;
  const level = LEVEL[pack];
  const on = (min: number) => `layer${level >= min ? ' is-on' : ''}`;

  return (
    <svg className={`blueprint${pack === 'personalizada' ? ' is-custom' : ''}`} viewBox="0 0 720 470" aria-hidden="true">
      <defs>
        <pattern id="bp-grid" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M12 0H0V12" className="bp-grid__line" />
        </pattern>
      </defs>

      {/* Cota superior con el pack elegido */}
      <g className="bp-dim">
        <path d="M40 14v14M600 14v14M40 21h560" />
        <rect x="215" y="12" width="210" height="18" className="bp-dim__bg" />
        <text x="320" y="25" textAnchor="middle">{label}</text>
      </g>

      {/* Base: One Page */}
      <g className="bp-base">
        <rect x="40" y="40" width="560" height="400" rx="10" className="bp-sheet" />
        <path d="M40 72h560" className="bp-line" />
        <circle cx="58" cy="56" r="4" className="bp-line" />
        <circle cx="72" cy="56" r="4" className="bp-line" />
        <circle cx="86" cy="56" r="4" className="bp-line" />
        <rect x="210" y="48" width="220" height="16" rx="8" className="bp-soft" />
        <text x="320" y="60" textAnchor="middle" className="bp-mono">{p.url}</text>

        <text x="60" y="97" className="bp-serif">{p.brand}</text>
        <path d="M300 92h28M340 92h28M380 92h28" className="bp-line bp-line--thin" />

        <rect x="60" y="124" width="220" height="14" rx="2" className="bp-ink" />
        <rect x="60" y="144" width="170" height="14" rx="2" className="bp-ink" />
        <path d="M60 172h200M60 182h180M60 192h150" className="bp-line bp-line--thin" />

        <rect x="310" y="120" width="270" height="120" rx="4" className="bp-soft" />
        <path d="M310 120l270 120M580 120l-270 120" className="bp-line bp-line--thin" />

        {[p.hours, p.address, p.phone].map((t, i) => (
          <g key={t} transform={`translate(${60 + i * 175} 262)`}>
            <text y="8" className="bp-mono">{t}</text>
            <path d="M0 20h120M0 30h90" className="bp-line bp-line--thin" />
          </g>
        ))}

        <rect x="60" y="312" width="520" height="110" rx="4" className="bp-grid" />
        <path d="M470 352c0-12 18-12 18 0 0 10-9 20-9 20s-9-10-9-20z" className="bp-pin" />
        <text x="572" y="414" textAnchor="end" className="bp-mono">{p.map}</text>
      </g>

      {/* Avanzada: reservas, pedidos y catálogo */}
      <g className={on(2)}>
        <rect x="440" y="82" width="56" height="20" rx="4" className="bp-sheet bp-line" />
        <text x="468" y="96" textAnchor="middle" className="bp-mono bp-mono--ink">{p.order}</text>
        <rect x="504" y="82" width="80" height="20" rx="4" className="bp-accent" />
        <text x="544" y="96" textAnchor="middle" className="bp-mono bp-mono--light">{p.book}</text>

        <rect x="60" y="206" width="236" height="44" rx="6" className="bp-sheet bp-line bp-shadow" />
        {[p.date, p.people, p.time].map((t, i) => (
          <g key={t} transform={`translate(${70 + i * 58} 216)`}>
            <text y="6" className="bp-mono bp-mono--xs">{t}</text>
            <path d="M0 22h48" className="bp-line bp-line--thin" />
          </g>
        ))}
        <rect x="248" y="216" width="38" height="24" rx="4" className="bp-accent" />
        <path d="M260 228h14m-5-5l5 5-5 5" className="bp-arrow" />

        <rect x="60" y="312" width="300" height="110" rx="4" className="bp-sheet bp-line" />
        <text x="76" y="334" className="bp-serif bp-serif--sm">{p.menu}</text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(76 ${352 + i * 18})`}>
            <path d={`M0 0h${70 + (i % 2) * 30}`} className="bp-line" />
            <path d={`M${80 + (i % 2) * 30} 0H232`} className="bp-leader" />
            <path d="M240 0h28" className="bp-line" />
          </g>
        ))}
      </g>

      {/* Profesional: base de datos y panel de administración con pedidos, reservas y analíticas */}
      <g className={on(3)}>
        {/* Base de datos: recibe las reservas y los pedidos de la web */}
        <path d="M296 228C420 228 470 300 540 300" className="bp-link" />
        <path d="M496 102C540 140 600 180 610 236" className="bp-link" />
        <rect x="540" y="236" width="160" height="196" rx="6" className="bp-sheet bp-line bp-shadow" />
        <text x="556" y="262" className="bp-serif bp-serif--sm">{p.database}</text>
        <g className="bp-line">
          <ellipse cx="682" cy="252" rx="9" ry="3.5" />
          <path d="M673 252v12c0 2 4 3.5 9 3.5s9-1.5 9-3.5v-12M673 258c0 2 4 3.5 9 3.5s9-1.5 9-3.5" />
        </g>
        <text x="556" y="282" className="bp-mono bp-mono--xs">{p.records}</text>
        <path d="M556 292h128" className="bp-leader" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(556 ${312 + i * 22})`}>
            <path d={`M0 0h${36 + (i % 3) * 8}`} className="bp-line" />
            <path d={`M52 0h${30 + ((i + 1) % 3) * 6}`} className="bp-line bp-line--thin" />
            <path d="M108 0h20" className="bp-line" />
            <path d="M0 11h128" className="bp-line bp-line--thin" />
          </g>
        ))}
        <path d="M540 410C430 436 320 420 222 400" className="bp-link" />
        <rect x="16" y="318" width="206" height="134" rx="6" className="bp-sheet bp-line bp-shadow" />
        <text x="32" y="340" className="bp-serif bp-serif--sm">{p.panel}</text>
        {p.stats.map((t, i) => (
          <g key={t} transform={`translate(${32 + i * 60} 350)`}>
            <rect width="54" height="30" rx="3" className="bp-soft" />
            <text x="5" y="11" className="bp-mono bp-mono--xs">{t}</text>
            <rect x="5" y="17" width={22 + i * 8} height="6" rx="1" className="bp-ink" />
          </g>
        ))}
        <path d="M32 440h174" className="bp-line bp-line--thin" />
        {[18, 26, 14, 32, 24, 38, 30, 44].map((h, i) => (
          <rect key={i} x={36 + i * 21} y={440 - h} width="13" height={h} className={i === 7 ? 'bp-accent' : 'bp-ink'} />
        ))}
      </g>

      {/* Personalizada: hoja en blanco */}
      <g className={`layer${pack === 'personalizada' ? ' is-on' : ''}`}>
        <rect x="150" y="150" width="340" height="150" rx="10" className="bp-sheet bp-custom" />
        <text x="320" y="216" textAnchor="middle" className="bp-serif bp-serif--lg">{p.custom}</text>
        <text x="320" y="244" textAnchor="middle" className="bp-mono bp-mono--red">{p.customNote}</text>
      </g>

      {/* Marcas numeradas */}
      {MARKERS[pack].map(([x, y], i) => (
        <g key={`${pack}-${i}`} transform={`translate(${x} ${y})`}>
          <g className="bp-marker" style={{ animationDelay: `${150 + i * 90}ms` }}>
            <circle r="11" />
            <text y="4" textAnchor="middle">{i + 1}</text>
          </g>
        </g>
      ))}
    </svg>
  );
}

export const markerCount = (pack: PackId) => MARKERS[pack].length;
