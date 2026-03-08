/**
 * scripts/gen-virtual-cases.mjs
 *
 * Generates 12 slides (6 sections × 2 slides each) for the Virtual Patient Cases module.
 * Section alignment matches data/modules/virtual-cases.json exactly.
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
const TOTAL = 12;

const slides = [];

/* ================================================================
   Section 0: Case 1: Neonatal Seizures – Presentation (slides 1–2)
   ================================================================ */

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Integrative Virtual<br>Patient Cases",
  subtitle: "3 cases — neonatal seizures, progressive ataxia, and a CP mimic",
  totalSlides: TOTAL,
  topics: [
    "Case 1: Neonatal seizures — presentation",
    "Case 1: Neonatal seizures — diagnosis",
    "Case 2: Progressive ataxia — presentation",
    "Case 2: Progressive ataxia — diagnosis",
    "Case 3: CP mimic — presentation",
    "Case 3: CP mimic — diagnosis",
  ],
}));

// ── Slide 2: Case 1 Presentation ──────────────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Case 1 &mdash; Baby M: Neonatal Seizures</h1>
  <div class="section-label">Presentation</div>

  <div class="two-col" style="margin-bottom:18px;">
    <div>
      <div class="card card-red" style="margin-bottom:14px;">
        <div class="card-title">Clinical Presentation</div>
        <div class="card-body" style="font-size:18px;">
          3-day-old term neonate with focal clonic seizures (onset day 2)<br><br>
          <strong>EEG:</strong> Burst-suppression pattern<br>
          <strong>Birth:</strong> Uncomplicated SVD, APGAR 8/9<br>
          <strong>Metabolic workup:</strong> Normal (glucose, electrolytes, lactate, ammonia)<br>
          <strong>MRI brain:</strong> Normal &mdash; no structural abnormality
        </div>
      </div>
      <div class="card card-amber">
        <div class="card-title">Family History Clues</div>
        <div class="card-body" style="font-size:18px;">
          Mother: mild postural hand tremor (uninvestigated)<br>
          Maternal grandmother: died of &ldquo;dementia&rdquo; at age 55
        </div>
      </div>
    </div>

    <div>
      <div class="card card-accent" style="margin-bottom:14px;">
        <div class="card-title">Genetic Differential for Burst-Suppression</div>
        <div class="card-body" style="font-size:19px;">
          <strong style="font-size:22px; color:${COLORS.heading};">KCNQ2 &bull; STXBP1 &bull; SCN2A</strong><br>
          <strong style="font-size:22px; color:${COLORS.heading};">CDKL5 &bull; KCNT1</strong>
        </div>
      </div>
      <div class="card card-violet">
        <div class="card-title">Testing Decision</div>
        <div class="card-body" style="font-size:18px;">
          <strong>Rapid trio WES</strong> is first-line in NICU encephalopathy<br><br>
          &bull; 35&ndash;50% diagnostic yield<br>
          &bull; Enables de novo detection (PS2)<br>
          &bull; Covers broader gene set than panels<br>
          &bull; Median turnaround 7&ndash;14 days
        </div>
      </div>
    </div>
  </div>
