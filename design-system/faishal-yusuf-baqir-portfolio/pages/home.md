# Home page override (branch `scrolltide`)

> Overrides `../MASTER.md` for the home page only. Anything not listed here follows the Master file.

**Pattern:** scroll-scrubbed scene → reel → inked trail, after the "Selene" template on scrolltide.co.
That template is a lunar expedition; here the same pattern is set on the ground, in a palm oil estate at first light.

**Design Dials for this page:** Variance 7/10 | Motion 8/10 (scroll-driven) | Density 4/10

---

## Section order

1. **Estate scene** (hero, `src/components/EstateScene.astro`). The page opens in mist. Scrolling clears it, lifts the
   sun over the ridge, settles six parallax layers of oil palms, brings the headline in, then a field worker reading
   a phone walks onto a knoll and fronds close the frame. Corner readouts (field clock, sun elevation) follow the scroll.
2. **Field log** (`#log`): summary, the two CTAs, portrait, proof points. It slides up over the still-pinned scene.
3. **Work reel** (`#work`, `src/components/WorkReel.astro`): the case studies side by side; the vertical scroll moves
   them while the heading stays on the left with a counter and a progress line.
4. Face check, What I do (unchanged, Master rules).
5. **Trail** (`#experience`, `src/components/Journey.astro`): experience oldest to newest; a route line inks itself
   from stop to stop and a readout shows the year it has reached.
6. Writing, Outside the day job, Contact (unchanged).

## Scene

- Drawn in SVG at build time by `src/lib/palm.ts` (seeded, so every build draws the same trees). No image files.
- Colours are the `--scene-*` tokens in `src/styles/global.css`. Light: a misty morning, from pale on the horizon to
  `#336C01` in front (still the deepest green). Dark: stars, first light on the ridge, fireflies, a lit phone screen.
- Layers, back to front: sky and stars, sun, horizon, far rows, mid palms, near palms, worker on the knoll, corner fronds.
- Type on the scene: the headline's lead and the readouts are Space Grotesk in tracked capitals; "no signal" is
  Poppins 500 in wide capitals. The header is clear while it is over the scene.

## Motion rules

- One scrubbing helper, `src/scripts/scrub.ts`: it eases towards the scroll position, so a wheel step glides.
- The site's CSP blocks inline `style` attributes. Markup uses SVG attributes and classes; scripts write through the
  CSSOM (`el.style.transform = …`). Only `transform`, `opacity` and (wide pointer screens) one `filter: blur` are animated.
- **Reduced motion or no JavaScript:** the hero is one screen tall and shows the cleared scene with the headline;
  the reel is a plain grid; the trail is fully drawn. Nothing on the page depends on the scrubbing.
- **The reel pins only where a whole card fits** (at least 1000px wide, and tall enough: the script measures).
  Elsewhere it is the two-column grid from the Master pattern, with the full evidence in each card.

## Checklist additions

- [ ] Hero readable at 0%, 50% and 100% of the scrub in both themes
- [ ] Text over the dark foreground at the foot of the scene uses `--scene-ink-low`
- [ ] Reel: tabbing to an off-screen card scrolls it into view
- [ ] No horizontal scroll at 375px (the scene layers overflow on purpose and are clipped by the stage)
