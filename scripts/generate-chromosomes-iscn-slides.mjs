/**
 * scripts/generate-chromosomes-iscn-slides.mjs
 *
 * Generates slide images for the "Human Chromosome Nomenclature (ISCN)" module.
 *
 * Run: node scripts/generate-chromosomes-iscn-slides.mjs
 */

import { createCanvas } from "@napi-rs/canvas";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "slides", "chromosomes-iscn");
fs.mkdirSync(OUT_DIR, { recursive: true });

const W = 1540;
const H = 1188;

const CLR = {
  bg: "#ffffff",
  surface: "#f8f9fa",
  border: "#e2e8f0",
  accent: "#475569",       // slate-600
  accentLight: "#f1f5f9",  // slate-100
  accentDark: "#1e293b",   // slate-800
  heading: "#0f172a",
  subheading: "#1e293b",
  body: "#334155",
  muted: "#64748b",
  mutedLight: "#94a3b8",
  green: "#16a34a",
  greenLight: "#f0fdf4",
  amber: "#d97706",
  amberLight: "#fffbeb",
  red: "#dc2626",
  redLight: "#fef2f2",
  blue: "#3b82f6",
  blueLight: "#eff6ff",
  tableHeader: "#1e293b",
  tableRow1: "#ffffff",
  tableRow2: "#f1f5f9",
};

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

function drawBackground(ctx) {
  ctx.fillStyle = CLR.bg;
  ctx.fillRect(0, 0, W, H);
}

function drawAccentBar(ctx) {
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(0, 0, W, 6);
}

function drawFooter(ctx, num, total) {
  ctx.strokeStyle = CLR.border;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(40, H - 52);
  ctx.lineTo(W - 40, H - 52);
  ctx.stroke();
  setFont(ctx, 16, "normal");
  ctx.fillStyle = CLR.accent;
  ctx.fillText("Human Chromosome Nomenclature (ISCN)", 48, H - 30);
  setFont(ctx, 18, "normal");
  ctx.fillStyle = CLR.mutedLight;
  ctx.textAlign = "right";
  ctx.fillText(`${num} / ${total}`, W - 40, H - 30);
  ctx.textAlign = "left";
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
      const isFirst = c === 0;
      setFont(ctx, 14, isFirst ? "bold" : "normal");
      ctx.fillStyle = isFirst ? CLR.accentDark : CLR.body;
      ctx.save();
      ctx.rect(cx + 8, ry, colWidths[c] - 16, rowH);
      ctx.clip();
      ctx.fillText(rows[r][c], cx + 10, ry + rowH / 2 + 5);
      ctx.restore();
      cx += colWidths[c];
    }
    ry += rowH;
  }
  return ry;
}

// ═════════════════════════════════════════════════════════════════════════════
const TOTAL = 7;
let slideNum = 0;

