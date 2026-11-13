# Faishal Yusuf Baqir · Portfolio

Personal portfolio of Faishal Yusuf Baqir, Flutter mobile developer. A static site built with [Astro](https://astro.build).

## Run locally

Requires Node.js 22.12 or later.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # type check + static build into dist/
npm run preview  # serve the built site
```

## Where things live

| What | File |
|---|---|
| Profile, case studies, experience, publications, readouts | `src/data/site.ts` |
| Photos (alt text, captions) and company logos | `src/data/photos.ts` |
| Home page | `src/pages/index.astro` |
| Home hero: the palm oil estate scene, scrubbed by the scroll | `src/components/EstateScene.astro`, drawn by `src/lib/palm.ts` |
| Case studies as a reel, experience as an inked trail | `src/components/WorkReel.astro`, `src/components/Journey.astro` |
| Scroll scrubbing helper | `src/scripts/scrub.ts` |
| Field phases played by the scroll (NFC tap, printed ticket) | `src/scripts/field-play.ts`, drawn in `src/components/CaseVisual.astro` |
| Case study pages (`/work/<slug>`) | `src/pages/work/[slug].astro` |
| Page shell: meta tags, structured data, theme | `src/layouts/Base.astro` |
| Evidence next to each case study (chart, phases, apps, screenshots) | `src/components/CaseVisual.astro` |
| Interactive face check band | `src/components/FaceCheck.astro` |
| Photo viewer and photo link | `src/components/Viewer.astro`, `src/components/PhotoLink.astro` |
| Design system (UI UX Pro Max): palette, type, components, motion, checklist | `design-system/faishal-yusuf-baqir-portfolio/MASTER.md` |
| Home page override: the scroll-driven pattern and its rules | `design-system/faishal-yusuf-baqir-portfolio/pages/home.md` |
| Colour and type tokens | `src/styles/global.css` |
| CV and portfolio PDFs | `public/faishal-yusuf-baqir-cv.pdf`, `public/faishal-yusuf-baqir-portfolio.pdf` |
| Social share image | `scripts/og-cover.html` → `public/og-cover.png` (`npm run og`, needs Google Chrome) |

To add a case study, add an entry to `caseStudies` in `src/data/site.ts`; its page is generated automatically.

## Photos

Originals live in `assets/` and are **git-ignored**: they are large and carry EXIF data (one of them even had GPS).
`npm run photos` turns them into web-ready copies in `src/assets/photos` (cropped, resized, EXIF removed), and those
copies are what gets committed. Astro builds the responsive WebP sizes at build time.

To add or change a photo:

1. Put the original in `assets/`.
2. Add or edit its line in `scripts/prepare-photos.mjs` (output name, optional crop, longest edge).
3. Run `npm run photos`.
4. Import it in `src/data/photos.ts` with alt text and a caption, then show it with `<PhotoLink>` (opens in the viewer) or `<Image>`.

`.heic` files are converted with macOS `sips`; on another system export them to JPEG first.

## Deploy

Static output, works on Vercel, Netlify, Cloudflare Pages or GitHub Pages.
On Vercel: import the repository, keep the Astro defaults, and set `SITE_URL` to the production URL.

## License

Source code: MIT (see `LICENSE`). Written content, photos, logos and PDFs are not covered by that license.
Third-party notices: `THIRD_PARTY_NOTICES.md`.
