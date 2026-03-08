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

// -- Slide 2: CP Motor Subtypes Table -----------------------------------------
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>CP Motor Subtypes</h1>
  <div class="section-label">Classification, Tone &amp; MRI Correlates</div>

  <table style="margin-top:16px;">
    <thead>
      <tr>
        <th style="width:16%;">Subtype</th>
        <th style="width:18%;">Motor Topography</th>
        <th style="width:20%;">Predominant Tone</th>
        <th style="width:28%;">MRI Correlates</th>
        <th style="width:18%;">Pearls</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Spastic (~80%)</td>
        <td>Diplegia / hemiplegia / quadriplegia</td>
        <td>Velocity-dependent &uarr; tone</td>
        <td>PVL (preterm diplegia); MCA infarct (hemiplegia); diffuse injury (quad)</td>
        <td>Most common; clasp-knife quality</td>
      </tr>
      <tr>
        <td>Dyskinetic (~15%)</td>
        <td>Trunk / limb / whole-body</td>
        <td>Dystonia &plusmn; choreoathetosis</td>
        <td>Bilateral BG/thalamic signal (term HIE); kernicterus &rarr; GP</td>
        <td>Always exclude DRD &amp; treatable metabolic</td>
      </tr>
      <tr>
        <td>Ataxic (~5%)</td>
        <td>Trunk / appendicular</td>
        <td>Cerebellar ataxia / hypotonia</td>
        <td>Cerebellar hypoplasia; posterior fossa malformation</td>
        <td>Rule out Angelman; consider genetic ataxias</td>
      </tr>
      <tr>
        <td>Mixed</td>
        <td>Variable</td>
        <td>Spasticity + dystonia most common</td>
        <td>Reflects mixed mechanisms</td>
        <td>Describe each component separately</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:12px;">
    <div class="label">Key Principle</div>
    <div class="value" style="font-size:22px;">CP is a clinical syndrome (motor impairment + non-progressive brain abnormality) &mdash; not a specific diagnosis. Etiology must be actively sought.</div>
  </div>
`, `
  tbody td { font-size:15px; padding:12px 14px; }
  thead th { font-size:14px; padding:12px 14px; }
`));

// -- Slide 3: GMFCS Levels I-V -----------------------------------------------
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>GMFCS Levels I&ndash;V</h1>
  <div class="section-label">Gross Motor Function Classification System</div>

  <table style="margin-top:16px;">
    <thead>
      <tr>
        <th style="width:10%;">Level</th>
        <th style="width:30%;">Functional Description</th>
        <th style="width:30%;">Mobility</th>
        <th style="width:30%;">Clinical Implications</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>I</td>
        <td>Walks without limitations</td>
        <td>Community ambulation; runs/jumps with speed &amp; coordination limitations</td>
        <td>Mild motor impairment; minimal therapy needs</td>
      </tr>
      <tr>
        <td>II</td>
        <td>Walks with limitations</td>
        <td>Assistive device outdoors; limited stairs &amp; uneven surfaces</td>
        <td>Candidate for SDR if spastic diplegia</td>
      </tr>
      <tr>
        <td>III</td>
        <td>Walks with hand-held device</td>
        <td>Wheelchair for distances; some household ambulation</td>
        <td>SDR or ITB candidate; intensive PT</td>
      </tr>
      <tr>
        <td>IV</td>
        <td>Wheelchair-dependent</td>
        <td>May achieve standing transfers; limited self-mobility</td>
        <td>ITB pump candidate; seating/positioning focus</td>
      </tr>
      <tr>
        <td>V</td>
        <td>Transported in wheelchair</td>
        <td>No independent mobility; head/trunk control limited</td>
        <td>Highest comorbidity burden; nutrition/respiratory surveillance</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:12px;">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:22px;">GMFCS level is the strongest predictor of long-term ambulation. Genetic diagnosis does not change GMFCS but may redirect treatment strategy (e.g., DRD &rarr; levodopa instead of SDR).</div>
  </div>
`, `
  tbody td { font-size:16px; padding:12px 16px; }
  thead th { font-size:15px; padding:12px 16px; }
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
      <div class="card-title" style="font-size:21px;">What CMA Detects</div>
      <div class="card-body" style="font-size:18px; line-height:1.6;">
        Sub-microscopic deletions and duplications<br><br>
        Classic chromosomal aneuploidies<br><br>
        SNP-based arrays also detect uniparental disomy (UPD)
      </div>
    </div>
    <div class="card card-green" style="padding:24px;">
      <div class="card-title" style="font-size:21px;">Clinical Impact</div>
      <div class="card-body" style="font-size:18px; line-height:1.6;">
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
    <div class="value" style="font-size:22px;">Angelman syndrome mimics CP (ataxic gait + absent speech + seizures) &mdash; SNRPN methylation testing is key</div>
  </div>
`, `
  tbody td { font-size:16px; padding:13px 18px; }
  thead th { font-size:15px; padding:13px 18px; }
`));

