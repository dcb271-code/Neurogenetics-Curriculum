/**
 * scripts/gen-variant-interpretation.mjs
 *
 * Generates 12 slides (6 sections × 2 slides each) for the Variant Interpretation module.
 * Section alignment matches data/modules/variant-interpretation.json exactly.
 *
 * Run: node scripts/gen-variant-interpretation.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "variant-interpretation";
const mc = MODULE_COLORS[MOD];
const TOTAL = 12;

const slides = [];

/* ================================================================
   Section 0: The ACMG/AMP Classification Framework (slides 1–2)
   ================================================================ */

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Variant Interpretation:<br>ACMG/AMP Framework",
  subtitle: "Richards et al., 2015 — Bayesian point system (Tavtigian 2018)",
  totalSlides: TOTAL,
  topics: [
    "5-tier classification &amp; Bayesian points",
    "Population &amp; computational evidence",
    "Functional &amp; clinical evidence",
    "Segregation, de novo &amp; allelic criteria",
    "Special variant types &amp; PVS1 calibration",
    "Clinical reporting &amp; VUS management",
  ],
}));

// ── Slide 2: 5-Tier System + Bayesian Points ───────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>ACMG/AMP 5-Tier Classification</h1>
  <div class="section-label">28 Criteria &bull; Bayesian Point System (Tavtigian 2018)</div>

  <div style="display:flex; gap:12px; margin-bottom:24px;">
    <div style="flex:1; background:#dc2626; color:white; border-radius:12px; padding:18px 16px; text-align:center;">
      <div style="font-size:30px; font-weight:800;">P</div>
      <div style="font-size:16px; font-weight:600; margin-top:2px;">&ge;99%</div>
    </div>
    <div style="flex:1; background:#f97316; color:white; border-radius:12px; padding:18px 16px; text-align:center;">
      <div style="font-size:30px; font-weight:800;">LP</div>
      <div style="font-size:16px; font-weight:600; margin-top:2px;">&ge;90%</div>
    </div>
    <div style="flex:1; background:#eab308; color:white; border-radius:12px; padding:18px 16px; text-align:center;">
      <div style="font-size:30px; font-weight:800;">VUS</div>
      <div style="font-size:16px; font-weight:600; margin-top:2px;">10–90%</div>
    </div>
    <div style="flex:1; background:#22c55e; color:white; border-radius:12px; padding:18px 16px; text-align:center;">
      <div style="font-size:30px; font-weight:800;">LB</div>
      <div style="font-size:16px; font-weight:600; margin-top:2px;">&le;10%</div>
    </div>
    <div style="flex:1; background:#3b82f6; color:white; border-radius:12px; padding:18px 16px; text-align:center;">
      <div style="font-size:30px; font-weight:800;">B</div>
      <div style="font-size:16px; font-weight:600; margin-top:2px;">&le;1%</div>
    </div>
  </div>

  <div class="two-col">
    <div>
      <h3>Bayesian Point Values</h3>
      <table>
        <thead><tr><th>Strength</th><th>Path.</th><th>Benign</th></tr></thead>
        <tbody>
          <tr><td>Very Strong</td><td style="font-weight:800; color:${COLORS.red};">+8</td><td>&minus;8</td></tr>
          <tr><td>Strong</td><td style="font-weight:800; color:${COLORS.red};">+4</td><td>&minus;4</td></tr>
          <tr><td>Moderate</td><td style="font-weight:800; color:${COLORS.amber};">+2</td><td>&minus;2</td></tr>
          <tr><td>Supporting</td><td>+1</td><td>&minus;1</td></tr>
        </tbody>
      </table>
    </div>
    <div>
      <h3>Score Thresholds</h3>
      <table>
        <thead><tr><th>Score</th><th>Classification</th></tr></thead>
        <tbody>
          <tr><td>&ge;10</td><td style="font-weight:700; color:${COLORS.red};">Pathogenic</td></tr>
          <tr><td>6 &ndash; 9</td><td style="font-weight:700; color:#f97316;">Likely Pathogenic</td></tr>
          <tr><td>0 &ndash; 5</td><td>VUS</td></tr>
          <tr><td>&minus;1 to &minus;6</td><td style="color:${COLORS.green};">Likely Benign</td></tr>
          <tr><td>&le;&minus;7</td><td style="color:${COLORS.blue};">Benign</td></tr>
        </tbody>
      </table>
      <div class="card card-amber" style="padding:14px 18px; margin-top:4px;">
        <div class="card-body" style="font-size:17px;"><strong>BA1 (AF &gt;5%)</strong> is stand-alone Benign regardless of other criteria</div>
      </div>
    </div>
  </div>
