// Simple ICO generator using ico package
const ico = require("ico");
const fs = require("fs");
const path = require("path");

const svgPath = path.join(__dirname, "..", "app", "icon.svg");
const outPath = path.join(__dirname, "..", "app", "favicon.ico");

// Read the SVG
const svgContent = fs.readFileSync(svgPath, "utf8");

// Convert SVG to a simple ICO manually
// Since SVG to ICO conversion is complex, we'll create a minimal 32x32 ICO

function createMinimalIco() {
  // Create a simple 16x16 and 32x32 ICO
  // For simplicity, we'll create a 32x32 BMP-based ICO
  
  // A proper ICO requires multiple images, but we'll create a minimal one
  const width = 32;
  const height = 32;
  
  // BMP header for 32x32 32-bit BMP
  const bmpHeader = Buffer.alloc(54);
  bmpHeader.writeUInt32LE(54 + width * height * 4, 2); // file size (header + pixel data)
  bmpHeader.writeUInt32LE(40, 14); // DIB header size
  bmpHeader.writeUInt16LE(width, 18);
  bmpHeader.writeUInt16LE(height * 2, 22); // height includes XOR+AND masks
  bmpHeader.writeUInt16LE(1, 26); // planes
  bmpHeader.writeUInt16LE(32, 28); // bits per pixel
  
  // Pixel data - blue background with white 'A'
  const pixelData = Buffer.alloc(width * height * 4);
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const offset = (y * width + x) * 4;
      // Blue background: #4936e6
      // BGRA format for BMP
      pixelData[offset + 2] = 0xE6; // R
      pixelData[offset + 1] = 0x36; // G  
      pixelData[offset] = 0x49;     // B
      pixelData[offset + 3] = 0xFF; // Alpha
    }
  }
  
  // Write 'A' in the center (simple approximation)
  const startX = Math.floor(width / 2) - 3;
  const startY = Math.floor(height / 2) - 3;
  for (let y = startY; y < startY + 6; y++) {
    for (let x = startX; x < startX + 6; x++) {
      if (x >= 0 && x < width && y >= 0 && y < 48) {
        const offset = (y * width + x) * 4;
        pixelData[offset + 2] = 0xFF; // R
        pixelData[offset + 1] = 0xFF; // G
        pixelData[offset] = 0xFF;     // B
        pixelData[offset + 3] = 0xFF; // Alpha
      }
    }
  }
  
  // Combine header and pixel data
  const bmp = Buffer.concat([bmpHeader, pixelData]);
  
  return bmp;
}

try {
  const bmp = createMinimalIco();
  fs.writeFileSync(outPath, bmp);
  console.log("Generated favicon.ico");
} catch (e) {
  console.error(e);
  process.exit(1);
}