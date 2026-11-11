# Faishal Yusuf Baqir — Portfolio

Personal portfolio built with [Astro](https://astro.build), based on the MIT-licensed
[LatentFolio Free](https://github.com/Dharani-Eswaramurthi/latentfolio) template by Dharani Eswaramurthi.

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
| Profile, projects, experience, publications | `src/data/site.ts` |
| Home page sections | `src/pages/index.astro` |
| Case study pages (`/work/<slug>`) | `src/pages/work/[slug].astro` |
| Project card visuals | `src/components/ProjectVisual.astro` |
| Hero face-check demo | `src/components/InferenceDemo.astro` |
| Colors and fonts | `src/styles/global.css` (`--violet` is the main green accent) |
| CV and portfolio PDFs | `public/faishal-yusuf-baqir-cv.pdf`, `public/faishal-yusuf-baqir-portfolio.pdf` |
| Social share image | `public/og-cover.svg` → `public/og-cover.png` |
| Photos (text, alt, captions) | `src/data/photos.ts` |
| Photo viewer and photo component | `src/components/Lightbox.astro`, `src/components/Photo.astro` |

To add a case study, add an entry to `caseStudies` in `src/data/site.ts`; its page is generated automatically.

## Photos

Originals live in `assets/` and are **git-ignored**: they are large and carry EXIF data (one of them even had GPS).
`npm run photos` turns them into web-ready copies in `src/assets/photos` (cropped, resized, EXIF removed), and those
copies are what gets committed. Astro then builds the responsive WebP sizes at build time.

To add or change a photo:

1. Put the original in `assets/`.
2. Add or edit its line in `scripts/prepare-photos.mjs` (output name, optional crop, longest edge).
3. Run `npm run photos`.
4. Import it in `src/data/photos.ts` with alt text and a caption, then use it with `<Photo>` (opens in the viewer) or `<Image>`.

`.heic` files are converted with macOS `sips`; on another system export them to JPEG first.

## Deploy

Static output, works on Vercel, Netlify, Cloudflare Pages or GitHub Pages.
On Vercel: import the repository, keep the Astro defaults, and set `SITE_URL` to the production URL.

## License

Template code: MIT (see `LICENSE`). Third-party notices: `THIRD_PARTY_NOTICES.md`.
