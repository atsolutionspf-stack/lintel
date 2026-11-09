import { site } from '../config/site';
import { SheetLabel } from './SheetLabel';

export function Process() {
  const t = site.process;
  return (
    <section id="como-trabajamos" className="section process">
      <div className="container">
        <header className="section-head" data-reveal>
          <SheetLabel n={4} />
          <h2>{t.title}</h2>
          <p>{t.intro}</p>
        </header>
        <ol className="process__steps">
          {t.steps.map(([title, text], i) => (
            <li key={title} className="process__step" data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="process__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <div className="process__cta" data-reveal>
          <a className="btn btn--primary" href="#contacto">
            {t.cta}
          </a>
          <span>{t.note}</span>
        </div>
      </div>
    </section>
  );
}
