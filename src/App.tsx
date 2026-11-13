import { useEffect, useState } from 'react';
import type { PackId } from './config/packs';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Ticker } from './components/Ticker';
import { Packs } from './components/Packs';
import { Compare } from './components/Compare';
import { Process } from './components/Process';
import { Maintenance } from './components/Maintenance';
import { Faq } from './components/Faq';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { StickyCta } from './components/StickyCta';
import { useReveal } from './hooks/useReveal';

export default function App() {
  /** Pack elegido en el formulario. Los botones de los packs lo rellenan y bajan al formulario. */
  const [formPack, setFormPack] = useState('avanzada');
  /** Pack elegido en el selector de packs (la portada también lo cambia). */
  const [pack, setPack] = useState<PackId>('avanzada');
  const pick = (p: PackId) => {
    setPack(p);
    setFormPack(p);
  };
  useReveal();

  // Si se entra por un enlace con ancla (/#packs), ir a esa sección cuando ya está pintada.
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' });
  }, []);

  const request = (pack: string) => {
    setFormPack(pack);
    document.getElementById('contacto')?.scrollIntoView();
    document.getElementById('f-name')?.focus({ preventScroll: true });
  };

  return (
    <>
      <Nav />
      <main>
        <Hero onPick={pick} />
        <Ticker />
        <Packs selected={pack} onSelect={setPack} onRequest={request} />
        <Compare onRequest={request} />
        <Process />
        <Maintenance onRequest={() => request('mantenimiento')} />
        <Faq />
        <Contact pack={formPack} onPackChange={setFormPack} />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
