# MAYURA Department Store — design sample

A single-page retail website built as a portfolio sample. The brand, products,
prices, offers, reviews and contact details are fictional.

## Run it

```bash
npm install
npm run dev        # http://localhost:5188
npm run build      # production build in dist/
npm run preview    # serve the production build
```

Stack: React 18, Vite 5, Framer Motion, Lucide icons. Photography is loaded from
Unsplash's CDN, fonts from Google Fonts (Fraunces + Manrope). No backend.

## What to show a client

1. **Announcement bar + sticky nav** — rotating offer messages, live section highlighting, bag count badge.
2. **Hero** — campaign tag, trust strip (rating, hours), layered visual with offer badge.
3. **Department bento** — six floors as clickable tiles; clicking filters the product grid.
4. **New In grid** — category chips, animated filtering, quick view dialog with colour/size choice, validation when a size is missing.
5. **Shopping bag drawer** — quantities, savings, free-delivery progress meter, keyboard/focus trapping.
6. **Offers** — live countdown to the campaign end, copy-to-clipboard coupon codes.
7. **Store guide** — interactive floor directory (arrow keys work).
8. **Story / Services / Loyalty** — counters, service list, membership card.
9. **Visit** — three stores, validated sign-up form with success state, WhatsApp link.

Mobile layout, reduced-motion support and screen-reader labels are built in.

## Editing content

Everything is in `src/data/`:

- `site.js` — brand, nav, announcements, services, loyalty, reviews, stores, campaign.
- `departments.js` — department tiles and the floor directory.
- `products.js` — the product catalogue (price, MRP, images, options, sizes).

Colours and type live in `src/styles/global.css` under `:root`.
