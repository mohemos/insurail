/**
 * Renders the SVG mark into every raster icon the site needs.
 *   pnpm icons
 *
 * Outputs
 *   app/favicon.ico            16 / 32 / 48 px (PNG-in-ICO)
 *   app/icon1.png              32 px
 *   app/apple-icon.png         180 px, opaque tile (iOS ignores transparency)
 *   public/icons/icon-192.png, icon-512.png     rounded tile on transparent
 *   public/icons/maskable-512.png               full-bleed tile with safe padding
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const PRIMARY = "#0f5b57";
const MARK_PATH = "M4 11.5H10.5V17C10.5 21 13 23.5 16 25C19 23.5 21.5 21 21.5 17V11.5H28";

const roundedTile = await readFile(join(root, "app/icon0.svg"));

/** Full-bleed square (no rounded corners) with the mark scaled to leave a safe margin. */
function fullBleedSvg(markScale) {
  const offset = (32 - 32 * markScale) / 2;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="${PRIMARY}"/>
  <g transform="translate(${offset} ${offset}) scale(${markScale})">
    <path d="${MARK_PATH}" fill="none" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`);
}

async function png(svg, size) {
  return sharp(svg, { density: 384 }).resize(size, size).png().toBuffer();
}

/** Wrap PNG buffers in an ICO container (PNG entries are valid in ICO). */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  const entries = [];
  let offset = 6 + 16 * images.length;
  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...images.map((image) => image.data)]);
}

await mkdir(join(root, "public/icons"), { recursive: true });

const [ico16, ico32, ico48] = await Promise.all([png(roundedTile, 16), png(roundedTile, 32), png(roundedTile, 48)]);
await writeFile(join(root, "app/favicon.ico"), ico([
  { size: 16, data: ico16 },
  { size: 32, data: ico32 },
  { size: 48, data: ico48 },
]));
await writeFile(join(root, "app/icon1.png"), ico32);
await writeFile(join(root, "app/apple-icon.png"), await png(fullBleedSvg(0.8), 180));
await writeFile(join(root, "public/icons/icon-192.png"), await png(roundedTile, 192));
await writeFile(join(root, "public/icons/icon-512.png"), await png(roundedTile, 512));
await writeFile(join(root, "public/icons/maskable-512.png"), await png(fullBleedSvg(0.6), 512));

console.log("Icons written: app/favicon.ico, app/icon1.png, app/apple-icon.png, public/icons/*.png");
