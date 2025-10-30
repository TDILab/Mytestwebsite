/*
Image conversion script: scans the following source folders and generates responsive AVIF and WebP variants:
 - "website slider image"
 - "service photo"

For each image found (jpg, jpeg, png, webp), the script writes variants at widths [800,1280,1920]
Named: originalName-800.avif, originalName-1280.avif, originalName-1920.avif (and .webp)

Usage: node scripts/convert-images.js
*/

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const SOURCE_DIRS = [
  path.join(ROOT, 'website slider image'),
  path.join(ROOT, 'service photo')
];
const OUTPUT_QUAL = { avif: { quality: 50 }, webp: { quality: 70 } };
const WIDTHS = [800, 1280, 1920];
const EXT_WHITELIST = ['.jpg', '.jpeg', '.png', '.webp'];

async function walk(dir) {
  let results = [];
  const list = await fs.readdir(dir, { withFileTypes: true });
  for (const item of list) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      const sub = await walk(full);
      results = results.concat(sub);
    } else if (item.isFile()) {
      const ext = path.extname(item.name).toLowerCase();
      if (EXT_WHITELIST.includes(ext)) results.push(full);
    }
  }
  return results;
}

async function ensureDir(filePath){
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
}

async function convert(file) {
  const parsed = path.parse(file);
  const base = parsed.name;
  const dir = parsed.dir;
  const relDir = path.relative(ROOT, dir);

  console.log('Converting:', path.relative(ROOT, file));

  for (const w of WIDTHS) {
    const outAvif = path.join(dir, `${base}-${w}.avif`);
    const outWebp = path.join(dir, `${base}-${w}.webp`);

    try {
      const input = sharp(file).rotate();
      await ensureDir(outAvif);
      await input
        .resize({ width: w })
        .avif(OUTPUT_QUAL.avif)
        .toFile(outAvif);
      await ensureDir(outWebp);
      await input
        .resize({ width: w })
        .webp(OUTPUT_QUAL.webp)
        .toFile(outWebp);
      console.log('  wrote', path.relative(ROOT, outAvif), path.relative(ROOT, outWebp));
    } catch (e) {
      console.error('  error converting', file, e.message);
    }
  }
}

(async function main(){
  try{
    for (const dir of SOURCE_DIRS) {
      try{
        const exists = await fs.stat(dir).then(s=>s.isDirectory()).catch(()=>false);
        if (!exists) {
          console.warn('Source dir not found, skipping:', dir);
          continue;
        }
        const files = await walk(dir);
        for (const f of files) {
          await convert(f);
        }
      }catch(e){
        console.error('Error scanning dir', dir, e.message);
      }
    }
    console.log('Done.');
  }catch(e){
    console.error(e);
    process.exit(1);
  }
})();
