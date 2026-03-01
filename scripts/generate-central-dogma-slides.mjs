/**
 * scripts/generate-central-dogma-slides.mjs
 *
 * Generates 8 slides for the "Central Dogma & Molecular Genetics" module.
 * Blue accent palette matching the module's color.
 *
 * Run: node scripts/generate-central-dogma-slides.mjs
 */

import { createCanvas } from "@napi-rs/canvas";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "slides", "central-dogma");
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
  violet: "#7c3aed",
  violetLight: "#f5f3ff",
  rose: "#e11d48",
  roseLight: "#fff1f2",
  tableHeader: "#1e3a5f",
  tableRow1: "#ffffff",
  tableRow2: "#f1f5f9",
};

function setFont(ctx, size, weight = "normal") {
  ctx.font = `${weight} ${size}px sans-serif`;
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
  for (const line of lines) { ctx.fillText(line, x, y); y += lineHeight; }
  return y;
}

function drawBackground(ctx) { ctx.fillStyle = CLR.bg; ctx.fillRect(0, 0, W, H); }
function drawAccentBar(ctx) { ctx.fillStyle = CLR.accent; ctx.fillRect(0, 0, W, 6); }

function drawFooter(ctx, num, total) {
  ctx.strokeStyle = CLR.border; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(40, H - 52); ctx.lineTo(W - 40, H - 52); ctx.stroke();
  setFont(ctx, 16, "normal"); ctx.fillStyle = CLR.accent;
  ctx.fillText("Central Dogma & Molecular Genetics", 48, H - 30);
  setFont(ctx, 18, "normal"); ctx.fillStyle = CLR.mutedLight;
  ctx.textAlign = "right"; ctx.fillText(`${num} / ${total}`, W - 40, H - 30); ctx.textAlign = "left";
}

function slideTitle(ctx, title, y = 80) {
  setFont(ctx, 38, "bold"); ctx.fillStyle = CLR.heading; ctx.fillText(title, 48, y);
  const w = ctx.measureText(title).width;
  ctx.fillStyle = CLR.accent; ctx.fillRect(48, y + 8, Math.min(w, W - 96), 4);
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
  setFont(ctx, 15, "bold"); ctx.fillStyle = "#ffffff";
  for (let i = 0; i < headers.length; i++) { ctx.fillText(headers[i], cx + 10, y + rowH / 2 + 5); cx += colWidths[i]; }
  let ry = y + rowH;
  for (let r = 0; r < rows.length; r++) {
    ctx.fillStyle = r % 2 === 0 ? CLR.tableRow1 : CLR.tableRow2;
    ctx.fillRect(x, ry, totalW, rowH);
    ctx.strokeStyle = CLR.border; ctx.lineWidth = 1; ctx.strokeRect(x, ry, totalW, rowH);
    cx = x;
    for (let c = 0; c < rows[r].length; c++) {
      setFont(ctx, 14, c === 0 ? "bold" : "normal");
      ctx.fillStyle = c === 0 ? CLR.accentDark : CLR.body;
      ctx.save(); ctx.rect(cx + 8, ry, colWidths[c] - 16, rowH); ctx.clip();
      ctx.fillText(rows[r][c], cx + 10, ry + rowH / 2 + 5);
      ctx.restore(); cx += colWidths[c];
    }
    ry += rowH;
  }
  return ry;
}

