import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { webPacks } from '../config/packs';
import { site } from '../config/site';

/**
 * Plano de la portada: una web que se dibuja sola y va sumando capas
 * (Simple → Avanzada → Profesional). Se inclina con el ratón y se puede elegir el pack.
 */
const STAGES = webPacks.slice(0, 3).map((p) => p.name);

export function HeroBlueprint() {
  const p = site.preview;
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStage(2);
      return;
    }
    if (paused) return;
    const id = setInterval(() => setStage((s) => (s + 1) % 3), 2800);
    return () => clearInterval(id);
  }, [paused]);

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -6, y: ((e.clientX - r.left) / r.width - 0.5) * 8 });
  };
  const on = (min: number) => `hb-layer${stage >= min ? ' is-on' : ''}`;

  return (
    <div ref={ref} className="hb" onPointerMove={onMove} onPointerLeave={() => setTilt({ x: 0, y: 0 })}>
      <div className="hb__stage" style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
        <svg viewBox="0 0 560 400" aria-hidden="true">
          <path className="hb-draw hb-red" pathLength={1} d="M30 14v14M500 14v14M30 21h470" />
          <text x="265" y="12" textAnchor="middle" className="hb-mono hb-mono--red">{`0${stage + 1} · ${STAGES[stage]}`}</text>

          <rect className="hb-draw hb-frame" pathLength={1} x="30" y="40" width="470" height="330" rx="10" />
          <path className="hb-draw hb-line" pathLength={1} d="M30 70h470" />
          {[46, 58, 70].map((x) => <circle key={x} cx={x} cy="55" r="3.5" className="hb-line" />)}
          <rect x="170" y="47" width="190" height="15" rx="7.5" className="hb-pill" />
          <text x="265" y="58" textAnchor="middle" className="hb-mono">{p.url}</text>
          <text x="48" y="94" className="hb-serif">{p.brand}</text>
          <rect x="48" y="116" width="190" height="13" rx="2" className="hb-solid" />
          <rect x="48" y="135" width="140" height="13" rx="2" className="hb-solid" />
          <path d="M48 160h170M48 170h150M48 180h120" className="hb-thin" />
          <rect x="268" y="112" width="214" height="104" rx="4" className="hb-image" />
          <path className="hb-draw hb-thin" pathLength={1} d="M268 112l214 104M482 112l-214 104" />
          <rect x="48" y="282" width="434" height="72" rx="4" className="hb-ghost" />

          <g className={on(1)}>
            <rect x="352" y="80" width="48" height="18" rx="4" className="hb-card" />
            <text x="376" y="93" textAnchor="middle" className="hb-mono">{p.order}</text>
            <rect x="406" y="80" width="76" height="18" rx="4" className="hb-sky" />
            <text x="444" y="93" textAnchor="middle" className="hb-mono hb-mono--dark">{p.book}</text>
            <rect x="48" y="196" width="200" height="40" rx="6" className="hb-card" />
            {[0, 1, 2].map((i) => <path key={i} d={`M${58 + i * 50} 222h40`} className="hb-thin" />)}
            <rect x="210" y="205" width="30" height="22" rx="4" className="hb-redfill" />
            <path d="M219 216h12m-4-4l4 4-4 4" className="hb-arrow" />
            <rect x="48" y="282" width="250" height="72" rx="4" className="hb-card" />
            <text x="62" y="300" className="hb-serif hb-serif--sm">{p.menu}</text>
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <path d={`M62 ${316 + i * 14}h${70 + (i % 2) * 24}`} className="hb-line" />
                <path d={`M246 ${316 + i * 14}h36`} className="hb-line" />
              </g>
            ))}
            <path className="hb-flow hb-red" d="M248 216C340 226 380 250 420 262" />
            <path className="hb-flow hb-red" d="M400 98C430 140 470 190 480 236" />
            <rect x="410" y="236" width="140" height="130" rx="6" className="hb-card" />
            <text x="424" y="258" className="hb-serif hb-serif--sm">{p.database}</text>
            <ellipse cx="530" cy="250" rx="8" ry="3" className="hb-line" />
            <path d="M522 250v10c0 1.7 3.6 3 8 3s8-1.3 8-3v-10" className="hb-line" />
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <path d={`M424 ${278 + i * 20}h${34 + (i % 3) * 8}`} className="hb-line" />
                <path d={`M500 ${278 + i * 20}h36`} className="hb-thin" />
              </g>
            ))}
            <circle r="3.5" className="hb-dot">
              <animateMotion dur="2.2s" repeatCount="indefinite" path="M248 216C340 226 380 250 420 262" />
            </circle>
          </g>

          <g className={on(2)}>
            <path className="hb-flow hb-skyline" d="M410 340C330 372 230 372 176 360" />
            <rect x="10" y="250" width="166" height="122" rx="6" className="hb-card" />
            <text x="24" y="272" className="hb-serif hb-serif--sm">{p.panel}</text>
            {[0, 1, 2].map((i) => <rect key={i} x={24 + i * 48} y="282" width="42" height="22" rx="3" className="hb-image" />)}
            <path d="M24 358h138" className="hb-thin" />
            {[16, 24, 12, 30, 22, 38].map((h, i) => (
              <rect key={i} x={28 + i * 22} y={358 - h} width="13" height={h} className={i === 5 ? 'hb-redfill' : 'hb-bar'} />
            ))}
            <circle r="3.5" className="hb-dot hb-dot--sky">
              <animateMotion dur="2.4s" repeatCount="indefinite" path="M410 340C330 372 230 372 176 360" />
            </circle>
          </g>
        </svg>
      </div>
      <div className="hb__tabs" role="group" aria-label={site.hero.blueprintHint}>
        {STAGES.map((name, i) => (
          <button
            key={name}
            type="button"
            className="hb__tab"
            aria-pressed={stage === i}
            onClick={() => {
              setStage(i);
              setPaused(true);
            }}
          >
            {`0${i + 1} ${name}`}
          </button>
        ))}
      </div>
    </div>
  );
}
