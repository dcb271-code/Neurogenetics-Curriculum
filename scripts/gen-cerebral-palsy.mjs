/**
 * scripts/gen-cerebral-palsy.mjs
 *
 * Generates 15 slides for the Genetic Causes of Cerebral Palsy module.
 * Sections (from data/modules/cerebral-palsy.json):
 *   S0: Redefining CP: Beyond Perinatal Injury (slides 1-3)
 *   S1: Chromosomal Abnormalities and CNVs in CP (slides 4-6)
 *   S2: Monogenic Causes and CP Mimics (slides 7-9)
 *   S3: Genetic Workup for CP (slides 10-12)
 *   S4: Counseling and Management (slides 13-15)
 *
 * distributeSlides(15, 5) -> 3 per section, 0 remainder.
 *
 * Run: node scripts/gen-cerebral-palsy.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "cerebral-palsy";
const mc = MODULE_COLORS[MOD];
const TOTAL = 15;

const slides = [];

/* ================================================================
   S0 — Redefining CP: Beyond Perinatal Injury  (slides 1-3)
   ================================================================ */

// -- Slide 1: Title ----------------------------------------------------------
slides.push(titleSlideHTML(MOD, {
  title: "Genetic Causes of Cerebral Palsy",
  subtitle: "Redefining CP — from perinatal injury to genomic diagnosis",
  totalSlides: TOTAL,
  topics: [
    "Redefining CP beyond perinatal injury",
    "Chromosomal abnormalities & CNVs",
    "Monogenic causes & CP mimics",
    "Genetic workup for CP",
    "Counseling & management",
  ],
}));

// -- Slide 2: CP Motor Subtypes (summary cards) ------------------------------
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>CP Motor Subtypes</h1>
  <div class="section-label">Classification Overview &mdash; full table in reading material</div>

  <div class="two-col" style="margin-top:20px;">
    <div>
      <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:33px;">Spastic CP (~80%)</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          Diplegia / hemiplegia / quadriplegia<br><br>
          Velocity-dependent &uarr; tone (clasp-knife)<br><br>
          MRI: PVL, MCA infarct, or diffuse injury
        </div>
      </div>
      <div class="card card-violet" style="padding:28px;">
        <div class="card-title" style="font-size:33px;">Ataxic CP (~5%)</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          Cerebellar ataxia / hypotonia<br><br>
          Rule out Angelman; consider genetic ataxias
        </div>
      </div>
    </div>
    <div>
      <div class="card card-green" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:33px;">Dyskinetic CP (~15%)</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          Dystonia &plusmn; choreoathetosis<br><br>
          BG/thalamic injury (HIE, kernicterus)<br><br>
          <strong>Always exclude DRD &amp; treatable metabolic</strong>
        </div>
      </div>
      <div class="card" style="padding:28px; border:2px solid ${COLORS.amber}; background:${COLORS.amberLight};">
        <div class="card-title" style="font-size:33px;">Mixed</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          Spasticity + dystonia most common<br><br>
          Describe each component separately
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:12px;">
    <div class="label">Key Principle</div>
    <div class="value" style="font-size:31px;">CP is a clinical syndrome &mdash; not a specific diagnosis. Etiology must be actively sought.</div>
  </div>
