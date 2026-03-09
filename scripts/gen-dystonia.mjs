/**
 * scripts/gen-dystonia.mjs
 *
 * Generates 15 slides for the Genetic Dystonias module.
 * Sections (from data/modules/dystonia.json):
 *   S0: Classification of Dystonia (slides 1-3)
 *   S1: Dopa-Responsive Dystonia (slides 4-6)
 *   S2: DYT-TOR1A and DYT-THAP1 (slides 7-9)
 *   S3: Combined Dystonia Syndromes (slides 10-12)
 *   S4: Diagnostic Workup and Treatment (slides 13-15)
 *
 * distributeSlides(15, 5) → 3 per section, 0 remainder.
 *
 * Run: node scripts/gen-dystonia.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "dystonia";
const mc = MODULE_COLORS[MOD];
const TOTAL = 15;

const slides = [];

/* ================================================================
   S0 — Classification of Dystonia  (slides 1-3)
   ================================================================ */

// ── Slide 1: Title ──────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Genetic Dystonias",
  subtitle: "Classification, diagnosis, and management of inherited dystonia syndromes",
  totalSlides: TOTAL,
  topics: [
    "Classification of dystonia",
    "Dopa-responsive dystonia (DRD)",
    "DYT-TOR1A and DYT-THAP1",
    "Combined dystonia syndromes",
    "Diagnostic workup and treatment",
  ],
}));

// ── Slide 2: Classification Axes ────────────────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Classification of Dystonia</h1>
  <div class="section-label">2013 Consensus: Two Axes</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Axis I — Clinical Features</div>
        <div class="card-body" style="font-size:27px; line-height:1.65;">
          <strong>Age of onset:</strong> infantile, childhood, adolescent, adult<br><br>
          <strong>Body distribution:</strong> focal, segmental, multifocal, generalized, hemidystonia<br><br>
          <strong>Temporal pattern:</strong> static vs progressive; persistent, task-specific, action-induced, diurnal<br><br>
          <strong>Associated features:</strong> isolated vs combined vs complex
        </div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Axis II — Etiology</div>
        <div class="card-body" style="font-size:27px; line-height:1.65;">
          <strong>Inherited:</strong> monogenic (TOR1A, THAP1, GCH1, SGCE, etc.)<br><br>
          <strong>Acquired:</strong> perinatal injury, stroke, drugs<br><br>
          <strong>Idiopathic:</strong> no identified cause<br><br>
          <strong>Nomenclature:</strong> DYT-[gene] (e.g., DYT-TOR1A)
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 3: Isolated vs Combined vs Complex ────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Isolated vs Combined vs Complex</h1>
  <div class="section-label">Associated Feature Categories</div>

  <div class="three-col" style="margin-top:16px;">
    <div class="card card-accent" style="padding:26px;">
      <div class="card-title" style="font-size:31px;">Isolated Dystonia</div>
      <div class="card-body" style="font-size:25px; line-height:1.6;">
        Dystonia is the <strong>only</strong> motor feature<br><br>
        Formerly "primary dystonia"<br><br>
        <strong>Genes:</strong> TOR1A, THAP1, GNAL, ANO3
      </div>
    </div>
    <div class="card card-amber" style="padding:26px;">
      <div class="card-title" style="font-size:31px;">Combined Dystonia</div>
      <div class="card-body" style="font-size:25px; line-height:1.6;">
        Dystonia <strong>plus</strong> another movement disorder<br><br>
        Myoclonus, parkinsonism<br><br>
        <strong>Genes:</strong> SGCE, GCH1, ATP1A3, KMT2B
      </div>
    </div>
    <div class="card card-red" style="padding:26px;">
      <div class="card-title" style="font-size:31px;">Complex Dystonia</div>
      <div class="card-body" style="font-size:25px; line-height:1.6;">
        Dystonia plus <strong>other neurological or systemic</strong> features<br><br>
        Structural brain lesions, metabolic syndromes<br><br>
        <strong>Examples:</strong> NBIA, Wilson disease
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:20px;">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:31px;">Diurnal fluctuation + levodopa response = always trial L-dopa before labeling childhood-onset dystonia "idiopathic"</div>
  </div>
