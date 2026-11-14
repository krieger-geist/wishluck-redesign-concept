# WishLuck redesign concept (unofficial)

An unofficial, non-commercial redesign concept for an online store selling screen-free learning toys and books for children.
I made it as a portfolio piece to show how the shopping experience could be easier for parents and how routine
support and order work could be automated so the team spends less time on repetitive tasks.

> **Disclaimer.** This project is **not affiliated with, endorsed by, or connected to WishLuck**. It is not the WishLuck
> website and does not sell anything. It does not use WishLuck's logo, photos or website text. All products, prices,
> reviews, order IDs and dashboard numbers are invented placeholders. No form sends data anywhere, and there are no
> logins or payments. Every page shows this disclaimer in a banner, and the site asks search engines not to index it
> (`<meta name="robots" content="noindex, nofollow">`, `robots.txt`, and an `X-Robots-Tag` header on Netlify).

## What is inside

| Page | What it shows |
| --- | --- |
| Home | Clear value proposition, search that understands "3 years under 800", all six age bands, occasion gifting |
| Shop | Filters for age, skill, occasion, budget and type; filters live in the URL so links can be shared |
| Product | One clear price with the prepaid saving explained, PIN code delivery estimate, "Notify me" for sold-out items, automatic "goes well with" suggestions, sticky add-to-cart on phones |
| Gift finder | Four taps (age, occasion, budget, interest) to a ranked shortlist with reasons, plus a gift note |
| Help and tracking | Order tracker with timeline and example WhatsApp update, a replacement wizard that checks the 7-day window and approves clear cases, bulk enquiry routing, searchable FAQ |
| Help assistant | On every page: answers common questions from the FAQ, and drafts a ticket with context when it cannot help |
| Automation dashboard | A simulated event feed run through "when, then" rules you can switch on and off, auto-tagged support inbox, stock watch, COD confirmations, review tone sorting |
| What I changed and why | Each issue I noticed on the current public site, the change, and the expected effect |
| About | The disclaimer in full, what is stored, credits |

Demo data to try: order `DEMO1001` with phone digits `1234` (in transit), `DEMO1002` / `5678` (delivered 2 days ago,
replacement allowed), `DEMO1003` / `9012` (outside the 7-day window).

## Tech

- Vite, React 19, TypeScript, React Router. No backend, no external requests, no web fonts, no images.
- Static build, about 100 KB of JavaScript gzipped.
- Accessibility: skip link, visible focus outline, labelled controls, one H1 per page, colour pairs chosen for WCAG AA
  contrast, focus moves to the new page on navigation, no auto-moving content, `prefers-reduced-motion` respected.
- The demo cart and "notify me" choices are kept in the browser's `localStorage` only.

## Run it locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check and build to dist/
npm run preview    # serve the built site on http://localhost:4173
```

To change the name shown in the disclaimer banner, edit `src/config.ts`.

## Deploy to Netlify

The repo includes `netlify.toml` (build command, publish folder, single-page-app redirect and `noindex` headers).

1. Push this folder to a GitHub repository.
2. In Netlify, choose **Add new site**, then **Import an existing project**, and pick the repository.
3. Netlify reads `netlify.toml`, so the defaults are already right: build command `npm run build`, publish directory `dist`.
4. Deploy. Optionally rename the site under **Site configuration**, for example `wishluck-concept-yourname.netlify.app`.

## How the team could reuse parts

- **Age, skill and occasion filters**: on Shopify these map to product tags or metafields plus the theme's filter settings.
- **Gift finder** (`src/pages/GiftFinder.tsx`): the scoring is a small pure function that could become a theme section.
- **Search phrase parser** (`parseQuery` in `src/pages/Shop.tsx`): turns "stem 6 years under 2000" into filters.
- **FAQ matcher** (`matchFaq` in `src/data/support.ts`): a simple keyword scorer; a live version could use the store's
  own FAQ content.
- **Automation rules** (`src/pages/Dashboard.tsx`): written in plain "when, then" form so they can be compared with
  whatever WhatsApp, tracking or helpdesk tools are already in use.

## Notes on the findings

The findings on the "What I changed and why" page come from one visit to the public website on 14 November 2026,
on a laptop and a 375 px phone view. They are observations, not an internal audit, and the live site may have changed
since. No statistics are invented: expected effects are described as a direction, not a number. See
`docs/site-audit.md` for the raw notes.

## Credits

- Product visuals: system emoji and CSS shapes.
- React, React Router, Vite and TypeScript are MIT licensed.