`));

// -- Slide 3: GMFCS Summary --------------------------------------------------
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>GMFCS Levels I&ndash;V</h1>
  <div class="section-label">Gross Motor Function Classification &mdash; full table in reading material</div>

  <div class="stats-row" style="margin-top:24px; margin-bottom:24px;">
    <div class="stat-card" style="background:${COLORS.greenLight}; border-color:${COLORS.green};">
      <div class="stat-label">Level I&ndash;II</div>
      <div class="stat-value" style="font-size:36px;">Community Ambulators</div>
    </div>
    <div class="stat-card" style="background:${COLORS.amberLight}; border-color:${COLORS.amber};">
      <div class="stat-label">Level III</div>
      <div class="stat-value" style="font-size:36px;">Assisted Ambulation</div>
    </div>
    <div class="stat-card" style="background:${COLORS.redLight}; border-color:${COLORS.red};">
      <div class="stat-label">Level IV&ndash;V</div>
      <div class="stat-value" style="font-size:36px;">Wheelchair / Transported</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:31px;">Treatment Matching</div>
      <div class="card-body" style="font-size:27px; line-height:1.7;">
        <strong>SDR:</strong> spastic diplegia, GMFCS II&ndash;III<br><br>
        <strong>ITB pump:</strong> GMFCS III&ndash;V<br><br>
        <strong>Level V:</strong> nutrition &amp; respiratory surveillance priority
      </div>
    </div>
    <div class="card card-green" style="padding:28px;">
      <div class="card-title" style="font-size:31px;">Strongest Predictor</div>
      <div class="card-body" style="font-size:27px; line-height:1.7;">
        GMFCS is the <strong>strongest predictor of long-term ambulation</strong><br><br>
        Genetic diagnosis does not change GMFCS level but may redirect treatment (e.g., DRD &rarr; levodopa instead of SDR)
      </div>
    </div>
  </div>
`));

/* ================================================================
   S1 — Chromosomal Abnormalities and CNVs in CP  (slides 4-6)
   ================================================================ */

// -- Slide 4: CMA Yield in CP ------------------------------------------------
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Chromosomal Microarray in CP</h1>
  <div class="section-label">Diagnostic Yield of CMA</div>

  <div class="stats-row" style="margin-top:20px; margin-bottom:24px;">
    <div class="stat-card" style="background:${mc.light}; border-color:${mc.accent};">
      <div class="stat-label">CMA Diagnostic Yield</div>
      <div class="stat-value">7&ndash;11%</div>
    </div>
    <div class="stat-card" style="background:${COLORS.greenLight}; border-color:${COLORS.green};">
      <div class="stat-label">Highest Yield Group</div>
      <div class="stat-value">Term, No Risk Factor</div>
    </div>
    <div class="stat-card" style="background:${COLORS.violetLight}; border-color:${COLORS.violet};">
      <div class="stat-label">Overall CNV Rate in CP</div>
      <div class="stat-value">8&ndash;15%</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-accent" style="padding:24px;">
      <div class="card-title" style="font-size:29px;">What CMA Detects</div>
      <div class="card-body" style="font-size:25px; line-height:1.6;">
        Sub-microscopic deletions and duplications<br><br>
        Classic chromosomal aneuploidies<br><br>
        SNP-based arrays also detect uniparental disomy (UPD)
      </div>
    </div>
    <div class="card card-green" style="padding:24px;">
      <div class="card-title" style="font-size:29px;">Clinical Impact</div>
      <div class="card-body" style="font-size:25px; line-height:1.6;">
        Reframes the diagnosis from "acquired CP" to specific genetic syndrome<br><br>
        Provides recurrence risk information<br><br>
        Identifies additional health surveillance needs
      </div>
    </div>
  </div>
`));

// -- Slide 5: Key CNVs in CP -------------------------------------------------
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Key CNVs in CP Phenotype</h1>
  <div class="section-label">Chromosomal Abnormalities</div>

  <table style="margin-top:16px;">
    <thead>
      <tr>
        <th style="width:25%;">Region / Syndrome</th>
        <th style="width:20%;">Key Gene(s)</th>
        <th style="width:55%;">CP Phenotype &amp; Features</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1p36 Deletion</td>
        <td>Multiple</td>
        <td>Hypotonia, moderate-severe ID, seizures, cardiomyopathy; specific dysmorphic features</td>
      </tr>
      <tr>
        <td>17p13.3 Deletion</td>
        <td>LIS1 / YWHAE</td>
        <td>Miller-Dieker: pachygyria/lissencephaly on MRI; severe neurological impairment</td>
      </tr>
      <tr>
        <td>15q11-13 (Angelman)</td>
        <td>UBE3A</td>
        <td>Ataxic gait, absent speech, seizures &mdash; "CP-like"; happy affect; test SNRPN methylation</td>
      </tr>
      <tr>
        <td>Xq28 Duplication</td>
        <td>MECP2</td>
        <td>Males: progressive spastic quadriplegia, severe ID, respiratory infections</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Diagnostic Clue</div>
    <div class="value" style="font-size:31px;">Angelman syndrome mimics CP (ataxic gait + absent speech + seizures) &mdash; SNRPN methylation testing is key</div>
  </div>
`, `
  tbody td { font-size:22px; padding:13px 18px; }
  thead th { font-size:21px; padding:13px 18px; }
`));

