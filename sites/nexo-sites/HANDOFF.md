# Nexo Sites — Handoff (2026-03-11)

## What this is
**Nexo Sites** is a productized “fast website launch” offer meant to generate **high-volume, quick revenue** from local businesses that often have **no website linked to their Google Business Profile (GBP)**. It’s designed to later upsell into **Google Ads + CRO** (Nexo Digital Ops).

Positioning decision (important):
- **Affordable + fast launch / high volume** (not premium agency positioning yet)

## Where it lives
Project (Astro):
- `/Users/lauriano/clawd/sites/nexo-sites/`

Deploy output (static):
- `/Users/lauriano/clawd/sites/nexo-sites/dist/`

Deploy notes:
- `/Users/lauriano/clawd/sites/nexo-sites/README_DEPLOY.md`

## Stack
- **Astro** (static output)
- **Tailwind CSS**
- Multi-page, real routes (not SPA)

## Languages
- **Spanish (tú) + English**
- Language toggle in header (ES/EN pill)
- Locale persistence via `localStorage` key: `nexo_sites_locale`

Routes built:
- `/` (redirects to saved locale, otherwise `/es/`)
- `/es/` `/es/pricing/` `/es/examples/` `/es/process/` `/es/contact/`
- `/en/` `/en/pricing/` `/en/examples/` `/en/process/` `/en/contact/`

## Contact / CTAs
WhatsApp:
- Number: `+506 8993 9071`
- Base link: `https://wa.me/50689939071`
- **Page-specific prefilled messages** implemented.

Key files:
- `src/utils/whatsapp.ts` (message logic)
- Header WhatsApp uses page context
- Pricing plan buttons use plan context
- Examples cards use niche context
- Contact page uses contact context

Calendly:
- Placeholder: `https://calendly.com/your-link`

Email:
- `hola@nexodigitalops.com`

Contact form:
- Netlify Forms enabled via `data-netlify="true"`
- Form name: `nexo-sites-intake`

## UX/UI improvements added
- Friendly product vibe (softer surfaces/contrast)
- Hero checklist (“what you get” bullets)
- Trust strip (verifiable trust signals)
- Mobile sticky WhatsApp button
- Examples page filter (feels niche-specific)
- Pricing cards include “Ideal para” + “No incluye” (reduces objections)
- Pricing page includes “After you pay, this is what happens” section

## SEO / sharing
- `public/robots.txt`
- `src/pages/sitemap.xml.ts` (generates `/sitemap.xml`)
- `public/og.svg` + OG meta tags in `BaseLayout.astro`
- JSON-LD support in layout:
  - FAQPage schema on `/process` pages
  - Service schema on `/pricing` pages

## i18n
- `src/i18n/es.json`
- `src/i18n/en.json`
- `src/i18n/index.ts`

## Known notes
- Local dev servers sometimes show SIGKILL in this environment; builds succeed and `dist/` is correct.

## Next recommended tasks
1) Replace placeholder testimonial section with either:
   - real quotes (once available), OR
   - purely “trust signals” (no fake quotes)
2) Decide final pricing and payment logistics copy.
3) Deploy on Netlify + connect subdomain `sites.nexodigitalops.com` via CNAME.

## Netlify deploy settings
- Build command: `npm run build`
- Publish directory: `dist`

