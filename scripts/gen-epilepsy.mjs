/**
 * scripts/gen-epilepsy.mjs
 *
 * Generates 15 slides for the Epilepsy Genetics module.
 * Aligned to JSON section structure:
 *   S0 (slides 1-3): Overview of Genetic Epilepsy
 *   S1 (slides 4-6): Neonatal and Infantile-Onset Epileptic Encephalopathies
 *   S2 (slides 7-9): Interpreting Genetic Results in Epilepsy
 *   S3 (slides 10-12): Inborn Errors of Metabolism Causing Epilepsy
 *   S4 (slides 13-15): Pyridoxine-Dependent Epilepsy: A Model for Precision Treatment
 *
 * Run: node scripts/gen-epilepsy.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "epilepsy";
const mc = MODULE_COLORS[MOD];
const TOTAL = 15;

const slides = [];

// ═══════════════════════════════════════════════════════════════════════════
// S0: Overview of Genetic Epilepsy (slides 1-3)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Genetic Epilepsies",
  subtitle: "From neonatal encephalopathies and ion channelopathies to metabolic epilepsies and precision treatment",
  totalSlides: TOTAL,
  topics: [
    "Overview of genetic epilepsy",
    "Neonatal epileptic encephalopathies",
    "Interpreting genetic results",
    "Metabolic causes of epilepsy",
    "Pyridoxine-dependent epilepsy",
  ],
}));

// ── Slide 2: Genetic Architecture of Epilepsy ─────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Genetic Architecture of Epilepsy</h1>
  <div class="section-label">Overview of Genetic Epilepsy</div>

  <div class="stats-row" style="margin-bottom:24px;">
    <div class="stat-card" style="background:${mc.light}; border-color:${mc.accent};">
      <div class="stat-label">Population Prevalence</div>
      <div class="stat-value">1&ndash;2%</div>
      <div style="font-size:16px; color:${COLORS.muted}; margin-top:4px;">All epilepsy</div>
    </div>
    <div class="stat-card" style="background:${COLORS.violetLight}; border-color:${COLORS.violet};">
      <div class="stat-label">Genetic Contribution</div>
      <div class="stat-value">Up to 70%</div>
      <div style="font-size:16px; color:${COLORS.muted}; margin-top:4px;">Genetic factors implicated</div>
    </div>
    <div class="stat-card" style="background:${COLORS.redLight}; border-color:${COLORS.red};">
      <div class="stat-label">Pediatric Genetic Yield</div>
      <div class="stat-value">~30%</div>
      <div style="font-size:16px; color:${COLORS.muted}; margin-top:4px;">Identifiable genetic cause</div>
    </div>
    <div class="stat-card" style="background:${COLORS.greenLight}; border-color:${COLORS.green};">
      <div class="stat-label">EE Genetic Yield</div>
      <div class="stat-value">50&ndash;60%</div>
      <div style="font-size:16px; color:${COLORS.muted}; margin-top:4px;">Epileptic encephalopathies</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">Monogenic (Rare, High Penetrance)</div>
      <div class="card-body" style="font-size:18px;">
        Single-gene disorders causing severe early-onset epileptic encephalopathies (Ohtahara, West, Dravet). De novo variants account for the majority.
      </div>
    </div>
    <div class="card card-violet">
      <div class="card-title">Polygenic (Common, Low Penetrance)</div>
      <div class="card-body" style="font-size:18px;">
        Many variants of small effect contribute to common epilepsy syndromes (JME, CAE). GWAS identifies risk loci but individual effect sizes are small.
      </div>
    </div>
  </div>
`));

// ── Slide 3: Classification & Treatment Implications ───────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Classification &amp; Treatment Implications</h1>
  <div class="section-label">Overview of Genetic Epilepsy</div>

  <div style="font-size:21px; margin-bottom:20px; color:${COLORS.body};">
    Genetic epilepsies are classified by seizure type, age of onset, EEG pattern, and associated features. Genetic diagnosis has <strong>direct treatment implications</strong>:
  </div>

  <table>
    <thead>
      <tr><th>Gene</th><th>Syndrome</th><th>Treatment Implication</th></tr>
    </thead>
    <tbody>
      <tr><td>SCN1A</td><td>Dravet syndrome</td><td style="color:${COLORS.red}; font-weight:600;">Avoid sodium channel blockers</td></tr>
      <tr><td>KCNQ2</td><td>Neonatal EE</td><td style="color:${COLORS.green}; font-weight:600;">Sodium channel blockers beneficial</td></tr>
      <tr><td>ALDH7A1</td><td>Pyridoxine-dependent epilepsy</td><td style="color:${COLORS.green}; font-weight:600;">Pyridoxine supplementation</td></tr>
      <tr><td>SLC2A1</td><td>GLUT1 deficiency</td><td style="color:${COLORS.green}; font-weight:600;">Ketogenic diet</td></tr>
      <tr><td>SLC6A1</td><td>MAE / absence epilepsy</td><td style="color:${COLORS.red}; font-weight:600;">Avoid vigabatrin</td></tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Key Principle</div>
    <div class="value" style="font-size:22px;">De novo variants cause most severe early-onset EEs &mdash; sporadic occurrence does NOT exclude genetic etiology</div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// S1: Neonatal and Infantile-Onset Epileptic Encephalopathies (slides 4-6)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 4: KCNQ2 & SCN2A ────────────────────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>KCNQ2 &amp; SCN2A Encephalopathies</h1>
  <div class="section-label">Neonatal Epileptic Encephalopathies</div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title">KCNQ2 / KCNQ3</div>
        <div class="card-body" style="font-size:18px;">
          <strong>Most common genetic cause of neonatal seizures</strong><br><br>
          Onset day 1&ndash;3, tonic seizures, burst-suppression EEG<br><br>
          Responds to <strong>sodium channel blockers</strong> (carbamazepine, phenytoin); phenobarbital also used<br><br>
          Self-limited familial neonatal epilepsy = milder phenotype
        </div>
      </div>
    </div>
    <div>
      <div class="card card-red" style="margin-bottom:16px;">
        <div class="card-title">SCN2A &mdash; Age of Onset Determines Strategy</div>
        <div class="card-body" style="font-size:18px;">
          <strong>Early onset (&lt;3 mo):</strong> Gain-of-function &rarr; Na-channel blockers effective<br><br>
          <strong>Late onset (&gt;3 mo):</strong> Loss-of-function &rarr; Na-channel blockers <strong>contraindicated</strong> (worsen seizures)<br><br>
          Functional consequence drives treatment, not just genotype
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:22px;">KCNQ2 neonatal EE: day 1&ndash;3 tonic seizures + burst suppression &rarr; trial of sodium channel blockers before phenobarbital</div>
  </div>
`));

// ── Slide 5: KCNT1 & Cortical Malformations ───────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>KCNT1 &amp; Cortical Malformation Genes</h1>
  <div class="section-label">Neonatal Epileptic Encephalopathies</div>

  <div class="card card-amber" style="margin-bottom:20px;">
    <div class="card-title">KCNT1 &mdash; Sodium-Activated Potassium Channel</div>
    <div class="card-body" style="font-size:19px;">
      Causes epilepsy of infancy with migrating focal seizures (EIMFS) and autosomal dominant nocturnal frontal lobe epilepsy (ADNFLE). Quinidine used off-label for gain-of-function variants.
    </div>
  </div>

  <div style="font-size:20px; font-weight:700; color:${COLORS.heading}; margin-bottom:14px;">Cortical Malformation Genes &mdash; MRI Essential for Diagnosis</div>

  <div style="display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:14px;">
    <div class="card card-red">
      <div class="card-title" style="font-size:19px;">LIS1</div>
      <div class="card-body" style="font-size:16px;">Classical lissencephaly, posterior &gt; anterior gradient</div>
    </div>
    <div class="card card-violet">
      <div class="card-title" style="font-size:19px;">DCX</div>
      <div class="card-body" style="font-size:16px;">Lissencephaly (males), subcortical band heterotopia (females)</div>
    </div>
    <div class="card card-accent">
      <div class="card-title" style="font-size:19px;">ARX</div>
      <div class="card-body" style="font-size:16px;">X-linked infantile spasms in males, spectrum of severity</div>
    </div>
    <div class="card card-blue">
      <div class="card-title" style="font-size:19px;">Tubulinopathies</div>
      <div class="card-body" style="font-size:16px;">TUBA1A, TUBB2B &mdash; polymicrogyria to lissencephaly</div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">IEM Alert</div>
    <div class="value" style="font-size:21px;">Inborn errors of metabolism also cause neonatal seizures &mdash; biotinidase, PDE, GLUT1, MoCoF deficiency are treatable</div>
  </div>
`));

// ── Slide 6: CDKL5 & Summary Table ────────────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Neonatal EE: Gene Summary</h1>
  <div class="section-label">Neonatal Epileptic Encephalopathies</div>

  <table>
    <thead>
      <tr><th>Gene</th><th>Channel / Function</th><th>Key Phenotype</th><th>Treatment</th></tr>
    </thead>
    <tbody>
      <tr><td>KCNQ2</td><td>Kv7.2 (K+ channel)</td><td>Day 1&ndash;3 tonic, burst suppression</td><td>Na-channel blockers</td></tr>
      <tr><td>SCN2A (early)</td><td>Nav1.2 (Na+ GoF)</td><td>EE onset &lt;3 months</td><td>Na-channel blockers</td></tr>
      <tr><td>SCN2A (late)</td><td>Nav1.2 (Na+ LoF)</td><td>Epilepsy/ASD onset &gt;3 mo</td><td style="color:${COLORS.red};">Avoid Na-blockers</td></tr>
      <tr><td>KCNT1</td><td>KNa1.1 (K+ GoF)</td><td>EIMFS, migrating focals</td><td>Quinidine (off-label)</td></tr>
      <tr><td>SCN1A</td><td>Nav1.1 (Na+ LoF)</td><td>Dravet &mdash; febrile onset 5&ndash;12 mo</td><td style="color:${COLORS.red};">Avoid Na-blockers</td></tr>
      <tr><td>CDKL5</td><td>Kinase (signaling)</td><td>Infantile spasms, severe ID</td><td>Ganaxolone</td></tr>
    </tbody>
  </table>

  <div class="card card-green" style="margin-top:16px;">
    <div class="card-title">Precision Medicine in Neonatal Epilepsy</div>
    <div class="card-body" style="font-size:19px;">Identifying the gene dictates the drug: the same class of medication (Na-channel blockers) can be life-saving in one channelopathy and dangerous in another.</div>
  </div>
`, `
  tbody td { font-size: 16px; padding: 11px 16px; }
  thead th { font-size: 15px; padding: 11px 16px; }
`));

// ═══════════════════════════════════════════════════════════════════════════
// S2: Interpreting Genetic Results in Epilepsy (slides 7-9)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 7: Phenotype Matching & Phasing ──────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Interpreting Genetic Results</h1>
  <div class="section-label">Phenotype Matching &amp; Phasing</div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title">Match Gene to Phenotype</div>
        <div class="card-body" style="font-size:18px;">
          A heterozygous SCN1A variant in a patient <strong>without</strong> Dravet features (febrile seizures &ge;38&deg;C, temperature sensitivity, onset 5&ndash;12 mo) warrants caution before diagnosing Dravet.
        </div>
      </div>
      <div class="card card-red">
        <div class="card-title">Phase Matters in Recessive Disease</div>
        <div class="card-body" style="font-size:18px;">
          Two heterozygous ALDH7A1 variants must be confirmed <strong>in trans</strong> (different alleles) for AR PDE. Parental testing or long-read phasing is required.
        </div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="margin-bottom:16px;">
        <div class="card-title">Treatment-Agnostic Genes</div>
        <div class="card-body" style="font-size:18px;">
          Not all genetic epilepsy diagnoses directly inform treatment. But even &ldquo;non-actionable&rdquo; results guide <strong>prognosis, recurrence risk</strong>, and avoidance of contraindicated medications.
        </div>
      </div>
      <div class="card card-green">
        <div class="card-title">Reanalysis of Non-Diagnostic Exomes</div>
        <div class="card-body" style="font-size:18px;">
          ~10&ndash;15% of previously non-diagnostic exomes yield <strong>new diagnoses</strong> on reanalysis 1&ndash;3 years later. Establish a reanalysis schedule.
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 8: VUS Management ────────────────────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>VUS Management in Epilepsy</h1>
  <div class="section-label">Interpreting Genetic Results</div>

  <div class="card card-amber" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">ACMG Guideline: VUS Cannot Drive Clinical Decisions</div>
    <div class="card-body" style="font-size:19px;">Variants of uncertain significance must not be used for clinical management decisions. Plan reclassification review as new evidence accrues.</div>
  </div>

  <div style="font-size:20px; font-weight:700; color:${COLORS.heading}; margin-bottom:14px;">Tools for Resolving VUS</div>

  <div class="three-col">
    <div class="card card-accent">
      <div class="card-title" style="font-size:20px;">Inheritance &amp; Segregation</div>
      <div class="card-body" style="font-size:17px;">De novo? In trans with known pathogenic? Segregation in affected/unaffected family members?</div>
    </div>
    <div class="card card-green">
      <div class="card-title" style="font-size:20px;">Population Frequency</div>
      <div class="card-body" style="font-size:17px;">Absent from gnomAD? Too common for disease prevalence? Check ancestry-matched frequency.</div>
    </div>
    <div class="card card-violet">
      <div class="card-title" style="font-size:20px;">Functional Data</div>
      <div class="card-body" style="font-size:17px;">Enzyme assays, RNA splicing studies, model organisms provide strong PS3/BS3 evidence.</div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Reclassification Strategy</div>
    <div class="value" style="font-size:21px;">Monitor ClinVar, GeneMatcher, and publications. Schedule systematic reanalysis every 1&ndash;2 years.</div>
  </div>
`));

// ── Slide 9: Variant Interpretation Case Exercise ──────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Case: Evaluating Variants</h1>
  <div class="section-label">Interpreting Genetic Results</div>

  <div style="font-size:20px; margin-bottom:16px; color:${COLORS.body};">
    An infant with refractory neonatal seizures has exome sequencing. Three variants are returned:
  </div>

  <div class="card card-red" style="margin-bottom:14px;">
    <div class="card-title" style="font-size:20px;">ALDH7A1 p.Gly63Ter (Pathogenic) &mdash; Heterozygous</div>
    <div class="card-body" style="font-size:18px;">Nonsense variant creating a null allele. Absent from gnomAD. Consistent with AR disease if a second hit exists.</div>
  </div>

  <div class="card card-amber" style="margin-bottom:14px;">
    <div class="card-title" style="font-size:20px;">ALDH7A1 p.Arg519Lys (VUS) &mdash; Heterozygous</div>
    <div class="card-body" style="font-size:18px;">Missense in a conserved domain. Must confirm <strong>in trans</strong> with the pathogenic variant via parental testing. If confirmed: compound het diagnosis.</div>
  </div>

  <div class="card card-blue" style="margin-bottom:14px;">
    <div class="card-title" style="font-size:20px;">DOCK7 c.818+1G&gt;T (VUS) &mdash; Heterozygous</div>
    <div class="card-body" style="font-size:18px;">DOCK7 is AR. Only one het variant found &mdash; a single hit in an AR gene <strong>does not explain</strong> the phenotype. Carrier only.</div>
  </div>

  <div class="highlight-box">
    <div class="label">Conclusion</div>
    <div class="value" style="font-size:21px;">Parental testing confirms ALDH7A1 variants in trans &rarr; compound heterozygous PDE diagnosed</div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// S3: Inborn Errors of Metabolism Causing Epilepsy (slides 10-12)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 10: IEM Overview ─────────────────────────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>IEM Causing Epilepsy</h1>
  <div class="section-label">Inborn Errors of Metabolism</div>

  <div style="font-size:21px; margin-bottom:20px; color:${COLORS.body};">
    Inborn errors of metabolism are individually rare but collectively account for a significant fraction of neonatal and infantile epilepsy. <strong>Many are treatable</strong> &mdash; metabolic workup is mandatory for unexplained early-onset seizures.
  </div>

  <div class="two-col">
    <div>
      <div class="card card-red" style="margin-bottom:14px;">
        <div class="card-title">Amino Acid Disorders</div>
        <div class="card-body" style="font-size:18px;">
          <strong>MSUD:</strong> Elevated leucine, toxicity<br>
          <strong>NKH:</strong> Elevated CSF/plasma glycine ratio; sodium benzoate<br>
          <strong>PKU:</strong> Newborn screen; phenylalanine-restricted diet
        </div>
      </div>
      <div class="card card-amber">
        <div class="card-title">Organic Acidemias</div>
        <div class="card-body" style="font-size:18px;">
          Propionic &amp; methylmalonic acidemia: elevated ammonia, metabolic acidosis, urine organic acids. Dietary restriction + cofactors.
        </div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="margin-bottom:14px;">
        <div class="card-title">B6-Responsive Epilepsies</div>
        <div class="card-body" style="font-size:18px;">
          <strong>ALDH7A1:</strong> Pyridoxine-dependent epilepsy<br>
          <strong>PNPO:</strong> Requires PLP, not pyridoxine<br>
          <strong>PLPBP:</strong> PLP-responsive seizures
        </div>
      </div>
      <div class="card card-green">
        <div class="card-title">BH4 Disorders</div>
        <div class="card-body" style="font-size:18px;">
          Sepiapterin reductase deficiency: irritability, dystonia, epilepsy. Low CSF neurotransmitter metabolites. Treat with BH4 + L-DOPA.
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 11: GLUT1 Deficiency ─────────────────────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>GLUT1 Deficiency Syndrome</h1>
  <div class="section-label">Inborn Errors of Metabolism</div>

  <div class="stats-row" style="margin-bottom:24px;">
    <div class="stat-card" style="background:${COLORS.redLight}; border-color:${COLORS.red};">
      <div class="stat-label">Diagnostic Hallmark</div>
      <div class="stat-value">CSF/Serum Glucose</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">Ratio &lt;0.4 (normal &ge;0.6)</div>
    </div>
    <div class="stat-card" style="background:${COLORS.greenLight}; border-color:${COLORS.green};">
      <div class="stat-label">Gene</div>
      <div class="stat-value">SLC2A1</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">Haploinsufficiency</div>
    </div>
    <div class="stat-card" style="background:${mc.light}; border-color:${mc.accent};">
      <div class="stat-label">Treatment</div>
      <div class="stat-value">Ketogenic Diet</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">Highly effective</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">Pathophysiology</div>
      <div class="card-body" style="font-size:18px;">
        Impaired glucose transport across the blood-brain barrier. The brain is deprived of its primary fuel. Ketone bodies from the ketogenic diet provide an <strong>alternative energy source</strong>.
      </div>
    </div>
    <div class="card card-violet">
      <div class="card-title">Clinical Features</div>
      <div class="card-body" style="font-size:18px;">
        Infantile-onset epilepsy, developmental delay, acquired microcephaly, paroxysmal movement disorder. <strong>Fasting hypoglycorrhachia</strong> on LP is the key diagnostic clue.
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:21px;">Always check fasting CSF glucose in unexplained infantile epilepsy &mdash; GLUT1 deficiency is treatable and commonly underdiagnosed</div>
  </div>
`));

// ── Slide 12: IEM Diagnostic Approach ──────────────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>IEM: Diagnostic Approach</h1>
  <div class="section-label">Inborn Errors of Metabolism</div>

  <table>
    <thead>
      <tr><th>IEM Category</th><th>Key Biomarker</th><th>Treatment</th></tr>
    </thead>
    <tbody>
      <tr><td>Pyridoxine-dependent (ALDH7A1)</td><td>Urine AASA elevated</td><td>Pyridoxine lifelong</td></tr>
      <tr><td>PLP-responsive (PNPO)</td><td>CSF neurotransmitters</td><td>Pyridoxal-5-phosphate</td></tr>
      <tr><td>GLUT1 deficiency (SLC2A1)</td><td>CSF/serum glucose &lt;0.4</td><td>Ketogenic diet</td></tr>
      <tr><td>Biotinidase deficiency</td><td>Biotinidase enzyme activity</td><td>Biotin supplementation</td></tr>
      <tr><td>Creatine deficiency (GAMT)</td><td>Urine creatine metabolites</td><td>Creatine + ornithine + arginine restriction</td></tr>
      <tr><td>NKH (GLDC)</td><td>CSF/plasma glycine ratio</td><td>Sodium benzoate + dextromethorphan</td></tr>
    </tbody>
  </table>

  <div class="card card-red" style="margin-top:16px;">
    <div class="card-title">Mandatory Metabolic Workup for Neonatal Seizures</div>
    <div class="card-body" style="font-size:19px;">Amino acids (plasma &amp; CSF), organic acids (urine), lactate/pyruvate, CSF glucose, AASA, biotinidase activity. IEM seizures are often refractory to standard AEDs.</div>
  </div>
`, `
  tbody td { font-size: 17px; padding: 12px 16px; }
  thead th { font-size: 15px; padding: 12px 16px; }
`));

// ═══════════════════════════════════════════════════════════════════════════
// S4: Pyridoxine-Dependent Epilepsy (slides 13-15)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 13: PDE Pathophysiology ──────────────────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Pyridoxine-Dependent Epilepsy</h1>
  <div class="section-label">ALDH7A1 / Antiquitin Deficiency</div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title">Biochemical Diagnosis</div>
        <div class="card-body" style="font-size:18px;">
          Elevated <strong>AASA</strong> in urine, plasma, and CSF. This biomarker remains elevated <strong>even on pyridoxine therapy</strong> &mdash; preferred diagnostic marker.
        </div>
      </div>
      <div class="card card-red">
        <div class="card-title">Clinical Presentation</div>
        <div class="card-body" style="font-size:18px;">
          Early neonatal onset (hours to days), prolonged refractory focal seizures, abnormal fetal movements, multifocal EEG. May respond incompletely to AEDs.
        </div>
      </div>
    </div>
    <div>
      <div style="background:${mc.light}; border-radius:12px; padding:28px; border:2px solid ${mc.accent};">
        <div style="font-size:16px; font-weight:700; color:${mc.accent}; text-transform:uppercase; letter-spacing:1px; margin-bottom:16px;">Lysine Pathway</div>
        <div style="font-size:20px; font-weight:700; text-align:center; color:${COLORS.heading};">
          Lysine<br>
          <span style="font-size:28px; color:${COLORS.muted};">&darr;</span><br>
          AASA &amp; P6C<br>
          <span style="font-size:14px; color:${COLORS.red}; font-weight:700;">&mdash; ALDH7A1 blocked &mdash;</span><br>
          <span style="font-size:28px; color:${COLORS.red};">&darr; ACCUMULATE</span><br>
          <span style="font-size:18px; color:${COLORS.red};">P6C + PLP &rarr; PLP depletion</span><br>
          <span style="font-size:28px; color:${COLORS.muted};">&darr;</span><br>
          <span style="font-size:18px; color:${COLORS.red}; font-weight:700;">&darr; GABA synthesis &rarr; Seizures</span>
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 14: Treatment & Triple Therapy ───────────────────────────────────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>PDE: Treatment &amp; Triple Therapy</h1>
  <div class="section-label">Pyridoxine-Dependent Epilepsy</div>

  <div class="card card-accent" style="margin-bottom:16px;">
    <div class="card-title">Lifelong Pyridoxine</div>
    <div class="card-body" style="font-size:19px;">15&ndash;30 mg/kg/day (max 500 mg/day). Doses <strong>doubled during febrile illness</strong>. Controls seizures by restoring PLP levels.</div>
  </div>

  <div style="font-size:20px; font-weight:700; color:${COLORS.heading}; margin-bottom:12px;">Triple Therapy for Improved Neurodevelopmental Outcomes</div>

  <div class="three-col" style="margin-bottom:16px;">
    <div class="card card-green">
      <div class="card-title" style="font-size:20px;">1. Pyridoxine</div>
      <div class="card-body" style="font-size:17px;">15&ndash;30 mg/kg/day. Restores PLP levels, controls seizures.</div>
    </div>
    <div class="card card-violet">
      <div class="card-title" style="font-size:20px;">2. Lysine-Restricted Diet</div>
      <div class="card-body" style="font-size:17px;">Reduces substrate entering degradation pathway, lowering AASA/P6C.</div>
    </div>
    <div class="card card-amber">
      <div class="card-title" style="font-size:20px;">3. Arginine Supplementation</div>
      <div class="card-body" style="font-size:17px;">Competes with lysine for BBB transport, reducing cerebral lysine.</div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Neurodevelopmental Prognosis</div>
    <div class="value" style="font-size:21px;">ID in ~75% even with pyridoxine alone. Triple therapy improves but does not normalize outcomes &mdash; emphasizing the value of newborn screening and early intervention.</div>
  </div>
`));

// ── Slide 15: Key Takeaways ────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 15, TOTAL, [
  {
    title: "Genetic factors underlie up to 70% of epilepsy",
    body: "Yield is ~30% in pediatric epilepsy, rising to 50\u201360% in epileptic encephalopathies. De novo variants cause most severe early-onset EEs.",
  },
  {
    title: "Gene identity dictates the drug",
    body: "Na-channel blockers help KCNQ2 and early-onset SCN2A but worsen SCN1A Dravet. GLUT1 requires ketogenic diet. ALDH7A1 requires pyridoxine.",
  },
  {
    title: "VUS requires systematic follow-up, not clinical action",
    body: "Confirm phasing in AR disease, match gene to phenotype, schedule reanalysis every 1\u20132 years as knowledge evolves.",
  },
  {
    title: "IEM workup is mandatory for neonatal seizures",
    body: "GLUT1, PDE, biotinidase, and creatine deficiency are all treatable \u2014 a metabolic screen must accompany genetic testing.",
  },
  {
    title: "PDE triple therapy targets the pathway, not just seizures",
    body: "Pyridoxine + lysine restriction + arginine reduces AASA/P6C accumulation and improves neurodevelopmental outcomes beyond seizure control alone.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides("epilepsy", slides);
