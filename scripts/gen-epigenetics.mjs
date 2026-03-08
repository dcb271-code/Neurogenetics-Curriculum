/**
 * scripts/gen-epigenetics.mjs
 *
 * Generates 14 clean, readable slides for the Epigenetics module:
 * Methylation, Imprinting & Uniparental Disomy.
 * Covers UPD mechanisms, imprinting disorders (PWS/AS), methylation testing,
 * and diagnostic strategies.
 *
 * Run: node scripts/gen-epigenetics.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "epigenetics";
const mc = MODULE_COLORS[MOD];
const TOTAL = 14;

const slides = [];

// ── Slide 1: Title ──────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Methylation, Imprinting & Uniparental Disomy",
  subtitle: "Epigenetic Mechanisms in Neurogenetic Disease",
  totalSlides: TOTAL,
  topics: [
    "DNA methylation & epigenetic modifications",
    "Uniparental disomy (UPD) mechanisms",
    "Genomic imprinting disorders",
    "Prader-Willi vs Angelman syndrome",
    "Methylation-based diagnostic testing",
  ],
}));

// ── Slide 2: Learning Objectives ────────────────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Learning Objectives</h1>
  <div class="section-label">What You Will Learn</div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${mc.accent};">1</div>
    <div>
      <strong style="font-size:22px;">Uniparental Disomy (UPD)</strong><br>
      <span style="font-size:19px; color:${COLORS.body};">Understand the mechanisms by which both copies of a chromosome are inherited from a single parent</span>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.green};">2</div>
    <div>
      <strong style="font-size:22px;">Methylation Studies in Clinical Diagnostics</strong><br>
      <span style="font-size:19px; color:${COLORS.body};">Know when and how to use methylation-specific testing to diagnose imprinting disorders</span>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.amber};">3</div>
    <div>
      <strong style="font-size:22px;">Maternal vs Paternal Imprinting</strong><br>
      <span style="font-size:19px; color:${COLORS.body};">Distinguish the clinical consequences of maternal versus paternal UPD and the concept of parent-of-origin gene expression</span>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.violet};">4</div>
    <div>
      <strong style="font-size:22px;">Prader-Willi &amp; Angelman Syndromes</strong><br>
      <span style="font-size:19px; color:${COLORS.body};">Recognize the paradigmatic 15q11-q13 imprinting disorders and their distinct molecular mechanisms</span>
    </div>
  </div>
`));

// ── Slide 3: Case Presentation ──────────────────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Case Presentation</h1>
  <div class="section-label">Clinical Scenario</div>

  <div class="card card-accent" style="margin-bottom:22px;">
    <div class="card-title" style="font-size:24px;">12-Month-Old Male</div>
    <div class="card-body" style="font-size:20px;">
      Referred for evaluation of poor growth, marked hypotonia, and persistent feeding difficulties since birth.
    </div>
  </div>

  <div class="two-col">
    <div>
      <div class="card card-rose">
        <div class="card-title">Initial Presentation (12 months)</div>
        <div class="card-body" style="font-size:18px;">
          &bull; Severe neonatal hypotonia<br>
          &bull; Poor suck reflex &amp; feeding difficulties<br>
          &bull; Failure to thrive<br>
          &bull; Cryptorchidism
        </div>
      </div>
    </div>

    <div>
      <div class="card card-amber">
        <div class="card-title">Follow-Up at 2 Years</div>
        <div class="card-body" style="font-size:18px;">
          &bull; Microcephaly<br>
          &bull; Global developmental delay<br>
          &bull; Onset of <strong>hyperphagia</strong><br>
          &bull; Almond-shaped eyes, small hands/feet
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Key Transition</div>
    <div class="value" style="font-size:22px;">The shift from poor feeding to hyperphagia is a classic red flag for a specific diagnosis</div>
  </div>
`));

// ── Slide 4: Epigenetic Modifications ───────────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Epigenetic Modifications</h1>
  <div class="section-label">Heritable Changes Without DNA Sequence Alteration</div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:18px;">

    <div class="card card-accent">
      <div class="card-title">DNA Methylation</div>
      <div class="card-body" style="font-size:18px;">
        Addition of methyl groups to cytosine at <strong>CpG islands</strong>. Methylated promoters silence gene expression. Maintained through cell division by DNMT1.
      </div>
    </div>

    <div class="card card-violet">
      <div class="card-title">Histone Modifications</div>
      <div class="card-body" style="font-size:18px;">
        Acetylation, methylation, and phosphorylation of histone tails regulate chromatin accessibility. Open chromatin = active genes.
      </div>
    </div>

    <div class="card card-green">
      <div class="card-title">Non-Coding RNAs</div>
      <div class="card-body" style="font-size:18px;">
        miRNAs and lncRNAs modulate gene expression post-transcriptionally. Important in neurodevelopment and synaptic plasticity.
      </div>
    </div>

    <div class="card card-amber">
      <div class="card-title">Genomic Imprinting</div>
      <div class="card-body" style="font-size:18px;">
        Parent-of-origin specific methylation causes <strong>monoallelic expression</strong>. Only the maternal or paternal allele is active at imprinted loci.
      </div>
    </div>

  </div>
`));

// ── Slide 5: Uniparental Disomy (UPD) ──────────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Uniparental Disomy (UPD)</h1>
  <div class="section-label">Both Copies of a Chromosome from One Parent</div>

  <div style="display:flex; gap:14px; margin-bottom:24px;">
    <div style="flex:1; background:${COLORS.blueLight}; border-radius:12px; padding:22px; text-align:center; border:2px solid ${COLORS.blue};">
      <div style="font-size:26px; font-weight:800; color:#1e40af;">Normal</div>
      <div style="font-size:17px; color:${COLORS.body}; margin-top:8px;">One copy from each parent<br>(biparental inheritance)</div>
    </div>
    <div style="flex:1; background:${COLORS.roseLight}; border-radius:12px; padding:22px; text-align:center; border:2px solid ${COLORS.rose};">
      <div style="font-size:26px; font-weight:800; color:${COLORS.rose};">Maternal UPD</div>
      <div style="font-size:17px; color:${COLORS.body}; margin-top:8px;">Both copies from <strong>mother</strong><br>(no paternal contribution)</div>
    </div>
    <div style="flex:1; background:${mc.light}; border-radius:12px; padding:22px; text-align:center; border:2px solid ${mc.accent};">
      <div style="font-size:26px; font-weight:800; color:${mc.dark};">Paternal UPD</div>
      <div style="font-size:17px; color:${COLORS.body}; margin-top:8px;">Both copies from <strong>father</strong><br>(no maternal contribution)</div>
    </div>
  </div>

  <h3>Mechanisms of UPD</h3>
  <div style="display:flex; gap:14px;">
    <div class="card card-accent" style="flex:1;">
      <div class="card-title" style="font-size:20px;">Trisomy Rescue</div>
      <div class="card-body" style="font-size:17px;">Trisomic embryo loses one chromosome; if the remaining two are from the same parent &rarr; UPD</div>
    </div>
    <div class="card card-red" style="flex:1;">
      <div class="card-title" style="font-size:20px;">Monosomy Rescue</div>
      <div class="card-body" style="font-size:17px;">Monosomic cell duplicates the single chromosome &rarr; isodisomy (identical copies)</div>
    </div>
    <div class="card card-green" style="flex:1;">
      <div class="card-title" style="font-size:20px;">Gamete Complementation</div>
      <div class="card-body" style="font-size:17px;">Nullisomic gamete meets disomic gamete for the same chromosome &rarr; UPD</div>
    </div>
  </div>
`));

// ── Slide 6: UPD & Pathogenic Variants ──────────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>UPD &amp; Pathogenic Variants</h1>
  <div class="section-label">Unmasking Autosomal Recessive Disease</div>

  <div class="card card-red" style="margin-bottom:24px;">
    <div class="card-title" style="font-size:24px;">Key Concept</div>
    <div class="card-body" style="font-size:20px;">
      When a carrier parent's single pathogenic variant becomes <strong>homozygous</strong> through UPD, the child develops autosomal recessive disease &mdash; even without two carrier parents.
    </div>
  </div>

  <div class="two-col">
    <div>
      <div class="card card-accent">
        <div class="card-title">Isodisomy</div>
        <div class="card-body" style="font-size:18px;">
          Two <strong>identical</strong> copies of one parental chromosome.<br>
          Any heterozygous variant in the contributing parent becomes homozygous in the child.
        </div>
      </div>
    </div>

    <div>
      <div class="card card-violet">
        <div class="card-title">Heterodisomy</div>
        <div class="card-body" style="font-size:18px;">
          Two <strong>different</strong> homologs from one parent.<br>
          Variants remain heterozygous, but imprinting effects still apply.
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Clinical Implication</div>
    <div class="value" style="font-size:22px;">Consider UPD when an AR disorder appears in a child with only one carrier parent</div>
  </div>
`));

// ── Slide 7: Imprinted Allele Effects ───────────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Imprinted Allele Effects</h1>
  <div class="section-label">Parent-of-Origin Determines Gene Expression</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div class="card card-rose">
      <div class="card-title" style="font-size:22px;">Maternal UPD</div>
      <div class="card-body" style="font-size:18px;">
        Two maternal copies present &rarr; paternally-expressed genes are <strong>absent</strong><br><br>
        Result: underproduction of proteins normally expressed only from the paternal allele
      </div>
    </div>

    <div class="card card-accent">
      <div class="card-title" style="font-size:22px;">Paternal UPD</div>
      <div class="card-body" style="font-size:18px;">
        Two paternal copies present &rarr; maternally-expressed genes are <strong>absent</strong><br><br>
        Result: underproduction of proteins normally expressed only from the maternal allele
      </div>
    </div>
  </div>

  <h3>Chromosomes with Known Imprinted Regions</h3>
  <div style="display:flex; gap:12px; flex-wrap:wrap;">
    <div style="background:${mc.light}; border:2px solid ${mc.accent}; border-radius:10px; padding:14px 22px; text-align:center;">
      <div style="font-size:28px; font-weight:800; color:${mc.dark};">Chr 6</div>
    </div>
    <div style="background:${COLORS.greenLight}; border:2px solid ${COLORS.green}; border-radius:10px; padding:14px 22px; text-align:center;">
      <div style="font-size:28px; font-weight:800; color:#166534;">Chr 7</div>
    </div>
    <div style="background:${COLORS.amberLight}; border:2px solid ${COLORS.amber}; border-radius:10px; padding:14px 22px; text-align:center;">
      <div style="font-size:28px; font-weight:800; color:#92400e;">Chr 11</div>
    </div>
    <div style="background:${COLORS.roseLight}; border:2px solid ${COLORS.rose}; border-radius:10px; padding:14px 22px; text-align:center;">
      <div style="font-size:28px; font-weight:800; color:${COLORS.rose};">Chr 14</div>
    </div>
    <div style="background:${COLORS.violetLight}; border:2px solid ${COLORS.violet}; border-radius:10px; padding:14px 22px; text-align:center;">
      <div style="font-size:28px; font-weight:800; color:${COLORS.violet};">Chr 15</div>
    </div>
    <div style="background:${COLORS.blueLight}; border:2px solid ${COLORS.blue}; border-radius:10px; padding:14px 22px; text-align:center;">
      <div style="font-size:28px; font-weight:800; color:#1e40af;">Chr 20</div>
    </div>
  </div>
`));

// ── Slide 8: UPD Testing Methods ────────────────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>UPD Testing Methods</h1>
  <div class="section-label">Diagnostic Approaches</div>

  <table>
    <thead>
      <tr>
        <th style="width:28%;">Method</th>
        <th style="width:38%;">What It Detects</th>
        <th style="width:34%;">Limitations</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>STR Multiplex PCR</td>
        <td>Parental origin of alleles via microsatellite markers</td>
        <td>Requires parental samples; limited informativeness</td>
      </tr>
      <tr>
        <td>CMA (SNP array)</td>
        <td>Regions of homozygosity (ROH) suggesting isodisomy</td>
        <td>Cannot detect heterodisomy; cannot confirm parent of origin alone</td>
      </tr>
      <tr>
        <td>SNP Trio Analysis</td>
        <td>Parent-of-origin assignment using child + both parents</td>
        <td>Requires both parental samples</td>
      </tr>
      <tr>
        <td>Methylation-Specific PCR</td>
        <td>Imprinting status at specific loci (e.g., 15q11)</td>
        <td>Locus-specific; does not identify mechanism</td>
      </tr>
      <tr>
        <td>MS-MLPA</td>
        <td>Copy number + methylation at imprinted loci simultaneously</td>
        <td>Limited to targeted regions with available probe sets</td>
      </tr>
    </tbody>
  </table>
`, `
  tbody td { font-size:16px; padding:12px 18px; }
  thead th { font-size:15px; padding:12px 18px; }
`));

// ── Slide 9: SNP Microarray Result ──────────────────────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>SNP Microarray Result</h1>
  <div class="section-label">Case Follow-Up</div>

  <div class="highlight-box" style="margin-bottom:24px;">
    <div class="label">CMA Finding</div>
    <div class="value" style="font-size:26px;">15q11.2&ndash;q13.1 &nbsp; Region of Homozygosity &nbsp; (4.7 Mb)</div>
  </div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title">Significance</div>
        <div class="card-body" style="font-size:18px;">
          &bull; 15q11-q13 is a known <strong>imprinted region</strong><br>
          &bull; ROH at an imprinted locus raises concern for UPD<br>
          &bull; Must determine <strong>parent of origin</strong> to establish diagnosis
        </div>
      </div>
    </div>

    <div>
      <div class="card card-red" style="margin-bottom:16px;">
        <div class="card-title">Next Steps Required</div>
        <div class="card-body" style="font-size:18px;">
          &bull; Methylation-specific testing to assess imprinting status<br>
          &bull; Parental studies to determine maternal vs paternal origin<br>
          &bull; Clinical correlation with phenotype
        </div>
      </div>
    </div>
  </div>

  <div class="card card-violet">
    <div class="card-title">Interpretation Note</div>
    <div class="card-body" style="font-size:18px;">
      ROH on CMA alone cannot distinguish UPD from consanguinity or identity by descent. The imprinted status of 15q makes this finding clinically actionable.
    </div>
  </div>
`));

// ── Slide 10: Prader-Willi vs Angelman ──────────────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Prader-Willi vs Angelman</h1>
  <div class="section-label">The 15q11-q13 Imprinting Paradigm</div>

  <div class="two-col">
    <div class="card card-accent" style="height:100%;">
      <div class="card-title" style="font-size:24px;">Prader-Willi Syndrome</div>
      <div class="card-body" style="font-size:17px; margin-top:4px;">
        <strong>Cause:</strong> Loss of paternal 15q11-q13<br>
        (maternal UPD or paternal deletion)<br><br>
        <strong>Features:</strong><br>
        &bull; Neonatal hypotonia &rarr; hyperphagia<br>
        &bull; Intellectual disability<br>
        &bull; Short stature &amp; obesity<br>
        &bull; Hypogonadism<br>
        &bull; Behavioral issues (tantrums, OCD)
      </div>
    </div>

    <div class="card card-rose" style="height:100%;">
      <div class="card-title" style="font-size:24px;">Angelman Syndrome</div>
      <div class="card-body" style="font-size:17px; margin-top:4px;">
        <strong>Cause:</strong> Loss of maternal 15q11-q13<br>
        (paternal UPD or maternal deletion)<br><br>
        <strong>Features:</strong><br>
        &bull; Severe seizures (often refractory)<br>
        &bull; Ataxia &amp; movement disorder<br>
        &bull; Absent or minimal speech<br>
        &bull; Happy demeanor &amp; frequent laughter<br>
        &bull; Microcephaly
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Same Region, Opposite Phenotypes</div>
    <div class="value" style="font-size:20px;">PWS = loss of paternally expressed genes &nbsp;|&nbsp; AS = loss of maternally expressed UBE3A</div>
  </div>
`));

// ── Slide 11: Case Diagnosis ────────────────────────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Case Diagnosis</h1>
  <div class="section-label">Methylation Testing Results</div>

  <div class="highlight-box" style="margin-bottom:24px;">
    <div class="label">Confirmed Diagnosis</div>
    <div class="value" style="font-size:28px;">Prader-Willi Syndrome &mdash; Maternal UPD 15</div>
  </div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="margin-bottom:14px;">
        <div class="card-title">Methylation-Specific PCR</div>
        <div class="card-body" style="font-size:18px;">
          Only <strong>maternal methylation pattern</strong> detected at 15q11-q13<br><br>
          Absence of the unmethylated (paternal) band confirms loss of paternal contribution
        </div>
      </div>
    </div>

    <div>
      <div class="card card-green" style="margin-bottom:14px;">
        <div class="card-title">Mechanism in This Case</div>
        <div class="card-body" style="font-size:18px;">
          SNP array showed ROH at 15q &rarr; consistent with <strong>maternal isodisomy</strong><br><br>
          No deletion detected on CMA &rarr; rules out the more common deletion mechanism
        </div>
      </div>
    </div>
  </div>

  <div class="card card-violet">
    <div class="card-title">Clinical Correlation</div>
    <div class="card-body" style="font-size:18px;">
      Neonatal hypotonia &rarr; feeding difficulties &rarr; hyperphagia by age 2 &mdash; the classic PWS trajectory. Cryptorchidism supports hypogonadism.
    </div>
  </div>
`));

// ── Slide 12: PWS Molecular Mechanisms ──────────────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>PWS Molecular Mechanisms</h1>
  <div class="section-label">All Roads Lead to Loss of Paternal 15q11-q13 Expression</div>

  <div style="display:flex; gap:14px; margin-bottom:24px;">
    <div class="stat-card" style="background:${mc.light}; border-color:${mc.accent}; flex:1;">
      <div class="stat-label">Paternal Deletion</div>
      <div class="stat-value">60&ndash;70%</div>
    </div>
    <div class="stat-card" style="background:${COLORS.roseLight}; border-color:${COLORS.rose}; flex:1;">
      <div class="stat-label">Maternal UPD</div>
      <div class="stat-value">25&ndash;30%</div>
    </div>
    <div class="stat-card" style="background:${COLORS.amberLight}; border-color:${COLORS.amber}; flex:1;">
      <div class="stat-label">Imprinting Center Defect</div>
      <div class="stat-value">2&ndash;5%</div>
    </div>
    <div class="stat-card" style="background:${COLORS.violetLight}; border-color:${COLORS.violet}; flex:1;">
      <div class="stat-label">Balanced Translocation</div>
      <div class="stat-value">&lt; 1%</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">Common Endpoint</div>
      <div class="card-body" style="font-size:18px;">
        All mechanisms result in absence of paternally expressed genes at 15q11-q13, including <strong>SNRPN</strong>, <strong>MAGEL2</strong>, <strong>NDN</strong>, and the snoRNA cluster.
      </div>
    </div>

    <div class="card card-red">
      <div class="card-title">Recurrence Risk Varies</div>
      <div class="card-body" style="font-size:18px;">
        Deletion &amp; UPD: <strong>&lt; 1%</strong> recurrence<br>
        Imprinting center defect: up to <strong>50%</strong> if inherited<br>
        Translocation: depends on carrier status
      </div>
    </div>
  </div>
`));

// ── Slide 13: Clinical Pearl — Testing Strategy ─────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Testing Strategy</h1>
  <div class="section-label">Clinical Pearl &mdash; Diagnostic Approach for 15q11-q13</div>

  <div class="card card-green" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:24px;">Methylation Testing is the Single Best First Test</div>
    <div class="card-body" style="font-size:20px;">
      Detects the PWS/AS methylation pattern regardless of underlying mechanism (deletion, UPD, or imprinting center defect). Sensitivity &gt; 99%.
    </div>
  </div>

  <div style="display:flex; gap:14px; margin-bottom:20px;">
    <div class="card card-accent" style="flex:1;">
      <div class="card-title" style="font-size:20px;">CMA (Chromosomal Microarray)</div>
      <div class="card-body" style="font-size:17px;">
        Detects deletions <strong>and</strong> regions of homozygosity (ROH) that suggest UPD. Often the initial test ordered.
      </div>
    </div>

    <div class="card card-violet" style="flex:1;">
      <div class="card-title" style="font-size:20px;">Follow-Up Testing</div>
      <div class="card-body" style="font-size:17px;">
        If methylation is abnormal but no deletion on CMA: proceed to <strong>UPD studies</strong> (STR or SNP trio analysis) to confirm mechanism.
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Remember</div>
    <div class="value" style="font-size:22px;">CMA showing ROH at an imprinted locus should always trigger UPD evaluation and methylation testing</div>
  </div>
`));

// ── Slide 14: Key Takeaways ─────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 14, TOTAL, [
  {
    title: "Epigenetic modifications regulate gene expression",
    body: "DNA methylation, histone modifications, and non-coding RNAs alter gene expression without changing the underlying DNA sequence.",
  },
  {
    title: "UPD can unmask recessive disease or cause imprinting disorders",
    body: "Both copies from one parent can make a carrier\u2019s variant homozygous (AR disease) or disrupt parent-of-origin gene expression.",
  },
  {
    title: "15q11-q13 is the paradigm for imprinting disorders",
    body: "Loss of paternal expression causes Prader-Willi syndrome; loss of maternal UBE3A expression causes Angelman syndrome.",
  },
  {
    title: "Methylation testing is the best diagnostic test",
    body: "Methylation-specific PCR or MS-MLPA detects >99% of PWS/AS cases regardless of the underlying molecular mechanism.",
  },
  {
    title: "CMA with ROH should trigger UPD evaluation",
    body: "Regions of homozygosity at imprinted loci on chromosomal microarray are clinically actionable and require follow-up testing.",
  },
]));

// ── Render ───────────────────────────────────────────────────────────────────
await renderSlides("epigenetics", slides);
