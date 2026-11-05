import type { PackId } from '../config/packs';
import { site } from '../config/site';

/**
 * Plano de una web de restaurante. Cada pack enciende sus capas:
 * Simple (One Page) → Avanzada (+ reservas, pedidos, carta) → Profesional (+ TPV y CRM conectados).
 * Las marcas rojas numeradas corresponden a la lista de "Incluye" del pack.
 */
const LEVEL: Record<PackId, number> = { simple: 1, avanzada: 2, profesional: 3, personalizada: 0 };

/** Posición de las marcas numeradas de cada pack, en el orden de su lista de funcionalidades. */
const MARKERS: Record<PackId, [number, number][]> = {
  simple: [[286, 132]],
  avanzada: [[60, 206], [440, 82], [60, 312]],
  profesional: [[540, 236], [16, 356]],
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

      {/* Avanzada: reservas, pedidos y carta */}
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

      {/* Profesional: TPV y CRM conectados */}
      <g className={on(3)}>
        <path d="M296 228C420 228 470 290 540 290" className="bp-link" />
        <path d="M496 102C520 160 520 250 560 250" className="bp-link" />
        <path d="M120 250C120 300 70 330 70 356" className="bp-link" />

        <path
          d="M540 236h160v196l-10 8-10-8-10 8-10-8-10 8-10-8-10 8-10-8-10 8-10-8-10 8-10-8-10 8-10-8-10 8-10-8-10 8z"
          className="bp-sheet bp-line bp-shadow"
        />
        <text x="556" y="260" className="bp-serif bp-serif--sm">{p.tpv}</text>
        <text x="556" y="278" className="bp-mono bp-mono--xs">{p.tickets}</text>
        <path d="M556 288h128" className="bp-leader" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(556 ${306 + i * 20})`}>
            <path d={`M0 0h${60 + (i % 3) * 14}`} className="bp-line" />
            <path d="M104 0h24" className="bp-line" />
          </g>
        ))}
        <rect x="556" y="390" width="128" height="22" rx="3" className="bp-ink" />

        <rect x="16" y="356" width="160" height="96" rx="6" className="bp-sheet bp-line bp-shadow" />
        <text x="32" y="378" className="bp-serif bp-serif--sm">{p.crm}</text>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(32 ${394 + i * 18})`}>
            <circle cx="5" cy="0" r="5" className="bp-soft bp-line" />
            <path d={`M16 0h${80 - i * 14}`} className="bp-line" />
          </g>
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
