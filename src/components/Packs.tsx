import { useState } from 'react';
import { formatMoney } from '../i18n';
import { webPacks, type PackId } from '../config/packs';
import { site } from '../config/site';
import { Blueprint, markerCount } from './Blueprint';
import { SheetLabel } from './SheetLabel';

export function Packs({ onRequest }: { onRequest: (pack: PackId) => void }) {
  const t = site.packs;
  const [selected, setSelected] = useState<PackId>('avanzada');
  const index = webPacks.findIndex((p) => p.id === selected);
  const pack = webPacks[index];
  const markers = markerCount(pack.id);
  const dimLabel = `${String(index + 1).padStart(2, '0')} · ${pack.name}${pack.price ? ` · ${formatMoney(pack.price)}` : ''}`;

  return (
    <section id="packs" className="section packs">
      <div className="container">
        <SheetLabel n={2} />
        <header className="section-head">
          <h2>{t.title}</h2>
          <p>{t.intro}</p>
        </header>

        <fieldset className="selector">
          <legend className="selector__hint">{t.hint}</legend>
          <div className="selector__cells">
          {webPacks.map((p, i) => (
            <label key={p.id} className="selector__cell">
              <input type="radio" name="pack" value={p.id} checked={p.id === selected} onChange={() => setSelected(p.id)} />
              <span className="selector__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="selector__name">{p.name}</span>
              <span className="selector__price">{p.price ? formatMoney(p.price) : t.customPrice}</span>
            </label>
          ))}
          </div>
        </fieldset>

        <div className="packs__stage">
          <div className="packs__drawing">
            <Blueprint pack={pack.id} label={dimLabel} />
          </div>

          <article className="spec" key={pack.id} aria-live="polite">
            <p className="spec__num">Pack {String(index + 1).padStart(2, '0')}</p>
            <h3 className="spec__name">{pack.name}</h3>

            {pack.price ? (
              <div className="spec__price">
                <span className="spec__amount">{formatMoney(pack.price)}</span>
                <span className="spec__terms">
                  {t.oneOff} · {t.noSub}
                </span>
              </div>
            ) : (
              <div className="spec__price">
                <span className="spec__amount spec__amount--text">{t.customPrice}</span>
              </div>
            )}

            <p className="spec__desc">{pack.description}</p>

            {pack.features.length > 0 && (
              <>
                <h4 className="spec__label">{t.includes}</h4>
                <ul className="spec__features">
                  {pack.features.map((f, i) => (
                    <li key={f}>
                      <span className={`spec__key${i < markers ? '' : ' spec__key--plain'}`} aria-hidden="true">
                        {i < markers ? i + 1 : '·'}
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <button type="button" className="btn btn--primary spec__cta" onClick={() => onRequest(pack.id)}>
              {pack.cta}
            </button>
          </article>
        </div>

        <aside className="clientia">
          <div className="clientia__text">
            <p className="clientia__kicker">{site.clientia.kicker}</p>
            <h3 className="clientia__title">{site.clientia.title}</h3>
            <p>{site.clientia.text}</p>
          </div>
          <div className="clientia__action">
            <p className="clientia__note">{site.clientia.note}</p>
            <a className="btn btn--ghost" href={site.clientiaUrl}>
              {site.clientia.cta} →
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
