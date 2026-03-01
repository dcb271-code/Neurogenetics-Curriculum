/**
 * scripts/generate-variant-interp-slides.mjs
 *
 * Generates 10 slides for the "Variant Interpretation (ACMG/AMP)" module.
 * Rose accent palette matching the module's color.
 *
 * Run: node scripts/generate-variant-interp-slides.mjs
 */

import { createCanvas } from "@napi-rs/canvas";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "slides", "variant-interpretation");
fs.mkdirSync(OUT_DIR, { recursive: true });

const W = 1540;
const H = 1188;

const CLR = {
  bg: "#ffffff",
  surface: "#f8f9fa",
  border: "#e2e8f0",
  accent: "#e11d48",        // rose-600
  accentLight: "#fff1f2",   // rose-50
  accentDark: "#9f1239",    // rose-800
  heading: "#0f172a",
  subheading: "#1e293b",
  body: "#334155",
  muted: "#64748b",
  mutedLight: "#94a3b8",
  green: "#16a34a",
  greenLight: "#f0fdf4",
  blue: "#3b82f6",
  blueLight: "#eff6ff",
  blueDark: "#1e40af",
  amber: "#d97706",
  amberLight: "#fffbeb",
  red: "#dc2626",
  redLight: "#fef2f2",
  violet: "#7c3aed",
  violetLight: "#f5f3ff",
  tableHeader: "#881337",   // rose-900
  tableRow1: "#ffffff",
  tableRow2: "#fff1f2",
};

function setFont(ctx, size, weight = "normal") { ctx.font = `${weight} ${size}px sans-serif`; }

function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = []; let current = "";
  for (const word of words) {
    const test = current ? current + " " + word : word;
    if (ctx.measureText(test).width > maxWidth && current) { lines.push(current); current = word; }
    else { current = test; }
  }
  if (current) lines.push(current);
  return lines;
}

function drawWrapped(ctx, text, x, y, maxWidth, lineHeight) {
  const lines = wrapText(ctx, text, maxWidth);
  for (const line of lines) { ctx.fillText(line, x, y); y += lineHeight; }
  return y;
}

function drawBackground(ctx) { ctx.fillStyle = CLR.bg; ctx.fillRect(0, 0, W, H); }
function drawAccentBar(ctx) { ctx.fillStyle = CLR.accent; ctx.fillRect(0, 0, W, 6); }

function drawFooter(ctx, num, total) {
  ctx.strokeStyle = CLR.border; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(40, H - 52); ctx.lineTo(W - 40, H - 52); ctx.stroke();
  setFont(ctx, 16, "normal"); ctx.fillStyle = CLR.accent;
  ctx.fillText("Variant Interpretation (ACMG/AMP)", 48, H - 30);
  setFont(ctx, 18, "normal"); ctx.fillStyle = CLR.mutedLight;
  ctx.textAlign = "right"; ctx.fillText(`${num} / ${total}`, W - 40, H - 30); ctx.textAlign = "left";
}

function slideTitle(ctx, title, y = 80) {
  setFont(ctx, 38, "bold"); ctx.fillStyle = CLR.heading;
  const lines = wrapText(ctx, title, W - 96);
  for (const line of lines) { ctx.fillText(line, 48, y); y += 48; }
  ctx.fillStyle = CLR.accent; ctx.fillRect(48, y - 40, Math.min(ctx.measureText(lines[lines.length - 1]).width, W - 96), 4);
  return y - 36;
}

function sectionLabel(ctx, label, x = 48, y = 130) {
  setFont(ctx, 17, "normal"); ctx.fillStyle = CLR.muted; ctx.fillText(label.toUpperCase(), x, y);
}

function saveSlide(canvas, n) {
  const buf = canvas.toBuffer("image/jpeg", { quality: 0.92 });
  const name = `slide-${String(n).padStart(3, "0")}.jpg`;
  fs.writeFileSync(path.join(OUT_DIR, name), buf);
  console.log(`  ${name}  ${Math.round(buf.length / 1024)} KB`);
}

function drawTable(ctx, headers, rows, x, y, colWidths, rowH = 46) {
  const totalW = colWidths.reduce((a, b) => a + b, 0);
  let cx = x;
  ctx.fillStyle = CLR.tableHeader; ctx.fillRect(x, y, totalW, rowH);
  setFont(ctx, 14, "bold"); ctx.fillStyle = "#ffffff";
  for (let i = 0; i < headers.length; i++) { ctx.fillText(headers[i], cx + 10, y + rowH / 2 + 5); cx += colWidths[i]; }
  let ry = y + rowH;
  for (let r = 0; r < rows.length; r++) {
    ctx.fillStyle = r % 2 === 0 ? CLR.tableRow1 : CLR.tableRow2;
    ctx.fillRect(x, ry, totalW, rowH);
    ctx.strokeStyle = CLR.border; ctx.lineWidth = 1; ctx.strokeRect(x, ry, totalW, rowH);
    cx = x;
    for (let c = 0; c < rows[r].length; c++) {
      setFont(ctx, 13, c === 0 ? "bold" : "normal");
      ctx.fillStyle = c === 0 ? CLR.accentDark : CLR.body;
      ctx.save(); ctx.rect(cx + 4, ry, colWidths[c] - 8, rowH); ctx.clip();
      ctx.fillText(rows[r][c], cx + 8, ry + rowH / 2 + 4);
      ctx.restore(); cx += colWidths[c];
    }
    ry += rowH;
  }
  return ry;
}

