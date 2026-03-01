/**
 * scripts/generate-virtual-cases-slides.mjs
 *
 * Generates slide images for the "Integrative Virtual Patient Cases" module.
 *
 * Run: node scripts/generate-virtual-cases-slides.mjs
 */

import { createCanvas } from "@napi-rs/canvas";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "slides", "virtual-cases");
fs.mkdirSync(OUT_DIR, { recursive: true });

const W = 1540;
const H = 1188;

const CLR = {
  bg: "#ffffff",
  surface: "#f8f9fa",
  border: "#e2e8f0",
  accent: "#f97316",       // orange-500
  accentLight: "#fff7ed",  // orange-50
  accentDark: "#9a3412",   // orange-800
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
  tableHeader: "#7c2d12",
  tableRow1: "#ffffff",
  tableRow2: "#fff7ed",
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
  ctx.fillText("Integrative Virtual Patient Cases", 48, H - 30);
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

  setFont(ctx, 48, "bold");
  ctx.fillStyle = CLR.heading;
  ctx.fillText("Integrative Virtual", 80, 230);
  ctx.fillText("Patient Cases", 80, 290);

  ctx.fillStyle = CLR.accent;
  ctx.fillRect(80, 318, 460, 5);

  setFont(ctx, 24, "normal");
  ctx.fillStyle = CLR.muted;
  ctx.fillText("Clinical Reasoning in Neurogenetics", 80, 365);

  setFont(ctx, 18, "normal");
  ctx.fillStyle = CLR.mutedLight;
  ctx.fillText("Neonatal seizures, progressive ataxia, and a cerebral palsy mimic", 80, 405);

  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(W - 420, 120, 360, 260);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(W - 420, 120, 6, 260);

  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("3 Cases  --  6 Quiz Questions", W - 390, 170);
  setFont(ctx, 15, "normal");
  const topics = [
    "Case 1: Neonatal Seizures (Presentation)",
    "Case 1: Diagnosis & Management (KCNQ2)",
    "Case 2: Progressive Ataxia (Presentation)",
    "Case 2: Diagnosis & Management (Friedreich)",
    "Case 3: CP Mimic (Presentation)",
    "Case 3: Diagnosis & Management (GCH1/DRD)",
  ];
  let ty = 200;
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

// ── Slide 2: Case 1 Presentation ────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Case 1: Neonatal Seizures -- Presentation", 72);
  sectionLabel(ctx, "Baby M -- 3-Day-Old Term Neonate", 48, 128);

  // Clinical vignette
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, 148, W - 96, 130);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, 148, 6, 130);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Focal clonic seizures from day 2. EEG: burst-suppression pattern. Birth uncomplicated (SVD 39 wks, APGAR 8/9). Examination: axial hypotonia, poor feeding, subtle dysmorphism (broad nasal bridge, thin upper lip). Metabolic workup: normal. MRI brain: no structural abnormality. CMA: normal.", 68, 172, W - 140, 24);

  let y = 300;
  // Key clinical clues
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.subheading;
  ctx.fillText("Key Clinical Clues", 48, y);
  y += 28;

  setFont(ctx, 15, "normal");
  const clues = [
    "Burst-suppression EEG has a focused genetic differential: KCNQ2, STXBP1, SCN2A, CDKL5, KCNT1.",
    "Normal brain MRI does NOT exclude a genetic cause -- many channelopathies have normal imaging.",
    "Family history: mother has mild postural hand tremor; maternal grandmother died of 'dementia' at age 55.",
  ];
  for (const c of clues) {
    y = bullet(ctx, c, 78, y, W - 140, 26);
    y += 10;
  }

  // Testing decision
  y += 10;
  ctx.fillStyle = CLR.blueLight;
  ctx.fillRect(48, y, W - 96, 90);
  ctx.fillStyle = CLR.blue;
  ctx.fillRect(48, y, 6, 90);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.blue;
  ctx.fillText("Testing Decision: Panel vs. Rapid Trio WES", 68, y + 26);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Trio WES: enables de novo variant detection (PS2 ACMG evidence), covers a broader gene set, 35-50% diagnostic yield in NICU encephalopathy. Median turnaround 7-14 days. Increasingly the first-line test for critically ill neonates.", 68, y + 50, W - 140, 22);

  // FHx clue
  y += 110;
  ctx.fillStyle = CLR.amberLight;
  ctx.fillRect(48, y, W - 96, 50);
  ctx.fillStyle = CLR.amber;
  ctx.fillRect(48, y, 6, 50);
  setFont(ctx, 15, "bold");
  ctx.fillStyle = CLR.amber;
  drawWrapped(ctx, "Do not dismiss family history: mother's tremor + grandmother's dementia could suggest FMR1 premutation (FXTAS) -- a dual genetic finding in one family.", 68, y + 18, W - 140, 22);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 3: Case 1 Diagnosis ───────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Case 1: Diagnosis & Precision Management", 72);
  sectionLabel(ctx, "KCNQ2 Gain-of-Function Epilepsy", 48, 128);

  // Diagnosis box
  ctx.fillStyle = CLR.greenLight;
  ctx.fillRect(48, 148, W - 96, 80);
  ctx.fillStyle = CLR.green;
  ctx.fillRect(48, 148, 6, 80);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.green;
  ctx.fillText("Diagnosis: KCNQ2 c.740C>T, p.Ala247Val (de novo, pathogenic)", 68, 178);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  ctx.fillText("Gain-of-function variant in S4 voltage sensor domain of Kv7.2 potassium channel.", 68, 206);

  // ACMG evidence
  let y = 250;
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.subheading;
  ctx.fillText("ACMG Classification: Pathogenic", 48, y);
  y += 30;

  const acmg = [
    { code: "PS2", desc: "De novo in proband (confirmed by trio)" },
    { code: "PS3", desc: "Functional studies demonstrate gain-of-function" },
    { code: "PM1", desc: "Located in critical S4 voltage sensor domain" },
    { code: "PM2", desc: "Absent from gnomAD population databases" },
    { code: "PP3", desc: "Computational tools predict deleterious effect" },
  ];

  for (const a of acmg) {
    ctx.fillStyle = CLR.accentLight;
    ctx.fillRect(48, y, 80, 32);
    setFont(ctx, 14, "bold");
    ctx.fillStyle = CLR.accentDark;
    ctx.textAlign = "center";
    ctx.fillText(a.code, 88, y + 22);
    ctx.textAlign = "left";
    setFont(ctx, 15, "normal");
    ctx.fillStyle = CLR.body;
    ctx.fillText(a.desc, 148, y + 22);
    y += 40;
  }

  // Treatment
  y += 10;
  ctx.fillStyle = CLR.blueLight;
  ctx.fillRect(48, y, W - 96, 80);
  ctx.fillStyle = CLR.blue;
  ctx.fillRect(48, y, 6, 80);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.blue;
  ctx.fillText("Precision Treatment: Carbamazepine (sodium channel blocker)", 68, y + 28);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Seizures resolved within 48 hours. KCNQ2 gain-of-function responds to Na+ channel blockers -- this is OPPOSITE to loss-of-function KCNQ2. Understanding mechanism = precision therapy.", 68, y + 52, W - 140, 22);

  // Dual diagnosis
  y += 100;
  ctx.fillStyle = CLR.purpleLight;
  ctx.fillRect(48, y, W - 96, 70);
  ctx.fillStyle = CLR.purple;
  ctx.fillRect(48, y, 6, 70);
  setFont(ctx, 15, "bold");
  ctx.fillStyle = CLR.purple;
  ctx.fillText("Dual genetic finding: Mother's FMR1 premutation (89 CGG repeats) explains her tremor (FXTAS)", 68, y + 24);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  ctx.fillText("and grandmother's dementia. Dual diagnoses occur in ~5-7% of families under comprehensive evaluation.", 68, y + 50);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 4: Case 2 Presentation ────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Case 2: Progressive Ataxia -- Presentation", 72);
  sectionLabel(ctx, "Alex -- 14-Year-Old with 18 Months of Gait Unsteadiness", 48, 128);

  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, 148, W - 96, 120);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, 148, 6, 120);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "18-month progressive gait unsteadiness, frequent falls, declining school performance. Exam: broad-based gait ataxia, cerebellar dysarthria, bilateral dysmetria, absent DTRs at knees/ankles, decreased vibration/proprioception in feet, bilateral pes cavus, scoliosis, grade II/VI systolic murmur. MRI: mild cerebellar vermis atrophy. Parents: first cousins (Pakistani origin). Older sibling (17y) developing similar gait difficulties.", 68, 170, W - 140, 22);

  let y = 290;
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.subheading;
  ctx.fillText("The Classic Tetrad of Friedreich Ataxia", 48, y);
  y += 28;

  const tetrad = [
    { feature: "Progressive ataxia with areflexia", detail: "Cerebellar + posterior column signs (absent DTRs paradoxical)" },
    { feature: "Pes cavus + scoliosis", detail: "Musculoskeletal manifestations from denervation" },
    { feature: "Cardiomyopathy", detail: "Systolic murmur suggests hypertrophic CM (leading cause of death)" },
    { feature: "Posterior column sensory loss", detail: "Decreased vibration and proprioception" },
  ];

  for (const t of tetrad) {
    ctx.fillStyle = CLR.accent + "15";
    ctx.fillRect(48, y, W - 96, 50);
    ctx.fillStyle = CLR.accent;
    ctx.fillRect(48, y, 6, 50);
    setFont(ctx, 15, "bold");
    ctx.fillStyle = CLR.accentDark;
    ctx.fillText(t.feature, 68, y + 20);
    setFont(ctx, 14, "normal");
    ctx.fillStyle = CLR.body;
    ctx.fillText(t.detail, 68, y + 40);
    y += 60;
  }

  // Critical testing limitation
  y += 10;
  ctx.fillStyle = CLR.redLight;
  ctx.fillRect(48, y, W - 96, 80);
  ctx.fillStyle = CLR.red;
  ctx.fillRect(48, y, 6, 80);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.red;
  ctx.fillText("CRITICAL TESTING LIMITATION", 68, y + 26);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Standard WES using short-read technology CANNOT reliably detect the GAA trinucleotide repeat expansion in FXN that causes 96% of Friedreich ataxia. Dedicated repeat expansion testing (RP-PCR) must be ordered separately.", 68, y + 50, W - 140, 22);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 5: Case 2 Diagnosis ───────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Case 2: Diagnosis & Management", 72);
  sectionLabel(ctx, "Friedreich Ataxia -- FXN GAA Repeat Expansion", 48, 128);

  // Testing journey
  ctx.fillStyle = CLR.redLight;
  ctx.fillRect(48, 148, (W - 112) / 2, 80);
  ctx.fillStyle = CLR.red;
  ctx.fillRect(48, 148, 6, 80);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.red;
  ctx.fillText("WES: NEGATIVE", 68, 178);
  setFont(ctx, 14, "normal");
  ctx.fillStyle = CLR.body;
  ctx.fillText("No pathogenic variants found. Cannot", 68, 200);
  ctx.fillText("detect repeat expansions.", 68, 218);

  ctx.fillStyle = CLR.greenLight;
  ctx.fillRect(48 + (W - 112) / 2 + 16, 148, (W - 112) / 2, 80);
  ctx.fillStyle = CLR.green;
  ctx.fillRect(48 + (W - 112) / 2 + 16, 148, 6, 80);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.green;
  ctx.fillText("FXN GAA RP-PCR: POSITIVE", 68 + (W - 112) / 2 + 16, 178);
  setFont(ctx, 14, "normal");
  ctx.fillStyle = CLR.body;
  ctx.fillText("Homozygous: 850 / 920 repeats", 68 + (W - 112) / 2 + 16, 200);
  ctx.fillText("(normal <33; full mutation >66)", 68 + (W - 112) / 2 + 16, 218);

  let y = 248;
  // Management
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.subheading;
  ctx.fillText("Management Plan", 48, y);
  y += 28;

  const mgmt = [
    { label: "Treatment", text: "Omaveloxolone (Skyclarys) -- first FDA-approved therapy (2023). NRF2 pathway activator; reduces oxidative stress from frataxin deficiency." },
    { label: "Cardiac", text: "Echocardiography: concentric LV hypertrophy (hypertrophic cardiomyopathy). Annual echo + ECG monitoring (leading cause of death)." },
    { label: "Physical therapy", text: "Gait training, balance rehabilitation, scoliosis management." },
    { label: "Genetic counseling", text: "AR inheritance, 25% recurrence. Both parents = obligate carriers of GAA expansion. Consanguinity correctly predicted AR." },
    { label: "Cascade testing", text: "Older sibling confirmed homozygous -- early treatment initiated before significant cardiomyopathy develops." },
  ];

  for (const m of mgmt) {
    ctx.fillStyle = CLR.accentLight;
    ctx.fillRect(48, y, 150, 34);
    setFont(ctx, 14, "bold");
    ctx.fillStyle = CLR.accentDark;
    ctx.fillText(m.label, 58, y + 23);
    setFont(ctx, 14, "normal");
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, m.text, 214, y + 10, W - 280, 22);
    y += 60;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 6: Case 3 Presentation ────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Case 3: CP Mimic -- Presentation", 72);
  sectionLabel(ctx, "Priya -- 5-Year-Old with 'Spastic Diplegic CP'", 48, 128);

  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, 148, W - 96, 110);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, 148, 6, 110);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Diagnosed with spastic diplegic CP at age 2 (motor delay, increased tone, toe-walking). Birth: uncomplicated, term, normal APGARs. Concerns: (1) clearly PROGRESSIVE -- walked with walker at 3, now wheelchair at 5; (2) DIURNAL FLUCTUATION -- better in morning, worse in evening; (3) brain MRI entirely NORMAL; (4) older brother (8y) has mild persistent toe-walking.", 68, 170, W - 140, 22);

  let y = 280;
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.subheading;
  ctx.fillText("Red Flags -- This Is NOT Cerebral Palsy", 48, y);
  y += 28;

  const flags = [
    { flag: "Progressive course", why: "CP is by definition NON-PROGRESSIVE (static brain lesion). Any worsening = reconsider diagnosis." },
    { flag: "Diurnal fluctuation", why: "Better after sleep, worse in evening = hallmark of dopa-responsive dystonia (DRD/Segawa)." },
    { flag: "Normal brain MRI", why: "15-30% of children with CP have normal MRI -- these patients have the highest yield from genetic testing." },
    { flag: "Family history", why: "Brother's toe-walking suggests AD inheritance with variable expressivity -- consistent with GCH1 mutations." },
  ];

  for (const f of flags) {
    ctx.fillStyle = CLR.red + "12";
    ctx.fillRect(48, y, W - 96, 62);
    ctx.fillStyle = CLR.red;
    ctx.fillRect(48, y, 6, 62);
    setFont(ctx, 15, "bold");
    ctx.fillStyle = CLR.red;
    ctx.fillText(f.flag, 68, y + 20);
    setFont(ctx, 14, "normal");
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, f.why, 68, y + 40, W - 140, 20);
    y += 74;
  }

  // Estimated prevalence
  ctx.fillStyle = CLR.amberLight;
  ctx.fillRect(48, y + 10, W - 96, 50);
  ctx.fillStyle = CLR.amber;
  ctx.fillRect(48, y + 10, 6, 50);
  setFont(ctx, 15, "bold");
  ctx.fillStyle = CLR.amber;
  ctx.fillText("~20-30% of children with idiopathic CP have an underlying genetic cause. Treatable mimics must not be missed.", 68, y + 42);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 7: Case 3 Diagnosis ───────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Case 3: Diagnosis -- Dopa-Responsive Dystonia", 72);
  sectionLabel(ctx, "GCH1 c.607G>A, p.Val203Ile -- Pathogenic", 48, 128);

  // Dramatic response box
  ctx.fillStyle = CLR.greenLight;
  ctx.fillRect(48, 148, W - 96, 90);
  ctx.fillStyle = CLR.green;
  ctx.fillRect(48, 148, 6, 90);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.green;
  ctx.fillText("Dramatic Response to Levodopa/Carbidopa (1 mg/kg/day)", 68, 178);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  ctx.fillText("2 weeks: marked improvement in tone and motor function.", 68, 204);
  ctx.fillText("1 month: walking independently for the first time in over a year -- transformative outcome.", 68, 226);

  let y = 258;
  // ACMG evidence
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.subheading;
  ctx.fillText("ACMG Classification: Pathogenic", 48, y);
  y += 30;

  const acmg = [
    { code: "PS3", desc: "In vitro functional studies: significantly reduced GTP cyclohydrolase 1 activity" },
    { code: "PS4", desc: "Reported in multiple unrelated DRD families in the literature" },
    { code: "PM2", desc: "Absent from gnomAD population database" },
    { code: "PP1", desc: "Segregates with disease (present in affected brother)" },
    { code: "PP3", desc: "Computational tools uniformly predict deleterious effect" },
  ];

  for (const a of acmg) {
    ctx.fillStyle = CLR.accentLight;
    ctx.fillRect(48, y, 80, 30);
    setFont(ctx, 14, "bold");
    ctx.fillStyle = CLR.accentDark;
    ctx.textAlign = "center";
    ctx.fillText(a.code, 88, y + 21);
    ctx.textAlign = "left";
    setFont(ctx, 14, "normal");
    ctx.fillStyle = CLR.body;
    ctx.fillText(a.desc, 148, y + 21);
    y += 38;
  }

  // Mechanism
  y += 10;
  ctx.fillStyle = CLR.blueLight;
  ctx.fillRect(48, y, W - 96, 80);
  ctx.fillStyle = CLR.blue;
  ctx.fillRect(48, y, 6, 80);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.blue;
  ctx.fillText("Mechanism: GTP Cyclohydrolase 1 -> Tetrahydrobiopterin (BH4) -> Dopamine", 68, y + 28);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "GCH1 is the rate-limiting enzyme in BH4 synthesis. BH4 deficiency leads to reduced dopamine in basal ganglia. Levodopa bypasses the defect -- response is dramatic, sustained, and lifelong.", 68, y + 52, W - 140, 22);

  // Clinical pearl
  y += 100;
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, y, W - 96, 50);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, y, 6, 50);
  setFont(ctx, 15, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("AD with incomplete penetrance (especially males). Therapeutic L-dopa trial should NOT wait for genetic confirmation.", 68, y + 32);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 8: Cross-Case Lessons ─────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Cross-Case Teaching Points", 72);
  sectionLabel(ctx, "Summary", 48, 128);

  const lessons = [
    {
      n: "1", color: CLR.accent, bg: CLR.accentLight,
      head: "Trio WES is first-line in NICU encephalopathy",
      body: "35-50% yield, enables de novo detection (PS2). Median 7-14 day turnaround. Covers broader gene set than panels.",
    },
    {
      n: "2", color: CLR.red, bg: CLR.redLight,
      head: "WES cannot detect repeat expansions",
      body: "Friedreich (GAA), Fragile X (CGG), SCAs, DM1/DM2, HD -- all require dedicated RP-PCR or long-read sequencing.",
    },
    {
      n: "3", color: CLR.green, bg: CLR.greenLight,
      head: "Precision treatment = mechanism-based therapy",
      body: "KCNQ2 GoF -> carbamazepine. GCH1/DRD -> levodopa. Understanding gain-of-function vs. loss-of-function is essential.",
    },
    {
      n: "4", color: CLR.blue, bg: CLR.blueLight,
      head: "Progressive CP = not CP until proven otherwise",
      body: "20-30% of 'idiopathic CP' has a genetic cause. Diurnal fluctuation + normal MRI = think DRD. A levodopa trial can be transformative.",
    },
    {
      n: "5", color: CLR.purple, bg: CLR.purpleLight,
      head: "Always investigate family history clues",
      body: "Dual genetic diagnoses occur in ~5-7% of families. A mother's tremor and grandmother's dementia led to FMR1 premutation discovery.",
    },
  ];

  let y = 156;
  for (const pt of lessons) {
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

    setFont(ctx, 17, "bold");
    ctx.fillStyle = CLR.subheading;
    ctx.fillText(pt.head, 116, y + 28);

    setFont(ctx, 15, "normal");
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, pt.body, 116, y + 56, W - 190, 24);

    y += 122;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Write manifest ─────────────────────────────────────────────────────────────
const manifest = {
  moduleId: "virtual-cases",
  count: TOTAL,
  format: "jpg",
  generatedAt: new Date().toISOString(),
};
fs.writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\nDone -- ${TOTAL} slides -> public/slides/virtual-cases/`);
