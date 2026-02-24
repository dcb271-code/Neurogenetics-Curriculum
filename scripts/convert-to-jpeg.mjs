import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const slidesDir = path.join(__dirname, "..", "public", "slides");

let total = 0;
let saved = 0;

for (const moduleId of fs.readdirSync(slidesDir)) {
  const moduleDir = path.join(slidesDir, moduleId);
  const stat = fs.statSync(moduleDir);
  if (!stat.isDirectory()) continue;
  
  const files = fs.readdirSync(moduleDir).filter(f => f.endsWith(".png") && f.startsWith("slide-"));
  if (files.length === 0) continue;
  
  console.log(`Converting ${moduleId} (${files.length} slides)...`);
  for (const file of files) {
    const pngPath = path.join(moduleDir, file);
    const jpgPath = pngPath.replace(".png", ".jpg");
    const before = fs.statSync(pngPath).size;
    await sharp(pngPath).jpeg({ quality: 85, mozjpeg: true }).toFile(jpgPath);
    const after = fs.statSync(jpgPath).size;
    total += before;
    saved += (before - after);
    fs.unlinkSync(pngPath);
  }
  
  // Update manifest to note format change
  const manifestPath = path.join(moduleDir, "manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  manifest.format = "jpg";
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}

const totalMB = (total / 1024 / 1024).toFixed(1);
const savedMB = (saved / 1024 / 1024).toFixed(1);
const newMB = ((total - saved) / 1024 / 1024).toFixed(1);
console.log(`\nDone! ${totalMB} MB PNG → ${newMB} MB JPEG (saved ${savedMB} MB)`);
