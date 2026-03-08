/**
 * scripts/gen-mosaicism.mjs
 *
 * Generates 14 clean, readable slides for the Somatic Mosaicism module.
 * Covers somatic variants in brain disease, mTOR pathway, tissue-specific
 * testing, two-hit hypothesis, and precision treatment with everolimus.
 * Condensed from 25 original slides to 14 focused slides.
 *
 * Run: node scripts/gen-mosaicism.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "mosaicism";
const mc = MODULE_COLORS[MOD];
const TOTAL = 14;

const slides = [];

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Somatic Mosaicism in Brain Disease",
  subtitle: "Tissue-Specific Variants, mTOR Pathway, and Precision Treatment",
  totalSlides: TOTAL,
  topics: [
    "Somatic variants in the brain",
    "Testing modalities & depth",
    "mTOR pathway biology",
    "Two-hit hypothesis",
    "Other mosaic conditions",
    "Precision treatment",
  ],
}));

// ── Slide 2: Learning Objectives ───────────────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Learning Objectives</h1>
  <div class="section-label">What You Will Learn</div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${mc.accent};">1</div>
    <div><strong style="font-size:21px;">Recognize somatic variants</strong> as a cause of focal brain disease missed by standard blood/saliva testing</div>
  </div>
  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.red};">2</div>
    <div><strong style="font-size:21px;">Understand testing modalities</strong> including tissue selection, sequencing depth, and variant allele fraction</div>
  </div>
  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.violet};">3</div>
    <div><strong style="font-size:21px;">Explain the mTOR pathway</strong> and how gain-of-function and loss-of-function variants drive cortical malformations</div>
  </div>
  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.green};">4</div>
    <div><strong style="font-size:21px;">Identify other mosaic conditions</strong> beyond the mTOR pathway including Sturge-Weber and RAS-MAPK disorders</div>
  </div>
`));

// ── Slide 3: Case Presentation ─────────────────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Case Presentation</h1>
  <div class="section-label">Refractory Focal Epilepsy</div>

  <div class="card card-amber" style="margin-bottom:24px;">
    <div class="card-title" style="font-size:24px;">4.5-Year-Old Boy</div>
    <div class="card-body" style="font-size:20px;">
      Referred for evaluation of <strong>drug-resistant focal epilepsy</strong> with progressive cognitive decline.
    </div>
  </div>

  <div class="two-col">
    <div>
      <h3>Seizure History</h3>
      <ul class="bullet-list">
        <li>Refractory focal seizures since age 18 months</li>
        <li>ESES (electrical status epilepticus of sleep)</li>
        <li>Worsening cognition over 2 years</li>
        <li>Failed 4 antiseizure medications</li>
      </ul>
    </div>
    <div>
      <h3>Neurological Exam</h3>
      <ul class="bullet-list">
        <li>Chronic left hemibody weakness</li>
        <li>Left-sided hyperreflexia</li>
        <li>Developmental regression</li>
        <li>No cutaneous findings</li>
      </ul>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Key Question</div>
    <div class="value" style="font-size:22px;">Focal signs and refractory epilepsy &mdash; what structural and genetic etiologies should we consider?</div>
  </div>
`));

// ── Slide 4: Differential Diagnosis ────────────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Differential Diagnosis</h1>
  <div class="section-label">Focal Epilepsy with Hemiparesis</div>

  <div class="three-col">
    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:20px;">Focal Cortical Dysplasia</div>
        <div class="card-body" style="font-size:17px;">Disordered cortical architecture. Most common surgical cause of refractory focal epilepsy in children.</div>
      </div>
      <div class="card card-violet">
        <div class="card-title" style="font-size:20px;">Hemimegalencephaly</div>
        <div class="card-body" style="font-size:17px;">Unilateral cerebral overgrowth. Severe epilepsy, contralateral hemiparesis, developmental delay.</div>
      </div>
    </div>
    <div>
      <div class="card card-red" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:20px;">Sturge-Weber Syndrome</div>
        <div class="card-body" style="font-size:17px;">Leptomeningeal angioma with port-wine stain. Progressive epilepsy and hemiparesis. Somatic GNAQ.</div>
      </div>
      <div class="card card-amber">
        <div class="card-title" style="font-size:20px;">Rasmussen Encephalitis</div>
        <div class="card-body" style="font-size:17px;">Progressive unilateral inflammation. Epilepsia partialis continua. Autoimmune etiology.</div>
      </div>
    </div>
    <div>
      <div class="card card-blue" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:20px;">Low-Grade Tumors</div>
        <div class="card-body" style="font-size:17px;">DNET, ganglioglioma. Highly epileptogenic. May have BRAF or FGFR variants.</div>
      </div>
      <div class="card card-green">
        <div class="card-title" style="font-size:20px;">Perinatal Stroke</div>
        <div class="card-body" style="font-size:17px;">MCA territory infarct. Fixed hemiparesis with secondary epilepsy. Non-progressive.</div>
      </div>
    </div>
  </div>
`));

// ── Slide 5: Investigations ────────────────────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Investigations</h1>
  <div class="section-label">Imaging &amp; Initial Genetic Testing</div>

  <div class="stats-row" style="margin-bottom:24px;">
    <div class="stat-card" style="background:${mc.light}; border-color:${mc.accent};">
      <div class="stat-label">Brain MRI</div>
      <div class="stat-value" style="font-size:22px;">Right-Sided FLAIR Hyperintensities</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">Cortical thickening, blurred grey-white junction</div>
    </div>
    <div class="stat-card" style="background:${COLORS.amberLight}; border-color:${COLORS.amber};">
      <div class="stat-label">FDG-PET</div>
      <div class="stat-value" style="font-size:22px;">Right Frontal Hypometabolism</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">Concordant with seizure focus</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-red">
      <div class="card-title">Genetic Testing: 125-Gene Epilepsy Panel</div>
      <div class="card-body" style="font-size:19px;">
        Specimen: <strong>saliva</strong><br><br>
        Sequencing depth: ~30x<br><br>
        Result: <strong style="color:${COLORS.red};">NEGATIVE</strong> &mdash; no pathogenic or likely pathogenic variants identified
      </div>
    </div>
    <div class="card card-accent">
      <div class="card-title">Clinical Interpretation</div>
      <div class="card-body" style="font-size:19px;">
        Imaging suggests focal cortical dysplasia<br><br>
        Negative saliva panel does <strong>not</strong> rule out a genetic cause<br><br>
        Somatic variant confined to brain tissue would not be detectable in saliva
      </div>
    </div>
  </div>
`));

// ── Slide 6: Brain Tissue Testing ──────────────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Brain Tissue Testing</h1>
  <div class="section-label">Deep Sequencing of Affected Tissue</div>

  <div class="card card-green" style="margin-bottom:24px;">
    <div class="card-title" style="font-size:24px;">Result: MTOR Variant Identified</div>
    <div class="card-body" style="font-size:20px;">
      NGS from brain biopsy tissue revealed a somatic pathogenic variant
    </div>
  </div>

  <table style="margin-bottom:24px;">
    <thead>
      <tr><th>Gene</th><th>Variant</th><th>Exon</th><th>VAF</th><th>Classification</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>MTOR</td>
        <td>c.7255G&gt;A (p.Glu2419Lys)</td>
        <td>Exon 53</td>
        <td>10%</td>
        <td style="color:${COLORS.red}; font-weight:700;">Pathogenic</td>
      </tr>
    </tbody>
  </table>

  <div class="two-col">
    <div class="card card-red">
      <div class="card-title">NOT Detected in Blood or Saliva</div>
      <div class="card-body" style="font-size:18px;">
        Variant is <strong>tissue-restricted</strong> &mdash; present only in affected brain tissue at low allele fraction.
        Standard clinical testing from blood or saliva at 30x depth cannot detect a 10% VAF brain-only variant.
      </div>
    </div>
    <div class="card card-accent">
      <div class="card-title">Variant Allele Fraction (VAF)</div>
      <div class="card-body" style="font-size:18px;">
        <strong>10% VAF</strong> = the variant is present in ~20% of cells in the biopsy tissue.
        Heterozygous variant in mosaic cells: VAF = fraction of cells &divide; 2.
      </div>
    </div>
  </div>
`));

// ── Slide 7: Germline vs Somatic Mosaicism ─────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Germline vs Somatic Mosaicism</h1>
  <div class="section-label">Fundamental Concepts</div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="margin-bottom:16px; min-height:280px;">
        <div class="card-title" style="font-size:22px;">Germline (Constitutional) Variants</div>
        <div class="card-body" style="font-size:19px;">
          Present in <strong>all cells</strong> of the body<br><br>
          Inherited from a parent or arose <strong>de novo</strong> at conception<br><br>
          Detectable from <strong>any tissue</strong> (blood, saliva, skin)<br><br>
          Standard sequencing at 30x depth is sufficient
        </div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="margin-bottom:16px; min-height:280px;">
        <div class="card-title" style="font-size:22px;">Somatic (Mosaic) Variants</div>
        <div class="card-body" style="font-size:19px;">
          Present in a <strong>subset of cells</strong> only<br><br>
          Arose <strong>post-zygotically</strong> during embryonic development<br><br>
          Often <strong>tissue-restricted</strong> &mdash; may only be in affected organ<br><br>
          Requires deep sequencing (&gt;500x) of affected tissue
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Clinical Implication</div>
    <div class="value" style="font-size:22px;">A negative blood/saliva genetic test does NOT exclude a somatic variant &mdash; the right tissue at the right depth is essential</div>
  </div>
`));

// ── Slide 8: Why Blood/Saliva Testing Missed It ────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Why Blood/Saliva Testing Missed It</h1>
  <div class="section-label">Technical Limitations of Standard Panels</div>

  <div class="card card-red" style="margin-bottom:24px;">
    <div class="card-title" style="font-size:22px;">The Core Problem</div>
    <div class="card-body" style="font-size:20px;">
      Somatic brain variants require <strong>affected tissue</strong> at <strong>high sequencing depth</strong> &mdash; standard clinical panels test the wrong tissue at insufficient depth.
    </div>
  </div>

  <div class="three-col">
    <div class="card card-accent">
      <div class="card-title" style="font-size:20px;">Standard Panels</div>
      <div class="card-body" style="font-size:17px;">
        Specimen: blood or saliva<br><br>
        Depth: ~30x coverage<br><br>
        Detection limit: ~20% VAF<br><br>
        Designed for <strong>germline</strong> variants
      </div>
    </div>
    <div class="card card-amber">
      <div class="card-title" style="font-size:20px;">Somatic Detection</div>
      <div class="card-body" style="font-size:17px;">
        Specimen: <strong>brain tissue</strong><br><br>
        Depth: &gt;500x coverage<br><br>
        Detection limit: ~1&ndash;5% VAF<br><br>
        Must use <strong>affected tissue</strong>
      </div>
    </div>
    <div class="card card-green">
      <div class="card-title" style="font-size:20px;">Our Case</div>
      <div class="card-body" style="font-size:17px;">
        MTOR variant at 10% VAF<br><br>
        Brain tissue only<br><br>
        Invisible to saliva panel<br><br>
        Required targeted deep NGS
      </div>
    </div>
  </div>
`));

// ── Slide 9: Somatic Variants in Corticogenesis ────────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Somatic Variants in Corticogenesis</h1>
  <div class="section-label">Timing Determines Phenotype</div>

  <div style="font-size:21px; margin-bottom:24px; color:${COLORS.body};">
    The <strong>timing</strong> of the somatic mutation during embryonic brain development determines the extent and severity of the malformation.
  </div>

  <div style="display:flex; gap:16px; margin-bottom:24px;">
    <div class="card card-red" style="flex:1;">
      <div class="card-title" style="font-size:22px;">Early Somatic Variant</div>
      <div class="card-body" style="font-size:18px;">
        Arises in early progenitor cell<br><br>
        Large territory affected<br><br>
        Phenotype: <strong>hemimegalencephaly</strong><br><br>
        Higher VAF in tissue (~15&ndash;30%)
      </div>
    </div>
    <div class="card card-amber" style="flex:1;">
      <div class="card-title" style="font-size:22px;">Intermediate Timing</div>
      <div class="card-body" style="font-size:18px;">
        Arises in regional progenitor<br><br>
        Moderate territory affected<br><br>
        Phenotype: <strong>multilobar FCD</strong><br><br>
        Moderate VAF (~5&ndash;15%)
      </div>
    </div>
    <div class="card card-accent" style="flex:1;">
      <div class="card-title" style="font-size:22px;">Late Somatic Variant</div>
      <div class="card-body" style="font-size:18px;">
        Arises in late progenitor<br><br>
        Small territory affected<br><br>
        Phenotype: <strong>focal cortical dysplasia</strong><br><br>
        Low VAF (~1&ndash;5%)
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Key Principle</div>
    <div class="value" style="font-size:22px;">Earlier mutation = larger affected territory = more severe phenotype = higher VAF in tissue</div>
  </div>
`));

// ── Slide 10: The Two-Hit Hypothesis ───────────────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>The Two-Hit Hypothesis</h1>
  <div class="section-label">Germline + Somatic Model</div>

  <div class="card card-accent" style="margin-bottom:24px;">
    <div class="card-title" style="font-size:22px;">Knudson&rsquo;s Two-Hit Model Applied to Cortical Malformations</div>
    <div class="card-body" style="font-size:19px;">
      Originally described for <strong>RB1</strong> in retinoblastoma. First hit is germline (inherited or de novo), second hit is a somatic loss of the remaining functional allele in brain tissue.
    </div>
  </div>

  <div class="two-col">
    <div>
      <div style="background:${mc.light}; border-radius:12px; padding:28px; border:2px solid ${mc.accent};">
        <div style="font-size:16px; font-weight:700; color:${mc.accent}; text-transform:uppercase; letter-spacing:1px; margin-bottom:16px;">Two-Hit Mechanism</div>
        <div style="font-size:20px; font-weight:700; text-align:center; color:${COLORS.heading};">
          <span style="color:${COLORS.red};">Hit 1:</span> Germline variant<br>
          <span style="font-size:17px; color:${COLORS.muted};">(inherited or de novo, all cells)</span><br>
          <span style="font-size:28px; color:${COLORS.muted};">&darr;</span><br>
          <span style="color:${COLORS.red};">Hit 2:</span> Somatic loss in brain<br>
          <span style="font-size:17px; color:${COLORS.muted};">(LOH, second mutation, subset of cells)</span><br>
          <span style="font-size:28px; color:${COLORS.muted};">&darr;</span><br>
          <span style="color:${COLORS.red}; font-weight:800;">Complete loss of function &rarr; FCD</span>
        </div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:20px;">Genes Following This Model</div>
        <div class="card-body" style="font-size:18px;">
          <strong>TSC1 / TSC2</strong> &mdash; Tuberous sclerosis complex<br><br>
          <strong>DEPDC5</strong> &mdash; Familial focal epilepsy with FCD<br><br>
          <strong>NPRL2 / NPRL3</strong> &mdash; GATOR1 complex members<br><br>
          All are <strong>negative regulators of mTOR</strong>
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 11: mTOR Pathway ─────────────────────────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>The mTOR Pathway</h1>
  <div class="section-label">Central Regulator of Cell Growth</div>

  <div style="background:${mc.light}; border-radius:12px; padding:28px; border:2px solid ${mc.accent}; margin-bottom:24px;">
    <div style="display:flex; align-items:center; justify-content:center; gap:12px; flex-wrap:wrap;">
      <div class="flow-box" style="background:${COLORS.blue};">PI3K</div>
      <div class="flow-connector">&rarr;</div>
      <div class="flow-box" style="background:${COLORS.violet};">AKT</div>
      <div class="flow-connector">&rarr;</div>
      <div class="flow-box" style="background:${COLORS.amber}; color:${COLORS.heading};">TSC1/TSC2</div>
      <div class="flow-connector" style="color:${COLORS.red};">&dashv;</div>
      <div class="flow-box" style="background:${COLORS.red};">mTOR / Raptor</div>
      <div class="flow-connector">&rarr;</div>
      <div class="flow-box" style="background:${COLORS.green};">Cell Growth</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-red">
      <div class="card-title" style="font-size:20px;">Gain-of-Function &rarr; Overgrowth</div>
      <div class="card-body" style="font-size:18px;">
        <strong>MTOR</strong> &mdash; direct hyperactivation<br><br>
        <strong>PIK3CA</strong> &mdash; upstream activator<br><br>
        <strong>AKT3</strong> &mdash; amplified signaling<br><br>
        Result: excessive cell growth and proliferation
      </div>
    </div>
    <div class="card card-amber">
      <div class="card-title" style="font-size:20px;">Loss-of-Function &rarr; Disinhibition</div>
      <div class="card-body" style="font-size:18px;">
        <strong>TSC1 / TSC2</strong> &mdash; lost braking of mTOR<br><br>
        <strong>DEPDC5</strong> &mdash; GATOR1 complex<br><br>
        <strong>NPRL2 / NPRL3</strong> &mdash; GATOR1 partners<br><br>
        Result: unopposed mTOR activation
      </div>
    </div>
  </div>
`));

// ── Slide 12: Treatment with mTOR Inhibition ───────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>Treatment: mTOR Inhibition</h1>
  <div class="section-label">Precision Medicine in Action</div>

  <div class="card card-green" style="margin-bottom:24px;">
    <div class="card-title" style="font-size:24px;">Case Outcome</div>
    <div class="card-body" style="font-size:20px;">
      Following identification of the somatic MTOR variant, the patient was started on <strong>everolimus</strong> (mTOR inhibitor).
    </div>
  </div>

  <div class="stats-row" style="margin-bottom:24px;">
    <div class="stat-card" style="background:${COLORS.greenLight}; border-color:${COLORS.green};">
      <div class="stat-label">Seizure Outcome</div>
      <div class="stat-value">Freedom &gt;2 yr</div>
    </div>
    <div class="stat-card" style="background:${mc.light}; border-color:${mc.accent};">
      <div class="stat-label">EEG</div>
      <div class="stat-value">ESES Remission</div>
    </div>
    <div class="stat-card" style="background:${COLORS.blueLight}; border-color:${COLORS.blue};">
      <div class="stat-label">Cognition</div>
      <div class="stat-value">Improvement</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">Everolimus (Rapamycin Analog)</div>
      <div class="card-body" style="font-size:18px;">
        Directly inhibits mTOR/Raptor complex<br><br>
        FDA-approved for TSC-associated seizures<br><br>
        Also used for TSC-related SEGA and renal angiomyolipoma
      </div>
    </div>
    <div class="card card-violet">
      <div class="card-title">Precision Medicine Paradigm</div>
      <div class="card-body" style="font-size:18px;">
        Somatic variant identified &rarr; pathway defined &rarr; targeted therapy selected<br><br>
        Without tissue testing, this patient would have remained on empiric treatment with continued decline
      </div>
    </div>
  </div>
`));

// ── Slide 13: Non-mTOR Somatic Variants ────────────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Non-mTOR Somatic Variants</h1>
  <div class="section-label">Beyond the mTOR Pathway</div>

  <div style="font-size:21px; margin-bottom:24px; color:${COLORS.body};">
    Somatic mosaicism in the brain is not limited to the mTOR pathway. Several other genes cause neurological disease through tissue-restricted variants.
  </div>

  <div class="two-col">
    <div>
      <div class="card card-red" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:20px;">GNAQ &mdash; Sturge-Weber Syndrome</div>
        <div class="card-body" style="font-size:17px;">Somatic activating variant (p.R183Q). Leptomeningeal angioma, port-wine stain, epilepsy, glaucoma.</div>
      </div>
      <div class="card card-amber" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:20px;">SLC35A2 &mdash; Glycosylation Defect</div>
        <div class="card-body" style="font-size:17px;">Somatic variants in brain tissue causing FCD and epilepsy. X-linked, congenital disorder of glycosylation.</div>
      </div>
      <div class="card card-violet">
        <div class="card-title" style="font-size:20px;">DCX &mdash; Subcortical Band Heterotopia</div>
        <div class="card-body" style="font-size:17px;">Somatic mosaicism explains mild phenotype in some males who would otherwise have lissencephaly.</div>
      </div>
    </div>
    <div>
      <div class="card card-blue" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:20px;">RAS-RAF-MAPK Pathway</div>
        <div class="card-body" style="font-size:17px;">Somatic variants in BRAF, KRAS, NRAS. Encephalocraniocutaneous lipomatosis and other neurocutaneous disorders.</div>
      </div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:20px;">CDKL5 &mdash; Somatic Mosaicism</div>
        <div class="card-body" style="font-size:17px;">Rare mosaic cases with milder phenotype. Variable expression depending on fraction of cells affected.</div>
      </div>
      <div class="card card-green">
        <div class="card-title" style="font-size:20px;">GABRA1 &mdash; Focal Epilepsy</div>
        <div class="card-body" style="font-size:17px;">Somatic variants in GABA receptor subunit. Brain-restricted, causing focal seizures without systemic features.</div>
      </div>
    </div>
  </div>
`));

// ── Slide 14: Key Takeaways ────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 14, TOTAL, [
  {
    title: "Negative blood panel does not rule out a genetic cause",
    body: "Somatic variants confined to brain tissue are invisible to standard blood/saliva testing at routine sequencing depth.",
  },
  {
    title: "Somatic testing requires affected tissue + high depth",
    body: "Brain biopsy or surgical tissue with >500x deep sequencing is needed to detect low VAF somatic variants.",
  },
  {
    title: "mTOR pathway is the most common targetable pathway",
    body: "Gain-of-function (MTOR, PIK3CA, AKT3) and loss-of-function (TSC1/2, DEPDC5) variants converge on mTOR hyperactivation.",
  },
  {
    title: "Timing of mutation determines phenotype severity",
    body: "Early somatic variants produce hemimegalencephaly; late variants produce focal cortical dysplasia. Earlier = larger territory.",
  },
  {
    title: "Precision treatment can transform outcomes",
    body: "Everolimus (mTOR inhibitor) led to seizure freedom, ESES remission, and cognitive improvement in our case.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides("mosaicism", slides);