`));

/* ================================================================
   S1 — Dopa-Responsive Dystonia  (slides 4-6)
   ================================================================ */

// ── Slide 4: DRD Overview ───────────────────────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Dopa-Responsive Dystonia</h1>
  <div class="section-label">The Must-Not-Miss Diagnosis</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">GCH1 (14q22.1) — Autosomal Dominant</div>
        <div class="card-body" style="font-size:27px; line-height:1.6;">
          Encodes GTP cyclohydrolase 1<br><br>
          BH4 cofactor deficiency → reduced dopamine synthesis<br><br>
          ~30% overall penetrance; <strong>female predominance 2–4:1</strong> (hormonal modulation)
        </div>
      </div>
      <div class="card card-green" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Classic Presentation</div>
        <div class="card-body" style="font-size:27px; line-height:1.6;">
          Childhood-onset <strong>foot dystonia / gait abnormality</strong><br><br>
          <strong>Diurnal fluctuation:</strong> worse end of day, improved after sleep<br><br>
          Brisk / exaggerated deep tendon reflexes
        </div>
      </div>
    </div>
    <div>
      <div class="card card-red" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Why It's Underdiagnosed</div>
        <div class="card-body" style="font-size:27px; line-height:1.6;">
          Initial presentation mimics:<br><br>
          &bull; Cerebral palsy<br>
          &bull; Spastic diplegia<br>
          &bull; "Idiopathic" dystonia<br><br>
          <strong>Male carriers less frequently affected</strong> — can appear to skip generations
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 5: DRD Diagnosis & Levodopa Trial ─────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>DRD: Diagnosis &amp; Levodopa Trial</h1>
  <div class="section-label">Confirming the Diagnosis</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">Levodopa Trial</div>
        <div class="card-body" style="font-size:27px; line-height:1.6;">
          Start at <strong>1–2 mg/kg/day</strong><br><br>
          Dramatic, sustained response at very low doses (25–50 mg/day) is <strong>virtually diagnostic</strong><br><br>
          No dyskinesia, no motor fluctuations — distinguishes from Parkinson disease
        </div>
      </div>
      <div class="card card-violet" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">CSF Neurotransmitters</div>
        <div class="card-body" style="font-size:27px; line-height:1.6;">
          Low biopterin, low neopterin<br><br>
          Low HVA (dopamine metabolite)<br><br>
          Can confirm diagnosis, but L-dopa response is more practical
        </div>
      </div>
    </div>
    <div>
      <div class="highlight-box" style="margin-bottom:16px;">
        <div class="label">Key Distinction from PD</div>
        <div class="value" style="font-size:31px;">DRD: sustained low-dose response, no wearing-off, no dyskinesia — even after decades of treatment</div>
      </div>
      <div class="card card-amber" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">SPR (Sepiapterin Reductase) — AR DRD</div>
        <div class="card-body" style="font-size:27px; line-height:1.6;">
          Autosomal recessive; more severe with parkinsonism<br><br>
          Elevated sepiapterin in CSF<br><br>
          Requires <strong>both levodopa AND 5-HTP</strong> for full treatment
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 6: DRD Pathway & Pharmacology ─────────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>DRD: BH4 Pathway</h1>
  <div class="section-label">Molecular Mechanism</div>

  <div class="flow-arrow" style="justify-content:center; margin-top:24px; margin-bottom:28px;">
    <div class="flow-box" style="background:${mc.accent};">GTP</div>
    <div class="flow-connector">→</div>
    <div class="flow-box" style="background:${COLORS.violet};">GCH1</div>
    <div class="flow-connector">→</div>
    <div class="flow-box" style="background:${COLORS.amber};">BH4</div>
    <div class="flow-connector">→</div>
    <div class="flow-box" style="background:${COLORS.green};">TH</div>
    <div class="flow-connector">→</div>
    <div class="flow-box" style="background:${COLORS.blue};">Dopamine</div>
  </div>

  <div class="two-col">
    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:31px;">GCH1 Deficiency (AD DRD)</div>
      <div class="card-body" style="font-size:27px; line-height:1.6;">
        GTP cyclohydrolase 1 is the rate-limiting enzyme for BH4 synthesis<br><br>
        BH4 = essential cofactor for tyrosine hydroxylase (TH)<br><br>
        Reduced BH4 → reduced dopamine in nigrostriatal pathway
      </div>
    </div>
    <div class="card card-green" style="padding:28px;">
      <div class="card-title" style="font-size:31px;">TH Deficiency (AR)</div>
      <div class="card-body" style="font-size:27px; line-height:1.6;">
        Tyrosine hydroxylase itself is deficient<br><br>
        Autosomal recessive; more severe phenotype<br><br>
        Progressive dystonia-parkinsonism; diurnal fluctuation still present<br><br>
        Also responds to levodopa (may need higher doses)
      </div>
    </div>
  </div>
`));

