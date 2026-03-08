/**
 * scripts/gen-iem.mjs
 *
 * Generates 15 clean, readable slides for the IEM: Leukodystrophies module.
 * Aligned with JSON section structure:
 *   S0 (slides 1-3): Categories & Mechanisms of Neurological Injury in IEM
 *   S1 (slides 4-6): Newborn Screening: Principles and Neurometabolic Disorders Detected
 *   S2 (slides 7-9): Treatable IEM That Must Not Be Missed
 *   S3 (slides 10-12): Diagnostic Approach to Suspected IEM
 *   S4 (slides 13-15): Treatment Strategies for Neurometabolic Disorders
 *
 * Run: node scripts/gen-iem.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "iem";
const mc = MODULE_COLORS[MOD];
const TOTAL = 15;

const slides = [];

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 0: Categories & Mechanisms of Neurological Injury in IEM (slides 1-3)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Inborn Errors of Metabolism in Neurology",
  subtitle: "From biochemical mechanisms to bedside management",
  totalSlides: TOTAL,
  topics: [
    "Categories &amp; mechanisms of IEM",
    "Newborn screening for neurological IEM",
    "Treatable IEM that must not be missed",
    "Diagnostic approach to suspected IEM",
    "Treatment strategies: diet to gene therapy",
  ],
}));

// ── Slide 2: Three-Axis Framework — Small vs Large Molecule ─────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>IEM: Three-Axis Framework</h1>
  <div class="section-label">Small-Molecule vs Large-Molecule Comparison</div>

  <table style="margin-top:8px;">
    <thead>
      <tr>
        <th style="width:20%; font-size:15px;">Axis</th>
        <th style="width:40%; font-size:15px;">Small-Molecule (Intoxication / Energy)</th>
        <th style="width:40%; font-size:15px;">Large-Molecule (Organelle / Storage)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="font-size:17px;">Biochemical Class</td>
        <td style="font-size:16px;">Aminoacidopathies, organic acidemias, UCD, FAOD</td>
        <td style="font-size:16px;">LSD, peroxisomal disorders, CDG</td>
      </tr>
      <tr>
        <td style="font-size:17px;">Clinical Tempo</td>
        <td style="font-size:16px;">Acute / episodic encephalopathy</td>
        <td style="font-size:16px;">Insidious regression</td>
      </tr>
      <tr>
        <td style="font-size:17px;">Systemic Clues</td>
        <td style="font-size:16px;">Hyperammonemia, acidosis, hypoglycemia</td>
        <td style="font-size:16px;">Coarse facies, HSM, cherry-red spot</td>
      </tr>
      <tr>
        <td style="font-size:17px;">MRI Pattern</td>
        <td style="font-size:16px;">Often normal early; BG edema in crisis</td>
        <td style="font-size:16px;">Symmetric leukodystrophy / atrophy</td>
      </tr>
      <tr>
        <td style="font-size:17px;">Reversibility</td>
        <td style="font-size:16px;"><strong style="color:${COLORS.green};">Often treatable &mdash; DON&rsquo;T MISS</strong></td>
        <td style="font-size:16px;"><strong style="color:${COLORS.red};">Generally irreversible</strong></td>
      </tr>
      <tr>
        <td style="font-size:17px;">KY NBS</td>
        <td style="font-size:16px;">Many captured (PKU, MSUD, PA, MMA, GA1)</td>
        <td style="font-size:16px;">Few (Krabbe, Pompe, Fabry)</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:8px; padding:18px 24px;">
    <div class="label">Key Concept</div>
    <div class="value" style="font-size:20px;">Small-molecule IEM: water-soluble, acute, often treatable. Large-molecule IEM: organelle-based, progressive, usually irreversible.</div>
  </div>
`));

// ── Slide 3: Decompensation Triggers ──────────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Metabolic Decompensation</h1>
  <div class="section-label">Small-Molecule vs Large-Molecule IEM</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-red" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">Small-Molecule IEM</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          Water-soluble intermediates accumulate acutely.<br>
          <strong>Episodic crises</strong> triggered by:<br>
          &bull; Intercurrent illness / fever<br>
          &bull; Fasting or catabolism<br>
          &bull; High-protein meals<br>
          &bull; Surgery / anesthesia
        </div>
      </div>
    </div>

    <div>
      <div class="card card-violet" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">Large-Molecule IEM</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          Complex molecules accumulate slowly.<br>
          <strong>Progressive course</strong> without acute crises.<br>
          &bull; Lysosomal storage disorders<br>
          &bull; Peroxisomal disorders<br>
          &bull; Glycogen storage diseases
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:12px;">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:20px;">Catabolism floods the blocked pathway &mdash; illness, fasting, and surgery are the most common decompensation triggers in small-molecule IEM</div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1: Newborn Screening (slides 4-6)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 4: NBS Principles ──────────────────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Newborn Screening Principles</h1>
  <div class="section-label">RUSP &amp; MS/MS Technology</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">RUSP Overview</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          The <strong>Recommended Uniform Screening Panel</strong> includes &gt;35 core conditions and 26 secondary targets. Tandem mass spectrometry screens amino acids and acylcarnitines from a single dried blood spot.
        </div>
      </div>
      <div class="card card-amber" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Screening &#x2260; Diagnosis</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          A positive NBS identifies infants at increased risk. <strong>Confirmatory testing is always required</strong> before treatment. False positives are common in premature infants.
        </div>
      </div>
    </div>

    <div>
      <div class="card card-green" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">Recent Neurological Additions</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          &bull; <strong>SMA</strong> (2018) &mdash; SMN1 deletion<br>
          &bull; <strong>X-ALD</strong> (2016) &mdash; C26:0-LPC<br>
          &bull; <strong>Pompe</strong> (2015) &mdash; GAA enzyme<br>
          &bull; <strong>GAMT</strong> (2024) &mdash; guanidinoacetate
        </div>
      </div>
      <div class="card card-red" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">State Variability</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          Each state decides which RUSP conditions to screen. Not all states screen for all recommended conditions. Families moving states may have gaps.
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 5: Key IEM Detected by NBS ────────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Key IEM Detected by NBS</h1>
  <div class="section-label">Aminoacidopathies &amp; Organic Acidemias</div>

  <table style="margin-top:12px;">
    <thead>
      <tr>
        <th style="width:18%;">Condition</th>
        <th style="width:22%;">NBS Analyte</th>
        <th style="width:30%;">Neurological Presentation</th>
        <th style="width:30%;">Treatment</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>PKU</td>
        <td style="font-size:17px;">Elevated phenylalanine</td>
        <td style="font-size:17px;">Intellectual disability, seizures if untreated</td>
        <td style="font-size:17px;">Phe-restricted diet; BH4 (sapropterin)</td>
      </tr>
      <tr>
        <td>MSUD</td>
        <td style="font-size:17px;">Elevated leucine, alloisoleucine</td>
        <td style="font-size:17px;">Neonatal encephalopathy, cerebral edema</td>
        <td style="font-size:17px;">BCAA restriction; liver transplant</td>
      </tr>
      <tr>
        <td>MCAD</td>
        <td style="font-size:17px;">C8 acylcarnitine elevated</td>
        <td style="font-size:17px;">Hypoketotic hypoglycemia; Reye-like</td>
        <td style="font-size:17px;">Avoid fasting; emergency glucose</td>
      </tr>
      <tr>
        <td>LCHAD</td>
        <td style="font-size:17px;">C16-OH acylcarnitine elevated</td>
        <td style="font-size:17px;">Cardiomyopathy, retinopathy, neuropathy</td>
        <td style="font-size:17px;">MCT-enriched diet; avoid fasting</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Important</div>
    <div class="value" style="font-size:20px;">Urea cycle disorders (OTC deficiency) are NOT reliably detected by amino acid NBS &mdash; hyperammonemia presents clinically</div>
  </div>
`));

// ── Slide 6: Fatty Acid Oxidation & Acylcarnitine Profiles ──────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Acylcarnitine Profiles in NBS</h1>
  <div class="section-label">Pattern Recognition for Fatty Acid Oxidation Disorders</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">How MS/MS Works</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          A single dried blood spot analyzed by tandem mass spectrometry identifies <strong>amino acids</strong> (phenylalanine, leucine, tyrosine) and <strong>acylcarnitines</strong> (C8, C14:1, C16-OH) simultaneously.
        </div>
      </div>
      <div class="card card-red" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">False Positives</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          Common in premature infants, poor sample technique, and maternal conditions. Results <strong>must</strong> be confirmed with plasma amino acids, urine organic acids, or enzyme assays.
        </div>
      </div>
    </div>

    <div>
      <div class="card card-green" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">Key Acylcarnitine Patterns</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          &bull; <strong>C8&uarr;</strong> &rarr; MCAD deficiency<br>
          &bull; <strong>C14:1&uarr;</strong> &rarr; VLCAD deficiency<br>
          &bull; <strong>C16-OH&uarr;</strong> &rarr; LCHAD / TFP<br>
          &bull; <strong>Multiple species&uarr;</strong> &rarr; GA type 2<br>
          &bull; <strong>All low</strong> &rarr; carnitine transport defect
        </div>
      </div>
      <div class="card card-amber" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Alloisoleucine</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          <strong>Pathognomonic</strong> for MSUD. Not found in any other aminoacidopathy. Formed by transamination of isoleucine when BCAA metabolism is blocked.
        </div>
      </div>
    </div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 2: Treatable IEM That Must Not Be Missed (slides 7-9)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 7: Don't-Miss Treatable IEMs (Part 1 of 2) ────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Don&rsquo;t-Miss Treatable IEMs (1/2)</h1>
  <div class="section-label">Disorders Where Early Diagnosis Changes Outcome</div>

  <table style="margin-top:4px;">
    <thead>
      <tr>
        <th style="width:16%; font-size:14px;">Disorder</th>
        <th style="width:14%; font-size:14px;">Mechanism</th>
        <th style="width:20%; font-size:14px;">Key Clue</th>
        <th style="width:18%; font-size:14px;">Don&rsquo;t-Miss Test</th>
        <th style="width:16%; font-size:14px;">Treatment</th>
        <th style="width:16%; font-size:14px;">NBS?</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="font-size:16px;">GLUT1 (SLC2A1)</td>
        <td style="font-size:16px;">Glucose transport</td>
        <td style="font-size:16px;">Fasting seizures</td>
        <td style="font-size:16px;">CSF:serum glucose &lt;0.45</td>
        <td style="font-size:16px;">Ketogenic diet</td>
        <td style="font-size:16px;">No</td>
      </tr>
      <tr>
        <td style="font-size:16px;">PDE (ALDH7A1)</td>
        <td style="font-size:16px;">Antiquitin def.</td>
        <td style="font-size:16px;">Refractory neonatal sz</td>
        <td style="font-size:16px;">Urine AASA</td>
        <td style="font-size:16px;">Pyridoxine</td>
        <td style="font-size:16px;">No</td>
      </tr>
      <tr>
        <td style="font-size:16px;">Biotinidase</td>
        <td style="font-size:16px;">Biotin recycling</td>
        <td style="font-size:16px;">Sz / alopecia / rash / SNHL</td>
        <td style="font-size:16px;">Enzyme activity</td>
        <td style="font-size:16px;">Biotin</td>
        <td style="font-size:16px;"><strong style="color:${COLORS.green};">Yes</strong></td>
      </tr>
      <tr>
        <td style="font-size:16px;">Creatine def. (GAMT / AGAT / SLC6A8)</td>
        <td style="font-size:16px;">Creatine synth./transport</td>
        <td style="font-size:16px;">ID / autism / seizures</td>
        <td style="font-size:16px;">Absent MRS creatine; urine Cr:creatinine</td>
        <td style="font-size:16px;">Creatine / ornithine</td>
        <td style="font-size:16px;">GAMT only</td>
      </tr>
      <tr>
        <td style="font-size:16px;">UCD (OTC / CPS1 / ASS1)</td>
        <td style="font-size:16px;">Urea cycle</td>
        <td style="font-size:16px;">Acute encephalopathy</td>
        <td style="font-size:16px;">Ammonia + PAA + urine orotic acid</td>
        <td style="font-size:16px;">N-scavengers / dialysis</td>
        <td style="font-size:16px;">Variable</td>
      </tr>
      <tr>
        <td style="font-size:16px;">MSUD</td>
        <td style="font-size:16px;">BCKDH def.</td>
        <td style="font-size:16px;">Encephalopathy, maple syrup odor</td>
        <td style="font-size:16px;">PAA (BCAA)</td>
        <td style="font-size:16px;">Leucine restriction</td>
        <td style="font-size:16px;"><strong style="color:${COLORS.green};">Yes</strong></td>
      </tr>
    </tbody>
  </table>
`));

// ── Slide 8: Don't-Miss Treatable IEMs (Part 2 of 2) ────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Don&rsquo;t-Miss Treatable IEMs (2/2)</h1>
  <div class="section-label">Disorders Where Early Diagnosis Changes Outcome</div>

  <table style="margin-top:4px;">
    <thead>
      <tr>
        <th style="width:16%; font-size:14px;">Disorder</th>
        <th style="width:14%; font-size:14px;">Mechanism</th>
        <th style="width:20%; font-size:14px;">Key Clue</th>
        <th style="width:18%; font-size:14px;">Don&rsquo;t-Miss Test</th>
        <th style="width:16%; font-size:14px;">Treatment</th>
        <th style="width:16%; font-size:14px;">NBS?</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="font-size:16px;">PA / MMA</td>
        <td style="font-size:16px;">Organic acidemia</td>
        <td style="font-size:16px;">Neonatal acidosis, hyperammonemia, BG stroke</td>
        <td style="font-size:16px;">UOA / acylcarnitine C3</td>
        <td style="font-size:16px;">Protein restriction</td>
        <td style="font-size:16px;"><strong style="color:${COLORS.green};">Yes</strong></td>
      </tr>
      <tr>
        <td style="font-size:16px;">Homocystinuria (CBS)</td>
        <td style="font-size:16px;">Methionine metab.</td>
        <td style="font-size:16px;">Marfanoid, lens disloc., DVT</td>
        <td style="font-size:16px;">Total homocysteine</td>
        <td style="font-size:16px;">Pyridoxine trial</td>
        <td style="font-size:16px;">Variable</td>
      </tr>
      <tr>
        <td style="font-size:16px;">NPC (NPC1/NPC2)</td>
        <td style="font-size:16px;">Cholesterol trafficking</td>
        <td style="font-size:16px;">VSGP, ataxia, cognitive decline, HSM</td>
        <td style="font-size:16px;">Oxysterols</td>
        <td style="font-size:16px;">Miglustat</td>
        <td style="font-size:16px;">No</td>
      </tr>
      <tr>
        <td style="font-size:16px;">X-ALD (ABCD1)</td>
        <td style="font-size:16px;">Peroxisomal &beta;-ox</td>
        <td style="font-size:16px;">Boys: behavioral / school decline + WM disease</td>
        <td style="font-size:16px;">VLCFAs</td>
        <td style="font-size:16px;">HSCT</td>
        <td style="font-size:16px;"><strong style="color:${COLORS.green};">Yes</strong></td>
      </tr>
      <tr>
        <td style="font-size:16px;">PKU (PAH)</td>
        <td style="font-size:16px;">Phe hydroxylase</td>
        <td style="font-size:16px;">ID, seizures, tremor</td>
        <td style="font-size:16px;">PAA (phenylalanine)</td>
        <td style="font-size:16px;">Phe-restricted diet</td>
        <td style="font-size:16px;"><strong style="color:${COLORS.green};">Yes</strong></td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:8px; padding:16px 24px;">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:19px;">Same gene &rarr; different phenotype based on residual enzyme activity: classic PKU vs mild HPA, infantile vs late-onset Pompe</div>
  </div>
`));

// ── Slide 9: Niemann-Pick Type C ────────────────────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Treatable IEM: Niemann-Pick Type C</h1>
  <div class="section-label">The &ldquo;Great Imitator&rdquo; of Neurology</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-red" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">Cardinal Features</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          &bull; <strong>Vertical supranuclear gaze palsy</strong> (cardinal sign)<br>
          &bull; Progressive cerebellar ataxia<br>
          &bull; Cognitive decline &plusmn; psychosis<br>
          &bull; Neonatal jaundice (early clue)<br>
          &bull; Splenomegaly
        </div>
      </div>
    </div>

    <div>
      <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">Diagnosis &amp; Mechanism</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          <strong>Genes:</strong> NPC1 / NPC2<br>
          <strong>Defect:</strong> Cholesterol trafficking &mdash; impaired export from late endosomes/lysosomes<br>
          <strong>Diagnosis:</strong> Filipin staining of fibroblasts or NPC1/NPC2 sequencing
        </div>
      </div>
    </div>
  </div>

  <div class="card card-green" style="padding:20px 28px; margin-top:8px;">
    <div class="card-title" style="font-size:20px;">Treatment</div>
    <div class="card-body" style="font-size:18px;"><strong>Miglustat</strong> (substrate reduction therapy) slows neurological progression. Arimoclomol and other agents in trials. Early diagnosis critical.</div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 3: Diagnostic Approach to Suspected IEM (slides 10-12)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 10: Clinical Clue-Diagnosis Pairings (Part 1 of 2) ────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Clinical Clue &rarr; Diagnosis (1/2)</h1>
  <div class="section-label">High-Yield Presentation Pairings</div>

  <table style="margin-top:4px;">
    <thead>
      <tr>
        <th style="width:5%; font-size:14px;">#</th>
        <th style="width:30%; font-size:14px;">Presentation</th>
        <th style="width:30%; font-size:14px;">Think&hellip;</th>
        <th style="width:35%; font-size:14px;">Pearl</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="font-size:17px; text-align:center;">1</td>
        <td style="font-size:16px;">Acute encephalopathy + hyperammonemia</td>
        <td style="font-size:16px;">UCD / OA / FAOD</td>
        <td style="font-size:16px;"><strong>Treat ammonia, don&rsquo;t wait</strong></td>
      </tr>
      <tr>
        <td style="font-size:17px; text-align:center;">2</td>
        <td style="font-size:16px;">Lactic acidosis, elevated L:P ratio</td>
        <td style="font-size:16px;">Mito / PDH</td>
        <td style="font-size:16px;">Single normal lactate doesn&rsquo;t exclude</td>
      </tr>
      <tr>
        <td style="font-size:17px; text-align:center;">3</td>
        <td style="font-size:16px;">Episodic ataxia / movement crisis</td>
        <td style="font-size:16px;">MSUD / OA / mito / UCD / GLUT1</td>
        <td style="font-size:16px;">Timing relative to meals is critical</td>
      </tr>
      <tr>
        <td style="font-size:17px; text-align:center;">4</td>
        <td style="font-size:16px;">Regression after febrile illness</td>
        <td style="font-size:16px;">Intoxication IEM / Rett</td>
        <td style="font-size:16px;">Partial recovery favors IEM</td>
      </tr>
      <tr>
        <td style="font-size:17px; text-align:center;">5</td>
        <td style="font-size:16px;">Normal MRI + regression</td>
        <td style="font-size:16px;">Early IEM / GLUT1 / creatine / NKH</td>
        <td style="font-size:16px;"><strong>Normal MRI does NOT exclude IEM</strong></td>
      </tr>
      <tr>
        <td style="font-size:17px; text-align:center;">6</td>
        <td style="font-size:16px;">Progressive leukodystrophy</td>
        <td style="font-size:16px;">MLD / Krabbe / X-ALD / Alexander / VWM</td>
        <td style="font-size:16px;">MRI pattern narrows the DDx</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:8px; padding:16px 24px;">
    <div class="label">Take-Home</div>
    <div class="value" style="font-size:19px;">Episodic crises + partial recovery = small-molecule IEM until proven otherwise</div>
  </div>
`));

// ── Slide 11: Clinical Clue-Diagnosis Pairings (Part 2 of 2) ────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Clinical Clue &rarr; Diagnosis (2/2)</h1>
  <div class="section-label">High-Yield Presentation Pairings</div>

  <table style="margin-top:4px;">
    <thead>
      <tr>
        <th style="width:5%; font-size:14px;">#</th>
        <th style="width:30%; font-size:14px;">Presentation</th>
        <th style="width:30%; font-size:14px;">Think&hellip;</th>
        <th style="width:35%; font-size:14px;">Pearl</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="font-size:17px; text-align:center;">7</td>
        <td style="font-size:16px;">Cherry-red spot</td>
        <td style="font-size:16px;">GM1 / GM2 / NPA / sialidosis</td>
        <td style="font-size:16px;">Absence doesn&rsquo;t exclude LSD</td>
      </tr>
      <tr>
        <td style="font-size:17px; text-align:center;">8</td>
        <td style="font-size:16px;">HSM + neuro decline</td>
        <td style="font-size:16px;">NPC / Gaucher 3 / GM1 / MPS</td>
        <td style="font-size:16px;">NPC: VSGP classic but subtle</td>
      </tr>
      <tr>
        <td style="font-size:17px; text-align:center;">9</td>
        <td style="font-size:16px;">Refractory neonatal seizures</td>
        <td style="font-size:16px;">PDE / PNPO / NKH / biotinidase / MoCoD</td>
        <td style="font-size:16px;"><strong>Pyridoxine trial warranted</strong></td>
      </tr>
      <tr>
        <td style="font-size:17px; text-align:center;">10</td>
        <td style="font-size:16px;">Infant hypotonia + neurodegeneration + hair/CT abnl</td>
        <td style="font-size:16px;">Menkes (ATP7A)</td>
        <td style="font-size:16px;">Low Cu/Cp; X-linked</td>
      </tr>
      <tr>
        <td style="font-size:17px; text-align:center;">11</td>
        <td style="font-size:16px;">Adolescent liver + BG signal + psych</td>
        <td style="font-size:16px;">Wilson (ATP7B)</td>
        <td style="font-size:16px;">KF rings absent in 50%; low Cp</td>
      </tr>
      <tr>
        <td style="font-size:17px; text-align:center;">12</td>
        <td style="font-size:16px;">ID + movement disorder + absent MRS creatine</td>
        <td style="font-size:16px;">Creatine deficiency (SLC6A8)</td>
        <td style="font-size:16px;">Urine Cr:creatinine ratio</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:8px; padding:16px 24px;">
    <div class="label">Take-Home</div>
    <div class="value" style="font-size:19px;">Wilson and Menkes are treatable copper disorders &mdash; always check ceruloplasmin in unexplained hepatic + neuropsychiatric presentations</div>
  </div>
`));

// ── Slide 12: Bedside Checklist ─────────────────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>IEM Bedside Checklist</h1>
  <div class="section-label">7-Step Approach to Suspected IEM</div>

  <div style="display:flex; flex-direction:column; gap:10px; margin-top:8px;">
    <div style="display:flex; gap:16px; align-items:flex-start;">
      <div class="number-circle" style="background:${COLORS.red}; min-width:40px;">1</div>
      <div style="font-size:19px; line-height:1.5; padding-top:6px;"><strong>Stabilize:</strong> ABCs, correct hypoglycemia, treat seizures</div>
    </div>
    <div style="display:flex; gap:16px; align-items:flex-start;">
      <div class="number-circle" style="background:${COLORS.amber}; min-width:40px;">2</div>
      <div style="font-size:18px; line-height:1.5; padding-top:6px;"><strong>Acute labs:</strong> Ammonia, gas, glucose, lactate, lytes, LFTs, PAA, acylcarnitines, UOA</div>
    </div>
    <div style="display:flex; gap:16px; align-items:flex-start;">
      <div class="number-circle" style="background:${mc.accent}; min-width:40px;">3</div>
      <div style="font-size:19px; line-height:1.5; padding-top:6px;"><strong>Categorize:</strong> Small vs large molecule, acute vs progressive, multi-organ vs brain-only</div>
    </div>
    <div style="display:flex; gap:16px; align-items:flex-start;">
      <div class="number-circle" style="background:${COLORS.green}; min-width:40px;">4</div>
      <div style="font-size:19px; line-height:1.5; padding-top:6px;"><strong>Check NBS:</strong> Was it done? <strong style="color:${COLORS.red};">Normal NBS does NOT exclude all IEMs</strong></div>
    </div>
    <div style="display:flex; gap:16px; align-items:flex-start;">
      <div class="number-circle" style="background:${COLORS.violet}; min-width:40px;">5</div>
      <div style="font-size:19px; line-height:1.5; padding-top:6px;"><strong>First-tier screen:</strong> Full panel if not done &mdash; collect <strong>DURING crisis</strong></div>
    </div>
    <div style="display:flex; gap:16px; align-items:flex-start;">
      <div class="number-circle" style="background:${COLORS.red}; min-width:40px;">6</div>
      <div style="font-size:18px; line-height:1.5; padding-top:6px;"><strong>Treatable signal?</strong> UCD / OA / aminoacidopathy / creatine / PDE / GLUT1 / Wilson / Menkes &rarr; <strong>immediate consult</strong></div>
    </div>
    <div style="display:flex; gap:16px; align-items:flex-start;">
      <div class="number-circle" style="background:${COLORS.amber}; min-width:40px;">7</div>
      <div style="font-size:18px; line-height:1.5; padding-top:6px;"><strong>Unrevealing?</strong> Proceed to WES/WGS without delay &mdash; exhaustive sequential testing is outdated</div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:12px; padding:16px 24px;">
    <div class="label">Rule</div>
    <div class="value" style="font-size:19px;">Collect metabolic labs DURING the acute crisis &mdash; many metabolites normalize between episodes</div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 4: Treatment Strategies (slides 13-15)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 13: Dietary & Cofactor Therapies ──────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Dietary &amp; Cofactor Therapies</h1>
  <div class="section-label">Foundational Treatment Strategies</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Dietary Restriction</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          &bull; PKU: phenylalanine restriction<br>
          &bull; MSUD: BCAA restriction<br>
          &bull; Homocystinuria: methionine restriction<br>
          &bull; GA1: lysine/tryptophan restriction<br>
          &bull; Galactosemia: galactose-free diet<br><br>
          <em style="color:${COLORS.muted};">Requires specialized formulas; lifelong adherence is challenging</em>
        </div>
      </div>
    </div>

    <div>
      <div class="card card-green" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Cofactor Supplementation</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          &bull; <strong>Pyridoxine (B6):</strong> PDE, B6-responsive homocystinuria<br>
          &bull; <strong>Biotin:</strong> biotinidase deficiency, MCD<br>
          &bull; <strong>BH4 / Sapropterin:</strong> BH4-responsive PKU, DRD<br>
          &bull; <strong>Riboflavin:</strong> MADD, complex I/II<br>
          &bull; <strong>Thiamine:</strong> thiamine-responsive disorders
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 14: ERT, SRT & Gene Therapy ───────────────────────────────────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>ERT, SRT &amp; Gene Therapy</h1>
  <div class="section-label">Advanced Treatment Strategies</div>

  <div style="display:flex; flex-direction:column; gap:14px; margin-top:12px;">
    <div class="card card-accent" style="display:flex; gap:18px; align-items:flex-start; padding:20px 24px;">
      <div class="number-circle" style="background:${mc.accent};">1</div>
      <div>
        <div class="card-title" style="font-size:20px;">Enzyme Replacement Therapy (ERT)</div>
        <div class="card-body" style="font-size:17px;">Fabry (agalsidase beta), Pompe (alglucosidase alfa), MPS I (laronidase), MPS II (idursulfase), Gaucher (imiglucerase). IV infusions; <strong>BBB limits CNS efficacy</strong> for neurological LSDs.</div>
      </div>
    </div>
    <div class="card card-amber" style="display:flex; gap:18px; align-items:flex-start; padding:20px 24px;">
      <div class="number-circle" style="background:${COLORS.amber};">2</div>
      <div>
        <div class="card-title" style="font-size:20px;">Substrate Reduction Therapy (SRT)</div>
        <div class="card-body" style="font-size:17px;">Miglustat and eliglustat (Gaucher, NPC) &mdash; oral small molecules inhibiting substrate synthesis. Useful when ERT has limited CNS access. Miglustat slows NPC progression.</div>
      </div>
    </div>
    <div class="card card-green" style="display:flex; gap:18px; align-items:flex-start; padding:20px 24px;">
      <div class="number-circle" style="background:${COLORS.green};">3</div>
      <div>
        <div class="card-title" style="font-size:20px;">Gene Therapy &amp; HSCT</div>
        <div class="card-body" style="font-size:17px;">SMA (Zolgensma, approved 2019 &mdash; paradigm for IEM gene therapy). MLD (Libmeldy &mdash; ex vivo, approved EU). OTC deficiency and MMA trials ongoing. HSCT for Krabbe, MLD, X-ALD.</div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:12px;">
    <div class="label">Key Limitation</div>
    <div class="value" style="font-size:20px;">ERT proteins (~60&ndash;80 kDa) cannot cross the blood-brain barrier &mdash; this drives development of IT delivery, gene therapy, and SRT for neurological LSDs</div>
  </div>
`));

// ── Slide 15: Key Takeaways ─────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 15, TOTAL, [
  {
    title: "Small vs large molecule is the core IEM dichotomy",
    body: "Small-molecule: acute, episodic, often treatable (OA/UCD/FAOD). Large-molecule: progressive, organelle-based, usually irreversible (LSD/peroxisomal/CDG).",
  },
  {
    title: "NBS detects presymptomatic IEM",
    body: "MS/MS screens amino acids and acylcarnitines. A positive screen is NOT a diagnosis — confirmatory testing is always required.",
  },
  {
    title: "11 don't-miss treatable IEMs",
    body: "GLUT1, PDE, biotinidase, creatine deficiency, UCD, MSUD, PA/MMA, homocystinuria, NPC, X-ALD, PKU — early treatment prevents irreversible damage.",
  },
  {
    title: "12 clinical clue-diagnosis pairings",
    body: "Pattern recognition is key: acute encephalopathy → UCD/OA, refractory neonatal sz → PDE trial, normal MRI + regression → think GLUT1/creatine.",
  },
  {
    title: "Bedside checklist: stabilize → labs → categorize → NBS → screen → treat → WES",
    body: "Collect metabolic labs DURING crisis. Normal NBS does not exclude IEM. Proceed to WES/WGS without delay if unrevealing.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
