/**
 * scripts/gen-genetic-counseling.mjs
 *
 * Generates 10 slides for the Genetic Counseling & Ethics module (5 sections × 2).
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
const TOTAL = 10;

const slides = [];

// ── Section 0: The Genetic Counseling Process ───────────────────────────────

// Slide 1: Title
slides.push(titleSlideHTML(MOD, {
  title: "Genetic Counseling &<br>Ethics in Neurogenetics",
  subtitle: "Navigating predictive testing, pediatric considerations, and ethical frameworks",
  totalSlides: TOTAL,
  topics: [
    "The genetic counseling process",
    "Predictive & presymptomatic testing",
    "Pediatric genetic testing",
    "Reproductive options & family planning",
    "Ethical frameworks & emerging challenges",
  ],
}));

// Slide 2: Counseling Process
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>The Genetic Counseling Process</h1>
  <div class="section-label">Section 1 of 5</div>

  <div class="two-col" style="margin-bottom:24px;">
    <div class="card card-accent">
      <div class="card-title">Pre-Test Phase</div>
      <div class="card-body">
        <ul style="list-style:none; padding:0; margin:0;">
          <li style="font-size:19px; padding:4px 0;">&#8226; Three-generation pedigree construction</li>
          <li style="font-size:19px; padding:4px 0;">&#8226; Risk assessment &amp; recurrence estimation</li>
          <li style="font-size:19px; padding:4px 0;">&#8226; Test selection (panel vs exome vs genome)</li>
          <li style="font-size:19px; padding:4px 0;">&#8226; Informed consent: purpose, result types, limitations</li>
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
          <li style="font-size:19px; padding:4px 0;">&#8226; Residual risk discussion for negative results</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="card card-violet">
    <div class="card-title" style="font-size:22px;">Core Principle: Non-Directiveness</div>
    <div class="card-body" style="font-size:20px;">
      Counselors provide balanced information and support autonomous decision-making without imposing personal values or steering choices.
    </div>
  </div>
`));

// ── Section 1: Predictive and Presymptomatic Testing ────────────────────────

// Slide 3: HD Paradigm & Right Not to Know
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Predictive &amp; Presymptomatic Testing</h1>
  <div class="section-label">Section 2 of 5</div>

  <div class="card card-accent" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">Huntington Disease Paradigm</div>
    <div class="card-body" style="font-size:19px;">
      The international HD predictive testing protocol requires: minimum two counseling sessions with cooling-off period, psychological assessment for depression/suicidality, an identified support person, and explicit discussion of impact on family, employment, and insurance.
    </div>
  </div>

  <div class="card card-red" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">Right Not to Know</div>
    <div class="card-body" style="font-size:19px;">
      At-risk individuals are never obligated to undergo predictive testing. Testing a grandchild can <strong>inadvertently reveal</strong> an intervening parent&rsquo;s status &mdash; requiring careful counseling and sometimes exclusion testing.
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Psychological Impact</div>
    <div class="value" style="font-size:22px;">~10% of individuals undergoing HD predictive testing experience clinically significant adverse reactions</div>
    <p style="font-size:17px; margin-top:8px; color:${COLORS.body};">Both positive and negative results can cause distress, including survivor guilt and identity disruption.</p>
  </div>
`));

// Slide 4: GINA & Insurance
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>GINA &amp; Insurance Implications</h1>
  <div class="section-label">Section 2 of 5 &mdash; Legal Protections</div>

  <div class="two-col" style="margin-bottom:24px;">
    <div class="card card-green" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">GINA Protects</div>
      <div class="card-body" style="font-size:19px;">
        <strong>Health insurance:</strong> Cannot use genetic information in coverage or premium decisions<br><br>
        <strong>Employment:</strong> Cannot use genetic information in hiring, firing, or promotion decisions
      </div>
    </div>
    <div class="card card-red" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">GINA Does NOT Protect</div>
      <div class="card-body" style="font-size:19px;">
        <strong style="color:${COLORS.red};">Life insurance</strong><br><br>
        <strong style="color:${COLORS.red};">Disability insurance</strong><br><br>
        <strong style="color:${COLORS.red};">Long-term care insurance</strong><br><br>
        A positive predictive test result can legally be used to deny these coverages.
      </div>
    </div>
  </div>

  <div class="card card-amber">
    <div class="card-title">Practical Advice</div>
    <div class="card-body">Patients must understand these gaps <strong>before</strong> proceeding with predictive testing. Some individuals choose to secure life and disability insurance policies before undergoing testing.</div>
  </div>
`));

// ── Section 2: Pediatric Genetic Testing Considerations ─────────────────────

// Slide 5: When to Test / When to Defer
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Pediatric Genetic Testing</h1>
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
      <strong>Test:</strong> TSC &mdash; mTOR inhibitor therapy available &nbsp;|&nbsp;
      SMA &mdash; presymptomatic treatment dramatically improves outcomes &nbsp;|&nbsp;
      <strong>Defer:</strong> HD &mdash; no childhood treatment
    </p>
  </div>
`));

// Slide 6: Newborn Screening & Genome-Wide NBS
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Newborn Screening &amp; Genomic NBS</h1>
  <div class="section-label">Section 3 of 5 &mdash; Expanding Scope</div>

  <div class="card card-accent" style="margin-bottom:20px;">
    <div class="card-title">SMA on RUSP</div>
    <div class="card-body">SMA was added to the US Recommended Uniform Screening Panel in 2018. All 50 states now screen for SMA in newborns. Presymptomatic gene therapy (onasemnogene abeparvovec) dramatically improves outcomes.</div>
  </div>

  <div class="two-col" style="margin-bottom:20px;">
    <div class="card card-green">
      <div class="card-title">Genome-Wide NBS: Benefits</div>
      <div class="card-body">Pilot programs (BabySeq, Guardian, UK Newborn Genomes Programme) can detect hundreds of treatable conditions simultaneously from a single test.</div>
    </div>
    <div class="card card-red">
      <div class="card-title">Genome-Wide NBS: Concerns</div>
      <div class="card-body">
        <p style="font-size:17px; margin-bottom:4px;">&#8226; Large numbers of VUS requiring follow-up</p>
        <p style="font-size:17px; margin-bottom:4px;">&#8226; Identification of adult-onset conditions (violating future autonomy)</p>
        <p style="font-size:17px; margin-bottom:4px;">&#8226; Parental anxiety from uncertain results</p>
        <p style="font-size:17px;">&#8226; &ldquo;Patient-in-waiting&rdquo; phenomenon</p>
      </div>
    </div>
  </div>
`));

// ── Section 3: Reproductive Options and Family Planning ─────────────────────

// Slide 7: Reproductive Options
slides.push(slideHTML(MOD, 7, TOTAL, `
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
        <td>ACOG recommends pan-ethnic panels (100&ndash;400+ genes)</td>
      </tr>
      <tr>
        <td>CVS</td>
        <td>10&ndash;13 weeks</td>
        <td>Placental tissue biopsy</td>
        <td>~0.1&ndash;0.3% miscarriage risk</td>
      </tr>
      <tr>
        <td>Amniocentesis</td>
        <td>15&ndash;20 weeks</td>
        <td>Amniotic fluid sampling</td>
        <td>Gold standard for fetal karyotype</td>
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
    <div class="card-body">NIPS is a <strong>screening</strong> test &mdash; all positive results require diagnostic confirmation via CVS or amniocentesis before clinical action. For rare microdeletion syndromes, NIPS has a high false positive rate.</div>
  </div>
`));

// Slide 8: Reproductive Autonomy
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Reproductive Autonomy &amp; Ethics</h1>
  <div class="section-label">Section 4 of 5 &mdash; Ethical Principles</div>

  <div class="two-col" style="margin-bottom:24px;">
    <div class="card card-violet" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Reproductive Autonomy</div>
      <div class="card-body" style="font-size:19px;">
        The right to make one&rsquo;s own reproductive decisions free of coercion is a cornerstone ethical principle. Counselors present balanced information without steering choices toward or against specific options.
      </div>
    </div>
    <div class="card card-amber" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Disability Rights Perspectives</div>
      <div class="card-body" style="font-size:19px;">
        Challenge the assumption that preventing the birth of a child with a genetic condition is inherently desirable. Emphasize the value and dignity of disabled lives and the social model of disability.
      </div>
    </div>
  </div>

  <div class="card card-green">
    <div class="card-title">Additional Options</div>
    <div class="card-body">Donor gametes, embryo donation, and adoption are additional paths. Each carries its own emotional, ethical, legal, and financial considerations that should be explored in counseling.</div>
  </div>
`));

// ── Section 4: Ethical Frameworks and Emerging Challenges ────────────────────

// Slide 9: Ethical Frameworks
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Ethical Frameworks &amp; Emerging Challenges</h1>
  <div class="section-label">Section 5 of 5</div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:21px;">Duty to Recontact</div>
        <div class="card-body" style="font-size:18px;">
          Variant reclassification (VUS &rarr; pathogenic) may change management. Best practice supports systematic re-analysis workflows, though no universal mandate exists.
        </div>
      </div>
      <div class="card card-violet" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:21px;">Data Sharing (ClinVar, DECIPHER)</div>
        <div class="card-body" style="font-size:18px;">
          Sharing de-identified data improves variant classification and benefits future patients. Patient consent should address data sharing.
        </div>
      </div>
    </div>
    <div>
      <div class="card card-amber" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:21px;">DTC Testing Limitations</div>
        <div class="card-body" style="font-size:18px;">
          23andMe screens only selected variants. A negative BRCA DTC result does NOT rule out pathogenic variants. Results require clinical-grade confirmation.
        </div>
      </div>
      <div class="card card-red" style="margin-bottom:16px;">
        <div class="card-title" style="font-size:21px;">Equity &amp; Access</div>
        <div class="card-body" style="font-size:18px;">
          ~6,000 certified genetic counselors in the US, far below need. Minority populations underrepresented in genomic databases &rarr; higher VUS rates and diagnostic inequity.
        </div>
      </div>
    </div>
  </div>
`));

// Slide 10: Key Takeaways
slides.push(takeawaysSlideHTML(MOD, 10, TOTAL, [
  {
    title: "Counseling is a process, not a single conversation",
    body: "Pre-test and post-test phases are equally important for informed decision-making.",
  },
  {
    title: "Predictive testing requires careful protocol",
    body: "The HD paradigm sets the standard — multiple sessions, psychological assessment, and follow-up.",
  },
  {
    title: "Pediatric testing: guided by childhood actionability",
    body: "Test when results change childhood management; defer when the condition is adult-onset and untreatable.",
  },
  {
    title: "GINA has gaps — life/disability insurance not covered",
    body: "Patients must understand these limitations before testing. Consider securing policies before predictive results.",
  },
  {
    title: "Emerging challenges require ongoing ethical attention",
    body: "DTC testing limitations, genomic NBS, database equity, and germline editing all demand thoughtful policy.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