/* ================================================================
   S2 — DYT-TOR1A and DYT-THAP1  (slides 7-9)
   ================================================================ */

// ── Slide 7: DYT-TOR1A (DYT1) ──────────────────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>DYT-TOR1A (DYT1)</h1>
  <div class="section-label">Early-Onset Primary Generalized Dystonia</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">Genetics</div>
        <div class="card-body" style="font-size:27px; line-height:1.6;">
          <strong>TOR1A ΔE303:</strong> in-frame GAG deletion accounts for nearly all pathogenic variants<br><br>
          Autosomal dominant with <strong>~30–40% penetrance</strong><br><br>
          Onset before age 26 in affected individuals
        </div>
      </div>
      <div class="card card-rose" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Ashkenazi Jewish Founder Effect</div>
        <div class="card-body" style="font-size:27px; line-height:1.6;">
          ~16% of Ashkenazi Jewish individuals with early-onset dystonia carry TOR1A ΔE303<br><br>
          Carrier frequency ~1/2000 in Ashkenazi population
        </div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">Clinical Features</div>
        <div class="card-body" style="font-size:27px; line-height:1.6;">
          Onset typically in a <strong>limb</strong> in childhood<br><br>
          Variable generalization — may remain segmental<br><br>
          No cognitive impairment; brain MRI normal
        </div>
      </div>
      <div class="card card-green" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">TorsinA Function</div>
        <div class="card-body" style="font-size:27px; line-height:1.6;">
          AAA+ ATPase in endoplasmic reticulum<br><br>
          Involved in nuclear envelope integrity and LINC complex function<br><br>
          Impaired nuclear-cytoskeletal coupling in striatal neurons
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 8: DYT-THAP1 (DYT6) ──────────────────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>DYT-THAP1 (DYT6)</h1>
  <div class="section-label">Adolescent-Onset Cranial-Cervical Dystonia</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">Genetics &amp; Penetrance</div>
        <div class="card-body" style="font-size:27px; line-height:1.6;">
          Autosomal dominant with <strong>~60% penetrance</strong><br><br>
          THAP1 encodes a transcription factor that regulates <strong>TOR1A expression</strong><br><br>
          Connects DYT6 and DYT1 in a shared molecular pathway
        </div>
      </div>
      <div class="card card-amber" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Treatment Considerations</div>
        <div class="card-body" style="font-size:27px; line-height:1.6;">
          <strong>Less responsive to DBS</strong> than DYT-TOR1A<br><br>
          Botulinum toxin for focal/segmental symptoms<br><br>
          Anticholinergics (trihexyphenidyl) may help
        </div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Clinical Features</div>
        <div class="card-body" style="font-size:27px; line-height:1.6;">
          Onset often in <strong>cranial/cervical muscles or arm</strong><br><br>
          Adolescent onset most common<br><br>
          Prominent speech and swallowing involvement<br><br>
          Less likely to generalize than DYT-TOR1A
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 9: TOR1A vs THAP1 Comparison ──────────────────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>DYT-TOR1A vs DYT-THAP1</h1>
  <div class="section-label">Comparative Overview</div>

  <table style="margin-top:16px;">
    <thead>
      <tr>
        <th style="width:28%;">Feature</th>
        <th style="width:36%;">DYT-TOR1A (DYT1)</th>
        <th style="width:36%;">DYT-THAP1 (DYT6)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Gene / Variant</td>
        <td>TOR1A ΔE303 (GAG deletion)</td>
        <td>THAP1 (various loss-of-function)</td>
      </tr>
      <tr>
        <td>Penetrance</td>
        <td>~30–40%</td>
        <td>~60%</td>
      </tr>
      <tr>
        <td>Typical Onset</td>
        <td>Childhood (limb)</td>
        <td>Adolescence (cranial/cervical)</td>
      </tr>
      <tr>
        <td>Body Distribution</td>
        <td>Limb-onset → may generalize</td>
        <td>Cranial/cervical/arm; less generalization</td>
      </tr>
      <tr>
        <td>Population</td>
        <td>Ashkenazi Jewish founder effect</td>
        <td>Pan-ethnic</td>
      </tr>
      <tr>
        <td>DBS Response</td>
        <td>Excellent (50–90% improvement)</td>
        <td>Less responsive</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Molecular Link</div>
    <div class="value" style="font-size:31px;">THAP1 is a transcription factor that regulates TOR1A → shared pathogenic pathway</div>
  </div>
