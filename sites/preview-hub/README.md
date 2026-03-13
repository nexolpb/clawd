# Nexo Sites — Preview Hub

Purpose: host many client preview websites under a single Netlify site to minimize credit usage.

This hub is intentionally **build-free** (pure static). Netlify publishes the `public/` folder.

## URL format

- `https://sites.nexodigitalops.com/p/<slug>/`

Each preview is a **static site** folder located at:

- `sites/preview-hub/public/p/<slug>/`

Example:

- `sites/preview-hub/public/p/vet-tamarindo-pacific-vet/index.html`

## How to publish a new preview

1) Build/export the landing page from Emergent AI.
2) Ensure you have a static build output (must include `index.html`).
3) Copy the contents of that build into:

```
sites/preview-hub/public/p/<slug>/
```

Then commit + push. Netlify will deploy the hub and the preview will be live.

## Notes

- The hub homepage is `noindex`.
- We recommend batching multiple previews into a single commit/deploy.
