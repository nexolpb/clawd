# Deployment notes (template)

This doc is a **living checklist** for deploying projects in this monorepo.

## Quick glossary

- **Dev**: local development server (e.g., `npm run dev`)
- **Build**: generating production output (e.g., `npm run build`)
- **Static hosting**: hosting prebuilt HTML/CSS/JS (e.g., Cloudflare Pages, Netlify, Vercel static, S3)
- **DNS**: domain → hosting (A/AAAA/CNAME records)

---

## 1) Pre-deploy checklist (any website)

- [ ] Page loads on mobile and desktop
- [ ] Primary CTA works (WhatsApp / contact form)
- [ ] “Book a call” link works (Calendly or contact page)
- [ ] No placeholder links left (e.g., `calendly.com/your-link`)
- [ ] Meta title + description set
- [ ] OG image present (`/og.svg` or `/og.png`)
- [ ] `robots.txt` present
- [ ] `sitemap.xml` present
- [ ] Lighthouse quick pass (Performance/SEO/Accessibility)

---

## 2) Astro (static) — standard commands

From the project folder:
```bash
npm install
npm run dev
npm run build
npm run preview
```

Notes:
- `npm run preview` should match production output more closely than `dev`.

---

## 3) Hosting options

### Option A: Cloudflare Pages (recommended for static)

What you need:
- GitHub repo connected
- Build command: `npm run build`
- Output directory: `dist`

Monorepo note:
- Set **Root directory** to the site folder (example: `sites/nexo-sites`).

Environment:
- Node version: match `package.json` engines if present.

### Option B: Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Base directory: site folder (e.g., `sites/nexo-sites`)

### Option C: Vercel (static)

- Framework preset: Astro
- Root directory: site folder

---

## 4) Domains + DNS (generic)

### Common setups

**Apex domain (example.com)**
- Usually A/AAAA records or provider-specific setup.

**Subdomain (sites.example.com)**
- Often CNAME to hosting provider.

### DNS checklist

- [ ] Decide primary domain (apex vs subdomain)
- [ ] Add DNS records
- [ ] Wait for propagation (can take minutes to hours)
- [ ] Ensure HTTPS certificate is issued
- [ ] Set redirects (www → apex, http → https)

---

## 5) SEO basics (minimum viable)

- [ ] Unique title/description for main pages
- [ ] One H1 per page
- [ ] `canonical` set
- [ ] `sitemap.xml` and `robots.txt` reachable
- [ ] Add site to Google Search Console

---

## 6) Analytics / tracking

Decide:
- Google Analytics 4 (GA4)
- Google Tag Manager (GTM)
- Meta pixel, etc.

Checklist:
- [ ] Verify events fire (WhatsApp click, call click, form submit)
- [ ] Confirm no console errors

---

## 7) Rollback plan

Before deploying:
- [ ] Tag release in git:
  ```bash
  git tag -a vYYYY-MM-DD -m "Deploy"
  git push --tags
  ```

If something breaks:
- [ ] Re-deploy previous build
- [ ] Or revert commit:
  ```bash
  git revert <sha>
  ```

---

## 8) Project-specific notes

### `sites/nexo-sites` (Astro)

- Local dev: `cd sites/nexo-sites && npm run dev`
- Build output: `sites/nexo-sites/dist/`

Where to update important business links:
- WhatsApp + default messages: `sites/nexo-sites/src/config/site.ts`
- Book-a-call behavior:
  - If Calendly is placeholder, CTA falls back to `/contact/`

