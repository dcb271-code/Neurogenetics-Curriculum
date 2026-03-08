/**
 * scripts/gen-epilepsy.mjs
 *
 * Generates 20 clean, readable slides for the Epilepsy Genetics module.
 * Covers pyridoxine-dependent epilepsy (ALDH7A1), neonatal seizure
 * differential, variant interpretation in context, and treatment.
 * Condensed from 48 original slides to 20 focused slides.
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
const TOTAL = 20;

const slides = [];

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Epilepsy Genetics",
  subtitle: "Case-Based Approach to Neonatal Seizures & Pyridoxine-Dependent Epilepsy",
  totalSlides: TOTAL,
  topics: [
    "Neonatal seizure differential",
    "Genetic testing interpretation",
    "VUS resolution strategies",
    "Pyridoxine-dependent epilepsy",
    "Biochemical confirmation",
    "Treatment & outcomes",
  ],
}));

// ── Slide 2: Learning Objectives ───────────────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Learning Objectives</h1>
  <div class="section-label">What You Will Learn</div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${mc.accent};">1</div>
    <div><strong style="font-size:21px;">Construct a genetic differential</strong> for neonatal seizures including channelopathies, malformations, and IEM</div>
  </div>
  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.red};">2</div>
    <div><strong style="font-size:21px;">Interpret VUS in clinical context</strong> using inheritance, phenotype match, frequency, and functional data</div>
  </div>
  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.violet};">3</div>
    <div><strong style="font-size:21px;">Recognize limitations</strong> of sequencing: coverage gaps, mosaicism, repeat expansions</div>
  </div>
  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.green};">4</div>
    <div><strong style="font-size:21px;">Describe the natural history</strong> of pyridoxine-dependent epilepsy (PDE) including neurodevelopmental outcomes</div>
  </div>
  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.blue};">5</div>
    <div><strong style="font-size:21px;">Outline treatment</strong> including pyridoxine challenge, lifelong supplementation, and triple therapy</div>
  </div>
`));

// ── Slide 3: Case Presentation ─────────────────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Case Presentation</h1>
  <div class="section-label">Neonatal Seizures</div>

  <div class="card card-amber" style="margin-bottom:24px;">
    <div class="card-title" style="font-size:24px;">6-Day-Old Term Infant</div>
    <div class="card-body" style="font-size:20px;">
      Referred for evaluation of <strong>abnormal repetitive movements</strong>, irritability, and poor feeding since day of life 2.
    </div>
  </div>

  <div class="two-col">
    <div>
      <h3>Birth History</h3>
      <ul class="bullet-list">
        <li>Full-term, uncomplicated delivery</li>
        <li>Birth weight 3.4 kg (50th percentile)</li>
        <li>Apgar scores 8 and 9</li>
        <li>No perinatal distress</li>
      </ul>
    </div>
    <div>
      <h3>Presentation</h3>
      <ul class="bullet-list">
        <li>Multifocal clonic movements</li>
        <li>Abnormal EEG with burst suppression</li>
        <li>Refractory to phenobarbital</li>
        <li>Normal glucose, electrolytes, MRI</li>
      </ul>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Key Question</div>
    <div class="value" style="font-size:22px;">Normal labs and imaging &mdash; what genetic etiologies should we consider?</div>
  </div>
`));

// ── Slide 4: Neonatal Seizure Epidemiology ─────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Neonatal Seizure Epidemiology</h1>
  <div class="section-label">Incidence & Etiology</div>

  <div class="stats-row">
    <div class="stat-card" style="background:${mc.light}; border-color:${mc.accent};">
      <div class="stat-label">Incidence</div>
      <div class="stat-value">1&ndash;4 / 1,000</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">Term live births</div>
    </div>
    <div class="stat-card" style="background:${COLORS.redLight}; border-color:${COLORS.red};">
      <div class="stat-label">Most Common</div>
      <div class="stat-value">HIE &mdash; 38%</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">Hypoxic-ischemic encephalopathy</div>
    </div>
    <div class="stat-card" style="background:${COLORS.violetLight}; border-color:${COLORS.violet};">
      <div class="stat-label">Genetic / Metabolic</div>
      <div class="stat-value">~15&ndash;20%</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">Growing with expanded testing</div>
    </div>
  </div>

  <h3>Etiology Breakdown</h3>
  <table>
    <thead>
      <tr><th>Category</th><th>Proportion</th><th>Examples</th></tr>
    </thead>
    <tbody>
      <tr><td>HIE</td><td>~38%</td><td>Birth asphyxia, perinatal compromise</td></tr>
      <tr><td>Ischemic Stroke</td><td>~18%</td><td>Arterial, venous sinus thrombosis</td></tr>
      <tr><td>Intracranial Hemorrhage</td><td>~12%</td><td>IVH, subdural, subarachnoid</td></tr>
      <tr><td>Genetic / Metabolic</td><td>~15&ndash;20%</td><td>Channelopathies, IEM, malformations</td></tr>
      <tr><td>CNS Infection</td><td>~5%</td><td>Meningitis, encephalitis, TORCH</td></tr>
    </tbody>
  </table>
`));

// ── Slide 5: Genetic Differential — Channelopathies ────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Genetic Differential: Channelopathies</h1>
  <div class="section-label">Ion Channel Disorders</div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title">KCNQ2</div>
        <div class="card-body">Benign familial neonatal epilepsy (AD). Seizures day 2&ndash;7, typically self-limited. Potassium channel.</div>
      </div>
      <div class="card card-amber" style="margin-bottom:16px;">
        <div class="card-title">KCNQ3</div>
        <div class="card-body">Similar phenotype to KCNQ2 but rarer. Potassium channel subunit partner.</div>
      </div>
    </div>
    <div>
      <div class="card card-red" style="margin-bottom:16px;">
        <div class="card-title">KCNT1</div>
        <div class="card-body">Epilepsy of infancy with migrating focal seizures. Severe, often refractory. Gain-of-function mechanism.</div>
      </div>
      <div class="card card-violet" style="margin-bottom:16px;">
        <div class="card-title">SCN2A</div>
        <div class="card-body">Benign familial neonatal-infantile epilepsy (GoF) or severe DEE (LoF). Age of onset determines mechanism.</div>
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:22px;">KCNQ2 is the most common genetic cause of benign neonatal seizures &mdash; onset days 2&ndash;7, resolution by 6 months</div>
  </div>
`));

// ── Slide 6: Genetic Differential — Cortical Malformations ─────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Genetic Differential: Cortical Malformations</h1>
  <div class="section-label">Neuronal Migration Disorders</div>

  <div class="two-col">
    <div>
      <div class="card card-red" style="margin-bottom:16px;">
        <div class="card-title">LIS1 (PAFAH1B1)</div>
        <div class="card-body">Classical lissencephaly with posterior > anterior gradient. Severe epilepsy and developmental delay.</div>
      </div>
      <div class="card card-violet" style="margin-bottom:16px;">
        <div class="card-title">DCX (Doublecortin)</div>
        <div class="card-body">X-linked. Lissencephaly in males; subcortical band heterotopia in females. Epilepsy is common.</div>
      </div>
      <div class="card card-accent">
        <div class="card-title">RELN (Reelin)</div>
        <div class="card-body">Autosomal recessive lissencephaly with cerebellar hypoplasia. Disrupted cortical layering.</div>
      </div>
    </div>
    <div>
      <div class="card card-amber" style="margin-bottom:16px;">
        <div class="card-title">ARX</div>
        <div class="card-body">X-linked. Spectrum from West syndrome with lissencephaly to isolated intellectual disability in males.</div>
      </div>
      <div class="card card-blue">
        <div class="card-title">Tubulinopathies (TUBA1A, TUBB2B, TUBB3)</div>
        <div class="card-body">Cortical malformations ranging from polymicrogyria to lissencephaly. Disrupted microtubule function in neuronal migration.</div>
      </div>
    </div>
  </div>
`));

// ── Slide 7: Genetic Differential — IEM ────────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Genetic Differential: IEM</h1>
  <div class="section-label">Inborn Errors of Metabolism Causing Neonatal Seizures</div>

  <div class="three-col">
    <div>
      <div class="card card-red" style="margin-bottom:14px;">
        <div class="card-title" style="font-size:20px;">Amino Acid Disorders</div>
        <div class="card-body" style="font-size:17px;">NKH (glycine encephalopathy), maple syrup urine disease</div>
      </div>
      <div class="card card-amber" style="margin-bottom:14px;">
        <div class="card-title" style="font-size:20px;">Organic Acidemias</div>
        <div class="card-body" style="font-size:17px;">Propionic, methylmalonic acidemia with encephalopathy</div>
      </div>
      <div class="card card-violet">
        <div class="card-title" style="font-size:20px;">Urea Cycle Defects</div>
        <div class="card-body" style="font-size:17px;">Hyperammonemia causing seizures, especially OTC deficiency</div>
      </div>
    </div>
    <div>
      <div class="card card-accent" style="margin-bottom:14px;">
        <div class="card-title" style="font-size:20px;">Vitamin-Responsive</div>
        <div class="card-body" style="font-size:17px;">Pyridoxine (B6), pyridoxal phosphate, folinic acid-responsive seizures</div>
      </div>
      <div class="card card-green" style="margin-bottom:14px;">
        <div class="card-title" style="font-size:20px;">GLUT1 Deficiency</div>
        <div class="card-body" style="font-size:17px;">Low CSF glucose. Responsive to ketogenic diet. SLC2A1 gene.</div>
      </div>
      <div class="card card-blue">
        <div class="card-title" style="font-size:20px;">Menkes Disease</div>
        <div class="card-body" style="font-size:17px;">Copper transport defect (ATP7A). Seizures, kinky hair, connective tissue laxity.</div>
      </div>
    </div>
    <div>
      <div class="card card-rose" style="margin-bottom:14px;">
        <div class="card-title" style="font-size:20px;">Mitochondrial</div>
        <div class="card-body" style="font-size:17px;">Leigh syndrome, MELAS, POLG-related. Elevated lactate, multi-system involvement.</div>
      </div>
      <div class="highlight-box" style="margin-top:4px;">
        <div class="label">Key Point</div>
        <div class="value" style="font-size:20px;">IEM seizures are often refractory to standard AEDs &mdash; always consider metabolic workup in neonatal epilepsy</div>
      </div>
    </div>
  </div>
`));

// ── Slide 8: Case Update — Genetic Results ─────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Case Update: Genetic Results</h1>
  <div class="section-label">Exome Sequencing Report</div>

  <div class="card card-amber" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">Epilepsy Gene Panel &mdash; 3 Variants Identified</div>
    <div class="card-body" style="font-size:19px;">Results require careful interpretation in clinical context</div>
  </div>

  <table>
    <thead>
      <tr><th>Gene</th><th>Variant</th><th>Zygosity</th><th>Classification</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>ALDH7A1</td>
        <td>c.187G&gt;T, p.Gly63Ter (nonsense)</td>
        <td>Heterozygous</td>
        <td style="color:${COLORS.red}; font-weight:700;">Pathogenic</td>
      </tr>
      <tr>
        <td>ALDH7A1</td>
        <td>c.1556G&gt;A, p.Arg519Lys (missense)</td>
        <td>Heterozygous</td>
        <td style="color:${COLORS.amber}; font-weight:700;">VUS</td>
      </tr>
      <tr>
        <td>DOCK7</td>
        <td>c.818+1G&gt;T (splice site)</td>
        <td>Heterozygous</td>
        <td style="color:${COLORS.amber}; font-weight:700;">VUS</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Critical Question</div>
    <div class="value" style="font-size:22px;">Are the two ALDH7A1 variants in <em>trans</em> (compound heterozygous) or in <em>cis</em> (same allele)?</div>
  </div>
`));

// ── Slide 9: Inheritance Patterns ──────────────────────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Inheritance Patterns</h1>
  <div class="section-label">AD vs AR Disease Mechanisms</div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="margin-bottom:20px;">
        <div class="card-title" style="font-size:22px;">Autosomal Dominant (Monoallelic)</div>
        <div class="card-body" style="font-size:19px;">
          <strong>One pathogenic variant</strong> sufficient to cause disease.
          <br><br>
          Examples: SCN1A (Dravet), KCNQ2
          <br><br>
          Mechanisms: haploinsufficiency or gain-of-function
        </div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="margin-bottom:20px;">
        <div class="card-title" style="font-size:22px;">Autosomal Recessive (Biallelic)</div>
        <div class="card-body" style="font-size:19px;">
          <strong>Two pathogenic variants</strong> required &mdash; one on each allele.
          <br><br>
          <strong>Compound heterozygous:</strong> two different variants (one from each parent)
          <br><br>
          <strong>Homozygous:</strong> same variant from both carrier parents
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">ALDH7A1 (our case)</div>
    <div class="value" style="font-size:22px;">Autosomal recessive &mdash; need to confirm two variants are on <em>separate</em> alleles (in <em>trans</em>) via parental testing</div>
  </div>
`));

// ── Slide 10: VUS Interpretation ───────────────────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>VUS Interpretation</h1>
  <div class="section-label">Tools for Resolving Uncertainty</div>

  <div class="card card-amber" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">VUS = Balance of Evidence Is Insufficient</div>
    <div class="card-body" style="font-size:19px;">Not enough data to classify as pathogenic or benign. Active investigation needed.</div>
  </div>

  <div class="three-col">
    <div class="card card-accent">
      <div class="card-title" style="font-size:20px;">Inheritance</div>
      <div class="card-body" style="font-size:17px;">Parental testing: de novo? In trans with known pathogenic? Segregation in family?</div>
    </div>
    <div class="card card-green">
      <div class="card-title" style="font-size:20px;">Phenotype Match</div>
      <div class="card-body" style="font-size:17px;">Does the patient&rsquo;s phenotype match the known disease spectrum for this gene?</div>
    </div>
    <div class="card card-violet">
      <div class="card-title" style="font-size:20px;">Population Frequency</div>
      <div class="card-body" style="font-size:17px;">Absent from gnomAD? Too common for disease prevalence? Check matched ancestry.</div>
    </div>
  </div>

  <div style="display:flex; gap:20px; margin-top:16px;">
    <div class="card card-red" style="flex:1;">
      <div class="card-title" style="font-size:20px;">Computational</div>
      <div class="card-body" style="font-size:17px;">REVEL, CADD, AlphaMissense, SpliceAI &mdash; supporting evidence only</div>
    </div>
    <div class="card card-blue" style="flex:1;">
      <div class="card-title" style="font-size:20px;">Functional Studies</div>
      <div class="card-body" style="font-size:17px;">Enzyme assays, RNA splicing studies, model organisms &mdash; strong evidence</div>
    </div>
  </div>
`));

// ── Slide 11: Interactive Exercise Setup ───────────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Interactive: Evaluate the Variants</h1>
  <div class="section-label">Case Exercise</div>

  <div style="font-size:21px; margin-bottom:24px; color:${COLORS.body};">
    For each variant found in our patient, consider: Is it likely causative?
  </div>

  <div class="card card-red" style="margin-bottom:16px;">
    <div class="card-title" style="font-size:22px;">Variant 1: ALDH7A1 p.Gly63Ter</div>
    <div class="card-body" style="font-size:19px;">
      Nonsense variant &rarr; premature stop codon. Classified <strong>pathogenic</strong>.
      <br>Creates a null allele. Absent from gnomAD. Loss-of-function mechanism fits AR disease.
    </div>
  </div>

  <div class="card card-amber" style="margin-bottom:16px;">
    <div class="card-title" style="font-size:22px;">Variant 2: ALDH7A1 p.Arg519Lys</div>
    <div class="card-body" style="font-size:19px;">
      Missense variant, classified <strong>VUS</strong>. Located in a conserved domain.
      <br>Rare in gnomAD. In silico predictions mixed. Need phasing and functional data.
    </div>
  </div>

  <div class="card card-blue">
    <div class="card-title" style="font-size:22px;">Variant 3: DOCK7 c.818+1G&gt;T</div>
    <div class="card-body" style="font-size:19px;">
      Canonical splice site, classified <strong>VUS</strong>. DOCK7 is an AR epilepsy gene.
      <br>Only one heterozygous hit found &mdash; is this sufficient?
    </div>
  </div>
`));

// ── Slide 12: Variant Analysis ─────────────────────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>Variant Analysis</h1>
  <div class="section-label">Phasing & Clinical Reasoning</div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">ALDH7A1: Phasing Is Critical</div>
        <div class="card-body" style="font-size:18px;">
          <strong>If in <em>trans</em></strong> (one variant from each parent): compound heterozygous &mdash; consistent with AR disease.
          <br><br>
          <strong>If in <em>cis</em></strong> (both on same allele): only one allele affected &mdash; insufficient for AR disease.
          <br><br>
          <strong>Action:</strong> Parental testing required to determine phase.
        </div>
      </div>
    </div>

    <div>
      <div class="card card-red" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">DOCK7: Insufficient Evidence</div>
        <div class="card-body" style="font-size:18px;">
          DOCK7-related epilepsy is <strong>autosomal recessive</strong>.
          <br><br>
          Only <strong>one heterozygous variant</strong> was identified.
          <br><br>
          A single het variant in an AR gene <strong>does not explain</strong> the phenotype. Carrier status only.
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Conclusion</div>
    <div class="value" style="font-size:22px;">ALDH7A1 compound het is the leading candidate &mdash; parental testing confirms variants are in <em>trans</em></div>
  </div>
`));

// ── Slide 13: Pyridoxine-Dependent Epilepsy (PDE) ─────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Pyridoxine-Dependent Epilepsy</h1>
  <div class="section-label">ALDH7A1 / Antiquitin Deficiency</div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title">The Enzyme: Antiquitin (ALDH7A1)</div>
        <div class="card-body" style="font-size:18px;">
          &alpha;-aminoadipic semialdehyde (AASA) dehydrogenase in the <strong>lysine degradation pathway</strong>.
          <br><br>
          Deficiency causes toxic accumulation of AASA and &Delta;1-piperideine-6-carboxylate (P6C).
        </div>
      </div>

      <div class="card card-red">
        <div class="card-title">Pathophysiology</div>
        <div class="card-body" style="font-size:18px;">
          P6C reacts with and <strong>inactivates pyridoxal phosphate</strong> (active vitamin B6).
          <br><br>
          PLP is an essential cofactor for GABA synthesis &rarr; depletion causes seizures.
        </div>
      </div>
    </div>
    <div>
      <div style="background:${mc.light}; border-radius:12px; padding:28px; border:2px solid ${mc.accent};">
        <div style="font-size:16px; font-weight:700; color:${mc.accent}; text-transform:uppercase; letter-spacing:1px; margin-bottom:16px;">Lysine Degradation Pathway</div>
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

// ── Slide 14: PDE Diagnosis ────────────────────────────────────────────────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>PDE: Biochemical Diagnosis</h1>
  <div class="section-label">Biomarker Confirmation</div>

  <div class="stats-row" style="margin-bottom:24px;">
    <div class="stat-card" style="background:${COLORS.redLight}; border-color:${COLORS.red};">
      <div class="stat-label">Patient AASA</div>
      <div class="stat-value" style="color:${COLORS.red};">28.07 &mu;mol/L</div>
    </div>
    <div class="stat-card" style="background:${COLORS.greenLight}; border-color:${COLORS.green};">
      <div class="stat-label">Normal Range</div>
      <div class="stat-value" style="color:${COLORS.green};">&lt; 0.5 &mu;mol/L</div>
    </div>
    <div class="stat-card" style="background:${mc.light}; border-color:${mc.accent};">
      <div class="stat-label">Elevation</div>
      <div class="stat-value">&gt; 56&times; normal</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">Urine AASA</div>
      <div class="card-body" style="font-size:18px;">
        <strong>Primary biomarker</strong> for PDE. Elevated in urine, plasma, and CSF.
        <br><br>
        Also elevated: pipecolic acid in plasma (less specific).
        <br><br>
        Can be measured even after pyridoxine treatment has started.
      </div>
    </div>
    <div class="card card-green">
      <div class="card-title">Diagnostic Approach</div>
      <div class="card-body" style="font-size:18px;">
        <strong>1.</strong> Clinical suspicion (refractory neonatal seizures)
        <br><br>
        <strong>2.</strong> Pyridoxine trial (therapeutic + diagnostic)
        <br><br>
        <strong>3.</strong> Urine AASA / plasma pipecolic acid
        <br><br>
        <strong>4.</strong> ALDH7A1 genetic testing for confirmation
      </div>
    </div>
  </div>
`));

// ── Slide 15: PDE Clinical Features ────────────────────────────────────────
slides.push(slideHTML(MOD, 15, TOTAL, `
  <h1>PDE: Clinical Features</h1>
  <div class="section-label">Phenotypic Spectrum</div>

  <div class="card card-red" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">Classic Presentation</div>
    <div class="card-body" style="font-size:19px;">
      Early-onset (<strong>often neonatal</strong>) refractory epilepsy &mdash; may present in utero with fetal seizures.
      Multiple seizure types: clonic, tonic, myoclonic. Encephalopathy between seizures.
      <strong>Refractory to all standard antiepileptic drugs.</strong>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-amber">
      <div class="card-title">Seizure Characteristics</div>
      <div class="card-body" style="font-size:18px;">
        &bull; Prolonged neonatal seizures (status epilepticus)<br>
        &bull; Multifocal with EEG burst suppression<br>
        &bull; May respond then relapse on AEDs<br>
        &bull; Dramatic response to IV pyridoxine
      </div>
    </div>
    <div class="card card-violet">
      <div class="card-title">Atypical / Late-Onset Forms</div>
      <div class="card-body" style="font-size:18px;">
        &bull; Onset up to 2&ndash;3 years of age<br>
        &bull; Initially responsive to AEDs then breakthrough<br>
        &bull; Presentation with autism or developmental delay<br>
        &bull; Always consider PDE in unexplained refractory epilepsy
      </div>
    </div>
  </div>
`));

// ── Slide 16: PDE Treatment ───────────────────────────────────────────────
slides.push(slideHTML(MOD, 16, TOTAL, `
  <h1>PDE: Treatment</h1>
  <div class="section-label">Pyridoxine Challenge & Lifelong Therapy</div>

  <div class="numbered-item" style="margin-bottom:20px;">
    <div class="number-circle" style="background:${COLORS.red};">1</div>
    <div class="card card-red" style="flex:1; margin-bottom:0;">
      <div class="card-title">IV Pyridoxine Challenge (Acute)</div>
      <div class="card-body" style="font-size:18px;">
        100 mg IV push with <strong>continuous EEG monitoring</strong>. Risk of apnea &mdash; must have resuscitation equipment ready.
        May need repeat doses (up to 3&times;). Response: seizure cessation within minutes to hours.
      </div>
    </div>
  </div>

  <div class="numbered-item" style="margin-bottom:20px;">
    <div class="number-circle" style="background:${mc.accent};">2</div>
    <div class="card card-accent" style="flex:1; margin-bottom:0;">
      <div class="card-title">Lifelong Oral Pyridoxine</div>
      <div class="card-body" style="font-size:18px;">
        Maintenance dose: <strong>15&ndash;30 mg/kg/day</strong> divided BID or TID.
        Must never be discontinued. Dose <strong>doubled during febrile illness</strong> to prevent breakthrough seizures.
      </div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.green};">3</div>
    <div class="card card-green" style="flex:1; margin-bottom:0;">
      <div class="card-title">AED Weaning</div>
      <div class="card-body" style="font-size:18px;">
        Once pyridoxine response confirmed, conventional AEDs can be <strong>gradually weaned</strong>.
        Pyridoxine alone controls seizures in most patients.
      </div>
    </div>
  </div>
`));

// ── Slide 17: Neurodevelopmental Outcomes ──────────────────────────────────
slides.push(slideHTML(MOD, 17, TOTAL, `
  <h1>Neurodevelopmental Outcomes</h1>
  <div class="section-label">Long-Term Prognosis in PDE</div>

  <div class="stats-row" style="margin-bottom:24px;">
    <div class="stat-card" style="background:${COLORS.redLight}; border-color:${COLORS.red};">
      <div class="stat-label">Intellectual Disability</div>
      <div class="stat-value">Up to 75%</div>
    </div>
    <div class="stat-card" style="background:${COLORS.amberLight}; border-color:${COLORS.amber};">
      <div class="stat-label">Speech Delay</div>
      <div class="stat-value">Common</div>
    </div>
    <div class="stat-card" style="background:${COLORS.violetLight}; border-color:${COLORS.violet};">
      <div class="stat-label">Motor Delay</div>
      <div class="stat-value">Variable</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-red">
      <div class="card-title">Why Outcomes Remain Suboptimal</div>
      <div class="card-body" style="font-size:18px;">
        &bull; Prenatal brain exposure to AASA/P6C toxicity<br>
        &bull; Diagnosis often delayed (weeks&ndash;months)<br>
        &bull; Pyridoxine controls seizures but does <strong>not reverse</strong> prior brain injury<br>
        &bull; Even with <strong>prenatal pyridoxine</strong>, developmental challenges persist
      </div>
    </div>
    <div class="card card-green">
      <div class="card-title">Factors Favoring Better Outcomes</div>
      <div class="card-body" style="font-size:18px;">
        &bull; Early diagnosis and treatment (first days of life)<br>
        &bull; Milder / later-onset genotype-phenotype<br>
        &bull; Adherence to lifelong pyridoxine<br>
        &bull; Adjunctive dietary therapy (lysine restriction)
      </div>
    </div>
  </div>
`));

// ── Slide 18: Triple Therapy ───────────────────────────────────────────────
slides.push(slideHTML(MOD, 18, TOTAL, `
  <h1>Triple Therapy for PDE</h1>
  <div class="section-label">Emerging Treatment Strategy</div>

  <div style="display:flex; gap:16px; margin-bottom:24px;">
    <div class="card card-accent" style="flex:1;">
      <div class="card-title" style="font-size:22px;">1. Pyridoxine</div>
      <div class="card-body" style="font-size:18px;">
        15&ndash;30 mg/kg/day<br>
        Controls seizures by restoring PLP levels
      </div>
    </div>
    <div class="card card-green" style="flex:1;">
      <div class="card-title" style="font-size:22px;">2. Lysine-Restricted Diet</div>
      <div class="card-body" style="font-size:18px;">
        Reduces substrate entering degradation pathway, lowering AASA/P6C production
      </div>
    </div>
    <div class="card card-violet" style="flex:1;">
      <div class="card-title" style="font-size:22px;">3. Arginine Supplementation</div>
      <div class="card-body" style="font-size:18px;">
        Competes with lysine for transport across blood-brain barrier, reducing cerebral lysine
      </div>
    </div>
  </div>

  <div class="card card-amber" style="margin-bottom:16px;">
    <div class="card-title">Evidence Base</div>
    <div class="card-body" style="font-size:19px;">
      Currently limited to <strong>case reports and small case series</strong>. No RCTs available.
      Some patients show improved neurodevelopmental outcomes with triple therapy vs. pyridoxine alone.
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Rationale</div>
    <div class="value" style="font-size:22px;">Pyridoxine alone controls seizures but does not address ongoing neurotoxicity from AASA/P6C accumulation</div>
  </div>
`));

// ── Slide 19: Other Pyridoxine-Responsive Conditions ───────────────────────
slides.push(slideHTML(MOD, 19, TOTAL, `
  <h1>Other Pyridoxine-Responsive Conditions</h1>
  <div class="section-label">Differential Diagnosis</div>

  <div style="font-size:21px; margin-bottom:24px; color:${COLORS.body};">
    PDE is not the only B6-responsive epilepsy. Consider these when pyridoxine trial is positive:
  </div>

  <div class="card card-red" style="margin-bottom:16px;">
    <div class="card-title" style="font-size:22px;">PNPO Deficiency</div>
    <div class="card-body" style="font-size:19px;">
      Pyridox(am)ine 5&prime;-phosphate oxidase deficiency. Responds to <strong>pyridoxal 5&prime;-phosphate (PLP)</strong> rather than pyridoxine.
      May worsen on pyridoxine alone. CSF neurotransmitter analysis is diagnostic.
    </div>
  </div>

  <div class="card card-amber" style="margin-bottom:16px;">
    <div class="card-title" style="font-size:22px;">TNSALP Deficiency (Hypophosphatasia)</div>
    <div class="card-body" style="font-size:19px;">
      Tissue-nonspecific alkaline phosphatase deficiency. Impaired PLP dephosphorylation for cellular uptake.
      Low serum alkaline phosphatase is the clue. ALPL gene.
    </div>
  </div>

  <div class="card card-violet">
    <div class="card-title" style="font-size:22px;">Hyperprolinemia Type II</div>
    <div class="card-body" style="font-size:19px;">
      ALDH4A1 deficiency causing P5C accumulation, which also inactivates PLP.
      Presents with seizures and intellectual disability. Elevated proline and P5C in urine.
    </div>
  </div>
`));

// ── Slide 20: Key Takeaways ────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 20, TOTAL, [
  {
    title: "Broad genetic differential for neonatal seizures",
    body: "Channelopathies, cortical malformations, and IEM all present with neonatal epilepsy — systematic evaluation is essential.",
  },
  {
    title: "IEM seizures are treatment-responsive if identified early",
    body: "Pyridoxine-dependent epilepsy, GLUT1 deficiency, and other metabolic causes have specific, effective treatments.",
  },
  {
    title: "Compound heterozygosity requires phasing",
    body: "Two heterozygous variants in an AR gene must be confirmed in trans via parental testing before concluding diagnosis.",
  },
  {
    title: "Biochemical biomarkers confirm PDE",
    body: "Urine AASA is dramatically elevated (>50× normal) in PDE and can be measured even after starting pyridoxine.",
  },
  {
    title: "Seizure control ≠ complete cure",
    body: "Up to 75% of PDE patients have intellectual disability despite seizure freedom — ongoing neurotoxicity from AASA/P6C.",
  },
  {
    title: "Triple therapy targets the underlying pathway",
    body: "Pyridoxine + lysine restriction + arginine supplementation aims to reduce cerebral AASA/P6C beyond seizure control alone.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides("epilepsy", slides);
