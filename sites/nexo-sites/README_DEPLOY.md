# Nexo Sites (Astro) — Deploy notes

## Local dev
```bash
cd /Users/lauriano/clawd/sites/nexo-sites
npm install
npm run dev
```

## Production build
```bash
npm run build
```
Output is in `dist/`.

## Netlify
- Build command: `npm run build`
- Publish directory: `dist`

## Domain
- Point `sites.nexodigitalops.com` to your Netlify site (CNAME).

## SEO files
- `public/robots.txt`
- `src/pages/sitemap.xml.ts`
- OpenGraph image: `public/og.svg`
