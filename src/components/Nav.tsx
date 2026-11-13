import { site } from '../config/site';

export function Nav() {
  return (
    <header className="nav">
      <div className="container nav__inner">
        <a href="#inicio" className="logo" aria-label={site.name}>
          {/* «Escuadra»: la viga apoyada en su jamba y el cuadrado de luz que entra */}
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <rect className="logo__main" x="6" y="7" width="36" height="9" />
            <rect className="logo__main" x="6" y="16" width="9" height="26" />
            <rect className="logo__light" x="25" y="25" width="11" height="11" />
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
