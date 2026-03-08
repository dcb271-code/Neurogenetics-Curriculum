/**
 * scripts/gen-cnv-interpretation.mjs
 *
 * Generates 10 slides (5 sections × 2 slides each) for the CNV Interpretation module.
 * Section alignment matches data/modules/cnv-interpretation.json exactly.
 *
 * Run: node scripts/gen-cnv-interpretation.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "cnv-interpretation";
const mc = MODULE_COLORS[MOD];
const TOTAL = 10;

const slides = [];

/* ================================================================
   Section 0: Copy Number Variants: Definition and Clinical Significance (slides 1–2)
   ================================================================ */

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Copy Number Variant<br>Interpretation",
  subtitle: "ACMG/ClinGen framework for classifying genomic gains and losses",
  totalSlides: TOTAL,
  topics: [
    "CNV definition &amp; clinical significance",
    "Detection technologies: CMA &amp; WGS",
    "ACMG/ClinGen classification framework",
    "Recurrent genomic disorders (NAHR)",
    "CNV reporting &amp; communication",
  ],
}));

// ── Slide 2: CNV Definition & Clinical Significance ────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>CNV Definition &amp; Clinical Significance</h1>
  <div class="section-label">Deletions (Loss) &bull; Duplications (Gain)</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div class="card card-green">
      <div class="card-title">Benign CNVs</div>
      <div class="card-body" style="font-size:19px;">
        <strong>High population frequency</strong> (&gt;1% in DGV/gnomAD-SV)<br><br>
        Typically <strong>smaller</strong> and gene-poor<br><br>
        ~12% of the human genome varies in copy number between individuals
      </div>
    </div>
    <div class="card card-red">
      <div class="card-title">Pathogenic CNVs</div>
      <div class="card-body" style="font-size:19px;">
        <strong>Rare</strong> (&lt;0.01%) or absent in healthy populations<br><br>
        Larger size, encompass <strong>dosage-sensitive genes</strong><br><br>
        Overlap established syndrome regions
      </div>
    </div>
  </div>

  <div class="stats-row">
    <div class="stat-card" style="background:${COLORS.redLight}; border-color:${COLORS.red};">
      <div class="stat-label">ID/ASD Diagnostic Yield</div>
      <div class="stat-value">15–20%</div>
    </div>
    <div class="stat-card" style="background:${mc.light}; border-color:${mc.accent};">
      <div class="stat-label">CMA Resolution</div>
      <div class="stat-value">&ge;50–200 kb</div>
    </div>
    <div class="stat-card" style="background:${COLORS.violetLight}; border-color:${COLORS.violet};">
      <div class="stat-label">WGS Resolution</div>
      <div class="stat-value">~100 bp+</div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Key Fact</div>
    <div class="value" style="font-size:22px;">CNVs account for the highest diagnostic yield of any single variant class in intellectual disability and autism</div>
  </div>
`));

/* ================================================================
   Section 1: Detection Technologies: CMA and WGS (slides 3–4)
   ================================================================ */

// ── Slide 3: CMA Platform Details ──────────────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>CMA: Chromosomal Microarray</h1>
  <div class="section-label">First-Tier Test for DD &amp; Congenital Anomalies</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div>
      <div class="card card-accent" style="margin-bottom:14px;">
        <div class="card-title">Array CGH</div>
        <div class="card-body" style="font-size:18px;">
          Compares patient DNA to reference using fluorescent labeling<br><br>
          Detects gains and losses (unbalanced rearrangements only)<br><br>
          Resolution: ~50&ndash;400 kb depending on probe density
        </div>
      </div>
      <div class="card card-violet">
        <div class="card-title">SNP Array Advantage</div>
        <div class="card-body" style="font-size:18px;">
          Additionally detects <strong>copy-neutral LOH</strong> (absence of heterozygosity)<br><br>
          Enables detection of <strong>uniparental disomy (UPD)</strong> &mdash; critical for imprinting disorders
        </div>
      </div>
    </div>

    <div>
      <div class="card card-red">
        <div class="card-title">CMA Cannot Detect</div>
        <div class="card-body" style="font-size:18px;">
          &bull; Balanced rearrangements (inversions, balanced translocations)<br>
          &bull; Small variants (&lt;50 kb)<br>
          &bull; Repeat expansions<br>
          &bull; Low-level mosaicism (&lt;10&ndash;15%)<br>
          &bull; Point mutations / SNVs
        </div>
      </div>
    </div>
  </div>

  <div class="card card-green">
    <div class="card-title">ACMG Recommendation</div>
    <div class="card-body">CMA is the recommended <strong>first-tier</strong> genetic test for patients with developmental delay, intellectual disability, autism spectrum disorder, or multiple congenital anomalies</div>
  </div>
`));

