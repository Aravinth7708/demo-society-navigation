# Demo Society nav bar (exact replica of screenshots)

Note: Next.js isn't available on Lovable. The project uses React with TanStack Start, which looks and behaves the same in the browser. The nav bar will be built to match your screenshots exactly.

## What you'll see
- Cream page background with thin dark-maroon line at the very top.
- Red square logo block on the left (touches top edge) reading "THE / DEMO / SOCIETY" in a serif font, white text.
- Top-right: search (magnifier) icon and "Sign in" text.
- Lower row: Fellows, Events, Journals, Current topics, Grants, Medals and prizes, About us, News and resources — evenly spaced, dark gray, with a light gray underline running beneath the whole row.
- Clicking the search icon: a dark semi-transparent overlay dims the whole header (logo turns dark red), and a white search box with "Search" placeholder and a magnifier icon appears across the top. Clicking outside or pressing Escape closes it.
- Home page shows only this nav bar (no other content).
- On small screens, menu items collapse into a menu button.

## Technical details
- Rewrite `src/routes/index.tsx` with a `SiteHeader` component in `src/components/SiteHeader.tsx`.
- Colors as tokens in `src/styles.css`: cream ~#EFE7DC bg, red ~#E8002D, maroon top border, gray text/underline.
- Fonts via `<link>` in `__root.tsx`: serif (e.g. Cormorant/Libre Baskerville-like) for logo, Proxima-like sans (Figtree) for nav.
- Container ~1316px centered; logo 144x144.
- Update page title/description to "Demo Society".
