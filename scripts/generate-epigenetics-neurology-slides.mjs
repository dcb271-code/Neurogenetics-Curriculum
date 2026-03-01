/**
 * scripts/generate-epigenetics-neurology-slides.mjs
 *
 * Generates slide images for the "Epigenetics in Neurological Disease" module.
 *
 * Run: node scripts/generate-epigenetics-neurology-slides.mjs
 */

import { createCanvas } from "@napi-rs/canvas";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "slides", "epigenetics-neurology");
fs.mkdirSync(OUT_DIR, { recursive: true });

const W = 1540;
const H = 1188;

const CLR = {
  bg: "#ffffff",
  surface: "#f8f9fa",
  border: "#e2e8f0",
  accent: "#ec4899",       // pink-500
  accentLight: "#fdf2f8",  // pink-50
  accentDark: "#9d174d",   // pink-800
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
  purple: "#7c3aed",
  purpleLight: "#f5f3ff",
  tableHeader: "#831843",
  tableRow1: "#ffffff",
  tableRow2: "#fdf2f8",
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
  ctx.fillText("Epigenetics in Neurological Disease", 48, H - 30);
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
  ctx.fillText("Epigenetics in", 80, 230);
  ctx.fillText("Neurological Disease", 80, 290);

  ctx.fillStyle = CLR.accent;
  ctx.fillRect(80, 318, 520, 5);

  setFont(ctx, 24, "normal");
  ctx.fillStyle = CLR.muted;
  ctx.fillText("Beyond the DNA Sequence", 80, 365);

  setFont(ctx, 18, "normal");
  ctx.fillStyle = CLR.mutedLight;
  ctx.fillText("DNA methylation, histone code, chromatin remodeling, episignatures", 80, 405);

  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(W - 420, 120, 360, 260);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(W - 420, 120, 6, 260);

  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("5 Sections  --  5 Quiz Questions", W - 390, 170);
  setFont(ctx, 15, "normal");
  const topics = [
    "What Is Epigenetics?",
    "DNA Methylation",
    "Histone Modifications & the Histone Code",
    "Chromatin Remodeling Complexes",
    "Epigenetic Dysregulation in Brain Disorders",
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

// ── Slide 2: What Is Epigenetics? ───────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "What Is Epigenetics?", 72);
  sectionLabel(ctx, "Section 1 of 5", 48, 128);

  setFont(ctx, 16, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Epigenetics refers to heritable changes in gene expression and chromatin structure that occur WITHOUT alterations to the DNA sequence. It is the molecular interface between a static genome and a dynamic environment.", 48, 165, W - 96, 26);

  const mechanisms = [
    { name: "DNA Methylation", desc: "Methyl groups added to cytosine at CpG sites; promoter methylation silences genes.", color: CLR.accent },
    { name: "Histone Modifications", desc: "Acetylation, methylation, phosphorylation of histone tails alter chromatin state.", color: CLR.purple },
    { name: "Chromatin Remodeling", desc: "ATP-dependent complexes (BAF, CHD, ISWI) slide/eject nucleosomes to control DNA access.", color: CLR.blue },
    { name: "Non-coding RNA", desc: "miRNAs, lncRNAs regulate gene expression post-transcriptionally and at chromatin level.", color: CLR.green },
  ];

  let y = 260;
  for (const m of mechanisms) {
    ctx.fillStyle = m.color + "18";
    ctx.fillRect(48, y, W - 96, 70);
    ctx.fillStyle = m.color;
    ctx.fillRect(48, y, 8, 70);

    setFont(ctx, 17, "bold");
    ctx.fillStyle = CLR.subheading;
    ctx.fillText(m.name, 72, y + 26);
    setFont(ctx, 15, "normal");
    ctx.fillStyle = CLR.body;
    ctx.fillText(m.desc, 72, y + 52);
    y += 84;
  }

  // Key properties
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, y + 10, W - 96, 80);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, y + 10, 6, 80);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Key Properties of Epigenetic Marks", 68, y + 36);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  ctx.fillText("-- Mitotically stable (passed to daughter cells)      -- Many are reversible (therapeutic targets)", 68, y + 60);
  ctx.fillText("-- The brain epigenome is extraordinarily dynamic throughout development, activity, and aging", 68, y + 82);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 3: DNA Methylation ────────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "DNA Methylation", 72);
  sectionLabel(ctx, "Section 2 of 5", 48, 128);

  setFont(ctx, 16, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Covalent addition of a methyl group (-CH3) to the 5-carbon of cytosine at CpG dinucleotides. The most extensively characterized epigenetic mark in mammals.", 48, 165, W - 96, 26);

  const pts = [
    { label: "CpG Islands", detail: "Regions of elevated CpG density at ~70% of gene promoters; normally unmethylated to permit active transcription." },
    { label: "Silencing", detail: "Promoter hypermethylation recruits methyl-binding proteins and HDACs -> condensed chromatin -> transcriptional silencing." },
    { label: "Writers", detail: "DNMT3A/3B establish de novo methylation; DNMT1 ('maintenance methyltransferase') propagates patterns through replication." },
    { label: "Erasers", detail: "TET enzymes (TET1-3) oxidize 5-methylcytosine, initiating active demethylation; highly expressed in neurons, critical for plasticity." },
  ];

  let y = 230;
  const LABEL_W = 160;
  for (const p of pts) {
    ctx.fillStyle = CLR.accentLight;
    ctx.fillRect(48, y - 18, LABEL_W, 36);
    setFont(ctx, 15, "bold");
    ctx.fillStyle = CLR.accentDark;
    ctx.fillText(p.label, 58, y + 2);
    setFont(ctx, 15, "normal");
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, p.detail, 48 + LABEL_W + 16, y + 2, W - LABEL_W - 120, 24);
    y += 76;
  }

  // Diagram: Methylation -> Silencing
  ctx.fillStyle = CLR.surface;
  ctx.fillRect(48, y + 10, W - 96, 110);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, y + 10, 6, 110);

  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Methylation -> Gene Silencing Cascade", 68, y + 40);

  // Flow boxes
  const flow = [
    { text: "DNMT adds CH3", x: 68 },
    { text: "MBDs bind", x: 330 },
    { text: "HDACs recruited", x: 540 },
    { text: "Chromatin closes", x: 770 },
    { text: "Gene OFF", x: 1010 },
  ];
  const fY = y + 60;
  for (let i = 0; i < flow.length; i++) {
    const f = flow[i];
    ctx.fillStyle = CLR.accent;
    ctx.fillRect(f.x, fY, 180, 36);
    setFont(ctx, 13, "bold");
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(f.text, f.x + 90, fY + 24);
    ctx.textAlign = "left";
    if (i < flow.length - 1) {
      // arrow
      const nextX = flow[i + 1].x;
      ctx.fillStyle = CLR.accentDark;
      ctx.fillRect(f.x + 180, fY + 15, nextX - f.x - 180 - 8, 4);
      ctx.beginPath();
      ctx.moveTo(nextX, fY + 17);
      ctx.lineTo(nextX - 10, fY + 8);
      ctx.lineTo(nextX - 10, fY + 26);
      ctx.fill();
    }
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 4: Histone Modifications ──────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Histone Modifications & the Histone Code", 72);
  sectionLabel(ctx, "Section 3 of 5", 48, 128);

  setFont(ctx, 16, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "DNA wraps ~147 bp around histone octamers (H2A, H2B, H3, H4) forming nucleosomes. Histone tails undergo >100 post-translational modifications that form a combinatorial 'histone code'.", 48, 165, W - 96, 26);

  const headers = ["Mark", "Modification", "Effect", "Function"];
  const rows = [
    ["H3K4me3", "Trimethylation", "ACTIVE", "Marks active gene promoters"],
    ["H3K27me3", "Trimethylation", "REPRESSIVE", "Polycomb-mediated developmental silencing"],
    ["H3K9me3", "Trimethylation", "REPRESSIVE", "Constitutive heterochromatin silencing"],
    ["H3/H4 Acetylation", "Acetylation (HATs)", "ACTIVE", "Loosens DNA-histone; open chromatin"],
    ["H3/H4 Deacetylation", "Deacetylation (HDACs)", "REPRESSIVE", "Tightens chromatin; gene silencing"],
  ];
  drawTable(ctx, headers, rows, 48, 240, [200, 220, 160, 380], 52);

  let y = 520;
  // Writers and erasers
  ctx.fillStyle = CLR.greenLight;
  ctx.fillRect(48, y, (W - 112) / 2, 90);
  ctx.fillStyle = CLR.green;
  ctx.fillRect(48, y, 6, 90);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.green;
  ctx.fillText("Writers (add marks)", 68, y + 28);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  ctx.fillText("HATs: add acetyl groups", 68, y + 52);
  ctx.fillText("HMTs: add methyl groups", 68, y + 74);

  const rightX = 48 + (W - 112) / 2 + 16;
  ctx.fillStyle = CLR.redLight;
  ctx.fillRect(rightX, y, (W - 112) / 2, 90);
  ctx.fillStyle = CLR.red;
  ctx.fillRect(rightX, y, 6, 90);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.red;
  ctx.fillText("Erasers (remove marks)", rightX + 20, y + 28);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  ctx.fillText("HDACs: remove acetyl groups", rightX + 20, y + 52);
  ctx.fillText("KDMs: remove methyl groups", rightX + 20, y + 74);

  // Clinical note
  y += 110;
  setFont(ctx, 15, "bold");
  ctx.fillStyle = CLR.accent;
  ctx.fillText("Clinical relevance: HDAC inhibitors (e.g., valproate) are used therapeutically and alter the histone code.", 48, y);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 5: Chromatin Remodeling Complexes ─────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Chromatin Remodeling Complexes", 72);
  sectionLabel(ctx, "Section 4 of 5", 48, 128);

  setFont(ctx, 16, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "ATP-dependent complexes use ATP hydrolysis to slide, eject, or restructure nucleosomes, altering DNA accessibility. Among the most frequently mutated gene families in neurodevelopmental disorders.", 48, 165, W - 96, 26);

  const headers = ["Complex Family", "Key Gene(s)", "Associated Disorder"];
  const rows = [
    ["SWI/SNF (BAF)", "ARID1B, SMARCC2", "Coffin-Siris syndrome / intellectual disability"],
    ["CHD family", "CHD7", "CHARGE syndrome (coloboma, heart, choanal atresia)"],
    ["CHD family", "CHD8", "Autism (highest-confidence risk gene)"],
    ["ISWI family", "SMARCA1, SMARCA5", "Neurodevelopmental disorders (emerging)"],
    ["INO80 family", "INO80, SRCAP", "Floating-Harbor syndrome (SRCAP)"],
  ];
  drawTable(ctx, headers, rows, 48, 240, [240, 260, 460], 52);

  let y = 520;
  // BAF complex highlight
  ctx.fillStyle = CLR.purpleLight;
  ctx.fillRect(48, y, W - 96, 100);
  ctx.fillStyle = CLR.purple;
  ctx.fillRect(48, y, 6, 100);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.purple;
  ctx.fillText("BAF Complex (mammalian SWI/SNF) -- Emerging Therapeutic Target", 68, y + 28);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Essential for neural differentiation. BAF subunit mutations (ARID1B, SMARCB1, SMARCC2) are a leading cause of intellectual disability with Coffin-Siris phenotype. CHD8 haploinsufficiency disrupts genome-wide expression in neural progenitors -- one of the strongest single-gene associations with autism.", 68, y + 52, W - 140, 22);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 6: Epigenetic Dysregulation in Brain Disorders ────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Epigenetic Dysregulation in Brain Disorders", 72);
  sectionLabel(ctx, "Section 5 of 5", 48, 128);

  const disorders = [
    {
      name: "Rett Syndrome",
      gene: "MECP2 loss-of-function",
      mechanism: "Disrupts methyl-CpG binding and co-repressor recruitment; progressive neurological regression in girls.",
      color: CLR.accent, bg: CLR.accentLight,
    },
    {
      name: "Fragile X Syndrome",
      gene: "FMR1 CGG repeat expansion (>200)",
      mechanism: "Triggers promoter hypermethylation and silencing of FMRP, an RNA-binding protein essential for synaptic plasticity.",
      color: CLR.blue, bg: CLR.blueLight,
    },
    {
      name: "Alzheimer Disease",
      gene: "Complex epigenetic changes",
      mechanism: "Global DNA hypomethylation + locus-specific hypermethylation; reduced H4K16ac near APP and PSEN1. HDAC inhibitors under investigation.",
      color: CLR.amber, bg: CLR.amberLight,
    },
  ];

  let y = 160;
  for (const d of disorders) {
    ctx.fillStyle = d.bg;
    ctx.fillRect(48, y, W - 96, 120);
    ctx.fillStyle = d.color;
    ctx.fillRect(48, y, 8, 120);

    setFont(ctx, 19, "bold");
    ctx.fillStyle = CLR.subheading;
    ctx.fillText(d.name, 72, y + 30);
    setFont(ctx, 14, "bold");
    ctx.fillStyle = d.color;
    ctx.fillText(d.gene, 72, y + 54);
    setFont(ctx, 15, "normal");
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, d.mechanism, 72, y + 78, W - 150, 22);
    y += 140;
  }

  // Therapeutic frontier
  ctx.fillStyle = CLR.greenLight;
  ctx.fillRect(48, y + 10, W - 96, 110);
  ctx.fillStyle = CLR.green;
  ctx.fillRect(48, y + 10, 6, 110);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.green;
  ctx.fillText("Therapeutic Frontier", 68, y + 40);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  const therapies = [
    "HDAC inhibitors (valproate, vorinostat) -- alter histone acetylation patterns",
    "DNMT inhibitors (azacitidine, decitabine) -- reduce DNA methylation (used in oncology)",
    "CRISPR-based epigenome editors -- targeted activation/silencing without altering DNA sequence",
  ];
  let tY = y + 64;
  for (const t of therapies) {
    ctx.fillStyle = CLR.green;
    ctx.beginPath(); ctx.arc(82, tY - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    ctx.fillText(t, 94, tY);
    tY += 26;
  }

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
      head: "Epigenetics = gene regulation without sequence change",
      body: "Heritable, often reversible modifications to DNA and histones that control when, where, and how much a gene is expressed.",
    },
    {
      n: "2", color: CLR.purple, bg: CLR.purpleLight,
      head: "Four major mechanisms",
      body: "DNA methylation, histone modifications, chromatin remodeling complexes, and non-coding RNA regulation -- all essential for brain development.",
    },
    {
      n: "3", color: CLR.blue, bg: CLR.blueLight,
      head: "Promoter methylation silences genes",
      body: "DNMT3A/3B write, DNMT1 maintains, TET enzymes erase. CpG island hypermethylation recruits repressors. Key in Fragile X (FMR1 silencing).",
    },
    {
      n: "4", color: CLR.amber, bg: CLR.amberLight,
      head: "Histone code governs chromatin state",
      body: "H3K4me3 = active promoters. H3K27me3 = Polycomb repression. H3K9me3 = heterochromatin. Acetylation = open chromatin.",
    },
    {
      n: "5", color: CLR.green, bg: CLR.greenLight,
      head: "Chromatin remodelers are top NDD genes",
      body: "BAF complex (ARID1B), CHD family (CHD7, CHD8) -- among the most commonly mutated in intellectual disability and autism.",
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
  moduleId: "epigenetics-neurology",
  count: TOTAL,
  format: "jpg",
  generatedAt: new Date().toISOString(),
};
fs.writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\nDone -- ${TOTAL} slides -> public/slides/epigenetics-neurology/`);
