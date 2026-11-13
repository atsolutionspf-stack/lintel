import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/manrope';
import '@fontsource/unbounded/600.css';
import '@fontsource/unbounded/700.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/sections.css';
import App from './App';
import { startIntro } from './lib/intro';

/** Versión publicada: sirve para comprobar qué despliegue está en vivo. */
document.documentElement.dataset.version = '2026-11-13-puertas-luz';

// La intro va antes del primer render: así la página no asoma antes de que aparezcan las puertas.
startIntro();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
