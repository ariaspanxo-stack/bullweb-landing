import { useEffect } from 'react';

const ORIGIN = 'https://bullwebchile.com';

interface PageSeo {
  title:       string;
  description: string;
  /** Ruta de la página, p. ej. "/terminos". */
  path:        string;
}

/**
 * SEO propio para páginas internas (legales): title, description, canonical y
 * Open Graph/Twitter. El prerender (scripts/prerender.js) captura estos valores
 * en el HTML estático; al salir de la página se restauran los de la portada.
 */
export function usePageSeo({ title, description, path }: PageSeo) {
  useEffect(() => {
    const url = ORIGIN + path;
    const targets: [string, string, string][] = [
      ['meta[name="description"]',         'content', description],
      ['link[rel="canonical"]',            'href',    url],
      ['meta[property="og:title"]',        'content', title],
      ['meta[property="og:description"]',  'content', description],
      ['meta[property="og:url"]',          'content', url],
      ['meta[name="twitter:title"]',       'content', title],
      ['meta[name="twitter:description"]', 'content', description],
    ];

    const prevTitle = document.title;
    document.title = title;
    const restore = targets.map(([selector, attr, value]) => {
      const el = document.head.querySelector(selector);
      const prev = el?.getAttribute(attr) ?? null;
      el?.setAttribute(attr, value);
      return () => { if (el && prev !== null) el.setAttribute(attr, prev); };
    });

    return () => {
      document.title = prevTitle;
      restore.forEach(fn => fn());
    };
  }, [title, description, path]);
}
