# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Scope

Landing page for the book *"Fondamenti di Matematica per Studenti di Informatica"*. Deployed as `matematica.lornova.it` (iframe-masked onto `www.loz.it`). Deployment architecture, hosting, and cross-project context are in the **parent** `../CLAUDE.md` — don't duplicate that here.

## Deploy target — read this before writing CI

The build (`dist/`) goes to the **`www.loz.it/` folder on the `ftp.loz.it` SFTP server**, on a **different Aruba account** from the one hosting `lornova.it`. On the user's Windows machine there is a pre-configured **WinSCP session named `ftp.loz.it`** for manual deploys — use it for ad-hoc uploads; for CI, replicate the same host/credentials as GitHub Actions secrets.

Two consequences:

- GitHub Actions SFTP secrets for this project must point to the `loz.it` account (host `ftp.loz.it`, remote dir `/www.loz.it/`, credentials from that Aruba account) — NOT the `lornova.it` one. They are unrelated accounts.
- The site is publicly reachable at **two URLs simultaneously**: `https://www.loz.it/` (direct) and `https://matematica.lornova.it/` (iframe-masked). Treat `matematica.lornova.it` as the canonical branded URL; the `loz.it` one is the physical reality but not the public-facing identity.

## Aruba HiSpeed Cache gotcha

Aruba fronts the webspace with a proxy cache (`aruba-proxy`, visible as `X-Aruba-Cache: HIT/MISS` in response headers). After any deploy, especially the first one or one that changes what `/` resolves to, the proxy may keep serving stale content (e.g. a default Aruba parking page on `/` even when `index.html` is correctly uploaded). Fix: panel → **Velocità** → **HiSpeed Cache** → Purge. Without the purge, `curl https://www.loz.it/` can show the old cached content while `curl https://www.loz.it/index.html` shows the new one — confusing during debugging.

## Iframe masking constraints that affect code

The subdomain `matematica.lornova.it` is implemented as an Aruba "Inoltra con mascheramento" rule that returns a full-page `<iframe src="https://www.loz.it/">` wrapper. This imposes hard constraints on the SPA:

