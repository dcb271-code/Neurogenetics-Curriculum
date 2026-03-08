/**
 * scripts/gen-neuromuscular.mjs
 *
 * Generates 15 clean, readable slides for the Neuromuscular Disorders module.
 * Covers genetic differential for weakness, testing strategy, variant interpretation,
 * gain-of-function vs loss-of-function, and dosage sensitivity.
 *
 * Run: node scripts/gen-neuromuscular.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "neuromuscular";
const mc = MODULE_COLORS[MOD];
const TOTAL = 15;

const slides = [];

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Neuromuscular Genetics",
  subtitle: "From foot drop to molecular diagnosis",
  totalSlides: TOTAL,
  topics: [
    "Genetic differential for leg weakness",
    "Diagnostic testing strategy",
    "Gain-of-function vs loss-of-function",
    "Dosage sensitivity &amp; gene therapy",
    "PMP22 &amp; HNPP clinical features",
  ],
}));

// ── Slide 2: Learning Objectives ───────────────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Learning Objectives</h1>
  <div class="section-label">What You Will Master</div>

  <div style="display:flex; flex-direction:column; gap:20px; margin-top:16px;">
    <div class="numbered-item">
      <div class="number-circle" style="background:${mc.accent};">1</div>
      <div>
        <strong style="font-size:22px; color:${COLORS.heading};">Genetic Differential Diagnosis</strong><br>
        <span style="font-size:20px;">Construct a genetic differential for a child presenting with leg weakness</span>
      </div>
    </div>
    <div class="numbered-item">
      <div class="number-circle" style="background:${COLORS.green};">2</div>
      <div>
        <strong style="font-size:22px; color:${COLORS.heading};">Testing Strategy</strong><br>
        <span style="font-size:20px;">Select the appropriate genetic test based on clinical presentation and cost-effectiveness</span>
      </div>
    </div>
    <div class="numbered-item">
      <div class="number-circle" style="background:${COLORS.violet};">3</div>
      <div>
        <strong style="font-size:22px; color:${COLORS.heading};">Variant Interpretation</strong><br>
        <span style="font-size:20px;">Distinguish gain-of-function from loss-of-function and understand how mechanism determines phenotype</span>
      </div>
    </div>
  </div>
`));

// ── Slide 3: DDx for Foot Drop ─────────────────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>DDx for Foot Drop</h1>
  <div class="section-label">Genetic &amp; Acquired Causes</div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title">Hereditary Neuropathies</div>
        <div class="card-body">
          <strong>PMP22</strong> &mdash; CMT1A / HNPP<br>
          <strong>MPZ</strong> &mdash; CMT1B<br>
          <strong>GJB1</strong> &mdash; CMTX1<br>
          <strong>MFN2</strong> &mdash; CMT2A<br>
          <strong>GDAP1</strong> &mdash; CMT4A
        </div>
      </div>
      <div class="card card-violet">
        <div class="card-title">Myopathies</div>
        <div class="card-body">
          Dystrophic (DMD, FSHD)<br>
          Non-dystrophic myotonias
        </div>
      </div>
    </div>

    <div>
      <div class="card card-amber" style="margin-bottom:16px;">
        <div class="card-title">Acquired &mdash; Trauma / Toxin</div>
        <div class="card-body">
          Peroneal nerve compression<br>
          Lead, vincristine, isoniazid
        </div>
      </div>
      <div class="card card-red">
        <div class="card-title">Inflammatory</div>
        <div class="card-body">
          Guillain-Barr&eacute; syndrome<br>
          CIDP, vasculitic neuropathy
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 4: Case Presentation ─────────────────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Case Presentation</h1>
  <div class="section-label">Clinical Scenario</div>

  <div class="card card-accent" style="margin-bottom:24px; padding:28px 32px;">
    <div class="card-title" style="font-size:24px;">12-Year-Old Baseball Player</div>
    <div class="card-body" style="font-size:20px; line-height:1.7;">
      Bilateral foot drop noticed during baseball season.<br>
      Prior intermittent arm weakness reported by coach.
    </div>
  </div>

  <h3 style="margin-bottom:16px;">Family History</h3>
  <div style="display:flex; gap:24px;">
    <div class="card card-violet" style="flex:1;">
      <div class="card-title">Mother</div>
      <div class="card-body">Intermittent paresthesias in hands; never formally evaluated</div>
    </div>
    <div class="card card-amber" style="flex:1;">
      <div class="card-title">Brother</div>
      <div class="card-body">Suspected &ldquo;muscle disease&rdquo; &mdash; details unclear, no genetic testing</div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:24px;">
    <div class="label">Key Question</div>
    <div class="value" style="font-size:22px;">Is this genetic? What is the inheritance pattern?</div>
  </div>
`));

// ── Slide 5: Diagnostic Workup ─────────────────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Diagnostic Workup</h1>
  <div class="section-label">Stepwise Evaluation</div>

  <div style="display:flex; align-items:center; gap:16px; margin-bottom:32px;">
    <div style="background:${mc.light}; border:2px solid ${mc.accent}; border-radius:12px; padding:20px 28px; text-align:center; flex:1;">
      <div style="font-size:18px; font-weight:700; color:${mc.dark};">CK Level</div>
      <div style="font-size:28px; font-weight:800; color:${COLORS.heading}; margin-top:6px;">Normal</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">Rules out active myopathy</div>
    </div>
    <div style="font-size:36px; color:${COLORS.muted};">&rarr;</div>
    <div style="background:${COLORS.violetLight}; border:2px solid ${COLORS.violet}; border-radius:12px; padding:20px 28px; text-align:center; flex:1;">
      <div style="font-size:18px; font-weight:700; color:${COLORS.violet};">Spine MRI</div>
      <div style="font-size:28px; font-weight:800; color:${COLORS.heading}; margin-top:6px;">Syringohydromyelia</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">Incidental finding</div>
    </div>
    <div style="font-size:36px; color:${COLORS.muted};">&rarr;</div>
    <div style="background:${COLORS.amberLight}; border:2px solid ${COLORS.amber}; border-radius:12px; padding:20px 28px; text-align:center; flex:1;">
      <div style="font-size:18px; font-weight:700; color:#92400e;">EMG / NCS</div>
      <div style="font-size:28px; font-weight:800; color:${COLORS.heading}; margin-top:6px;">Focal Severe Slowing</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">Bilateral, at compression sites</div>
    </div>
  </div>

  <div class="card card-green">
    <div class="card-title">Clinical Interpretation</div>
    <div class="card-body" style="font-size:20px;">EMG/NCS pattern of focal slowing at common compression sites with normal CK strongly suggests a <strong>hereditary neuropathy with liability to pressure palsies (HNPP)</strong></div>
  </div>
`));

// ── Slide 6: Genetic Testing Options ───────────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Genetic Testing Options</h1>
  <div class="section-label">Choosing the Right Test</div>

  <table>
    <thead>
      <tr><th>Test</th><th>Pros</th><th>Cons</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>Single Gene</td>
        <td style="font-size:17px;">Fast, cheap, targeted</td>
        <td style="font-size:17px;">Misses other genes</td>
      </tr>
      <tr>
        <td>Gene Panel</td>
        <td style="font-size:17px;">Covers known NMD genes; good CNV detection</td>
        <td style="font-size:17px;">Limited to panel content</td>
      </tr>
      <tr>
        <td>CMA</td>
        <td style="font-size:17px;">Detects CNVs (PMP22 del/dup)</td>
        <td style="font-size:17px;">Misses sequence variants</td>
      </tr>
      <tr>
        <td>Exome</td>
        <td style="font-size:17px;">Broad gene coverage; reanalysis possible</td>
        <td style="font-size:17px;">May miss CNVs; VUS burden</td>
      </tr>
      <tr>
        <td>Genome</td>
        <td style="font-size:17px;">Most comprehensive; structural variants</td>
        <td style="font-size:17px;">Cost; interpretation complexity</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box">
    <div class="label">For This Case</div>
    <div class="value" style="font-size:22px;">Neuromuscular gene panel or PMP22 deletion/duplication analysis is the first-line test</div>
  </div>
`));

// ── Slide 7: Patient Results ───────────────────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Patient Results</h1>
  <div class="section-label">Two Variants Identified</div>

  <div style="display:flex; gap:28px; margin-top:12px;">
    <div class="card card-red" style="flex:1; padding:28px 32px;">
      <div class="card-title" style="font-size:22px;">PMP22 Deletion</div>
      <div class="card-body" style="font-size:19px; line-height:1.6;">
        <strong>Gene:</strong> PMP22<br>
        <strong>Variant:</strong> Heterozygous deletion (1.5 Mb)<br>
        <strong>Classification:</strong> <span style="color:${COLORS.red}; font-weight:700;">Pathogenic</span><br>
        <strong>Inheritance:</strong> Autosomal dominant
      </div>
    </div>

    <div class="card card-amber" style="flex:1; padding:28px 32px;">
      <div class="card-title" style="font-size:22px;">SCN10A &mdash; p.Arg512Ter</div>
      <div class="card-body" style="font-size:19px; line-height:1.6;">
        <strong>Gene:</strong> SCN10A<br>
        <strong>Variant:</strong> c.1534C&gt;T, p.Arg512Ter (nonsense)<br>
        <strong>Classification:</strong> <span style="color:#92400e; font-weight:700;">VUS</span><br>
        <strong>Inheritance:</strong> Heterozygous
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:28px;">
    <div class="label">Clinical Question</div>
    <div class="value" style="font-size:22px;">How do we interpret these two results together?</div>
  </div>
`));

// ── Slide 8: Interpreting Results with OMIM ────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Interpreting Results with OMIM</h1>
  <div class="section-label">Gene&ndash;Disease Relationships</div>

  <div style="display:flex; gap:28px; margin-top:12px;">
    <div class="card card-accent" style="flex:1; padding:28px 32px;">
      <div class="card-title" style="font-size:22px;">PMP22 Deletion</div>
      <div class="card-body" style="font-size:19px; line-height:1.7;">
        <strong>OMIM:</strong> #162500<br>
        <strong>Disease:</strong> Hereditary Neuropathy with Liability to Pressure Palsies (HNPP)<br>
        <strong>Inheritance:</strong> AD<br>
        <strong>Mechanism:</strong> Loss of one PMP22 copy
      </div>
    </div>

    <div class="card card-violet" style="flex:1; padding:28px 32px;">
      <div class="card-title" style="font-size:22px;">SCN10A &mdash; p.Arg512Ter</div>
      <div class="card-body" style="font-size:19px; line-height:1.7;">
        <strong>OMIM:</strong> #615551<br>
        <strong>Disease:</strong> Familial Episodic Pain Syndrome 2 (FEPS2)<br>
        <strong>Inheritance:</strong> AD<br>
        <strong>Mechanism:</strong> Gain-of-function missense
      </div>
    </div>
  </div>

  <div class="card card-green" style="margin-top:24px;">
    <div class="card-title">Key Insight</div>
    <div class="card-body" style="font-size:20px;">The PMP22 deletion explains the patient&rsquo;s phenotype perfectly. The SCN10A variant requires deeper analysis of its mechanism.</div>
  </div>
`));

// ── Slide 9: Gain-of-Function vs Loss-of-Function ─────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Gain-of-Function vs Loss-of-Function</h1>
  <div class="section-label">Disease Mechanism Matters</div>

  <div style="display:flex; gap:28px; margin-top:12px;">
    <div class="card card-red" style="flex:1; padding:28px 32px;">
      <div class="card-title" style="font-size:22px;">Gain-of-Function (GoF)</div>
      <div class="card-body" style="font-size:19px; line-height:1.65;">
        Protein acquires <strong>increased</strong> or <strong>novel</strong> activity<br><br>
        Example: constitutive ion channel activity &rarr; hyperexcitability<br><br>
        <em style="color:${COLORS.muted};">Typically missense variants in critical domains</em>
      </div>
    </div>

    <div class="card card-accent" style="flex:1; padding:28px 32px;">
      <div class="card-title" style="font-size:22px;">Loss-of-Function (LoF)</div>
      <div class="card-body" style="font-size:19px; line-height:1.65;">
        Protein has <strong>reduced</strong> or <strong>absent</strong> function<br><br>
        Example: truncating variant &rarr; NMD &rarr; haploinsufficiency<br><br>
        <em style="color:${COLORS.muted};">Nonsense, frameshift, splice-site, deletions</em>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:24px;">
    <div class="label">Critical Concept</div>
    <div class="value" style="font-size:22px;">The same gene can cause different diseases depending on whether the mechanism is GoF or LoF</div>
  </div>
`));

// ── Slide 10: One Gene, Multiple Diseases ──────────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>One Gene, Multiple Diseases</h1>
  <div class="section-label">TNNT3 Example</div>

  <div style="display:flex; gap:28px; margin-top:12px;">
    <div class="card card-red" style="flex:1; padding:28px 32px;">
      <div class="card-title" style="font-size:22px;">GoF &mdash; Heterozygous Missense</div>
      <div class="card-body" style="font-size:19px; line-height:1.65;">
        <strong>Disease:</strong> AD Distal Arthrogryposis 2B2<br>
        <strong>Mechanism:</strong> Gain-of-function in troponin T3<br>
        <strong>Phenotype:</strong> Joint contractures, limited movement
      </div>
    </div>

    <div class="card card-accent" style="flex:1; padding:28px 32px;">
      <div class="card-title" style="font-size:22px;">LoF &mdash; Biallelic Truncating</div>
      <div class="card-body" style="font-size:19px; line-height:1.65;">
        <strong>Disease:</strong> AR Severe Congenital Myopathy<br>
        <strong>Mechanism:</strong> Complete loss of troponin T3<br>
        <strong>Phenotype:</strong> Neonatal hypotonia, weakness
      </div>
    </div>
  </div>

  <div style="display:flex; gap:20px; margin-top:28px;">
    <div style="flex:1; background:${COLORS.amberLight}; border:2px solid ${COLORS.amber}; border-radius:12px; padding:20px 28px; text-align:center;">
      <div style="font-size:17px; font-weight:700; color:#92400e;">Same Gene</div>
      <div style="font-size:24px; font-weight:800; color:${COLORS.heading}; margin-top:4px;">TNNT3</div>
    </div>
    <div style="flex:1; background:${COLORS.redLight}; border:2px solid ${COLORS.red}; border-radius:12px; padding:20px 28px; text-align:center;">
      <div style="font-size:17px; font-weight:700; color:${COLORS.red};">Different Mechanism</div>
      <div style="font-size:24px; font-weight:800; color:${COLORS.heading}; margin-top:4px;">GoF vs LoF</div>
    </div>
    <div style="flex:1; background:${mc.light}; border:2px solid ${mc.accent}; border-radius:12px; padding:20px 28px; text-align:center;">
      <div style="font-size:17px; font-weight:700; color:${mc.dark};">Different Disease</div>
      <div style="font-size:24px; font-weight:800; color:${COLORS.heading}; margin-top:4px;">AD vs AR</div>
    </div>
  </div>
`));

// ── Slide 11: SCN10A Interpretation ────────────────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>SCN10A Interpretation</h1>
  <div class="section-label">Why This VUS Remains Unresolved</div>

  <div class="card card-amber" style="margin-bottom:20px; padding:24px 28px;">
    <div class="card-title" style="font-size:22px;">The Variant: SCN10A p.Arg512Ter (nonsense)</div>
    <div class="card-body" style="font-size:19px;">
      Heterozygous stop-gain &rarr; predicted <strong>loss-of-function</strong> via NMD
    </div>
  </div>

  <div class="numbered-item" style="margin-bottom:18px;">
    <div class="number-circle" style="background:${COLORS.red};">1</div>
    <div>
      <strong style="font-size:20px; color:${COLORS.heading};">FEPS2 is caused by GoF missense variants</strong><br>
      <span style="font-size:18px;">Constitutive channel activation &rarr; pain episodes</span>
    </div>
  </div>

  <div class="numbered-item" style="margin-bottom:18px;">
    <div class="number-circle" style="background:${COLORS.amber};">2</div>
    <div>
      <strong style="font-size:20px; color:${COLORS.heading};">This variant is a heterozygous LoF (nonsense)</strong><br>
      <span style="font-size:18px;">Wrong mechanism for the known disease association</span>
    </div>
  </div>

  <div class="numbered-item" style="margin-bottom:18px;">
    <div class="number-circle" style="background:${mc.accent};">3</div>
    <div>
      <strong style="font-size:20px; color:${COLORS.heading};">Phenotype mismatch</strong><br>
      <span style="font-size:18px;">Patient has neuropathy, not episodic pain &mdash; VUS classification is appropriate</span>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Lesson</div>
    <div class="value" style="font-size:22px;">A truncating variant in a GoF gene does not automatically equal pathogenicity</div>
  </div>
`));

// ── Slide 12: PMP22 Dosage Sensitivity ─────────────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>PMP22 Dosage Sensitivity</h1>
  <div class="section-label">The &ldquo;Goldilocks&rdquo; Model</div>

  <div style="display:flex; gap:20px; margin-top:20px; margin-bottom:32px;">
    <div style="flex:1; background:${COLORS.redLight}; border:3px solid ${COLORS.red}; border-radius:16px; padding:28px 24px; text-align:center;">
      <div style="font-size:48px; font-weight:800; color:${COLORS.red};">1 copy</div>
      <div style="font-size:22px; font-weight:700; color:${COLORS.heading}; margin-top:12px;">Deletion</div>
      <div style="font-size:20px; color:${COLORS.body}; margin-top:8px;">HNPP</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">Compression-sensitive neuropathy</div>
    </div>

    <div style="flex:1; background:${COLORS.greenLight}; border:3px solid ${COLORS.green}; border-radius:16px; padding:28px 24px; text-align:center;">
      <div style="font-size:48px; font-weight:800; color:${COLORS.green};">2 copies</div>
      <div style="font-size:22px; font-weight:700; color:${COLORS.heading}; margin-top:12px;">Normal</div>
      <div style="font-size:20px; color:${COLORS.body}; margin-top:8px;">Healthy</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">Proper myelin maintenance</div>
    </div>

    <div style="flex:1; background:${COLORS.amberLight}; border:3px solid ${COLORS.amber}; border-radius:16px; padding:28px 24px; text-align:center;">
      <div style="font-size:48px; font-weight:800; color:${COLORS.amber};">3 copies</div>
      <div style="font-size:22px; font-weight:700; color:${COLORS.heading}; margin-top:12px;">Duplication</div>
      <div style="font-size:20px; color:${COLORS.body}; margin-top:8px;">CMT1A</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">Demyelinating polyneuropathy</div>
    </div>
  </div>

  <div class="card card-accent">
    <div class="card-title">Clinical Pearl</div>
    <div class="card-body" style="font-size:20px;">PMP22 is the most dosage-sensitive gene in clinical neurogenetics &mdash; both too little and too much protein cause disease</div>
  </div>
`));

// ── Slide 13: Why Dosage Sensitivity Matters ───────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Why Dosage Sensitivity Matters</h1>
  <div class="section-label">Implications for Gene Therapy</div>

  <div class="two-col" style="margin-top:12px;">
    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title">Therapeutic Approaches</div>
        <div class="card-body" style="font-size:19px; line-height:1.6;">
          <strong>AAV gene replacement</strong> &mdash; add back missing gene<br>
          <strong>ASO (antisense oligonucleotide)</strong> &mdash; reduce excess mRNA<br>
          <strong>siRNA</strong> &mdash; silence overexpressed allele
        </div>
      </div>
      <div class="card card-green">
        <div class="card-title">Narrow Therapeutic Windows</div>
        <div class="card-body" style="font-size:19px;">Dosage-sensitive genes require precise expression levels &mdash; undershoot or overshoot causes disease</div>
      </div>
    </div>

    <div>
      <div class="card card-red" style="margin-bottom:16px;">
        <div class="card-title">MECP2 Overexpression</div>
        <div class="card-body" style="font-size:19px;">AAV gene therapy for Rett syndrome &mdash; overexpression causes toxicity and death in animal models</div>
      </div>
      <div class="card card-amber">
        <div class="card-title">SMN Overexpression</div>
        <div class="card-body" style="font-size:19px;">Too much SMN protein can be toxic &mdash; careful dose titration is essential for SMA gene therapy</div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Take-Home</div>
    <div class="value" style="font-size:22px;">Gene therapy must restore physiologic levels &mdash; more is not always better</div>
  </div>
`));

// ── Slide 14: HNPP Clinical Features ───────────────────────────────────────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>HNPP Clinical Features</h1>
  <div class="section-label">Hereditary Neuropathy with Liability to Pressure Palsies</div>

  <div style="display:flex; gap:28px; margin-top:12px;">
    <div style="flex:1;">
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title">Classic Presentation</div>
        <div class="card-body" style="font-size:19px; line-height:1.6;">
          Recurrent, painless mononeuropathies<br>
          Triggered by compression or stretch<br>
          Common sites: peroneal, ulnar, median nerves
        </div>
      </div>
      <div class="card card-green">
        <div class="card-title">Prognosis</div>
        <div class="card-body" style="font-size:19px; line-height:1.6;">
          Episodes typically recover fully or nearly so<br>
          Some patients develop mild CMT1A-like polyneuropathy over time
        </div>
      </div>
    </div>

    <div style="flex:1;">
      <div class="card card-violet" style="margin-bottom:16px;">
        <div class="card-title">Key Distinguishing Features</div>
        <div class="card-body" style="font-size:19px; line-height:1.6;">
          Usually <strong>painless</strong> (unlike entrapment)<br>
          Complete or near-complete recovery<br>
          Family history of similar episodes
        </div>
      </div>
      <div class="card card-amber">
        <div class="card-title">Management</div>
        <div class="card-body" style="font-size:19px; line-height:1.6;">
          Avoidance of prolonged compression<br>
          Padding at pressure points<br>
          Genetic counseling for family
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 15: Key Takeaways ────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 15, TOTAL, [
  {
    title: "Build a genetic differential for weakness",
    body: "Hereditary neuropathies, myopathies, and acquired causes must all be considered systematically.",
  },
  {
    title: "EMG/NCS guides genetic testing",
    body: "Focal slowing at compression sites points to HNPP; demyelinating pattern suggests CMT1A.",
  },
  {
    title: "GoF vs LoF determines phenotype",
    body: "The same gene can cause entirely different diseases depending on the molecular mechanism.",
  },
  {
    title: "PMP22 is exquisitely dosage-sensitive",
    body: "Deletion = HNPP, duplication = CMT1A. Gene therapy must hit the narrow normal window.",
  },
  {
    title: "Mechanism mismatch = VUS persists",
    body: "A truncating variant in a GoF gene does not fit the disease mechanism and cannot be called pathogenic.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides("neuromuscular", slides);
