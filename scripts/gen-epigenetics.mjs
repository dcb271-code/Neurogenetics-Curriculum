/**
 * scripts/gen-epigenetics.mjs
 *
 * Generates 15 slides for the Epigenetics module aligned to JSON sections:
 *   S0 (slides 1-3): Epigenetic Mechanisms: An Overview
 *   S1 (slides 4-6): Histone Modifications and Chromatin Remodeling
 *   S2 (slides 7-9): Genomic Imprinting
 *   S3 (slides 10-12): X-Chromosome Inactivation and Mosaicism
 *   S4 (slides 13-15): Methylation in Clinical Diagnostics
 *
 * Run: node scripts/gen-epigenetics.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS, imageDataUri,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "epigenetics";
const mc = MODULE_COLORS[MOD];
const TOTAL = 15;

// ── Sourced image data URIs ──────────────────────────────────────────────
const epigeneticMechanismsImg = imageDataUri("public/images/sourced/epigenetic-mechanisms.jpg");
const dnaMethylationImg = imageDataUri("public/images/sourced/dna-methylation.png");

const slides = [];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION 0: Epigenetic Mechanisms: An Overview (slides 1-3)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Slide 1: Title ──────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Epigenetics & Methylation in Neurological Disease",
  subtitle: "DNA methylation, histone modifications, imprinting, XCI, and clinical diagnostics",
  totalSlides: TOTAL,
  topics: [
    "Epigenetic mechanisms overview",
    "Histone modifications & chromatin remodeling",
    "Genomic imprinting (PWS, AS, BWS)",
    "X-chromosome inactivation & mosaicism",
    "Methylation-based clinical diagnostics",
  ],
}));

// ── Slide 2: DNA Methylation Fundamentals ───────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>DNA Methylation Fundamentals</h1>
  <div class="section-label">Epigenetic Mechanisms: An Overview</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title">CpG Islands &amp; Gene Silencing</div>
        <div class="card-body" style="font-size:18px;">
          Methyl groups added to cytosine at <strong>CpG dinucleotides</strong>. CpG islands at ~70% of gene promoters are normally unmethylated.<br><br>
          <strong>Promoter hypermethylation</strong> recruits methyl-binding proteins &amp; HDACs &rarr; condensed chromatin &rarr; gene silencing.
        </div>
      </div>
      <div class="card card-green" style="margin-bottom:16px;">
        <div class="card-title">Four Major Epigenetic Mechanisms</div>
        <div class="card-body" style="font-size:18px;">
          <strong>1.</strong> DNA methylation<br>
          <strong>2.</strong> Histone modifications<br>
          <strong>3.</strong> Chromatin remodeling<br>
          <strong>4.</strong> Non-coding RNA regulation<br><br>
          All are <strong>reversible</strong> &mdash; attractive therapeutic targets.
        </div>
      </div>
    </div>
    <div>
      <div class="image-panel" style="margin-bottom:16px;">
        <img src="${dnaMethylationImg}" style="width:100%; height:auto; max-height:400px; object-fit:contain; padding:12px; background:white;" />
        <div class="image-caption">DNA Methylation at CpG Sites <span class="image-credit">&mdash; CC BY-SA 4.0</span></div>
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Key Concept</div>
    <div class="value" style="font-size:22px;">Epigenetic changes are heritable modifications to gene expression without altering the DNA sequence</div>
  </div>
`));

// ── Slide 3: Writers, Readers & Erasers ─────────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Writers, Readers &amp; Erasers</h1>
  <div class="section-label">Epigenetic Mechanisms: An Overview</div>

  <div class="two-col" style="margin-bottom:18px;">
    <div>
      <div class="image-panel" style="margin-bottom:16px;">
        <img src="${epigeneticMechanismsImg}" style="width:100%; height:auto; max-height:400px; object-fit:contain; padding:12px; background:white;" />
        <div class="image-caption">Epigenetic Mechanisms <span class="image-credit">&mdash; NIH, Public Domain</span></div>
      </div>
      <div class="card card-violet" style="margin-bottom:0;">
        <div class="card-title" style="font-size:18px;">Clinical Disorders</div>
        <div class="card-body" style="font-size:16px;">
          <strong>DNMT3A</strong> variants &rarr; Tatton-Brown-Rahman syndrome (ID, overgrowth)<br>
          <strong>DNMT3B</strong> variants &rarr; ICF syndrome (immunodeficiency, facial anomalies)
        </div>
      </div>
    </div>
    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:20px;">Writers (DNMTs)</div>
        <div class="card-body" style="font-size:17px;">
          <strong>DNMT3A/3B:</strong> de novo methylation during embryogenesis<br><br>
          <strong>DNMT1:</strong> maintenance &mdash; copies patterns to daughter strands during replication<br><br>
          <em>DNMT1 mutations &rarr; hereditary sensory neuropathy with dementia</em>
        </div>
      </div>
      <div class="card card-red" style="margin-bottom:0;">
        <div class="card-title" style="font-size:20px;">Erasers (TET1-3)</div>
        <div class="card-body" style="font-size:17px;">
          Oxidize 5-methylcytosine to 5-hydroxymethylcytosine<br><br>
          Leads to base excision repair &amp; demethylation<br><br>
          <strong>Highly expressed in neurons</strong> &mdash; critical for synaptic plasticity
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Remember</div>
    <div class="value" style="font-size:22px;">DNMT1 maintains methylation through cell division; DNMT3A/3B establish new patterns; TET enzymes actively demethylate</div>
  </div>
`));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION 1: Histone Modifications & Chromatin Remodeling (slides 4-6)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Slide 4: The Histone Code ───────────────────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>The Histone Code</h1>
  <div class="section-label">Histone Modifications &amp; Chromatin Remodeling</div>

  <div class="card card-accent" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">Acetylation &amp; Deacetylation</div>
    <div class="card-body" style="font-size:19px;">
      <strong>HATs</strong> add acetyl groups &rarr; neutralize lysine positive charge &rarr; open chromatin &rarr; active transcription<br>
      <strong>HDACs</strong> remove acetyl groups &rarr; compact chromatin &rarr; gene silencing
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width:22%;">Mark</th>
        <th style="width:30%;">Function</th>
        <th style="width:48%;">Significance</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>H3K4me3</td>
        <td>Active promoter</td>
        <td>Marks genes actively being transcribed; open chromatin</td>
      </tr>
      <tr>
        <td>H3K27me3</td>
        <td>Polycomb repression</td>
        <td>Stable developmental gene silencing; bivalent with H3K4me3 in stem cells</td>
      </tr>
      <tr>
        <td>H3K9me3</td>
        <td>Heterochromatin</td>
        <td>Constitutive silencing at repetitive elements and pericentromeric regions</td>
      </tr>
    </tbody>
  </table>
`));

// ── Slide 5: Chromatin Remodeling Complexes ─────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Chromatin Remodeling Complexes</h1>
  <div class="section-label">Histone Modifications &amp; Chromatin Remodeling</div>

  <div style="font-size:21px; margin-bottom:20px; color:${COLORS.body};">
    ATP-dependent complexes slide, eject, or restructure nucleosomes &mdash; among the <strong>most frequently mutated gene families</strong> in neurodevelopmental disorders.
  </div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:20px;">BAF Complex (SWI/SNF)</div>
        <div class="card-body" style="font-size:18px;">
          Essential for neural differentiation<br><br>
          <strong>ARID1B</strong> &amp; <strong>SMARCC2</strong> mutations cause <strong>Coffin-Siris syndrome</strong> &mdash; intellectual disability, coarse features, absent 5th fingernails
        </div>
      </div>
    </div>
    <div>
      <div class="card card-red" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:20px;">CHD Family</div>
        <div class="card-body" style="font-size:18px;">
          <strong>CHD7</strong> mutations &rarr; <strong>CHARGE syndrome</strong> (coloboma, heart defects, choanal atresia, growth retardation, genital &amp; ear anomalies)<br><br>
          <strong>CHD8</strong> &mdash; highest-confidence autism risk gene
        </div>
      </div>
    </div>
  </div>

  <div class="stats-row">
    <div class="stat-card" style="background:${COLORS.greenLight}; border-color:${COLORS.green};">
      <div class="stat-label">SWI/SNF (BAF)</div>
      <div class="stat-value" style="font-size:20px;">Nucleosome sliding &amp; ejection</div>
    </div>
    <div class="stat-card" style="background:${COLORS.amberLight}; border-color:${COLORS.amber};">
      <div class="stat-label">ISWI</div>
      <div class="stat-value" style="font-size:20px;">Nucleosome spacing</div>
    </div>
    <div class="stat-card" style="background:${COLORS.violetLight}; border-color:${COLORS.violet};">
      <div class="stat-label">CHD</div>
      <div class="stat-value" style="font-size:20px;">Chromodomain-directed</div>
    </div>
    <div class="stat-card" style="background:${COLORS.blueLight}; border-color:${COLORS.blue};">
      <div class="stat-label">INO80</div>
      <div class="stat-value" style="font-size:20px;">Histone variant exchange</div>
    </div>
  </div>
`));

// ── Slide 6: Clinical Vignette — Coffin-Siris & CHARGE ─────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Chromatin Disorders in Practice</h1>
  <div class="section-label">Histone Modifications &amp; Chromatin Remodeling</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div class="card card-accent" style="height:100%;">
      <div class="card-title" style="font-size:22px;">Coffin-Siris Syndrome</div>
      <div class="card-body" style="font-size:18px;">
        <strong>Genes:</strong> ARID1B (most common), SMARCB1, SMARCE1, SMARCA4, SOX11<br><br>
        <strong>Features:</strong> ID, absent/hypoplastic 5th fingernails, coarse facial features, feeding difficulties<br><br>
        <strong>Mechanism:</strong> BAF complex disruption impairs neural progenitor differentiation
      </div>
    </div>
    <div class="card card-red" style="height:100%;">
      <div class="card-title" style="font-size:22px;">CHARGE Syndrome</div>
      <div class="card-body" style="font-size:18px;">
        <strong>Gene:</strong> CHD7 (>90% of cases)<br><br>
        <strong>Features:</strong> Coloboma, Heart defects, choanal Atresia, Retarded growth, Genital anomalies, Ear abnormalities<br><br>
        <strong>Mechanism:</strong> CHD7 is a chromodomain helicase essential for neural crest development
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:22px;">Coffin-Siris and CHARGE have recognizable episignatures on methylation arrays &mdash; useful for VUS reclassification</div>
  </div>
`));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION 2: Genomic Imprinting (slides 7-9)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Slide 7: Genomic Imprinting Fundamentals ────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Genomic Imprinting</h1>
  <div class="section-label">Parent-of-Origin Gene Expression</div>

  <div class="card card-accent" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">Parent-of-Origin Expression</div>
    <div class="card-body" style="font-size:19px;">
      ~100 imprinted genes in humans are expressed from <strong>only one parental allele</strong>. Controlled by <strong>imprinting control regions (ICRs)</strong> &mdash; differentially methylated regions established during gametogenesis.
    </div>
  </div>

  <div class="two-col" style="margin-bottom:20px;">
    <div class="card card-rose">
      <div class="card-title">Maternal Imprinting</div>
      <div class="card-body" style="font-size:18px;">
        Maternal allele is <strong>silenced</strong> (methylated)<br><br>
        Gene expressed from <strong>paternal allele only</strong><br><br>
        Loss of paternal copy &rarr; no expression
      </div>
    </div>
    <div class="card card-violet">
      <div class="card-title">Paternal Imprinting</div>
      <div class="card-body" style="font-size:18px;">
        Paternal allele is <strong>silenced</strong> (methylated)<br><br>
        Gene expressed from <strong>maternal allele only</strong><br><br>
        Loss of maternal copy &rarr; no expression
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Mechanisms of Imprinting Disorders</div>
    <div class="value" style="font-size:20px;">Deletion of expressed allele &bull; Uniparental disomy (UPD) &bull; IC defect &bull; Point variant in expressed gene</div>
  </div>
`));

// ── Slide 8: Prader-Willi & Angelman Syndromes ─────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Prader-Willi &amp; Angelman Syndromes</h1>
  <div class="section-label">Genomic Imprinting &mdash; 15q11-q13</div>

  <div class="two-col" style="margin-bottom:18px;">
    <div class="card card-accent" style="height:100%;">
      <div class="card-title" style="font-size:22px;">Prader-Willi Syndrome</div>
      <div class="card-body" style="font-size:17px;">
        <strong>Cause:</strong> Loss of paternal 15q11-13 (SNRPN, NDN, MAGEL2)<br><br>
        <strong>Mechanisms:</strong> Paternal deletion (65-75%), Maternal UPD15 (20-25%), IC defect (1-3%)<br><br>
        <strong>Features:</strong> Neonatal hypotonia &rarr; hyperphagia/obesity, hypogonadism, mild ID, behavioral issues
      </div>
    </div>
    <div class="card card-rose" style="height:100%;">
      <div class="card-title" style="font-size:22px;">Angelman Syndrome</div>
      <div class="card-body" style="font-size:17px;">
        <strong>Cause:</strong> Loss of maternal UBE3A expression<br><br>
        <strong>Mechanisms:</strong> Maternal deletion (65-75%), UBE3A variant (10%), IC defect (3%), Paternal UPD15 (1-2%)<br><br>
        <strong>Features:</strong> Severe ID, absent speech, happy affect, seizures, ataxia, microcephaly
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Same Region, Opposite Phenotypes</div>
    <div class="value" style="font-size:20px;">PWS = loss of paternally expressed genes &nbsp;|&nbsp; AS = loss of maternally expressed UBE3A</div>
  </div>
`));

// ── Slide 9: Beckwith-Wiedemann & UPD ───────────────────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Beckwith-Wiedemann &amp; Silver-Russell</h1>
  <div class="section-label">Genomic Imprinting &mdash; 11p15.5 &amp; UPD</div>

  <div class="two-col" style="margin-bottom:18px;">
    <div class="card card-amber">
      <div class="card-title" style="font-size:22px;">Beckwith-Wiedemann Syndrome</div>
      <div class="card-body" style="font-size:18px;">
        <strong>Region:</strong> 11p15.5 &mdash; IGF2 (paternal) / H19, CDKN1C (maternal)<br><br>
        <strong>Features:</strong> Overgrowth, macroglossia, organomegaly, omphalocele<br><br>
        <strong>Risk:</strong> Embryonal tumors (Wilms, hepatoblastoma) &mdash; requires surveillance
      </div>
    </div>
    <div class="card card-green">
      <div class="card-title" style="font-size:22px;">Silver-Russell Syndrome</div>
      <div class="card-body" style="font-size:18px;">
        <strong>Region:</strong> 11p15.5 loss of methylation at H19/IGF2 or maternal UPD7<br><br>
        <strong>Features:</strong> Intrauterine growth restriction, body asymmetry, triangular facies<br><br>
        <strong>Mechanism:</strong> Opposite imprinting disruption from BWS
      </div>
    </div>
  </div>

  <div class="card card-accent">
    <div class="card-title">Uniparental Disomy (UPD)</div>
    <div class="card-body" style="font-size:18px;">
      Both copies from one parent via <strong>trisomy rescue</strong>, <strong>monosomy rescue</strong>, or <strong>gamete complementation</strong>. UPD at imprinted loci disrupts parent-of-origin expression regardless of sequence integrity. <strong>Isodisomy</strong> can also unmask recessive variants.
    </div>
  </div>
`));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION 3: X-Chromosome Inactivation & Mosaicism (slides 10-12)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Slide 10: X-Chromosome Inactivation ─────────────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>X-Chromosome Inactivation</h1>
  <div class="section-label">XCI &amp; Mosaicism</div>

  <div class="card card-accent" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">XIST-Mediated Silencing</div>
    <div class="card-body" style="font-size:19px;">
      <strong>XIST lncRNA</strong> is expressed from and coats the future inactive X &rarr; Polycomb-mediated <strong>H3K27me3</strong> deposition &rarr; DNA methylation &rarr; heterochromatinization &rarr; <strong>Barr body</strong> formation.
    </div>
  </div>

  <div class="two-col" style="margin-bottom:16px;">
    <div class="card card-green">
      <div class="card-title">Random Inactivation</div>
      <div class="card-body" style="font-size:18px;">
        XCI is random with respect to parental origin &mdash; either maternal or paternal X may be silenced<br><br>
        Once established, the pattern is <strong>mitotically stable</strong> through subsequent cell divisions<br><br>
        Every female is a <strong>natural mosaic</strong> of two cell populations
      </div>
    </div>
    <div class="card card-violet">
      <div class="card-title">~15% Escape XCI</div>
      <div class="card-body" style="font-size:18px;">
        Approximately 15% of X-linked genes are expressed from <strong>both X chromosomes</strong><br><br>
        These <strong>escapee genes</strong> contribute to phenotypic differences between males (XY) and females (XX)<br><br>
        May explain why some X-linked conditions are more severe in males
      </div>
    </div>
  </div>
`));

// ── Slide 11: Skewed XCI & Manifesting Carriers ─────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Skewed XCI &amp; Manifesting Carriers</h1>
  <div class="section-label">XCI &amp; Mosaicism</div>

  <div class="card card-red" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">Skewed X-Inactivation</div>
    <div class="card-body" style="font-size:19px;">
      Normal: ~50:50 ratio. <strong>Skewed: &gt;80:20 ratio</strong> &mdash; can occur by chance, selection, or structural X abnormalities. Modifies disease severity in carriers of X-linked conditions.
    </div>
  </div>

  <div class="two-col" style="margin-bottom:16px;">
    <div class="card card-amber">
      <div class="card-title" style="font-size:20px;">Manifesting Carriers</div>
      <div class="card-body" style="font-size:18px;">
        Females heterozygous for X-linked recessive conditions can show symptoms when XCI is skewed toward the <strong>normal allele</strong>:<br><br>
        &bull; <strong>Duchenne MD</strong> &mdash; cardiomyopathy, mild weakness<br>
        &bull; <strong>OTC deficiency</strong> &mdash; hyperammonemia<br>
        &bull; <strong>Fabry disease</strong> &mdash; neuropathy, renal disease
      </div>
    </div>
    <div class="card card-accent">
      <div class="card-title" style="font-size:20px;">Rett Syndrome Example</div>
      <div class="card-body" style="font-size:18px;">
        MECP2 mutations (X-linked dominant). Phenotypic variability in females reflects <strong>random XCI patterns</strong>:<br><br>
        &bull; Favorable skewing &rarr; milder phenotype<br>
        &bull; Unfavorable skewing &rarr; more severe<br>
        &bull; Males: lethal without mosaicism
      </div>
    </div>
  </div>
`));

// ── Slide 12: Clinical Implications of XCI ──────────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>Clinical Implications of XCI</h1>
  <div class="section-label">XCI &amp; Mosaicism</div>

  <table style="margin-bottom:24px;">
    <thead>
      <tr>
        <th style="width:22%;">Condition</th>
        <th style="width:18%;">Gene</th>
        <th style="width:30%;">Carrier Manifestations</th>
        <th style="width:30%;">XCI Effect</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Duchenne MD</td>
        <td>DMD</td>
        <td>Cardiomyopathy, elevated CK</td>
        <td>Skewed inactivation of normal X</td>
      </tr>
      <tr>
        <td>Rett Syndrome</td>
        <td>MECP2</td>
        <td>Variable severity spectrum</td>
        <td>Random XCI creates mosaic brain</td>
      </tr>
      <tr>
        <td>OTC Deficiency</td>
        <td>OTC</td>
        <td>Hyperammonemic crises</td>
        <td>Liver XCI ratio determines risk</td>
      </tr>
      <tr>
        <td>Incontinentia Pigmenti</td>
        <td>IKBKG</td>
        <td>Blaschko line skin lesions</td>
        <td>Mosaic skin pattern reflects XCI</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:22px;">Always consider skewed XCI when a female shows symptoms of an X-linked recessive disorder &mdash; test CK in mothers of boys with DMD</div>
  </div>
`));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION 4: Methylation in Clinical Diagnostics (slides 13-15)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Slide 13: Methylation Diagnostic Tools ──────────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Methylation Diagnostic Tools</h1>
  <div class="section-label">Methylation in Clinical Diagnostics</div>

  <table style="margin-bottom:20px;">
    <thead>
      <tr>
        <th style="width:25%;">Test</th>
        <th style="width:38%;">What It Does</th>
        <th style="width:37%;">Use Case</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>MS-MLPA</td>
        <td>Quantifies copy number AND methylation at imprinted loci simultaneously</td>
        <td>Single test for deletion, UPD, IC defect at 15q11 or 11p15.5</td>
      </tr>
      <tr>
        <td>Methylation-Specific PCR</td>
        <td>Detects parent-of-origin methylation pattern at specific loci</td>
        <td>PWS/AS screening &mdash; detects &gt;99% of PWS cases</td>
      </tr>
      <tr>
        <td>Bisulfite Sequencing</td>
        <td>Converts unmethylated C to U; allows base-level methylation resolution</td>
        <td>Research-grade locus methylation profiling</td>
      </tr>
      <tr>
        <td>Methylation Arrays</td>
        <td>Genome-wide profiling on Illumina EPIC (850K) array</td>
        <td>Episignature analysis for &gt;50 Mendelian disorders</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:22px;">Normal methylation in suspected Angelman &rarr; order UBE3A sequencing (10% of AS caused by point variants not detected by methylation)</div>
  </div>
`));

// ── Slide 14: Episignatures & Therapeutic Frontiers ─────────────────────────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>Episignatures &amp; Epigenetic Therapies</h1>
  <div class="section-label">Methylation in Clinical Diagnostics</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:20px;">Episignature Analysis</div>
        <div class="card-body" style="font-size:18px;">
          Disorders caused by <strong>chromatin regulators</strong> produce characteristic genome-wide methylation fingerprints<br><br>
          <strong>&gt;50 disorders</strong> with defined episignatures (Kabuki, Sotos, CHARGE, Floating-Harbor)<br><br>
          Can <strong>reclassify VUS</strong> and diagnose clinically ambiguous presentations
        </div>
      </div>
    </div>
    <div>
      <div class="card card-green" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:20px;">Pharmacological Therapies</div>
        <div class="card-body" style="font-size:18px;">
          <strong>HDAC inhibitors</strong> (vorinostat, valproate): broadly increase histone acetylation; Alzheimer trials ongoing<br><br>
          <strong>DNMT inhibitors</strong> (5-azacytidine, decitabine): global demethylation; too toxic for neurogenetic use currently
        </div>
      </div>
    </div>
  </div>

  <div class="card card-violet">
    <div class="card-title" style="font-size:20px;">CRISPR Epigenome Editing (Preclinical)</div>
    <div class="card-body" style="font-size:18px;">
      <strong>dCas9-DNMT3A</strong> (methylate) or <strong>dCas9-TET1</strong> (demethylate) specific loci without altering DNA sequence. Potential for imprinting disorders and repeat expansion silencing.
    </div>
  </div>
`));

// ── Slide 15: Key Takeaways ─────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 15, TOTAL, [
  {
    title: "DNA methylation is the core epigenetic mark",
    body: "CpG island hypermethylation silences genes. Writers (DNMTs), readers (MBDs), and erasers (TETs) regulate methylation dynamically.",
  },
  {
    title: "Chromatin remodeling defects cause recognizable syndromes",
    body: "BAF complex mutations cause Coffin-Siris; CHD7 causes CHARGE syndrome. H3K4me3 marks active promoters, H3K27me3 marks repressed genes.",
  },
  {
    title: "Imprinting disorders arise from parent-of-origin effects",
    body: "PWS (loss of paternal 15q11) and AS (loss of maternal UBE3A) are the paradigm. BWS/SRS involve 11p15.5. UPD can disrupt any imprinted locus.",
  },
  {
    title: "XCI creates functional mosaicism in every female",
    body: "Skewed XCI explains manifesting carriers of X-linked recessive conditions. ~15% of genes escape inactivation.",
  },
  {
    title: "Methylation arrays enable genome-wide diagnostics",
    body: "Episignatures for 50+ disorders reclassify VUS and confirm diagnoses. CRISPR epigenome editing is an emerging therapeutic frontier.",
  },
]));

// ── Render ───────────────────────────────────────────────────────────────────
await renderSlides("epigenetics", slides);