`));

/* ================================================================
   S3 — Combined Dystonia Syndromes  (slides 10-12)
   ================================================================ */

// ── Slide 10: ATP1A3 Spectrum ───────────────────────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>ATP1A3 Spectrum</h1>
  <div class="section-label">RDP, AHC &amp; CAPOS</div>

  <div class="three-col" style="margin-top:16px;">
    <div class="card card-accent" style="padding:24px;">
      <div class="card-title" style="font-size:29px;">RDP (Rapid-Onset Dystonia-Parkinsonism)</div>
      <div class="card-body" style="font-size:25px; line-height:1.55;">
        Abrupt onset over hours to weeks<br><br>
        Rostro-caudal gradient: bulbar > arms > legs<br><br>
        Triggered by physiologic stress/fever<br><br>
        Minimal L-dopa response
      </div>
    </div>
    <div class="card card-amber" style="padding:24px;">
      <div class="card-title" style="font-size:29px;">AHC (Alternating Hemiplegia of Childhood)</div>
      <div class="card-body" style="font-size:25px; line-height:1.55;">
        Onset before 18 months<br><br>
        Recurrent hemiplegic attacks<br><br>
        Episodes resolve with sleep<br><br>
        Most are <strong>de novo</strong>; ~75% carry ATP1A3 variants
      </div>
    </div>
    <div class="card card-violet" style="padding:24px;">
      <div class="card-title" style="font-size:29px;">CAPOS</div>
      <div class="card-body" style="font-size:25px; line-height:1.55;">
        Cerebellar ataxia, Areflexia, Pes cavus, Optic atrophy, SNHL<br><br>
        Febrile episodes of ataxia<br><br>
        p.Glu818Lys variant
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:20px;">
    <div class="label">Shared Mechanism</div>
    <div class="value" style="font-size:31px;">ATP1A3 encodes the α3 subunit of Na⁺/K⁺-ATPase — impaired neuronal ion homeostasis</div>
  </div>
`));

// ── Slide 11: Myoclonus-Dystonia & KMT2B ───────────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>SGCE &amp; KMT2B Dystonia</h1>
  <div class="section-label">Myoclonus-Dystonia &amp; KMT2B-Dystonia</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">DYT-SGCE (Myoclonus-Dystonia)</div>
        <div class="card-body" style="font-size:27px; line-height:1.6;">
          <strong>AD, maternally imprinted</strong> (paternal expression only)<br><br>
          Myoclonus of arms/trunk + mild dystonia<br><br>
          <strong>Alcohol-responsive</strong> myoclonus<br><br>
          Psychiatric comorbidity: OCD, anxiety<br><br>
          DBS/GPi effective
        </div>
      </div>
    </div>
    <div>
      <div class="card card-rose" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">KMT2B-Dystonia (DYT28)</div>
        <div class="card-body" style="font-size:27px; line-height:1.6;">
          Autosomal dominant; childhood onset<br><br>
          Generalized dystonia beginning in <strong>lower limbs</strong><br><br>
          Prominent <strong>oromandibular</strong> involvement<br><br>
          <strong>Excellent GPi-DBS response</strong> — one of the best DBS responders among genetic dystonias
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:4px;">
    <div class="label">Imprinting Note</div>
    <div class="value" style="font-size:31px;">SGCE: maternal allele silenced → disease only when variant inherited from father → can "skip" generations</div>
  </div>
