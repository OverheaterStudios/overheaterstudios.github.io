# Overheater Studios website — project notes for Claude Code

Website for **Overheater Studios LLC**, Jerhemy Waldon's indie studio making **games and tools**.
Live at **https://overheater.com** (GitHub Pages, repo `OverheaterStudios/overheaterstudios.github.io`, branch `master`, custom domain via `CNAME`).

This file is the handoff from the earlier redesign work. Read it before changing anything.

---

## Ground rules (from the owner)

- **Commits:** author and committer must be `Jerhemy Waldon <jswaldon@gmail.com>`, not the work email that's in older history.
  Set it per command if needed: `git -c user.name="Jerhemy Waldon" -c user.email="jswaldon@gmail.com" commit ...`
- **No Claude attribution on commits.** No `Co-Authored-By`, no "Generated with", no session links in commit messages or PRs.
- **Commit and push only when asked.** Pushing to `master` deploys the live site.
- **Don't stage `.gitignore`.** It always shows as modified because of Windows CRLF line endings. Its content is unchanged.
- **Never invent products or claims.** An earlier draft featured a fake product ("Overheater Dispatch") and the owner had it removed. Only list things that are real, and mark drafted copy with `// TODO` for him to check.
- **No "Notify me" / sign-up buttons.** The owner doesn't want them until notifications are wired up the way he wants. Unreleased things show a "Coming soon" label instead.
- **Positioning:** an indie studio building games and cool tools, with a gamer/niche voice and an "indie studio, arcade edge" look. It is *not* a consultancy or a "hire us" agency site.
- The owner likes **visual explanations**: show screenshots of changes rather than describing them.

---

## How the site works

Plain static HTML, CSS and JavaScript. **No build step, no framework, no Jekyll templating.**
Open `index.html` directly in a browser to preview everything. The only exception is `404.html`, which uses root-absolute paths and only works when served.

| File | What it is |
| --- | --- |
| `index.html` | Home: thermal flame hero, a "Games & tools" shelf (all releases plus locked slots), the latest devlog teaser, a call-to-action band |
| `games.html`, `tools.html` | Shelves filtered by type (`data-shelf="game"` / `"tool"`) |
| `products/<slug>.html` | One page per game or tool. A shell only: the content is rendered from `js/products.js` by `body[data-product]` |
| `products/_template.html` | Copy this for a new release. Underscore files aren't published by GitHub Pages |
| `devlog.html` | Posts from `js/devlog.js` (newest first) |
| `about.html` | Studio copy, plus "Previously shipped" from `js/projects.js`, plus press & creators |
| `contact.html` | Form with a topic dropdown; `?topic=<value>` preselects (`general`, a product slug, `support`, `press`, `business`, `other`) |
| `404.html` | Custom not-found page |
| `js/layout.js` | Draws the shared header and mobile menu where it's included (top of `<body>`). Subfolder pages pass `data-root="../"` |
| `js/site.js` | `SETTINGS` (email, Formspree ID), footer, shelf cards, locked slots, product pages, devlog, past projects, contact form, Konami-code easter egg, thermal hero |
| `js/products.js` | **All games and tools.** Fields are documented at the top: `type`, `status`, `cover`, `links` (store buttons), `price`, `checkout`, `trailer`, `screenshots`, `highlights`, `specs`, `faq`, `hidden` |
| `js/devlog.js`, `js/projects.js` | Devlog posts and past projects |
| `css/site.css` | Everything visual. Design tokens are at the top |
| `img/` | Logos (SVG), favicon, Pixel Studio cover, Drive-A-Logue image |
| `README.md` | Owner-facing "where to change things" guide. Keep it in sync with changes |
| `_config.yml` | Only excludes `CLAUDE.md` and `README.md` from GitHub Pages' default processing so they aren't published |

### Adding a game or tool
1. Add an entry to `window.PRODUCTS` in `js/products.js` (`type: "game"` or `"tool"`).
2. Copy `products/_template.html` to `products/<slug>.html`. Set `data-page` (`games`/`tools`), `data-product`, `<title>`, the meta description and `og:title`.
It then appears on the home shelf, its Games/Tools page and the contact topics automatically.

Button logic on a release page: if it has `links`, the first link is the main button; `checkout` adds "Buy"; with neither, it shows the `status` as a dashed "Coming soon"-style label (not a button).

### Contact form
GitHub Pages can't run server code. The form posts to Formspree when `SETTINGS.formspreeId` is set; otherwise it opens a `mailto:` to `SETTINGS.email`.
The old template's PHP form never worked on Pages and was removed.

