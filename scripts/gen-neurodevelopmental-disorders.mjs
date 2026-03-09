/**
 * scripts/gen-neurodevelopmental-disorders.mjs
 *
 * Generates 12 slides (6 sections × 2 slides each) for the Neurodevelopmental Disorders module.
 * Section alignment matches data/modules/neurodevelopmental-disorders.json exactly.
 *
 * Run: node scripts/gen-neurodevelopmental-disorders.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "neurodevelopmental-disorders";
const mc = MODULE_COLORS[MOD];
const TOTAL = 12;

const slides = [];

/* ================================================================
   Section 0: Tuberous Sclerosis Complex: Overview and Clinical Features (slides 1–2)
   ================================================================ */

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Classic Neurodevelopmental<br>Genetic Disorders",
  subtitle: "TSC, Fragile X, and Rett Syndrome",
  totalSlides: TOTAL,
  topics: [
    "TSC overview &amp; clinical features",
    "TSC targeted therapy &amp; surveillance",
    "Fragile X syndrome",
    "FXTAS &amp; FXPOI (premutation)",
    "Rett syndrome (MECP2)",
    "Testing strategies across NDD",
  ],
}));

// ── Slide 2: TSC Overview & Multi-System Manifestations ───────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Tuberous Sclerosis Complex &mdash; Overview</h1>
  <div class="section-label">TSC1 (Hamartin) / TSC2 (Tuberin) &rarr; mTOR Pathway</div>

  <table style="margin-bottom:14px;">
    <thead><tr><th>System</th><th>Manifestations</th><th>Key Details</th></tr></thead>
    <tbody>
      <tr><td>Brain</td><td>Cortical tubers, SENs, SEGAs</td><td>Epilepsy in ~85%; infantile spasms; ASD 40&ndash;50%</td></tr>
      <tr><td>Heart</td><td>Cardiac rhabdomyomas</td><td>Often earliest sign (prenatal/neonatal); typically regress</td></tr>
      <tr><td>Kidney</td><td>Angiomyolipomas, renal cysts</td><td>Lifelong hemorrhage risk</td></tr>
      <tr><td>Lung</td><td>LAM</td><td>Progressive cystic lung disease (adult females)</td></tr>
      <tr><td>Skin</td><td>Angiofibromas, shagreen patches</td><td>Facial angiofibromas &ge;3 = pathognomonic</td></tr>
    </tbody>
  </table>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">Pathway</div>
      <div class="card-body" style="font-size:25px;">TSC1/TSC2 complex inhibits mTOR. Loss of either protein &rarr; <strong>constitutive mTOR activation</strong> &rarr; uncontrolled cell growth across multiple organs. Two-hit tumorigenesis model.</div>
    </div>
    <div class="card card-amber">
      <div class="card-title">Diagnosis</div>
      <div class="card-body" style="font-size:25px;">2012 criteria: 2 major features or 1 major + &ge;2 minor = definite clinical diagnosis. <strong>Pathogenic TSC1/TSC2 variant is independently sufficient.</strong> ~2/3 of cases are de novo.</div>
    </div>
  </div>
`));

/* ================================================================
   Section 1: TSC Targeted Therapy and Surveillance (slides 3–4)
   ================================================================ */

// ── Slide 3: TSC Therapy ──────────────────────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>TSC &mdash; Targeted Therapy</h1>
  <div class="section-label">mTOR Inhibitors &bull; Vigabatrin &bull; EPISTOP</div>

  <div class="two-col" style="margin-bottom:18px;">
    <div class="card card-accent" style="margin-bottom:14px;">
      <div class="card-title">Everolimus (mTOR Inhibitor)</div>
      <div class="card-body" style="font-size:25px;">
        FDA-approved for:<br>
        &bull; TSC-associated <strong>SEGA</strong> (reduces tumor volume)<br>
        &bull; TSC-associated <strong>renal AML</strong> (reduces size &amp; hemorrhage risk)<br>
        &bull; Adjunctive therapy for <strong>refractory focal seizures</strong>
      </div>
    </div>
    <div class="card card-green" style="margin-bottom:14px;">
      <div class="card-title">Vigabatrin &mdash; First-Line for TSC Infantile Spasms</div>
      <div class="card-body" style="font-size:25px;">
        <strong>~95% response rate</strong> in TSC-related infantile spasms (vs. ~50% for ACTH/prednisolone in non-TSC)<br><br>
        Preferential efficacy may relate to GABAergic circuit disruption by cortical tubers
      </div>
    </div>
  </div>

  <div class="card card-violet">
    <div class="card-title">EPISTOP Trial (2021) &mdash; Preventive Treatment</div>
    <div class="card-body" style="font-size:25px;">Preventive vigabatrin in TSC infants with epileptiform EEG but <strong>before clinical seizures</strong> significantly reduced epilepsy incidence, drug-resistant epilepsy risk, and improved neurodevelopmental outcomes at 24 months</div>
  </div>
`));

