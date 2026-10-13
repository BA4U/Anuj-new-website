// Generate favicon.ico from SVG using sharp
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const svgPath = path.join(__dirname, "..", "app", "icon.svg");
const outPath = path.join(__dirname, "..", "app", "favicon.ico");

const svg = fs.readFileSync(svgPath);

async function generateIco() {
  // Generate multiple size PNGs
  const sizes = [16, 32, 48, 256];
  const pngBuffers = await Promise.all(
    sizes.map((size) => sharp(svg).resize(size, size).png().toBuffer())
  );

  // Build ICO file
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = 1 (icon)
  header.writeUInt16LE(pngBuffers.length, 4); // count

  const entries = [];
  let dataOffset = 6 + 16 * pngBuffers.length;

  for (let i = 0; i < pngBuffers.length; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0); // width
    entry.writeUInt8(size === 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // colors
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(buf.length, 8); // size
    entry.writeUInt32LE(dataOffset, 12); // offset
    entries.push(entry);
    dataOffset += buf.length;
  }

  const ico = Buffer.concat([header, ...entries, ...pngBuffers]);
  fs.writeFileSync(outPath, ico);
  console.log(`Generated favicon.ico (${ico.length} bytes)`);
}

generateIco().catch((e) => {
  console.error(e);
  process.exit(1);
});
