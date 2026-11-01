# Overheater Studios

Website for Overheater Studios LLC, an indie studio making games and tools. Served by GitHub Pages at https://overheater.com.
Plain HTML, CSS and JavaScript with no build step: open `index.html` in a browser to preview.

## Pages

| Page | File |
| --- | --- |
| Home | `index.html` |
| Games | `games.html` |
| Tools | `tools.html` |
| One page per game or tool | `products/<slug>.html` (content comes from `js/products.js`; start from `products/_template.html`) |
| Devlog | `devlog.html` |
| About (with "Previously shipped") | `about.html` |
| Contact | `contact.html` (links can preselect a topic, e.g. `contact.html?topic=press`) |
| Not found | `404.html` |

## Where to change things

| What | File |
| --- | --- |
| Games and tools: covers, store links, prices, screenshots, trailers | `js/products.js` (fields are explained at the top) |
| Devlog posts | `js/devlog.js` |
| Past projects on the About page | `js/projects.js` |
| Contact email and form service | `SETTINGS` at the top of `js/site.js` |
| Header and menu (shared by every page) | `js/layout.js` |
| Footer (shared by every page) | footer section of `js/site.js` |
| Colours, fonts, layout | `css/site.css` (colours are variables at the top) |
| Logos and images | `img/` |

## Adding a game or tool

1. Add an entry to `js/products.js` (there's a commented example to copy). Set `type` to `"game"` or `"tool"`.
2. Copy `products/_template.html` to `products/<slug>.html` and change `data-product`, the `<title>` and the description.

It then shows up on the home page, its Games or Tools page and in the contact form.
While a list is empty, its page shows a "locked" coming-soon slot with a sign-up button.
Files starting with `_` aren't published by GitHub Pages, so the template stays private.

## Selling and store links

- `links`: buttons to Steam, itch.io, a web build, a download… The first one is the main button.
- `checkout`: a hosted checkout link (Stripe Payment Link, Lemon Squeezy, itch.io) adds a "Buy" button.
- With neither, the page shows "Notify me at launch".

## Contact form

GitHub Pages can't run server code, so the form uses [Formspree](https://formspree.io):
create a free form there and paste its ID into `SETTINGS.formspreeId` in `js/site.js`.
Without an ID, the form opens the visitor's email app addressed to `SETTINGS.email`.

## Logo files

- `img/overheater-logo.svg` / `img/overheater-logo-reverse.svg`: full logo for light / dark backgrounds
- `img/overheater-mark.svg`: flame mark on its own
- `img/overheater-wordmark.svg` / `img/overheater-wordmark-reverse.svg`: lettering on its own

## Easter egg

Try the Konami code on any page.
