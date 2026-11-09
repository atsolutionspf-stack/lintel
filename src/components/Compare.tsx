import { useState } from 'react';
import { formatMoney } from '../i18n';
import { compareMatrix, recommendedPack, webPacks } from '../config/packs';
import { site } from '../config/site';
import { SheetLabel } from './SheetLabel';

/** Comparativa de los packs. La columna del pack recomendado va destacada. */
export function Compare({ onRequest }: { onRequest: (pack: string) => void }) {
  const t = site.compare;
  const [col, setCol] = useState<number | null>(null);
  const cls = (i: number) =>
    [webPacks[i].id === recommendedPack ? 'is-rec' : '', col === i ? 'is-hover' : ''].filter(Boolean).join(' ') || undefined;

  return (
    <section id="comparativa" className="section compare">
      <div className="container">
        <header className="section-head" data-reveal>
          <SheetLabel n={3} />
          <h2>{t.title}</h2>
          <p>{t.intro}</p>
        </header>
        <div className="compare__wrap" data-reveal onMouseLeave={() => setCol(null)}>
          <table className="compare__table">
            <thead>
              <tr>
                <th scope="col" className="compare__feature">{t.feature}</th>
                {webPacks.map((p, i) => (
                  <th key={p.id} scope="col" className={cls(i)} onMouseEnter={() => setCol(i)}>
                    {p.id === recommendedPack && <span className="badge">{site.packs.recommended}</span>}
                    <span className="compare__name">{p.name}</span>
                    <span className="compare__price">{p.price ? `${formatMoney(p.price)} · ${t.oneOff}` : t.custom}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.rows.map((row, r) => (
                <tr key={row}>
                  <th scope="row">{row}</th>
                  {compareMatrix[r].map((v, c) => (
                    <td key={c} className={cls(c)} onMouseEnter={() => setCol(c)}>
                      {v === 2 ? (
                        <span className="compare__custom">{t.custom}</span>
                      ) : v === 1 ? (
                        <span className="compare__yes" role="img" aria-label={t.yes}>
                          <svg viewBox="0 0 12 12" aria-hidden="true">
                            <path d="M2 6.5l2.5 2.5L10 3.5" />
                          </svg>
                        </span>
                      ) : (
                        <span className="compare__no" role="img" aria-label={t.no} />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <th scope="row">{t.deliveryRow}</th>
                {webPacks.map((p, c) => (
                  <td key={p.id} className={[cls(c), p.price ? 'compare__delivery' : 'compare__custom'].filter(Boolean).join(' ')} onMouseEnter={() => setCol(c)}>
                    {p.delivery.charAt(0).toUpperCase() + p.delivery.slice(1)}
                  </td>
                ))}
              </tr>
              <tr className="compare__actions">
                <th scope="row" />
                {webPacks.map((p, c) => (
                  <td key={p.id} className={cls(c)} onMouseEnter={() => setCol(c)}>
                    <button type="button" className={`btn btn--sm ${p.id === recommendedPack ? 'btn--primary' : 'btn--ghost'}`} onClick={() => onRequest(p.id)}>
                      {p.price ? t.cta : t.ctaCustom}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
