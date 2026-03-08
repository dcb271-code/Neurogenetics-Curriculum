/**
 * scripts/gen-virtual-cases.mjs
 *
 * Generates 8 clean, readable slides for the Virtual Patient Cases module.
 * Uses puppeteer HTML rendering via the shared design system.
 *
 * Run: node scripts/gen-virtual-cases.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "virtual-cases";
const mc = MODULE_COLORS[MOD];
const TOTAL = 8;

const slides = [];

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Integrative Virtual<br>Patient Cases",
  subtitle: "3 Cases, 6 Quiz Questions — applying neurogenetics concepts to realistic clinical scenarios",
  totalSlides: TOTAL,
  topics: [
    "Case 1: Neonatal seizures",
    "Case 2: Progressive ataxia",
    "Case 3: CP mimic",
  ],
}));

// ── Slide 2: Case 1 — Baby M (Presentation) ───────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Case 1 — Baby M</h1>
  <div class="section-label">Neonatal Seizures</div>

  <div class="two-col">
    <div>
      <div class="card card-red" style="padding:28px;">
        <div class="card-title">Presentation</div>
        <div class="card-body">3-day-old with focal clonic seizures and burst-suppression pattern on EEG. No perinatal risk factors identified.</div>
      </div>

      <div class="card card-amber" style="padding:28px;">
        <div class="card-title">Family History</div>
        <div class="card-body">Maternal <em>FMR1</em> premutation carrier — identified on prior carrier screening.</div>
      </div>
    </div>

    <div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title">Genetic Differential</div>
        <div class="card-body" style="font-size:18px;">
          <strong style="color:${mc.dark};">Top candidates:</strong><br>
          <span style="font-size:20px; font-weight:700; color:${COLORS.heading};">KCNQ2 &bull; STXBP1 &bull; SCN2A</span><br>
          <span style="font-size:20px; font-weight:700; color:${COLORS.heading};">CDKL5 &bull; KCNT1</span>
        </div>
      </div>

      <div class="card card-violet" style="padding:28px;">
        <div class="card-title">Key Concept</div>
        <div class="card-body">Neonatal-onset seizure workup: trio WES is first-line to identify de novo channelopathies amenable to precision therapy.</div>
      </div>
    </div>
  </div>
`));

// ── Slide 3: Case 1 — Diagnosis & Treatment ───────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Case 1 — Diagnosis &amp; Treatment</h1>
  <div class="section-label">Baby M — Resolution</div>

  <div class="card card-accent" style="padding:28px; margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">Diagnosis: KCNQ2 Gain-of-Function Epilepsy</div>
    <div class="card-body">De novo missense variant in the channel pore domain. ACMG classification: <strong style="color:${COLORS.red};">Pathogenic</strong> (PS2 + PM1 + PM2 + PP3).</div>
  </div>

  <div class="two-col">
    <div class="card card-green" style="padding:28px;">
      <div class="card-title">Precision Treatment</div>
      <div class="card-body"><strong>Carbamazepine</strong> — a sodium channel blocker that compensates for the KCNQ2 gain-of-function mechanism. Mechanism-based therapy, not empiric.</div>
    </div>

    <div class="card card-amber" style="padding:28px;">
      <div class="card-title">Bonus Finding</div>
      <div class="card-body">Maternal <em>FMR1</em> premutation requires counseling about <strong>FXTAS risk</strong> (fragile X-associated tremor/ataxia syndrome) in the mother and reproductive implications.</div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:12px;">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:22px;">GoF channelopathies need channel blockers — LoF channelopathies need channel openers. Mechanism determines therapy.</div>
  </div>
`));

// ── Slide 4: Case 2 — Alex (Presentation) ─────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Case 2 — Alex</h1>
  <div class="section-label">Progressive Ataxia</div>

  <div class="two-col">
    <div>
      <div class="card card-red" style="padding:28px;">
        <div class="card-title">Presentation</div>
        <div class="card-body">14-year-old with progressive gait ataxia over the past 2 years. Insidious onset, now requiring assistive device.</div>
      </div>

      <div class="card card-accent" style="padding:28px;">
        <div class="card-title">Classic Friedreich Tetrad</div>
        <div class="card-body" style="font-size:18px;">
          <strong style="font-size:20px;">1.</strong> Progressive ataxia<br>
          <strong style="font-size:20px;">2.</strong> Areflexia<br>
          <strong style="font-size:20px;">3.</strong> Babinski sign (upgoing toes)<br>
          <strong style="font-size:20px;">4.</strong> Hypertrophic cardiomyopathy
        </div>
      </div>
    </div>

    <div>
      <div class="card card-amber" style="padding:28px;">
        <div class="card-title" style="font-size:21px;">Critical WES Limitation</div>
        <div class="card-body"><strong style="color:${COLORS.red};">WES cannot detect trinucleotide repeat expansions.</strong> Standard short-read sequencing misses the GAA repeat in <em>FXN</em>.</div>
      </div>

      <div class="card card-violet" style="padding:28px;">
        <div class="card-title">Key Concept</div>
        <div class="card-body">Know when WES will miss the diagnosis — progressive ataxia with the Friedreich phenotype demands dedicated repeat expansion testing.</div>
      </div>
    </div>
  </div>
`));

// ── Slide 5: Case 2 — Diagnosis & Management ──────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Case 2 — Diagnosis &amp; Management</h1>
  <div class="section-label">Alex — Resolution</div>

  <div class="card card-red" style="padding:24px 28px; margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">WES Was NEGATIVE</div>
    <div class="card-body">As expected — WES cannot detect the GAA trinucleotide repeat expansion in <em>FXN</em>.</div>
  </div>

  <div class="card card-accent" style="padding:24px 28px; margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">Diagnosis: Friedreich Ataxia</div>
    <div class="card-body">Confirmed by <strong>RP-PCR</strong> (repeat-primed PCR): homozygous GAA expansion in <em>FXN</em> gene.</div>
  </div>

  <div class="two-col">
    <div class="card card-green" style="padding:28px;">
      <div class="card-title">Management</div>
      <div class="card-body" style="font-size:18px;">
        <strong>Omaveloxolone</strong> (Nrf2 activator, FDA approved)<br>
        Cardiac monitoring (annual echo)<br>
        Physical therapy program<br>
        Genetic counseling (AR inheritance)
      </div>
    </div>

    <div class="card card-amber" style="padding:28px;">
      <div class="card-title">Lesson</div>
      <div class="card-body">Always consider repeat expansion disorders when WES is negative — especially in progressive ataxia, dystonia, or myotonic phenotypes. RP-PCR or long-read sequencing is required.</div>
    </div>
  </div>
`));

// ── Slide 6: Case 3 — Priya (Presentation) ────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Case 3 — Priya</h1>
  <div class="section-label">CP Mimic</div>

  <div class="card card-accent" style="padding:28px; margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">Presentation</div>
    <div class="card-body">5-year-old referred with a diagnosis of spastic diplegic cerebral palsy. But several features don't fit the expected pattern.</div>
  </div>

  <div class="two-col">
    <div class="card card-red" style="padding:28px;">
      <div class="card-title" style="font-size:21px;">Red Flags Against CP</div>
      <div class="card-body" style="font-size:18px;">
        <strong style="color:${COLORS.red};">Progressive symptoms</strong> — getting worse, not static<br><br>
        <strong style="color:${COLORS.red};">Diurnal fluctuation</strong> — worse in PM, better after sleep<br><br>
        <strong style="color:${COLORS.red};">Normal MRI</strong> — no structural lesion<br><br>
        <strong style="color:${COLORS.red};">Family history</strong> — maternal aunt with similar gait
      </div>
    </div>

    <div class="card card-violet" style="padding:28px;">
      <div class="card-title">Key Concept</div>
      <div class="card-body" style="font-size:19px;">When "CP" isn't really CP — a progressive or fluctuating motor disorder should raise suspicion for a genetic mimic. True CP is <strong>static</strong>, not progressive.</div>
    </div>
  </div>
`));

// ── Slide 7: Case 3 — Diagnosis & Treatment ───────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Case 3 — Diagnosis &amp; Treatment</h1>
  <div class="section-label">Priya — Resolution</div>

  <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
    <div class="card-title" style="font-size:22px;">Diagnosis: Dopa-Responsive Dystonia (GCH1, AD)</div>
    <div class="card-body"><em>GCH1</em> heterozygous variant — ACMG classification: <strong style="color:${COLORS.red};">Pathogenic</strong>. Autosomal dominant with reduced penetrance.</div>
  </div>

  <div class="two-col">
    <div class="card card-green" style="padding:28px;">
      <div class="card-title">Dramatic Treatment Response</div>
      <div class="card-body"><strong>Low-dose levodopa</strong> — dramatic improvement within days. One of the most gratifying treatment responses in neurogenetics.</div>
    </div>

    <div class="card card-amber" style="padding:28px;">
      <div class="card-title">Mechanism</div>
      <div class="card-body" style="font-size:18px;">
        GCH1 &rarr; BH4 &rarr; Dopamine<br><br>
        <em>GCH1</em> deficiency impairs BH4 synthesis, reducing dopamine production. Levodopa bypasses the block.
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:12px;">
    <div class="label">Lesson</div>
    <div class="value" style="font-size:22px;">Always investigate CP that doesn't fit — progressive symptoms, diurnal fluctuation, or family history may reveal a treatable genetic condition.</div>
  </div>
`));

// ── Slide 8: Key Takeaways ─────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 8, TOTAL, [
  {
    title: "Trio WES is first-line in NICU seizures",
    body: "But always consider channelopathies for precision therapy — GoF vs LoF determines drug choice.",
  },
  {
    title: "WES misses trinucleotide repeat expansions",
    body: "RP-PCR or long-read sequencing is required for Friedreich, SCAs, DM1, and other repeat disorders.",
  },
  {
    title: "Precision treatment = mechanism-based",
    body: "GoF → channel blockers, LoF → replacement/bypass. The variant mechanism dictates the therapy.",
  },
  {
    title: 'Progressive "CP" ≠ CP',
    body: "Diurnal fluctuation, normal MRI, and family history are red flags for a genetic mimic like dopa-responsive dystonia.",
  },
  {
    title: "Always investigate family history",
    body: "Incidental findings (FMR1 premutation) and family patterns (GCH1) may reveal treatable conditions or counseling needs.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