// -- Slide 6: Angelman & MECP2 Deep Dive ------------------------------------
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Angelman Syndrome &amp; MECP2 Dup</h1>
  <div class="section-label">CP Mimics from Chromosomal Causes</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Angelman Syndrome</div>
        <div class="card-body" style="font-size:19px; line-height:1.6;">
          Loss of maternal 15q11-13 &rarr; absent UBE3A<br><br>
          <strong>Presentation:</strong> ataxic gait, absent/minimal speech, seizures, happy demeanor<br><br>
          <strong>SNRPN methylation testing</strong> detects deletion, UPD, and imprinting center defects<br><br>
          Often initially labeled as "ataxic CP"
        </div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">MECP2 Duplication Syndrome</div>
        <div class="card-body" style="font-size:19px; line-height:1.6;">
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

// -- Slide 7: CP Mimickers Table (1 of 2) ------------------------------------
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>CP Mimickers (1 of 2)</h1>
  <div class="section-label">Monogenic Conditions Misdiagnosed as CP</div>

  <table style="margin-top:14px;">
    <thead>
      <tr>
        <th style="width:18%;">Condition (Gene)</th>
        <th style="width:28%;">Key Clinical Clues</th>
        <th style="width:27%;">MRI / Labs</th>
        <th style="width:27%;">Pearls</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>DRD (GCH1)</td>
        <td>Diurnal variation of dystonia; worse PM, better AM</td>
        <td>Normal MRI</td>
        <td>Levodopa trial MANDATORY; dramatic response within days</td>
      </tr>
      <tr>
        <td>HSP (SPG4+)</td>
        <td>Progressive spastic diplegia; family hx of "mild CP"</td>
        <td>Thin corpus callosum; &gt;80 genes</td>
        <td>Multi-generational "CP" = HSP until proven otherwise</td>
      </tr>
      <tr>
        <td>AHC (ATP1A3)</td>
        <td>Episodic hemiplegia alternating sides; onset &lt;18 mo</td>
        <td>Normal MRI early</td>
        <td>Sleep resolves episodes; may develop fixed dystonia</td>
      </tr>
      <tr>
        <td>Leukodystrophies</td>
        <td>Progressive; regression after plateau</td>
        <td>New white matter signal on MRI</td>
        <td>CP does NOT progress &mdash; regression = stop &amp; rethink</td>
      </tr>
      <tr>
        <td>Rett (MECP2)</td>
        <td>Regression 12&ndash;18 mo; hand stereotypies</td>
        <td>Breathing irregularities; normal early MRI</td>
        <td>Females; loss of hand use &amp; speech is hallmark</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:12px;">
    <div class="label">Levodopa Trial Protocol</div>
    <div class="value" style="font-size:20px;">Start 1&ndash;2 mg/kg/day divided TID, titrate over 2&ndash;4 weeks. DRD response: dramatic within days. Low risk, potentially life-changing. <strong>MANDATORY in dystonia + normal MRI.</strong></div>
  </div>
`, `
  tbody td { font-size:15px; padding:11px 14px; }
  thead th { font-size:14px; padding:11px 14px; }
