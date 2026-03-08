/**
 * scripts/gen-cnv-interpretation.mjs
 *
 * Generates 10 clean, readable slides for the CNV Interpretation module.
 * Uses puppeteer HTML rendering via the shared design system.
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

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Copy Number Variant<br>Interpretation",
  subtitle: "Systematic evaluation of genomic gains and losses in neurogenetic disease",
  totalSlides: TOTAL,
  topics: [
    "CNV definition &amp; significance",
    "Detection technologies",
    "Interpretation workflow &amp; ACMG/ClinGen framework",
    "NAHR &amp; recurrent genomic disorders",
    "Essential databases &amp; resources",
  ],
}));

// ── Slide 2: CNV Definition & Significance ─────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>CNV Definition &amp; Significance</h1>
  <div class="section-label">Section 1 of 5</div>

  <div class="two-col" style="margin-bottom:24px;">
    <div class="card card-green">
      <div class="card-title">Benign CNVs</div>
      <div class="card-body">
        <p style="font-size:19px; margin-bottom:8px;"><strong>High population frequency</strong> (&gt;1%)</p>
        <p style="font-size:19px; margin-bottom:8px;"><strong>Smaller size</strong> (typically &lt;500 kb)</p>
        <p style="font-size:19px;">Low gene content or gene-poor regions</p>
      </div>
    </div>
    <div class="card card-red">
      <div class="card-title">Pathogenic CNVs</div>
      <div class="card-body">
        <p style="font-size:19px; margin-bottom:8px;"><strong>Rare</strong> or absent in healthy populations</p>
        <p style="font-size:19px; margin-bottom:8px;"><strong>Larger size</strong> (often &gt;1 Mb)</p>
        <p style="font-size:19px;">Overlap dosage-sensitive genes or known syndrome regions</p>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-bottom:20px;">
    <div class="label">Size Rule of Thumb</div>
    <div class="value">CNVs &gt;3 Mb are more likely pathogenic</div>
    <p style="font-size:18px; margin-top:8px; color:${COLORS.body};">Larger CNVs encompass more genes and are less likely to be tolerated &mdash; but small CNVs can also be pathogenic if they disrupt critical loci.</p>
  </div>

  <div class="card card-accent">
    <div class="card-title">CNVs Are Common</div>
    <div class="card-body">~12% of the human genome varies in copy number between individuals. Most CNVs are benign &mdash; distinguishing pathogenic from benign is the central challenge.</div>
  </div>
`));

// ── Slide 3: Detection Technologies ────────────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Detection Technologies</h1>
  <div class="section-label">Section 2 of 5</div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="margin-bottom:20px;">
        <div class="card-title">Chromosomal Microarray (CMA)</div>
        <div class="card-body">
          <p style="font-size:19px; margin-bottom:10px;"><strong>Platforms:</strong> Array CGH, SNP arrays</p>
          <p style="font-size:19px; margin-bottom:10px;"><strong>Resolution:</strong> ~50&ndash;400 kb</p>
          <p style="font-size:19px; margin-bottom:10px;"><strong>Detects:</strong> Gains &amp; losses (unbalanced)</p>
          <p style="font-size:19px; color:${COLORS.red};"><strong>Cannot detect:</strong> Balanced rearrangements (inversions, balanced translocations)</p>
        </div>
      </div>
      <div class="card card-amber">
        <div class="card-title">SNP Array Advantage</div>
        <div class="card-body">Also detects copy-neutral LOH (absence of heterozygosity), enabling UPD detection.</div>
      </div>
    </div>

    <div>
      <div class="card card-violet" style="margin-bottom:20px;">
        <div class="card-title">Whole Genome Sequencing (WGS)</div>
        <div class="card-body">
          <p style="font-size:19px; margin-bottom:10px;"><strong>Resolution:</strong> Higher than CMA</p>
          <p style="font-size:19px; margin-bottom:10px;"><strong>Detects:</strong> Both balanced &amp; unbalanced rearrangements</p>
          <p style="font-size:19px; margin-bottom:10px;"><strong>Bonus:</strong> Simultaneous SNV + CNV detection</p>
          <p style="font-size:19px; color:${COLORS.amber};"><strong>Caveat:</strong> CNV calling pipelines still maturing</p>
        </div>
      </div>
      <div class="card card-green">
        <div class="card-title">Clinical Standard</div>
        <div class="card-body">CMA remains first-tier for developmental delay &amp; congenital anomalies (ACMG recommendation).</div>
      </div>
    </div>
  </div>
`));

// ── Slide 4: CNV Interpretation Workflow ───────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>CNV Interpretation Workflow</h1>
  <div class="section-label">Section 3 of 5</div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${mc.accent};">1</div>
    <div>
      <div style="font-size:22px; font-weight:700; color:${COLORS.heading};">Known genomic syndrome?</div>
      <div style="font-size:19px; color:${COLORS.body}; margin-top:4px;">Does the CNV overlap a well-established syndrome region? (e.g., 22q11.2 deletion, Williams syndrome)</div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.green};">2</div>
    <div>
      <div style="font-size:22px; font-weight:700; color:${COLORS.heading};">Overlap with known benign CNVs?</div>
      <div style="font-size:19px; color:${COLORS.body}; margin-top:4px;">Check the Database of Genomic Variants (DGV) for population frequency data</div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.amber};">3</div>
    <div>
      <div style="font-size:22px; font-weight:700; color:${COLORS.heading};">Size and gene content?</div>
      <div style="font-size:19px; color:${COLORS.body}; margin-top:4px;">Number of protein-coding genes, presence of OMIM morbid genes, dosage-sensitive loci</div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.violet};">4</div>
    <div>
      <div style="font-size:22px; font-weight:700; color:${COLORS.heading};">What do databases show?</div>
      <div style="font-size:19px; color:${COLORS.body}; margin-top:4px;">Consult ClinVar, ClinGen Dosage Sensitivity Map, and DECIPHER for prior classifications</div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.red};">5</div>
    <div>
      <div style="font-size:22px; font-weight:700; color:${COLORS.heading};">Parental testing available?</div>
      <div style="font-size:19px; color:${COLORS.body}; margin-top:4px;">De novo origin = stronger evidence for pathogenicity; inherited from affected parent also supportive</div>
    </div>
  </div>
`));

// ── Slide 5: ACMG/ClinGen Classification Framework ────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>ACMG/ClinGen Classification</h1>
  <div class="section-label">Section 3 of 5 &mdash; Framework</div>

  <div class="stats-row" style="margin-bottom:24px;">
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
    <thead>
      <tr>
        <th>#</th>
        <th>Evidence Domain</th>
        <th>Key Considerations</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Overlap with HI/TS regions</td>
        <td>ClinGen-curated haploinsufficiency &amp; triplosensitivity scores</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Published literature</td>
        <td>Case reports, case-control studies, functional data</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Gene content</td>
        <td>Number of protein-coding genes; OMIM morbid entries</td>
      </tr>
      <tr>
        <td>4</td>
        <td>Size</td>
        <td>Larger CNVs carry more weight toward pathogenicity</td>
      </tr>
      <tr>
        <td>5</td>
        <td>Inheritance</td>
        <td>De novo &gt; inherited from affected &gt; inherited from unaffected</td>
      </tr>
    </tbody>
  </table>
`));

// ── Slide 6: ClinGen Dosage Sensitivity Scoring ───────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>ClinGen Dosage Sensitivity</h1>
  <div class="section-label">Section 3 of 5 &mdash; Dosage Scores</div>

  <div class="two-col" style="margin-bottom:24px;">
    <div>
      <h3 style="color:${COLORS.red};">Haploinsufficiency (HI) &mdash; Deletions</h3>
      <table>
        <thead>
          <tr>
            <th>Score</th>
            <th>Evidence Level</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-weight:800; color:${COLORS.red};">3</td>
            <td>Sufficient evidence for HI</td>
          </tr>
          <tr>
            <td style="font-weight:800; color:${COLORS.amber};">2</td>
            <td>Emerging evidence</td>
          </tr>
          <tr>
            <td style="font-weight:800; color:${COLORS.muted};">1</td>
            <td>Little evidence</td>
          </tr>
          <tr>
            <td style="font-weight:800; color:${COLORS.green};">0</td>
            <td>No evidence for HI</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <h3 style="color:${COLORS.violet};">Triplosensitivity (TS) &mdash; Duplications</h3>
      <table>
        <thead>
          <tr>
            <th>Score</th>
            <th>Evidence Level</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-weight:800; color:${COLORS.violet};">3</td>
            <td>Sufficient evidence for TS</td>
          </tr>
          <tr>
            <td style="font-weight:800; color:${COLORS.amber};">2</td>
            <td>Emerging evidence</td>
          </tr>
          <tr>
            <td style="font-weight:800; color:${COLORS.muted};">1</td>
            <td>Little evidence</td>
          </tr>
          <tr>
            <td style="font-weight:800; color:${COLORS.green};">0</td>
            <td>No evidence for TS</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="card card-amber">
    <div class="card-title">Critical Concept</div>
    <div class="card-body">A gene can be HI-sensitive but <strong>NOT</strong> TS-sensitive. Deletion of a region may be pathogenic while duplication of the same region is benign &mdash; always evaluate deletions and duplications independently.</div>
  </div>
`));

// ── Slide 7: NAHR — Mechanism for Recurrent CNVs ──────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>NAHR &mdash; Recurrent CNV Mechanism</h1>
  <div class="section-label">Section 4 of 5</div>

  <div class="card card-accent" style="margin-bottom:20px;">
    <div class="card-title">Non-Allelic Homologous Recombination (NAHR)</div>
    <div class="card-body" style="font-size:20px;">Low copy repeats (LCRs / segmental duplications) flanking a genomic region serve as substrates for misalignment during meiosis, leading to unequal crossing-over.</div>
  </div>

  <div class="three-col" style="margin-bottom:24px;">
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
      <div class="card-body">Same breakpoints recur in unrelated individuals, explaining why certain genomic disorders appear at predictable frequencies</div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Why This Matters</div>
    <div class="value">Recurrent CNVs have defined breakpoints &amp; known phenotypes</div>
    <p style="font-size:18px; margin-top:8px; color:${COLORS.body};">NAHR-mediated CNVs are easier to classify because they have been extensively characterized in large cohorts &mdash; many are established genomic syndromes.</p>
  </div>
`));

// ── Slide 8: Recurrent Genomic Disorders in Neurogenetics ──────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Recurrent Genomic Disorders</h1>
  <div class="section-label">Section 4 of 5 &mdash; Neurogenetics</div>

  <table>
    <thead>
      <tr>
        <th>CNV Locus</th>
        <th>Syndrome</th>
        <th>Size</th>
        <th>Frequency</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>22q11.2 del</td>
        <td>DiGeorge / Velocardiofacial</td>
        <td>~3 Mb</td>
        <td style="font-weight:700; color:${mc.dark};">~1:4,000</td>
      </tr>
      <tr>
        <td>7q11.23 del</td>
        <td>Williams-Beuren syndrome</td>
        <td>~1.5 Mb</td>
        <td style="font-weight:700; color:${mc.dark};">~1:7,500</td>
      </tr>
      <tr>
        <td>1p36 del</td>
        <td>1p36 deletion syndrome</td>
        <td>Variable</td>
        <td style="font-weight:700; color:${mc.dark};">~1:5,000</td>
      </tr>
      <tr>
        <td>15q11&ndash;q13 del</td>
        <td>Prader-Willi (pat) / Angelman (mat)</td>
        <td>~5 Mb</td>
        <td style="font-weight:700; color:${mc.dark};">~1:15,000</td>
      </tr>
      <tr>
        <td>17p11.2 del</td>
        <td>Smith-Magenis syndrome</td>
        <td>~3.7 Mb</td>
        <td style="font-weight:700; color:${mc.dark};">~1:15,000</td>
      </tr>
      <tr>
        <td>7q11.23 dup</td>
        <td>7q11.23 duplication syndrome</td>
        <td>~1.5 Mb</td>
        <td style="font-weight:700; color:${mc.dark};">~1:13,000</td>
      </tr>
    </tbody>
  </table>

  <div class="card card-accent" style="margin-top:12px;">
    <div class="card-title">Parent-of-Origin Matters</div>
    <div class="card-body">15q11&ndash;q13 deletions cause Prader-Willi (paternal) or Angelman (maternal) &mdash; the <strong>same deletion</strong>, different syndrome depending on which parent&rsquo;s copy is lost. This is due to genomic imprinting.</div>
  </div>
`));

// ── Slide 9: Essential Databases & Resources ──────────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Essential Databases &amp; Resources</h1>
  <div class="section-label">Section 5 of 5</div>

  <div class="three-col" style="margin-bottom:20px;">
    <div>
      <h3 style="color:${COLORS.green}; margin-bottom:14px;">Population Data</h3>
      <div class="card card-green" style="margin-bottom:14px;">
        <div class="card-title">DGV</div>
        <div class="card-body">Database of Genomic Variants &mdash; catalog of structural variation in healthy controls</div>
      </div>
      <div class="card card-green">
        <div class="card-title">gnomAD-SV</div>
        <div class="card-body">Structural variants from &gt;10,000 genomes; population frequency data</div>
      </div>
    </div>

    <div>
      <h3 style="color:${COLORS.red}; margin-bottom:14px;">Clinical Evidence</h3>
      <div class="card card-red" style="margin-bottom:14px;">
        <div class="card-title">ClinGen</div>
        <div class="card-body">Dosage sensitivity maps with curated HI/TS scores for genes &amp; regions</div>
      </div>
      <div class="card card-red" style="margin-bottom:14px;">
        <div class="card-title">ClinVar</div>
        <div class="card-body">Aggregated variant classifications from clinical labs worldwide</div>
      </div>
      <div class="card card-red">
        <div class="card-title">DECIPHER</div>
        <div class="card-body">Patient-level CNV data with phenotype; identify similar cases</div>
      </div>
    </div>

    <div>
      <h3 style="color:${COLORS.violet}; margin-bottom:14px;">Reference</h3>
      <div class="card card-violet" style="margin-bottom:14px;">
        <div class="card-title">OMIM</div>
        <div class="card-body">Comprehensive gene-disease relationships and inheritance patterns</div>
      </div>
      <div class="card card-violet" style="margin-bottom:14px;">
        <div class="card-title">GeneReviews</div>
        <div class="card-body">Expert-authored clinical summaries for genetic conditions</div>
      </div>
      <div class="card card-violet">
        <div class="card-title">HGMD</div>
        <div class="card-body">Human Gene Mutation Database &mdash; published pathogenic variants</div>
      </div>
    </div>
  </div>
`));

// ── Slide 10: Key Takeaways ───────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 10, TOTAL, [
  {
    title: "Size alone does not determine pathogenicity",
    body: "While CNVs >3 Mb are more often pathogenic, small CNVs disrupting dosage-sensitive genes can be equally significant.",
  },
  {
    title: "CMA is first-tier for DD and congenital anomalies",
    body: "Chromosomal microarray detects clinically significant CNVs in 15\u201320% of patients with unexplained developmental delay.",
  },
  {
    title: "Use a systematic 5-step workflow",
    body: "Known syndrome → benign overlap → size/gene content → database evidence → inheritance. This ensures consistent, reproducible interpretation.",
  },
  {
    title: "Deletions and duplications require separate evaluation",
    body: "HI and TS scores are independent \u2014 a gene may be haploinsufficient but tolerate duplication. Never assume reciprocal pathogenicity.",
  },
  {
    title: "NAHR explains recurrent genomic disorders",
    body: "LCR-mediated recombination produces predictable breakpoints, enabling well-characterized syndrome diagnoses like 22q11.2 deletion.",
  },
  {
    title: "Databases are essential, not optional",
    body: "DGV, ClinGen, ClinVar, DECIPHER, and gnomAD-SV form the minimum database set for evidence-based CNV classification.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
