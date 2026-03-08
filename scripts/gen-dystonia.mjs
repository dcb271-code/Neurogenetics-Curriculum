/**
 * scripts/gen-dystonia.mjs
 *
 * Generates 14 clean, readable slides for the Dystonia (Movement Disorders 1) module.
 * Covers monogenic dystonia classification, IEMs, exome sequencing, and ATP1A3 disorders.
 *
 * Run: node scripts/gen-dystonia.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "dystonia";
const mc = MODULE_COLORS[MOD];
const TOTAL = 14;

const slides = [];

// ── Slide 1: Title ──────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Dystonia",
  subtitle: "Movement Disorders 1",
  totalSlides: TOTAL,
  topics: [
    "Monogenic dystonia classification",
    "Red flags for inborn errors of metabolism",
    "Exome sequencing: utility & limitations",
    "ATP1A3 phenotype spectrum",
    "Genotype-phenotype correlations",
  ],
}));

// ── Slide 2: Learning Objectives ────────────────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Learning Objectives</h1>
  <div class="section-label">What You Will Learn</div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${mc.accent};">1</div>
    <div>
      <strong style="font-size:22px;">Differential Diagnosis of Monogenic Dystonia</strong><br>
      <span style="font-size:19px; color:${COLORS.body};">Recognize the major categories and key genes underlying inherited dystonia syndromes</span>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.violet};">2</div>
    <div>
      <strong style="font-size:22px;">Autosomal Dominant Inheritance Patterns</strong><br>
      <span style="font-size:19px; color:${COLORS.body};">Identify AD features in family pedigrees and understand variable expressivity and penetrance</span>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.green};">3</div>
    <div>
      <strong style="font-size:22px;">Exome Sequencing: Utility &amp; Limitations</strong><br>
      <span style="font-size:19px; color:${COLORS.body};">Understand what exome sequencing captures and what it misses in clinical diagnostics</span>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.amber};">4</div>
    <div>
      <strong style="font-size:22px;">Genotype&ndash;Phenotype Correlations in ATP1A3</strong><br>
      <span style="font-size:19px; color:${COLORS.body};">Map specific ATP1A3 variants to distinct clinical phenotypes across the disease spectrum</span>
    </div>
  </div>
`));

// ── Slide 3: Monogenic Dystonia Classification ──────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Monogenic Dystonia Classification</h1>
  <div class="section-label">Phenotype Categories &amp; Key Genes</div>

  <table>
    <thead>
      <tr>
        <th style="width:25%;">Phenotype</th>
        <th style="width:30%;">Key Genes</th>
        <th style="width:20%;">MOI</th>
        <th style="width:25%;">Designation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Isolated Dystonia</td>
        <td>TOR1A, THAP1, GNAL</td>
        <td>AD</td>
        <td>DYT1, DYT6, DYT25</td>
      </tr>
      <tr>
        <td>Dystonia + Parkinsonism</td>
        <td>ATP1A3, GCH1, TH</td>
        <td>AD / AR</td>
        <td>DYT12, DYT5a, DYT5b</td>
      </tr>
      <tr>
        <td>Dystonia + Myoclonus</td>
        <td>SGCE, KCTD17</td>
        <td>AD</td>
        <td>DYT11, DYT26</td>
      </tr>
      <tr>
        <td>Dystonia + Dyskinesia</td>
        <td>PRRT2, SLC2A1, ADCY5</td>
        <td>AD</td>
        <td>Various (PKD, PED)</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:22px;">Classification by associated features (parkinsonism, myoclonus, dyskinesia) guides targeted genetic testing</div>
  </div>
`));

// ── Slide 4: Red Flags for IEM ──────────────────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Red Flags for IEM</h1>
  <div class="section-label">When Movement Disorders Suggest Inborn Errors of Metabolism</div>

  <div style="display:flex; gap:16px; flex-wrap:wrap;">

    <div class="card card-red" style="flex:1; min-width:280px;">
      <div class="card-title">Diffuse Clinical Picture</div>
      <div class="card-body" style="font-size:18px;">Multi-system involvement beyond the nervous system (liver, eyes, skin)</div>
    </div>

    <div class="card card-amber" style="flex:1; min-width:280px;">
      <div class="card-title">Combined Movement Disorders</div>
      <div class="card-body" style="font-size:18px;">Coexisting dystonia, chorea, ataxia, and/or parkinsonism in the same patient</div>
    </div>

    <div class="card card-violet" style="flex:1; min-width:280px;">
      <div class="card-title">Encephalopathy with Illness</div>
      <div class="card-body" style="font-size:18px;">Metabolic decompensation triggered by fasting, fever, or intercurrent infection</div>
    </div>

  </div>

  <div style="display:flex; gap:16px; margin-top:4px;">

    <div class="card card-accent" style="flex:1;">
      <div class="card-title">Distinct MRI Findings</div>
      <div class="card-body" style="font-size:18px;">Bilateral basal ganglia signal changes, white matter abnormalities, or specific patterns</div>
    </div>

    <div class="card card-green" style="flex:1;">
      <div class="card-title">Progressive &amp; Refractory Course</div>
      <div class="card-body" style="font-size:18px;">Worsening despite standard treatment; failure of L-dopa or anticholinergics</div>
    </div>

  </div>
`));

// ── Slide 5: IEMs & Movement Disorders ──────────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>IEMs &amp; Movement Disorders</h1>
  <div class="section-label">Metabolic Categories That Cause Dystonia</div>

  <table>
    <thead>
      <tr>
        <th style="width:30%;">IEM Category</th>
        <th style="width:35%;">Example Conditions</th>
        <th style="width:35%;">Movement Phenotype</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Nitrogen Metabolism</td>
        <td>Glutaric aciduria type 1</td>
        <td>Acute dystonia after encephalopathic crisis</td>
      </tr>
      <tr>
        <td>Vitamin Disorders</td>
        <td>Biotin-thiamine responsive basal ganglia disease</td>
        <td>Dystonia, encephalopathy (treatable)</td>
      </tr>
      <tr>
        <td>Carbohydrate Metabolism</td>
        <td>GLUT1 deficiency (SLC2A1)</td>
        <td>Paroxysmal exercise-induced dystonia</td>
      </tr>
      <tr>
        <td>Mitochondrial</td>
        <td>Leigh syndrome, MELAS</td>
        <td>Progressive dystonia with basal ganglia lesions</td>
      </tr>
      <tr>
        <td>Storage Disorders</td>
        <td>Niemann-Pick type C, GM1/GM2</td>
        <td>Progressive dystonia with visceral involvement</td>
      </tr>
      <tr>
        <td>Glycosylation (CDG)</td>
        <td>PMM2-CDG</td>
        <td>Cerebellar ataxia with dystonic features</td>
      </tr>
    </tbody>
  </table>
`, `
  tbody td { font-size:16px; padding:12px 18px; }
  thead th { font-size:15px; padding:12px 18px; }
`));

// ── Slide 6: Case Presentation ──────────────────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Case Presentation</h1>
  <div class="section-label">Clinical Scenario</div>

  <div class="card card-accent" style="margin-bottom:22px;">
    <div class="card-title" style="font-size:24px;">11-Year-Old Female</div>
    <div class="card-body" style="font-size:20px;">
      Abrupt onset of generalized dystonia following a febrile illness.<br>
      Bulbar involvement with dysarthria and dysphagia noted within hours of onset.
    </div>
  </div>

  <div class="two-col">
    <div>
      <div class="card card-rose" style="margin-bottom:16px;">
        <div class="card-title">Key Clinical Features</div>
        <div class="card-body" style="font-size:18px;">
          &bull; Abrupt onset (hours to days)<br>
          &bull; Rostro-caudal gradient (bulbar &gt; limbs)<br>
          &bull; Triggered by fever / physiologic stress<br>
          &bull; Minimal response to L-dopa
        </div>
      </div>
    </div>

    <div>
      <div class="card card-violet" style="margin-bottom:16px;">
        <div class="card-title">Family History</div>
        <div class="card-body" style="font-size:18px;">
          &bull; Autosomal dominant pattern<br>
          &bull; <strong>3 generations</strong> affected<br>
          &bull; Variable severity within family<br>
          &bull; Grandmother: mild hand dystonia<br>
          &bull; Father: episodic weakness
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 7: What is Exome Sequencing? ──────────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>What is Exome Sequencing?</h1>
  <div class="section-label">Next-Generation Sequencing of Protein-Coding Regions</div>

  <div class="two-col">
    <div>
      <div class="stats-row" style="flex-direction:column; gap:12px;">
        <div class="stat-card" style="background:${mc.light}; border-color:${mc.accent};">
          <div class="stat-label">Genome Targeted</div>
          <div class="stat-value">&lt; 2%</div>
        </div>
        <div class="stat-card" style="background:${COLORS.greenLight}; border-color:${COLORS.green};">
          <div class="stat-label">Disease Variants Captured</div>
          <div class="stat-value">~85%</div>
        </div>
        <div class="stat-card" style="background:${COLORS.blueLight}; border-color:${COLORS.blue};">
          <div class="stat-label">Genes Sequenced</div>
          <div class="stat-value">~20,000</div>
        </div>
      </div>
    </div>

    <div>
      <h3>How It Works</h3>
      <ul class="bullet-list">
        <li>DNA extracted and fragmented</li>
        <li>Exon-targeting probes hybridize to coding regions</li>
        <li>Massively parallel sequencing (NGS)</li>
        <li>Variants called against reference genome</li>
        <li>Filtered by phenotype-guided gene panels</li>
      </ul>
    </div>
  </div>
`));

// ── Slide 8: Exome Limitations ──────────────────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Exome Sequencing Limitations</h1>
  <div class="section-label">What Exome Cannot Reliably Detect</div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">

    <div class="card card-red">
      <div class="card-title" style="font-size:20px;">Phenotypic Filtering Bias</div>
      <div class="card-body" style="font-size:17px;">Variants in unexpected genes may be filtered out if phenotype description is incomplete</div>
    </div>

    <div class="card card-amber">
      <div class="card-title" style="font-size:20px;">Coverage Depth Gaps</div>
      <div class="card-body" style="font-size:17px;">GC-rich regions and homologous sequences may have low or zero coverage</div>
    </div>

    <div class="card card-violet">
      <div class="card-title" style="font-size:20px;">Deep Intronic Variants</div>
      <div class="card-body" style="font-size:17px;">Regulatory and deep intronic splicing variants outside capture regions are missed</div>
    </div>

    <div class="card card-accent">
      <div class="card-title" style="font-size:20px;">Microdeletions / CNVs</div>
      <div class="card-body" style="font-size:17px;">Large structural variants and copy number changes require separate analysis (CMA or MLPA)</div>
    </div>

    <div class="card card-rose">
      <div class="card-title" style="font-size:20px;">Trinucleotide Repeat Expansions</div>
      <div class="card-body" style="font-size:17px;">Short-read sequencing cannot size repeat expansions (e.g., SCA, Huntington disease)</div>
    </div>

    <div class="card card-green">
      <div class="card-title" style="font-size:20px;">Methylation &amp; mtDNA</div>
      <div class="card-body" style="font-size:17px;">Epigenetic changes and mitochondrial genome variants are not captured by standard exome</div>
    </div>

  </div>
`));

// ── Slide 9: Genetic Results ────────────────────────────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Genetic Results</h1>
  <div class="section-label">Exome Sequencing Findings</div>

  <div class="highlight-box" style="margin-bottom:24px;">
    <div class="label">Identified Variant</div>
    <div class="value" style="font-size:26px;">ATP1A3 &nbsp;c.1877C&gt;T &nbsp;p.(Thr626Met)</div>
  </div>

  <div class="two-col">
    <div>
      <div class="card card-red" style="margin-bottom:14px;">
        <div class="card-title">Classification</div>
        <div class="card-body" style="font-size:19px;">
          <strong>Pathogenic</strong><br>
          Absent from gnomAD &bull; Segregates with disease in family &bull; Published in multiple affected families
        </div>
      </div>

      <div class="card card-accent">
        <div class="card-title">Gene Function</div>
        <div class="card-body" style="font-size:19px;">
          ATP1A3 encodes the &alpha;3 subunit of Na<sup>+</sup>/K<sup>+</sup>-ATPase, highly expressed in neurons
        </div>
      </div>
    </div>

    <div>
      <div class="card card-violet" style="margin-bottom:14px;">
        <div class="card-title">Inheritance</div>
        <div class="card-body" style="font-size:19px;">
          Autosomal dominant<br>
          Present in affected father and grandmother
        </div>
      </div>

      <div class="card card-amber">
        <div class="card-title">Associated Phenotype</div>
        <div class="card-body" style="font-size:19px;">
          <strong>DYT12</strong> &mdash; Rapid-onset Dystonia Parkinsonism (RDP)
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 10: Rapid-Onset Dystonia Parkinsonism (RDP) ───────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Rapid-Onset Dystonia Parkinsonism</h1>
  <div class="section-label">DYT12 &mdash; ATP1A3</div>

  <div class="two-col">
    <div>
      <h3>Clinical Features</h3>
      <ul class="bullet-list">
        <li>Abrupt onset over hours to weeks</li>
        <li>Rostro-caudal gradient: bulbar &gt; arms &gt; legs</li>
        <li>Prominent dysarthria and dysphagia</li>
        <li>Parkinsonism (bradykinesia, postural instability)</li>
        <li>Stabilization after acute episode</li>
      </ul>
    </div>

    <div>
      <div class="card card-red" style="margin-bottom:16px;">
        <div class="card-title">Triggers</div>
        <div class="card-body" style="font-size:18px;">
          Physiologic stress, fever, prolonged exercise, emotional stress, alcohol, childbirth
        </div>
      </div>

      <div class="card card-amber" style="margin-bottom:16px;">
        <div class="card-title">Treatment Response</div>
        <div class="card-body" style="font-size:18px;">
          Minimal to no response to L-dopa<br>
          Supportive care and trigger avoidance
        </div>
      </div>

      <div class="card card-accent">
        <div class="card-title">Onset Age</div>
        <div class="card-body" style="font-size:18px;">
          Typically childhood through young adulthood (4&ndash;55 years)
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 11: Alternating Hemiplegia of Childhood (AHC) ────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Alternating Hemiplegia of Childhood</h1>
  <div class="section-label">AHC &mdash; ATP1A3</div>

  <div class="two-col">
    <div>
      <h3>Diagnostic Criteria</h3>
      <ul class="bullet-list">
        <li>Onset before 18 months of age</li>
        <li>Recurrent hemiplegic attacks</li>
        <li>Bilateral or alternating episodes</li>
        <li>Episodes resolve with sleep</li>
        <li>Progressive developmental impairment</li>
      </ul>

      <div class="card card-rose" style="margin-top:16px;">
        <div class="card-title">Genetics</div>
        <div class="card-body" style="font-size:18px;">
          ~75% of cases carry ATP1A3 variants<br>
          Most are <strong>de novo</strong> (unlike RDP)
        </div>
      </div>
    </div>

    <div>
      <div class="card card-accent" style="margin-bottom:14px;">
        <div class="card-title">Paroxysmal Events</div>
        <div class="card-body" style="font-size:18px;">
          &bull; Hemiplegic episodes (minutes to days)<br>
          &bull; Tonic or dystonic spells<br>
          &bull; Oculomotor abnormalities (nystagmus)<br>
          &bull; Autonomic dysfunction
        </div>
      </div>

      <div class="card card-amber" style="margin-bottom:14px;">
        <div class="card-title">Interictal Findings</div>
        <div class="card-body" style="font-size:18px;">
          Cognitive impairment, ataxia, choreoathetosis, and epilepsy between episodes
        </div>
      </div>

      <div class="card card-violet">
        <div class="card-title">Key Distinction from RDP</div>
        <div class="card-body" style="font-size:18px;">
          AHC: episodic, early onset, de novo<br>
          RDP: acute-onset, later, often familial
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 12: ATP1A3 Phenotype Spectrum ─────────────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>ATP1A3 Phenotype Spectrum</h1>
  <div class="section-label">Overlapping Clinical Syndromes</div>

  <div style="display:flex; gap:12px; margin-bottom:24px;">
    <div style="flex:1; background:${mc.light}; border-radius:12px; padding:20px; text-align:center; border:2px solid ${mc.accent};">
      <div style="font-size:28px; font-weight:800; color:${mc.dark};">RDP</div>
      <div style="font-size:15px; color:${COLORS.muted}; margin-top:4px;">Rapid-onset Dystonia<br>Parkinsonism</div>
    </div>
    <div style="flex:1; background:${COLORS.amberLight}; border-radius:12px; padding:20px; text-align:center; border:2px solid ${COLORS.amber};">
      <div style="font-size:28px; font-weight:800; color:#92400e;">AHC</div>
      <div style="font-size:15px; color:${COLORS.muted}; margin-top:4px;">Alternating Hemiplegia<br>of Childhood</div>
    </div>
    <div style="flex:1; background:${COLORS.violetLight}; border-radius:12px; padding:20px; text-align:center; border:2px solid ${COLORS.violet};">
      <div style="font-size:28px; font-weight:800; color:${COLORS.violet};">CAPOS</div>
      <div style="font-size:15px; color:${COLORS.muted}; margin-top:4px;">Cerebellar ataxia,<br>Areflexia, Pes cavus,<br>Optic atrophy, SNHL</div>
    </div>
    <div style="flex:1; background:${COLORS.blueLight}; border-radius:12px; padding:20px; text-align:center; border:2px solid ${COLORS.blue};">
      <div style="font-size:28px; font-weight:800; color:#1e40af;">D-DEMO</div>
      <div style="font-size:15px; color:${COLORS.muted}; margin-top:4px;">Dystonia, Dysmorphism,<br>Encephalopathy with<br>MRI abnormalities</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">Na<sup>+</sup>/K<sup>+</sup>-ATPase Function</div>
      <div class="card-body" style="font-size:18px;">
        Maintains electrochemical gradient across neuronal membranes. Dysfunction leads to impaired neuronal excitability and ion homeostasis.
      </div>
    </div>

    <div class="card card-rose">
      <div class="card-title">Phenotypic Overlap</div>
      <div class="card-body" style="font-size:18px;">
        Features can overlap between syndromes. Some patients show intermediate or evolving phenotypes over time, including polymicrogyria.
      </div>
    </div>
  </div>
`));

// ── Slide 13: Genotype-Phenotype Correlation ────────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Genotype&ndash;Phenotype Correlation</h1>
  <div class="section-label">Specific ATP1A3 Variants &amp; Clinical Syndromes</div>

  <table>
    <thead>
      <tr>
        <th style="width:28%;">Variant</th>
        <th style="width:28%;">Primary Phenotype</th>
        <th style="width:44%;">Key Features</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>p.Thr626Met</td>
        <td>RDP (DYT12)</td>
        <td>Abrupt dystonia-parkinsonism, bulbar predominance</td>
      </tr>
      <tr>
        <td>p.Glu815Lys</td>
        <td>AHC (severe)</td>
        <td>Early onset, severe hemiplegic episodes, epilepsy</td>
      </tr>
      <tr>
        <td>p.Asp801Asn</td>
        <td>AHC (common)</td>
        <td>Most frequent AHC variant; variable severity</td>
      </tr>
      <tr>
        <td>p.Glu818Lys</td>
        <td>CAPOS</td>
        <td>Febrile episodes of ataxia, optic atrophy, SNHL</td>
      </tr>
      <tr>
        <td>p.Arg756His</td>
        <td>D-DEMO / AHC</td>
        <td>Polymicrogyria, dystonia, encephalopathy</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box">
    <div class="label">Clinical Implication</div>
    <div class="value" style="font-size:22px;">Identifying the specific ATP1A3 variant can predict clinical course, guide prognosis, and inform family counseling</div>
  </div>
`));

// ── Slide 14: Key Takeaways ─────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 14, TOTAL, [
  {
    title: "Monogenic dystonia has distinct subgroups",
    body: "Classification by associated features (isolated, +parkinsonism, +myoclonus, +dyskinesia) guides differential diagnosis and genetic testing strategy.",
  },
  {
    title: "AD inheritance with variable expressivity",
    body: "Many dystonia genes are autosomal dominant with reduced penetrance. Multi-generational pedigree analysis is essential.",
  },
  {
    title: "Exome sequencing: powerful but imperfect",
    body: "Captures ~85% of disease-causing variants but misses repeats, deep intronic variants, CNVs, methylation changes, and mtDNA.",
  },
  {
    title: "ATP1A3 causes a spectrum of disorders",
    body: "RDP, AHC, CAPOS, and D-DEMO are all caused by ATP1A3 variants affecting Na\u207A/K\u207A-ATPase function in neurons.",
  },
  {
    title: "Genotype predicts phenotype in ATP1A3",
    body: "Specific missense variants (e.g., p.Glu818Lys \u2192 CAPOS, p.Asp801Asn \u2192 AHC) reliably predict clinical syndrome and prognosis.",
  },
]));

// ── Render ───────────────────────────────────────────────────────────────────
await renderSlides("dystonia", slides);
