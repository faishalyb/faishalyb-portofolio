/**
 * The two field phases in CaseVisual 'field', played by the scroll: Phase 1 taps an NFC tag to a
 * phone, then Phase 2 prints a harvest ticket on a Bluetooth thermal printer.
 *
 * One value from 0 to 1 plays both in turn. The script only writes custom properties on the
 * figure (`--tap`, `--read`, `--feed`, `--busy`); the CSS turns them into transforms. The CSS
 * defaults are the finished state, so without JavaScript or with reduced motion the figure shows
 * both phases done.
 */
import { clamp, ease, range } from './scrub';

/** Moments along the 0–1 timeline. The last stretch holds the finished ticket before the reel moves on. */
const TAP = [0.06, 0.3] as const; // the tag moves to the phone
const READ = [0.28, 0.42] as const; // the signal rings out and the phone shows the record
const FEED = [0.5, 0.92] as const; // the ticket comes out of the printer, top line first

export function fieldPlayer(figure: HTMLElement) {
  const [first, second] = figure.querySelectorAll<HTMLElement>('.phase');
  const set = (name: string, value: number) => figure.style.setProperty(name, value.toFixed(4));

  const render = (t: number) => {
    const feed = range(t, ...FEED);
    set('--tap', ease.inOut(range(t, ...TAP)));
    set('--read', range(t, ...READ));
    set('--feed', feed);
    // The printer's light is on while paper moves
    set('--busy', clamp(Math.min(feed, 1 - feed) * 12));
  };

  /**
   * Progress when the figure is not pinned: each phase plays while it is in full view, from its
   * foot showing at the bottom of the screen to its top nearing the header. Side by side, both
   * phases share one pass; stacked (phones), each phase gets its own.
   */
  const passing = () => {
    if (!first || !second) return 1;
    const a = first.getBoundingClientRect();
    const b = second.getBoundingClientRect();
    if (b.top > a.bottom - 1) {
      const later = through(b);
      return later > 0 ? 0.46 + 0.54 * later : 0.46 * through(a);
    }
    return through(figure.getBoundingClientRect());
  };

  return { render, passing };
}

/** 0 when the box's foot is at 95% of the screen height, 1 when its top reaches 15%. */
function through(box: DOMRect) {
  const span = Math.max(innerHeight * 0.8 - box.height, 160);
  return clamp((innerHeight * 0.95 - box.bottom) / span);
}
