/**
 * scripts/gen-central-dogma.mjs
 *
 * Generates 10 slides for the Central Dogma module (5 sections × 2 slides each).
 * Uses puppeteer HTML rendering via the shared design system.
 *
 * Run: node scripts/gen-central-dogma.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS, imageDataUri,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "central-dogma";
const mc = MODULE_COLORS[MOD];
const TOTAL = 10;

const centralDogmaImg = imageDataUri("public/images/sourced/central-dogma.svg");
const splicingImg = imageDataUri("public/images/sourced/pre-mRNA-splicing.svg");

const slides = [];

// ── Section 0: Genome Organization and the Genetic Code ─────────────────────

// Slide 1 (Section 0, Slide 1): Title
slides.push(titleSlideHTML(MOD, {
  title: "Central Dogma &<br>Molecular Genetics",
  subtitle: "DNA → RNA → Protein: the foundation of genetic medicine",
  totalSlides: TOTAL,
  topics: [
    "Genome organization & the genetic code",
    "Replication fidelity & repeat expansions",
    "Transcription & pre-mRNA splicing",
    "Translation & protein function",
    "Variant types & molecular consequences",
  ],
}));

// Slide 2 (Section 0, Slide 2): Genome Organization
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Genome Organization &amp; the Genetic Code</h1>
  <div class="section-label">Section 1 of 5</div>

  <div class="two-col">
    <div style="flex:1.2;">
      <div class="image-panel" style="margin-bottom:0;">
        <img src="${centralDogmaImg}" style="width:100%; height:auto; max-height:500px; object-fit:contain; padding:20px; background:white;" />
        <div class="image-caption">Central Dogma of Molecular Biology <span class="image-credit">&mdash; Philippe Hup&eacute;, CC BY-SA 3.0, via Wikimedia Commons</span></div>
      </div>
    </div>

    <div>
      <div class="stats-row" style="flex-wrap:wrap; margin-bottom:16px;">
        <div class="stat-card" style="border-color:${mc.accent}; background:${mc.light}; flex:1 1 45%;">
          <div class="stat-label">Genome Size</div>
          <div class="stat-value" style="font-size:31px;">~3.2 billion bp</div>
        </div>
        <div class="stat-card" style="border-color:${COLORS.green}; background:${COLORS.greenLight}; flex:1 1 45%;">
          <div class="stat-label">Protein-Coding</div>
          <div class="stat-value" style="font-size:31px;">~1.5% of genome</div>
        </div>
        <div class="stat-card" style="border-color:${COLORS.violet}; background:${COLORS.violetLight}; flex:1 1 45%;">
          <div class="stat-label">Genes</div>
          <div class="stat-value" style="font-size:31px;">~20,000</div>
        </div>
        <div class="stat-card" style="border-color:${COLORS.amber}; background:${COLORS.amberLight}; flex:1 1 45%;">
          <div class="stat-label">Codons</div>
          <div class="stat-value" style="font-size:31px;">64 &rarr; 20 AAs + stops</div>
        </div>
      </div>
      <div class="card card-accent" style="margin-bottom:14px;">
        <div class="card-title">Degeneracy Buffers Mutations</div>
        <div class="card-body" style="font-size:24px;">Multiple codons encode the same amino acid, partially buffering synonymous substitutions. Synonymous variants can still be pathogenic by disrupting splicing enhancers (ESEs).</div>
      </div>
      <div class="card card-red" style="margin-bottom:0;">
        <div class="card-title">CpG Mutation Hotspots</div>
        <div class="card-body" style="font-size:24px;">The &ldquo;C&rdquo; in CpG sites is often methylated. Methylated cytosine spontaneously deaminates to thymine, making CpG sites mutate ~10&times; faster than other positions. This is why many recurrent pathogenic variants (e.g., in <em>MECP2</em>, <em>SCN1A</em>) occur at CpG dinucleotides.</div>
      </div>
    </div>
  </div>
`));

// ── Section 1: Replication Fidelity, De Novo Variants, and Repeat Expansions ─

// Slide 3 (Section 1, Slide 1): Replication Fidelity
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Replication Fidelity &amp; De Novo Variants</h1>
  <div class="section-label">Section 2 of 5</div>

  <h3>Three Layers of Error Correction</h3>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.red};">1</div>
    <div class="card card-red" style="flex:1; margin-bottom:0;">
      <div class="card-title">Base Selection &nbsp; <span style="font-size:24px; font-weight:500;">Error rate ~1 in 10<sup>4</sup>&ndash;10<sup>5</sup></span></div>
      <div class="card-body">DNA polymerase selects the correct nucleotide by complementary base pairing</div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.amber};">2</div>
    <div class="card card-amber" style="flex:1; margin-bottom:0;">
      <div class="card-title">Proofreading &nbsp; <span style="font-size:24px; font-weight:500;">&rarr; ~1 in 10<sup>7</sup></span></div>
      <div class="card-body">3'&rarr;5' exonuclease of Pol &delta;/&epsilon; corrects ~99% of misinsertions</div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.green};">3</div>
    <div class="card card-green" style="flex:1; margin-bottom:0;">
      <div class="card-title">Mismatch Repair &nbsp; <span style="font-size:24px; font-weight:500;">&rarr; ~1 in 10<sup>9</sup>&ndash;10<sup>10</sup></span></div>
      <div class="card-body">Post-replicative MMR fixes remaining errors; deficiency &rarr; Lynch syndrome</div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:20px;">
    <div class="label">Net Result</div>
    <div class="value">~60&ndash;70 de novo SNVs per individual per generation</div>
    <p style="font-size:24px; margin-top:8px; color:${COLORS.body};">Paternal age is a major contributor: ~2 additional variants per year of paternal age.</p>
  </div>
`));

// Slide 4 (Section 1, Slide 2): Trinucleotide Repeat Expansions
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Trinucleotide Repeat Expansions</h1>
  <div class="section-label">Section 2 of 5 &mdash; Replication Slippage</div>

  <p style="margin-bottom:24px; font-size:29px;">
    Tandem repeats are prone to <strong>replication slippage</strong> &mdash; the polymerase stutters,
    causing expansions that increase across generations (anticipation).
  </p>

  <table>
    <thead>
      <tr>
        <th>Gene (Disease)</th>
        <th>Repeat</th>
        <th>Location</th>
        <th>Mechanism</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>FMR1 (Fragile X)</td>
        <td style="font-weight:700; color:${COLORS.red};">CGG</td>
        <td>5' UTR</td>
        <td>Methylation &rarr; gene silencing (LoF)</td>
      </tr>
      <tr>
        <td>HTT (Huntington)</td>
        <td style="font-weight:700; color:${COLORS.amber};">CAG</td>
        <td>Exon 1</td>
        <td>Polyglutamine expansion (GoF)</td>
      </tr>
      <tr>
        <td>FXN (Friedreich)</td>
        <td style="font-weight:700; color:${COLORS.violet};">GAA</td>
        <td>Intron 1</td>
        <td>Transcription silencing (LoF)</td>
      </tr>
      <tr>
        <td>DMPK (DM1)</td>
        <td style="font-weight:700; color:${COLORS.teal};">CTG</td>
        <td>3' UTR</td>
        <td>RNA toxicity (toxic GoF)</td>
      </tr>
    </tbody>
  </table>

  <div class="card card-red" style="margin-top:8px;">
    <div class="card-title">Clinical Pearl</div>
    <div class="card-body"><strong>Exome sequencing</strong> cannot reliably detect repeat expansions. <strong>WGS can now screen for many STRs</strong> using tools like ExpansionHunter, though large expansions may still require dedicated repeat-primed PCR (RP-PCR) or long-read sequencing for confirmation.</div>
  </div>
`));

// ── Section 2: Transcription and Pre-mRNA Splicing ──────────────────────────

// Slide 5 (Section 2, Slide 1): Transcription & Splicing
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Transcription &amp; Pre-mRNA Splicing</h1>
  <div class="section-label">Section 3 of 5</div>

  <div class="image-panel" style="margin-bottom:20px;">
    <img src="${splicingImg}" style="width:100%; height:auto; max-height:300px; object-fit:contain; padding:16px; background:white;" />
    <div class="image-caption">Pre-mRNA processing: transcription, intron removal, 5&rsquo; cap &amp; poly-A tail <span class="image-credit">&mdash; Nastypatty, CC BY-SA 4.0, via Wikimedia Commons</span></div>
  </div>

  <div class="two-col">
    <div>
      <h3>RNA Processing Pipeline</h3>
      <div class="numbered-item">
        <div class="number-circle" style="background:${mc.accent};">1</div>
        <div><strong style="font-size:28px;">Promoter Recognition</strong><br><span style="font-size:24px;">RNA Pol II binds TATA box / CpG islands</span></div>
      </div>
      <div class="numbered-item">
        <div class="number-circle" style="background:${mc.accent};">2</div>
        <div><strong style="font-size:28px;">Transcription</strong><br><span style="font-size:24px;">Pre-mRNA synthesized 5'&rarr;3'</span></div>
      </div>
      <div class="numbered-item">
        <div class="number-circle" style="background:${COLORS.violet};">3</div>
        <div><strong style="font-size:28px;">5' Cap + 3' Poly-A Tail</strong><br><span style="font-size:24px;">Protects from degradation, signals export</span></div>
      </div>
      <div class="numbered-item">
        <div class="number-circle" style="background:${COLORS.red};">4</div>
        <div><strong style="font-size:28px;">Splicing</strong><br><span style="font-size:24px;">Introns removed, exons joined</span></div>
      </div>
    </div>

    <div>
      <div class="card card-red">
        <div class="card-title">Canonical Splice Sites</div>
        <div class="card-body">
          <p style="font-size:25px; margin-bottom:8px;"><strong>GT</strong> (GU in RNA) at 5' donor site</p>
          <p style="font-size:25px; margin-bottom:8px;"><strong>AG</strong> at 3' acceptor site</p>
          <p style="font-size:25px; margin-bottom:16px;">&pm;1/&pm;2 positions: almost always pathogenic if disrupted</p>
          <p style="font-size:25px; font-weight:600; color:${COLORS.red};">~10&ndash;15% of disease-causing variants affect splicing</p>
        </div>
      </div>
    </div>
  </div>
`));

// Slide 6 (Section 2, Slide 2): Alternative Splicing & Splice Prediction
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Splicing: Clinical Significance</h1>
  <div class="section-label">Section 3 of 5 &mdash; Tissue-Specific Isoforms</div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title">Exonic Splicing Enhancers (ESEs)</div>
        <div class="card-body">Synonymous and deep-intronic variants can disrupt ESEs, causing exon skipping. E.g., certain SCN1A synonymous variants cause Dravet syndrome through splicing disruption.</div>
      </div>
      <div class="card card-violet">
        <div class="card-title">Alternative Splicing</div>
        <div class="card-body">One gene &rarr; multiple mRNA isoforms via exon inclusion/exclusion. Brain-specific exons explain why variants in ubiquitously expressed genes (DYNC1H1, SCN1A) cause purely neurological phenotypes.</div>
      </div>
    </div>
    <div>
      <div class="card card-green" style="margin-bottom:16px;">
        <div class="card-title">In Silico Splice Predictors</div>
        <div class="card-body">SpliceAI and MaxEntScan are essential tools for flagging cryptic splice variants. RNA studies (RT-PCR) provide definitive functional evidence.</div>
      </div>
      <div class="card card-amber">
        <div class="card-title">Clinical Pearl</div>
        <div class="card-body">When a deep-intronic variant is found in an unsolved case, always check SpliceAI score. A score &gt;0.5 strongly suggests splice disruption and warrants RNA-level confirmation.</div>
      </div>
    </div>
  </div>
`));

// ── Section 3: Translation and Protein Function ─────────────────────────────

// Slide 7 (Section 3, Slide 1): Translation
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Translation &amp; Protein Function</h1>
  <div class="section-label">Section 4 of 5</div>

  <div class="three-col" style="margin-bottom:24px;">
    <div class="card card-accent">
      <div class="card-title">Initiation</div>
      <div class="card-body" style="font-size:24px;">Ribosome scans mRNA for AUG start codon. Met-tRNA loaded. Variants at p.Met1? abolish protein production.</div>
    </div>
    <div class="card card-violet">
      <div class="card-title">Elongation</div>
      <div class="card-body" style="font-size:24px;">Reads codons 5'&rarr;3', building protein N&rarr;C terminus. Each codon matched by aminoacyl-tRNA.</div>
    </div>
    <div class="card card-red">
      <div class="card-title">Termination</div>
      <div class="card-body" style="font-size:24px;">Stop codon (UAA/UAG/UGA) &rarr; release factors trigger polypeptide release.</div>
    </div>
  </div>

  <h3>Post-Translational Modifications</h3>
  <table>
    <thead>
      <tr><th>Modification</th><th>Function</th><th>Clinical Relevance</th></tr>
    </thead>
    <tbody>
      <tr><td>Phosphorylation</td><td>Signal transduction, activity regulation</td><td>Kinase cascades in synaptic plasticity</td></tr>
      <tr><td>Glycosylation</td><td>Protein folding, cell signaling</td><td>CDG disorders in neurogenetics</td></tr>
      <tr><td>Ubiquitination</td><td>Protein degradation targeting</td><td>UBE3A in Angelman syndrome</td></tr>
    </tbody>
  </table>
`));

// Slide 8 (Section 3, Slide 2): Protein Function & LoF vs GoF
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Protein Mechanisms: LoF vs GoF</h1>
  <div class="section-label">Section 4 of 5 &mdash; Functional Consequences</div>

  <div class="two-col" style="margin-bottom:24px;">
    <div class="card card-red" style="padding:28px;">
      <div class="card-title" style="font-size:31px;">Loss-of-Function (LoF)</div>
      <div class="card-body" style="font-size:27px;">
        Insufficient protein production or non-functional protein.<br><br>
        <strong>Examples:</strong> SCN1A in Dravet syndrome, MECP2 in Rett syndrome<br><br>
        <strong>Therapy:</strong> Gene replacement, protein supplementation
      </div>
    </div>
    <div class="card card-amber" style="padding:28px;">
      <div class="card-title" style="font-size:31px;">Gain-of-Function (GoF)</div>
      <div class="card-body" style="font-size:27px;">
        Protein has enhanced or novel activity.<br><br>
        <strong>Examples:</strong> KCNQ2 GoF epilepsy, HTT polyglutamine expansion<br><br>
        <strong>Therapy:</strong> Channel blockers, antisense oligonucleotides
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Critical Distinction</div>
    <div class="value">Same gene, different mechanism &rarr; different treatment</div>
    <p style="font-size:25px; margin-top:8px; color:${COLORS.body};">Channel blockers for GoF; gene replacement for LoF. Variant type alone is insufficient &mdash; the molecular mechanism determines therapeutic strategy.</p>
  </div>
`));

// ── Section 4: Variant Types and Their Molecular Consequences ───────────────

// Slide 9 (Section 4, Slide 1): Variant Types
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Variant Types &amp; Consequences</h1>
  <div class="section-label">Section 5 of 5</div>

  <div class="card card-amber" style="margin-bottom:14px;">
    <div class="card-title" style="font-size:31px;">Missense</div>
    <div class="card-body">Single nucleotide change &rarr; different amino acid. Impact ranges from benign to damaging depending on position, chemistry, and conservation.</div>
  </div>

  <div class="card card-red" style="margin-bottom:14px;">
    <div class="card-title" style="font-size:31px;">Nonsense (Stop-Gain)</div>
    <div class="card-body">Creates premature stop codon &rarr; NMD if PTC >50&ndash;55 nt upstream of last exon junction. Typically causes loss of function. PVS1 applicable.</div>
  </div>

  <div class="card card-violet" style="margin-bottom:14px;">
    <div class="card-title" style="font-size:31px;">Frameshift</div>
    <div class="card-body">Insertion/deletion (not multiple of 3) disrupts all downstream codons &rarr; PTC &rarr; NMD. Among the strongest LoF variant types.</div>
  </div>

  <div class="two-col">
    <div class="card card-rose">
      <div class="card-title">Splice-Site</div>
      <div class="card-body" style="font-size:22px;">Disrupts &pm;1/2 donor (GT) or acceptor (AG). Causes exon skipping, intron retention, or cryptic splice activation.</div>
    </div>
    <div class="card card-green">
      <div class="card-title">Synonymous</div>
      <div class="card-body" style="font-size:22px;">No amino acid change &mdash; but NOT always benign. May disrupt exonic splicing enhancers (ESEs). Check with SpliceAI.</div>
    </div>
  </div>
`));

// Slide 10 (Section 4, Slide 2): Key Takeaways
slides.push(takeawaysSlideHTML(MOD, 10, TOTAL, [
  {
    title: "DNA → RNA → Protein is the foundation",
    body: "Understanding this flow is prerequisite for interpreting any genetic variant.",
  },
  {
    title: "Replication fidelity is extraordinary — but imperfect",
    body: "~60–70 de novo SNVs/generation. Repeat slippage causes Fragile X, Huntington, Friedreich ataxia.",
  },
  {
    title: "Splicing variants are underappreciated",
    body: "10–15% of pathogenic variants affect splicing. Tissue-specific isoforms explain organ-restricted phenotypes.",
  },
  {
    title: "LoF vs GoF: the critical clinical distinction",
    body: "Same gene, different mechanism → different treatment. Channel blockers for GoF; gene replacement for LoF.",
  },
  {
    title: "NMD determines truncation consequences",
    body: "PTC >50–55 nt upstream of last exon junction → NMD. Last-exon nonsense may escape NMD, producing toxic truncated protein.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
