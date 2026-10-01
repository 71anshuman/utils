/**
 * Generates raster favicons from public/favicon.svg at build time, so the
 * repo only has to keep the SVG source:
 *   build/favicon.ico              (16, 32, 48 px, PNG-in-ICO)
 *   build/logo192.png, logo512.png (PWA manifest)
 *   build/apple-touch-icon.png     (180 px)
 * Uses the puppeteer Chrome already required by generate-routes-seo.js.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SVG_PATH = path.join(ROOT, 'public', 'favicon.svg');
const OUT_DIR = process.argv[2] ? path.resolve(process.argv[2]) : path.join(ROOT, 'build');

async function renderPngs(sizes) {
  const puppeteer = require('puppeteer');
  const svg = fs.readFileSync(SVG_PATH, 'utf8');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const out = {};
  try {
    const page = await browser.newPage();
    for (const size of sizes) {
      await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
      await page.setContent(
        `<html><body style="margin:0;background:transparent">` +
          svg.replace(/width="\d+" height="\d+"/, `width="${size}" height="${size}"`) +
          `</body></html>`
      );
      out[size] = await page.screenshot({ type: 'png', omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
    }
  } finally {
    await browser.close();
  }
  return out;
}

// ICO container with PNG-encoded images (supported by all modern browsers/OSes).
function buildIco(pngs) {
  const count = pngs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);
  const dirSize = 16 * count;
  let offset = 6 + dirSize;
  const entries = [];
  const images = [];
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width
    e.writeUInt8(size >= 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(e);
    images.push(data);
  }
  return Buffer.concat([header, ...entries, ...images]);
}

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const pngs = await renderPngs([16, 32, 48, 180, 192, 512]);
  fs.writeFileSync(path.join(OUT_DIR, 'favicon.ico'), buildIco([16, 32, 48].map((s) => ({ size: s, data: pngs[s] }))));
  fs.writeFileSync(path.join(OUT_DIR, 'apple-touch-icon.png'), pngs[180]);
  fs.writeFileSync(path.join(OUT_DIR, 'logo192.png'), pngs[192]);
  fs.writeFileSync(path.join(OUT_DIR, 'logo512.png'), pngs[512]);
  console.log(`Icons written to ${path.relative(ROOT, OUT_DIR)}/ (favicon.ico, apple-touch-icon.png, logo192.png, logo512.png)`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
