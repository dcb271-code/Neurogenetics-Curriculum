/**
 * Scales all inline font-size values in gen-*.mjs files by a multiplier.
 * Usage: node scripts/scale-font-sizes.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCALE = 1.4; // 40% increase

const files = fs.readdirSync(__dirname)
  .filter(f => f.startsWith("gen-") && f.endsWith(".mjs"))
  .map(f => path.join(__dirname, f));

let totalChanges = 0;

for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  let changes = 0;

  // Match font-size:NNpx patterns (with optional spaces)
  content = content.replace(/font-size:\s*(\d+(?:\.\d+)?)px/g, (match, sizeStr) => {
    const oldSize = parseFloat(sizeStr);
    // Don't scale sizes that are already very large (>60px) or very small (<10px like image credits)
    if (oldSize > 60 || oldSize < 10) return match;
    const newSize = Math.round(oldSize * SCALE);
    changes++;
    return `font-size:${newSize}px`;
  });

  if (changes > 0) {
    fs.writeFileSync(file, content);
    console.log(`${path.basename(file)}: ${changes} font-size values scaled`);
    totalChanges += changes;
  }
}

console.log(`\nTotal: ${totalChanges} font-size values scaled by ${SCALE}x across ${files.length} files`);
