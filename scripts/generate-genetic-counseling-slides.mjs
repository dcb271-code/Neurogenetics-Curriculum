/**
 * scripts/generate-genetic-counseling-slides.mjs
 *
 * Generates slide images for the "Genetic Counseling & Ethics" module.
 *
 * Run: node scripts/generate-genetic-counseling-slides.mjs
 */

import { createCanvas } from "@napi-rs/canvas";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "slides", "genetic-counseling");
fs.mkdirSync(OUT_DIR, { recursive: true });

const W = 1540;
const H = 1188;

const CLR = {
  bg: "#ffffff",
  surface: "#f8f9fa",
  border: "#e2e8f0",
  accent: "#6366f1",       // indigo-500
  accentLight: "#eef2ff",  // indigo-50
  accentDark: "#3730a3",   // indigo-800
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
  tableHeader: "#312e81",
  tableRow1: "#ffffff",
  tableRow2: "#eef2ff",
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
  ctx.fillText("Genetic Counseling & Ethics in Neurogenetics", 48, H - 30);
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
  ctx.fillText("Genetic Counseling &", 80, 230);
  ctx.fillText("Ethics in Neurogenetics", 80, 286);

  ctx.fillStyle = CLR.accent;
  ctx.fillRect(80, 314, 540, 5);

  setFont(ctx, 24, "normal");
  ctx.fillStyle = CLR.muted;
  ctx.fillText("Principles, Process, and Emerging Challenges", 80, 360);

  setFont(ctx, 18, "normal");
  ctx.fillStyle = CLR.mutedLight;
  ctx.fillText("Counseling process, predictive testing, pediatric testing, reproductive options, ethics", 80, 400);

  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(W - 420, 120, 360, 260);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(W - 420, 120, 6, 260);

  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("5 Sections  --  7 Quiz Questions", W - 390, 170);
  setFont(ctx, 15, "normal");
  const topics = [
    "The Genetic Counseling Process",
    "Predictive & Presymptomatic Testing",
    "Pediatric Testing Considerations",
    "Reproductive Options & Family Planning",
    "Ethical Frameworks & Emerging Challenges",
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

// ── Slide 2: The Counseling Process ─────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "The Genetic Counseling Process", 72);
  sectionLabel(ctx, "Section 1 of 5", 48, 128);

  // Pre-test counseling
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, 150, W - 96, 150);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, 150, 6, 150);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Pre-Test Counseling", 68, 178);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  const preTest = [
    "Three-generation pedigree: identify inheritance patterns, consanguinity, ethnic background",
    "Risk assessment: integrate pedigree + clinical presentation",
    "Test selection: which assay is most appropriate (panel, WES, WGS, repeat testing)?",
    "Discuss possible outcomes: diagnosis, VUS, incidental findings, non-paternity",
  ];
  let pY = 200;
  for (const p of preTest) {
    ctx.fillStyle = CLR.accent;
    ctx.beginPath(); ctx.arc(82, pY - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    ctx.fillText(p, 94, pY);
    pY += 24;
  }

  // Informed consent
  let y = 320;
  ctx.fillStyle = CLR.amberLight;
  ctx.fillRect(48, y, W - 96, 100);
  ctx.fillStyle = CLR.amber;
  ctx.fillRect(48, y, 6, 100);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.amber;
  ctx.fillText("Informed Consent Must Address:", 68, y + 26);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  const consent = [
    "Purpose of testing and types of results (diagnostic, VUS, incidental)",
    "Test limitations (sensitivity, conditions not covered)",
    "Implications for family members; insurance/psychosocial consequences; right to decline",
  ];
  let cY = y + 50;
  for (const c of consent) {
    ctx.fillStyle = CLR.amber;
    ctx.beginPath(); ctx.arc(82, cY - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    ctx.fillText(c, 94, cY);
    cY += 24;
  }

  // Post-test counseling
  y += 120;
  ctx.fillStyle = CLR.greenLight;
  ctx.fillRect(48, y, W - 96, 100);
  ctx.fillStyle = CLR.green;
  ctx.fillRect(48, y, 6, 100);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.green;
  ctx.fillText("Post-Test Counseling", 68, y + 26);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  const postTest = [
    "Result disclosure in a supportive setting; interpretation in phenotype context",
    "Psychosocial support (referral to mental health when needed)",
    "For uninformative results: residual risk discussion and future re-analysis plan",
  ];
  cY = y + 50;
  for (const c of postTest) {
    ctx.fillStyle = CLR.green;
    ctx.beginPath(); ctx.arc(82, cY - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    ctx.fillText(c, 94, cY);
    cY += 24;
  }

  // Core principle
  y += 120;
  ctx.fillStyle = CLR.surface;
  ctx.fillRect(48, y, W - 96, 50);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, y, 6, 50);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Core Principle: Non-directiveness -- provide balanced information, support autonomous decision-making.", 68, y + 32);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 3: Predictive & Presymptomatic Testing ────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Predictive & Presymptomatic Testing", 72);
  sectionLabel(ctx, "Section 2 of 5 -- The Huntington Disease Paradigm", 48, 128);

  setFont(ctx, 16, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Predictive testing identifies healthy individuals who carry a pathogenic variant that will or may cause disease in the future. Profound psychological, social, and legal implications require rigorous counseling.", 48, 160, W - 96, 24);

  // HD protocol
  let y = 230;
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, y, W - 96, 150);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, y, 6, 150);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("International HD Predictive Testing Protocol Requirements:", 68, y + 28);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  const hdReqs = [
    "Minimum 2 pre-test counseling sessions with a cooling-off period between them",
    "Psychological assessment to screen for depression and suicidality",
    "Identified support person throughout the process",
    "No testing of minors unless childhood intervention exists",
    "Results never disclosed by telephone or to third parties without explicit consent",
  ];
  let hY = y + 52;
  for (const h of hdReqs) {
    ctx.fillStyle = CLR.accent;
    ctx.beginPath(); ctx.arc(82, hY - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    ctx.fillText(h, 94, hY);
    hY += 24;
  }

  // Right not to know
  y += 170;
  ctx.fillStyle = CLR.purpleLight;
  ctx.fillRect(48, y, W - 96, 70);
  ctx.fillStyle = CLR.purple;
  ctx.fillRect(48, y, 6, 70);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.purple;
  ctx.fillText("The Right Not to Know", 68, y + 24);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "At-risk individuals are never obligated to undergo testing. Testing a grandchild can inadvertently reveal the status of an intervening parent who chose NOT to know.", 68, y + 48, W - 140, 22);

  // GINA
  y += 90;
  ctx.fillStyle = CLR.redLight;
  ctx.fillRect(48, y, W - 96, 90);
  ctx.fillStyle = CLR.red;
  ctx.fillRect(48, y, 6, 90);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.red;
  ctx.fillText("GINA (2008): Critical Insurance Gap", 68, y + 26);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "GINA prohibits discrimination by health insurers and employers based on genetic information. But GINA does NOT protect against discrimination in life, disability, or long-term care insurance. A positive predictive test can legally be used to deny life insurance. Patients must be counseled about this gap BEFORE testing.", 68, y + 50, W - 140, 22);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 4: Pediatric Testing ──────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Pediatric Genetic Testing Considerations", 72);
  sectionLabel(ctx, "Section 3 of 5 -- Balancing Benefit vs. Future Autonomy", 48, 128);

  // Test when actionable
  let y = 155;
  ctx.fillStyle = CLR.greenLight;
  ctx.fillRect(48, y, W - 96, 130);
  ctx.fillStyle = CLR.green;
  ctx.fillRect(48, y, 6, 130);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.green;
  ctx.fillText("Test When Results Lead to Childhood Intervention", 68, y + 26);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  const testYes = [
    "TSC: identification triggers surveillance (brain MRI, renal US, echo, ophthalmology)",
    "SMA: disease-modifying therapy (nusinersen, gene therapy, risdiplam) is dramatically more effective presymptomatically",
    "SMA added to US RUSP in 2018; all 50 states now screen in newborns",
  ];
  let tY = y + 52;
  for (const t of testYes) {
    ctx.fillStyle = CLR.green;
    ctx.beginPath(); ctx.arc(82, tY - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    setFont(ctx, 14, "normal");
    drawWrapped(ctx, t, 94, tY, W - 160, 22);
    tY += 32;
  }

  // Do not test
  y += 150;
  ctx.fillStyle = CLR.redLight;
  ctx.fillRect(48, y, W - 96, 100);
  ctx.fillStyle = CLR.red;
  ctx.fillRect(48, y, 6, 100);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.red;
  ctx.fillText("Defer When No Childhood Actionability (ACMG/AAP Guidelines)", 68, y + 26);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Example: Huntington disease in a child -- testing removes the child's future right to decide. Defer predictive testing for adult-onset conditions until the individual can provide informed consent (~18 years). Exceptions: mature minor with demonstrated understanding.", 68, y + 52, W - 140, 22);

  // Genome-wide NBS
  y += 120;
  ctx.fillStyle = CLR.amberLight;
  ctx.fillRect(48, y, W - 96, 130);
  ctx.fillStyle = CLR.amber;
  ctx.fillRect(48, y, 6, 130);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.amber;
  ctx.fillText("Genome-Wide Newborn Screening: Emerging Frontier", 68, y + 26);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Pilot programs (BabySeq, Guardian, UK Newborn Genomes Programme) can detect hundreds of treatable conditions. Concerns include:", 68, y + 50, W - 140, 22);
  const concerns = [
    "Large numbers of VUS causing parental anxiety",
    "Identification of adult-onset conditions (violates future autonomy)",
    "'Patient-in-waiting' phenomenon -- healthy child treated as pre-symptomatic",
  ];
  tY = y + 88;
  for (const c of concerns) {
    ctx.fillStyle = CLR.amber;
    ctx.beginPath(); ctx.arc(82, tY - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    ctx.fillText(c, 94, tY);
    tY += 22;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 5: Reproductive Options ───────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Reproductive Options & Family Planning", 72);
  sectionLabel(ctx, "Section 4 of 5", 48, 128);

  const headers = ["Option", "When Used", "Key Details"];
  const rows = [
    ["Carrier screening", "Before or during pregnancy", "ACOG: pan-ethnic expanded panels (100-400+ genes)"],
    ["CVS", "10-13 weeks gestation", "Definitive genetic diagnosis; ~0.1-0.3% miscarriage risk"],
    ["Amniocentesis", "15-20 weeks gestation", "Definitive genetic diagnosis; ~0.1-0.3% miscarriage risk"],
    ["PGT-M with IVF", "Before pregnancy", "Embryo biopsy at blastocyst; only unaffected transferred"],
    ["NIPS (cfDNA)", "From ~10 weeks", "Screening (not diagnostic); high accuracy for T21/18/13"],
    ["Donor gametes", "When a parent carries variant", "Egg or sperm from unaffected donor"],
    ["Adoption", "Alternative family building", "Eliminates genetic transmission entirely"],
  ];
  drawTable(ctx, headers, rows, 48, 150, [200, 260, 480], 50);

  let y = 510;
  // PGT-M highlight
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, y, W - 96, 80);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, y, 6, 80);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("PGT-M: Available for Virtually Any Known Pathogenic Variant", 68, y + 26);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Requires custom probe development (4-6 weeks). Avoids prenatal diagnosis + termination decisions. Available for HD, SMA, TSC, SCN1A epilepsies, and many other neurogenetic conditions.", 68, y + 50, W - 140, 22);

  // NIPS caveat
  y += 100;
  ctx.fillStyle = CLR.redLight;
  ctx.fillRect(48, y, W - 96, 60);
  ctx.fillStyle = CLR.red;
  ctx.fillRect(48, y, 6, 60);
  setFont(ctx, 15, "bold");
  ctx.fillStyle = CLR.red;
  drawWrapped(ctx, "NIPS for rare microdeletions (e.g., 22q11.2) has a HIGH false positive rate due to low positive predictive value. A positive NIPS result ALWAYS requires confirmatory diagnostic testing before clinical action.", 68, y + 16, W - 140, 22);

  // Autonomy
  y += 78;
  setFont(ctx, 15, "bold");
  ctx.fillStyle = CLR.accent;
  ctx.fillText("Reproductive autonomy is a cornerstone principle. Disability rights perspectives must be respected. Non-directive counseling always.", 48, y);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 6: Ethics & Emerging Challenges ───────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Ethical Frameworks & Emerging Challenges", 72);
  sectionLabel(ctx, "Section 5 of 5", 48, 128);

  const issues = [
    {
      name: "Duty to Recontact",
      desc: "When VUS reclassified to pathogenic, should labs/clinicians recontact? Ethically supported but not universally mandated. Best practice: systematic re-analysis workflows + upfront patient communication.",
      color: CLR.accent, bg: CLR.accentLight,
    },
    {
      name: "Data Sharing (ClinVar, DECIPHER)",
      desc: "Sharing de-identified variant data improves classification accuracy for future patients. Beneficence principle supports contribution. Patient consent should address this.",
      color: CLR.green, bg: CLR.greenLight,
    },
    {
      name: "DTC Genetic Testing",
      desc: "23andMe APOE/BRCA reports screen only selected variants -- negative result does NOT rule out pathogenic variants. Results require clinical-grade confirmation before medical decisions.",
      color: CLR.amber, bg: CLR.amberLight,
    },
    {
      name: "Equity & Access",
      desc: "~6,000 certified genetic counselors in the US (far below need). Minority populations underrepresented in databases -> higher VUS rates. Telegenetics expanding access but disparities persist.",
      color: CLR.red, bg: CLR.redLight,
    },
    {
      name: "Germline Gene Editing",
      desc: "Somatic CRISPR therapy now approved (sickle cell). Germline editing (inheritable) remains ethically contentious and prohibited in most jurisdictions. 2018 He Jiankui affair widely condemned.",
      color: CLR.purple, bg: CLR.purpleLight,
    },
  ];

  let y = 155;
  for (const iss of issues) {
    ctx.fillStyle = iss.bg;
    ctx.fillRect(48, y, W - 96, 90);
    ctx.fillStyle = iss.color;
    ctx.fillRect(48, y, 8, 90);

    setFont(ctx, 16, "bold");
    ctx.fillStyle = CLR.subheading;
    ctx.fillText(iss.name, 72, y + 24);
    setFont(ctx, 14, "normal");
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, iss.desc, 72, y + 46, W - 150, 20);
    y += 104;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 7: GINA & VUS Counseling Quick Reference ─────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Quick Reference: GINA & VUS Counseling", 72);
  sectionLabel(ctx, "Clinical Tools", 48, 128);

  // GINA table
  const headers = ["Insurance Type", "GINA Protection?", "Can Use Genetic Info?"];
  const rows = [
    ["Health insurance", "YES -- protected", "NO -- cannot discriminate"],
    ["Employment", "YES -- protected", "NO -- cannot discriminate"],
    ["Life insurance", "NO -- not protected", "YES -- can legally use results"],
    ["Disability insurance", "NO -- not protected", "YES -- can legally use results"],
    ["Long-term care insurance", "NO -- not protected", "YES -- can legally use results"],
  ];
  drawTable(ctx, headers, rows, 48, 150, [290, 250, 400], 50);

  let y = 420;
  // VUS counseling
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, y, W - 96, 170);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, y, 6, 170);
  setFont(ctx, 17, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("VUS Counseling Framework", 68, y + 28);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  const vusPoints = [
    "A VUS is NOT a diagnosis -- insufficient evidence to classify as pathogenic or benign.",
    "Cannot be used to confirm a clinical diagnosis or guide major treatment decisions.",
    "Recommend family segregation testing (can generate PP1 or PS2 ACMG evidence).",
    "Plan for periodic re-analysis (every 1-2 years) as databases and knowledge grow.",
    "Treatment decisions should be guided by the clinical picture, NOT the VUS.",
    "Clinicians cannot unilaterally reclassify variants without meeting ACMG criteria.",
  ];
  let vY = y + 52;
  for (const v of vusPoints) {
    ctx.fillStyle = CLR.accent;
    ctx.beginPath(); ctx.arc(82, vY - 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CLR.body;
    ctx.fillText(v, 94, vY);
    vY += 24;
  }

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
      head: "Counseling is a structured, non-directive process",
      body: "Pre-test: pedigree, risk assessment, test selection, consent. Post-test: disclosure, psychosocial support, re-analysis planning.",
    },
    {
      n: "2", color: CLR.red, bg: CLR.redLight,
      head: "Predictive testing requires rigorous protocols",
      body: "HD paradigm: 2 counseling sessions, psych assessment, support person. The right not to know is an ethical principle. GINA does NOT cover life insurance.",
    },
    {
      n: "3", color: CLR.green, bg: CLR.greenLight,
      head: "Test children only when results change childhood management",
      body: "TSC surveillance, presymptomatic SMA treatment = test. HD in a 5-year-old = defer to preserve future autonomy.",
    },
    {
      n: "4", color: CLR.amber, bg: CLR.amberLight,
      head: "PGT-M enables genetic selection before pregnancy",
      body: "IVF + embryo biopsy for virtually any known variant. CVS/amnio provide definitive prenatal diagnosis. NIPS is screening only.",
    },
    {
      n: "5", color: CLR.purple, bg: CLR.purpleLight,
      head: "Equity, data sharing, and DTC testing are evolving challenges",
      body: "Genetic counselor shortage + database bias against minorities = diagnostic inequity. DTC tests screen limited variants. Germline editing remains prohibited.",
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

    y += 126;
  }

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Write manifest ─────────────────────────────────────────────────────────────
const manifest = {
  moduleId: "genetic-counseling",
  count: TOTAL,
  format: "jpg",
  generatedAt: new Date().toISOString(),
};
fs.writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\nDone -- ${TOTAL} slides -> public/slides/genetic-counseling/`);
