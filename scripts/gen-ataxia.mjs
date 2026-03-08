/**
 * scripts/gen-ataxia.mjs
 *
 * Generates 16 clean, readable slides for the Ataxia & Cerebellar Disorders
 * module (Movement Disorders 3).
 * Uses puppeteer HTML rendering via the shared design system.
 *
 * Run: node scripts/gen-ataxia.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "ataxia";
const mc = MODULE_COLORS[MOD];
const TOTAL = 16;

const slides = [];

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Ataxia &amp;<br>Cerebellar Disorders",
  subtitle: "Movement Disorders 3",
  totalSlides: TOTAL,
  topics: [
    "Classification &amp; differential diagnosis",
    "Treatable causes of ataxia",
    "Diagnostic workup &amp; testing strategy",
    "Case-based approach: Friedreich ataxia",
    "Repeat expansion testing limitations",
  ],
}));

// ── Slide 2: Learning Objectives ───────────────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Learning Objectives</h1>
  <div class="section-label">Goals for this module</div>

  <div class="card card-accent" style="margin-bottom:18px;">
    <div class="card-title">1. Diagnostic Workup</div>
    <div class="card-body">Develop a systematic approach to evaluating ataxia, including first-tier labs and when to pursue genetic testing.</div>
  </div>

  <div class="card card-green" style="margin-bottom:18px;">
    <div class="card-title">2. Testing Strategy</div>
    <div class="card-body">Understand when to order repeat-expansion testing vs exome sequencing &mdash; and why standard NGS misses trinucleotide repeats.</div>
  </div>

  <div class="card card-violet" style="margin-bottom:18px;">
    <div class="card-title">3. Biochemical Markers</div>
    <div class="card-body">Identify key biochemical markers (frataxin, CoQ10, &alpha;-fetoprotein, vitamin E) that guide diagnosis.</div>
  </div>

  <div class="card card-amber">
    <div class="card-title">4. Exome Limitations for Repeats</div>
    <div class="card-body">Recognize that exome/genome sequencing <strong>cannot detect</strong> trinucleotide repeat expansions &mdash; specialized assays are required.</div>
  </div>
`));

// ── Slide 3: What is Ataxia? ───────────────────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>What Is Ataxia?</h1>
  <div class="section-label">Definition &amp; Types</div>

  <div class="highlight-box" style="margin-bottom:28px;">
    <div class="label">Definition</div>
    <div class="value">Inability to generate normal, coordinated voluntary movement</div>
    <p style="font-size:18px; margin-top:8px; color:${COLORS.body};">Not weakness &mdash; a disorder of <strong>motor coordination</strong> affecting gait, limbs, speech, and eye movements.</p>
  </div>

  <div class="three-col">
    <div class="card card-accent">
      <div class="card-title">Cerebellar</div>
      <div class="card-body">Most common type. Wide-based gait, dysmetria, intention tremor, nystagmus, dysarthria.</div>
    </div>

    <div class="card card-violet">
      <div class="card-title">Sensory / Proprioceptive</div>
      <div class="card-body">Loss of position sense. Worsens with eyes closed (positive Romberg). Dorsal column or peripheral nerve dysfunction.</div>
    </div>

    <div class="card card-amber">
      <div class="card-title">Vestibular</div>
      <div class="card-body">Vertigo, directional falling, nystagmus. Inner ear or vestibular nerve pathology. Less commonly genetic.</div>
    </div>
  </div>
`));

// ── Slide 4: Approach to Ataxia ────────────────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Approach to Ataxia</h1>
  <div class="section-label">Classify by onset and tempo</div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
    <div class="card card-red">
      <div class="card-title">Acute (hours&ndash;days)</div>
      <div class="card-body">Stroke, post-infectious cerebellitis, toxin/drug exposure, demyelination (MS/ADEM). <strong>Urgent workup required.</strong></div>
    </div>

    <div class="card card-amber">
      <div class="card-title">Subacute (weeks&ndash;months)</div>
      <div class="card-body">Paraneoplastic (anti-Yo, anti-Hu), vitamin deficiency (B1, E, B12), autoimmune cerebellitis, prion disease.</div>
    </div>

    <div class="card card-accent">
      <div class="card-title">Chronic / Progressive</div>
      <div class="card-body">Hereditary ataxias (SCAs, Friedreich, CANVAS), degenerative (MSA-C). <strong>Most likely genetic.</strong></div>
    </div>

    <div class="card card-violet">
      <div class="card-title">Episodic</div>
      <div class="card-body">Channelopathies (EA1/KCNA1, EA2/CACNA1A), aminoacidopathies, metabolic decompensation. Consider ion channel genes.</div>
    </div>
  </div>

  <div class="card card-green" style="margin-top:16px;">
    <div class="card-title">Key Principle</div>
    <div class="card-body">Tempo of onset is the <strong>single most important</strong> initial discriminator in the ataxia differential.</div>
  </div>
`));

// ── Slide 5: Genetic Differential ──────────────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Genetic Differential</h1>
  <div class="section-label">Two major categories</div>

  <div class="two-col">
    <div>
      <div class="card card-amber" style="margin-bottom:18px;">
        <div class="card-title">Disorders with Prominent Ataxia</div>
        <div class="card-body" style="font-size:18px;">Ataxia is a <strong>feature</strong>, not the primary diagnosis:</div>
      </div>
      <ul class="bullet-list">
        <li>Leukodystrophies (MLD, Krabbe, PMD)</li>
        <li>Mitochondrial disease (POLG, MELAS)</li>
        <li>Niemann-Pick type C (NPC1/NPC2)</li>
        <li>Wilson disease (ATP7B)</li>
        <li>GLUT1 deficiency (SLC2A1)</li>
        <li>Refsum disease (PHYH)</li>
      </ul>
    </div>

    <div>
      <div class="card card-accent" style="margin-bottom:18px;">
        <div class="card-title">Primary Hereditary Ataxias</div>
        <div class="card-body" style="font-size:18px;">Ataxia is the <strong>defining feature</strong>:</div>
      </div>
      <ul class="bullet-list">
        <li><strong>AD repeat expansions:</strong> SCA1, 2, 3, 6, 7, 17</li>
        <li><strong>AR repeat expansions:</strong> Friedreich (FXN), CANVAS (RFC1)</li>
        <li><strong>Conventional variant ataxias:</strong> SACS, APTX, SETX, ANO10, SYNE1</li>
      </ul>
    </div>
  </div>
`));

// ── Slide 6: Treatable Causes ──────────────────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Treatable Causes of Ataxia</h1>
  <div class="section-label">Don&rsquo;t miss these</div>

  <table>
    <thead>
      <tr>
        <th>Condition</th>
        <th>Key Test</th>
        <th>Treatment</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Vitamin E Deficiency (AVED/TTPA)</td>
        <td>Serum vitamin E level</td>
        <td>Vitamin E supplementation</td>
      </tr>
      <tr>
        <td>CoQ10 Deficiency (ADCK3)</td>
        <td>Muscle CoQ10 level</td>
        <td>CoQ10 supplementation</td>
      </tr>
      <tr>
        <td>Wilson Disease (ATP7B)</td>
        <td>Ceruloplasmin, 24-hr urine copper</td>
        <td>Chelation (penicillamine, trientine)</td>
      </tr>
      <tr>
        <td>Refsum Disease (PHYH)</td>
        <td>Serum phytanic acid</td>
        <td>Dietary phytanic acid restriction</td>
      </tr>
      <tr>
        <td>CTX (CYP27A1)</td>
        <td>Serum cholestanol</td>
        <td>Chenodeoxycholic acid</td>
      </tr>
      <tr>
        <td>GLUT1 Deficiency (SLC2A1)</td>
        <td>CSF:serum glucose ratio</td>
        <td>Ketogenic diet</td>
      </tr>
      <tr>
        <td>Aceruloplasminemia (CP)</td>
        <td>Serum ceruloplasmin, ferritin</td>
        <td>Iron chelation</td>
      </tr>
    </tbody>
  </table>
`, `
  tbody td { font-size: 17px; padding: 12px 18px; }
  thead th { font-size: 15px; padding: 12px 18px; }
`));

// ── Slide 7: Diagnostic Evaluation ─────────────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Diagnostic Evaluation</h1>
  <div class="section-label">First-tier laboratory workup</div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title">Routine Labs</div>
        <div class="card-body">
          <strong>CBC</strong>, <strong>CMP</strong>, <strong>TSH</strong><br>
          Vitamin B12, folate<br>
          ESR / CRP (inflammatory)
        </div>
      </div>

      <div class="card card-green">
        <div class="card-title">Metabolic / Nutritional</div>
        <div class="card-body">
          <strong>Vitamin E</strong> level<br>
          <strong>Copper &amp; ceruloplasmin</strong><br>
          Lactate, pyruvate<br>
          &alpha;-fetoprotein (elevated in A-T)
        </div>
      </div>
    </div>

    <div>
      <div class="card card-violet" style="margin-bottom:16px;">
        <div class="card-title">Specialized Studies</div>
        <div class="card-body">
          Frataxin protein level<br>
          Phytanic acid (Refsum)<br>
          Cholestanol (CTX)<br>
          Lysosomal enzyme panel
        </div>
      </div>

      <div class="card card-amber">
        <div class="card-title">Neuroimaging</div>
        <div class="card-body">
          <strong>Brain MRI</strong> with thin-cut posterior fossa<br>
          Look for: cerebellar atrophy, white matter changes, iron deposition
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 8: Case Presentation ─────────────────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Case Presentation</h1>
  <div class="section-label">Clinical Vignette</div>

  <div class="highlight-box" style="margin-bottom:28px;">
    <div class="label">Patient</div>
    <div class="value" style="font-size:22px;">19-year-old male with progressive gait unsteadiness</div>
  </div>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">History</div>
      <div class="card-body">
        Onset of gait difficulty at <strong>age 14</strong><br>
        Progressive worsening over 5 years<br>
        Recurrent falls, now uses walker<br>
        No family history (parents unaffected)
      </div>
    </div>

    <div class="card card-amber">
      <div class="card-title">Associated Features</div>
      <div class="card-body">
        Slurred speech (dysarthria) &times; 2 years<br>
        Difficulty with fine motor tasks<br>
        Scoliosis diagnosed at age 12<br>
        Recent diagnosis of diabetes mellitus
      </div>
    </div>
  </div>

  <div class="card card-red" style="margin-top:16px;">
    <div class="card-title">Key Features to Note</div>
    <div class="card-body">Adolescent onset + progressive course + scoliosis + diabetes &mdash; which ataxia syndrome does this pattern suggest?</div>
  </div>
`));

// ── Slide 9: Exam Findings ─────────────────────────────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Examination Findings</h1>
  <div class="section-label">Neurological exam</div>

  <div class="three-col">
    <div class="card card-accent">
      <div class="card-title">Cerebellar Signs</div>
      <div class="card-body">
        Gaze-evoked <strong>nystagmus</strong><br>
        <strong>Hypermetric saccades</strong><br>
        Dysarthria (scanning speech)<br>
        Wide-based gait, truncal ataxia
      </div>
    </div>

    <div class="card card-violet">
      <div class="card-title">Sensory / Motor</div>
      <div class="card-body">
        <strong>Calf muscle atrophy</strong><br>
        Impaired <strong>vibration</strong> sense<br>
        Impaired <strong>proprioception</strong><br>
        Distal weakness (LE &gt; UE)
      </div>
    </div>

    <div class="card card-red">
      <div class="card-title">Reflexes</div>
      <div class="card-body">
        <strong>Absent</strong> deep tendon reflexes<br>
        Extensor plantar responses (Babinski +)<br>
        <em>Areflexia + upgoing toes = mixed UMN/LMN</em>
      </div>
    </div>
  </div>

  <div class="card card-green" style="margin-top:24px;">
    <div class="card-title">Clinical Pearl</div>
    <div class="card-body">The combination of <strong>cerebellar ataxia + sensory neuropathy + areflexia + upgoing toes</strong> is the hallmark of Friedreich ataxia &mdash; the mixed upper and lower motor neuron pattern is highly characteristic.</div>
  </div>
`));

// ── Slide 10: DDx for AR Ataxia with Sensorimotor Neuropathy ───────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>DDx: AR Ataxia with Neuropathy</h1>
  <div class="section-label">Autosomal recessive differential</div>

  <table>
    <thead>
      <tr>
        <th>Gene</th>
        <th>Condition</th>
        <th>Distinguishing Features</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>FXN</td>
        <td>Friedreich ataxia</td>
        <td>Cardiomyopathy, DM, scoliosis, onset &lt;25</td>
      </tr>
      <tr>
        <td>TDP1</td>
        <td>SCAN1</td>
        <td>Cerebellar ataxia with axonal neuropathy</td>
      </tr>
      <tr>
        <td>TTPA</td>
        <td>AVED</td>
        <td>Treatable! Low vitamin E, mimics FA</td>
      </tr>
      <tr>
        <td>APTX</td>
        <td>AOA1</td>
        <td>Oculomotor apraxia, low albumin, high cholesterol</td>
      </tr>
      <tr>
        <td>SETX</td>
        <td>AOA2</td>
        <td>Oculomotor apraxia, elevated &alpha;-fetoprotein</td>
      </tr>
      <tr>
        <td>ADCK3 (COQ8A)</td>
        <td>CoQ10 deficiency</td>
        <td>Treatable! Seizures, exercise intolerance</td>
      </tr>
      <tr>
        <td>SACS</td>
        <td>Spastic ataxia (Charlevoix-Saguenay)</td>
        <td>Spasticity, retinal striations, founder effect</td>
      </tr>
    </tbody>
  </table>
`, `
  tbody td { font-size: 17px; padding: 11px 18px; }
  thead th { font-size: 15px; padding: 11px 18px; }
`));

// ── Slide 11: Investigations ───────────────────────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Investigations</h1>
  <div class="section-label">Case workup results</div>

  <div class="three-col">
    <div class="card card-accent">
      <div class="card-title">Nerve Conduction Studies</div>
      <div class="card-body">
        All sensory responses: <strong>absent (NR)</strong><br>
        Motor amplitudes: reduced distally<br>
        Consistent with <strong>sensory > motor</strong> axonal neuropathy
      </div>
    </div>

    <div class="card card-violet">
      <div class="card-title">Brain MRI</div>
      <div class="card-body">
        Mild <strong>cerebellar atrophy</strong><br>
        Cervical cord atrophy<br>
        No white matter abnormalities<br>
        No iron deposition
      </div>
    </div>

    <div class="card card-red">
      <div class="card-title">Frataxin Level</div>
      <div class="card-body">
        Result: <strong>8 ng/mL</strong><br>
        Reference: &ge;21 ng/mL<br>
        <strong>Markedly reduced</strong> &mdash; consistent with Friedreich ataxia
      </div>
    </div>
  </div>

  <div class="card card-green" style="margin-top:28px;">
    <div class="card-title">Interpretation</div>
    <div class="card-body">Low frataxin level is highly suggestive of FA. <strong>Next step:</strong> FXN GAA repeat expansion testing to confirm the diagnosis and define repeat length.</div>
  </div>
`));

// ── Slide 12: Genetic Testing Discussion ───────────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>Genetic Testing Discussion</h1>
  <div class="section-label">Confirming the diagnosis</div>

  <div class="card card-accent" style="margin-bottom:20px;">
    <div class="card-title">Result: FXN GAA Repeat Expansion &mdash; Confirmed</div>
    <div class="card-body" style="font-size:20px;">
      Allele 1: <strong>850 GAA repeats</strong> &nbsp;|&nbsp; Allele 2: <strong>920 GAA repeats</strong><br>
      Normal: &lt;33 repeats &nbsp;|&nbsp; Pathogenic: &gt;66 repeats<br>
      <strong>Homozygous GAA expansion &rarr; Friedreich ataxia confirmed</strong>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-amber">
      <div class="card-title">What If Frataxin Were Normal?</div>
      <div class="card-body">
        Consider alternative diagnoses:<br>
        &bull; AVED (check vitamin E)<br>
        &bull; AOA1/AOA2 (check albumin, AFP)<br>
        &bull; AR ataxia gene panel or exome
      </div>
    </div>

    <div class="card card-violet">
      <div class="card-title">Testing Hierarchy</div>
      <div class="card-body">
        1. Frataxin level (screening)<br>
        2. FXN repeat testing (confirmation)<br>
        3. If negative: ataxia gene panel<br>
        4. If negative: exome/genome + repeat panel
      </div>
    </div>
  </div>
`));

// ── Slide 13: Friedreich Ataxia Summary ────────────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Friedreich Ataxia</h1>
  <div class="section-label">Most common autosomal recessive ataxia</div>

  <div class="stats-row">
    <div class="stat-card" style="background:${mc.light}; border-color:${mc.accent};">
      <div class="stat-label">Prevalence</div>
      <div class="stat-value">1 in 50,000</div>
    </div>
    <div class="stat-card" style="background:${COLORS.amberLight}; border-color:${COLORS.amber};">
      <div class="stat-label">Onset</div>
      <div class="stat-value">By age 25</div>
    </div>
    <div class="stat-card" style="background:${COLORS.redLight}; border-color:${COLORS.red};">
      <div class="stat-label">Cardiomyopathy</div>
      <div class="stat-value">~2/3 of patients</div>
    </div>
    <div class="stat-card" style="background:${COLORS.violetLight}; border-color:${COLORS.violet};">
      <div class="stat-label">Diabetes</div>
      <div class="stat-value">~30%</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">Neurological Features</div>
      <div class="card-body">
        Progressive gait &amp; limb ataxia<br>
        Dysarthria (scanning speech)<br>
        Muscle weakness (distal &gt; proximal)<br>
        Spasticity (UMN involvement)<br>
        Areflexia with upgoing toes
      </div>
    </div>

    <div class="card card-red">
      <div class="card-title">Systemic Complications</div>
      <div class="card-body">
        <strong>Hypertrophic cardiomyopathy</strong> (leading cause of death)<br>
        Diabetes mellitus (~30%)<br>
        Scoliosis (most patients)<br>
        Pes cavus (foot deformity)
      </div>
    </div>
  </div>
`));

// ── Slide 14: Omaveloxolone (Skyclarys) ───────────────────────────────────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>Omaveloxolone (Skyclarys)</h1>
  <div class="section-label">First FDA-approved therapy for Friedreich ataxia</div>

  <div class="highlight-box" style="margin-bottom:24px;">
    <div class="label">FDA Approval</div>
    <div class="value">February 2023 &mdash; first disease-modifying treatment for FA</div>
  </div>

  <div class="two-col">
    <div class="card card-green">
      <div class="card-title">Mechanism of Action</div>
      <div class="card-body">
        Activates the <strong>Nrf2 pathway</strong><br>
        Upregulates antioxidant gene expression<br>
        Counters <strong>oxidative stress</strong> caused by frataxin deficiency<br>
        Restores mitochondrial function
      </div>
    </div>

    <div class="card card-accent">
      <div class="card-title">MOXIe Trial</div>
      <div class="card-body">
        Phase 2 randomized, placebo-controlled<br>
        Primary endpoint: change in mFARS score<br>
        Significant improvement vs placebo<br>
        Approved for patients age &ge;16 years
      </div>
    </div>
  </div>

  <div class="card card-amber" style="margin-top:16px;">
    <div class="card-title">Pathophysiology Context</div>
    <div class="card-body">Frataxin deficiency &rarr; impaired iron-sulfur cluster assembly &rarr; mitochondrial iron overload &rarr; <strong>oxidative damage</strong>. Omaveloxolone targets this downstream oxidative stress.</div>
  </div>
`));

// ── Slide 15: Clinical Pearl — Repeat Expansions ───────────────────────────
slides.push(slideHTML(MOD, 15, TOTAL, `
  <h1>Repeat Expansions &amp; Testing</h1>
  <div class="section-label">Critical clinical pearl</div>

  <div class="card card-red" style="margin-bottom:24px;">
    <div class="card-title">Standard Exome / Genome CANNOT Detect Trinucleotide Repeats</div>
    <div class="card-body" style="font-size:20px;">Short-read NGS (exome and genome sequencing) is <strong>not designed</strong> to detect large repeat expansions. A negative exome does NOT rule out repeat-expansion ataxias.</div>
  </div>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">Required Testing Methods</div>
      <div class="card-body">
        <strong>RP-PCR</strong> (repeat-primed PCR)<br>
        <strong>Southern blot</strong> (gold standard for large repeats)<br>
        <strong>Long-read sequencing</strong> (PacBio / ONT &mdash; emerging)
      </div>
    </div>

    <div class="card card-violet">
      <div class="card-title">Disorders Requiring Repeat Testing</div>
      <div class="card-body">
        Friedreich ataxia (FXN / GAA)<br>
        Spinocerebellar ataxias (SCA1&ndash;3, 6, 7, 17)<br>
        CANVAS (RFC1 / AAGGG)<br>
        Huntington disease (HTT / CAG)
      </div>
    </div>
  </div>

  <div class="card card-amber" style="margin-top:20px;">
    <div class="card-title">Practical Rule</div>
    <div class="card-body">For any patient with progressive ataxia and a <strong>negative exome</strong>, always ask: &ldquo;Were repeat expansions specifically tested?&rdquo;</div>
  </div>
`));

// ── Slide 16: Key Takeaways ────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 16, TOTAL, [
  {
    title: "Classify ataxia by tempo of onset",
    body: "Acute, subacute, chronic/progressive, or episodic — this drives the entire differential and urgency of workup.",
  },
  {
    title: "Screen for treatable causes first",
    body: "Vitamin E, CoQ10, Wilson, Refsum, CTX, and GLUT1 deficiency are all treatable — don't miss them.",
  },
  {
    title: "Friedreich ataxia is the most common AR ataxia",
    body: "Onset by age 25, cardiomyopathy in 2/3, diabetes in 30%. Frataxin level is the screening test; GAA repeat testing confirms.",
  },
  {
    title: "Exome/genome misses repeat expansions",
    body: "Standard NGS cannot detect trinucleotide repeats. RP-PCR or long-read sequencing is required for FA, SCAs, and CANVAS.",
  },
  {
    title: "Omaveloxolone is a breakthrough therapy",
    body: "First FDA-approved treatment for FA — activates Nrf2 to counter oxidative stress from frataxin deficiency.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
