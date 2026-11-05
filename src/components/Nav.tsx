import { site } from '../config/site';

export function Nav() {
  return (
    <header className="nav">
      <div className="container nav__inner">
        <a href="#inicio" className="logo" aria-label={site.name}>
          {/* Un dintel: dos pilares y la viga que los une */}
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <rect className="logo__bg" width="32" height="32" rx="7" />
            <rect className="logo__post" x="9" y="13" width="4" height="12" />
            <rect className="logo__post" x="19" y="13" width="4" height="12" />
            <rect className="logo__beam" x="6" y="8" width="20" height="4.5" />
          </svg>
          <span>{site.name}</span>
        </a>
        <nav className="nav__links" aria-label="Menú">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav__actions">
          <a className="nav__lang" href={site.langSwitch.href} title={site.langSwitch.title} hrefLang={site.langSwitch.label.toLowerCase()}>
            {site.langSwitch.label}
          </a>
          <a className="btn btn--primary btn--sm" href="#contacto">
            {site.navCta}
          </a>
        </div>
      </div>
    </header>
  );
}
