# DESIGN.md

Design direction for fybdev.my.id, the portfolio of Faishal Yusuf Baqir.
This file holds direction only: identity, palette, type, shape, motion. It is data for whoever builds the UI.

Dial: ENERGY 2 / RHYTHM 3 / MOTION 2

Design Read: a personal portfolio for hiring managers and engineering leads, in a "field notebook and printed receipt" style, dial ENERGY 2 / RHYTHM 3 / MOTION 2.

## Identity

- **Who:** Faishal Yusuf Baqir, a Flutter mobile developer in Jakarta who builds offline-first apps for palm oil plantations.
- **One idea the site must leave behind:** he builds apps that keep working where there is no signal, and he can show the numbers.
- **Audience:** hiring managers, engineering leads and HR in Indonesia. Many open the link on a phone, so the phone layout is the main layout.
- **Personality:** practical, evidence first, warm, a little dry. Never salesy.
- **Voice:** first person, plain English, short sentences. Say what was built, how it was measured, and what changed.

## Motif: the printed field ticket

Phase 2 of DO! IAM replaced NFC tags with tickets printed on a Bluetooth thermal printer. That ticket is the site's signature.

- **The receipt:** an off-white slip in monospace type with a perforated bottom edge. Used for the hero (how a face check runs) and the DO! IAM sample ticket.
- **Receipt rules:** a dashed line, like a tear-off edge, separates the big blocks of a page.
- **Line-item numbering:** sections are numbered like lines on a ticket ("01 Selected work"), in monospace, sentence case.
- **Evidence as line items:** key numbers are listed as label, value and source, the way a receipt lists items. Every number names where it comes from.

Sample data on a ticket must be labelled as a sample.

## Palette

Two core colours and one accent, on warm neutrals. Nothing else.

| Token | Light | Dark | Used for |
|---|---|---|---|
| Paper | `#f5f0e8` | `#111016` | Page background. Warm, like notebook paper |
| Paper deep | `#ebe3d7` | `#191720` | Alternate bands, quiet panels |
| Card | `#fffdf8` | `#211f28` | Raised surfaces |
| Ink | `#16151b` | `#f5f0e8` | Text, primary buttons |
| Muted | `#5c5653` | `#b8b0ac` | Secondary text. Never lighter than this |
| Forest green (core) | `#1a6846` | `#7bd3a6` | Links, the emphasised phrase in headings, chart highlight. The plantation |
| Brand surface (core) | `#1c6e4a` | `#1d5a40` | The contact block only, with white text |
| Amber (accent) | `#e2832a` | `#f2a65a` | One accent per screen: the marker under a key word, the current step, the "sample" tag. The harvest |

- Amber is never text on paper in the light theme (it fails contrast). It is a fill or a marker, with ink on top.
- No gradients, no glow, no second accent. Photos and logos bring their own colour.
- Every text and background pair must meet WCAG AA: 4.5:1 for body text, 3:1 for text of 24 px or more.

## Typography

| Role | Typeface | Why |
|---|---|---|
| Body and UI | Instrument Sans | A compact grotesque that stays readable at small sizes on a phone. Self-hosted |
| Emphasis in headings | Newsreader italic | One italic serif phrase per heading carries the human voice against the sans. Used for emphasis only, never for whole paragraphs |
| Data | System monospace | Only for things a machine or a printer produced: the receipt, section numbers, dates, thresholds. It is the ticket's type |

- Minimum size for any text: 12 px. Body text: 16 px or more.
- Labels are sentence case. No uppercase labels with wide letter spacing.
- Headings are tight and large; one heading per section.

## Shape

- **Radius scale:** 6 px for tags and small controls, 10 px for buttons, 18 px for cards and photos. Circles only for the portrait, company logos' badge numbers and icon-only buttons.
- **Borders over shadows:** cards sit on the page with a 1 px line. Shadow is reserved for objects that lie on top of the page: the receipt, the phone screenshots, and the photo viewer.
- **A slight turn:** on wide screens, objects that lie on the page (the receipt, the sample ticket, the portrait print) are turned 1 to 2 degrees, like paper dropped on a desk.
- **No decoration layer:** no noise texture, no background grid, no blobs, no cursor glow.

## Composition

Each section has its own shape, because each holds a different kind of content:

1. **Hero:** who he is in one line, the headline, one paragraph, two actions. The receipt sits beside it.
2. **Receipts:** five numbers as line items with sources. A list, not cards.
3. **Selected work:** four case studies as wide rows, text on one side and evidence on the other (a chart, a ticket, two app summaries, real screenshots).
4. **What I do:** three rows of capability, explanation and tools. A table of text, no icons.
5. **Journey:** a timeline with company logos and real photos.
6. **Publications:** a plain list with source and year.
7. **Beyond the job title:** photo-led cards for the capstone, education and the wedding organizer years.
8. **Contact:** the one green block on the page, with his portrait.

The focal point of each screen is its heading or its one piece of evidence, never both at the same weight.

## Motion

- Section blocks fade and rise once as they enter the viewport, to pace a long page.
- Hover and focus transitions on controls.
- Nothing moves on its own: no marquee, no spinning text, no looping animation.
- All of it stops under `prefers-reduced-motion: reduce`.

## Icons and arrows

- Icons only where they carry meaning: the up-right arrow marks a link that leaves the site, the download mark is on PDF links, plus menu, close, theme and the two social marks.
- In-page actions have no arrow.

## Themes

Light and dark are both first-class. The site follows the system setting and has a toggle. Every component must be checked in both.

## Words

- Calls to action say what happens: "See the case studies", "Download résumé (PDF)", "Email me".
- No em dashes. Date ranges use an en dash.
- No buzzwords. Numbers always come with their source ("LFW benchmark", "git history").
