/**
 * scripts/slide-design-system.mjs
 *
 * Shared design system for generating uniform, READABLE curriculum slides.
 * Priority: large text, generous spacing, minimal content per slide.
 *
 * Target: 1920x1080 (16:9), minimum body text 20px, headings 44px+.
 */

// ── Module Color Palettes ──────────────────────────────────────────────────
export const MODULE_COLORS = {
  "intro-neurogenetics": { accent: "#2563eb", light: "#eff6ff", dark: "#1e40af", name: "Introduction to Neurogenetics" },
  "central-dogma":       { accent: "#3b82f6", light: "#eff6ff", dark: "#1e40af", name: "Central Dogma & Molecular Genetics" },
  "chromosomes-iscn":    { accent: "#0ea5e9", light: "#f0f9ff", dark: "#0369a1", name: "Chromosome Nomenclature (ISCN)" },
  epigenetics:           { accent: "#7c3aed", light: "#f5f3ff", dark: "#5b21b6", name: "Methylation, Imprinting & UPD" },
  mosaicism:             { accent: "#8b5cf6", light: "#f5f3ff", dark: "#6d28d9", name: "Somatic Mosaicism" },
  "variant-interpretation": { accent: "#0d9488", light: "#f0fdfa", dark: "#115e59", name: "Variant Interpretation (ACMG/AMP)" },
  "cnv-interpretation":     { accent: "#14b8a6", light: "#f0fdfa", dark: "#0f766e", name: "CNV Interpretation" },
  "diagnostic-yields":  { accent: "#16a34a", light: "#f0fdf4", dark: "#15803d", name: "Diagnostic Yields" },
  "genetic-counseling":  { accent: "#22c55e", light: "#f0fdf4", dark: "#166534", name: "Genetic Counseling & Ethics" },
  neuroimaging:          { accent: "#059669", light: "#ecfdf5", dark: "#065f46", name: "Neuroimaging Patterns" },
  epilepsy:              { accent: "#d97706", light: "#fffbeb", dark: "#92400e", name: "Epilepsy" },
  "neurodevelopmental-disorders": { accent: "#ea580c", light: "#fff7ed", dark: "#9a3412", name: "Neurodevelopmental Disorders" },
  "virtual-cases":       { accent: "#f59e0b", light: "#fffbeb", dark: "#78350f", name: "Virtual Patient Cases" },
  dystonia:              { accent: "#e11d48", light: "#fff1f2", dark: "#9f1239", name: "Dystonia" },
  "cerebral-palsy":      { accent: "#f43f5e", light: "#fff1f2", dark: "#be123c", name: "Cerebral Palsy" },
  ataxia:                { accent: "#dc2626", light: "#fef2f2", dark: "#991b1b", name: "Ataxia" },
  iem:                   { accent: "#4f46e5", light: "#eef2ff", dark: "#3730a3", name: "IEM: Leukodystrophies" },
  neuromuscular:         { accent: "#6366f1", light: "#eef2ff", dark: "#4338ca", name: "Neuromuscular" },
  mitochondrial:         { accent: "#818cf8", light: "#eef2ff", dark: "#4338ca", name: "Mitochondrial Disease" },
  stroke:                { accent: "#475569", light: "#f8fafc", dark: "#1e293b", name: "Stroke" },
  "dual-diagnosis":      { accent: "#64748b", light: "#f8fafc", dark: "#334155", name: "Dual Diagnoses" },
  pharmacogenetics:      { accent: "#0891b2", light: "#ecfeff", dark: "#155e75", name: "Pharmacogenomics" },
  therapies:             { accent: "#059669", light: "#ecfdf5", dark: "#065f46", name: "Therapies" },
};

export const COLORS = {
  bg: "#ffffff",
  surface: "#f8fafc",
  border: "#e2e8f0",
  heading: "#0f172a",
  subheading: "#1e293b",
  body: "#334155",
  muted: "#64748b",
  mutedLight: "#94a3b8",
  tableHeader: "#1e293b",
  white: "#ffffff",
  green: "#16a34a", greenLight: "#f0fdf4",
  amber: "#d97706", amberLight: "#fffbeb",
  red: "#dc2626",   redLight: "#fef2f2",
  violet: "#7c3aed", violetLight: "#f5f3ff",
  blue: "#3b82f6",   blueLight: "#eff6ff",
  rose: "#e11d48",   roseLight: "#fff1f2",
  teal: "#0d9488",   tealLight: "#f0fdfa",
};

export const SLIDE_W = 1920;
export const SLIDE_H = 1080;

/**
 * Base CSS — LARGE readable text, generous spacing.
 */
