// Creates lighter copies of the site's images. Build-only: run with `npm run optimize:images`.
// Originals in images/ are never modified or deleted; only the files in OUTPUTS are (re)written.
'use strict';

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES = path.join(__dirname, '..', 'images');

const OUTPUTS = [
  {
    // Shown at most 896px wide (max-w-4xl); 2x would be 1792px, larger than the 1440px source, so keep 1440px.
    src: 'hero-library.png',
    out: 'hero-library.webp',
    make: (img) => img.webp({ quality: 90, smartSubsample: true, effort: 6 }),
  },
  {
    // Nav/footer icon, shown at 28px (h-7) and 24px (h-6): 2x of the largest = 56px.
    src: 'logo.png',
    out: 'logo-56.png',
    make: (img) => img.resize(56, 56).png({ compressionLevel: 9, effort: 10 }),
  },
  {
    // Social preview: 1200px wide, same aspect ratio (height follows, no cropping).
    src: 'og-image.png',
    out: 'og-image.jpg',
    make: (img) => img.resize({ width: 1200 }).jpeg({ quality: 90, mozjpeg: true }),
  },
];

// twitter-card.png is already a JPEG. Re-encoding it does not make it smaller without losing
// quality, so it is copied byte-for-byte to a correctly named .jpg file.
const COPIES = [{ src: 'twitter-card.png', out: 'twitter-card.jpg', expectFormat: 'jpeg' }];

async function main() {
  const sources = new Set([...OUTPUTS, ...COPIES].map((o) => o.src));
  for (const o of [...OUTPUTS, ...COPIES]) {
    if (sources.has(o.out)) throw new Error(`Refusing to overwrite an original image: ${o.out}`);
  }

  const report = [];
  for (const o of OUTPUTS) {
    const srcPath = path.join(IMAGES, o.src);
    const outPath = path.join(IMAGES, o.out);
    const buf = await o.make(sharp(srcPath)).toBuffer();
    fs.writeFileSync(outPath, buf);
    report.push(await describe(o.src, o.out));
  }
  for (const c of COPIES) {
    const srcPath = path.join(IMAGES, c.src);
    const meta = await sharp(srcPath).metadata();
    if (meta.format !== c.expectFormat) throw new Error(`${c.src} is ${meta.format}, expected ${c.expectFormat}`);
    fs.copyFileSync(srcPath, path.join(IMAGES, c.out));
    report.push(await describe(c.src, c.out));
  }
  process.stdout.write(report.join('\n') + '\n');
}

async function describe(src, out) {
  const a = await sharp(path.join(IMAGES, src)).metadata();
  const b = await sharp(path.join(IMAGES, out)).metadata();
  const sa = fs.statSync(path.join(IMAGES, src)).size;
  const sb = fs.statSync(path.join(IMAGES, out)).size;
  return `${src} (${a.format} ${a.width}x${a.height}, ${sa} B) -> ${out} (${b.format} ${b.width}x${b.height}, ${sb} B)`;
}

main().catch((err) => {
  process.stderr.write(`optimize-images failed: ${err.message}\n`);
  process.exit(1);
});