// ── Slide 4: TSC Surveillance + TSC2 vs TSC1 ──────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>TSC &mdash; Surveillance Guidelines</h1>
  <div class="section-label">Lifelong Monitoring Across Organ Systems</div>

  <table style="margin-bottom:18px;">
    <thead><tr><th>Organ</th><th>Test</th><th>Frequency</th></tr></thead>
    <tbody>
      <tr><td>Brain (SEGA)</td><td>MRI brain</td><td>Every 1&ndash;3 years until age 25</td></tr>
      <tr><td>Kidney (AML)</td><td>Renal imaging (US or MRI)</td><td>Every 1&ndash;3 years lifelong</td></tr>
      <tr><td>Heart</td><td>Echocardiography</td><td>In infancy; repeat if symptomatic</td></tr>
      <tr><td>Lung (LAM)</td><td>CT chest + PFTs</td><td>Adult females; baseline at 18</td></tr>
      <tr><td>EEG</td><td>Serial EEG</td><td>Infants &mdash; for preventive treatment (EPISTOP)</td></tr>
      <tr><td>Skin/Eyes</td><td>Derm + ophtho exam</td><td>Annual</td></tr>
    </tbody>
  </table>

  <div class="card card-amber">
    <div class="card-title">TSC2 vs TSC1 Severity</div>
    <div class="card-body" style="font-size:27px;">
      <strong>TSC2 variants</strong> are generally associated with a <strong>more severe</strong> clinical phenotype than TSC1: more cortical tubers, earlier seizure onset, higher rates of intellectual disability, and larger renal AMLs
    </div>
  </div>
`));

/* ================================================================
   Section 2: Fragile X Syndrome (slides 5–6)
   ================================================================ */

// ── Slide 5: Fragile X — Repeat Categories & Clinical Features ─────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Fragile X Syndrome</h1>
  <div class="section-label">FMR1 CGG Repeat Expansion (Xq27.3)</div>

  <table style="margin-bottom:14px;">
    <thead><tr><th>Category</th><th>CGG Repeats</th><th>Significance</th></tr></thead>
    <tbody>
      <tr><td>Normal</td><td>5 &ndash; 44</td><td>Stable on transmission</td></tr>
      <tr><td>Intermediate</td><td>45 &ndash; 54</td><td>Gray zone &mdash; may expand in future generations</td></tr>
      <tr><td style="color:${COLORS.amber};">Premutation</td><td style="font-weight:700;">55 &ndash; 200</td><td>Risk of FXTAS (males) and FXPOI (females); RNA toxicity mechanism</td></tr>
      <tr><td style="color:${COLORS.red};">Full Mutation</td><td style="font-weight:700; color:${COLORS.red};">&gt;200</td><td>Methylation &rarr; FMR1 silencing &rarr; absent FMRP protein</td></tr>
    </tbody>
  </table>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">Clinical Features (Affected Males)</div>
      <div class="card-body" style="font-size:25px;">
        Moderate-to-severe ID, long face, prominent ears, prominent jaw<br>
        Macroorchidism (post-pubertal, &gt;25 mL)<br>
        Anxiety, ADHD, hand flapping, gaze avoidance<br>
        Joint hypermobility, flat feet, MVP
      </div>
    </div>
    <div class="card card-red">
      <div class="card-title">Testing Alert</div>
      <div class="card-body" style="font-size:25px;">
        <strong>WES/WGS cannot detect CGG repeat expansions</strong><br><br>
        Specific FMR1 testing required: triplet-repeat PCR + Southern blot<br><br>
        ACMG: first-tier test in any male with unexplained ID
      </div>
    </div>
  </div>
`));