export function baseCSS(moduleId) {
  const mc = MODULE_COLORS[moduleId] || MODULE_COLORS["central-dogma"];
  return `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: ${SLIDE_W}px; height: ${SLIDE_H}px;
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      background: #fff; color: ${COLORS.body};
      overflow: hidden; -webkit-font-smoothing: antialiased;
    }
    .slide {
      width: ${SLIDE_W}px; height: ${SLIDE_H}px;
      position: relative;
    }

    /* ── Top bar ── */
    .accent-bar {
      position: absolute; top: 0; left: 0; right: 0;
      height: 8px; background: ${mc.accent};
    }

    /* ── Footer ── */
    .footer {
      position: absolute; bottom: 0; left: 0; right: 0; height: 52px;
      border-top: 1px solid ${COLORS.border};
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 64px; font-size: 16px;
    }
    .footer-module { color: ${mc.accent}; font-weight: 600; }
    .footer-page { color: ${COLORS.mutedLight}; font-weight: 500; }

    /* ── Content area ── */
    .content {
      padding: 56px 72px 72px;
      height: calc(100% - 52px);
    }

    /* ── Typography — LARGE ── */
    h1 {
      font-size: 44px; font-weight: 800; color: ${COLORS.heading};
      line-height: 1.15; margin-bottom: 6px;
    }
    h1::after {
      content: ''; display: block;
      width: 80px; height: 5px; background: ${mc.accent};
      margin-top: 10px; border-radius: 3px;
    }
    .section-label {
      font-size: 15px; color: ${COLORS.muted}; text-transform: uppercase;
      letter-spacing: 2px; margin-bottom: 28px; font-weight: 600;
    }
    h2 {
      font-size: 30px; font-weight: 700; color: ${COLORS.heading};
      margin-bottom: 20px;
    }
    h3 {
      font-size: 22px; font-weight: 600; color: ${COLORS.subheading};
      margin-bottom: 10px;
    }
    p, li {
      font-size: 20px; line-height: 1.6;
    }

    /* ── Cards — generous padding ── */
    .card {
      border-radius: 12px; padding: 24px 28px;
      margin-bottom: 16px; border-left: 6px solid;
    }
    .card-title { font-size: 22px; font-weight: 700; margin-bottom: 8px; }
    .card-body { font-size: 19px; line-height: 1.55; color: ${COLORS.body}; }
    .card-accent { background: ${mc.light}; border-color: ${mc.accent}; }
    .card-accent .card-title { color: ${mc.dark}; }
    .card-green { background: ${COLORS.greenLight}; border-color: ${COLORS.green}; }
    .card-green .card-title { color: #166534; }
    .card-amber { background: ${COLORS.amberLight}; border-color: ${COLORS.amber}; }
    .card-amber .card-title { color: #92400e; }
    .card-red { background: ${COLORS.redLight}; border-color: ${COLORS.red}; }
    .card-red .card-title { color: ${COLORS.red}; }
    .card-violet { background: ${COLORS.violetLight}; border-color: ${COLORS.violet}; }
    .card-violet .card-title { color: ${COLORS.violet}; }
    .card-blue { background: ${COLORS.blueLight}; border-color: ${COLORS.blue}; }
    .card-blue .card-title { color: #1e40af; }
    .card-rose { background: ${COLORS.roseLight}; border-color: ${COLORS.rose}; }
    .card-rose .card-title { color: ${COLORS.rose}; }
    .card-teal { background: ${COLORS.tealLight}; border-color: ${COLORS.teal}; }
    .card-teal .card-title { color: #115e59; }

    /* ── Tables — readable ── */
    table {
      width: 100%; border-collapse: collapse;
      font-size: 18px; margin-bottom: 16px;
      border-radius: 8px; overflow: hidden;
    }
    thead th {
      background: ${COLORS.tableHeader}; color: white;
      padding: 14px 20px; text-align: left;
      font-weight: 600; font-size: 16px; letter-spacing: 0.5px;
    }
    tbody td {
      padding: 14px 20px; border-bottom: 1px solid ${COLORS.border};
      font-size: 17px;
    }
    tbody tr:nth-child(even) { background: #f8fafc; }
    tbody td:first-child { font-weight: 600; color: ${mc.dark}; }

    /* ── Stats row ── */
    .stats-row { display: flex; gap: 16px; margin-bottom: 28px; }
    .stat-card {
      flex: 1; border-radius: 12px; padding: 20px 24px;
      border-top: 5px solid;
    }
    .stat-label {
      font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px;
      color: ${COLORS.muted}; font-weight: 700;
    }
    .stat-value {
      font-size: 26px; font-weight: 800; color: ${COLORS.heading}; margin-top: 6px;
    }

    /* ── Layout ── */
    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
    .three-col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
    .flex-row { display: flex; gap: 20px; }

    /* ── Image panels ── */
    .image-panel {
      border-radius: 12px; overflow: hidden;
      border: 1px solid ${COLORS.border}; background: ${COLORS.surface};
    }
    .image-panel img { width: 100%; height: auto; display: block; }
    .image-caption {
      padding: 10px 16px; font-size: 13px; color: ${COLORS.muted};
      border-top: 1px solid ${COLORS.border};
    }
    .image-credit { font-style: italic; color: ${COLORS.mutedLight}; font-size: 12px; }

    /* ── Numbered items ── */
    .numbered-item {
      display: flex; gap: 18px; align-items: flex-start;
      margin-bottom: 16px;
    }
    .number-circle {
      width: 40px; height: 40px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: 18px; color: white;
      flex-shrink: 0;
    }

    /* ── Bullet list ── */
    .bullet-list { list-style: none; padding: 0; }
    .bullet-list li {
      padding: 8px 0 8px 28px; position: relative;
      font-size: 21px; line-height: 1.5;
    }
    .bullet-list li::before {
      content: ''; position: absolute; left: 0; top: 18px;
      width: 8px; height: 8px; border-radius: 50%;
      background: ${mc.accent};
    }

    /* ── Flow diagram ── */
    .flow-arrow { display: flex; align-items: center; gap: 12px; margin: 20px 0; }
    .flow-box {
      padding: 16px 32px; border-radius: 8px;
      font-weight: 700; font-size: 22px; color: white;
    }
    .flow-connector { font-size: 32px; color: ${COLORS.muted}; }

    /* ── Attribution ── */
    .attribution {
      position: absolute; bottom: 56px; right: 72px;
      font-size: 12px; color: ${COLORS.mutedLight}; font-style: italic;
    }

    /* ── Highlight box ── */
    .highlight-box {
      background: ${mc.light}; border: 2px solid ${mc.accent};
      border-radius: 12px; padding: 24px 28px; margin: 16px 0;
    }
    .highlight-box .label {
      font-size: 14px; font-weight: 700; color: ${mc.accent};
      text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;
    }
    .highlight-box .value {
      font-size: 24px; font-weight: 700; color: ${COLORS.heading};
    }
  `;
}