`));

/* ================================================================
   Section 1: Population and Computational Evidence (slides 3–4)
   ================================================================ */

// ── Slide 3: Population Frequency (BA1/BS1/PM2 + gnomAD) ──────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Population Frequency Evidence</h1>
  <div class="section-label">gnomAD &bull; BA1 / BS1 / PM2</div>

  <div class="card card-blue" style="margin-bottom:14px;">
    <div class="card-title" style="font-size:22px;">BA1 &mdash; Stand-Alone Benign</div>
    <div class="card-body">Allele frequency <strong>&gt;5%</strong> in any gnomAD subpopulation &rarr; Benign regardless of other criteria</div>
  </div>

  <div class="two-col" style="margin-bottom:14px;">
    <div class="card card-green" style="margin-bottom:0;">
      <div class="card-title">BS1 &mdash; Strong Benign</div>
      <div class="card-body">AF greater than expected for disease prevalence. Gene- and disease-specific thresholds apply.</div>
    </div>
    <div class="card card-accent" style="margin-bottom:0;">
      <div class="card-title">PM2 &mdash; Now Supporting (+1)</div>
      <div class="card-body">Absent or extremely rare in gnomAD. ClinGen downgraded PM2 to Supporting in 2023 — rarity alone is weak evidence.</div>
    </div>
  </div>

  <div class="card card-amber">
    <div class="card-title">gnomAD Caveats</div>
    <div class="card-body" style="font-size:18px;">
      &bull; Contains individuals with severe disease (including neuropsychiatric) &mdash; rare pathogenic recessive variants may be present at carrier frequency<br>
      &bull; Check <strong>subpopulation</strong> frequencies &mdash; a variant rare overall may be common in a specific population<br>
      &bull; Use <strong>filtering allele frequency (FAF)</strong> over raw AF for population-structure-adjusted thresholds
    </div>
  </div>
`));

// ── Slide 4: Computational Tools + ClinVar ─────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Computational &amp; Database Evidence</h1>
  <div class="section-label">PP3 / BP4 &bull; ClinVar &bull; Conservation vs. Constraint</div>

  <table style="margin-bottom:16px;">
    <thead><tr><th>Tool</th><th>Type</th><th>Key Threshold</th></tr></thead>
    <tbody>
      <tr><td>REVEL</td><td>Ensemble meta-predictor</td><td>&gt;0.5&ndash;0.7 pathogenic support</td></tr>
      <tr><td>CADD</td><td>Deleteriousness (Phred-scaled)</td><td>&gt;20 = top 1% most deleterious</td></tr>
      <tr><td>AlphaMissense</td><td>Structure-based (AlphaFold)</td><td>Score 0&ndash;1</td></tr>
      <tr><td>SpliceAI</td><td>Splice effect predictor</td><td>&gt;0.5 = likely splice effect</td></tr>
    </tbody>
  </table>

  <div class="two-col">
    <div class="card card-violet">
      <div class="card-title">Conservation vs. Constraint</div>
      <div class="card-body" style="font-size:18px;">
        <strong>Conservation</strong> (PhyloP, GERP++): cross-species evolutionary preservation<br><br>
        <strong>Constraint</strong> (pLI, LOEUF): within-species intolerance to LoF in humans<br><br>
        Distinct concepts providing <strong>complementary</strong> information
      </div>
    </div>
    <div class="card card-accent">
      <div class="card-title">ClinVar Star Ratings</div>
      <div class="card-body" style="font-size:18px;">
        &#9733; Single submitter<br>
        &#9733;&#9733; Criteria provided<br>
        &#9733;&#9733;&#9733; Expert panel reviewed<br>
        &#9733;&#9733;&#9733;&#9733; Practice guideline<br><br>
        Discordant classifications between labs are common &mdash; always trace to primary evidence
      </div>
    </div>
  </div>