`));

// -- Slide 8: CP Mimickers Table (2 of 2) ------------------------------------
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>CP Mimickers (2 of 2)</h1>
  <div class="section-label">Metabolic &amp; Structural Mimics</div>

  <table style="margin-top:14px;">
    <thead>
      <tr>
        <th style="width:18%;">Condition (Gene)</th>
        <th style="width:28%;">Key Clinical Clues</th>
        <th style="width:27%;">MRI / Labs</th>
        <th style="width:27%;">Pearls</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>ARG1 (arginase def.)</td>
        <td>Progressive spastic diplegia; ID</td>
        <td>Elevated plasma arginine</td>
        <td>Treatable UCD &mdash; protein restriction; hyperammonemia may be subtle</td>
      </tr>
      <tr>
        <td>GA1 (GCDH)</td>
        <td>Macrocephaly + bilateral striatal injury after crisis</td>
        <td>Frontotemporal hypoplasia; &uarr; glutaric/3-OH-glutaric acid</td>
        <td>On NBS; dietary lysine restriction prevents crisis</td>
      </tr>
      <tr>
        <td>NPC (NPC1/NPC2)</td>
        <td>VSGP + ataxia + cognitive decline + HSM</td>
        <td>Oxysterols elevated; filipin staining</td>
        <td>Vertical supranuclear gaze palsy is the cardinal sign</td>
      </tr>
      <tr>
        <td>Mitochondrial</td>
        <td>Episodic decompensation; multi-system</td>
        <td>Elevated lactate; Leigh pattern MRI (BG/brainstem)</td>
        <td>Illness-triggered worsening distinguishes from static CP</td>
      </tr>
      <tr>
        <td>Spinal cord (tethered/tumor)</td>
        <td>Progressive diplegia; bowel/bladder dysfunction</td>
        <td>Spinal MRI required; cutaneous stigmata</td>
        <td>Not cerebral &mdash; always image spine if diplegia progresses</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:12px;">
    <div class="label">Red Flag Rule</div>
    <div class="value" style="font-size:22px;">If "CP" is progressive or regressive &mdash; STOP. It is not CP. Rethink the diagnosis with metabolic screen + WES/WGS.</div>
  </div>
`, `
  tbody td { font-size:15px; padding:11px 14px; }
  thead th { font-size:14px; padding:11px 14px; }
`));

// -- Slide 9: GLUT1 & Biotinidase --------------------------------------------
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>GLUT1 &amp; Biotinidase Deficiency</h1>
  <div class="section-label">Additional Treatable CP Mimics</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">GLUT1 Deficiency (SLC2A1)</div>
        <div class="card-body" style="font-size:19px; line-height:1.6;">
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
        <div class="card-title" style="font-size:22px;">Biotinidase Deficiency</div>
        <div class="card-body" style="font-size:19px; line-height:1.6;">
          Autosomal recessive; on newborn screen<br><br>
          Spasticity, seizures, hearing loss, skin rash<br><br>
          <strong>Treatment:</strong> biotin supplementation &mdash; complete resolution
        </div>
      </div>

      <div class="highlight-box">
        <div class="label">Key Principle</div>
        <div class="value" style="font-size:22px;">Many CP mimics are fully treatable &mdash; early identification dramatically changes prognosis</div>
      </div>
    </div>
  </div>
`));

/* ================================================================
   S3 — Genetic Workup for Cerebral Palsy  (slides 10-12)
   ================================================================ */

// -- Slide 10: Etiological Workup by Scenario (1 of 2) -----------------------
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Etiological Workup by Scenario</h1>
  <div class="section-label">Tailored Testing Strategy for CP</div>

  <div class="numbered-item" style="margin-top:14px;">
    <div class="number-circle" style="background:${mc.accent};">1</div>
    <div>
      <strong style="font-size:22px;">All CP &mdash; Brain MRI</strong><br>
      <span style="font-size:19px; color:${COLORS.body};">Identifies cause in ~80% of cases. <strong style="color:${COLORS.red};">Normal MRI = RED FLAG</strong> &mdash; pursue genetic/metabolic workup</span>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.violet};">2</div>
    <div>
      <strong style="font-size:22px;">Normal MRI / Unexplained</strong><br>
      <span style="font-size:19px; color:${COLORS.body};">CMA + epilepsy panel or WES + metabolic screen (PAA, UOA, lactate, acylcarnitines)</span>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.green};">3</div>
    <div>
      <strong style="font-size:22px;">Dyskinetic / Dystonic + Normal MRI</strong><br>
      <span style="font-size:19px; color:${COLORS.body};">Levodopa trial + CSF neurotransmitters + GCH1/TH genes + plasma arginine</span>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.amber};">4</div>
    <div>
      <strong style="font-size:22px;">Family Hx / Consanguinity / Dysmorphic</strong><br>
      <span style="font-size:19px; color:${COLORS.body};">CMA &rarr; WES/WGS (trio preferred for de novo detection)</span>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.red};">5</div>
    <div>
      <strong style="font-size:22px;">Progressive / Regression</strong><br>
      <span style="font-size:19px; color:${COLORS.body};"><strong style="color:${COLORS.red};">STOP</strong> &mdash; reconsider CP diagnosis. Metabolic screen + WES/WGS urgently</span>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:12px;">
    <div class="label">Emerging</div>
    <div class="value" style="font-size:22px;">WGS as first-tier in some centers &mdash; detects SVs, repeat expansions, deep intronic variants; yield ~35&ndash;40%</div>
  </div>
`));

