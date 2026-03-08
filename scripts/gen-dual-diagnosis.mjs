/**
 * scripts/gen-dual-diagnosis.mjs
 *
 * Generates 15 clean, readable slides for the Dual Diagnosis module.
 * Covers psychiatric comorbidity in neurogenetic conditions:
 *   S0 (slides 1-3):  Dual Diagnosis definitions and framework
 *   S1 (slides 4-6):  Chromosomal syndromes with behavioral phenotypes
 *   S2 (slides 7-9):  Monogenic conditions with psychiatric phenotypes
 *   S3 (slides 10-12): Diagnostic evaluation in dual diagnosis
 *   S4 (slides 13-15): Integrated management strategies
 *
 * Run: node scripts/gen-dual-diagnosis.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "dual-diagnosis";
const mc = MODULE_COLORS[MOD];
const TOTAL = 15;

const slides = [];

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 0 — Dual Diagnosis: Definitions and Framework (slides 1-3)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Dual Diagnosis: Neurogenetics & Psychiatric Comorbidity",
  subtitle: "A clinical framework for understanding the co-occurrence of neurogenetic conditions with behavioral, psychiatric, and neurodevelopmental disorders",
  totalSlides: TOTAL,
  topics: [
    "Definitions and framework",
    "Chromosomal behavioral phenotypes",
    "Monogenic psychiatric presentations",
    "Diagnostic evaluation strategies",
    "Integrated management approaches",
  ],
}));

// ── Slide 2: Prevalence and the Bidirectional Relationship ─────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Dual Diagnosis: The Rule, Not the Exception</h1>
  <div class="section-label">Definitions &amp; Framework</div>

  <div class="stats-row" style="margin-bottom:24px;">
    <div class="stat-card" style="background:${mc.light}; border-color:${mc.accent};">
      <div class="stat-label">Psychiatric Comorbidity in ID</div>
      <div class="stat-value" style="font-size:36px;">&gt;85%</div>
      <div style="font-size:16px; color:${COLORS.muted}; margin-top:4px;">have at least one psychiatric/behavioral disorder</div>
    </div>
    <div class="stat-card" style="background:${COLORS.redLight}; border-color:${COLORS.red};">
      <div class="stat-label">vs. General Population</div>
      <div class="stat-value" style="font-size:36px;">3&ndash;7&times;</div>
      <div style="font-size:16px; color:${COLORS.muted}; margin-top:4px;">higher psychiatric rates in genetic syndromes</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Bidirectional Relationship</div>
      <div class="card-body" style="font-size:19px; line-height:1.6;">
        The genetic variant causes <strong>both</strong> the neurocognitive profile AND the psychiatric predisposition &mdash; they share the same molecular mechanism.<br><br>
        <em>Example:</em> 22q11.2 deletion causes heart defects AND psychosis risk through haploinsufficiency of DGCR8, TBX1, and others.
      </div>
    </div>

    <div class="card card-amber" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Medication Considerations</div>
      <div class="card-body" style="font-size:19px; line-height:1.6;">
        Standard dosing often needs adjustment in neurogenetic populations. Cognitive side effects (anticholinergics, sedating antihistamines) are poorly tolerated. Drug-drug interactions with existing medications require careful review.
      </div>
    </div>
  </div>
`));

// ── Slide 3: Diagnostic Overshadowing & Behavior as Communication ─────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Diagnostic Overshadowing &amp; Behavior as Communication</h1>
  <div class="section-label">Core Concepts in Dual Diagnosis</div>

  <div class="two-col" style="margin-top:12px;">
    <div>
      <div class="card card-red" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">Diagnostic Overshadowing</div>
        <div class="card-body" style="font-size:19px; line-height:1.6;">
          Psychiatric symptoms are attributed to intellectual disability and dismissed: <em>&ldquo;He&rsquo;s just acting out because of his disability&rdquo;</em> &mdash; rather than recognized as a <strong>specific, treatable psychiatric condition</strong> requiring targeted intervention.
        </div>
      </div>

      <div class="highlight-box">
        <div class="label">Clinical Pearl</div>
        <div class="value" style="font-size:20px;">New behavioral changes may represent communication of an untreated medical problem &mdash; always perform a medical evaluation first</div>
      </div>
    </div>

    <div>
      <div class="card card-accent" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Behavior as Communication</div>
        <div class="card-body" style="font-size:19px; line-height:1.6;">
          In individuals with limited verbal ability, behavioral changes may be the <strong>only signal</strong> of a medical problem:
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:10px; margin-top:16px;">
        <div class="card card-amber" style="padding:16px 24px;">
          <div class="card-body" style="font-size:18px;"><strong>Aggression</strong> &rarr; Pain (dental, abdominal, musculoskeletal)</div>
        </div>
        <div class="card card-amber" style="padding:16px 24px;">
          <div class="card-body" style="font-size:18px;"><strong>Self-injury</strong> &rarr; Seizures, headache, infection (UTI, otitis)</div>
        </div>
        <div class="card card-amber" style="padding:16px 24px;">
          <div class="card-body" style="font-size:18px;"><strong>Withdrawal</strong> &rarr; Depression, mood disorder, medication side effects</div>
        </div>
      </div>
    </div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1 — Chromosomal Syndromes with Behavioral Phenotypes (slides 4-6)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 4: 22q11.2 Deletion & Down Syndrome ─────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Chromosomal Behavioral Phenotypes I</h1>
  <div class="section-label">22q11.2 Deletion &amp; Down Syndrome</div>

  <div class="two-col" style="margin-top:12px;">
    <div class="card card-red" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">22q11.2 Deletion Syndrome</div>
      <div class="card-body" style="font-size:18px; line-height:1.6;">
        <strong>Cognitive:</strong> Mild-moderate ID<br>
        <strong>ADHD:</strong> ~35%<br>
        <strong>Anxiety/OCD:</strong> Common<br><br>
        <strong style="color:${COLORS.red};">Schizophrenia: 25&ndash;30%</strong> by early adulthood &mdash; the <em>single highest genetic risk factor</em> for schizophrenia<br><br>
        Early psychiatric monitoring from adolescence is essential. Prodromal symptoms (social withdrawal, odd beliefs) must not be dismissed.
      </div>
    </div>

    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Down Syndrome (Trisomy 21)</div>
      <div class="card-body" style="font-size:18px; line-height:1.6;">
        <strong>Cognitive:</strong> Mild-moderate ID; social strength exceeds other domains<br>
        <strong>ASD:</strong> ~20%<br>
        <strong>ADHD:</strong> ~35%<br><br>
        <strong style="color:${COLORS.red};">Early-onset Alzheimer:</strong> virtually all by age 40s (APP on chr21; amyloid accumulation begins in 30s)<br><br>
        Depression in adults is underrecognized and undertreated.
      </div>
    </div>
  </div>
`));

// ── Slide 5: Williams, PWS, Angelman ────────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Chromosomal Behavioral Phenotypes II</h1>
  <div class="section-label">Williams, Prader-Willi &amp; Angelman</div>

  <div style="display:flex; flex-direction:column; gap:14px; margin-top:8px;">
    <div class="card card-violet" style="display:flex; gap:24px; padding:24px 28px;">
      <div style="flex:0 0 200px;">
        <div class="card-title" style="font-size:20px;">Williams Syndrome</div>
        <div style="font-size:16px; color:${COLORS.muted};">7q11.23 deletion (ELN)</div>
      </div>
      <div class="card-body" style="font-size:18px; flex:1;">
        Hypersocial &ldquo;cocktail party&rdquo; personality. <strong>Anxiety &amp; specific phobias &gt;80%</strong>. Hyperacusis. ADHD ~65%. Visuospatial deficit with relatively spared expressive language.
      </div>
    </div>

    <div class="card card-amber" style="display:flex; gap:24px; padding:24px 28px;">
      <div style="flex:0 0 200px;">
        <div class="card-title" style="font-size:20px;">Prader-Willi</div>
        <div style="font-size:16px; color:${COLORS.muted};">Paternal 15q11-13</div>
      </div>
      <div class="card-body" style="font-size:18px; flex:1;">
        Hyperphagia/obesity. Rigidity, tantrums, skin picking (severe OCD-like). High ASD rates in maternal UPD15 subtype. Growth hormone deficiency &mdash; treated effectively.
      </div>
    </div>

    <div class="card card-green" style="display:flex; gap:24px; padding:24px 28px;">
      <div style="flex:0 0 200px;">
        <div class="card-title" style="font-size:20px;">Angelman Syndrome</div>
        <div style="font-size:16px; color:${COLORS.muted};">Maternal UBE3A</div>
      </div>
      <div class="card-body" style="font-size:18px; flex:1;">
        Happy affect, minimal anxiety. Prominent seizures. Sleep disturbance. Water fascination. Behavioral phenotype evolves with age &mdash; adults may show increasing aggression. Communication augmented by AAC.
      </div>
    </div>
  </div>
`));

// ── Slide 6: Smith-Magenis & Recognizing Behavioral Phenotypes ──────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>The Value of Behavioral Phenotype Recognition</h1>
  <div class="section-label">Pattern Recognition Enables Proactive Care</div>

  <div class="card card-red" style="padding:28px; margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">Smith-Magenis Syndrome (RAI1 / 17p11.2)</div>
    <div class="card-body" style="font-size:19px; line-height:1.6;">
      <strong>Inverted circadian melatonin</strong>: peak secretion during the day instead of night. Treatment: morning beta-1 blocker (acebutolol) to suppress AM melatonin + high-dose evening melatonin. Self-injurious behavior (hand-wringing, onychotillomania) is a specific challenge. Routine structure and behavioral intervention are essential.
    </div>
  </div>

  <div class="two-col">
    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Why Behavioral Phenotypes Matter</div>
      <div class="card-body" style="font-size:19px; line-height:1.6;">
        Each chromosomal syndrome has a <strong>probabilistic constellation</strong> of behavioral/cognitive features linked to specific disrupted genes. These are not deterministic but represent increased probability profiles.
      </div>
    </div>

    <div class="card card-green" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Clinical Application</div>
      <div class="card-body" style="font-size:19px; line-height:1.6;">
        Recognizing the behavioral phenotype enables:<br>
        &bull; <strong>Proactive surveillance</strong> for expected comorbidities<br>
        &bull; <strong>Parent education</strong> and anticipatory guidance<br>
        &bull; <strong>Early intervention</strong> before behavioral crisis
      </div>
    </div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 2 — Monogenic Conditions with Psychiatric Phenotypes (slides 7-9)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 7: Huntington & Wilson Disease ──────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Monogenic Psychiatric Presentations I</h1>
  <div class="section-label">Huntington Disease &amp; Wilson Disease</div>

  <div class="two-col" style="margin-top:12px;">
    <div class="card card-red" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Huntington Disease</div>
      <div class="card-body" style="font-size:19px; line-height:1.6;">
        Psychiatric symptoms often <strong>precede motor signs by years to decades</strong>:<br><br>
        &bull; Irritability, depression<br>
        &bull; OCD, impulsivity<br>
        &bull; Young-onset HD (CAG &ge;60) may present as <strong>psychosis</strong><br><br>
        <strong>Key:</strong> Genetic testing in psychiatric patients with family history requires pre-test counseling due to predictive testing implications.
      </div>
    </div>

    <div class="card card-violet" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Wilson Disease</div>
      <div class="card-body" style="font-size:19px; line-height:1.6;">
        Psychiatric presentation in <strong>20&ndash;30%</strong>:<br><br>
        &bull; Depression, personality change<br>
        &bull; Psychosis, OCD symptoms<br>
        &bull; Liver disease may be absent or subclinical<br><br>
        <strong>Screen:</strong> Serum ceruloplasmin + slit-lamp exam in young adults with neuropsychiatric symptoms. <em>Treatable with chelation therapy.</em>
      </div>
    </div>
  </div>
`));

// ── Slide 8: NPC & 22q11.2 Psychosis ────────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Monogenic Psychiatric Presentations II</h1>
  <div class="section-label">Niemann-Pick C &amp; 22q11.2 Psychosis</div>

  <div class="two-col" style="margin-top:12px;">
    <div class="card card-amber" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Niemann-Pick Type C (NPC)</div>
      <div class="card-body" style="font-size:19px; line-height:1.6;">
        Psychiatric manifestations in <strong>~25%</strong> of patients &mdash; can be the <em>presenting feature</em> in adolescence/young adulthood:<br><br>
        &bull; Schizophrenia-like psychosis<br>
        &bull; Bipolar-like presentation<br><br>
        <strong>Diagnostic clue:</strong> Vertical supranuclear gaze palsy. Ataxia and dementia develop later.<br>
        <strong>Test:</strong> Filipin staining or NPC1/NPC2 sequencing.
      </div>
    </div>

    <div class="card card-red" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">22q11.2 Deletion &amp; Schizophrenia</div>
      <div class="card-body" style="font-size:19px; line-height:1.6;">
        <strong>25&ndash;30% lifetime risk</strong> of schizophrenia<br><br>
        &bull; Prodromal in adolescence: social withdrawal, odd thinking, negative symptoms<br>
        &bull; Screening for 22q11.2 deletion recommended in <strong>childhood-onset schizophrenia</strong> (yield ~5%)<br>
        &bull; Clozapine response rates similar to idiopathic schizophrenia
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Key Principle</div>
    <div class="value" style="font-size:20px;">Recognizing the neurogenetic basis of psychiatric presentations &mdash; especially psychosis in young people &mdash; is critical for correct diagnosis</div>
  </div>
`));

// ── Slide 9: PANS/PANDAS & When to Suspect a Genetic Cause ───────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>When to Suspect a Genetic Cause of Psychiatric Symptoms</h1>
  <div class="section-label">Red Flags &amp; the PANS/PANDAS Connection</div>

  <div class="two-col" style="margin-top:12px;">
    <div>
      <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">PANS/PANDAS</div>
        <div class="card-body" style="font-size:18px; line-height:1.6;">
          <strong>Pediatric Acute-onset Neuropsychiatric Syndrome:</strong><br>
          Abrupt onset OCD, tics, emotional lability, sensory issues following streptococcal/other infection. Autoimmune mechanism with genetic vulnerability factors (CNTNAP2, OCD risk loci).
        </div>
      </div>

      <div class="card card-green" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Treatable Conditions to Screen For</div>
        <div class="card-body" style="font-size:18px; line-height:1.6;">
          &bull; <strong>Wilson disease</strong> &mdash; ceruloplasmin, slit-lamp<br>
          &bull; <strong>NPC</strong> &mdash; vertical gaze palsy + filipin<br>
          &bull; <strong>Huntington</strong> &mdash; if family history (counseling first)<br>
          &bull; <strong>22q11.2</strong> &mdash; in childhood-onset psychosis
        </div>
      </div>
    </div>

    <div>
      <div class="card card-red" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Red Flags for Genetic Etiology</div>
        <div class="card-body">
          <ul style="list-style:none; padding:0;">
            <li style="font-size:19px; padding:8px 0; border-bottom:1px solid ${COLORS.border};">&#x2022; Psychosis onset before age 18</li>
            <li style="font-size:19px; padding:8px 0; border-bottom:1px solid ${COLORS.border};">&#x2022; Treatment-resistant OCD or anxiety</li>
            <li style="font-size:19px; padding:8px 0; border-bottom:1px solid ${COLORS.border};">&#x2022; Psychiatric symptoms + movement disorder</li>
            <li style="font-size:19px; padding:8px 0; border-bottom:1px solid ${COLORS.border};">&#x2022; Early-onset cognitive decline</li>
            <li style="font-size:19px; padding:8px 0; border-bottom:1px solid ${COLORS.border};">&#x2022; Psychiatric + liver or renal disease</li>
            <li style="font-size:19px; padding:8px 0;">&#x2022; Family history of neurodegeneration</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 3 — Diagnostic Evaluation in Dual Diagnosis (slides 10-12)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 10: Psychiatric Assessment in ID ──────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Psychiatric Assessment in Intellectual Disability</h1>
  <div class="section-label">Adapted Tools &amp; Genetic Workup</div>

  <div class="two-col" style="margin-top:12px;">
    <div>
      <div class="card card-accent" style="padding:28px; margin-bottom:16px;">
        <div class="card-title" style="font-size:22px;">Adapted Assessment Tools</div>
        <div class="card-body" style="font-size:18px; line-height:1.6;">
          DSM-5 criteria apply but verbal adaptations needed:<br><br>
          &bull; <strong>ABC</strong> &mdash; Aberrant Behavior Checklist<br>
          &bull; <strong>DBC</strong> &mdash; Developmental Behavior Checklist<br>
          &bull; <strong>PAS-ADD</strong> &mdash; Psychiatric Assessment Schedule for Adults with Developmental Disabilities
        </div>
      </div>
    </div>

    <div>
      <div class="card card-violet" style="padding:28px;">
        <div class="card-title" style="font-size:22px;">Genetic Workup for Psychiatric Presentation</div>
        <div class="card-body" style="font-size:18px; line-height:1.6;">
          &bull; <strong>CMA</strong> in ASD/ID (yield 10&ndash;15%)<br>
          &bull; <strong>22q11.2 FISH/MLPA</strong> in childhood-onset schizophrenia or conotruncal heart defect + psychosis<br>
          &bull; <strong>Wilson workup</strong> in young adult with psychiatric + movement/liver symptoms<br>
          &bull; <strong>Huntington repeat testing</strong> if appropriate family history
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 11: EEG, MRI, and Sleep Assessment ─────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Ancillary Testing: EEG, MRI &amp; Sleep</h1>
  <div class="section-label">Excluding Medical Causes of Behavioral Change</div>

  <div style="display:flex; flex-direction:column; gap:14px; margin-top:12px;">
    <div class="card card-red" style="display:flex; gap:24px; padding:24px 28px;">
      <div class="number-circle" style="background:${COLORS.red};">1</div>
      <div style="flex:1;">
        <div class="card-title" style="font-size:21px;">EEG &mdash; Epilepsy Masquerading as Behavior</div>
        <div class="card-body" style="font-size:18px;">Epilepsy is common in neurogenetic syndromes and can manifest as behavioral change, aggression, or apparent psychiatric symptoms. <strong>Always consider and exclude seizures.</strong></div>
      </div>
    </div>

    <div class="card card-accent" style="display:flex; gap:24px; padding:24px 28px;">
      <div class="number-circle" style="background:${mc.accent};">2</div>
      <div style="flex:1;">
        <div class="card-title" style="font-size:21px;">Brain MRI &mdash; Structural and Metabolic Clues</div>
        <div class="card-body" style="font-size:18px;">White matter changes (metabolic disease), basal ganglia lesions (Wilson, NPC), or cortical abnormalities may reveal the underlying neurogenetic cause of psychiatric presentation.</div>
      </div>
    </div>

    <div class="card card-amber" style="display:flex; gap:24px; padding:24px 28px;">
      <div class="number-circle" style="background:${COLORS.amber};">3</div>
      <div style="flex:1;">
        <div class="card-title" style="font-size:21px;">Sleep Assessment &mdash; Nearly Universal in Genetic Syndromes</div>
        <div class="card-body" style="font-size:18px;">Angelman, PWS, MECP2 &mdash; all have prominent sleep disturbance. <strong>Smith-Magenis:</strong> circadian reversal. Untreated sleep disorder worsens behavioral and psychiatric symptoms. Polysomnography when clinically indicated.</div>
      </div>
    </div>
  </div>
`));

// ── Slide 12: Multidisciplinary Team ─────────────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>The Multidisciplinary Dual Diagnosis Team</h1>
  <div class="section-label">No Single Provider Can Address All Dimensions</div>

  <div class="three-col" style="margin-top:16px;">
    <div class="card card-accent" style="padding:24px;">
      <div class="card-title" style="font-size:20px;">Neurogenetics</div>
      <div class="card-body" style="font-size:17px;">Primary genetic diagnosis, genomic testing strategy, variant interpretation, family counseling</div>
    </div>
    <div class="card card-red" style="padding:24px;">
      <div class="card-title" style="font-size:20px;">Psychiatry</div>
      <div class="card-body" style="font-size:17px;">Psychiatric assessment with adapted tools, medication management adjusted for genetic context</div>
    </div>
    <div class="card card-violet" style="padding:24px;">
      <div class="card-title" style="font-size:20px;">Neuropsychology</div>
      <div class="card-body" style="font-size:17px;">Cognitive profiling, adaptive behavior assessment, monitoring for decline</div>
    </div>
  </div>

  <div class="three-col" style="margin-top:16px;">
    <div class="card card-green" style="padding:24px;">
      <div class="card-title" style="font-size:20px;">Behavioral Therapy</div>
      <div class="card-body" style="font-size:17px;">BCBA for ABA in ASD/ID, positive behavior support (PBS), functional behavioral assessment</div>
    </div>
    <div class="card card-amber" style="padding:24px;">
      <div class="card-title" style="font-size:20px;">SLP / AAC</div>
      <div class="card-body" style="font-size:17px;">Augmentative &amp; alternative communication reduces frustration-based aggression</div>
    </div>
    <div class="card card-blue" style="padding:24px;">
      <div class="card-title" style="font-size:20px;">Occupational Therapy</div>
      <div class="card-body" style="font-size:17px;">Sensory integration, adaptive skills, environmental modifications for daily functioning</div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:20px;">
    <div class="label">Key Principle</div>
    <div class="value" style="font-size:20px;">Each psychiatric comorbidity requires separate, independent management &mdash; do not subsume all symptoms under the genetic diagnosis</div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 4 — Integrated Management Strategies (slides 13-15)
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 13: Pharmacotherapy in Neurogenetic Conditions ──────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Pharmacotherapy in Neurogenetic Dual Diagnosis</h1>
  <div class="section-label">Syndrome-Specific Medication Strategies</div>

  <table style="margin-top:12px;">
    <thead>
      <tr>
        <th style="width:22%;">Syndrome</th>
        <th style="width:22%;">Target Symptom</th>
        <th style="width:28%;">Treatment</th>
        <th style="width:28%;">Cautions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>22q11.2DS</td>
        <td>Psychosis</td>
        <td style="font-size:16px;">Antipsychotics at <strong>lower doses</strong>; clozapine for treatment-resistant</td>
        <td style="font-size:16px;">Metabolic monitoring essential (baseline metabolic risk)</td>
      </tr>
      <tr>
        <td>22q11.2DS</td>
        <td>ADHD</td>
        <td style="font-size:16px;">Methylphenidate/amphetamines first-line</td>
        <td style="font-size:16px;">Monitor for psychosis emergence</td>
      </tr>
      <tr>
        <td>Williams</td>
        <td>Anxiety/phobias</td>
        <td style="font-size:16px;">SSRIs (sertraline, fluoxetine) + behavioral therapy</td>
        <td style="font-size:16px;">Avoid high-dose daily benzodiazepines</td>
      </tr>
      <tr>
        <td>Fragile X</td>
        <td>ADHD</td>
        <td style="font-size:16px;">Methylphenidate effective (weaker RCT evidence)</td>
        <td style="font-size:16px;">Not contraindicated; monitor carefully</td>
      </tr>
      <tr>
        <td>Smith-Magenis</td>
        <td>Sleep/behavior</td>
        <td style="font-size:16px;">AM acebutolol + PM melatonin</td>
        <td style="font-size:16px;">Inverted circadian melatonin is the core defect</td>
      </tr>
    </tbody>
  </table>
`));

// ── Slide 14: Behavioral Interventions & Biopsychosocial Framework ─────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>Behavioral Interventions &amp; Biopsychosocial Framework</h1>
  <div class="section-label">The Three Pillars of Dual Diagnosis Management</div>

  <div class="three-col" style="margin-top:16px;">
    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Behavioral</div>
      <div class="card-body" style="font-size:18px; line-height:1.6;">
        <strong>ABA</strong> &mdash; evidence-based for ASD-associated behaviors regardless of genetic etiology<br><br>
        <strong>PBS</strong> &mdash; Positive Behavior Support for problem behaviors<br><br>
        <strong>AAC training</strong> &mdash; communication reduces frustration-based aggression
      </div>
    </div>

    <div class="card card-green" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Pharmacological</div>
      <div class="card-body" style="font-size:18px; line-height:1.6;">
        Syndrome-specific medication choices<br><br>
        Lower starting doses in neurogenetic populations<br><br>
        Close monitoring for cognitive side effects and drug interactions with existing medications
      </div>
    </div>

    <div class="card card-violet" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Environmental</div>
      <div class="card-body" style="font-size:18px; line-height:1.6;">
        Routine structure and predictability<br><br>
        Sensory environment optimization<br><br>
        Family support, respite services, and caregiver education
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:20px;">
    <div class="label">Guiding Principle</div>
    <div class="value" style="font-size:20px;">Integrate behavioral, pharmacological, and environmental strategies &mdash; no single approach is sufficient for dual diagnosis management</div>
  </div>
`));

// ── Slide 15: Key Takeaways ──────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 15, TOTAL, [
  {
    title: "Dual diagnosis is the rule, not the exception",
    body: ">85% of individuals with intellectual disability have psychiatric comorbidity. Diagnostic overshadowing delays recognition and treatment.",
  },
  {
    title: "Know the chromosomal behavioral phenotypes",
    body: "22q11.2 \u2192 psychosis (25\u201330%), Williams \u2192 anxiety (>80%), Smith-Magenis \u2192 inverted circadian melatonin, Down \u2192 early Alzheimer.",
  },
  {
    title: "Screen for treatable neurogenetic causes of psychiatric symptoms",
    body: "Wilson disease, NPC, Huntington, and 22q11.2 deletion all have specific treatments. Early recognition changes outcomes.",
  },
  {
    title: "Use adapted psychiatric tools and a multidisciplinary team",
    body: "ABC, DBC, PAS-ADD for assessment. No single provider can address all dimensions of dual diagnosis.",
  },
  {
    title: "Biopsychosocial management integrates three pillars",
    body: "Behavioral interventions (ABA, PBS), syndrome-specific pharmacotherapy, and environmental modifications together optimize outcomes.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides("dual-diagnosis", slides);
