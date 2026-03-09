/**
 * scripts/gen-neuromuscular.mjs
 *
 * Generates 15 clean, readable slides for the Neuromuscular Disorders module.
 * Aligned with JSON section structure:
 *   S0 (slides 1-3): Classification and Clinical Approach to Neuromuscular Disease
 *   S1 (slides 4-6): Duchenne and Becker Muscular Dystrophy
 *   S2 (slides 7-9): Spinal Muscular Atrophy
 *   S3 (slides 10-12): Congenital Myopathies and Muscular Dystrophies
 *   S4 (slides 13-15): Hereditary Neuropathies and Channelopathies
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

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 0: Classification and Clinical Approach (slides 1-3)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Genetic Neuromuscular Disorders",
  subtitle: "From clinical pattern to molecular diagnosis and targeted therapy",
  totalSlides: TOTAL,
  topics: [
    "Classification &amp; clinical approach",
    "Duchenne &amp; Becker muscular dystrophy",
    "Spinal muscular atrophy (SMA)",
    "Congenital myopathies &amp; dystrophies",
    "Hereditary neuropathies &amp; channelopathies",
  ],
}));

// ── Slide 2: Anatomical Classification ──────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Anatomical Classification</h1>
  <div class="section-label">Localization Guides the Genetic Differential</div>

  <table style="margin-top:12px;">
    <thead>
      <tr>
        <th style="width:20%;">Level</th>
        <th style="width:25%;">Pattern</th>
        <th style="width:20%;">CK Level</th>
        <th style="width:35%;">Examples</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Anterior Horn Cell</td>
        <td style="font-size:24px;">Proximal &gt; distal; no sensory loss</td>
        <td style="font-size:24px;">Normal</td>
        <td style="font-size:24px;">SMA (SMN1)</td>
      </tr>
      <tr>
        <td>Peripheral Nerve</td>
        <td style="font-size:24px;">Distal &gt; proximal; sensory loss</td>
        <td style="font-size:24px;">Normal</td>
        <td style="font-size:24px;">CMT (PMP22, GJB1, MFN2)</td>
      </tr>
      <tr>
        <td>NMJ</td>
        <td style="font-size:24px;">Fatigable weakness; ptosis, diplopia</td>
        <td style="font-size:24px;">Normal</td>
        <td style="font-size:24px;">Congenital myasthenic syndromes</td>
      </tr>
      <tr>
        <td>Muscle</td>
        <td style="font-size:24px;">Proximal &gt; distal; no sensory loss</td>
        <td style="font-size:24px;"><strong>&gt;10&times; ULN</strong></td>
        <td style="font-size:24px;">DMD, LGMD, congenital myopathies</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:20px;">
    <div class="label">Key Principle</div>
    <div class="value" style="font-size:28px;">CK massively elevated (&gt;10&times;) in muscular dystrophies; mildly elevated in congenital myopathies; normal in neuropathies and anterior horn cell disease</div>
  </div>
`));

// ── Slide 3: EMG/NCS & Muscle Biopsy ───────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>EMG/NCS &amp; Muscle Biopsy</h1>
  <div class="section-label">Essential Diagnostic Studies</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">EMG / Nerve Conduction</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          &bull; <strong>Demyelinating NCS:</strong> uniform MCV slowing &lt;38 m/s &rarr; CMT1A<br>
          &bull; <strong>Axonal NCS:</strong> reduced amplitudes, normal velocity &rarr; CMT2<br>
          &bull; <strong>Decremental response:</strong> repetitive stimulation &rarr; NMJ disorder<br>
          &bull; <strong>Myopathic EMG:</strong> small, polyphasic MUPs &rarr; myopathy
        </div>
      </div>
    </div>

    <div>
      <div class="card card-violet" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">Muscle Biopsy</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          &bull; <strong>Nemaline rods</strong> (Gomori trichrome) &rarr; NEB, ACTA1<br>
          &bull; <strong>Central cores</strong> (oxidative stain) &rarr; RYR1<br>
          &bull; <strong>Dystrophic changes</strong> &rarr; DMD/BMD, LGMD<br>
          &bull; <strong>Immunohistochemistry:</strong> dystrophin, sarcoglycans, caveolin guides genetic testing
        </div>
      </div>
    </div>
  </div>

  <div class="card card-green" style="padding:20px 28px;">
    <div class="card-title" style="font-size:28px;">Clinical Approach</div>
    <div class="card-body" style="font-size:25px;">Localize first (EMG/NCS), then target genetic testing. Biopsy is essential for congenital myopathies but often bypassed in DMD/SMA when genetic testing is diagnostic.</div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1: Duchenne and Becker Muscular Dystrophy (slides 4-6)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 4: DMD/BMD Genetics & Reading Frame Rule ──────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>DMD &amp; BMD: The Reading-Frame Rule</h1>
  <div class="section-label">Dystrophin &mdash; Largest Gene in the Human Genome</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-red" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">Duchenne (DMD)</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          <strong>Out-of-frame</strong> deletions/nonsense variants<br>
          No functional dystrophin produced<br>
          Onset age 3&ndash;5, Gowers sign, calf pseudohypertrophy<br>
          Loss of ambulation ~12 years<br>
          Cardiomyopathy universal by age 18
        </div>
      </div>
    </div>

    <div>
      <div class="card card-amber" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">Becker (BMD)</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          <strong>In-frame</strong> deletions<br>
          Truncated but partially functional dystrophin<br>
          Later onset, slower progression<br>
          May walk into adulthood<br>
          Cardiomyopathy can be primary feature
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:8px;">
    <div class="label">Reading-Frame Rule</div>
    <div class="value" style="font-size:28px;">Frameshift &rarr; no dystrophin &rarr; DMD; In-frame &rarr; truncated dystrophin &rarr; BMD. Predicts phenotype with ~90% accuracy.</div>
  </div>
`));

// ── Slide 5: DMD Diagnostic Testing ─────────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>DMD: Molecular Diagnosis</h1>
  <div class="section-label">Testing Strategy &amp; Variant Types</div>

  <div style="display:flex; align-items:center; gap:14px; margin-top:20px; margin-bottom:28px;">
    <div class="flow-box" style="background:${COLORS.red}; font-size:25px; padding:14px 24px;">CK &gt;10,000<br><span style="font-size:21px; font-weight:400;">Massively elevated</span></div>
    <div class="flow-connector">&#x2192;</div>
    <div class="flow-box" style="background:${mc.accent}; font-size:25px; padding:14px 24px;">MLPA / aCGH<br><span style="font-size:21px; font-weight:400;">65&ndash;70% deletions</span></div>
    <div class="flow-connector">&#x2192;</div>
    <div class="flow-box" style="background:${COLORS.amber}; font-size:25px; padding:14px 24px;">Sequencing<br><span style="font-size:21px; font-weight:400;">~25% point variants</span></div>
    <div class="flow-connector">&#x2192;</div>
    <div class="flow-box" style="background:${COLORS.green}; font-size:25px; padding:14px 24px;">Confirmed<br><span style="font-size:21px; font-weight:400;">Reading-frame analysis</span></div>
  </div>

  <div class="two-col">
    <div class="card card-accent" style="padding:24px;">
      <div class="card-title" style="font-size:28px;">Exon-Skipping Targets</div>
      <div class="card-body" style="font-size:25px; line-height:1.6;">
        &bull; Exon 51: eteplirsen (FDA 2016)<br>
        &bull; Exon 53: golodirsen, viltolarsen<br>
        &bull; Exon 45: casimersen (FDA 2021)<br>
        <em style="color:${COLORS.muted};">Converts out-of-frame to in-frame</em>
      </div>
    </div>

    <div class="card card-green" style="padding:24px;">
      <div class="card-title" style="font-size:28px;">Other Approved Therapies</div>
      <div class="card-body" style="font-size:25px; line-height:1.6;">
        &bull; <strong>Ataluren:</strong> stop codon readthrough (nonsense variants; EU)<br>
        &bull; <strong>Elevidys:</strong> AAV gene therapy (delandistrogene; FDA 2023, ages 4&ndash;5)
      </div>
    </div>
  </div>
`));

// ── Slide 6: DMD Carrier Females ────────────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>DMD Carrier Females</h1>
  <div class="section-label">X-Linked Recessive &mdash; Carriers Are Not Always Unaffected</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-red" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">Cardiac Risk</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          <strong>~10% of carrier females</strong> develop cardiomyopathy<br>
          Annual cardiac screening (ECG + echo) is recommended for all identified carriers
        </div>
      </div>
      <div class="card card-amber" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Manifesting Carriers</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          Significant weakness possible due to <strong>skewed X-inactivation</strong><br>
          CK often elevated even in asymptomatic carriers
        </div>
      </div>
    </div>

    <div>
      <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">Inheritance Pattern</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          &bull; X-linked recessive (Xp21.2)<br>
          &bull; Carrier mothers: 50% risk to each son<br>
          &bull; All daughters of affected males are obligate carriers<br>
          &bull; ~30% arise de novo
        </div>
      </div>
      <div class="card card-violet" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Dystrophin Complex</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          Dystrophin links actin cytoskeleton to extracellular matrix via DAPC. Loss causes membrane fragility, calcium influx, and progressive muscle necrosis.
        </div>
      </div>
    </div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 2: Spinal Muscular Atrophy (slides 7-9)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 7: SMA Genetics ──────────────────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Spinal Muscular Atrophy: Genetics</h1>
  <div class="section-label">SMN1 Deletion &amp; SMN2 Copy Number</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">SMN1 Gene (5q13)</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          &bull; ~95% have <strong>homozygous SMN1 exon 7 deletion</strong><br>
          &bull; ~5% are compound heterozygous (deletion + point variant)<br>
          &bull; Detected by MLPA or quantitative PCR<br>
          &bull; SMN protein essential for snRNP biogenesis
        </div>
      </div>
    </div>

    <div>
      <div class="card card-green" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">SMN2: The Modifier</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          Nearly identical paralog producing only <strong>~10&ndash;15% full-length SMN</strong> due to exon 7 skipping.<br><br>
          <strong>Copy number determines severity:</strong><br>
          &bull; 1&ndash;2 copies &rarr; Type 1<br>
          &bull; 3 copies &rarr; Type 2/3<br>
          &bull; 4+ copies &rarr; Type 3/4
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 8: SMA Clinical Types ─────────────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>SMA Clinical Types</h1>
  <div class="section-label">Classification by Onset and Motor Milestones</div>

  <table style="margin-top:16px;">
    <thead>
      <tr>
        <th style="width:12%;">Type</th>
        <th style="width:18%;">Onset</th>
        <th style="width:25%;">Motor Milestone</th>
        <th style="width:18%;">SMN2 Copies</th>
        <th style="width:27%;">Natural History</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Type 0</td>
        <td style="font-size:24px;">Prenatal</td>
        <td style="font-size:24px;">Severe congenital hypotonia</td>
        <td style="font-size:24px;">1</td>
        <td style="font-size:24px;">Death &lt;6 months</td>
      </tr>
      <tr>
        <td>Type 1</td>
        <td style="font-size:24px;">&lt;6 months</td>
        <td style="font-size:24px;">Never sits</td>
        <td style="font-size:24px;">1&ndash;2</td>
        <td style="font-size:24px;">Death &lt;2 years without treatment</td>
      </tr>
      <tr>
        <td>Type 2</td>
        <td style="font-size:24px;">6&ndash;18 months</td>
        <td style="font-size:24px;">Sits but never stands</td>
        <td style="font-size:24px;">3</td>
        <td style="font-size:24px;">Wheelchair-dependent</td>
      </tr>
      <tr>
        <td>Type 3</td>
        <td style="font-size:24px;">&gt;18 months</td>
        <td style="font-size:24px;">Achieves walking</td>
        <td style="font-size:24px;">3&ndash;4</td>
        <td style="font-size:24px;">Variable, may lose ambulation</td>
      </tr>
      <tr>
        <td>Type 4</td>
        <td style="font-size:24px;">Adult</td>
        <td style="font-size:24px;">Normal early milestones</td>
        <td style="font-size:24px;">4+</td>
        <td style="font-size:24px;">Mild, ambulatory</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Key Concept</div>
    <div class="value" style="font-size:28px;">Presymptomatic treatment (via NBS detection) before motor neuron loss yields dramatically better outcomes than post-symptomatic treatment</div>
  </div>
`));

// ── Slide 9: SMA Therapies ──────────────────────────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>SMA: Disease-Modifying Therapies</h1>
  <div class="section-label">Three Approved Treatment Approaches</div>

  <div style="display:flex; flex-direction:column; gap:14px; margin-top:12px;">
    <div class="card card-accent" style="display:flex; gap:18px; align-items:flex-start; padding:20px 24px;">
      <div class="number-circle" style="background:${mc.accent};">1</div>
      <div>
        <div class="card-title" style="font-size:28px;">Nusinersen (Spinraza) &mdash; ASO</div>
        <div class="card-body" style="font-size:24px;">Antisense oligonucleotide administered <strong>intrathecally</strong>. Modifies SMN2 splicing to include exon 7, increasing full-length SMN. Approved 2016. First SMA disease-modifying therapy.</div>
      </div>
    </div>
    <div class="card card-green" style="display:flex; gap:18px; align-items:flex-start; padding:20px 24px;">
      <div class="number-circle" style="background:${COLORS.green};">2</div>
      <div>
        <div class="card-title" style="font-size:28px;">Risdiplam (Evrysdi) &mdash; Small Molecule</div>
        <div class="card-body" style="font-size:24px;"><strong>Oral</strong> SMN2 splicing modifier promoting exon 7 inclusion. Approved FDA 2020 for patients &ge;2 months. Advantage: oral administration with CNS + peripheral tissue distribution.</div>
      </div>
    </div>
    <div class="card card-red" style="display:flex; gap:18px; align-items:flex-start; padding:20px 24px;">
      <div class="number-circle" style="background:${COLORS.red};">3</div>
      <div>
        <div class="card-title" style="font-size:28px;">Onasemnogene Abeparvovec (Zolgensma) &mdash; Gene Therapy</div>
        <div class="card-body" style="font-size:24px;">AAV9-SMN1 gene replacement. <strong>Single IV infusion</strong>. Approved 2019 for children &lt;2 years. Most effective when given presymptomatically via newborn screening.</div>
      </div>
    </div>
  </div>

  <div class="card card-amber" style="padding:16px 24px; margin-top:12px;">
    <div class="card-body" style="font-size:24px;"><strong>Common mechanism:</strong> Both nusinersen and risdiplam modify SMN2 splicing to increase full-length SMN &mdash; different delivery routes (IT vs oral). Zolgensma replaces the missing SMN1 gene entirely.</div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 3: Congenital Myopathies and Muscular Dystrophies (slides 10-12)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 10: Congenital Myopathies ────────────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Congenital Myopathies</h1>
  <div class="section-label">Defined by Structural Biopsy Findings</div>

  <div style="display:flex; flex-direction:column; gap:14px; margin-top:12px;">
    <div class="card card-accent" style="display:flex; gap:18px; align-items:flex-start; padding:20px 24px;">
      <div class="number-circle" style="background:${mc.accent};">1</div>
      <div>
        <div class="card-title" style="font-size:28px;">Nemaline Myopathy (NEB, ACTA1, TPM2/3)</div>
        <div class="card-body" style="font-size:24px;">Nemaline rods on Gomori trichrome biopsy. NEB-related forms often severe. Respiratory and feeding difficulties predominate. ACTA1 variants more variable.</div>
      </div>
    </div>
    <div class="card card-green" style="display:flex; gap:18px; align-items:flex-start; padding:20px 24px;">
      <div class="number-circle" style="background:${COLORS.green};">2</div>
      <div>
        <div class="card-title" style="font-size:28px;">Central Core Disease (RYR1)</div>
        <div class="card-body" style="font-size:24px;">Central cores on oxidative staining. AD or AR inheritance. Associated with <strong>malignant hyperthermia susceptibility</strong>. Myopathy is relatively static.</div>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:28px;">Congenital myopathies present at birth with hypotonia and weakness. CK is mildly elevated (unlike muscular dystrophies). Biopsy is essential for classification.</div>
  </div>
`));

// ── Slide 11: FSHD & Emery-Dreifuss ───────────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>FSHD &amp; Emery-Dreifuss MD</h1>
  <div class="section-label">Two Key Muscular Dystrophies Beyond DMD</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">FSHD (Facioscapulohumeral MD)</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          <strong>Pattern:</strong> Facial, scapular, and distal leg weakness<br>
          <strong>FSHD1:</strong> D4Z4 repeat contraction on 4q35<br>
          <strong>FSHD2:</strong> SMCHD1 methylation defect<br>
          <strong>Mechanism:</strong> Aberrant DUX4 expression<br>
          <strong>Inheritance:</strong> AD, reduced penetrance
        </div>
      </div>
    </div>

    <div>
      <div class="card card-red" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Emery-Dreifuss MD (LMNA, EMD)</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          <strong>Triad:</strong><br>
          &bull; Early joint contractures (elbows, ankles, spine)<br>
          &bull; Humeroperoneal weakness<br>
          &bull; <span style="color:${COLORS.red}; font-weight:700;">Cardiac conduction disease &rarr; sudden death</span><br><br>
          LMNA can cause dilated cardiomyopathy with minimal muscle disease. Annual cardiac screening / ICD essential.
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 12: Limb-Girdle Muscular Dystrophies ─────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>Limb-Girdle Muscular Dystrophies</h1>
  <div class="section-label">ENMC 2018 Classification &mdash; &gt;30 Subtypes</div>

  <table style="margin-top:12px;">
    <thead>
      <tr>
        <th style="width:20%;">Subtype</th>
        <th style="width:22%;">Gene</th>
        <th style="width:18%;">Inheritance</th>
        <th style="width:40%;">Key Features</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>LGMD-R1</td>
        <td style="font-size:24px;">CAPN3 (calpain-3)</td>
        <td style="font-size:24px;">AR</td>
        <td style="font-size:24px;">Most common AR LGMD; posterior compartment</td>
      </tr>
      <tr>
        <td>LGMD-R2</td>
        <td style="font-size:24px;">DYSF (dysferlin)</td>
        <td style="font-size:24px;">AR</td>
        <td style="font-size:24px;">Very elevated CK; distal or proximal onset</td>
      </tr>
      <tr>
        <td>LGMD-R3&ndash;6</td>
        <td style="font-size:24px;">SGCA/B/G/D</td>
        <td style="font-size:24px;">AR</td>
        <td style="font-size:24px;">Sarcoglycanopathies; DMD-like but AR</td>
      </tr>
      <tr>
        <td>LGMD-R9</td>
        <td style="font-size:24px;">ANO5 (anoctamin-5)</td>
        <td style="font-size:24px;">AR</td>
        <td style="font-size:24px;">Common in Northern Europeans; elevated CK</td>
      </tr>
    </tbody>
  </table>

  <div class="card card-accent" style="margin-top:20px; padding:20px 28px;">
    <div class="card-title" style="font-size:28px;">Diagnostic Strategy</div>
    <div class="card-body" style="font-size:25px;">Immunohistochemistry on muscle biopsy (dystrophin, sarcoglycans, caveolin) guides targeted genetic testing. Neuromuscular gene panels are increasingly used as first-line.</div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 4: Hereditary Neuropathies and Channelopathies (slides 13-15)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 13: CMT Classification ────────────────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Charcot-Marie-Tooth Disease</h1>
  <div class="section-label">Most Common Hereditary Neuromuscular Disorder (~1/2,500)</div>

  <table style="margin-top:12px;">
    <thead>
      <tr>
        <th style="width:14%;">Type</th>
        <th style="width:18%;">Gene</th>
        <th style="width:16%;">Inheritance</th>
        <th style="width:16%;">NCV Pattern</th>
        <th style="width:36%;">Key Features</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>CMT1A</td>
        <td style="font-size:24px;">PMP22 duplication</td>
        <td style="font-size:24px;">AD</td>
        <td style="font-size:24px;">Demyelinating<br>MCV &lt;38 m/s</td>
        <td style="font-size:24px;">Most common (~40%); high arches, hammertoes, distal weakness</td>
      </tr>
      <tr>
        <td>CMT1X</td>
        <td style="font-size:24px;">GJB1 (connexin-32)</td>
        <td style="font-size:24px;">X-linked</td>
        <td style="font-size:24px;">Intermediate</td>
        <td style="font-size:24px;">Males more severe; CNS white matter changes in some</td>
      </tr>
      <tr>
        <td>CMT2A</td>
        <td style="font-size:24px;">MFN2 (mitofusin 2)</td>
        <td style="font-size:24px;">AD</td>
        <td style="font-size:24px;">Axonal</td>
        <td style="font-size:24px;">Severe disability; mitochondrial dynamics defect</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:20px;">
    <div class="label">PMP22 Dosage Sensitivity</div>
    <div class="value" style="font-size:28px;">1 copy (deletion) = HNPP; 2 copies = normal; 3 copies (duplication) = CMT1A &mdash; the &ldquo;Goldilocks&rdquo; gene</div>
  </div>
`));

// ── Slide 14: Myotonic Dystrophy & Channelopathies ─────────────────────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>Myotonic Dystrophy &amp; Channelopathies</h1>
  <div class="section-label">Ion Channel &amp; Repeat Expansion Disorders</div>

  <div class="two-col" style="margin-top:16px;">
    <div>
      <div class="card card-red" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Myotonic Dystrophy Type 1 (DM1)</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          <strong>Gene:</strong> DMPK (CTG repeat expansion)<br>
          <strong>Most common adult MD</strong><br>
          <strong>Multisystem:</strong> myotonia, facial/distal weakness, cataracts, cardiac conduction, endocrine, cognitive<br>
          <strong>Mechanism:</strong> CUG repeats sequester MBNL1 &rarr; RNA splicing dysregulation<br>
          <strong>Anticipation:</strong> larger expansions across generations; maternal transmission of &gt;800 repeats &rarr; congenital DM
        </div>
      </div>
    </div>

    <div>
      <div class="card card-amber" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:31px;">Periodic Paralysis</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          <strong>Hypokalemic:</strong> CACNA1S or SCN4A (AD); triggered by carbs/rest; treat with acetazolamide<br>
          <strong>Hyperkalemic:</strong> SCN4A (AD); treat with mexiletine, thiazide
        </div>
      </div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:31px;">Myotonia Congenita</div>
        <div class="card-body" style="font-size:27px; line-height:1.7;">
          <strong>Gene:</strong> CLCN1 (chloride channel)<br>
          Thomsen (AD) / Becker (AR)<br>
          &ldquo;Warm-up&rdquo; phenomenon: improves with exercise
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 15: Key Takeaways ─────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 15, TOTAL, [
  {
    title: "Localize before you test",
    body: "CK level, EMG/NCS pattern, and clinical distribution (proximal vs distal, sensory involvement) guide the genetic differential.",
  },
  {
    title: "Reading-frame rule predicts DMD vs BMD",
    body: "Out-of-frame = no dystrophin = DMD. In-frame = truncated dystrophin = BMD. Exon-skipping therapies convert out-of-frame to in-frame.",
  },
  {
    title: "SMA is treatable — presymptomatic Rx is best",
    body: "Nusinersen (IT ASO), risdiplam (oral), and Zolgensma (AAV9 gene therapy) all increase SMN protein. NBS enables early treatment.",
  },
  {
    title: "LMNA cardiac risk exceeds muscle disease",
    body: "Emery-Dreifuss MD (LMNA) causes sudden death from cardiac conduction disease even with mild weakness — annual cardiac screening is essential.",
  },
  {
    title: "PMP22 is exquisitely dosage-sensitive",
    body: "Deletion = HNPP, duplication = CMT1A. CMT is the most common hereditary neuromuscular disorder (~1/2,500) with >100 causative genes.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
