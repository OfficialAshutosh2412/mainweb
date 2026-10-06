/* One-off asset optimisation script (not part of the app bundle).
   Run: node scripts/optimize-images.mjs */
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';

const jobs = [
  // [file, widths] — avatar: 330px box, cover-scaled → needs ~1180px at 2x
  { file: 'src/assets/photo_one.png', base: 'photo_one', widths: [640, 1280], avif: 50, webp: 75 },
];

for (const { file, base, widths, avif, webp } of jobs) {
  const meta = await sharp(file).metadata();
  for (const w of widths) {
    if (w > meta.width) continue;
    const img = sharp(file).resize({ width: w, withoutEnlargement: true });
    const a = await img.avif({ quality: avif }).toBuffer();
    await sharp(a).toFile(`src/assets/${base}-${w}.avif`);
    const p = await img.webp({ quality: webp }).toBuffer();
    await sharp(p).toFile(`src/assets/${base}-${w}.webp`);
  }
}

for (const f of (await readdir('src/assets')).sort()) {
  console.log(f, (await stat(`src/assets/${f}`)).size);
}