/**
 * Wrap slide body in standard template (accent bar + footer).
 */
export function slideHTML(moduleId, slideNum, totalSlides, bodyHTML, extraCSS = "") {
  const mc = MODULE_COLORS[moduleId] || MODULE_COLORS["central-dogma"];
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>${baseCSS(moduleId)}${extraCSS}</style>
</head><body>
<div class="slide">
  <div class="accent-bar"></div>
  <div class="content">${bodyHTML}</div>
  <div class="footer">
    <span class="footer-module">${mc.name}</span>
    <span class="footer-page">${slideNum} / ${totalSlides}</span>
  </div>
</div>
</body></html>`;
}

/**
 * Title slide — big text, topic list on right.
 */
export function titleSlideHTML(moduleId, { title, subtitle, topics, totalSlides }) {
  const mc = MODULE_COLORS[moduleId] || MODULE_COLORS["central-dogma"];
  const topicItems = (topics || []).map(t =>
    `<li style="font-size:19px;">${t}</li>`
  ).join("\n");

  return slideHTML(moduleId, 1, totalSlides, `
    <div style="display:flex; height:100%; padding-top:60px;">
      <div style="flex:1.3; padding-right:48px;">
        <h1 style="font-size:52px;">${title}</h1>
        ${subtitle ? `<p style="font-size:24px; color:${COLORS.muted}; margin-top:20px; line-height:1.4;">${subtitle}</p>` : ""}
      </div>
      ${topics ? `
      <div style="flex:0.7; background:${mc.light}; border-left:6px solid ${mc.accent}; border-radius:12px; padding:32px 28px; align-self:flex-start;">
        <div style="font-size:16px; font-weight:800; color:${mc.dark}; margin-bottom:18px; text-transform:uppercase; letter-spacing:1.5px;">Topics</div>
        <ul class="bullet-list">${topicItems}</ul>
      </div>` : ""}
    </div>
  `, `h1::after { width: 100px; height: 6px; margin-top: 14px; }`);
}

/**
 * Key takeaways slide — numbered cards.
 */
export function takeawaysSlideHTML(moduleId, slideNum, totalSlides, takeaways) {
  const cardColors = ["card-accent", "card-green", "card-red", "card-violet", "card-amber"];
  const circleColors = [
    MODULE_COLORS[moduleId]?.accent || "#3b82f6",
    COLORS.green, COLORS.red, COLORS.violet, COLORS.amber,
  ];
  const items = takeaways.map((t, i) => `
    <div class="card ${cardColors[i % cardColors.length]}" style="display:flex; gap:18px; align-items:flex-start; padding:20px 24px;">
      <div class="number-circle" style="background:${circleColors[i % circleColors.length]};">${i + 1}</div>
      <div>
        <div class="card-title" style="font-size:20px;">${t.title}</div>
        <div class="card-body" style="font-size:17px;">${t.body}</div>
      </div>
    </div>
  `).join("\n");

  return slideHTML(moduleId, slideNum, totalSlides, `
    <h1>Key Takeaways</h1>
    <div class="section-label">Summary</div>
    ${items}
  `);
}
