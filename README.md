# Kilordle

Kilordle is a browser word game where one five-letter guess is played across 1000 Wordle-style boards at the same time. Each guess updates every active puzzle, solved words leave the remaining pool, and the goal is to clear all boards with as few guesses as possible.

You can play this game at [kilordle](https://www.kilordle.net/)

This project is based on and references the original Kilordle project by Jones NXT:
https://github.com/jonesnxt/kilordle

## What Changed

This version keeps the original game experience client-rendered in React, while adding a static site layer around it.

Main improvements:

- Added a static header and footer outside the original game root.
- Kept the game mounted at `<div id="root"></div>` so the original React game remains isolated.
- Added static homepage content for how to play, strategy, and FAQ.
- Added a first-visit in-game tutorial carousel with four slides.
- Added static pages for About, Contact, Terms of Service, Privacy Policy, and Change Log.
- Added sitemap and robots.txt generation.
- Added homepage JSON-LD for `WebPage`, `FAQPage`, and `BreadcrumbList`.
- Reworked responsive header and footer layouts for desktop and mobile.
- Removed unused local experiment folders: `subsecond/` and `prettier-plugin/`.

## Architecture

The project now has two layers:

1. Game layer

   The original game is still a Create React App application under `src/`. It renders on the client into `#root`.

2. Static site layer

   The static site lives under `static-site/`. It uses React components with `react-dom/server` at build time to generate static HTML into `public/`.

Important paths:

- `src/` - client-rendered game code
- `static-site/components/` - build-time React components for static content
- `static-site/content/` - JSON content source for static pages
- `static-site/render.ts` - static HTML, sitemap, and homepage JSON-LD generator
- `public/index.html` - homepage template with static insertion markers
- `public/static-site.css` - static site styles

## Tech Stack

- React 17
- TypeScript
- Create React App / `react-scripts`
- styled-components for the original game UI
- `react-dom/server` for build-time static rendering
- `tsx` for running the static TypeScript renderer
- JSON content files for editable static page copy

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm start
```

The `prestart` script runs automatically before the dev server:

```bash
tsx static-site/render.ts
```

That regenerates the static homepage content, static pages, sitemap, and JSON-LD before React starts.

## Build

Create a production build:

```bash
npm run build
```

The `prebuild` script also runs the static renderer first. The final static site is emitted to:

```text
build/
```

The build includes:

- `/` - homepage with the original game mounted at `#root`
- `/about/`
- `/contact/`
- `/terms/`
- `/privacy/`
- `/changelog/`
- `/sitemap.xml`
- `/robots.txt`

## Deployment

This project deploys as static files. After running:

```bash
npm run build
```

upload the contents of `build/` to any static hosting service, such as GitHub Pages, Netlify, Vercel static hosting, Cloudflare Pages, or an Nginx static directory.

The current site URL is configured in:

```text
static-site/content/site.json
```

Update `siteUrl` before deploying to a different domain. The sitemap and JSON-LD use that value.

## Content Editing

Most public-facing static text is editable from JSON:

- Homepage content: `static-site/content/home.json`
- Site navigation/footer/site URL: `static-site/content/site.json`
- Static pages: `static-site/content/pages/*.json`

After editing content, run:

```bash
npm run build
```

or:

```bash
npx tsx static-site/render.ts
```

## Notes

The original game is still client-rendered. Static content around it is generated at build time so it exists directly in the HTML source.

The project may show existing CRA lint warnings during build. They are inherited from the original game code and do not currently block production builds.
