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
  <h1>IEM: The Core Dichotomy</h1>
  <div class="section-label">Small-Molecule vs Large-Molecule IEM</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-green" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Small-Molecule IEM</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          &bull; <strong>Tempo:</strong> Acute / episodic crises<br>
          &bull; <strong>Clues:</strong> Hyperammonemia, acidosis, hypoglycemia<br>
          &bull; <strong>MRI:</strong> Often normal early; BG edema in crisis<br>
          &bull; <strong style="color:${COLORS.green};">Often treatable &mdash; DON&rsquo;T MISS</strong><br>
          &bull; <strong>NBS:</strong> Many captured (PKU, MSUD, PA, MMA, GA1)
        </div>
      </div>
    </div>

    <div>
      <div class="card card-violet" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Large-Molecule IEM</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          &bull; <strong>Tempo:</strong> Insidious regression<br>
          &bull; <strong>Clues:</strong> Coarse facies, HSM, cherry-red spot<br>
          &bull; <strong>MRI:</strong> Symmetric leukodystrophy / atrophy<br>
          &bull; <strong style="color:${COLORS.red};">Generally irreversible</strong><br>
          &bull; <strong>NBS:</strong> Few (Krabbe, Pompe, Fabry)
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:12px; padding:18px 24px;">
    <div class="label">Key Concept</div>
    <div class="value" style="font-size:28px;">Small-molecule IEM: water-soluble, acute, often treatable. Large-molecule IEM: organelle-based, progressive, usually irreversible.</div>
  </div>
`));

// ── Slide 3: Decompensation Triggers ──────────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Metabolic Decompensation</h1>
  <div class="section-label">Small-Molecule vs Large-Molecule IEM</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-red" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">Small-Molecule IEM</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
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
        <div class="card-title" style="font-size:31px;">Large-Molecule IEM</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
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
    <div class="value" style="font-size:28px;">Catabolism floods the blocked pathway &mdash; illness, fasting, and surgery are the most common decompensation triggers in small-molecule IEM</div>
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
        <div class="card-title" style="font-size:31px;">RUSP Overview</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          The <strong>Recommended Uniform Screening Panel</strong> includes &gt;35 core conditions and 26 secondary targets. Tandem mass spectrometry screens amino acids and acylcarnitines from a single dried blood spot.
        </div>
      </div>
      <div class="card card-amber" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Screening &#x2260; Diagnosis</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          A positive NBS identifies infants at increased risk. <strong>Confirmatory testing is always required</strong> before treatment. False positives are common in premature infants.
        </div>
      </div>
    </div>

    <div>
      <div class="card card-green" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">Recent Neurological Additions</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          &bull; <strong>SMA</strong> (2018) &mdash; SMN1 deletion<br>
          &bull; <strong>X-ALD</strong> (2016) &mdash; C26:0-LPC<br>
          &bull; <strong>Pompe</strong> (2015) &mdash; GAA enzyme<br>
          &bull; <strong>GAMT</strong> (2024) &mdash; guanidinoacetate
        </div>
      </div>
      <div class="card card-red" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">State Variability</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
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
        <td style="font-size:24px;">Elevated phenylalanine</td>
        <td style="font-size:24px;">Intellectual disability, seizures if untreated</td>
        <td style="font-size:24px;">Phe-restricted diet; BH4 (sapropterin)</td>
      </tr>
      <tr>
        <td>MSUD</td>
        <td style="font-size:24px;">Elevated leucine, alloisoleucine</td>
        <td style="font-size:24px;">Neonatal encephalopathy, cerebral edema</td>
        <td style="font-size:24px;">BCAA restriction; liver transplant</td>
      </tr>
      <tr>
        <td>MCAD</td>
        <td style="font-size:24px;">C8 acylcarnitine elevated</td>
        <td style="font-size:24px;">Hypoketotic hypoglycemia; Reye-like</td>
        <td style="font-size:24px;">Avoid fasting; emergency glucose</td>
      </tr>
      <tr>
        <td>LCHAD</td>
        <td style="font-size:24px;">C16-OH acylcarnitine elevated</td>
        <td style="font-size:24px;">Cardiomyopathy, retinopathy, neuropathy</td>
        <td style="font-size:24px;">MCT-enriched diet; avoid fasting</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Important</div>
    <div class="value" style="font-size:28px;">Urea cycle disorders (OTC deficiency) are NOT reliably detected by amino acid NBS &mdash; hyperammonemia presents clinically</div>
  </div>
`));