`));

/* ================================================================
   Section 2: Functional and Clinical Evidence (slides 5–6)
   ================================================================ */

// ── Slide 5: PS3/BS3 Functional Studies ────────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Functional Study Evidence (PS3/BS3)</h1>
  <div class="section-label">Well-Established Assays with Validated Controls</div>

  <div class="two-col" style="margin-bottom:18px;">
    <div class="card card-red">
      <div class="card-title">PS3 &mdash; Strong Pathogenic (+4)</div>
      <div class="card-body" style="font-size:18px;">
        Well-established functional studies demonstrating a <strong>damaging effect</strong> on the gene product<br><br>
        &bull; Assay must measure function <strong>relevant to disease mechanism</strong><br>
        &bull; Must include positive + negative controls<br>
        &bull; Must be validated against known pathogenic &amp; benign variants<br>
        &bull; Strength can be calibrated: Strong &rarr; Moderate &rarr; Supporting
      </div>
    </div>
    <div class="card card-green">
      <div class="card-title">BS3 &mdash; Strong Benign (&minus;4)</div>
      <div class="card-body" style="font-size:18px;">
        Same standard: well-established functional studies showing <strong>no damaging effect</strong><br><br>
        &bull; In vitro overexpression without validation does NOT meet PS3/BS3 standard<br>
        &bull; Animal models require careful interpretation of species differences
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">VCEP Guidelines</div>
    <div class="value" style="font-size:22px;">Gene-specific VCEP SOPs define exactly which functional assays qualify at which strength level — always check before applying PS3/BS3</div>
  </div>
`));

// ── Slide 6: PS4 Case-Level + PP4 Phenotype ───────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Case-Level &amp; Phenotype Evidence</h1>
  <div class="section-label">PS4 &bull; PP4 &bull; Neurogenetics Applications</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div>
      <div class="card card-red" style="margin-bottom:14px;">
        <div class="card-title">PS4 &mdash; Strong Pathogenic</div>
        <div class="card-body" style="font-size:18px;">
          Variant significantly more frequent in cases vs. controls<br><br>
          <strong>Full strength:</strong> OR &ge;5.0, CI not overlapping 1.0<br>
          <strong>PS4_Moderate:</strong> &ge;2 unrelated probands<br>
          <strong>PS4 full:</strong> &ge;6 unrelated probands
        </div>
      </div>
    </div>
    <div>
      <div class="card card-accent" style="margin-bottom:14px;">
        <div class="card-title">PP4 &mdash; Supporting Pathogenic</div>
        <div class="card-body" style="font-size:18px;">
          Phenotype is highly specific for a single-gene disorder<br><br>
          <strong>Strong in neurogenetics:</strong> distinctive electroclinical syndromes<br>
          <em>Example:</em> Dravet syndrome &rarr; SCN1A<br><br>
          <strong>Weak for:</strong> non-specific phenotypes like &ldquo;epilepsy&rdquo; or &ldquo;intellectual disability&rdquo;
        </div>
      </div>
    </div>
  </div>

  <div class="card card-amber">
    <div class="card-title">Neurogenetics Pearl</div>
    <div class="card-body">PP4 is most informative for electroclinical syndromes with distinctive seizure types, EEG patterns, and developmental trajectories that point to a specific gene — less useful for broad phenotypic categories</div>
  </div>