// -- Slide 6: Angelman & MECP2 Deep Dive ------------------------------------
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Angelman Syndrome &amp; MECP2 Dup</h1>
  <div class="section-label">CP Mimics from Chromosomal Causes</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Angelman Syndrome</div>
        <div class="card-body" style="font-size:27px; line-height:1.6;">
          Loss of maternal 15q11-13 &rarr; absent UBE3A<br><br>
          <strong>Presentation:</strong> ataxic gait, absent/minimal speech, seizures, happy demeanor<br><br>
          <strong>SNRPN methylation testing</strong> detects deletion, UPD, and imprinting center defects<br><br>
          Often initially labeled as "ataxic CP"
        </div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">MECP2 Duplication Syndrome</div>
        <div class="card-body" style="font-size:27px; line-height:1.6;">
          Xq28 duplication &mdash; males affected<br><br>
          <strong>Progressive</strong> spastic quadriplegia + severe ID<br><br>
          Recurrent respiratory infections<br><br>
          Distinguished from CP by <strong>progressive course</strong> and X-linked family history<br><br>
          Somatic mosaicism can complicate interpretation
        </div>
      </div>
    </div>
  </div>
`));

/* ================================================================
   S2 — Monogenic Causes and CP Mimics  (slides 7-9)
   ================================================================ */

// -- Slide 7: CP Mimickers by Category (1 of 2) ------------------------------
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>CP Mimickers by Category</h1>
  <div class="section-label">Treatable &amp; Hereditary Mimics &mdash; full table in reading material</div>

  <div class="two-col" style="margin-top:20px;">
    <div>
      <div class="card card-green" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">Treatable Metabolic</div>
        <div class="card-body" style="font-size:27px; line-height:1.8;">
          <strong>ARG1 deficiency:</strong> progressive spastic diplegia &rarr; check plasma arginine<br><br>
          <strong>GA1 (GCDH):</strong> macrocephaly + striatal crisis &rarr; on NBS; lysine restriction<br><br>
          <strong>GLUT1 (SLC2A1):</strong> exercise-induced dystonia &rarr; ketogenic diet<br><br>
          <strong>Biotinidase:</strong> spasticity + seizures + rash &rarr; biotin = cure
        </div>
      </div>
    </div>
    <div>
      <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">Hereditary Spastic / Regressive</div>
        <div class="card-body" style="font-size:27px; line-height:1.8;">
          <strong>HSP (SPG4+):</strong> multi-generational &ldquo;CP&rdquo; = HSP until proven otherwise<br><br>
          <strong>Leukodystrophies:</strong> regression after plateau &mdash; CP does NOT progress<br><br>
          <strong>Rett (MECP2):</strong> regression 12&ndash;18 mo + hand stereotypies
        </div>
      </div>
      <div class="card card-violet" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Episodic / Structural</div>
        <div class="card-body" style="font-size:27px; line-height:1.8;">
          <strong>AHC (ATP1A3):</strong> alternating hemiplegia; sleep resolves<br><br>
          <strong>Spinal cord:</strong> image spine if diplegia progresses
        </div>
      </div>
    </div>
  </div>
`));