- **Never set frame-blocking response headers** on the `loz.it` deployment — no `X-Frame-Options`, no `Content-Security-Policy: frame-ancestors`. Adding either (e.g. via `.htaccess` security hardening) will break `matematica.lornova.it` instantly. If at some point those headers become desirable for security, the iframe approach has to be dismantled first.
- **Deep links don't propagate to the outer URL.** If this SPA ever gains a router, shareable URLs like `matematica.lornova.it/lezioni/frazioni` won't land on the right internal state — the outer URL stays at the root. Keep the app flat-anchor-based (current design) unless you also change the hosting architecture.
- **Canonical URL and social meta tags** should reference `matematica.lornova.it`, not `loz.it`, even though the server technically serves from `loz.it`. Search engines and OG scrapers of `matematica.lornova.it` see only the iframe wrapper, so the canonical hint here is mostly for the direct `www.loz.it` access path.
- **Cookies and `localStorage`** are scoped to `www.loz.it` (the iframe's origin), not `matematica.lornova.it`. Any user-facing persistence will survive a direct `loz.it` visit but is invisible to the "branded" URL session — in practice irrelevant for a static landing page, but keep it in mind if features grow.

## Commands

```bash
pnpm dev       # Vite dev server with HMR
pnpm build     # production build into dist/ (what gets uploaded to Aruba)
pnpm preview   # serve the built bundle locally on :4173
```

No test suite, no linter configured. TypeScript is checked only implicitly by Vite at build time (`tsconfig.json` sets `noEmit: true`, `strict: true`).

## Architecture

Multi-page Vite build with **no router, no global state management**. Navigation between distinct "pages" uses real HTML entries (one Vite entry per page) rather than client-side routing, because iframe masking prevents outer-URL updates anyway.

Two entry points, declared under `build.rollupOptions.input` in `vite.config.ts`:

- `index.html` → `src/main.tsx` → `src/app/App.tsx` → 7 flat section components (home landing page). Only interactivity: smooth scroll between anchor sections and one accordion in `Contents.tsx`.
- `errata.html` → `src/errata/main.tsx` → `src/errata/ErrataApp.tsx` + `ErrataForm.tsx` (dedicated errata page; form POSTs JSON to `errata.php`).

The errata page intentionally uses its own minimal chrome (simple top bar + footer) rather than importing `Header`/`Footer` from `src/app/components/`. Those share `scrollToSection` logic that would misbehave as cross-page anchors; duplicating ~30 lines of markup is cheaper than refactoring them for two pages. When adding a third page, reconsider.

Each home section is a self-contained file in `src/app/components/` (`Header`, `Hero`, `About`, `Contents`, `Author`, `Download`, `Footer`) with hardcoded Italian copy. `ImageWithFallback` (under `components/figma/`) is a legacy helper from Figma Make, preserved for the two remote Unsplash images in `About` and `Author`.

The cover image at `src/imports/cover_fondamenti_ebook.svg` is **generated output** of the LaTeX book's latexmk recipe (`D:\LaTeX\Matematica_per_Informatica\latexmk\pdflatex_cover_ebook.latexmkrc`) — don't hand-edit. Rebuilding the cover in the LaTeX project auto-copies the SVG back into this directory.

## Tailwind v4 setup

No `tailwind.config.js`. Tailwind 4 is wired via `@tailwindcss/vite`, and configuration lives in CSS:

- `src/styles/tailwind.css` — `@import 'tailwindcss' source(none)` + explicit `@source '../**/*.{js,ts,jsx,tsx}'` (required because we used `source(none)`).
- `src/styles/theme.css` — design tokens via `@theme inline { ... }` (Tailwind v4 native). The book's orange palette is defined there as CSS variables (`--primary: #C45500`, `--secondary: #E86A10`, `--background: #FFF5EB`); hex literals are still scattered in some component classNames where the token was overkill.

## Path alias

`@/*` → `src/*` is configured in **both** `tsconfig.json` (for TS resolution) and `vite.config.ts` (for bundler resolution). Keep them in sync if you move `src`.

## `vite.config.ts` base setting — do not change

`base: './'` emits relative asset paths in `dist/`. This is **load-bearing**: it makes the same build serve correctly from either a webspace root or a subfolder, with or without the iframe wrapper. Changing it to an absolute base (`'/'` or a full URL) would force the iframe target to be locked to one deploy path and could break image/CSS loading when accessed via `matematica.lornova.it`.

## Deployment-related files in public/

- `public/.htaccess` — SPA fallback + compression + cache headers for Apache (Aruba is Apache). Copied verbatim into `dist/` by Vite. The SPA fallback rewrites only to `index.html` and only when the request doesn't match an existing file/dir, so `errata.html` and `errata.php` are served as-is without interference.
- `public/robots.txt` — sitemap URL points to `matematica.lornova.it` (the iframe URL, not the underlying `www.loz.it`).
- `public/errata.php` — PHP backend for the errata form. Runs on the same `loz.it` webspace as the SPA (temporary consolidation until multi-domain hosting). Self-contained: no Composer, no PHPMailer — single-file implementation of stateless HMAC captcha, honeypot + time-check + IP-hashed rate limit, and a minimal SMTP client speaking directly to `smtpauth.aruba.it:465`.
- `public/errata.config.example.php` — committed template. Real values go in `errata.config.local.php` (gitignored), which **must be uploaded manually via SFTP** (WinSCP) next to `errata.php`. The CI deploy does not touch it — `SamKirkland/FTP-Deploy-Action` syncs only what's in `dist/`, and the config file isn't there.
- `.errata-data/` — created at runtime by `errata.php` to store the rate-limit JSON. A `.htaccess` with `Require all denied` is written inside on creation, blocking HTTP access.

## Content conventions

- **Copy is in Italian**, matching the book. Orthographic correctness matters (accents, no em-dash, decimal point, Italian double quotes).
- **Don't invent facts about the book.** Page counts, exercise counts, release dates etc. must reflect the real state of the LaTeX project (`D:\LaTeX\Matematica_per_Informatica\`) — when in doubt, check `PIANO.md` / `CLAUDE.md` there, or ask. AI-generated placeholder content is what this codebase was cleaned up to remove.
- **No email addresses in the client bundle** (neither as visible text, `mailto:`, nor as JS string constants) — the public-facing React code must stay clean to avoid harvester spam. Server-side PHP (in `public/errata.php` and its config) is exempt: those addresses never reach the browser. Public contact channels in visible HTML remain LinkedIn/GitHub only.
- Amazon ASIN in `Download.tsx` is a placeholder constant (`AMAZON_URL`) — swap when the book is actually listed.