`));

/* ================================================================
   Section 1: Case 1: Neonatal Seizures – Diagnosis & Management (slides 3–4)
   ================================================================ */

// ── Slide 3: Case 1 Diagnosis ─────────────────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Case 1 &mdash; Diagnosis: KCNQ2 GoF Epilepsy</h1>
  <div class="section-label">Baby M &mdash; Resolution</div>

  <div class="card card-accent" style="margin-bottom:16px;">
    <div class="card-title" style="font-size:22px;">Variant: KCNQ2 c.740C&gt;T, p.Ala247Val (de novo)</div>
    <div class="card-body">S4 voltage sensor domain &mdash; gain-of-function mechanism. ClinVar: Pathogenic (multiple submitters).</div>
  </div>

  <div class="two-col" style="margin-bottom:16px;">
    <div>
      <h3>ACMG Evidence</h3>
      <div class="numbered-item">
        <div class="number-circle" style="background:${COLORS.red};">1</div>
        <div><strong style="font-size:19px;">PS2 (+4)</strong> &mdash; confirmed de novo</div>
      </div>
      <div class="numbered-item">
        <div class="number-circle" style="background:${COLORS.green};">2</div>
        <div><strong style="font-size:19px;">PS3 (+4)</strong> &mdash; functional studies: GoF effect</div>
      </div>
      <div class="numbered-item">
        <div class="number-circle" style="background:${COLORS.amber};">3</div>
        <div><strong style="font-size:19px;">PM1 (+2)</strong> &mdash; S4 voltage sensor domain</div>
      </div>
      <div class="numbered-item">
        <div class="number-circle" style="background:${mc.accent};">4</div>
        <div><strong style="font-size:19px;">PM2 (+1)</strong> &mdash; absent from gnomAD</div>
      </div>
    </div>
    <div>
      <div class="card card-green" style="margin-bottom:14px;">
        <div class="card-title">Precision Treatment</div>
        <div class="card-body" style="font-size:18px;">
          <strong>Carbamazepine</strong> (sodium channel blocker) &mdash; seizures resolve within 48 hours<br><br>
          GoF channelopathies need <strong>channel blockers</strong><br>
          LoF channelopathies need <strong>channel openers</strong>
        </div>
      </div>
      <div class="highlight-box" style="margin:0;">
        <div class="label">Classification</div>
        <div class="value">Pathogenic (score &ge;10)</div>
      </div>
    </div>
  </div>
`));

// ── Slide 4: Case 1 — Dual Diagnosis + FMR1 ──────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Case 1 &mdash; Dual Genetic Findings</h1>
  <div class="section-label">FMR1 Premutation in the Family</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div class="card card-amber">
      <div class="card-title">Maternal FMR1 Testing</div>
      <div class="card-body" style="font-size:18px;">
        Mother&rsquo;s tremor and grandmother&rsquo;s early-onset dementia prompted targeted FMR1 testing<br><br>
        <strong>Result:</strong> Mother carries FMR1 premutation (89 CGG repeats)<br><br>
        Explains mother&rsquo;s tremor as early <strong>FXTAS</strong><br>
        Grandmother likely had FXTAS-associated dementia<br><br>
        Baby M: FMR1 <strong>negative</strong> for expansion
      </div>
    </div>
    <div class="card card-violet">
      <div class="card-title">Dual Diagnoses in Families</div>
      <div class="card-body" style="font-size:18px;">
        <strong>~5&ndash;7% of families</strong> undergoing comprehensive genetic evaluation have dual genetic findings<br><br>
        Baby M&rsquo;s KCNQ2 epilepsy and the family&rsquo;s FMR1 premutation are <strong>independent</strong> diagnoses<br><br>
        <strong>Lesson:</strong> Always investigate unexplained symptoms in relatives even after one diagnosis is confirmed
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:22px;">Family history clues should never be dismissed &mdash; the mother&rsquo;s tremor and grandmother&rsquo;s dementia were independent of Baby M&rsquo;s KCNQ2 diagnosis</div>
  </div>
