import { formatMoney } from '../i18n';
import { maintenance } from '../config/packs';
import { site } from '../config/site';
import { SheetLabel } from './SheetLabel';

export function Maintenance({ onRequest }: { onRequest: () => void }) {
  const t = site.maintenance;

  return (
    <section id="mantenimiento" className="section maintenance">
      <div className="container maintenance__grid">
        <SheetLabel n={3} />
        <header className="section-head">
          <h2>{t.title}</h2>
          <p>{t.intro}</p>
        </header>

        <article className="note-card">
          <div className="note-card__head">
            <h3>{maintenance.name}</h3>
            <p className="note-card__price">
              {formatMoney(maintenance.price)}
              <span>{maintenance.unit}</span>
            </p>
          </div>
          <p>{maintenance.description}</p>
          <button type="button" className="btn btn--ghost" onClick={onRequest}>
            {t.cta}
          </button>
        </article>
      </div>
    </section>
  );
}
