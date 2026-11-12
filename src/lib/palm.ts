/**
 * Procedural oil palm silhouettes for the estate scene (src/components/EstateScene.astro).
 * Everything is generated at build time and is deterministic: the same seed draws the same tree.
 *
 * A palm is two paths drawn in `currentColor`: a filled one (trunk, crown base, fruit bunches)
 * and a stroked one (the fronds). The origin is the foot of the trunk and y grows downward,
 * so a tree is placed with a single `translate(x y) scale(s)`.
 */

const DEG = Math.PI / 180;

/** Small seeded generator (mulberry32). */
export const seeded = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/** Path data with whole numbers: "M10 20L-3-4" (a minus sign already separates two numbers). */
const pts = (cmd: string, ...n: number[]) =>
  cmd +
  n
    .map((v, i) => {
      const r = Math.round(v);
      return i > 0 && r >= 0 ? ` ${r}` : `${r}`;
    })
    .join('');

type FrondOptions = {
  x: number;
  y: number;
  /** Degrees from straight up; positive leans right. */
  angle: number;
  length: number;
  /** How far the frond bends towards the ground over its length, in degrees. */
  droop: number;
  /** Leaflet pairs along the rachis. */
  samples: number;
  /** Longest leaflet. */
  leaf: number;
  rand: () => number;
};

type Frond = {
  rachis: [number, number][];
  /** Each leaflet as base x, base y, tip x, tip y. */
  leaflets: [number, number, number, number][];
};

/** One pinnate frond: an arching rachis with leaflets that sweep forward and sag. */
function frond({ x, y, angle, length, droop, samples, leaf, rand }: FrondOptions): Frond {
  const side = Math.abs(angle) < 8 ? (rand() < 0.5 ? -1 : 1) : Math.sign(angle);
  const step = length / samples;
  const rachis: [number, number][] = [[x, y]];
  const leaflets: Frond['leaflets'] = [];
  let px = x;
  let py = y;

  for (let k = 1; k <= samples; k++) {
    const t = k / samples;
    const bend = Math.max(-172, Math.min(172, angle + side * droop * Math.pow(t, 1.2)));
    px += Math.sin(bend * DEG) * step;
    py -= Math.cos(bend * DEG) * step;
    rachis.push([px, py]);
    if (t < 0.07) continue;

    // Short at the base, longest before the middle, short again at the tip.
    const profile = Math.pow(Math.sin(Math.PI * (0.1 + 0.84 * t)), 0.7);
    const sweep = 64 - 36 * t;
    for (const s of [-1, 1]) {
      const a = (bend + s * (sweep + (rand() - 0.5) * 16)) * DEG;
      // Leaflets hang: pull every one towards the ground, then renormalise.
      let dx = Math.sin(a);
      let dy = -Math.cos(a) + 0.5 + rand() * 0.4;
      const norm = Math.hypot(dx, dy) || 1;
      dx /= norm;
      dy /= norm;
      const len = leaf * profile * (0.8 + rand() * 0.4);
      leaflets.push([px, py, px + dx * len, py + dy * len]);
    }
  }
  return { rachis, leaflets };
}

export type PalmOptions = {
  seed: number;
  /** Trunk height. */
  height: number;
  /** Trunk width at mid height. */
  width: number;
  /** Frond length. */
  reach: number;
  fronds: number;
  /** Leaflet pairs per frond: more is finer and heavier. */
  samples: number;
  /** Sideways drift of the crown, as a fraction of the height. */
  lean?: number;
};

export type Palm = {
  /** Filled: trunk, crown base and fruit bunches. */
  fill: string;
  /** Stroked: rachises and leaflets. */
  stroke: string;
};