// ── Slide 6: Fragile X — FMRP Function & Anticipation ─────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Fragile X &mdash; Molecular Mechanism</h1>
  <div class="section-label">FMRP Function &bull; Anticipation &bull; X-Linked Inheritance</div>

  <div class="two-col" style="margin-bottom:18px;">
    <div class="card card-violet">
      <div class="card-title">FMRP Function</div>
      <div class="card-body" style="font-size:25px;">
        RNA-binding protein that <strong>transports mRNAs to synapses</strong> and represses translation until activation<br><br>
        Without FMRP: excessive, unregulated synaptic protein synthesis<br><br>
        <strong>mGluR theory:</strong> exaggerated mGluR5 signaling and LTD
      </div>
    </div>
    <div class="card card-amber">
      <div class="card-title">Anticipation &amp; Expansion Risk</div>
      <div class="card-body" style="font-size:25px;">
        Premutation alleles are <strong>unstable during maternal meiosis</strong><br><br>
        Expansion risk increases with repeat length:<br>
        &bull; &gt;90 repeats: <strong>near-100% expansion risk</strong><br><br>
        Paternal transmission is generally stable (premutation &rarr; premutation to daughters)
      </div>
    </div>
  </div>

  <div class="card card-green">
    <div class="card-title">X-Linked Inheritance</div>
    <div class="card-body" style="font-size:27px;">
      Males with full mutation: typically moderate-to-severe ID. Females with full mutation: <strong>variable</strong> cognitive impairment (~50% have some degree) due to random X-inactivation &mdash; the proportion of cells expressing the normal allele determines severity.
    </div>
  </div>
`));

/* ================================================================
   Section 3: Fragile X-Associated Conditions: FXTAS and FXPOI (slides 7–8)
   ================================================================ */

// ── Slide 7: FXTAS & FXPOI ───────────────────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>FXTAS &amp; FXPOI</h1>
  <div class="section-label">FMR1 Premutation (55&ndash;200 CGG Repeats) &mdash; Distinct Disease Spectrum</div>

  <div class="two-col" style="margin-bottom:18px;">
    <div class="card card-violet">
      <div class="card-title" style="font-size:31px;">FXTAS</div>
      <div class="card-body" style="font-size:25px;">
        <strong>Fragile X-Associated Tremor/Ataxia Syndrome</strong><br><br>
        Predominantly males &gt;50 years<br><br>
        <strong>Features:</strong> intention tremor, cerebellar gait ataxia, executive dysfunction, dementia, parkinsonism, peripheral neuropathy<br><br>
        <strong>MRI hallmark:</strong> bilateral T2/FLAIR hyperintensities in <strong>middle cerebellar peduncles</strong> (MCP sign)
      </div>
    </div>
    <div class="card card-amber">
      <div class="card-title" style="font-size:31px;">FXPOI</div>
      <div class="card-body" style="font-size:25px;">
        <strong>Fragile X-Associated Primary Ovarian Insufficiency</strong><br><br>
        Affects <strong>20&ndash;25%</strong> of female premutation carriers<br><br>
        Menstrual irregularity, infertility, or premature menopause (before age 40)<br><br>
        <strong>Clinical impact:</strong> essential for reproductive counseling and fertility planning
      </div>
    </div>
  </div>

  <div class="card card-red">
    <div class="card-title">RNA Toxicity Mechanism &mdash; NOT FMRP Deficiency</div>
    <div class="card-body" style="font-size:25px;">Premutation produces <strong>elevated FMR1 mRNA</strong> (2&ndash;8x normal) with expanded CGG repeats. Excess mRNA forms hairpin structures, sequesters RNA-binding proteins (DGCR8, Sam68), and triggers intranuclear inclusions &mdash; analogous to DM1 CUG repeat RNA toxicity.</div>
  </div>
`));

// ── Slide 8: FXTAS/FXPOI — Counseling Implications ────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>FMR1 Premutation &mdash; Counseling</h1>
  <div class="section-label">Cascade Testing &bull; Reproductive Implications</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div class="card card-accent">
      <div class="card-title">Female Premutation Carriers</div>
      <div class="card-body" style="font-size:25px;">
        <strong>Personal risk:</strong> FXPOI (20&ndash;25%) &mdash; fertility counseling essential<br><br>
        <strong>Offspring risk:</strong> premutation can expand to full mutation during maternal transmission<br><br>
        &gt;90 CGG repeats: near-100% expansion risk to full mutation in offspring
      </div>
    </div>
    <div class="card card-violet">
      <div class="card-title">Male Premutation Carriers</div>
      <div class="card-body" style="font-size:25px;">
        <strong>Personal risk:</strong> FXTAS (late onset, progressive)<br><br>
        <strong>Transmission:</strong> paternal premutation is generally <strong>stable</strong> &mdash; passes premutation (NOT full mutation) to all daughters<br><br>
        All daughters will be premutation carriers
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Key Distinction</div>
    <div class="value" style="font-size:31px;">Full mutation = gene SILENCED, FMRP absent (Fragile X syndrome). Premutation = gene OVEREXPRESSED, toxic mRNA (FXTAS/FXPOI). Fundamentally different mechanisms.</div>
  </div>