// ── Slide 4: WGS for CNV Detection ─────────────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>WGS for CNV Detection</h1>
  <div class="section-label">Read Depth &bull; Split Reads &bull; Discordant Pairs</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div class="card card-accent">
      <div class="card-title">WGS Advantages</div>
      <div class="card-body" style="font-size:18px;">
        &bull; Superior sensitivity for <strong>smaller CNVs</strong> (&lt;50 kb)<br>
        &bull; Better <strong>breakpoint resolution</strong><br>
        &bull; Simultaneous SNV + CNV + SV detection<br>
        &bull; Can detect <strong>balanced rearrangements</strong> (inversions, translocations)
      </div>
    </div>
    <div class="card card-amber">
      <div class="card-title">WGS Limitations</div>
      <div class="card-body" style="font-size:18px;">
        &bull; CNV calling pipelines still <strong>maturing</strong><br>
        &bull; Coverage uniformity affects sensitivity in GC-rich regions<br>
        &bull; <strong>Segmental duplications</strong> complicate accurate CNV calling<br>
        &bull; Higher cost and longer turnaround
      </div>
    </div>
  </div>

  <h3>Three Detection Methods in WGS</h3>
  <div class="three-col">
    <div class="card card-violet" style="text-align:center; padding:20px;">
      <div class="card-title">Read Depth</div>
      <div class="card-body" style="font-size:17px;">Increased or decreased coverage across a region signals gain or loss</div>
    </div>
    <div class="card card-red" style="text-align:center; padding:20px;">
      <div class="card-title">Split Reads</div>
      <div class="card-body" style="font-size:17px;">Individual reads spanning a breakpoint &mdash; high resolution</div>
    </div>
    <div class="card card-green" style="text-align:center; padding:20px;">
      <div class="card-title">Discordant Pairs</div>
      <div class="card-body" style="font-size:17px;">Read pairs mapping to unexpected locations signal structural change</div>
    </div>
  </div>
`));

/* ================================================================
   Section 2: ACMG/ClinGen CNV Classification Framework (slides 5–6)
   ================================================================ */

// ── Slide 5: 5-Tier Classification + Evidence Domains ──────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>ACMG/ClinGen CNV Classification</h1>
  <div class="section-label">Riggs et al., Genetics in Medicine 2019</div>

  <div class="stats-row" style="margin-bottom:20px;">
    <div class="stat-card" style="background:${COLORS.redLight}; border-color:${COLORS.red};">
      <div class="stat-label">Pathogenic</div>
      <div class="stat-value" style="font-size:22px;">&ge;0.99</div>
    </div>
    <div class="stat-card" style="background:#fff7ed; border-color:${COLORS.amber};">
      <div class="stat-label">Likely Path.</div>
      <div class="stat-value" style="font-size:22px;">0.90&ndash;0.98</div>
    </div>
    <div class="stat-card" style="background:#f8fafc; border-color:#94a3b8;">
      <div class="stat-label">VUS</div>
      <div class="stat-value" style="font-size:22px;">Uncertain</div>
    </div>
    <div class="stat-card" style="background:${COLORS.blueLight}; border-color:${COLORS.blue};">
      <div class="stat-label">Likely Benign</div>
      <div class="stat-value" style="font-size:22px;">0.90&ndash;0.98</div>
    </div>
    <div class="stat-card" style="background:${COLORS.greenLight}; border-color:${COLORS.green};">
      <div class="stat-label">Benign</div>
      <div class="stat-value" style="font-size:22px;">&ge;0.99</div>
    </div>
  </div>

  <h3>Five Evidence Domains</h3>
  <table>
    <thead><tr><th>#</th><th>Evidence Domain</th><th>Key Considerations</th></tr></thead>
    <tbody>
      <tr><td>1</td><td>Initial assessment</td><td>CNV size and gene content (coding vs. non-coding)</td></tr>
      <tr><td>2</td><td>Overlap with established regions</td><td>Known pathogenic/benign CNV regions (OMIM, ClinVar, DGV)</td></tr>
      <tr><td>3</td><td>Gene dosage sensitivity</td><td>ClinGen HI score (deletions) and TS score (duplications)</td></tr>
      <tr><td>4</td><td>Phenotypic evidence</td><td>Published literature, functional data, phenotype match</td></tr>
      <tr><td>5</td><td>Inheritance</td><td>De novo &gt; inherited from affected &gt; inherited from unaffected</td></tr>
    </tbody>
  </table>
`));

