/**
 * Resize + encode PNG/JPEG assets to WebP for faster loads.
 * Run: npm run optimize:images
 * Remove sources after success: npm run optimize:images -- --delete-sources
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const deleteSources = process.argv.includes('--delete-sources');

/** @type {{ rel: string; maxWidth: number; quality?: number }[]} */
const jobs = [
  { rel: 'src/assets/images/Motor-Hero.png', maxWidth: 1920, quality: 84 },
  { rel: 'src/assets/images/CargoHome.png', maxWidth: 1600, quality: 84 },
  { rel: 'src/assets/icons/Motor-TwoWheeler.png', maxWidth: 256, quality: 90 },
  { rel: 'src/assets/icons/Motor-ThreeWheeler.png', maxWidth: 256, quality: 90 },
  { rel: 'src/assets/icons/Motor-FourWheeler.png', maxWidth: 256, quality: 90 },
  { rel: 'src/assets/icons/Motor-Commercial.png', maxWidth: 256, quality: 90 },
  { rel: 'src/assets/icons/Parent-Motor.png', maxWidth: 640, quality: 86 },
  { rel: 'src/assets/icons/Parent-Cargo.png', maxWidth: 640, quality: 86 },
  { rel: 'src/assets/icons/Parent-Health.png', maxWidth: 640, quality: 86 },
  { rel: 'src/assets/icons/Parent-Term.png', maxWidth: 640, quality: 86 },
  { rel: 'src/assets/icons/Parent-Business.png', maxWidth: 640, quality: 86 },
  { rel: 'src/assets/icons/Business-Disaster.png', maxWidth: 480, quality: 86 },
  { rel: 'src/assets/icons/Business-Equipment.png', maxWidth: 480, quality: 86 },
  { rel: 'src/assets/icons/Fire-Business.png', maxWidth: 480, quality: 86 },
  { rel: 'src/assets/icons/Business-theft.png', maxWidth: 480, quality: 86 },
  { rel: 'public/images/Business-fire.png', maxWidth: 1280, quality: 84 },
  { rel: 'public/images/Business-theft.png', maxWidth: 1280, quality: 84 },
  { rel: 'public/images/Business-Natural.png', maxWidth: 1280, quality: 84 },
  { rel: 'public/images/Business-Equipment.png', maxWidth: 1280, quality: 84 },
  { rel: 'public/images/Contact-Us.png', maxWidth: 1600, quality: 84 },
  { rel: 'public/images/health/hero.png', maxWidth: 1400, quality: 84 },
  { rel: 'public/images/health/matters.png', maxWidth: 1400, quality: 84 },
  { rel: 'public/images/health/About-Health.png', maxWidth: 1400, quality: 84 },
];

async function optimizeOne({ rel, maxWidth, quality = 86 }) {
  const inputAbs = path.join(root, rel);
  const outRel = rel.replace(/\.(png|jpe?g)$/i, '.webp');
  const outAbs = path.join(root, outRel);

  let inputStat;
  try {
    inputStat = await fs.stat(inputAbs);
  } catch {
    try {
      await fs.stat(outAbs);
      console.log(`[skip] ${rel} (source removed; ${path.relative(root, outRel)} present)`);
    } catch {
      console.warn(`[skip] missing: ${rel}`);
    }
    return;
  }

  const meta = await sharp(inputAbs).metadata();
  let pipeline = sharp(inputAbs).rotate();
  if (meta.width && meta.width > maxWidth) {
    pipeline = pipeline.resize({
      width: maxWidth,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  await pipeline.webp({ quality, effort: 6 }).toFile(outAbs);

  const outStat = await fs.stat(outAbs);
  const inKb = (inputStat.size / 1024).toFixed(1);
  const outKb = (outStat.size / 1024).toFixed(1);
  console.log(`OK ${rel} -> ${path.relative(root, outRel)} (${inKb} KB -> ${outKb} KB)`);

  if (deleteSources && rel !== outRel) {
    await fs.unlink(inputAbs);
    console.log(`   deleted source ${rel}`);
  }
}

for (const job of jobs) {
  await optimizeOne(job);
}

console.log(deleteSources ? 'Done (sources removed).' : 'Done. Commit .webp files; run with --delete-sources to remove originals.');
