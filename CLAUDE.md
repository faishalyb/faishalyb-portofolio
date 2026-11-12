## Design system: UI UX Pro Max
This branch (`scrolltide`) builds on the `uiuxpromax` design system (UI UX Pro Max skill). It does not use antislop or its DESIGN.md.
The home page follows the scroll-driven override in `design-system/faishal-yusuf-baqir-portfolio/pages/home.md` (estate scene, work reel, inked trail); read it before changing the home page.
For any UI, layout, colour, type or motion work:
- Read the skill first: `.claude/skills/ui-ux-pro-max/SKILL.md`.
- Follow `design-system/faishal-yusuf-baqir-portfolio/MASTER.md`. A page file in `design-system/faishal-yusuf-baqir-portfolio/pages/<page>.md`, when present, overrides it.
- Tokens live in `src/styles/global.css` under the MASTER.md names (`--color-primary`, `--color-accent`, …). Add new colours there, not inline.
- Before handing work back, run the Pre-Delivery Checklist at the end of MASTER.md (contrast 4.5:1, visible focus, reduced motion, 375/768/1024/1440 widths, no horizontal scroll).
- To regenerate or extend the system: `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system -p "Faishal Yusuf Baqir Portfolio" --persist --output-dir .`
