/**
 * scripts/generate-neuronal-signaling-slides.mjs
 *
 * Generates slide images for the "Neuronal Signaling & Synaptic Transmission" module.
 *
 * Run: node scripts/generate-neuronal-signaling-slides.mjs
 */

import { createCanvas } from "@napi-rs/canvas";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "slides", "neuronal-signaling");
fs.mkdirSync(OUT_DIR, { recursive: true });

const W = 1540;
const H = 1188;

const CLR = {
  bg: "#ffffff",
  surface: "#f8f9fa",
  border: "#e2e8f0",
  accent: "#06b6d4",       // cyan-500
  accentLight: "#ecfeff",  // cyan-50
  accentDark: "#155e75",   // cyan-800
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
  tableHeader: "#164e63",
  tableRow1: "#ffffff",
  tableRow2: "#ecfeff",
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
  ctx.fillText("Neuronal Signaling & Synaptic Transmission", 48, H - 30);
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
  ctx.fillText("Neuronal Signaling &", 80, 230);
  ctx.fillText("Synaptic Transmission", 80, 290);

  ctx.fillStyle = CLR.accent;
  ctx.fillRect(80, 318, 540, 5);

  setFont(ctx, 24, "normal");
  ctx.fillStyle = CLR.muted;
  ctx.fillText("The Cellular Basis of Nervous System Function", 80, 365);

  setFont(ctx, 18, "normal");
  ctx.fillStyle = CLR.mutedLight;
  ctx.fillText("Action potentials, ion channels, synaptic transmission, neurotransmitter systems", 80, 405);

  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(W - 420, 120, 360, 240);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(W - 420, 120, 6, 240);

  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("5 Sections  --  5 Quiz Questions", W - 390, 170);
  setFont(ctx, 15, "normal");
  const topics = [
    "The Neuron: Structure & Compartments",
    "The Resting Membrane Potential",
    "The Action Potential",
    "Synaptic Transmission",
    "Major Neurotransmitter Systems",
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

// ── Slide 2: Neuron Structure ───────────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "The Neuron: Structure & Functional Compartments", 72);
  sectionLabel(ctx, "Section 1 of 5", 48, 128);

  setFont(ctx, 16, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "The neuron is the fundamental signaling unit, specialized for receiving, integrating, and transmitting electrochemical information.", 48, 165, W - 96, 26);

  const parts = [
    {
      name: "Soma (Cell Body)",
      desc: "Contains the nucleus and most organelles; primary site of protein synthesis and metabolic activity.",
      color: CLR.accent, bg: CLR.accentLight,
    },
    {
      name: "Dendrites",
      desc: "Highly branched extensions that receive synaptic inputs; dendritic spines dramatically increase surface area for connections.",
      color: CLR.green, bg: CLR.greenLight,
    },
    {
      name: "Axon",
      desc: "Single elongated process that conducts output signals (action potentials) away from the soma toward synaptic terminals.",
      color: CLR.blue, bg: CLR.blueLight,
    },
    {
      name: "Myelin Sheath",
      desc: "Lipid-rich insulation produced by oligodendrocytes (CNS) or Schwann cells (PNS); enables rapid saltatory conduction at nodes of Ranvier.",
      color: CLR.amber, bg: CLR.amberLight,
    },
  ];

  let y = 215;
  for (const p of parts) {
    ctx.fillStyle = p.bg;
    ctx.fillRect(48, y, W - 96, 80);
    ctx.fillStyle = p.color;
    ctx.fillRect(48, y, 8, 80);

    setFont(ctx, 17, "bold");
    ctx.fillStyle = CLR.subheading;
    ctx.fillText(p.name, 72, y + 28);
    setFont(ctx, 15, "normal");
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, p.desc, 72, y + 52, W - 150, 22);
    y += 96;
  }

  // Signal flow
  ctx.fillStyle = CLR.surface;
  ctx.fillRect(48, y + 10, W - 96, 50);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, y + 10, 6, 50);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Signal Flow:  Dendrites (input) --> Soma (integration) --> Axon (output) --> Synaptic Terminal", 68, y + 42);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 3: Resting Membrane Potential ─────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "The Resting Membrane Potential", 72);
  sectionLabel(ctx, "Section 2 of 5", 48, 128);

  setFont(ctx, 16, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "At rest, neurons maintain ~-70 mV across their membrane (inside negative). This arises from unequal ion distribution and selective membrane permeability.", 48, 165, W - 96, 26);

  // Ion distribution table
  const headers = ["Ion", "Intracellular", "Extracellular", "Direction of Gradient"];
  const rows = [
    ["Na+", "Low (~15 mM)", "High (~145 mM)", "Inward (into cell)"],
    ["K+", "High (~150 mM)", "Low (~5 mM)", "Outward (out of cell)"],
    ["Cl-", "Low (~10 mM)", "High (~120 mM)", "Inward (into cell)"],
    ["Organic anions", "High (proteins)", "Low", "N/A (too large to cross)"],
  ];
  drawTable(ctx, headers, rows, 48, 230, [200, 230, 230, 300], 50);

  let y = 445;
  // Key mechanisms
  const mechs = [
    "Na+/K+-ATPase: pumps 3 Na+ out and 2 K+ in per ATP -- maintains ion gradients.",
    "At rest, membrane permeability is dominated by K+ leak channels; K+ efflux makes interior negative.",
    "Nernst equation: calculates equilibrium potential for a single ion species.",
    "Goldman equation: integrates all ion permeabilities to predict the membrane potential.",
  ];

  setFont(ctx, 15, "normal");
  for (const m of mechs) {
    y = bullet(ctx, m, 78, y, W - 140, 26);
    y += 8;
  }

  // Highlight box
  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, y + 10, W - 96, 50);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, y + 10, 6, 50);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Key Concept: The resting potential is primarily set by K+ permeability (close to E_K = -90 mV).", 68, y + 42);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 4: The Action Potential ───────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "The Action Potential", 72);
  sectionLabel(ctx, "Section 3 of 5", 48, 128);

  setFont(ctx, 16, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "A rapid, all-or-none reversal of membrane potential that propagates along the axon. Triggered when depolarization reaches threshold (~-55 mV).", 48, 165, W - 96, 26);

  // Phases
  const phases = [
    {
      phase: "1. Depolarization",
      desc: "Voltage-gated Na+ channels open rapidly. Na+ rushes in. Membrane surges to ~+40 mV.",
      color: CLR.red,
    },
    {
      phase: "2. Repolarization",
      desc: "Na+ channels inactivate. Delayed K+ channels open. K+ flows out. Potential falls back toward rest.",
      color: CLR.accent,
    },
    {
      phase: "3. Hyperpolarization",
      desc: "K+ channels close slowly, briefly driving membrane below -70 mV (undershoot).",
      color: CLR.blue,
    },
    {
      phase: "4. Refractory Period",
      desc: "Absolute: Na+ channels inactivated, no AP possible. Relative: threshold elevated. Ensures unidirectional propagation.",
      color: CLR.amber,
    },
  ];

  let y = 225;
  for (const p of phases) {
    ctx.fillStyle = p.color + "15";
    ctx.fillRect(48, y, W - 96, 75);
    ctx.fillStyle = p.color;
    ctx.fillRect(48, y, 8, 75);

    setFont(ctx, 16, "bold");
    ctx.fillStyle = p.color;
    ctx.fillText(p.phase, 72, y + 24);
    setFont(ctx, 15, "normal");
    ctx.fillStyle = CLR.body;
    drawWrapped(ctx, p.desc, 72, y + 48, W - 150, 22);
    y += 90;
  }

  // Channelopathies highlight
  ctx.fillStyle = CLR.redLight;
  ctx.fillRect(48, y + 10, W - 96, 80);
  ctx.fillStyle = CLR.red;
  ctx.fillRect(48, y + 10, 6, 80);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.red;
  ctx.fillText("Clinical Relevance: Channelopathies", 68, y + 36);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Mutations in voltage-gated Na+ channels (SCN1A, SCN2A, SCN8A) and K+ channels (KCNQ2, KCNA1) cause epilepsy, episodic ataxia, and other neurological disorders. Understanding channel function guides precision treatment.", 68, y + 58, W - 140, 22);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 5: Synaptic Transmission ──────────────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Synaptic Transmission", 72);
  sectionLabel(ctx, "Section 4 of 5", 48, 128);

  setFont(ctx, 16, "normal");
  ctx.fillStyle = CLR.body;
  drawWrapped(ctx, "Chemical synapses convert electrical signals to chemical signals and back. This involves precise molecular machinery at both pre- and postsynaptic membranes.", 48, 165, W - 96, 26);

  // Step-by-step flow
  const steps = [
    { num: "1", text: "AP arrives at axon terminal", detail: "Depolarization opens voltage-gated Ca2+ channels." },
    { num: "2", text: "Ca2+ influx triggers vesicle fusion", detail: "SNARE proteins mediate exocytosis of neurotransmitter-containing vesicles." },
    { num: "3", text: "Neurotransmitter crosses cleft", detail: "Diffuses across ~20 nm synaptic cleft to postsynaptic membrane." },
    { num: "4", text: "Receptor binding", detail: "Ionotropic (fast, ms): ligand-gated ion channels. Metabotropic (slow): G-protein coupled receptors." },
    { num: "5", text: "Signal termination", detail: "Reuptake, enzymatic degradation, or diffusion removes neurotransmitter from the cleft." },
  ];

  let y = 228;
  for (const s of steps) {
    ctx.fillStyle = CLR.accent;
    ctx.beginPath(); ctx.arc(72, y + 16, 18, 0, Math.PI * 2); ctx.fill();
    setFont(ctx, 18, "bold");
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(s.num, 72, y + 23);
    ctx.textAlign = "left";

    setFont(ctx, 16, "bold");
    ctx.fillStyle = CLR.subheading;
    ctx.fillText(s.text, 104, y + 12);
    setFont(ctx, 15, "normal");
    ctx.fillStyle = CLR.body;
    ctx.fillText(s.detail, 104, y + 36);
    y += 58;
  }

  // Receptor types comparison
  y += 10;
  const halfW = (W - 112) / 2;

  ctx.fillStyle = CLR.accentLight;
  ctx.fillRect(48, y, halfW, 100);
  ctx.fillStyle = CLR.accent;
  ctx.fillRect(48, y, 6, 100);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.accentDark;
  ctx.fillText("Ionotropic Receptors (fast)", 68, y + 26);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  ctx.fillText("Ligand-gated ion channels", 68, y + 50);
  ctx.fillText("Millisecond timescale", 68, y + 72);
  ctx.fillText("Examples: AMPA, NMDA, GABA-A, nAChR", 68, y + 94);

  ctx.fillStyle = CLR.purpleLight;
  ctx.fillRect(48 + halfW + 16, y, halfW, 100);
  ctx.fillStyle = CLR.purple;
  ctx.fillRect(48 + halfW + 16, y, 6, 100);
  setFont(ctx, 16, "bold");
  ctx.fillStyle = CLR.purple;
  ctx.fillText("Metabotropic Receptors (slow)", 68 + halfW + 16, y + 26);
  setFont(ctx, 15, "normal");
  ctx.fillStyle = CLR.body;
  ctx.fillText("G-protein coupled", 68 + halfW + 16, y + 50);
  ctx.fillText("Seconds to minutes", 68 + halfW + 16, y + 72);
  ctx.fillText("Examples: mGluR, GABA-B, muscarinic", 68 + halfW + 16, y + 94);

  drawFooter(ctx, slideNum, TOTAL);
  saveSlide(canvas, slideNum);
}