/** A mature oil palm: stout scarred trunk, fruit bunches under a full, drooping crown. */
export function palm({ seed, height, width, reach, fronds, samples, lean = 0 }: PalmOptions): Palm {
  const rand = seeded(seed);
  const half = width / 2;
  const centre = (t: number) => lean * height * t * t;
  // Swollen foot, straight middle, a little wider where the old frond bases sit.
  const girth = (t: number) => half * (1 + 0.34 * Math.exp(-t / 0.05) + 0.34 * Math.pow(t, 4));

  // Trunk outline, with a saw edge for the frond-base scars.
  const rows = Math.max(8, Math.round(height / (width * 0.3)));
  const left: number[] = [];
  const right: number[] = [];
  for (let i = 0; i <= rows; i++) {
    const t = i / rows;
    const notch = i % 2 ? width * (0.05 + rand() * 0.05) : 0;
    left.push(centre(t) - girth(t) - notch, -height * t);
    right.unshift(centre(t) + girth(t) + notch, -height * t);
  }
  let fill = pts('M', left[0], left[1]) + pts('L', ...left.slice(2), ...right) + 'Z';

  // Crown base and fruit bunches tucked under it.
  const cx = centre(1);
  const cy = -height;
  const blob = (bx: number, by: number, rx: number, ry: number) =>
    pts('M', bx - rx, by) + pts('A', rx, ry, 0, 1, 1, bx + rx, by) + pts('A', rx, ry, 0, 1, 1, bx - rx, by) + 'Z';
  fill += blob(cx, cy - width * 0.15, width * 0.95, width * 0.8);
  const bunches = 2 + Math.floor(rand() * 2);
  for (let i = 0; i < bunches; i++) {
    const s = i % 2 ? 1 : -1;
    fill += blob(cx + s * width * (0.5 + rand() * 0.25), cy + width * (0.3 + rand() * 0.35), width * 0.36, width * 0.46);
  }

  // Fronds fan out from the crown: upright spears on top, old fronds hanging below the horizontal.
  const spread = 152;
  let stroke = '';
  for (let i = 0; i < fronds; i++) {
    const base = -spread + ((i + 0.5) / fronds) * spread * 2;
    const angle = base + (rand() - 0.5) * (spread / fronds) * 1.5;
    const low = Math.abs(angle) > 105;
    const upright = Math.abs(angle) < 25;
    const length = reach * (0.66 + rand() * 0.34) * (low ? 0.86 : upright ? 0.9 : 1);
    const f = frond({
      x: cx + Math.sin(angle * DEG) * width * 0.3,
      y: cy - width * 0.25,
      angle,
      length,
      droop: 26 + 52 * Math.abs(Math.sin(angle * DEG)) + rand() * 16,
      samples,
      leaf: reach * (upright ? 0.2 : 0.27),
      rand,
    });
    stroke += pts('M', ...f.rachis[0]) + pts('L', ...f.rachis.slice(1).flat());
    for (const l of f.leaflets) stroke += pts('M', l[0], l[1]) + pts('L', l[2], l[3]);
  }
  return { fill, stroke };
}

/**
 * A single frond seen close up, for the foreground frame. Leaflets are filled blades
 * (thin strokes would look like wire at this size). Returns one filled path.
 */
export function bigFrond(options: { seed: number; angle: number; length: number; droop: number; samples: number; leaf: number }): string {
  const rand = seeded(options.seed);
  const f = frond({ x: 0, y: 0, rand, ...options });
  let d = '';
  // The rachis as a tapering ribbon.
  const n = f.rachis.length;
  const up: number[] = [];
  const down: number[] = [];
  for (let i = 0; i < n; i++) {
    const [x, y] = f.rachis[i];
    const [nx, ny] = f.rachis[Math.min(i + 1, n - 1)];
    const [qx, qy] = f.rachis[Math.max(i - 1, 0)];
    const len = Math.hypot(nx - qx, ny - qy) || 1;
    const w = (options.length / 70) * (1 - (i / n) * 0.85);
    const ox = (-(ny - qy) / len) * w;
    const oy = ((nx - qx) / len) * w;
    up.push(x + ox, y + oy);
    down.unshift(x - ox, y - oy);
  }
  d += pts('M', up[0], up[1]) + pts('L', ...up.slice(2), ...down) + 'Z';
  // Each leaflet: a blade with a curved back, wide at the rachis and pointed at the tip.
  for (const [x1, y1, x2, y2] of f.leaflets) {
    const len = Math.hypot(x2 - x1, y2 - y1) || 1;
    const w = Math.max(2.5, len * 0.055);
    const ux = (x2 - x1) / len;
    const uy = (y2 - y1) / len;
    const mx = x1 + ux * len * 0.45;
    const my = y1 + uy * len * 0.45;
    d += pts('M', x1 - ux * w, y1 - uy * w) + pts('Q', mx - uy * w * 1.6, my + ux * w * 1.6, x2, y2) + pts('Q', mx + uy * w * 1.2, my - ux * w * 1.2, x1 + ux * w, y1 + uy * w) + 'Z';
  }
  return d;
}

