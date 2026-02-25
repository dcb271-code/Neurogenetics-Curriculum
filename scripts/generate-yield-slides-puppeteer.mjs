/**
 * scripts/generate-yield-slides-puppeteer.mjs
 *
 * Renders clean HTML slides for the diagnostic-yields module using Puppeteer.
 * 1280×720px, white background, no decorative graphics.
 *
 * Run: node scripts/generate-yield-slides-puppeteer.mjs
 */

import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "slides", "diagnostic-yields");
fs.mkdirSync(OUT_DIR, { recursive: true });

const W = 1280;
const H = 720;

// ── Shared CSS ─────────────────────────────────────────────────────────────────
const BASE_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: ${W}px; height: ${H}px; overflow: hidden;
    background: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    color: #1e293b;
    display: flex; flex-direction: column;
  }
  .header {
    padding: 28px 48px 0;
    border-left: 6px solid #3b82f6;
    padding-left: 22px;
    margin-left: 36px;
    margin-bottom: 20px;
  }
  .header h1 {
    font-size: 32px; font-weight: 700; color: #1e40af; line-height: 1.2;
  }
  .header .section-label {
    font-size: 13px; color: #94a3b8; margin-top: 4px; text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .body { flex: 1; padding: 0 48px; overflow: hidden; }
  ul { list-style: none; padding: 0; }
  ul li {
    font-size: 20px; line-height: 1.55; color: #334155;
    padding: 7px 0 7px 24px;
    position: relative;
    border-bottom: 1px solid #f1f5f9;
  }
  ul li:last-child { border-bottom: none; }
  ul li::before {
    content: ""; position: absolute; left: 0; top: 18px;
    width: 8px; height: 8px; border-radius: 50%; background: #3b82f6;
  }
  ul li strong { color: #1e293b; }
  .footer {
    padding: 8px 48px;
    display: flex; justify-content: space-between; align-items: center;
    border-top: 1px solid #e2e8f0;
  }
  .footer .module-name { font-size: 13px; color: #94a3b8; }
  .footer .slide-num   { font-size: 13px; color: #cbd5e1; }

  /* Tables */
  table { width: 100%; border-collapse: collapse; font-size: 17px; }
  thead tr { background: #1e3a5f; color: #ffffff; }
  thead th { padding: 11px 14px; text-align: left; font-weight: 600;
             font-size: 15px; }
  tbody tr:nth-child(even) { background: #f8fafc; }
  tbody tr:nth-child(odd)  { background: #ffffff; }
  tbody td { padding: 10px 14px; border-bottom: 1px solid #e2e8f0;
             color: #334155; }
  tbody td:first-child { font-weight: 600; color: #1e40af; font-size: 15px; }

  /* Warning box */
  .warn {
    background: #fef2f2; border: 2px solid #dc2626;
    border-radius: 8px; padding: 16px 20px; margin-top: 12px;
  }
  .warn-title { font-size: 18px; font-weight: 700; color: #dc2626;
                margin-bottom: 8px; }
  .warn ul li { font-size: 17px; color: #7f1d1d; border-bottom: none;
                padding: 4px 0 4px 24px; }
  .warn ul li::before { background: #dc2626; top: 14px; }

  /* Highlight box */
  .info {
    background: #eff6ff; border-left: 4px solid #3b82f6;
    border-radius: 4px; padding: 12px 16px; margin-top: 8px;
  }
  .info p { font-size: 17px; color: #1e40af; line-height: 1.5; }
`;

// ── Helper: render HTML to PNG ─────────────────────────────────────────────────
async function renderSlide(browser, html, slideNum) {
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
  await page.setContent(`<!DOCTYPE html><html><head>
    <meta charset="utf-8">
    <style>${BASE_CSS}</style>
  </head><body>${html}</body></html>`, { waitUntil: "networkidle0" });
  const filename = `slide-${String(slideNum).padStart(3, "0")}.jpg`;
  await page.screenshot({
    path: path.join(OUT_DIR, filename),
    type: "jpeg",
    quality: 92,
  });
  await page.close();
  const size = Math.round(fs.statSync(path.join(OUT_DIR, filename)).size / 1024);
  console.log(`  ${filename}  ${size} KB`);
}

// ── Slide content ──────────────────────────────────────────────────────────────

function slide(headerHtml, bodyHtml, num, total) {
  return `
    <div class="header">${headerHtml}</div>
    <div class="body">${bodyHtml}</div>
    <div class="footer">
      <span class="module-name">Diagnostic Yields Across Phenotypes</span>
      <span class="slide-num">${num} / ${total}</span>
    </div>`;
}

function h1(title, label = "") {
  return `<h1>${title}</h1>${label ? `<div class="section-label">${label}</div>` : ""}`;
}

function bullets(items) {
  return `<ul>${items.map(([bold, rest]) =>
    `<li>${bold ? `<strong>${bold}</strong> ${rest}` : rest}</li>`
  ).join("")}</ul>`;
}

function table(headers, rows) {
  const ths = headers.map(h => `<th>${h}</th>`).join("");
  const trs = rows.map(r =>
    `<tr>${r.map((c, i) => `<td>${c}</td>`).join("")}</tr>`
  ).join("");
  return `<table><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>`;
}

// ── Main ───────────────────────────────────────────────────────────────────────

const TOTAL = 10;
const slides = [];

// Slide 1 — Title
slides.push(`
  <div style="flex:1; display:flex; flex-direction:column; align-items:center;
              justify-content:center; padding: 0 80px; text-align:center;">
    <div style="width:72px; height:6px; background:#3b82f6; border-radius:3px; margin-bottom:32px;"></div>
    <h1 style="font-size:48px; font-weight:800; color:#1e40af; line-height:1.15; margin-bottom:16px;">
      Diagnostic Yields Across Phenotypes
    </h1>
    <p style="font-size:22px; color:#64748b; margin-bottom:8px;">
      CMA &nbsp;·&nbsp; WES &nbsp;·&nbsp; WGS in Pediatric Neurogenetics
    </p>
    <p style="font-size:16px; color:#94a3b8; margin-top:12px;">
      Clark 2018 &nbsp;·&nbsp; Sheidley 2022 &nbsp;·&nbsp; Nurchis 2023 &nbsp;·&nbsp; Gonzalez-Mantilla 2023
    </p>
    <div style="width:72px; height:6px; background:#e2e8f0; border-radius:3px; margin-top:32px;"></div>
  </div>
  <div class="footer">
    <span class="module-name">Diagnostic Yields Across Phenotypes</span>
    <span class="slide-num">1 / ${TOTAL}</span>
  </div>`);

// Slide 2 — Prefatory Notes
slides.push(slide(
  h1("Prefatory Notes: Interpreting Yield Data", "Variables affecting reported yields"),
  bullets([
    ["Cohort selection:", "Referral/specialty clinic vs. population cohort — the largest single driver of variation (yields range 15–72% for the same test)"],
    ["Sequencing strategy:", "Trio analysis ≈ doubles yield for de novo-enriched phenotypes vs. singleton (OR 2.04, 95% CI 1.62–2.56)"],
    ["Prior testing:", "Post-CMA-negative WES cohorts show lower yield than first-tier WES — always check what was done before"],
    ["Database maturation:", "Reanalysis of stored WES data yields new diagnoses in ~10–25% of previously unsolved cases; a negative WES is time-stamped, not permanent"],
    ["CMA platform:", "SNP arrays detect UPD and AOH; oligo-only arrays do not — matters for imprinting disorders"],
    ["Severity / syndromic burden:", "Dysmorphia, comorbid epilepsy, multi-system involvement, and earlier onset all independently predict higher yield"],
  ]),
  2, TOTAL));

// Slide 3 — WGS vs WES vs CMA: Detection Scope
slides.push(slide(
  h1("WGS vs. WES vs. CMA — Detection Scope", "What each platform detects"),
  `${table(
    ["Platform", "Detects", "Misses", "Pooled NDD Yield"],
    [
      ["CMA", "CNVs ≥50–200 kb, aneuploidy, UPD/AOH (SNP arrays)", "SNVs, small indels, balanced SVs, repeat expansions", "~10% (CI 8–12%)"],
      ["WES", "Coding SNVs and small indels; limited CNV detection", "Deep intronic, regulatory, balanced SVs, repeat expansions", "~36% (CI 33–40%)"],
      ["WGS", "All WES scope + deep intronic, regulatory, balanced SVs, partial repeats", "Repeat expansions (reliably)", "~41% (CI 34–48%)"],
    ]
  )}
  <div class="info" style="margin-top:14px;">
    <p>WGS vs. WES overall: OR 1.13 (p=0.50) — not significantly different in unselected NDD cohorts.
    WGS advantage concentrates in <strong>post-WES-negative patients</strong>,
    <strong>leukodystrophies</strong>, and <strong>atypical presentations</strong>.</p>
  </div>`,
  3, TOTAL));

// Slide 4 — Repeat Expansion Caveat
slides.push(slide(
  h1("Critical Caveat: Repeat Expansion Disorders", "Not detected by standard WES or WGS"),
  `<div class="warn">
    <div class="warn-title">⚠ Standard short-read WES and WGS do NOT reliably detect:</div>
    <ul>
      <li><strong>Friedreich ataxia</strong> — FXN GAA trinucleotide repeat expansion (intron 1) → requires repeat-primed PCR</li>
      <li><strong>Spinocerebellar ataxias</strong> — SCA1/2/3/6/7/10/17/36 CAG/other repeats → require dedicated repeat analysis</li>
      <li><strong>CANVAS</strong> — RFC1 biallelic AAGGG pentanucleotide repeat → Southern blot or long-read sequencing</li>
      <li><strong>FXTAS / Fragile X</strong> — FMR1 CGG premutation → FMR1 PCR / Southern blot</li>
      <li><strong>Myotonic dystrophy</strong> — DM1 CTG, DM2 CCTG repeats → triplet-primed PCR</li>
      <li><strong>Huntington disease, C9orf72 ALS/FTD, FAME</strong> — all require dedicated testing</li>
    </ul>
  </div>
  <p style="font-size:18px; color:#334155; margin-top:16px; padding: 0 4px;">
    Always ask: does this phenotype suggest a repeat disorder? If yes, order dedicated testing
    <em>in addition to</em> WES/WGS — they address separate variant classes.
  </p>`,
  4, TOTAL));

// Slide 5 — Epilepsy Yields Table
slides.push(slide(
  h1("Yield by Phenotype: Epilepsy", "CMA · WES · WGS"),
  table(
    ["Phenotype", "CMA", "WES", "WGS"],
    [
      ["NICU / neonatal encephalopathy, seizures", "8–15%", "20–35% (rWES)", "35–50% (rWGS)"],
      ["Early infantile DEE / Ohtahara (EIDEE)", "8–15%", "37–43%", "~40–50%"],
      ["Infantile epileptic spasms syndrome (IESS)", "14% (CI 11–16%)", "26% (CI 21–31%)", "~19–25%"],
      ["New-onset focal epilepsy (non-DEE)", "5–8%", "10–15%", "15–20%"],
      ["New-onset generalized epilepsy (non-DEE)", "5–10%", "12–18%", "18–25%"],
      ["Drug-resistant epilepsy (any onset)", "8–12%", "24–40%", "35–48%"],
      ["All epilepsy (Sheidley 2022, n=39,094)", "9%", "24%", "48%"],
    ]
  ),
  5, TOTAL));

// Slide 6 — NDD & Structural Yields Table
slides.push(slide(
  h1("Yield by Phenotype: Neurodevelopment & Structural", "CMA · WES · WGS"),
  table(
    ["Phenotype", "CMA", "WES", "WGS"],
    [
      ["Global developmental delay (GDD)", "10–20%", "30–61% (trio + CNV-seq)", "35–45%"],
      ["Intellectual disability (ID)", "10–25%", "30–45% first-tier", "35–50%"],
      ["Isolated ASD (no ID, no epilepsy)", "5–8%", "10–15%", "12–18%"],
      ["Hypotonia ± motor delay (infant)", "10–15%", "30–45%", "35–50%"],
      ["Multiple congenital anomalies (MCA)", "15–25%", "35–50%", "40–55%"],
      ["Cerebral palsy (no clear perinatal cause)", "8–12%", "31–42%*", "~31–42%"],
    ]
  ),
  6, TOTAL));

// Slide 7 — Movement & White Matter Yields Table
slides.push(slide(
  h1("Yield by Phenotype: Movement & White Matter", "CMA · WES · WGS"),
  `${table(
    ["Phenotype", "CMA", "WES", "WGS"],
    [
      ["Episodic ataxia (child/adolescent)", "5–8%", "20–35%", "20–40%"],
      ["Progressive hereditary ataxia", "5–10%", "21–50% (ceiling ~50%)", "40–55%"],
      ["Leukodystrophy (MRI-selected cohorts)", "10–15% (adjunct)", "50–72%", "72–90%+"],
    ]
  )}
  <div class="info" style="margin-top:16px;">
    <p><strong>Leukodystrophy highlight:</strong> GWMD cohort (Neurology 2022, n=126):
    72% overall · 77% onset &lt;3 yr · 85% hypomyelination subgroup.
    Zerem 2023: 89.6% with WGS + RNA-seq combined.
    MRI pattern recognition before testing dramatically increases yield.</p>
  </div>`,
  7, TOTAL));

// Slide 8 — Summary Pooled Yields Table
slides.push(slide(
  h1("Summary: Pooled Yields — Broad Pediatric Neurogenetics", "Meta-analysis and large cohort data"),
  table(
    ["Test", "Pooled Yield", "Source"],
    [
      ["CMA", "~10% (95% CI 8–12%)", "Clark et al. 2018 (n = 20,068)"],
      ["WES", "~36% (95% CI 33–40%)", "Clark 2018; Pandey 2025 (n = 24,631)"],
      ["WGS", "~41% (95% CI 34–48%); NSD vs. WES", "Nurchis 2023 (OR 1.13, p = 0.50)"],
      ["rWGS — NICU / critically ill", "35–50%; comparable to rWES in RCT", "Maron JAMA 2023; NICUSeq 2021"],
      ["All epilepsy — CMA / WES / WGS", "9% / 24% / 48%", "Sheidley Epilepsia 2022 (n = 39,094)"],
    ]
  ),
  8, TOTAL));

// Slide 9 — Pedagogical Points 1–4
slides.push(slide(
  h1("Critical Pedagogical Points — 1 through 4"),
  bullets([
    ["1. CMA is not obsolete.", "Uniquely detects aneuploidy, large CNVs, and UPD (SNP arrays). In MCA, IESS, and ID its yield rivals WES at lower cost. Most labs now run CNV-seq alongside WES simultaneously."],
    ["2. Trio sequencing is not optional", "for severe early-onset DEE / GDD / MCA. De novo variants drive most diagnoses. Trio ≈ doubles yield vs. singleton (OR 2.04). Singleton misses phasing and parent-of-origin data."],
    ["3. WGS > WES only in specific scenarios:", "post-negative-WES patients (~10–20% incremental yield); leukodystrophies; atypical CP; combined SNV+CNV on one platform. Not universally superior."],
    ["4. Repeat expansion disorders are a separate testing universe.", "Friedreich, SCA types, CANVAS, FXTAS, DM1/DM2, HD, C9orf72 — none detected by short-read WES/WGS. Always assess the phenotype for repeat disorder features."],
  ]),
  9, TOTAL));

// Slide 10 — Pedagogical Points 5–7 + clinical utility
slides.push(slide(
  h1("Critical Pedagogical Points — 5 through 7"),
  bullets([
    ["5. Yield is dynamic.", "Reanalysis of stored WES at 12–24 months yields new diagnoses in ~10–25% of previously unsolved cases. A negative WES is time-stamped, not permanent — request reanalysis before re-sequencing."],
    ["6. Leukodystrophy is the special case.", "After MRI pattern recognition, WES/WGS yields 50–89% — the highest in clinical neurogenetics. MRI pattern should guide, not replace, genetic testing."],
    ["7. Clinical utility ≠ diagnostic yield.", "Diagnosis changes management in 38–50% of NICU cases and enables precision therapy in 61.6% of genetically explained IESS. Examples: SCN8A → quinidine; KCNQ2 → carbamazepine; GLUT1 → ketogenic diet; SLC6A1 → avoid valproate; PDH deficiency → ketogenic diet."],
  ]),
  10, TOTAL));

// ── Launch Puppeteer and render ────────────────────────────────────────────────
console.log(`\nLaunching Puppeteer — rendering ${TOTAL} slides at ${W}×${H}…\n`);
const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });

for (let i = 0; i < slides.length; i++) {
  await renderSlide(browser, slides[i], i + 1);
}

await browser.close();

// Delete any leftover slides from old generator (numbered > TOTAL)
for (let i = TOTAL + 1; i <= 20; i++) {
  const old = path.join(OUT_DIR, `slide-${String(i).padStart(3, "0")}.jpg`);
  if (fs.existsSync(old)) { fs.unlinkSync(old); console.log(`  deleted ${path.basename(old)}`); }
}

// Update manifest
fs.writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify({
  moduleId: "diagnostic-yields",
  count: TOTAL,
  format: "jpg",
  generatedAt: new Date().toISOString(),
}, null, 2));

console.log(`\n✓ Done — ${TOTAL} slides → public/slides/diagnostic-yields/`);
