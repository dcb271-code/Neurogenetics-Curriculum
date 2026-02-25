/**
 * scripts/generate-yield-slides.mjs
 *
 * Generates clean slide images for the "Diagnostic Yields Across Phenotypes"
 * module using @napi-rs/canvas. Each slide is a white 1540×1188 (4:3 at 2×)
 * canvas with a minimal design matching the app's neutral aesthetic.
 *
 * Run: node scripts/generate-yield-slides.mjs
 */

import { createCanvas } from "@napi-rs/canvas";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "slides", "diagnostic-yields");
fs.mkdirSync(OUT_DIR, { recursive: true });

// ── Canvas dimensions (1540 × 1188 ≈ 4:3 at high resolution) ─────────────────
const W = 1540;
const H = 1188;

// ── Colour palette (matches app neutral theme) ────────────────────────────────
const CLR = {
  bg: "#ffffff",
  surface: "#f8f9fa",
  border: "#e2e8f0",
  accent: "#3b82f6",       // blue-500
  accentLight: "#eff6ff",  // blue-50
  accentDark: "#1e40af",   // blue-800
  heading: "#0f172a",      // slate-900
  subheading: "#1e293b",   // slate-800
  body: "#334155",         // slate-700
  muted: "#64748b",        // slate-500
  mutedLight: "#94a3b8",   // slate-400
  green: "#16a34a",
  greenLight: "#f0fdf4",
  amber: "#d97706",
  amberLight: "#fffbeb",
  red: "#dc2626",
  redLight: "#fef2f2",
  tableHeader: "#1e3a5f",
  tableRow1: "#ffffff",
  tableRow2: "#f1f5f9",
};

// ── Typography helpers ─────────────────────────────────────────────────────────

function setFont(ctx, size, weight = "normal", family = "sans-serif") {
  ctx.font = `${weight} ${size}px ${family}`;
}

/** Wrap text into lines within maxWidth, return array of strings */
function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const test = current ? current + " " + word : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/** Draw wrapped text, return y after last line */
function drawWrapped(ctx, text, x, y, maxWidth, lineHeight) {
  const lines = wrapText(ctx, text, maxWidth);
  for (const line of lines) {
    ctx.fillText(line, x, y);
    y += lineHeight;
  }
  return y;
}

// ── Shared layout helpers ──────────────────────────────────────────────────────

function drawBackground(ctx) {
  ctx.fillStyle = CLR.bg;
  ctx.fillRect(0, 0, W, H);
}

function drawAccentBar(ctx) {
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(0, 0, W, 6);
}

function drawSlideNumber(ctx, num, total) {
  setFont(ctx, 18, "normal");
  ctx.fillStyle = CLR.mutedLight;
  ctx.textAlign = "right";
  ctx.fillText(`${num} / ${total}`, W - 40, H - 30);
  ctx.textAlign = "left";
}

function drawModuleTag(ctx) {
  setFont(ctx, 16, "normal");
  ctx.fillStyle = CLR.accent;
  ctx.fillText("Diagnostic Yields Across Phenotypes", 48, H - 30);
}

function drawFooter(ctx, num, total) {
  // thin separator line
  ctx.strokeStyle = CLR.border;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(40, H - 52);
  ctx.lineTo(W - 40, H - 52);
  ctx.stroke();
  drawModuleTag(ctx);
  drawSlideNumber(ctx, num, total);
}

function slideTitle(ctx, title, y = 80) {
  setFont(ctx, 38, "bold");
  ctx.fillStyle = CLR.heading;
  ctx.fillText(title, 48, y);
  // underline
  const w = ctx.measureText(title).width;
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, y + 8, Math.min(w, W - 96), 4);
}

function sectionLabel(ctx, label, x = 48, y = 130) {
  setFont(ctx, 17, "normal");
  ctx.fillStyle = CLR.muted;
  ctx.fillText(label.toUpperCase(), x, y);
}

// ── Save canvas as JPEG ───────────────────────────────────────────────────────

function saveSlide(canvas, n) {
  const buf = canvas.toBuffer("image/jpeg", { quality: 0.92 });
  const name = `slide-${String(n).padStart(3, "0")}.jpg`;
  fs.writeFileSync(path.join(OUT_DIR, name), buf);
  console.log(`  ${name}  ${Math.round(buf.length / 1024)} KB`);
}

// ── Bullet point helper ────────────────────────────────────────────────────────