/** A rolling ground line from x0 to x1, closed down to `floor`. `bumps` are [x, height] pairs. */
export function ridge(options: { seed: number; x0: number; x1: number; y: number; rough: number; step: number; floor: number }): string {
  const rand = seeded(options.seed);
  const { x0, x1, y, rough, step, floor } = options;
  // Two slow sine waves plus a little noise read as low hills, not as a zigzag.
  const p1 = rand() * 6.28;
  const p2 = rand() * 6.28;
  const span = x1 - x0;
  let d = pts('M', x0, floor) + pts('L', x0, y);
  for (let x = x0; x <= x1; x += step) {
    const t = (x - x0) / span;
    const h = Math.sin(t * 6.28 * 1.3 + p1) * rough + Math.sin(t * 6.28 * 3.1 + p2) * rough * 0.4 + (rand() - 0.5) * rough * 0.25;
    d += pts('L', x, y + h);
  }
  return d + pts('L', x1, floor) + 'Z';
}

/** Tufts of fern and grass along a ground line: short curved blades, as one stroked path. */
export function undergrowth(options: { seed: number; x0: number; x1: number; y: number; height: number; gap: number }): string {
  const rand = seeded(options.seed);
  let d = '';
  for (let x = options.x0; x <= options.x1; x += options.gap * (0.6 + rand() * 0.8)) {
    const blades = 3 + Math.floor(rand() * 4);
    for (let i = 0; i < blades; i++) {
      const a = (-60 + rand() * 120) * DEG;
      const h = options.height * (0.45 + rand() * 0.55);
      const tx = x + Math.sin(a) * h;
      const ty = options.y - Math.cos(a) * h * 0.9;
      d += pts('M', x, options.y + 4) + pts('Q', x + Math.sin(a) * h * 0.2, options.y - h * 0.75, tx, ty);
    }
  }
  return d;
}

/** Evenly scattered points, for stars and drifting motes: [x, y, radius]. */
export function scatter(options: { seed: number; count: number; x0: number; x1: number; y0: number; y1: number; r0: number; r1: number }): [number, number, number][] {
  const rand = seeded(options.seed);
  return Array.from({ length: options.count }, () => [
    Math.round(options.x0 + rand() * (options.x1 - options.x0)),
    Math.round(options.y0 + rand() * (options.y1 - options.y0)),
    Math.round((options.r0 + rand() * (options.r1 - options.r0)) * 10) / 10,
  ]);
}

/**
 * A palm far away: a spiky filled crown on a stub of trunk, light enough to repeat a hundred times.
 * Drawn about 100 units tall with the foot at the origin.
 */
export function tinyPalm(seed: number): string {
  const rand = seeded(seed);
  const top = -58;
  let d = 'M-4 0L-3' + pts('', top) + 'L3' + pts('', top) + 'L4 0Z';
  const blades = 11;
  for (let i = 0; i < blades; i++) {
    const a = (-150 + (i / (blades - 1)) * 300 + (rand() - 0.5) * 14) * DEG;
    const len = 34 + rand() * 14;
    const tx = Math.sin(a) * len;
    const ty = top - Math.cos(a) * len * 0.8 + Math.abs(Math.sin(a)) * len * 0.45;
    const mx = Math.sin(a) * len * 0.55;
    const my = top - Math.cos(a) * len * 0.75 - 4;
    d += pts('M', -5, top) + pts('Q', mx - 3, my - 5, tx, ty) + pts('Q', mx + 3, my + 6, 5, top + 3) + 'Z';
  }
  return d;
}
