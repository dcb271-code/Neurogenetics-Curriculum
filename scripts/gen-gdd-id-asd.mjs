/**
 * scripts/gen-gdd-id-asd.mjs
 *
 * Generates 10 slides for the "Evaluating Developmental Delay, ID & Autism"
 * module (5 sections × 2 slides each; slide 1 is the title, slide 10 is takeaways).
 * Uses puppeteer HTML rendering via the shared design system.
 *
 * All facts/numbers are pulled directly from data/modules/gdd-id-asd.json.
 *
 * Run: node scripts/gen-gdd-id-asd.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "gdd-id-asd";
const mc = MODULE_COLORS[MOD];
const TOTAL = 10;

const slides = [];

// ── Slide 1: Title ──────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Evaluating Developmental Delay,<br>ID &amp; Autism",
  subtitle: "A diagnostic approach to global delay, nonsyndromic ID, and autism",
  totalSlides: TOTAL,
  topics: [
    "Definitions & the diagnostic shift",
    "The genetic architecture",
    "Exam findings that shift yield",
    "The 'subtly syndromic' genes",
    "Testing strategy & counseling",
  ],
}));

// ── Section 1: Definitions & the Diagnostic Shift ───────────────────────────

// Slide 2: Definitions + the shift
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Definitions &amp; the Diagnostic Shift</h1>
  <div class="section-label">Section 1 of 5 &mdash; From Gestalt-Spotting to Structured Testing</div>

  <div class="three-col" style="margin-bottom:16px;">
    <div class="card card-accent" style="margin-bottom:0;">
      <div class="card-title" style="font-size:24px;">GDD</div>
      <div class="card-body" style="font-size:21px;">&ge;2 SD delay in &ge;2 domains; reserved for children <strong>under ~5 yr</strong>, before IQ testing is reliable.</div>
    </div>
    <div class="card card-violet" style="margin-bottom:0;">
      <div class="card-title" style="font-size:24px;">ID</div>
      <div class="card-body" style="font-size:21px;">Deficits in <strong>both</strong> intellectual (IQ ~&lt;70) <strong>and</strong> adaptive function; developmental-period onset; diagnosed in older children.</div>
    </div>
    <div class="card card-blue" style="margin-bottom:0;">
      <div class="card-title" style="font-size:24px;">ASD</div>
      <div class="card-body" style="font-size:21px;">Social-communication deficits + restricted/repetitive behaviors; <strong>~1 in 36</strong> (CDC). ID co-occurs in a minority.</div>
    </div>
  </div>

  <div class="two-col" style="margin-bottom:16px;">
    <div class="card card-teal" style="margin-bottom:0;">
      <div class="card-title" style="font-size:24px;">Syndromic vs. nonsyndromic</div>
      <div class="card-body" style="font-size:21px;"><strong>Syndromic</strong> = delay/ID/ASD plus recognizable features (anomalies, growth/exam findings, regression). <strong>Nonsyndromic</strong> = isolated delay/ID/ASD.</div>
    </div>
    <div class="card card-green" style="margin-bottom:0;">
      <div class="card-title" style="font-size:24px;">The shift</div>
      <div class="card-body" style="font-size:21px;">Old model &mdash; wait for a recognizable syndrome, then test &mdash; is replaced by structured genetic evaluation.</div>
    </div>
  </div>

  <div class="highlight-box" style="margin:0;">
    <div class="label">The key point</div>
    <div class="value" style="font-size:23px;">Most moderate-to-severe NDD is genetic, testable, and <strong>sporadic (de novo)</strong> &mdash; so an unremarkable family history does NOT lower the probability of a genetic diagnosis. Even nonsyndromic presentations carry meaningful yield.</div>
  </div>
`));

// ── Section 2: The Genetic Architecture (slides 3–4) ────────────────────────

// Slide 3: mechanism cards
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>The Genetic Architecture</h1>
  <div class="section-label">Section 2 of 5 &mdash; Four Mechanisms, One Strategy</div>

  <div class="two-col">
    <div class="card card-accent" style="margin-bottom:0;">
      <div class="card-title" style="font-size:25px;">De novo dominant</div>
      <div class="card-body" style="font-size:21px;">A leading cause of sporadic moderate-to-severe ID and major ASD contributor. New in the child &rarr; sporadic. <strong>Trio sequencing ~doubles yield</strong> (OR ~2.04, Clark 2018) &mdash; the single most useful design choice.</div>
    </div>
    <div class="card card-blue" style="margin-bottom:0;">
      <div class="card-title" style="font-size:25px;">Copy number variants</div>
      <div class="card-body" style="font-size:21px;">CMA yields <strong>~10%</strong> across broad NDD cohorts. Detects recurrent genomic disorders &mdash; <strong>16p11.2, 22q11.2, 15q11.2, 1q21.1</strong> &mdash; that exome calling can miss.</div>
    </div>
    <div class="card card-violet" style="margin-bottom:0;">
      <div class="card-title" style="font-size:25px;">Monogenic (single-gene)</div>
      <div class="card-body" style="font-size:21px;">Hundreds of genes. <strong>Trio exome ~30&ndash;45% in ID</strong>; trio exome + CNV analysis reaches <strong>up to ~61% in GDD</strong>.</div>
    </div>
    <div class="card card-teal" style="margin-bottom:0;">
      <div class="card-title" style="font-size:25px;">X-linked ID</div>
      <div class="card-body" style="font-size:21px;">Drives the male excess in ID. <strong>FMR1 (Fragile X)</strong> is the most common, but many other X-linked ID genes exist.</div>
    </div>
  </div>
`));

// Slide 4: yield tracks phenotype
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Yield Tracks the Phenotype</h1>
  <div class="section-label">Section 2 of 5 &mdash; The Presentation Predicts the Probability</div>

  <div class="card card-green" style="margin-bottom:16px;">
    <div class="card-title">Highest yield</div>
    <div class="card-body" style="font-size:24px;">Syndromic, severe, and early-onset presentations yield highest &mdash; the more specific and severe the phenotype, the more likely a structured work-up finds a cause.</div>
  </div>

  <div class="two-col">
    <div class="card card-amber" style="margin-bottom:0;">
      <div class="card-title" style="font-size:26px;">Isolated ASD without ID</div>
      <div class="card-body" style="font-size:23px;">The <strong>lowest</strong> yield &mdash; WES <strong>~10&ndash;15%</strong>.</div>
    </div>
    <div class="card card-accent" style="margin-bottom:0;">
      <div class="card-title" style="font-size:26px;">ASD with comorbid ID</div>
      <div class="card-body" style="font-size:23px;">Rises to <strong>~25&ndash;30%</strong> when ID co-occurs.</div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px; margin-bottom:0;">
    <div class="label">Bottom line</div>
    <div class="value" style="font-size:23px;">Yield is never zero, but it scales with phenotype severity and specificity &mdash; useful for setting pretest expectations, not for withholding testing.</div>
  </div>
`));

// ── Section 3: Exam Findings That Shift Yield (slides 5–6) ───────────────────

// Slide 5: head circumference
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Head Circumference &mdash; the Highest-Yield Measure</h1>
  <div class="section-label">Section 3 of 5 &mdash; One Tape Measure Reshapes the Differential</div>

  <div class="two-col">
    <div class="card card-accent" style="margin-bottom:0;">
      <div class="card-title" style="font-size:26px;">Macrocephaly + DD/ASD</div>
      <div class="card-body" style="font-size:22px;">Think <strong>PTEN</strong> (PTEN hamartoma tumor syndrome &mdash; a specific test indication in ASD with macrocephaly), <strong>MTOR</strong>-pathway megalencephaly, and overgrowth syndromes; also some CNVs (e.g., <strong>16p11.2 deletion</strong>).</div>
    </div>
    <div class="card card-violet" style="margin-bottom:0;">
      <div class="card-title" style="font-size:26px;">Microcephaly</div>
      <div class="card-body" style="font-size:22px;">Strongly predicts an identifiable genetic cause. <strong>Congenital/primary</strong> &rarr; primary microcephaly genes (e.g., <strong>ASPM</strong> and other MCPH genes) and syndromic/metabolic causes. <strong>Progressive</strong> &rarr; a regressive process (e.g., Rett, neurodegenerative/metabolic disease).</div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px; margin-bottom:0;">
    <div class="label">Why it matters</div>
    <div class="value" style="font-size:23px;">Head circumference is the highest-yield single exam measurement &mdash; it reshapes the differential and the test you order more than any list of minor facial features.</div>
  </div>
`));

// Slide 6: tone + other findings + the message
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Tone, Growth, Regression &amp; Anomalies</h1>
  <div class="section-label">Section 3 of 5 &mdash; Focus on the Few Distinctive Features</div>

  <div class="card card-blue" style="margin-bottom:16px;">
    <div class="card-title">Hypotonia broadens the differential</div>
    <div class="card-body" style="font-size:23px;">Central hypotonia is common across genetic NDD: <strong>Prader-Willi, Angelman, myotonic dystrophy (maternal), congenital myopathies/dystrophies</strong>, and many chromosomal/CNV syndromes.</div>
  </div>

  <div class="two-col" style="margin-bottom:16px;">
    <div class="card card-amber" style="margin-bottom:0;">
      <div class="card-title" style="font-size:26px;">Other yield-shifting findings</div>
      <div class="card-body" style="font-size:22px;">Growth abnormality (overgrowth vs. failure to thrive), <strong>organomegaly</strong> (storage disorders), <strong>regression</strong> (red flag for metabolic/neurodegenerative disease), and congenital anomalies (raise CMA/exome yield).</div>
    </div>
    <div class="card card-red" style="margin-bottom:0;">
      <div class="card-title" style="font-size:26px;">Don't over-read minor dysmorphism</div>
      <div class="card-body" style="font-size:22px;">Minor features in isolation (e.g., epicanthal folds) rarely move the needle &mdash; chase the <strong>few</strong> distinctive features that change yield, not a catalogue of small ones.</div>
    </div>
  </div>

  <div class="highlight-box" style="margin:0;">
    <div class="label">The message</div>
    <div class="value" style="font-size:23px;">A few targeted observations &mdash; head size, tone, growth, regression &mdash; reshape pretest probability and the test menu far more than a list of minor facial features.</div>
  </div>
`));

// ── Section 4: The 'Subtly Syndromic' Genes (slides 7–8) ────────────────────

// Slide 7: gene → condition → clue table
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>The 'Subtly Syndromic' Genes</h1>
  <div class="section-label">Section 4 of 5 &mdash; Molecularly-Defined Syndromes Without a Facial Gestalt</div>

  <table>
    <thead>
      <tr>
        <th style="width:18%;">Gene</th>
        <th style="width:34%;">Condition</th>
        <th style="width:48%;">Clue / how it's found</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="font-weight:700; color:${mc.dark};">SHANK3</td>
        <td>Phelan-McDermid (22q13.3)</td>
        <td style="font-size:21px;">ASD, ID, neonatal hypotonia, absent/severely delayed speech</td>
      </tr>
      <tr>
        <td style="font-weight:700; color:${mc.dark};">ARID1B</td>
        <td>Coffin-Siris</td>
        <td style="font-size:21px;">One of the most common single-gene ID causes; variable, easily-missed features</td>
      </tr>
      <tr>
        <td style="font-weight:700; color:${mc.dark};">PTEN</td>
        <td>PTEN hamartoma tumor syndrome</td>
        <td style="font-size:21px;">Macrocephaly with ASD or DD &mdash; a specific testing indication</td>
      </tr>
      <tr>
        <td style="font-weight:700; color:${mc.dark};">MTOR</td>
        <td>Smith-Kingsmore (germline)</td>
        <td style="font-size:21px;">Germline &rarr; megalencephaly/ID; mosaic &rarr; focal cortical malformation</td>
      </tr>
      <tr>
        <td style="font-weight:700; color:${mc.dark};">16p11.2 del</td>
        <td>Recurrent CNV (on CMA)</td>
        <td style="font-size:21px;">ASD, speech delay, and macrocephaly</td>
      </tr>
      <tr>
        <td style="font-weight:700; color:${mc.dark};">SON</td>
        <td>ZTTK syndrome</td>
        <td style="font-size:21px;">ID, DD, non-classic features; under-recognized until the exome era</td>
      </tr>
      <tr>
        <td style="font-weight:700; color:${mc.dark};">ADNP</td>
        <td>Helsmoortel-Van der Aa</td>
        <td style="font-size:21px;">One of the most frequent single-gene causes of ASD</td>
      </tr>
    </tbody>
  </table>
`));

// Slide 8: the message
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Don't Withhold Testing on Looks</h1>
  <div class="section-label">Section 4 of 5 &mdash; Diagnosed Molecularly, Not by Sight</div>

  <div class="card card-red" style="margin-bottom:18px;">
    <div class="card-title">The error to avoid</div>
    <div class="card-body" style="font-size:24px;">Many genetic NDDs lack a strong facial gestalt &mdash; they are recognized by <strong>sequencing or CMA, not by sight</strong>. Don't withhold genetic testing because a child &ldquo;does not look syndromic.&rdquo;</div>
  </div>

  <div class="two-col">
    <div class="card card-accent" style="margin-bottom:0;">
      <div class="card-title" style="font-size:26px;">Sequencing-defined</div>
      <div class="card-body" style="font-size:22px;">SHANK3, ARID1B, PTEN, MTOR, SON, ADNP &mdash; found on (trio) exome, often without a recognizable gestalt.</div>
    </div>
    <div class="card card-blue" style="margin-bottom:0;">
      <div class="card-title" style="font-size:26px;">CMA-defined</div>
      <div class="card-body" style="font-size:22px;">16p11.2 deletion &mdash; a common recurrent CNV detected by chromosomal microarray.</div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px; margin-bottom:0;">
    <div class="label">Why it matters</div>
    <div class="value" style="font-size:23px;">These conditions show why a <strong>structured genetic work-up</strong> &mdash; not gestalt recognition &mdash; is the path to diagnosis in much of GDD/ID/ASD.</div>
  </div>
`));

// ── Section 5: Testing Strategy & Counseling (slides 9–10) ──────────────────

// Slide 9: historical → current shift + approach
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Testing Strategy</h1>
  <div class="section-label">Section 5 of 5 &mdash; Historical First-Tier to Modern First-Line</div>

  <div class="two-col" style="margin-bottom:16px;">
    <div class="card card-violet" style="margin-bottom:0;">
      <div class="card-title" style="font-size:25px;">The shift</div>
      <div class="card-body" style="font-size:21px;">Historically, first-tier was <strong>CMA + Fragile X</strong>. Increasingly, <strong>exome/genome moves first-line</strong> (ACMG 2021), because trio sequencing has the highest single-test yield &mdash; best deployed <strong>with pretest genetic counseling (CGC)</strong> given VUS/secondary-findings complexity.</div>
    </div>
    <div class="card card-red" style="margin-bottom:0;">
      <div class="card-title" style="font-size:25px;">CMA + Fragile X still needed</div>
      <div class="card-body" style="font-size:21px;">They remain necessary even alongside exome &mdash; standard exome reliably detects <strong>neither CNVs nor the FMR1 repeat expansion</strong>.</div>
    </div>
  </div>

  <div class="highlight-box" style="margin:0;">
    <div class="label">A reasonable approach</div>
    <div class="value" style="font-size:23px;">CMA + Fragile X in essentially all unexplained GDD/ID (and ASD where indicated); add <strong>trio exome/genome</strong> first- or second-tier (first-line when counseling is available and the phenotype is severe/syndromic); <strong>targeted testing</strong> when the exam points to it (e.g., PTEN with macrocephaly + ASD).</div>
  </div>
`));

// Slide 10: Key takeaways
slides.push(takeawaysSlideHTML(MOD, 10, TOTAL, [
  {
    title: "Most severe NDD is genetic and sporadic",
    body: "GDD (<~5 yr, ≥2 SD, ≥2 domains) precedes valid IQ testing; ID needs BOTH intellectual and adaptive deficits; ASD ~1 in 36. Most moderate-to-severe NDD is de novo, so an unremarkable family history does NOT lower probability.",
  },
  {
    title: "Architecture explains the strategy",
    body: "De novo dominant (trio ~doubles yield, OR ~2.04), CNVs (CMA ~10%), monogenic (trio exome ~30–45% ID, up to ~61% GDD), and X-linked (FMR1 most common). Yield tracks phenotype: isolated ASD WES ~10–15%, ~25–30% with ID.",
  },
  {
    title: "A focused exam shifts yield",
    body: "Head circumference is highest-yield: macrocephaly + DD/ASD → PTEN/MTOR/overgrowth/16p11.2; microcephaly strongly predicts a genetic cause. Tone, growth, organomegaly, and regression each reshape the work-up.",
  },
  {
    title: "Don't withhold testing on looks",
    body: "SHANK3, ARID1B, PTEN, MTOR, 16p11.2, SON, and ADNP lack a facial gestalt and are diagnosed molecularly — a structured work-up, not gestalt recognition, finds them.",
  },
  {
    title: "Test broadly, then counsel on mechanism",
    body: "CMA + Fragile X in essentially all cases; exome/genome increasingly first-line (ACMG 2021) with pretest counseling. Recurrence is mechanism-specific — de novo low but non-zero (~1%, gonadal mosaicism) vs. higher for recessive/X-linked/familial-CNV.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
