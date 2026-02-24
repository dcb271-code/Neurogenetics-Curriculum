/**
 * scripts/extract-slides.ts
 *
 * Convert each page of a PDF to a cropped PNG slide image.
 * Uses pdfjs-dist + @napi-rs/canvas (pure Node.js — no system deps required).
 *
 * Usage:
 *   npm run extract-slides <pdf-path> <module-id>
 *
 * Examples:
 *   npm run extract-slides "pdfs/slides/ataxia ppt.pdf" ataxia
 *   npm run extract-slides "pdfs/slides/intro to NG ppt.pdf" intro-neurogenetics
 *
 * Outputs:
 *   public/slides/<module-id>/slide-001.png
 *   public/slides/<module-id>/slide-002.png
 *   ...
 *   public/slides/<module-id>/manifest.json  ← read by SlidePresenter component
 */

// Use the legacy build — required in Node.js (avoids DOMMatrix / browser-only API errors)
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { createCanvas } from "@napi-rs/canvas";
import sharp from "sharp";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// ── Config ─────────────────────────────────────────────────────────────────────

/** Render scale factor. 2.0 ≈ 144 DPI equivalent — sharp but not huge files. */
const SCALE = 2.0;

/**
 * Pixels to crop from each edge of the raw render (at SCALE×).
 * Trims slide borders/margins without cutting into content.
 */
const CROP_PX = 20;

// ── Point pdfjs to its bundled worker file ────────────────────────────────────
// Node.js has no browser worker, so we give pdfjs the path to the worker module.
// @ts-ignore — type mismatch between pdfjs-dist versions; works at runtime
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "../node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs",
  import.meta.url
).href;

// ── Bootstrap ─────────────────────────────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const [, , pdfArg, moduleId] = process.argv;

if (!pdfArg || !moduleId) {
  console.error(
    "Usage: npm run extract-slides <pdf-path> <module-id>"
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
fs.mkdirSync(outputDir, { recursive: true });

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\nSource PDF : ${path.basename(pdfPath)}`);
  console.log(`Module ID  : ${moduleId}`);
  console.log(`Output dir : public/slides/${moduleId}/`);
  console.log(`Scale      : ${SCALE}×   Crop : ${CROP_PX}px per edge`);
  console.log("\nConverting pages…\n");

  const pdfData = new Uint8Array(fs.readFileSync(pdfPath));
  const pdf = await pdfjsLib.getDocument({
    data: pdfData,
    verbosity: 0,
  }).promise;

  let saved = 0;
  let totalBytes = 0;

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: SCALE });

    const canvasWidth = Math.ceil(viewport.width);
    const canvasHeight = Math.ceil(viewport.height);

    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext("2d");

    // Fill white background (PDFs may have transparent bg)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    await page.render({
      canvasContext: ctx as unknown as CanvasRenderingContext2D,
      viewport,
    }).promise;

    const rawBuffer = canvas.toBuffer("image/png");

    // Crop edges with sharp
    const cropX = Math.min(CROP_PX, Math.floor(canvasWidth / 8));
    const cropY = Math.min(CROP_PX, Math.floor(canvasHeight / 8));
    const newW = canvasWidth - cropX * 2;
    const newH = canvasHeight - cropY * 2;

    const slideNum = String(pageNum).padStart(3, "0");
    const outFile = path.join(outputDir, `slide-${slideNum}.png`);

    await sharp(rawBuffer)
      .extract({ left: cropX, top: cropY, width: newW, height: newH })
      .png({ compressionLevel: 8 })
      .toFile(outFile);

    const bytes = fs.statSync(outFile).size;
    totalBytes += bytes;
    const sizeKB = Math.round(bytes / 1024);
    console.log(
      `  slide-${slideNum}.png  ${canvasWidth}×${canvasHeight} → ${newW}×${newH}  ${sizeKB} KB`
    );
    saved++;
  }

  // ── Manifest ─────────────────────────────────────────────────────────────────

  fs.writeFileSync(
    path.join(outputDir, "manifest.json"),
    JSON.stringify(
      {
        moduleId,
        count: saved,
        scale: SCALE,
        cropPx: CROP_PX,
        generatedAt: new Date().toISOString(),
      },
      null,
      2
    )
  );

  const totalMB = (totalBytes / 1024 / 1024).toFixed(1);
  console.log(
    `\n✓ Done — ${saved} slides, ${totalMB} MB total → public/slides/${moduleId}/`
  );
}

main().catch((err) => {
  console.error("\n✗ Error:", err.message ?? err);
  process.exit(1);
});
