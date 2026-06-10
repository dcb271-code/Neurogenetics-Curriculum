/**
 * scripts/gen-clinical-reasoning.mjs
 *
 * Generates 14 slides for the Clinical Decision-Making in Neurogenetics module
 * (6 sections × 2 slides each + title + takeaways).
 * Uses puppeteer HTML rendering via the shared design system.
 *
 * All facts/numbers are pulled directly from data/modules/clinical-reasoning.json.
 *
 * Run: node scripts/gen-clinical-reasoning.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "clinical-reasoning";
const mc = MODULE_COLORS[MOD];
const TOTAL = 14;

const slides = [];

// ── Slide 1: Title ──────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Clinical Decision-Making<br>in Neurogenetics",
  subtitle: "A decision framework that follows the patient journey — choosing the first test, reading an ambiguous report, acting on a result, managing the diagnosis, and counseling the family",
  totalSlides: TOTAL,
  topics: [
    "Choosing the first test",
    "Living with a VUS",
    "When negative isn't negative",
    "Treatment & surveillance",
    "Reproductive & cascade decisions",
    "Communicating & coordinating",
  ],
}));

// ── Section 1: Choosing the First Test ──────────────────────────────────────

// Slide 2: Decision table (clinical situation -> first test -> why)
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Choosing the First Test</h1>
  <div class="section-label">Section 1 of 6 &mdash; The First Test Is a Decision, Not a Default</div>

  <table>
    <thead>
      <tr>
        <th style="width:34%;">Clinical situation</th>
        <th style="width:30%;">First test</th>
        <th style="width:36%;">Why</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Recognizable tight syndrome</td>
        <td style="font-weight:700; color:${mc.dark};">Single-gene / focused panel</td>
        <td style="font-size:21px;">High pre-test probability; fast, cheap</td>
      </tr>
      <tr>
        <td>Undifferentiated GDD/ID, parents available</td>
        <td style="font-weight:700; color:${mc.dark};">Trio exome (&plusmn; concurrent CNV-seq)</td>
        <td style="font-size:21px;">~2&times; yield (OR ~2.04, Clark 2018); de novo detection</td>
      </tr>
      <tr>
        <td>Progressive ataxia / DM / HD-like</td>
        <td style="font-weight:700; color:${COLORS.red};">Dedicated repeat testing</td>
        <td style="font-size:21px;">Short-read WES/WGS misses expansions</td>
      </tr>
      <tr>
        <td>MCA / dysmorphism</td>
        <td style="font-weight:700; color:${mc.dark};">CMA first-tier</td>
        <td style="font-size:21px;">~15&ndash;25% yield; detects CNVs/aneuploidy/UPD</td>
      </tr>
      <tr>
        <td>Infantile epileptic spasms (IESS)</td>
        <td style="font-weight:700; color:${mc.dark};">CMA + WES</td>
        <td style="font-size:21px;">CMA 14%, WES 26% (diagnostic-yields)</td>
      </tr>
      <tr>
        <td>Acutely ill NICU neonate</td>
        <td style="font-weight:700; color:${COLORS.red};">Rapid WGS/WES</td>
        <td style="font-size:21px;">35&ndash;50%; management changes 38&ndash;50% (Maron 2023)</td>
      </tr>
    </tbody>
  </table>
`));

// Slide 3: Five branch points + bottom-line heuristic
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Five Branch Points</h1>
  <div class="section-label">Section 1 of 6 &mdash; The Decision Layer</div>

  <div class="two-col" style="margin-bottom:18px;">
    <div class="card card-accent" style="padding:20px 26px; margin-bottom:0;">
      <div class="card-title" style="font-size:25px;">1. How specific is the phenotype?</div>
      <div class="card-body" style="font-size:21px;">Tight, recognizable syndrome &rarr; single-gene/focused panel. Broad/undifferentiated NDD &rarr; exome (or genome).</div>
    </div>
    <div class="card card-violet" style="padding:20px 26px; margin-bottom:0;">
      <div class="card-title" style="font-size:25px;">2. Are both parents available?</div>
      <div class="card-body" style="font-size:21px;">Severe early-onset de novo-enriched (DEE/GDD/MCA) &rarr; trio ~doubles yield (OR ~2.04, Clark 2018); phases compound hets.</div>
    </div>
    <div class="card card-red" style="padding:20px 26px; margin-bottom:0;">
      <div class="card-title" style="font-size:25px;">3. Repeat expansion suspected?</div>
      <div class="card-body" style="font-size:21px;">Progressive ataxia, myotonic dystrophy, or HD-like &rarr; dedicated repeat testing (short-read sequencing misses these).</div>
    </div>
    <div class="card card-amber" style="padding:20px 26px; margin-bottom:0;">
      <div class="card-title" style="font-size:25px;">4. MCA / dysmorphism or IESS?</div>
      <div class="card-body" style="font-size:21px;">CMA stays first-tier: ~15&ndash;25% in MCA; IESS CMA 14% vs WES 26%.</div>
    </div>
  </div>

  <div class="highlight-box" style="margin:0;">
    <div class="label">5. How urgent? + Bottom line</div>
    <div class="value" style="font-size:24px;">Acutely ill NICU &rarr; rapid WGS/WES (35&ndash;50%). For most undifferentiated NDD/epilepsy with parents available: trio exome (&plusmn; concurrent CNV-seq).</div>
  </div>
`));

// ── Section 2: Living with a VUS ────────────────────────────────────────────

// Slide 4: Say this / Not this contrast
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Living with a VUS</h1>
  <div class="section-label">Section 2 of 6 &mdash; What to Say vs. What Not to Say</div>

  <div class="two-col">
    <div class="card card-green">
      <div class="card-title">Say this</div>
      <div class="card-body" style="font-size:23px; line-height:1.6;">
        &ldquo;We found a genetic spelling variation we can't yet interpret.&rdquo;<br><br>
        &ldquo;It does not confirm a diagnosis, and it does not rule one out.&rdquo;<br><br>
        &ldquo;We'll manage your child on their symptoms, not on this result.&rdquo;<br><br>
        &ldquo;Our understanding may change as evidence grows.&rdquo;
      </div>
    </div>
    <div class="card card-red">
      <div class="card-title">Not this / Avoid</div>
      <div class="card-body" style="font-size:23px; line-height:1.6;">
        &ldquo;We found a mutation.&rdquo;<br><br>
        &ldquo;We found the cause.&rdquo;<br><br>
        &ldquo;We should start treatment for this.&rdquo;<br><br>
        &ldquo;It's nothing / it's definitely the problem.&rdquo;
      </div>
    </div>
  </div>
`));

// Slide 5: Cardinal rule + re-contact triggers
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>The Cardinal Rule</h1>
  <div class="section-label">Section 2 of 6 &mdash; Don't Act on a VUS</div>

  <div class="card card-red" style="margin-bottom:18px;">
    <div class="card-title">Clinical decisions are not made on a VUS</div>
    <div class="card-body" style="font-size:24px;">Under ACMG/AMP 2015 (Richards et al.), a VUS must not confirm or exclude a diagnosis. Do not change management, start surveillance, alter treatment, or drive reproductive decisions. Manage on clinical findings &mdash; as if the VUS were not reported.</div>
  </div>

  <div class="two-col">
    <div class="card card-amber" style="margin-bottom:0;">
      <div class="card-title" style="font-size:26px;">Reclassification skews benign</div>
      <div class="card-body" style="font-size:22px;">When VUS are reclassified, the majority move toward benign, not pathogenic. A VUS is not &ldquo;probably the answer.&rdquo;</div>
    </div>
    <div class="card card-accent" style="margin-bottom:0;">
      <div class="card-title" style="font-size:26px;">What can move a VUS</div>
      <div class="card-body" style="font-size:22px;">Parental/segregation testing (confirming de novo is often highest-yield), deeper phenotyping, functional/RNA studies, periodic lab reanalysis. Re-contact responsibility (lab vs. clinician) is <strong>not standardized</strong> &mdash; document it and own the plan to reanalyze (commonly 1&ndash;2 yr).</div>
    </div>
  </div>
`));

// ── Section 3: When "Negative" Isn't Negative ───────────────────────────────

// Slide 6: Blind-spots table
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>When &ldquo;Negative&rdquo; Isn't Negative</h1>
  <div class="section-label">Section 3 of 6 &mdash; A Negative Report Is Time-Stamped, Not Permanent</div>

  <table>
    <thead>
      <tr>
        <th style="width:26%;">What was missed</th>
        <th style="width:38%;">Why standard testing missed it</th>
        <th style="width:36%;">The fix</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Real diagnosis, immature database</td>
        <td style="font-size:21px;">Gene-disease knowledge didn't yet explain the variant</td>
        <td style="font-size:21px;"><strong>Reanalysis</strong> at 12&ndash;24 mo &rarr; new dx in ~10&ndash;25% of unsolved cases</td>
      </tr>
      <tr>
        <td>Repeat expansion</td>
        <td style="font-size:21px;">Short-read WES/WGS does not reliably size tri-/penta-nucleotide expansions</td>
        <td style="font-size:21px;"><strong>Dedicated repeat testing</strong> &mdash; RP-PCR, Southern blot, or long-read</td>
      </tr>
      <tr>
        <td>Methylation / imprinting disorder</td>
        <td style="font-size:21px;">Defect is parent-of-origin methylation or UPD, not a coding variant</td>
        <td style="font-size:21px;"><strong>Methylation testing</strong> (MS-MLPA at SNRPN) + <strong>SNP-array CMA</strong> for UPD</td>
      </tr>
      <tr>
        <td>Mosaicism / wrong tissue</td>
        <td style="font-size:21px;">Somatic variant absent or very low-level in blood</td>
        <td style="font-size:21px;"><strong>Deep-coverage</strong> and/or <strong>affected-tissue</strong> sequencing (skin/biopsy)</td>
      </tr>
    </tbody>
  </table>
`));

// Slide 7: Repeat list + methylation + mosaicism
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Know the Blind-Spot List</h1>
  <div class="section-label">Section 3 of 6 &mdash; Repeats, Imprinting, Mosaicism</div>

  <div class="card card-red" style="margin-bottom:16px;">
    <div class="card-title">Repeat expansions short-read sequencing misses</div>
    <div class="card-body" style="font-size:23px;">Friedreich ataxia (FXN GAA) &nbsp;|&nbsp; SCAs (CAG) &nbsp;|&nbsp; CANVAS (RFC1 AAGGG) &nbsp;|&nbsp; FXTAS (FMR1 CGG premutation) &nbsp;|&nbsp; DM1/DM2 &nbsp;|&nbsp; Huntington (HTT CAG) &nbsp;|&nbsp; C9orf72 (ALS/FTD)</div>
  </div>

  <div class="two-col">
    <div class="card card-violet" style="margin-bottom:0;">
      <div class="card-title" style="font-size:26px;">Methylation / imprinting</div>
      <div class="card-body" style="font-size:22px;">Angelman & Prader-Willi driven by methylation defects/UPD &mdash; invisible to sequence. SNRPN methylation detects ~99% of PWS and ~80% of AS; a normal result in classic Angelman still prompts UBE3A sequencing.</div>
    </div>
    <div class="card card-amber" style="margin-bottom:0;">
      <div class="card-title" style="font-size:26px;">Mosaicism & tissue choice</div>
      <div class="card-body" style="font-size:22px;">Somatic overgrowth (PIK3CA, AKT3) and brain-restricted variants (FCD, hemimegalencephaly) may be absent from blood entirely &mdash; deep-coverage sequencing of affected tissue, not a repeat blood test.</div>
    </div>
  </div>
`));

// ── Section 4: Treatment & Surveillance ─────────────────────────────────────

// Slide 8: Treatment-tier cards
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Treatment &amp; Surveillance</h1>
  <div class="section-label">Section 4 of 6 &mdash; Disease-Modifying vs. Precision Symptomatic</div>

  <div class="card card-green" style="margin-bottom:16px;">
    <div class="card-title">Disease-modifying therapy</div>
    <div class="card-body" style="font-size:23px;">SMA: SMN restoration &mdash; nusinersen (intrathecal ASO), risdiplam (oral SMN2 splicing modifier), onasemnogene abeparvovec (AAV9-SMN1); most effective presymptomatically. DMD: exon-skipping ASOs (e.g., eteplirsen for exon-51-amenable deletions). None can be offered without the exact molecular result.</div>
  </div>

  <div class="two-col">
    <div class="card card-accent" style="margin-bottom:0;">
      <div class="card-title" style="font-size:26px;">Precision symptomatic / metabolic</div>
      <div class="card-body" style="font-size:22px;">GLUT1 deficiency (SLC2A1) &rarr; ketogenic diet. Pyridoxine-dependent epilepsy (ALDH7A1) &rarr; pyridoxine (B6).</div>
    </div>
    <div class="card card-red" style="margin-bottom:0;">
      <div class="card-title" style="font-size:26px;">Drugs to avoid</div>
      <div class="card-body" style="font-size:22px;">SCN1A/Dravet &rarr; avoid Na-channel blockers (oxcarbazepine, lamotrigine). SLC6A1 &rarr; valproate first-line (do not confuse with SCN1A). ALDH5A1/SSADH &rarr; avoid vigabatrin.</div>
    </div>
  </div>
`));

// Slide 9: TSC surveillance table (Northrup 2021)
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>TSC Surveillance Program</h1>
  <div class="section-label">Section 4 of 6 &mdash; The Diagnosis Triggers a Program (Northrup 2021)</div>

  <table>
    <thead>
      <tr>
        <th style="width:22%;">Organ system</th>
        <th style="width:36%;">What to monitor</th>
        <th style="width:42%;">Interval (Northrup 2021)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Brain</td>
        <td style="font-size:21px;">SEGA (subependymal giant cell astrocytoma)</td>
        <td style="font-size:21px;">MRI every 1&ndash;3 yr if asymptomatic and &lt; 25 yr</td>
      </tr>
      <tr>
        <td>Kidney</td>
        <td style="font-size:21px;">Angiomyolipoma, renal cysts</td>
        <td style="font-size:21px;">MRI every 1&ndash;3 yr, lifelong</td>
      </tr>
      <tr>
        <td>Neurodevelopment</td>
        <td style="font-size:21px;">TAND (TSC-associated neuropsychiatric disorders)</td>
        <td style="font-size:21px;">Annual screen; full eval at key developmental ages</td>
      </tr>
      <tr>
        <td>Heart</td>
        <td style="font-size:21px;">Cardiac rhabdomyoma</td>
        <td style="font-size:21px;">Echo every 1&ndash;3 yr in asymptomatic children until regression; ECG every 3&ndash;5 yr, all ages</td>
      </tr>
      <tr>
        <td>Eyes</td>
        <td style="font-size:21px;">Retinal lesions; vigabatrin visual-field toxicity</td>
        <td style="font-size:21px;">Annual ophthalmologic exam</td>
      </tr>
      <tr>
        <td>Skin / teeth</td>
        <td style="font-size:21px;">Skin lesions; dental review</td>
        <td style="font-size:21px;">Annual skin exam; dental review at least every 6 months</td>
      </tr>
    </tbody>
  </table>
`));

// ── Section 5: Reproductive & Cascade ───────────────────────────────────────

// Slide 10: Reproductive decision-point table
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Reproductive &amp; Cascade Decisions</h1>
  <div class="section-label">Section 5 of 6 &mdash; Options When the Family Variant Is Known</div>

  <table style="margin-bottom:18px;">
    <thead>
      <tr>
        <th style="width:34%;">Family situation</th>
        <th style="width:30%;">Option</th>
        <th style="width:36%;">Key consideration</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Wants definitive fetal diagnosis in an established pregnancy</td>
        <td style="font-weight:700; color:${mc.dark};">CVS (10&ndash;13 wk) or amniocentesis (15&ndash;20 wk)</td>
        <td style="font-size:21px;">Diagnostic, not screening; ~0.1&ndash;0.3% miscarriage risk</td>
      </tr>
      <tr>
        <td>Wants to avoid decisions about an established pregnancy</td>
        <td style="font-weight:700; color:${mc.dark};">PGT-M with IVF</td>
        <td style="font-size:21px;">Tests embryos pre-transfer; needs known variant + custom probe (~4&ndash;6 wk); cost & IVF burden</td>
      </tr>
      <tr>
        <td>Priority is avoiding transmission entirely</td>
        <td style="font-weight:700; color:${mc.dark};">Donor gametes, embryo donation, or adoption</td>
        <td style="font-size:21px;">Removes genetic risk from the affected parent's line</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin:0;">
    <div class="label">Cascade testing</div>
    <div class="value" style="font-size:23px;">Offer targeted single-site testing to at-risk relatives; defer testing minors for adult-onset conditions without childhood actionability; respect the right not to know; obtain consent. Counseling is non-directive.</div>
  </div>
`));

// Slide 11: Recurrence-risk framing
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Naming the Recurrence Scenario</h1>
  <div class="section-label">Section 5 of 6 &mdash; Never Counsel Zero</div>

  <div class="card card-accent" style="margin-bottom:18px;">
    <div class="card-title">Inherited</div>
    <div class="card-body" style="font-size:24px;">Risk follows the inheritance pattern &mdash; 50% autosomal dominant, 25% autosomal recessive &mdash; modified by penetrance and expressivity.</div>
  </div>

  <div class="card card-red" style="margin-bottom:0;">
    <div class="card-title">Apparently de novo (absent in both parents' blood)</div>
    <div class="card-body" style="font-size:24px;">Empiric recurrence risk is <strong>low but NOT zero</strong> &mdash; possible parental germline (gonadal) mosaicism. Commonly ~1% for many neurodevelopmental conditions, but varies: ~0.5&ndash;1% for MECP2/Rett, ~7&ndash;14% for DMD. Never counsel &ldquo;zero risk&rdquo; from negative parental blood alone.</div>
  </div>
`));

// ── Section 6: Communicating & Coordinating ─────────────────────────────────

// Slide 12: Better / worse phrasing table
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>Communicating Uncertainty</h1>
  <div class="section-label">Section 6 of 6 &mdash; A Gene Name Is Rarely a Precise Prognosis</div>

  <table>
    <thead>
      <tr>
        <th style="width:50%;">Better</th>
        <th style="width:50%;">Worse</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="font-size:22px; font-weight:400;">Children with this change vary widely; we'll track development and update you.</td>
        <td style="font-size:22px; color:${COLORS.red};">Your child will never walk or talk.</td>
      </tr>
      <tr>
        <td style="font-size:22px; font-weight:400;">We don't set a limit on what your child can achieve.</td>
        <td style="font-size:22px; color:${COLORS.red};">This gene means severe disability.</td>
      </tr>
      <tr>
        <td style="font-size:22px; font-weight:400;">Early reports show the most severe cases; milder ones may be under-reported.</td>
        <td style="font-size:22px; color:${COLORS.red};">The textbook says the outcome is poor.</td>
      </tr>
      <tr>
        <td style="font-size:22px; font-weight:400;">Let's focus on the next milestone and reassess.</td>
        <td style="font-size:22px; color:${COLORS.red};">Here is the fixed ceiling for this diagnosis.</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:16px; margin-bottom:0;">
    <div class="label">Four forces driving uncertainty</div>
    <div class="value" style="font-size:23px;">Variable expressivity &nbsp;|&nbsp; incomplete penetrance &nbsp;|&nbsp; small-n genotypes &nbsp;|&nbsp; ascertainment bias (early cohorts skew severe)</div>
  </div>
`));

// Slide 13: Care-team map
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Coordinating Care</h1>
  <div class="section-label">Section 6 of 6 &mdash; The Diagnosis Starts a Coordinated Program</div>

  <div class="two-col" style="margin-bottom:18px;">
    <div class="card card-accent" style="margin-bottom:0;">
      <div class="card-title" style="font-size:26px;">The care team</div>
      <div class="card-body" style="font-size:22px;">Clinical genetics & counseling, neurology, therapies (PT / OT / SLP), syndrome-specific organ specialists (cardiology, nephrology, ophthalmology), developmental-behavioral support, palliative care where appropriate &mdash; with the family as a core partner.</div>
    </div>
    <div class="card card-green" style="margin-bottom:0;">
      <div class="card-title" style="font-size:26px;">The quarterback</div>
      <div class="card-body" style="font-size:22px;">One clinician serves as quarterback in a medical-home model: owns the problem list, synchronizes specialists, and prevents care from fragmenting.</div>
    </div>
  </div>

  <div class="highlight-box" style="margin:0;">
    <div class="label">Plan ahead</div>
    <div class="value" style="font-size:24px;">Plan early for the pediatric-to-adult transition &mdash; a known point of dropout. The goal is a single coordinated plan, not a stack of disconnected referrals.</div>
  </div>
`));

// ── Slide 14: Key Takeaways ──────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 14, TOTAL, [
  {
    title: "Choose the first test deliberately",
    body: "Tight syndrome → single-gene/panel; undifferentiated NDD with parents → trio exome ± CNV-seq (OR ~2.04); repeat or NICU pictures each demand their own pathway.",
  },
  {
    title: "Never act on a VUS",
    body: "ACMG/AMP 2015: manage on clinical findings, not the variant. Most VUS reclassify toward benign. Document and own a plan to reanalyze (re-contact is not standardized).",
  },
  {
    title: "A negative report is time-stamped, not permanent",
    body: "Ask which blind spot fits: immature database (reanalysis), repeat expansion, methylation/imprinting, or mosaicism — each has its own fix.",
  },
  {
    title: "A diagnosis reframes management",
    body: "Ask: is there a disease-modifying therapy, does the genotype change drug choices (including drugs to avoid), and what surveillance does it now mandate (e.g., TSC, Northrup 2021)?",
  },
  {
    title: "Counsel honestly and coordinate care",
    body: "Apparently de novo recurrence is low but not zero (~1%; never counsel zero). Give developmental ranges, not ceilings, and quarterback a single coordinated multidisciplinary plan.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
