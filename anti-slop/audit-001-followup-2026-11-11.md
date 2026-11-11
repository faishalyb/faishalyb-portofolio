# antislop follow-up to audit 001 · 2026-11-11

The owner approved all 30 findings. 29 are fixed. Finding 2 (the PDFs) is left as it is by the owner's decision, recorded below.
The direction used for the fixes is `DESIGN.md` (dial ENERGY 2 / RHYTHM 3 / MOTION 2).

## What was done, by finding

| # | Rule | Status | What changed |
|---|---|---|---|
| 1 | R-02 | Fixed | No em dash left in the built HTML (0 in 6 pages), the manifest or the README. Titles use "·", date ranges use an en dash |
| 2 | R-02 | **Kept by the owner** | The CV and portfolio PDFs still contain em dashes. Owner's decision on 2026-11-11: leave the PDFs as they are |
| 3 | R-25 | Fixed | New colour tokens. Measured after the change: 0 failures in 231 text elements on the home page, light theme |
| 4 | R-25, R-34 | Fixed | The contact block has its own dark-green surface in both themes. Measured: 0 failures in the dark theme on all 6 pages |
| 5 | R-03 | Fixed | Every button and standalone link is at least 44 px; measured 0 undersized controls at 375 px |
| 6 | R-03 | Fixed | Smallest text is now 12.5 px; measured 0 selectors under 12 px |
| 7 | R-39 | Fixed | Marquee, spinning ring and all looping animations removed. The built CSS contains no `infinite` animation |
| 8 | R-39 | Fixed | `cursor: pointer` for links, buttons, `summary` and `label[for]` in the base stylesheet; `not-allowed` for disabled buttons |
| 9 | R-38, R-26 | Fixed | The fake demo is replaced by a receipt that states how a face check runs. Its three buttons switch the real threshold for each mode |
| 10 | R-38 | Fixed | The ticket uses obvious placeholder values and carries a visible "Sample" tag and caption |
| 11 | R-17 | Fixed | The numbers are a static list; each shows its source next to the value |
| 12 | R-23 | Fixed as placeholder | Brand is the name as text; favicon is a plain initial; share image is text only. **Owner to confirm or supply a real mark** |
| 13 | R-27 | Fixed | The viewer shows "Loading photo…", then the photo, or an error message if it fails |
| 14 | R-40 | Fixed | The viewer image has width and height, updated per photo |
| 15 | R-37 | Fixed | `DESIGN.md` written and applied |
| 16 | R-07 | Fixed | Grid backgrounds and the noise layer removed |
| 17 | R-13, R-01 | Fixed | Pointer glow, glowing dots and decorative gradients removed. Two gradients remain, each with a stated purpose: the perforated ticket edge and the dark scrim under text on the wedding photo |
| 18 | R-08 | Fixed | The up-right arrow now only marks links that leave the site; the download mark is on PDF links. In-page actions have no arrow |
| 19 | R-09, R-06 | Fixed | Eyebrow pill replaced by a plain line with portrait, name and role. Labels are sentence case; no uppercase or tracking rules remain |
| 20 | R-12 | Fixed | Shadow only on the receipt, the sample ticket, the phone screenshots, the portrait print and the viewer. Cards use a 1 px line |
| 21 | R-14, R-04 | Fixed | "What I do" is three rows of text and tools, with no icons |
| 22 | R-19 | Fixed | One motion: blocks rise once on entering the viewport, to pace the page. It stops under reduced motion |
| 23 | R-22 | Fixed | Publications are a plain list with year and source; the abstract art is gone |
| 24 | R-29 | Fixed | Forest green, the green contact surface and one amber accent, on warm neutrals |
| 25 | R-11 | Fixed | Radius scale of 6, 10 and 18 px. Round shapes only for the portrait and icon-only buttons |
| 26 | R-05 | Fixed | Eight sections with eight different compositions (see `DESIGN.md`, Composition). No fake windows |
| 27 | R-15 | Fixed | "See the case studies", "Download résumé (PDF)", "Email me" |
| 28 | R-20, R-30 | Fixed | The printed-ticket motif, the receipts list and the evidence visuals are specific to this work. The stylesheet was rewritten rather than adjusted |
| 29 | R-31 | Fixed | Reasons are in `DESIGN.md` and as comments next to each decision in the styles |
| 30 | C-1 | Fixed | Upsell and demo components deleted; stylesheet rewritten (39 KB of CSS in the build, all in use); storage key is `theme`; unused icons removed |

## Delivery Gate

### Block 1: Hard Gate