`));

// ── Slide 12: NBIA & Wilson Disease ─────────────────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>NBIA &amp; Wilson Disease</h1>
  <div class="section-label">Other Combined Dystonia Syndromes</div>

  <table style="margin-top:16px;">
    <thead>
      <tr>
        <th style="width:22%;">Disorder</th>
        <th style="width:16%;">Gene</th>
        <th style="width:30%;">Key Features</th>
        <th style="width:32%;">MRI / Diagnostic Clue</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>PKAN</td>
        <td>PANK2</td>
        <td>Progressive dystonia, retinopathy</td>
        <td>"Eye of the tiger" — GP T2 hypointensity</td>
      </tr>
      <tr>
        <td>PLAN</td>
        <td>PLA2G6</td>
        <td>Dystonia, cerebellar atrophy</td>
        <td>Retinal degeneration; iron in GP</td>
      </tr>
      <tr>
        <td>BPAN</td>
        <td>WDR45 (X-linked)</td>
        <td>Intellectual regression</td>
        <td>Iron deposition GP + substantia nigra</td>
      </tr>
      <tr>
        <td>Wilson Disease</td>
        <td>ATP7B</td>
        <td>Dystonia + liver disease</td>
        <td>Kayser-Fleischer rings; low ceruloplasmin</td>
      </tr>
      <tr>
        <td>ADCY5 Dyskinesia</td>
        <td>ADCY5 (AD)</td>
        <td>Paroxysmal hyperkinetic movements</td>
        <td>Nocturnal exacerbations; choreo-dystonic</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Critical Rule</div>
    <div class="value" style="font-size:31px;">Exclude Wilson disease in ANY child/young adult with dystonia — it is fully treatable with copper chelation</div>
  </div>
`, `
  tbody td { font-size:22px; padding:12px 18px; }
  thead th { font-size:21px; padding:12px 18px; }
`));

/* ================================================================
   S4 — Diagnostic Workup and Treatment  (slides 13-15)
   ================================================================ */

// ── Slide 13: Medication Overview — Summary ──────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Dystonia Treatment: Key Agents</h1>
  <div class="section-label">Pharmacological &amp; Procedural Overview</div>

  <div style="font-size:29px; margin-bottom:16px; color:${COLORS.body};">
    Two medications must be considered in <strong>every</strong> case of childhood-onset dystonia.
  </div>

  <div class="three-col">
    <div class="card card-green">
      <div class="card-title">First-Line Oral</div>
      <div class="card-body" style="font-size:25px;">
        <strong>Trihexyphenidyl</strong> &mdash; most effective oral agent for generalized dystonia; titrate slowly<br><br>
        <strong>Sinemet (L-dopa)</strong> &mdash; <strong>mandatory trial</strong> in all childhood-onset dystonia
      </div>
    </div>
    <div class="card card-amber">
      <div class="card-title">Focal &amp; Adjunct</div>
      <div class="card-body" style="font-size:25px;">
        <strong>BoNT-A</strong> &mdash; standard of care for focal/segmental<br><br>
        <strong>Baclofen</strong> (oral/ITB), <strong>VMAT2 inhibitors</strong> (no tardive risk)
      </div>
    </div>
    <div class="card card-red">
      <div class="card-title">DBS Candidates</div>
      <div class="card-body" style="font-size:25px;">
        <strong>TOR1A</strong> &mdash; 50&ndash;90% improvement<br>
        <strong>KMT2B</strong> &mdash; excellent response<br>
        <strong>SGCE</strong> &mdash; good response<br>
        Earlier surgery &rarr; better outcomes
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Treatment Rule</div>
    <div class="value" style="font-size:31px;">Levodopa trial is mandatory before labeling childhood-onset dystonia &ldquo;idiopathic&rdquo; &mdash; DRD is treatable and underdiagnosed</div>
  </div>

  <div style="font-size:24px; color:${COLORS.muted}; margin-top:12px; text-align:center;">
    Full medication table and titration protocols available in the reference content below
  </div>
