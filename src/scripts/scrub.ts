/**
 * Scroll-scrubbed animation without a library.
 *
 * A track measures its own progress from the layout and renders it. Values ease towards the
 * scroll position, so a mouse wheel's steps turn into a short glide instead of a jump. One
 * animation frame loop serves every track on the page and stops when nothing is moving.
 */

export const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

/** Where `value` sits between `from` and `to`, clamped to 0–1. */
export const range = (value: number, from: number, to: number) => clamp((value - from) / (to - from));

export const ease = {
  out: (t: number) => 1 - Math.pow(1 - t, 3),
  inOut: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
};

type Track = {
  measure: () => number;
  render: (value: number) => void;
  value: number;
  target: number;
  drawn: number;
};

const tracks: Track[] = [];
let running = false;
let last = 0;

function frame(now: number) {
  const elapsed = Math.min(now - last, 64);
  last = now;
  // Read every track first, then write, so the browser lays out once per frame.
  for (const track of tracks) track.target = track.measure();
  const pull = 1 - Math.exp(-elapsed / 110);
  let moving = false;
  for (const track of tracks) {
    const gap = track.target - track.value;
    if (Math.abs(gap) < 0.0004) {
      track.value = track.target;
    } else {
      track.value += gap * pull;
      moving = true;
    }
    if (track.value !== track.drawn) {
      track.render(track.value);
      track.drawn = track.value;
    }
  }
  running = moving;
  if (moving) requestAnimationFrame(frame);
}

function wake() {
  if (running) return;
  running = true;
  last = performance.now();
  requestAnimationFrame(frame);
}

/**
 * Follow the scroll: `measure` returns the current progress (any number range the caller likes),
 * `render` draws it. The first frame is drawn at once, with no glide from zero.
 */
export function scrub(measure: () => number, render: (value: number) => void) {
  const value = measure();
  tracks.push({ measure, render, value, target: value, drawn: value });
  render(value);
  if (tracks.length === 1) {
    addEventListener('scroll', wake, { passive: true });
    addEventListener('resize', wake);
  }
}
