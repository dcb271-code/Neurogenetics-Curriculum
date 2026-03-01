/**
 * scripts/generate-cnv-slides.mjs
 *
 * Generates clean slide images for the "CNV Interpretation" module using
 * @napi-rs/canvas. Each slide is a white 1540×1188 (4:3 at 2×) canvas with a
 * minimal design matching the diagnostic-yields slides and the app's neutral
 * aesthetic.
 *
 * Run: node scripts/generate-cnv-slides.mjs
 */

import { createCanvas } from "@napi-rs/canvas";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "slides", "cnv-interpretation");
fs.mkdirSync(OUT_DIR, { recursive: true });

// ── Canvas dimensions (1540 × 1188 ≈ 4:3 at high resolution) ─────────────────
const W = 1540;
const H = 1188;

// ── Colour palette (matches diagnostic-yields slides / app neutral theme) ─────
const CLR = {
  bg: "#ffffff",
  surface: "#f8f9fa",
  border: "#e2e8f0",
  accent: "#d97706",        // amber-600 (matches module color)
  accentLight: "#fffbeb",   // amber-50
  accentDark: "#92400e",    // amber-800
  heading: "#0f172a",       // slate-900
  subheading: "#1e293b",    // slate-800
  body: "#334155",          // slate-700
  muted: "#64748b",         // slate-500
  mutedLight: "#94a3b8",    // slate-400
  green: "#16a34a",
  greenLight: "#f0fdf4",
  blue: "#3b82f6",
  blueLight: "#eff6ff",
  blueDark: "#1e40af",
  red: "#dc2626",
  redLight: "#fef2f2",
  violet: "#7c3aed",
  violetLight: "#f5f3ff",
  tableHeader: "#78350f",   // amber-900
  tableRow1: "#ffffff",
  tableRow2: "#fffbeb",     // amber-50
};

// ── Typography helpers ─────────────────────────────────────────────────────────

function setFont(ctx, size, weight = "normal", family = "sans-serif") {
  ctx.font = `${weight} ${size}px ${family}`;
}

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
  ctx.fillText("CNV Interpretation", 48, H - 30);
}

function drawFooter(ctx, num, total) {
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
  const w = ctx.measureText(title).width;
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, y + 8, Math.min(w, W - 96), 4);
}

function sectionLabel(ctx, label, x = 48, y = 130) {
  setFont(ctx, 17, "normal");
  ctx.fillStyle = CLR.muted;
  ctx.fillText(label.toUpperCase(), x, y);
}

function saveSlide(canvas, n) {
  const buf = canvas.toBuffer("image/jpeg", { quality: 0.92 });
  const name = `slide-${String(n).padStart(3, "0")}.jpg`;
  fs.writeFileSync(path.join(OUT_DIR, name), buf);
  console.log(`  ${name}  ${Math.round(buf.length / 1024)} KB`);
}

