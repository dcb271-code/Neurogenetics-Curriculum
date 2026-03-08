/**
 * scripts/gen-diagnostic-yields.mjs
 *
 * Generates 10 clean, readable slides for the Diagnostic Yields module.
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
const TOTAL = 10;

const slides = [];

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Diagnostic Yields<br>Across Phenotypes",
  subtitle: "Matching the right test to the right patient — understanding what each platform detects and where yields are highest",
  totalSlides: TOTAL,
  topics: [
    "Factors affecting yield data",
    "CMA vs WES vs WGS comparison",
    "Yield by phenotype: epilepsy",
    "Yield by phenotype: neurodevelopment",
    "Yield by phenotype: movement & white matter",
    "Critical points for clinical practice",
  ],
}));

// ── Slide 2: Factors Affecting Yield Data ──────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Factors Affecting Yield Data</h1>
  <div class="section-label">Section 1 of 6</div>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">Cohort Selection Bias</div>
      <div class="card-body">Published yields reflect selected cohorts — patients who reached genetic testing. Referral patterns, pre-screening, and inclusion criteria all inflate or deflate reported rates.</div>
    </div>
    <div class="card card-amber">
      <div class="card-title">Sequencing Strategy</div>
      <div class="card-body">Singleton WES vs trio WES dramatically changes yield. Trio sequencing enables de novo variant detection — essential for severe early-onset phenotypes.</div>
    </div>
    <div class="card card-violet">
      <div class="card-title">Prior Testing</div>
      <div class="card-body">Patients who already had negative CMA or gene panels before WES will have different yields than test-naive cohorts. Sequential testing creates survivor bias.</div>
    </div>
    <div class="card card-green">
      <div class="card-title">Database Maturation</div>
      <div class="card-body">Yields improve over time as gene-disease databases grow. A 2024 reanalysis of 2018 WES data will find more diagnoses than the original analysis.</div>
    </div>
  </div>
`));

// ── Slide 3: CMA vs WES vs WGS Comparison ─────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>CMA vs WES vs WGS Comparison</h1>
  <div class="section-label">Section 2 of 6</div>

  <div class="three-col">
    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:22px; margin-bottom:12px;">CMA</div>
      <div style="font-size:36px; font-weight:800; color:${mc.dark}; margin-bottom:12px;">~10%</div>
      <div class="card-body" style="font-size:17px; margin-bottom:10px;"><strong>Detects:</strong> CNVs, aneuploidy, large deletions/duplications</div>
      <div class="card-body" style="font-size:17px; margin-bottom:10px;"><strong>Misses:</strong> Point variants, small indels, balanced rearrangements</div>
      <div class="card-body" style="font-size:17px;"><strong>Role:</strong> First-tier test for ID/GDD; irreplaceable for CNV detection</div>
    </div>
    <div class="card card-violet" style="padding:28px;">
      <div class="card-title" style="font-size:22px; margin-bottom:12px;">WES</div>
      <div style="font-size:36px; font-weight:800; color:${COLORS.violet}; margin-bottom:12px;">~36%</div>
      <div class="card-body" style="font-size:17px; margin-bottom:10px;"><strong>Detects:</strong> SNVs, small indels in coding regions (~2% of genome)</div>
      <div class="card-body" style="font-size:17px; margin-bottom:10px;"><strong>Misses:</strong> Non-coding variants, repeat expansions, deep intronic</div>
      <div class="card-body" style="font-size:17px;"><strong>Role:</strong> Workhorse of clinical diagnostics; best cost-yield ratio</div>
    </div>
    <div class="card card-green" style="padding:28px;">
      <div class="card-title" style="font-size:22px; margin-bottom:12px;">WGS</div>
      <div style="font-size:36px; font-weight:800; color:#166534; margin-bottom:12px;">~41%</div>
      <div class="card-body" style="font-size:17px; margin-bottom:10px;"><strong>Detects:</strong> SNVs, indels, structural variants, non-coding regions</div>
      <div class="card-body" style="font-size:17px; margin-bottom:10px;"><strong>Misses:</strong> Some repeat expansions, methylation changes</div>
      <div class="card-body" style="font-size:17px;"><strong>Role:</strong> Broadest detection; highest cost; increasingly first-line</div>
    </div>
  </div>
`));

// ── Slide 4: Yield by Phenotype — Epilepsy ────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Yield by Phenotype — Epilepsy</h1>
  <div class="section-label">Section 3 of 6</div>

  <table>
    <thead>
      <tr>
        <th style="width:45%;">Phenotype</th>
        <th style="width:25%;">Diagnostic Yield</th>
        <th style="width:30%;">Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>NICU Encephalopathy</td>
        <td style="font-weight:700; color:${COLORS.red};">60 – 70%</td>
        <td style="font-size:16px;">Highest yields — rWGS most impactful</td>
      </tr>
      <tr>
        <td>EIDEE (Early Infantile DEE)</td>
        <td style="font-weight:700; color:${COLORS.red};">40 – 50%</td>
        <td style="font-size:16px;">SCN1A, KCNQ2, STXBP1 common</td>
      </tr>
      <tr>
        <td>DEE — General</td>
        <td style="font-weight:700; color:${COLORS.amber};">30 – 50%</td>
        <td style="font-size:16px;">Broad group; yield varies with onset age</td>
      </tr>
      <tr>
        <td>IESS / West Syndrome</td>
        <td style="font-weight:700; color:${COLORS.amber};">25 – 30%</td>
        <td style="font-size:16px;">TSC1/2, CDKL5, ARX among causes</td>
      </tr>
      <tr>
        <td>Drug-Resistant Epilepsy</td>
        <td style="font-weight:700; color:${COLORS.amber};">25 – 40%</td>
        <td style="font-size:16px;">Yield justifies testing in all refractory cases</td>
      </tr>
      <tr>
        <td>Focal Epilepsy</td>
        <td style="font-weight:700; color:${mc.dark};">10 – 20%</td>
        <td style="font-size:16px;">Lower yield; somatic mosaicism emerging</td>
      </tr>
    </tbody>
  </table>

  <div class="card card-red" style="margin-top:8px;">
    <div class="card-title">Key Pattern</div>
    <div class="card-body">Earlier onset + more severe phenotype = higher diagnostic yield. NICU and EIDEE patients benefit most from rapid genomic testing.</div>
  </div>
`));

// ── Slide 5: Yield by Phenotype — Neurodevelopment & Structural ───────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Yield by Phenotype — Neurodevelopment</h1>
  <div class="section-label">Section 4 of 6</div>

  <table>
    <thead>
      <tr>
        <th style="width:40%;">Phenotype</th>
        <th style="width:25%;">Diagnostic Yield</th>
        <th style="width:35%;">Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>GDD / Intellectual Disability</td>
        <td style="font-weight:700; color:${COLORS.amber};">35 – 45%</td>
        <td style="font-size:16px;">CMA + WES combined; trio preferred</td>
      </tr>
      <tr>
        <td>Multiple Congenital Anomalies</td>
        <td style="font-weight:700; color:${COLORS.amber};">30 – 40%</td>
        <td style="font-size:16px;">CMA essential; CNVs prominent</td>
      </tr>
      <tr>
        <td>Hypotonia</td>
        <td style="font-weight:700; color:${COLORS.amber};">25 – 35%</td>
        <td style="font-size:16px;">Broad DDx; NM disorders overlap</td>
      </tr>
      <tr>
        <td>Cerebral Palsy</td>
        <td style="font-weight:700; color:${mc.dark};">15 – 25%</td>
        <td style="font-size:16px;">Genetic mimics increasingly recognized</td>
      </tr>
      <tr>
        <td>Macrocephaly</td>
        <td style="font-weight:700; color:${mc.dark};">15 – 30%</td>
        <td style="font-size:16px;">PTEN, PI3K-AKT pathway genes</td>
      </tr>
      <tr>
        <td>ASD (Autism Spectrum)</td>
        <td style="font-weight:700; color:${mc.dark};">10 – 20%</td>
        <td style="font-size:16px;">Higher yield with co-occurring ID</td>
      </tr>
    </tbody>
  </table>

  <div class="card card-accent" style="margin-top:8px;">
    <div class="card-title">Clinical Pearl</div>
    <div class="card-body">ASD yield rises from ~10% (isolated ASD) to ~30% when co-occurring intellectual disability or dysmorphic features are present. Phenotypic depth drives yield.</div>
  </div>
`));

// ── Slide 6: Yield by Phenotype — Movement & White Matter ─────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Yield by Phenotype — Movement &amp; White Matter</h1>
  <div class="section-label">Section 5 of 6</div>

  <table>
    <thead>
      <tr>
        <th style="width:40%;">Phenotype</th>
        <th style="width:25%;">Diagnostic Yield</th>
        <th style="width:35%;">Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="font-weight:800; color:${COLORS.red};">Leukodystrophy</td>
        <td style="font-weight:800; color:${COLORS.red}; font-size:20px;">72 – 90%+</td>
        <td style="font-size:16px; font-weight:600; color:${COLORS.red};">Highest yields in neurogenetics!</td>
      </tr>
      <tr>
        <td>Progressive Ataxia</td>
        <td style="font-weight:700; color:${COLORS.red};">50 – 70%</td>
        <td style="font-size:16px;">Repeat expansions often require separate tests</td>
      </tr>
      <tr>
        <td>Episodic Ataxia</td>
        <td style="font-weight:700; color:${COLORS.amber};">40 – 60%</td>
        <td style="font-size:16px;">Channelopathies — CACNA1A, KCNA1</td>
      </tr>
      <tr>
        <td>Dystonia</td>
        <td style="font-weight:700; color:${COLORS.amber};">25 – 40%</td>
        <td style="font-size:16px;">DYT genes, metabolic causes (BH4, Wilson)</td>
      </tr>
    </tbody>
  </table>

  <div class="two-col" style="margin-top:16px;">
    <div class="card card-red">
      <div class="card-title">Leukodystrophy — Top Yield</div>
      <div class="card-body">MRI pattern-based gene panels in leukodystrophies achieve the highest diagnostic rates of any neurogenetic category. Distinctive white matter patterns narrow the differential effectively.</div>
    </div>
    <div class="card card-amber">
      <div class="card-title">Ataxia Caveat</div>
      <div class="card-body">Repeat expansion ataxias (SCA1–36, Friedreich) require dedicated RP-PCR or long-read sequencing — these are not captured by WES/WGS short-read pipelines.</div>
    </div>
  </div>
`));

// ── Slide 7: Summary of Pooled Yields ─────────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Summary of Pooled Yields</h1>
  <div class="section-label">Platform-Level Overview</div>

  <div class="stats-row" style="margin-top:20px;">
    <div class="stat-card" style="border-color:${mc.accent}; background:${mc.light}; text-align:center; padding:32px 24px;">
      <div class="stat-label">CMA</div>
      <div class="stat-value" style="font-size:48px; margin-top:12px;">~10%</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:8px;">CNVs & aneuploidy</div>
    </div>
    <div class="stat-card" style="border-color:${COLORS.violet}; background:${COLORS.violetLight}; text-align:center; padding:32px 24px;">
      <div class="stat-label">WES (Trio)</div>
      <div class="stat-value" style="font-size:48px; margin-top:12px;">~36%</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:8px;">Coding SNVs & indels</div>
    </div>
    <div class="stat-card" style="border-color:${COLORS.green}; background:${COLORS.greenLight}; text-align:center; padding:32px 24px;">
      <div class="stat-label">WGS</div>
      <div class="stat-value" style="font-size:48px; margin-top:12px;">~41%</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:8px;">Broadest detection</div>
    </div>
    <div class="stat-card" style="border-color:${COLORS.amber}; background:${COLORS.amberLight}; text-align:center; padding:32px 24px;">
      <div class="stat-label">rWGS (NICU)</div>
      <div class="stat-value" style="font-size:48px; margin-top:12px;">35–50%</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:8px;">Rapid turnaround</div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:24px;">
    <div class="label">Key Insight</div>
    <div class="value" style="font-size:22px;">WGS yield exceeds WES by ~5% incrementally — but the additional diagnoses are often in non-coding regions, structural variants, and mitochondrial DNA that WES cannot access.</div>
  </div>
`));

// ── Slide 8: Critical Points (Part 1) ─────────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Critical Points for Practice</h1>
  <div class="section-label">Section 6 of 6 — Part 1</div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${mc.accent};">1</div>
    <div class="card card-accent" style="flex:1; margin-bottom:0;">
      <div class="card-title">CMA Is NOT Obsolete</div>
      <div class="card-body">CMA remains first-tier for CNV detection. WES/WGS CNV calling is improving but does not yet match CMA sensitivity for dosage changes. Always consider CMA alongside sequencing, especially for ID/GDD and MCA.</div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.red};">2</div>
    <div class="card card-red" style="flex:1; margin-bottom:0;">
      <div class="card-title">Trio Is Essential for Severe Early-Onset</div>
      <div class="card-body">De novo variants drive the majority of severe early-onset phenotypes. Singleton sequencing misses these — trio design is critical for DEE, NICU encephalopathy, and severe GDD. Yield drops 10–15% without parental samples.</div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.amber};">3</div>
    <div class="card card-amber" style="flex:1; margin-bottom:0;">
      <div class="card-title">WGS > WES — But Only Incrementally</div>
      <div class="card-body">The ~5% incremental yield of WGS over WES comes from non-coding variants, structural rearrangements, and mtDNA. Specific scenarios (e.g., negative WES, suspected structural) benefit most from WGS upgrade.</div>
    </div>
  </div>
`));

// ── Slide 9: Critical Points (Part 2) ─────────────────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Critical Points for Practice</h1>
  <div class="section-label">Section 6 of 6 — Part 2</div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.violet};">4</div>
    <div class="card card-violet" style="flex:1; margin-bottom:0;">
      <div class="card-title">Repeat Expansions: A Separate Testing Universe</div>
      <div class="card-body">Trinucleotide and pentanucleotide repeat expansions (SCA, Friedreich, CANVAS, DM1) are NOT reliably captured by standard short-read WES or WGS. Dedicated RP-PCR or long-read sequencing is required.</div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.green};">5</div>
    <div class="card card-green" style="flex:1; margin-bottom:0;">
      <div class="card-title">Yield Is Dynamic — Reanalysis Matters</div>
      <div class="card-body">Reanalysis of existing WES/WGS data at 1–3 year intervals is recommended. Gene-disease databases grow continuously; 10–15% of previously negative cases yield a diagnosis on reanalysis.</div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.red};">6</div>
    <div class="card card-red" style="flex:1; margin-bottom:0;">
      <div class="card-title">Leukodystrophy Has Highest Yields</div>
      <div class="card-body">At 72–90%+, leukodystrophies achieve the highest diagnostic yields in neurogenetics. Distinctive MRI white matter patterns allow targeted gene panel approaches with exceptional hit rates.</div>
    </div>
  </div>
`));

// ── Slide 10: Key Takeaways ───────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 10, TOTAL, [
  {
    title: "Match test to phenotype for maximum yield",
    body: "Earlier onset and more severe phenotypes yield more diagnoses. NICU encephalopathy (60–70%) vs focal epilepsy (10–20%).",
  },
  {
    title: "CMA + WES/WGS are complementary, not redundant",
    body: "CMA detects CNVs that sequencing misses; WES/WGS detects point variants that CMA cannot. Both may be needed.",
  },
  {
    title: "Trio design is critical for de novo detection",
    body: "Singleton WES drops yield by 10–15%. Parental samples are essential for severe early-onset presentations.",
  },
  {
    title: "Repeat expansions require dedicated testing",
    body: "RP-PCR or long-read sequencing is needed for SCA, Friedreich, DM1, CANVAS — standard WES/WGS misses these.",
  },
  {
    title: "Reanalysis at 1–3 year intervals finds new diagnoses",
    body: "10–15% additional yield on reanalysis as databases mature. A negative result today may be diagnostic tomorrow.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
