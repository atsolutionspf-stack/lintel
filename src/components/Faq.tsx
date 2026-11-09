import { useState } from 'react';
import { site } from '../config/site';
import { SheetLabel } from './SheetLabel';

export function Faq() {
  const t = site.faq;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="section faq">
      <div className="container faq__grid">
        <header className="section-head" data-reveal>
          <SheetLabel n={6} />
          <h2>{t.title}</h2>
          <p>{t.intro}</p>
          <a className="btn btn--ghost" href="#contacto">
            {t.cta}
          </a>
        </header>
        <div className="faq__list" data-reveal>
          {t.items.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={q} className={`faq__item${isOpen ? ' is-open' : ''}`}>
                <h3>
                  <button type="button" aria-expanded={isOpen} aria-controls={`faq-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                    <span>{q}</span>
                    <span className="faq__icon" aria-hidden="true" />
                  </button>
                </h3>
                <div className="faq__answer" id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                  <div>
                    <p>{a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