---

## Design system

- **Palette** (`:root` in `css/site.css`): `--ink #100C0D` (logo black), `--ember #D31906` (logo red), `--flame #F94328`, `--filament #FFC93C` (primary buttons, focus ring), `--paper #F3F2F2`, plus `--slate`, `--mist`, `--on-ink`, `--ink-2/3`.
- **Fonts** (Google Fonts): Barlow Condensed 600–800 for uppercase headings and buttons (matches the wordmark), Atkinson Hyperlegible for body text, and Press Start 2P (`.pixel`) for **small accents only**: tags, kickers, the "Coming soon" label, toasts.
- **Arcade buttons:** 3px ink border with a hard offset shadow that is red (`--ember`) on dark sections; they press down on `:active`.
- **"Cartridge" cards** (`.cart`): 3:4 box-art cover, hard shadow, status tag in pixel font.
- **Locked slot** (`.locked`, `.locked-wide`): dashed "?" card teasing what's next, ending in a "Coming soon" label.
- **Thermal hero** (home only): a low-res heat-diffusion canvas behind the crisp `img/overheater-mark.svg`. The heat source is a blurred silhouette of the mark, embedded as a base64 PNG (`glow.src`) so it works from `file://`. The pointer adds heat, it respects `prefers-reduced-motion`, and it pauses off-screen. Faint CRT scanlines sit over it.
- **Easter egg:** the Konami code (↑↑↓↓←→←→BA) bursts heat and shows a "Cheat activated: +30 lives" toast.
- Responsive down to ~360px. Below 760px the header becomes a Menu button.

### Logo files
`img/overheater-logo(-reverse).svg` (full lockup, dark/white lettering), `overheater-mark.svg` (flame only), `overheater-wordmark(-reverse).svg`.
They were vectorized from the owner's raster logo. The ring is exact geometry: the transparent gap uses an SVG `<mask>` with a unique id per file (`oh-mark-gap`, …), so keep ids unique if you add more inline SVGs.
Favicons (`favicon.ico`, `apple-touch-icon.png`) are rendered from the mark.

---

## Current state (Nov 1, 2026)

- Commit `3226502` ("Rebuild site as indie games & tools studio") is pushed and live.
- **Uncommitted, ready to commit:** Pixel Studio added as the first tool (`js/products.js`, `products/pixel-studio.html`, `img/pixel-studio-cover.png`); every "Notify me" removed (`js/site.js`, `index.html`, `contact.html`, `js/devlog.js`, `css/site.css`, `README.md`); plus this `CLAUDE.md` and `_config.yml`.

### Content on the site
- **Pixel Studio** (tool, "Coming soon"): an AI pixel art generator and animator for game development. It's the owner's own project (separate private repo `OverheaterStudios/pixel-studio`): it generates 8/16/32-bit characters with animation sets (idle, attacks, jump, jump attack, spellcast, use item, take damage, death) and is planned as a Docker image with a web UI. The cover is a pixel-art version of the flame mark, a placeholder until there are real screenshots.
- **No games yet.** The home and Games pages show a locked "Our first game is in the forge" slot.
- **Previously shipped:** Drive-A-Logue (a client mobile app for a family-conversation card game, client Adam Brooks), marked "Acquired". It has since been sold to another company, so there's no link.
- **Devlog:** one drafted post, "The forge is lit" (2026-10-31).

### Open TODOs for the owner (don't fill these in without asking)
- `SETTINGS.email` in `js/site.js` is a placeholder (`hello@overheater.com`, which may not exist). This address is shown publicly.
- `SETTINGS.formspreeId` is empty, so the form falls back to `mailto:`.
- Drafted copy to review: the About page, the devlog post, Pixel Studio's wording and its "Web UI" tag, and Drive-A-Logue's "Mobile game app" label.
- Real Pixel Studio screenshots or a GIF to replace the placeholder cover.
- How the owner wants release notifications to work (a mailing list? Discord?). Until then, no sign-up buttons.

---

## Verifying changes

- Preview by opening the HTML files directly. Check the browser console for errors.
- Screenshots: Playwright with desktop (1440×900) and mobile (390×844) viewports, full page. The fonts load from Google Fonts.
- Check pages both **with and without** entries in `js/products.js` (empty states vs. cards), and the release page for a product with `links`/`checkout` and one without.
- After pushing, GitHub Pages usually updates within a minute or two.
