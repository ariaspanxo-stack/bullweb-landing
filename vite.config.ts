import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { SEO, jsonLdOffers, FAQ_PRECIOS_Q, FAQ_PRECIOS_A } from './src/lib/plans.ts';

/**
 * #227 — Inyección de constantes de planes (src/lib/plans.ts) en index.html:
 * metas SEO (title/description/og/twitter) y JSON-LD (AggregateOffer + FAQ de precios).
 * Los placeholders {{...}} del HTML fuente se reemplazan en build y dev.
 */
function injectPlansLanding() {
  return {
    name: 'inject-plans-landing',
    transformIndexHtml(html: string) {
      const offersJson = JSON.stringify(jsonLdOffers(), null, 6);
      return html
        .replaceAll('{{SEO_TITLE}}', SEO.title)
        .replaceAll('{{SEO_DESCRIPTION}}', SEO.description)
        .replaceAll('{{JSONLD_OFFERS}}', offersJson)
        .replaceAll('{{FAQ_Q_PRECIOS}}', FAQ_PRECIOS_Q)
        .replaceAll('{{FAQ_A_PRECIOS}}', FAQ_PRECIOS_A);
    },
  };
}

export default defineConfig({
  plugins: [react(), injectPlansLanding()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