`));

/* ================================================================
   Section 3: Segregation, De Novo, and Inheritance-Based Evidence (slides 7–8)
   ================================================================ */

// ── Slide 7: PS2/PM6 De Novo + PP1 Segregation ────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>De Novo &amp; Segregation Evidence</h1>
  <div class="section-label">PS2 / PM6 &bull; PP1 / BS4</div>

  <div class="two-col" style="margin-bottom:18px;">
    <div>
      <div class="card card-red" style="margin-bottom:14px;">
        <div class="card-title">PS2 &mdash; Strong (+4)</div>
        <div class="card-body" style="font-size:18px;">
          <strong>Confirmed</strong> de novo by parental testing<br>
          Both parents tested and confirmed negative<br>
          Exceptionally powerful in NDD where affected individuals rarely reproduce
        </div>
      </div>
      <div class="card card-amber">
        <div class="card-title">PM6 &mdash; Moderate (+2)</div>
        <div class="card-body" style="font-size:18px;">
          <strong>Assumed</strong> de novo &mdash; maternity/paternity not confirmed<br>
          Weaker than PS2 due to uncertainty about non-paternity, parental mosaicism, or lab error
        </div>
      </div>
    </div>

    <div>
      <div class="card card-accent" style="margin-bottom:14px;">
        <div class="card-title">PP1 &mdash; Segregation (Supporting &rarr; Strong)</div>
        <div class="card-body" style="font-size:18px;">
          Variant co-segregates with disease in family<br><br>
          LOD &ge;1.5 (~3 meioses): <strong>Supporting</strong> (+1)<br>
          LOD &ge;3.0 (~6 meioses): <strong>Moderate</strong> (+2)<br>
          LOD &ge;5.0: <strong>Strong</strong> (+4)
        </div>
      </div>
      <div class="card card-green">
        <div class="card-title">BS4 &mdash; Strong Benign (&minus;4)</div>
        <div class="card-body" style="font-size:18px;">
          Variant does NOT segregate &mdash; affected family member lacks the variant<br>
          Consider reduced penetrance and phenocopies before applying
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 8: PM3/BP2 Allelic Evidence ──────────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Allelic &amp; Inheritance-Based Evidence</h1>
  <div class="section-label">PM3 / BP2 &bull; Phasing &bull; Compound Heterozygosity</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div class="card card-accent">
      <div class="card-title">PM3 &mdash; Moderate (+2)</div>
      <div class="card-body" style="font-size:18px;">
        For <strong>autosomal recessive</strong> disorders: variant detected <strong>in trans</strong> with a known pathogenic variant<br><br>
        Strength scales with independent observations:<br>
        &bull; 1 observation: PM3 Moderate (+2)<br>
        &bull; Multiple independent: PM3_Strong (+4)<br><br>
        Establishes that both alleles are affected
      </div>
    </div>
    <div class="card card-violet">
      <div class="card-title">BP2 &mdash; Supporting Benign (&minus;1)</div>
      <div class="card-body" style="font-size:18px;">
        Two scenarios:<br><br>
        <strong>1.</strong> In trans with pathogenic variant in a <strong>dominant</strong> disorder &mdash; second variant is likely benign<br><br>
        <strong>2.</strong> In cis with a pathogenic variant &mdash; second variant is likely a passenger, not independently pathogenic
      </div>
    </div>
  </div>

  <div class="card card-amber">
    <div class="card-title">Phasing Is Essential</div>
    <div class="card-body">Two heterozygous variants in an AR gene require <strong>parental testing</strong> to confirm they are in trans (on different alleles). Without phasing, compound heterozygosity cannot be confirmed &mdash; both variants could be on the same allele (in cis).</div>
  </div>
`));

/* ================================================================
   Section 4: Special Variant Types and Classification Challenges (slides 9–10)
   ================================================================ */

