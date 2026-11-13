import { site } from '../config/site';
import { LOGO_BEAM, LOGO_LIGHT, LOGO_POST, LOGO_VIEWBOX } from '../config/logo';

export function Nav() {
  return (
    <header className="nav">
      <div className="container nav__inner">
        <a href="#inicio" className="logo" aria-label={site.name}>
          {/* «Escuadra»: la viga apoyada en su jamba y el cuadrado de luz que entra */}
          <svg viewBox={`0 0 ${LOGO_VIEWBOX} ${LOGO_VIEWBOX}`} aria-hidden="true">
            <rect className="logo__main" {...LOGO_BEAM} />
            <rect className="logo__main" {...LOGO_POST} />
            <rect className="logo__light" {...LOGO_LIGHT} />
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
