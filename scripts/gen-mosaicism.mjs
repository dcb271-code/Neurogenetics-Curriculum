/**
 * scripts/gen-mosaicism.mjs
 *
 * Generates 15 slides for the Mosaicism module aligned to JSON sections:
 *   S0 (slides 1-3): Mechanisms and Origins of Mosaicism
 *   S1 (slides 4-6): Chromosomal Mosaicism
 *   S2 (slides 7-9): Somatic Mosaicism and Neurological Disease
 *   S3 (slides 10-12): Germline Mosaicism: Clinical and Counseling Implications
 *   S4 (slides 13-15): Diagnostic Approaches for Mosaicism Detection
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
const TOTAL = 15;

const slides = [];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION 0: Mechanisms and Origins of Mosaicism (slides 1-3)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Slide 1: Title ──────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Mosaicism in Neurogenetics",
  subtitle: "Mechanisms, chromosomal & somatic mosaicism, germline counseling, and diagnostic approaches",
  totalSlides: TOTAL,
  topics: [
    "Mechanisms & origins of mosaicism",
    "Chromosomal mosaicism",
    "Somatic mosaicism in neurological disease",
    "Germline mosaicism & counseling",
    "Diagnostic approaches for detection",
  ],
}));

// ── Slide 2: How Mosaicism Arises ───────────────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>How Mosaicism Arises</h1>
  <div class="section-label">Mechanisms &amp; Origins of Mosaicism</div>

  <div class="card card-accent" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:31px;">Postzygotic Mutations</div>
    <div class="card-body" style="font-size:27px;">
      Mosaicism arises when a mutation occurs <strong>after fertilization</strong>, creating a subpopulation of genetically distinct cells. The mutation can be a chromosomal non-disjunction, single nucleotide variant, CNV, or epigenetic change.
    </div>
  </div>

  <div class="two-col" style="margin-bottom:16px;">
    <div class="card card-red">
      <div class="card-title">Somatic Mosaicism</div>
      <div class="card-body" style="font-size:25px;">
        Mutant cells confined to <strong>somatic tissues</strong><br><br>
        Offspring cannot inherit the variant unless gonads are also involved<br><br>
        Detectable only in affected tissue
      </div>
    </div>
    <div class="card card-amber">
      <div class="card-title">Germline (Gonadal) Mosaicism</div>
      <div class="card-body" style="font-size:25px;">
        Mutation restricted to <strong>germ cells</strong><br><br>
        Parent is phenotypically normal but can transmit to multiple children<br><br>
        <strong>Most dangerous for recurrence counseling</strong>
      </div>
    </div>
  </div>
`));

// ── Slide 3: Timing Determines Distribution ─────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Timing Determines Distribution</h1>
  <div class="section-label">Mechanisms &amp; Origins of Mosaicism</div>

  <div style="font-size:29px; margin-bottom:22px; color:${COLORS.body};">
    The <strong>earlier</strong> the postzygotic mutation, the <strong>larger</strong> the proportion of affected cells and the more widespread its tissue distribution.
  </div>

  <div style="display:flex; gap:16px; margin-bottom:22px;">
    <div class="card card-red" style="flex:1;">
      <div class="card-title" style="font-size:28px;">Very Early (1-3 divisions)</div>
      <div class="card-body" style="font-size:24px;">
        Affects all three germ layers<br><br>
        Widespread distribution<br><br>
        Higher VAF in all tissues
      </div>
    </div>
    <div class="card card-amber" style="flex:1;">
      <div class="card-title" style="font-size:28px;">Intermediate</div>
      <div class="card-body" style="font-size:24px;">
        Affects 1-2 germ layers<br><br>
        Regional distribution<br><br>
        Moderate VAF in selected tissues
      </div>
    </div>
    <div class="card card-accent" style="flex:1;">
      <div class="card-title" style="font-size:28px;">Late / Tissue-Specific</div>
      <div class="card-body" style="font-size:24px;">
        Confined to single tissue<br><br>
        Focal distribution<br><br>
        Low VAF, may be undetectable in blood
      </div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-green">
      <div class="card-title">Reversion Mosaicism</div>
      <div class="card-body" style="font-size:24px;">A second postzygotic event <strong>corrects</strong> the original mutation in a subset of cells. Seen in immunodeficiencies and skin disorders.</div>
    </div>
    <div class="card card-violet">
      <div class="card-title">VAF &ne; Severity</div>
      <div class="card-body" style="font-size:24px;">Variant allele fraction varies by tissue and does <strong>not reliably predict</strong> phenotypic severity on its own.</div>
    </div>
  </div>
`));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION 1: Chromosomal Mosaicism (slides 4-6)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Slide 4: Mosaic Aneuploidies ────────────────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Mosaic Aneuploidies</h1>
  <div class="section-label">Chromosomal Mosaicism</div>

  <div style="font-size:29px; margin-bottom:20px; color:${COLORS.body};">
    Mitotic non-disjunction generates cell lines with abnormal chromosome number alongside a normal diploid line. Phenotype depends on chromosome, cell proportion, and tissue distribution.
  </div>

  <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px;">
    <div class="card card-accent">
      <div class="card-title" style="font-size:28px;">Mosaic Turner (45,X/46,XX)</div>
      <div class="card-body" style="font-size:24px;">
        15-20% of Turner cases<br><br>
        Often <strong>milder</strong> ovarian insufficiency and fewer somatic features<br><br>
        45,X line in gonads drives ovarian failure
      </div>
    </div>
    <div class="card card-rose">
      <div class="card-title" style="font-size:28px;">Mosaic Down (47,+21/46,N)</div>
      <div class="card-body" style="font-size:24px;">
        ~2% of Down syndrome cases<br><br>
        IQ often higher than constitutional trisomy 21, but substantial overlap<br><br>
        Phenotype <strong>cannot be predicted</strong> from % mosaic
      </div>
    </div>
    <div class="card card-amber">
      <div class="card-title" style="font-size:28px;">Trisomy 8 Mosaicism</div>
      <div class="card-body" style="font-size:24px;">
        Constitutional trisomy 8 is typically lethal<br><br>
        Mosaicism: ID, skeletal anomalies, camptodactyly, deep palmar furrows<br><br>
        Characteristic phenotype
      </div>
    </div>
  </div>
`));

// ── Slide 5: Confined Placental Mosaicism ───────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Confined Placental Mosaicism</h1>
  <div class="section-label">Chromosomal Mosaicism</div>

  <div class="card card-red" style="margin-bottom:22px;">
    <div class="card-title" style="font-size:31px;">CVS vs Amniocentesis</div>
    <div class="card-body" style="font-size:27px;">
      <strong>Confined placental mosaicism (CPM)</strong>: chromosomal abnormality restricted to the placenta with a normal embryo. Accounts for <strong>false-positive CVS results</strong> &mdash; amniocentesis is required to distinguish CPM from true fetal mosaicism.
    </div>
  </div>

  <div class="two-col" style="margin-bottom:20px;">
    <div class="card card-accent">
      <div class="card-title">CVS (Chorionic Villus Sampling)</div>
      <div class="card-body" style="font-size:25px;">
        Samples <strong>trophoblast</strong> (placental tissue)<br><br>
        May detect chromosomal abnormalities present only in placenta<br><br>
        Mosaicism found in ~1-2% of CVS samples
      </div>
    </div>
    <div class="card card-green">
      <div class="card-title">Amniocentesis</div>
      <div class="card-body" style="font-size:25px;">
        Samples <strong>amniocytes</strong> (fetal origin)<br><br>
        More accurately reflects fetal karyotype<br><br>
        Required to confirm or exclude true fetal mosaicism after abnormal CVS
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Clinical Impact of CPM</div>
    <div class="value" style="font-size:31px;">CPM can cause intrauterine growth restriction even when the fetus is chromosomally normal</div>
  </div>
`));

// ── Slide 6: Ring Chromosomes & Blood Karyotype Limitations ─────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Chromosomal Mosaicism: Key Principles</h1>
  <div class="section-label">Chromosomal Mosaicism</div>

  <div class="card card-accent" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:31px;">Blood Karyotype May Not Reflect Brain or Gonadal Populations</div>
    <div class="card-body" style="font-size:27px;">
      Mosaicism typically produces a <strong>milder phenotype</strong> than the constitutional aneuploidy, but phenotypic prediction from blood karyotype alone is <strong>unreliable</strong> because different tissues may have different proportions of abnormal cells.
    </div>
  </div>

  <div class="two-col" style="margin-bottom:16px;">
    <div class="card card-amber">
      <div class="card-title">Ring Chromosomes</div>
      <div class="card-body" style="font-size:25px;">
        Frequently mosaic &mdash; ring stability during mitosis varies<br><br>
        Produces a mix of ring-bearing and monosomic cells<br><br>
        Phenotype depends on ring stability and gene content
      </div>
    </div>
    <div class="card card-violet">
      <div class="card-title">Key Counseling Point</div>
      <div class="card-body" style="font-size:25px;">
        Mosaic karyotype result <strong>cannot predict severity</strong><br><br>
        Blood % mosaic does not equal brain % mosaic<br><br>
        Organ-specific mosaicism requires tissue-specific testing
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Remember</div>
    <div class="value" style="font-size:31px;">Mosaicism = milder phenotype is a generalization, not a rule &mdash; tissue distribution matters more than percentage</div>
  </div>
`));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION 2: Somatic Mosaicism and Neurological Disease (slides 7-9)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Slide 7: Brain Somatic Mosaicism & mTOR ─────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Brain Somatic Mosaicism</h1>
  <div class="section-label">Somatic Mosaicism &amp; Neurological Disease</div>

  <div class="card card-accent" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:31px;">mTOR Pathway Somatic Mutations</div>
    <div class="card-body" style="font-size:27px;">
      Somatic mutations in neural progenitors during cortical neurogenesis cause <strong>focal cortical dysplasia</strong> (FCD type II) and <strong>hemimegalencephaly</strong>. Present only in a fraction of brain cells &mdash; often absent from blood.
    </div>
  </div>

  <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px;">
    <div class="card card-red">
      <div class="card-title" style="font-size:28px;">Gain-of-Function</div>
      <div class="card-body" style="font-size:24px;">
        <strong>PIK3CA, MTOR, AKT3</strong><br><br>
        Direct hyperactivation of mTOR signaling<br><br>
        VAF often 1-20% in resected tissue
      </div>
    </div>
    <div class="card card-amber">
      <div class="card-title" style="font-size:28px;">Two-Hit Model (LOF)</div>
      <div class="card-body" style="font-size:24px;">
        <strong>TSC1/TSC2</strong>: germline first hit + somatic second hit in tubers<br><br>
        Explains focal lesions in otherwise normal brain
      </div>
    </div>
    <div class="card card-green">
      <div class="card-title" style="font-size:28px;">Detection</div>
      <div class="card-body" style="font-size:24px;">
        Requires <strong>&gt;500x depth</strong> on resected brain tissue<br><br>
        Standard blood panels at 30x depth <strong>cannot</strong> detect these variants
      </div>
    </div>
  </div>
`));

// ── Slide 8: FCD & Hemimegalencephaly Spectrum ──────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>FCD &amp; Hemimegalencephaly Spectrum</h1>
  <div class="section-label">Somatic Mosaicism &amp; Neurological Disease</div>

  <div style="font-size:29px; margin-bottom:20px; color:${COLORS.body};">
    The <strong>timing</strong> of the somatic mutation during corticogenesis determines the extent and severity of the malformation.
  </div>

  <div style="display:flex; gap:16px; margin-bottom:22px;">
    <div class="card card-red" style="flex:1;">
      <div class="card-title" style="font-size:28px;">Early &rarr; Hemimegalencephaly</div>
      <div class="card-body" style="font-size:24px;">
        Early progenitor cell<br>
        Large territory affected<br>
        <strong>VAF 15-30%</strong> in tissue<br>
        Severe epilepsy, hemiparesis
      </div>
    </div>
    <div class="card card-amber" style="flex:1;">
      <div class="card-title" style="font-size:28px;">Intermediate &rarr; Multilobar FCD</div>
      <div class="card-body" style="font-size:24px;">
        Regional progenitor<br>
        Moderate territory<br>
        <strong>VAF 5-15%</strong><br>
        Drug-resistant focal epilepsy
      </div>
    </div>
    <div class="card card-accent" style="flex:1;">
      <div class="card-title" style="font-size:28px;">Late &rarr; Focal FCD</div>
      <div class="card-body" style="font-size:24px;">
        Late progenitor<br>
        Small territory<br>
        <strong>VAF 1-5%</strong><br>
        Focal seizures, may be subtle on MRI
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Key Principle</div>
    <div class="value" style="font-size:31px;">Earlier mutation = larger territory = more severe phenotype = higher VAF in tissue</div>
  </div>
`));

// ── Slide 9: Sturge-Weber & Other Somatic Disorders ─────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Sturge-Weber &amp; Other Somatic Disorders</h1>
  <div class="section-label">Somatic Mosaicism &amp; Neurological Disease</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div class="card card-red">
      <div class="card-title" style="font-size:31px;">Sturge-Weber Syndrome</div>
      <div class="card-body" style="font-size:25px;">
        Somatic <strong>GNAQ p.R183Q</strong> in cephalic neural crest cells<br><br>
        Leptomeningeal angioma, port-wine stain, epilepsy, glaucoma<br><br>
        VAF ~10-15% in brain endothelium; <strong>absent from blood</strong> in most cases
      </div>
    </div>
    <div class="card card-amber">
      <div class="card-title" style="font-size:31px;">McCune-Albright Syndrome</div>
      <div class="card-body" style="font-size:25px;">
        Somatic <strong>GNAS</strong> activating mutation<br><br>
        Fibrous dysplasia, caf&eacute;-au-lait spots, precocious puberty<br><br>
        Severity correlates with proportion of affected cells
      </div>
    </div>
  </div>

  <div class="card card-accent">
    <div class="card-title" style="font-size:28px;">Clinical Implication</div>
    <div class="card-body" style="font-size:27px;">
      A <strong>negative blood/saliva genetic test does NOT exclude</strong> a somatic variant. The right tissue at the right sequencing depth is essential. Standard panels test the wrong tissue at insufficient depth for somatic detection.
    </div>
  </div>
`));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION 3: Germline Mosaicism (slides 10-12)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Slide 10: Germline Mosaicism Explained ──────────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Germline Mosaicism</h1>
  <div class="section-label">Germline Mosaicism: Clinical &amp; Counseling Implications</div>

  <div class="card card-red" style="margin-bottom:22px;">
    <div class="card-title" style="font-size:31px;">The Hidden Carrier</div>
    <div class="card-body" style="font-size:27px;">
      A clinically <strong>normal parent</strong> has a pathogenic variant enriched in germ cells but absent (or very low-level) in somatic tissues. This explains why a second affected child can be born to unaffected parents of a child with a supposedly <strong>de novo</strong> condition.
    </div>
  </div>

  <div class="two-col" style="margin-bottom:16px;">
    <div class="card card-accent">
      <div class="card-title">Cannot Be Detected in Blood</div>
      <div class="card-body" style="font-size:25px;">
        Germline mosaicism is undetectable by standard blood DNA sequencing<br><br>
        Only direct analysis of gonadal tissue (biopsy, sperm) reveals the mutation<br><br>
        Parent appears completely unaffected
      </div>
    </div>
    <div class="card card-amber">
      <div class="card-title">Recurrence Risk is NOT Zero</div>
      <div class="card-body" style="font-size:25px;">
        Empirical risk: <strong>1-4%</strong> per pregnancy for most neurodevelopmental conditions<br><br>
        Can be much higher: up to <strong>10-20%</strong> for some OI families<br><br>
        Always counsel about this possibility
      </div>
    </div>
  </div>
`));

// ── Slide 11: Disease Examples ──────────────────────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Germline Mosaicism: Disease Examples</h1>
  <div class="section-label">Germline Mosaicism: Clinical &amp; Counseling Implications</div>

  <table style="margin-bottom:22px;">
    <thead>
      <tr>
        <th style="width:22%;">Condition</th>
        <th style="width:18%;">Gene</th>
        <th style="width:30%;">Germline Mosaicism Rate</th>
        <th style="width:30%;">Recurrence Risk</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Duchenne MD</td>
        <td>DMD</td>
        <td>~10% of apparently de novo deletions</td>
        <td>7-14% per pregnancy</td>
      </tr>
      <tr>
        <td>Rett Syndrome</td>
        <td>MECP2</td>
        <td>De novo in &gt;99%, but recurrence documented</td>
        <td>~0.5-1%</td>
      </tr>
      <tr>
        <td>Osteogenesis Imperfecta</td>
        <td>COL1A1/A2</td>
        <td>Well-documented parental mosaicism</td>
        <td>Up to 10-20%</td>
      </tr>
      <tr>
        <td>Rasopathies</td>
        <td>Various</td>
        <td>Documented in multiple RAS pathway genes</td>
        <td>1-4% estimated</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:31px;">CK levels and carrier testing of maternal siblings are important in DMD &mdash; germline mosaicism accounts for ~10% of apparently de novo cases</div>
  </div>
`));

// ── Slide 12: Testing Parents & Reproductive Options ────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>Testing Parents &amp; Reproductive Options</h1>
  <div class="section-label">Germline Mosaicism: Clinical &amp; Counseling Implications</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div class="card card-accent">
      <div class="card-title" style="font-size:28px;">Parental Testing Strategy</div>
      <div class="card-body" style="font-size:25px;">
        <strong>1.</strong> Standard sequencing of parental blood &mdash; may detect low-level somatic+germline mosaicism<br><br>
        <strong>2.</strong> Deep sequencing (&gt;500x) of parental blood for the specific variant<br><br>
        <strong>3.</strong> Sperm analysis (for paternal mosaicism) &mdash; directly tests germline<br><br>
        <strong>4.</strong> Negative parental testing does NOT exclude germline mosaicism
      </div>
    </div>
    <div class="card card-green">
      <div class="card-title" style="font-size:28px;">Reproductive Options</div>
      <div class="card-body" style="font-size:25px;">
        <strong>PGT-M:</strong> Preimplantation genetic testing for monogenic disorders &mdash; tests embryos before transfer<br><br>
        <strong>Prenatal diagnosis:</strong> CVS or amniocentesis for known familial variant<br><br>
        Both are important options for families with known or suspected germline mosaicism
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Counseling Principle</div>
    <div class="value" style="font-size:31px;">Never quote 0% recurrence risk for apparently de novo dominant conditions &mdash; germline mosaicism is always a possibility</div>
  </div>
`));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION 4: Diagnostic Approaches for Mosaicism Detection (slides 13-15)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Slide 13: Detection Methods & VAF Thresholds ────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Detection Methods &amp; VAF Thresholds</h1>
  <div class="section-label">Diagnostic Approaches for Mosaicism Detection</div>

  <table style="margin-bottom:22px;">
    <thead>
      <tr>
        <th style="width:28%;">Method</th>
        <th style="width:20%;">Depth / Resolution</th>
        <th style="width:22%;">VAF Detection Limit</th>
        <th style="width:30%;">Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Standard NGS (Panel/Exome)</td>
        <td>50-100x</td>
        <td>10-15%</td>
        <td>Designed for germline variants; misses low-level mosaicism</td>
      </tr>
      <tr>
        <td>Ultra-Deep Sequencing</td>
        <td>500-2000x</td>
        <td>0.5-1%</td>
        <td>Requires somatic variant calling pipelines</td>
      </tr>
      <tr>
        <td>Droplet Digital PCR</td>
        <td>N/A (partitioning)</td>
        <td>0.01-0.1%</td>
        <td>Gold standard for quantifying known variants</td>
      </tr>
      <tr>
        <td>CMA (SNP array)</td>
        <td>BAF analysis</td>
        <td>10-20% (CNV)</td>
        <td>Oligo arrays less sensitive for low-level mosaicism</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box">
    <div class="label">Key Point</div>
    <div class="value" style="font-size:31px;">ddPCR is the gold standard for quantifying known variants at very low VAF (0.01-0.1%)</div>
  </div>
`));

// ── Slide 14: Tissue Selection Hierarchy ────────────────────────────────────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>Tissue Selection for Mosaicism Detection</h1>
  <div class="section-label">Diagnostic Approaches for Mosaicism Detection</div>

  <div class="card card-red" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:31px;">Tissue Selection is Paramount</div>
    <div class="card-body" style="font-size:27px;">
      Testing blood may miss variants confined to brain or skin. Testing buccal cells may miss blood-specific mosaicism. <strong>Testing multiple tissues increases detection sensitivity.</strong>
    </div>
  </div>

  <div class="two-col" style="margin-bottom:16px;">
    <div class="card card-accent">
      <div class="card-title" style="font-size:28px;">Brain Disorders</div>
      <div class="card-body" style="font-size:25px;">
        <strong>Preferred hierarchy:</strong><br><br>
        1. Resected epilepsy tissue (best)<br>
        2. Saliva (mixed ectodermal origin)<br>
        3. Buccal cells<br>
        4. Blood (least informative)
      </div>
    </div>
    <div class="card card-amber">
      <div class="card-title" style="font-size:28px;">Skin Disorders</div>
      <div class="card-body" style="font-size:25px;">
        <strong>Preferred:</strong> Affected skin biopsy<br><br>
        Unaffected skin may or may not carry the variant<br><br>
        Blood testing often negative for skin-restricted mosaicism
      </div>
    </div>
  </div>

  <div class="card card-green">
    <div class="card-title">Practical Approach</div>
    <div class="card-body" style="font-size:25px;">
      When mosaicism is suspected: test the <strong>affected tissue</strong> first, at the <strong>highest available depth</strong>. If positive, quantify with ddPCR. If negative, consider additional tissue sources before excluding a genetic cause.
    </div>
  </div>
`));

// ── Slide 15: Key Takeaways ─────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 15, TOTAL, [
  {
    title: "Timing determines distribution and severity",
    body: "Earlier postzygotic mutations affect more cells and tissues. The same gene can cause hemimegalencephaly (early) or focal cortical dysplasia (late).",
  },
  {
    title: "Chromosomal mosaicism is milder but unpredictable",
    body: "Mosaic trisomy and Turner are milder than constitutional forms, but blood karyotype percentage does not predict brain or gonadal involvement.",
  },
  {
    title: "Somatic brain variants require tissue-specific deep sequencing",
    body: "PIK3CA, MTOR, GNAQ somatic mutations are invisible to blood testing. Resected brain tissue at >500x depth is needed for detection.",
  },
  {
    title: "Germline mosaicism means recurrence risk is never zero",
    body: "A normal parent can transmit a variant to multiple children via mosaic germ cells. DMD mosaicism recurrence risk can reach 7-14%.",
  },
  {
    title: "Choose the right test AND the right tissue",
    body: "ddPCR detects VAF as low as 0.01%. For brain disorders: resected tissue > saliva > buccal > blood. Multiple tissues increase sensitivity.",
  },
]));

// ── Render ───────────────────────────────────────────────────────────────────
await renderSlides("mosaicism", slides);