// ── Slide 9: PVS1 Calibration + Splice Variants ───────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>PVS1 Calibration &amp; Splice Variants</h1>
  <div class="section-label">Abou Tayoun 2018 &bull; Loss-of-Function Evidence</div>

  <table style="margin-bottom:16px;">
    <thead><tr><th>PVS1 Strength</th><th>Points</th><th>Applies To</th></tr></thead>
    <tbody>
      <tr><td style="color:${COLORS.red};">Very Strong</td><td style="font-weight:800;">+8</td><td>Canonical splice &pm;1,2 &bull; NMD-triggering nonsense/frameshift &bull; complete gene deletion</td></tr>
      <tr><td style="color:#f97316;">Strong</td><td style="font-weight:800;">+4</td><td>Last exon / NMD-escaping variants &bull; splice variants with confirmed effect</td></tr>
      <tr><td style="color:${COLORS.amber};">Moderate</td><td style="font-weight:800;">+2</td><td>Uncertain splice region variants &bull; initiation codon (p.Met1?)</td></tr>
      <tr><td>Supporting</td><td>+1</td><td>Gene with unestablished LoF mechanism</td></tr>
    </tbody>
  </table>

  <div class="two-col">
    <div class="card card-red">
      <div class="card-title">PVS1 Does NOT Apply to GoF Genes</div>
      <div class="card-body" style="font-size:18px;">
        Critical in neurogenetics: KCNQ3, certain SCN8A contexts, GRIN2A &mdash; disease through gain-of-function missense, not LoF<br><br>
        A truncating variant in a GoF gene may be <strong>benign or protective</strong>
      </div>
    </div>
    <div class="card card-accent">
      <div class="card-title">Splice Variant Interpretation</div>
      <div class="card-body" style="font-size:18px;">
        Canonical &pm;1,2: PVS1 Very Strong<br>
        Extended region (&pm;3 to &pm;8): requires SpliceAI<br>
        RNA studies (RT-PCR) can confirm and upgrade strength<br>
        Cryptic splice activation requires RNA analysis
      </div>
    </div>
  </div>
`));

// ── Slide 10: Repeat Expansions, Mosaicism, PM1 ───────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Special Variant Types &amp; Challenges</h1>
  <div class="section-label">Repeat Expansions &bull; Mosaicism &bull; Hotspot Residues</div>

  <div class="two-col" style="margin-bottom:16px;">
    <div class="card card-violet">
      <div class="card-title">Repeat Expansions</div>
      <div class="card-body" style="font-size:18px;">
        Trinucleotide repeats (Huntington, FMR1), C9orf72 hexanucleotide &mdash; <strong>fall outside standard ACMG/AMP framework</strong><br><br>
        Require gene-specific interpretation guidelines and specialised testing: Southern blot, RP-PCR, long-read sequencing
      </div>
    </div>
    <div class="card card-red">
      <div class="card-title">Somatic Mosaicism</div>
      <div class="card-body" style="font-size:18px;">
        Low-level parental mosaicism can <strong>mimic de novo</strong> inheritance<br><br>
        Proband mosaicism: VAF &lt;&lt;50% &mdash; may be missed by standard filtering<br><br>
        Deep sequencing (&gt;500x) or specialised tools may be needed
      </div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">PM1 &mdash; Hotspot Residues (+2)</div>
      <div class="card-body" style="font-size:18px;">
        Variant in a critical functional domain without benign variation<br><br>
        <strong>Neurogenetics:</strong> voltage sensor S4 segments (KCNQ2, SCN1A), selectivity filters, ligand-binding domains (GRIN2A, GRIN2B)
      </div>
    </div>
    <div class="card card-amber">
      <div class="card-title">PM4 / BP3 &mdash; In-Frame Changes</div>
      <div class="card-body" style="font-size:18px;">
        <strong>PM4 (+2):</strong> In-frame indels in non-repetitive region or stop-loss variants<br><br>
        <strong>BP3 (&minus;1):</strong> In-frame indel in a repetitive region of unknown function &mdash; likely tolerated
      </div>
    </div>
  </div>
`));

