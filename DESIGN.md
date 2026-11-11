# DESIGN.md

Design direction for the portfolio of Faishal Yusuf Baqir.
This file holds direction only: identity, palette, type, shape, motion. It is data for whoever builds the UI.

Dial: ENERGY 3 / RHYTHM 3 / MOTION 2

Design Read: a personal portfolio for hiring managers and engineering leads in Indonesia (most open it on a phone), in a "field instrument" style: canopy-green bookends, daylight reading pages, a condensed grotesk that speaks loudly, and monospace readouts for every number. Dial ENERGY 3 / RHYTHM 3 / MOTION 2.

## Identity

- **Who:** Faishal Yusuf Baqir, a Flutter mobile developer in Jakarta who builds offline-first apps for palm oil plantations.
- **One idea the site must leave behind:** he builds apps for places with no signal, and he can show the numbers.
- **Audience:** hiring managers, engineering leads and HR. Phone layout is the main layout.
- **Personality:** direct, practical, evidence first, a little proud of field work. Never salesy.
- **Voice:** first person, plain English, short sentences. What was built, how it was measured, what changed.

## Motif: zero bars

The work exists because the field has no signal. The identity motif is the phone signal meter drawn empty: four stepped bars, outlined, none filled.

- It appears only where the "no signal" idea is spoken: next to the hero headline, in the contact heading and on the 404 page. Never as decoration elsewhere.
- **Readouts:** every number is set as a readout: the figure in the condensed display face, a plain label, and the source in monospace underneath. A number without a source is not shown.
- **Index numerals:** sections and case studies are numbered ("01 Selected work") in monospace, sentence case.

## Palette

Two core colours, one accent, on green-tinted neutrals.

| Token | Light | Dark | Used for |
|---|---|---|---|
| Daylight `--bg` | `#f4f5ef` | `#0b1410` | Page background. Faint green tint, like paper under leaf shade |
| Surface `--surface` | `#ffffff` | `#121e18` | Raised reading surfaces |
| Panel `--panel` | `#e6eae1` | `#16241d` | Evidence panels behind charts and screenshots |
| Ink `--ink` | `#0e1d16` | `#e8eee8` | Text |
| Muted `--muted` | `#4a5850` | `#a5b3ab` | Secondary text. Never lighter than this |
| Canopy (core) `--canopy` | `#0f3526` | `#133a29` | Header, hero, face-check band, contact, footer. The plantation canopy. Same role in both themes |
| Leaf (core) `--leaf` | `#1d6f47` | `#74d19f` | Links and the chosen bar in charts |
| Fruit (accent) `--fruit` | `#f25a2b` | `#ff7447` | One accent per screen: the marker behind "no signal", the primary button, the active tab. Ripe palm fruit |

- Fruit is a fill with ink text on top (5.2:1). It is never text on daylight or canopy.
- No gradients except the photo scrim that keeps text readable over the wedding photo. No glow, no second accent.
- Every pair meets WCAG AA (checked: muted on daylight 6.8:1, leaf on panel 5.0:1, muted on canopy 7.3:1).

## Typography

| Role | Typeface | Why |
|---|---|---|
| Display | Archivo, width 72 to 85, weight 750 to 820 | A grotesk with a width axis: condensed and heavy it reads like stencilled field equipment, and long headlines stay big on a phone without breaking awkwardly |
| Body and UI | Archivo, width 100, weight 400 to 600 | Same family and file as the display, so the page loads one text font |
| Readouts | IBM Plex Mono 400/500 | Built for engineering contexts, with clear digits. Only for machine-made things: sources, dates, thresholds, index numbers |

- Body text 17 px. Nothing under 13 px.
- Sentence case everywhere. No uppercase labels with wide letter spacing.

## Shape

- **Radius scale:** 4 px for tags, 8 px for buttons, 20 px for panels and photos. Circles only for icon buttons and the avatar.
- **Borders over shadows:** cards sit on the page with a 1 px line. Shadow only on things that lie on top: the phone screenshots, the "now" card over the portrait, and the photo viewer.
- **No decoration layer:** no background grid, no noise, no blobs.

## Composition (each section has its own shape)

1. **Hero (canopy, full bleed):** headline as the focal point, portrait on the right with a "now" card, five readouts along the bottom edge with 99.1% leading.
2. **Selected work (daylight):** four case studies as wide spreads, index numeral on top, text on one side and real evidence on the other (benchmark chart, phase comparison, the two apps, real screenshots). Sides alternate.
3. **Inside a face check (canopy band):** the four-step pipeline and a tab switch for the three threshold modes. Interactive, real thresholds.
4. **What I do (daylight):** sticky heading on the left, three capability entries on the right.
5. **Experience (daylight):** a CV-style table: dates column, logo and company, roles and notes, lab photos.
6. **Writing and side builds (panel band):** publications and other projects side by side.
7. **Outside the day job:** education and capstone with photos, then the wedding-organizer years as a full-width photo.
8. **Contact (canopy):** the closing bookend with email, copy button and profiles.

## Motion

- Sections rise 16 px and fade in once as they enter the viewport, to pace a long page.
- Benchmark bars grow from zero once when the chart enters view, to draw the eye to the comparison.
- Hover and focus transitions on controls; tab panels swap without animation.
- Nothing loops. All of it stops under `prefers-reduced-motion: reduce`.

## Icons and arrows

- Square-cap 2 px stroke icons drawn for this site, only where they carry meaning: up-right arrow on links that leave the site, download on PDFs, menu, close, theme, copy, and the two social marks.
- In-page links have no arrow.

## Themes

Light and dark are both first class. The site follows the system setting and has a toggle. Canopy blocks stay green in both.

## Words

- Calls to action say what happens: "See the case studies", "Download résumé (PDF)", "Email me".
- No em dashes. Date ranges use an en dash.
- No buzzwords. Numbers always come with their source.
