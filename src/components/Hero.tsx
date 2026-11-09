import { site } from '../config/site';
import { HeroBlueprint } from './HeroBlueprint';
import { SheetLabel } from './SheetLabel';

export function Hero() {
  const t = site.hero;
  const [l1, l2, l3] = t.title;
  const last = l3.split(' ');
  const circled = last.pop();

  return (
    <section id="inicio" className="hero">
      <div className="container">
        <div className="hero__top">
          <p className="hero__kicker">{t.kicker}</p>
          <SheetLabel n={1} />
        </div>
        <div className="hero__grid">
          <div className="hero__copy">
            <h1 className="hero__title">
              <span>{l1}</span>
              <span className="hero__indent">{l2}</span>
              <span>
                {last.length > 0 && `${last.join(' ')} `}
                <span className="hero__circled">{circled}</span>
              </span>
            </h1>
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
              <a className="btn btn--outline-light" href="#contacto">
                {t.secondary}
              </a>
            </div>
          </div>
          <HeroBlueprint />
        </div>
        <div className="hero__dim" aria-hidden="true">
          <span>{t.dimension}</span>
        </div>
      </div>
    </section>
  );
}
