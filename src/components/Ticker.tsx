import { site } from '../config/site';

/** Cinta en movimiento con lo que incluyen los packs. Se para al pasar el ratón. */
export function Ticker() {
  const items = [...site.ticker, ...site.ticker];
  return (
    <div className="ticker" aria-label={site.ticker.join(' · ')} role="note">
      <div className="ticker__track" aria-hidden="true">
        {items.map((w, i) => (
          <span key={i} className="ticker__item">
            {w}
            <svg viewBox="0 0 32 32" className="ticker__mark">
              <rect x="9" y="13" width="4" height="12" />
              <rect x="19" y="13" width="4" height="12" />
              <rect x="6" y="8" width="20" height="4.5" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
