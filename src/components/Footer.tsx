import { site } from '../config/site';
import { SHEETS } from './SheetLabel';

/** Pie con forma de cajetín de plano. */
export function Footer() {
  const t = site.footer;

  return (
    <footer className="footer">
      <div className="container">
        <div className="titleblock">
          <div className="titleblock__brand">
            <span className="titleblock__label">{t.project}</span>
            <strong>{site.name}</strong>
            <span>{t.projectValue}</span>
          </div>
          <div>
            <span className="titleblock__label">{t.scale}</span>
            1:1
          </div>
          <div>
            <span className="titleblock__label">{t.date}</span>
            {new Date().getFullYear()}
          </div>
          <div>
            <span className="titleblock__label">{site.sheet}</span>
            {String(SHEETS).padStart(2, '0')} / {String(SHEETS).padStart(2, '0')}
          </div>
          <nav className="titleblock__links" aria-label="Legal">
            {t.legal.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
            <a href={site.langSwitch.href}>{site.langSwitch.title}</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