| Rule | Result | Evidence |
|---|---|---|
| R-02 | PASS for the site; PDFs kept by owner override | 0 em dashes in the 6 built pages. The two PDFs still have them; the owner chose to keep the PDFs unchanged (finding 2) |
| R-03 | PASS | 375 x 812: no horizontal overflow on 6 pages; 0 controls under 44 px; 0 text under 12 px |
| R-17 | PASS | Each of the 5 numbers shows its source: LFW benchmark, model file size, DO! IAM rollout, test split, measured on a laptop |
| R-18 | PASS | No testimonials |
| R-23 | PASS with a note | Brand, favicon and share image are text placeholders, pending the owner's confirmation. Photos and logos were supplied by the owner |
| R-24 | PASS | Work, Journey, Publications, Contact: 11 in-page links on the home page, 0 broken |
| R-25 | PASS | Computed contrast, both themes, 6 pages: 0 failures (231 elements on the home page; 72, 61, 43, 44 and 15 on the others) |
| R-26 | PASS | See the click-through under R-35. The copy-email button is the one control verified by reading the code, see R-35 |
| R-27 | PASS | Photo viewer: loading text, loaded photo, and an error message when the file is missing (tested with a broken address) |
| R-28 | PASS | No FAQ |
| R-32 | PASS | Tab moves focus in visual order; a 3 px ring is visible (checked on the theme button in the dark theme). The viewer is a native `<dialog>`, so Escape closes it; Escape also closes the mobile menu. Card links draw their ring around the whole card |
| R-33 | PASS | No patch scripts; `scripts/prepare-photos.mjs` only prepares images |
| R-34 | PASS | Light and dark both measured and viewed: hero, case studies, contact block, case study page |
| R-35 | PASS | Production build run (0 errors, 0 warnings, 6 pages) and served locally with its CSP. Click-through: mobile menu opens, Escape closes it, a menu link closes it and goes to #journey; theme button switches dark and light, updates its label and is remembered; receipt buttons give 0.35, 0.40 and 0.45 with their rules; 4 case study links and 2 PDF links return 200; viewer opens, loads, pages with the button and the arrow keys, shows the error state, and closes; on a case page the back link, next link, 3 external buttons and the gallery work; an unknown address returns the 404 page with a link home. Console: only the three 404s caused on purpose by the tests. **Copy email was not clicked:** the test browser denies clipboard access and the fallback would open the mail app, so it was verified by reading the code |
| R-36 | PASS | No security, compliance or performance claims; benchmark figures are labelled as benchmark, not field data |
| R-37 | PASS | Built from `DESIGN.md` |
| R-38 | PASS | The only made-up values are on the sample ticket, which is labelled |
| R-39 | PASS | Base cursor rule; native `<a>` and `<button>` only; icon buttons have `aria-label`; all images have `alt` (empty for decorative ones); hover and active states on every control; no motion runs on its own; `lang`, unique titles, landmarks, one `h1`, no skipped levels; zoom is not blocked |
| R-40 | PASS | All images have width and height; the hero portrait loads eagerly with `fetchpriority="high"`; no third-party scripts. Web Vitals: not measured |

### Block 2: Purpose-Gate

| Rule | Result | Reason on record |
|---|---|---|
| R-01 | PASS | Two gradients: the ticket's perforated edge (motif) and the scrim under the wedding text (legibility) |
| R-04 | PASS | Icons: external link, download, menu, close, theme, GitHub, LinkedIn. Each names an action or a destination |
| R-06 | PASS | Instrument Sans for reading on phones, Newsreader italic for the voice, monospace for machine-made data. No uppercase tracked labels |
| R-07 | PASS | No background pattern |
| R-08 | PASS | Arrow means "leaves the site" |
| R-09 | PASS | One badge: "Sample" on the ticket, which is a real label |
| R-10 | PASS | No backdrop blur |
| R-12 | PASS | Shadow marks objects lying on the page |
| R-13 | PASS | No glow |
| R-14 | PASS | No feature cards; the two photo cards differ in content |
| R-19 | PASS | One entrance motion, matching MOTION 2 |
| R-22 | PASS | No illustrations; visuals are a chart of real results, a labelled sample, text and real screenshots |

### Block 3: Liveliness

| Check | Result | Evidence |
|---|---|---|
| Dials set | Yes | ENERGY 2 / RHYTHM 3 / MOTION 2 in `DESIGN.md` |
| Output matches the dials | Yes | Eight sections, eight compositions; one entrance motion |
| One focal point per screen | Yes | The heading, or the section's one piece of evidence |
| Structural whitespace | Yes | Dashed tear lines and section padding separate the blocks |
| One deliberate accent | Yes | Amber: the marker under one word in the hero, the "Sample" tag |
| Identity motif | Yes | The printed ticket: receipt, dashed rules, numbered labels, line items |
| Design Read declared | Yes | First lines of `DESIGN.md` |

### Block 4: Craftsmanship and Quality Locks

| Check | Result | Evidence |
|---|---|---|
| C-1 | PASS | Reasons recorded in `DESIGN.md` |
| C-2 | PASS | See R-35 |
| C-3 | PASS | Each section holds content the owner has |
| C-4 | PASS | Both themes, 375 px and desktop widths, keyboard |
| C-5 | PASS | Figures carry sources |
| R-05 | PASS | No template layout or fake window |
| R-11 | PASS | Three radii plus circles for portrait and icon buttons |
| R-15 | PASS | Specific calls to action |
| R-16 | PASS | No buzzwords |
| R-20 | PASS | The motif and evidence are specific to this work |
| R-21 | PASS | Follows the system, with a working toggle |
| R-29 | PASS | Two core colours and one accent |
| R-30 | PASS | Not modelled on another product |
| R-31 | PASS | Reasons written down |

## Gate result

**The site passes.** One override is on record: the downloadable PDFs keep their em dashes by the owner's decision (finding 2).

## Open items for the owner

1. Finding 12: confirm the text-only brand, favicon and share image, or supply a logo.
2. The receipt's thresholds (0.35, 0.40, 0.45) and step names come from the project notes; confirm they may be public.
3. Not tested: Safari, real phones, Core Web Vitals.
