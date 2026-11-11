// Turns the originals in assets/ into web-ready masters in src/assets/photos.
//
// - assets/ is git-ignored: originals are large and carry EXIF (the iPhone HEIC even has GPS).
// - Re-encoding with sharp drops all metadata, so the committed copies are clean.
// - Astro then builds the responsive WebP sizes from these masters at build time.
//
// Run after adding or changing a photo:  npm run photos
// (.heic files are converted with macOS `sips`, because sharp cannot decode HEVC.)
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { extname, join } from 'node:path';
import sharp from 'sharp';

const SRC = 'assets';
const OUT = 'src/assets/photos';
const LOGO_OUT = 'src/assets/logos';
const LONG_EDGE = 1800;

// out: file name in src/assets/photos · src: file name in assets/
// crop: region of the original to keep (pixels) · max: longest edge of the result
// logo: true writes to src/assets/logos at high quality
const photos = [
  { out: 'profile', src: 'profile_faishal.jpg', crop: { left: 533, top: 1510, width: 2800, height: 3500 }, max: 1600 },
  { out: 'avatar', src: 'profile_faishal.jpg', crop: { left: 1183, top: 1980, width: 1500, height: 1500 }, max: 640 },
  { out: 'research-team-1', src: 'asisten riset 1.jpg' },
  { out: 'research-team-2', src: 'asisten riset 2.jpg' },
  { out: 'research-lab-1', src: 'asisten all 1.JPG' },
  { out: 'research-lab-2', src: 'asisten all 2.JPG' },
  { out: 'class-tt4402', src: 'kelas 4402.jpg' },
  { out: 'defense-1', src: 'sidang1.heic' },
  { out: 'defense-2', src: 'sidang2.jpg' },
  { out: 'wedding-1', src: 'terang wedding org 1.JPG' },
  { out: 'wedding-2', src: 'terang wedding org 2.jpg' },
  { out: 'wedding-3', src: 'terang wedding org 3.jpg' },
  // Company logos for the experience timeline (shown at 58 px, so 256 px is plenty).
  { out: 'lkt', src: 'lktlogo.jpeg', logo: true, max: 256 },
  { out: 'anj', src: 'anjlogo.png', logo: true, max: 256 },
  { out: 'adaptive-network', src: 'adaptivenetworklablogo.jpeg', logo: true, max: 256 },
  { out: 'bangkit', src: 'bangkitlogo.jpg', logo: true, max: 256 },
  // Simulator screenshots: keep only the phone. The window toolbar above it (top: 197) and the faint
  // window shadow around it (alpha below the floor) are dropped; the site adds its own CSS shadow.
  ...[1, 2, 3].map((n) => ({
    out: `wasteapp-${n}`,
    src: `wasteapp${n}.JPG`,
    cutout: { top: 197, alphaFloor: 90 },
    max: 1400,
    format: 'webp',
  })),
];

// Cuts the phone out of a simulator screenshot: drops the toolbar strip, clears the faint shadow and
// trims the transparent border.
async function cutOutPhone(file, { top, alphaFloor }) {
  const { width, height } = await sharp(file).metadata();
  const { data, info } = await sharp(file)
    .extract({ left: 0, top, width, height: height - top })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let minX = info.width, minY = info.height, maxX = -1, maxY = -1;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < alphaFloor) {
      data[i + 3] = 0;
      continue;
    }
    const pixel = i / 4;
    const x = pixel % info.width;
    const y = Math.floor(pixel / info.width);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).extract({
    left: minX,
    top: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  });
}

mkdirSync(OUT, { recursive: true });
mkdirSync(LOGO_OUT, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), 'photos-'));

for (const job of photos) {
  let input = join(SRC, job.src);
  if (!existsSync(input)) {
    console.warn(`skip  ${job.out}: ${input} not found`);
    continue;
  }
  if (extname(input).toLowerCase() === '.heic') {
    const jpg = join(tmp, `${job.out}.jpg`);
    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '95', input, '--out', jpg], { stdio: 'ignore' });
    input = jpg;
  }

  const max = job.max ?? LONG_EDGE;
  let image = sharp(input).rotate();
  if (job.crop) image = image.extract(job.crop);
  if (job.cutout) image = await cutOutPhone(input, job.cutout);
  image = image.resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true });

  const format = job.format ?? 'jpg';
  const file = join(job.logo ? LOGO_OUT : OUT, `${job.out}.${format}`);
  const info =
    format === 'webp'
      ? await image.webp({ lossless: true }).toFile(file)
      : await image.jpeg({ quality: job.logo ? 92 : 84, mozjpeg: true }).toFile(file);
  console.log(`ok    ${file}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}

rmSync(tmp, { recursive: true, force: true });
