/**
 * scripts/generate-neurodevelopmental-disorders-slides.mjs
 *
 * Generates slide images for the "Classic Neurodevelopmental Genetic Disorders" module.
 *
 * Run: node scripts/generate-neurodevelopmental-disorders-slides.mjs
 */

import { createCanvas } from "@napi-rs/canvas";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "slides", "neurodevelopmental-disorders");
fs.mkdirSync(OUT_DIR, { recursive: true });

const W = 1540;
const H = 1188;

const CLR = {
  bg: "#ffffff",
  surface: "#f8f9fa",
  border: "#e2e8f0",
  accent: "#14b8a6",       // teal-500
  accentLight: "#f0fdfa",  // teal-50
  accentDark: "#134e4a",   // teal-800
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
  tableHeader: "#115e59",
  tableRow1: "#ffffff",
  tableRow2: "#f0fdfa",
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
  ctx.fillText("Classic Neurodevelopmental Genetic Disorders", 48, H - 30);
  setFont(ctx, 18, "normal");
  ctx.fillStyle = CLR.mutedLight;
  ctx.textAlign = "right";
  ctx.fillText(`${num} / ${total}`, W - 40, H - 30);
  ctx.textAlign = "left";
}

function slideTitle(ctx, title, y = 80) {
  setFont(ctx, 36, "bold");
  ctx.fillStyle = CLR.heading;
  const lines = wrapText(ctx, title, W - 96);
  for (const line of lines) {
    ctx.fillText(line, 48, y);
    y += 44;
  }
  const lastLineW = ctx.measureText(lines[lines.length - 1]).width;
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, y - 44 + 12, Math.min(lastLineW, W - 96), 4);
  return y;
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
const TOTAL = 9;
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

  setFont(ctx, 44, "bold");
  ctx.fillStyle = CLR.heading;
  ctx.fillText("Classic Neurodevelopmental", 80, 230);
  ctx.fillText("Genetic Disorders", 80, 284);

  ctx.fillStyle = CLR.accent;
  ctx.fillRect(80, 312, 540, 5);

  setFont(ctx, 24, "normal");
  ctx.fillStyle = CLR.muted;
  ctx.fillText("TSC, Fragile X, and Rett Syndrome", 80, 360);

  setFont(ctx, 18, "normal");
  ctx.fillStyle = CLR.mutedLight;
  ctx.fillText("Molecular pathogenesis, clinical features, targeted therapies, and genetic testing", 80, 400);

  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(W - 420, 120, 360, 280);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(W - 420, 120, 6, 280);

  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("6 Sections  --  8 Quiz Questions", W - 390, 170);
  setFont(ctx, 15, "normal");
  const topics = [
    "TSC: Overview & Clinical Features",
    "TSC: Targeted Therapy & Surveillance",
    "Fragile X Syndrome",
    "FMR1 Premutation: FXTAS & FXPOI",
    "Rett Syndrome",
    "Genetic Testing Strategies",
  ];
  let ty = 204;
  for (const t of topics) {
    ctx.fillStyle = CLR.accent;
    ctx.beginPath(); ctx.arc(W - 378, ty - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    ctx.fillText(t, W - 364, ty);
    ty += 28;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 2: TSC Overview ───────────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Tuberous Sclerosis Complex: Overview", 72);
  sectionLabel(ctx, "Section 1 of 6 -- TSC1/TSC2 -> mTOR Pathway", 48, 128);

  // Mechanism
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, 148, W - 96, 80);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, 148, 6, 80);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Molecular Mechanism", 68, 174);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "TSC1 (hamartin, 9q34) + TSC2 (tuberin, 16p13.3) form a complex that INHIBITS mTOR. Loss of either -> constitutive mTOR activation -> uncontrolled cell growth. AD inheritance; ~2/3 de novo. Two-hit tumorigenesis.", 68, 198, W - 140, 22);

  // Clinical features table
  const headers = ["System", "Manifestation", "Key Detail"];
  const rows = [
    ["Brain", "Cortical tubers (epileptogenic)", "Epilepsy in ~85%; infantile spasms common"],
    ["Brain", "SENs / SEGAs", "SEGAs near foramen of Monro -> hydrocephalus risk"],
    ["Brain", "ASD / ID", "ASD 40-50%; ID ~50%"],
    ["Heart", "Cardiac rhabdomyomas", "Often first sign (prenatal); typically regress"],
    ["Kidney", "Angiomyolipomas (AML)", "Lifelong hemorrhage risk; need surveillance"],
    ["Lung", "LAM (females)", "Progressive cystic lung disease in adult females"],
    ["Skin", "Facial angiofibromas", "Pathognomonic; appear in childhood (>=3 needed)"],
  ];
  drawTable(ctx, headers, rows, 48, 248, [120, 310, 420], 46);

  let y = 580;
  // Diagnostic criteria note
  ctx.fillStyle = CLR.amberLight;
  ctx.fillRect(48, y, W - 96, 60);
  ctx.fillStyle = CLR.amber;
  ctx.fillRect(48, y, 6, 60);
  setFont(ctx, 15, "bold");
  ctx.fillStyle = CLR.amber;
  drawWrapped(ctx, "Diagnostic criteria (2012): 2 major features OR 1 major + >=2 minor = definite TSC. Genetic identification of pathogenic TSC1/TSC2 variant is independently sufficient for diagnosis.", 68, y + 16, W - 140, 22);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 3: TSC Targeted Therapy ───────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "TSC: Targeted Therapy & Surveillance", 72);
  sectionLabel(ctx, "Section 2 of 6 -- mTOR Inhibition & Vigabatrin", 48, 128);

  // Everolimus
  ctx.fillStyle = CLR.greenLight;
  ctx.fillRect(48, 148, W - 96, 110);
  ctx.fillStyle = CLR.green;
  ctx.fillRect(48, 148, 6, 110);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.green;
  ctx.fillText("Everolimus (mTOR Inhibitor) -- FDA-Approved Indications in TSC", 68, 174);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  const everoUses = [
    "SEGA: reduces tumor volume, can avoid neurosurgery",
    "Renal AML: reduces lesion size, decreases hemorrhage risk",
    "Adjunctive for TSC-associated refractory focal seizures",
  ];
  let eY = 200;
  for (const u of everoUses) {
    ctx.fillStyle = CLR.green;
    ctx.beginPath(); ctx.arc(82, eY - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    ctx.fillText(u, 94, eY);
    eY += 24;
  }

  // Vigabatrin
  let y = 278;
  ctx.fillStyle = CLR.blueLight;
  ctx.fillRect(48, y, W - 96, 80);
  ctx.fillStyle = CLR.blue;
  ctx.fillRect(48, y, 6, 80);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.blue;
  ctx.fillText("Vigabatrin -- First-Line for TSC Infantile Spasms", 68, y + 26);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "~95% response rate in TSC-related infantile spasms (vs. ~50% for ACTH/prednisolone in non-TSC). Irreversible GABA transaminase inhibitor with uniquely preferential efficacy in TSC.", 68, y + 50, W - 140, 22);

  // EPISTOP
  y += 100;
  ctx.fillStyle = CLR.purpleLight;
  ctx.fillRect(48, y, W - 96, 90);
  ctx.fillStyle = CLR.purple;
  ctx.fillRect(48, y, 6, 90);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.purple;
  ctx.fillText("EPISTOP Trial (2021): Preventive Vigabatrin", 68, y + 26);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Vigabatrin initiated in TSC infants showing epileptiform EEG BEFORE clinical seizures significantly reduced epilepsy incidence, drug-resistant epilepsy risk, and improved neurodevelopmental outcomes at 24 months.", 68, y + 52, W - 140, 22);

  // Surveillance
  y += 110;
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.subheading;
  ctx.fillText("TSC Surveillance Protocol Includes:", 48, y);
  y += 26;

  setFont(ctx, 15, "normal");
  const surveillance = [
    "Brain MRI (SEGA monitoring until age 25)",
    "Renal imaging (AML growth)",
    "Echo (infancy)",
    "Chest CT + PFTs (LAM, adult females)",
    "Dermatology + ophthalmology",
    "Serial EEG in infants",
  ];
  const midX = W / 2;
  for (let i = 0; i < surveillance.length; i++) {
    const x = i < 3 ? 78 : midX + 20;
    const yy = y + (i % 3) * 26;
    ctx.fillStyle = CLR.accent;
    ctx.beginPath(); ctx.arc(x - 16, yy - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    ctx.fillText(surveillance[i], x, yy);
  }

  // TSC2 vs TSC1
  y += 90;
  setFont(ctx, 14, "bold");
  ctx.fillStyle = CLR.muted;
  ctx.fillText("Note: TSC2 variants -> more severe phenotype than TSC1 (more tubers, earlier seizures, higher ID rate, larger AMLs).", 48, y);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 4: Fragile X Syndrome ─────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Fragile X Syndrome", 72);
  sectionLabel(ctx, "Section 3 of 6 -- FMR1 CGG Repeat Expansion", 48, 128);

  // Repeat categories
  const headers = ["Category", "CGG Repeats", "FMR1 Status", "Clinical Effect"];
  const rows = [
    ["Normal", "<45", "Active (FMRP produced)", "No clinical effect"],
    ["Intermediate", "45-54", "Active", "Mildly unstable; no symptoms"],
    ["Premutation", "55-200", "Elevated mRNA, reduced FMRP", "FXTAS (males >50), FXPOI (females)"],
    ["Full mutation", ">200", "SILENCED (methylated)", "Fragile X syndrome (ID, ASD, facies)"],
  ];
  drawTable(ctx, headers, rows, 48, 150, [160, 170, 320, 390], 50);

  let y = 360;
  // Clinical features in males
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, y, W - 96, 130);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, y, 6, 130);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Clinical Features in Affected Males (Full Mutation)", 68, y + 26);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  const features = [
    "Moderate-to-severe intellectual disability; most common inherited cause of ID",
    "Characteristic facies: long face, prominent ears, prominent jaw",
    "Macroorchidism (post-pubertal, >25 mL)",
    "Behavioral: anxiety, ADHD, hand flapping, tactile defensiveness, gaze avoidance",
    "Connective tissue: joint hypermobility, flat feet, mitral valve prolapse",
  ];
  let fY = y + 48;
  for (const f of features) {
    ctx.fillStyle = CLR.accent;
    ctx.beginPath(); ctx.arc(82, fY - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    ctx.fillText(f, 94, fY);
    fY += 22;
  }

  // Females
  y += 148;
  ctx.fillStyle = CLR.amberLight;
  ctx.fillRect(48, y, W - 96, 50);
  ctx.fillStyle = CLR.amber;
  ctx.fillRect(48, y, 6, 50);
  setFont(ctx, 15, "bold");
  ctx.fillStyle = CLR.amber;
  drawWrapped(ctx, "Females with full mutation: ~50% have some cognitive impairment (variable due to random X-inactivation). Severity depends on the proportion of cells expressing the normal FMR1 allele.", 68, y + 16, W - 140, 22);

  // Key molecular point
  y += 68;
  ctx.fillStyle = CLR.redLight;
  ctx.fillRect(48, y, W - 96, 50);
  ctx.fillStyle = CLR.red;
  ctx.fillRect(48, y, 6, 50);
  setFont(ctx, 15, "bold");
  ctx.fillStyle = CLR.red;
  ctx.fillText("CRITICAL: Standard WES and WGS do NOT detect CGG repeat expansions. FMR1 repeat analysis must be ordered separately.", 68, y + 32);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 5: FXTAS & FXPOI ─────────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "FMR1 Premutation: FXTAS & FXPOI", 72);
  sectionLabel(ctx, "Section 4 of 6 -- RNA Toxicity (NOT FMRP Loss)", 48, 128);

  // Mechanism box
  ctx.fillStyle = CLR.redLight;
  ctx.fillRect(48, 148, W - 96, 80);
  ctx.fillStyle = CLR.red;
  ctx.fillRect(48, 148, 6, 80);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.red;
  ctx.fillText("Different mechanism from full mutation!", 68, 174);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Premutation (55-200 repeats): gene is NOT silenced. Instead, elevated FMR1 mRNA (2-8x normal) with expanded CGG repeats is directly TOXIC. RNA hairpins sequester RNA-binding proteins and form intranuclear inclusions -> progressive neurodegeneration.", 68, 198, W - 140, 22);

  let y = 248;
  // FXTAS
  const halfW = (W - 112) / 2;

  ctx.fillStyle = CLR.blueLight;
  ctx.fillRect(48, y, halfW, 220);
  ctx.fillStyle = CLR.blue;
  ctx.fillRect(48, y, 6, 220);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.blue;
  ctx.fillText("FXTAS", 68, y + 28);
  setFont(ctx, 14, "bold");
  ctx.fillStyle = CLR.muted;
  ctx.fillText("(Tremor/Ataxia Syndrome)", 68, y + 48);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  const fxtasFeatures = [
    "Late-onset (>50 yr), predominantly males",
    "Progressive intention tremor + gait ataxia",
    "Executive dysfunction -> dementia",
    "Parkinsonism, peripheral neuropathy",
    "MRI: 'MCP sign' (bilateral T2 hyperintensity",
    "  in middle cerebellar peduncles)",
  ];
  let fY2 = y + 72;
  for (const f of fxtasFeatures) {
    ctx.fillText(f, 68, fY2);
    fY2 += 22;
  }

  // FXPOI
  const rightX = 48 + halfW + 16;
  ctx.fillStyle = CLR.purpleLight;
  ctx.fillRect(rightX, y, halfW, 220);
  ctx.fillStyle = CLR.purple;
  ctx.fillRect(rightX, y, 6, 220);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.purple;
  ctx.fillText("FXPOI", rightX + 20, y + 28);
  setFont(ctx, 14, "bold");
  ctx.fillStyle = CLR.muted;
  ctx.fillText("(Primary Ovarian Insufficiency)", rightX + 20, y + 48);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  const fxpoiFeatures = [
    "Affects ~20-25% of female premutation carriers",
    "Menstrual irregularity, infertility",
    "Premature menopause (<40 years)",
    "Important for reproductive counseling",
    "Must counsel carriers about fertility",
    "  planning and expansion risk to offspring",
  ];
  fY2 = y + 72;
  for (const f of fxpoiFeatures) {
    ctx.fillText(f, rightX + 20, fY2);
    fY2 += 22;
  }

  // Genetic counseling
  y += 240;
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, y, W - 96, 80);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, y, 6, 80);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Genetic Counseling Implications", 68, y + 26);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Premutation mothers: risk of expansion to full mutation in offspring (>90 repeats = near-100% expansion risk). Premutation fathers: transmit premutation (NOT full mutation) to all daughters; at personal risk for FXTAS. Cascade testing of family members is critical.", 68, y + 50, W - 140, 22);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 6: Rett Syndrome ──────────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Rett Syndrome", 72);
  sectionLabel(ctx, "Section 5 of 6 -- MECP2, X-linked Dominant", 48, 128);

  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "X-linked dominant; de novo MECP2 variants in >95% of cases. Almost exclusively affects girls (hemizygous males typically lethal). MECP2 binds methylated CpG and recruits co-repressors -- loss causes widespread transcriptional dysregulation in neurons.", 48, 155, W - 96, 22);

  // Four stages
  let y = 232;
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.subheading;
  ctx.fillText("Four Clinical Stages of Classic Rett Syndrome", 48, y);
  y += 28;

  const stages = [
    { stage: "Stage I", name: "Early Onset Stagnation", age: "6-18 mo", desc: "Subtle developmental slowing; head growth deceleration." },
    { stage: "Stage II", name: "Rapid Regression", age: "1-4 yr", desc: "Loss of hand skills + speech; hand stereotypies appear; breathing irregularities; social withdrawal." },
    { stage: "Stage III", name: "Plateau", age: "2-10 yr", desc: "Some social improvement; persistent stereotypies; seizures peak; scoliosis develops." },
    { stage: "Stage IV", name: "Late Motor Deterioration", age: ">10 yr", desc: "Progressive rigidity; loss of ambulation; worsening scoliosis; parkinsonian features." },
  ];

  for (const s of stages) {
    ctx.fillStyle = CLR.accent + "15";
    ctx.fillRect(48, y, W - 96, 56);
    ctx.fillStyle = CLR.accent;
    ctx.fillRect(48, y, 6, 56);

    setFont(ctx, 15, "bold");
    ctx.fillStyle = CLR.accentDark;
    ctx.fillText(s.stage + ": " + s.name, 68, y + 20);
    setFont(ctx, 13, "bold");
    ctx.fillStyle = CLR.muted;
    ctx.fillText("(" + s.age + ")", 400, y + 20);
    setFont(ctx, 14, "normal");
    ctx.fillStyle = CLR.body;
    ctx.fillText(s.desc, 68, y + 42);
    y += 66;
  }

  // Additional features
  setFont(ctx, 15, "bold");
  ctx.fillStyle = CLR.subheading;
  ctx.fillText("Additional features:", 48, y + 10);
  setFont(ctx, 14, "normal");
  ctx.fillStyle = CLR.body;
  ctx.fillText("Seizures (60-80%), acquired microcephaly, breathing irregularities, prolonged QTc, scoliosis, cold extremities.", 48, y + 32);

  // Gene therapy challenge
  y += 56;
  ctx.fillStyle = CLR.redLight;
  ctx.fillRect(48, y, W - 96, 68);
  ctx.fillStyle = CLR.red;
  ctx.fillRect(48, y, 6, 68);
  setFont(ctx, 15, "bold");
  ctx.fillStyle = CLR.red;
  ctx.fillText("Gene therapy challenge: MECP2 is DOSAGE-SENSITIVE", 68, y + 22);
  setFont(ctx, 14, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Too little = Rett; too much = MECP2 duplication syndrome. This narrow window makes gene replacement extremely difficult. Trofinetide (IGF-1 analog, FDA 2023) targets downstream effects.", 68, y + 44, W - 140, 20);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 7: Genetic Testing Strategies ─────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Genetic Testing Strategies", 72);
  sectionLabel(ctx, "Section 6 of 6 -- Each Disorder Requires a Different Test", 48, 128);

  const disorders = [
    {
      name: "TSC",
      test: "TSC1/TSC2 sequencing (or gene panel)",
      yield: "~85% with pathogenic variant identified",
      note: "~15% NMI by conventional sequencing. Deep intronic, mosaic, or large rearrangements may need MLPA/long-read.",
      color: CLR.accent, bg: CLR.accentLight,
    },
    {
      name: "Fragile X",
      test: "FMR1 CGG repeat analysis (Southern blot / RP-PCR)",
      yield: "Gold standard for diagnosis",
      note: "MUST be ordered specifically. WES and WGS do NOT detect CGG expansions. First-tier test in males with unexplained ID.",
      color: CLR.red, bg: CLR.redLight,
    },
    {
      name: "Rett Syndrome",
      test: "MECP2 sequencing + del/dup analysis (MLPA)",
      yield: ">95% detected in classic Rett",
      note: "If negative: consider CDKL5 and FOXG2 for Rett-like phenotype.",
      color: CLR.purple, bg: CLR.purpleLight,
    },
  ];

  let y = 160;
  for (const d of disorders) {
    ctx.fillStyle = d.bg;
    ctx.fillRect(48, y, W - 96, 130);
    ctx.fillStyle = d.color;
    ctx.fillRect(48, y, 8, 130);

    setFont(ctx, 19, "bold");
    ctx.fillStyle = CLR.subheading;
    ctx.fillText(d.name, 72, y + 28);
    setFont(ctx, 15, "bold");
    ctx.fillStyle = d.color;
    ctx.fillText("Test: " + d.test, 72, y + 52);
    setFont(ctx, 14, "normal");
    ctx.fillStyle = CLR.body;
    ctx.fillText("Yield: " + d.yield, 72, y + 76);
    drawWrapped(ctx, d.note, 72, y + 98, W - 150, 20);
    y += 148;
  }

  // Key principle
  ctx.fillStyle = CLR.amberLight;
  ctx.fillRect(48, y, W - 96, 70);
  ctx.fillStyle = CLR.amber;
  ctx.fillRect(48, y, 6, 70);
  setFont(ctx, 15, "bold");
  ctx.fillStyle = CLR.amber;
  drawWrapped(ctx, "KEY PRINCIPLE: Repeat expansion disorders (Fragile X, myotonic dystrophy, Huntington, Friedreich, SCAs) require dedicated repeat-length analysis and are SYSTEMATICALLY MISSED by standard WES/WGS.", 68, y + 16, W - 140, 22);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 8: Comparison Table ───────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "TSC vs. Fragile X vs. Rett: Quick Comparison", 72);
  sectionLabel(ctx, "Clinical Reference", 48, 128);

  const headers = ["Feature", "TSC", "Fragile X", "Rett Syndrome"];
  const rows = [
    ["Gene(s)", "TSC1 / TSC2", "FMR1 (CGG repeat)", "MECP2"],
    ["Inheritance", "AD (2/3 de novo)", "X-linked", "X-linked dom (>95% de novo)"],
    ["Mechanism", "mTOR overactivation", "FMRP loss (methylation)", "Methyl-CpG binding disrupted"],
    ["Key neuro feature", "Epilepsy (85%), tubers", "ID + ASD (most common)", "Regression + hand stereotypies"],
    ["Targeted therapy", "Everolimus (mTOR-i)", "mGluR5 antagonists (trial)", "Trofinetide (IGF-1 analog)"],
    ["First-line epilepsy", "Vigabatrin (for IS)", "Standard AEDs", "Standard AEDs (often refractory)"],
    ["WES detects?", "Yes (sequencing)", "NO (repeat expansion)", "Yes (sequencing)"],
    ["Recurrence risk", "50% if inherited; ~1-2% de novo", "X-linked + anticipation", "Low (~1% germline mosaic)"],
  ];
  drawTable(ctx, headers, rows, 48, 150, [200, 280, 300, 340], 50);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 9: Key Takeaways ──────────────────────────────────────────────────
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
      head: "TSC: mTOR pathway disorder with targeted therapy",
      body: "Everolimus for SEGAs/AMLs/seizures. Vigabatrin first-line for TSC infantile spasms (~95% response). EPISTOP: preventive treatment improves outcomes.",
    },
    {
      n: "2", color: CLR.red, bg: CLR.redLight,
      head: "Fragile X: CGG repeat silences FMR1",
      body: "Most common inherited cause of ID. Full mutation (>200) -> methylation -> FMRP loss. WES CANNOT detect it -- order FMR1 repeat analysis.",
    },
    {
      n: "3", color: CLR.blue, bg: CLR.blueLight,
      head: "Premutation is NOT silent",
      body: "RNA toxicity (NOT FMRP loss) causes FXTAS (tremor/ataxia in males >50) and FXPOI (premature ovarian insufficiency in ~25% of female carriers).",
    },
    {
      n: "4", color: CLR.purple, bg: CLR.purpleLight,
      head: "Rett: regression with hand stereotypies in girls",
      body: "MECP2 de novo variants >95%. Four-stage course. Dosage-sensitive gene makes gene therapy very challenging. Trofinetide FDA-approved 2023.",
    },
    {
      n: "5", color: CLR.amber, bg: CLR.amberLight,
      head: "Different disorders need different tests",
      body: "TSC/Rett: gene sequencing (WES detects). Fragile X: dedicated CGG repeat analysis (WES misses). Never assume WES covers everything.",
    },
  ];

  let y = 156;
  for (const pt of takeaways) {
    ctx.fillStyle = pt.bg;
    ctx.fillRect(48, y, W - 96, 110);
    ctx.fillStyle = pt.color;
    ctx.fillRect(48, y, 8, 110);

    ctx.fillStyle = pt.color;
    ctx.beginPath(); ctx.arc(80, y + 36, 20, 0, Math.PI * 2); ctx.fill();
    setFont(ctx, 20, "bold");
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(pt.n, 80, y + 43);
    ctx.textAlign = "left";

    setFont(ctx, 17, "bold");
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
  moduleId: "neurodevelopmental-disorders",
  count: TOTAL,
  format: "jpg",
  generatedAt: new Date().toISOString(),
};
fs.writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\nDone -- ${TOTAL} slides -> public/slides/neurodevelopmental-disorders/`);
