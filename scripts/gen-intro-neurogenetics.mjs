/**
 * scripts/gen-intro-neurogenetics.mjs
 *
 * Generates 18 clean, readable slides for the Introduction to Neurogenetics module.
 * Condensed from 31 originals — removes redundant content covered in other modules.
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
const TOTAL = 18;

const slides = [];

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Introduction to<br>Neurogenetics",
  subtitle: "Foundational genetic concepts for the neurologist",
  totalSlides: TOTAL,
  topics: [
    "History of genetics",
    "DNA structure & the human genome",
    "Genotype, phenotype & inheritance",
    "Genetic testing modalities",
    "Variant classification (ACMG)",
  ],
}));

// ── Slide 2: Learning Objectives ───────────────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Learning Objectives</h1>
  <div class="section-label">What you will learn</div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
    <div class="card card-accent">
      <div class="card-title">1. Core Genetic Concepts</div>
      <div class="card-body">Understand the basic building blocks of genetics: DNA, genes, chromosomes, alleles, and loci.</div>
    </div>
    <div class="card card-green">
      <div class="card-title">2. The Language of Genetics</div>
      <div class="card-body">Speak fluently about genotype vs phenotype, dominance, pleiotropy, and inheritance patterns.</div>
    </div>
    <div class="card card-violet">
      <div class="card-title">3. Genetic Testing Basics</div>
      <div class="card-body">Know what each test can &mdash; and cannot &mdash; detect: karyotype, FISH, CMA, Sanger, and NGS.</div>
    </div>
    <div class="card card-amber">
      <div class="card-title">4. Interpreting Results</div>
      <div class="card-body">Apply the ACMG 5-tier classification to understand pathogenic, likely pathogenic, VUS, and benign variants.</div>
    </div>
  </div>
`));

// ── Slide 3: History of Genetics ───────────────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>History of Genetics</h1>
  <div class="section-label">From peas to genes</div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${mc.accent};">1</div>
    <div class="card card-accent" style="flex:1; margin-bottom:0;">
      <div class="card-title">Gregor Mendel (1822&ndash;1884)</div>
      <div class="card-body">Augustinian friar who discovered the laws of inheritance through meticulous pea plant experiments. Described dominant and recessive &ldquo;factors&rdquo; &mdash; decades before the word &ldquo;gene&rdquo; existed.</div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.green};">2</div>
    <div class="card card-green" style="flex:1; margin-bottom:0;">
      <div class="card-title">Hugo de Vries &mdash; &ldquo;Pangenes&rdquo;</div>
      <div class="card-body">Rediscovered Mendel&rsquo;s work around 1900. Coined the term &ldquo;pangene&rdquo; for units of heredity, borrowing from Darwin&rsquo;s pangenesis hypothesis.</div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.violet};">3</div>
    <div class="card card-violet" style="flex:1; margin-bottom:0;">
      <div class="card-title">Wilhelm Johannsen Coins &ldquo;Gene&rdquo; (1909)</div>
      <div class="card-body">Shortened &ldquo;pangene&rdquo; to &ldquo;gene.&rdquo; Also introduced the terms <strong>genotype</strong> and <strong>phenotype</strong> &mdash; still the cornerstone vocabulary of genetics today.</div>
    </div>
  </div>
`));

// ── Slide 4: Discovery of DNA ──────────────────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Discovery of DNA Structure</h1>
  <div class="section-label">1952&ndash;1953</div>

  <div class="two-col" style="margin-top:12px;">
    <div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:24px;">X-Ray Crystallography (1952)</div>
        <div class="card-body" style="font-size:19px; margin-top:8px;">
          <strong>Rosalind Franklin</strong> &amp; Maurice Wilkins produced &ldquo;Photo 51&rdquo; &mdash; an X-ray diffraction image showing DNA&rsquo;s helical structure.
        </div>
        <div class="card-body" style="font-size:17px; margin-top:12px; color:${COLORS.muted};">
          Franklin&rsquo;s contribution was underrecognized during her lifetime. She died in 1958, four years before the Nobel Prize was awarded.
        </div>
      </div>
    </div>

    <div>
      <div class="card card-violet" style="padding:28px;">
        <div class="card-title" style="font-size:24px;">The Double Helix (1953)</div>
        <div class="card-body" style="font-size:19px; margin-top:8px;">
          <strong>James Watson</strong> &amp; <strong>Francis Crick</strong> proposed the double-helix model of DNA &mdash; two antiparallel strands linked by complementary base pairs.
        </div>
        <div class="card-body" style="font-size:17px; margin-top:12px; color:${COLORS.muted};">
          Published in <em>Nature</em>, April 25, 1953. Earned the Nobel Prize in Physiology or Medicine, 1962.
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:20px;">
    <div class="label">Key Insight</div>
    <div class="value" style="font-size:22px;">Complementary base pairing (A=T, G&equiv;C) immediately suggested a mechanism for hereditary replication.</div>
  </div>
`));

// ── Slide 5: Key Milestones 1953–2003 ──────────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Key Milestones: 1953&ndash;2003</h1>
  <div class="section-label">50 years of discovery</div>

  <table>
    <thead>
      <tr>
        <th style="width:140px;">Year</th>
        <th>Milestone</th>
        <th>Significance</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1953</td>
        <td>Double Helix</td>
        <td>Watson &amp; Crick define DNA structure</td>
      </tr>
      <tr>
        <td>1956</td>
        <td>Human Karyotype</td>
        <td>Tijo &amp; Levan establish 46 chromosomes; trisomy 21 linked to Down syndrome (1959)</td>
      </tr>
      <tr>
        <td>1977</td>
        <td>Sanger Sequencing</td>
        <td>Chain-termination method enables reading DNA base-by-base</td>
      </tr>
      <tr>
        <td>1983</td>
        <td>Huntington&rsquo;s Gene Mapped</td>
        <td>First disease gene mapped via linkage analysis (chromosome 4p)</td>
      </tr>
      <tr>
        <td>2003</td>
        <td>Human Genome Project</td>
        <td>Complete sequence of ~3.2 billion base pairs; 13 years, $2.7 billion</td>
      </tr>
    </tbody>
  </table>

  <div class="card card-accent" style="margin-top:8px;">
    <div class="card-title">From Bench to Bedside</div>
    <div class="card-body">Each milestone directly enabled today&rsquo;s clinical genetic testing &mdash; from karyotype to whole-genome sequencing.</div>
  </div>
`));

// ── Slide 6: DNA Basics ────────────────────────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>DNA Basics</h1>
  <div class="section-label">Quick-check concepts</div>

  <div class="stats-row">
    <div class="stat-card" style="border-color:${mc.accent}; background:${mc.light};">
      <div class="stat-label">Chromosomes</div>
      <div class="stat-value">46 (23 pairs)</div>
    </div>
    <div class="stat-card" style="border-color:${COLORS.green}; background:${COLORS.greenLight};">
      <div class="stat-label">Autosomes</div>
      <div class="stat-value">22 pairs</div>
    </div>
    <div class="stat-card" style="border-color:${COLORS.violet}; background:${COLORS.violetLight};">
      <div class="stat-label">Sex Chromosomes</div>
      <div class="stat-value">XX or XY</div>
    </div>
  </div>

  <div class="two-col">
    <div>
      <div class="card card-accent">
        <div class="card-title">What Is a Gene?</div>
        <div class="card-body">A segment of DNA at a specific <strong>locus</strong> (chromosomal address) that encodes a functional product &mdash; usually a protein or regulatory RNA.</div>
      </div>
      <div class="card card-green">
        <div class="card-title">What Is a Locus?</div>
        <div class="card-body">The chromosomal position of a gene, described by cytogenetic band notation &mdash; e.g., <strong>15q12</strong> (chromosome 15, long arm, band 12).</div>
      </div>
    </div>
    <div>
      <div class="card card-violet">
        <div class="card-title">What Are Alleles?</div>
        <div class="card-body">Alternative versions of a gene at the same locus. Each person carries two alleles (one maternal, one paternal).</div>
      </div>
      <div class="card card-amber">
        <div class="card-title">Example &mdash; OCA2 Gene</div>
        <div class="card-body">Located on chromosome <strong>15q13</strong>. Variants in OCA2 affect eye color &mdash; demonstrating how allelic variation drives phenotypic diversity.</div>
      </div>
    </div>
  </div>
`));

// ── Slide 7: Gene Structure ────────────────────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Gene Structure</h1>
  <div class="section-label">Anatomy of a gene</div>

  <div class="two-col">
    <div>
      <h3>Structural Elements</h3>
      <div class="card card-accent" style="padding:18px 22px;">
        <div class="card-title" style="font-size:20px;">Exons</div>
        <div class="card-body" style="font-size:17px;">Protein-coding sequences retained in mature mRNA</div>
      </div>
      <div class="card card-green" style="padding:18px 22px;">
        <div class="card-title" style="font-size:20px;">Introns</div>
        <div class="card-body" style="font-size:17px;">Non-coding sequences spliced out during mRNA processing</div>
      </div>
      <div class="card card-violet" style="padding:18px 22px;">
        <div class="card-title" style="font-size:20px;">Splice Sites (GT&ndash;AG)</div>
        <div class="card-body" style="font-size:17px;">Canonical donor (GT) and acceptor (AG) sequences at exon&ndash;intron boundaries</div>
      </div>
      <div class="card card-amber" style="padding:18px 22px;">
        <div class="card-title" style="font-size:20px;">Promoter &amp; UTRs</div>
        <div class="card-body" style="font-size:17px;">Promoter drives transcription; 5&prime; and 3&prime; UTRs regulate stability and translation</div>
      </div>
    </div>

    <div>
      <h3>Common Variant Types</h3>
      <div class="card card-red" style="padding:18px 22px;">
        <div class="card-title" style="font-size:20px;">SNV (Single Nucleotide Variant)</div>
        <div class="card-body" style="font-size:17px;">Single base change &mdash; missense, nonsense, or synonymous</div>
      </div>
      <div class="card card-rose" style="padding:18px 22px;">
        <div class="card-title" style="font-size:20px;">Splice-Site Variant</div>
        <div class="card-body" style="font-size:17px;">Disrupts GT/AG &rarr; exon skipping or intron retention</div>
      </div>
      <div class="card card-teal" style="padding:18px 22px;">
        <div class="card-title" style="font-size:20px;">Indel (Insertion/Deletion)</div>
        <div class="card-body" style="font-size:17px;">If not a multiple of 3 &rarr; frameshift &rarr; premature stop codon</div>
      </div>
      <div class="card card-blue" style="padding:18px 22px;">
        <div class="card-title" style="font-size:20px;">Repeat Expansion</div>
        <div class="card-body" style="font-size:17px;">Trinucleotide repeats (e.g., CAG in Huntington disease)</div>
      </div>
    </div>
  </div>
`));

// ── Slide 8: Human Genome Project Findings ─────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Human Genome Project Findings</h1>
  <div class="section-label">Surprises from the complete sequence</div>

  <div class="stats-row">
    <div class="stat-card" style="border-color:${mc.accent}; background:${mc.light};">
      <div class="stat-label">Protein-Coding DNA</div>
      <div class="stat-value">~1.5% of genome</div>
    </div>
    <div class="stat-card" style="border-color:${COLORS.green}; background:${COLORS.greenLight};">
      <div class="stat-label">Protein-Coding Genes</div>
      <div class="stat-value">~20,000</div>
    </div>
    <div class="stat-card" style="border-color:${COLORS.violet}; background:${COLORS.violetLight};">
      <div class="stat-label">Non-Coding</div>
      <div class="stat-value">&gt;98% of genome</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">Far Fewer Genes Than Expected</div>
      <div class="card-body">Early estimates predicted 80,000&ndash;100,000 genes. The actual count of ~20,000 is comparable to a simple roundworm &mdash; complexity comes from regulation, splicing, and epigenetics.</div>
    </div>
    <div class="card card-green">
      <div class="card-title">Non-Coding RNA</div>
      <div class="card-body">Much of the &ldquo;junk DNA&rdquo; produces regulatory RNA (lncRNA, miRNA) that modulates gene expression. Non-coding variants are increasingly recognized as disease-causing.</div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Clinical Implication</div>
    <div class="value" style="font-size:21px;">Exome sequencing covers only ~1.5% of the genome. Genome sequencing is needed to detect non-coding and structural variants.</div>
  </div>
`));

// ── Slide 9: Genotype vs Phenotype ─────────────────────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Genotype vs Phenotype</h1>
  <div class="section-label">The link between DNA and disease</div>

  <div class="two-col" style="margin-bottom:24px;">
    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:24px;">Genotype</div>
      <div class="card-body" style="font-size:20px;">The specific combination of alleles an individual carries at a given locus.</div>
      <div style="margin-top:16px; font-size:18px; color:${COLORS.muted};">Example: the two alleles at a disease locus</div>
    </div>
    <div class="card card-violet" style="padding:28px;">
      <div class="card-title" style="font-size:24px;">Phenotype</div>
      <div class="card-body" style="font-size:20px;">The observable characteristics or traits resulting from the interaction of genotype and environment.</div>
      <div style="margin-top:16px; font-size:18px; color:${COLORS.muted};">Example: seizures, intellectual disability, dysmorphic features</div>
    </div>
  </div>

  <h3>Dominance Relationships</h3>
  <div class="three-col">
    <div class="card card-green" style="text-align:center; padding:24px;">
      <div class="card-title" style="font-size:28px; letter-spacing:2px;">AA</div>
      <div class="card-body" style="font-size:18px;">Homozygous<br>dominant</div>
    </div>
    <div class="card card-amber" style="text-align:center; padding:24px;">
      <div class="card-title" style="font-size:28px; letter-spacing:2px;">Aa</div>
      <div class="card-body" style="font-size:18px;">Heterozygous<br>(carrier in AR; affected in AD)</div>
    </div>
    <div class="card card-red" style="text-align:center; padding:24px;">
      <div class="card-title" style="font-size:28px; letter-spacing:2px;">aa</div>
      <div class="card-body" style="font-size:18px;">Homozygous<br>recessive &rarr; affected in AR</div>
    </div>
  </div>
`));

// ── Slide 10: Inheritance Patterns ─────────────────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Inheritance Patterns</h1>
  <div class="section-label">Autosomal dominant &amp; recessive</div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Autosomal Dominant (AD)</div>
        <div class="card-body" style="font-size:18px; margin-top:8px;">
          <strong>Monoallelic / Heterozygous</strong><br><br>
          One pathogenic allele is sufficient to cause disease.
        </div>
        <div style="margin-top:16px; padding:14px 18px; background:rgba(37,99,235,0.08); border-radius:8px;">
          <div style="font-size:17px; color:${mc.dark}; line-height:1.6;">
            &bull; 50% recurrence risk per child<br>
            &bull; Often de novo in severe phenotypes<br>
            &bull; Variable expressivity common
          </div>
        </div>
        <div style="margin-top:14px; font-size:17px; color:${COLORS.muted};">
          Examples: Huntington disease, Tuberous Sclerosis, many SCN1A epilepsies
        </div>
      </div>
    </div>

    <div>
      <div class="card card-red" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Autosomal Recessive (AR)</div>
        <div class="card-body" style="font-size:18px; margin-top:8px;">
          <strong>Biallelic</strong><br><br>
          Two pathogenic alleles required (one from each parent).
        </div>
        <div style="margin-top:16px; padding:14px 18px; background:rgba(220,38,38,0.06); border-radius:8px;">
          <div style="font-size:17px; color:${COLORS.red}; line-height:1.6;">
            &bull; <strong>Compound heterozygous:</strong> two different pathogenic variants<br>
            &bull; <strong>Homozygous:</strong> same variant on both alleles<br>
            &bull; 25% recurrence risk
          </div>
        </div>
        <div style="margin-top:14px; font-size:17px; color:${COLORS.muted};">
          Examples: SMA, Friedreich ataxia, most leukodystrophies
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 11: Key Genetic Concepts ─────────────────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Key Genetic Concepts</h1>
  <div class="section-label">Why genetics is not simple</div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Pleiotropy</div>
      <div class="card-body" style="font-size:18px;">One gene affects multiple, seemingly unrelated phenotypes.</div>
      <div style="margin-top:12px; font-size:17px; color:${COLORS.muted};">Example: <em>TSC1/TSC2</em> &rarr; seizures, skin findings, renal tumors, cognitive effects</div>
    </div>
    <div class="card card-green" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Genetic Heterogeneity</div>
      <div class="card-body" style="font-size:18px;">One phenotype can be caused by variants in many different genes.</div>
      <div style="margin-top:12px; font-size:17px; color:${COLORS.muted};">Example: epileptic encephalopathy &rarr; SCN1A, KCNQ2, STXBP1, CDKL5, and 100+ others</div>
    </div>
    <div class="card card-violet" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Penetrance</div>
      <div class="card-body" style="font-size:18px;">The probability that a pathogenic genotype produces the phenotype.</div>
      <div style="margin-top:12px; font-size:17px; color:${COLORS.muted};">Complete (100%) = Huntington; Incomplete = BRCA1 (~70% breast cancer risk)</div>
    </div>
    <div class="card card-amber" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Variable Expressivity</div>
      <div class="card-body" style="font-size:18px;">Same pathogenic variant &rarr; different severity or features across individuals.</div>
      <div style="margin-top:12px; font-size:17px; color:${COLORS.muted};">Example: NF1 &mdash; some patients have only caf&eacute;-au-lait spots, others develop plexiform neurofibromas</div>
    </div>
  </div>
`));

// ── Slide 12: Cytogenetic Testing — Karyotype ──────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>Cytogenetic Testing: Karyotype</h1>
  <div class="section-label">The oldest genetic test</div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">G-Banded Karyotype</div>
        <div class="card-body" style="font-size:18px; margin-top:8px;">
          Chromosomes are arrested in metaphase, stained with Giemsa, and visualized under light microscopy.
        </div>
        <div class="card-body" style="font-size:17px; margin-top:12px;">
          &bull; 22 autosome pairs + sex chromosomes<br>
          &bull; Detects aneuploidy, large translocations, inversions<br>
          &bull; Requires dividing cells (blood, fibroblasts, amniocytes)
        </div>
      </div>
    </div>

    <div>
      <div class="card card-amber" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Resolution: ~5&ndash;10 Mb</div>
        <div class="card-body" style="font-size:18px; margin-top:8px;">
          Can only detect abnormalities &ge;5&ndash;10 million base pairs. Misses small deletions, duplications, and single-gene variants.
        </div>
      </div>

      <div class="card card-green" style="margin-top:16px; padding:24px;">
        <div class="card-title">Still Useful For</div>
        <div class="card-body" style="font-size:17px;">
          &bull; Suspected aneuploidy (trisomy 13, 18, 21)<br>
          &bull; Balanced translocations (invisible to CMA)<br>
          &bull; Recurrent miscarriage workup
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 13: FISH & CMA ──────────────────────────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>FISH &amp; Chromosomal Microarray</h1>
  <div class="section-label">Higher-resolution cytogenetics</div>

  <div class="two-col">
    <div>
      <div class="card card-violet" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">FISH (Fluorescence In Situ Hybridization)</div>
        <div class="card-body" style="font-size:18px; margin-top:8px;">
          Fluorescent probes bind to specific chromosomal regions to detect targeted deletions or duplications.
        </div>
        <div style="margin-top:16px; padding:14px 18px; background:rgba(124,58,237,0.06); border-radius:8px;">
          <div style="font-size:17px; color:${COLORS.violet}; line-height:1.6;">
            &bull; Must know what you&rsquo;re looking for<br>
            &bull; Rapid turnaround (24&ndash;48 hrs)<br>
            &bull; Detects known microdeletion syndromes<br>
            &bull; Examples: 22q11.2 deletion, Williams (7q11.23)
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="card card-red" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">CMA (Chromosomal Microarray)</div>
        <div class="card-body" style="font-size:18px; margin-top:8px;">
          Genome-wide scan for copy number variants (CNVs) &mdash; deletions and duplications &mdash; at ~50&ndash;100 kb resolution.
        </div>
        <div style="margin-top:16px; padding:14px 18px; background:rgba(220,38,38,0.06); border-radius:8px;">
          <div style="font-size:17px; color:${COLORS.red}; line-height:1.6;">
            &bull; First-tier test for ID / developmental delay<br>
            &bull; No need to know the target a priori<br>
            &bull; Cannot detect balanced rearrangements<br>
            &bull; Diagnostic yield: 15&ndash;20% in NDD
          </div>
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 14: Sanger Sequencing ────────────────────────────────────────────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>Sanger Sequencing</h1>
  <div class="section-label">The gold standard for single variants</div>

  <div class="card card-accent" style="padding:28px; margin-bottom:24px;">
    <div class="card-title" style="font-size:22px;">Chain Termination Method</div>
    <div class="card-body" style="font-size:19px; margin-top:8px;">
      Developed by Frederick Sanger (1977). Uses dideoxynucleotides (ddNTPs) that lack the 3&prime; hydroxyl group, terminating DNA synthesis at random positions. Fragments are separated by size to read the sequence.
    </div>
  </div>

  <div class="three-col">
    <div class="card card-green" style="padding:22px;">
      <div class="card-title" style="font-size:20px;">Strengths</div>
      <div class="card-body" style="font-size:17px;">
        &bull; High accuracy (~99.99%)<br>
        &bull; Gold standard for confirmation<br>
        &bull; Reads ~800&ndash;1000 bp per run
      </div>
    </div>
    <div class="card card-amber" style="padding:22px;">
      <div class="card-title" style="font-size:20px;">Limitations</div>
      <div class="card-body" style="font-size:17px;">
        &bull; One gene (or exon) at a time<br>
        &bull; Too slow/costly for multi-gene panels<br>
        &bull; Cannot detect CNVs or structural variants
      </div>
    </div>
    <div class="card card-violet" style="padding:22px;">
      <div class="card-title" style="font-size:20px;">Current Role</div>
      <div class="card-body" style="font-size:17px;">
        &bull; Confirm NGS-identified variants<br>
        &bull; Targeted familial variant testing<br>
        &bull; Single-gene disorders with known mutation
      </div>
    </div>
  </div>
`));

// ── Slide 15: Next-Generation Sequencing ───────────────────────────────────
slides.push(slideHTML(MOD, 15, TOTAL, `
  <h1>Next-Generation Sequencing</h1>
  <div class="section-label">Massively parallel sequencing</div>

  <h3>NGS Workflow</h3>
  <div class="flow-arrow" style="margin-bottom:28px;">
    <div class="flow-box" style="background:${mc.accent};">Library Prep</div>
    <div class="flow-connector">&rarr;</div>
    <div class="flow-box" style="background:${COLORS.violet};">Sequencing</div>
    <div class="flow-connector">&rarr;</div>
    <div class="flow-box" style="background:${COLORS.green};">Alignment</div>
    <div class="flow-connector">&rarr;</div>
    <div class="flow-box" style="background:${COLORS.amber};">Variant Calling</div>
  </div>

  <h3>Test Options</h3>
  <div class="three-col">
    <div class="card card-accent" style="padding:24px;">
      <div class="card-title" style="font-size:20px;">Gene Panel</div>
      <div class="card-body" style="font-size:17px;">
        Targeted set of genes (e.g., epilepsy panel: 100&ndash;500 genes). High coverage, fast turnaround, lowest cost.
      </div>
    </div>
    <div class="card card-violet" style="padding:24px;">
      <div class="card-title" style="font-size:20px;">Whole Exome (WES)</div>
      <div class="card-body" style="font-size:17px;">
        All ~20,000 protein-coding genes (~1.5% of genome). Diagnostic yield 25&ndash;40% in neurogenetics. Misses non-coding regions.
      </div>
    </div>
    <div class="card card-green" style="padding:24px;">
      <div class="card-title" style="font-size:20px;">Whole Genome (WGS)</div>
      <div class="card-body" style="font-size:17px;">
        Entire genome including non-coding. Best for structural variants, repeat expansions. Rapidly becoming first-line.
      </div>
    </div>
  </div>
`));

// ── Slide 16: NGS Limitations ──────────────────────────────────────────────
slides.push(slideHTML(MOD, 16, TOTAL, `
  <h1>NGS Limitations</h1>
  <div class="section-label">What sequencing can miss</div>

  <p style="font-size:21px; margin-bottom:24px;">
    No single test detects everything. Understanding NGS blind spots is critical for avoiding false-negative results.
  </p>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
    <div class="card card-red" style="padding:24px;">
      <div class="card-title" style="font-size:20px;">Large CNVs &amp; Structural Variants</div>
      <div class="card-body" style="font-size:17px;">Short-read NGS struggles with large deletions, duplications, inversions, and complex rearrangements. CMA or long-read sequencing may be needed.</div>
    </div>
    <div class="card card-amber" style="padding:24px;">
      <div class="card-title" style="font-size:20px;">Trinucleotide Repeat Expansions</div>
      <div class="card-body" style="font-size:17px;">Expanded repeats (Fragile X, Huntington, SCA) exceed short-read length. Requires repeat-primed PCR or long-read sequencing.</div>
    </div>
    <div class="card card-violet" style="padding:24px;">
      <div class="card-title" style="font-size:20px;">Imprinting &amp; Methylation</div>
      <div class="card-body" style="font-size:17px;">Standard NGS does not detect methylation status. Conditions like Angelman / Prader-Willi require methylation-specific testing.</div>
    </div>
    <div class="card card-accent" style="padding:24px;">
      <div class="card-title" style="font-size:20px;">Cis / Trans Phase</div>
      <div class="card-body" style="font-size:17px;">Short-read NGS cannot determine if two variants are on the same allele (cis) or different alleles (trans). Parental testing or long reads needed for AR disease confirmation.</div>
    </div>
  </div>
`));

// ── Slide 17: ACMG Variant Classification ──────────────────────────────────
slides.push(slideHTML(MOD, 17, TOTAL, `
  <h1>ACMG Variant Classification</h1>
  <div class="section-label">The 5-tier framework</div>

  <p style="font-size:20px; margin-bottom:20px;">
    The ACMG/AMP guidelines (2015) provide a standardized, evidence-based system for classifying sequence variants.
  </p>

  <table>
    <thead>
      <tr>
        <th style="width:80px;">Class</th>
        <th style="width:220px;">Category</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="color:${COLORS.red}; font-weight:800;">5</td>
        <td>Pathogenic</td>
        <td>Clinically actionable &mdash; explains patient&rsquo;s phenotype</td>
      </tr>
      <tr>
        <td style="color:#ea580c; font-weight:800;">4</td>
        <td>Likely Pathogenic</td>
        <td>Treat as pathogenic; &ge;90% certainty of disease causation</td>
      </tr>
      <tr>
        <td style="color:${COLORS.amber}; font-weight:800;">3</td>
        <td>VUS (Uncertain Significance)</td>
        <td>Cannot confirm or rule out &mdash; do not use for clinical decisions alone</td>
      </tr>
      <tr>
        <td style="color:${COLORS.green}; font-weight:800;">2</td>
        <td>Likely Benign</td>
        <td>Unlikely to cause disease; &ge;90% certainty benign</td>
      </tr>
      <tr>
        <td style="color:${COLORS.teal}; font-weight:800;">1</td>
        <td>Benign</td>
        <td>No clinical significance</td>
      </tr>
    </tbody>
  </table>

  <div class="card card-amber" style="margin-top:12px;">
    <div class="card-title">The VUS Challenge</div>
    <div class="card-body">VUS is not &ldquo;maybe pathogenic&rdquo; &mdash; it means <strong>insufficient evidence</strong>. ~30&ndash;50% of reported variants are VUS. Reclassification over time is common. Periodic reanalysis is essential.</div>
  </div>
`));

// ── Slide 18: Key Takeaways ────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 18, TOTAL, [
  {
    title: "Genetics has a 160-year history",
    body: "From Mendel's peas to the Human Genome Project — each milestone enabled the next generation of clinical testing.",
  },
  {
    title: "One gene ≠ one disease",
    body: "Pleiotropy, genetic heterogeneity, variable expressivity, and incomplete penetrance make genotype–phenotype correlations complex.",
  },
  {
    title: "Know each test's blind spots",
    body: "Karyotype misses small variants; NGS misses repeats, CNVs, imprinting, and phase. No single test catches everything.",
  },
  {
    title: "VUS ≠ pathogenic",
    body: "Variants of uncertain significance require caution — do not base clinical decisions on a VUS alone. Periodic reanalysis matters.",
  },
  {
    title: "The ACMG framework is your guide",
    body: "The 5-tier classification system standardizes variant interpretation. Understanding it is essential for every neurologist ordering genetic testing.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
