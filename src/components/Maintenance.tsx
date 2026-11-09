import { formatMoney } from '../i18n';
import { maintenance } from '../config/packs';
import { site } from '../config/site';
import { SheetLabel } from './SheetLabel';

export function Maintenance({ onRequest }: { onRequest: () => void }) {
  const t = site.maintenance;

  return (
    <section id="mantenimiento" className="section maintenance">
      <div className="container maintenance__grid">
        <header className="section-head" data-reveal>
          <SheetLabel n={5} />
          <h2>{t.title}</h2>
          <p>{t.intro}</p>
        </header>

        <div className="maintenance__cards" data-reveal>
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

          <aside className="clientia">
            <p className="clientia__kicker">{site.clientia.kicker}</p>
            <h3 className="clientia__title">{site.clientia.title}</h3>
            <p className="clientia__text">{site.clientia.text}</p>
            <p className="clientia__note">{site.clientia.note}</p>
            <a className="btn btn--ghost" href={site.clientiaUrl}>
              {site.clientia.cta} →
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
