/**
 * scripts/gen-mitochondrial.mjs
 *
 * Generates 16 clean, readable slides for the Mitochondrial Disease (IEM Module 2) module.
 * Covers mtDNA inheritance, heteroplasmy, threshold/bottleneck effects, MT-ATP6 phenotypes,
 * metabolic stroke, and testing limitations.
 *
 * Run: node scripts/gen-mitochondrial.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "mitochondrial";
const mc = MODULE_COLORS[MOD];
const TOTAL = 16;

const slides = [];

// ── Slide 1: Title ──────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Mitochondrial Disease",
  subtitle: "IEM Module 2",
  totalSlides: TOTAL,
  topics: [
    "When to suspect mitochondrial disease",
    "mtDNA vs nuclear gene inheritance",
    "Heteroplasmy, bottleneck & threshold",
    "MT-ATP6 phenotype spectrum",
    "Metabolic stroke (MELAS paradigm)",
    "Testing strategies & limitations",
  ],
}));

// ── Slide 2: Learning Objectives ────────────────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Learning Objectives</h1>
  <div class="section-label">What You Will Learn</div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${mc.accent};">1</div>
    <div>
      <strong style="font-size:22px;">When to Suspect Mitochondrial Disease</strong><br>
      <span style="font-size:19px; color:${COLORS.body};">Recognize clinical red flags including illness-triggered decompensation and multi-system involvement</span>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.violet};">2</div>
    <div>
      <strong style="font-size:22px;">Testing Complexity</strong><br>
      <span style="font-size:19px; color:${COLORS.body};">Understand why mitochondrial disease testing requires both nuclear exome and mitochondrial genome analysis</span>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.green};">3</div>
    <div>
      <strong style="font-size:22px;">Inheritance Modes</strong><br>
      <span style="font-size:19px; color:${COLORS.body};">Differentiate Mendelian (nuclear) from maternal (mtDNA) inheritance patterns and their clinical implications</span>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.amber};">4</div>
    <div>
      <strong style="font-size:22px;">Genetic Counseling Challenges</strong><br>
      <span style="font-size:19px; color:${COLORS.body};">Apply concepts of heteroplasmy, bottleneck, and threshold effects to recurrence risk counseling</span>
    </div>
  </div>
`));

// ── Slide 3: Case Presentation ──────────────────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Case Presentation</h1>
  <div class="section-label">Clinical Scenario</div>

  <div class="card card-accent" style="margin-bottom:24px;">
    <div class="card-title" style="font-size:24px;">6-Year-Old Female</div>
    <div class="card-body" style="font-size:20px;">
      Developmental delay with progressive ataxia.<br>
      New-onset seizures during a febrile illness.
    </div>
  </div>

  <div class="two-col">
    <div class="card card-rose">
      <div class="card-title">Presenting Features</div>
      <div class="card-body" style="font-size:18px;">
        &bull; Global developmental delay since infancy<br>
        &bull; Progressive gait instability (ataxia)<br>
        &bull; Acute seizure cluster triggered by viral illness<br>
        &bull; Encephalopathy requiring ICU admission
      </div>
    </div>

    <div class="card card-violet">
      <div class="card-title">Initial Concern</div>
      <div class="card-body" style="font-size:18px;">
        Acute neurological decompensation superimposed on a background of developmental delay raises concern for a progressive or metabolic etiology
      </div>
    </div>
  </div>
`));

// ── Slide 4: DDx for Seizures with Developmental Regression ─────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>DDx: Seizures with Regression</h1>
  <div class="section-label">Differential Diagnosis</div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">

    <div class="card card-red">
      <div class="card-title">Channelopathies</div>
      <div class="card-body" style="font-size:18px;">
        SCN1A (Dravet), KCNQ2, KCNT1<br>
        Epileptic encephalopathies with regression
      </div>
    </div>

    <div class="card card-amber">
      <div class="card-title">Cortical Malformations</div>
      <div class="card-body" style="font-size:18px;">
        Polymicrogyria, heterotopia, FCD<br>
        Structural basis for refractory epilepsy
      </div>
    </div>

    <div class="card card-violet">
      <div class="card-title">IEM Including Mitochondrial</div>
      <div class="card-body" style="font-size:18px;">
        Mito disease, organic acidurias, CDG<br>
        Illness-triggered decompensation is a red flag
      </div>
    </div>

    <div class="card card-accent">
      <div class="card-title">Storage Diseases</div>
      <div class="card-body" style="font-size:18px;">
        NCL (CLN genes), NPC, GM2 gangliosidosis<br>
        Progressive myoclonic epilepsy with regression
      </div>
    </div>

  </div>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Key Question</div>
    <div class="value" style="font-size:22px;">Does the regression correlate with illness or physiologic stress? This pattern favors a metabolic/mitochondrial etiology.</div>
  </div>
`));

// ── Slide 5: Case Update ────────────────────────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Case Update</h1>
  <div class="section-label">History &amp; Family Details</div>

  <div class="card card-accent" style="margin-bottom:20px;">
    <div class="card-title">Illness-Triggered Decompensation</div>
    <div class="card-body" style="font-size:19px;">
      Two prior episodes of neurological worsening with febrile illness (ages 3 and 5).<br>
      Each episode followed by incomplete recovery &mdash; stepwise regression.
    </div>
  </div>

  <div class="two-col">
    <div class="card card-rose">
      <div class="card-title">Maternal Family History</div>
      <div class="card-body" style="font-size:18px;">
        &bull; Mother: chronic migraines, mild hearing loss<br>
        &bull; Maternal aunt: clumsiness, proximal weakness<br>
        &bull; Maternal uncle: learning difficulties<br>
        &bull; Two maternal cousins: developmental delay, one with autism diagnosis
      </div>
    </div>

    <div class="card card-green">
      <div class="card-title">Why This Matters</div>
      <div class="card-body" style="font-size:18px;">
        &bull; Multi-system symptoms on the <strong>maternal</strong> side only<br>
        &bull; Variable severity across family members<br>
        &bull; Consistent with maternal inheritance pattern<br>
        &bull; Suggests mitochondrial DNA etiology
      </div>
    </div>
  </div>
`));

// ── Slide 6: Investigations ─────────────────────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Investigations</h1>
  <div class="section-label">Laboratory &amp; Imaging Findings</div>

  <div class="two-col">
    <div>
      <div class="card card-amber" style="margin-bottom:16px;">
        <div class="card-title">Laboratory Results</div>
        <div class="card-body" style="font-size:18px;">
          &bull; Serum lactate: <strong>elevated during crisis</strong> (6.2 mmol/L; normal &lt;2.0)<br>
          &bull; CSF lactate: elevated<br>
          &bull; CK: mildly elevated<br>
          &bull; Routine metabolic screen: non-specific
        </div>
      </div>

      <div class="card card-red">
        <div class="card-title">Key Caveat</div>
        <div class="card-body" style="font-size:18px;">
          Lactate may be normal between crises. A single normal level does <strong>not</strong> exclude mitochondrial disease.
        </div>
      </div>
    </div>

    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title">Brain MRI: Age 3</div>
        <div class="card-body" style="font-size:18px;">
          Mild cerebellar atrophy<br>
          Non-specific periventricular white matter changes
        </div>
      </div>

      <div class="card card-violet">
        <div class="card-title">Brain MRI: Age 7 (Current)</div>
        <div class="card-body" style="font-size:18px;">
          <strong>Progressive</strong> cerebellar &amp; cerebral atrophy<br>
          Basal ganglia signal changes (bilateral)<br>
          Lactate peak on MR spectroscopy
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 7: Genetic Results ────────────────────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Genetic Results</h1>
  <div class="section-label">Exome + Mitochondrial Genome Sequencing</div>

  <div class="highlight-box" style="margin-bottom:22px;">
    <div class="label">Identified Variant</div>
    <div class="value" style="font-size:26px;">MT-ATP6 &nbsp; m.9185 T&gt;C &nbsp; (~93% heteroplasmy)</div>
  </div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
    <div class="card card-red">
      <div class="card-title">Classification</div>
      <div class="card-body" style="font-size:18px;">
        <strong>Pathogenic</strong><br>
        Well-characterized variant associated with Leigh syndrome and NARP spectrum
      </div>
    </div>

    <div class="card card-accent">
      <div class="card-title">Maternal Testing</div>
      <div class="card-body" style="font-size:18px;">
        Mother carries the same variant at <strong>~30% heteroplasmy</strong><br>
        Clinically: migraines and mild hearing loss only
      </div>
    </div>

    <div class="card card-green">
      <div class="card-title">Other Testing</div>
      <div class="card-body" style="font-size:18px;">
        CMA: normal (no copy number variants)<br>
        PWS/AS methylation: normal<br>
        Nuclear exome: no pathogenic findings
      </div>
    </div>

    <div class="card card-violet">
      <div class="card-title">Clinical Correlation</div>
      <div class="card-body" style="font-size:18px;">
        High heteroplasmy (93%) in proband explains severe phenotype; lower load (30%) in mother explains mild symptoms
      </div>
    </div>
  </div>
`));

// ── Slide 8: Mitochondrial Disease Genetics ─────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Mitochondrial Disease Genetics</h1>
  <div class="section-label">Two Genomes, Multiple Inheritance Modes</div>

  <div class="two-col">
    <div>
      <h3 style="color:${mc.dark};">Nuclear Genes (Mendelian)</h3>
      <div class="card card-accent" style="margin-bottom:14px;">
        <div class="card-title">~1,500 mitochondrial proteins</div>
        <div class="card-body" style="font-size:18px;">
          Encoded by nuclear DNA, imported into mitochondria<br>
          &bull; <strong>AR:</strong> SURF1, POLG, NDUFS1<br>
          &bull; <strong>AD:</strong> OPA1, MFN2, TWNK<br>
          &bull; <strong>X-linked:</strong> PDHA1, NDUFA1
        </div>
      </div>

      <div class="card card-green">
        <div class="card-title">Standard Mendelian Inheritance</div>
        <div class="card-body" style="font-size:18px;">
          Follows AR, AD, or X-linked patterns<br>
          Predictable recurrence risks
        </div>
      </div>
    </div>

    <div>
      <h3 style="color:${COLORS.red};">mtDNA (Maternal)</h3>
      <div class="card card-rose" style="margin-bottom:14px;">
        <div class="card-title">37 mitochondrial genes</div>
        <div class="card-body" style="font-size:18px;">
          13 ETC subunits + 22 tRNAs + 2 rRNAs<br>
          &bull; MT-ATP6, MT-ND genes (Complex I &amp; V)<br>
          &bull; MT-TL1, MT-TK (tRNA genes)<br>
          &bull; Large-scale deletions (e.g., KSS, CPEO)
        </div>
      </div>

      <div class="card card-red">
        <div class="card-title">Maternal Inheritance</div>
        <div class="card-body" style="font-size:18px;">
          Transmitted exclusively through the mother<br>
          Variable expression due to heteroplasmy
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 9: The Electron Transport Chain ───────────────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>The Electron Transport Chain</h1>
  <div class="section-label">Complexes I&ndash;V &amp; ATP Production</div>

  <div style="display:flex; gap:12px; margin-bottom:24px;">
    <div style="flex:1; background:${COLORS.blueLight}; border-radius:12px; padding:18px; text-align:center; border:2px solid ${COLORS.blue};">
      <div style="font-size:28px; font-weight:800; color:#1e40af;">I</div>
      <div style="font-size:15px; color:${COLORS.muted}; margin-top:4px;">NADH<br>Dehydrogenase</div>
      <div style="font-size:13px; color:#1e40af; margin-top:6px; font-weight:600;">ND1&ndash;ND6</div>
    </div>
    <div style="flex:0.3; display:flex; align-items:center; justify-content:center; font-size:28px; color:${COLORS.muted};">&rarr;</div>
    <div style="flex:1; background:${COLORS.greenLight}; border-radius:12px; padding:18px; text-align:center; border:2px solid ${COLORS.green};">
      <div style="font-size:28px; font-weight:800; color:#166534;">II</div>
      <div style="font-size:15px; color:${COLORS.muted}; margin-top:4px;">Succinate<br>Dehydrogenase</div>
      <div style="font-size:13px; color:#166534; margin-top:6px; font-weight:600;">SDHA-D</div>
    </div>
    <div style="flex:0.3; display:flex; align-items:center; justify-content:center; font-size:28px; color:${COLORS.muted};">&rarr;</div>
    <div style="flex:1; background:${COLORS.amberLight}; border-radius:12px; padding:18px; text-align:center; border:2px solid ${COLORS.amber};">
      <div style="font-size:28px; font-weight:800; color:#92400e;">III</div>
      <div style="font-size:15px; color:${COLORS.muted}; margin-top:4px;">Cytochrome<br>bc1</div>
      <div style="font-size:13px; color:#92400e; margin-top:6px; font-weight:600;">MT-CYB</div>
    </div>
    <div style="flex:0.3; display:flex; align-items:center; justify-content:center; font-size:28px; color:${COLORS.muted};">&rarr;</div>
    <div style="flex:1; background:${COLORS.roseLight}; border-radius:12px; padding:18px; text-align:center; border:2px solid ${COLORS.rose};">
      <div style="font-size:28px; font-weight:800; color:${COLORS.rose};">IV</div>
      <div style="font-size:15px; color:${COLORS.muted}; margin-top:4px;">Cytochrome c<br>Oxidase</div>
      <div style="font-size:13px; color:${COLORS.rose}; margin-top:6px; font-weight:600;">SURF1, COX</div>
    </div>
    <div style="flex:0.3; display:flex; align-items:center; justify-content:center; font-size:28px; color:${COLORS.muted};">&rarr;</div>
    <div style="flex:1; background:${COLORS.violetLight}; border-radius:12px; padding:18px; text-align:center; border:2px solid ${COLORS.violet};">
      <div style="font-size:28px; font-weight:800; color:${COLORS.violet};">V</div>
      <div style="font-size:15px; color:${COLORS.muted}; margin-top:4px;">ATP<br>Synthase</div>
      <div style="font-size:13px; color:${COLORS.violet}; margin-top:6px; font-weight:600;">MT-ATP6/8</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">Dual Genome Encoding</div>
      <div class="card-body" style="font-size:18px;">
        Complex II is entirely nuclear-encoded. Complexes I, III, IV, V contain both nuclear and mtDNA-encoded subunits.
      </div>
    </div>

    <div class="card card-red">
      <div class="card-title">Disease Impact</div>
      <div class="card-body" style="font-size:18px;">
        Deficiency at any complex disrupts ATP production. Tissues with highest energy demand (brain, muscle, heart) are affected first.
      </div>
    </div>
  </div>
`));

// ── Slide 10: Heteroplasmy vs Homoplasmy ────────────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Heteroplasmy vs Homoplasmy</h1>
  <div class="section-label">mtDNA Variant Load &amp; Clinical Correlation</div>

  <div class="three-col" style="margin-bottom:24px;">
    <div style="background:${COLORS.greenLight}; border-radius:12px; padding:24px; text-align:center; border:2px solid ${COLORS.green};">
      <div style="font-size:24px; font-weight:800; color:#166534;">Wild-Type Only</div>
      <div style="font-size:15px; color:${COLORS.muted}; margin-top:8px;">Homoplasmy (normal)</div>
      <div style="font-size:40px; margin:12px 0;">100%</div>
      <div style="font-size:16px; color:${COLORS.body};">All mtDNA copies are wild-type</div>
      <div style="font-size:18px; font-weight:700; color:#166534; margin-top:8px;">Unaffected</div>
    </div>

    <div style="background:${COLORS.amberLight}; border-radius:12px; padding:24px; text-align:center; border:2px solid ${COLORS.amber};">
      <div style="font-size:24px; font-weight:800; color:#92400e;">Heteroplasmy</div>
      <div style="font-size:15px; color:${COLORS.muted}; margin-top:8px;">Mixed population</div>
      <div style="font-size:40px; margin:12px 0;">30&ndash;90%</div>
      <div style="font-size:16px; color:${COLORS.body};">Mutant + wild-type coexist</div>
      <div style="font-size:18px; font-weight:700; color:#92400e; margin-top:8px;">Variable severity</div>
    </div>

    <div style="background:${COLORS.redLight}; border-radius:12px; padding:24px; text-align:center; border:2px solid ${COLORS.red};">
      <div style="font-size:24px; font-weight:800; color:${COLORS.red};">Mutant Homoplasmy</div>
      <div style="font-size:15px; color:${COLORS.muted}; margin-top:8px;">All copies mutant</div>
      <div style="font-size:40px; margin:12px 0;">100%</div>
      <div style="font-size:16px; color:${COLORS.body};">No wild-type mtDNA present</div>
      <div style="font-size:18px; font-weight:700; color:${COLORS.red}; margin-top:8px;">Severe disease</div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Clinical Principle</div>
    <div class="value" style="font-size:22px;">Higher mutant load generally correlates with earlier onset and more severe disease &mdash; but the relationship is not perfectly linear</div>
  </div>
`));

// ── Slide 11: The Bottleneck Effect ─────────────────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>The Bottleneck Effect</h1>
  <div class="section-label">mtDNA Segregation During Oogenesis</div>

  <div style="display:flex; gap:16px; align-items:center; margin-bottom:24px;">
    <div style="flex:1; background:${mc.light}; border-radius:12px; padding:24px; text-align:center; border:2px solid ${mc.accent};">
      <div style="font-size:22px; font-weight:800; color:${mc.dark};">Mother</div>
      <div style="font-size:16px; color:${COLORS.muted}; margin-top:8px;">~200,000 mtDNA copies per cell</div>
      <div style="font-size:18px; color:${COLORS.body}; margin-top:4px;">e.g., 30% mutant load</div>
    </div>
    <div style="font-size:36px; color:${COLORS.muted};">&rarr;</div>
    <div style="flex:0.8; background:${COLORS.amberLight}; border-radius:12px; padding:24px; text-align:center; border:2px solid ${COLORS.amber};">
      <div style="font-size:22px; font-weight:800; color:#92400e;">Bottleneck</div>
      <div style="font-size:16px; color:${COLORS.muted}; margin-top:8px;">Primordial germ cells</div>
      <div style="font-size:18px; color:${COLORS.body}; margin-top:4px;">~200 mtDNA copies</div>
    </div>
    <div style="font-size:36px; color:${COLORS.muted};">&rarr;</div>
    <div style="flex:1; background:${COLORS.violetLight}; border-radius:12px; padding:24px; text-align:center; border:2px solid ${COLORS.violet};">
      <div style="font-size:22px; font-weight:800; color:${COLORS.violet};">Oocytes</div>
      <div style="font-size:16px; color:${COLORS.muted}; margin-top:8px;">Re-amplified to ~200,000</div>
      <div style="font-size:18px; color:${COLORS.body}; margin-top:4px;">0%, 50%, 95% mutant?</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-red">
      <div class="card-title">Random Genetic Drift</div>
      <div class="card-body" style="font-size:18px;">
        The severe reduction to ~200 copies creates sampling variance. Small differences at the bottleneck are amplified during clonal expansion.
      </div>
    </div>

    <div class="card card-accent">
      <div class="card-title">Clinical Consequence</div>
      <div class="card-body" style="font-size:18px;">
        A mother with 30% heteroplasmy can have children ranging from unaffected (low load) to severely affected (high load). <strong>Recurrence risk is unpredictable.</strong>
      </div>
    </div>
  </div>
`));

// ── Slide 12: The Threshold Effect ──────────────────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>The Threshold Effect</h1>
  <div class="section-label">Mutant Load &amp; Tissue Vulnerability</div>

  <div style="display:flex; gap:16px; margin-bottom:24px;">
    <div style="flex:1; background:${COLORS.greenLight}; border-radius:12px; padding:22px; text-align:center; border:2px solid ${COLORS.green};">
      <div style="font-size:22px; font-weight:800; color:#166534;">Below Threshold</div>
      <div style="font-size:36px; font-weight:800; margin:8px 0; color:#166534;">&lt;60%</div>
      <div style="font-size:17px; color:${COLORS.body};">Sufficient wild-type mtDNA to maintain ETC function</div>
      <div style="font-size:18px; font-weight:700; color:#166534; margin-top:8px;">Asymptomatic or mild</div>
    </div>

    <div style="flex:1; background:${COLORS.amberLight}; border-radius:12px; padding:22px; text-align:center; border:2px solid ${COLORS.amber};">
      <div style="font-size:22px; font-weight:800; color:#92400e;">At Threshold</div>
      <div style="font-size:36px; font-weight:800; margin:8px 0; color:#92400e;">60&ndash;80%</div>
      <div style="font-size:17px; color:${COLORS.body};">Wild-type copies insufficient during metabolic stress</div>
      <div style="font-size:18px; font-weight:700; color:#92400e; margin-top:8px;">Symptomatic</div>
    </div>

    <div style="flex:1; background:${COLORS.redLight}; border-radius:12px; padding:22px; text-align:center; border:2px solid ${COLORS.red};">
      <div style="font-size:22px; font-weight:800; color:${COLORS.red};">Above Threshold</div>
      <div style="font-size:36px; font-weight:800; margin:8px 0; color:${COLORS.red};">&gt;80%</div>
      <div style="font-size:17px; color:${COLORS.body};">Critical loss of ETC function across tissues</div>
      <div style="font-size:18px; font-weight:700; color:${COLORS.red}; margin-top:8px;">Severe / lethal</div>
    </div>
  </div>

  <div class="card card-violet">
    <div class="card-title">Tissue-Specific Vulnerability</div>
    <div class="card-body" style="font-size:19px;">
      Tissues with highest oxidative demand have the lowest threshold: <strong>brain &gt; skeletal muscle &gt; cardiac muscle &gt; kidney &gt; liver</strong>.
      This explains multi-system involvement in severe disease.
    </div>
  </div>
`));

// ── Slide 13: MT-ATP6 Phenotypes ────────────────────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>MT-ATP6 Phenotype Spectrum</h1>
  <div class="section-label">Genotype&ndash;Phenotype Correlations by Heteroplasmy Level</div>

  <table>
    <thead>
      <tr>
        <th style="width:22%;">Heteroplasmy</th>
        <th style="width:28%;">Phenotype</th>
        <th style="width:50%;">Clinical Features</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="color:${COLORS.red}; font-weight:700;">&gt;90%</td>
        <td>Leigh Syndrome</td>
        <td>Infantile onset, basal ganglia necrosis, lactic acidosis, rapid decline</td>
      </tr>
      <tr>
        <td style="color:#92400e; font-weight:700;">70&ndash;90%</td>
        <td>NARP</td>
        <td>Neuropathy, ataxia, retinitis pigmentosa; childhood to adult onset</td>
      </tr>
      <tr>
        <td style="color:${COLORS.amber}; font-weight:700;">50&ndash;70%</td>
        <td>Intermediate</td>
        <td>Learning difficulties, mild ataxia, migraine; variable expression</td>
      </tr>
      <tr>
        <td style="color:${COLORS.green}; font-weight:700;">&lt;50%</td>
        <td>Sensorimotor Neuropathy</td>
        <td>Late-onset peripheral neuropathy; may be subclinical</td>
      </tr>
    </tbody>
  </table>

  <div class="two-col" style="margin-top:12px;">
    <div class="card card-accent">
      <div class="card-title">Our Patient</div>
      <div class="card-body" style="font-size:18px;">
        93% heteroplasmy &rarr; Leigh syndrome spectrum<br>
        Mother 30% &rarr; migraines and mild hearing loss only
      </div>
    </div>

    <div class="card card-red">
      <div class="card-title">Key Principle</div>
      <div class="card-body" style="font-size:18px;">
        The same mtDNA variant produces a spectrum of disease depending on mutant load &mdash; from lethal infantile to subclinical adult
      </div>
    </div>
  </div>
`));

// ── Slide 14: Metabolic Stroke ──────────────────────────────────────────────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>Metabolic Stroke</h1>
  <div class="section-label">The MELAS Paradigm</div>

  <div class="card card-red" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">Non-Vascular Stroke-Like Episodes</div>
    <div class="card-body" style="font-size:19px;">
      Acute neurological deficits that do <strong>not</strong> follow vascular territories. Caused by mitochondrial energy failure &mdash; not thrombosis or embolism.
    </div>
  </div>

  <div class="two-col">
    <div>
      <div class="card card-amber" style="margin-bottom:14px;">
        <div class="card-title">MELAS Features</div>
        <div class="card-body" style="font-size:18px;">
          &bull; MT-TL1 m.3243A&gt;G (most common)<br>
          &bull; Stroke-like episodes before age 40<br>
          &bull; Seizures, cortical blindness, hemiparesis<br>
          &bull; Lactic acidosis &amp; ragged-red fibers
        </div>
      </div>

      <div class="card card-accent">
        <div class="card-title">Imaging Pattern</div>
        <div class="card-body" style="font-size:18px;">
          MRI lesions cross vascular territories<br>
          <strong>Elevated cerebral blood flow</strong> (not ischemia)<br>
          Cortical &amp; subcortical involvement
        </div>
      </div>
    </div>

    <div>
      <div class="card card-green" style="margin-bottom:14px;">
        <div class="card-title">Treatment</div>
        <div class="card-body" style="font-size:18px;">
          &bull; IV arginine (acute episode)<br>
          &bull; Oral citrulline (prophylaxis)<br>
          &bull; Mechanism: NO-mediated vasodilation<br>
          &bull; Seizure management (avoid valproate)
        </div>
      </div>

      <div class="card card-violet">
        <div class="card-title">Why Not a True Stroke?</div>
        <div class="card-body" style="font-size:18px;">
          Energy crisis in neurons &rarr; cytotoxic edema<br>
          Vasogenic component from endothelial dysfunction<br>
          May be partially reversible
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 15: Testing Limitations ───────────────────────────────────────────
slides.push(slideHTML(MOD, 15, TOTAL, `
  <h1>Testing Limitations</h1>
  <div class="section-label">Challenges in Mitochondrial Disease Diagnostics</div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">

    <div class="card card-red">
      <div class="card-title">Heteroplasmy Confounding</div>
      <div class="card-body" style="font-size:18px;">
        Mutant load varies by tissue. Blood may show low or undetectable heteroplasmy while muscle or urine show high levels.
      </div>
    </div>

    <div class="card card-amber">
      <div class="card-title">Tissue-Specific Levels</div>
      <div class="card-body" style="font-size:18px;">
        Blood heteroplasmy may decrease with age (selection against mutant). Muscle biopsy or urine sediment may be needed for definitive testing.
      </div>
    </div>

    <div class="card card-violet">
      <div class="card-title">Deep Intronic Variants</div>
      <div class="card-body" style="font-size:18px;">
        Standard exome and mtDNA sequencing miss deep intronic splice-altering variants in nuclear-encoded mitochondrial genes.
      </div>
    </div>

    <div class="card card-accent">
      <div class="card-title">Undiscovered Genes</div>
      <div class="card-body" style="font-size:18px;">
        Many nuclear genes for mitochondrial function remain uncharacterized. A negative exome does <strong>not</strong> exclude mito disease.
      </div>
    </div>

  </div>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Bottom Line</div>
    <div class="value" style="font-size:22px;">A comprehensive mito workup requires exome + mtDNA genome with attention to tissue selection, heteroplasmy quantification, and clinical correlation</div>
  </div>
`));

// ── Slide 16: Key Takeaways ─────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 16, TOTAL, [
  {
    title: "Illness-triggered decompensation suggests mito",
    body: "Stepwise neurological regression triggered by fever or physiologic stress is a hallmark of mitochondrial disease and should prompt targeted workup.",
  },
  {
    title: "Nuclear + maternal genes cause mito disease",
    body: "~1,500 nuclear genes (AR, AD, X-linked) and 37 mtDNA genes (maternal) converge on mitochondrial function. Both genomes must be tested.",
  },
  {
    title: "Threshold & bottleneck are unique to mtDNA",
    body: "The bottleneck creates unpredictable transmission; the threshold effect determines which tissues become symptomatic based on mutant load.",
  },
  {
    title: "MRI findings are variable & progressive",
    body: "Cerebellar/cerebral atrophy, basal ganglia lesions, and lactate peaks on MRS may evolve over time. Serial imaging adds diagnostic value.",
  },
  {
    title: "Genetic counseling is uniquely complex",
    body: "Recurrence risk for mtDNA variants depends on maternal heteroplasmy level and cannot be precisely predicted due to the bottleneck effect.",
  },
]));

// ── Render ───────────────────────────────────────────────────────────────────
await renderSlides("mitochondrial", slides);