const TOTAL = 10;
let slideNum = 0;

// ── Slide 1: Title ──────────────────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);

  ctx.fillStyle = CLR.accentLight; ctx.fillRect(0, 0, 10, H);
  ctx.fillStyle = CLR.accent; ctx.fillRect(0, 0, 10, H * 0.45);

  setFont(ctx, 52, "bold"); ctx.fillStyle = CLR.heading;
  ctx.fillText("Variant Interpretation", 80, 220);
  setFont(ctx, 42, "bold"); ctx.fillStyle = CLR.accent;
  ctx.fillText("ACMG/AMP Framework", 80, 280);

  ctx.fillStyle = CLR.accent; ctx.fillRect(80, 308, 480, 5);
  setFont(ctx, 22, "normal"); ctx.fillStyle = CLR.muted;
  ctx.fillText("Richards et al., Genetics in Medicine 2015", 80, 350);
  setFont(ctx, 18, "normal"); ctx.fillStyle = CLR.mutedLight;
  ctx.fillText("Evidence-Based Classification · Population Data · Computational Tools", 80, 384);
  ctx.fillText("Functional Evidence · Segregation · Neurogenetics Applications", 80, 410);

  // Right outline box
  ctx.fillStyle = CLR.accentLight; ctx.fillRect(W - 440, 110, 380, 330);
  ctx.fillStyle = CLR.accent; ctx.fillRect(W - 440, 110, 6, 330);

  setFont(ctx, 16, "bold"); ctx.fillStyle = CLR.accentDark;
  ctx.fillText("6 Sections · 6 Quiz Questions", W - 410, 158);

  setFont(ctx, 15, "normal"); ctx.fillStyle = CLR.body;
  const topics = [
    "1. ACMG/AMP 2015 framework overview",
    "2. Loss-of-function & PVS1 criterion",
    "3. Population frequency evidence",
    "4. Computational & clinical evidence",
    "5. Neurogenetics case applications",
    "6. VUS counseling in practice",
  ];
  let ty = 195;
  for (const t of topics) {
    ctx.fillStyle = CLR.accent; ctx.beginPath(); ctx.arc(W - 398, ty - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body; ctx.fillText(t, W - 388, ty); ty += 32;
  }

  // Classification tier strip at bottom
  const tiers = [
    { label: "Pathogenic", color: "#dc2626" },
    { label: "Likely Path.", color: "#ea580c" },
    { label: "VUS", color: "#d97706" },
    { label: "Likely Benign", color: "#2563eb" },
    { label: "Benign", color: "#16a34a" },
  ];
  const tierW = (W - 160) / 5;
  let tx = 80;
  const tierY = 500;
  for (const tier of tiers) {
    ctx.fillStyle = tier.color; ctx.fillRect(tx, tierY, tierW - 8, 44);
    setFont(ctx, 16, "bold"); ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center"; ctx.fillText(tier.label, tx + (tierW - 8) / 2, tierY + 28); ctx.textAlign = "left";
    tx += tierW;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 2: ACMG/AMP Overview ──────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx); drawAccentBar(ctx);

  slideTitle(ctx, "ACMG/AMP 2015 Framework Overview", 72);
  sectionLabel(ctx, "Section 1 of 6", 48, 128);

  // Classification tier boxes
  const tiers = [
    { label: "Pathogenic (P)", color: "#dc2626", desc: "Disease-causing with high confidence. Actionable for clinical decisions." },
    { label: "Likely Pathogenic (LP)", color: "#ea580c", desc: ">90% probability of being pathogenic. Clinically actionable." },
    { label: "VUS", color: "#d97706", desc: "Insufficient or conflicting evidence. NOT actionable for clinical decisions." },
    { label: "Likely Benign (LB)", color: "#2563eb", desc: ">90% probability of being benign. Generally not reported." },
    { label: "Benign (B)", color: "#16a34a", desc: "Clearly not disease-causing. Generally not reported." },
  ];

  let y = 155;
  for (const t of tiers) {
    ctx.fillStyle = t.color + "15"; ctx.fillRect(48, y, W - 96, 48);
    ctx.fillStyle = t.color; ctx.fillRect(48, y, 8, 48);
    setFont(ctx, 17, "bold"); ctx.fillStyle = t.color;
    ctx.fillText(t.label, 72, y + 22);
    setFont(ctx, 14, "normal"); ctx.fillStyle = CLR.body;
    ctx.fillText(t.desc, 320, y + 22);
    y += 56;
  }

  // Evidence categories
  y += 12;
  setFont(ctx, 19, "bold"); ctx.fillStyle = CLR.heading;
  ctx.fillText("Evidence Criteria Structure", 48, y);
  y += 28;

  const evHeaders = ["Strength", "Pathogenic Codes", "Benign Codes", "Count"];
  const evRows = [
    ["Very Strong", "PVS1", "—", "1 criterion"],
    ["Strong", "PS1–PS4", "BA1, BS1–BS4", "4P + 5B"],
    ["Moderate", "PM1–PM6", "—", "6 criteria"],
    ["Supporting", "PP1–PP5", "BP1–BP7", "5P + 7B"],
  ];
  const evColW = [200, 280, 280, 180];
  drawTable(ctx, evHeaders, evRows, 48, y, evColW, 44);

  // Combining rules summary
  y += 44 * 5 + 16;
  ctx.fillStyle = CLR.accentLight; ctx.fillRect(48, y, W - 96, 100);
  ctx.fillStyle = CLR.accent; ctx.fillRect(48, y, 6, 100);
  setFont(ctx, 16, "bold"); ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Combining Rules for Pathogenic Classification:", 68, y + 22);
  setFont(ctx, 14, "normal"); ctx.fillStyle = CLR.body;

  const rules = [
    "Pathogenic: 1 Very Strong + ≥1 Strong   OR   2 Strong   OR   1 Strong + ≥3 Moderate   OR   1 Strong + 2 Moderate + ≥2 Supporting",
    "Likely Pathogenic: 1 Very Strong + 1 Moderate   OR   1 Strong + 1–2 Moderate   OR   1 Strong + ≥2 Supporting   OR   ≥3 Moderate + ≥2 Supporting",
    "Benign: 1 Stand-Alone (BA1)   OR   ≥2 Strong (BS)     Likely Benign: 1 Strong + 1 Supporting   OR   ≥2 Supporting (BP)",
  ];
  let ry = y + 44;
  for (const r of rules) {
    drawWrapped(ctx, r, 68, ry, W - 140, 18);
    ry += 22;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 3: PVS1 & Loss-of-Function ────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx); drawAccentBar(ctx);

  slideTitle(ctx, "PVS1: Loss-of-Function Evidence", 72);
  sectionLabel(ctx, "Section 2 of 6 — The most powerful single criterion", 48, 128);

  // PVS1 definition box
  ctx.fillStyle = CLR.accentLight; ctx.fillRect(48, 156, W - 96, 80);
  ctx.fillStyle = CLR.accent; ctx.fillRect(48, 156, 8, 80);
  setFont(ctx, 17, "bold"); ctx.fillStyle = CLR.accentDark;
  ctx.fillText("PVS1 (Very Strong Pathogenic)", 72, 184);
  setFont(ctx, 15, "normal"); ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Null variant (nonsense, frameshift, canonical ±1/2 splice, initiation codon, whole exon deletion) in a gene where loss of function is the established disease mechanism.", 72, 208, W - 150, 22);

  // Null variant types
  let y = 260;
  setFont(ctx, 18, "bold"); ctx.fillStyle = CLR.heading;
  ctx.fillText("Null Variant Types Eligible for PVS1", 48, y);
  y += 28;

  const nullTypes = [
    { type: "Nonsense", example: "p.Arg83Ter", note: "PTC → NMD if >55 nt from last EEJ", color: CLR.red },
    { type: "Frameshift", example: "p.Asp412ValfsTer19", note: "Reading frame disrupted → PTC → NMD", color: CLR.violet },
    { type: "Canonical splice", example: "c.412+1G>A", note: "±1/2 positions of donor/acceptor sites", color: CLR.amber },
    { type: "Initiation codon", example: "p.Met1?", note: "Loss of start codon → no/reduced translation", color: CLR.blue },
    { type: "Exon deletion", example: "del exons 3-5", note: "Whole exon loss → frameshift or critical domain loss", color: CLR.green },
  ];

  for (const nt of nullTypes) {
    ctx.fillStyle = nt.color + "12"; ctx.fillRect(48, y, W - 96, 42);
    ctx.fillStyle = nt.color; ctx.fillRect(48, y, 6, 42);
    setFont(ctx, 15, "bold"); ctx.fillStyle = nt.color;
    ctx.fillText(nt.type, 68, y + 18);
    setFont(ctx, 14, "normal"); ctx.fillStyle = CLR.muted;
    ctx.fillText(nt.example, 250, y + 18);
    ctx.fillStyle = CLR.body;
    ctx.fillText(nt.note, 480, y + 18);
    y += 48;
  }

  // PVS1 caveats
  y += 12;
  ctx.fillStyle = CLR.redLight; ctx.fillRect(48, y, W - 96, 174);
  ctx.fillStyle = CLR.red; ctx.fillRect(48, y, 8, 174);
  setFont(ctx, 17, "bold"); ctx.fillStyle = CLR.red;
  ctx.fillText("PVS1 Caveats — When NOT to Apply Full Strength", 72, y + 26);

  setFont(ctx, 14, "normal"); ctx.fillStyle = CLR.body;
  const caveats = [
    "Last exon variants: PTC in last exon or last 50 nt of penultimate exon may escape NMD → truncated protein, not null",
    "Gain-of-function genes: PVS1 does NOT apply if the disease mechanism is GoF (e.g., some SCN8A, GRIN2A variants)",
    "LoF-tolerant genes: if the gene has many LoF variants in gnomAD (high o/e ratio), haploinsufficiency is questionable",
    "Alternative transcripts: if the variant only affects a minor/non-expressed isoform, functional impact may be minimal",
    "ClinGen PVS1 decision tree: use the published flowchart to determine appropriate strength (Very Strong → Strong → Moderate → Supporting)",
  ];
  let cy = y + 50;
  for (const c of caveats) {
    ctx.fillStyle = CLR.red; ctx.beginPath(); ctx.arc(62, cy - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    cy = drawWrapped(ctx, c, 76, cy, W - 160, 20) + 6;
  }

  // PS3/BS3
  y += 194;
  ctx.fillStyle = CLR.surface; ctx.fillRect(48, y, W - 96, 54);
  ctx.fillStyle = CLR.blue; ctx.fillRect(48, y, 6, 54);
  setFont(ctx, 15, "bold"); ctx.fillStyle = CLR.blueDark;
  ctx.fillText("PS3 / BS3 (Strong): Well-established functional studies", 68, y + 22);
  setFont(ctx, 13, "normal"); ctx.fillStyle = CLR.body;
  ctx.fillText("Cell-based assays, animal models, biochemical studies showing damaging (PS3) or no functional impact (BS3).", 68, y + 42);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 4: Population Frequency Evidence ──────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx); drawAccentBar(ctx);

  slideTitle(ctx, "Population Frequency Evidence", 72);
  sectionLabel(ctx, "Section 3 of 6 · gnomAD is the gold standard", 48, 128);

  // Frequency spectrum visual
  const freqBoxes = [
    { code: "BA1", label: "Stand-Alone Benign", threshold: ">5% in any subpopulation", color: CLR.green, bg: CLR.greenLight,
      desc: "Too common to be pathogenic for any dominant disease. Single criterion = Benign classification." },
    { code: "BS1", label: "Strong Benign", threshold: "> expected for disease prevalence", color: CLR.blue, bg: CLR.blueLight,
      desc: "Gene- and disease-specific thresholds apply. Use disease prevalence, genetic heterogeneity, and penetrance to calculate." },
    { code: "PM2", label: "Moderate Pathogenic", threshold: "Absent/extremely rare (AF <0.0001 AD; <0.001 AR)", color: CLR.accent, bg: CLR.accentLight,
      desc: "Supporting evidence for pathogenicity. Must be combined with other criteria. Beware: carrier frequencies for recessive conditions." },
  ];

  let y = 160;
  for (const f of freqBoxes) {
    ctx.fillStyle = f.bg; ctx.fillRect(48, y, W - 96, 120);
    ctx.fillStyle = f.color; ctx.fillRect(48, y, 8, 120);

    // Code badge
    ctx.fillStyle = f.color;
    ctx.fillRect(68, y + 14, 70, 30);
    setFont(ctx, 16, "bold"); ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center"; ctx.fillText(f.code, 103, y + 34); ctx.textAlign = "left";

    setFont(ctx, 17, "bold"); ctx.fillStyle = CLR.subheading;
    ctx.fillText(f.label, 152, y + 32);

    setFont(ctx, 15, "bold"); ctx.fillStyle = f.color;
    ctx.fillText("Threshold: " + f.threshold, 68, y + 64);

    setFont(ctx, 14, "normal"); ctx.fillStyle = CLR.body;
    drawWrapped(ctx, f.desc, 68, y + 88, W - 150, 20);

    y += 134;
  }

  // gnomAD callout
  ctx.fillStyle = CLR.surface; ctx.fillRect(48, y, W - 96, 110);
  ctx.fillStyle = CLR.accent; ctx.fillRect(48, y, 6, 110);
  setFont(ctx, 17, "bold"); ctx.fillStyle = CLR.accentDark;
  ctx.fillText("gnomAD: The Gold Standard Population Database", 68, y + 26);

  setFont(ctx, 14, "normal"); ctx.fillStyle = CLR.body;
  const gnomadPts = [
    ">250,000 exomes and genomes from diverse populations",
    "Check EACH subpopulation separately (not just overall AF) — BA1 applies to any single subpopulation >5%",
    "gnomAD contains some individuals with severe disease — rare pathogenic variants may be present at low carrier frequencies",
    "Always verify gnomAD version and whether your variant position has adequate coverage",
  ];
  let gy = y + 48;
  for (const pt of gnomadPts) {
    ctx.fillStyle = CLR.accent; ctx.beginPath(); ctx.arc(62, gy - 4, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    gy = drawWrapped(ctx, pt, 76, gy, W - 160, 20) + 4;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 5: Computational & Clinical Evidence ──────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx); drawAccentBar(ctx);

  slideTitle(ctx, "Computational & Clinical Evidence", 72);
  sectionLabel(ctx, "Section 4 of 6", 48, 128);

  // Two column layout
  const colW = (W - 120) / 2;

  // Left: In Silico
  ctx.fillStyle = CLR.violetLight; ctx.fillRect(48, 156, colW, 360);
  ctx.fillStyle = CLR.violet; ctx.fillRect(48, 156, 8, 360);
  setFont(ctx, 19, "bold"); ctx.fillStyle = CLR.violet;
  ctx.fillText("In Silico Predictions", 72, 186);
  setFont(ctx, 14, "bold"); ctx.fillStyle = CLR.subheading;
  ctx.fillText("PP3 / BP4 (Supporting only)", 72, 210);

  setFont(ctx, 14, "normal"); ctx.fillStyle = CLR.body;
  let ly = 238;
  const insilico = [
    "REVEL: ensemble score for missense pathogenicity",
    "CADD: Combined Annotation Dependent Depletion",
    "AlphaMissense: structure-based deep learning",
    "SpliceAI: deep-learning splice site predictor",
    "SIFT / PolyPhen-2: classic conservation tools",
    "",
    "Multiple concordant tools strengthen evidence",
    "Supporting strength ONLY — never sufficient alone",
    "ClinGen recommends specific thresholds per tool",
  ];
  for (const pt of insilico) {
    if (pt === "") { ly += 10; continue; }
    ctx.fillStyle = CLR.violet; ctx.beginPath(); ctx.arc(62, ly - 4, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    ly = drawWrapped(ctx, pt, 76, ly, colW - 50, 22) + 4;
  }

  // Right: Clinical Evidence
  const rx = 48 + colW + 24;
  ctx.fillStyle = CLR.blueLight; ctx.fillRect(rx, 156, colW, 360);
  ctx.fillStyle = CLR.blue; ctx.fillRect(rx, 156, 8, 360);
  setFont(ctx, 19, "bold"); ctx.fillStyle = CLR.blue;
  ctx.fillText("Clinical & Segregation Evidence", rx + 24, 186);

  setFont(ctx, 14, "normal"); ctx.fillStyle = CLR.body;
  let ry2 = 215;
  const clinical = [
    { code: "PS4", strength: "Strong", desc: "Significantly enriched in affected vs. controls (OR ≥5, CI not crossing 1.0)" },
    { code: "PP1", strength: "Supporting→Strong", desc: "Segregation with disease; ≥3 informative meioses → Strong" },
    { code: "BS4", strength: "Strong Benign", desc: "Non-segregation with disease in affected family member" },
    { code: "PM3", strength: "Moderate", desc: "In trans with known pathogenic variant (for recessive diseases)" },
    { code: "BP2", strength: "Supporting Benign", desc: "In cis with known pathogenic variant (variant on same allele)" },
    { code: "PS2", strength: "Strong", desc: "Confirmed de novo in proband (both parents tested)" },
  ];
  for (const c of clinical) {
    ctx.fillStyle = CLR.blue;
    ctx.fillRect(rx + 18, ry2 - 2, 42, 20);
    setFont(ctx, 11, "bold"); ctx.fillStyle = "#ffffff";
    ctx.fillText(c.code, rx + 22, ry2 + 12);
    setFont(ctx, 12, "bold"); ctx.fillStyle = CLR.blue;
    ctx.fillText(c.strength, rx + 66, ry2 + 12);
    setFont(ctx, 13, "normal"); ctx.fillStyle = CLR.body;
    drawWrapped(ctx, c.desc, rx + 18, ry2 + 28, colW - 42, 18);
    ry2 += 52;
  }

  // PM1 Hotspot note
  let y = 536;
  ctx.fillStyle = CLR.amberLight; ctx.fillRect(48, y, W - 96, 60);
  ctx.fillStyle = CLR.amber; ctx.fillRect(48, y, 6, 60);
  setFont(ctx, 14, "bold"); ctx.fillStyle = "#92400e";
  ctx.fillText("PM1 (Moderate): Variant in a well-established mutational hotspot or critical functional domain", 68, y + 22);
  setFont(ctx, 13, "normal"); ctx.fillStyle = CLR.body;
  ctx.fillText("e.g., KCNQ2 voltage sensor residues, ion channel pore regions, catalytic active sites. Requires domain-level evidence.", 68, y + 44);

  // PP4 note
  y += 72;
  ctx.fillStyle = CLR.greenLight; ctx.fillRect(48, y, W - 96, 48);
  ctx.fillStyle = CLR.green; ctx.fillRect(48, y, 6, 48);
  setFont(ctx, 14, "bold"); ctx.fillStyle = "#166534";
  ctx.fillText("PP4 (Supporting): Patient's phenotype is highly specific for the gene", 68, y + 18);
  setFont(ctx, 13, "normal"); ctx.fillStyle = CLR.body;
  ctx.fillText("e.g., SCN8A missense in an infant with early-infantile epileptic encephalopathy matching the known SCN8A phenotype.", 68, y + 38);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 6: All Criteria Summary Table ─────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx); drawAccentBar(ctx);

  slideTitle(ctx, "ACMG/AMP Criteria: Complete Reference", 72);
  sectionLabel(ctx, "Quick reference for all pathogenic criteria", 48, 128);

  const headers = ["Code", "Strength", "Evidence Description"];
  const rows = [
    ["PVS1", "Very Strong", "Null variant in haploinsufficiency gene (NMD predicted)"],
    ["PS1", "Strong", "Same amino acid change as established pathogenic variant"],
    ["PS2", "Strong", "De novo (confirmed, both parents tested)"],
    ["PS3", "Strong", "Well-established functional study showing damaging effect"],
    ["PS4", "Strong", "Prevalence in affected significantly > controls (OR ≥5)"],
    ["PM1", "Moderate", "In mutational hotspot / critical functional domain"],
    ["PM2", "Moderate", "Absent / very rare in population databases (gnomAD)"],
    ["PM3", "Moderate", "In trans with pathogenic variant (recessive disease)"],
    ["PM4", "Moderate", "Protein length change (in-frame del/ins, stop-loss)"],
    ["PM5", "Moderate", "Novel missense at same position as known pathogenic"],
    ["PM6", "Moderate", "Assumed de novo (parental testing incomplete)"],
    ["PP1", "Supporting", "Segregation with disease in family"],
    ["PP2", "Supporting", "Missense in gene with low benign missense rate"],
    ["PP3", "Supporting", "Multiple in silico tools predict deleterious"],
    ["PP4", "Supporting", "Phenotype highly specific for the gene"],
    ["PP5", "Supporting", "Reputable source reports variant as pathogenic"],
  ];
  const colWidths = [80, 140, 780];
  drawTable(ctx, headers, rows, 48, 150, colWidths, 38);

  // Benign criteria summary
  let y = 150 + 38 * 17 + 14;
  setFont(ctx, 15, "bold"); ctx.fillStyle = CLR.heading;
  ctx.fillText("Key Benign Criteria:", 48, y);
  setFont(ctx, 13, "normal"); ctx.fillStyle = CLR.body;
  ctx.fillText("BA1: AF >5%   |   BS1: AF > expected   |   BS2: Healthy homozygotes/hemizygotes   |   BS3: Functional study shows no impact   |   BS4: Non-segregation", 48, y + 22);
  ctx.fillText("BP1: Missense in gene where LoF is mechanism   |   BP4: In silico predicts benign   |   BP7: Synonymous, no splice impact   |   BP2: In cis with pathogenic", 48, y + 42);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 7: Neurogenetics Applications ─────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx); drawAccentBar(ctx);

  slideTitle(ctx, "Neurogenetics-Specific Considerations", 72);
  sectionLabel(ctx, "Section 5 of 6 — Common classification pitfalls", 48, 128);

  const considerations = [
    { icon: "GoF", color: CLR.red, bg: CLR.redLight,
      title: "Gain-of-Function Genes: PVS1 Does NOT Apply",
      body: "SCN8A GoF, GRIN2A GoF, KCNA2 GoF — missense variants that activate the channel are pathogenic via a different mechanism. Truncating variants may actually be benign or cause a different phenotype. Always verify the disease mechanism before applying PVS1." },
    { icon: "PM1", color: CLR.violet, bg: CLR.violetLight,
      title: "Mutational Hotspots and Functional Domains",
      body: "KCNQ2 voltage sensor (S4), SCN1A pore-forming regions, GRIN2B M2 segment. PM1 applies when the variant falls within a well-characterized hotspot with documented clustering of pathogenic variants." },
    { icon: "PS2", color: CLR.blue, bg: CLR.blueLight,
      title: "De Novo Evidence Is Especially Powerful in Epilepsy",
      body: "Most severe DEE-causing variants are de novo. PS2 (Strong) when confirmed de novo in proband with matching phenotype. High de novo rate in SCN1A (~95% in Dravet), KCNQ2, SCN2A, STXBP1, CDKL5." },
    { icon: "VCEP", color: CLR.green, bg: CLR.greenLight,
      title: "Gene-Specific ClinGen VCEP Guidelines",
      body: "Published VCEPs (e.g., SCN1A, CDH1, PTEN, RASopathy genes) REPLACE standard ACMG/AMP rules for that gene. Always check ClinGen for a current VCEP SOP before finalizing any classification." },
    { icon: "PP4", color: CLR.amber, bg: CLR.amberLight,
      title: "Phenotype Specificity in Neurogenetics",
      body: "PP4 applies when phenotype is highly specific: KCNQ2 benign familial neonatal epilepsy, MECP2 in classic Rett features, SCN8A in EIEE13. The more distinctive the phenotype-genotype correlation, the stronger this evidence." },
  ];

  let y = 158;
  for (const c of considerations) {
    ctx.fillStyle = c.bg; ctx.fillRect(48, y, W - 96, 110);
    ctx.fillStyle = c.color; ctx.fillRect(48, y, 8, 110);

    // Icon badge
    ctx.fillStyle = c.color; ctx.fillRect(68, y + 12, 52, 26);
    setFont(ctx, 12, "bold"); ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center"; ctx.fillText(c.icon, 94, y + 30); ctx.textAlign = "left";

    setFont(ctx, 16, "bold"); ctx.fillStyle = CLR.subheading;
    ctx.fillText(c.title, 134, y + 30);

    setFont(ctx, 13, "normal"); ctx.fillStyle = CLR.body;
    drawWrapped(ctx, c.body, 68, y + 52, W - 150, 20);

    y += 120;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 8: Worked Example ─────────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx); drawAccentBar(ctx);

  slideTitle(ctx, "Worked Example: SCN1A Frameshift in Dravet", 72);
  sectionLabel(ctx, "Applying ACMG/AMP criteria step by step", 48, 128);

  // Case box
  ctx.fillStyle = CLR.surface; ctx.fillRect(48, 150, W - 96, 80);
  ctx.fillStyle = CLR.accent; ctx.fillRect(48, 150, 6, 80);
  setFont(ctx, 15, "bold"); ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Case: 9-month-old with prolonged febrile and afebrile seizures, developmental plateau", 68, 176);
  setFont(ctx, 14, "normal"); ctx.fillStyle = CLR.body;
  ctx.fillText("WES identifies: SCN1A c.1234delA (p.Asp412ValfsTer19) — heterozygous, confirmed de novo", 68, 200);

  // Evidence evaluation
  let y = 252;
  const evidence = [
    { code: "PVS1", strength: "Very Strong", applied: "Yes", rationale: "Frameshift → NMD predicted (exon 8 of 26). SCN1A is a well-established haploinsufficiency gene for Dravet syndrome.", color: CLR.accent },
    { code: "PS2", strength: "Strong", applied: "Yes", rationale: "Confirmed de novo — variant absent in both biological parents by Sanger confirmation.", color: CLR.blue },
    { code: "PM2", strength: "Moderate", applied: "Yes", rationale: "Absent from gnomAD (>250,000 individuals). No population occurrences.", color: CLR.violet },
    { code: "PP4", strength: "Supporting", applied: "Yes", rationale: "Phenotype (prolonged febrile seizures progressing to Dravet) is highly specific for SCN1A.", color: CLR.green },
  ];

  for (const e of evidence) {
    ctx.fillStyle = e.color + "12"; ctx.fillRect(48, y, W - 96, 68);
    ctx.fillStyle = e.color; ctx.fillRect(48, y, 6, 68);

    ctx.fillStyle = e.color; ctx.fillRect(62, y + 10, 60, 24);
    setFont(ctx, 13, "bold"); ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center"; ctx.fillText(e.code, 92, y + 26); ctx.textAlign = "left";

    setFont(ctx, 13, "bold"); ctx.fillStyle = e.color;
    ctx.fillText(e.strength, 134, y + 26);

    setFont(ctx, 13, "normal"); ctx.fillStyle = CLR.body;
    drawWrapped(ctx, e.rationale, 62, y + 44, W - 140, 18);
    y += 76;
  }

  // Classification result
  y += 8;
  ctx.fillStyle = "#dc2626"; ctx.fillRect(48, y, W - 96, 60);
  setFont(ctx, 22, "bold"); ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText("Classification: PATHOGENIC", W / 2, y + 28);
  setFont(ctx, 14, "normal");
  ctx.fillText("PVS1 + PS2 = Pathogenic (exceeds minimum: 1 Very Strong + 1 Strong). Additional PM2 + PP4 further support.", W / 2, y + 50);
  ctx.textAlign = "left";

  // Clinical implication
  y += 78;
  ctx.fillStyle = CLR.accentLight; ctx.fillRect(48, y, W - 96, 70);
  ctx.fillStyle = CLR.accent; ctx.fillRect(48, y, 6, 70);
  setFont(ctx, 15, "bold"); ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Clinical Implication:", 68, y + 22);
  setFont(ctx, 14, "normal"); ctx.fillStyle = CLR.body;
  ctx.fillText("Confirms Dravet syndrome diagnosis. Avoid sodium channel blockers (carbamazepine, lamotrigine, phenytoin) — they worsen SCN1A LoF seizures.", 68, y + 44);
  ctx.fillText("Consider stiripentol, clobazam, valproate, fenfluramine as preferred agents.", 68, y + 64);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 9: VUS Counseling ─────────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx); drawAccentBar(ctx);

  slideTitle(ctx, "VUS Counseling: Communicating Uncertainty", 72);
  sectionLabel(ctx, "Section 6 of 6", 48, 128);

  // Sample language box
  ctx.fillStyle = CLR.surface; ctx.fillRect(48, 156, W - 96, 84);
  ctx.fillStyle = CLR.accent; ctx.fillRect(48, 156, 6, 84);
  setFont(ctx, 14, "bold"); ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Sample framing language:", 68, 178);
  setFont(ctx, 14, "italic"); ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "\"This variant is currently classified as uncertain, which means we do not yet have enough scientific evidence to know whether it contributes to your child's condition or is a harmless change. We will re-evaluate as new information becomes available.\"", 68, 200, W - 140, 20);

  // Key principles
  let y = 262;
  const principles = [
    { n: "1", color: CLR.red, bg: CLR.redLight,
      head: "Never use a VUS to confirm a diagnosis",
      body: "Clinical management should be guided by clinical findings alone. Do not start or change treatments based on a VUS." },
    { n: "2", color: CLR.blue, bg: CLR.blueLight,
      head: "Encourage family segregation testing",
      body: "Testing parents and siblings generates PP1 (co-segregation) or BS4 (non-segregation) evidence that can shift classification." },
    { n: "3", color: CLR.amber, bg: CLR.amberLight,
      head: "Schedule re-analysis every 1–2 years",
      body: "Gene-disease knowledge and population databases grow continuously. ~10–20% of VUS are reclassified within 5 years." },
    { n: "4", color: CLR.green, bg: CLR.greenLight,
      head: "Most reclassifications trend toward benign",
      body: "As population databases grow, many VUS are found at frequencies inconsistent with disease. This is reassuring for families." },
    { n: "5", color: CLR.violet, bg: CLR.violetLight,
      head: "Document uncertainty clearly in the medical record",
      body: "Explicit language about VUS status prevents downstream misinterpretation by other providers who may assume it is a diagnosis." },
  ];

  for (const p of principles) {
    ctx.fillStyle = p.bg; ctx.fillRect(48, y, W - 96, 90);
    ctx.fillStyle = p.color; ctx.fillRect(48, y, 8, 90);

    ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(78, y + 28, 16, 0, Math.PI * 2); ctx.fill();
    setFont(ctx, 15, "bold"); ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center"; ctx.fillText(p.n, 78, y + 34); ctx.textAlign = "left";

    setFont(ctx, 16, "bold"); ctx.fillStyle = CLR.subheading;
    ctx.fillText(p.head, 108, y + 28);
    setFont(ctx, 13, "normal"); ctx.fillStyle = CLR.body;
    drawWrapped(ctx, p.body, 108, y + 50, W - 190, 20);

    y += 98;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 10: Key Takeaways ─────────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx); drawAccentBar(ctx);

  slideTitle(ctx, "Variant Interpretation: Key Takeaways", 72);
  sectionLabel(ctx, "Summary", 48, 128);

  const takeaways = [
    { n: "1", color: CLR.accent, bg: CLR.accentLight,
      head: "Systematic evaluation across all evidence domains",
      body: "Never classify based on a single criterion. Combine population, computational, functional, segregation, and phenotype evidence using ACMG combining rules." },
    { n: "2", color: CLR.blue, bg: CLR.blueLight,
      head: "PVS1 is the most powerful — but has strict requirements",
      body: "Requires haploinsufficiency gene + NMD prediction. Does NOT apply to GoF genes, last-exon variants (without careful evaluation), or LoF-tolerant genes." },
    { n: "3", color: CLR.green, bg: CLR.greenLight,
      head: "Population frequency is the strongest benign evidence",
      body: "BA1 (>5%) alone classifies as Benign. Always check individual subpopulations in gnomAD, not just overall frequency." },
    { n: "4", color: CLR.violet, bg: CLR.violetLight,
      head: "In silico tools are Supporting only — never sufficient alone",
      body: "PP3/BP4 provide Supporting evidence. Multiple concordant tools strengthen confidence but cannot reach P/LP without other criteria." },
    { n: "5", color: CLR.amber, bg: CLR.amberLight,
      head: "Gene-specific VCEP guidelines supersede default rules",
      body: "Always check ClinGen for published gene-specific guidelines before finalizing classification. VCEPs refine thresholds and restrict inapplicable criteria." },
    { n: "6", color: CLR.red, bg: CLR.redLight,
      head: "VUS is NOT a diagnosis — communicate clearly",
      body: "Never act on a VUS clinically. Re-analyze periodically. Encourage parental testing. Document uncertainty explicitly in the medical record." },
  ];

  let y = 158;
  for (const pt of takeaways) {
    ctx.fillStyle = pt.bg; ctx.fillRect(48, y, W - 96, 96);
    ctx.fillStyle = pt.color; ctx.fillRect(48, y, 8, 96);

    ctx.fillStyle = pt.color; ctx.beginPath(); ctx.arc(78, y + 30, 16, 0, Math.PI * 2); ctx.fill();
    setFont(ctx, 14, "bold"); ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center"; ctx.fillText(pt.n, 78, y + 36); ctx.textAlign = "left";

    setFont(ctx, 16, "bold"); ctx.fillStyle = CLR.subheading;
    ctx.fillText(pt.head, 108, y + 26);
    setFont(ctx, 13, "normal"); ctx.fillStyle = CLR.body;
    drawWrapped(ctx, pt.body, 108, y + 48, W - 185, 20);

    y += 104;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Write manifest ──────────────────────────────────────────────────────────
const manifest = { moduleId: "variant-interpretation", count: TOTAL, format: "jpg", generatedAt: new Date().toISOString() };
fs.writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\n✓ Done — ${TOTAL} slides → public/slides/variant-interpretation/`);
