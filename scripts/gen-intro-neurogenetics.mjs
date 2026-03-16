/**
 * scripts/gen-intro-neurogenetics.mjs
 *
 * Generates 15 slides for the Introduction to Neurogenetics module.
 * Aligned to JSON section structure (5 sections, 3 slides each).
 *
 * distributeSlides(15, 5) = 3 per section, 0 remainder
 *   S0 (What is Neurogenetics?):              slides 1–3
 *   S1 (Genetic Architecture):                slides 4–6
 *   S2 (Common Neurogenetic Disease Categories): slides 7–9
 *   S3 (The Neurogenetic History & Exam):     slides 10–12
 *   S4 (Genetic Testing Strategies):          slides 13–15
 *
 * Run: node scripts/gen-intro-neurogenetics.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "intro-neurogenetics";
const mc = MODULE_COLORS[MOD];
const TOTAL = 15;

const slides = [];

// ═══════════════════════════════════════════════════════════════════════════
// S0: What is Neurogenetics? — slides 1–3
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Introduction to<br>Neurogenetics",
  subtitle: "How inherited and de novo genetic variants cause neurological disease",
  totalSlides: TOTAL,
  topics: [
    "What is Neurogenetics?",
    "Genetic Architecture of Neurological Disease",
    "Common Neurogenetic Disease Categories",
    "The Neurogenetic History & Examination",
    "Genetic Testing Strategies",
  ],
}));

// ── Slide 2: Definition & Scope ────────────────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>What is Neurogenetics?</h1>
  <div class="section-label">Definition &amp; Scope</div>

  <div class="card card-accent" style="margin-bottom:24px; padding:28px;">
    <div class="card-title" style="font-size:34px;">Neurogenetics Defined</div>
    <div class="card-body" style="font-size:28px;">
      The study of how genetic variation &mdash; inherited or arising <strong>de novo</strong> &mdash; contributes to neurological disease. Bridges neurology and medical genetics, encompassing diagnosis, genetic counseling, and mechanism-targeted therapies.
    </div>
  </div>

  <div class="stats-row">
    <div class="stat-card" style="border-color:${mc.accent}; background:${mc.light};">
      <div class="stat-label">Single-Gene Disorders</div>
      <div class="stat-value">60% have neuro component</div>
    </div>
    <div class="stat-card" style="border-color:${COLORS.green}; background:${COLORS.greenLight};">
      <div class="stat-label">Pediatric Epilepsy</div>
      <div class="stat-value">~50% genetic</div>
    </div>
    <div class="stat-card" style="border-color:${COLORS.violet}; background:${COLORS.violetLight};">
      <div class="stat-label">Childhood ID</div>
      <div class="stat-value">30&ndash;40% genetic</div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Key Principle</div>
    <div class="value" style="font-size:31px;">The nervous system is the most commonly affected organ system in Mendelian disease</div>
  </div>
`));

// ── Slide 3: Why Genetic Diagnosis Matters ─────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Why Does Genetic Diagnosis Matter?</h1>
  <div class="section-label">Clinical Impact for Patients &amp; Families</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div>
      <div class="card card-accent" style="padding:24px;">
        <div class="card-title">Recurrence Risk</div>
        <div class="card-body" style="font-size:25px;">Precise recurrence risk estimates for future pregnancies and cascade testing of at-risk family members.</div>
      </div>
      <div class="card card-green" style="padding:24px;">
        <div class="card-title">Targeted Therapy</div>
        <div class="card-body" style="font-size:25px;">Unlocks mechanism-based treatments &mdash; mTOR inhibitors for TSC, enzyme replacement for lysosomal diseases, gene therapy for SMA.</div>
      </div>
      <div class="card card-violet" style="padding:24px;">
        <div class="card-title">Surveillance</div>
        <div class="card-body" style="font-size:25px;">Guides organ-specific screening &mdash; e.g., cardiac monitoring in DMD, renal imaging in TSC, tumor surveillance in NF1.</div>
      </div>
    </div>
    <div>
      <div class="card card-amber" style="padding:24px;">
        <div class="card-title">Closure</div>
        <div class="card-body" style="font-size:25px;">Ends the diagnostic odyssey. For families who have seen multiple specialists over years, a diagnosis provides profound relief and validation.</div>
      </div>
      <div class="card card-rose" style="padding:24px;">
        <div class="card-title">Natural History &amp; Preparation</div>
        <div class="card-body" style="font-size:25px;">Understanding the expected trajectory allows families to plan ahead &mdash; educational supports, equipment needs, advanced care planning.</div>
      </div>
    </div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// S1: Genetic Architecture of Neurological Disease — slides 4–6
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 4: Monogenic & Chromosomal Architecture ──────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Genetic Architecture: Monogenic &amp; Chromosomal</h1>
  <div class="section-label">High-Penetrance Variants</div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Monogenic (Mendelian)</div>
        <div class="card-body" style="font-size:25px; margin-top:8px;">
          Single gene, high penetrance. Most severe early-onset neurological conditions have a monogenic basis.
        </div>
        <div style="margin-top:16px; padding:14px 18px; background:rgba(37,99,235,0.06); border-radius:8px;">
          <div style="font-size:24px; color:${mc.dark}; line-height:1.6;">
            <strong>AD:</strong> Huntington disease (HTT CAG repeat)<br>
            <strong>AR:</strong> Friedreich ataxia (FXN GAA repeat)<br>
            <strong>XLR:</strong> Duchenne MD (DMD)
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="card card-violet" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Chromosomal</div>
        <div class="card-body" style="font-size:25px; margin-top:8px;">
          Gain or loss of large genomic segments &mdash; detectable by karyotype or CMA.
        </div>
        <div style="margin-top:16px; padding:14px 18px; background:rgba(124,58,237,0.06); border-radius:8px;">
          <div style="font-size:24px; color:${COLORS.violet}; line-height:1.6;">
            &bull; Down syndrome (trisomy 21)<br>
            &bull; 22q11.2 deletion syndrome<br>
            &bull; 15q11&ndash;q13 imprinting disorders
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:20px;">
    <div class="label">Clinical Correlation</div>
    <div class="value" style="font-size:31px;">Severe early-onset = think monogenic; distinctive features + multi-system = think chromosomal</div>
  </div>
`));

// ── Slide 5: De Novo, Complex & Mosaicism ──────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>De Novo Variants, Complex Traits &amp; Mosaicism</h1>
  <div class="section-label">Beyond Simple Inheritance</div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${mc.accent};">1</div>
    <div class="card card-accent" style="flex:1; margin-bottom:0; padding:20px 24px;">
      <div class="card-title" style="font-size:28px;">De Novo Variants</div>
      <div class="card-body" style="font-size:25px;">Arise spontaneously in the germline; absent in both parents. Disproportionately responsible for <strong>severe early-onset</strong> disorders &mdash; e.g., Dravet syndrome (SCN1A), KCNQ2 epileptic encephalopathy.</div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.green};">2</div>
    <div class="card card-green" style="flex:1; margin-bottom:0; padding:20px 24px;">
      <div class="card-title" style="font-size:28px;">Complex / Multifactorial</div>
      <div class="card-body" style="font-size:25px;">Multiple variants + environment &mdash; e.g., common epilepsy, autism spectrum disorder. Polygenic risk scores still limited in clinical use. Common late-onset dementias are predominantly polygenic.</div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.violet};">3</div>
    <div class="card card-violet" style="flex:1; margin-bottom:0; padding:20px 24px;">
      <div class="card-title" style="font-size:28px;">Mosaicism</div>
      <div class="card-body" style="font-size:25px;">Post-zygotic mutation producing two cell populations. Severity correlates with proportion of affected cells. Can cause focal cortical dysplasia or mosaic RASopathies.</div>
    </div>
  </div>
`));

// ── Slide 6: Penetrance & Expressivity ─────────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Penetrance &amp; Variable Expressivity</h1>
  <div class="section-label">Why Genotype &ne; Phenotype</div>

  <div class="two-col" style="margin-bottom:24px;">
    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:34px;">Penetrance</div>
      <div class="card-body" style="font-size:27px;">The probability that a pathogenic genotype produces the clinical phenotype.</div>
      <div style="margin-top:16px; font-size:24px; color:${COLORS.muted};">
        <strong>Complete:</strong> Huntington disease (100%)<br>
        <strong>Incomplete:</strong> BRCA1 (~70% cancer risk)
      </div>
    </div>
    <div class="card card-violet" style="padding:28px;">
      <div class="card-title" style="font-size:34px;">Variable Expressivity</div>
      <div class="card-body" style="font-size:27px;">Same pathogenic variant &rarr; different severity or features across individuals.</div>
      <div style="margin-top:16px; font-size:24px; color:${COLORS.muted};">
        Example: NF1 &mdash; caf&eacute;-au-lait spots only vs. plexiform neurofibromas
      </div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-green" style="padding:24px;">
      <div class="card-title">Pleiotropy</div>
      <div class="card-body" style="font-size:25px;">One gene causes <strong>distinct phenotypes/diseases</strong> &mdash; not just variable features within one syndrome. <strong>CACNA1A</strong> &rarr; episodic ataxia type 2, familial hemiplegic migraine, and SCA6 (three unique disorders).</div>
    </div>
    <div class="card card-amber" style="padding:24px;">
      <div class="card-title">Genetic Heterogeneity</div>
      <div class="card-body" style="font-size:25px;">One phenotype can be caused by variants in many different genes. Epileptic encephalopathy &rarr; SCN1A, KCNQ2, STXBP1, CDKL5, and 100+ others.</div>
    </div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// S2: Common Neurogenetic Disease Categories — slides 7–9
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 7: Epilepsies & Neurodevelopmental Disorders ─────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Common Neurogenetic Categories: Epilepsy &amp; NDD</h1>
  <div class="section-label">Prototypical Genes &amp; Phenotypes</div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Genetic Epilepsies</div>
        <div class="card-body" style="font-size:25px; margin-top:8px;">
          Channelopathies and signaling pathway genes dominate:
        </div>
        <div style="margin-top:14px; font-size:24px; line-height:1.7;">
          &bull; <strong>SCN1A</strong> &mdash; Dravet syndrome<br>
          &bull; <strong>KCNQ2</strong> &mdash; neonatal-onset EE<br>
          &bull; <strong>TSC1/TSC2</strong> &mdash; tuberous sclerosis<br>
          &bull; <strong>ALDH7A1</strong> &mdash; pyridoxine-dependent epilepsy<br>
          &bull; <strong>CDKL5, FOXG1</strong> &mdash; DEE
        </div>
      </div>
    </div>

    <div>
      <div class="card card-violet" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">ID / Autism</div>
        <div class="card-body" style="font-size:25px; margin-top:8px;">
          Synaptic and chromatin-regulation genes:
        </div>
        <div style="margin-top:14px; font-size:24px; line-height:1.7;">
          &bull; <strong>FMR1</strong> &mdash; Fragile X (most common inherited ID in males; FMRP protein)<br>
          &bull; <strong>MECP2</strong> &mdash; Rett syndrome<br>
          &bull; <strong>SHANK3</strong> &mdash; Phelan-McDermid<br>
          &bull; <strong>ANKRD11</strong> &mdash; KBG syndrome<br>
          &bull; 22q11.2 deletion, Down syndrome
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 8: Movement Disorders & Neuromuscular ────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Common Categories: Movement &amp; Neuromuscular</h1>
  <div class="section-label">Prototypical Genes &amp; Phenotypes</div>

  <div class="two-col">
    <div>
      <div class="card card-green" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Movement Disorders</div>
        <div class="card-body" style="font-size:25px; margin-top:8px;">
          Repeat expansions and enzyme deficiencies:
        </div>
        <div style="margin-top:14px; font-size:24px; line-height:1.7;">
          &bull; <strong>HTT</strong> &mdash; Huntington disease (CAG repeat)<br>
          &bull; <strong>PRKN / PINK1 / SNCA</strong> &mdash; Parkinson<br>
          &bull; <strong>ATXN1&ndash;3</strong> &mdash; spinocerebellar ataxias<br>
          &bull; <strong>FXN</strong> &mdash; Friedreich ataxia (GAA repeat)<br>
          &bull; <strong>ATP1A3</strong> &mdash; alternating hemiplegia
        </div>
      </div>
    </div>

    <div>
      <div class="card card-amber" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Neuromuscular</div>
        <div class="card-body" style="font-size:25px; margin-top:8px;">
          Structural and motor neuron genes:
        </div>
        <div style="margin-top:14px; font-size:24px; line-height:1.7;">
          &bull; <strong>DMD</strong> &mdash; Duchenne muscular dystrophy<br>
          &bull; <strong>SMN1</strong> &mdash; spinal muscular atrophy<br>
          &bull; <strong>DMPK</strong> &mdash; myotonic dystrophy (CTG repeat)<br>
          &bull; <strong>MFN2</strong> &mdash; CMT2A<br>
          &bull; <strong>GJB1</strong> &mdash; CMT1X (Connexin 32)
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 9: Leukodystrophies ────────────────────────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Common Categories: Leukodystrophies</h1>
  <div class="section-label">White Matter Disorders</div>

  <div class="card card-red" style="padding:28px; margin-bottom:24px;">
    <div class="card-title" style="font-size:31px;">Leukodystrophies / White Matter Disorders</div>
    <div class="card-body" style="font-size:25px; margin-top:8px;">
      Myelin metabolism and peroxisomal genes:
    </div>
    <div style="margin-top:14px; font-size:24px; line-height:1.7;">
      &bull; <strong>ABCD1</strong> &mdash; X-linked adrenoleukodystrophy<br>
      &bull; <strong>ARSA</strong> &mdash; metachromatic leukodystrophy (MLD)<br>
      &bull; <strong>GALC</strong> &mdash; Krabbe disease<br>
      &bull; <strong>EIF2B1&ndash;5</strong> &mdash; vanishing white matter disease
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:31px;">Symmetric white matter signal abnormality on MRI in a child with cognitive decline &rarr; think leukodystrophy and request targeted enzyme/genetic testing</div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// S3: The Neurogenetic History and Examination — slides 10–12
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 10: Three-Generation Pedigree ────────────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>The Neurogenetic History: Pedigree</h1>
  <div class="section-label">Three-Generation Pedigree</div>

  <div class="card card-accent" style="padding:28px; margin-bottom:24px;">
    <div class="card-title" style="font-size:31px;">Cornerstone of Genetic Assessment</div>
    <div class="card-body" style="font-size:27px;">
      A three-generation pedigree can often reveal the mode of inheritance before any genetic test is ordered.
    </div>
  </div>

  <h3>Document for All First- &amp; Second-Degree Relatives:</h3>
  <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px;">
    <div class="card card-green" style="padding:20px;">
      <div class="card-title" style="font-size:28px;">Affected Status</div>
      <div class="card-body" style="font-size:24px;">Affected vs. unaffected, phenotypic details for affected individuals</div>
    </div>
    <div class="card card-violet" style="padding:20px;">
      <div class="card-title" style="font-size:28px;">Age &amp; Cause of Death</div>
      <div class="card-body" style="font-size:24px;">Age of onset for each affected member; cause of death if deceased</div>
    </div>
    <div class="card card-amber" style="padding:20px;">
      <div class="card-title" style="font-size:28px;">Consanguinity &amp; Ethnicity</div>
      <div class="card-body" style="font-size:24px;">Shared ancestry between parents; ethnic background for carrier frequency estimates</div>
    </div>
  </div>
`));

// ── Slide 11: Red Flags for Genetic Etiology ───────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Red Flags for a Genetic Etiology</h1>
  <div class="section-label">Clinical Clues from History</div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:24px;">
    <div class="card card-red" style="padding:24px;">
      <div class="card-title" style="font-size:28px;">Onset in Childhood / Adolescence</div>
      <div class="card-body" style="font-size:25px;">Early onset strongly favors a genetic etiology, especially in severe phenotypes.</div>
    </div>
    <div class="card card-accent" style="padding:24px;">
      <div class="card-title" style="font-size:28px;">Family History</div>
      <div class="card-body" style="font-size:25px;">Affected siblings (AR), parent-child transmission (AD), or maternal-line males (XLR).</div>
    </div>
    <div class="card card-violet" style="padding:24px;">
      <div class="card-title" style="font-size:28px;">ID / Developmental Delay</div>
      <div class="card-body" style="font-size:25px;">Unexplained developmental delay or intellectual disability warrants genetic testing as first-line.</div>
    </div>
    <div class="card card-amber" style="padding:24px;">
      <div class="card-title" style="font-size:28px;">Multi-Organ Involvement</div>
      <div class="card-body" style="font-size:25px;">Neurological + cardiac, renal, hepatic, or skeletal involvement suggests a pleiotropic genetic disorder.</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-green" style="padding:24px;">
      <div class="card-title">Distinctive Features</div>
      <div class="card-body" style="font-size:25px;">Distinctive facial features, hand anomalies, or growth abnormalities point toward chromosomal or syndromic conditions.</div>
    </div>
    <div class="card card-rose" style="padding:24px;">
      <div class="card-title">Response to Specific Therapies</div>
      <div class="card-body" style="font-size:25px;">Improvement with dietary restriction or vitamin supplementation (e.g., pyridoxine, biotin) suggests an inborn error of metabolism.</div>
    </div>
  </div>
`));

// ── Slide 12: Examination Pearls & Neuroimaging ────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>Examination Pearls &amp; Neuroimaging Patterns</h1>
  <div class="section-label">Physical Exam &amp; Imaging Clues</div>

  <div class="two-col">
    <div>
      <h3>Examination Pearls</h3>
      <div class="card card-accent" style="padding:22px;">
        <div class="card-title" style="font-size:28px;">Subtle Distinctive Features</div>
        <div class="card-body" style="font-size:24px;">Ear pits, hypertelorism, clinodactyly &mdash; easily missed on routine exam but highly informative.</div>
      </div>
      <div class="card card-green" style="padding:22px;">
        <div class="card-title" style="font-size:28px;">Skin Findings</div>
        <div class="card-body" style="font-size:24px;">Caf&eacute;-au-lait spots (NF1), ash-leaf macules (TSC), angiofibromas (TSC) &mdash; neurocutaneous stigmata.</div>
      </div>
    </div>

    <div>
      <h3>Neuroimaging Patterns</h3>
      <div class="card card-violet" style="padding:22px;">
        <div class="card-title" style="font-size:28px;">Structural Clues</div>
        <div class="card-body" style="font-size:24px;">
          &bull; Simplified gyral pattern &rarr; LIS1, DCX<br>
          &bull; White matter signal abnormality &rarr; leukodystrophies<br>
          &bull; Striatal necrosis &rarr; Leigh syndrome (mito)<br>
          &bull; Subependymal nodules &rarr; tuberous sclerosis
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:20px;">
    <div class="label">Integration</div>
    <div class="value" style="font-size:31px;">Exam + imaging pattern recognition narrows the differential and guides the choice of genetic test</div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// S4: Genetic Testing Strategies — slides 13–15
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 13: CMA & Gene Panels ────────────────────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Genetic Testing: CMA &amp; Gene Panels</h1>
  <div class="section-label">First-Line &amp; Targeted Approaches</div>

  <div class="two-col">
    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:31px;">Chromosomal Microarray (CMA)</div>
      <div class="card-body" style="font-size:25px; margin-top:8px;">
        <strong>Historical first-line</strong> for unexplained ID, ASD, and MCA. Now largely supplanted by WES/WGS when genetic counseling is available.
      </div>
      <div style="margin-top:16px; padding:14px 18px; background:rgba(37,99,235,0.06); border-radius:8px;">
        <div style="font-size:24px; color:${mc.dark}; line-height:1.6;">
          &bull; Detects CNVs &ge;50&ndash;200 kb<br>
          &bull; Does NOT detect SNVs or balanced rearrangements<br>
          &bull; Still useful when NGS is unavailable or for CNV confirmation
        </div>
      </div>
    </div>

    <div class="card card-violet" style="padding:28px;">
      <div class="card-title" style="font-size:31px;">Gene Panels</div>
      <div class="card-body" style="font-size:25px; margin-top:8px;">
        Targeted sequencing of 20&ndash;500 genes relevant to a specific phenotype (epilepsy panel, ataxia panel).
      </div>
      <div style="margin-top:16px; padding:14px 18px; background:rgba(124,58,237,0.06); border-radius:8px;">
        <div style="font-size:24px; color:${COLORS.violet}; line-height:1.6;">
          &bull; Higher sensitivity for technically difficult regions<br>
          &bull; Fast turnaround, lowest cost per gene<br>
          &bull; Misses novel gene associations
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 14: Exome, Genome & Targeted Tests ───────────────────────────────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>Exome, Genome &amp; Targeted Tests</h1>
  <div class="section-label">Comprehensive &amp; Specific Approaches</div>

  <div class="three-col" style="margin-bottom:24px;">
    <div class="card card-accent" style="padding:24px;">
      <div class="card-title" style="font-size:28px;">Exome Sequencing (ES)</div>
      <div class="card-body" style="font-size:24px;">
        All ~22,000 protein-coding genes (~1.5% of genome). Diagnostic yield 30&ndash;40% for unsolved neurogenetic disorders. Preferred when panel is non-diagnostic or phenotype is broad.
      </div>
    </div>
    <div class="card card-green" style="padding:24px;">
      <div class="card-title" style="font-size:28px;">Genome Sequencing (GS)</div>
      <div class="card-body" style="font-size:24px;">
        Coding + non-coding regions. Detects SNVs, indels, CNVs, repeat expansions, and structural variants in one test. Increasingly first-line in pediatric neurology.
      </div>
    </div>
    <div class="card card-amber" style="padding:24px;">
      <div class="card-title" style="font-size:28px;">Targeted Tests</div>
      <div class="card-body" style="font-size:24px;">
        &bull; Repeat PCR: Huntington, Fragile X, Friedreich, DM1<br>
        &bull; Methylation: PWS/AS<br>
        &bull; Mito genome sequencing<br>
        Order when specific Dx is suspected.
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Choosing the Right Test</div>
    <div class="value" style="font-size:31px;">Narrow differential &rarr; targeted test or panel &nbsp;|&nbsp; Broad/unsolved &rarr; exome or genome sequencing</div>
  </div>
`));

// ── Slide 15: Key Takeaways ────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 15, TOTAL, [
  {
    title: "Neurogenetics bridges neurology and genetics",
    body: "~60% of Mendelian disorders have a neurological component. Genetic diagnosis enables counseling, cascade testing, and targeted therapy.",
  },
  {
    title: "Genetic architecture guides testing strategy",
    body: "Monogenic, chromosomal, de novo, complex, and mosaic architectures each require different diagnostic approaches.",
  },
  {
    title: "Know the prototypical genes for each category",
    body: "Epilepsy (SCN1A, KCNQ2), ID (FMR1, MECP2), movement (HTT, FXN), neuromuscular (DMD, SMN1), leukodystrophy (ABCD1, ARSA).",
  },
  {
    title: "The pedigree is your most powerful tool",
    body: "A three-generation pedigree can reveal inheritance pattern before any genetic test is ordered. Exam findings and neuroimaging narrow the differential.",
  },
  {
    title: "Match the test to the clinical question",
    body: "WES/WGS is now first-line for unexplained NDD when genetic counseling is available. Panels for narrow differentials; CMA for CNV confirmation. No single test catches everything.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
