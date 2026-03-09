/**
 * scripts/generate-neuroimaging-slides.mjs
 *
 * Generates slide images for the "Neuroimaging Pattern Recognition" module.
 *
 * Run: node scripts/generate-neuroimaging-slides.mjs
 */

import { createCanvas } from "@napi-rs/canvas";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "slides", "neuroimaging");
fs.mkdirSync(OUT_DIR, { recursive: true });

const W = 1540;
const H = 1188;

const CLR = {
  bg: "#ffffff",
  surface: "#f8f9fa",
  border: "#e2e8f0",
  accent: "#10b981",       // emerald-500
  accentLight: "#ecfdf5",  // emerald-50
  accentDark: "#065f46",   // emerald-800
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
  tableHeader: "#064e3b",
  tableRow1: "#ffffff",
  tableRow2: "#ecfdf5",
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
  ctx.fillText("Neuroimaging Pattern Recognition in Neurogenetics", 48, H - 30);
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
  ctx.fillRect(48, y - 44 + 8 + 4, Math.min(lastLineW, W - 96), 4);
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
const TOTAL = 8;
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

  setFont(ctx, 46, "bold");
  ctx.fillStyle = CLR.heading;
  ctx.fillText("Neuroimaging Pattern", 80, 230);
  ctx.fillText("Recognition", 80, 286);

  ctx.fillStyle = CLR.accent;
  ctx.fillRect(80, 314, 480, 5);

  setFont(ctx, 24, "normal");
  ctx.fillStyle = CLR.muted;
  ctx.fillText("MRI Patterns That Should Trigger Genetic Testing", 80, 360);

  setFont(ctx, 18, "normal");
  ctx.fillStyle = CLR.mutedLight;
  ctx.fillText("Basal ganglia, leukodystrophies, cortical malformations, posterior fossa, stroke mimics", 80, 400);

  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(W - 420, 120, 360, 260);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(W - 420, 120, 6, 260);

  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("5 Sections  --  5 Quiz Questions", W - 390, 170);
  setFont(ctx, 15, "normal");
  const topics = [
    "Basal Ganglia & Deep Gray Matter",
    "White Matter (Leukodystrophies)",
    "Malformations of Cortical Development",
    "Posterior Fossa & Cerebellar Patterns",
    "Stroke-like & Vascular Patterns",
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

// ── Slide 2: Basal Ganglia & Deep Gray Matter ──────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Basal Ganglia & Deep Gray Matter Patterns", 72);
  sectionLabel(ctx, "Section 1 of 5", 48, 128);

  const headers = ["Condition", "Gene(s)", "MRI Pattern", "Key Clue"];
  const rows = [
    ["Leigh syndrome", ">75 genes", "Bilateral T2 hyperintensity: putamen, caudate, PAG", "Elevated lactate on MRS"],
    ["NBIA (PANK2)", "PANK2", "'Eye of the tiger' in globus pallidus", "T2 hypo with central T2 hyper"],
    ["Wilson disease", "ATP7B", "'Face of giant panda' sign, putamen T2 hyper", "Check ceruloplasmin + urine Cu"],
    ["Glutaric aciduria 1", "GCDH", "Wide sylvian fissures + striatal necrosis", "Newborn screen: elevated C5DC"],
    ["Biotin-thiamine BG", "SLC19A3", "Bilateral caudate/putamen necrosis", "TREATABLE: biotin + thiamine"],
  ];
  drawTable(ctx, headers, rows, 48, 150, [220, 130, 380, 310], 54);

  let y = 430;
  // Red flags box
  ctx.fillStyle = CLR.redLight;
  ctx.fillRect(48, y, W - 96, 100);
  ctx.fillStyle = CLR.red;
  ctx.fillRect(48, y, 6, 100);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.red;
  ctx.fillText("Red Flags: Metabolic vs. Structural Basal Ganglia Disease", 68, y + 26);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Metabolic: bilateral, symmetric, progressive/episodic, triggered by illness, elevated lactate/organic acids. Structural/toxic: asymmetric, acute onset, clear precipitant (hypoxia, toxin, CO exposure).", 68, y + 52, W - 140, 22);

  // Treatable highlight
  y += 120;
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, y, W - 96, 60);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, y, 6, 60);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Do not miss: SLC19A3 (biotin-thiamine responsive) -- partially reversible with early treatment!", 68, y + 38);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 3: White Matter / Leukodystrophies ────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "White Matter Patterns: Leukodystrophies", 72);
  sectionLabel(ctx, "Section 2 of 5", 48, 128);

  const headers = ["Leukodystrophy", "Gene", "WM Distribution", "Distinguishing Feature"];
  const rows = [
    ["Metachromatic LD", "ARSA (AR)", "Periventricular, confluent", "'Tigroid' pattern (perivascular sparing)"],
    ["Krabbe disease", "GALC (AR)", "Optic radiations, CST", "Peripheral nerve involvement, high CSF protein"],
    ["X-ALD", "ABCD1 (XL)", "Posterior -> anterior", "Enhancing leading edge; check adrenals"],
    ["Alexander disease", "GFAP (AD)", "Frontal-predominant", "Macrocephaly + periventricular enhancement"],
    ["Vanishing WM", "EIF2B1-5 (AR)", "Rarefaction -> CSF signal", "Deterioration triggered by fever/trauma"],
    ["Canavan disease", "ASPA (AR)", "Diffuse + macrocephaly", "Elevated NAA on MRS (pathognomonic)"],
  ];
  drawTable(ctx, headers, rows, 48, 150, [210, 160, 280, 380], 52);

  let y = 470;
  // MRS box
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, y, W - 96, 110);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, y, 6, 110);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("MR Spectroscopy: Essential Adjunct in Leukodystrophies", 68, y + 28);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  const mrsPoints = [
    "Elevated NAA: pathognomonic for Canavan disease (ASPA deficiency -- impaired NAA hydrolysis)",
    "Elevated lactate (1.3 ppm): suggests mitochondrial white matter involvement",
    "Decreased NAA + elevated choline: active demyelination with axonal loss",
  ];
  let mY = y + 52;
  for (const p of mrsPoints) {
    ctx.fillStyle = CLR.accent;
    ctx.beginPath(); ctx.arc(82, mY - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    setFont(ctx, 14, "normal");
    ctx.fillText(p, 94, mY);
    mY += 24;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 4: Malformations of Cortical Development ─────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Malformations of Cortical Development", 72);
  sectionLabel(ctx, "Section 3 of 5", 48, 128);

  const headers = ["MCD Pattern", "Gene(s)", "MRI Finding"];
  const rows = [
    ["Lissencephaly (posterior)", "LIS1/PAFAH1B1", "Posterior agyria, anterior pachygyria"],
    ["Lissencephaly (anterior)", "DCX (X-linked)", "Anterior agyria (males); band heterotopia (females)"],
    ["Lissencephaly + genital", "ARX (X-linked)", "Lissencephaly + ACC + ambiguous genitalia in males"],
    ["Tubulinopathies", "TUBA1A, TUBB2B, TUBB3", "Lissencephaly-PMG + distinctive BG + CC abnl"],
    ["Periventricular het.", "FLNA (X-linked dom.)", "Gray matter nodules along ventricles; epilepsy + normal IQ"],
    ["Bilateral perisylvian PMG", "TUBB2B, GPR56", "Bilateral symmetric polymicrogyria"],
    ["FCD type II / mTOR", "DEPDC5, MTOR (somatic)", "Focal cortical dysplasia; familial focal epilepsy"],
  ];
  drawTable(ctx, headers, rows, 48, 150, [280, 280, 480], 50);

  let y = 510;
  // Lissencephaly gradient
  ctx.fillStyle = CLR.blueLight;
  ctx.fillRect(48, y, W - 96, 100);
  ctx.fillStyle = CLR.blue;
  ctx.fillRect(48, y, 6, 100);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.blue;
  ctx.fillText("Lissencephaly Gradient Guides Gene Testing", 68, y + 28);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Posterior > anterior = test LIS1/PAFAH1B1 first (17p13.3 deletion or point mutation). Anterior > posterior = test DCX first. This MRI gradient directly determines which gene to test -- a textbook genotype-phenotype correlation.", 68, y + 52, W - 140, 22);

  // mTOR note
  y += 118;
  ctx.fillStyle = CLR.amberLight;
  ctx.fillRect(48, y, W - 96, 50);
  ctx.fillStyle = CLR.amber;
  ctx.fillRect(48, y, 6, 50);
  setFont(ctx, 15, "bold");
  ctx.fillStyle = CLR.amber;
  ctx.fillText("FCD + mTOR: germline GATOR1 variants (DEPDC5) + somatic second-hit mutations in resected tissue. mTOR inhibitors under investigation.", 68, y + 32);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 5: Posterior Fossa & Cerebellar ───────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Posterior Fossa & Cerebellar Patterns", 72);
  sectionLabel(ctx, "Section 4 of 5", 48, 128);

  const conditions = [
    {
      name: "Joubert Syndrome",
      genes: ">40 genes (ciliopathy)",
      sign: "'Molar tooth sign' on axial MRI",
      detail: "Thickened superior cerebellar peduncles + deep interpeduncular fossa + vermis hypoplasia. Screen kidneys/eyes.",
      color: CLR.accent, bg: CLR.accentLight,
    },
    {
      name: "Dandy-Walker Malformation",
      genes: "ZIC1/ZIC4, FOXC1, trisomy 13/18",
      sign: "Cystic 4th ventricle + vermis hypoplasia",
      detail: "Enlarged posterior fossa. Hydrocephalus in ~80%. Distinguish from mega cisterna magna (normal vermis).",
      color: CLR.blue, bg: CLR.blueLight,
    },
    {
      name: "Pontocerebellar Hypoplasia",
      genes: "TSEN54, RARS2, CASK",
      sign: "'Dragonfly' pattern: flat cerebellum",
      detail: "Severe AR conditions with prenatal-onset pontine + cerebellar hypoplasia. CASK = X-linked, predominantly females.",
      color: CLR.purple, bg: CLR.purpleLight,
    },
    {
      name: "SCA Imaging Patterns",
      genes: "SCA1/2/3, SCA6, CACNA1A",
      sign: "Olivopontocerebellar atrophy vs. pure cerebellar",
      detail: "SCA1/2/3: pontine + cerebellar peduncle involvement. SCA6: isolated cerebellar cortical atrophy (no brainstem).",
      color: CLR.amber, bg: CLR.amberLight,
    },
  ];

  let y = 155;
  for (const c of conditions) {
    ctx.fillStyle = c.bg;
    ctx.fillRect(48, y, W - 96, 120);
    ctx.fillStyle = c.color;
    ctx.fillRect(48, y, 8, 120);

    setFont(ctx, 17, "bold");
    ctx.fillStyle = CLR.subheading;
    ctx.fillText(c.name, 72, y + 24);
    setFont(ctx, 13, "bold");
    ctx.fillStyle = c.color;
    ctx.fillText("Genes: " + c.genes, 72, y + 44);
    setFont(ctx, 14, "bold");
    ctx.fillStyle = CLR.accentDark;
    ctx.fillText("Sign: " + c.sign, 72, y + 66);
    setFont(ctx, 14, "normal");
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, c.detail, 72, y + 88, W - 150, 20);
    y += 136;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 6: Stroke-like & Vascular Patterns ────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Stroke-like & Vascular Patterns", 72);
  sectionLabel(ctx, "Section 5 of 5", 48, 128);

  const headers = ["Condition", "Gene", "Key MRI Finding", "Systemic Clue"];
  const rows = [
    ["MELAS", "m.3243A>G", "Cortical lesions NOT in vascular territory", "Lactate on MRS; hearing loss; maternal DM"],
    ["Homocystinuria", "CBS (AR)", "Thromboembolic stroke in teens", "Marfanoid; DOWNWARD lens subluxation"],
    ["Fabry disease", "GLA (XL)", "WM lesions + posterior circulation strokes", "Pulvinar sign (T1 hyper); angiokeratomas"],
    ["Moyamoya", "RNF213; NF1, T21", "'Puff of smoke' collaterals on angio", "Progressive ICA stenosis; NF1/Down/SCD"],
    ["COL4A1/A2", "COL4A1 (AD)", "Porencephaly to lacunar infarcts", "Ocular anomalies; renal disease; FHx ICH"],
  ];
  drawTable(ctx, headers, rows, 48, 150, [180, 160, 360, 340], 54);

  let y = 430;
  // Red flags
  ctx.fillStyle = CLR.redLight;
  ctx.fillRect(48, y, W - 96, 120);
  ctx.fillStyle = CLR.red;
  ctx.fillRect(48, y, 6, 120);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.red;
  ctx.fillText("Red Flags for Genetic Stroke Mimics", 68, y + 26);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  const flags = [
    "Age <45 without conventional vascular risk factors",
    "Lesions crossing vascular territory boundaries (think MELAS)",
    "Recurrent strokes in different territories",
    "Associated systemic features (hearing loss, lens subluxation, skin findings)",
    "Family history of early stroke or neurological disease",
  ];
  let fY = y + 48;
  for (const f of flags) {
    ctx.fillStyle = CLR.red;
    ctx.beginPath(); ctx.arc(82, fY - 5, 3, 0, Math.PI * 2); ctx.fill();
    setFont(ctx, 14, "normal");
    ctx.fillStyle = CLR.body;
    ctx.fillText(f, 94, fY);
    fY += 22;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 7: MRS Quick Reference ────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "MR Spectroscopy: Diagnostic Quick Reference", 72);
  sectionLabel(ctx, "Clinical Tool", 48, 128);

  const headers = ["MRS Finding", "What It Suggests", "Think of These Conditions"];
  const rows = [
    ["Elevated lactate (1.3 ppm)", "Mitochondrial dysfunction", "Leigh syndrome, MELAS, mitochondrial WM disease"],
    ["Elevated NAA", "Impaired NAA hydrolysis", "Canavan disease (ASPA) -- pathognomonic"],
    ["Decreased NAA + high choline", "Axonal loss + active demyelination", "Most leukodystrophies during active phase"],
    ["Elevated glutamate/glutamine", "Excitotoxicity or urea cycle defect", "Hyperammonemia, acute metabolic crisis"],
    ["Elevated myo-inositol", "Gliosis / astrocyte activation", "Chronic demyelination, Alexander disease"],
    ["Succinate peak", "SDH deficiency", "Mitochondrial complex II deficiency (rare)"],
  ];
  drawTable(ctx, headers, rows, 48, 155, [280, 300, 460], 52);

  let y = 480;
  // Clinical advice
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, y, W - 96, 80);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, y, 6, 80);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("When to Order MRS", 68, y + 28);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "MRS should be performed routinely in all undiagnosed leukodystrophy cases, any bilateral basal ganglia abnormality, and stroke-like presentations in young patients without vascular risk factors. Single-voxel + multivoxel techniques increase diagnostic sensitivity.", 68, y + 52, W - 140, 22);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 8: Key Takeaways ──────────────────────────────────────────────────
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
      head: "Bilateral symmetric basal ganglia T2 signal = think metabolic/genetic",
      body: "Leigh syndrome (lactate on MRS), Wilson (ceruloplasmin), NBIA ('eye of tiger'), SLC19A3 (treatable!).",
    },
    {
      n: "2", color: CLR.blue, bg: CLR.blueLight,
      head: "Leukodystrophy MRI pattern narrows the differential",
      body: "Posterior = X-ALD; frontal = Alexander; tigroid = MLD; rarefaction = VWM. MRS: NAA elevation = Canavan.",
    },
    {
      n: "3", color: CLR.purple, bg: CLR.purpleLight,
      head: "Lissencephaly gradient guides gene testing",
      body: "Posterior > anterior = LIS1. Anterior > posterior = DCX. Lissencephaly + genital anomalies = ARX.",
    },
    {
      n: "4", color: CLR.amber, bg: CLR.amberLight,
      head: "Molar tooth sign = Joubert syndrome",
      body: "Pathognomonic finding on axial MRI. Ciliopathy with >40 genes. Mandatory renal + ophthalmologic screening.",
    },
    {
      n: "5", color: CLR.red, bg: CLR.redLight,
      head: "Stroke-like lesions crossing vascular territories = genetic mimic",
      body: "MELAS (lactate, hearing loss), Fabry (pulvinar sign), homocystinuria (lens subluxation). Low threshold for genetic testing in young stroke.",
    },
  ];

  let y = 158;
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

    y += 126;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Write manifest ─────────────────────────────────────────────────────────────
const manifest = {
  moduleId: "neuroimaging",
  count: TOTAL,
  format: "jpg",
  generatedAt: new Date().toISOString(),
};
fs.writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\nDone -- ${TOTAL} slides -> public/slides/neuroimaging/`);