`));

/* ================================================================
   Section 2: Case 2: Progressive Ataxia – Presentation (slides 5–6)
   ================================================================ */

// ── Slide 5: Case 2 Presentation ──────────────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Case 2 &mdash; Alex: Progressive Ataxia</h1>
  <div class="section-label">Presentation</div>

  <div class="two-col" style="margin-bottom:18px;">
    <div>
      <div class="card card-red" style="margin-bottom:14px;">
        <div class="card-title">Clinical Presentation</div>
        <div class="card-body" style="font-size:18px;">
          14-year-old with 18-month progressive gait unsteadiness<br><br>
          <strong>Exam:</strong> Broad-based ataxic gait, cerebellar dysarthria, bilateral dysmetria<br>
          <strong>Striking:</strong> Absent DTRs at knees and ankles<br>
          <strong>Sensory:</strong> Diminished vibration + proprioception (feet)
        </div>
      </div>
      <div class="card card-amber">
        <div class="card-title">Family History</div>
        <div class="card-body" style="font-size:18px;">
          Parents are <strong>first cousins</strong> (Pakistani origin)<br>
          Older sibling (17 yr) developing similar gait difficulties<br><br>
          <strong>Consanguinity</strong> &rarr; autosomal recessive inheritance
        </div>
      </div>
    </div>

    <div>
      <div class="card card-accent" style="margin-bottom:14px;">
        <div class="card-title">Classic Friedreich Tetrad</div>
        <div class="card-body" style="font-size:19px;">
          <strong style="font-size:21px;">1.</strong> Progressive ataxia<br>
          <strong style="font-size:21px;">2.</strong> Areflexia + pes cavus<br>
          <strong style="font-size:21px;">3.</strong> Scoliosis<br>
          <strong style="font-size:21px;">4.</strong> Cardiomyopathy (systolic murmur)
        </div>
      </div>
      <div class="card card-violet">
        <div class="card-title">MRI Brain</div>
        <div class="card-body" style="font-size:18px;">
          Mild superior cerebellar vermis atrophy<br>
          No focal lesions, demyelination, or structural malformations
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 6: Case 2 — WES Limitation ─────────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Case 2 &mdash; Critical Testing Limitation</h1>
  <div class="section-label">When WES Cannot Make the Diagnosis</div>

  <div class="card card-red" style="margin-bottom:20px; padding:24px 28px;">
    <div class="card-title" style="font-size:24px;">WES Cannot Detect Trinucleotide Repeat Expansions</div>
    <div class="card-body" style="font-size:20px;">Standard short-read sequencing (150 bp reads) cannot span or accurately quantify large repeat expansions containing hundreds to thousands of repeat units</div>
  </div>

  <div class="two-col">
    <div>
      <h3>Ataxia Differential (AR)</h3>
      <table>
        <thead><tr><th>Condition</th><th>Gene</th></tr></thead>
        <tbody>
          <tr><td style="color:${COLORS.red}; font-weight:700;">Friedreich ataxia (most common)</td><td>FXN (GAA repeat)</td></tr>
          <tr><td>Ataxia-telangiectasia</td><td>ATM</td></tr>
          <tr><td>AOA1 / AOA2</td><td>APTX / SETX</td></tr>
          <tr><td>ARSACS</td><td>SACS</td></tr>
          <tr><td>AVED</td><td>TTPA</td></tr>
        </tbody>
      </table>
    </div>
    <div>
      <div class="card card-accent" style="margin-bottom:14px;">
        <div class="card-title">Key Principle</div>
        <div class="card-body" style="font-size:18px;">
          When clinical suspicion for a repeat expansion disorder is high, <strong>dedicated testing must be ordered</strong>:<br><br>
          &bull; Repeat-primed PCR (RP-PCR)<br>
          &bull; Southern blot<br>
          &bull; Long-read sequencing
        </div>
      </div>
    </div>
  </div>
`));

/* ================================================================
   Section 3: Case 2: Progressive Ataxia – Diagnosis & Management (slides 7–8)
   ================================================================ */

// ── Slide 7: Case 2 Diagnosis ─────────────────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Case 2 &mdash; Diagnosis: Friedreich Ataxia</h1>
  <div class="section-label">Alex &mdash; Resolution</div>

  <div class="card card-red" style="margin-bottom:14px; padding:20px 28px;">
    <div class="card-title" style="font-size:22px;">WES Was NEGATIVE &mdash; As Expected</div>
    <div class="card-body">No pathogenic variants in known ataxia genes. But WES cannot detect GAA repeat expansions.</div>
  </div>

  <div class="card card-accent" style="margin-bottom:14px; padding:20px 28px;">
    <div class="card-title" style="font-size:22px;">Targeted FXN Testing Confirms Diagnosis</div>
    <div class="card-body">RP-PCR: homozygous GAA expansion &mdash; 850 and 920 repeats (normal &lt;33; full mutation &gt;66). 96% of FA patients are homozygous for GAA expansion.</div>
  </div>

  <div class="two-col">
    <div class="card card-green">
      <div class="card-title">Treatment: Omaveloxolone (Skyclarys)</div>
      <div class="card-body" style="font-size:18px;">
        First FDA-approved therapy for Friedreich ataxia (Feb 2023)<br><br>
        <strong>NRF2 pathway activator</strong> &mdash; reduces oxidative stress from frataxin deficiency<br><br>
        Demonstrated slowing of neurological decline in trials
      </div>
    </div>
    <div class="card card-amber">
      <div class="card-title">Cardiac Surveillance</div>
      <div class="card-body" style="font-size:18px;">
        Echocardiography reveals concentric LV hypertrophy<br><br>
        <strong>HCM develops in 60&ndash;75%</strong> &mdash; leading cause of death<br><br>
        Annual echo + ECG is standard of care
      </div>
    </div>
  </div>