// -- Slide 8: Must-Not-Miss CP Mimics ----------------------------------------
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Must-Not-Miss CP Mimics</h1>
  <div class="section-label">DRD, NPC &amp; Mitochondrial</div>

  <div class="two-col" style="margin-top:20px;">
    <div>
      <div class="card card-red" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:33px;">DRD (GCH1) &mdash; #1 Mimic</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          Diurnal variation: worse PM, better AM<br><br>
          Normal MRI<br><br>
          <strong>Levodopa trial MANDATORY</strong><br>
          1&ndash;2 mg/kg/day TID &mdash; dramatic response within days
        </div>
      </div>
      <div class="card" style="padding:28px; border:2px solid ${COLORS.amber}; background:${COLORS.amberLight};">
        <div class="card-title" style="font-size:33px;">NPC (NPC1/NPC2)</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          Cardinal sign: vertical supranuclear gaze palsy<br><br>
          Ataxia + cognitive decline + hepatosplenomegaly<br><br>
          Test: oxysterols, filipin staining
        </div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:33px;">Mitochondrial Disease</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          Episodic decompensation; multi-system<br><br>
          Elevated lactate; Leigh pattern on MRI<br><br>
          Illness-triggered worsening distinguishes from static CP
        </div>
      </div>

      <div class="highlight-box">
        <div class="label">Red Flag Rule</div>
        <div class="value" style="font-size:31px;">If &ldquo;CP&rdquo; is progressive or regressive &mdash; <strong>STOP</strong>. It is not CP. Rethink with metabolic screen + WES/WGS.</div>
      </div>
    </div>
  </div>
`));

// -- Slide 9: GLUT1 & Biotinidase --------------------------------------------
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>GLUT1 &amp; Biotinidase Deficiency</h1>
  <div class="section-label">Additional Treatable CP Mimics</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">GLUT1 Deficiency (SLC2A1)</div>
        <div class="card-body" style="font-size:27px; line-height:1.6;">
          Impaired glucose transport into the brain<br><br>
          Paroxysmal exercise-induced dystonia + seizures<br><br>
          Low CSF-to-blood glucose ratio (&lt;0.4)<br><br>
          <strong>Treatment:</strong> ketogenic diet provides alternative brain fuel<br><br>
          Autosomal dominant; often de novo
        </div>
      </div>
    </div>
    <div>
      <div class="card card-green" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">Biotinidase Deficiency</div>
        <div class="card-body" style="font-size:27px; line-height:1.6;">
          Autosomal recessive; on newborn screen<br><br>
          Spasticity, seizures, hearing loss, skin rash<br><br>
          <strong>Treatment:</strong> biotin supplementation &mdash; complete resolution
        </div>
      </div>

      <div class="highlight-box">
        <div class="label">Key Principle</div>
        <div class="value" style="font-size:31px;">Many CP mimics are fully treatable &mdash; early identification dramatically changes prognosis</div>
      </div>
    </div>
  </div>
`));

/* ================================================================
   S3 — Genetic Workup for Cerebral Palsy  (slides 10-12)
   ================================================================ */

// -- Slide 10: Etiological Workup Scenarios (summary cards) -------------------
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Etiological Workup Scenarios</h1>
  <div class="section-label">Tailored Testing Strategy &mdash; full table in reading material</div>

  <div class="two-col" style="margin-top:20px;">
    <div>
      <div class="card card-accent" style="padding:24px; margin-bottom:14px;">
        <div class="card-title" style="font-size:29px;">1. All CP &mdash; Brain MRI</div>
        <div class="card-body" style="font-size:26px; line-height:1.6;">
          Identifies cause in ~80%<br>
          <strong style="color:${COLORS.red};">Normal MRI = RED FLAG</strong> &mdash; pursue genetic/metabolic workup
        </div>
      </div>
      <div class="card card-violet" style="padding:24px; margin-bottom:14px;">
        <div class="card-title" style="font-size:29px;">2. Normal MRI / Unexplained</div>
        <div class="card-body" style="font-size:26px; line-height:1.6;">
          CMA + WES + metabolic screen<br>
          PAA, UOA, lactate, acylcarnitines
        </div>
      </div>
    </div>
    <div>
      <div class="card card-green" style="padding:24px; margin-bottom:14px;">
        <div class="card-title" style="font-size:29px;">3. Dyskinetic + Normal MRI</div>
        <div class="card-body" style="font-size:26px; line-height:1.6;">
          Levodopa trial + CSF NTs<br>
          GCH1/TH genes + plasma arginine
        </div>
      </div>
      <div class="card card-red" style="padding:24px;">
        <div class="card-title" style="font-size:29px;">4. Progressive / Regression</div>
        <div class="card-body" style="font-size:26px; line-height:1.6;">
          <strong>STOP</strong> &mdash; reconsider CP diagnosis<br>
          Metabolic screen + WES/WGS urgently
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:14px;">
    <div class="label">Emerging</div>
    <div class="value" style="font-size:31px;">WGS as first-tier in some centers &mdash; detects SVs, repeat expansions, deep intronic variants; yield ~35&ndash;40%</div>
  </div>
