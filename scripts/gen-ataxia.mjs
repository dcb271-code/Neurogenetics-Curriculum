/**
 * scripts/gen-ataxia.mjs
 *
 * Generates 15 slides for the Hereditary Ataxias module.
 * Aligned to JSON section structure:
 *   S0 (slides 1-3): Clinical Approach to Ataxia
 *   S1 (slides 4-6): Differential Diagnosis by Tempo & Genetics
 *   S2 (slides 7-9): Diagnostic Evaluation by Tempo
 *   S3 (slides 10-12): Friedreich Ataxia
 *   S4 (slides 13-15): Autosomal Dominant Spinocerebellar Ataxias
 *
 * Run: node scripts/gen-ataxia.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "ataxia";
const mc = MODULE_COLORS[MOD];
const TOTAL = 15;

const slides = [];

// ═══════════════════════════════════════════════════════════════════════════
// S0: Clinical Approach to Ataxia (slides 1-3)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Hereditary Ataxias",
  subtitle: "Clinical approach, differential diagnosis, diagnostic evaluation, Friedreich ataxia, and the spinocerebellar ataxias",
  totalSlides: TOTAL,
  topics: [
    "Clinical approach to ataxia",
    "Differential diagnosis of genetic ataxias",
    "Diagnostic evaluation & testing strategy",
    "Friedreich ataxia deep dive",
    "Autosomal dominant SCAs",
  ],
}));

// ── Slide 2: Cerebellar vs Sensory Ataxia ──────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Localizing Ataxia</h1>
  <div class="section-label">Clinical Approach to Ataxia</div>

  <div style="font-size:21px; margin-bottom:20px; color:${COLORS.body};">
    Ataxia is the inability to generate a normal voluntary movement trajectory &mdash; not attributable to weakness. The first step is <strong>localizing the source</strong>.
  </div>

  <div class="three-col">
    <div class="card card-accent">
      <div class="card-title">Cerebellar Ataxia</div>
      <div class="card-body" style="font-size:18px;">
        Broad-based gait, dysmetria, dysdiadochokinesia, nystagmus, scanning dysarthria<br><br>
        Localizes to <strong>ipsilateral cerebellar hemisphere or vermis</strong>
      </div>
    </div>
    <div class="card card-violet">
      <div class="card-title">Sensory (Proprioceptive)</div>
      <div class="card-body" style="font-size:18px;">
        Worsened by eye closure (<strong>positive Romberg</strong>), absent cerebellar findings<br><br>
        Caused by large-fiber peripheral neuropathy or dorsal column disease
      </div>
    </div>
    <div class="card card-amber">
      <div class="card-title">Vestibular</div>
      <div class="card-body" style="font-size:18px;">
        Vertigo, directional falling, nystagmus<br><br>
        Inner ear or vestibular nerve pathology. Less commonly genetic.
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Key Exam Distinction</div>
    <div class="value" style="font-size:22px;">Romberg positive = sensory ataxia. Romberg negative with dysmetria = cerebellar ataxia.</div>
  </div>
`));

// ── Slide 3: Temporal Classification & Episodic Ataxia ─────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Temporal Classification</h1>
  <div class="section-label">Clinical Approach to Ataxia</div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px;">
    <div class="card card-red">
      <div class="card-title">Acute (hours&ndash;days)</div>
      <div class="card-body" style="font-size:18px;">Toxic/medication exposure, post-infectious cerebellitis, stroke, MS, Wernicke encephalopathy. <strong>Neuroimaging is urgent.</strong></div>
    </div>
    <div class="card card-accent">
      <div class="card-title">Chronic / Progressive</div>
      <div class="card-body" style="font-size:18px;">Child or young adult with family history: <strong>hereditary ataxia until proven otherwise</strong>. Systematic genetic evaluation warranted.</div>
    </div>
  </div>

  <div style="font-size:20px; font-weight:700; color:${COLORS.heading}; margin-bottom:12px;">Episodic Ataxias &mdash; Channelopathies</div>

  <div class="two-col">
    <div class="card card-violet">
      <div class="card-title">EA1 (KCNA1)</div>
      <div class="card-body" style="font-size:18px;">
        Brief (seconds to minutes) episodes of ataxia with <strong>myokymia</strong> (continuous muscle rippling). K+ channel (Kv1.1) dysfunction.
      </div>
    </div>
    <div class="card card-green">
      <div class="card-title">EA2 (CACNA1A)</div>
      <div class="card-body" style="font-size:18px;">
        Prolonged episodes (hours) with interictal <strong>nystagmus</strong>. Responds to <strong>acetazolamide</strong>. Allelic with SCA6.
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:12px;">
    <div class="label">Key Principle</div>
    <div class="value" style="font-size:22px;">Tempo of onset is the single most important initial discriminator in the ataxia differential</div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// S1: Differential Diagnosis by Tempo & Genetics (slides 4-6)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 4: Acute + Recurrent Ataxia DDx ────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>DDx: Acute &amp; Recurrent Ataxia</h1>
  <div class="section-label">Differential Diagnosis by Tempo</div>

  <div class="two-col" style="margin-top:8px;">
    <div>
      <div style="font-size:20px; font-weight:700; color:${mc.dark}; margin-bottom:12px;">Acute Ataxia</div>
      <table>
        <thead><tr><th>Cause</th><th>Key Clue</th></tr></thead>
        <tbody>
          <tr><td>Drug / Toxin</td><td>Most common in young children</td></tr>
          <tr><td>Acute cerebellitis</td><td>Post-infectious (varicella, EBV)</td></tr>
          <tr><td>Basilar migraine</td><td>Aura + headache; episodic</td></tr>
          <tr><td>OMA / Neuroblastoma</td><td>Opsoclonus-myoclonus; MIBG, urine HVA/VMA</td></tr>
          <tr><td>Conversion / Functional</td><td>Inconsistent exam; positive signs</td></tr>
          <tr><td>Stroke / MS / Miller-Fisher</td><td>Acute onset; MRI, LP</td></tr>
        </tbody>
      </table>
    </div>
    <div>
      <div style="font-size:20px; font-weight:700; color:${mc.dark}; margin-bottom:12px;">Recurrent (Episodic) Ataxia</div>
      <table>
        <thead><tr><th>Disorder</th><th>Gene / Distinguishing Feature</th></tr></thead>
        <tbody>
          <tr><td>EA1</td><td>KCNA1 &mdash; myokymia pathognomonic; acetazolamide</td></tr>
          <tr><td>EA2</td><td>CACNA1A &mdash; hours-long; same gene as SCA6</td></tr>
          <tr><td>GLUT1 deficiency</td><td>Fasting-provoked; low CSF glucose</td></tr>
          <tr><td>PDH deficiency</td><td>Ketogenic diet responsive</td></tr>
          <tr><td>MSUD intermittent</td><td>Branched-chain amino acids &uarr;</td></tr>
          <tr><td>Hartnup disease</td><td>Aminoaciduria; niacin supplementation</td></tr>
        </tbody>
      </table>
    </div>
  </div>
`, `
  tbody td { font-size: 16px; padding: 9px 14px; }
  thead th { font-size: 14px; padding: 9px 14px; }
`));

// ── Slide 5: Chronic/Progressive Ataxia DDx by Genetics ──────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>DDx: Chronic / Progressive Ataxia</h1>
  <div class="section-label">Differential Diagnosis by Inheritance</div>

  <div class="three-col" style="margin-top:8px;">
    <div>
      <div class="card card-accent" style="padding:20px;">
        <div class="card-title" style="font-size:19px;">Autosomal Recessive</div>
        <div class="card-body" style="font-size:16px; line-height:1.55;">
          <strong>Friedreich (FXN)</strong> &mdash; GAA repeat<br>
          <strong>AT (ATM)</strong> &mdash; elevated AFP<br>
          <strong>AOA1 (APTX) / AOA2 (SETX)</strong><br>
          <strong>AVED (TTPA)</strong> &mdash; treatable!<br>
          Abetalipoproteinemia<br>
          VWM (eIF2B subunits)<br>
          GLUT1 chronic form
        </div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="padding:20px;">
        <div class="card-title" style="font-size:19px;">Autosomal Dominant (SCAs)</div>
        <div class="card-body" style="font-size:16px; line-height:1.55;">
          <strong>SCA1 (ATXN1)</strong> &mdash; pyramidal<br>
          <strong>SCA2 (ATXN2)</strong> &mdash; slow saccades<br>
          <strong>SCA3 (ATXN3)</strong> &mdash; most common<br>
          <strong>SCA6 (CACNA1A)</strong> &mdash; pure cerebellar<br>
          <strong>SCA7 (ATXN7)</strong> &mdash; macular degen<br>
          <strong>SCA17 (TBP)</strong> &mdash; cognitive<br>
          <strong>DRPLA</strong> &mdash; East Asian<br>
          EA1 / EA2 (overlap)
        </div>
      </div>
    </div>
    <div>
      <div class="card card-amber" style="padding:20px;">
        <div class="card-title" style="font-size:19px;">X-Linked</div>
        <div class="card-body" style="font-size:16px; line-height:1.55;">
          <strong>X-ALD (ABCD1)</strong><br>
          <strong>PMD (PLP1)</strong><br>
          <strong>FXTAS (FMR1 premutation)</strong>
        </div>
      </div>
    </div>
  </div>

  <div class="card card-red" style="margin-top:14px; padding:18px 24px;">
    <div class="card-title" style="font-size:20px;">Repeat Expansion Disorders NOT Detected on WES</div>
    <div class="card-body" style="font-size:18px;">
      Friedreich (FXN GAA), SCAs 1/2/3/6/7/17, DRPLA, FXTAS &mdash; all require <strong>disease-specific repeat testing</strong> separately. <strong>Negative WES does NOT exclude these diagnoses.</strong>
    </div>
  </div>
`));

// ── Slide 6: Mitochondrial & Other Metabolic Ataxias ───────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Mitochondrial &amp; Other Metabolic Ataxias</h1>
  <div class="section-label">Differential Diagnosis</div>

  <div class="two-col">
    <div>
      <div class="card card-red" style="margin-bottom:16px;">
        <div class="card-title">Mitochondrial Disorders</div>
        <div class="card-body" style="font-size:18px;">
          Elevated lactate, multisystem involvement<br><br>
          <strong>POLG:</strong> Sensory ataxia + epilepsy + ophthalmoplegia<br>
          <strong>mtDNA deletions:</strong> Kearns-Sayre syndrome (PEO + ataxia + retinopathy)<br><br>
          Testing: lactate/pyruvate, mtDNA + nuclear gene panel
        </div>
      </div>
      <div class="card card-amber">
        <div class="card-title">Other Metabolic</div>
        <div class="card-body" style="font-size:18px;">
          <strong>Refsum disease (PHYH):</strong> Elevated phytanic acid, retinitis pigmentosa, neuropathy<br>
          <strong>CTX (CYP27A1):</strong> Elevated cholestanol, xanthomas, cataracts, ataxia<br>
          <strong>Abetalipoproteinemia:</strong> Absent LDL, acanthocytes
        </div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="margin-bottom:16px;">
        <div class="card-title">Conventional-Variant AR Ataxias</div>
        <div class="card-body" style="font-size:18px;">
          Detected by standard sequencing (not repeat expansion):<br><br>
          <strong>SACS:</strong> Spastic ataxia of Charlevoix-Saguenay (spasticity, retinal striations)<br>
          <strong>APTX (AOA1):</strong> Oculomotor apraxia, low albumin<br>
          <strong>SETX (AOA2):</strong> Oculomotor apraxia, elevated AFP<br>
          <strong>SYNE1:</strong> Pure cerebellar ataxia
        </div>
      </div>
      <div class="card card-green">
        <div class="card-title">Key Principle</div>
        <div class="card-body" style="font-size:18px;">
          Age of onset, inheritance pattern, associated features (neuropathy, pyramidal signs, systemic) guide the differential and testing strategy.
        </div>
      </div>
    </div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// S2: Diagnostic Evaluation by Tempo (slides 7-9)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 7: Workup — Acute & Recurrent Ataxia ──────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Workup: Acute &amp; Recurrent Ataxia</h1>
  <div class="section-label">Diagnostic Evaluation by Tempo</div>

  <div class="two-col" style="margin-top:8px;">
    <div>
      <div class="card card-red" style="padding:24px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">Acute Ataxia Evaluation</div>
        <div class="card-body" style="font-size:18px; line-height:1.6;">
          <strong>CT head</strong> &mdash; stat for hemorrhage/mass<br>
          <strong>Urine tox screen</strong> &mdash; #1 cause in young children<br>
          <strong>CMP</strong> &mdash; electrolytes, glucose<br>
          <strong>MRI/MRA</strong> &mdash; if stroke concern<br>
          <strong>LP</strong> &mdash; if encephalopathic (cerebellitis, MS, Miller-Fisher)
        </div>
      </div>
      <div class="card card-amber" style="padding:24px;">
        <div class="card-title" style="font-size:22px;">OMA / Neuroblastoma Workup</div>
        <div class="card-body" style="font-size:18px; line-height:1.6;">
          <strong>MIBG scan</strong><br>
          <strong>Urine HVA / VMA</strong> (catecholamine metabolites)<br>
          CT/MRI chest &amp; abdomen
        </div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="padding:24px;">
        <div class="card-title" style="font-size:22px;">Recurrent (Episodic) Ataxia Evaluation</div>
        <div class="card-body" style="font-size:18px; line-height:1.6;">
          <strong>MRI + MRS</strong> &mdash; cerebellar atrophy, lactate peak<br><br>
          <strong>Fasting CSF glucose</strong> &mdash; GLUT1 deficiency (CSF:serum glucose ratio &lt;0.4)<br><br>
          <strong>CSF lactate / pyruvate</strong> &mdash; PDH deficiency, mitochondrial<br><br>
          <strong>CACNA1A / KCNA1 testing</strong> &mdash; EA2 / EA1<br><br>
          <strong>Plasma amino acids</strong> &mdash; MSUD intermittent<br><br>
          <strong>Urine amino acids</strong> &mdash; Hartnup disease
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 8: Workup — Chronic/Progressive Ataxia ─────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Workup: Chronic / Progressive Ataxia</h1>
  <div class="section-label">Diagnostic Evaluation by Tempo</div>

  <div class="two-col" style="margin-top:8px;">
    <div>
      <div class="card card-accent" style="padding:24px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">Imaging &amp; Labs</div>
        <div class="card-body" style="font-size:18px; line-height:1.6;">
          <strong>MRI + MRS</strong> &mdash; cerebellar atrophy pattern, lactate peak, white-matter signal<br><br>
          <strong>Vitamin E level</strong> &mdash; AVED (TTPA) is <strong>treatable and underdiagnosed!</strong><br><br>
          <strong>LP:</strong> CSF glucose (GLUT1), OCBs (MS), lactate (mito)<br><br>
          AFP, CoQ10, ceruloplasmin, lipid panel, B12, TSH, anti-TTG
        </div>
      </div>
      <div class="card card-green" style="padding:24px;">
        <div class="card-title" style="font-size:22px;">NCS / EMG</div>
        <div class="card-body" style="font-size:18px; line-height:1.6;">
          Large-fiber sensory neuropathy &mdash; cardinal in Friedreich, AVED, CANVAS
        </div>
      </div>
    </div>
    <div>
      <div class="card card-red" style="padding:24px;">
        <div class="card-title" style="font-size:22px;">Genetic Testing &mdash; Critical Note</div>
        <div class="card-body" style="font-size:18px; line-height:1.6;">
          Most common hereditary ataxias are <strong>REPEAT EXPANSIONS</strong> not detected by WES/WGS:<br><br>
          &bull; Friedreich (FXN GAA)<br>
          &bull; SCAs 1, 2, 3, 6, 7, 17 (CAG)<br>
          &bull; DRPLA (CAG)<br>
          &bull; FXTAS (FMR1 CGG premutation)<br>
          &bull; CANVAS (RFC1 AAGGG)<br><br>
          <strong>Send disease-specific repeat testing separately.</strong> Metabolic screen guided by clinical pattern.
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 9: Exome Limitations for Repeat Expansions ───────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Exome Limitations for Repeats</h1>
  <div class="section-label">Diagnostic Evaluation</div>

  <div class="card card-red" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">Standard NGS Cannot Detect Repeat Expansions</div>
    <div class="card-body" style="font-size:20px;">Short-read exome/genome sequencing does <strong>not reliably detect</strong> trinucleotide or pentanucleotide repeat expansions. A normal exome does NOT rule out repeat-expansion ataxias.</div>
  </div>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">Required Specialized Methods</div>
      <div class="card-body" style="font-size:18px;">
        <strong>Repeat-primed PCR (RP-PCR)</strong><br>
        Southern blot (gold standard for large repeats)<br>
        <strong>Long-read sequencing</strong> (PacBio / ONT &mdash; emerging)
      </div>
    </div>
    <div class="card card-violet">
      <div class="card-title">Disorders Requiring Repeat Testing</div>
      <div class="card-body" style="font-size:18px;">
        Friedreich ataxia (<strong>FXN</strong> / GAA)<br>
        SCAs 1&ndash;3, 6, 7, 17 (<strong>ATXN</strong> / CAG)<br>
        CANVAS (<strong>RFC1</strong> / AAGGG)<br>
        SCA36, myotonic dystrophy, others
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Practical Rule</div>
    <div class="value" style="font-size:22px;">For any patient with progressive ataxia and a negative exome &mdash; always ask: &ldquo;Were repeat expansions specifically tested?&rdquo;</div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// S3: Friedreich Ataxia (slides 10-12)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 10: FA Genetics & Pathophysiology ────────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Friedreich Ataxia: Genetics</h1>
  <div class="section-label">Most Common Autosomal Recessive Ataxia</div>

  <div class="stats-row" style="margin-bottom:20px;">
    <div class="stat-card" style="background:${mc.light}; border-color:${mc.accent};">
      <div class="stat-label">Prevalence</div>
      <div class="stat-value">~1/50,000</div>
    </div>
    <div class="stat-card" style="background:${COLORS.amberLight}; border-color:${COLORS.amber};">
      <div class="stat-label">Gene</div>
      <div class="stat-value">FXN (9q21)</div>
    </div>
    <div class="stat-card" style="background:${COLORS.violetLight}; border-color:${COLORS.violet};">
      <div class="stat-label">Mechanism</div>
      <div class="stat-value">GAA Repeat</div>
      <div style="font-size:15px; color:${COLORS.muted}; margin-top:4px;">Intron 1 expansion</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">GAA Repeat Ranges</div>
      <div class="card-body" style="font-size:18px;">
        <strong>Normal:</strong> &lt;33 repeats<br>
        <strong>Pathogenic:</strong> &gt;66 repeats (most patients 600&ndash;1000)<br>
        <strong>96&ndash;98%:</strong> Homozygous expansion<br>
        <strong>2&ndash;4%:</strong> Compound het (expansion + point variant)
      </div>
    </div>
    <div class="card card-red">
      <div class="card-title">Pathophysiology</div>
      <div class="card-body" style="font-size:18px;">
        Expanded GAA &rarr; <strong>heterochromatin formation</strong> &rarr; silenced frataxin expression &rarr; impaired mitochondrial iron-sulfur cluster assembly &rarr; iron accumulation &rarr; <strong>oxidative stress</strong> &rarr; neurodegeneration
      </div>
    </div>
  </div>
`));

// ── Slide 11: FA Clinical Features & Systemic Involvement ──────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Friedreich Ataxia: Clinical Features</h1>
  <div class="section-label">Friedreich Ataxia</div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title">Neurological</div>
        <div class="card-body" style="font-size:18px;">
          Onset typically by age 25 (mean 10&ndash;15 y)<br>
          Progressive gait &amp; limb ataxia<br>
          Dysarthria (scanning speech)<br>
          <strong>Areflexia</strong> + extensor plantars (mixed UMN/LMN)<br>
          Large-fiber sensory neuropathy (loss of vibration/proprioception)
        </div>
      </div>
      <div class="card card-violet">
        <div class="card-title">MRI Findings</div>
        <div class="card-body" style="font-size:18px;">
          <strong>Cervical spinal cord atrophy</strong> (hallmark)<br>
          Cerebellar atrophy (later finding)<br>
          Dentate nucleus T2 hypointensity (iron)
        </div>
      </div>
    </div>
    <div>
      <div class="card card-red" style="margin-bottom:16px;">
        <div class="card-title">Cardiac</div>
        <div class="card-body" style="font-size:18px;">
          <strong>Hypertrophic cardiomyopathy in ~80%</strong><br>
          Leading cause of death (heart failure, arrhythmia)<br>
          Annual echo + ECG + Holter required<br>
          Cardiology co-management essential
        </div>
      </div>
      <div class="card card-amber">
        <div class="card-title">Other Systemic</div>
        <div class="card-body" style="font-size:18px;">
          Diabetes mellitus (10&ndash;20%)<br>
          Scoliosis (most patients)<br>
          Pes cavus, hammertoes<br>
          Progressive wheelchair dependence
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 12: Omaveloxolone & Management ───────────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>Omaveloxolone (Skyclarys)</h1>
  <div class="section-label">Friedreich Ataxia</div>

  <div class="highlight-box" style="margin-bottom:20px;">
    <div class="label">FDA Approval &mdash; February 2023</div>
    <div class="value">First disease-modifying therapy for Friedreich ataxia</div>
  </div>

  <div class="two-col">
    <div class="card card-green">
      <div class="card-title">Mechanism of Action</div>
      <div class="card-body" style="font-size:18px;">
        <strong>Nrf2 pathway activator</strong><br>
        Upregulates antioxidant gene expression<br>
        Counters oxidative stress from frataxin deficiency<br>
        Restores mitochondrial function
      </div>
    </div>
    <div class="card card-accent">
      <div class="card-title">MOXIe Trial Results</div>
      <div class="card-body" style="font-size:18px;">
        Phase 2 RCT: significant improvement in mFARS score vs placebo<br>
        Approved for patients &ge;16 years<br>
        Slows ataxia progression
      </div>
    </div>
  </div>

  <div class="card card-amber" style="margin-top:16px;">
    <div class="card-title">Ongoing Management</div>
    <div class="card-body" style="font-size:19px;">Annual cardiac surveillance (echo, ECG, Holter), diabetes screening, scoliosis monitoring, PT/OT for mobility, genetic counseling for family (AR inheritance, carrier testing).</div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// S4: Autosomal Dominant Spinocerebellar Ataxias (slides 13-15)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 13: SCA Overview & Anticipation ──────────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Spinocerebellar Ataxias (SCAs)</h1>
  <div class="section-label">Autosomal Dominant SCAs</div>

  <div style="font-size:21px; margin-bottom:16px; color:${COLORS.body};">
    &gt;40 named SCAs caused by variants (most commonly <strong>CAG repeat expansions</strong>) in different genes. Progressive cerebellar ataxia with variable additional features.
  </div>

  <table>
    <thead>
      <tr><th>SCA</th><th>Gene</th><th>Key Distinguishing Features</th></tr>
    </thead>
    <tbody>
      <tr><td>SCA1</td><td>ATXN1</td><td>Pyramidal signs, early bulbar dysfunction</td></tr>
      <tr><td>SCA2</td><td>ATXN2</td><td><strong>Slow saccades</strong> + neuropathy. Intermediate repeats = ALS risk factor</td></tr>
      <tr><td>SCA3</td><td>ATXN3</td><td>Most common SCA worldwide. Variable: dystonia, PEO, neuropathy</td></tr>
      <tr><td>SCA6</td><td>CACNA1A</td><td>Mildest. Late-onset, pure cerebellar. Small repeats (21&ndash;33). Allelic with EA2</td></tr>
      <tr><td>SCA7</td><td>ATXN7</td><td><strong>Progressive macular degeneration</strong> (pathognomonic)</td></tr>
    </tbody>
  </table>

  <div class="card card-red" style="margin-top:16px;">
    <div class="card-title">Anticipation</div>
    <div class="card-body" style="font-size:19px;">Expanded CAG repeats are unstable during <strong>paternal transmission</strong>, tending to increase &mdash; earlier onset and greater severity in children of affected fathers.</div>
  </div>
`, `
  tbody td { font-size: 17px; padding: 12px 16px; }
  thead th { font-size: 15px; padding: 12px 16px; }
`));

// ── Slide 14: RFC1/CANVAS & Genetic Counseling ─────────────────────────────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>RFC1/CANVAS &amp; Genetic Counseling</h1>
  <div class="section-label">Autosomal Dominant SCAs</div>

  <div class="card card-violet" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">RFC1-Related CANVAS</div>
    <div class="card-body" style="font-size:19px;">
      <strong>Cerebellar ataxia + neuropathy + vestibular areflexia</strong> (+ chronic cough). Biallelic AAGGG pentanucleotide repeat in RFC1 intron 2. Now recognized as one of the most common causes of late-onset recessive ataxia. <strong>Not detected by standard exome</strong> &mdash; requires RP-PCR or long-read sequencing.
    </div>
  </div>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">SCA6 / EA2 Relationship</div>
      <div class="card-body" style="font-size:18px;">
        Both caused by <strong>CACNA1A</strong> variants.<br>
        SCA6: small CAG expansions (21&ndash;33 repeats) &rarr; progressive cerebellar ataxia.<br>
        EA2: conventional variants &rarr; episodic ataxia responding to acetazolamide.<br>
        Allelic disorders, distinct phenotypes.
      </div>
    </div>
    <div class="card card-amber">
      <div class="card-title">Genetic Counseling for SCAs</div>
      <div class="card-body" style="font-size:18px;">
        <strong>50% risk</strong> for each child of an affected parent<br>
        Penetrance is age-dependent<br>
        Presymptomatic testing requires careful counseling per ACMG guidelines<br>
        Anticipation: paternal transmission &rarr; earlier onset
      </div>
    </div>
  </div>
`));

// ── Slide 15: Key Takeaways ────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 15, TOTAL, [
  {
    title: "Tempo of onset drives the ataxia differential",
    body: "Acute, episodic, or chronic/progressive \u2014 this determines the urgency and direction of the diagnostic workup.",
  },
  {
    title: "Exclude treatable causes first",
    body: "Vitamin E, CoQ10, Wilson, B12 deficiency, celiac disease, and hypothyroidism are all treatable and must be ruled out early.",
  },
  {
    title: "Friedreich ataxia: cardiomyopathy is the leading cause of death",
    body: "Present in ~80% of patients. Annual cardiac surveillance is mandatory. Omaveloxolone is the first approved disease-modifying therapy.",
  },
  {
    title: "Standard exome misses repeat expansions",
    body: "FXN, ATXN1\u20133/7, RFC1, and SCA6 all require dedicated repeat-primed PCR or long-read sequencing. A negative exome does not rule these out.",
  },
  {
    title: "Anticipation is a hallmark of CAG-repeat SCAs",
    body: "Paternal transmission increases repeat length, causing earlier onset. SCA7 macular degeneration is pathognomonic. Genetic counseling is essential.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