`));

// ── Slide 8: Case 2 — Cascade Testing ─────────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Case 2 &mdash; Cascade Testing &amp; Counseling</h1>
  <div class="section-label">Family Implications</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div class="card card-accent">
      <div class="card-title">Sibling Testing</div>
      <div class="card-body" style="font-size:18px;">
        Alex&rsquo;s 17-year-old sibling (with recent gait difficulties) tested &mdash; <strong>confirmed homozygous GAA expansion</strong><br><br>
        Early treatment initiated <strong>before significant cardiomyopathy</strong> develops<br><br>
        Presymptomatic/early-symptomatic diagnosis demonstrates the value of cascade family testing
      </div>
    </div>
    <div class="card card-violet">
      <div class="card-title">Genetic Counseling</div>
      <div class="card-body" style="font-size:18px;">
        <strong>Autosomal recessive inheritance</strong><br><br>
        Consanguineous parents are obligate carriers<br><br>
        <strong>25% recurrence risk</strong> per pregnancy<br><br>
        Both parents carry the GAA expansion &mdash; consistent with first-cousin consanguinity
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Key Lesson</div>
    <div class="value" style="font-size:22px;">A negative WES does not exclude a genetic diagnosis &mdash; always consider repeat expansion disorders when the clinical phenotype is suggestive</div>
  </div>
`));

/* ================================================================
   Section 4: Case 3: CP Mimic – Presentation (slides 9–10)
   ================================================================ */

// ── Slide 9: Case 3 Presentation ──────────────────────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Case 3 &mdash; Priya: CP Mimic</h1>
  <div class="section-label">Presentation</div>

  <div class="card card-accent" style="margin-bottom:16px;">
    <div class="card-title" style="font-size:22px;">5-Year-Old Referred from CP Clinic</div>
    <div class="card-body">Diagnosed with spastic diplegic CP at age 2 based on gross motor delay, increased lower extremity tone, and toe-walking. Birth history entirely unremarkable.</div>
  </div>

  <div class="two-col">
    <div class="card card-red">
      <div class="card-title" style="font-size:21px;">Red Flags Against CP</div>
      <div class="card-body" style="font-size:18px;">
        <strong style="color:${COLORS.red};">1. Progressive course</strong> &mdash; walked with walker at 3, wheelchair at 5<br><br>
        <strong style="color:${COLORS.red};">2. Diurnal fluctuation</strong> &mdash; better in morning, worse in afternoon/evening<br><br>
        <strong style="color:${COLORS.red};">3. Normal MRI</strong> &mdash; no structural lesion<br><br>
        <strong style="color:${COLORS.red};">4. Family history</strong> &mdash; brother (8 yr) has mild persistent toe-walking
      </div>
    </div>
    <div class="card card-amber">
      <div class="card-title">Why This Is Not CP</div>
      <div class="card-body" style="font-size:18px;">
        CP is by definition a <strong>non-progressive</strong> motor disorder from a static brain lesion<br><br>
        Progressive worsening = <strong>fundamental contradiction</strong> with CP diagnosis<br><br>
        Diurnal fluctuation is the <strong>hallmark of dopa-responsive dystonia</strong> (DRD/Segawa disease)<br><br>
        15&ndash;30% of children with CP have normal neuroimaging &mdash; highest yield group for genetic testing
      </div>
    </div>
  </div>