`));

/* ================================================================
   Section 4: Rett Syndrome (slides 9–10)
   ================================================================ */

// ── Slide 9: Rett — Clinical Stages ───────────────────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Rett Syndrome &mdash; Clinical Stages</h1>
  <div class="section-label">MECP2 (X-Linked Dominant) &bull; &gt;95% De Novo</div>

  <div class="two-col" style="margin-bottom:16px;">
    <div>
      <div class="card card-accent" style="padding:18px 24px; margin-bottom:10px;">
        <div class="card-title" style="font-size:28px;">Stage I &mdash; Stagnation (6&ndash;18 mo)</div>
        <div class="card-body" style="font-size:24px;">Subtle developmental slowing, decelerating head growth</div>
      </div>
      <div class="card card-red" style="padding:18px 24px; margin-bottom:10px;">
        <div class="card-title" style="font-size:28px;">Stage II &mdash; Rapid Regression (1&ndash;4 yr)</div>
        <div class="card-body" style="font-size:24px;">Loss of hand skills &amp; speech, hand stereotypies (wringing), breathing irregularities, social withdrawal</div>
      </div>
      <div class="card card-amber" style="padding:18px 24px; margin-bottom:10px;">
        <div class="card-title" style="font-size:28px;">Stage III &mdash; Plateau (2&ndash;10 yr)</div>
        <div class="card-body" style="font-size:24px;">Some social improvement, persistent stereotypies, seizures peak (60&ndash;80%), scoliosis develops</div>
      </div>
      <div class="card card-violet" style="padding:18px 24px;">
        <div class="card-title" style="font-size:28px;">Stage IV &mdash; Late Motor (10+ yr)</div>
        <div class="card-body" style="font-size:24px;">Progressive rigidity, loss of ambulation, severe scoliosis, parkinsonian features</div>
      </div>
    </div>
    <div>
      <div class="card card-green" style="margin-bottom:14px;">
        <div class="card-title">Molecular Mechanism</div>
        <div class="card-body" style="font-size:25px;">
          <strong>MECP2</strong> binds methylated CpG dinucleotides and recruits chromatin remodeling complexes (NCoR/SMRT, HDAC3)<br><br>
          Loss causes <strong>widespread transcriptional dysregulation</strong> in mature neurons<br><br>
          Almost exclusively affects <strong>females</strong> &mdash; hemizygous males typically die in infancy
        </div>
      </div>
      <div class="card card-amber">
        <div class="card-title">Additional Features</div>
        <div class="card-body" style="font-size:24px;">Acquired microcephaly, autonomic dysfunction, prolonged QTc (cardiac monitoring needed), breathing irregularities</div>
      </div>
    </div>
  </div>
`));

// ── Slide 10: Rett — Therapy & Dosage Sensitivity ──────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Rett &mdash; Therapy &amp; Gene Dosage Challenge</h1>
  <div class="section-label">MECP2 Dosage Sensitivity &bull; Trofinetide &bull; Gene Therapy</div>

  <div class="two-col" style="margin-bottom:18px;">
    <div class="card card-red">
      <div class="card-title">MECP2 Dosage Sensitivity</div>
      <div class="card-body" style="font-size:25px;">
        <strong>Too little MECP2:</strong> Rett Syndrome<br><br>
        <strong>Too much MECP2:</strong> MECP2 Duplication Syndrome (ID, seizures, recurrent infections, progressive spasticity in males)<br><br>
        This <strong>narrow therapeutic window</strong> makes gene replacement therapy extremely challenging
      </div>
    </div>
    <div class="card card-green">
      <div class="card-title">Trofinetide (FDA Approved 2023)</div>
      <div class="card-body" style="font-size:25px;">
        <strong>First FDA-approved treatment</strong> for Rett Syndrome<br><br>
        IGF-1 analog targeting <strong>downstream consequences</strong> rather than MECP2 directly<br><br>
        Improves clinical global impression scores
      </div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-violet">
      <div class="card-title">Gene Therapy Approaches</div>
      <div class="card-body" style="font-size:25px;">
        miniMECP2 gene therapy vectors<br>
        Antisense oligonucleotide (ASO) strategies<br><br>
        <strong>Challenge:</strong> precise dosing required &mdash; neither too low nor too high
      </div>
    </div>
    <div class="card card-accent">
      <div class="card-title">Atypical Rett Variants</div>
      <div class="card-body" style="font-size:25px;">
        <strong>CDKL5 disorder:</strong> early refractory epilepsy before regression (now classified as distinct entity)<br>
        <strong>FOXG2:</strong> congenital variant with microcephaly
      </div>
    </div>
  </div>
