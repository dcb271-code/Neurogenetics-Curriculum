/**
 * scripts/gen-stroke.mjs
 *
 * Generates 15 clean, readable slides for the Stroke (Monogenic Stroke) module.
 * Uses puppeteer HTML rendering via the shared design system.
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

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Monogenic Stroke",
  subtitle: "Genetic causes of pediatric and young-adult stroke — from differential diagnosis through functional confirmation",
  totalSlides: TOTAL,
  topics: [
    "Differential diagnosis of monogenic stroke",
    "Autosomal recessive inheritance patterns",
    "Multi-gene panel interpretation via OMIM",
    "Functional & biochemical testing for VUS",
    "DADA2: diagnosis and management",
  ],
}));

// ── Slide 2: Learning Objectives ───────────────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Learning Objectives</h1>
  <div class="section-label">What You Will Learn</div>

  <div style="display:flex; flex-direction:column; gap:16px; margin-top:12px;">
    <div class="card card-accent" style="display:flex; gap:18px; align-items:flex-start; padding:20px 24px;">
      <div class="number-circle" style="background:${mc.accent};">1</div>
      <div>
        <div class="card-title" style="font-size:20px;">Differential Diagnosis</div>
        <div class="card-body" style="font-size:18px;">Recognize the major monogenic causes of stroke in children and young adults</div>
      </div>
    </div>
    <div class="card card-green" style="display:flex; gap:18px; align-items:flex-start; padding:20px 24px;">
      <div class="number-circle" style="background:${COLORS.green};">2</div>
      <div>
        <div class="card-title" style="font-size:20px;">AR Inheritance</div>
        <div class="card-body" style="font-size:18px;">Identify autosomal recessive inheritance patterns, including consanguinity and coefficient of inbreeding</div>
      </div>
    </div>
    <div class="card card-violet" style="display:flex; gap:18px; align-items:flex-start; padding:20px 24px;">
      <div class="number-circle" style="background:${COLORS.violet};">3</div>
      <div>
        <div class="card-title" style="font-size:20px;">Multi-Gene Panel Interpretation</div>
        <div class="card-body" style="font-size:18px;">Interpret stroke gene panel results using OMIM and systematic variant classification</div>
      </div>
    </div>
    <div class="card card-amber" style="display:flex; gap:18px; align-items:flex-start; padding:20px 24px;">
      <div class="number-circle" style="background:${COLORS.amber};">4</div>
      <div>
        <div class="card-title" style="font-size:20px;">Functional Studies for VUS</div>
        <div class="card-body" style="font-size:18px;">Understand when and how to order functional/biochemical testing to resolve variants of uncertain significance</div>
      </div>
    </div>
  </div>
`));

// ── Slide 3: Monogenic Causes — Vascular & Connective Tissue ───────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Monogenic Causes — Vascular &amp; Connective Tissue</h1>
  <div class="section-label">Category 1</div>

  <table>
    <thead>
      <tr>
        <th style="width:30%;">Condition</th>
        <th style="width:20%;">Gene</th>
        <th style="width:50%;">Key Features</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>CADASIL</td>
        <td style="font-weight:600; color:${mc.dark};">NOTCH3</td>
        <td style="font-size:17px;">Cerebral small vessel disease, migraine with aura, white matter lesions; AD</td>
      </tr>
      <tr>
        <td>CARASIL</td>
        <td style="font-weight:600; color:${mc.dark};">HTRA1</td>
        <td style="font-size:17px;">Spondylosis, alopecia, white matter disease; AR — earlier onset than CADASIL</td>
      </tr>
      <tr>
        <td>Fabry Disease</td>
        <td style="font-weight:600; color:${mc.dark};">GLA</td>
        <td style="font-size:17px;">X-linked; acroparesthesias, renal failure, cardiomyopathy, cryptogenic stroke</td>
      </tr>
      <tr>
        <td>Aicardi-Gouti&egrave;res</td>
        <td style="font-weight:600; color:${mc.dark};">Multiple</td>
        <td style="font-size:17px;">TREX1, RNASEH2A/B/C, SAMHD1, ADAR, IFIH1 — interferonopathy</td>
      </tr>
      <tr>
        <td>Neurofibromatosis 1</td>
        <td style="font-weight:600; color:${mc.dark};">NF1</td>
        <td style="font-size:17px;">Moyamoya-type vasculopathy; stenosis of cerebral arteries</td>
      </tr>
      <tr>
        <td>COL4A1/A2 Disorders</td>
        <td style="font-weight:600; color:${mc.dark};">COL4A1, COL4A2</td>
        <td style="font-size:17px;">Porencephaly, small vessel disease, hemorrhagic stroke; AD</td>
      </tr>
    </tbody>
  </table>
`));

// ── Slide 4: Monogenic Causes — Metabolic & Coagulation ────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Monogenic Causes — Metabolic &amp; Coagulation</h1>
  <div class="section-label">Category 2</div>

  <div class="two-col">
    <div>
      <h3 style="color:${mc.dark}; margin-bottom:14px;">Metabolic</h3>
      <div class="card card-accent" style="margin-bottom:12px;">
        <div class="card-title" style="font-size:20px;">MELAS (MT-TL1)</div>
        <div class="card-body" style="font-size:17px;">Mitochondrial encephalopathy with stroke-like episodes; maternal inheritance</div>
      </div>
      <div class="card card-accent" style="margin-bottom:12px;">
        <div class="card-title" style="font-size:20px;">Leigh Syndrome</div>
        <div class="card-body" style="font-size:17px;">Basal ganglia necrosis; multiple gene causes; mitochondrial or nuclear</div>
      </div>
      <div class="card card-accent" style="margin-bottom:12px;">
        <div class="card-title" style="font-size:20px;">Organic Acidemias</div>
        <div class="card-body" style="font-size:17px;">Metabolic stroke in basal ganglia during metabolic crisis</div>
      </div>
      <div class="card card-red" style="margin-bottom:12px;">
        <div class="card-title" style="font-size:20px;">DADA2 (ADA2)</div>
        <div class="card-body" style="font-size:17px;">Vasculitis, recurrent stroke, fever — AR; key diagnosis in this module</div>
      </div>
      <div class="card card-accent">
        <div class="card-title" style="font-size:20px;">Homocystinuria (CBS)</div>
        <div class="card-body" style="font-size:17px;">Thromboembolism, lens subluxation, marfanoid habitus</div>
      </div>
    </div>

    <div>
      <h3 style="color:${mc.dark}; margin-bottom:14px;">Coagulation / Thrombophilia</h3>
      <div class="card card-violet" style="margin-bottom:12px;">
        <div class="card-title" style="font-size:20px;">Protein C Deficiency</div>
        <div class="card-body" style="font-size:17px;">Venous & arterial thrombosis; neonatal purpura fulminans if severe</div>
      </div>
      <div class="card card-violet" style="margin-bottom:12px;">
        <div class="card-title" style="font-size:20px;">Protein S Deficiency</div>
        <div class="card-body" style="font-size:17px;">Venous thromboembolism; similar phenotype to Protein C deficiency</div>
      </div>
      <div class="card card-violet" style="margin-bottom:12px;">
        <div class="card-title" style="font-size:20px;">Antithrombin Deficiency</div>
        <div class="card-body" style="font-size:17px;">Most thrombogenic inherited thrombophilia; venous predominant</div>
      </div>
      <div class="card card-violet" style="margin-bottom:12px;">
        <div class="card-title" style="font-size:20px;">Factor V Leiden</div>
        <div class="card-body" style="font-size:17px;">Activated protein C resistance; most common inherited thrombophilia</div>
      </div>
      <div class="card card-violet">
        <div class="card-title" style="font-size:20px;">Plasminogen Deficiency</div>
        <div class="card-body" style="font-size:17px;">Impaired fibrinolysis; ligneous conjunctivitis; rare cause of stroke</div>
      </div>
    </div>
  </div>
`, `
  .card { padding: 14px 20px; margin-bottom: 10px; }
  .card-title { margin-bottom: 4px; }
  .card-body { font-size: 16px !important; line-height: 1.4; }
`));

// ── Slide 5: Case Presentation ─────────────────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Case Presentation</h1>
  <div class="section-label">Clinical Vignette</div>

  <div class="two-col" style="margin-top:8px;">
    <div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Patient Demographics</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          <strong>Age:</strong> 6-year-old female<br>
          <strong>Presentation:</strong> Acute esotropia<br>
          <strong>Family:</strong> Consanguineous (South Asian)
        </div>
      </div>

      <div class="card card-red" style="padding:28px; margin-top:16px;">
        <div class="card-title" style="font-size:22px;">Imaging Findings</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          <strong>Acute:</strong> Midbrain lacunar infarct<br>
          <strong>Chronic:</strong> Prior thalamic infarction<br>
          <strong>Vascular:</strong> Vertebral artery tortuosity
        </div>
      </div>
    </div>

    <div>
      <div class="card card-amber" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Red Flags for Genetic Etiology</div>
        <div class="card-body">
          <ul style="list-style:none; padding:0;">
            <li style="font-size:19px; padding:6px 0;">&#x2022; Pediatric stroke without clear acquired cause</li>
            <li style="font-size:19px; padding:6px 0;">&#x2022; Recurrent infarcts in a child</li>
            <li style="font-size:19px; padding:6px 0;">&#x2022; Posterior circulation involvement</li>
            <li style="font-size:19px; padding:6px 0;">&#x2022; Arterial tortuosity on imaging</li>
            <li style="font-size:19px; padding:6px 0;">&#x2022; Consanguineous family</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 6: Progressive Course ────────────────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Progressive Clinical Course</h1>
  <div class="section-label">Serial Hospitalizations</div>

  <div style="display:flex; flex-direction:column; gap:20px; margin-top:16px;">
    <div class="card card-accent" style="display:flex; gap:24px; align-items:flex-start; padding:28px;">
      <div style="flex-shrink:0; width:120px; text-align:center;">
        <div style="font-size:14px; font-weight:700; color:${mc.accent}; text-transform:uppercase; letter-spacing:1.5px;">Admission 1</div>
        <div style="font-size:36px; font-weight:800; color:${mc.dark}; margin-top:4px;">Initial</div>
      </div>
      <div style="flex:1;">
        <div class="card-title" style="font-size:22px;">Multiple Infarcts</div>
        <div class="card-body" style="font-size:19px;">Midbrain lacunar infarct presenting as acute esotropia. Imaging revealed prior thalamic infarction — indicating recurrent, subclinical strokes.</div>
      </div>
    </div>

    <div class="card card-amber" style="display:flex; gap:24px; align-items:flex-start; padding:28px;">
      <div style="flex-shrink:0; width:120px; text-align:center;">
        <div style="font-size:14px; font-weight:700; color:${COLORS.amber}; text-transform:uppercase; letter-spacing:1.5px;">Admission 2</div>
        <div style="font-size:36px; font-weight:800; color:#92400e; margin-top:4px;">Repeat</div>
      </div>
      <div style="flex:1;">
        <div class="card-title" style="font-size:22px;">Repeat Infarct with Fever</div>
        <div class="card-body" style="font-size:19px;">New ischemic event associated with febrile illness — characteristic of vasculitic etiologies where inflammation triggers vascular compromise.</div>
      </div>
    </div>

    <div class="card card-red" style="display:flex; gap:24px; align-items:flex-start; padding:28px;">
      <div style="flex-shrink:0; width:120px; text-align:center;">
        <div style="font-size:14px; font-weight:700; color:${COLORS.red}; text-transform:uppercase; letter-spacing:1.5px;">Admission 3</div>
        <div style="font-size:36px; font-weight:800; color:${COLORS.red}; margin-top:4px;">SAH</div>
      </div>
      <div style="flex:1;">
        <div class="card-title" style="font-size:22px;">Subarachnoid Hemorrhage with Hydrocephalus</div>
        <div class="card-body" style="font-size:19px;">Hemorrhagic complication — progression from ischemic to hemorrhagic stroke signals severe vascular fragility and systemic vasculopathy.</div>
      </div>
    </div>
  </div>
`));

// ── Slide 7: Family Pedigree ───────────────────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Family Pedigree</h1>
  <div class="section-label">Consanguineous Family Structure</div>

  <div class="two-col" style="margin-top:12px;">
    <div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">3-Generation South Asian Family</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          <strong>Ethnicity:</strong> South Asian<br>
          <strong>Consanguinity:</strong> Double first cousins<br>
          <strong>Generations:</strong> Three generations documented
        </div>
      </div>

      <div class="card card-red" style="padding:28px; margin-top:16px;">
        <div class="card-title" style="font-size:22px;">Family History</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          <strong>Siblings:</strong> Intellectual disability<br>
          <strong>Reproductive:</strong> Miscarriage history<br>
          <strong>Congenital:</strong> Birth defects in relatives
        </div>
      </div>
    </div>

    <div>
      <div class="card card-amber" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Why This Pedigree Matters</div>
        <div class="card-body">
          <ul style="list-style:none; padding:0;">
            <li style="font-size:19px; padding:8px 0;">&#x2022; Double first cousins share <strong>1/8 of DNA</strong></li>
            <li style="font-size:19px; padding:8px 0;">&#x2022; Dramatically increases homozygosity</li>
            <li style="font-size:19px; padding:8px 0;">&#x2022; Multiple affected family members</li>
            <li style="font-size:19px; padding:8px 0;">&#x2022; Points strongly toward AR disorder</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 8: AR Inheritance ────────────────────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Autosomal Recessive Inheritance</h1>
  <div class="section-label">5 Key Features</div>

  <div style="display:flex; flex-direction:column; gap:14px; margin-top:8px;">
    <div class="card card-accent" style="display:flex; gap:18px; align-items:center; padding:20px 24px;">
      <div class="number-circle" style="background:${mc.accent};">1</div>
      <div>
        <div class="card-title" style="font-size:21px;">Multiple Affected Siblings</div>
        <div class="card-body" style="font-size:18px;">More than one child in a sibship may be affected — horizontal pattern</div>
      </div>
    </div>

    <div class="card card-accent" style="display:flex; gap:18px; align-items:center; padding:20px 24px;">
      <div class="number-circle" style="background:${mc.accent};">2</div>
      <div>
        <div class="card-title" style="font-size:21px;">One Generation Affected</div>
        <div class="card-body" style="font-size:18px;">Parents are typically unaffected carriers — disease appears in a single generation</div>
      </div>
    </div>

    <div class="card card-accent" style="display:flex; gap:18px; align-items:center; padding:20px 24px;">
      <div class="number-circle" style="background:${mc.accent};">3</div>
      <div>
        <div class="card-title" style="font-size:21px;">Both Sexes Equally Affected</div>
        <div class="card-body" style="font-size:18px;">Males and females affected in equal proportions — autosomal gene</div>
      </div>
    </div>

    <div class="card card-accent" style="display:flex; gap:18px; align-items:center; padding:20px 24px;">
      <div class="number-circle" style="background:${mc.accent};">4</div>
      <div>
        <div class="card-title" style="font-size:21px;">Consanguinity Increases Risk</div>
        <div class="card-body" style="font-size:18px;">Related parents are more likely to share the same rare pathogenic allele</div>
      </div>
    </div>

    <div class="card card-red" style="display:flex; gap:18px; align-items:center; padding:20px 24px;">
      <div class="number-circle" style="background:${COLORS.red};">5</div>
      <div>
        <div class="card-title" style="font-size:21px;">25% Recurrence Risk</div>
        <div class="card-body" style="font-size:18px;">Each pregnancy has a 1 in 4 chance of producing an affected child when both parents are carriers</div>
      </div>
    </div>
  </div>
`));

// ── Slide 9: Coefficient of Inbreeding ─────────────────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Coefficient of Inbreeding (F)</h1>
  <div class="section-label">Quantifying Consanguinity</div>

  <div style="margin-top:16px;">
    <table>
      <thead>
        <tr>
          <th style="width:40%;">Relationship</th>
          <th style="width:30%;">Coefficient (F)</th>
          <th style="width:30%;">Shared DNA</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background:${COLORS.redLight};">
          <td style="font-weight:800; color:${COLORS.red};">Double First Cousins</td>
          <td style="font-weight:800; color:${COLORS.red}; font-size:22px;">F = 0.125</td>
          <td style="font-size:17px;">12.5% — equivalent to half-siblings</td>
        </tr>
        <tr>
          <td>First Cousins</td>
          <td style="font-weight:700; font-size:20px;">F = 0.0625</td>
          <td style="font-size:17px;">6.25% — most common consanguinity</td>
        </tr>
        <tr>
          <td>First Cousins Once Removed</td>
          <td style="font-weight:700; font-size:20px;">F = 0.0313</td>
          <td style="font-size:17px;">3.13%</td>
        </tr>
        <tr>
          <td>Second Cousins</td>
          <td style="font-weight:700; font-size:20px;">F = 0.0156</td>
          <td style="font-size:17px;">1.56%</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="card card-red" style="margin-top:20px; padding:24px 28px;">
    <div class="card-title" style="font-size:22px;">This Case: Double First Cousins (F = 0.125)</div>
    <div class="card-body" style="font-size:19px;">The parents share as much DNA as half-siblings. Their offspring have a 12.5% chance of homozygosity at any given locus — dramatically increasing risk for rare AR conditions.</div>
  </div>
`));

// ── Slide 10: Genetic Results ──────────────────────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Genetic Testing Results</h1>
  <div class="section-label">Gene Panel Findings</div>

  <div class="highlight-box" style="margin-top:12px; margin-bottom:24px;">
    <div class="label">Variant Identified</div>
    <div class="value" style="font-size:22px; font-family:monospace;">ADA2 c.746T&gt;G &nbsp;(p.Leu249Arg) — Homozygous</div>
  </div>

  <div class="two-col">
    <div class="card card-amber" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Classification: VUS</div>
      <div class="card-body" style="font-size:19px; line-height:1.7;">
        Initially classified as a <strong>Variant of Uncertain Significance</strong>. Missense change in ADA2 — not previously reported in ClinVar at the time of testing.
      </div>
    </div>

    <div class="card card-violet" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">In Silico Predictions</div>
      <div class="card-body" style="font-size:19px; line-height:1.7;">
        <strong>SIFT:</strong> Deleterious<br>
        <strong>PolyPhen-2:</strong> Probably Damaging<br><br>
        Computational tools suggest functional impact — but alone are insufficient for clinical classification.
      </div>
    </div>
  </div>

  <div class="card card-red" style="margin-top:20px; padding:20px 28px;">
    <div class="card-title" style="font-size:20px;">Clinical Dilemma</div>
    <div class="card-body" style="font-size:18px;">A homozygous VUS in a gene matching the phenotype and inheritance — how do we resolve this? Functional studies are the next step.</div>
  </div>
`));

// ── Slide 11: Functional Studies ───────────────────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Functional Studies — ADA2 Enzyme Activity</h1>
  <div class="section-label">Resolving the VUS</div>

  <div class="three-col" style="margin-top:20px;">
    <div class="stat-card" style="border-color:${COLORS.red}; background:${COLORS.redLight}; text-align:center; padding:32px 24px;">
      <div class="stat-label">Patient (Homozygous)</div>
      <div class="stat-value" style="font-size:44px; margin-top:12px; color:${COLORS.red};">0.4</div>
      <div style="font-size:18px; color:${COLORS.muted}; margin-top:8px;">mU/mL</div>
    </div>
    <div class="stat-card" style="border-color:${COLORS.amber}; background:${COLORS.amberLight}; text-align:center; padding:32px 24px;">
      <div class="stat-label">Carriers (Parents)</div>
      <div class="stat-value" style="font-size:44px; margin-top:12px; color:${COLORS.amber};">5.7</div>
      <div style="font-size:18px; color:${COLORS.muted}; margin-top:8px;">mU/mL</div>
    </div>
    <div class="stat-card" style="border-color:${COLORS.green}; background:${COLORS.greenLight}; text-align:center; padding:32px 24px;">
      <div class="stat-label">Controls (Normal)</div>
      <div class="stat-value" style="font-size:44px; margin-top:12px; color:${COLORS.green};">20.9</div>
      <div style="font-size:18px; color:${COLORS.muted}; margin-top:8px;">mU/mL</div>
    </div>
  </div>

  <div class="card card-green" style="margin-top:28px; padding:24px 28px;">
    <div class="card-title" style="font-size:22px;">VUS Resolved: Functionally Deficient</div>
    <div class="card-body" style="font-size:19px;">Patient enzyme activity is <strong>~2% of normal</strong> — consistent with complete loss of function. Carrier levels are intermediate (~27% of normal), confirming gene dosage effect. The VUS can now be reclassified as <strong>Likely Pathogenic</strong>.</div>
  </div>
`));

// ── Slide 12: What is a Functional Study? ──────────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>What Is a Functional Study?</h1>
  <div class="section-label">Post-NGS Confirmation</div>

  <div class="two-col" style="margin-top:12px;">
    <div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Definition</div>
        <div class="card-body" style="font-size:19px;">A laboratory assay that directly measures the biological activity or consequence of a gene product — ordered <strong>after</strong> NGS identifies a candidate variant.</div>
      </div>

      <div class="card card-green" style="padding:28px; margin-top:16px;">
        <div class="card-title" style="font-size:22px;">Utility for VUS Resolution</div>
        <div class="card-body" style="font-size:19px;">Provides <strong>PS3/BS3 evidence</strong> (ACMG functional criterion) — one of the strongest lines of evidence for upgrading or downgrading a VUS.</div>
      </div>
    </div>

    <div>
      <div class="card card-violet" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Examples in Clinical Practice</div>
        <div class="card-body">
          <ul style="list-style:none; padding:0;">
            <li style="font-size:19px; padding:8px 0;"><strong>ADA2:</strong> Enzyme activity assay</li>
            <li style="font-size:19px; padding:8px 0;"><strong>OTC deficiency:</strong> Urea cycle metabolites, orotic acid</li>
            <li style="font-size:19px; padding:8px 0;"><strong>Mitochondrial (ETC):</strong> Respiratory chain enzyme analysis</li>
            <li style="font-size:19px; padding:8px 0;"><strong>CFTR:</strong> Sweat chloride testing</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 13: DADA2 ────────────────────────────────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>DADA2 — Deficiency of Adenosine Deaminase 2</h1>
  <div class="section-label">Disease Overview</div>

  <div class="two-col" style="margin-top:12px;">
    <div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Also Known As</div>
        <div class="card-body" style="font-size:19px;">Vasculitis, Autoinflammation, Immunodeficiency, and Hematologic defects with Stroke (<strong>VAIHS</strong>)</div>
      </div>

      <div class="card card-amber" style="padding:28px; margin-top:16px;">
        <div class="card-title" style="font-size:22px;">Key Clinical Features</div>
        <div class="card-body">
          <ul style="list-style:none; padding:0;">
            <li style="font-size:19px; padding:6px 0;">&#x2022; Recurrent fevers</li>
            <li style="font-size:19px; padding:6px 0;">&#x2022; Livedo reticularis / skin rash</li>
            <li style="font-size:19px; padding:6px 0;">&#x2022; Ischemic & hemorrhagic stroke</li>
            <li style="font-size:19px; padding:6px 0;">&#x2022; Hepatosplenomegaly</li>
            <li style="font-size:19px; padding:6px 0;">&#x2022; Early childhood onset</li>
          </ul>
        </div>
      </div>
    </div>

    <div>
      <div class="card card-red" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Critical Warning: Anticoagulation</div>
        <div class="card-body" style="font-size:19px; line-height:1.6;">
          Anticoagulant therapy for ischemic stroke in DADA2 patients carries a <strong>high risk of hemorrhagic stroke</strong>. The underlying vasculopathy causes vessel fragility — anticoagulation can be catastrophic.
        </div>
      </div>

      <div class="card card-green" style="padding:28px; margin-top:16px;">
        <div class="card-title" style="font-size:22px;">Inheritance</div>
        <div class="card-body" style="font-size:19px;">Autosomal recessive — biallelic pathogenic variants in <strong>ADA2</strong> (previously CECR1). Carrier frequency is low but enriched in certain populations.</div>
      </div>
    </div>
  </div>
`));

// ── Slide 14: DADA2 Treatment ──────────────────────────────────────────────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>DADA2 — Treatment &amp; Pathophysiology</h1>
  <div class="section-label">Targeted Therapy</div>

  <div class="two-col" style="margin-top:12px;">
    <div>
      <div class="card card-green" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">TNF Inhibition — Primary Treatment</div>
        <div class="card-body" style="font-size:19px; line-height:1.6;">
          Anti-TNF agents (etanercept, adalimumab) are the cornerstone of DADA2 management. They dramatically reduce stroke recurrence and systemic inflammation. Early initiation is critical.
        </div>
      </div>

      <div class="card card-accent" style="padding:28px; margin-top:16px;">
        <div class="card-title" style="font-size:22px;">Core Defect</div>
        <div class="card-body" style="font-size:19px; line-height:1.6;">
          ADA2 deficiency disrupts <strong>nucleotide metabolism</strong> — specifically the extracellular adenosine deaminase pathway. This leads to dysregulated inflammatory signaling and endothelial dysfunction.
        </div>
      </div>
    </div>

    <div>
      <div class="card card-violet" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">4 Downstream Pathways Affected</div>
        <div class="card-body">
          <ul style="list-style:none; padding:0;">
            <li style="font-size:19px; padding:10px 0; border-bottom:1px solid ${COLORS.border};">
              <strong style="color:${COLORS.violet};">1. Neutrophil Activation</strong><br>
              <span style="font-size:17px;">Dysregulated NETosis and tissue damage</span>
            </li>
            <li style="font-size:19px; padding:10px 0; border-bottom:1px solid ${COLORS.border};">
              <strong style="color:${COLORS.violet};">2. Macrophage Polarization</strong><br>
              <span style="font-size:17px;">Shift toward M1 pro-inflammatory phenotype</span>
            </li>
            <li style="font-size:19px; padding:10px 0; border-bottom:1px solid ${COLORS.border};">
              <strong style="color:${COLORS.violet};">3. TNF-&alpha; Overproduction</strong><br>
              <span style="font-size:17px;">Excessive inflammatory cytokine signaling</span>
            </li>
            <li style="font-size:19px; padding:10px 0;">
              <strong style="color:${COLORS.violet};">4. Endothelial Integrity Loss</strong><br>
              <span style="font-size:17px;">Vascular fragility and stroke risk</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 15: Key Takeaways ────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 15, TOTAL, [
  {
    title: "Monogenic stroke has a broad differential",
    body: "Vascular, connective tissue, metabolic, mitochondrial, and coagulation disorders can all present with pediatric stroke.",
  },
  {
    title: "Consanguinity and AR inheritance guide testing",
    body: "Family structure, coefficient of inbreeding, and pedigree analysis help prioritize AR gene candidates and predict recurrence risk.",
  },
  {
    title: "A VUS is not the end of the road",
    body: "Functional and biochemical studies (PS3 evidence) can resolve VUS — especially critical when the clinical phenotype matches the gene.",
  },
  {
    title: "DADA2 is a treatable cause of recurrent stroke",
    body: "TNF inhibition dramatically reduces stroke recurrence. Diagnosis requires enzyme activity testing; anticoagulation can be dangerous.",
  },
  {
    title: "Always consider monogenic causes in young stroke patients",
    body: "Especially with recurrence, family history, consanguinity, or systemic features (fever, rash, multi-organ involvement).",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
