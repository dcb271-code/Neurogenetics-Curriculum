/**
 * scripts/gen-diagnostic-yields.mjs
 *
 * Generates 12 slides for the Diagnostic Yields module (6 sections × 2 slides each).
 * Uses puppeteer HTML rendering via the shared design system.
 *
 * Run: node scripts/gen-diagnostic-yields.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "diagnostic-yields";
const mc = MODULE_COLORS[MOD];
const TOTAL = 12;

const slides = [];

// ── Section 0: Interpreting Yield Data ──────────────────────────────────────

// Slide 1: Title
slides.push(titleSlideHTML(MOD, {
  title: "Diagnostic Yields<br>Across Phenotypes",
  subtitle: "Matching the right test to the right patient — understanding what each platform detects and where yields are highest",
  totalSlides: TOTAL,
  topics: [
    "Interpreting yield data",
    "WGS vs WES vs CMA",
    "Yield by phenotype: epilepsy",
    "Yield by phenotype: neurodevelopment",
    "Yield by phenotype: movement & white matter",
    "Summary & clinical utility",
  ],
}));

// Slide 2: Factors Affecting Yield
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Interpreting Yield Data</h1>
  <div class="section-label">Section 1 of 6</div>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">Cohort Selection Bias</div>
      <div class="card-body">The single largest driver of yield variation. Specialty-clinic cohorts yield 40&ndash;72%; population-level cohorts yield 15&ndash;25% for the same test.</div>
    </div>
    <div class="card card-amber">
      <div class="card-title">Singleton vs Trio</div>
      <div class="card-body">Trio sequencing approximately doubles yield for de novo-enriched phenotypes (OR ~2.04). Essential for severe early-onset DEE, GDD, and complex MCA.</div>
    </div>
    <div class="card card-violet">
      <div class="card-title">Prior Testing History</div>
      <div class="card-body">Post-CMA-negative WES cohorts show lower yields than first-tier WES &mdash; the CMA already removed a fraction of diagnoses.</div>
    </div>
    <div class="card card-green">
      <div class="card-title">Database Maturation</div>
      <div class="card-body">WES reanalysis at 12&ndash;24 months yields new diagnoses in ~10&ndash;25% of previously unsolved cases. A negative WES is time-stamped, not permanent.</div>
    </div>
  </div>
`));

// ── Section 1: WGS vs WES vs CMA ───────────────────────────────────────────

// Slide 3: Platform Comparison
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>CMA vs WES vs WGS Comparison</h1>
  <div class="section-label">Section 2 of 6</div>

  <div class="three-col">
    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:31px; margin-bottom:12px;">CMA</div>
      <div style="font-size:50px; font-weight:800; color:${mc.dark}; margin-bottom:12px;">~10%</div>
      <div class="card-body" style="font-size:24px; margin-bottom:10px;"><strong>Detects:</strong> CNVs &ge;50&ndash;200 kb, aneuploidy; SNP arrays add UPD/AOH</div>
      <div class="card-body" style="font-size:24px;"><strong>Misses:</strong> Point variants, small indels, balanced rearrangements, repeat expansions</div>
    </div>
    <div class="card card-violet" style="padding:28px;">
      <div class="card-title" style="font-size:31px; margin-bottom:12px;">WES</div>
      <div style="font-size:50px; font-weight:800; color:${COLORS.violet}; margin-bottom:12px;">~36%</div>
      <div class="card-body" style="font-size:24px; margin-bottom:10px;"><strong>Detects:</strong> SNVs, small indels in coding regions (~2% of genome)</div>
      <div class="card-body" style="font-size:24px;"><strong>Misses:</strong> Deep intronic, regulatory, balanced SVs, repeat expansions</div>
    </div>
    <div class="card card-green" style="padding:28px;">
      <div class="card-title" style="font-size:31px; margin-bottom:12px;">WGS</div>
      <div style="font-size:50px; font-weight:800; color:#166534; margin-bottom:12px;">~41%</div>
      <div class="card-body" style="font-size:24px; margin-bottom:10px;"><strong>Detects:</strong> SNVs, indels, structural variants, non-coding, mitochondrial</div>
      <div class="card-body" style="font-size:24px;"><strong>Misses:</strong> Some repeat expansions, methylation changes</div>
    </div>
  </div>
`));

// Slide 4: Repeat Expansion Caveat & WGS vs WES
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Critical Platform Limitations</h1>
  <div class="section-label">Section 2 of 6 &mdash; What Tests Miss</div>

  <div class="card card-red" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:31px;">Repeat Expansion Caveat</div>
    <div class="card-body" style="font-size:27px;">Standard short-read WES/WGS does <strong>NOT</strong> reliably detect trinucleotide or pentanucleotide repeat expansions. This includes: Friedreich ataxia (FXN GAA), SCA types (CAG), CANVAS (RFC1 AAGGG), FXTAS (FMR1 CGG), DM1/DM2, Huntington (HTT CAG), and C9orf72 ALS/FTD.</div>
  </div>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">WGS vs WES: Not Significantly Different Overall</div>
      <div class="card-body">Head-to-head meta-analysis: adjusted OR 1.13, p=0.50 (Nurchis 2023). The incremental gain is concentrated in: post-WES-negative patients (~10&ndash;20% incremental), leukodystrophies, and combined SNV+CNV analysis on one platform.</div>
    </div>
    <div class="card card-green">
      <div class="card-title">CMA + WES Is Complementary</div>
      <div class="card-body">Many labs now perform simultaneous CNV-seq with WES to capture both CNV and SNV space in one workflow. CMA uniquely detects aneuploidy, UPD (SNP arrays), and segmental duplications.</div>
    </div>
  </div>
`));

// ── Section 2: Yield by Phenotype — Epilepsy ────────────────────────────────

// Slide 5: Epilepsy Yields Table
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Yield by Phenotype &mdash; Epilepsy</h1>
  <div class="section-label">Section 3 of 6</div>

  <table>
    <thead>
      <tr>
        <th style="width:40%;">Phenotype</th>
        <th style="width:25%;">WES/WGS Yield</th>
        <th style="width:35%;">Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>NICU Encephalopathy</td>
        <td style="font-weight:700; color:${COLORS.red};">35&ndash;50%</td>
        <td style="font-size:22px;">Diagnosis changes management in 38&ndash;50% of cases</td>
      </tr>
      <tr>
        <td>EIMFS / Dravet</td>
        <td style="font-weight:700; color:${COLORS.red};">~78%</td>
        <td style="font-size:22px;">Highest yields within DEE subtypes</td>
      </tr>
      <tr>
        <td>DEE &mdash; General</td>
        <td style="font-weight:700; color:${COLORS.amber};">24&ndash;40%</td>
        <td style="font-size:22px;">WGS 35&ndash;50% in selected cohorts</td>
      </tr>
      <tr>
        <td>IESS / West Syndrome</td>
        <td style="font-weight:700; color:${COLORS.amber};">WES 26% (CI 21&ndash;31%)</td>
        <td style="font-size:22px;">CMA 14%; precision therapy in 61.6% of explained cases</td>
      </tr>
      <tr>
        <td>Drug-Resistant Epilepsy</td>
        <td style="font-weight:700; color:${COLORS.amber};">24&ndash;40%</td>
        <td style="font-size:22px;">Drug resistance independently predicts higher yield</td>
      </tr>
      <tr>
        <td>Focal / Generalized (non-DEE)</td>
        <td style="font-weight:700; color:${mc.dark};">10&ndash;18%</td>
        <td style="font-size:22px;">Gene panel reasonable first step; CMA rarely diagnostic</td>
      </tr>
    </tbody>
  </table>
`));

// Slide 6: Epilepsy Key Insights
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Epilepsy &mdash; Key Insights</h1>
  <div class="section-label">Section 3 of 6 &mdash; Clinical Patterns</div>

  <div class="stats-row" style="margin-bottom:24px;">
    <div class="stat-card" style="border-color:${COLORS.red}; background:${COLORS.redLight};">
      <div class="stat-label">All Epilepsy (Sheidley 2022)</div>
      <div class="stat-value">n=39,094</div>
    </div>
    <div class="stat-card" style="border-color:${mc.accent}; background:${mc.light};">
      <div class="stat-label">CMA</div>
      <div class="stat-value">9%</div>
    </div>
    <div class="stat-card" style="border-color:${COLORS.violet}; background:${COLORS.violetLight};">
      <div class="stat-label">WES</div>
      <div class="stat-value">24%</div>
    </div>
    <div class="stat-card" style="border-color:${COLORS.green}; background:${COLORS.greenLight};">
      <div class="stat-label">WGS</div>
      <div class="stat-value">48%</div>
    </div>
  </div>

  <div class="card card-red" style="margin-bottom:16px;">
    <div class="card-title">Key Pattern</div>
    <div class="card-body">Earlier onset + more severe phenotype = higher diagnostic yield. NICU and EIDEE patients benefit most from rapid genomic testing. rWGS diagnosis changes management in 38&ndash;50% of cases &mdash; the highest clinical utility in all of pediatric genetics.</div>
  </div>

  <div class="card card-accent">
    <div class="card-title">Precision Therapy Examples</div>
    <div class="card-body">SCN8A &rarr; quinidine &nbsp;|&nbsp; KCNQ2 &rarr; carbamazepine &nbsp;|&nbsp; GLUT1 &rarr; ketogenic diet &nbsp;|&nbsp; SLC6A1 &rarr; valproate avoidance &nbsp;|&nbsp; PDH deficiency &rarr; ketogenic diet</div>
  </div>
`));

// ── Section 3: Yield by Phenotype — Neurodevelopment & Structural ───────────

// Slide 7: NDD Yields Table
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Yield by Phenotype &mdash; Neurodevelopment</h1>
  <div class="section-label">Section 4 of 6</div>

  <table>
    <thead>
      <tr>
        <th style="width:40%;">Phenotype</th>
        <th style="width:25%;">WES/WGS Yield</th>
        <th style="width:35%;">Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>GDD (trio + CNV-seq)</td>
        <td style="font-weight:700; color:${COLORS.red};">50&ndash;61%</td>
        <td style="font-size:22px;">Zhang 2024, n=434; OR ~2.04 trio vs singleton</td>
      </tr>
      <tr>
        <td>Intellectual Disability</td>
        <td style="font-weight:700; color:${COLORS.amber};">30&ndash;45%</td>
        <td style="font-size:22px;">ACMG 2021 supports WES/WGS first-/second-tier</td>
      </tr>
      <tr>
        <td>Multiple Congenital Anomalies</td>
        <td style="font-weight:700; color:${COLORS.amber};">35&ndash;55%</td>
        <td style="font-size:22px;">CMA productive first step at 15&ndash;25%</td>
      </tr>
      <tr>
        <td>Cerebral Palsy (unexplained)</td>
        <td style="font-weight:700; color:${COLORS.amber};">31.1% (CI 24&ndash;39%)</td>
        <td style="font-size:22px;">Strict exclusion criteria 42.1%; CP+ID 37.8%</td>
      </tr>
      <tr>
        <td>Hypotonia</td>
        <td style="font-weight:700; color:${mc.dark};">30&ndash;45%</td>
        <td style="font-size:22px;">RNA-seq adjunct may be needed for splicing variants</td>
      </tr>
      <tr>
        <td>Isolated ASD (no ID)</td>
        <td style="font-weight:700; color:${mc.dark};">10&ndash;15%</td>
        <td style="font-size:22px;">Comorbid ID raises yield to ~25&ndash;30%</td>
      </tr>
    </tbody>
  </table>
`));

// Slide 8: NDD Key Insights
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Neurodevelopment &mdash; Key Insights</h1>
  <div class="section-label">Section 4 of 6 &mdash; Clinical Application</div>

  <div class="card card-accent" style="margin-bottom:16px;">
    <div class="card-title">Trio Is Essential for Severe Early-Onset</div>
    <div class="card-body">De novo variants drive the majority of severe early-onset phenotypes. Singleton WES drops yield by ~50%. Trio enables immediate de novo detection (PS2), phasing of compound heterozygous variants, and parent-of-origin determination.</div>
  </div>

  <div class="card card-amber" style="margin-bottom:16px;">
    <div class="card-title">CP Without Clear Perinatal Cause</div>
    <div class="card-body">JAMA Pediatr 2023 meta-analysis: WES overall 31.1%, pediatric-specific 34.8%, strict exclusion 42.1%. CP + ID yields 37.8% vs 17.6% without ID. Unexplained CP is one of the most actionable diagnoses for genetic testing.</div>
  </div>

  <div class="card card-red">
    <div class="card-title">Somatic Mosaicism Warning</div>
    <div class="card-body">Somatic mosaic overgrowth syndromes (PIK3CA, AKT3 macrocephaly) may require deep-coverage sequencing or affected-tissue biopsy &mdash; standard WES on blood may miss these.</div>
  </div>
`));

// ── Section 4: Yield by Phenotype — Movement & White Matter ─────────────────

// Slide 9: Movement & WM Yields
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Yield &mdash; Movement &amp; White Matter</h1>
  <div class="section-label">Section 5 of 6</div>

  <table>
    <thead>
      <tr>
        <th style="width:40%;">Phenotype</th>
        <th style="width:25%;">WES/WGS Yield</th>
        <th style="width:35%;">Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="font-weight:800; color:${COLORS.red};">Leukodystrophy (MRI-selected)</td>
        <td style="font-weight:800; color:${COLORS.red}; font-size:28px;">50&ndash;72% WES; 72&ndash;90%+ WGS</td>
        <td style="font-size:22px; font-weight:600; color:${COLORS.red};">Highest yields in neurogenetics!</td>
      </tr>
      <tr>
        <td>Progressive Ataxia</td>
        <td style="font-weight:700; color:${COLORS.amber};">21&ndash;50%</td>
        <td style="font-size:22px;">WES ceiling ~50%; most common ataxias are repeat expansions</td>
      </tr>
      <tr>
        <td>Episodic Ataxia</td>
        <td style="font-weight:700; color:${COLORS.amber};">20&ndash;35%</td>
        <td style="font-size:22px;">KCNA1, CACNA1A, ATP1A3; gene panel competitive</td>
      </tr>
    </tbody>
  </table>

  <div class="two-col" style="margin-top:16px;">
    <div class="card card-red">
      <div class="card-title">Leukodystrophy &mdash; Top Yield</div>
      <div class="card-body">GWMD cohort (2022, n=126): WES 72% overall; 77% for onset &lt;3 years; 85% in hypomyelination subgroup. MRI pattern recognition is the essential pre-test step.</div>
    </div>
    <div class="card card-amber">
      <div class="card-title">Ataxia Caveat</div>
      <div class="card-body">Friedreich (FXN GAA), SCA types (CAG), CANVAS (RFC1 AAGGG), and FXTAS (FMR1 CGG) are NOT detected by WES or short-read WGS. Always order dedicated repeat testing.</div>
    </div>
  </div>
`));

// Slide 10: Movement & WM Detail
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Ataxia: The Repeat Expansion Problem</h1>
  <div class="section-label">Section 5 of 6 &mdash; Critical Testing Gap</div>

  <div class="card card-red" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:31px;">When WES Is Negative in Ataxia, Ask:</div>
    <div class="card-body" style="font-size:28px;"><em>&ldquo;Has dedicated repeat expansion testing been sent?&rdquo;</em></div>
  </div>

  <table style="margin-bottom:20px;">
    <thead>
      <tr>
        <th>Condition</th>
        <th>Gene</th>
        <th>Repeat</th>
        <th>Required Test</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Friedreich Ataxia</td>
        <td style="font-weight:700;">FXN</td>
        <td>GAA</td>
        <td>RP-PCR</td>
      </tr>
      <tr>
        <td>SCA1/2/3/6/7</td>
        <td style="font-weight:700;">Various</td>
        <td>CAG</td>
        <td>Repeat analysis</td>
      </tr>
      <tr>
        <td>CANVAS</td>
        <td style="font-weight:700;">RFC1</td>
        <td>AAGGG</td>
        <td>Southern blot / long-read</td>
      </tr>
      <tr>
        <td>FXTAS</td>
        <td style="font-weight:700;">FMR1</td>
        <td>CGG</td>
        <td>FMR1 PCR/Southern blot</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box">
    <div class="label">Key Principle</div>
    <div class="value" style="font-size:31px;">Repeat expansion disorders are a separate testing universe from WES/WGS</div>
  </div>
`));

// ── Section 5: Summary Pooled Yields & Clinical Utility ─────────────────────

// Slide 11: Summary Pooled Yields
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Summary Pooled Yields</h1>
  <div class="section-label">Section 6 of 6</div>

  <div class="stats-row" style="margin-top:20px; margin-bottom:28px;">
    <div class="stat-card" style="border-color:${mc.accent}; background:${mc.light}; text-align:center; padding:32px 24px;">
      <div class="stat-label">CMA</div>
      <div class="stat-value" style="font-size:67px; margin-top:12px;">~10%</div>
      <div style="font-size:24px; color:${COLORS.muted}; margin-top:8px;">CNVs &amp; aneuploidy</div>
    </div>
    <div class="stat-card" style="border-color:${COLORS.violet}; background:${COLORS.violetLight}; text-align:center; padding:32px 24px;">
      <div class="stat-label">WES (Trio)</div>
      <div class="stat-value" style="font-size:67px; margin-top:12px;">~36%</div>
      <div style="font-size:24px; color:${COLORS.muted}; margin-top:8px;">Coding SNVs &amp; indels</div>
    </div>
    <div class="stat-card" style="border-color:${COLORS.green}; background:${COLORS.greenLight}; text-align:center; padding:32px 24px;">
      <div class="stat-label">WGS</div>
      <div class="stat-value" style="font-size:67px; margin-top:12px;">~41%</div>
      <div style="font-size:24px; color:${COLORS.muted}; margin-top:8px;">Broadest detection</div>
    </div>
    <div class="stat-card" style="border-color:${COLORS.amber}; background:${COLORS.amberLight}; text-align:center; padding:32px 24px;">
      <div class="stat-label">rWGS (NICU)</div>
      <div class="stat-value" style="font-size:67px; margin-top:12px;">35&ndash;50%</div>
      <div style="font-size:24px; color:${COLORS.muted}; margin-top:8px;">Rapid turnaround</div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Key Insight</div>
    <div class="value" style="font-size:31px;">WGS vs WES: OR 1.13, p=0.50 (NSD overall). Incremental gain concentrated in post-WES-negative patients, leukodystrophies, and atypical presentations.</div>
  </div>
`));

// Slide 12: Key Takeaways
slides.push(takeawaysSlideHTML(MOD, 12, TOTAL, [
  {
    title: "Match test to phenotype for maximum yield",
    body: "Earlier onset and more severe phenotypes yield more diagnoses. NICU encephalopathy (35–50%) vs focal epilepsy (10–18%).",
  },
  {
    title: "CMA + WES/WGS are complementary, not redundant",
    body: "CMA detects CNVs that sequencing misses; WES/WGS detects point variants that CMA cannot. Both may be needed.",
  },
  {
    title: "Trio design is critical for de novo detection",
    body: "Singleton WES drops yield by ~50%. Parental samples are essential for severe early-onset presentations.",
  },
  {
    title: "Repeat expansions require dedicated testing",
    body: "RP-PCR or long-read sequencing is needed for SCA, Friedreich, DM1, CANVAS — standard WES/WGS misses these.",
  },
  {
    title: "Reanalysis at 1–2 year intervals finds new diagnoses",
    body: "10–25% additional yield on reanalysis as databases mature. A negative result today may be diagnostic tomorrow.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
