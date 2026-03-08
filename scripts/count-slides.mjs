import fs from "fs";
import path from "path";

let totalSlides = 0;
let totalMB = 0;
const mods = fs.readdirSync("public/slides")
  .filter(d => fs.statSync(path.join("public/slides", d)).isDirectory())
  .sort();

for (const mod of mods) {
  const mf = path.join("public/slides", mod, "manifest.json");
  if (!fs.existsSync(mf)) { console.log(mod + ": NO MANIFEST"); continue; }
  const m = JSON.parse(fs.readFileSync(mf, "utf8"));
  const files = fs.readdirSync(path.join("public/slides", mod))
    .filter(f => /^slide-\d+\.(jpg|png)$/.test(f));
  const bytes = files.reduce((s, f) =>
    s + fs.statSync(path.join("public/slides", mod, f)).size, 0);
  const mb = (bytes / 1024 / 1024).toFixed(1);
  totalSlides += m.count;
  totalMB += bytes / 1024 / 1024;
  const gen = m.generator || "pdf-extract";
  console.log(
    mod.padEnd(30) + String(m.count).padStart(3) + " slides  " +
    mb.padStart(5) + " MB  [" + gen + "]  files=" + files.length
  );
}
console.log("─".repeat(65));
console.log(
  "TOTAL".padEnd(30) + String(totalSlides).padStart(3) + " slides  " +
  totalMB.toFixed(1).padStart(5) + " MB"
);