// -- Slide 11: Predicting Genetic Yield ---------------------------------------
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Predicting Genetic Yield</h1>
  <div class="section-label">Which CP Patients to Test</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-green" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">High Genetic Yield Features</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
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
        <div class="card-title" style="font-size:22px;">Lower Genetic Yield</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
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
  tbody td { font-size:16px; padding:13px 18px; }
  thead th { font-size:15px; padding:13px 18px; }
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
    <div class="value" style="font-size:22px;">The CP label does NOT preclude genetic investigation &mdash; 20&ndash;30% of labeled CP cases have genetic causes that matter for management and family planning</div>
  </div>
`));

// -- Slide 14: Treatment Reference --------------------------------------------
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>Treatment Reference</h1>
  <div class="section-label">Medical &amp; Surgical Management of CP</div>

  <table style="margin-top:14px;">
    <thead>
      <tr>
        <th style="width:22%;">Treatment</th>
        <th style="width:18%;">Mechanism</th>
        <th style="width:22%;">Indication</th>
        <th style="width:38%;">Key Points</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Oral Baclofen</td>
        <td>GABA-B agonist</td>
        <td>First-line spasticity</td>
        <td>Titrate slowly; never stop abruptly (withdrawal risk)</td>
      </tr>
      <tr>
        <td>Trihexyphenidyl</td>
        <td>Anticholinergic</td>
        <td>Dystonia</td>
        <td>Titrate over weeks; watch for cognitive &amp; autonomic side effects</td>
      </tr>
      <tr>
        <td>Levodopa</td>
        <td>DA precursor</td>
        <td>Mandatory DRD trial</td>
        <td>1&ndash;2 mg/kg/day TID; dramatic response = DRD confirmed</td>
      </tr>
      <tr>
        <td>BoNT-A</td>
        <td>NMJ blockade</td>
        <td>Focal spasticity</td>
        <td>Targeted muscles; repeat q3&ndash;6 mo; adjunct to therapy</td>
      </tr>
      <tr>
        <td>ITB Pump</td>
        <td>Intrathecal GABA-B</td>
        <td>Severe; GMFCS III&ndash;V</td>
        <td>Trial dose first; requires surgical implant &amp; refills</td>
      </tr>
      <tr>
        <td>SDR</td>
        <td>Dorsal rhizotomy</td>
        <td>Spastic diplegia GMFCS II&ndash;III</td>
        <td><strong>NOT for dystonia</strong>; requires intensive post-op PT</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:10px; border-color:${COLORS.red}; background:${COLORS.redLight};">
    <div class="label" style="color:${COLORS.red};">Baclofen Withdrawal &mdash; EMERGENCY</div>
    <div class="value" style="font-size:20px;">Fever + AMS + rigidity + seizures + autonomic instability = baclofen withdrawal. Treat with IV benzodiazepines. If ITB pump &mdash; call neurosurgery STAT for pump interrogation.</div>
  </div>
`, `
  tbody td { font-size:15px; padding:10px 14px; }
  thead th { font-size:14px; padding:10px 14px; }
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