// ── Slide 6: Fatty Acid Oxidation & Acylcarnitine Profiles ──────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Acylcarnitine Profiles in NBS</h1>
  <div class="section-label">Pattern Recognition for Fatty Acid Oxidation Disorders</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">How MS/MS Works</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          A single dried blood spot analyzed by tandem mass spectrometry identifies <strong>amino acids</strong> (phenylalanine, leucine, tyrosine) and <strong>acylcarnitines</strong> (C8, C14:1, C16-OH) simultaneously.
        </div>
      </div>
      <div class="card card-red" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">False Positives</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          Common in premature infants, poor sample technique, and maternal conditions. Results <strong>must</strong> be confirmed with plasma amino acids, urine organic acids, or enzyme assays.
        </div>
      </div>
    </div>

    <div>
      <div class="card card-green" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">Key Acylcarnitine Patterns</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          &bull; <strong>C8&uarr;</strong> &rarr; MCAD deficiency<br>
          &bull; <strong>C14:1&uarr;</strong> &rarr; VLCAD deficiency<br>
          &bull; <strong>C16-OH&uarr;</strong> &rarr; LCHAD / TFP<br>
          &bull; <strong>Multiple species&uarr;</strong> &rarr; GA type 2<br>
          &bull; <strong>All low</strong> &rarr; carnitine transport defect
        </div>
      </div>
      <div class="card card-amber" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Alloisoleucine</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          <strong>Pathognomonic</strong> for MSUD. Not found in any other aminoacidopathy. Formed by transamination of isoleucine when BCAA metabolism is blocked.
        </div>
      </div>
    </div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 2: Treatable IEM That Must Not Be Missed (slides 7-9)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 7: Don't-Miss Treatable IEMs — Overview ──────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Don&rsquo;t-Miss Treatable IEMs</h1>
  <div class="section-label">11 Disorders Where Early Diagnosis Changes Outcome</div>

  <div class="highlight-box" style="margin-top:12px; padding:20px 28px;">
    <div class="label">The 11 Don&rsquo;t-Miss Treatable IEMs</div>
    <div class="value" style="font-size:26px; line-height:1.8;">
      <strong>GLUT1</strong> &bull; <strong>PDE (B6-dep. epilepsy)</strong> &bull; <strong>Biotinidase</strong> &bull; <strong>Creatine deficiency</strong> &bull; <strong>UCD</strong> &bull; <strong>MSUD</strong> &bull; <strong>PA / MMA</strong> &bull; <strong>Homocystinuria</strong> &bull; <strong>NPC</strong> &bull; <strong>X-ALD</strong> &bull; <strong>PKU</strong>
    </div>
  </div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-green" style="padding:24px;">
        <div class="card-title" style="font-size:28px;">B6-Dependent Epilepsy (PDE)</div>
        <div class="card-body" style="font-size:25px; line-height:1.7;">
          <strong>Clue:</strong> Refractory neonatal seizures<br>
          <strong>Test:</strong> Urine AASA<br>
          <strong>Tx:</strong> Pyridoxine &mdash; <em>always trial B6 in neonatal sz</em>
        </div>
      </div>
    </div>
    <div>
      <div class="card card-accent" style="padding:24px;">
        <div class="card-title" style="font-size:28px;">Biotinidase Deficiency</div>
        <div class="card-body" style="font-size:25px; line-height:1.7;">
          <strong>Clue:</strong> Seizures + alopecia + rash + SNHL<br>
          <strong>Test:</strong> Enzyme activity (on NBS)<br>
          <strong>Tx:</strong> Biotin &mdash; <em>simple, lifesaving</em>
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 8: Don't-Miss Treatable IEMs — Key Disorders ────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Don&rsquo;t-Miss Treatable IEMs</h1>
  <div class="section-label">High-Yield Disorders in Detail</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-red" style="padding:24px; margin-bottom:14px;">
        <div class="card-title" style="font-size:28px;">GLUT1 Deficiency (SLC2A1)</div>
        <div class="card-body" style="font-size:25px; line-height:1.7;">
          <strong>Clue:</strong> Fasting seizures, movement disorder<br>
          <strong>Test:</strong> CSF:serum glucose &lt;0.45<br>
          <strong>Tx:</strong> Ketogenic diet (ketones bypass defect)
        </div>
      </div>
      <div class="card card-amber" style="padding:24px;">
        <div class="card-title" style="font-size:28px;">UCD (OTC / CPS1 / ASS1)</div>
        <div class="card-body" style="font-size:25px; line-height:1.7;">
          <strong>Clue:</strong> Acute encephalopathy + hyperammonemia<br>
          <strong>Test:</strong> Ammonia + PAA + urine orotic acid<br>
          <strong>Tx:</strong> Nitrogen scavengers / dialysis
        </div>
      </div>
    </div>

    <div>
      <div class="card card-violet" style="padding:24px; margin-bottom:14px;">
        <div class="card-title" style="font-size:28px;">NPC (NPC1/NPC2)</div>
        <div class="card-body" style="font-size:25px; line-height:1.7;">
          <strong>Clue:</strong> VSGP + ataxia + cognitive decline<br>
          <strong>Test:</strong> Oxysterols / filipin staining<br>
          <strong>Tx:</strong> Miglustat (substrate reduction)
        </div>
      </div>
      <div class="card card-green" style="padding:24px;">
        <div class="card-title" style="font-size:28px;">X-ALD (ABCD1)</div>
        <div class="card-body" style="font-size:25px; line-height:1.7;">
          <strong>Clue:</strong> Boys with behavioral + WM disease<br>
          <strong>Test:</strong> VLCFAs (on NBS)<br>
          <strong>Tx:</strong> HSCT before irreversible damage
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:12px; padding:16px 24px;">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:27px;">Same gene &rarr; different phenotype based on residual enzyme activity: classic PKU vs mild HPA, infantile vs late-onset Pompe</div>
  </div>
