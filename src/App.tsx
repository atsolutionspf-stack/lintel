import { useState } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Packs } from './components/Packs';
import { Maintenance } from './components/Maintenance';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  /** Pack elegido en el formulario. Los botones de los packs lo rellenan y bajan al formulario. */
  const [formPack, setFormPack] = useState('avanzada');

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
        <Packs onRequest={request} />
        <Maintenance onRequest={() => request('mantenimiento')} />
        <Contact pack={formPack} onPackChange={setFormPack} />
      </main>
      <Footer />
    </>
  );
}
