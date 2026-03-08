/**
 * scripts/gen-pharmacogenetics.mjs
 *
 * Generates 18 clean, readable slides for the Pharmacogenomics module.
 * Covers PGx fundamentals, metabolizer phenotypes, CPIC guidelines for ASMs,
 * HLA-B*15:02 / SJS/TEN, clobazam / CYP2C19, and phenoconversion.
 * Condensed from 37 original slides to 18 focused slides.
 *
 * Run: node scripts/gen-pharmacogenetics.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "pharmacogenetics";
const mc = MODULE_COLORS[MOD];
const TOTAL = 18;

const slides = [];

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Pharmacogenomics in Neurology",
  subtitle: "Optimizing Anti-Seizure Medication Selection Through Genetic Testing",
  totalSlides: TOTAL,
  topics: [
    "PGx testing & star alleles",
    "Metabolizer phenotypes",
    "CPIC guidelines for ASMs",
    "HLA-B*15:02 & SJS/TEN",
    "Clobazam & CYP2C19",
    "Phenoconversion",
    "Clinical impact & resources",
  ],
}));

// ── Slide 2: Learning Objectives ───────────────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Learning Objectives</h1>
  <div class="section-label">What You Will Learn</div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${mc.accent};">1</div>
    <div><strong style="font-size:21px;">Describe the goals of pharmacogenomic testing</strong> and how genetic variation influences drug response in neurology patients</div>
  </div>
  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.red};">2</div>
    <div><strong style="font-size:21px;">Interpret key components of a PGx test report</strong> including star allele nomenclature and metabolizer phenotype assignments</div>
  </div>
  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.violet};">3</div>
    <div><strong style="font-size:21px;">Apply CPIC guidelines</strong> for anti-seizure medications including carbamazepine, phenytoin, and clobazam</div>
  </div>
  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.green};">4</div>
    <div><strong style="font-size:21px;">Recognize phenoconversion</strong> &mdash; how drug&ndash;drug interactions modify the expected metabolizer phenotype</div>
  </div>
  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.amber};">5</div>
    <div><strong style="font-size:21px;">Identify when PGx testing changes clinical management</strong> in epilepsy and other neurological conditions</div>
  </div>
`));

// ── Slide 3: Case Presentation ─────────────────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Case Presentation</h1>
  <div class="section-label">Adverse Drug Reaction</div>

  <div class="card card-amber" style="margin-bottom:24px;">
    <div class="card-title" style="font-size:24px;">13-Year-Old Male with JME</div>
    <div class="card-body" style="font-size:20px;">
      Presents with <strong>altered mental status, headache, diplopia, and nausea</strong> while on felbamate + clobazam for juvenile myoclonic epilepsy.
    </div>
  </div>

  <div class="two-col">
    <div>
      <h3>Medication History</h3>
      <ul class="bullet-list">
        <li>Clobazam 20 mg BID (maintenance dose)</li>
        <li>Felbamate added 3 months prior</li>
        <li>Seizures well-controlled on combination</li>
        <li>New symptoms began 4&ndash;6 weeks after felbamate start</li>
      </ul>
    </div>
    <div>
      <h3>Examination Findings</h3>
      <ul class="bullet-list">
        <li>Somnolent but arousable</li>
        <li>Horizontal diplopia on lateral gaze</li>
        <li>Ataxic gait</li>
        <li>No rash, no fever</li>
      </ul>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Key Question</div>
    <div class="value" style="font-size:22px;">Drug levels are ordered &mdash; what could explain toxicity at standard doses?</div>
  </div>
`));

// ── Slide 4: Investigations ────────────────────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Investigations</h1>
  <div class="section-label">Drug Level Results</div>

  <div class="stats-row" style="margin-bottom:24px;">
    <div class="stat-card" style="background:${COLORS.greenLight}; border-color:${COLORS.green};">
      <div class="stat-label">Clobazam Level</div>
      <div class="stat-value" style="color:${COLORS.green};">205 ng/mL</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">Reference: 30&ndash;300 ng/mL</div>
    </div>
    <div class="stat-card" style="background:${COLORS.redLight}; border-color:${COLORS.red};">
      <div class="stat-label">N-Desmethylclobazam</div>
      <div class="stat-value" style="color:${COLORS.red};">&gt;10,000 ng/mL</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">Reference: 300&ndash;3,000 ng/mL</div>
    </div>
    <div class="stat-card" style="background:${COLORS.amberLight}; border-color:${COLORS.amber};">
      <div class="stat-label">Ratio</div>
      <div class="stat-value" style="color:${COLORS.amber};">&gt;50:1</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">Metabolite:parent (normally ~5:1)</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-red">
      <div class="card-title">Critical Finding</div>
      <div class="card-body" style="font-size:19px;">
        N-desmethylclobazam (the <strong>active metabolite</strong>) is critically elevated at <strong>&gt;3&times; the upper limit</strong>, even though the parent drug is within range.
      </div>
    </div>
    <div class="card card-accent">
      <div class="card-title">Clinical Implication</div>
      <div class="card-body" style="font-size:19px;">
        The patient cannot adequately clear the active metabolite. This suggests a <strong>metabolic deficiency</strong> in the enzyme responsible for N-desmethylclobazam clearance.
      </div>
    </div>
  </div>
`));

// ── Slide 5: What is Pharmacogenomics? ─────────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>What Is Pharmacogenomics?</h1>
  <div class="section-label">From DNA to Dosing</div>

  <div style="display:flex; align-items:center; gap:16px; margin-bottom:28px;">
    <div class="flow-box" style="background:${mc.accent};">DNA Profiling</div>
    <div class="flow-connector">&rarr;</div>
    <div class="flow-box" style="background:${COLORS.violet};">Metabolizer Category</div>
    <div class="flow-connector">&rarr;</div>
    <div class="flow-box" style="background:${COLORS.green};">Dosing Adjustment</div>
  </div>

  <div class="two-col">
    <div class="card card-accent" style="margin-bottom:16px;">
      <div class="card-title">Definition</div>
      <div class="card-body" style="font-size:19px;">
        The study of how <strong>inherited genetic variation</strong> affects an individual&rsquo;s response to drugs &mdash; including efficacy, toxicity, and optimal dosing.
      </div>
    </div>
    <div class="card card-violet" style="margin-bottom:16px;">
      <div class="card-title">Metabolizer Categories</div>
      <div class="card-body" style="font-size:19px;">
        Patients are classified based on enzyme activity:<br>
        Ultra-rapid &bull; Rapid &bull; Normal &bull; Intermediate &bull; Poor
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Clinical Relevance</div>
    <div class="value" style="font-size:22px;">PGx testing identifies patients at risk for toxicity or treatment failure <em>before</em> prescribing</div>
  </div>
`));

// ── Slide 6: PGx Testing ──────────────────────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>PGx Testing Methods</h1>
  <div class="section-label">How It Works</div>

  <div class="two-col" style="margin-bottom:24px;">
    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title">Targeted Variant Assays</div>
        <div class="card-body" style="font-size:18px;">
          Most PGx tests interrogate <strong>known functional variants</strong> rather than sequencing entire genes.
          <br><br>
          Technologies: <strong>PCR-based genotyping, microarray, targeted NGS panels</strong>
          <br><br>
          Fast, cost-effective, clinically validated
        </div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="margin-bottom:16px;">
        <div class="card-title">Star Allele Nomenclature</div>
        <div class="card-body" style="font-size:18px;">
          Pharmacogenes use <strong>star (*) allele</strong> naming:
          <br><br>
          <strong>*1</strong> = wild-type (reference/normal function)
          <br>
          <strong>*2, *3, etc.</strong> = defined variant haplotypes
          <br><br>
          Each star allele carries one or more specific variants that define its function level.
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Limitation</div>
    <div class="value" style="font-size:22px;">Targeted panels may miss rare or novel variants &mdash; a &ldquo;*1/*1&rdquo; call assumes absence of untested variants</div>
  </div>
`));

// ── Slide 7: PGx Results ──────────────────────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>PGx Results: Our Patient</h1>
  <div class="section-label">Pharmacogenomic Test Report</div>

  <table>
    <thead>
      <tr><th>Gene / Enzyme</th><th>Genotype (Diplotype)</th><th>Phenotype</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>CYP2C19</td>
        <td style="font-weight:700;">*2/*2</td>
        <td style="color:${COLORS.red}; font-weight:700;">Poor Metabolizer</td>
      </tr>
      <tr>
        <td>CYP1A2</td>
        <td style="font-weight:700;">*1F/*1F</td>
        <td style="color:${COLORS.amber}; font-weight:700;">Hyperinducer</td>
      </tr>
      <tr>
        <td>CYP3A5</td>
        <td style="font-weight:700;">*3/*3</td>
        <td style="color:${COLORS.red}; font-weight:700;">Poor Metabolizer</td>
      </tr>
    </tbody>
  </table>

  <div class="two-col" style="margin-top:20px;">
    <div class="card card-red">
      <div class="card-title">CYP2C19 *2/*2</div>
      <div class="card-body" style="font-size:18px;">
        Two loss-of-function alleles &rarr; <strong>no CYP2C19 enzyme activity</strong>. This enzyme is responsible for clearing N-desmethylclobazam.
      </div>
    </div>
    <div class="card card-accent">
      <div class="card-title">Clinical Significance</div>
      <div class="card-body" style="font-size:18px;">
        The CYP2C19 poor metabolizer status <strong>directly explains</strong> the massive N-desmethylclobazam accumulation and the patient&rsquo;s toxicity symptoms.
      </div>
    </div>
  </div>
`));

// ── Slide 8: Metabolizer Phenotype Definitions ─────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Metabolizer Phenotype Definitions</h1>
  <div class="section-label">Genotype-to-Phenotype Translation</div>

  <table>
    <thead>
      <tr><th>Phenotype</th><th>Enzyme Activity</th><th>Example Genotype</th><th>Clinical Effect</th></tr>
    </thead>
    <tbody>
      <tr>
        <td style="color:${COLORS.red};">Ultra-Rapid</td>
        <td>Greatly increased</td>
        <td>CYP2D6 *1/*1xN</td>
        <td>Drug cleared too fast &mdash; treatment failure</td>
      </tr>
      <tr>
        <td>Rapid</td>
        <td>Slightly increased</td>
        <td>CYP2C19 *1/*17</td>
        <td>May need higher doses</td>
      </tr>
      <tr>
        <td style="color:${COLORS.green};">Normal</td>
        <td>Expected activity</td>
        <td>CYP2C19 *1/*1</td>
        <td>Standard dosing appropriate</td>
      </tr>
      <tr>
        <td style="color:${COLORS.amber};">Intermediate</td>
        <td>Decreased</td>
        <td>CYP2C19 *1/*2</td>
        <td>Consider dose reduction</td>
      </tr>
      <tr>
        <td style="color:${COLORS.red};">Poor</td>
        <td>Minimal / none</td>
        <td>CYP2C19 *2/*2</td>
        <td>High toxicity risk &mdash; avoid or reduce dose</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Key Concept</div>
    <div class="value" style="font-size:22px;">The phenotype depends on the <strong>combined activity</strong> of both alleles &mdash; each star allele contributes an activity score</div>
  </div>
`));

// ── Slide 9: Pharmacokinetics vs Pharmacodynamics ──────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Pharmacokinetics vs Pharmacodynamics</h1>
  <div class="section-label">Two Sides of Drug Response</div>

  <div class="two-col" style="margin-bottom:24px;">
    <div>
      <div class="card card-accent" style="min-height:280px;">
        <div class="card-title" style="font-size:24px;">Pharmacokinetics (PK)</div>
        <div class="card-body" style="font-size:19px;">
          <strong>&ldquo;What the body does to the drug&rdquo;</strong>
          <br><br>
          Drug concentration vs. time:
          <br><br>
          <strong>A</strong>bsorption &rarr; <strong>D</strong>istribution &rarr; <strong>M</strong>etabolism &rarr; <strong>E</strong>xcretion
          <br><br>
          Most PGx variants affect <strong>metabolism</strong> (CYP enzymes)
        </div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="min-height:280px;">
        <div class="card-title" style="font-size:24px;">Pharmacodynamics (PD)</div>
        <div class="card-body" style="font-size:19px;">
          <strong>&ldquo;What the drug does to the body&rdquo;</strong>
          <br><br>
          Drug&ndash;receptor interactions:
          <br><br>
          Target binding &rarr; Signal transduction &rarr; Biological effect
          <br><br>
          PD variants: <strong>HLA alleles</strong> (immune-mediated reactions)
        </div>
      </div>
    </div>
  </div>

  <div class="card card-green">
    <div class="card-title">Why This Matters</div>
    <div class="card-body" style="font-size:19px;">
      PK variants (e.g., CYP2C19) affect <strong>drug levels</strong> &mdash; dose adjustment may resolve the issue.
      PD variants (e.g., HLA-B*15:02) affect <strong>drug response</strong> &mdash; the drug must be avoided entirely.
    </div>
  </div>
`));

// ── Slide 10: CPIC Guidelines for ASMs ─────────────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>CPIC Guidelines for ASMs</h1>
  <div class="section-label">Evidence-Based Prescribing Recommendations</div>

  <table>
    <thead>
      <tr><th>Drug</th><th>Gene</th><th>Key Risk</th><th>CPIC Recommendation</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>Carbamazepine</td>
        <td>HLA-B*15:02</td>
        <td style="color:${COLORS.red}; font-weight:700;">SJS/TEN</td>
        <td>Avoid if positive; use alternative ASM</td>
      </tr>
      <tr>
        <td>Oxcarbazepine</td>
        <td>HLA-B*15:02</td>
        <td style="color:${COLORS.red}; font-weight:700;">SJS/TEN</td>
        <td>Avoid if positive; same HLA risk as CBZ</td>
      </tr>
      <tr>
        <td>Phenytoin</td>
        <td>CYP2C9 + HLA-B*15:02</td>
        <td style="color:${COLORS.amber}; font-weight:700;">SJS/TEN + Toxicity</td>
        <td>HLA test + dose by CYP2C9 status</td>
      </tr>
      <tr>
        <td>Clobazam</td>
        <td>CYP2C19</td>
        <td style="color:${COLORS.amber}; font-weight:700;">Metabolite toxicity</td>
        <td>Reduce dose in poor metabolizers</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:20px;">
    <div class="label">CPIC = Clinical Pharmacogenetics Implementation Consortium</div>
    <div class="value" style="font-size:22px;">Free, peer-reviewed guidelines translating genotype results into actionable prescribing recommendations</div>
  </div>
`));

// ── Slide 11: HLA-B*15:02 and SJS/TEN ─────────────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>HLA-B*15:02 &amp; SJS/TEN</h1>
  <div class="section-label">FDA Boxed Warning</div>

  <div class="card card-red" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:24px;">FDA Black Box Warning: Carbamazepine</div>
    <div class="card-body" style="font-size:20px;">
      Patients positive for <strong>HLA-B*15:02</strong> are at dramatically increased risk for <strong>Stevens-Johnson Syndrome (SJS)</strong> and <strong>toxic epidermal necrolysis (TEN)</strong> &mdash; potentially fatal skin reactions.
    </div>
  </div>

  <div class="two-col">
    <div>
      <div class="card card-amber" style="margin-bottom:16px;">
        <div class="card-title">At-Risk Populations</div>
        <div class="card-body" style="font-size:18px;">
          HLA-B*15:02 prevalence is highest in:
          <br><br>
          &bull; <strong>Southeast Asian</strong> ancestry (5&ndash;15%)
          <br>
          &bull; <strong>South Asian</strong> ancestry (2&ndash;5%)
          <br>
          &bull; Very rare in European/African populations
          <br><br>
          <strong>Must test before prescribing</strong> carbamazepine or oxcarbazepine in at-risk individuals.
        </div>
      </div>
    </div>
    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title">Mechanism</div>
        <div class="card-body" style="font-size:18px;">
          This is a <strong>pharmacodynamic</strong> (immune-mediated) reaction &mdash; not dose-dependent.
          <br><br>
          HLA-B*15:02 presents drug-modified peptides to T-cells, triggering a severe immune response in the skin.
          <br><br>
          <strong>Dose reduction does not eliminate risk.</strong>
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 12: Clobazam & CYP2C19 ──────────────────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>Clobazam &amp; CYP2C19</h1>
  <div class="section-label">Metabolizer-Dependent Toxicity</div>

  <div style="display:flex; align-items:center; gap:16px; margin-bottom:24px;">
    <div class="flow-box" style="background:${mc.accent};">Clobazam</div>
    <div class="flow-connector">&rarr;</div>
    <div class="flow-box" style="background:${COLORS.violet};">N-Desmethylclobazam<br><span style="font-size:14px;">(active metabolite)</span></div>
    <div class="flow-connector" style="position:relative;">
      &rarr;
      <span style="position:absolute; top:-20px; left:0; font-size:14px; color:${COLORS.red}; font-weight:700; white-space:nowrap;">CYP2C19</span>
    </div>
    <div class="flow-box" style="background:${COLORS.green};">Inactive<br><span style="font-size:14px;">metabolites</span></div>
  </div>

  <div class="two-col">
    <div class="card card-red" style="margin-bottom:16px;">
      <div class="card-title">Poor Metabolizers (*2/*2)</div>
      <div class="card-body" style="font-size:18px;">
        CYP2C19 poor metabolizers <strong>cannot clear N-desmethylclobazam</strong>, causing massive accumulation of the active metabolite.
        <br><br>
        N-desmethylclobazam is <strong>equipotent</strong> to clobazam and has a much longer half-life.
      </div>
    </div>
    <div class="card card-green" style="margin-bottom:16px;">
      <div class="card-title">FDA Dosing Recommendation</div>
      <div class="card-body" style="font-size:18px;">
        For CYP2C19 poor metabolizers:
        <br><br>
        &bull; <strong>Start at 5 mg/day</strong> (standard: 10&ndash;20 mg/day)
        <br>
        &bull; <strong>Maximum: half the standard dose</strong>
        <br>
        &bull; Monitor N-desmethylclobazam levels
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Prevalence</div>
    <div class="value" style="font-size:22px;">CYP2C19 poor metabolizers: ~2&ndash;5% of European, ~12&ndash;20% of East Asian populations</div>
  </div>
`));

// ── Slide 13: Phenoconversion ──────────────────────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Phenoconversion</h1>
  <div class="section-label">When Genotype Doesn't Match Phenotype</div>

  <div class="card card-amber" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">Drug&ndash;Drug Interactions Modify the Expected Phenotype</div>
    <div class="card-body" style="font-size:20px;">
      A patient with a <strong>normal metabolizer genotype</strong> can functionally behave as a <strong>poor metabolizer</strong> if co-prescribed a strong enzyme inhibitor.
    </div>
  </div>

  <div class="two-col" style="margin-bottom:20px;">
    <div class="card card-red">
      <div class="card-title">CYP2C19 Inhibitors in Epilepsy</div>
      <div class="card-body" style="font-size:18px;">
        <strong>Felbamate</strong> &mdash; moderate CYP2C19 inhibitor
        <br><br>
        <strong>Cenobamate</strong> &mdash; moderate CYP2C19 inhibitor
        <br><br>
        Both can convert a normal metabolizer into a <strong>functional poor metabolizer</strong> for clobazam clearance.
      </div>
    </div>
    <div class="card card-accent">
      <div class="card-title">Our Patient</div>
      <div class="card-body" style="font-size:18px;">
        <strong>Genotype:</strong> CYP2C19 *2/*2 (already poor metabolizer)
        <br><br>
        <strong>Co-medication:</strong> Felbamate (CYP2C19 inhibitor)
        <br><br>
        <strong>Result:</strong> Double hit &mdash; genetic poor metabolism + pharmacologic inhibition &rarr; extreme metabolite accumulation
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:22px;">Always consider phenoconversion when combining ASMs &mdash; genotype alone may underestimate true metabolic impairment</div>
  </div>
`));

// ── Slide 14: Clinical Impact of PGx ───────────────────────────────────────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>Clinical Impact of PGx</h1>
  <div class="section-label">Evidence for Utility in Epilepsy</div>

  <div class="stats-row" style="margin-bottom:24px;">
    <div class="stat-card" style="background:${mc.light}; border-color:${mc.accent};">
      <div class="stat-label">Management Changed</div>
      <div class="stat-value">~20%</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">of epilepsy patients tested</div>
    </div>
    <div class="stat-card" style="background:${COLORS.redLight}; border-color:${COLORS.red};">
      <div class="stat-label">SJS/TEN Risk</div>
      <div class="stat-value">Prevented</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">by pre-prescribing HLA testing</div>
    </div>
    <div class="stat-card" style="background:${COLORS.greenLight}; border-color:${COLORS.green};">
      <div class="stat-label">Cost-Effectiveness</div>
      <div class="stat-value">Favorable</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">vs. treating adverse reactions</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">How PGx Changes Practice</div>
      <div class="card-body" style="font-size:18px;">
        &bull; Avoid contraindicated drugs (HLA-guided)
        <br>
        &bull; Adjust starting dose (CYP-guided)
        <br>
        &bull; Predict drug&ndash;drug interactions
        <br>
        &bull; Explain unexpected toxicity or failure
      </div>
    </div>
    <div class="card card-green">
      <div class="card-title">Beyond Epilepsy</div>
      <div class="card-body" style="font-size:18px;">
        &bull; Pain management (codeine/CYP2D6)
        <br>
        &bull; Stroke prevention (warfarin/CYP2C9+VKORC1)
        <br>
        &bull; Psychiatry (SSRIs, TCAs/CYP2D6, CYP2C19)
        <br>
        &bull; Anesthesia (malignant hyperthermia/RYR1)
      </div>
    </div>
  </div>
`));

// ── Slide 15: Case Resolution ──────────────────────────────────────────────
slides.push(slideHTML(MOD, 15, TOTAL, `
  <h1>Case Resolution</h1>
  <div class="section-label">Outcome</div>

  <div class="card card-green" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:24px;">Resolution</div>
    <div class="card-body" style="font-size:20px;">
      Clobazam was stopped. N-desmethylclobazam levels <strong>normalized over 3 months</strong> (long half-life in poor metabolizers). Mental status and neurological examination returned to baseline.
    </div>
  </div>

  <div class="two-col" style="margin-bottom:20px;">
    <div class="card card-accent">
      <div class="card-title">New Regimen</div>
      <div class="card-body" style="font-size:18px;">
        Transitioned to <strong>felbamate + ethosuximide</strong> for JME management.
        <br><br>
        Neither drug depends on CYP2C19 for primary metabolism.
        <br><br>
        <strong>Seizure-free</strong> on the new combination.
      </div>
    </div>
    <div class="card card-violet">
      <div class="card-title">PGx-Guided Future Care</div>
      <div class="card-body" style="font-size:18px;">
        PGx results now in medical record:
        <br><br>
        &bull; <strong>Avoid CYP2C19 substrates</strong> or dose-reduce
        <br>
        &bull; CYP1A2 hyperinducer status noted
        <br>
        &bull; Lifetime actionable data for any future prescribing
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Lesson</div>
    <div class="value" style="font-size:22px;">Pre-emptive PGx testing could have prevented 3 months of toxicity and guided initial drug selection</div>
  </div>
`));

// ── Slide 16: Key Resources ────────────────────────────────────────────────
slides.push(slideHTML(MOD, 16, TOTAL, `
  <h1>Key PGx Resources</h1>
  <div class="section-label">Tools for Clinical Practice</div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
    <div class="card card-accent">
      <div class="card-title" style="font-size:22px;">CPIC</div>
      <div class="card-body" style="font-size:18px;">
        <strong>cpicpgx.org</strong>
        <br><br>
        Clinical Pharmacogenetics Implementation Consortium. Peer-reviewed guidelines for translating genotype into prescribing action. Gold standard for clinical PGx.
      </div>
    </div>
    <div class="card card-green">
      <div class="card-title" style="font-size:22px;">PharmGKB</div>
      <div class="card-body" style="font-size:18px;">
        <strong>pharmgkb.org</strong>
        <br><br>
        Knowledge base of gene&ndash;drug associations. Curated clinical annotations, variant information, and drug label summaries.
      </div>
    </div>
    <div class="card card-violet">
      <div class="card-title" style="font-size:22px;">PharmVar</div>
      <div class="card-body" style="font-size:18px;">
        <strong>pharmvar.org</strong>
        <br><br>
        Central repository for pharmacogene star allele definitions. Standardizes allele nomenclature across laboratories.
      </div>
    </div>
    <div class="card card-amber">
      <div class="card-title" style="font-size:22px;">FDA PGx Table</div>
      <div class="card-body" style="font-size:18px;">
        <strong>FDA Table of Pharmacogenomic Associations</strong>
        <br><br>
        Lists FDA-approved drug labels with pharmacogenomic information, including boxed warnings and dosing recommendations.
      </div>
    </div>
  </div>
`));

// ── Slide 17: Neurology PGx Quick Reference ────────────────────────────────
slides.push(slideHTML(MOD, 17, TOTAL, `
  <h1>Neurology PGx Quick Reference</h1>
  <div class="section-label">High-Yield Drug&ndash;Gene Pairs</div>

  <table>
    <thead>
      <tr><th>Drug</th><th>Gene(s)</th><th>Risk / Effect</th><th>Action</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>Carbamazepine</td>
        <td>HLA-B*15:02</td>
        <td style="color:${COLORS.red}; font-weight:700;">SJS/TEN</td>
        <td>Avoid if HLA positive</td>
      </tr>
      <tr>
        <td>Phenytoin</td>
        <td>CYP2C9 &bull; HLA-B*15:02</td>
        <td style="color:${COLORS.red}; font-weight:700;">Toxicity + SJS/TEN</td>
        <td>Dose by CYP2C9; avoid if HLA positive</td>
      </tr>
      <tr>
        <td>Clobazam</td>
        <td>CYP2C19</td>
        <td style="color:${COLORS.amber}; font-weight:700;">Metabolite toxicity</td>
        <td>Start 5 mg/day; half max dose if PM</td>
      </tr>
      <tr>
        <td>Codeine</td>
        <td>CYP2D6</td>
        <td style="color:${COLORS.red}; font-weight:700;">Respiratory depression (UM) / No effect (PM)</td>
        <td>Avoid in UM and PM; use alternative</td>
      </tr>
      <tr>
        <td>Warfarin</td>
        <td>CYP2C9 &bull; VKORC1</td>
        <td style="color:${COLORS.amber}; font-weight:700;">Bleeding risk</td>
        <td>Genotype-guided dosing algorithm</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Remember</div>
    <div class="value" style="font-size:22px;">PGx results are <strong>lifelong</strong> &mdash; once tested, the data applies to all future prescribing encounters</div>
  </div>
`));

// ── Slide 18: Key Takeaways ────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 18, TOTAL, [
  {
    title: "PGx testing predicts drug response before prescribing",
    body: "DNA-based metabolizer phenotypes identify patients at risk for toxicity or treatment failure with specific medications.",
  },
  {
    title: "HLA-B*15:02 testing is mandatory before carbamazepine",
    body: "FDA boxed warning: must test in Southeast Asian and South Asian ancestry populations to prevent SJS/TEN.",
  },
  {
    title: "CYP2C19 poor metabolizers accumulate N-desmethylclobazam",
    body: "Start clobazam at 5 mg/day with half the maximum dose; monitor active metabolite levels.",
  },
  {
    title: "Phenoconversion creates a gap between genotype and phenotype",
    body: "Drug-drug interactions (felbamate, cenobamate) can inhibit CYP enzymes, making a normal metabolizer behave as a poor metabolizer.",
  },
  {
    title: "PGx changes management in ~20% of epilepsy patients",
    body: "Use CPIC guidelines, PharmGKB, and FDA tables to translate genotype results into actionable clinical decisions.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides("pharmacogenetics", slides);