// ── Slide 6: Major Neurotransmitter Systems ─────────────────────────────────
{
  slideNum++;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  drawBackground(ctx);
  drawAccentBar(ctx);

  slideTitle(ctx, "Major Neurotransmitter Systems", 72);
  sectionLabel(ctx, "Section 5 of 5", 48, 128);

  const nts = [
    {
      name: "Glutamate",
      type: "Excitatory (primary)",
      receptors: "AMPA (fast), NMDA (plasticity/memory)",
      clinical: "Excess -> excitotoxicity; NMDA receptor encephalitis",
      color: CLR.red,
    },
    {
      name: "GABA",
      type: "Inhibitory (primary)",
      receptors: "GABA-A (Cl- channel, fast), GABA-B (metabotropic)",
      clinical: "Target of benzodiazepines, barbiturates; GABA-A mutations -> epilepsy",
      color: CLR.blue,
    },
    {
      name: "Dopamine",
      type: "Modulatory",
      receptors: "D1-D5 (all metabotropic)",
      clinical: "SN degeneration -> Parkinson; excess -> psychosis; reward circuits",
      color: CLR.green,
    },
    {
      name: "Serotonin (5-HT)",
      type: "Modulatory",
      receptors: "14+ subtypes (mostly metabotropic)",
      clinical: "Mood, sleep, appetite; SSRIs are first-line antidepressants",
      color: CLR.purple,
    },
    {
      name: "Acetylcholine",
      type: "Excitatory (NMJ & CNS)",
      receptors: "Nicotinic (ionotropic), Muscarinic (metabotropic)",
      clinical: "NMJ disorders (myasthenia gravis); cholinesterase inhibitors for AD",
      color: CLR.amber,
    },
  ];

  let y = 160;
  for (const nt of nts) {
    ctx.fillStyle = nt.color + "12";
    ctx.fillRect(48, y, W - 96, 100);
    ctx.fillStyle = nt.color;
    ctx.fillRect(48, y, 8, 100);

    setFont(ctx, 18, "bold");
    ctx.fillStyle = CLR.subheading;
    ctx.fillText(nt.name, 72, y + 24);
    setFont(ctx, 14, "bold");
    ctx.fillStyle = nt.color;
    ctx.fillText(nt.type, 280, y + 24);

    setFont(ctx, 14, "normal");
    ctx.fillStyle = CLR.body;
    ctx.fillText("Receptors: " + nt.receptors, 72, y + 50);
    ctx.fillText("Clinical: " + nt.clinical, 72, y + 74);

    y += 112;
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
      head: "Neurons are specialized signaling cells",
      body: "Dendrites receive, soma integrates, axon transmits, myelin accelerates. Each compartment has distinct molecular machinery.",
    },
    {
      n: "2", color: CLR.blue, bg: CLR.blueLight,
      head: "Resting potential depends on K+ leak channels",
      body: "~-70 mV maintained by Na+/K+-ATPase and selective K+ permeability. The Goldman equation predicts membrane potential from all ion permeabilities.",
    },
    {
      n: "3", color: CLR.red, bg: CLR.redLight,
      head: "Action potentials are all-or-none",
      body: "Na+ influx (depolarization) -> Na+ inactivation + K+ efflux (repolarization) -> refractory period. Channelopathies (SCN1A, KCNQ2) cause epilepsy.",
    },
    {
      n: "4", color: CLR.green, bg: CLR.greenLight,
      head: "Ca2+ triggers neurotransmitter release",
      body: "AP -> Ca2+ entry -> SNARE-mediated vesicle fusion -> transmitter crosses cleft -> binds ionotropic or metabotropic receptors.",
    },
    {
      n: "5", color: CLR.purple, bg: CLR.purpleLight,
      head: "Glutamate excites, GABA inhibits",
      body: "These two amino acid transmitters account for >90% of CNS synapses. Dopamine, serotonin, and ACh are key modulatory systems with major clinical relevance.",
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
  moduleId: "neuronal-signaling",
  count: TOTAL,
  format: "jpg",
  generatedAt: new Date().toISOString(),
};
fs.writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\nDone -- ${TOTAL} slides -> public/slides/neuronal-signaling/`);
