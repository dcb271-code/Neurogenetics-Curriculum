/**
 * scripts/gen-stroke.mjs
 *
 * Generates 15 clean, readable slides for the Genetic Causes of Stroke module.
 * Aligned to JSON section structure:
 *   S0 (slides 1-3):  Recognizing Genetic Stroke — Red Flags & Epidemiology
 *   S1 (slides 4-6):  CADASIL (NOTCH3 vasculopathy)
 *   S2 (slides 7-9):  MELAS and Mitochondrial Stroke-Like Episodes
 *   S3 (slides 10-12): Hereditary Coagulopathies and Vasculopathies
 *   S4 (slides 13-15): Genetic Workup and Secondary Prevention in Young Stroke
 *
 * Run: node scripts/gen-stroke.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "stroke";
const mc = MODULE_COLORS[MOD];
const TOTAL = 15;

const slides = [];

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 0 — Recognizing Genetic Stroke: Red Flags & Epidemiology (1-3)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Genetic Causes of Stroke",
  subtitle: "Monogenic stroke syndromes, CADASIL, mitochondrial stroke-like episodes, hereditary coagulopathies, and the genetic workup of young stroke",
  totalSlides: TOTAL,
  topics: [
    "Red flags for genetic stroke",
    "CADASIL (NOTCH3 vasculopathy)",
    "MELAS stroke-like episodes",
    "Hereditary coagulopathies & vasculopathies",
    "Genetic workup & secondary prevention",
  ],
}));

// ── Slide 2: Red Flags for Genetic Stroke ────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Red Flags for Genetic Stroke</h1>
  <div class="section-label">When to Suspect a Monogenic Cause</div>

  <div class="stats-row" style="margin-bottom:24px;">
    <div class="stat-card" style="background:${mc.light}; border-color:${mc.accent};">
      <div class="stat-label">All Strokes with Genetic Cause</div>
      <div class="stat-value">5&ndash;10%</div>
    </div>
    <div class="stat-card" style="background:${COLORS.redLight}; border-color:${COLORS.red};">
      <div class="stat-label">Stroke Under Age 45</div>
      <div class="stat-value">25&ndash;30%</div>
      <div style="font-size:15px; color:${COLORS.muted}; margin-top:4px;">have a definable genetic cause</div>
    </div>
    <div class="stat-card" style="background:${COLORS.greenLight}; border-color:${COLORS.green};">
      <div class="stat-label">Genetic Panel Yield</div>
      <div class="stat-value">15&ndash;20%</div>
      <div style="font-size:15px; color:${COLORS.muted}; margin-top:4px;">in young cryptogenic stroke</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-red" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Clinical Red Flags</div>
      <div class="card-body" style="font-size:18px; line-height:1.7;">
        &bull; Age &lt;45 without traditional CV risk factors<br>
        &bull; Family history of early stroke<br>
        &bull; Recurrent strokes in multiple territories<br>
        &bull; Stroke with hearing loss or migraine<br>
        &bull; Stroke with systemic features (rash, renal, eye)
      </div>
    </div>

    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Monogenic vs. Polygenic</div>
      <div class="card-body" style="font-size:18px; line-height:1.7;">
        Most common stroke is multifactorial. Rare monogenic causes include:<br><br>
        <strong>CADASIL, MELAS, CARASIL, COL4A1/2, Fabry disease, sickle cell, coagulopathies, FMD</strong>
      </div>
    </div>
  </div>
`));

// ── Slide 3: MRI Red Flags & Pediatric Stroke ───────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>MRI Red Flags &amp; Pediatric Stroke Causes</h1>
  <div class="section-label">Imaging Patterns That Suggest Genetic Etiology</div>

  <div class="two-col" style="margin-top:12px;">
    <div>
      <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">MRI Red Flags</div>
        <div class="card-body" style="font-size:18px; line-height:1.7;">
          &bull; Cortical signal <strong>crossing vascular territories</strong> (MELAS)<br>
          &bull; Periventricular WMH in young adult (CADASIL)<br>
          &bull; <strong>Anterior temporal lobe</strong> WMH (CADASIL)<br>
          &bull; DWI restriction in non-vascular distribution<br>
          &bull; Cerebellar strokes in young adults (COL4A1)
        </div>
      </div>
    </div>

    <div>
      <div class="card card-amber" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Pediatric Stroke Causes</div>
        <div class="card-body" style="font-size:18px; line-height:1.7;">
          &bull; <strong>Cardiac embolism</strong><br>
          &bull; <strong>Sickle cell disease</strong><br>
          &bull; Arterial dissection<br>
          &bull; CNS vasculitis<br>
          &bull; Metabolic: homocystinuria, organic acidemias<br><br>
          Prothrombotic workup and echocardiography are essential in all pediatric stroke.
        </div>
      </div>
    </div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1 — CADASIL (NOTCH3 Vasculopathy) (slides 4-6)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 4: CADASIL Clinical Tetrad ────────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>CADASIL &mdash; The Most Common Hereditary Stroke Disorder</h1>
  <div class="section-label">Autosomal Dominant NOTCH3 Vasculopathy</div>

  <div class="card card-accent" style="padding:24px 28px; margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">NOTCH3 Pathogenic Variants</div>
    <div class="card-body" style="font-size:19px;">
      All pathogenic CADASIL variants are <strong>cysteine-altering</strong> in the EGF-r domain (exons 2&ndash;24). They cause an odd number of cysteines, leading to aberrant disulfide bonding and <strong>GOM (granular osmiophilic material)</strong> deposits in vessel walls.
    </div>
  </div>

  <div style="display:flex; gap:16px;">
    <div class="stat-card" style="flex:1; background:${COLORS.amberLight}; border-color:${COLORS.amber}; text-align:center; padding:20px;">
      <div class="stat-label">Stage 1 (3rd&ndash;4th Decade)</div>
      <div class="stat-value" style="font-size:22px;">Migraine with Aura</div>
      <div style="font-size:16px; color:${COLORS.muted}; margin-top:4px;">Often the first symptom</div>
    </div>
    <div class="stat-card" style="flex:1; background:${COLORS.redLight}; border-color:${COLORS.red}; text-align:center; padding:20px;">
      <div class="stat-label">Stage 2 (4th&ndash;5th Decade)</div>
      <div class="stat-value" style="font-size:22px;">Lacunar Strokes</div>
      <div style="font-size:16px; color:${COLORS.muted}; margin-top:4px;">Recurrent subcortical infarcts</div>
    </div>
    <div class="stat-card" style="flex:1; background:${COLORS.violetLight}; border-color:${COLORS.violet}; text-align:center; padding:20px;">
      <div class="stat-label">Stage 3</div>
      <div class="stat-value" style="font-size:22px;">Psychiatric Changes</div>
      <div style="font-size:16px; color:${COLORS.muted}; margin-top:4px;">Depression, apathy, personality</div>
    </div>
    <div class="stat-card" style="flex:1; background:${mc.light}; border-color:${mc.accent}; text-align:center; padding:20px;">
      <div class="stat-label">Stage 4 (5th&ndash;6th Decade)</div>
      <div class="stat-value" style="font-size:22px;">Vascular Dementia</div>
      <div style="font-size:16px; color:${COLORS.muted}; margin-top:4px;">Progressive cognitive decline</div>
    </div>
  </div>
`));

// ── Slide 5: CADASIL MRI Signature & Diagnosis ─────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>CADASIL &mdash; MRI Signature &amp; Diagnosis</h1>
  <div class="section-label">Characteristic Imaging and Diagnostic Approach</div>

  <div class="two-col" style="margin-top:12px;">
    <div>
      <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">MRI Signature</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          &bull; Extensive periventricular and subcortical white matter hyperintensities<br>
          &bull; <strong>Anterior temporal lobe</strong> involvement &mdash; relatively specific<br>
          &bull; <strong>External capsule</strong> WMH &mdash; characteristic<br>
          &bull; Multiple old lacunar infarcts in basal ganglia, thalamus, pons
        </div>
      </div>
    </div>

    <div>
      <div class="card card-violet" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">Diagnostic Approach</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          &bull; <strong>NOTCH3 sequencing</strong> &mdash; targeted EGF-r domain exons or whole gene<br>
          &bull; Skin biopsy EM showing GOM deposits &mdash; supportive but less sensitive<br>
          &bull; GOM on biopsy is not specific to EGF-r cysteine variants
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:8px;">
    <div class="label">Classic Presentation</div>
    <div class="value" style="font-size:20px;">Young adult with migraine &rarr; recurrent lacunar strokes &rarr; WMH in anterior temporal lobes and external capsule &rarr; progressive dementia &mdash; think CADASIL</div>
  </div>
`));

// ── Slide 6: CADASIL Management ─────────────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>CADASIL &mdash; Management</h1>
  <div class="section-label">No Disease-Modifying Therapy Available</div>

  <div class="two-col" style="margin-top:12px;">
    <div>
      <div class="card card-green" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">Recommended</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          &bull; <strong>Aspirin</strong> for secondary stroke prevention<br>
          &bull; Statins, antihypertensives (as for other SVD)<br>
          &bull; Migraine prophylaxis &mdash; standard agents<br>
          &bull; Smoking cessation, vascular risk reduction<br>
          &bull; Family screening and genetic counseling
        </div>
      </div>
    </div>

    <div>
      <div class="card card-red" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">Avoid or Use Caution</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          &bull; <strong>Anticoagulation</strong> &mdash; not beneficial, may increase hemorrhage risk<br>
          &bull; <strong>Triptans</strong> &mdash; avoid in patients with active infarct history<br>
          &bull; Thrombolytics only with extreme caution (hemorrhage risk)
        </div>
      </div>
    </div>
  </div>

  <div class="card card-amber" style="padding:24px 28px; margin-top:8px;">
    <div class="card-title" style="font-size:22px;">Genetic Counseling Implications</div>
    <div class="card-body" style="font-size:19px;">
      Autosomal dominant with high penetrance &mdash; 50% risk to offspring. Predictive testing available for at-risk family members. Pre-symptomatic MRI can show WMH before clinical onset.
    </div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 2 — MELAS and Mitochondrial Stroke-Like Episodes (slides 7-9)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 7: MELAS Overview ────────────────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>MELAS &mdash; Mitochondrial Stroke-Like Episodes</h1>
  <div class="section-label">Not Vascular Occlusion &mdash; A Critical Distinction</div>

  <div class="stats-row" style="margin-bottom:24px;">
    <div class="stat-card" style="background:${COLORS.redLight}; border-color:${COLORS.red};">
      <div class="stat-label">Most Common Variant</div>
      <div class="stat-value" style="font-size:22px;">m.3243A&gt;G</div>
      <div style="font-size:15px; color:${COLORS.muted}; margin-top:4px;">~80% of MELAS (MT-TL1)</div>
    </div>
    <div class="stat-card" style="background:${COLORS.amberLight}; border-color:${COLORS.amber};">
      <div class="stat-label">Inheritance</div>
      <div class="stat-value" style="font-size:22px;">Maternal</div>
      <div style="font-size:15px; color:${COLORS.muted}; margin-top:4px;">Variable heteroplasmy</div>
    </div>
    <div class="stat-card" style="background:${COLORS.violetLight}; border-color:${COLORS.violet};">
      <div class="stat-label">Blood Testing</div>
      <div class="stat-value" style="font-size:22px;">Unreliable</div>
      <div style="font-size:15px; color:${COLORS.muted}; margin-top:4px;">Use muscle or urinary sediment</div>
    </div>
  </div>

  <div class="card card-red" style="padding:28px;">
    <div class="card-title" style="font-size:24px;">CRITICAL: Thrombolytics Are Contraindicated</div>
    <div class="card-body" style="font-size:20px; line-height:1.6;">
      Stroke-like episodes (SLEs) are caused by <strong>focal mitochondrial dysfunction</strong> causing cytotoxic and vasogenic edema &mdash; NOT vascular occlusion. Thrombolytics could cause hemorrhage. The mechanism is focal neuronal energy failure, not thrombus.
    </div>
  </div>
`));

// ── Slide 8: MELAS vs Ischemic Stroke ──────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Differentiating MELAS from Ischemic Stroke</h1>
  <div class="section-label">MRI &amp; Clinical Clues</div>

  <div class="two-col" style="margin-top:12px;">
    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">MRI Differentiation</div>
      <div class="card-body" style="font-size:18px; line-height:1.7;">
        &bull; DWI cortical signal <strong>crossing vascular boundaries</strong> (often occipital/parietal)<br>
        &bull; Basal ganglia calcification<br>
        &bull; <strong>Lactate peak on MRS</strong><br>
        &bull; Signal evolves over days&ndash;weeks (unlike acute infarct)<br>
        &bull; Non-vascular territory distribution
      </div>
    </div>

    <div class="card card-amber" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Clinical Clues Suggesting MELAS</div>
      <div class="card-body" style="font-size:18px; line-height:1.7;">
        &bull; <strong>Young patient</strong><br>
        &bull; Cortical blindness or hemianopia<br>
        &bull; Seizures during episode<br>
        &bull; <strong>Hearing loss, diabetes, short stature</strong><br>
        &bull; Elevated serum lactate<br>
        &bull; Family history: maternal inheritance pattern
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Key Distinction</div>
    <div class="value" style="font-size:20px;">Ischemic stroke follows a single vascular territory &mdash; MELAS SLEs cross vascular boundaries and favor parieto-occipital cortex</div>
  </div>
`));

// ── Slide 9: MELAS Acute Management ────────────────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>MELAS &mdash; Stroke-Specific Management</h1>
  <div class="section-label">Acute Treatment &amp; Medications to Avoid</div>

  <div class="two-col" style="margin-top:12px;">
    <div>
      <div class="card card-green" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">Acute SLE Treatment</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          &bull; <strong>IV L-arginine</strong> during acute SLE (nitric oxide precursor &mdash; reduces vascular component)<br>
          &bull; Aggressive seizure control<br>
          &bull; CoQ10, riboflavin, L-carnitine as supportive therapy<br>
          &bull; Hydration and metabolic support
        </div>
      </div>
    </div>

    <div>
      <div class="card card-red" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">Medications to AVOID</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          &bull; <strong>Thrombolytics</strong> (tPA) &mdash; NOT vascular occlusion<br>
          &bull; <strong>Valproate</strong> &mdash; inhibits complex I, worsens mitochondrial function<br>
          &bull; <strong>Metformin</strong> &mdash; worsens lactic acidosis<br>
          &bull; Propofol (prolonged infusion)
        </div>
      </div>
    </div>
  </div>

  <div class="card card-accent" style="padding:24px 28px; margin-top:8px;">
    <div class="card-title" style="font-size:20px;">Long-term Prevention</div>
    <div class="card-body" style="font-size:18px;">Oral L-arginine supplementation may reduce SLE frequency. Control seizures with mitochondria-safe anticonvulsants (levetiracetam, lacosamide). Address comorbidities: diabetes, hearing loss, cardiomyopathy.</div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 3 — Hereditary Coagulopathies and Vasculopathies (slides 10-12)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 10: Thrombophilias ─────────────────────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Hereditary Thrombophilias &amp; Stroke</h1>
  <div class="section-label">Factor V Leiden, Prothrombin G20210A &amp; MTHFR</div>

  <table style="margin-top:12px;">
    <thead>
      <tr>
        <th style="width:22%;">Condition</th>
        <th style="width:14%;">Gene</th>
        <th style="width:16%;">Prevalence</th>
        <th style="width:48%;">Key Points</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Factor V Leiden</td>
        <td style="font-weight:600;">F5</td>
        <td>5% European</td>
        <td style="font-size:16px;">APC resistance; venous &gt; arterial; predominantly <strong>venous sinus thrombosis</strong>; heterozygotes rarely need anticoagulation alone</td>
      </tr>
      <tr>
        <td>Prothrombin G20210A</td>
        <td style="font-weight:600;">F2</td>
        <td>~2% European</td>
        <td style="font-size:16px;">Venous &gt; arterial; combined with FVL substantially increases VTE risk</td>
      </tr>
      <tr style="background:${COLORS.amberLight};">
        <td style="color:${COLORS.amber}; font-weight:800;">MTHFR C677T</td>
        <td style="font-weight:600;">MTHFR</td>
        <td>Common</td>
        <td style="font-size:16px;"><strong>NOT an independent stroke risk factor</strong> when homocysteine is normal. Measure homocysteine directly instead. Testing not recommended for stroke workup.</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:20px;">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:20px;">MTHFR C677T is one of the most over-interpreted genetic variants in clinical medicine. If homocysteine is normal, no intervention is needed.</div>
  </div>
`));

// ── Slide 11: Fabry Disease & COL4A1/A2 ──────────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Vasculopathies: Fabry Disease &amp; COL4A1/A2</h1>
  <div class="section-label">Treatable Causes of Young Stroke</div>

  <div class="two-col" style="margin-top:12px;">
    <div class="card card-green" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Fabry Disease (GLA, X-linked)</div>
      <div class="card-body" style="font-size:18px; line-height:1.7;">
        <strong>Alpha-galactosidase A deficiency</strong><br><br>
        &bull; Stroke in 3rd&ndash;4th decade due to small vessel lipid deposition<br>
        &bull; Acroparesthesias (burning hands/feet)<br>
        &bull; Angiokeratomas, corneal opacity<br>
        &bull; Progressive renal disease<br><br>
        <strong style="color:${COLORS.green};">Enzyme replacement therapy (agalsidase) is available</strong> &mdash; genetic diagnosis has direct treatment implications.
      </div>
    </div>

    <div class="card card-violet" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">COL4A1/COL4A2 (AD)</div>
      <div class="card-body" style="font-size:18px; line-height:1.7;">
        &bull; Hereditary porencephaly<br>
        &bull; Small vessel disease<br>
        &bull; <strong>Intracerebral hemorrhage</strong><br>
        &bull; MRI: periventricular WMH and microbleeds<br><br>
        Also associated with renal disease (HANAC syndrome for COL4A1).<br><br>
        <strong>Important:</strong> Consider in young patients with hemorrhagic stroke + white matter disease.
      </div>
    </div>
  </div>
`));

// ── Slide 12: Sickle Cell, DADA2 & Moyamoya ─────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>Sickle Cell Disease, DADA2 &amp; Moyamoya</h1>
  <div class="section-label">Additional Vasculopathies Causing Stroke</div>

  <div style="display:flex; flex-direction:column; gap:14px; margin-top:8px;">
    <div class="card card-red" style="display:flex; gap:24px; padding:24px 28px;">
      <div class="number-circle" style="background:${COLORS.red};">1</div>
      <div style="flex:1;">
        <div class="card-title" style="font-size:21px;">Sickle Cell Disease (HBB)</div>
        <div class="card-body" style="font-size:18px;">TCD screening in children: velocities &gt;200 cm/s predict stroke risk. <strong>Chronic transfusion therapy</strong> (HbS &lt;30%) reduces first stroke risk by ~90% (STOP trial). Hemoglobin electrophoresis for diagnosis.</div>
      </div>
    </div>

    <div class="card card-amber" style="display:flex; gap:24px; padding:24px 28px;">
      <div class="number-circle" style="background:${COLORS.amber};">2</div>
      <div style="flex:1;">
        <div class="card-title" style="font-size:21px;">DADA2 (ADA2, Autosomal Recessive)</div>
        <div class="card-body" style="font-size:18px;">Vasculitis with recurrent ischemic &amp; hemorrhagic stroke, fever, livedo reticularis. <strong>TNF inhibitors</strong> (etanercept) are first-line &mdash; dramatically reduce stroke recurrence. Anticoagulation is dangerous (vessel fragility).</div>
      </div>
    </div>

    <div class="card card-accent" style="display:flex; gap:24px; padding:24px 28px;">
      <div class="number-circle" style="background:${mc.accent};">3</div>
      <div style="flex:1;">
        <div class="card-title" style="font-size:21px;">Moyamoya (RNF213, ACTA2, NF1)</div>
        <div class="card-body" style="font-size:18px;">Progressive stenosis of internal carotid arteries with collateral &ldquo;puff of smoke&rdquo; vessels. Can be isolated (RNF213) or syndromic (NF1, Down syndrome, sickle cell). Revascularization surgery is the primary treatment.</div>
      </div>
    </div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 4 — Genetic Workup & Secondary Prevention in Young Stroke (13-15)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 13: Stepwise Genetic Workup ────────────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Stepwise Genetic Workup for Young Stroke</h1>
  <div class="section-label">Tiered Approach to Maximize Diagnostic Yield</div>

  <div style="display:flex; flex-direction:column; gap:14px; margin-top:8px;">
    <div class="card card-accent" style="display:flex; gap:24px; padding:24px 28px;">
      <div class="number-circle" style="background:${mc.accent};">1</div>
      <div style="flex:1;">
        <div class="card-title" style="font-size:21px;">First-Tier: Standard Workup</div>
        <div class="card-body" style="font-size:18px;">MRI, echo, ECG, Holter, carotid/vertebral imaging. CBC, BMP, LFTs, ESR/CRP. Homocysteine, lipids. Hemoglobin electrophoresis in appropriate populations.</div>
      </div>
    </div>

    <div class="card card-amber" style="display:flex; gap:24px; padding:24px 28px;">
      <div class="number-circle" style="background:${COLORS.amber};">2</div>
      <div style="flex:1;">
        <div class="card-title" style="font-size:21px;">Second-Tier: Targeted Testing</div>
        <div class="card-body" style="font-size:18px;">Lactate/pyruvate &amp; CSF lactate (MELAS). Thrombophilia panel (FVL, prothrombin G20210A, antithrombin, protein C/S). NOTCH3 sequencing if CADASIL suspected on MRI.</div>
      </div>
    </div>

    <div class="card card-violet" style="display:flex; gap:24px; padding:24px 28px;">
      <div class="number-circle" style="background:${COLORS.violet};">3</div>
      <div style="flex:1;">
        <div class="card-title" style="font-size:21px;">Third-Tier: Comprehensive Genetic Testing</div>
        <div class="card-body" style="font-size:18px;">Alpha-galactosidase A activity/GLA sequencing (Fabry). mtDNA sequencing. COL4A1/2 sequencing. Stroke gene panel or exome for cryptogenic young stroke.</div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:12px;">
    <div class="label">Note</div>
    <div class="value" style="font-size:18px;">Acute stroke and anticoagulation affect protein C/S levels &mdash; defer thrombophilia testing until stable and off anticoagulation when possible</div>
  </div>
`));

// ── Slide 14: Secondary Prevention by Mechanism ─────────────────────────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>Secondary Prevention by Genetic Mechanism</h1>
  <div class="section-label">Tailored Management Based on Diagnosis</div>

  <table style="margin-top:12px;">
    <thead>
      <tr>
        <th style="width:25%;">Mechanism</th>
        <th style="width:25%;">Condition</th>
        <th style="width:50%;">Secondary Prevention Strategy</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Small vessel disease</td>
        <td>CADASIL</td>
        <td style="font-size:16px;">Antiplatelet (aspirin), statins, BP control; <strong>no anticoagulation</strong></td>
      </tr>
      <tr>
        <td>Mitochondrial SLE</td>
        <td>MELAS</td>
        <td style="font-size:16px;"><strong>Oral L-arginine</strong> supplementation; avoid valproate, metformin</td>
      </tr>
      <tr>
        <td>Coagulopathy</td>
        <td>FVL, F2 mutation</td>
        <td style="font-size:16px;">Anticoagulation for venous events; <strong>avoid OCPs</strong> in women with thrombophilia</td>
      </tr>
      <tr>
        <td>Lysosomal storage</td>
        <td>Fabry disease</td>
        <td style="font-size:16px;"><strong>Enzyme replacement therapy</strong> (agalsidase) &mdash; directly therapeutic</td>
      </tr>
      <tr>
        <td>Vasculitis</td>
        <td>DADA2</td>
        <td style="font-size:16px;"><strong>TNF inhibitors</strong> (etanercept); avoid anticoagulation (hemorrhage risk)</td>
      </tr>
      <tr>
        <td>Hemoglobinopathy</td>
        <td>Sickle cell</td>
        <td style="font-size:16px;"><strong>Chronic transfusion</strong> (HbS &lt;30%); TCD screening in children</td>
      </tr>
    </tbody>
  </table>

  <div class="card card-green" style="margin-top:16px; padding:20px 28px;">
    <div class="card-title" style="font-size:20px;">Family Screening</div>
    <div class="card-body" style="font-size:18px;">All monogenic stroke diagnoses require cascade testing of at-risk family members. Genetic counseling should address inheritance, predictive testing, and reproductive implications.</div>
  </div>
`));

// ── Slide 15: Key Takeaways ──────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 15, TOTAL, [
  {
    title: "Red flags identify genetic stroke candidates",
    body: "Age <45, recurrent strokes, family history, systemic features, and characteristic MRI patterns should trigger genetic evaluation.",
  },
  {
    title: "CADASIL is the most common hereditary stroke in adults",
    body: "NOTCH3 cysteine-altering variants cause progressive small vessel disease. Anterior temporal and external capsule WMH are characteristic.",
  },
  {
    title: "MELAS SLEs are NOT vascular occlusion",
    body: "Thrombolytics are contraindicated. IV L-arginine is the acute treatment. Avoid valproate and metformin.",
  },
  {
    title: "Some genetic stroke causes are directly treatable",
    body: "Fabry \u2192 enzyme replacement, DADA2 \u2192 TNF inhibitors, sickle cell \u2192 chronic transfusion. Diagnosis changes management.",
  },
  {
    title: "Use a tiered workup approach in young stroke",
    body: "Standard workup \u2192 targeted testing (lactate, thrombophilia, NOTCH3) \u2192 comprehensive genetic panels/exome for cryptogenic cases.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