`));

// -- Slide 11: Predicting Genetic Yield ---------------------------------------
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Predicting Genetic Yield</h1>
  <div class="section-label">Which CP Patients to Test</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-green" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">High Genetic Yield Features</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          <ul class="bullet-list">
            <li>Term birth without HIE</li>
            <li>Normal MRI or cortical malformation</li>
            <li>Family history of developmental delay / CP</li>
            <li>Additional features beyond motor (epilepsy, regression, movement disorder, dysmorphism)</li>
          </ul>
        </div>
      </div>
    </div>
    <div>
      <div class="card card-red" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">Lower Genetic Yield</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          <ul class="bullet-list">
            <li>Preterm birth with PVL on MRI</li>
            <li>Documented severe perinatal asphyxia</li>
            <li>Clear traumatic birth injury</li>
          </ul>
        </div>
      </div>

      <div class="stats-row" style="flex-direction:column; gap:10px;">
        <div class="stat-card" style="background:${mc.light}; border-color:${mc.accent};">
          <div class="stat-label">Exome Yield (Selected Patients)</div>
          <div class="stat-value">25&ndash;30%</div>
        </div>
        <div class="stat-card" style="background:${COLORS.greenLight}; border-color:${COLORS.green};">
          <div class="stat-label">WGS Yield (Pediatric Neurogenetics)</div>
          <div class="stat-value">35&ndash;40%</div>
        </div>
      </div>
    </div>
  </div>
`));

// -- Slide 12: MRI Patterns Guide Diagnosis -----------------------------------
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>MRI Patterns Guide Diagnosis</h1>
  <div class="section-label">Brain Imaging in CP</div>

  <table style="margin-top:16px;">
    <thead>
      <tr>
        <th style="width:30%;">MRI Pattern</th>
        <th style="width:30%;">Most Likely Etiology</th>
        <th style="width:40%;">Genetic Considerations</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Periventricular leukomalacia</td>
        <td>Preterm ischemic injury</td>
        <td>Lower genetic yield &mdash; but still consider HSP genes</td>
      </tr>
      <tr>
        <td>Cortical dysplasia / malformation</td>
        <td>Genetic &mdash; migration defect</td>
        <td>High yield: tubulinopathies, LIS1, DCX</td>
      </tr>
      <tr>
        <td>Vascular pattern (porencephaly)</td>
        <td>Stroke / coagulopathy</td>
        <td>COL4A1 variants; thrombophilia screen</td>
      </tr>
      <tr>
        <td>Normal MRI</td>
        <td>Highest genetic yield</td>
        <td>CMA &rarr; exome; consider DRD, GLUT1, HSP</td>
      </tr>
      <tr>
        <td>Basal ganglia lesions</td>
        <td>Metabolic / acquired</td>
        <td>GA1, mitochondrial, kernicterus</td>
      </tr>
    </tbody>
  </table>
`, `
  tbody td { font-size:22px; padding:13px 18px; }
  thead th { font-size:21px; padding:13px 18px; }