`));

// ── Slide 9: Niemann-Pick Type C ────────────────────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Treatable IEM: Niemann-Pick Type C</h1>
  <div class="section-label">The &ldquo;Great Imitator&rdquo; of Neurology</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-red" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">Cardinal Features</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
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
        <div class="card-title" style="font-size:31px;">Diagnosis &amp; Mechanism</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          <strong>Genes:</strong> NPC1 / NPC2<br>
          <strong>Defect:</strong> Cholesterol trafficking &mdash; impaired export from late endosomes/lysosomes<br>
          <strong>Diagnosis:</strong> Filipin staining of fibroblasts or NPC1/NPC2 sequencing
        </div>
      </div>
    </div>
  </div>

  <div class="card card-green" style="padding:20px 28px; margin-top:8px;">
    <div class="card-title" style="font-size:28px;">Treatment</div>
    <div class="card-body" style="font-size:25px;"><strong>Miglustat</strong> (substrate reduction therapy) slows neurological progression. Arimoclomol and other agents in trials. Early diagnosis critical.</div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 3: Diagnostic Approach to Suspected IEM (slides 10-12)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 10: Pattern Recognition — Acute Presentations ─────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Pattern Recognition: Acute Presentations</h1>
  <div class="section-label">Clinical Clue &rarr; Diagnosis</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-red" style="padding:24px; margin-bottom:14px;">
        <div class="card-title" style="font-size:28px;">Acute Encephalopathy</div>
        <div class="card-body" style="font-size:25px; line-height:1.7;">
          &bull; + Hyperammonemia &rarr; <strong>UCD / OA / FAOD</strong><br>
          &bull; + Lactic acidosis &rarr; <strong>Mito / PDH</strong><br>
          &bull; + Maple syrup odor &rarr; <strong>MSUD</strong><br>
          &bull; After febrile illness &rarr; <strong>Intoxication IEM</strong><br>
          <em style="color:${COLORS.muted};">Pearl: Partial recovery between episodes favors IEM</em>
        </div>
      </div>
      <div class="card card-amber" style="padding:24px;">
        <div class="card-title" style="font-size:28px;">Refractory Neonatal Seizures</div>
        <div class="card-body" style="font-size:25px; line-height:1.7;">
          Think: <strong>PDE / PNPO / NKH / biotinidase / MoCoD</strong><br>
          <strong style="color:${COLORS.red};">Always trial pyridoxine in neonatal sz</strong>
        </div>
      </div>
    </div>

    <div>
      <div class="card card-accent" style="padding:24px; margin-bottom:14px;">
        <div class="card-title" style="font-size:28px;">Progressive / Storage Signs</div>
        <div class="card-body" style="font-size:25px; line-height:1.7;">
          &bull; Cherry-red spot &rarr; <strong>GM1 / GM2 / NPA</strong><br>
          &bull; HSM + neuro decline &rarr; <strong>NPC / Gaucher 3</strong><br>
          &bull; Leukodystrophy &rarr; <strong>MLD / Krabbe / X-ALD</strong><br>
          <em style="color:${COLORS.muted};">Pearl: MRI pattern narrows the DDx</em>
        </div>
      </div>
      <div class="card card-green" style="padding:24px;">
        <div class="card-title" style="font-size:28px;">Treatable Copper Disorders</div>
        <div class="card-body" style="font-size:25px; line-height:1.7;">
          &bull; Infant + hypotonia + hair abnl &rarr; <strong>Menkes</strong><br>
          &bull; Adolescent + liver + psych &rarr; <strong>Wilson</strong><br>
          <em style="color:${COLORS.muted};">Always check ceruloplasmin</em>
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:12px; padding:16px 24px;">
    <div class="label">Take-Home</div>
    <div class="value" style="font-size:27px;">Normal MRI does NOT exclude IEM &mdash; think GLUT1, creatine deficiency, NKH when regression + normal imaging</div>
  </div>
`));