const TOTAL = 8;
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
  ctx.fillText("Central Dogma &", 80, 230);
  ctx.fillText("Molecular Genetics", 80, 300);

  ctx.fillStyle = CLR.accent; ctx.fillRect(80, 330, 520, 5);
  setFont(ctx, 24, "normal"); ctx.fillStyle = CLR.muted;
  ctx.fillText("DNA → RNA → Protein", 80, 380);
  setFont(ctx, 18, "normal"); ctx.fillStyle = CLR.mutedLight;
  ctx.fillText("Structure · Replication · Transcription · Splicing · Translation · Variant Types", 80, 420);

  ctx.fillStyle = CLR.accentLight; ctx.fillRect(W - 420, 120, 360, 280);
  ctx.fillStyle = CLR.accent; ctx.fillRect(W - 420, 120, 6, 280);
  setFont(ctx, 16, "bold"); ctx.fillStyle = CLR.accentDark;
  ctx.fillText("5 Sections · 5 Quiz Questions", W - 390, 175);
  setFont(ctx, 15, "normal"); ctx.fillStyle = CLR.body;
  const topics = ["DNA structure & the genetic code", "DNA replication & genome integrity", "Transcription & pre-mRNA splicing", "Translation & protein function", "Variant types & molecular consequences"];
  let ty = 210;
  for (const t of topics) {
    ctx.fillStyle = CLR.accent; ctx.beginPath(); ctx.arc(W - 378, ty - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body; ctx.fillText(t, W - 368, ty); ty += 30;
  }

  // Central dogma arrow diagram
  setFont(ctx, 20, "bold");
  const arrowY = 560;
  const boxes = [
    { label: "DNA", x: 200, color: CLR.accent },
    { label: "RNA", x: 580, color: CLR.violet },
    { label: "Protein", x: 960, color: CLR.green },
  ];
  for (const b of boxes) {
    ctx.fillStyle = b.color; ctx.fillRect(b.x, arrowY, 200, 60);
    ctx.fillStyle = "#ffffff"; ctx.textAlign = "center";
    ctx.fillText(b.label, b.x + 100, arrowY + 37); ctx.textAlign = "left";
  }
  // arrows
  ctx.fillStyle = CLR.muted;
  setFont(ctx, 16, "normal");
  ctx.textAlign = "center";
  ctx.fillText("Transcription →", 490, arrowY + 37);
  ctx.fillText("Translation →", 870, arrowY + 37);
  ctx.textAlign = "left";

  // Replication arrow
  ctx.strokeStyle = CLR.accent; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(300, arrowY - 20, 40, Math.PI, 0, true); ctx.stroke();
  setFont(ctx, 13, "normal"); ctx.fillStyle = CLR.accent;
  ctx.textAlign = "center"; ctx.fillText("Replication", 300, arrowY - 30); ctx.textAlign = "left";

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 2: DNA Structure ──────────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx); drawAccentBar(ctx);

  slideTitle(ctx, "DNA Structure and the Genetic Code", 72);
  sectionLabel(ctx, "Section 1 of 5", 48, 128);

  // Key stats bar
  const stats = [
    { label: "Genome Size", value: "~3.2 billion bp", color: CLR.accent },
    { label: "Protein-Coding", value: "~1.5% of genome", color: CLR.green },
    { label: "Genes", value: "~20,000", color: CLR.violet },
    { label: "Codons", value: "64 → 20 AAs + 3 stops", color: CLR.amber },
  ];
  const statW = (W - 96 - 30) / 4;
  let sx = 48;
  for (const s of stats) {
    ctx.fillStyle = s.color + "15"; ctx.fillRect(sx, 150, statW, 72);
    ctx.fillStyle = s.color; ctx.fillRect(sx, 150, statW, 4);
    setFont(ctx, 12, "bold"); ctx.fillStyle = CLR.muted;
    ctx.fillText(s.label.toUpperCase(), sx + 12, 176);
    setFont(ctx, 18, "bold"); ctx.fillStyle = CLR.heading;
    ctx.fillText(s.value, sx + 12, 202);
    sx += statW + 10;
  }

  // Base pairing
  let y = 256;
  setFont(ctx, 19, "bold"); ctx.fillStyle = CLR.heading;
  ctx.fillText("Complementary Base Pairing", 48, y);
  y += 16;

  ctx.fillStyle = CLR.accentLight; ctx.fillRect(48, y, (W - 120) / 2, 80);
  ctx.fillStyle = CLR.accent; ctx.fillRect(48, y, 6, 80);
  setFont(ctx, 28, "bold"); ctx.fillStyle = CLR.accentDark;
  ctx.fillText("A ═ T", 80, y + 35);
  setFont(ctx, 15, "normal"); ctx.fillStyle = CLR.body;
  ctx.fillText("2 hydrogen bonds · weaker", 80, y + 62);

  const rx = 48 + (W - 120) / 2 + 24;
  ctx.fillStyle = CLR.greenLight; ctx.fillRect(rx, y, (W - 120) / 2, 80);
  ctx.fillStyle = CLR.green; ctx.fillRect(rx, y, 6, 80);
  setFont(ctx, 28, "bold"); ctx.fillStyle = "#166534";
  ctx.fillText("G ≡ C", rx + 32, y + 35);
  setFont(ctx, 15, "normal"); ctx.fillStyle = CLR.body;
  ctx.fillText("3 hydrogen bonds · stronger · gene-dense", rx + 32, y + 62);

  // Genetic code properties
  y += 114;
  setFont(ctx, 19, "bold"); ctx.fillStyle = CLR.heading;
  ctx.fillText("The Genetic Code", 48, y);
  y += 30;

  const props = [
    { title: "Triplet", desc: "Three nucleotides (codon) = one amino acid. AUG = methionine (start).", color: CLR.accent },
    { title: "Degenerate", desc: "Multiple codons per amino acid (e.g., 6 codons for leucine). Buffers against some substitutions.", color: CLR.violet },
    { title: "Non-overlapping", desc: "Codons are read sequentially without overlap. Frameshifts disrupt all downstream codons.", color: CLR.green },
    { title: "Nearly Universal", desc: "Same code in virtually all organisms. Mitochondrial code has minor differences.", color: CLR.amber },
  ];

  for (const p of props) {
    ctx.fillStyle = p.color + "12"; ctx.fillRect(48, y, W - 96, 62);
    ctx.fillStyle = p.color; ctx.fillRect(48, y, 6, 62);
    setFont(ctx, 16, "bold"); ctx.fillStyle = CLR.subheading;
    ctx.fillText(p.title, 68, y + 22);
    setFont(ctx, 14, "normal"); ctx.fillStyle = CLR.body;
    drawWrapped(ctx, p.desc, 68, y + 44, W - 140, 20);
    y += 72;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 3: DNA Replication ────────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx); drawAccentBar(ctx);

  slideTitle(ctx, "DNA Replication and Genome Integrity", 72);
  sectionLabel(ctx, "Section 2 of 5", 48, 128);

  // Fidelity cascade
  setFont(ctx, 18, "bold"); ctx.fillStyle = CLR.heading;
  ctx.fillText("Replication Fidelity: A Multi-Layered System", 48, 170);

  const layers = [
    { label: "Base Selection", error: "~1 in 10⁴–10⁵", color: CLR.red, desc: "DNA polymerase selects correct dNTP by complementary base pairing" },
    { label: "Proofreading", error: "→ ~1 in 10⁷", color: CLR.amber, desc: "3'→5' exonuclease of Pol δ/ε corrects ~99% of misinsertions" },
    { label: "Mismatch Repair", error: "→ ~1 in 10⁹–10¹⁰", color: CLR.green, desc: "Post-replicative MMR fixes remaining errors; deficiency → Lynch syndrome" },
  ];

  let y = 198;
  const layerW = (W - 96);
  for (let i = 0; i < layers.length; i++) {
    const l = layers[i];
    ctx.fillStyle = l.color + "15"; ctx.fillRect(48, y, layerW, 66);
    ctx.fillStyle = l.color; ctx.fillRect(48, y, 6, 66);

    // Step number
    ctx.fillStyle = l.color; ctx.beginPath(); ctx.arc(76, y + 24, 14, 0, Math.PI * 2); ctx.fill();
    setFont(ctx, 14, "bold"); ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center"; ctx.fillText(String(i + 1), 76, y + 30); ctx.textAlign = "left";

    setFont(ctx, 16, "bold"); ctx.fillStyle = CLR.subheading;
    ctx.fillText(l.label, 102, y + 22);
    setFont(ctx, 15, "bold"); ctx.fillStyle = l.color;
    ctx.fillText(`Error rate: ${l.error}`, 102, y + 46);
    setFont(ctx, 14, "normal"); ctx.fillStyle = CLR.body;
    ctx.fillText(l.desc, 380, y + 34);

    // Arrow to next
    if (i < layers.length - 1) {
      ctx.fillStyle = CLR.muted; ctx.beginPath();
      ctx.moveTo(76, y + 66); ctx.lineTo(70, y + 76); ctx.lineTo(82, y + 76); ctx.fill();
    }
    y += 82;
  }

  // De novo rate box
  y += 10;
  ctx.fillStyle = CLR.accentLight; ctx.fillRect(48, y, W - 96, 80);
  ctx.fillStyle = CLR.accent; ctx.fillRect(48, y, 6, 80);
  setFont(ctx, 16, "bold"); ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Net Result: ~1–2 de novo SNVs per genome per generation", 68, y + 24);
  setFont(ctx, 14, "normal"); ctx.fillStyle = CLR.body;
  ctx.fillText("~60–70 de novo SNVs per individual (~0.01–0.02 per Mb). Paternal age is a significant contributor.", 68, y + 50);
  ctx.fillText("These de novo variants are the substrate for both evolution and sporadic genetic disease.", 68, y + 72);

  // Trinucleotide repeats
  y += 104;
  setFont(ctx, 18, "bold"); ctx.fillStyle = CLR.heading;
  ctx.fillText("Trinucleotide Repeat Expansions: Replication Slippage", 48, y);
  y += 30;

  const repeats = [
    ["FMR1 (Fragile X)", "CGG repeat", "5' UTR methylation silencing"],
    ["HTT (Huntington)", "CAG repeat", "Polyglutamine expansion (GoF)"],
    ["FXN (Friedreich)", "GAA repeat", "Intronic silencing (LoF)"],
    ["DMPK (DM1)", "CTG repeat", "3' UTR RNA toxicity"],
  ];

  const headers = ["Gene (Disease)", "Repeat", "Mechanism"];
  const colWidths = [300, 200, 440];
  drawTable(ctx, headers, repeats, 48, y, colWidths, 44);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 4: Transcription & Splicing ───────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx); drawAccentBar(ctx);

  slideTitle(ctx, "Transcription and Pre-mRNA Splicing", 72);
  sectionLabel(ctx, "Section 3 of 5", 48, 128);

  // Process flow
  const steps = [
    { label: "Promoter Recognition", desc: "TATA box, CpG islands → RNA Polymerase II binds", color: CLR.accent },
    { label: "Transcription", desc: "Pre-mRNA synthesized 5'→3' from template strand", color: CLR.accent },
    { label: "5' Capping", desc: "7-methylguanosine cap protects from degradation", color: CLR.violet },
    { label: "Splicing", desc: "Introns removed; exons joined (GT-AG rule)", color: CLR.red },
    { label: "3' Polyadenylation", desc: "Poly-A tail added; signals export and stability", color: CLR.violet },
    { label: "Export", desc: "Mature mRNA exported to cytoplasm for translation", color: CLR.green },
  ];

  let y = 156;
  for (let i = 0; i < steps.length; i++) {
    const s = steps[i];
    ctx.fillStyle = s.color + "12"; ctx.fillRect(48, y, 500, 42);
    ctx.fillStyle = s.color; ctx.fillRect(48, y, 5, 42);

    ctx.fillStyle = s.color; ctx.beginPath(); ctx.arc(72, y + 21, 12, 0, Math.PI * 2); ctx.fill();
    setFont(ctx, 12, "bold"); ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center"; ctx.fillText(String(i + 1), 72, y + 26); ctx.textAlign = "left";

    setFont(ctx, 14, "bold"); ctx.fillStyle = CLR.subheading;
    ctx.fillText(s.label, 94, y + 18);
    setFont(ctx, 13, "normal"); ctx.fillStyle = CLR.body;
    ctx.fillText(s.desc, 94, y + 36);
    y += 48;
  }

  // Splice site detail (right column)
  const detailX = 580;
  ctx.fillStyle = CLR.redLight; ctx.fillRect(detailX, 156, W - detailX - 48, 290);
  ctx.fillStyle = CLR.red; ctx.fillRect(detailX, 156, 6, 290);

  setFont(ctx, 17, "bold"); ctx.fillStyle = CLR.red;
  ctx.fillText("Canonical Splice Sites", detailX + 20, 186);

  setFont(ctx, 15, "normal"); ctx.fillStyle = CLR.body;
  let dy = 214;
  const splicePoints = [
    "GT (GU in RNA) at 5' donor site",
    "AG at 3' acceptor site",
    "Branch point adenosine upstream",
    "Polypyrimidine tract",
    "",
    "±1/±2 positions: almost always",
    "pathogenic if disrupted",
    "",
    "~10–15% of disease-causing",
    "variants affect splicing",
  ];
  for (const p of splicePoints) {
    if (p === "") { dy += 10; continue; }
    ctx.fillText(p, detailX + 20, dy);
    dy += 24;
  }

  // Gene structure diagram
  y += 18;
  setFont(ctx, 17, "bold"); ctx.fillStyle = CLR.heading;
  ctx.fillText("Gene Structure: Exons and Introns", 48, y);
  y += 24;

  // Draw gene model
  const geneY = y;
  ctx.fillStyle = CLR.border; ctx.fillRect(80, geneY + 15, W - 160, 4); // intron line
  // Exons
  const exons = [
    { x: 80, w: 120, label: "Exon 1" },
    { x: 320, w: 100, label: "Exon 2" },
    { x: 540, w: 140, label: "Exon 3" },
    { x: 800, w: 90, label: "Exon 4" },
    { x: 1010, w: 130, label: "Exon 5" },
    { x: 1260, w: 100, label: "Exon 6" },
  ];
  for (const e of exons) {
    ctx.fillStyle = CLR.accent; ctx.fillRect(e.x, geneY, e.w, 34);
    setFont(ctx, 11, "bold"); ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center"; ctx.fillText(e.label, e.x + e.w / 2, geneY + 22); ctx.textAlign = "left";
  }
  // GT-AG labels
  setFont(ctx, 11, "normal"); ctx.fillStyle = CLR.red;
  for (let i = 0; i < exons.length - 1; i++) {
    const ex = exons[i]; const nx = exons[i + 1];
    ctx.fillText("GT", ex.x + ex.w + 4, geneY + 50);
    ctx.fillText("AG", nx.x - 24, geneY + 50);
  }

  // Alternative splicing callout
  y = geneY + 72;
  ctx.fillStyle = CLR.surface; ctx.fillRect(48, y, W - 96, 58);
  ctx.fillStyle = CLR.accent; ctx.fillRect(48, y, 6, 58);
  setFont(ctx, 14, "bold"); ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Alternative Splicing", 68, y + 20);
  setFont(ctx, 13, "normal"); ctx.fillStyle = CLR.body;
  ctx.fillText("Single gene → multiple mRNA isoforms. Tissue-specific isoforms explain why some variants cause brain-restricted phenotypes", 68, y + 42);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 5: Translation ────────────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx); drawAccentBar(ctx);

  slideTitle(ctx, "Translation and Protein Function", 72);
  sectionLabel(ctx, "Section 4 of 5", 48, 128);

  // Translation process
  const phases = [
    { title: "Initiation", desc: "43S pre-initiation complex scans mRNA 5'→3' for AUG start codon (Kozak context). Met-tRNA is loaded. Initiation codon variants (p.Met1?) abolish or reduce protein production.", color: CLR.accent, bg: CLR.accentLight },
    { title: "Elongation", desc: "Ribosomes read mRNA 5'→3', synthesizing protein N-terminus to C-terminus. Each codon is decoded by the matching aminoacyl-tRNA. Peptide bonds form in the peptidyl transferase center.", color: CLR.violet, bg: CLR.violetLight },
    { title: "Termination", desc: "Stop codon (UAA, UAG, or UGA) enters the A-site. Release factors trigger polypeptide release. Ribosome dissociates from mRNA.", color: CLR.red, bg: CLR.redLight },
  ];

  let y = 160;
  for (const p of phases) {
    ctx.fillStyle = p.bg; ctx.fillRect(48, y, W - 96, 100);
    ctx.fillStyle = p.color; ctx.fillRect(48, y, 8, 100);
    setFont(ctx, 20, "bold"); ctx.fillStyle = p.color;
    ctx.fillText(p.title, 72, y + 30);
    setFont(ctx, 14, "normal"); ctx.fillStyle = CLR.body;
    drawWrapped(ctx, p.desc, 72, y + 54, W - 150, 22);
    y += 116;
  }

  // Post-translational modifications
  y += 10;
  setFont(ctx, 18, "bold"); ctx.fillStyle = CLR.heading;
  ctx.fillText("Post-Translational Modifications & Protein Fate", 48, y);
  y += 30;

  const mods = [
    { mod: "Phosphorylation", function: "Signal transduction, activity regulation", example: "Kinase cascades in synaptic plasticity" },
    { mod: "Glycosylation", function: "Protein folding, cell signaling", example: "CDG disorders in neurogenetics" },
    { mod: "Ubiquitination", function: "Protein degradation targeting", example: "UBE3A in Angelman syndrome" },
    { mod: "Chaperone folding", function: "HSP70/90 assist proper folding", example: "Misfolded → proteasomal degradation" },
  ];

  const headers = ["Modification", "Function", "Clinical Relevance"];
  const colWidths = [240, 380, 380];
  const rows = mods.map(m => [m.mod, m.function, m.example]);
  drawTable(ctx, headers, rows, 48, y, colWidths, 46);

  // LoF vs GoF callout
  y += 46 * 5 + 20;
  ctx.fillStyle = CLR.amberLight; ctx.fillRect(48, y, W - 96, 60);
  ctx.fillStyle = CLR.amber; ctx.fillRect(48, y, 6, 60);
  setFont(ctx, 15, "bold"); ctx.fillStyle = "#92400e";
  ctx.fillText("Clinical Distinction: Loss-of-Function vs. Gain-of-Function", 68, y + 22);
  setFont(ctx, 14, "normal"); ctx.fillStyle = CLR.body;
  ctx.fillText("This distinction critically determines therapeutic strategy — e.g., channel blockers for GoF, gene replacement for LoF.", 68, y + 46);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 6: Variant Types (1) ──────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx); drawAccentBar(ctx);

  slideTitle(ctx, "Variant Types: Missense, Nonsense, Frameshift", 72);
  sectionLabel(ctx, "Section 5 of 5 — Part 1", 48, 128);

  const types = [
    {
      name: "Missense", notation: "e.g., p.Arg176Trp", color: CLR.amber, bg: CLR.amberLight,
      effect: "Single nucleotide substitution → amino acid change",
      clinical: "Effect ranges from benign to highly damaging depending on residue position, chemistry (Grantham score), and conservation. Most common variant type in exomes.",
    },
    {
      name: "Nonsense (Stop-Gain)", notation: "e.g., p.Arg100Ter", color: CLR.red, bg: CLR.redLight,
      effect: "Nucleotide change → premature stop codon",
      clinical: "If PTC is >50–55 nt upstream of final exon-exon junction → NMD. Typically causes loss of function. PVS1 applicable in HI genes.",
    },
    {
      name: "Frameshift", notation: "e.g., p.Leu138ProfsTer12", color: CLR.violet, bg: CLR.violetLight,
      effect: "Insertion/deletion (not multiple of 3) shifts reading frame",
      clinical: "Disrupts all downstream codons. Almost always introduces PTC → NMD. Among the strongest LoF variant types. PVS1 applicable.",
    },
  ];

  let y = 160;
  for (const t of types) {
    ctx.fillStyle = t.bg; ctx.fillRect(48, y, W - 96, 148);
    ctx.fillStyle = t.color; ctx.fillRect(48, y, 8, 148);

    setFont(ctx, 22, "bold"); ctx.fillStyle = t.color;
    ctx.fillText(t.name, 72, y + 32);
    setFont(ctx, 14, "normal"); ctx.fillStyle = CLR.muted;
    ctx.fillText(t.notation, 72 + ctx.measureText(t.name).width + 16, y + 32);

    setFont(ctx, 15, "bold"); ctx.fillStyle = CLR.subheading;
    ctx.fillText("Mechanism: ", 72, y + 62);
    setFont(ctx, 15, "normal"); ctx.fillStyle = CLR.body;
    ctx.fillText(t.effect, 72 + ctx.measureText("Mechanism: ").width, y + 62);

    setFont(ctx, 14, "normal"); ctx.fillStyle = CLR.body;
    drawWrapped(ctx, t.clinical, 72, y + 90, W - 150, 22);

    y += 166;
  }

  // NMD rule box
  ctx.fillStyle = CLR.accentLight; ctx.fillRect(48, y, W - 96, 72);
  ctx.fillStyle = CLR.accent; ctx.fillRect(48, y, 6, 72);
  setFont(ctx, 15, "bold"); ctx.fillStyle = CLR.accentDark;
  ctx.fillText("The NMD Rule (50–55 nt upstream of last exon-exon junction)", 68, y + 22);
  setFont(ctx, 14, "normal"); ctx.fillStyle = CLR.body;
  ctx.fillText("PTCs meeting this rule → mRNA degradation → effective null. PTCs in the last exon may escape NMD → truncated protein", 68, y + 46);
  ctx.fillText("→ possible dominant-negative effect (different clinical consequence than LoF).", 68, y + 66);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 7: Variant Types (2) ──────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx); drawAccentBar(ctx);

  slideTitle(ctx, "Variant Types: Splice-Site & Synonymous", 72);
  sectionLabel(ctx, "Section 5 of 5 — Part 2", 48, 128);

  // Splice-site
  ctx.fillStyle = CLR.redLight; ctx.fillRect(48, 156, W - 96, 200);
  ctx.fillStyle = CLR.red; ctx.fillRect(48, 156, 8, 200);
  setFont(ctx, 22, "bold"); ctx.fillStyle = CLR.red;
  ctx.fillText("Splice-Site Variants", 72, 190);
  setFont(ctx, 14, "normal"); ctx.fillStyle = CLR.muted;
  ctx.fillText("e.g., c.412+1G>A", 300, 190);

  setFont(ctx, 15, "normal"); ctx.fillStyle = CLR.body;
  let sy = 218;
  const splicePts = [
    "Disrupt canonical ±1/2 donor (GT) or acceptor (AG) splice sites",
    "Consequences: exon skipping, intron retention, cryptic splice site activation",
    "~10–15% of all disease-causing variants affect splicing",
    "In silico tools: SpliceAI, MaxEntScan can predict splice impact",
    "Exonic Splicing Enhancers (ESEs): some deep-intronic and synonymous variants also disrupt splicing",
    "PVS1 applicable at canonical ±1/2 positions in haploinsufficiency genes",
  ];
  for (const p of splicePts) {
    ctx.fillStyle = CLR.red; ctx.beginPath(); ctx.arc(62, sy - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    sy = drawWrapped(ctx, p, 76, sy, W - 160, 22) + 6;
  }

  // Synonymous
  ctx.fillStyle = CLR.greenLight; ctx.fillRect(48, 380, W - 96, 175);
  ctx.fillStyle = CLR.green; ctx.fillRect(48, 380, 8, 175);
  setFont(ctx, 22, "bold"); ctx.fillStyle = CLR.green;
  ctx.fillText("Synonymous (Silent) Variants", 72, 414);
  setFont(ctx, 14, "normal"); ctx.fillStyle = CLR.muted;
  ctx.fillText("e.g., c.300G>A, p.Thr100=", 370, 414);

  setFont(ctx, 15, "normal"); ctx.fillStyle = CLR.body;
  let qy = 442;
  const synPts = [
    "Nucleotide change does NOT alter the amino acid — but NOT always benign",
    "May disrupt exonic splicing enhancers (ESEs) → exon skipping",
    "May affect mRNA stability or translation efficiency",
    "If in a disease gene in an unsolved patient → RNA-level studies (RT-PCR) to assess splicing",
  ];
  for (const p of synPts) {
    ctx.fillStyle = CLR.green; ctx.beginPath(); ctx.arc(62, qy - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    qy = drawWrapped(ctx, p, 76, qy, W - 160, 22) + 6;
  }

  // Summary table
  const headers = ["Variant Type", "Reading Frame", "Typical Consequence", "PVS1?"];
  const rows = [
    ["Missense", "Preserved", "Amino acid change (variable impact)", "No"],
    ["Nonsense", "Preserved (PTC)", "NMD → LoF", "Yes (if HI gene)"],
    ["Frameshift", "Disrupted", "PTC → NMD → LoF", "Yes (if HI gene)"],
    ["Splice-site", "May be disrupted", "Exon skip / intron retain", "Yes (±1/2)"],
    ["Synonymous", "Preserved", "Usually none; may affect splicing", "Rarely"],
  ];
  const colWidths = [200, 200, 400, 200];
  drawTable(ctx, headers, rows, 48, 590, colWidths, 44);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 8: Summary ────────────────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx); drawAccentBar(ctx);

  slideTitle(ctx, "Key Takeaways: Central Dogma", 72);
  sectionLabel(ctx, "Summary", 48, 128);

  const takeaways = [
    { n: "1", color: CLR.accent, bg: CLR.accentLight,
      head: "DNA → RNA → Protein is the foundation of molecular genetics",
      body: "Understanding this flow is prerequisite for interpreting any genetic variant. Disruption at any step can cause disease." },
    { n: "2", color: CLR.green, bg: CLR.greenLight,
      head: "Replication fidelity is extraordinary — but imperfect",
      body: "~1–2 de novo SNVs per genome per generation. Repeat slippage causes a major class of neurological diseases (Fragile X, Huntington, Friedreich)." },
    { n: "3", color: CLR.red, bg: CLR.redLight,
      head: "Splicing variants are underappreciated disease causes",
      body: "10–15% of pathogenic variants affect splicing. Tissue-specific isoforms explain organ-restricted phenotypes. Always consider splice impact." },
    { n: "4", color: CLR.violet, bg: CLR.violetLight,
      head: "Variant type predicts — but doesn't determine — molecular consequence",
      body: "Nonsense and frameshift usually cause LoF via NMD, but last-exon PTCs may escape. Synonymous variants can disrupt ESEs. Context is everything." },
    { n: "5", color: CLR.amber, bg: CLR.amberLight,
      head: "LoF vs. GoF: the critical clinical distinction",
      body: "Same gene, different mechanism → different treatment. Channel blockers for GoF; gene replacement/read-through for LoF. Variant type alone is insufficient." },
  ];

  let y = 160;
  for (const pt of takeaways) {
    ctx.fillStyle = pt.bg; ctx.fillRect(48, y, W - 96, 104);
    ctx.fillStyle = pt.color; ctx.fillRect(48, y, 8, 104);

    ctx.fillStyle = pt.color; ctx.beginPath(); ctx.arc(80, y + 34, 18, 0, Math.PI * 2); ctx.fill();
    setFont(ctx, 16, "bold"); ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center"; ctx.fillText(pt.n, 80, y + 40); ctx.textAlign = "left";

    setFont(ctx, 17, "bold"); ctx.fillStyle = CLR.subheading;
    ctx.fillText(pt.head, 112, y + 30);
    setFont(ctx, 14, "normal"); ctx.fillStyle = CLR.body;
    drawWrapped(ctx, pt.body, 112, y + 54, W - 190, 22);

    y += 116;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Write manifest ──────────────────────────────────────────────────────────
const manifest = { moduleId: "central-dogma", count: TOTAL, format: "jpg", generatedAt: new Date().toISOString() };
fs.writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\n✓ Done — ${TOTAL} slides → public/slides/central-dogma/`);