`));

/* ================================================================
   Section 5: Genetic Testing Strategies Across NDD (slides 11–12)
   ================================================================ */

// ── Slide 11: Testing Strategies ──────────────────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Testing Strategies Across NDD</h1>
  <div class="section-label">Disorder-Specific Approaches &bull; Key Principle</div>

  <div class="three-col" style="margin-bottom:18px;">
    <div class="card card-accent" style="padding:24px;">
      <div class="card-title" style="font-size:31px;">TSC</div>
      <div class="card-body" style="font-size:24px;">
        Sequencing + del/dup analysis of <strong>TSC1 &amp; TSC2</strong><br><br>
        Detects ~85% of clinically diagnosed cases<br><br>
        ~15% NMI: may need deep sequencing (mosaicism) or long-read sequencing<br><br>
        Genetic confirmation = sufficient for diagnosis
      </div>
    </div>
    <div class="card card-violet" style="padding:24px;">
      <div class="card-title" style="font-size:31px;">Fragile X</div>
      <div class="card-body" style="font-size:24px;">
        <strong>FMR1 CGG repeat analysis</strong> (PCR + Southern blot)<br><br>
        <strong style="color:${COLORS.red};">NOT detected by WES or WGS</strong><br><br>
        Must be specifically ordered<br><br>
        ACMG: first-tier test in males with unexplained ID
      </div>
    </div>
    <div class="card card-green" style="padding:24px;">
      <div class="card-title" style="font-size:31px;">Rett</div>
      <div class="card-body" style="font-size:24px;">
        <strong>MECP2</strong> sequencing + del/dup (MLPA or array CGH)<br><br>
        Detects &gt;95% of classic Rett<br><br>
        If negative: consider <strong>CDKL5 &amp; FOXG2</strong> for Rett-like phenotypes
      </div>
    </div>
  </div>

  <div class="card card-red">
    <div class="card-title">Key Principle</div>
    <div class="card-body" style="font-size:27px;">Repeat expansion disorders (Fragile X, DM1, Huntington, Friedreich ataxia) require <strong>dedicated repeat-length analysis</strong> and are systematically missed by standard WES/WGS &mdash; always consider whether the phenotype warrants specific repeat testing</div>
  </div>
`));

// ── Slide 12: Key Takeaways ────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 12, TOTAL, [
  {
    title: "TSC is a treatable mTOR-pathway disorder",
    body: "Everolimus for SEGA/AML/seizures. Vigabatrin first-line for infantile spasms (~95% response). EPISTOP: preventive treatment works.",
  },
  {
    title: "FMR1 testing must be specifically ordered",
    body: "CGG repeat expansions are invisible to WES/WGS. First-tier test in any male with unexplained ID.",
  },
  {
    title: "Premutation ≠ full mutation",
    body: "Full mutation = gene silencing, absent FMRP. Premutation = RNA toxicity, FXTAS (tremor/ataxia >50 yr) and FXPOI (ovarian insufficiency 20–25%).",
  },
  {
    title: "Rett follows a characteristic regression pattern",
    body: "Hand stereotypies + acquired microcephaly + regression. Trofinetide is first FDA-approved therapy (2023).",
  },
  {
    title: "MECP2 is dosage-sensitive",
    body: "Too little = Rett. Too much = MECP2 duplication syndrome. Gene therapy requires precise dosing.",
  },
  {
    title: "No single test detects all three disorders",
    body: "TSC: sequencing + del/dup. Fragile X: repeat PCR. Rett: MECP2 analysis. Each requires a disorder-specific approach.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