// ── Slide 11: Pattern Recognition — Hidden IEM ──────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Pattern Recognition: Hidden IEMs</h1>
  <div class="section-label">Presentations That Mimic Common Conditions</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-violet" style="padding:24px; margin-bottom:14px;">
        <div class="card-title" style="font-size:28px;">Episodic Movement Disorders</div>
        <div class="card-body" style="font-size:25px; line-height:1.7;">
          Episodic ataxia or dystonic crises<br>
          Think: <strong>MSUD / OA / mito / UCD / GLUT1</strong><br>
          <em style="color:${COLORS.muted};">Timing relative to meals and fasting is critical</em>
        </div>
      </div>
      <div class="card card-red" style="padding:24px;">
        <div class="card-title" style="font-size:28px;">ID + Autism Phenotype</div>
        <div class="card-body" style="font-size:25px; line-height:1.7;">
          ID + movement disorder + absent MRS creatine<br>
          Think: <strong>Creatine deficiency (SLC6A8)</strong><br>
          <strong>Test:</strong> Urine Cr:creatinine ratio
        </div>
      </div>
    </div>

    <div>
      <div class="card card-amber" style="padding:24px; margin-bottom:14px;">
        <div class="card-title" style="font-size:28px;">Marfanoid Habitus + Thrombosis</div>
        <div class="card-body" style="font-size:25px; line-height:1.7;">
          Lens dislocation + DVT + ID<br>
          Think: <strong>Homocystinuria (CBS)</strong><br>
          <strong>Test:</strong> Total homocysteine; B6-responsive in ~50%
        </div>
      </div>
      <div class="card card-accent" style="padding:24px;">
        <div class="card-title" style="font-size:28px;">NPC: The Great Imitator</div>
        <div class="card-body" style="font-size:25px; line-height:1.7;">
          VSGP + ataxia + cognitive decline &plusmn; psychosis<br>
          Neonatal jaundice is an early clue<br>
          <strong>Test:</strong> Oxysterols; <strong>Tx:</strong> Miglustat
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:12px; padding:16px 24px;">
    <div class="label">Take-Home</div>
    <div class="value" style="font-size:27px;">Wilson and Menkes are treatable copper disorders &mdash; always check ceruloplasmin in unexplained hepatic + neuropsychiatric presentations</div>
  </div>