// ── Slide 6: HI/TS Dosage Sensitivity Scoring ─────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>ClinGen Dosage Sensitivity Scores</h1>
  <div class="section-label">Haploinsufficiency (Deletions) &bull; Triplosensitivity (Duplications)</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div>
      <h3 style="color:${COLORS.red};">Haploinsufficiency (HI) &mdash; Deletions</h3>
      <table>
        <thead><tr><th>Score</th><th>Evidence Level</th></tr></thead>
        <tbody>
          <tr><td style="font-weight:800; color:${COLORS.red};">3</td><td>Sufficient evidence for HI</td></tr>
          <tr><td style="font-weight:800; color:${COLORS.amber};">2</td><td>Emerging evidence</td></tr>
          <tr><td style="font-weight:800; color:${COLORS.muted};">1</td><td>Little evidence</td></tr>
          <tr><td style="font-weight:800; color:${COLORS.green};">0</td><td>No evidence for HI</td></tr>
        </tbody>
      </table>
    </div>

    <div>
      <h3 style="color:${COLORS.violet};">Triplosensitivity (TS) &mdash; Duplications</h3>
      <table>
        <thead><tr><th>Score</th><th>Evidence Level</th></tr></thead>
        <tbody>
          <tr><td style="font-weight:800; color:${COLORS.violet};">3</td><td>Sufficient evidence for TS</td></tr>
          <tr><td style="font-weight:800; color:${COLORS.amber};">2</td><td>Emerging evidence</td></tr>
          <tr><td style="font-weight:800; color:${COLORS.muted};">1</td><td>Little evidence</td></tr>
          <tr><td style="font-weight:800; color:${COLORS.green};">0</td><td>No evidence for TS</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="card card-amber">
    <div class="card-title">Critical Concept</div>
    <div class="card-body">A gene can be HI-sensitive but <strong>NOT</strong> TS-sensitive. Deletion of a region may be pathogenic while duplication of the same region is benign &mdash; always evaluate deletions and duplications <strong>independently</strong>.</div>
  </div>
`));

/* ================================================================
   Section 3: Recurrent Genomic Disorders in Neurogenetics (slides 7–8)
   ================================================================ */

// ── Slide 7: NAHR Mechanism ────────────────────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>NAHR &mdash; Recurrent CNV Mechanism</h1>
  <div class="section-label">Non-Allelic Homologous Recombination</div>

  <div class="card card-accent" style="margin-bottom:20px;">
    <div class="card-title">How Recurrent CNVs Arise</div>
    <div class="card-body" style="font-size:20px;">Low copy repeats (LCRs / segmental duplications) flanking a genomic region serve as substrates for misalignment during meiosis, leading to unequal crossing-over.</div>
  </div>

  <div class="three-col" style="margin-bottom:20px;">
    <div class="card card-violet">
      <div class="card-title">1. Misalignment</div>
      <div class="card-body">Homologous LCR sequences on sister chromatids or homologs align incorrectly during meiotic recombination</div>
    </div>
    <div class="card card-red">
      <div class="card-title">2. Unequal Crossover</div>
      <div class="card-body">Recombination between misaligned LCRs produces one chromatid with a deletion and its reciprocal with a duplication</div>
    </div>
    <div class="card card-green">
      <div class="card-title">3. Predictable Result</div>
      <div class="card-body">Same breakpoints recur in unrelated individuals &mdash; well-characterized syndromes with defined phenotypes</div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Why This Matters</div>
    <div class="value">NAHR-mediated CNVs have defined breakpoints, known phenotypes, and are easier to classify than non-recurrent CNVs</div>
  </div>
`));

