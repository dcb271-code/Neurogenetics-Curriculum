/**
 * scripts/extract-slides.ts
 *
 * Convert each page of a PDF to a cropped PNG slide image.
 *
 * Usage:
 *   npx tsx scripts/extract-slides.ts <pdf-path> <module-id>
 *
 * Examples:
 *   npx tsx scripts/extract-slides.ts "pdfs/slides/ataxia ppt.pdf" ataxia
 *   npx tsx scripts/extract-slides.ts "pdfs/slides/intro to NG ppt.pdf" intro-neurogenetics
 *
 * Outputs:
 *   public/slides/<module-id>/slide-001.png
 *   public/slides/<module-id>/slide-002.png
 *   ...
 *   public/slides/<module-id>/manifest.json  ← read by SlideGallery component
 *
 * Requirements:
 *   GraphicsMagick OR ImageMagick must be installed and on PATH.
 *     Windows: https://graphicsmagick.org/download.html  (choose "Q8" installer)
 *     macOS:   brew install graphicsmagick
 *     Linux:   sudo apt install graphicsmagick
 */

import { fromPath } from "pdf2pic";
import sharp from "sharp";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// ── Config ─────────────────────────────────────────────────────────────────────

/** Output DPI. 150 keeps file sizes small while remaining readable. */
const DPI = 150;

/**
 * Pixels to crop from each edge of the raw render.
 * 72 px ≈ 1 inch at the PDF's nominal 72 dpi coordinate space —
 * trims slide borders/margins without cutting into content.
 */
const CROP_PX = 72;

// ── Bootstrap ─────────────────────────────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const [, , pdfArg, moduleId] = process.argv;

if (!pdfArg || !moduleId) {
  console.error(
    "Usage: npx tsx scripts/extract-slides.ts <pdf-path> <module-id>"
  );
  console.error("");
  console.error("Quick-start mapping:");
  console.error(
    '  npx tsx scripts/extract-slides.ts "pdfs/slides/intro to NG ppt.pdf"  intro-neurogenetics'
  );
  console.error(
    '  npx tsx scripts/extract-slides.ts "pdfs/slides/Central Dogma.pdf"    central-dogma'
  );
  console.error(
    '  npx tsx scripts/extract-slides.ts "pdfs/slides/mosaicism ppt.pdf"    chromosomes-iscn'
  );
  console.error(
    '  npx tsx scripts/extract-slides.ts "pdfs/slides/Variant Interpretation.pdf" variant-interpretation'
  );
  console.error(
    '  npx tsx scripts/extract-slides.ts "pdfs/slides/ataxia ppt.pdf"       ataxia'
  );
  console.error(
    '  npx tsx scripts/extract-slides.ts "pdfs/slides/epilepsy1.pdf"        epilepsy'
  );
  console.error(
    '  npx tsx scripts/extract-slides.ts "pdfs/slides/mito ppt.pdf"         mitochondrial'
  );
  console.error(
    '  npx tsx scripts/extract-slides.ts "pdfs/slides/methylation ppt.pdf"  epigenetics-neurology'
  );
  console.error(
    '  npx tsx scripts/extract-slides.ts "pdfs/slides/neuromuscular.pdf"    neuronal-signaling'
  );
  process.exit(1);
}

const pdfPath = path.isAbsolute(pdfArg)
  ? pdfArg
  : path.resolve(process.cwd(), pdfArg);

if (!fs.existsSync(pdfPath)) {
  console.error(`\nPDF not found: ${pdfPath}\n`);
  process.exit(1);
}

// ── Directories ────────────────────────────────────────────────────────────────

const outputDir = path.join(ROOT, "public", "slides", moduleId);
const tempDir = path.join(ROOT, ".slide-tmp", moduleId);

fs.mkdirSync(outputDir, { recursive: true });
fs.mkdirSync(tempDir, { recursive: true });

// ── Conversion ─────────────────────────────────────────────────────────────────

console.log(`\nSource PDF : ${path.basename(pdfPath)}`);
console.log(`Module ID  : ${moduleId}`);
console.log(`Output dir : public/slides/${moduleId}/`);
console.log(`DPI        : ${DPI}   Crop : ${CROP_PX}px per edge`);
console.log("\nConverting pages…\n");

const convert = fromPath(pdfPath, {
  density: DPI,
  saveFilename: "page",
  savePath: tempDir,
  format: "png",
});

// -1 converts all pages
const results = await convert.bulk(-1, { responseType: "image" });

let saved = 0;
let totalBytes = 0;

for (const result of results) {
  if (!result.path || !fs.existsSync(result.path)) {
    console.warn(`  ⚠  Page ${result.page ?? "?"} — no output file, skipping`);
    continue;
  }

  const meta = await sharp(result.path).metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;

  // Guard: don't crop more than 1/6 of the dimension on each side
  const cropX = Math.min(CROP_PX, Math.floor(w / 6));
  const cropY = Math.min(CROP_PX, Math.floor(h / 6));
  const newW = w - cropX * 2;
  const newH = h - cropY * 2;

  const pageNum = result.page ?? saved + 1;
  const slideNum = String(pageNum).padStart(3, "0");
  const outFile = path.join(outputDir, `slide-${slideNum}.png`);

  await sharp(result.path)
    .extract({ left: cropX, top: cropY, width: newW, height: newH })
    .png({ compressionLevel: 8 }) // max PNG compression; lossless
    .toFile(outFile);

  const bytes = fs.statSync(outFile).size;
  totalBytes += bytes;
  const sizeKB = Math.round(bytes / 1024);
  console.log(
    `  slide-${slideNum}.png  ${w}×${h} → ${newW}×${newH}  ${sizeKB} KB`
  );
  saved++;
}

// ── Manifest ───────────────────────────────────────────────────────────────────

fs.writeFileSync(
  path.join(outputDir, "manifest.json"),
  JSON.stringify(
    {
      moduleId,
      count: saved,
      dpi: DPI,
      cropPx: CROP_PX,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  )
);

// ── Cleanup ────────────────────────────────────────────────────────────────────

fs.rmSync(tempDir, { recursive: true, force: true });

const totalMB = (totalBytes / 1024 / 1024).toFixed(1);
console.log(
  `\n✓ Done — ${saved} slides, ${totalMB} MB total → public/slides/${moduleId}/`
);
console.log(
  `  Commit the output: git add public/slides/${moduleId}/ && git commit -m "slides: ${moduleId}"`
);