`));

// ── Slide 10: Case 3 — Diurnal Fluctuation ────────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Case 3 &mdash; Diurnal Fluctuation &amp; DRD</h1>
  <div class="section-label">The Key Clinical Clue</div>

  <div class="card card-accent" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">Dopa-Responsive Dystonia Differential</div>
    <div class="card-body" style="font-size:19px;">
      <strong>GCH1</strong> (autosomal dominant, most common cause) &bull;
      <strong>TH</strong> (autosomal recessive) &bull;
      <strong>SPR</strong> (sepiapterin reductase deficiency, AR)
    </div>
  </div>

  <div class="two-col" style="margin-bottom:18px;">
    <div class="card card-violet">
      <div class="card-title">GCH1 Pathway</div>
      <div class="card-body" style="font-size:18px;">
        GCH1 &rarr; GTP cyclohydrolase 1 &rarr; BH4 synthesis<br><br>
        BH4 is required for dopamine production<br><br>
        GCH1 deficiency = <strong>dopamine deficiency</strong> in basal ganglia<br><br>
        Levodopa <strong>bypasses</strong> the enzymatic block
      </div>
    </div>
    <div class="card card-green">
      <div class="card-title">AD with Incomplete Penetrance</div>
      <div class="card-body" style="font-size:18px;">
        GCH1-DRD shows <strong>incomplete penetrance</strong>, especially in males<br><br>
        Females more frequently and severely affected<br><br>
        Brother&rsquo;s mild toe-walking is consistent with reduced penetrance in a male carrier
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:22px;">Always ask about diurnal fluctuation in any child labelled with CP &mdash; better after sleep, worse in afternoon/evening = consider DRD</div>
  </div>
`));

/* ================================================================
   Section 5: Case 3: CP Mimic – Diagnosis & Management (slides 11–12)
   ================================================================ */

// ── Slide 11: Case 3 Diagnosis & Treatment ─────────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Case 3 &mdash; Diagnosis: Dopa-Responsive Dystonia</h1>
  <div class="section-label">Priya &mdash; Resolution</div>

  <div class="two-col" style="margin-bottom:16px;">
    <div>
      <div class="card card-green" style="margin-bottom:14px;">
        <div class="card-title">Dramatic Treatment Response</div>
        <div class="card-body" style="font-size:18px;">
          Low-dose levodopa/carbidopa at 1 mg/kg/day<br><br>
          <strong>Within 2 weeks:</strong> marked improvement in tone<br>
          <strong>By 1 month:</strong> walking independently<br><br>
          One of the most rewarding diagnoses in child neurology &mdash; lifelong response to inexpensive therapy
        </div>
      </div>
      <div class="card card-amber">
        <div class="card-title">Levodopa Trial Before Genetics</div>
        <div class="card-body" style="font-size:18px;">When clinical suspicion for DRD is high, a therapeutic trial <strong>should not be delayed</strong> while awaiting genetic confirmation</div>
      </div>
    </div>
    <div>
      <div class="card card-accent" style="margin-bottom:14px;">
        <div class="card-title">Genetic Confirmation</div>
        <div class="card-body" style="font-size:18px;">
          GCH1: c.607G&gt;A, p.Val203Ile (heterozygous)<br><br>
          <strong>ACMG: Pathogenic</strong><br>
          PS3 (functional: reduced enzyme activity) +<br>
          PS4 (multiple unrelated families) +<br>
          PM2 (absent gnomAD) +<br>
          PP1 (segregates in family) +<br>
          PP3 (computational support)
        </div>
      </div>
      <div class="card card-violet">
        <div class="card-title">Cascade Testing</div>
        <div class="card-body" style="font-size:18px;">Brother confirmed GCH1 carrier &mdash; levodopa initiated with improvement in toe-walking</div>
      </div>
    </div>
  </div>
`));

// ── Slide 12: Key Takeaways ────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 12, TOTAL, [
  {
    title: "Trio WES is first-line in NICU seizures",
    body: "35–50% diagnostic yield. GoF vs LoF mechanism determines drug choice — carbamazepine for GoF channelopathies.",
  },
  {
    title: "WES misses trinucleotide repeat expansions",
    body: "RP-PCR or long-read sequencing is required for Friedreich, SCAs, DM1, and other repeat disorders.",
  },
  {
    title: 'Progressive "CP" is never CP',
    body: "Diurnal fluctuation, normal MRI, and family history are red flags for genetic mimics — 20–30% of idiopathic CP has a genetic cause.",
  },
  {
    title: "DRD is a must-not-miss diagnosis",
    body: "Dramatic, lifelong response to low-dose levodopa. A therapeutic trial should not wait for genetic confirmation.",
  },
  {
    title: "Always investigate family history",
    body: "Dual diagnoses occur in ~5–7% of families. Unexplained symptoms in relatives may reveal independent treatable conditions.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