function bullet(ctx, text, x, y, maxWidth, lineHeight = 28) {
  ctx.fillStyle = CLR.accent;
  ctx.beginPath();
  ctx.arc(x - 16, y - 6, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = CLR.body;
  return drawWrapped(ctx, text, x, y, maxWidth, lineHeight);
}

function drawTable(ctx, headers, rows, x, y, colWidths, rowH = 46) {
  const totalW = colWidths.reduce((a, b) => a + b, 0);

  let cx = x;
  ctx.fillStyle = CLR.tableHeader;
  ctx.fillRect(x, y, totalW, rowH);
  setFont(ctx, 15, "bold");
  ctx.fillStyle = "#ffffff";
  for (let i = 0; i < headers.length; i++) {
    ctx.fillText(headers[i], cx + 10, y + rowH / 2 + 5);
    cx += colWidths[i];
  }

  let ry = y + rowH;
  for (let r = 0; r < rows.length; r++) {
    const rowColor = r % 2 === 0 ? CLR.tableRow1 : CLR.tableRow2;
    ctx.fillStyle = rowColor;
    ctx.fillRect(x, ry, totalW, rowH);
    ctx.strokeStyle = CLR.border;
    ctx.lineWidth = 1;
    ctx.strokeRect(x, ry, totalW, rowH);

    cx = x;
    for (let c = 0; c < rows[r].length; c++) {
      const cellText = rows[r][c];
      const isFirst = c === 0;
      setFont(ctx, 14, isFirst ? "bold" : "normal");
      ctx.fillStyle = isFirst ? CLR.accentDark : CLR.body;
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

// ── Slide 1: Title ──────────────────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);

  // left accent strip
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(0, 0, 10, H);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(0, 0, 10, H * 0.45);

  // main title
  setFont(ctx, 52, "bold");
  ctx.fillStyle = CLR.heading;
  ctx.fillText("Copy Number Variant", 80, 230);
  ctx.fillText("Interpretation", 80, 300);

  // subtitle bar
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(80, 330, 520, 5);

  setFont(ctx, 24, "normal");
  ctx.fillStyle = CLR.muted;
  ctx.fillText("From Detection to Classification", 80, 380);

  setFont(ctx, 18, "normal");
  ctx.fillStyle = CLR.mutedLight;
  ctx.fillText("ACMG/ClinGen Framework · Riggs et al., Genetics in Medicine 2020", 80, 420);
  ctx.fillText("Kearney et al. 2011 · ClinGen Dosage Sensitivity Map", 80, 448);

  // right decorative block — outline
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(W - 420, 120, 360, 300);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(W - 420, 120, 6, 300);

  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("5 Sections · 5 Quiz Questions", W - 390, 175);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  const topics = [
    "CNVs: Definition & clinical significance",
    "Detection technologies: CMA vs. WGS",
    "ACMG/ClinGen scoring framework",
    "Recurrent genomic disorders",
    "CNV reporting & communication",
    "Essential databases & resources",
  ];
  let ty = 210;
  for (const t of topics) {
    ctx.fillStyle = CLR.accent;
    ctx.beginPath(); ctx.arc(W - 378, ty - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    ctx.fillText(t, W - 368, ty);
    ty += 30;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 2: What Are CNVs? ────────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Copy Number Variants: Definition & Significance", 72);
  sectionLabel(ctx, "Section 1 of 5", 48, 128);

  // Key definition box
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, 150, W - 96, 80);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, 150, 6, 80);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Definition", 68, 178);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Structural genomic variants where a DNA segment is present at a copy number differing from the normal diploid state — deletions (loss) or duplications (gain), ranging from kilobases to megabases.", 68, 202, W - 140, 22);

  // Two columns: Benign vs. Pathogenic
  const colW = (W - 120) / 2;

  // Benign
  ctx.fillStyle = CLR.greenLight;
  ctx.fillRect(48, 260, colW, 260);
  ctx.fillStyle = CLR.green;
  ctx.fillRect(48, 260, colW, 48);
  setFont(ctx, 20, "bold");
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Benign / Population CNVs", 68, 290);

  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  let by = 330;
  const benignPts = [
    "Common (>1% frequency) in population databases",
    "Catalogued in DGV and gnomAD-SV",
    "Typically smaller, gene-poor regions",
    "No established disease association",
    "Serve as internal controls during interpretation",
  ];
  for (const pt of benignPts) {
    ctx.fillStyle = CLR.green;
    ctx.beginPath(); ctx.arc(62, by - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, pt, 74, by, colW - 50, 22);
    by += 34;
  }

  // Pathogenic
  const px = 48 + colW + 24;
  ctx.fillStyle = CLR.redLight;
  ctx.fillRect(px, 260, colW, 260);
  ctx.fillStyle = CLR.red;
  ctx.fillRect(px, 260, colW, 48);
  setFont(ctx, 20, "bold");
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Pathogenic CNVs", px + 20, 290);

  setFont(ctx, 15, "normal");
  let py2 = 330;
  const pathPts = [
    "Rare (<0.01%) or absent in population databases",
    "Typically larger, encompass disease genes",
    "Include dosage-sensitive or haploinsufficient genes",
    "~15–20% of diagnoses in ID and ASD",
    "Highest single-variant-class diagnostic yield",
  ];
  for (const pt of pathPts) {
    ctx.fillStyle = CLR.red;
    ctx.beginPath(); ctx.arc(px + 14, py2 - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, pt, px + 26, py2, colW - 50, 22);
    py2 += 34;
  }

  // Size rule-of-thumb
  ctx.fillStyle = CLR.surface;
  ctx.fillRect(48, 540, W - 96, 74);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, 540, 6, 74);
  setFont(ctx, 15, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Size Rule of Thumb", 68, 564);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  ctx.fillText("CNVs >3 Mb are much more likely pathogenic. <2% of CNVs <500 kb are reported pathogenic", 68, 590);
  ctx.fillText("(unless involving a known critical region or dosage-sensitive gene).", 68, 612);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 3: Detection Technologies ─────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Detection Technologies: CMA vs. WGS", 72);
  sectionLabel(ctx, "Section 2 of 5", 48, 128);

  const colW2 = (W - 120) / 2;

  // CMA column
  ctx.fillStyle = CLR.blue;
  ctx.fillRect(48, 155, colW2, 58);
  setFont(ctx, 24, "bold");
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Chromosomal Microarray (CMA)", 68, 192);

  ctx.fillStyle = CLR.blueLight;
  ctx.fillRect(48, 213, colW2, 400);

  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.blueDark;
  ctx.fillText("Two main platforms:", 68, 245);

  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  let cy = 275;
  const cmaPts = [
    "Array CGH — comparative genomic hybridization",
    "SNP arrays — also detect copy-neutral LOH and UPD",
    "Resolution: detects CNVs ≥50–200 kb",
    "First-tier test for ID, ASD, MCA (ACMG guideline)",
  ];
  for (const pt of cmaPts) {
    ctx.fillStyle = CLR.blue;
    ctx.beginPath(); ctx.arc(62, cy - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    cy = drawWrapped(ctx, pt, 74, cy, colW2 - 50, 24) + 8;
  }

  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.red;
  ctx.fillText("CMA Cannot Detect:", 68, cy + 8);
  cy += 30;
  setFont(ctx, 15, "normal");
  const cmaLimits = [
    "Balanced rearrangements (inversions, translocations)",
    "Small variants (<50 kb) or sequence variants (SNVs)",
    "Repeat expansions",
    "Low-level mosaicism (<10–15%)",
  ];
  for (const pt of cmaLimits) {
    ctx.fillStyle = CLR.red;
    ctx.beginPath(); ctx.arc(62, cy - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    cy = drawWrapped(ctx, pt, 74, cy, colW2 - 50, 24) + 6;
  }

  // WGS column
  const wx = 48 + colW2 + 24;
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(wx, 155, colW2, 58);
  setFont(ctx, 24, "bold");
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Whole Genome Sequencing (WGS)", wx + 20, 192);

  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(wx, 213, colW2, 400);

  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("CNV detection methods:", wx + 20, 245);

  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  let wy = 275;
  const wgsPts = [
    "Read-depth analysis for large CNVs",
    "Split reads and discordant pairs for breakpoints",
    "Superior sensitivity for small CNVs (<50 kb)",
    "Detects SNVs + CNVs on a single platform",
    "Better breakpoint resolution than CMA",
  ];
  for (const pt of wgsPts) {
    ctx.fillStyle = CLR.accent;
    ctx.beginPath(); ctx.arc(wx + 14, wy - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    wy = drawWrapped(ctx, pt, wx + 26, wy, colW2 - 50, 24) + 8;
  }

  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.red;
  ctx.fillText("WGS Limitations for CNVs:", wx + 20, wy + 8);
  wy += 30;
  setFont(ctx, 15, "normal");
  const wgsLimits = [
    "GC-rich and segmental duplication regions",
    "Complex bioinformatic pipelines required",
    "Repeat expansions (short-read limitation)",
  ];
  for (const pt of wgsLimits) {
    ctx.fillStyle = CLR.red;
    ctx.beginPath(); ctx.arc(wx + 14, wy - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    wy = drawWrapped(ctx, pt, wx + 26, wy, colW2 - 50, 24) + 6;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 4: CNV Interpretation Workflow ─────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "The CNV Interpretation Workflow", 72);
  sectionLabel(ctx, "Systematic approach for every CNV finding", 48, 128);

  const steps = [
    { n: "1", color: CLR.accent, bg: CLR.accentLight,
      head: "Does it overlap a known syndrome region?",
      body: "Check full vs. partial overlap. Does it include the critical region or dosage-sensitive gene(s)? Consider variable expressivity and incomplete penetrance." },
    { n: "2", color: CLR.blue, bg: CLR.blueLight,
      head: "Does it overlap a known polymorphic/benign region?",
      body: "Check DGV, gnomAD-SV for population frequency. Is it a gain or loss specifically? What is the strength of evidence as a population variant?" },
    { n: "3", color: CLR.green, bg: CLR.greenLight,
      head: "What is the size and gene content?",
      body: "Number of protein-coding genes? OMIM disease genes? Dosage-sensitive genes (ClinGen HI/TS scores)? Phenotype match with known gene-disease associations?" },
    { n: "4", color: CLR.violet, bg: CLR.violetLight,
      head: "Are there other patients with similar CNVs?",
      body: "Literature cases vs. database cases (DECIPHER, ClinVar, HGMD). Statistical enrichment in cases vs. controls (Cooper et al., Kaminsky et al.)?" },
    { n: "5", color: CLR.red, bg: CLR.redLight,
      head: "Parental / familial studies?",
      body: "De novo or inherited? Phenotype of transmitting parent? Segregation with affected family members? X-linked considerations?" },
  ];

  let y = 160;
  for (const step of steps) {
    ctx.fillStyle = step.bg;
    ctx.fillRect(48, y, W - 96, 100);
    ctx.fillStyle = step.color;
    ctx.fillRect(48, y, 8, 100);

    // number circle
    ctx.fillStyle = step.color;
    ctx.beginPath(); ctx.arc(80, y + 34, 18, 0, Math.PI * 2); ctx.fill();
    setFont(ctx, 18, "bold");
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(step.n, 80, y + 40);
    ctx.textAlign = "left";

    setFont(ctx, 17, "bold");
    ctx.fillStyle = CLR.subheading;
    ctx.fillText(step.head, 112, y + 30);

    setFont(ctx, 14, "normal");
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, step.body, 112, y + 56, W - 190, 22);

    y += 114;
  }

  // Arrow connecting steps
  setFont(ctx, 13, "normal");
  ctx.fillStyle = CLR.muted;
  ctx.fillText("→ Score all evidence using ACMG/ClinGen CNV framework (Riggs et al. 2020) or ClinGen Pathogenicity Calculator", 48, y + 8);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 5: ACMG/ClinGen Scoring Framework ────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "ACMG/ClinGen CNV Classification Framework", 72);
  sectionLabel(ctx, "Section 3 of 5 · Riggs et al., Genetics in Medicine 2020", 48, 128);

  // 5-tier classification bar
  const tiers = [
    { label: "Pathogenic", short: "P", color: "#dc2626", bg: "#fef2f2" },
    { label: "Likely Path.", short: "LP", color: "#ea580c", bg: "#fff7ed" },
    { label: "VUS", short: "VUS", color: "#d97706", bg: "#fffbeb" },
    { label: "Likely Benign", short: "LB", color: "#2563eb", bg: "#eff6ff" },
    { label: "Benign", short: "B", color: "#16a34a", bg: "#f0fdf4" },
  ];

  const tierW = (W - 96 - 40) / 5;
  let tx = 48;
  for (const tier of tiers) {
    ctx.fillStyle = tier.color;
    ctx.fillRect(tx, 155, tierW, 42);
    setFont(ctx, 16, "bold");
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(tier.label, tx + tierW / 2, 181);
    ctx.textAlign = "left";
    tx += tierW + 10;
  }

  // Evidence domains
  setFont(ctx, 20, "bold");
  ctx.fillStyle = CLR.heading;
  ctx.fillText("Five Evidence Domains", 48, 240);

  const domains = [
    { n: "1", title: "Initial Assessment", desc: "Size of CNV, number of protein-coding genes, overlap with established HI/TS regions. Larger CNVs with more genes score higher.", color: CLR.accent },
    { n: "2", title: "Overlap with Known Regions", desc: "Full or partial overlap with established pathogenic or benign CNV regions in ClinGen, ClinVar, DECIPHER, and ISCA databases.", color: CLR.blue },
    { n: "3", title: "Gene Content & Dosage", desc: "ClinGen Haploinsufficiency (HI) and Triplosensitivity (TS) scores. OMIM disease genes. Predicted LoF intolerance (pLI, LOEUF).", color: CLR.green },
    { n: "4", title: "Literature & Case Data", desc: "Published case-control data. Case enrichment statistics. Patient database matches (DECIPHER, ClinVar, HGMD). Phenotype correlation.", color: CLR.violet },
    { n: "5", title: "Inheritance & Segregation", desc: "De novo (~10× more likely pathogenic) vs. inherited. Segregation with phenotype. Parental phenotype. X-linked considerations.", color: CLR.red },
  ];

  let dy = 268;
  for (const d of domains) {
    ctx.fillStyle = d.color + "12";
    ctx.fillRect(48, dy, W - 96, 80);
    ctx.fillStyle = d.color;
    ctx.fillRect(48, dy, 6, 80);

    // number
    ctx.fillStyle = d.color;
    ctx.beginPath(); ctx.arc(78, dy + 30, 16, 0, Math.PI * 2); ctx.fill();
    setFont(ctx, 16, "bold");
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(d.n, 78, dy + 36);
    ctx.textAlign = "left";

    setFont(ctx, 17, "bold");
    ctx.fillStyle = CLR.subheading;
    ctx.fillText(d.title, 108, dy + 28);

    setFont(ctx, 14, "normal");
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, d.desc, 108, dy + 50, W - 180, 20);

    dy += 92;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 6: Dosage Sensitivity & Gene Evaluation ───────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Gene Evaluation: Dosage Sensitivity", 72);
  sectionLabel(ctx, "ClinGen Dosage Sensitivity Map", 48, 128);

  // HI scores table
  setFont(ctx, 19, "bold");
  ctx.fillStyle = CLR.heading;
  ctx.fillText("Haploinsufficiency (HI) Scores — Deletions", 48, 170);

  const hiHeaders = ["Score", "Meaning", "Interpretation for Deletions"];
  const hiRows = [
    ["HI = 3", "Sufficient evidence for HI", "Strong support for pathogenicity of deletion"],
    ["HI = 2", "Some evidence for HI", "Moderate support"],
    ["HI = 1", "Little evidence", "Minimal support — requires additional evidence"],
    ["HI = 0", "No evidence", "Does not support pathogenicity based on HI alone"],
    ["HI = 40", "Dosage sensitivity unlikely", "Evidence suggests gene tolerates loss of one copy"],
  ];
  const hiColW = [140, 310, 440];
  drawTable(ctx, hiHeaders, hiRows, 48, 190, hiColW, 44);

  // TS scores
  setFont(ctx, 19, "bold");
  ctx.fillStyle = CLR.heading;
  ctx.fillText("Triplosensitivity (TS) Scores — Duplications", 48, 445);

  const tsHeaders = ["Score", "Meaning", "Interpretation for Duplications"];
  const tsRows = [
    ["TS = 3", "Sufficient evidence for TS", "Strong support for pathogenicity of duplication"],
    ["TS = 2", "Some evidence for TS", "Moderate support"],
    ["TS = 1", "Little evidence", "Minimal support — requires additional evidence"],
    ["TS = 0", "No evidence", "Does not support pathogenicity based on TS alone"],
    ["TS = 40", "Dosage sensitivity unlikely", "Evidence suggests gene tolerates gain of one copy"],
  ];
  const tsColW = [140, 310, 440];
  drawTable(ctx, tsHeaders, tsRows, 48, 465, tsColW, 44);

  // Key callout
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, 700, W - 96, 66);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, 700, 6, 66);
  setFont(ctx, 15, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Key Point: Duplications are generally less likely to be pathogenic than deletions of the same region.", 68, 724);
  setFont(ctx, 14, "normal");
  ctx.fillStyle = CLR.body;
  ctx.fillText("Triplosensitivity is harder to establish; most genes tolerate an extra copy. Always evaluate deletions and duplications separately.", 68, 748);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 7: NAHR Mechanism ─────────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Recurrent CNVs: The NAHR Mechanism", 72);
  sectionLabel(ctx, "Section 4 of 5", 48, 128);

  // Explanation box
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, 150, W - 96, 100);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, 150, 6, 100);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Non-Allelic Homologous Recombination (NAHR)", 68, 178);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx,
    "Segmental duplications (low-copy repeats, LCRs) flank specific genomic regions. During meiosis, misalignment of paralogous LCRs leads to unequal crossing-over, producing recurrent deletions and duplications with highly consistent breakpoints. This is the primary mechanism for 'genomic disorders'.",
    68, 202, W - 140, 22);

  // Visual representation
  const midY = 310;
  // Normal alignment
  setFont(ctx, 14, "bold");
  ctx.fillStyle = CLR.muted;
  ctx.fillText("NORMAL ALIGNMENT:", 48, midY);

  // Chromosome bar
  ctx.fillStyle = CLR.border;
  ctx.fillRect(48, midY + 15, W - 96, 30);
  // LCR A
  ctx.fillStyle = CLR.blue;
  ctx.fillRect(200, midY + 15, 80, 30);
  setFont(ctx, 12, "bold");
  ctx.fillStyle = "#ffffff";
  ctx.fillText("LCR-A", 215, midY + 35);
  // Unique sequence
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(280, midY + 15, 600, 30);
  setFont(ctx, 13, "bold");
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText("Unique Sequence (genes)", 580, midY + 35);
  ctx.textAlign = "left";
  // LCR B
  ctx.fillStyle = CLR.blue;
  ctx.fillRect(880, midY + 15, 80, 30);
  setFont(ctx, 12, "bold");
  ctx.fillStyle = "#ffffff";
  ctx.fillText("LCR-B", 895, midY + 35);

  // Misalignment
  setFont(ctx, 14, "bold");
  ctx.fillStyle = CLR.muted;
  ctx.fillText("MISALIGNMENT → NAHR:", 48, midY + 80);

  // Two chromosomes misaligned
  ctx.fillStyle = CLR.border;
  ctx.fillRect(48, midY + 95, W - 96, 24);
  ctx.fillStyle = CLR.blue;
  ctx.fillRect(200, midY + 95, 80, 24);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(280, midY + 95, 600, 24);
  ctx.fillStyle = CLR.blue;
  ctx.fillRect(880, midY + 95, 80, 24);

  ctx.fillStyle = "#e2e8f0";
  ctx.fillRect(48, midY + 125, W - 96, 24);
  // Shifted LCR
  ctx.fillStyle = "#60a5fa";
  ctx.fillRect(880, midY + 125, 80, 24);
  ctx.fillStyle = "#fbbf24";
  ctx.fillRect(280, midY + 125, 600, 24);
  ctx.fillStyle = "#60a5fa";
  ctx.fillRect(200, midY + 125, 80, 24);

  // Crossover arrow
  ctx.strokeStyle = CLR.red;
  ctx.lineWidth = 3;
  ctx.setLineDash([8, 4]);
  ctx.beginPath();
  ctx.moveTo(240, midY + 119);
  ctx.lineTo(920, midY + 125);
  ctx.stroke();
  ctx.setLineDash([]);

  setFont(ctx, 13, "normal");
  ctx.fillStyle = CLR.red;
  ctx.fillText("× Unequal crossing-over between paralogous LCRs", 400, midY + 170);

  // Outcome boxes
  const outY = midY + 200;
  // Deletion
  ctx.fillStyle = CLR.redLight;
  ctx.fillRect(48, outY, (W - 120) / 2, 80);
  ctx.fillStyle = CLR.red;
  ctx.fillRect(48, outY, 6, 80);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.red;
  ctx.fillText("DELETION product", 68, outY + 26);
  setFont(ctx, 14, "normal");
  ctx.fillStyle = CLR.body;
  ctx.fillText("Loss of unique segment between LCRs", 68, outY + 50);
  ctx.fillText("→ Haploinsufficiency of enclosed genes", 68, outY + 70);

  // Duplication
  const dupX = 48 + (W - 120) / 2 + 24;
  ctx.fillStyle = CLR.greenLight;
  ctx.fillRect(dupX, outY, (W - 120) / 2, 80);
  ctx.fillStyle = CLR.green;
  ctx.fillRect(dupX, outY, 6, 80);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.green;
  ctx.fillText("DUPLICATION product", dupX + 20, outY + 26);
  setFont(ctx, 14, "normal");
  ctx.fillStyle = CLR.body;
  ctx.fillText("Gain of unique segment between LCRs", dupX + 20, outY + 50);
  ctx.fillText("→ Triplosensitivity (if gene is TS)", dupX + 20, outY + 70);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 8: Recurrent Genomic Disorders Table ──────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Recurrent Genomic Disorders in Neurogenetics", 72);
  sectionLabel(ctx, "Section 4 of 5", 48, 128);

  const headers = ["Syndrome", "Locus / Size", "Key Features", "Frequency"];
  const rows = [
    ["22q11.2 del (DiGeorge)", "22q11.21 · ~3 Mb", "Conotruncal heart, palatal, DD, schizophrenia risk", "1/4,000"],
    ["Williams-Beuren", "7q11.23 · ~1.5 Mb", "Hypersociability, ID, supravalvular aortic stenosis (ELN)", "1/7,500"],
    ["1p36 deletion", "1p36 subtelomeric", "Severe ID, hypotonia, seizures, heart defects", "1/5,000"],
    ["15q11-q13 mat del", "15q11.2-q13 · ~5 Mb", "Angelman: absent speech, seizures, happy demeanor (UBE3A)", "1/15,000"],
    ["15q11-q13 pat del", "15q11.2-q13 · ~5 Mb", "Prader-Willi: hypotonia→obesity, hypogonadism, mild ID", "1/15,000"],
    ["15q11-q13 mat dup", "15q11.2-q13", "Autism spectrum disorder, epilepsy, motor delay", "Common in ASD"],
    ["17p11.2 del (SMS)", "17p11.2 · ~3.7 Mb", "Smith-Magenis: ID, sleep disturbance, self-injury (RAI1)", "1/15,000"],
    ["7q11.23 dup", "7q11.23 · ~1.5 Mb", "Speech delay, ASD features (reciprocal of Williams)", "~1/13,000"],
    ["16p11.2 del/dup", "16p11.2 · ~600 kb", "Del: ASD, obesity · Dup: ASD, schizophrenia, underweight", "~0.5% of ASD"],
  ];
  const colWidths = [240, 210, 530, 130];

  drawTable(ctx, headers, rows, 48, 150, colWidths, 52);

  // Imprinting callout
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, 640, W - 96, 60);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, 640, 6, 60);
  setFont(ctx, 15, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Parent-of-Origin Matters: 15q11-q13 is the classic example of genomic imprinting affecting CNV phenotype.", 68, 664);
  setFont(ctx, 14, "normal");
  ctx.fillStyle = CLR.body;
  ctx.fillText("Same deletion region → different syndrome depending on whether maternal (Angelman) or paternal (Prader-Willi) chromosome is affected.", 68, 686);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 9: Essential Databases & Resources ────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Essential Databases & Resources", 72);
  sectionLabel(ctx, "Tools for CNV interpretation", 48, 128);

  const resources = [
    { category: "Population Frequency", color: CLR.green, tools: [
      ["DGV (Database of Genomic Variants)", "Catalogue of structural variation in healthy individuals"],
      ["gnomAD-SV", "Population-scale structural variant frequencies from WGS data"],
    ]},
    { category: "Clinical Significance", color: CLR.accent, tools: [
      ["ClinGen Dosage Sensitivity Map", "Curated HI and TS scores for genes and regions"],
      ["ClinVar", "Aggregated variant classifications from clinical laboratories"],
      ["DECIPHER", "Patient-consented CNV database with phenotype data"],
    ]},
    { category: "Gene & Disease Information", color: CLR.blue, tools: [
      ["OMIM", "Comprehensive catalogue of Mendelian gene-disease relationships"],
      ["GeneReviews", "Expert-authored disease reviews with genetic testing guidance"],
      ["HGMD", "Human Gene Mutation Database — published pathogenic variants"],
    ]},
    { category: "Scoring & Classification", color: CLR.violet, tools: [
      ["ClinGen CNV Calculator", "Interactive ACMG/ClinGen scoring tool for CNVs"],
      ["Franklin / VarSome", "Automated variant classification with ACMG criteria"],
    ]},
  ];

  let ry = 158;
  for (const res of resources) {
    // Category header
    ctx.fillStyle = res.color;
    ctx.fillRect(48, ry, W - 96, 32);
    setFont(ctx, 14, "bold");
    ctx.fillStyle = "#ffffff";
    ctx.fillText(res.category.toUpperCase(), 60, ry + 22);
    ry += 36;

    for (const [name, desc] of res.tools) {
      ctx.fillStyle = CLR.surface;
      ctx.fillRect(48, ry, W - 96, 36);
      ctx.strokeStyle = CLR.border;
      ctx.lineWidth = 1;
      ctx.strokeRect(48, ry, W - 96, 36);

      setFont(ctx, 14, "bold");
      ctx.fillStyle = CLR.subheading;
      ctx.fillText(name, 60, ry + 23);

      setFont(ctx, 13, "normal");
      ctx.fillStyle = CLR.muted;
      const nameW = ctx.measureText(name).width;
      ctx.fillText(" — " + desc, 60 + nameW, ry + 23);

      ry += 38;
    }
    ry += 10;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 10: Summary & Key Takeaways ───────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "CNV Interpretation: Key Takeaways", 72);
  sectionLabel(ctx, "Section 5 of 5 · Summary", 48, 128);

  const takeaways = [
    { n: "1", color: CLR.accent, bg: CLR.accentLight,
      head: "Think critically about every CMA finding",
      body: "There are exceptions to every guideline. Evaluate each CNV systematically through all five evidence domains before reaching a classification." },
    { n: "2", color: CLR.blue, bg: CLR.blueLight,
      head: "Size and gene content are the starting point — not the endpoint",
      body: "A large gene-poor CNV may be benign. A small CNV disrupting a single HI-3 gene can be pathogenic. Always check dosage sensitivity scores." },
    { n: "3", color: CLR.green, bg: CLR.greenLight,
      head: "De novo status is powerful evidence",
      body: "De novo CNVs are ~10-fold more likely to be pathogenic than inherited ones. Always request parental studies (CMA or targeted FISH/MLPA)." },
    { n: "4", color: CLR.violet, bg: CLR.violetLight,
      head: "Deletions ≠ duplications — evaluate separately",
      body: "A pathogenic deletion does not imply the reciprocal duplication is also pathogenic. Triplosensitivity must be independently established." },
    { n: "5", color: CLR.red, bg: CLR.redLight,
      head: "Context determines clinical actionability",
      body: "ISCN/HGVS nomenclature, GRCh38 coordinates, gene content, classification, and clear communication of clinical implications are all essential for reporting." },
    { n: "6", color: CLR.accent, bg: CLR.accentLight,
      head: "Inherited CNVs require careful consideration",
      body: "Variable expressivity, incomplete penetrance, and X-linked genes mean an inherited CNV from a \"healthy\" parent may still be pathogenic. Document parental phenotype." },
  ];

  let y = 160;
  for (const pt of takeaways) {
    ctx.fillStyle = pt.bg;
    ctx.fillRect(48, y, W - 96, 96);
    ctx.fillStyle = pt.color;
    ctx.fillRect(48, y, 8, 96);

    ctx.fillStyle = pt.color;
    ctx.beginPath(); ctx.arc(80, y + 32, 18, 0, Math.PI * 2); ctx.fill();
    setFont(ctx, 16, "bold");
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(pt.n, 80, y + 38);
    ctx.textAlign = "left";

    setFont(ctx, 17, "bold");
    ctx.fillStyle = CLR.subheading;
    ctx.fillText(pt.head, 112, y + 28);

    setFont(ctx, 14, "normal");
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, pt.body, 112, y + 52, W - 190, 22);

    y += 106;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Write manifest ─────────────────────────────────────────────────────────────
const manifest = {
  moduleId: "cnv-interpretation",
  count: TOTAL,
  format: "jpg",
  generatedAt: new Date().toISOString(),
};
fs.writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\n✓ Done — ${TOTAL} slides → public/slides/cnv-interpretation/`);
