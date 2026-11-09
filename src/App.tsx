import { useState } from 'react';
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
import { useReveal } from './hooks/useReveal';

export default function App() {
  /** Pack elegido en el formulario. Los botones de los packs lo rellenan y bajan al formulario. */
  const [formPack, setFormPack] = useState('avanzada');
  useReveal();

  const request = (pack: string) => {
    setFormPack(pack);
    document.getElementById('contacto')?.scrollIntoView();
    document.getElementById('f-name')?.focus({ preventScroll: true });
  };

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Packs onRequest={request} />
        <Compare onRequest={request} />
        <Process />
        <Maintenance onRequest={() => request('mantenimiento')} />
        <Faq />
        <Contact pack={formPack} onPackChange={setFormPack} />
      </main>
      <Footer />
    </>
  );
}
