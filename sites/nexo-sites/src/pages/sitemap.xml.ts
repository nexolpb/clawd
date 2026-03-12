import type { APIRoute } from 'astro';
import { SITE } from '../config/site';

const paths = [
  '/',
  '/es/', '/es/pricing/', '/es/examples/', '/es/process/', '/es/contact/',
  '/en/', '/en/pricing/', '/en/examples/', '/en/process/', '/en/contact/',
];

export const GET: APIRoute = async () => {
  const urls = paths
    .map((p) => {
      const loc = new URL(p, SITE.baseUrl).toString();
      return `<url><loc>${loc}</loc></url>`;
    })
    .join('');

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
