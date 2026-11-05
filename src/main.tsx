import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/schibsted-grotesk';
import '@fontsource/young-serif';
import '@fontsource/jetbrains-mono/400.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/sections.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
