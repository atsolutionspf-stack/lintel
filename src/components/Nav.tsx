import { site } from '../config/site';

export function Nav() {
  return (
    <header className="nav">
      <div className="container nav__inner">
        <a href="#inicio" className="logo" aria-label={`${site.name} Webs`}>
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <rect width="32" height="32" rx="7" />
            <rect x="7" y="8" width="18" height="16" rx="2" />
            <path d="M7 13h18" />
            <circle cx="24" cy="24" r="4" />
          </svg>
          <span>
            {site.name} <em>Webs</em>
          </span>
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
