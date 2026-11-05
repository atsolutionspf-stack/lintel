import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Dos páginas: español (/) e inglés (/en/). Ambas usan el mismo código (src/main.tsx).
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        es: resolve(__dirname, 'index.html'),
        en: resolve(__dirname, 'en/index.html'),
      },
    },
  },
});