`));

// ── Slide 14: Titration Key Principles ─────────────────────────────────────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>Titration: Key Principles</h1>
  <div class="section-label">Trihexyphenidyl &amp; Sinemet Protocols</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">Trihexyphenidyl</div>
        <div class="card-body" style="font-size:27px; line-height:1.6;">
          Start <strong>0.05 mg/kg BID</strong><br><br>
          Increase by 0.05 mg/kg every 1&ndash;2 weeks<br><br>
          Target: <strong>0.25 mg/kg TID</strong> (max 0.5 mg/kg)<br><br>
          <strong>Slow titration is essential</strong> to minimize anticholinergic side effects
        </div>
      </div>
      <div class="card card-red" style="padding:20px;">
        <div class="card-title" style="font-size:28px;">Anticholinergic Side Effects</div>
        <div class="card-body" style="font-size:25px;">
          Dry mouth, urinary retention, constipation, blurred vision, <strong>cognitive changes</strong><br>
          <strong>CI:</strong> narrow-angle glaucoma
        </div>
      </div>
    </div>
    <div>
      <div class="card card-green" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">Sinemet (25/100)</div>
        <div class="card-body" style="font-size:27px; line-height:1.6;">
          Start <strong>&frac12; tab AM only</strong><br><br>
          Add doses weekly: AM &rarr; AM+PM &rarr; TID<br><br>
          Increase each dose to 1 tab as tolerated<br><br>
          <strong>DRD response within days to 2 weeks</strong>
        </div>
      </div>
      <div class="highlight-box">
        <div class="label">Practical Tips</div>
        <div class="value" style="font-size:28px;">Last dose &le;4 PM. Separate from iron by &ge;2 hours. No dyskinesia or wearing-off distinguishes DRD from PD.</div>
      </div>
    </div>
  </div>

  <div style="font-size:24px; color:${COLORS.muted}; margin-top:12px; text-align:center;">
    Week-by-week dosing schedules available in the reference content below the slides
  </div>
`));

// ── Slide 15: Key Takeaways ─────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 15, TOTAL, [
  {
    title: "Classify dystonia by associated features",
    body: "Isolated (TOR1A, THAP1), combined (SGCE, ATP1A3, KMT2B), or complex (NBIA, Wilson) — this guides genetic testing.",
  },
  {
    title: "Never miss dopa-responsive dystonia",
    body: "Trial levodopa in ANY childhood-onset dystonia with diurnal fluctuation — dramatic sustained response at low doses is diagnostic.",
  },
  {
    title: "DYT-TOR1A: Ashkenazi founder, reduced penetrance",
    body: "ΔE303 deletion, ~30–40% penetrance, limb-onset, excellent DBS response. THAP1 regulates TOR1A in shared pathway.",
  },
  {
    title: "Trihexyphenidyl + levodopa trial are first-line",
    body: "Titrate trihexyphenidyl slowly (0.05 \u2192 0.25 mg/kg TID). Sinemet trial is mandatory \u2014 DRD responds within days. VMAT2 inhibitors have no tardive risk.",
  },
  {
    title: "Exclude treatable causes systematically",
    body: "Wilson disease (ceruloplasmin + slit lamp), DRD (L-dopa trial), NPC, biotinidase deficiency, GA1 \u2014 before labeling dystonia 'idiopathic'.",
  },
]));

// ── Render ───────────────────────────────────────────────────────────────────
await renderSlides("dystonia", slides);
