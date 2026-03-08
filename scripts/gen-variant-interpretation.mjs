/**
 * scripts/gen-variant-interpretation.mjs
 *
 * Generates 10 clean, readable slides for the Variant Interpretation module.
 * Covers the ACMG/AMP framework (Richards et al., 2015).
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
const TOTAL = 10;

const slides = [];

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Variant Interpretation:<br>ACMG/AMP Framework",
  subtitle: "Richards et al., 2015",
  totalSlides: TOTAL,
  topics: [
    "5-Tier classification system",
    "Evidence categories & strength levels",
    "Population frequency & computational tools",
    "Neurogenetics-specific considerations",
    "Worked example: SCN1A in Dravet syndrome",
    "Managing VUS & common pitfalls",
  ],
}));

// ── Slide 2: ACMG/AMP 5-Tier Classification ───────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>ACMG/AMP 5-Tier Classification</h1>
  <div class="section-label">Standardized Variant Categories</div>

  <div style="display:flex; gap:12px; margin-bottom:32px;">
    <div style="flex:1; background:#dc2626; color:white; border-radius:12px; padding:22px 20px; text-align:center;">
      <div style="font-size:36px; font-weight:800;">5</div>
      <div style="font-size:18px; font-weight:700; margin-top:4px;">Pathogenic</div>
    </div>
    <div style="flex:1; background:#f97316; color:white; border-radius:12px; padding:22px 20px; text-align:center;">
      <div style="font-size:36px; font-weight:800;">4</div>
      <div style="font-size:18px; font-weight:700; margin-top:4px;">Likely<br>Pathogenic</div>
    </div>
    <div style="flex:1; background:#eab308; color:white; border-radius:12px; padding:22px 20px; text-align:center;">
      <div style="font-size:36px; font-weight:800;">3</div>
      <div style="font-size:18px; font-weight:700; margin-top:4px;">VUS</div>
    </div>
    <div style="flex:1; background:#22c55e; color:white; border-radius:12px; padding:22px 20px; text-align:center;">
      <div style="font-size:36px; font-weight:800;">2</div>
      <div style="font-size:18px; font-weight:700; margin-top:4px;">Likely<br>Benign</div>
    </div>
    <div style="flex:1; background:#3b82f6; color:white; border-radius:12px; padding:22px 20px; text-align:center;">
      <div style="font-size:36px; font-weight:800;">1</div>
      <div style="font-size:18px; font-weight:700; margin-top:4px;">Benign</div>
    </div>
  </div>

  <h3>Evidence Strength Levels</h3>
  <div style="display:flex; gap:16px;">
    <div class="card card-red" style="flex:1;">
      <div class="card-title">Stand-alone</div>
      <div class="card-body" style="font-size:17px;">Single criterion sufficient (PVS1, BA1)</div>
    </div>
    <div class="card card-amber" style="flex:1;">
      <div class="card-title">Strong</div>
      <div class="card-body" style="font-size:17px;">PS1&ndash;PS4 (pathogenic) or BS1&ndash;BS4 (benign)</div>
    </div>
    <div class="card card-accent" style="flex:1;">
      <div class="card-title">Moderate</div>
      <div class="card-body" style="font-size:17px;">PM1&ndash;PM6 criteria</div>
    </div>
    <div class="card card-green" style="flex:1;">
      <div class="card-title">Supporting</div>
      <div class="card-body" style="font-size:17px;">PP1&ndash;PP5 or BP1&ndash;BP7</div>
    </div>
  </div>
`));

// ── Slide 3: PVS1 — Loss-of-Function Evidence ─────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>PVS1 &mdash; Loss-of-Function Evidence</h1>
  <div class="section-label">The Only Stand-Alone Pathogenic Criterion</div>

  <div class="two-col">
    <div>
      <h3>Eligible Null Variant Types</h3>
      <ul class="bullet-list">
        <li>Nonsense (stop-gain)</li>
        <li>Frameshift (insertion/deletion)</li>
        <li>Canonical splice site (&pm;1/&pm;2)</li>
        <li>Initiation codon (p.Met1?)</li>
        <li>Single or multi-exon deletion</li>
      </ul>
    </div>

    <div>
      <div class="card card-red" style="margin-bottom:16px;">
        <div class="card-title">Caveats &mdash; PVS1 Does NOT Apply When:</div>
        <div class="card-body">
          <p style="font-size:18px; margin-bottom:8px;">&bull; Variant in <strong>last exon</strong> (NMD escape)</p>
          <p style="font-size:18px; margin-bottom:8px;">&bull; Gene acts via <strong>gain-of-function</strong></p>
          <p style="font-size:18px;">&bull; Gene is <strong>LoF-tolerant</strong> (pLI &lt; 0.9)</p>
        </div>
      </div>

      <div class="highlight-box">
        <div class="label">Key Fact</div>
        <div class="value" style="font-size:22px;">PVS1 is the ONLY criterion that can classify a variant as pathogenic on its own</div>
      </div>
    </div>
  </div>
`));

// ── Slide 4: Population Frequency Evidence ─────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Population Frequency Evidence</h1>
  <div class="section-label">gnomAD & Population Databases</div>

  <div class="card card-blue" style="margin-bottom:18px;">
    <div class="card-title" style="font-size:22px;">BA1 &mdash; Stand-Alone Benign</div>
    <div class="card-body">Allele frequency <strong>&gt;5%</strong> in any population &rarr; variant is benign. No further evidence needed.</div>
  </div>

  <div class="card card-green" style="margin-bottom:18px;">
    <div class="card-title" style="font-size:22px;">BS1 &mdash; Strong Benign</div>
    <div class="card-body">Frequency <strong>greater than expected</strong> for the disorder. Threshold varies by disease prevalence and penetrance.</div>
  </div>

  <div class="card card-accent" style="margin-bottom:18px;">
    <div class="card-title" style="font-size:22px;">PM2 &mdash; Moderate Pathogenic</div>
    <div class="card-body"><strong>Absent from gnomAD</strong> or present at extremely low frequency in all populations.</div>
  </div>

  <div class="card card-amber">
    <div class="card-title" style="font-size:22px;">Caution: Population Selection</div>
    <div class="card-body">Use the appropriate ancestral population. Founder variants (e.g., Ashkenazi Jewish) may be enriched without being benign.</div>
  </div>
`));

// ── Slide 5: Computational & Segregation Evidence ──────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Computational & Segregation Evidence</h1>
  <div class="section-label">In Silico + Family Studies</div>

  <div class="two-col">
    <div>
      <h3>Computational Tools</h3>
      <table>
        <thead>
          <tr><th>Tool</th><th>What It Assesses</th></tr>
        </thead>
        <tbody>
          <tr><td>REVEL</td><td>Ensemble missense prediction</td></tr>
          <tr><td>CADD</td><td>General deleteriousness</td></tr>
          <tr><td>AlphaMissense</td><td>Protein structure impact</td></tr>
          <tr><td>SpliceAI</td><td>Splicing disruption</td></tr>
        </tbody>
      </table>
    </div>

    <div>
      <h3>Clinical &amp; Segregation Criteria</h3>
      <div class="card card-red" style="padding:16px 20px; margin-bottom:12px;">
        <div class="card-title" style="font-size:20px;">PS2 &mdash; De Novo</div>
        <div class="card-body" style="font-size:17px;">Confirmed maternity &amp; paternity &rarr; Strong pathogenic</div>
      </div>
      <div class="card card-accent" style="padding:16px 20px; margin-bottom:12px;">
        <div class="card-title" style="font-size:20px;">PS4 &mdash; Case-Control</div>
        <div class="card-body" style="font-size:17px;">Statistically enriched in affected vs. controls</div>
      </div>
      <div class="card card-violet" style="padding:16px 20px; margin-bottom:12px;">
        <div class="card-title" style="font-size:20px;">PP1 / BS4 &mdash; Segregation</div>
        <div class="card-body" style="font-size:17px;">Co-segregation supports pathogenic; non-segregation supports benign</div>
      </div>
      <div class="card card-green" style="padding:16px 20px;">
        <div class="card-title" style="font-size:20px;">PM3 &mdash; In Trans</div>
        <div class="card-body" style="font-size:17px;">Detected in trans with known pathogenic variant (for AR disorders)</div>
      </div>
    </div>
  </div>
`));

// ── Slide 6: Neurogenetics-Specific Considerations ─────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Neurogenetics-Specific Considerations</h1>
  <div class="section-label">Adapting ACMG/AMP for Neuro Genes</div>

  <div class="two-col">
    <div>
      <div class="card card-red" style="margin-bottom:16px;">
        <div class="card-title">GoF Genes: SCN8A, GRIN2A</div>
        <div class="card-body">PVS1 does <strong>NOT</strong> apply. Disease caused by specific missense variants in functional hotspots, not loss of function.</div>
      </div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title">PM1 &mdash; Mutational Hotspots</div>
        <div class="card-body">Voltage-sensor S4 segments and pore loops in ion channels are established critical domains.</div>
      </div>
    </div>

    <div>
      <div class="card card-violet" style="margin-bottom:16px;">
        <div class="card-title">PS2 &mdash; De Novo Power</div>
        <div class="card-body">Exceptionally powerful in severe neurodevelopmental disorders where affected individuals rarely reproduce.</div>
      </div>
      <div class="card card-amber" style="margin-bottom:16px;">
        <div class="card-title">ClinGen VCEPs</div>
        <div class="card-body">Gene-specific expert panels modify standard ACMG rules for individual genes (e.g., SCN1A, PTEN, RASopathy genes).</div>
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:22px;">Always check ClinGen for gene-specific ACMG rule modifications before classifying variants</div>
  </div>
`));

// ── Slide 7: Worked Example — SCN1A Frameshift in Dravet ──────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Worked Example: SCN1A in Dravet</h1>
  <div class="section-label">Step-by-Step Classification</div>

  <div class="card card-accent" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">Variant: SCN1A c.1234delG, p.Val412CysfsTer5</div>
    <div class="card-body">Frameshift in a known haploinsufficiency gene. Child with refractory seizures onset at 6 months.</div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.red};">1</div>
    <div class="card card-red" style="flex:1; margin-bottom:0;">
      <div class="card-title">PVS1 &mdash; Very Strong</div>
      <div class="card-body" style="font-size:18px;">Null variant (frameshift) in an established LoF gene for Dravet syndrome</div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${mc.accent};">2</div>
    <div class="card card-accent" style="flex:1; margin-bottom:0;">
      <div class="card-title">PM2 &mdash; Moderate</div>
      <div class="card-body" style="font-size:18px;">Absent from gnomAD (all populations)</div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.violet};">3</div>
    <div class="card card-violet" style="flex:1; margin-bottom:0;">
      <div class="card-title">PS2 &mdash; Strong</div>
      <div class="card-body" style="font-size:18px;">Confirmed de novo (maternity and paternity verified)</div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.green};">4</div>
    <div class="card card-green" style="flex:1; margin-bottom:0;">
      <div class="card-title">PP4 &mdash; Supporting</div>
      <div class="card-body" style="font-size:18px;">Phenotype (Dravet) is highly specific for SCN1A</div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:12px;">
    <div class="label">Final Classification</div>
    <div class="value">Pathogenic &nbsp;(PVS1 + PS2 + PM2 + PP4)</div>
  </div>
`));

// ── Slide 8: VUS — What to Tell Patients ───────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>VUS &mdash; What to Tell Patients</h1>
  <div class="section-label">Communicating Uncertainty</div>

  <div class="card card-amber" style="margin-bottom:12px; padding:18px 24px;">
    <div class="card-body" style="font-size:20px; font-style:italic; color:#92400e;">
      &ldquo;This result means we found a change in a gene, but we do not yet have enough evidence to know if it is the cause of your child&rsquo;s condition.&rdquo;
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.red};">1</div>
    <div><strong style="font-size:20px;">Don&rsquo;t treat VUS as a diagnosis</strong><br><span style="font-size:18px;">It means uncertainty, not pathogenicity</span></div>
  </div>
  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.amber};">2</div>
    <div><strong style="font-size:20px;">Plan for re-analysis in 1&ndash;3 years</strong><br><span style="font-size:18px;">New evidence often reclassifies VUS over time</span></div>
  </div>
  <div class="numbered-item">
    <div class="number-circle" style="background:${mc.accent};">3</div>
    <div><strong style="font-size:20px;">Document with clear language in the medical record</strong><br><span style="font-size:18px;">Avoid ambiguous phrasing that implies causation</span></div>
  </div>
  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.violet};">4</div>
    <div><strong style="font-size:20px;">Offer segregation studies in family members</strong><br><span style="font-size:18px;">Parental testing can add or remove evidence lines</span></div>
  </div>
  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.green};">5</div>
    <div><strong style="font-size:20px;">Connect with ClinVar / ClinGen</strong><br><span style="font-size:18px;">Check for updated classifications and submit your data</span></div>
  </div>
`));

// ── Slide 9: Common Pitfalls in Variant Interpretation ─────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Common Pitfalls in Variant Interpretation</h1>
  <div class="section-label">Mistakes to Avoid</div>

  <div class="card card-red" style="margin-bottom:18px;">
    <div class="card-title">Over-interpreting In Silico Predictions</div>
    <div class="card-body">Computational tools provide supporting evidence only. A &ldquo;damaging&rdquo; prediction without clinical context is insufficient for pathogenicity.</div>
  </div>

  <div class="card card-amber" style="margin-bottom:18px;">
    <div class="card-title">Applying PVS1 to Gain-of-Function Genes</div>
    <div class="card-body">Truncating variants in GoF genes (e.g., SCN8A) may be benign or protective. Always verify the disease mechanism for the gene.</div>
  </div>

  <div class="card card-violet" style="margin-bottom:18px;">
    <div class="card-title">Ignoring Population-Specific Allele Frequencies</div>
    <div class="card-body">A variant rare in European populations may be common in African or South Asian populations. Always check the matched ancestry group.</div>
  </div>

  <div class="card card-accent">
    <div class="card-title">Missing Compound Heterozygosity</div>
    <div class="card-body">Two heterozygous variants in an AR gene require <strong>phasing</strong> (parental testing) to confirm they are in trans, not on the same allele.</div>
  </div>
`));

// ── Slide 10: Key Takeaways ────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 10, TOTAL, [
  {
    title: "Systematic, evidence-based framework",
    body: "ACMG/AMP provides a standardized approach to variant classification using defined evidence categories and strength levels.",
  },
  {
    title: "PVS1 is the strongest single criterion",
    body: "The only stand-alone pathogenic criterion — but does not apply to GoF genes, LoF-tolerant genes, or last-exon variants.",
  },
  {
    title: "Population frequency is foundational",
    body: "gnomAD data (BA1, BS1, PM2) anchors every variant assessment. Always use the appropriate ancestral population.",
  },
  {
    title: "De novo (PS2) is powerful in neurogenetics",
    body: "Confirmed de novo variants carry strong weight, especially in severe neurodevelopmental disorders.",
  },
  {
    title: "Gene-specific knowledge modifies rules",
    body: "GoF vs LoF mechanism, mutational hotspots, and ClinGen VCEP specifications override default ACMG criteria.",
  },
  {
    title: "VUS is not a diagnosis",
    body: "Communicate uncertainty clearly, plan for re-analysis, and pursue segregation studies to resolve classification.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides("variant-interpretation", slides);
