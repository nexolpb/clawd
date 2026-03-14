# Lead → Claude Brief Pack → Emergent Prompt (Workflow Instructions)

This document defines the standard process for generating a client preview landing page using:

1) A lead row from the CSV
2) Extra online research (GBP/Maps + Social)
3) A Claude-generated **Brief Pack**
4) Emergent AI to generate the landing page
5) Local build + publish to Preview Hub (`/p/<slug>/`)

---

## Inputs (recommended)

### Required
- **Lead identifier**: `CR-###` (preferred) or business name + city
- **Leads CSV**: path to the current leads list
- **Prompt kit**: path to `NexoSites_Prompt_Kit_v4.docx`

### Optional (recommended)
- **Sales WhatsApp** (default): `+506 8993 9071` (`https://wa.me/50689939071`)
- **Touristic zone hint**: yes/no/unknown (Claude should still verify)
- **Industry override**: if the CSV tagging is wrong

---

## Outputs

Claude must output **one** markdown file (the **Brief Pack**) containing:

1) `SLUG`
2) `LEAD DATA (verified)` + `Sources`
3) `BUILD SPEC` (rules for Emergent)
4) `EMERGENT PROMPT (COPY/PASTE)`
5) `meta.json (draft)` (JSON code block)

Store it at:

- `previews/<slug>/brief-pack.md`

---

## Two non-negotiable standards

### A) Sales CTA standard (CRITICAL)
Even if the preview includes business contact info, **all primary/visible CTA buttons** must go to **Nexo Sites sales WhatsApp**, not the business WhatsApp.

Reason: outreach flow = they reply to you → you revise → you charge.

Default sales WhatsApp link:

- `https://wa.me/50689939071?text=` (URL-encoded message)

Suggested prefilled message template (ES):

- `Hola, vi la vista previa del sitio para {BusinessName}. ¿Me la puedes compartir y decirme el precio para publicarla?`

### B) Language toggle standard (single page)
If the lead is in a touristic zone, implement a **single-page ES/EN toggle**:

- Switch content on the same page (no separate routes)
- Optional: remember preference in `localStorage`

---

## Ready-to-paste prompt for Claude (Template)

Replace placeholders before sending to Claude.

```
You are preparing a “Brief Pack” for a Nexo Sites lead so I can paste the final prompt into Emergent AI.

Lead: {LEAD_ID} — {BUSINESS_NAME} ({COUNTRY})

Inputs:
- Leads CSV: {LEADS_CSV_PATH}
- Prompt kit: {PROMPT_KIT_PATH}

Goal:
Create a complete, high-detail Emergent AI prompt to generate a 1-page landing page preview for this business.

Tasks:
1) Locate and extract the row for {LEAD_ID} / {BUSINESS_NAME} from the CSV.
2) Do additional web research to fill missing details. Prioritize:
   - Google Maps / Google Business Profile (GBP)
   - Facebook
   - Instagram
   - Any existing website
3) Build a complete Data Block with maximum detail and do not invent facts. If unknown, write UNKNOWN.
4) Output ONE markdown “Brief Pack” using the exact format below.
5) At the end, output a small meta.json draft (JSON code block).

---

## Output format (must match exactly)

## 0) SLUG
Use slug format: industry-city-business (lowercase, hyphens, no accents).
Return ONE slug line in backticks.

## 1) LEAD DATA (verified)
Business name:
Industry: (veterinary | dental | legal | ac-auto | auto-repair)
City/Zone:
Country: Costa Rica
Touristic zone: yes/no (explain briefly)
Languages on page: ES only OR ES/EN toggle (single page)
Address:
Google Maps link:
Google Business Profile link (if distinct):
Phone:
Business WhatsApp (if exists):
Email (if found):
Hours:
Services (6–12):
Emergency / after-hours:
Trust signals:
Social links:
- Facebook:
- Instagram:
- Other:

### Brand / style cues (from sources)
- Colors:
- Tone:
- Any tagline:

### Sources (paste URLs)
- GBP/Maps:
- Facebook:
- Instagram:
- Website:
- Other:

## 2) BUILD SPEC (rules for Emergent)
Goal: create a 1-page landing page preview that looks like it belongs to this business and is optimized to convert.

Two important standards (must follow)
A) Sales CTA standard (CRITICAL)
Even if the site includes the business info, the main CTA buttons must go to Nexo Sites sales WhatsApp, NOT the business WhatsApp.
Use sales WhatsApp: https://wa.me/50689939071?text=
Prefilled message (ES default):
Hola, vi la vista previa del sitio para {BUSINESS_NAME}. ¿Me la puedes compartir y decirme el precio para publicarla?

B) Language toggle standard (single page)
If touristic zone, implement a single-page ES/EN toggle (no separate routes). Optional localStorage.

Page requirements:
- Single page landing
- Sections: Hero, Services, Location/Map, Trust signals (no fake testimonials), Contact info, Pricing section with id=pricing
- Primary CTA (sales): Escríbeme por WhatsApp
- Secondary CTA: Ver precios (scroll to #pricing)
- WhatsApp CTA visible on mobile (sticky ok) but must go to SALES WhatsApp
- Images: real if available; otherwise tasteful stock
- Performance: optimize images, avoid giant assets

Deliverable:
- Prefer Vite/React or plain HTML
- Must output index.html + assets (build output typically dist/)
- Avoid server requirements

## 3) EMERGENT PROMPT (COPY/PASTE)
Now output the final Emergent prompt using the prompt kit’s structure from {PROMPT_KIT_PATH}.
Must include the complete Data Block and the two standards.

## 4) meta.json (draft)
Output a JSON code block for previews/<slug>/meta.json with:
slug, businessName, industry, zone, languageMode (single-page-toggle or es-only), touristicZone, phone, address, googleMapsUrl, builtAt (YYYY-MM-DD), status (draft)

Constraints:
- Don’t invent facts
- Unknown -> UNKNOWN
- Costa Rica-friendly formatting

End of output.
```

---

## Notes
- Keep the Brief Pack in `previews/<slug>/brief-pack.md` for traceability.
- Batch multiple preview publishes into one Netlify deploy when possible.