/* ================================================================
   Section 5: Clinical Reporting and Practical Application (slides 11–12)
   ================================================================ */

// ── Slide 11: VUS Management + Re-Analysis ─────────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>VUS Management &amp; Re-Analysis</h1>
  <div class="section-label">Clinical Reporting &bull; Reclassification Workflows</div>

  <div class="card card-amber" style="margin-bottom:14px; padding:18px 24px;">
    <div class="card-body" style="font-size:20px; font-style:italic; color:#92400e;">
      &ldquo;This variant is currently classified as uncertain &mdash; we do not yet have enough evidence to know whether it contributes to your child&rsquo;s condition or is a harmless change.&rdquo;
    </div>
  </div>

  <div class="two-col" style="margin-bottom:14px;">
    <div>
      <div class="numbered-item">
        <div class="number-circle" style="background:${COLORS.red};">1</div>
        <div><strong style="font-size:20px;">Never use VUS for clinical decisions</strong><br><span style="font-size:17px;">Management guided by clinical findings only</span></div>
      </div>
      <div class="numbered-item">
        <div class="number-circle" style="background:${COLORS.amber};">2</div>
        <div><strong style="font-size:20px;">Re-analyse every 1&ndash;2 years</strong><br><span style="font-size:17px;">New diagnoses in ~10&ndash;25% of re-analysed cases</span></div>
      </div>
      <div class="numbered-item">
        <div class="number-circle" style="background:${mc.accent};">3</div>
        <div><strong style="font-size:20px;">Pursue family segregation testing</strong><br><span style="font-size:17px;">Generates PP1 or BS4 evidence to shift classification</span></div>
      </div>
    </div>
    <div>
      <div class="card card-accent" style="margin-bottom:14px;">
        <div class="card-title">VUS Reclassification</div>
        <div class="card-body" style="font-size:17px;">
          ~10&ndash;20% reclassified within 5 years<br>
          Majority move toward <strong>benign/likely benign</strong><br>
          Sources: gnomAD growth, new functional studies, ClinGen VCEPs
        </div>
      </div>
      <div class="card card-red">
        <div class="card-title">ClinGen VCEPs</div>
        <div class="card-body" style="font-size:17px;">Gene-specific guidelines <strong>REPLACE</strong> generic ACMG rules for that gene — always check for published VCEP SOPs (e.g., SCN1A, CDH1, RASopathy genes)</div>
      </div>
    </div>
  </div>
`));

// ── Slide 12: Key Takeaways ────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 12, TOTAL, [
  {
    title: "Bayesian points quantify evidence",
    body: "Very Strong ±8, Strong ±4, Moderate ±2, Supporting ±1. Thresholds: ≥10 = P, 6–9 = LP, 0–5 = VUS, −1 to −6 = LB, ≤−7 = B.",
  },
  {
    title: "Population frequency is foundational",
    body: "BA1 (AF >5%) is stand-alone Benign. PM2 downgraded to Supporting — rarity alone is weak evidence of pathogenicity.",
  },
  {
    title: "PVS1 strength depends on context",
    body: "Calibrate per Abou Tayoun 2018. Does NOT apply to GoF genes — critical in neurogenetics ion channels.",
  },
  {
    title: "De novo (PS2) is powerful in NDD",
    body: "Confirmed de novo = Strong (+4). Most NDD variants are initially VUS — reclassification over time is expected.",
  },
  {
    title: "VUS is NOT a diagnosis",
    body: "Never drive clinical decisions. Re-analyse every 1–2 years. Encourage family segregation testing to generate evidence.",
  },
  {
    title: "VCEP guidelines replace generic rules",
    body: "Gene-specific ClinGen rules adjust thresholds, define qualifying assays, and restrict inapplicable criteria.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