// ── Slide 8: Recurrent Genomic Disorders Table ─────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Recurrent Genomic Disorders</h1>
  <div class="section-label">Neurogenetics &bull; Established Syndrome Regions</div>

  <table style="margin-bottom:16px;">
    <thead><tr><th>CNV Locus</th><th>Syndrome</th><th>Size</th><th>Frequency</th></tr></thead>
    <tbody>
      <tr><td>22q11.2 del</td><td>DiGeorge / Velocardiofacial</td><td>~3 Mb</td><td style="font-weight:700; color:${mc.dark};">~1:4,000</td></tr>
      <tr><td>7q11.23 del</td><td>Williams-Beuren (ELN, hypersociability)</td><td>~1.5 Mb</td><td style="font-weight:700; color:${mc.dark};">~1:7,500</td></tr>
      <tr><td>1p36 del</td><td>1p36 deletion (severe ID, seizures)</td><td>Variable</td><td style="font-weight:700; color:${mc.dark};">~1:5,000</td></tr>
      <tr><td>15q11&ndash;q13 del</td><td>Prader-Willi (pat) / Angelman (mat)</td><td>~5 Mb</td><td style="font-weight:700; color:${mc.dark};">~1:15,000</td></tr>
      <tr><td>17p11.2 del</td><td>Smith-Magenis</td><td>~3.7 Mb</td><td style="font-weight:700; color:${mc.dark};">~1:15,000</td></tr>
    </tbody>
  </table>

  <div class="card card-accent">
    <div class="card-title">Parent-of-Origin Matters at 15q11&ndash;q13</div>
    <div class="card-body" style="font-size:19px;">The <strong>same deletion</strong> causes different syndromes depending on which parent&rsquo;s copy is lost &mdash; <strong>paternal</strong> deletion = Prader-Willi; <strong>maternal</strong> deletion = Angelman; <strong>maternal duplication</strong> = autism spectrum disorder. This is due to genomic imprinting.</div>
  </div>
`));

/* ================================================================
   Section 4: CNV Reporting and Clinical Communication (slides 9–10)
   ================================================================ */

// ── Slide 9: Reporting Standards + Parental Studies ────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>CNV Reporting &amp; Communication</h1>
  <div class="section-label">Nomenclature &bull; Parental Studies &bull; VUS Management</div>

  <div class="two-col" style="margin-bottom:18px;">
    <div>
      <div class="card card-accent" style="margin-bottom:14px;">
        <div class="card-title">Report Elements</div>
        <div class="card-body" style="font-size:18px;">
          &bull; ISCN/HGVS nomenclature with <strong>GRCh38</strong> coordinates<br>
          &bull; Gene content summary (OMIM morbid genes)<br>
          &bull; 5-tier ACMG/ClinGen classification<br>
          &bull; Evidence domains applied with rationale
        </div>
      </div>
      <div class="card card-red">
        <div class="card-title">De Novo CNVs</div>
        <div class="card-body" style="font-size:18px;">
          De novo CNVs are <strong>~10-fold more likely pathogenic</strong> than inherited CNVs<br><br>
          Parental testing provides critical evidence for classification
        </div>
      </div>
    </div>

    <div>
      <div class="card card-amber" style="margin-bottom:14px;">
        <div class="card-title">VUS CNVs</div>
        <div class="card-body" style="font-size:18px;">
          &bull; Communicate clearly that VUS <strong>cannot be used clinically</strong><br>
          &bull; Offer follow-up parental testing<br>
          &bull; Plan reclassification review as databases grow
        </div>
      </div>
      <div class="card card-violet">
        <div class="card-title">Incidental Findings</div>
        <div class="card-body" style="font-size:18px;">
          CMA may reveal clinically significant CNVs <strong>unrelated to the indication</strong><br><br>
          Pre-test counseling should address this possibility before testing
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 10: Key Takeaways ────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 10, TOTAL, [
  {
    title: "CNVs are the highest-yield variant class in ID/ASD",
    body: "15–20% diagnostic yield — CMA is the recommended first-tier test for developmental delay and congenital anomalies.",
  },
  {
    title: "Evaluate deletions and duplications independently",
    body: "HI and TS scores are independent — a gene may be haploinsufficient but tolerate duplication. Never assume reciprocal pathogenicity.",
  },
  {
    title: "NAHR explains recurrent genomic disorders",
    body: "LCR-mediated recombination produces predictable breakpoints and well-characterized syndromes like 22q11.2 deletion.",
  },
  {
    title: "Parental testing is critical for CNV classification",
    body: "De novo CNVs are ~10-fold more likely pathogenic. Inheritance data is one of the strongest evidence domains.",
  },
  {
    title: "Parent-of-origin matters for imprinted regions",
    body: "15q11–q13: paternal deletion = Prader-Willi, maternal deletion = Angelman — the same CNV, different syndrome.",
  },
  {
    title: "Databases are essential for CNV interpretation",
    body: "DGV, ClinGen dosage map, ClinVar, DECIPHER, and gnomAD-SV form the minimum required database set.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
