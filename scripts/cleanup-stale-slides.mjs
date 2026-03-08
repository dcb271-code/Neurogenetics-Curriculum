import fs from "fs";
import path from "path";

const slidesDir = "public/slides";
let total = 0;

for (const mod of fs.readdirSync(slidesDir)) {
  const dir = path.join(slidesDir, mod);
  const mf = path.join(dir, "manifest.json");
  if (!fs.statSync(dir).isDirectory() || !fs.existsSync(mf)) continue;

  const { count } = JSON.parse(fs.readFileSync(mf, "utf8"));
  const files = fs.readdirSync(dir).filter(f => /^slide-\d+\.(jpg|png)$/.test(f)).sort();

  for (const f of files) {
    const num = parseInt(f.match(/slide-(\d+)/)[1], 10);
    if (num > count) {
      fs.unlinkSync(path.join(dir, f));
      console.log(`  Removed ${mod}/${f} (manifest count=${count})`);
      total++;
    }
  }
}
console.log(`\nCleaned ${total} stale slide files`);
