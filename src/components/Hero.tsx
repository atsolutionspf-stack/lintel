import { useRef, useState, type PointerEvent } from 'react';
import { formatMoney } from '../i18n';
import { webPacks, type PackId } from '../config/packs';
import { site } from '../config/site';
import { useMagnetic } from '../hooks/useMagnetic';
import { HeroBlueprint } from './HeroBlueprint';
import { SheetLabel } from './SheetLabel';

const STAGE: Record<string, number> = { simple: 0, avanzada: 1, profesional: 2 };

export function Hero({ onPick }: { onPick: (pack: PackId) => void }) {
  const t = site.hero;
  const [l1, l2, l3] = t.title;
  const last = l3.split(' ');
  const circled = last.pop();
  const [picked, setPicked] = useState<number | null>(null);
  const cta = useMagnetic<HTMLAnchorElement>();
  const section = useRef<HTMLElement>(null);

  const pickedPack = picked === null ? null : webPacks.find((p) => p.id === t.picker.options[picked][1]) ?? null;

  const choose = (i: number) => {
    setPicked(i);
    onPick(t.picker.options[i][1]);
  };

  // Luz que sigue al cursor sobre la cuadrícula de la portada
  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse' || !section.current) return;
    const r = section.current.getBoundingClientRect();
    section.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
    section.current.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section id="inicio" className="hero" ref={section} onPointerMove={onMove}>
      <div className="container">
        <div className="hero__top">
          <p className="hero__kicker">{t.kicker}</p>
          <SheetLabel n={1} />
        </div>
        <div className="hero__grid">
          <div className="hero__copy">
            <p className="hero__badge">
              <span className="hero__pulse" aria-hidden="true" />
              {t.badge}
            </p>
            <h1 className="hero__title">
              <span>{l1}</span>
              <span className="hero__indent">{l2}</span>
              <span>
                {last.length > 0 && `${last.join(' ')} `}
                <span className="hero__circled">{circled}</span>
              </span>
            </h1>
            <p className="hero__lead">{t.lead}</p>

            <div className="picker">
              <p className="picker__title" id="picker-title">
                {t.picker.title}
              </p>
              <div className="picker__chips" role="group" aria-labelledby="picker-title">
                {t.picker.options.map(([label], i) => (
                  <button key={label} type="button" className="picker__chip" aria-pressed={picked === i} onClick={() => choose(i)}>
                    {label}
                  </button>
                ))}
              </div>
              <p className="picker__result" aria-live="polite">
                {pickedPack ? (
                  <>
                    <span className="picker__fit">{t.picker.result}</span>
                    <b>{pickedPack.name}</b> · {pickedPack.price && formatMoney(pickedPack.price)} · {site.packs.deliveryLabel.toLowerCase()} {pickedPack.delivery}
                  </>
                ) : (
                  t.picker.hint
                )}
              </p>
            </div>

            <div className="hero__ctas">
              <a ref={cta} id="hero-cta" className="btn btn--hero" href="#packs">
                <span className="btn--hero__text">
                  <span className="btn--hero__label">{pickedPack ? t.picker.cta(pickedPack.name) : t.primary}</span>
                  <span className="btn--hero__from">{pickedPack?.price ? formatMoney(pickedPack.price) : t.primaryFrom}</span>
                </span>
                <svg className="btn--hero__arrow" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h13M13 6l6 6-6 6" />
                </svg>
              </a>
              <a className="hero__secondary" href="#contacto">
                {t.secondary}
              </a>
            </div>
            <ul className="hero__trust">
              {t.notes.map((n) => (
                <li key={n}>
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3 8.5l3 3L13 4.5" />
                  </svg>
                  {n}
                </li>
              ))}
            </ul>
          </div>
          <HeroBlueprint focus={picked === null ? null : STAGE[t.picker.options[picked][1]]} />
        </div>
        <div className="hero__dim" aria-hidden="true">
          <span>{t.dimension}</span>
        </div>
      </div>
    </section>
  );
}