`));

// ── Slide 12: Acute Metabolic Workup ────────────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>Acute Metabolic Workup</h1>
  <div class="section-label">Bedside Approach to Suspected IEM</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-red" style="padding:24px; margin-bottom:14px;">
        <div class="card-title" style="font-size:28px;">1. Stabilize &amp; Collect</div>
        <div class="card-body" style="font-size:25px; line-height:1.7;">
          ABCs, correct hypoglycemia, treat seizures<br>
          <strong>Acute labs DURING crisis:</strong> ammonia, gas, glucose, lactate, lytes, LFTs, PAA, acylcarnitines, UOA
        </div>
      </div>
      <div class="card card-amber" style="padding:24px;">
        <div class="card-title" style="font-size:28px;">2. Categorize</div>
        <div class="card-body" style="font-size:25px; line-height:1.7;">
          &bull; Small vs large molecule<br>
          &bull; Acute vs progressive<br>
          &bull; Multi-organ vs brain-only<br>
          &bull; Check NBS &mdash; <strong style="color:${COLORS.red};">normal NBS does NOT exclude all IEMs</strong>
        </div>
      </div>
    </div>

    <div>
      <div class="card card-green" style="padding:24px; margin-bottom:14px;">
        <div class="card-title" style="font-size:28px;">3. Treatable Signal?</div>
        <div class="card-body" style="font-size:25px; line-height:1.7;">
          UCD / OA / aminoacidopathy / creatine def. / PDE / GLUT1 / Wilson / Menkes<br>
          <strong>&rarr; Immediate metabolics consult</strong>
        </div>
      </div>
      <div class="card card-accent" style="padding:24px;">
        <div class="card-title" style="font-size:28px;">4. Unrevealing? Go Genomic</div>
        <div class="card-body" style="font-size:25px; line-height:1.7;">
          Proceed to <strong>WES/WGS without delay</strong><br>
          Exhaustive sequential biochemical testing is outdated
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:12px; padding:16px 24px;">
    <div class="label">Rule</div>
    <div class="value" style="font-size:27px;">Collect metabolic labs DURING the acute crisis &mdash; many metabolites normalize between episodes</div>
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
        <div class="card-title" style="font-size:31px;">Dietary Restriction</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
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
        <div class="card-title" style="font-size:31px;">Cofactor Supplementation</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
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
        <div class="card-title" style="font-size:28px;">Enzyme Replacement Therapy (ERT)</div>
        <div class="card-body" style="font-size:24px;">Fabry (agalsidase beta), Pompe (alglucosidase alfa), MPS I (laronidase), MPS II (idursulfase), Gaucher (imiglucerase). IV infusions; <strong>BBB limits CNS efficacy</strong> for neurological LSDs.</div>
      </div>
    </div>
    <div class="card card-amber" style="display:flex; gap:18px; align-items:flex-start; padding:20px 24px;">
      <div class="number-circle" style="background:${COLORS.amber};">2</div>
      <div>
        <div class="card-title" style="font-size:28px;">Substrate Reduction Therapy (SRT)</div>
        <div class="card-body" style="font-size:24px;">Miglustat and eliglustat (Gaucher, NPC) &mdash; oral small molecules inhibiting substrate synthesis. Useful when ERT has limited CNS access. Miglustat slows NPC progression.</div>
      </div>
    </div>
    <div class="card card-green" style="display:flex; gap:18px; align-items:flex-start; padding:20px 24px;">
      <div class="number-circle" style="background:${COLORS.green};">3</div>
      <div>
        <div class="card-title" style="font-size:28px;">Gene Therapy &amp; HSCT</div>
        <div class="card-body" style="font-size:24px;">SMA (Zolgensma, approved 2019 &mdash; paradigm for IEM gene therapy). MLD (Libmeldy &mdash; ex vivo, approved EU). OTC deficiency and MMA trials ongoing. HSCT for Krabbe, MLD, X-ALD.</div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:12px;">
    <div class="label">Key Limitation</div>
    <div class="value" style="font-size:28px;">ERT proteins (~60&ndash;80 kDa) cannot cross the blood-brain barrier &mdash; this drives development of IT delivery, gene therapy, and SRT for neurological LSDs</div>
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
