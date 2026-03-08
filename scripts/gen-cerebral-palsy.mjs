/**
 * scripts/gen-cerebral-palsy.mjs
 *
 * Generates 16 clean, readable slides for the Cerebral Palsy (Movement 2) module.
 * Covers CP definition, genetic mimics, red flags, case-based learning with
 * arginase deficiency, urea cycle disorders, and treatment.
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
const TOTAL = 16;

const slides = [];

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Cerebral Palsy Genetics",
  subtitle: "Movement Disorders 2",
  totalSlides: TOTAL,
  topics: [
    "Genetic mimics of CP",
    "Red flags for alternate diagnosis",
    "Interpreting genetic testing & OMIM",
    "Founder variants & consanguinity",
    "Metabolic testing for IEM",
    "Urea cycle disorders",
    "Arginase deficiency case study",
  ],
}));

// ── Slide 2: Learning Objectives ───────────────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Learning Objectives</h1>
  <div class="section-label">What You Will Learn</div>

  <div class="two-col" style="margin-top:12px;">
    <div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title">Genetic Mimics of CP</div>
        <div class="card-body">Recognize inborn errors of metabolism and genetic disorders that present as cerebral palsy</div>
      </div>
      <div class="card card-red" style="padding:28px;">
        <div class="card-title">Red Flags for Alternate Diagnosis</div>
        <div class="card-body">Identify clinical features that should prompt re-evaluation of a CP diagnosis</div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="padding:28px;">
        <div class="card-title">Interpreting Genetic Testing</div>
        <div class="card-body">Navigate OMIM, interpret genetic results, and understand the significance of founder variants</div>
      </div>
      <div class="card card-green" style="padding:28px;">
        <div class="card-title">Metabolic Testing for IEM</div>
        <div class="card-body">Apply appropriate metabolic workup including plasma amino acids and urine organic acids</div>
      </div>
    </div>
  </div>
`));

// ── Slide 3: What is Cerebral Palsy? ───────────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>What is Cerebral Palsy?</h1>
  <div class="section-label">Definition &amp; Subtypes</div>

  <div class="card card-accent" style="padding:28px; margin-bottom:24px;">
    <div class="card-title" style="font-size:22px;">Definition</div>
    <div class="card-body" style="font-size:20px;">A group of <strong>non-progressive</strong> motor disabilities caused by injury to the developing brain &mdash; affecting movement, posture, and coordination</div>
  </div>

  <div class="three-col">
    <div class="card card-rose" style="padding:22px;">
      <div class="card-title" style="font-size:20px;">Spastic Types</div>
      <div class="card-body" style="font-size:18px;">
        <strong>Hemiplegia</strong> &mdash; one side<br>
        <strong>Diplegia</strong> &mdash; legs &gt; arms<br>
        <strong>Quadriplegia</strong> &mdash; all limbs
      </div>
    </div>
    <div class="card card-violet" style="padding:22px;">
      <div class="card-title" style="font-size:20px;">Dyskinetic Types</div>
      <div class="card-body" style="font-size:18px;">
        <strong>Athetoid</strong> &mdash; writhing movements<br>
        <strong>Dystonic</strong> &mdash; sustained postures
      </div>
    </div>
    <div class="card card-amber" style="padding:22px;">
      <div class="card-title" style="font-size:20px;">Ataxic Type</div>
      <div class="card-body" style="font-size:18px;">
        <strong>Ataxic CP</strong> &mdash; impaired coordination and balance
      </div>
    </div>
  </div>
`));

// ── Slide 4: Red Flags for Alternate Diagnosis ────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Red Flags for Alternate Diagnosis</h1>
  <div class="section-label">When to Question a CP Label</div>

  <div class="three-col" style="margin-top:16px;">
    <div class="card card-red" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">No Birth Injury History</div>
      <div class="card-body" style="font-size:19px; line-height:1.65;">
        Normal pregnancy and delivery<br><br>
        No NICU admission<br><br>
        No hypoxic-ischemic event documented
      </div>
    </div>
    <div class="card card-amber" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Injury Insufficient</div>
      <div class="card-body" style="font-size:19px; line-height:1.65;">
        Birth history does not explain severity of symptoms<br><br>
        Mild event but severe motor impairment
      </div>
    </div>
    <div class="card card-violet" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Progressive Symptoms</div>
      <div class="card-body" style="font-size:19px; line-height:1.65;">
        CP is <strong>non-progressive</strong> by definition<br><br>
        Worsening motor function over time suggests a different diagnosis
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:20px;">
    <div class="label">Key Principle</div>
    <div class="value" style="font-size:22px;">If the clinical course does not fit a static encephalopathy, reconsider the diagnosis</div>
  </div>
`));

// ── Slide 5: More Red Flags ───────────────────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>More Red Flags</h1>
  <div class="section-label">Additional Warning Signs</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-red" style="padding:26px;">
        <div class="card-title">Metabolic Decompensation</div>
        <div class="card-body" style="font-size:19px;">Episodes of acute encephalopathy, especially triggered by illness or fasting &mdash; suggests an inborn error of metabolism</div>
      </div>
      <div class="card card-amber" style="padding:26px;">
        <div class="card-title">Failure to Thrive / Hepatic Dysfunction</div>
        <div class="card-body" style="font-size:19px;">Poor growth, elevated liver enzymes, or hepatomegaly not explained by medications or nutrition</div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="padding:26px;">
        <div class="card-title">Protein Aversion</div>
        <div class="card-body" style="font-size:19px;">Selective avoidance of high-protein foods may indicate a urea cycle or organic acid disorder</div>
      </div>
      <div class="card card-accent" style="padding:26px;">
        <div class="card-title">Family History / Consanguinity</div>
        <div class="card-body" style="font-size:19px;">Affected siblings, parental consanguinity, or origin from a small endogamous community raises suspicion for autosomal recessive disease</div>
      </div>
    </div>
  </div>
`));

// ── Slide 6: Genetic Mimics of CP ─────────────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Genetic Mimics of CP</h1>
  <div class="section-label">Treatable Conditions Misdiagnosed as CP</div>

  <table>
    <thead>
      <tr>
        <th style="width:28%;">CP Presentation</th>
        <th style="width:72%;">Genetic Mimics to Consider</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Spastic diplegia / paraplegia</td>
        <td>Hereditary spastic paraplegia (HSP) &mdash; SPG genes</td>
      </tr>
      <tr>
        <td>Spastic quadriplegia + seizures</td>
        <td>Urea cycle disorders (arginase deficiency), organic acidemias</td>
      </tr>
      <tr>
        <td>Progressive spasticity + white matter</td>
        <td>Leukodystrophies (MLD, Krabbe, PMD)</td>
      </tr>
      <tr>
        <td>Dystonic CP</td>
        <td>PKAN (pantothenate kinase), DYT genes, GTP cyclohydrolase</td>
      </tr>
      <tr>
        <td>Ataxic CP</td>
        <td>Joubert syndrome, congenital disorders of glycosylation (CDG)</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:12px;">
    <div class="label">Clinical Impact</div>
    <div class="value" style="font-size:22px;">Many genetic mimics are treatable &mdash; early diagnosis changes outcomes</div>
  </div>
`, `
  tbody td { font-size: 17px; }
`));

// ── Slide 7: Workup for CP Mimics ─────────────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Workup for CP Mimics</h1>
  <div class="section-label">Diagnostic Approach</div>

  <div class="three-col" style="margin-top:16px;">
    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Neuroimaging</div>
      <div class="card-body" style="font-size:18px; line-height:1.65;">
        Brain MRI with attention to:<br><br>
        &bull; White matter abnormalities<br>
        &bull; Cerebellar atrophy<br>
        &bull; Basal ganglia signal changes<br>
        &bull; Molar tooth sign (Joubert)
      </div>
    </div>
    <div class="card card-green" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Metabolic Testing</div>
      <div class="card-body" style="font-size:18px; line-height:1.65;">
        <strong>Plasma amino acids</strong> (PAA)<br><br>
        <strong>Urine organic acids</strong> (UOA)<br><br>
        Ammonia, lactate, acylcarnitine profile<br><br>
        Urine orotic acid
      </div>
    </div>
    <div class="card card-violet" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Genetic Testing</div>
      <div class="card-body" style="font-size:18px; line-height:1.65;">
        <strong>Gene panels</strong> (HSP, leukodystrophy)<br><br>
        <strong>Exome sequencing</strong> (WES)<br><br>
        <strong>Genome sequencing</strong> (WGS)<br><br>
        Chromosomal microarray
      </div>
    </div>
  </div>
`));

// ── Slide 8: Case Presentation ────────────────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Case Presentation</h1>
  <div class="section-label">Clinical Scenario</div>

  <div class="two-col" style="margin-top:16px;">
    <div class="card card-accent" style="padding:32px;">
      <div class="card-title" style="font-size:22px; margin-bottom:14px;">Patient</div>
      <div class="card-body" style="font-size:20px; line-height:1.7;">
        <strong>10-year-old boy</strong><br><br>
        Diagnosed with <strong>spastic quadriplegia</strong> cerebral palsy<br><br>
        <strong>Failure to thrive</strong> despite adequate caloric intake
      </div>
    </div>
    <div class="card card-red" style="padding:32px;">
      <div class="card-title" style="font-size:22px; margin-bottom:14px;">Acute Presentation</div>
      <div class="card-body" style="font-size:20px; line-height:1.7;">
        Admitted with <strong>status epilepticus</strong><br><br>
        Labs reveal <strong>hyperammonemia</strong><br>
        Ammonia: <strong style="color:${COLORS.red};">350 &micro;mol/L</strong><br>
        <span style="font-size:17px; color:${COLORS.muted};">(normal &lt;35 &micro;mol/L)</span>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Question</div>
    <div class="value" style="font-size:22px;">What red flags suggest this may not be simple CP?</div>
  </div>
`));

// ── Slide 9: Case History Details ─────────────────────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Case History Details</h1>
  <div class="section-label">Deeper Dive</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-green" style="padding:26px;">
        <div class="card-title">Early Development</div>
        <div class="card-body" style="font-size:19px;">Normal milestones until 8 months of age &mdash; then first seizure during a febrile illness with sepsis</div>
      </div>
      <div class="card card-amber" style="padding:26px;">
        <div class="card-title">Dietary History</div>
        <div class="card-body" style="font-size:19px;">Consistent avoidance of high-protein foods: refuses meat, eggs, dairy. Self-restricts to carbohydrate-rich diet</div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="padding:26px;">
        <div class="card-title">Family / Social History</div>
        <div class="card-body" style="font-size:19px;">Parents from the same small village &mdash; raises question of <strong>consanguinity</strong> or <strong>founder effect</strong></div>
      </div>
      <div class="card card-red" style="padding:26px;">
        <div class="card-title">Red Flags Identified</div>
        <div class="card-body" style="font-size:19px;">
          &bull; Normal early milestones (no birth injury)<br>
          &bull; Progressive course<br>
          &bull; Protein aversion<br>
          &bull; Hyperammonemia
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 10: Consanguinity vs Founder Effect ─────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Consanguinity vs Founder Effect</h1>
  <div class="section-label">Implications for Genetic Disease</div>

  <div class="two-col" style="margin-top:20px;">
    <div class="card card-accent" style="padding:32px;">
      <div class="card-title" style="font-size:22px; margin-bottom:14px;">Consanguinity</div>
      <div class="card-body" style="font-size:19px; line-height:1.65;">
        Parents share a recent common ancestor<br><br>
        Increased <strong>genome-wide homozygosity</strong><br><br>
        Elevated risk for <strong>any</strong> autosomal recessive condition &mdash; not limited to specific genes
      </div>
    </div>
    <div class="card card-violet" style="padding:32px;">
      <div class="card-title" style="font-size:22px; margin-bottom:14px;">Founder Effect</div>
      <div class="card-body" style="font-size:19px; line-height:1.65;">
        A specific pathogenic variant becomes enriched in a small, isolated population<br><br>
        Increases risk for <strong>one specific</strong> AR condition<br><br>
        Parents may not be closely related but carry the same founder variant
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:20px;">
    <div class="label">Shared Consequence</div>
    <div class="value" style="font-size:22px;">Both increase the chance of homozygosity for pathogenic AR variants</div>
  </div>
`));

// ── Slide 11: Investigations ──────────────────────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Investigations</h1>
  <div class="section-label">Case Workup Results</div>

  <div class="three-col" style="margin-top:16px;">
    <div class="card card-accent" style="padding:26px;">
      <div class="card-title" style="font-size:22px;">EEG</div>
      <div class="card-body" style="font-size:19px; line-height:1.6;">
        Diffusely abnormal background<br><br>
        Multifocal epileptiform discharges
      </div>
    </div>
    <div class="card card-violet" style="padding:26px;">
      <div class="card-title" style="font-size:22px;">Brain MRI</div>
      <div class="card-body" style="font-size:19px; line-height:1.6;">
        <strong>Cerebral volume loss</strong><br><br>
        <strong>Cerebellar atrophy</strong><br><br>
        No focal lesion or white matter disease
      </div>
    </div>
    <div class="card card-red" style="padding:26px;">
      <div class="card-title" style="font-size:22px;">Labs</div>
      <div class="card-body" style="font-size:19px; line-height:1.6;">
        Ammonia: <strong style="color:${COLORS.red};">350</strong> &micro;mol/L<br><br>
        AST / ALT: <strong>elevated</strong><br><br>
        Consistent with hepatic involvement
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:20px;">
    <div class="label">Next Step</div>
    <div class="value" style="font-size:22px;">Plasma amino acids + urine orotic acid to differentiate urea cycle disorders</div>
  </div>
`));

// ── Slide 12: Genetic Results ─────────────────────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>Genetic Results</h1>
  <div class="section-label">Diagnosis Confirmed</div>

  <div class="card card-accent" style="padding:32px; margin-top:16px; margin-bottom:20px;">
    <div class="card-title" style="font-size:22px; margin-bottom:12px;">Gene: ARG1 (Arginase 1)</div>
    <div class="card-body" style="font-size:20px; line-height:1.7;">
      <strong>Diagnosis:</strong> Arginemia (Arginase Deficiency)<br><br>
      <strong>Inheritance:</strong> Autosomal recessive (AR)<br><br>
      <strong>Variant:</strong> Homozygous pathogenic<br>
      <span style="font-family:monospace; font-size:20px; background:#f1f5f9; padding:4px 12px; border-radius:6px;">c.871C&gt;T (p.Arg291*)</span>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-green" style="padding:24px;">
      <div class="card-title">Variant Type</div>
      <div class="card-body" style="font-size:19px;">Nonsense variant creating a premature stop codon &mdash; results in absent or truncated arginase protein</div>
    </div>
    <div class="card card-violet" style="padding:24px;">
      <div class="card-title">Homozygosity Explained</div>
      <div class="card-body" style="font-size:19px;">Consistent with consanguinity or founder effect &mdash; both parents carry the same pathogenic allele</div>
    </div>
  </div>
`));

// ── Slide 13: Urea Cycle Disorders ────────────────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Urea Cycle Disorders</h1>
  <div class="section-label">Overview of UCD Subtypes</div>

  <table>
    <thead>
      <tr>
        <th style="width:20%;">Category</th>
        <th style="width:30%;">Enzyme / Protein</th>
        <th style="width:50%;">Key Features</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Cofactor</td>
        <td>NAGS (N-acetylglutamate synthase)</td>
        <td>Activator of CPS1; treatable with carglumic acid</td>
      </tr>
      <tr>
        <td>Catalytic</td>
        <td>CPS1, OTC, ASS1, ASL, ARG1</td>
        <td>Direct enzyme deficiencies in the urea cycle pathway</td>
      </tr>
      <tr>
        <td>Transporter</td>
        <td>Citrin (SLC25A13), ORNT1</td>
        <td>Mitochondrial transporter defects; citrin deficiency common in East Asia</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Urea Cycle Pathway</div>
    <div class="value" style="font-size:20px;">NH₃ &rarr; carbamoyl phosphate &rarr; citrulline &rarr; argininosuccinate &rarr; arginine &rarr; urea + ornithine</div>
  </div>
`, `
  tbody td { font-size: 17px; }
`));

// ── Slide 14: Arginase Deficiency ─────────────────────────────────────────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>Arginase Deficiency</h1>
  <div class="section-label">The CP Mimic</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Unique Among UCDs</div>
        <div class="card-body" style="font-size:19px; line-height:1.65;">
          Rarest urea cycle disorder<br><br>
          Presents with <strong>progressive spastic diplegia / quadriplegia</strong><br><br>
          Often <strong>misdiagnosed as CP</strong> for years
        </div>
      </div>
      <div class="card card-red" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Why It Mimics CP</div>
        <div class="card-body" style="font-size:19px; line-height:1.65;">
          Gradual onset of spasticity<br><br>
          Hyperammonemia may be <strong>mild</strong> compared to other UCDs
        </div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Clinical Features</div>
        <div class="card-body" style="font-size:19px; line-height:1.65;">
          Progressive spasticity (legs &gt; arms)<br><br>
          Intellectual disability<br><br>
          Seizures<br><br>
          Hepatic damage (elevated AST/ALT)<br><br>
          Failure to thrive
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 15: Treatment ───────────────────────────────────────────────────
slides.push(slideHTML(MOD, 15, TOTAL, `
  <h1>Treatment</h1>
  <div class="section-label">Managing Arginase Deficiency &amp; UCDs</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-green" style="padding:26px;">
        <div class="card-title" style="font-size:22px;">Nitrogen Scavengers</div>
        <div class="card-body" style="font-size:19px;">Sodium benzoate, sodium phenylbutyrate &mdash; provide alternative pathways for nitrogen excretion</div>
      </div>
      <div class="card card-amber" style="padding:26px;">
        <div class="card-title" style="font-size:22px;">Protein Restriction</div>
        <div class="card-body" style="font-size:19px;">Limit dietary protein to reduce ammonia production while ensuring adequate essential amino acid intake</div>
      </div>
      <div class="card card-red" style="padding:26px;">
        <div class="card-title" style="font-size:22px;">Acute Episodes</div>
        <div class="card-body" style="font-size:19px;">Hemodialysis for severe hyperammonemia; IV dextrose to prevent catabolism</div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="padding:26px;">
        <div class="card-title" style="font-size:22px;">Pegzilarginase (ERT)</div>
        <div class="card-body" style="font-size:19px;">Enzyme replacement therapy &mdash; PEGylated recombinant arginase that reduces plasma arginine levels</div>
      </div>
      <div class="card card-accent" style="padding:26px;">
        <div class="card-title" style="font-size:22px;">Liver Transplant</div>
        <div class="card-body" style="font-size:19px;">Curative for the metabolic defect; considered for severe or refractory cases of urea cycle disorders</div>
      </div>
    </div>
  </div>
`));

// ── Slide 16: Key Takeaways ───────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 16, TOTAL, [
  {
    title: "CP mimics are treatable",
    body: "Genetic and metabolic conditions (HSP, UCDs, leukodystrophies) can masquerade as CP \u2014 identifying them changes management.",
  },
  {
    title: "Red flags demand re-evaluation",
    body: "No birth injury history, progressive course, protein aversion, metabolic decompensation, or consanguinity should trigger further workup.",
  },
  {
    title: "Founder effect vs consanguinity",
    body: "Both increase homozygosity for AR variants \u2014 founder effect enriches one specific variant, consanguinity increases risk genome-wide.",
  },
  {
    title: "Hyperammonemia requires urgent workup",
    body: "Plasma amino acids and urine orotic acid differentiate UCD subtypes \u2014 arginase deficiency shows elevated arginine on PAA.",
  },
  {
    title: "PAA and urine orotic acid distinguish UCDs",
    body: "Each UCD has a characteristic amino acid pattern: elevated citrulline (ASS1), argininosuccinate (ASL), or arginine (ARG1).",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