function bullet(ctx, text, x, y, maxWidth, lineHeight = 28) {
  // dot
  ctx.fillStyle = CLR.accent;
  ctx.beginPath();
  ctx.arc(x - 16, y - 6, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = CLR.body;
  return drawWrapped(ctx, text, x, y, maxWidth, lineHeight);
}

// ── Table helper ───────────────────────────────────────────────────────────────

function drawTable(ctx, headers, rows, x, y, colWidths, rowH = 46) {
  const totalW = colWidths.reduce((a, b) => a + b, 0);

  // header row
  let cx = x;
  ctx.fillStyle = CLR.tableHeader;
  ctx.fillRect(x, y, totalW, rowH);
  setFont(ctx, 15, "bold");
  ctx.fillStyle = "#ffffff";
  for (let i = 0; i < headers.length; i++) {
    ctx.fillText(headers[i], cx + 10, y + rowH / 2 + 5);
    cx += colWidths[i];
  }

  // data rows
  let ry = y + rowH;
  for (let r = 0; r < rows.length; r++) {
    const rowColor = r % 2 === 0 ? CLR.tableRow1 : CLR.tableRow2;
    ctx.fillStyle = rowColor;
    ctx.fillRect(x, ry, totalW, rowH);

    // border
    ctx.strokeStyle = CLR.border;
    ctx.lineWidth = 1;
    ctx.strokeRect(x, ry, totalW, rowH);

    cx = x;
    for (let c = 0; c < rows[r].length; c++) {
      const cellText = rows[r][c];
      const isFirst = c === 0;
      setFont(ctx, isFirst ? 14 : 14, isFirst ? "bold" : "normal");
      ctx.fillStyle = isFirst ? CLR.accentDark : CLR.body;
      // clip text to column width
      ctx.save();
      ctx.rect(cx + 8, ry, colWidths[c] - 16, rowH);
      ctx.clip();
      ctx.fillText(cellText, cx + 10, ry + rowH / 2 + 5);
      ctx.restore();
      cx += colWidths[c];
    }
    ry += rowH;
  }
  return ry;
}

// ═════════════════════════════════════════════════════════════════════════════
// SLIDE DEFINITIONS
// ═════════════════════════════════════════════════════════════════════════════

const TOTAL = 10;
let slideNum = 0;

// ── Slide 1: Title slide ──────────────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);

  // large accent rectangle left strip
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(0, 0, 10, H);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(0, 0, 10, H * 0.45);

  // main title
  setFont(ctx, 52, "bold");
  ctx.fillStyle = CLR.heading;
  ctx.fillText("Diagnostic Yields Across", 80, 240);
  ctx.fillText("Phenotypes", 80, 310);

  // subtitle bar
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(80, 340, 580, 5);

  setFont(ctx, 24, "normal");
  ctx.fillStyle = CLR.muted;
  ctx.fillText("CMA · WES · WGS in Pediatric Neurogenetics", 80, 390);

  setFont(ctx, 18, "normal");
  ctx.fillStyle = CLR.mutedLight;
  ctx.fillText("Based on meta-analyses and large cohort studies", 80, 430);
  ctx.fillText("Clark 2018 · Sheidley 2022 · Nurchis 2023 · Gonzalez-Mantilla 2023", 80, 458);

  // right decorative block
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(W - 400, 120, 340, 260);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(W - 400, 120, 6, 260);

  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("6 Sections · 10 Quiz Questions", W - 370, 175);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  const topics = [
    "Interpreting yield data",
    "CMA vs WES vs WGS: what each detects",
    "Yield by phenotype: Epilepsy",
    "Yield by phenotype: NDD & Structural",
    "Yield by phenotype: Movement & WM",
    "Summary + pedagogical points",
  ];
  let ty = 205;
  for (const t of topics) {
    ctx.fillStyle = CLR.accent;
    ctx.beginPath(); ctx.arc(W - 358, ty - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    ctx.fillText(t, W - 348, ty);
    ty += 28;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 2: Interpreting Yield Data ─────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Interpreting Yield Data", 72);
  sectionLabel(ctx, "Section 1 of 6", 48, 128);

  const pts = [
    ["Cohort selection", "Referral/specialty clinic vs. population-level. The single largest driver of yield variation — 15–72% for the same test."],
    ["Sequencing strategy", "Singleton vs. trio. Trio analysis ≈ doubles yield for de novo-enriched phenotypes: OR 2.04 (95% CI 1.62–2.56, Clark 2018)."],
    ["Prior testing history", "Post-CMA-negative WES shows lower yield than first-tier WES. The denominator must be stated."],
    ["Database maturation", "Reanalysis of stored WES data yields new diagnoses in ~10–25% of unsolved cases. A negative WES is time-stamped, not permanent."],
    ["CMA platform", "SNP arrays detect UPD and AOH; oligo arrays do not. Clinically important for imprinting disorders (Angelman, PWS)."],
    ["Severity / syndromic burden", "Dysmorphia, epilepsy comorbidity, multi-system involvement, and younger onset independently predict higher yield."],
  ];

  let y = 165;
  const COL_W = 200;
  for (const [label, detail] of pts) {
    // label box
    ctx.fillStyle = CLR.accentLight;
    ctx.fillRect(48, y - 20, COL_W - 10, 38);
    setFont(ctx, 15, "bold");
    ctx.fillStyle = CLR.accentDark;
    ctx.fillText(label, 56, y);
    // detail
    setFont(ctx, 15, "normal");
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, detail, 48 + COL_W + 10, y, W - 48 - COL_W - 68, 24);
    y += 72;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 3: WGS vs WES vs CMA ────────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "WGS vs. WES vs. CMA: What Each Detects", 72);
  sectionLabel(ctx, "Section 2 of 6", 48, 128);

  // Three columns
  const cols = [
    {
      title: "CMA", color: CLR.green, lightColor: CLR.greenLight,
      yield: "~10%",
      items: [
        "CNVs ≥50–200 kb",
        "Aneuploidy",
        "UPD / AOH (SNP arrays)",
        "✗ SNVs or small indels",
        "✗ Balanced SVs",
        "✗ Repeat expansions",
      ],
    },
    {
      title: "WES", color: CLR.accent, lightColor: CLR.accentLight,
      yield: "~36%",
      items: [
        "Coding SNVs & indels",
        "CNV-seq possible (lower sensitivity)",
        "✗ Deep intronic variants",
        "✗ Regulatory regions",
        "✗ Balanced SVs",
        "✗ Repeat expansions",
      ],
    },
    {
      title: "WGS", color: CLR.amber, lightColor: CLR.amberLight,
      yield: "~41%*",
      items: [
        "All WES scope",
        "Deep intronic / regulatory",
        "Balanced SVs",
        "Mitochondrial (better depth)",
        "Partial repeat detection",
        "* NSD vs. WES overall (OR 1.13)",
      ],
    },
  ];

  const colW = (W - 96 - 40) / 3;
  let cx = 48;
  for (const col of cols) {
    // header
    ctx.fillStyle = col.color;
    ctx.fillRect(cx, 150, colW - 16, 60);
    setFont(ctx, 28, "bold");
    ctx.fillStyle = "#ffffff";
    ctx.fillText(col.title, cx + 20, 188);
    // yield badge
    setFont(ctx, 22, "bold");
    ctx.fillText(`Yield ${col.yield}`, cx + 20, 218);

    // items
    ctx.fillStyle = col.lightColor;
    ctx.fillRect(cx, 214, colW - 16, 440);
    let iy = 250;
    for (const item of col.items) {
      const isCross = item.startsWith("✗");
      const isNote = item.startsWith("*");
      setFont(ctx, 15, isCross ? "normal" : "normal");
      ctx.fillStyle = isCross ? CLR.red : isNote ? CLR.muted : CLR.body;
      ctx.fillText(item, cx + 18, iy);
      iy += 34;
    }

    cx += colW + 20;
  }

  // Repeat expansion warning box
  ctx.fillStyle = CLR.redLight;
  ctx.fillRect(48, 680, W - 96, 72);
  ctx.strokeStyle = CLR.red;
  ctx.lineWidth = 2;
  ctx.strokeRect(48, 680, W - 96, 72);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.red;
  ctx.fillText("⚠  Critical: Short-read WES AND WGS do NOT reliably detect repeat expansion disorders", 68, 708);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  ctx.fillText("Friedreich ataxia, SCA types, CANVAS, FXTAS, DM1/DM2, HD, C9orf72 — require dedicated repeat-primed PCR or long-read sequencing", 68, 736);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 4: Yield Table — Epilepsy phenotypes ────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Yield by Phenotype: Epilepsy", 72);
  sectionLabel(ctx, "Section 3 of 6", 48, 128);

  const headers = ["Phenotype", "CMA", "WES", "WGS"];
  const rows = [
    ["NICU encephalopathy / neonatal seizures", "8–15%", "20–35% (rWES)", "35–50% (rWGS)"],
    ["Early infantile DEE / Ohtahara (EIDEE)", "8–15%", "37–43%", "~40–50%"],
    ["IESS / West syndrome", "14% (CI 11–16%)", "26% (CI 21–31%)", "~19–25%"],
    ["New-onset focal epilepsy (non-DEE)", "5–8%", "10–15%", "15–20%"],
    ["New-onset generalized epilepsy (non-DEE)", "5–10%", "12–18%", "18–25%"],
    ["Drug-resistant epilepsy (any onset)", "8–12%", "24–40%", "35–48%"],
    ["DEE broadly (all ages)", "8–15%", "24–40%", "35–50%"],
  ];
  const colWidths = [420, 200, 260, 260];

  drawTable(ctx, headers, rows, 48, 150, colWidths, 52);

  // footnote
  setFont(ctx, 14, "normal");
  ctx.fillStyle = CLR.muted;
  ctx.fillText("All-epilepsy meta-analysis (Sheidley et al. Epilepsia 2022, 154 studies, n=39,094): CMA 9% · WES 24% · WGS 48%", 48, H - 68);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 5: Yield Table — NDD & Structural ───────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Yield by Phenotype: Neurodevelopment & Structural", 72);
  sectionLabel(ctx, "Section 4 of 6", 48, 128);

  const headers = ["Phenotype", "CMA", "WES", "WGS"];
  const rows = [
    ["GDD — infant/toddler, unexplained", "10–20%", "30–61% (trio + CNV-seq)", "35–45%"],
    ["ID — child/adolescent, unexplained", "10–25%", "30–45% (first-tier)", "35–50%"],
    ["Isolated ASD (no ID, no epilepsy)", "5–8%", "10–15%", "12–18%"],
    ["ASD + ID or ASD + epilepsy", "10–15%", "25–35%", "30–40%"],
    ["Hypotonia ± motor delay (infant)", "10–15%", "30–45%", "35–50%"],
    ["Multiple congenital anomalies (MCA)", "15–25%", "35–50%", "40–55%"],
    ["Cerebral palsy (no clear perinatal cause)", "8–12%", "31–42%*", "~31–42%"],
    ["Macrocephaly (isolated or + NDD)", "10–20%", "20–45%", "25–45%"],
  ];
  const colWidths = [380, 196, 270, 200];

  drawTable(ctx, headers, rows, 48, 150, colWidths, 50);

  setFont(ctx, 13, "normal");
  ctx.fillStyle = CLR.muted;
  ctx.fillText("*CP WES: overall 31.1% (CI 24.2–38.6%); pediatric-specific 34.8%; strict exclusion criteria 42.1% (Gonzalez-Mantilla JAMA Pediatr 2023)", 48, H - 68);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 6: Yield Table — Movement & White Matter ───────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Yield by Phenotype: Movement & White Matter", 72);
  sectionLabel(ctx, "Section 5 of 6", 48, 128);

  const headers = ["Phenotype", "CMA", "WES", "WGS"];
  const rows = [
    ["Episodic ataxia (child/adolescent)", "5–8%", "20–35%", "20–40%"],
    ["Progressive hereditary ataxia", "5–10%", "21–50% (ceiling ~50%)", "40–55%"],
    ["Leukodystrophy (MRI-selected)", "10–15% (adjunct)", "50–72%", "72–90%+"],
  ];
  const colWidths = [400, 196, 300, 250];
  drawTable(ctx, headers, rows, 48, 150, colWidths, 58);

  // Leukodystrophy highlight box
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, 380, W - 96, 90);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, 380, 6, 90);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Leukodystrophy: Highest WES/WGS yield in clinical neurogenetics", 68, 410);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  ctx.fillText("GWMD cohort (Neurology 2022, n=126): 72% overall · 77% onset <3 yr · 85% hypomyelination subgroup", 68, 440);
  ctx.fillText("Zerem et al. 2023: 89.6% with all modalities combined (WGS + RNA-seq)", 68, 462);

  // Repeat expansion ataxia warning
  ctx.fillStyle = CLR.redLight;
  ctx.fillRect(48, 490, W - 96, 116);
  ctx.strokeStyle = CLR.red;
  ctx.lineWidth = 2;
  ctx.strokeRect(48, 490, W - 96, 116);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.red;
  ctx.fillText("⚠  Major hereditary ataxias NOT detected by WES or standard WGS:", 68, 520);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  const warns = [
    "Friedreich ataxia (FXN GAA repeat) — requires repeat-primed PCR",
    "SCA types 1/2/3/6/7/10/17/36 (CAG/other repeats) — require repeat analysis",
    "CANVAS (RFC1 biallelic AAGGG repeat) — Southern blot or long-read sequencing",
  ];
  let wy = 546;
  for (const w of warns) {
    ctx.fillStyle = CLR.red; ctx.beginPath(); ctx.arc(62, wy - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body; ctx.fillText(w, 74, wy);
    wy += 28;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 7: Summary Pooled Yields Table ─────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Summary: Pooled Yields — Broad Pediatric Neurogenetics", 72);
  sectionLabel(ctx, "Section 6 of 6", 48, 128);

  const headers = ["Test", "Pooled Yield", "Key Source"];
  const rows = [
    ["CMA", "~10% (95% CI 8–12%)", "Clark et al. 2018 (n=20,068)"],
    ["WES", "~36% (95% CI 33–40%)", "Clark 2018; Pandey 2025 (n=24,631)"],
    ["WGS", "~41% (95% CI 34–48%); NSD vs. WES", "Nurchis 2023 (OR 1.13, p=0.50)"],
    ["rWGS (NICU/critically ill)", "35–50%; ≈ rWES in RCT", "Maron JAMA 2023; NICUSeq 2021"],
    ["All epilepsy — CMA", "~9%", "Sheidley Epilepsia 2022 (n=39,094)"],
    ["All epilepsy — WES", "~24%", "Sheidley Epilepsia 2022 (n=39,094)"],
    ["All epilepsy — WGS", "~48%", "Sheidley Epilepsia 2022 (n=39,094)"],
  ];
  const colWidths = [310, 420, 410];

  drawTable(ctx, headers, rows, 48, 155, colWidths, 56);

  // Note
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.muted;
  drawWrapped(ctx,
    "NSD = No significant difference. WGS advantages are concentrated in post-WES-negative cohorts, leukodystrophies, and atypical presentations — not in unselected NDD cohorts.",
    48, H - 78, W - 96, 24);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 8: Pedagogical Points I ────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Critical Pedagogical Points (1–3)", 72);
  sectionLabel(ctx, "Section 6 of 6", 48, 128);

  const pts = [
    {
      n: "1", color: CLR.green, bg: CLR.greenLight,
      head: "CMA is not obsolete",
      body: "Uniquely detects aneuploidy, large CNVs, UPD (SNP arrays), and segmental duplication regions. In MCA, IESS, and ID, CMA yield rivals WES at lower cost. Most labs now run simultaneous CNV-seq alongside WES.",
    },
    {
      n: "2", color: CLR.accent, bg: CLR.accentLight,
      head: "Trio sequencing is not optional for severe early-onset phenotypes",
      body: "De novo variants drive most severe DEE, early-onset ID, and complex MCA. Trio analysis ≈ doubles yield vs. singleton (OR 2.04). Singleton WES misses phasing, parent-of-origin data, and has ~half the de novo detection rate.",
    },
    {
      n: "3", color: CLR.amber, bg: CLR.amberLight,
      head: "WGS > WES for specific scenarios (not universally)",
      body: "Post-negative-WES cohorts (~10–20% incremental yield); leukodystrophies with suspected deep intronic/regulatory pathology; atypical CP; combined SNV+CNV on one platform. In unselected NDD cohorts: NSD overall.",
    },
  ];

  let y = 158;
  for (const pt of pts) {
    ctx.fillStyle = pt.bg;
    ctx.fillRect(48, y, W - 96, 130);
    ctx.fillStyle = pt.color;
    ctx.fillRect(48, y, 8, 130);

    // number circle
    ctx.fillStyle = pt.color;
    ctx.beginPath(); ctx.arc(80, y + 40, 22, 0, Math.PI * 2); ctx.fill();
    setFont(ctx, 22, "bold");
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(pt.n, 80, y + 47);
    ctx.textAlign = "left";

    setFont(ctx, 19, "bold");
    ctx.fillStyle = CLR.subheading;
    ctx.fillText(pt.head, 116, y + 36);

    setFont(ctx, 15, "normal");
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, pt.body, 116, y + 70, W - 180, 26);

    y += 148;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 9: Pedagogical Points II ───────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Critical Pedagogical Points (4–6)", 72);
  sectionLabel(ctx, "Section 6 of 6", 48, 128);

  const pts = [
    {
      n: "4", color: CLR.red, bg: CLR.redLight,
      head: "Repeat expansion disorders are a separate testing universe",
      body: "Friedreich, SCA types, CANVAS, FXTAS, DM1/DM2, HD, C9orf72, FAME — NONE reliably detected by short-read WES or WGS. Always ask: does this phenotype suggest a repeat disorder? Order dedicated repeat-primed PCR or long-read sequencing.",
    },
    {
      n: "5", color: CLR.muted, bg: CLR.surface,
      head: "Yield is dynamic — a negative WES is time-stamped, not permanent",
      body: "Gene-disease associations grow continuously. Reanalysis of stored WES at 12–24 months yields new diagnoses in ~10–25% of previously unsolved cases (some series: 25–56% incremental yield on older WES). Request reanalysis before re-sequencing.",
    },
    {
      n: "6", color: CLR.accent, bg: CLR.accentLight,
      head: "Leukodystrophy is the special case — among the highest yields anywhere",
      body: "After MRI pattern recognition (hypomyelination vs. demyelination vs. cystic), WES/WGS in the correct phenotypic context yields 50–89%. MRI pattern narrows the differential and should guide — not replace — genetic testing.",
    },
  ];

  let y = 158;
  for (const pt of pts) {
    ctx.fillStyle = pt.bg;
    ctx.fillRect(48, y, W - 96, 130);
    ctx.fillStyle = pt.color;
    ctx.fillRect(48, y, 8, 130);

    ctx.fillStyle = pt.color;
    ctx.beginPath(); ctx.arc(80, y + 40, 22, 0, Math.PI * 2); ctx.fill();
    setFont(ctx, 22, "bold");
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(pt.n, 80, y + 47);
    ctx.textAlign = "left";

    setFont(ctx, 19, "bold");
    ctx.fillStyle = CLR.subheading;
    ctx.fillText(pt.head, 116, y + 36);

    setFont(ctx, 15, "normal");
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, pt.body, 116, y + 70, W - 180, 26);

    y += 148;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 10: Clinical Utility & Management Impact ────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Clinical Utility ≠ Diagnostic Yield", 72);
  sectionLabel(ctx, "Closing Key Concept", 48, 128);

  setFont(ctx, 17, "normal");
  ctx.fillStyle = CLR.body;
  ctx.fillText("Management change rates by phenotype:", 48, 162);

  const mgmt = [
    ["NICU / critically ill neonates", "38–50% of diagnosed cases", CLR.accent],
    ["Genetically explained IESS", "Up to 61.6% enabled precision therapy", CLR.accent],
    ["WES/WGS broadly (NDD)", "~35–40% management change in diagnosed cases", CLR.green],
  ];

  let my = 185;
  for (const [label, val, color] of mgmt) {
    ctx.fillStyle = color + "22";
    ctx.fillRect(48, my, W - 96, 50);
    ctx.fillStyle = color;
    ctx.fillRect(48, my, 6, 50);
    setFont(ctx, 15, "bold");
    ctx.fillStyle = CLR.subheading;
    ctx.fillText(label, 68, my + 18);
    setFont(ctx, 15, "normal");
    ctx.fillStyle = CLR.body;
    ctx.fillText(val, 68, my + 38);
    my += 60;
  }

  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.subheading;
  ctx.fillText("High-impact management examples:", 48, my + 10);
  my += 36;

  const examples = [
    "SCN8A gain-of-function → quinidine (sodium channel blocker)",
    "KCNQ2 gain-of-function → retigabine / carbamazepine",
    "Pyruvate dehydrogenase deficiency → ketogenic diet",
    "GLUT1 deficiency → ketogenic diet (essential; AEDs ineffective)",
    "SLC6A1 (GAT-1) loss of function → avoid valproate (may worsen)",
    "NICU Mendelian diagnosis → redirection of care or targeted therapy initiation",
  ];

  const midX = W / 2;
  for (let i = 0; i < examples.length; i++) {
    const x = i < 3 ? 48 : midX + 20;
    const yy = my + (i % 3) * 38;
    ctx.fillStyle = CLR.accent;
    ctx.beginPath(); ctx.arc(x + 6, yy - 6, 4, 0, Math.PI * 2); ctx.fill();
    setFont(ctx, 14, "normal");
    ctx.fillStyle = CLR.body;
    ctx.fillText(examples[i], x + 20, yy);
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Write manifest ─────────────────────────────────────────────────────────────
const manifest = {
  moduleId: "diagnostic-yields",
  count: TOTAL,
  format: "jpg",
  generatedAt: new Date().toISOString(),
};
fs.writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\n✓ Done — ${TOTAL} slides → public/slides/diagnostic-yields/`);
