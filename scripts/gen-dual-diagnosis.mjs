/**
 * scripts/gen-dual-diagnosis.mjs
 *
 * Generates 15 clean, readable slides for the Dual Diagnoses module.
 * Covers dual molecular diagnoses, blended phenotypes, VUS resolution
 * in treatable pathways, and multi-locus variation.
 * Condensed from ~30 original slides to 15 focused slides.
 *
 * Run: node scripts/gen-dual-diagnosis.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "dual-diagnosis";
const mc = MODULE_COLORS[MOD];
const TOTAL = 15;

const slides = [];

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Dual Molecular Diagnoses",
  subtitle: "Recognizing blended phenotypes when one genetic diagnosis doesn\u2019t explain the full clinical picture",
  totalSlides: TOTAL,
  topics: [
    "Recognizing multiple genetic diagnoses",
    "Exome sequencing as first-line testing",
    "Blended phenotype delineation",
    "VUS resolution in treatable pathways",
    "Multi-locus variation in literature",
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
        <div class="card-title" style="font-size:20px;">Recognize Multiple Genetic Diagnoses</div>
        <div class="card-body" style="font-size:18px;">Understand when a single molecular diagnosis does not fully explain the clinical phenotype</div>
      </div>
    </div>
    <div class="card card-green" style="display:flex; gap:18px; align-items:flex-start; padding:20px 24px;">
      <div class="number-circle" style="background:${COLORS.green};">2</div>
      <div>
        <div class="card-title" style="font-size:20px;">Interpret Genetic Variants in Context</div>
        <div class="card-body" style="font-size:18px;">Evaluate pathogenic variants, VUS, and secondary findings across multiple loci simultaneously</div>
      </div>
    </div>
    <div class="card card-violet" style="display:flex; gap:18px; align-items:flex-start; padding:20px 24px;">
      <div class="number-circle" style="background:${COLORS.violet};">3</div>
      <div>
        <div class="card-title" style="font-size:20px;">Delineate Blended Phenotypes</div>
        <div class="card-body" style="font-size:18px;">Map individual features to specific molecular diagnoses and identify overlapping manifestations</div>
      </div>
    </div>
    <div class="card card-amber" style="display:flex; gap:18px; align-items:flex-start; padding:20px 24px;">
      <div class="number-circle" style="background:${COLORS.amber};">4</div>
      <div>
        <div class="card-title" style="font-size:20px;">Appreciate Intrafamilial &amp; Interfamilial Variability</div>
        <div class="card-body" style="font-size:18px;">Understand how different variant combinations in families produce variable phenotypic outcomes</div>
      </div>
    </div>
  </div>
`));

// ── Slide 3: Case Presentation ─────────────────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Case Presentation</h1>
  <div class="section-label">Complex Neurodevelopmental Phenotype</div>

  <div class="card card-amber" style="margin-bottom:24px;">
    <div class="card-title" style="font-size:24px;">2-Year-Old Female</div>
    <div class="card-body" style="font-size:20px;">
      Referred for evaluation of <strong>drug-resistant focal epilepsy</strong> with multiple additional neurological features.
    </div>
  </div>

  <div class="two-col">
    <div>
      <h3>Neurological Features</h3>
      <ul class="bullet-list">
        <li>Drug-resistant focal epilepsy</li>
        <li>Paroxysmal hemiplegia</li>
        <li>Dystonia</li>
        <li>Monocular nystagmus</li>
      </ul>
    </div>
    <div>
      <h3>Additional Features</h3>
      <ul class="bullet-list">
        <li>Moderate sensorineural hearing loss (SNHL)</li>
        <li>Global developmental delay</li>
        <li>No words or babbling at 2 years</li>
      </ul>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Key Question</div>
    <div class="value" style="font-size:22px;">Can a single genetic diagnosis explain all of these features?</div>
  </div>
`));

// ── Slide 4: HPI Details ───────────────────────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>History of Present Illness</h1>
  <div class="section-label">Timeline of Symptom Emergence</div>

  <div style="display:flex; flex-direction:column; gap:20px; margin-top:16px;">
    <div class="card card-accent" style="display:flex; gap:24px; align-items:flex-start; padding:28px;">
      <div style="flex-shrink:0; width:120px; text-align:center;">
        <div style="font-size:14px; font-weight:700; color:${mc.accent}; text-transform:uppercase; letter-spacing:1.5px;">Age</div>
        <div style="font-size:36px; font-weight:800; color:${mc.dark}; margin-top:4px;">3 mo</div>
      </div>
      <div style="flex:1;">
        <div class="card-title" style="font-size:22px;">Seizure Onset</div>
        <div class="card-body" style="font-size:19px;">Focal seizures beginning at 3 months of age. Refractory to multiple antiseizure medications including levetiracetam and oxcarbazepine.</div>
      </div>
    </div>

    <div class="card card-amber" style="display:flex; gap:24px; align-items:flex-start; padding:28px;">
      <div style="flex-shrink:0; width:120px; text-align:center;">
        <div style="font-size:14px; font-weight:700; color:${COLORS.amber}; text-transform:uppercase; letter-spacing:1.5px;">Age</div>
        <div style="font-size:36px; font-weight:800; color:#92400e; margin-top:4px;">7 mo</div>
      </div>
      <div style="flex:1;">
        <div class="card-title" style="font-size:22px;">Paroxysmal Hemiplegia</div>
        <div class="card-body" style="font-size:19px;">Episodes of alternating hemiplegia with onset at 7 months. Episodes resolve with sleep. Associated dystonic posturing noted.</div>
      </div>
    </div>

    <div class="card card-red" style="display:flex; gap:24px; align-items:flex-start; padding:28px;">
      <div style="flex-shrink:0; width:120px; text-align:center;">
        <div style="font-size:14px; font-weight:700; color:${COLORS.red}; text-transform:uppercase; letter-spacing:1.5px;">Age</div>
        <div style="font-size:36px; font-weight:800; color:${COLORS.red}; margin-top:4px;">2 yr</div>
      </div>
      <div style="flex:1;">
        <div class="card-title" style="font-size:22px;">Language &amp; Hearing Concerns</div>
        <div class="card-body" style="font-size:19px;">No babbling or words at 2 years. Failed newborn hearing screen &mdash; audiometry confirms moderate bilateral SNHL.</div>
      </div>
    </div>
  </div>
`));

// ── Slide 5: Exome as First-Line Test ──────────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Exome as First-Line Test</h1>
  <div class="section-label">Testing Strategy for Complex Phenotypes</div>

  <div class="card card-accent" style="margin-bottom:24px;">
    <div class="card-title" style="font-size:22px;">Why Exome (Preferably Trio) Is Optimal Here</div>
    <div class="card-body" style="font-size:19px;">
      Complex NDDs with <strong>multiple organ systems involved</strong> benefit most from broad genomic analysis rather than sequential single-gene or panel testing.
    </div>
  </div>

  <div class="two-col">
    <div>
      <div class="card card-green" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:20px;">Advantages of Trio Exome</div>
        <div class="card-body" style="font-size:17px;">
          &bull; Detects variants across all genes simultaneously<br>
          &bull; Parental data enables de novo identification<br>
          &bull; Phasing of compound heterozygous variants<br>
          &bull; Higher yield than sequential panels
        </div>
      </div>
    </div>
    <div>
      <div class="card card-red" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:20px;">Sequential Testing: Limitations</div>
        <div class="card-body" style="font-size:17px;">
          &bull; Stops after first positive result<br>
          &bull; Misses second or third diagnoses<br>
          &bull; Prolonged diagnostic odyssey<br>
          &bull; Higher cumulative cost
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:8px;">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:22px;">When the phenotype is too complex for one condition &mdash; exome can uncover multiple molecular diagnoses in a single test</div>
  </div>
`));

// ── Slide 6: Genetic Results ───────────────────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Genetic Results</h1>
  <div class="section-label">Trio Exome Sequencing &mdash; 3 Findings</div>

  <table style="margin-top:16px;">
    <thead>
      <tr>
        <th style="width:16%;">Gene</th>
        <th style="width:22%;">Variant</th>
        <th style="width:16%;">Zygosity</th>
        <th style="width:16%;">Inheritance</th>
        <th style="width:16%;">Classification</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>ATP1A3</td>
        <td style="font-size:17px;">Missense (de novo)</td>
        <td>Heterozygous</td>
        <td>AD</td>
        <td style="color:${COLORS.red}; font-weight:700;">Pathogenic</td>
      </tr>
      <tr>
        <td>USH2A</td>
        <td style="font-size:17px;">Homozygous (biallelic)</td>
        <td>Homozygous</td>
        <td>AR</td>
        <td style="color:${COLORS.red}; font-weight:700;">Pathogenic</td>
      </tr>
      <tr>
        <td>MTOR</td>
        <td style="font-size:17px;">Missense (de novo)</td>
        <td>Heterozygous</td>
        <td>AD</td>
        <td style="color:${COLORS.amber}; font-weight:700;">VUS</td>
      </tr>
    </tbody>
  </table>

  <div class="three-col" style="margin-top:24px;">
    <div class="card card-red">
      <div class="card-title" style="font-size:20px;">ATP1A3 &mdash; Confirmed</div>
      <div class="card-body" style="font-size:17px;">Alternating hemiplegia of childhood. De novo, well-established gene-disease.</div>
    </div>
    <div class="card card-violet">
      <div class="card-title" style="font-size:20px;">USH2A &mdash; Confirmed</div>
      <div class="card-body" style="font-size:17px;">Usher syndrome type 2A. Both parents are carriers. Explains hearing loss.</div>
    </div>
    <div class="card card-amber">
      <div class="card-title" style="font-size:20px;">MTOR &mdash; Uncertain</div>
      <div class="card-body" style="font-size:17px;">VUS in mTOR pathway. De novo. Needs further evaluation for clinical relevance.</div>
    </div>
  </div>
`));

// ── Slide 7: ATP1A3 — Alternating Hemiplegia of Childhood ──────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>ATP1A3 &mdash; Alternating Hemiplegia of Childhood</h1>
  <div class="section-label">Revised 2021 Diagnostic Criteria</div>

  <div class="two-col" style="margin-top:12px;">
    <div>
      <div class="card card-red" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">Essential Criteria</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          <strong>&bull;</strong> Onset before 18 months of age<br>
          <strong>&bull;</strong> Repeated hemiplegic attacks
        </div>
      </div>

      <div class="card card-amber" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Major Criteria</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          <strong>&bull;</strong> Bilateral hemiplegic episodes<br>
          <strong>&bull;</strong> Resolution of symptoms with sleep
        </div>
      </div>
    </div>

    <div>
      <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">Minor Criteria</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          <strong>&bull;</strong> Monocular nystagmus<br>
          <strong>&bull;</strong> Dystonia<br>
          <strong>&bull;</strong> Autonomic features<br>
          <strong>&bull;</strong> Epilepsy
        </div>
      </div>

      <div class="card card-green" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Our Patient</div>
        <div class="card-body" style="font-size:19px;">
          Meets <strong>both essential</strong> + <strong>both major</strong> + <strong>3 minor</strong> criteria (nystagmus, dystonia, epilepsy)
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 8: USH2A — Usher Syndrome Type 2A ────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>USH2A &mdash; Usher Syndrome Type 2A</h1>
  <div class="section-label">Most Common Cause of Deaf-Blindness</div>

  <div class="stats-row" style="margin-bottom:24px;">
    <div class="stat-card" style="background:${COLORS.violetLight}; border-color:${COLORS.violet};">
      <div class="stat-label">Inheritance</div>
      <div class="stat-value">Autosomal Recessive</div>
    </div>
    <div class="stat-card" style="background:${COLORS.amberLight}; border-color:${COLORS.amber};">
      <div class="stat-label">USH2A Accounts For</div>
      <div class="stat-value">~50% of Usher 2</div>
    </div>
    <div class="stat-card" style="background:${COLORS.redLight}; border-color:${COLORS.red};">
      <div class="stat-label">Prevalence</div>
      <div class="stat-value">1 in 10,000</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Clinical Features</div>
      <div class="card-body" style="font-size:19px; line-height:1.7;">
        <strong>&bull;</strong> Congenital moderate-to-severe SNHL<br>
        <strong>&bull;</strong> Progressive retinitis pigmentosa (RP)<br>
        <strong>&bull;</strong> RP onset typically in adolescence<br>
        <strong>&bull;</strong> Normal vestibular function (unlike Usher 1)
      </div>
    </div>

    <div class="card card-red" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Management Implications</div>
      <div class="card-body" style="font-size:19px; line-height:1.7;">
        <strong>&bull;</strong> Urgent ophthalmology referral for RP screening<br>
        <strong>&bull;</strong> Hearing aids or cochlear implant evaluation<br>
        <strong>&bull;</strong> Monitor visual fields longitudinally<br>
        <strong>&bull;</strong> Genetic counseling for AR recurrence (25%)
      </div>
    </div>
  </div>
`));

// ── Slide 9: Dual Diagnoses = Blended Phenotypes ───────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Dual Diagnoses = Blended Phenotypes</h1>
  <div class="section-label">Mapping Features to Molecular Diagnoses</div>

  <div class="three-col" style="margin-top:16px;">
    <div class="card card-red" style="padding:28px;">
      <div class="card-title" style="font-size:20px;">ATP1A3 (AHC)</div>
      <div class="card-body" style="font-size:18px; line-height:1.6;">
        <strong>&bull;</strong> Epilepsy (focal, drug-resistant)<br>
        <strong>&bull;</strong> Paroxysmal hemiplegia<br>
        <strong>&bull;</strong> Dystonia<br>
        <strong>&bull;</strong> Monocular nystagmus<br>
        <strong>&bull;</strong> Developmental delay
      </div>
    </div>

    <div style="display:flex; flex-direction:column; justify-content:center; align-items:center;">
      <div style="background:${mc.light}; border:2px solid ${mc.accent}; border-radius:12px; padding:24px 20px; text-align:center;">
        <div style="font-size:16px; font-weight:700; color:${mc.accent}; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px;">Overlap</div>
        <div style="font-size:19px; color:${COLORS.heading}; line-height:1.6;">
          <strong>Global developmental delay</strong><br>
          <span style="font-size:17px; color:${COLORS.muted};">Both conditions contribute to language and motor delays</span>
        </div>
      </div>
    </div>

    <div class="card card-violet" style="padding:28px;">
      <div class="card-title" style="font-size:20px;">USH2A (Usher 2A)</div>
      <div class="card-body" style="font-size:18px; line-height:1.6;">
        <strong>&bull;</strong> Sensorineural hearing loss<br>
        <strong>&bull;</strong> Future retinitis pigmentosa risk<br>
        <strong>&bull;</strong> Language delay (from hearing loss)<br>
        <br>
        <span style="font-size:17px; color:${COLORS.muted};">SNHL not explained by AHC alone</span>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:20px;">
    <div class="label">Key Insight</div>
    <div class="value" style="font-size:22px;">The SNHL was the critical clue that a second diagnosis existed &mdash; this feature is not part of AHC</div>
  </div>
`));

// ── Slide 10: Prevalence of Dual Diagnoses ─────────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Prevalence of Dual Diagnoses</h1>
  <div class="section-label">Evidence from Large Exome Studies</div>

  <div class="stats-row" style="margin-bottom:28px;">
    <div class="stat-card" style="background:${mc.light}; border-color:${mc.accent};">
      <div class="stat-label">Dual Diagnoses Rate</div>
      <div class="stat-value" style="font-size:40px;">~5%</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">of exome-diagnosed patients</div>
    </div>
    <div class="stat-card" style="background:${COLORS.redLight}; border-color:${COLORS.red};">
      <div class="stat-label">Higher In</div>
      <div class="stat-value" style="font-size:28px;">Consanguineous</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">families with homozygosity</div>
    </div>
    <div class="stat-card" style="background:${COLORS.greenLight}; border-color:${COLORS.green};">
      <div class="stat-label">Source</div>
      <div class="stat-value" style="font-size:22px;">Posey et al.</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">NEJM 2017</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Key Finding</div>
      <div class="card-body" style="font-size:19px;">
        Among 7,374 patients who received a molecular diagnosis via exome sequencing, approximately <strong>5% had two or more independent genetic diagnoses</strong> contributing to their phenotype.
      </div>
    </div>

    <div class="card card-amber" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Clinical Implication</div>
      <div class="card-body" style="font-size:19px;">
        Never stop at the first positive result. If unexplained features remain after the primary diagnosis, <strong>actively search for additional molecular diagnoses</strong>.
      </div>
    </div>
  </div>
`));

// ── Slide 11: The MTOR VUS ─────────────────────────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>The MTOR VUS</h1>
  <div class="section-label">Evaluating a Variant of Uncertain Significance</div>

  <div class="two-col" style="margin-top:12px;">
    <div>
      <div class="card card-amber" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">Initial Classification: VUS</div>
        <div class="card-body" style="font-size:19px; line-height:1.6;">
          De novo heterozygous missense variant in <strong>MTOR</strong>. Does not fit full Smith-Kingsmore syndrome (megalencephaly, ID, seizures, facial features).
        </div>
      </div>

      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Incomplete Phenotype Match?</div>
        <div class="card-body" style="font-size:19px; line-height:1.6;">
          Patient lacks megalencephaly and characteristic facial features of Smith-Kingsmore. However, the <strong>drug-resistant focal epilepsy</strong> component is notable.
        </div>
      </div>
    </div>

    <div>
      <div class="card card-violet" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Supporting Literature</div>
        <div class="card-body" style="font-size:19px; line-height:1.6;">
          <strong>Moller et al. 2016:</strong> Reported germline de novo MTOR missense variants in patients with <strong>focal epilepsy alone</strong> &mdash; without the full Smith-Kingsmore phenotype.
          <br><br>
          This supports a broader phenotypic spectrum for germline MTOR variants, including isolated or predominant epilepsy.
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 12: VUS Resolution ───────────────────────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>VUS Resolution</h1>
  <div class="section-label">Evidence for Reclassification</div>

  <div class="stats-row" style="margin-bottom:24px;">
    <div class="stat-card" style="background:${COLORS.violetLight}; border-color:${COLORS.violet};">
      <div class="stat-label">gnomAD</div>
      <div class="stat-value" style="color:${COLORS.violet};">Absent</div>
    </div>
    <div class="stat-card" style="background:${COLORS.greenLight}; border-color:${COLORS.green};">
      <div class="stat-label">phyloP Score</div>
      <div class="stat-value" style="color:${COLORS.green};">9.435</div>
      <div style="font-size:15px; color:${COLORS.muted}; margin-top:2px;">Highly conserved</div>
    </div>
    <div class="stat-card" style="background:${COLORS.amberLight}; border-color:${COLORS.amber};">
      <div class="stat-label">CADD Score</div>
      <div class="stat-value" style="color:${COLORS.amber};">23.5</div>
      <div style="font-size:15px; color:${COLORS.muted}; margin-top:2px;">Top 0.5% deleterious</div>
    </div>
    <div class="stat-card" style="background:${COLORS.redLight}; border-color:${COLORS.red};">
      <div class="stat-label">Inheritance</div>
      <div class="stat-value" style="color:${COLORS.red};">De Novo</div>
      <div style="font-size:15px; color:${COLORS.muted}; margin-top:2px;">PS2 evidence</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-green" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Reclassified: Likely Pathogenic</div>
      <div class="card-body" style="font-size:19px; line-height:1.6;">
        Combining PM2 (absent from gnomAD), PP3 (computational evidence), PS2 (de novo), and literature support &mdash; upgraded to <strong>likely pathogenic</strong>.
      </div>
    </div>

    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Multi-Locus Variation</div>
      <div class="card-body" style="font-size:19px; line-height:1.6;">
        This third molecular finding may act as a <strong>modifier</strong> &mdash; potentially explaining why this patient's epilepsy is particularly drug-resistant compared to typical AHC.
      </div>
    </div>
  </div>
`));

// ── Slide 13: Why Pursue the MTOR Variant? ─────────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Why Pursue the MTOR Variant?</h1>
  <div class="section-label">Therapeutic Implications</div>

  <div style="display:flex; flex-direction:column; gap:16px; margin-top:16px;">
    <div class="card card-green" style="display:flex; gap:24px; align-items:flex-start; padding:28px;">
      <div class="number-circle" style="background:${COLORS.green};">1</div>
      <div style="flex:1;">
        <div class="card-title" style="font-size:22px;">Potentially Treatable with Everolimus</div>
        <div class="card-body" style="font-size:19px;">mTOR pathway inhibitors (everolimus, sirolimus) are FDA-approved for TSC-associated epilepsy. If MTOR gain-of-function drives the drug-resistant component, <strong>precision therapy</strong> becomes an option.</div>
      </div>
    </div>

    <div class="card card-accent" style="display:flex; gap:24px; align-items:flex-start; padding:28px;">
      <div class="number-circle" style="background:${mc.accent};">2</div>
      <div style="flex:1;">
        <div class="card-title" style="font-size:22px;">May Explain Drug-Resistant Epilepsy Component</div>
        <div class="card-body" style="font-size:19px;">While AHC (ATP1A3) commonly includes epilepsy, the drug-resistant focal seizures may be disproportionately driven by the MTOR variant &mdash; a separate, targetable mechanism.</div>
      </div>
    </div>

    <div class="card card-red" style="display:flex; gap:24px; align-items:flex-start; padding:28px;">
      <div class="number-circle" style="background:${COLORS.red};">3</div>
      <div style="flex:1;">
        <div class="card-title" style="font-size:22px;">VUS in Treatable Pathways Warrant Aggressive Pursuit</div>
        <div class="card-body" style="font-size:19px;">When a VUS falls in a <strong>therapeutically actionable pathway</strong>, the threshold for further investigation should be lower. The potential benefit of treatment justifies additional workup.</div>
      </div>
    </div>
  </div>
`));

// ── Slide 14: Complex Phenotypes from Multiple Diagnoses ───────────────────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>Complex Phenotypes from Multiple Diagnoses</h1>
  <div class="section-label">Examples from the Literature</div>

  <div class="card card-violet" style="padding:28px; margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">Karaca et al. 2018 &mdash; Triple Diagnosis</div>
    <div class="card-body" style="font-size:19px; line-height:1.6;">
      Reported a patient with three independent molecular diagnoses: <strong>AP4B1</strong> (spastic paraplegia) + <strong>AMPD2</strong> (pontocerebellar hypoplasia) + <strong>NOTCH2</strong> (Alagille features). Each gene explained a distinct component of the complex phenotype.
    </div>
  </div>

  <div class="two-col">
    <div class="card card-amber" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Intrafamilial Variability</div>
      <div class="card-body" style="font-size:19px; line-height:1.6;">
        Siblings may inherit different combinations of parental variants, producing <strong>different blended phenotypes</strong> within the same family. One sibling may have a dual diagnosis while another has only one.
      </div>
    </div>

    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Interfamilial Variability</div>
      <div class="card-body" style="font-size:19px; line-height:1.6;">
        The same primary diagnosis (e.g., ATP1A3) may appear more or less severe across families depending on whether <strong>additional molecular diagnoses</strong> are present as modifiers.
      </div>
    </div>
  </div>
`));

// ── Slide 15: Key Takeaways ────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 15, TOTAL, [
  {
    title: "Always consider dual diagnoses",
    body: "When the phenotype doesn\u2019t fully fit one condition, actively search for additional molecular diagnoses to explain residual features.",
  },
  {
    title: "~5% of exome patients have multiple diagnoses",
    body: "Posey et al. (NEJM 2017) demonstrated that dual diagnoses are not rare \u2014 especially in consanguineous families or complex phenotypes.",
  },
  {
    title: "Blended phenotypes require careful delineation",
    body: "Map each clinical feature to a specific molecular diagnosis. Overlapping features may be compounded by multiple conditions.",
  },
  {
    title: "VUS in treatable pathways warrants aggressive pursuit",
    body: "When a VUS falls in an actionable pathway (e.g., mTOR \u2192 everolimus), lower the threshold for reclassification workup due to therapeutic potential.",
  },
  {
    title: "Exome reanalysis may reveal additional diagnoses",
    body: "Periodic reanalysis of exome data as new gene-disease associations are published can uncover previously unrecognized dual diagnoses.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides("dual-diagnosis", slides);
