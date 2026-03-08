/**
 * scripts/gen-mitochondrial.mjs
 *
 * Generates 15 slides for the Mitochondrial Disease module.
 * Sections align exactly with data/modules/mitochondrial.json:
 *   S0 (slides 1-3): Introduction to Mitochondrial Disease
 *   S1 (slides 4-6): Genetics: Mitochondrial DNA and Nuclear DNA
 *   S2 (slides 7-9): Heteroplasmy, Bottleneck Effect, and Threshold
 *   S3 (slides 10-12): Major Mitochondrial Syndromes
 *   S4 (slides 13-15): Diagnosis, Counseling, and Management
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
const TOTAL = 15;

const slides = [];

// ============================================================================
// S0: Introduction to Mitochondrial Disease (slides 1-3)
// ============================================================================

// ── Slide 1: Title ──────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Mitochondrial Disease",
  subtitle: "Dual genome origins, heteroplasmy principles, classic syndromes, and diagnostic approach",
  totalSlides: TOTAL,
  topics: [
    "Prevalence & dual genome overview",
    "mtDNA vs nuclear gene genetics",
    "Heteroplasmy, bottleneck & threshold",
    "MELAS, MERRF, Leigh, CPEO, KSS, LHON",
    "Diagnosis, counseling & management",
  ],
}));

// ── Slide 2: Prevalence & Dual Genome Overview ──────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Introduction to Mitochondrial Disease</h1>
  <div class="section-label">Prevalence &amp; Dual Genome Origins</div>

  <div class="stats-row" style="margin-bottom:24px;">
    <div class="stat-card" style="background:${mc.light}; border-color:${mc.accent};">
      <div class="stat-label">Prevalence</div>
      <div class="stat-value" style="color:${mc.accent};">~1 in 5,000</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">Among the most common IEMs</div>
    </div>
    <div class="stat-card" style="background:${COLORS.violetLight}; border-color:${COLORS.violet};">
      <div class="stat-label">mtDNA Genes</div>
      <div class="stat-value" style="color:${COLORS.violet};">37</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">13 OXPHOS subunits + 22 tRNAs + 2 rRNAs</div>
    </div>
    <div class="stat-card" style="background:${COLORS.greenLight}; border-color:${COLORS.green};">
      <div class="stat-label">Nuclear Genes</div>
      <div class="stat-value" style="color:${COLORS.green};">~1,500</div>
      <div style="font-size:17px; color:${COLORS.muted}; margin-top:4px;">Encoding mitochondrial proteins</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">Multi-System Disease</div>
      <div class="card-body" style="font-size:19px;">
        &ldquo;Think mitochondria&rdquo; when a patient has <strong>neurological + muscular + cardiac + hepatic</strong> features. High energy-demand organs are most vulnerable.
      </div>
    </div>
    <div class="card card-red">
      <div class="card-title">Maternal Inheritance</div>
      <div class="card-body" style="font-size:19px;">
        mtDNA is transmitted exclusively through the egg. Sperm mitochondria are eliminated post-fertilization. <strong>Affected fathers do NOT transmit mtDNA disease.</strong>
      </div>
    </div>
  </div>
`));

// ── Slide 3: Clinical Red Flags & Metabolic Signature ───────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>When to Suspect Mitochondrial Disease</h1>
  <div class="section-label">Clinical Presentations &amp; Metabolic Signature</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div>
      <div class="card card-amber" style="margin-bottom:14px;">
        <div class="card-title">Neurological Presentations</div>
        <div class="card-body" style="font-size:18px;">
          &bull; <strong>Leigh syndrome</strong> &mdash; subacute necrotizing encephalopathy<br>
          &bull; <strong>MELAS</strong> &mdash; stroke-like episodes + lactic acidosis<br>
          &bull; <strong>MERRF</strong> &mdash; myoclonic epilepsy + ragged-red fibers<br>
          &bull; <strong>LHON</strong> &mdash; subacute bilateral visual loss
        </div>
      </div>
      <div class="card card-red">
        <div class="card-title">Red Flag</div>
        <div class="card-body" style="font-size:18px;">
          Illness-triggered neurological decompensation with stepwise regression is a hallmark of mitochondrial disease
        </div>
      </div>
    </div>
    <div>
      <div class="card card-accent" style="margin-bottom:14px;">
        <div class="card-title">Metabolic Signature</div>
        <div class="card-body" style="font-size:18px;">
          &bull; Elevated plasma/CSF <strong>lactate</strong><br>
          &bull; Elevated <strong>lactate:pyruvate ratio</strong><br>
          &bull; Elevated plasma <strong>alanine</strong><br>
          &bull; May be <strong>normal between crises</strong>
        </div>
      </div>
      <div class="card card-green">
        <div class="card-title">Diagnostic Entry Points</div>
        <div class="card-body" style="font-size:18px;">
          &bull; Comprehensive mtDNA + nuclear gene panel<br>
          &bull; Muscle biopsy: ragged-red fibers, COX/SDH staining<br>
          &bull; Respiratory chain enzyme assays
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Key Caveat</div>
    <div class="value" style="font-size:22px;">A single normal lactate does NOT exclude mitochondrial disease &mdash; metabolic markers may normalize between crises</div>
  </div>
`));

// ============================================================================
// S1: Genetics: Mitochondrial DNA and Nuclear DNA (slides 4-6)
// ============================================================================

// ── Slide 4: mtDNA Structure & Encoded Genes ────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>The Mitochondrial Genome</h1>
  <div class="section-label">mtDNA: 16,569 bp Circular Genome</div>

  <div style="display:flex; gap:12px; margin-bottom:24px;">
    <div style="flex:1; background:${COLORS.blueLight}; border-radius:12px; padding:18px; text-align:center; border:2px solid ${COLORS.blue};">
      <div style="font-size:28px; font-weight:800; color:#1e40af;">I</div>
      <div style="font-size:15px; color:${COLORS.muted}; margin-top:4px;">NADH<br>Dehydrogenase</div>
      <div style="font-size:13px; color:#1e40af; margin-top:6px; font-weight:600;">ND1&ndash;ND6, ND4L</div>
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
      <div style="font-size:13px; color:${COLORS.rose}; margin-top:6px; font-weight:600;">COX1&ndash;COX3</div>
    </div>
    <div style="flex:0.3; display:flex; align-items:center; justify-content:center; font-size:28px; color:${COLORS.muted};">&rarr;</div>
    <div style="flex:1; background:${COLORS.violetLight}; border-radius:12px; padding:18px; text-align:center; border:2px solid ${COLORS.violet};">
      <div style="font-size:28px; font-weight:800; color:${COLORS.violet};">V</div>
      <div style="font-size:15px; color:${COLORS.muted}; margin-top:4px;">ATP<br>Synthase</div>
      <div style="font-size:13px; color:${COLORS.violet}; margin-top:6px; font-weight:600;">MT-ATP6 / ATP8</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">13 OXPHOS Subunits</div>
      <div class="card-body" style="font-size:18px;">
        7 Complex I (ND genes) + 1 Complex III (Cytb) + 3 Complex IV (COX) + 2 Complex V (ATP6/8). <strong>Complex II is entirely nuclear-encoded.</strong>
      </div>
    </div>
    <div class="card card-green">
      <div class="card-title">Translation Machinery</div>
      <div class="card-body" style="font-size:18px;">
        22 tRNAs + 2 rRNAs needed for mitochondrial protein synthesis. tRNA mutations (e.g., MT-TL1, MT-TK) cause MELAS and MERRF.
      </div>
    </div>
  </div>
`));

// ── Slide 5: Nuclear vs mtDNA Genes ─────────────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Nuclear vs Mitochondrial DNA Genes</h1>
  <div class="section-label">Two Genomes, Multiple Inheritance Modes</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div>
      <h3 style="color:${mc.dark};">Nuclear Genes (~99% of mito proteins)</h3>
      <div class="card card-accent" style="margin-bottom:14px;">
        <div class="card-title">Inheritance: Standard Mendelian</div>
        <div class="card-body" style="font-size:18px;">
          &bull; <strong>AR (most common):</strong> SURF1, NDUFS1, BCS1L<br>
          &bull; <strong>AD:</strong> POLG, OPA1, MFN2, TWNK<br>
          &bull; <strong>X-linked:</strong> PDHA1, NDUFA1
        </div>
      </div>
      <div class="card card-amber">
        <div class="card-title">POLG (Polymerase Gamma)</div>
        <div class="card-body" style="font-size:18px;">
          AR or AD. Causes Alpers syndrome, CPEO, ataxia-neuropathy spectrum. Variants cause <strong>multiple mtDNA deletions</strong> despite nuclear inheritance.
        </div>
      </div>
    </div>
    <div>
      <h3 style="color:${COLORS.red};">mtDNA Genes (37 genes)</h3>
      <div class="card card-rose" style="margin-bottom:14px;">
        <div class="card-title">Inheritance: Strictly Maternal</div>
        <div class="card-body" style="font-size:18px;">
          &bull; Transmitted exclusively through the egg<br>
          &bull; Sperm mitochondria eliminated post-fertilization<br>
          &bull; Affected fathers do <strong>NOT</strong> transmit
        </div>
      </div>
      <div class="card card-red">
        <div class="card-title">Variable Expression</div>
        <div class="card-body" style="font-size:18px;">
          Heteroplasmy levels differ between tissues and between mother and offspring, causing <strong>wide clinical variability</strong> within families.
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 6: Nuclear Genes Affecting mtDNA ──────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Nuclear Genes Affecting mtDNA Maintenance</h1>
  <div class="section-label">Autosomal Inheritance Despite Mitochondrial Involvement</div>

  <table>
    <thead>
      <tr><th>Gene</th><th>Function</th><th>Inheritance</th><th>Phenotype</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>POLG</td>
        <td>mtDNA polymerase gamma</td>
        <td>AR / AD</td>
        <td>Alpers, CPEO, ataxia-neuropathy; multiple mtDNA deletions</td>
      </tr>
      <tr>
        <td>TWNK (Twinkle)</td>
        <td>mtDNA helicase</td>
        <td>AD / AR</td>
        <td>Progressive external ophthalmoplegia, infantile-onset spinocerebellar ataxia</td>
      </tr>
      <tr>
        <td>SLC25A4 (ANT1)</td>
        <td>Adenine nucleotide translocator</td>
        <td>AD / AR</td>
        <td>CPEO, cardiomyopathy; multiple mtDNA deletions</td>
      </tr>
      <tr>
        <td>SURF1</td>
        <td>Complex IV assembly</td>
        <td>AR</td>
        <td>Most common nuclear cause of COX-deficient Leigh syndrome</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Key Concept</div>
    <div class="value" style="font-size:22px;">Nuclear gene defects can cause multiple mtDNA deletions &mdash; Mendelian inheritance with mitochondrial pathology. Both genomes must be tested.</div>
  </div>
`));

// ============================================================================
// S2: Heteroplasmy, Bottleneck Effect, and Threshold (slides 7-9)
// ============================================================================

// ── Slide 7: Heteroplasmy vs Homoplasmy ─────────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
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
      <div style="font-size:40px; margin:12px 0;">5&ndash;95%</div>
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

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">Tissue Heterogeneity</div>
      <div class="card-body" style="font-size:18px;">
        Heteroplasmy varies between tissues: blood, urine, muscle, hair follicles may show different levels. Blood may not reflect affected-tissue load.
      </div>
    </div>
    <div class="card card-violet">
      <div class="card-title">Clinical Correlation</div>
      <div class="card-body" style="font-size:18px;">
        Higher mutant load generally correlates with earlier onset and more severe disease, but the relationship is not perfectly linear.
      </div>
    </div>
  </div>
`));

// ── Slide 8: The Bottleneck Effect ──────────────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>The Mitochondrial Bottleneck</h1>
  <div class="section-label">Random Segregation During Oogenesis</div>

  <div style="display:flex; gap:16px; align-items:center; margin-bottom:24px;">
    <div style="flex:1; background:${mc.light}; border-radius:12px; padding:24px; text-align:center; border:2px solid ${mc.accent};">
      <div style="font-size:22px; font-weight:800; color:${mc.dark};">Mother</div>
      <div style="font-size:16px; color:${COLORS.muted}; margin-top:8px;">~200,000 mtDNA copies/cell</div>
      <div style="font-size:18px; color:${COLORS.body}; margin-top:4px;">e.g., 40% mutant load</div>
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
      <div style="font-size:18px; color:${COLORS.body}; margin-top:4px;">5%, 50%, or 95% mutant?</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-red">
      <div class="card-title">Random Genetic Drift</div>
      <div class="card-body" style="font-size:18px;">
        Reduction to ~200 copies creates sampling variance. Small differences at the bottleneck are amplified during clonal expansion &mdash; creating <strong>large heteroplasmy shifts</strong>.
      </div>
    </div>
    <div class="card card-green">
      <div class="card-title">Clinical Consequence</div>
      <div class="card-body" style="font-size:18px;">
        A mother with 40% heteroplasmy may have children ranging from 5% to 95%. <strong>Recurrence risk is unpredictable</strong> &mdash; only general ranges can be provided.
      </div>
    </div>
  </div>
`));

// ── Slide 9: The Threshold Effect ───────────────────────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>The Threshold Effect</h1>
  <div class="section-label">Tissue-Specific Vulnerability &amp; Mutant Load</div>

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
      <div style="font-size:36px; font-weight:800; margin:8px 0; color:${COLORS.red};">&gt;80&ndash;90%</div>
      <div style="font-size:17px; color:${COLORS.body};">Critical loss of ETC function across tissues</div>
      <div style="font-size:18px; font-weight:700; color:${COLORS.red}; margin-top:8px;">Severe / lethal</div>
    </div>
  </div>

  <div class="card card-violet" style="margin-bottom:14px;">
    <div class="card-title">Tissue-Specific Vulnerability</div>
    <div class="card-body" style="font-size:19px;">
      Tissues with highest oxidative demand have the lowest threshold: <strong>brain &gt; skeletal muscle &gt; cardiac muscle &gt; kidney &gt; liver</strong>.
      This explains multi-system involvement in severe disease.
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Counseling Implication</div>
    <div class="value" style="font-size:22px;">Threshold is variant- and tissue-specific (~60&ndash;90%). The same heteroplasmy level can produce different severity in different tissues.</div>
  </div>
`));

// ============================================================================
// S3: Major Mitochondrial Syndromes (slides 10-12)
// ============================================================================

// ── Slide 10: MELAS & MERRF ────────────────────────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>MELAS &amp; MERRF</h1>
  <div class="section-label">tRNA Gene Syndromes</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div>
      <div class="card card-red" style="min-height:340px;">
        <div class="card-title" style="font-size:24px;">MELAS</div>
        <div class="card-body" style="font-size:18px;">
          <strong>m.3243A&gt;G in MT-TL1</strong> (~80% of cases)
          <br><br>
          &bull; Stroke-like episodes <strong>not respecting vascular territories</strong><br>
          &bull; Lactic acidosis, ragged-red fibers<br>
          &bull; Hearing loss, diabetes mellitus<br>
          &bull; Seizures, cortical blindness, hemiparesis
          <br><br>
          <strong>MRI:</strong> Posterior-predominant T2 signal crossing vascular boundaries
          <br><br>
          <strong>Treatment:</strong> IV arginine (acute), oral citrulline (prophylaxis)
        </div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="min-height:340px;">
        <div class="card-title" style="font-size:24px;">MERRF</div>
        <div class="card-body" style="font-size:18px;">
          <strong>m.8344A&gt;G in MT-TK</strong> (~80% of cases)
          <br><br>
          &bull; Myoclonus + generalized epilepsy<br>
          &bull; Ataxia<br>
          &bull; Ragged-red fibers on muscle biopsy<br>
          &bull; Deafness, cognitive decline
          <br><br>
          <strong>Key Distinction:</strong> Progressive myoclonic epilepsy phenotype vs. stroke-like episodes in MELAS
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 11: Leigh Syndrome & LHON ────────────────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Leigh Syndrome &amp; LHON</h1>
  <div class="section-label">The Most Common Pediatric &amp; Optic Neuropathy Syndromes</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div>
      <div class="card card-amber" style="min-height:310px;">
        <div class="card-title" style="font-size:22px;">Leigh Syndrome</div>
        <div class="card-body" style="font-size:18px;">
          <strong>Most common mitochondrial disease in children</strong>
          <br><br>
          &bull; Bilateral symmetric <strong>T2 hyperintensity</strong> in basal ganglia, thalami, brainstem<br>
          &bull; &gt;75 causative genes (mtDNA + nuclear)<br>
          &bull; SURF1 = most common nuclear cause (Complex IV deficiency)<br>
          &bull; MT-ATP6 variants: Leigh at &gt;90% heteroplasmy
          <br><br>
          <strong>Lactic acidosis + basal ganglia necrosis = Leigh</strong>
        </div>
      </div>
    </div>
    <div>
      <div class="card card-green" style="min-height:310px;">
        <div class="card-title" style="font-size:22px;">LHON</div>
        <div class="card-body" style="font-size:18px;">
          <strong>Leber Hereditary Optic Neuropathy</strong>
          <br><br>
          Three primary mtDNA variants (&gt;95%):<br>
          &bull; m.11778G&gt;A (MT-ND4) &mdash; most common<br>
          &bull; m.3460G&gt;A (MT-ND1)<br>
          &bull; m.14484T&gt;C (MT-ND6) &mdash; best prognosis
          <br><br>
          Subacute painless bilateral visual loss in young adults (typically males). <strong>Idebenone</strong> and gene therapy in development.
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 12: KSS, CPEO & Overlap ──────────────────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>KSS, CPEO &amp; Deletion Syndromes</h1>
  <div class="section-label">Large mtDNA Deletions</div>

  <table style="margin-bottom:20px;">
    <thead>
      <tr><th>Syndrome</th><th>Onset</th><th>Key Features</th><th>Cause</th></tr>
    </thead>
    <tbody>
      <tr>
        <td style="color:${COLORS.red}; font-weight:700;">KSS</td>
        <td>&lt;20 years</td>
        <td>PEO + pigmentary retinopathy + cardiac conduction defects</td>
        <td>Large mtDNA deletion (1.1&ndash;10 kb)</td>
      </tr>
      <tr>
        <td style="color:${COLORS.amber}; font-weight:700;">CPEO</td>
        <td>Adult</td>
        <td>Progressive external ophthalmoplegia &plusmn; ptosis</td>
        <td>mtDNA deletion OR nuclear (POLG, TWNK)</td>
      </tr>
      <tr>
        <td style="color:${COLORS.violet}; font-weight:700;">Pearson</td>
        <td>Infancy</td>
        <td>Sideroblastic anemia + exocrine pancreas failure</td>
        <td>Large mtDNA deletion (same as KSS)</td>
      </tr>
    </tbody>
  </table>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">Phenotype Continuum</div>
      <div class="card-body" style="font-size:18px;">
        Pearson syndrome survivors may evolve into KSS. The same mtDNA deletion manifests differently depending on tissue distribution and heteroplasmy load.
      </div>
    </div>
    <div class="card card-red">
      <div class="card-title">Cardiac Monitoring Required</div>
      <div class="card-body" style="font-size:18px;">
        KSS patients require regular ECG monitoring for conduction defects. Progressive heart block may necessitate pacemaker implantation.
      </div>
    </div>
  </div>
`));

// ============================================================================
// S4: Diagnosis, Counseling, and Management (slides 13-15)
// ============================================================================

// ── Slide 13: Diagnostic Approach ───────────────────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Diagnostic Approach</h1>
  <div class="section-label">Metabolic Workup, Biopsy &amp; Genetic Testing</div>

  <div class="two-col" style="margin-bottom:18px;">
    <div>
      <div class="card card-amber" style="margin-bottom:14px;">
        <div class="card-title">Metabolic Workup</div>
        <div class="card-body" style="font-size:18px;">
          &bull; Lactate &amp; pyruvate (plasma and/or CSF)<br>
          &bull; Plasma amino acids (elevated alanine)<br>
          &bull; Acylcarnitine profile<br>
          &bull; Urine organic acids<br>
          &bull; <strong>All may be normal between crises</strong>
        </div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="margin-bottom:14px;">
        <div class="card-title">Muscle Biopsy</div>
        <div class="card-body" style="font-size:18px;">
          &bull; <strong>Gomori trichrome:</strong> ragged-red fibers<br>
          &bull; <strong>COX/SDH staining:</strong> COX-negative fibers<br>
          &bull; Respiratory chain enzyme assays<br>
          &bull; Electron microscopy
        </div>
      </div>
    </div>
  </div>

  <div class="card card-accent" style="margin-bottom:14px;">
    <div class="card-title">Genetic Testing Strategy</div>
    <div class="card-body" style="font-size:19px;">
      Comprehensive <strong>mtDNA sequencing + deletion analysis</strong> combined with <strong>nuclear mitochondrial gene panel</strong> (or exome with mtDNA). Heteroplasmy quantification ideally from muscle or urine for respiratory chain disorders.
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Tissue Selection Matters</div>
    <div class="value" style="font-size:22px;">Blood heteroplasmy may decrease with age. Muscle biopsy or urine sediment may be needed for definitive testing.</div>
  </div>
`));

// ── Slide 14: Counseling & Reproductive Options ─────────────────────────────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>Counseling &amp; Reproductive Options</h1>
  <div class="section-label">Unique Challenges in Mitochondrial Disease</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div>
      <div class="card card-red" style="margin-bottom:14px;">
        <div class="card-title">mtDNA Counseling Complexity</div>
        <div class="card-body" style="font-size:18px;">
          &bull; Strictly maternal &mdash; affected fathers do not transmit<br>
          &bull; Bottleneck makes offspring risk <strong>unpredictable</strong><br>
          &bull; Only general ranges can be provided<br>
          &bull; Higher maternal load = higher but still uncertain risk
        </div>
      </div>
      <div class="card card-green">
        <div class="card-title">PGT for mtDNA Variants</div>
        <div class="card-body" style="font-size:18px;">
          Preimplantation genetic testing available for some mtDNA variants. Select embryos with lowest heteroplasmy.
        </div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="margin-bottom:14px;">
        <div class="card-title">Mitochondrial Replacement Therapy</div>
        <div class="card-body" style="font-size:18px;">
          &ldquo;Three-parent IVF&rdquo; &mdash; approved in UK for severe maternal mtDNA disease. Replaces mother&rsquo;s mitochondria with donor mitochondria.
        </div>
      </div>
      <div class="card card-accent">
        <div class="card-title">Nuclear Gene Counseling</div>
        <div class="card-body" style="font-size:18px;">
          Standard Mendelian recurrence risks: <strong>25% for AR</strong>, 50% for AD. More predictable than mtDNA disease counseling.
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 15: Key Takeaways ─────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 15, TOTAL, [
  {
    title: "Dual genome: both mtDNA and nuclear genes cause mito disease",
    body: "37 mtDNA genes (maternal) and ~1,500 nuclear genes (Mendelian) converge on mitochondrial function. Both genomes must be tested.",
  },
  {
    title: "Heteroplasmy + bottleneck make recurrence unpredictable",
    body: "The bottleneck creates large heteroplasmy shifts between mother and offspring. Only general risk ranges can be provided.",
  },
  {
    title: "Threshold effect determines tissue-specific disease",
    body: "Clinical disease manifests when mutant load exceeds ~60-90% depending on tissue. Brain and muscle are most vulnerable.",
  },
  {
    title: "Recognize the classic syndromes: MELAS, Leigh, MERRF, LHON, KSS",
    body: "Each has characteristic clinical features, specific mtDNA variants, and defined MRI/biopsy patterns guiding targeted testing.",
  },
  {
    title: "Avoid valproate in POLG; use CoQ10, arginine for MELAS",
    body: "Management is largely supportive. POLG-valproate contraindication is critical. Emergency protocols prevent metabolic decompensation.",
  },
]));

// ── Render ───────────────────────────────────────────────────────────────────
await renderSlides("mitochondrial", slides);
