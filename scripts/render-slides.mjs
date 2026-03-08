/**
 * scripts/render-slides.mjs
 *
 * Renders an array of HTML slide strings into JPG images via Puppeteer.
 * Used by module-specific generators.
 *
 * Usage (as library):
 *   import { renderSlides } from './render-slides.mjs';
 *   await renderSlides('central-dogma', htmlArray);
 */

import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

/**
 * Render an array of HTML strings as slide JPGs.
 * @param {string} moduleId - e.g. "central-dogma"
 * @param {string[]} slides - Array of full HTML documents (one per slide)
 */
export async function renderSlides(moduleId, slides) {
  const outDir = path.join(ROOT, "public", "slides", moduleId);
  fs.mkdirSync(outDir, { recursive: true });

  console.log(`\nRendering ${slides.length} slides for "${moduleId}"...\n`);

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  let totalBytes = 0;

  for (let i = 0; i < slides.length; i++) {
    const num = String(i + 1).padStart(3, "0");
    const outFile = path.join(outDir, `slide-${num}.jpg`);

    await page.setContent(slides[i], { waitUntil: "domcontentloaded", timeout: 10000 });

    // Small delay for rendering
    await new Promise(r => setTimeout(r, 100));

    await page.screenshot({
      path: outFile,
      type: "jpeg",
      quality: 92,
      clip: { x: 0, y: 0, width: 1920, height: 1080 },
    });

    const bytes = fs.statSync(outFile).size;
    totalBytes += bytes;
    console.log(`  slide-${num}.jpg  ${Math.round(bytes / 1024)} KB`);
  }

  // Write manifest
  const manifest = {
    moduleId,
    count: slides.length,
    format: "jpg",
    generatedAt: new Date().toISOString(),
    generator: "puppeteer-html",
  };
  fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));

  await browser.close();

  const totalMB = (totalBytes / 1024 / 1024).toFixed(1);
  console.log(`\n  Done: ${slides.length} slides, ${totalMB} MB -> public/slides/${moduleId}/\n`);
}