`));

/* ================================================================
   S4 — Counseling and Management  (slides 13-15)
   ================================================================ */

// -- Slide 13: Recurrence Risk ------------------------------------------------
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Recurrence Risk Counseling</h1>
  <div class="section-label">Risk Depends on Genetic Mechanism</div>

  <table style="margin-top:16px;">
    <thead>
      <tr>
        <th style="width:35%;">Genetic Mechanism</th>
        <th style="width:20%;">Recurrence Risk</th>
        <th style="width:45%;">Key Counseling Points</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>De novo CNV or variant</td>
        <td>&lt;1%</td>
        <td>Germline mosaicism caveat (~1&ndash;2%); prenatal testing available</td>
      </tr>
      <tr>
        <td>Autosomal recessive</td>
        <td>25%</td>
        <td>Both parents are carriers; prenatal/preimplantation testing available</td>
      </tr>
      <tr>
        <td>AD inherited from parent</td>
        <td>50%</td>
        <td>Variable expressivity may mean parent is mildly affected</td>
      </tr>
      <tr>
        <td>X-linked</td>
        <td>Variable</td>
        <td>Depends on sex and carrier status; carrier females may be affected</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:20px;">
    <div class="label">Key Message</div>
    <div class="value" style="font-size:31px;">The CP label does NOT preclude genetic investigation &mdash; 20&ndash;30% of labeled CP cases have genetic causes that matter for management and family planning</div>
  </div>
`));

// -- Slide 14: Treatment Principles (summary) ---------------------------------
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>Treatment Principles</h1>
  <div class="section-label">Match Treatment to Phenotype &amp; Genotype &mdash; full table in reading material</div>

  <div class="two-col" style="margin-top:20px;">
    <div>
      <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">Spasticity Pathway</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          <strong>First-line:</strong> Oral baclofen (GABA-B)<br><br>
          <strong>Focal:</strong> BoNT-A injections q3&ndash;6 mo<br><br>
          <strong>Surgical:</strong> SDR for spastic diplegia GMFCS II&ndash;III<br>
          <span style="color:${COLORS.muted};">NOT for dystonia</span><br><br>
          <strong>Severe (GMFCS III&ndash;V):</strong> ITB pump
        </div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">Dystonia Pathway</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          <strong>Step 1:</strong> Levodopa trial (mandatory if normal MRI)<br><br>
          <strong>Step 2:</strong> Trihexyphenidyl (anticholinergic)<br><br>
          <strong>Step 3:</strong> ITB pump or DBS for refractory cases
        </div>
      </div>
      <div class="card card-green" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Genotype-Directed</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          DRD &rarr; levodopa (life-changing)<br>
          GLUT1 &rarr; ketogenic diet<br>
          GA1 &rarr; lysine restriction<br>
          Biotinidase &rarr; biotin = cure
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:10px; border-color:${COLORS.red}; background:${COLORS.redLight};">
    <div class="label" style="color:${COLORS.red};">Baclofen Withdrawal &mdash; EMERGENCY</div>
    <div class="value" style="font-size:28px;">Fever + AMS + rigidity + seizures + autonomic instability. Treat with IV benzodiazepines. If ITB pump &mdash; neurosurgery STAT.</div>
  </div>
`));

// -- Slide 15: Key Takeaways -------------------------------------------------
slides.push(takeawaysSlideHTML(MOD, 15, TOTAL, [
  {
    title: "CP is a syndrome, not a diagnosis",
    body: "~14\u201331% of 'idiopathic' CP has an identifiable genetic cause \u2014 always seek the etiology.",
  },
  {
    title: "10 CP mimickers to know",
    body: "DRD, HSP, AHC, leukodystrophies, Rett, ARG1, GA1, NPC, mitochondrial, spinal cord lesions \u2014 all misdiagnosed as CP.",
  },
  {
    title: "Levodopa trial is MANDATORY",
    body: "Any child with dystonia + normal MRI must receive a levodopa trial. Low risk, potentially life-changing.",
  },
  {
    title: "Workup by scenario, not one-size-fits-all",
    body: "Normal MRI \u2192 CMA + WES. Dyskinetic \u2192 levodopa + CSF NT + arginine. Progressive \u2192 STOP, it's not CP.",
  },
  {
    title: "Treatment matches phenotype AND genotype",
    body: "Baclofen (spasticity), trihexyphenidyl (dystonia), SDR (spastic diplegia GMFCS II\u2013III only, NOT dystonia). Know baclofen withdrawal.",
  },
]));

// -- Render -------------------------------------------------------------------
await renderSlides(MOD, slides);
