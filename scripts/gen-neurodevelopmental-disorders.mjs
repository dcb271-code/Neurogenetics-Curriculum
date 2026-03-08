/**
 * scripts/gen-neurodevelopmental-disorders.mjs
 *
 * Generates 9 clean, readable slides for the Neurodevelopmental Disorders module.
 * Covers TSC, Fragile X, and Rett Syndrome.
 *
 * Run: node scripts/gen-neurodevelopmental-disorders.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "neurodevelopmental-disorders";
const mc = MODULE_COLORS[MOD];
const TOTAL = 9;

const slides = [];

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Classic Neurodevelopmental<br>Genetic Disorders",
  subtitle: "TSC, Fragile X, and Rett Syndrome",
  totalSlides: TOTAL,
  topics: [
    "Tuberous sclerosis complex (TSC)",
    "TSC targeted therapy",
    "Fragile X syndrome",
    "FMR1 premutation disorders",
    "Rett syndrome",
    "Testing strategies",
    "Side-by-side comparison",
  ],
}));

// ── Slide 2: TSC — Multi-System ────────────────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Tuberous Sclerosis Complex — Multi-System</h1>
  <div class="section-label">TSC1 (hamartin) / TSC2 (tuberin) &rarr; mTOR pathway</div>

  <table>
    <thead>
      <tr>
        <th style="width:20%;">System</th>
        <th style="width:80%;">Manifestations</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Brain</td>
        <td>Cortical tubers, subependymal nodules (SEN), SEGA, epilepsy (infantile spasms)</td>
      </tr>
      <tr>
        <td>Heart</td>
        <td>Cardiac rhabdomyomas (often detected prenatally)</td>
      </tr>
      <tr>
        <td>Kidney</td>
        <td>Angiomyolipomas, renal cysts</td>
      </tr>
      <tr>
        <td>Lung</td>
        <td>LAM (lymphangioleiomyomatosis)</td>
      </tr>
      <tr>
        <td>Skin</td>
        <td>Hypomelanotic macules, facial angiofibromas, shagreen patches</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:12px;">
    <div class="label">Pathway</div>
    <div class="value" style="font-size:22px;">TSC1/TSC2 loss &rarr; constitutive mTOR activation &rarr; uncontrolled cell growth across multiple organ systems</div>
  </div>
`));

// ── Slide 3: TSC — Targeted Therapy ────────────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>TSC — Targeted Therapy</h1>
  <div class="section-label">Treatment &amp; Surveillance</div>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">Everolimus</div>
      <div class="card-body">mTOR inhibitor approved for SEGA, renal angiomyolipomas, and adjunctive therapy for refractory seizures in TSC</div>
    </div>
    <div class="card card-green">
      <div class="card-title">Vigabatrin</div>
      <div class="card-body">First-line treatment for TSC-associated infantile spasms — superior efficacy compared to other antiseizure medications</div>
    </div>
    <div class="card card-violet">
      <div class="card-title">EPISTOP Trial</div>
      <div class="card-body">Landmark study: early vigabatrin before clinical seizure onset improves neurodevelopmental outcomes in infants with TSC</div>
    </div>
    <div class="card card-amber">
      <div class="card-title">Surveillance</div>
      <div class="card-body">Regular MRI brain (SEGA), renal ultrasound (AML), echocardiogram, and dermatology assessment per consensus guidelines</div>
    </div>
  </div>
`));

// ── Slide 4: Fragile X Syndrome ────────────────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Fragile X Syndrome</h1>
  <div class="section-label">FMR1 CGG Repeat Expansion</div>

  <table>
    <thead>
      <tr>
        <th style="width:25%;">Category</th>
        <th style="width:22%;">CGG Repeats</th>
        <th style="width:53%;">Significance</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Normal</td>
        <td>5 – 44</td>
        <td>Stable on transmission</td>
      </tr>
      <tr>
        <td>Intermediate</td>
        <td>45 – 54</td>
        <td>Gray zone — may expand in future generations</td>
      </tr>
      <tr>
        <td style="color:${COLORS.amber};">Premutation</td>
        <td style="font-weight:700;">55 – 200</td>
        <td>Risk of FXTAS (males) and FXPOI (females)</td>
      </tr>
      <tr>
        <td style="color:${COLORS.red};">Full Mutation</td>
        <td style="font-weight:700; color:${COLORS.red};">&gt;200</td>
        <td>Methylation &rarr; FMR1 silencing &rarr; absent FMRP</td>
      </tr>
    </tbody>
  </table>

  <div class="card card-accent" style="margin-top:8px;">
    <div class="card-title">Clinical Features</div>
    <div class="card-body">Intellectual disability, macro-orchidism (post-pubertal), long face, prominent ears, social anxiety, gaze avoidance</div>
  </div>

  <div class="card card-red" style="margin-top:4px;">
    <div class="card-title">Testing Alert</div>
    <div class="card-body">WES/WGS MISS repeat expansions — specific FMR1 triplet repeat testing (PCR + Southern blot) must be ordered separately</div>
  </div>
`));

// ── Slide 5: FMR1 Premutation Disorders ────────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>FMR1 Premutation Disorders</h1>
  <div class="section-label">55 – 200 CGG Repeats — Distinct Disease Spectrum</div>

  <div class="two-col" style="margin-top:16px;">
    <div class="card card-violet" style="padding:32px 28px;">
      <div class="card-title" style="font-size:22px; margin-bottom:14px;">FXTAS</div>
      <div class="card-body" style="font-size:19px; line-height:1.65;">
        <strong>Fragile X-Associated Tremor/Ataxia Syndrome</strong><br><br>
        Predominantly males &gt;50 years<br><br>
        <strong>Triad:</strong> intention tremor + cerebellar ataxia + cognitive decline<br><br>
        <strong>MRI hallmark:</strong> middle cerebellar peduncle (MCP) sign — T2 hyperintensity
      </div>
    </div>
    <div class="card card-amber" style="padding:32px 28px;">
      <div class="card-title" style="font-size:22px; margin-bottom:14px;">FXPOI</div>
      <div class="card-body" style="font-size:19px; line-height:1.65;">
        <strong>Fragile X-Associated Primary Ovarian Insufficiency</strong><br><br>
        Affects 20 – 25% of female premutation carriers<br><br>
        Premature ovarian insufficiency (menopause before age 40)<br><br>
        <strong>Clinical impact:</strong> fertility counseling essential for identified carriers
      </div>
    </div>
  </div>
`));

// ── Slide 6: Rett Syndrome ─────────────────────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Rett Syndrome</h1>
  <div class="section-label">MECP2 (X-linked) — Loss of Transcriptional Regulation</div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="padding:20px 24px;">
        <div class="card-title" style="font-size:20px;">Stage I (6 – 18 mo)</div>
        <div class="card-body" style="font-size:18px;">Developmental stagnation, decelerating head growth</div>
      </div>
      <div class="card card-red" style="padding:20px 24px;">
        <div class="card-title" style="font-size:20px;">Stage II (1 – 4 yr)</div>
        <div class="card-body" style="font-size:18px;">Rapid regression, hand stereotypies, loss of speech, seizures</div>
      </div>
      <div class="card card-amber" style="padding:20px 24px;">
        <div class="card-title" style="font-size:20px;">Stage III (2 – 10 yr)</div>
        <div class="card-body" style="font-size:18px;">"Pseudo-stationary" — some improvement, persistent hand stereotypies</div>
      </div>
      <div class="card card-violet" style="padding:20px 24px;">
        <div class="card-title" style="font-size:20px;">Stage IV (10+ yr)</div>
        <div class="card-body" style="font-size:18px;">Late motor deterioration, scoliosis, reduced mobility</div>
      </div>
    </div>
    <div>
      <div class="card card-green" style="padding:28px;">
        <div class="card-title" style="font-size:20px;">Molecular Mechanism</div>
        <div class="card-body" style="font-size:18px; line-height:1.6;">
          <strong>Gene:</strong> MECP2 (X-linked dominant)<br><br>
          Almost all cases are <strong>de novo</strong> mutations<br><br>
          MECP2 protein regulates transcription by binding methylated DNA — loss disrupts thousands of downstream genes
        </div>
      </div>
      <div class="card card-red" style="padding:28px; margin-top:8px;">
        <div class="card-title" style="font-size:20px;">Gene Therapy Challenge</div>
        <div class="card-body" style="font-size:18px; line-height:1.6;">
          <strong>Dosage-sensitivity:</strong> too much MECP2 is also toxic (MECP2 duplication syndrome). Therapeutic window is narrow — requires precise expression control.
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 7: Testing Strategies ────────────────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Testing Strategies</h1>
  <div class="section-label">Disorder-Specific Approaches</div>

  <div class="three-col" style="margin-top:16px;">
    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:22px; margin-bottom:12px;">TSC</div>
      <div class="card-body" style="font-size:18px; line-height:1.65;">
        Standard sequencing + deletion/duplication analysis of <strong>TSC1</strong> and <strong>TSC2</strong><br><br>
        <strong>Note:</strong> somatic mosaicism is possible — may require deep sequencing or tissue-specific testing
      </div>
    </div>
    <div class="card card-violet" style="padding:28px;">
      <div class="card-title" style="font-size:22px; margin-bottom:12px;">Fragile X</div>
      <div class="card-body" style="font-size:18px; line-height:1.65;">
        <strong>FMR1 triplet repeat PCR</strong> (+ Southern blot for full mutations)<br><br>
        <strong style="color:${COLORS.red};">NOT detected by exome or genome sequencing</strong> — must be ordered as a separate, specific test
      </div>
    </div>
    <div class="card card-green" style="padding:28px;">
      <div class="card-title" style="font-size:22px; margin-bottom:12px;">Rett</div>
      <div class="card-body" style="font-size:18px; line-height:1.65;">
        <strong>MECP2</strong> sequencing + deletion/duplication analysis<br><br>
        If negative, consider <strong>CDKL5</strong> and <strong>FOXG1</strong> for Rett-like phenotypes
      </div>
    </div>
  </div>
`));

// ── Slide 8: Side-by-Side Comparison ───────────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Side-by-Side Comparison</h1>
  <div class="section-label">TSC vs Fragile X vs Rett</div>

  <table>
    <thead>
      <tr>
        <th style="width:18%;">Feature</th>
        <th style="width:28%;">TSC</th>
        <th style="width:28%;">Fragile X</th>
        <th style="width:26%;">Rett</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Gene</td>
        <td>TSC1 / TSC2</td>
        <td>FMR1</td>
        <td>MECP2</td>
      </tr>
      <tr>
        <td>Inheritance</td>
        <td>Autosomal dominant</td>
        <td>X-linked</td>
        <td>X-linked (de novo)</td>
      </tr>
      <tr>
        <td>Mechanism</td>
        <td>mTOR hyperactivation</td>
        <td>Repeat-mediated silencing</td>
        <td>Loss of transcriptional regulation</td>
      </tr>
      <tr>
        <td>Key Feature</td>
        <td>Multi-system hamartomas</td>
        <td>ID + macro-orchidism</td>
        <td>Regression + hand stereotypies</td>
      </tr>
      <tr>
        <td>Therapy</td>
        <td style="color:#166534; font-weight:700;">Everolimus (targeted)</td>
        <td>Supportive</td>
        <td>Gene therapy (investigational)</td>
      </tr>
    </tbody>
  </table>
`, `
  tbody td { font-size: 17px; }
`));

// ── Slide 9: Key Takeaways ─────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 9, TOTAL, [
  {
    title: "TSC is a treatable condition",
    body: "mTOR inhibitors (everolimus) change management across organ systems — brain, kidney, and skin.",
  },
  {
    title: "FMR1 silencing is invisible to standard sequencing",
    body: "CGG repeat expansion is not detected by exome or genome sequencing — specific FMR1 testing is required.",
  },
  {
    title: "Premutation carriers have their own disease spectrum",
    body: "55–200 CGG repeats cause FXTAS (tremor/ataxia in males >50) and FXPOI (ovarian insufficiency in 20–25% of female carriers).",
  },
  {
    title: "Rett follows a characteristic regression pattern",
    body: "Hand stereotypies are a hallmark — four clinical stages from stagnation through regression to late motor deterioration.",
  },
  {
    title: "No single test detects all three disorders",
    body: "TSC needs sequencing + del/dup, Fragile X needs repeat PCR, Rett needs MECP2 analysis — each requires a specific approach.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
