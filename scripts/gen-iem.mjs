/**
 * scripts/gen-iem.mjs
 *
 * Generates 15 clean, readable slides for the IEM: Leukodystrophies module.
 * Focused on X-ALD and newborn screening.
 * Uses puppeteer HTML rendering via the shared design system.
 *
 * Run: node scripts/gen-iem.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "iem";
const mc = MODULE_COLORS[MOD];
const TOTAL = 15;

const slides = [];

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "IEM: Leukodystrophies",
  subtitle: "Newborn Screening & X-ALD",
  totalSlides: TOTAL,
  topics: [
    "Newborn screening overview & RUSP",
    "X-ALD biochemistry & diagnosis",
    "Confirmatory testing cascade",
    "Sex-based management & surveillance",
    "Leukodystrophy MRI patterns",
    "Treatment eligibility & gene therapy",
  ],
}));

// ── Slide 2: Learning Objectives ───────────────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Learning Objectives</h1>
  <div class="section-label">What You Will Learn</div>

  <div style="display:flex; flex-direction:column; gap:14px; margin-top:12px;">
    <div class="card card-accent" style="display:flex; gap:18px; align-items:flex-start; padding:20px 24px;">
      <div class="number-circle" style="background:${mc.accent};">1</div>
      <div>
        <div class="card-title" style="font-size:20px;">X-ALD Diagnosis</div>
        <div class="card-body" style="font-size:18px;">Understand the diagnostic pathway from NBS positive screen to confirmed X-ALD</div>
      </div>
    </div>
    <div class="card card-green" style="display:flex; gap:18px; align-items:flex-start; padding:20px 24px;">
      <div class="number-circle" style="background:${COLORS.green};">2</div>
      <div>
        <div class="card-title" style="font-size:20px;">NBS Cascade Testing</div>
        <div class="card-body" style="font-size:18px;">Navigate the confirmatory testing algorithm following a positive newborn screen</div>
      </div>
    </div>
    <div class="card card-violet" style="display:flex; gap:18px; align-items:flex-start; padding:20px 24px;">
      <div class="number-circle" style="background:${COLORS.violet};">3</div>
      <div>
        <div class="card-title" style="font-size:20px;">Leukodystrophy MRI Patterns</div>
        <div class="card-body" style="font-size:18px;">Distinguish X-ALD from other leukodystrophies using characteristic MRI findings</div>
      </div>
    </div>
    <div class="card card-amber" style="display:flex; gap:18px; align-items:flex-start; padding:20px 24px;">
      <div class="number-circle" style="background:${COLORS.amber};">4</div>
      <div>
        <div class="card-title" style="font-size:20px;">Treatment Eligibility</div>
        <div class="card-body" style="font-size:18px;">Apply criteria for HSCT and gene therapy — early, presymptomatic treatment is critical</div>
      </div>
    </div>
    <div class="card card-red" style="display:flex; gap:18px; align-items:flex-start; padding:20px 24px;">
      <div class="number-circle" style="background:${COLORS.red};">5</div>
      <div>
        <div class="card-title" style="font-size:20px;">Ethical Implications</div>
        <div class="card-body" style="font-size:18px;">Consider the ethical complexities of presymptomatic diagnosis and carrier detection in children</div>
      </div>
    </div>
  </div>
`));

// ── Slide 3: What is Newborn Screening? ────────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>What Is Newborn Screening?</h1>
  <div class="section-label">Public Health Framework</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">RUSP Overview</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          The <strong>Recommended Uniform Screening Panel</strong> is a federal advisory list of conditions recommended for state NBS programs. Currently includes 37 core conditions and 26 secondary targets.
        </div>
      </div>

      <div class="card card-amber" style="padding:28px; margin-top:16px;">
        <div class="card-title" style="font-size:22px;">State Variability</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          Each state decides which RUSP conditions to screen. Panels vary significantly &mdash; not all states screen for all recommended conditions. Families who move states may have gaps.
        </div>
      </div>
    </div>

    <div>
      <div class="card card-red" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Screening &#x2260; Diagnosis</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          A positive NBS result is <strong>not a diagnosis</strong>. It identifies infants at increased risk who require confirmatory testing. False positives are expected and must be managed with appropriate follow-up.
        </div>
      </div>

      <div class="card card-green" style="padding:28px; margin-top:16px;">
        <div class="card-title" style="font-size:22px;">Compulsory Screening</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          NBS is mandated in all 50 states. Parents may opt out in some states for religious/philosophical reasons, but the default is universal screening at 24&ndash;48 hours of life.
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 4: NBS Neurologic Conditions ─────────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>NBS Neurologic Conditions</h1>
  <div class="section-label">Conditions on the RUSP with Neurologic Presentations</div>

  <table style="margin-top:12px;">
    <thead>
      <tr>
        <th style="width:22%;">Condition</th>
        <th style="width:16%;">Year Added</th>
        <th style="width:62%;">Neurologic Presentation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Pompe Disease</td>
        <td style="font-weight:600; color:${mc.dark};">2015</td>
        <td style="font-size:17px;">Hypotonia, motor delay, respiratory failure (infantile form)</td>
      </tr>
      <tr>
        <td>X-ALD</td>
        <td style="font-weight:600; color:${mc.dark};">2016</td>
        <td style="font-size:17px;">Cerebral demyelination, myeloneuropathy, adrenal insufficiency</td>
      </tr>
      <tr>
        <td>MPS I</td>
        <td style="font-weight:600; color:${mc.dark};">2016</td>
        <td style="font-size:17px;">Cognitive decline, hydrocephalus, spinal cord compression</td>
      </tr>
      <tr>
        <td>SMA</td>
        <td style="font-weight:600; color:${mc.dark};">2018</td>
        <td style="font-size:17px;">Progressive motor neuron loss, hypotonia, respiratory failure</td>
      </tr>
      <tr>
        <td>GAMT Deficiency</td>
        <td style="font-weight:600; color:${mc.dark};">2024</td>
        <td style="font-size:17px;">Intellectual disability, seizures, movement disorder</td>
      </tr>
      <tr>
        <td>Krabbe Disease</td>
        <td style="font-weight:600; color:${mc.dark};">Varies*</td>
        <td style="font-size:17px;">Irritability, spasticity, rapid neurodegeneration (infantile form)</td>
      </tr>
      <tr>
        <td>DMD</td>
        <td style="font-weight:600; color:${mc.dark};">Varies*</td>
        <td style="font-size:17px;">Progressive muscular dystrophy, loss of ambulation, cardiomyopathy</td>
      </tr>
    </tbody>
  </table>

  <div style="font-size:16px; color:${COLORS.muted}; margin-top:12px; font-style:italic;">
    * Krabbe and DMD are screened in some states but not yet on the federal RUSP core panel.
    MPS II screening is emerging in select states.
  </div>
`));

// ── Slide 5: Case Presentation ─────────────────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Case Presentation</h1>
  <div class="section-label">Clinical Vignette</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Patient</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          <strong>Age:</strong> Newborn female (day of life 4)<br>
          <strong>Presentation:</strong> Well-appearing infant<br>
          <strong>NBS Result:</strong> Positive screen for X-ALD
        </div>
      </div>

      <div class="card card-red" style="padding:28px; margin-top:16px;">
        <div class="card-title" style="font-size:22px;">Screening Analyte</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          <strong>Elevated:</strong> C26:0-LPC (lysophosphatidylcholine)<br>
          <strong>Method:</strong> LC-MS/MS on dried blood spot<br>
          <strong>Implication:</strong> Elevated VLCFA suggesting peroxisomal disorder
        </div>
      </div>
    </div>

    <div>
      <div class="card card-amber" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Key Questions</div>
        <div class="card-body">
          <ul style="list-style:none; padding:0;">
            <li style="font-size:19px; padding:8px 0;">&#x2022; Is this truly X-ALD or another peroxisomal disorder?</li>
            <li style="font-size:19px; padding:8px 0;">&#x2022; What confirmatory testing is needed?</li>
            <li style="font-size:19px; padding:8px 0;">&#x2022; How does sex affect prognosis and management?</li>
            <li style="font-size:19px; padding:8px 0;">&#x2022; Who else in the family needs testing?</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 6: X-ALD Biochemistry ────────────────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>X-ALD Biochemistry</h1>
  <div class="section-label">Peroxisomal VLCFA Metabolism</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Core Defect</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          <strong>ABCD1</strong> gene (Xq28) encodes a peroxisomal membrane transporter (ALDP). This ABC transporter imports <strong>very long-chain fatty acids</strong> (VLCFA; &ge;C22) into the peroxisome for beta-oxidation.
        </div>
      </div>

      <div class="card card-violet" style="padding:28px; margin-top:16px;">
        <div class="card-title" style="font-size:22px;">Inheritance</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          <strong>X-linked.</strong> Hemizygous males are fully affected. Heterozygous females are carriers but may develop myeloneuropathy (60% by adulthood).
        </div>
      </div>
    </div>

    <div>
      <div class="card card-red" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Consequence of ABCD1 Loss</div>
        <div class="card-body">
          <ul style="list-style:none; padding:0;">
            <li style="font-size:19px; padding:8px 0;">&#x2022; VLCFA cannot enter peroxisomes</li>
            <li style="font-size:19px; padding:8px 0;">&#x2022; VLCFA accumulate in plasma, adrenal cortex, and CNS white matter</li>
            <li style="font-size:19px; padding:8px 0;">&#x2022; Triggers inflammatory demyelination in cerebral form</li>
            <li style="font-size:19px; padding:8px 0;">&#x2022; Causes axonal degeneration in myeloneuropathy</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 7: DDx for Elevated VLCFA ───────────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>DDx for Elevated VLCFA</h1>
  <div class="section-label">Not All Elevated VLCFA Is X-ALD</div>

  <div style="display:flex; flex-direction:column; gap:16px; margin-top:16px;">
    <div class="card card-accent" style="display:flex; gap:18px; align-items:flex-start; padding:24px 28px;">
      <div class="number-circle" style="background:${mc.accent};">1</div>
      <div>
        <div class="card-title" style="font-size:21px;">X-ALD (ABCD1)</div>
        <div class="card-body" style="font-size:18px;">Single-gene peroxisomal transporter defect. Most common cause of elevated C26:0-LPC on NBS. Confirmable by ABCD1 sequencing.</div>
      </div>
    </div>

    <div class="card card-amber" style="display:flex; gap:18px; align-items:flex-start; padding:24px 28px;">
      <div class="number-circle" style="background:${COLORS.amber};">2</div>
      <div>
        <div class="card-title" style="font-size:21px;">Zellweger Spectrum Disorders (PEX Genes)</div>
        <div class="card-body" style="font-size:18px;">Peroxisome biogenesis defects &mdash; PEX1, PEX6, PEX12, and others. Broader phenotype: craniofacial dysmorphism, liver disease, seizures. AR inheritance.</div>
      </div>
    </div>

    <div class="card card-red" style="display:flex; gap:18px; align-items:flex-start; padding:24px 28px;">
      <div class="number-circle" style="background:${COLORS.red};">3</div>
      <div>
        <div class="card-title" style="font-size:21px;">Aicardi-Gouti&egrave;res Syndrome</div>
        <div class="card-body" style="font-size:18px;">Type I interferonopathy. Can show elevated VLCFA. White matter disease from neuroinflammation, not peroxisomal dysfunction. Distinct gene set (TREX1, RNASEH2, ADAR, etc.).</div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:20px;">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:20px;">If ABCD1 sequencing is negative, pursue a peroxisomal gene panel or genome-wide testing to evaluate for Zellweger spectrum and other peroxisomal disorders.</div>
  </div>
`));

// ── Slide 8: Confirmatory Testing ──────────────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Confirmatory Testing</h1>
  <div class="section-label">After a Positive NBS</div>

  <div style="display:flex; align-items:center; gap:16px; margin-top:24px; margin-bottom:32px;">
    <div class="flow-box" style="background:${mc.accent}; font-size:20px; padding:14px 28px;">NBS Positive<br><span style="font-size:16px; font-weight:400;">Elevated C26:0-LPC</span></div>
    <div class="flow-connector">&#x2192;</div>
    <div class="flow-box" style="background:${COLORS.amber}; font-size:20px; padding:14px 28px;">Plasma VLCFA<br><span style="font-size:16px; font-weight:400;">C26:0, C24/C22 ratio</span></div>
    <div class="flow-connector">&#x2192;</div>
    <div class="flow-box" style="background:${COLORS.violet}; font-size:20px; padding:14px 28px;">ABCD1 Sequencing<br><span style="font-size:16px; font-weight:400;">+ del/dup analysis</span></div>
    <div class="flow-connector">&#x2192;</div>
    <div class="flow-box" style="background:${COLORS.green}; font-size:20px; padding:14px 28px;">Diagnosis<br><span style="font-size:16px; font-weight:400;">or further workup</span></div>
  </div>

  <div class="two-col">
    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">If ABCD1 Positive</div>
      <div class="card-body" style="font-size:19px; line-height:1.7;">
        Diagnosis of X-ALD confirmed. Proceed to sex-based management pathway: endocrinology, neurology referral, MRI surveillance, and cascade family testing.
      </div>
    </div>

    <div class="card card-red" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">If ABCD1 Negative</div>
      <div class="card-body" style="font-size:19px; line-height:1.7;">
        Elevated VLCFA without ABCD1 variant &mdash; consider <strong>peroxisomal gene panel</strong> (PEX genes for Zellweger spectrum) or broader genomic testing. Clinical correlation is essential.
      </div>
    </div>
  </div>
`));

// ── Slide 9: Sex-Based Management ──────────────────────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Sex-Based Management</h1>
  <div class="section-label">Girls vs. Boys After X-ALD Diagnosis</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <h3 style="color:${mc.dark}; margin-bottom:14px;">Girls (Heterozygous Carriers)</h3>
      <div class="card card-violet" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">Genetic Counseling</div>
        <div class="card-body" style="font-size:19px;">Discuss carrier status, reproductive implications, and future risk for personal symptoms.</div>
      </div>
      <div class="card card-amber" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Myeloneuropathy Risk</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          <strong>~60% of female carriers</strong> develop myeloneuropathy by adulthood. Symptoms include gait spasticity, bladder dysfunction, and sensory neuropathy. Onset typically in the 3rd&ndash;5th decade.
        </div>
      </div>
    </div>

    <div>
      <h3 style="color:${mc.dark}; margin-bottom:14px;">Boys (Hemizygous)</h3>
      <div class="card card-red" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">Immediate Referrals</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          <strong>Endocrinology:</strong> Adrenal function testing (cortisol, ACTH)<br>
          <strong>Neurology:</strong> Baseline neurological exam and MRI surveillance
        </div>
      </div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">MRI Surveillance</div>
        <div class="card-body" style="font-size:19px;">Serial brain MRI every 6 months starting at age 1, monitoring for earliest signs of cerebral demyelination (enhancement on gadolinium).</div>
      </div>
    </div>
  </div>
`));

// ── Slide 10: Cascade Testing ──────────────────────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Cascade Testing</h1>
  <div class="section-label">X-Linked Inheritance & Family Implications</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">X-Linked Inheritance</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          Affected males inherit the ABCD1 variant from their carrier mother. All daughters of an affected male are obligate carriers. No male-to-male transmission.
        </div>
      </div>

      <div class="card card-amber" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">De Novo Rate</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          <strong>5&ndash;10% of cases</strong> arise de novo. A negative family history does not exclude X-ALD. Always test the mother to determine carrier status and inform recurrence risk.
        </div>
      </div>
    </div>

    <div>
      <div class="card card-red" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">Test Maternal Relatives</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          If the mother is a carrier, her sisters, mother, and other maternal relatives are at risk. Extended family testing can identify presymptomatic males and at-risk carriers.
        </div>
      </div>

      <div class="card card-violet" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Female &ldquo;Carriers&rdquo; Are Not Unaffected</div>
        <div class="card-body" style="font-size:19px;">60% develop myeloneuropathy. They are better described as <strong>pre-symptomatic</strong> rather than unaffected carriers. This distinction has clinical and ethical importance.</div>
      </div>
    </div>
  </div>
`));

// ── Slide 11: X-ALD Phenotypes Across the Lifespan ────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>X-ALD Phenotypes Across the Lifespan</h1>
  <div class="section-label">Three Major Phenotypic Presentations</div>

  <div style="display:flex; flex-direction:column; gap:16px; margin-top:16px;">
    <div class="card card-amber" style="display:flex; gap:24px; align-items:flex-start; padding:28px;">
      <div style="flex-shrink:0; width:130px; text-align:center;">
        <div style="font-size:14px; font-weight:700; color:${COLORS.amber}; text-transform:uppercase; letter-spacing:1.5px;">Phenotype 1</div>
        <div style="font-size:28px; font-weight:800; color:#92400e; margin-top:4px;">50&ndash;86%</div>
        <div style="font-size:15px; color:${COLORS.muted};">of males</div>
      </div>
      <div style="flex:1;">
        <div class="card-title" style="font-size:22px;">Adrenal Insufficiency</div>
        <div class="card-body" style="font-size:19px;">Primary adrenocortical insufficiency. Can present at any age, sometimes as the first or only manifestation. Requires lifelong steroid replacement. May precede neurologic symptoms by years.</div>
      </div>
    </div>

    <div class="card card-red" style="display:flex; gap:24px; align-items:flex-start; padding:28px;">
      <div style="flex-shrink:0; width:130px; text-align:center;">
        <div style="font-size:14px; font-weight:700; color:${COLORS.red}; text-transform:uppercase; letter-spacing:1.5px;">Phenotype 2</div>
        <div style="font-size:28px; font-weight:800; color:${COLORS.red}; margin-top:4px;">35&ndash;40%</div>
        <div style="font-size:15px; color:${COLORS.muted};">of males</div>
      </div>
      <div style="flex:1;">
        <div class="card-title" style="font-size:22px;">Childhood Cerebral ALD</div>
        <div class="card-body" style="font-size:19px;">Rapidly progressive inflammatory demyelination with peak onset ages 4&ndash;8 years. Behavioral changes, vision loss, hearing loss, motor decline. Without treatment, fatal within 2&ndash;5 years of onset.</div>
      </div>
    </div>

    <div class="card card-accent" style="display:flex; gap:24px; align-items:flex-start; padding:28px;">
      <div style="flex-shrink:0; width:130px; text-align:center;">
        <div style="font-size:14px; font-weight:700; color:${mc.accent}; text-transform:uppercase; letter-spacing:1.5px;">Phenotype 3</div>
        <div style="font-size:28px; font-weight:800; color:${mc.dark}; margin-top:4px;">~100%</div>
        <div style="font-size:15px; color:${COLORS.muted};">males eventually</div>
      </div>
      <div style="flex:1;">
        <div class="card-title" style="font-size:22px;">Myeloneuropathy (AMN)</div>
        <div class="card-body" style="font-size:19px;">Nearly all males develop progressive spastic paraparesis and sensory neuropathy, typically by the 3rd&ndash;4th decade. 60% of female carriers also develop myeloneuropathy.</div>
      </div>
    </div>
  </div>
`));

// ── Slide 12: Leukodystrophy MRI Comparison ────────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>Leukodystrophy MRI Comparison</h1>
  <div class="section-label">Distinguishing White Matter Patterns</div>

  <table style="margin-top:16px;">
    <thead>
      <tr>
        <th style="width:20%;">Condition</th>
        <th style="width:30%;">MRI Pattern</th>
        <th style="width:25%;">Key Feature</th>
        <th style="width:25%;">Distinguishing Clue</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:${COLORS.amberLight};">
        <td style="font-weight:800; color:${mc.dark};">X-ALD</td>
        <td style="font-size:17px;">Posterior periventricular white matter</td>
        <td style="font-size:17px;">Leading edge of gadolinium enhancement</td>
        <td style="font-size:17px;">Parieto-occipital predominance; active inflammation at demyelination front</td>
      </tr>
      <tr>
        <td>Alexander Disease</td>
        <td style="font-size:17px;">Frontal white matter predominance</td>
        <td style="font-size:17px;">Macrocephaly</td>
        <td style="font-size:17px;">Anterior-to-posterior gradient; GFAP gene (de novo dominant)</td>
      </tr>
      <tr>
        <td>Canavan Disease</td>
        <td style="font-size:17px;">Diffuse white matter involvement</td>
        <td style="font-size:17px;">Elevated NAA on MRS</td>
        <td style="font-size:17px;">Subcortical U-fibers involved early; ASPA gene (AR)</td>
      </tr>
      <tr>
        <td>VWM Disease</td>
        <td style="font-size:17px;">Diffuse white matter signal loss</td>
        <td style="font-size:17px;">WM signal follows CSF on FLAIR</td>
        <td style="font-size:17px;">White matter rarefaction/cystic change; EIF2B genes (AR)</td>
      </tr>
    </tbody>
  </table>

  <div class="card card-accent" style="margin-top:20px; padding:20px 28px;">
    <div class="card-title" style="font-size:20px;">Clinical Pearl</div>
    <div class="card-body" style="font-size:18px;">X-ALD is the only common leukodystrophy with an <strong>enhancing edge</strong> at the border of active demyelination &mdash; this reflects the inflammatory nature and is a key diagnostic and prognostic feature.</div>
  </div>
`));

// ── Slide 13: Treatment Eligibility ────────────────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Treatment Eligibility</h1>
  <div class="section-label">HSCT & Gene Therapy for Cerebral ALD</div>

  <div class="three-col" style="margin-top:20px;">
    <div class="stat-card" style="border-color:${COLORS.green}; background:${COLORS.greenLight}; text-align:center; padding:28px 20px;">
      <div class="stat-label">Neurologic Function Score</div>
      <div class="stat-value" style="font-size:44px; margin-top:12px; color:${COLORS.green};">NFS &le;1</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:8px;">Minimal neurologic deficits</div>
    </div>
    <div class="stat-card" style="border-color:${COLORS.amber}; background:${COLORS.amberLight}; text-align:center; padding:28px 20px;">
      <div class="stat-label">Loes MRI Score</div>
      <div class="stat-value" style="font-size:44px; margin-top:12px; color:${COLORS.amber};">&lt;9</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:8px;">Limited white matter involvement</div>
    </div>
    <div class="stat-card" style="border-color:${COLORS.red}; background:${COLORS.redLight}; text-align:center; padding:28px 20px;">
      <div class="stat-label">Treatment Window</div>
      <div class="stat-value" style="font-size:36px; margin-top:12px; color:${COLORS.red};">Narrow</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:8px;">Must be presymptomatic</div>
    </div>
  </div>

  <div class="two-col" style="margin-top:28px;">
    <div class="card card-green" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">HSCT (Allogeneic)</div>
      <div class="card-body" style="font-size:19px; line-height:1.6;">
        Gold standard when a matched donor is available. Halts cerebral demyelination if performed early. Requires myeloablative conditioning. Significant transplant-related morbidity.
      </div>
    </div>

    <div class="card card-violet" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Gene Therapy (Elivaldogene)</div>
      <div class="card-body" style="font-size:19px; line-height:1.6;">
        Ex vivo lentiviral gene therapy &mdash; autologous HSCs transduced with functional ABCD1. FDA-approved (Skysona). Eliminates donor search time. Same eligibility criteria apply.
      </div>
    </div>
  </div>
`));

// ── Slide 14: Surveillance Guidelines ──────────────────────────────────────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>Surveillance Guidelines</h1>
  <div class="section-label">Lifelong Monitoring for X-ALD</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <h3 style="color:${mc.dark}; margin-bottom:14px;">Males</h3>
      <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">Brain MRI</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          <strong>Ages 1&ndash;12:</strong> Every 6 months<br>
          <strong>Ages 12+:</strong> Annually<br>
          Monitor for earliest gadolinium enhancement indicating cerebral conversion.
        </div>
      </div>
      <div class="card card-amber" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Adrenal Function</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          <strong>Annual:</strong> Morning cortisol and ACTH<br>
          Adrenal insufficiency can present before neurologic symptoms. Steroid replacement is lifesaving.
        </div>
      </div>
    </div>

    <div>
      <h3 style="color:${mc.dark}; margin-bottom:14px;">Females</h3>
      <div class="card card-violet" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">Annual Neurological Exam</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          Beginning in adolescence, annual neurological examination for signs of myeloneuropathy: spasticity, hyperreflexia, sensory changes, bladder symptoms.
        </div>
      </div>
      <div class="card card-red" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Key Reminder</div>
        <div class="card-body" style="font-size:19px; line-height:1.7;">
          Female carriers are <strong>not unaffected</strong>. Myeloneuropathy develops in ~60% and can significantly impact quality of life. Proactive surveillance enables early symptomatic treatment.
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 15: Key Takeaways ────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 15, TOTAL, [
  {
    title: "NBS is screening, not diagnosis",
    body: "A positive newborn screen requires confirmatory testing — VLCFA levels and ABCD1 sequencing. False positives occur and must be managed appropriately.",
  },
  {
    title: "X-ALD has 3 phenotypes spanning the lifespan",
    body: "Adrenal insufficiency, childhood cerebral ALD, and myeloneuropathy. The same ABCD1 variant can produce different phenotypes, even within families.",
  },
  {
    title: "Cascade testing is mandatory for X-linked conditions",
    body: "Identifying carrier mothers and at-risk maternal relatives enables presymptomatic diagnosis and timely intervention for other family members.",
  },
  {
    title: "The treatment window is narrow — must be presymptomatic",
    body: "HSCT and gene therapy only work when NFS is ≤1 and Loes score is <9. Once symptoms appear, cerebral disease is largely irreversible.",
  },
  {
    title: "Female carriers are NOT unaffected",
    body: "60% develop myeloneuropathy. The term 'carrier' is misleading — these women are pre-symptomatic patients who need lifelong neurological surveillance.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
