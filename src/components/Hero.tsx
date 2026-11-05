import { site } from '../config/site';
import { SheetLabel } from './SheetLabel';

export function Hero() {
  const t = site.hero;
  const [l1, l2, l3] = t.title;
  const last = l3.split(' ');
  const circled = last.pop();

  return (
    <section id="inicio" className="hero">
      <div className="container">
        <SheetLabel n={1} />
        <div className="hero__grid">
          <div className="hero__title-wrap">
            <p className="hero__kicker">{t.kicker}</p>
            <h1 className="hero__title">
              <span>{l1}</span>
              <span className="hero__indent">{l2}</span>
              <span>
                {last.length > 0 && `${last.join(' ')} `}
                <span className="hero__circled">{circled}</span>
              </span>
            </h1>
            <div className="hero__dim" aria-hidden="true">
              <span>{t.dimension}</span>
            </div>
          </div>

          <div className="hero__side">
            <p className="hero__lead">{t.lead}</p>
            <ol className="hero__notes">
              {t.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ol>
            <div className="hero__ctas">
              <a className="btn btn--primary" href="#packs">
                {t.primary}
              </a>
              <a className="btn btn--ghost" href="#contacto">
                {t.secondary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
