/**
 * scripts/gen-genetic-counseling.mjs
 *
 * Generates 8 clean, readable slides for the Genetic Counseling & Ethics module.
 * Uses puppeteer HTML rendering via the shared design system.
 *
 * Run: node scripts/gen-genetic-counseling.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "genetic-counseling";
const mc = MODULE_COLORS[MOD];
const TOTAL = 8;

const slides = [];

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Genetic Counseling &<br>Ethics in Neurogenetics",
  subtitle: "Navigating predictive testing, pediatric considerations, and ethical frameworks",
  totalSlides: TOTAL,
  topics: [
    "Counseling process",
    "Predictive testing",
    "Pediatric testing",
    "Reproductive options",
    "Ethical frameworks",
  ],
}));

// ── Slide 2: The Genetic Counseling Process ────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>The Genetic Counseling Process</h1>
  <div class="section-label">Section 1 of 5</div>

  <div class="two-col" style="margin-bottom:24px;">
    <div class="card card-accent">
      <div class="card-title">Pre-Test Phase</div>
      <div class="card-body">
        <ul style="list-style:none; padding:0; margin:0;">
          <li style="font-size:19px; padding:4px 0;">&#8226; Pedigree construction &amp; family history</li>
          <li style="font-size:19px; padding:4px 0;">&#8226; Risk assessment &amp; recurrence estimation</li>
          <li style="font-size:19px; padding:4px 0;">&#8226; Test selection (panel vs exome vs genome)</li>
          <li style="font-size:19px; padding:4px 0;">&#8226; Informed consent &amp; expectations</li>
        </ul>
      </div>
    </div>
    <div class="card card-green">
      <div class="card-title">Post-Test Phase</div>
      <div class="card-body">
        <ul style="list-style:none; padding:0; margin:0;">
          <li style="font-size:19px; padding:4px 0;">&#8226; Results disclosure &amp; interpretation</li>
          <li style="font-size:19px; padding:4px 0;">&#8226; Psychosocial support &amp; coping</li>
          <li style="font-size:19px; padding:4px 0;">&#8226; Re-analysis planning (periodic review)</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="card card-violet">
    <div class="card-title" style="font-size:22px;">Core Principle: Non-Directiveness</div>
    <div class="card-body" style="font-size:20px;">
      Facilitate informed decision-making without imposing personal values.
      The counselor provides accurate information, explores options, and supports
      the patient&rsquo;s autonomous choice.
    </div>
  </div>
`));

// ── Slide 3: Predictive & Presymptomatic Testing ──────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Predictive &amp; Presymptomatic Testing</h1>
  <div class="section-label">Section 2 of 5</div>

  <div class="card card-accent" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">Huntington Disease Paradigm</div>
    <div class="card-body" style="font-size:19px;">
      The international predictive testing protocol for HD sets the standard:
      minimum two counseling sessions, neurological exam, psychological assessment,
      informed consent, and post-result follow-up. Results are never disclosed by phone.
    </div>
  </div>

  <div class="card card-red" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">Right Not to Know</div>
    <div class="card-body" style="font-size:19px;">
      Patient autonomy includes the right to <strong>decline</strong> predictive testing.
      At-risk individuals must never be pressured. This right extends to family members
      who may be indirectly revealed by a relative&rsquo;s test result.
    </div>
  </div>

  <div class="card card-amber">
    <div class="card-title" style="font-size:22px;">GINA &mdash; Genetic Information Nondiscrimination Act</div>
    <div class="card-body" style="font-size:19px;">
      <strong>Protects:</strong> employment and health insurance decisions based on genetic information.<br>
      <strong style="color:${COLORS.red};">Does NOT protect:</strong> life insurance, disability insurance, or long-term care insurance.
      Patients must understand these gaps before proceeding with predictive testing.
    </div>
  </div>
`));

// ── Slide 4: Pediatric Genetic Testing Guidelines ─────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Pediatric Genetic Testing Guidelines</h1>
  <div class="section-label">Section 3 of 5</div>

  <div class="two-col" style="margin-bottom:28px;">
    <div class="card card-green" style="height:100%;">
      <div class="card-title" style="font-size:22px; color:#166534;">&#10003; TEST When</div>
      <div class="card-body">
        <ul style="list-style:none; padding:0; margin:0;">
          <li style="font-size:19px; padding:6px 0;">&#8226; Results lead to childhood intervention</li>
          <li style="font-size:19px; padding:6px 0;">&#8226; Surveillance can begin in childhood</li>
          <li style="font-size:19px; padding:6px 0;">&#8226; Management changes with a diagnosis</li>
        </ul>
      </div>
    </div>
    <div class="card card-red" style="height:100%;">
      <div class="card-title" style="font-size:22px; color:${COLORS.red};">&#10007; DEFER When</div>
      <div class="card-body">
        <ul style="list-style:none; padding:0; margin:0;">
          <li style="font-size:19px; padding:6px 0;">&#8226; Adult-onset condition with no childhood actionability</li>
          <li style="font-size:19px; padding:6px 0;">&#8226; Predictive testing for untreatable conditions</li>
          <li style="font-size:19px; padding:6px 0;">&#8226; Preserve the child&rsquo;s future autonomy</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Guiding Principle</div>
    <div class="value" style="font-size:22px;">Childhood actionability determines testing &mdash; not parental curiosity</div>
    <p style="font-size:19px; margin-top:12px; color:${COLORS.body};">
      <strong>Test:</strong> TSC &mdash; mTOR inhibitor therapy available in childhood &nbsp;|&nbsp;
      <strong>Defer:</strong> Huntington &mdash; no childhood treatment or surveillance benefit
    </p>
  </div>
`));

// ── Slide 5: Reproductive Options ─────────────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Reproductive Options</h1>
  <div class="section-label">Section 4 of 5</div>

  <table>
    <thead>
      <tr>
        <th>Option</th>
        <th>Timing</th>
        <th>Method</th>
        <th>Key Considerations</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Carrier Screening</td>
        <td>Pre-conception</td>
        <td>Blood/saliva panel</td>
        <td>Identifies carriers of AR conditions before pregnancy</td>
      </tr>
      <tr>
        <td>CVS</td>
        <td>10&ndash;13 weeks</td>
        <td>Placental tissue biopsy</td>
        <td>~1% miscarriage risk; confined placental mosaicism possible</td>
      </tr>
      <tr>
        <td>Amniocentesis</td>
        <td>15&ndash;20 weeks</td>
        <td>Amniotic fluid sampling</td>
        <td>~0.5% risk; gold standard for fetal karyotype</td>
      </tr>
      <tr>
        <td>PGT-M</td>
        <td>Pre-implantation</td>
        <td>IVF + embryo biopsy</td>
        <td>Tests embryos for known familial variant; requires IVF</td>
      </tr>
      <tr>
        <td>NIPS</td>
        <td>From 10 weeks</td>
        <td>Cell-free DNA (maternal blood)</td>
        <td>Screening, not diagnostic; high sensitivity for trisomies</td>
      </tr>
    </tbody>
  </table>

  <div class="card card-accent" style="margin-top:8px;">
    <div class="card-title">Clinical Pearl</div>
    <div class="card-body">NIPS is a <strong>screening</strong> test &mdash; all positive results require diagnostic confirmation
      via CVS or amniocentesis before clinical action.</div>
  </div>
`));

// ── Slide 6: Ethical Frameworks ───────────────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Ethical Frameworks</h1>
  <div class="section-label">Section 5 of 5</div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:21px;">Duty to Recontact</div>
        <div class="card-body" style="font-size:18px;">
          Evolving evidence may reclassify variants (e.g., VUS &rarr; pathogenic).
          Laboratories and clinicians share responsibility for communicating
          updated interpretations.
        </div>
      </div>
      <div class="card card-violet" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:21px;">Data Sharing</div>
        <div class="card-body" style="font-size:18px;">
          Balance patient privacy with advancing knowledge. Platforms like
          ClinVar and Matchmaker Exchange improve variant classification
          and rare disease diagnosis.
        </div>
      </div>
    </div>
    <div>
      <div class="card card-amber" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:21px;">DTC Testing Limitations</div>
        <div class="card-body" style="font-size:18px;">
          Clinical-grade &ne; DTC. Direct-to-consumer tests have incomplete
          gene/variant coverage and lack professional counseling.
          Results require clinical confirmation.
        </div>
      </div>
      <div class="card card-red" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:21px;">Equity &amp; Access</div>
        <div class="card-body" style="font-size:18px;">
          Access disparities across socioeconomic and racial/ethnic groups.
          Reference databases underrepresent non-European populations,
          increasing VUS rates and diagnostic inequality.
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 7: Quick Reference — VUS Counseling ─────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Quick Reference &mdash; VUS Counseling</h1>
  <div class="section-label">Practical Guidance</div>

  <div class="card card-accent" style="margin-bottom:24px;">
    <div class="card-title" style="font-size:21px;">Sample Language</div>
    <div class="card-body" style="font-size:19px;">
      &ldquo;We found a change in a gene that we <strong>don&rsquo;t yet have enough information about</strong>.
      It may or may not be related to your condition. We will monitor the evidence and
      re-evaluate over time.&rdquo;
    </div>
  </div>

  <h3 style="margin-bottom:14px;">5 Recommendations for VUS Management</h3>

  <div class="numbered-item">
    <div class="number-circle" style="background:${mc.accent};">1</div>
    <div style="font-size:20px;"><strong>Do not treat a VUS as diagnostic</strong> &mdash; clinical decisions should not rest on uncertain findings</div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.green};">2</div>
    <div style="font-size:20px;"><strong>Plan for re-analysis</strong> &mdash; schedule periodic review (every 1&ndash;2 years) as evidence evolves</div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.violet};">3</div>
    <div style="font-size:20px;"><strong>Document in the EHR</strong> &mdash; ensure the VUS and its uncertain status are clearly recorded</div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.amber};">4</div>
    <div style="font-size:20px;"><strong>Avoid insurance discrimination language</strong> &mdash; frame results carefully in documentation</div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.red};">5</div>
    <div style="font-size:20px;"><strong>Connect with support resources</strong> &mdash; patient advocacy groups and genetic counseling follow-up</div>
  </div>
`));

// ── Slide 8: Key Takeaways ────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 8, TOTAL, [
  {
    title: "Counseling is a process, not a single conversation",
    body: "Pre-test and post-test phases are equally important for informed decision-making.",
  },
  {
    title: "Predictive testing requires careful protocol",
    body: "The Huntington disease paradigm sets the standard — multiple sessions, psychological assessment, and follow-up.",
  },
  {
    title: "Pediatric testing: guided by childhood actionability",
    body: "Test when results change childhood management; defer when the condition is adult-onset and untreatable.",
  },
  {
    title: "GINA has gaps",
    body: "Life, disability, and long-term care insurance are NOT protected. Patients must understand this before testing.",
  },
  {
    title: "VUS requires careful, non-alarmist counseling",
    body: "Don't treat as diagnostic. Plan for re-analysis. Document clearly and connect patients with support.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
