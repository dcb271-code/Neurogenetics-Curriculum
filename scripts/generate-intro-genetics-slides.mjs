/**
 * scripts/generate-intro-genetics-slides.mjs
 *
 * Generates slide images for the "Introduction to Genetics" module
 * using @napi-rs/canvas. Each slide is a white 1540x1188 (4:3 at 2x)
 * canvas with a minimal design.
 *
 * Run: node scripts/generate-intro-genetics-slides.mjs
 */

import { createCanvas } from "@napi-rs/canvas";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "slides", "intro-genetics");
fs.mkdirSync(OUT_DIR, { recursive: true });

const W = 1540;
const H = 1188;

const CLR = {
  bg: "#ffffff",
  surface: "#f8f9fa",
  border: "#e2e8f0",
  accent: "#3b82f6",
  accentLight: "#eff6ff",
  accentDark: "#1e40af",
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
  tableHeader: "#1e3a5f",
  tableRow1: "#ffffff",
  tableRow2: "#f1f5f9",
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
  ctx.fillText("Introduction to Genetics", 48, H - 30);
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

const TOTAL = 8;
let slideNum = 0;

// ── Slide 1: Title slide ──────────────────────────────────────────────────────
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
  ctx.fillText("Introduction to Genetics", 80, 240);

  // subtitle bar
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(80, 268, 520, 5);

  setFont(ctx, 24, "normal");
  ctx.fillStyle = CLR.muted;
  ctx.fillText("Molecular Foundations of Heredity", 80, 320);

  setFont(ctx, 18, "normal");
  ctx.fillStyle = CLR.mutedLight;
  ctx.fillText("DNA structure, genes & alleles, inheritance patterns, central dogma, mutations", 80, 360);

  // right decorative block
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(W - 420, 120, 360, 280);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(W - 420, 120, 6, 280);

  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("6 Sections  --  7 Quiz Questions", W - 390, 170);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  const topics = [
    "The Blueprint of Life: DNA Structure",
    "Genes, Alleles, and the Genome",
    "Mendelian Inheritance",
    "Inheritance Patterns in Neurogenetics",
    "The Central Dogma of Molecular Biology",
    "Mutations and Genetic Variation",
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

// ── Slide 2: DNA Structure ─────────────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "The Blueprint of Life: DNA Structure", 72);
  sectionLabel(ctx, "Section 1 of 6", 48, 128);

  const pts = [
    "DNA (deoxyribonucleic acid) encodes the genetic instructions for development, function, and reproduction.",
    "Double-helix structure elucidated by Watson, Crick, Franklin, and Wilkins (1953) -- two antiparallel polynucleotide strands.",
    "Four nucleotide bases: Adenine (A), Thymine (T), Guanine (G), and Cytosine (C).",
    "Complementary base pairing: A pairs with T (2 H-bonds), G pairs with C (3 H-bonds).",
    "The two strands run antiparallel: one 5'->3', the other 3'->5'.",
    "The human genome contains ~3.2 billion base pairs across 23 chromosome pairs.",
  ];

  let y = 175;
  setFont(ctx, 16, "normal");
  for (const pt of pts) {
    y = bullet(ctx, pt, 78, y, W - 140, 28);
    y += 8;
  }

  // DNA base pairing diagram box
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, y + 10, W - 96, 120);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, y + 10, 6, 120);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Base Pairing Rules", 68, y + 45);
  setFont(ctx, 16, "normal");
  ctx.fillStyle = CLR.body;
  ctx.fillText("A === T  (2 hydrogen bonds)          G === C  (3 hydrogen bonds)", 68, y + 78);
  ctx.fillText("Strands: 5'---ATCGTAGC---3'  //  3'---TAGCATCG---5'", 68, y + 108);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 3: Genes, Alleles, Genome ────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Genes, Alleles, and the Genome", 72);
  sectionLabel(ctx, "Section 2 of 6", 48, 128);

  const concepts = [
    { term: "Gene", def: "A defined segment of DNA encoding a functional product (protein or regulatory RNA). Occupies a specific locus on a chromosome." },
    { term: "Allele", def: "An alternative form of a gene at a given locus. Different alleles may produce different phenotypes." },
    { term: "Genome", def: "The complete set of DNA in an organism. Humans have ~20,000-25,000 protein-coding genes." },
    { term: "Homozygous", def: "Identical alleles at a locus (AA or aa)." },
    { term: "Heterozygous", def: "Differing alleles at a locus (Aa)." },
    { term: "Genotype", def: "The genetic makeup at a locus or set of loci." },
    { term: "Phenotype", def: "The observable trait expressed, resulting from genotype + environment." },
  ];

  let y = 168;
  const TERM_W = 170;
  for (const c of concepts) {
    ctx.fillStyle = CLR.accentLight;
    ctx.fillRect(48, y - 20, TERM_W, 36);
    setFont(ctx, 15, "bold");
    ctx.fillStyle = CLR.accentDark;
    ctx.fillText(c.term, 58, y);
    setFont(ctx, 15, "normal");
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, c.def, 48 + TERM_W + 16, y, W - TERM_W - 120, 24);
    y += 58;
  }

  // Key fact box
  ctx.fillStyle = CLR.greenLight;
  ctx.fillRect(48, y + 10, W - 96, 60);
  ctx.fillStyle = CLR.green;
  ctx.fillRect(48, y + 10, 6, 60);
  setFont(ctx, 15, "bold");
  ctx.fillStyle = CLR.green;
  ctx.fillText("Key Fact: Humans are diploid -- two copies (alleles) of each autosomal gene, one from each parent.", 68, y + 46);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 4: Mendelian Inheritance ─────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Mendelian Inheritance", 72);
  sectionLabel(ctx, "Section 3 of 6", 48, 128);

  setFont(ctx, 16, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Gregor Mendel's experiments (1860s) established the foundational laws of inheritance, which remain the basis for predicting trait transmission in diploid organisms.", 48, 165, W - 96, 26);

  const laws = [
    { name: "Law of Segregation", desc: "Paired alleles separate during gamete formation; each gamete receives one allele." },
    { name: "Law of Independent Assortment", desc: "Alleles for different genes assort independently (for genes on different chromosomes)." },
  ];

  let y = 238;
  for (const law of laws) {
    ctx.fillStyle = CLR.accentLight;
    ctx.fillRect(48, y, W - 96, 80);
    ctx.fillStyle = CLR.accent;
    ctx.fillRect(48, y, 6, 80);
    setFont(ctx, 17, "bold");
    ctx.fillStyle = CLR.accentDark;
    ctx.fillText(law.name, 68, y + 28);
    setFont(ctx, 15, "normal");
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, law.desc, 68, y + 54, W - 140, 24);
    y += 100;
  }

  // Punnett square illustration
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.subheading;
  ctx.fillText("Monohybrid Cross: Aa x Aa", 48, y + 20);

  const headers = ["", "A", "a"];
  const rows = [
    ["A", "AA", "Aa"],
    ["a", "Aa", "aa"],
  ];
  const colWidths = [120, 160, 160];
  drawTable(ctx, headers, rows, 48, y + 40, colWidths, 50);

  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  ctx.fillText("Genotypic ratio: 1 AA : 2 Aa : 1 aa    |    Phenotypic ratio (A dominant): 3:1", 48, y + 200);

  // Dominant/Recessive note
  ctx.fillStyle = CLR.amberLight;
  ctx.fillRect(48, y + 226, W - 96, 50);
  ctx.fillStyle = CLR.amber;
  ctx.fillRect(48, y + 226, 6, 50);
  setFont(ctx, 15, "bold");
  ctx.fillStyle = CLR.amber;
  ctx.fillText("Dominant alleles (A) mask recessive alleles (a) in heterozygotes.", 68, y + 258);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 5: Inheritance Patterns in Neurogenetics ──────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Inheritance Patterns in Neurogenetics", 72);
  sectionLabel(ctx, "Section 4 of 6", 48, 128);

  const patterns = [
    { name: "Autosomal Dominant", risk: "50% recurrence", examples: "TSC, Huntington, NF1", color: CLR.accent, bg: CLR.accentLight },
    { name: "Autosomal Recessive", risk: "25% if both carriers", examples: "SMA, Friedreich ataxia, IEMs", color: CLR.green, bg: CLR.greenLight },
    { name: "X-linked", risk: "Males hemizygous", examples: "Duchenne, Rett (MECP2), Fragile X", color: CLR.amber, bg: CLR.amberLight },
    { name: "Mitochondrial", risk: "Maternal inheritance", examples: "MELAS, MERRF, Leigh syndrome", color: CLR.red, bg: CLR.redLight },
  ];

  let y = 160;
  for (const p of patterns) {
    ctx.fillStyle = p.bg;
    ctx.fillRect(48, y, W - 96, 90);
    ctx.fillStyle = p.color;
    ctx.fillRect(48, y, 8, 90);

    setFont(ctx, 18, "bold");
    ctx.fillStyle = CLR.subheading;
    ctx.fillText(p.name, 72, y + 28);

    setFont(ctx, 15, "normal");
    ctx.fillStyle = CLR.body;
    ctx.fillText("Risk: " + p.risk, 72, y + 52);
    ctx.fillText("Examples: " + p.examples, 72, y + 76);

    y += 106;
  }

  // De novo note
  ctx.fillStyle = CLR.surface;
  ctx.fillRect(48, y, W - 96, 80);
  ctx.fillStyle = CLR.muted;
  ctx.fillRect(48, y, 6, 80);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.subheading;
  ctx.fillText("De novo & Multifactorial", 68, y + 28);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Many severe neurodevelopmental disorders arise from spontaneous de novo mutations (SCN1A, KCNQ2). Multifactorial inheritance (genetic + environmental) underlies epilepsy and migraine.", 68, y + 52, W - 140, 24);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 6: The Central Dogma ──────────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "The Central Dogma of Molecular Biology", 72);
  sectionLabel(ctx, "Section 5 of 6", 48, 128);

  setFont(ctx, 16, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Proposed by Francis Crick (1958): the directional flow of genetic information from DNA to RNA to protein. This framework explains how genotype determines phenotype at the molecular level.", 48, 165, W - 96, 26);

  // Flow diagram boxes
  const steps = [
    { label: "DNA", color: CLR.accent, x: 100 },
    { label: "RNA", color: CLR.green, x: 520 },
    { label: "Protein", color: CLR.amber, x: 940 },
  ];

  const boxY = 260;
  const boxW = 260;
  const boxH = 70;
  for (const s of steps) {
    ctx.fillStyle = s.color;
    ctx.fillRect(s.x, boxY, boxW, boxH);
    setFont(ctx, 28, "bold");
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(s.label, s.x + boxW / 2, boxY + boxH / 2 + 10);
    ctx.textAlign = "left";
  }

  // Arrows between boxes
  ctx.fillStyle = CLR.heading;
  // Arrow 1: DNA -> RNA
  ctx.fillRect(360, boxY + boxH / 2 - 3, 160, 6);
  ctx.beginPath();
  ctx.moveTo(520, boxY + boxH / 2);
  ctx.lineTo(500, boxY + boxH / 2 - 15);
  ctx.lineTo(500, boxY + boxH / 2 + 15);
  ctx.fill();
  // Arrow labels
  setFont(ctx, 14, "bold");
  ctx.fillStyle = CLR.muted;
  ctx.textAlign = "center";
  ctx.fillText("Transcription", 440, boxY - 10);
  ctx.textAlign = "left";

  // Arrow 2: RNA -> Protein
  ctx.fillStyle = CLR.heading;
  ctx.fillRect(780, boxY + boxH / 2 - 3, 160, 6);
  ctx.beginPath();
  ctx.moveTo(940, boxY + boxH / 2);
  ctx.lineTo(920, boxY + boxH / 2 - 15);
  ctx.lineTo(920, boxY + boxH / 2 + 15);
  ctx.fill();
  setFont(ctx, 14, "bold");
  ctx.fillStyle = CLR.muted;
  ctx.textAlign = "center";
  ctx.fillText("Translation", 860, boxY - 10);
  ctx.textAlign = "left";

  // Key steps
  const details = [
    { title: "Transcription", desc: "RNA polymerase reads DNA template strand and synthesizes complementary pre-mRNA in the nucleus." },
    { title: "RNA Processing", desc: "Pre-mRNA undergoes 5' capping, 3' poly-A tailing, and splicing (intron removal)." },
    { title: "Translation", desc: "Ribosomes decode mRNA codons (3-nucleotide triplets) into a chain of amino acids." },
  ];

  let y = 370;
  for (const d of details) {
    ctx.fillStyle = CLR.accentLight;
    ctx.fillRect(48, y, W - 96, 70);
    ctx.fillStyle = CLR.accent;
    ctx.fillRect(48, y, 6, 70);
    setFont(ctx, 16, "bold");
    ctx.fillStyle = CLR.accentDark;
    ctx.fillText(d.title, 68, y + 26);
    setFont(ctx, 15, "normal");
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, d.desc, 68, y + 50, W - 140, 24);
    y += 86;
  }

  // Exception note
  setFont(ctx, 14, "normal");
  ctx.fillStyle = CLR.muted;
  ctx.fillText("Exception: Reverse transcription (retroviruses) and RNA replication are notable deviations from the canonical flow.", 48, y + 12);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 7: Mutations and Genetic Variation ────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Mutations and Genetic Variation", 72);
  sectionLabel(ctx, "Section 6 of 6", 48, 128);

  setFont(ctx, 16, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "A mutation is any heritable change in the DNA sequence. Mutations are the ultimate source of genetic variation -- they can be neutral, beneficial, or deleterious depending on context.", 48, 165, W - 96, 26);

  const headers = ["Mutation Type", "Description", "Effect"];
  const rows = [
    ["Missense", "Single nucleotide change", "New amino acid substituted"],
    ["Nonsense", "Single nucleotide change", "Premature stop codon (truncated protein)"],
    ["Silent", "Single nucleotide change", "No amino acid change (codon degeneracy)"],
    ["Frameshift", "Insertion or deletion (indel)", "Shifts reading frame; all downstream altered"],
    ["CNV", "Large duplication or deletion", "Gene dosage change; variable effect"],
  ];
  const colWidths = [200, 300, 400];
  drawTable(ctx, headers, rows, 48, 240, colWidths, 52);

  // Origin categories
  let y = 540;
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.subheading;
  ctx.fillText("Mutation Origins:", 48, y);
  y += 30;

  const origins = [
    { name: "Germline", desc: "Heritable -- present in egg or sperm, passed to all cells of offspring." },
    { name: "Somatic", desc: "Affects only certain cells; not heritable. Can drive cancer or mosaicism." },
    { name: "De novo", desc: "Arises spontaneously in the individual; not present in either parent." },
  ];

  for (const o of origins) {
    ctx.fillStyle = CLR.accentLight;
    ctx.fillRect(48, y, 130, 36);
    setFont(ctx, 15, "bold");
    ctx.fillStyle = CLR.accentDark;
    ctx.fillText(o.name, 58, y + 24);
    setFont(ctx, 15, "normal");
    ctx.fillStyle = CLR.body;
    ctx.fillText(o.desc, 196, y + 24);
    y += 50;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 8: Key Takeaways ──────────────────────────────────────────────────────
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
      head: "DNA is the blueprint",
      body: "Double-helix, complementary base pairing (A-T, G-C), 3.2 billion base pairs across 23 chromosome pairs in humans.",
    },
    {
      n: "2", color: CLR.green, bg: CLR.greenLight,
      head: "Genes and alleles determine traits",
      body: "~20,000-25,000 protein-coding genes. Diploid organisms carry two alleles per autosomal locus. Genotype + environment = phenotype.",
    },
    {
      n: "3", color: CLR.amber, bg: CLR.amberLight,
      head: "Mendelian laws still apply",
      body: "Segregation and independent assortment govern allele transmission. Punnett squares predict offspring ratios.",
    },
    {
      n: "4", color: CLR.red, bg: CLR.redLight,
      head: "Multiple inheritance patterns in neurogenetics",
      body: "AD, AR, X-linked, mitochondrial, and de novo -- each with distinct recurrence risks, testing strategies, and clinical implications.",
    },
    {
      n: "5", color: CLR.muted, bg: CLR.surface,
      head: "Central dogma: DNA -> RNA -> Protein",
      body: "Transcription, RNA processing, and translation convert genetic information into functional proteins. Mutations at any step can cause disease.",
    },
  ];

  let y = 158;
  for (const pt of takeaways) {
    ctx.fillStyle = pt.bg;
    ctx.fillRect(48, y, W - 96, 110);
    ctx.fillStyle = pt.color;
    ctx.fillRect(48, y, 8, 110);

    ctx.fillStyle = pt.color;
    ctx.beginPath(); ctx.arc(80, y + 35, 20, 0, Math.PI * 2); ctx.fill();
    setFont(ctx, 20, "bold");
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(pt.n, 80, y + 42);
    ctx.textAlign = "left";

    setFont(ctx, 18, "bold");
    ctx.fillStyle = CLR.subheading;
    ctx.fillText(pt.head, 116, y + 32);

    setFont(ctx, 15, "normal");
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, pt.body, 116, y + 60, W - 190, 24);

    y += 126;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Write manifest ─────────────────────────────────────────────────────────────
const manifest = {
  moduleId: "intro-genetics",
  count: TOTAL,
  format: "jpg",
  generatedAt: new Date().toISOString(),
};
fs.writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\nDone -- ${TOTAL} slides -> public/slides/intro-genetics/`);
