import { formatMoney } from '../i18n';
import { recommendedPack, webPacks, type PackId } from '../config/packs';
import { site } from '../config/site';
import { Blueprint, markerCount } from './Blueprint';
import { SheetLabel } from './SheetLabel';
import { useCountUp } from '../hooks/useCountUp';

type Props = { selected: PackId; onSelect: (pack: PackId) => void; onRequest: (pack: PackId) => void };

export function Packs({ selected, onSelect: setSelected, onRequest }: Props) {
  const t = site.packs;
  const index = webPacks.findIndex((p) => p.id === selected);
  const pack = webPacks[index];
  const markers = markerCount(pack.id);
  const shownPrice = useCountUp(Number(pack.price ?? 0));
  const dimLabel = `${String(index + 1).padStart(2, '0')} · ${pack.name}${pack.price ? ` · ${formatMoney(pack.price)}` : ''}`;

  return (
    <section id="packs" className="section packs">
      <div className="container">
        <header className="section-head" data-reveal>
          <SheetLabel n={2} />
          <h2>{t.title}</h2>
          <p>{t.intro}</p>
        </header>

        <fieldset className="selector">
          <legend className="selector__hint">{t.hint}</legend>
          <div className="selector__cells">
          {webPacks.map((p, i) => (
            <label key={p.id} className="selector__cell">
              <input type="radio" name="pack" value={p.id} checked={p.id === selected} onChange={() => setSelected(p.id)} />
              <span className="selector__num">
                {String(i + 1).padStart(2, '0')}
                {p.id === recommendedPack && <span className="badge">{t.recommended}</span>}
              </span>
              <span className="selector__name">{p.name}</span>
              <span className="selector__price">{p.price ? formatMoney(p.price) : t.customPrice}</span>
              <span className="selector__delivery">
                {t.deliveryLabel} {p.delivery}
              </span>
            </label>
          ))}
          </div>
        </fieldset>

        <div className="packs__stage">
          <div className="packs__drawing">
            <Blueprint pack={pack.id} label={dimLabel} />
          </div>

          <article className="spec" key={pack.id} aria-live="polite">
            <p className="spec__num">
              Pack {String(index + 1).padStart(2, '0')}
              {pack.id === recommendedPack && <span className="badge">{t.recommended}</span>}
            </p>
            <h3 className="spec__name">{pack.name}</h3>

            {pack.price ? (
              <div className="spec__price">
                <span className="spec__amount">{formatMoney(String(shownPrice))}</span>
                <span className="spec__terms">
                  {t.oneOff} · {t.noSub}
                </span>
                <span className="spec__delivery">
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <circle cx="8" cy="8" r="6.5" />
                    <path d="M8 4.5V8l2.5 1.5" />
                  </svg>
                  {t.deliveryLabel}: {pack.delivery}
                </span>
              </div>
            ) : (
              <div className="spec__price">
                <span className="spec__amount spec__amount--text">{t.customPrice}</span>
                <span className="spec__delivery">
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <circle cx="8" cy="8" r="6.5" />
                    <path d="M8 4.5V8l2.5 1.5" />
                  </svg>
                  {t.deliveryLabel}: {pack.delivery}
                </span>
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
      </div>
    </section>
  );
}
