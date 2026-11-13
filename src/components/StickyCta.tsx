import { useEffect, useState } from 'react';
import { site } from '../config/site';

/**
 * Botón fijo «Ver los packs · desde 390 €». Aparece al bajar por la página y se oculta
 * en la portada, en la sección de packs y en el contacto, donde ya hay un botón a mano.
 */
export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const ids = ['inicio', 'packs', 'contacto'];
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        setShow(visible.size === 0);
      },
      { threshold: 0.15 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <a className={`sticky-cta${show ? ' is-visible' : ''}`} href="#packs" aria-hidden={!show} tabIndex={show ? 0 : -1}>
      <span>{site.hero.sticky}</span>
      <span className="sticky-cta__from">{site.hero.primaryFrom}</span>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12h13M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}
