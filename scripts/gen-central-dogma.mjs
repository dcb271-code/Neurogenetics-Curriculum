/**
 * scripts/gen-central-dogma.mjs
 *
 * Generates 8 clean, readable slides for the Central Dogma module.
 * Uses puppeteer HTML rendering via the shared design system.
 *
 * Run: node scripts/gen-central-dogma.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "central-dogma";
const mc = MODULE_COLORS[MOD];
const TOTAL = 8;

const slides = [];

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Central Dogma &<br>Molecular Genetics",
  subtitle: "DNA → RNA → Protein: the foundation of genetic medicine",
  totalSlides: TOTAL,
  topics: [
    "DNA structure & the genetic code",
    "DNA replication & genome integrity",
    "Transcription & pre-mRNA splicing",
    "Translation & protein function",
    "Variant types & molecular consequences",
  ],
}));

// ── Slide 2: DNA Structure ─────────────────────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>DNA Structure & the Genetic Code</h1>
  <div class="section-label">Section 1 of 5</div>

  <div class="stats-row">
    <div class="stat-card" style="border-color:${mc.accent}; background:${mc.light};">
      <div class="stat-label">Genome Size</div>
      <div class="stat-value">~3.2 billion bp</div>
    </div>
    <div class="stat-card" style="border-color:${COLORS.green}; background:${COLORS.greenLight};">
      <div class="stat-label">Protein-Coding</div>
      <div class="stat-value">~1.5% of genome</div>
    </div>
    <div class="stat-card" style="border-color:${COLORS.violet}; background:${COLORS.violetLight};">
      <div class="stat-label">Genes</div>
      <div class="stat-value">~20,000</div>
    </div>
    <div class="stat-card" style="border-color:${COLORS.amber}; background:${COLORS.amberLight};">
      <div class="stat-label">Codons</div>
      <div class="stat-value">64 → 20 AAs + stops</div>
    </div>
  </div>

  <div class="two-col">
    <div>
      <h3>Base Pairing Rules</h3>
      <div class="card card-accent" style="padding:20px 24px;">
        <div style="font-size:32px; font-weight:800; color:${mc.dark}; margin-bottom:4px;">A ═ T</div>
        <div class="card-body">2 hydrogen bonds &middot; weaker</div>
      </div>
      <div class="card card-green" style="padding:20px 24px;">
        <div style="font-size:32px; font-weight:800; color:#166534; margin-bottom:4px;">G ≡ C</div>
        <div class="card-body">3 hydrogen bonds &middot; stronger</div>
      </div>
    </div>
    <div>
      <h3>Properties of the Genetic Code</h3>
      <div class="card card-accent" style="padding:16px 20px;">
        <div class="card-title" style="font-size:19px;">Triplet</div>
        <div class="card-body" style="font-size:17px;">3 nucleotides = 1 amino acid (AUG = Met/start)</div>
      </div>
      <div class="card card-violet" style="padding:16px 20px;">
        <div class="card-title" style="font-size:19px;">Degenerate</div>
        <div class="card-body" style="font-size:17px;">Multiple codons per amino acid (e.g. 6 for Leu)</div>
      </div>
      <div class="card card-green" style="padding:16px 20px;">
        <div class="card-title" style="font-size:19px;">Non-overlapping</div>
        <div class="card-body" style="font-size:17px;">Read sequentially; frameshifts disrupt all downstream</div>
      </div>
      <div class="card card-amber" style="padding:16px 20px;">
        <div class="card-title" style="font-size:19px;">Nearly Universal</div>
        <div class="card-body" style="font-size:17px;">Same in virtually all organisms (mito has minor diffs)</div>
      </div>
    </div>
  </div>
`));

// ── Slide 3: DNA Replication ───────────────────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>DNA Replication & Genome Integrity</h1>
  <div class="section-label">Section 2 of 5</div>

  <h3>Replication Fidelity: Three Layers of Error Correction</h3>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.red};">1</div>
    <div class="card card-red" style="flex:1; margin-bottom:0;">
      <div class="card-title">Base Selection &nbsp; <span style="font-size:17px; font-weight:500;">Error rate ~1 in 10<sup>4</sup>&ndash;10<sup>5</sup></span></div>
      <div class="card-body">DNA polymerase selects the correct nucleotide by complementary base pairing</div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.amber};">2</div>
    <div class="card card-amber" style="flex:1; margin-bottom:0;">
      <div class="card-title">Proofreading &nbsp; <span style="font-size:17px; font-weight:500;">→ ~1 in 10<sup>7</sup></span></div>
      <div class="card-body">3'→5' exonuclease of Pol &delta;/&epsilon; corrects ~99% of misinsertions</div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.green};">3</div>
    <div class="card card-green" style="flex:1; margin-bottom:0;">
      <div class="card-title">Mismatch Repair &nbsp; <span style="font-size:17px; font-weight:500;">→ ~1 in 10<sup>9</sup>&ndash;10<sup>10</sup></span></div>
      <div class="card-body">Post-replicative MMR fixes remaining errors; deficiency → Lynch syndrome</div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:20px;">
    <div class="label">Net Result</div>
    <div class="value">~1&ndash;2 de novo SNVs per genome per generation</div>
    <p style="font-size:17px; margin-top:8px; color:${COLORS.body};">~60&ndash;70 de novo SNVs per individual. Paternal age is a major contributor.</p>
  </div>
`));

// ── Slide 4: Trinucleotide Repeats ─────────────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Trinucleotide Repeat Expansions</h1>
  <div class="section-label">Section 2 of 5 — Replication Slippage</div>

  <p style="margin-bottom:24px; font-size:21px;">
    Tandem repeats are prone to <strong>replication slippage</strong> — the polymerase stutters,
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
        <td>Methylation → gene silencing (LoF)</td>
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
    <div class="card-body">Standard exome/genome sequencing <strong>cannot reliably detect</strong> trinucleotide repeat expansions. Dedicated repeat-primed PCR (RP-PCR) or long-read sequencing is required.</div>
  </div>
`));

// ── Slide 5: Transcription & Splicing ──────────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Transcription & Pre-mRNA Splicing</h1>
  <div class="section-label">Section 3 of 5</div>

  <div class="two-col">
    <div>
      <h3>RNA Processing Pipeline</h3>
      <div class="numbered-item">
        <div class="number-circle" style="background:${mc.accent};">1</div>
        <div><strong style="font-size:20px;">Promoter Recognition</strong><br><span style="font-size:17px;">RNA Pol II binds TATA box / CpG islands</span></div>
      </div>
      <div class="numbered-item">
        <div class="number-circle" style="background:${mc.accent};">2</div>
        <div><strong style="font-size:20px;">Transcription</strong><br><span style="font-size:17px;">Pre-mRNA synthesized 5'→3'</span></div>
      </div>
      <div class="numbered-item">
        <div class="number-circle" style="background:${COLORS.violet};">3</div>
        <div><strong style="font-size:20px;">5' Cap + 3' Poly-A Tail</strong><br><span style="font-size:17px;">Protects from degradation, signals export</span></div>
      </div>
      <div class="numbered-item">
        <div class="number-circle" style="background:${COLORS.red};">4</div>
        <div><strong style="font-size:20px;">Splicing</strong><br><span style="font-size:17px;">Introns removed, exons joined</span></div>
      </div>
      <div class="numbered-item">
        <div class="number-circle" style="background:${COLORS.green};">5</div>
        <div><strong style="font-size:20px;">Export</strong><br><span style="font-size:17px;">Mature mRNA → cytoplasm for translation</span></div>
      </div>
    </div>

    <div>
      <div class="card card-red">
        <div class="card-title">Canonical Splice Sites</div>
        <div class="card-body">
          <p style="font-size:18px; margin-bottom:8px;"><strong>GT</strong> (GU in RNA) at 5' donor site</p>
          <p style="font-size:18px; margin-bottom:8px;"><strong>AG</strong> at 3' acceptor site</p>
          <p style="font-size:18px; margin-bottom:16px;">&pm;1/&pm;2 positions: almost always pathogenic if disrupted</p>
          <p style="font-size:18px; font-weight:600; color:${COLORS.red};">~10&ndash;15% of disease-causing variants affect splicing</p>
        </div>
      </div>
      <div class="card card-accent" style="margin-top:12px;">
        <div class="card-title">Alternative Splicing</div>
        <div class="card-body" style="font-size:17px;">One gene → multiple mRNA isoforms via exon inclusion/exclusion. Explains brain-restricted phenotypes from ubiquitously expressed genes.</div>
      </div>
    </div>
  </div>
`));

// ── Slide 6: Translation ───────────────────────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Translation & Protein Function</h1>
  <div class="section-label">Section 4 of 5</div>

  <div class="three-col" style="margin-bottom:24px;">
    <div class="card card-accent">
      <div class="card-title">Initiation</div>
      <div class="card-body" style="font-size:17px;">Ribosome scans mRNA for AUG start codon. Met-tRNA loaded. Variants at p.Met1? abolish protein production.</div>
    </div>
    <div class="card card-violet">
      <div class="card-title">Elongation</div>
      <div class="card-body" style="font-size:17px;">Reads codons 5'→3', building protein N→C terminus. Each codon matched by aminoacyl-tRNA.</div>
    </div>
    <div class="card card-red">
      <div class="card-title">Termination</div>
      <div class="card-body" style="font-size:17px;">Stop codon (UAA/UAG/UGA) → release factors trigger polypeptide release.</div>
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

  <div class="card card-amber">
    <div class="card-title">Loss-of-Function vs Gain-of-Function</div>
    <div class="card-body">This distinction determines treatment: channel blockers for GoF, gene replacement for LoF. Variant type alone is insufficient — context matters.</div>
  </div>
`));

// ── Slide 7: Variant Types ─────────────────────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Variant Types & Consequences</h1>
  <div class="section-label">Section 5 of 5</div>

  <div class="card card-amber" style="margin-bottom:14px;">
    <div class="card-title" style="font-size:24px;">Missense</div>
    <div class="card-body">Single nucleotide change → different amino acid. Impact ranges from benign to damaging depending on position, chemistry, and conservation.</div>
  </div>

  <div class="card card-red" style="margin-bottom:14px;">
    <div class="card-title" style="font-size:24px;">Nonsense (Stop-Gain)</div>
    <div class="card-body">Creates premature stop codon → NMD if PTC >50–55 nt upstream of last exon junction. Typically causes loss of function. PVS1 applicable.</div>
  </div>

  <div class="card card-violet" style="margin-bottom:14px;">
    <div class="card-title" style="font-size:24px;">Frameshift</div>
    <div class="card-body">Insertion/deletion (not multiple of 3) disrupts all downstream codons → PTC → NMD. Among the strongest LoF variant types.</div>
  </div>

  <div class="two-col">
    <div class="card card-rose">
      <div class="card-title">Splice-Site</div>
      <div class="card-body" style="font-size:16px;">Disrupts &pm;1/2 donor (GT) or acceptor (AG). Causes exon skipping, intron retention, or cryptic splice activation.</div>
    </div>
    <div class="card card-green">
      <div class="card-title">Synonymous</div>
      <div class="card-body" style="font-size:16px;">No amino acid change — but NOT always benign. May disrupt exonic splicing enhancers (ESEs). Check with SpliceAI.</div>
    </div>
  </div>
`));

// ── Slide 8: Key Takeaways ─────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 8, TOTAL, [
  {
    title: "DNA → RNA → Protein is the foundation",
    body: "Understanding this flow is prerequisite for interpreting any genetic variant.",
  },
  {
    title: "Replication fidelity is extraordinary — but imperfect",
    body: "~1–2 de novo SNVs/generation. Repeat slippage causes Fragile X, Huntington, Friedreich ataxia.",
  },
  {
    title: "Splicing variants are underappreciated",
    body: "10–15% of pathogenic variants affect splicing. Tissue-specific isoforms explain organ-restricted phenotypes.",
  },
  {
    title: "Variant type ≠ molecular consequence",
    body: "Last-exon nonsense may escape NMD. Synonymous can disrupt ESEs. Context is everything.",
  },
  {
    title: "LoF vs GoF: the critical clinical distinction",
    body: "Same gene, different mechanism → different treatment. Channel blockers for GoF; gene replacement for LoF.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