// ── Slide 1: Title ──────────────────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);

  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(0, 0, 10, H);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(0, 0, 10, H * 0.45);

  setFont(ctx, 48, "bold");
  ctx.fillStyle = CLR.heading;
  ctx.fillText("Human Chromosome", 80, 230);
  ctx.fillText("Nomenclature (ISCN)", 80, 290);

  ctx.fillStyle = CLR.accent;
  ctx.fillRect(80, 318, 520, 5);

  setFont(ctx, 24, "normal");
  ctx.fillStyle = CLR.muted;
  ctx.fillText("The Universal Language of Cytogenomics", 80, 365);

  setFont(ctx, 18, "normal");
  ctx.fillStyle = CLR.mutedLight;
  ctx.fillText("Chromosome structure, karyotyping, ISCN notation, aneuploidies, array CNV nomenclature", 80, 405);

  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(W - 420, 120, 360, 260);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(W - 420, 120, 6, 260);

  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("5 Sections  --  5 Quiz Questions", W - 390, 170);
  setFont(ctx, 15, "normal");
  const topics = [
    "Chromosome Morphology & G-Banding",
    "ISCN Karyotype Notation Basics",
    "Numerical & Structural Abnormalities",
    "Mosaicism & Special Notations",
    "Array Cytogenomics: CNV Nomenclature",
  ];
  let ty = 204;
  for (const t of topics) {
    ctx.fillStyle = CLR.accent;
    ctx.beginPath(); ctx.arc(W - 378, ty - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    ctx.fillText(t, W - 364, ty);
    ty += 30;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 2: Chromosome Morphology & G-Banding ─────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Chromosome Morphology & G-Banding", 72);
  sectionLabel(ctx, "Section 1 of 5", 48, 128);

  setFont(ctx, 16, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Human somatic cells contain 46 chromosomes -- 22 pairs of autosomes and one pair of sex chromosomes. Each has a characteristic size, centromere position, and banding pattern.", 48, 165, W - 96, 26);

  // Centromere types table
  const headers = ["Morphology", "Centromere Position", "Examples"];
  const rows = [
    ["Metacentric", "Central (equal arms)", "Chromosomes 1, 3, 16, 19, 20"],
    ["Submetacentric", "Off-center (unequal arms)", "Chromosomes 2, 4-12, 17, 18, X"],
    ["Acrocentric", "Near tip (short arms = satellites)", "Chromosomes 13, 14, 15, 21, 22"],
  ];
  drawTable(ctx, headers, rows, 48, 240, [240, 340, 380], 54);

  // Arm notation
  let y = 430;
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, y, W - 96, 70);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, y, 6, 70);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Arm Notation", 68, y + 26);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  ctx.fillText("p = short arm (from French 'petit')    |    q = long arm", 68, y + 52);

  y += 90;
  // Banding info
  const bandPts = [
    "G-banding (Giemsa after trypsin) produces alternating light and dark bands.",
    "G-dark bands: AT-rich, gene-poor, late-replicating.",
    "G-light bands: GC-rich, gene-dense, early-replicating.",
    "Standard resolution: 400-550 bands; high-resolution: 550-850 bands. Detects rearrangements >=5-10 Mb.",
  ];
  setFont(ctx, 15, "normal");
  for (const pt of bandPts) {
    y = bullet(ctx, pt, 78, y, W - 140, 26);
    y += 6;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 3: ISCN Karyotype Notation ────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "ISCN Karyotype Notation: The Basics", 72);
  sectionLabel(ctx, "Section 2 of 5", 48, 128);

  setFont(ctx, 16, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "ISCN provides a standardized framework for describing chromosomal findings. A complete karyotype has three mandatory components:", 48, 165, W - 96, 26);

  const components = [
    { num: "1", label: "Total chromosome number", example: "46" },
    { num: "2", label: "Sex chromosome complement", example: "XX or XY" },
    { num: "3", label: "Any abnormality or variant", example: "+21, del(7)(q11.23)" },
  ];

  let y = 225;
  for (const c of components) {
    ctx.fillStyle = CLR.accentLight;
    ctx.fillRect(48, y, W - 96, 56);
    ctx.fillStyle = CLR.accent;
    ctx.fillRect(48, y, 8, 56);

    ctx.fillStyle = CLR.accent;
    ctx.beginPath(); ctx.arc(80, y + 28, 18, 0, Math.PI * 2); ctx.fill();
    setFont(ctx, 18, "bold");
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(c.num, 80, y + 35);
    ctx.textAlign = "left";

    setFont(ctx, 17, "bold");
    ctx.fillStyle = CLR.subheading;
    ctx.fillText(c.label, 114, y + 24);
    setFont(ctx, 15, "normal");
    ctx.fillStyle = CLR.muted;
    ctx.fillText("e.g., " + c.example, 114, y + 46);

    y += 70;
  }

  // Normal karyotypes
  ctx.fillStyle = CLR.greenLight;
  ctx.fillRect(48, y + 10, W - 96, 60);
  ctx.fillStyle = CLR.green;
  ctx.fillRect(48, y + 10, 6, 60);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.green;
  ctx.fillText("Normal karyotypes:   46,XX (female)    46,XY (male)", 68, y + 48);

  y += 90;
  // Band nomenclature
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.subheading;
  ctx.fillText("Band Nomenclature Example: 7q11.23", 48, y);
  y += 30;

  const bandParts = [
    { label: "7", desc: "Chromosome number" },
    { label: "q", desc: "Long arm" },
    { label: "1", desc: "Region 1" },
    { label: "1", desc: "Band 1" },
    { label: ".23", desc: "Sub-band 23" },
  ];

  let bx = 48;
  for (const bp of bandParts) {
    const boxW = 170;
    ctx.fillStyle = CLR.accentLight;
    ctx.fillRect(bx, y, boxW, 60);
    ctx.fillStyle = CLR.accent;
    ctx.fillRect(bx, y, boxW, 3);
    setFont(ctx, 22, "bold");
    ctx.fillStyle = CLR.accentDark;
    ctx.textAlign = "center";
    ctx.fillText(bp.label, bx + boxW / 2, y + 28);
    setFont(ctx, 13, "normal");
    ctx.fillStyle = CLR.muted;
    ctx.fillText(bp.desc, bx + boxW / 2, y + 48);
    ctx.textAlign = "left";
    bx += boxW + 12;
  }

  setFont(ctx, 14, "normal");
  ctx.fillStyle = CLR.muted;
  ctx.fillText("Bands are numbered from centromere outward. 7q11.23 = Williams-Beuren syndrome critical region.", 48, y + 84);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 4: Numerical & Structural Abnormalities ───────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Numerical & Structural Abnormalities", 72);
  sectionLabel(ctx, "Section 3 of 5", 48, 128);

  const headers = ["Abnormality", "ISCN Symbol", "Example", "Disorder"];
  const rows = [
    ["Trisomy", "+", "47,XY,+21", "Down syndrome"],
    ["Monosomy", "-", "45,X", "Turner syndrome"],
    ["Deletion", "del", "del(7)(q11.23q11.23)", "Williams syndrome"],
    ["Duplication", "dup", "dup(17)(p12p12)", "CMT1A"],
    ["Inversion", "inv", "inv(16)(p13.1q22)", "AML (somatic)"],
    ["Translocation", "t", "t(9;22)(q34;q11.2)", "Philadelphia chr (CML)"],
    ["Ring chromosome", "r", "r(20)(p13q13.3)", "Ring chr 20 epilepsy"],
    ["Derivative", "der", "der(22)t(11;22)", "Emanuel syndrome"],
  ];
  const colWidths = [190, 130, 330, 310];
  drawTable(ctx, headers, rows, 48, 150, colWidths, 50);

  let y = 570;
  // Key note
  ctx.fillStyle = CLR.amberLight;
  ctx.fillRect(48, y, W - 96, 80);
  ctx.fillStyle = CLR.amber;
  ctx.fillRect(48, y, 6, 80);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.amber;
  ctx.fillText("Key Distinction", 68, y + 26);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Numerical abnormalities change total chromosome count. Structural abnormalities rearrange material without necessarily changing count. Balanced rearrangements may carry no phenotypic effect but increase risk in offspring.", 68, y + 48, W - 140, 22);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 5: Mosaicism & Special Notations ──────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Mosaicism & Special Notations", 72);
  sectionLabel(ctx, "Section 4 of 5", 48, 128);

  setFont(ctx, 16, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Mosaicism -- two or more chromosomally distinct cell populations in one individual -- arises from post-zygotic mutation. Severity often correlates with proportion of abnormal cells and tissues affected.", 48, 165, W - 96, 26);

  let y = 240;
  // Mosaic notation example
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, y, W - 96, 100);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, y, 6, 100);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Mosaic Notation Example", 68, y + 28);
  setFont(ctx, 20, "bold");
  ctx.fillStyle = CLR.accent;
  ctx.fillText("45,X[12] / 46,XX[18]", 68, y + 60);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  ctx.fillText("= Mosaic Turner syndrome: 45,X in 12 cells, 46,XX in 18 cells (30 total analyzed)", 68, y + 86);

  y += 130;
  // Special notations
  const specials = [
    { symbol: "mos", desc: "Explicitly denotes mosaicism (optional prefix when slash notation is used)" },
    { symbol: "idic", desc: "Isodicentric chromosome: single chromosome with two centromeres from one chromosome" },
    { symbol: "mar", desc: "Marker chromosome: small, structurally abnormal chromosome of uncertain origin; requires FISH/array" },
    { symbol: "[n]", desc: "Cell count in brackets -- minimum 20 metaphases analyzed for routine constitutional studies" },
  ];

  for (const s of specials) {
    ctx.fillStyle = CLR.surface;
    ctx.fillRect(48, y, 100, 44);
    setFont(ctx, 16, "bold");
    ctx.fillStyle = CLR.accentDark;
    ctx.textAlign = "center";
    ctx.fillText(s.symbol, 98, y + 28);
    ctx.textAlign = "left";
    setFont(ctx, 15, "normal");
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, s.desc, 168, y + 16, W - 230, 22);
    y += 58;
  }

  // Clinical note
  ctx.fillStyle = CLR.redLight;
  ctx.fillRect(48, y + 10, W - 96, 60);
  ctx.fillStyle = CLR.red;
  ctx.fillRect(48, y + 10, 6, 60);
  setFont(ctx, 15, "bold");
  ctx.fillStyle = CLR.red;
  drawWrapped(ctx, "Clinical pearl: Low-level mosaicism may be missed by standard 20-cell karyotype. FISH on 100+ cells or CMA may be needed for detection.", 68, y + 38, W - 140, 22);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 6: Array Cytogenomics ─────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Array Cytogenomics: CNV Nomenclature", 72);
  sectionLabel(ctx, "Section 5 of 5", 48, 128);

  setFont(ctx, 16, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Chromosomal microarray (CMA) and WGS generate copy number data described using ISCN 2020 notation with genome build coordinates alongside classic cytogenetic band nomenclature.", 48, 165, W - 96, 26);

  let y = 230;
  // Format
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, y, W - 96, 50);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, y, 6, 50);
  setFont(ctx, 15, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Format:  arr[genome build] band(start_end) x copy_number", 68, y + 32);

  y += 72;
  // Examples
  const examples = [
    {
      label: "Deletion (x1)",
      notation: "arr[GRCh38] 22q11.21(18,912,231_21,465,672)x1",
      meaning: "Single copy = heterozygous deletion (22q11.2 deletion syndrome / DiGeorge)",
    },
    {
      label: "Duplication (x3)",
      notation: "arr[GRCh38] 17p12(14,083,954_15,493,719)x3",
      meaning: "Three copies = heterozygous duplication (CMT1A / PMP22 duplication)",
    },
    {
      label: "Copy-neutral LOH (hmz)",
      notation: "arr[GRCh38] 15q11.2q13.1(...)hmz",
      meaning: "No copy number change but absence of heterozygosity -- important for recessive disease and imprinting disorders",
    },
  ];

  for (const ex of examples) {
    ctx.fillStyle = CLR.surface;
    ctx.fillRect(48, y, W - 96, 100);
    ctx.fillStyle = CLR.accent;
    ctx.fillRect(48, y, 6, 100);
    setFont(ctx, 16, "bold");
    ctx.fillStyle = CLR.accentDark;
    ctx.fillText(ex.label, 68, y + 24);
    setFont(ctx, 14, "bold");
    ctx.fillStyle = CLR.accent;
    ctx.fillText(ex.notation, 68, y + 50);
    setFont(ctx, 14, "normal");
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, ex.meaning, 68, y + 74, W - 150, 22);
    y += 118;
  }

  // Key point
  ctx.fillStyle = CLR.greenLight;
  ctx.fillRect(48, y + 6, W - 96, 50);
  ctx.fillStyle = CLR.green;
  ctx.fillRect(48, y + 6, 6, 50);
  setFont(ctx, 15, "bold");
  ctx.fillStyle = CLR.green;
  ctx.fillText("Normal diploid copy number = 2. x1 = deletion, x3 = duplication, x0 = homozygous deletion.", 68, y + 38);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 7: Key Takeaways ──────────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Key Takeaways", 72);
  sectionLabel(ctx, "Summary", 48, 128);

  const takeaways = [
    {
      n: "1", color: CLR.accent, bg: CLR.accentLight,
      head: "Chromosome structure is identifiable",
      body: "46 chromosomes, centromere divides p (short) and q (long) arms. G-banding at 400-550 band resolution for routine analysis.",
    },
    {
      n: "2", color: CLR.blue, bg: CLR.blueLight,
      head: "ISCN is the universal notation",
      body: "Format: total count, sex chromosomes, abnormalities. Band notation: chromosome + arm + region + band + sub-band (e.g., 7q11.23).",
    },
    {
      n: "3", color: CLR.green, bg: CLR.greenLight,
      head: "Know the common abnormalities",
      body: "Trisomy (+), monosomy (-), deletion (del), duplication (dup), translocation (t), inversion (inv). Learn their ISCN symbols.",
    },
    {
      n: "4", color: CLR.amber, bg: CLR.amberLight,
      head: "Mosaicism requires careful interpretation",
      body: "Slash notation separates cell lines. Severity correlates with proportion and tissue distribution. Low-level mosaicism may need FISH on 100+ cells.",
    },
    {
      n: "5", color: CLR.red, bg: CLR.redLight,
      head: "Array ISCN for modern genomics",
      body: "arr[build] band(coordinates)x copy_number. Copy-neutral LOH (hmz) flags recessive disease risk and imprinting disorders.",
    },
  ];

  let y = 158;
  for (const pt of takeaways) {
    ctx.fillStyle = pt.bg;
    ctx.fillRect(48, y, W - 96, 108);
    ctx.fillStyle = pt.color;
    ctx.fillRect(48, y, 8, 108);

    ctx.fillStyle = pt.color;
    ctx.beginPath(); ctx.arc(80, y + 34, 20, 0, Math.PI * 2); ctx.fill();
    setFont(ctx, 20, "bold");
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(pt.n, 80, y + 41);
    ctx.textAlign = "left";

    setFont(ctx, 18, "bold");
    ctx.fillStyle = CLR.subheading;
    ctx.fillText(pt.head, 116, y + 30);

    setFont(ctx, 15, "normal");
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, pt.body, 116, y + 58, W - 190, 24);

    y += 124;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Write manifest ─────────────────────────────────────────────────────────────
const manifest = {
  moduleId: "chromosomes-iscn",
  count: TOTAL,
  format: "jpg",
  generatedAt: new Date().toISOString(),
};
fs.writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\nDone -- ${TOTAL} slides -> public/slides/chromosomes-iscn/`);
