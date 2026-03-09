/**
 * scripts/gen-neuroimaging.mjs
 *
 * Generates 10 slides for the Neuroimaging Pattern Recognition module (5 sections x 2).
 * Uses puppeteer HTML rendering via the shared design system.
 *
 * Run: node scripts/gen-neuroimaging.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "neuroimaging";
const mc = MODULE_COLORS[MOD];
const TOTAL = 10;

const slides = [];

// ── Section 0: Title ────────────────────────────────────────────────────────

// Slide 1: Title
slides.push(titleSlideHTML(MOD, {
  title: "Neuroimaging<br>Pattern Recognition",
  subtitle: "MRI signatures that narrow the differential before genetic testing",
  totalSlides: TOTAL,
  topics: [
    "Basal ganglia &amp; deep gray matter patterns",
    "White matter / leukodystrophy patterns",
    "Malformations of cortical development",
    "Posterior fossa &amp; cerebellar patterns",
    "Stroke-like &amp; vascular patterns",
  ],
}));

// ── Section 1: Basal Ganglia & Deep Gray Matter Patterns ────────────────────

// Slide 2: Basal Ganglia Table
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Basal Ganglia &amp; Deep Gray Matter</h1>
  <div class="section-label">Section 1 of 5</div>

  <table>
    <thead>
      <tr>
        <th>Condition</th>
        <th>Key MRI Finding</th>
        <th>Gene(s)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Leigh Syndrome</td>
        <td>Bilateral symmetric BG &amp; brainstem T2 hyperintensity; elevated lactate on MRS</td>
        <td style="font-weight:700; color:${COLORS.red};">MT-ATP6, SURF1, NDUF genes</td>
      </tr>
      <tr>
        <td>NBIA / PANK2</td>
        <td>&ldquo;Eye of the tiger&rdquo; sign &mdash; central T2 hyperintensity in GP</td>
        <td style="font-weight:700; color:${COLORS.amber};">PANK2</td>
      </tr>
      <tr>
        <td>Wilson Disease</td>
        <td>&ldquo;Face of the giant panda&rdquo; sign in midbrain; always check ceruloplasmin</td>
        <td style="font-weight:700; color:${COLORS.violet};">ATP7B</td>
      </tr>
      <tr>
        <td>Glutaric Aciduria 1</td>
        <td>Wide Sylvian fissures + bilateral striatal necrosis during crises</td>
        <td style="font-weight:700; color:${COLORS.teal};">GCDH</td>
      </tr>
      <tr>
        <td>Biotin-Thiamine BG Disease</td>
        <td>Bilateral caudate/putaminal necrosis; partially reversible with treatment</td>
        <td style="font-weight:700; color:${COLORS.blue};">SLC19A3</td>
      </tr>
    </tbody>
  </table>

  <div class="card card-accent" style="margin-top:8px;">
    <div class="card-title">Red Flags for Metabolic BG Disease</div>
    <div class="card-body">Bilateral symmetric T2 signal, progressive or episodic course with metabolic crises, elevated lactate or specific organic acid profiles. Asymmetric/acute onset suggests structural or toxic causes.</div>
  </div>
`));

// ── Section 2: White Matter Patterns (Leukodystrophies) ─────────────────────

// Slide 3: White Matter Table
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>White Matter / Leukodystrophy Patterns</h1>
  <div class="section-label">Section 2 of 5</div>

  <table>
    <thead>
      <tr>
        <th>Condition</th>
        <th>MRI Pattern</th>
        <th>Gene</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>MLD</td>
        <td>Periventricular WM with &ldquo;tigroid&rdquo; pattern of sparing around vessels</td>
        <td style="font-weight:700; color:${COLORS.red};">ARSA</td>
      </tr>
      <tr>
        <td>Krabbe</td>
        <td>Optic radiations &amp; corticospinal tracts; elevated CSF protein</td>
        <td style="font-weight:700; color:${COLORS.amber};">GALC</td>
      </tr>
      <tr>
        <td>X-ALD</td>
        <td>Posterior periventricular WM with contrast-enhancing leading edge</td>
        <td style="font-weight:700; color:${COLORS.violet};">ABCD1</td>
      </tr>
      <tr>
        <td>Alexander</td>
        <td>Frontal-predominant WM disease, macrocephaly, periventricular enhancement</td>
        <td style="font-weight:700; color:${COLORS.teal};">GFAP</td>
      </tr>
      <tr>
        <td>Vanishing WM</td>
        <td>WM rarefaction approaching CSF signal on FLAIR; episodic deterioration</td>
        <td style="font-weight:700; color:${COLORS.blue};">EIF2B1&ndash;5</td>
      </tr>
    </tbody>
  </table>

  <div class="card card-green" style="margin-top:8px;">
    <div class="card-title">Key Distinction</div>
    <div class="card-body"><strong>Posterior-predominant</strong> (MLD, Krabbe, X-ALD) vs <strong>frontal-predominant</strong> (Alexander) &mdash; distribution pattern is the single most useful initial discriminator.</div>
  </div>
`));

// Slide 4: MRS & Leukodystrophy Detail
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>MR Spectroscopy in Leukodystrophies</h1>
  <div class="section-label">Section 2 of 5 &mdash; Metabolic Signatures</div>

  <table style="margin-bottom:20px;">
    <thead>
      <tr>
        <th>Metabolite Abnormality</th>
        <th>Suggests</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="color:${COLORS.red};">Elevated lactate (1.33 ppm)</td>
        <td>Mitochondrial disease</td>
      </tr>
      <tr>
        <td style="color:${COLORS.amber};">Elevated NAA</td>
        <td>Canavan disease (ASPA) &mdash; uniquely elevated, pathognomonic</td>
      </tr>
      <tr>
        <td style="color:${COLORS.violet};">Decreased NAA + elevated choline</td>
        <td>Active demyelination / neurodegeneration</td>
      </tr>
      <tr>
        <td style="color:${COLORS.teal};">Elevated myo-inositol</td>
        <td>Gliosis, Alexander disease</td>
      </tr>
    </tbody>
  </table>

  <div class="two-col">
    <div class="card card-accent">
      <div class="card-title">When to Order MRS</div>
      <div class="card-body">Unexplained white matter disease, suspected metabolic etiology, or when conventional MRI pattern is non-specific. MRS should be performed routinely in all undiagnosed leukodystrophy cases.</div>
    </div>
    <div class="card card-red">
      <div class="card-title">Leukodystrophy = Highest Yield</div>
      <div class="card-body">WES in MRI-selected leukodystrophy cohorts yields 50&ndash;72%. After correct MRI categorization, directed sequencing achieves 72&ndash;90%+ diagnostic rate.</div>
    </div>
  </div>
`));

// ── Section 3: Malformations of Cortical Development ────────────────────────

// Slide 5: MCD Overview — 3 Developmental Phase Cards
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Malformations of Cortical Development</h1>
  <div class="section-label">Section 3 of 5 &mdash; Developmental Timing Overview</div>

  <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:20px; margin-bottom:20px;">
    <div class="card card-red" style="padding:20px 22px;">
      <div class="card-title" style="font-size:30px;">Early (3&ndash;6 wk)</div>
      <div class="card-body" style="font-size:24px;">
        <strong>Neural tube closure</strong> &amp; forebrain cleavage<br><br>
        Anencephaly, encephalocele, HPE<br>
        <span style="color:${COLORS.violet}; font-weight:700;">SHH, ZIC2, SIX3</span>
      </div>
    </div>
    <div class="card card-amber" style="padding:20px 22px;">
      <div class="card-title" style="font-size:30px;">Mid (6&ndash;24 wk)</div>
      <div class="card-body" style="font-size:24px;">
        <strong>Proliferation</strong> &amp; <strong>migration</strong><br><br>
        Lissencephaly, PNH, PMG, cobblestone<br>
        <span style="color:${COLORS.red}; font-weight:700;">LIS1, DCX, FLNA</span>
      </div>
    </div>
    <div class="card card-violet" style="padding:20px 22px;">
      <div class="card-title" style="font-size:30px;">Late (24 wk&ndash;2 yr)</div>
      <div class="card-body" style="font-size:24px;">
        <strong>Cortical organization</strong> &amp; myelination<br><br>
        FCD, cortical dysplasia, leukodystrophies<br>
        <span style="color:${COLORS.amber}; font-weight:700;">MTOR, DEPDC5, TSC1/2</span>
      </div>
    </div>
  </div>

  <div class="card card-accent" style="padding:16px 22px;">
    <div class="card-title" style="font-size:28px;">Key Principle</div>
    <div class="card-body" style="font-size:24px;">Timing of developmental insult predicts the type of malformation. <strong>LIS1</strong> = posterior &gt; anterior gradient. <strong>DCX</strong> = anterior &gt; posterior (females = band heterotopia). Full timing table in section notes.</div>
  </div>
`));

// Slide 6: HPE Summary + CC Key Points
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>HPE Spectrum &amp; Corpus Callosum</h1>
  <div class="section-label">Section 3 of 5 &mdash; MCD Continued</div>

  <div class="two-col" style="margin-bottom:18px;">
    <div class="card card-red" style="padding:20px 22px;">
      <div class="card-title" style="font-size:30px;">HPE Spectrum</div>
      <div class="card-body" style="font-size:24px;">
        <strong>Alobar</strong> (most severe) &rarr; <strong>Semilobar</strong> &rarr; <strong>Lobar</strong> (mildest)<br><br>
        Genes: <span style="font-weight:700; color:${COLORS.violet};">SHH</span> (most common), ZIC2, SIX3<br>
        Chromosomal: trisomy 13 most common<br><br>
        <strong style="color:${COLORS.red};">SOD = ENDOCRINE EMERGENCY</strong><br>
        Absent septum pellucidum + small optic nerves &rarr; GH deficiency causes life-threatening hypoglycemia
      </div>
    </div>
    <div class="card card-accent" style="padding:20px 22px;">
      <div class="card-title" style="font-size:30px;">Corpus Callosum</div>
      <div class="card-body" style="font-size:24px;">
        <strong>Formation:</strong> genu &rarr; body &rarr; splenium &rarr; rostrum<br>
        <span style="color:${COLORS.red}; font-weight:700;">ROSTRUM IS LAST</span> (despite being anterior)<br><br>
        &ldquo;Sunburst&rdquo; radial gyri on coronal = ACC sign<br>
        Probst bundles = WM that &ldquo;should have crossed&rdquo;<br><br>
        <strong>Isolated ACC:</strong> ~20% normal neurodevelopment; always send CMA + WES
      </div>
    </div>
  </div>

  <div class="card card-violet" style="padding:16px 22px;">
    <div class="card-title" style="font-size:26px;">Aicardi Syndrome</div>
    <div class="card-body" style="font-size:24px;">Girls only. ACC + chorioretinal lacunae + infantile spasms. X-linked dominant, male-lethal. Full HPE/CC tables in section notes.</div>
  </div>
`));

// ── Section 4: Posterior Fossa & Cerebellar Patterns ─────────────────────────

// Slide 7: Joubert Recognition + DWM Card
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Posterior Fossa Malformations</h1>
  <div class="section-label">Section 4 of 5 &mdash; Joubert &amp; Dandy-Walker</div>

  <div class="two-col" style="margin-bottom:18px;">
    <div class="card card-accent" style="padding:22px 24px;">
      <div class="card-title" style="font-size:32px;">Joubert Syndrome</div>
      <div class="card-body" style="font-size:24px;">
        <strong style="color:${COLORS.red};">Molar Tooth Sign</strong> &mdash; the pathognomonic MRI finding:<br>
        Elongated SCPs + deep interpeduncular fossa + vermian hypoplasia<br><br>
        <strong>Core triad:</strong> Hypotonia, oculomotor apraxia, breathing dysregulation<br><br>
        &gt;40 ciliopathy genes, all AR. Genotype determines organ surveillance (eyes, kidneys, liver). Full surveillance table in section notes.
      </div>
    </div>
    <div class="card card-violet" style="padding:22px 24px;">
      <div class="card-title" style="font-size:32px;">Dandy-Walker Malformation</div>
      <div class="card-body" style="font-size:24px;">
        <strong>MRI:</strong> Vermian hypoplasia + cystic 4th ventricle + enlarged posterior fossa + elevated torcula<br><br>
        Chromosomal in ~30%: monosomy X, trisomy 18/13/21<br>
        Genetic: ZIC1/ZIC4 deletions<br><br>
        <strong>Key point:</strong> Prognosis determined by associated anomalies, not DWM itself
      </div>
    </div>
  </div>

  <div class="highlight-box" style="padding:16px 22px;">
    <div class="label">Recognition Pearl</div>
    <div class="value" style="font-size:28px;">Molar tooth (Joubert) vs cystic 4th ventricle (DWM) vs dragonfly cerebellum (PCH) &mdash; three posterior fossa patterns, three distinct genetic workups</div>
  </div>
`));

// Slide 8: PCH + Cerebellar Framework
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>PCH &amp; Cerebellar Diagnostic Framework</h1>
  <div class="section-label">Section 4 of 5 &mdash; Posterior Fossa Continued</div>

  <div class="card card-red" style="padding:16px 22px; margin-bottom:16px;">
    <div class="card-title" style="font-size:28px;">Pontocerebellar Hypoplasia (PCH)</div>
    <div class="card-body" style="font-size:24px;">
      Small pons + cerebellum. Severe NDD, microcephaly, early epilepsy.<br>
      <strong>PCH2 (TSEN54):</strong> &ldquo;Dragonfly&rdquo; pattern &mdash; flat cerebellar hemispheres with relatively preserved vermis.<br>
      <strong>PCH1 (VRK1):</strong> + anterior horn cell disease (SMA-like weakness).
    </div>
  </div>

  <div class="two-col" style="margin-bottom:14px;">
    <div class="card card-green" style="padding:18px 22px;">
      <div class="card-title" style="font-size:28px;">Static (Malformations)</div>
      <div class="card-body" style="font-size:24px;">
        <strong>Joubert:</strong> molar tooth sign. Congenital.<br>
        <strong>Dandy-Walker:</strong> 4th ventricle cyst. Congenital.<br>
        <strong>PCH:</strong> dragonfly pattern. Non-progressive on serial imaging.
      </div>
    </div>
    <div class="card card-amber" style="padding:18px 22px;">
      <div class="card-title" style="font-size:28px;">Progressive (Degenerations)</div>
      <div class="card-body" style="font-size:24px;">
        <strong>SCA types:</strong> progressive cerebellar atrophy. SCA6 (CACNA1A) = pure cerebellar.<br>
        <strong>AT (ATM):</strong> cerebellar atrophy + elevated AFP + oculomotor apraxia + immunodeficiency.
      </div>
    </div>
  </div>

  <div class="highlight-box" style="padding:16px 22px;">
    <div class="label">Ataxia-Telangiectasia Clue</div>
    <div class="value" style="font-size:28px;">Progressive cerebellar atrophy + elevated alpha-fetoprotein + immunodeficiency = ATM</div>
    <p style="font-size:22px; margin-top:6px; color:${COLORS.body};">AFP and radiosensitivity testing aid rapid clinical diagnosis before genetic confirmation.</p>
  </div>
`));

// ── Section 5: Stroke-like & Vascular Patterns ──────────────────────────────

// Slide 9: Stroke-Like Patterns
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Stroke-Like &amp; Vascular Patterns</h1>
  <div class="section-label">Section 5 of 5</div>

  <div class="two-col">
    <div>
      <div class="card card-red" style="margin-bottom:16px;">
        <div class="card-title">MELAS</div>
        <div class="card-body">Stroke-like lesions that <strong>cross vascular territories</strong>, posterior-predominant. Elevated lactate on MRS. Gene: <em>MT-TL1</em> (m.3243A&gt;G).</div>
      </div>

      <div class="card card-amber" style="margin-bottom:16px;">
        <div class="card-title">Homocystinuria</div>
        <div class="card-body">Early-onset stroke with <strong>downward</strong> lens subluxation and marfanoid habitus. Gene: <em>CBS</em>. Check plasma homocysteine.</div>
      </div>
    </div>

    <div>
      <div class="card card-violet" style="margin-bottom:16px;">
        <div class="card-title">Fabry Disease</div>
        <div class="card-body">WM lesions + posterior circulation strokes in young adults. Pulvinar sign (T1 hyperintensity). Gene: <em>GLA</em> (X-linked).</div>
      </div>

      <div class="card card-teal" style="margin-bottom:16px;">
        <div class="card-title">Moyamoya</div>
        <div class="card-body">Progressive ICA stenosis with &ldquo;puff of smoke&rdquo; collaterals. Genes: <em>RNF213</em>. Occurs in NF1, Down syndrome, sickle cell.</div>
      </div>
    </div>
  </div>

  <div class="card card-accent" style="margin-top:4px;">
    <div class="card-title">When to Think Genetic</div>
    <div class="card-body">Young-onset stroke (&lt;45), non-vascular territory distribution, recurrent events, associated systemic features, family history.</div>
  </div>
`));

// Slide 10: Key Takeaways
slides.push(takeawaysSlideHTML(MOD, 10, TOTAL, [
  {
    title: "Pattern recognition narrows the differential",
    body: "MRI pattern + clinical context often points to a small number of candidate genes before any genetic test is ordered.",
  },
  {
    title: "Neuroembryological timing guides MCD diagnosis",
    body: "LIS1 = posterior > anterior gradient. DCX = anterior > posterior (females = band heterotopia). Rostrum of CC forms LAST despite being anterior.",
  },
  {
    title: "Joubert requires multiorgan surveillance",
    body: "Annual ophthalmology (CEP290 = retinal), renal US + Cr (NPHP1 = nephronophthisis), hepatic US + LFTs (TMEM67 = liver fibrosis). Genotype drives organ risk.",
  },
  {
    title: "Pathognomonic signs are high-yield",
    body: "\"Eye of the tiger\" (PANK2), \"molar tooth\" (Joubert), \"dragonfly\" (PCH/TSEN54), and \"sunburst\" radial gyri (ACC) should trigger immediate genetic workup.",
  },
  {
    title: "Genetic stroke mimics cross vascular territories",
    body: "MELAS lesions do NOT respect vascular boundaries — this is the key distinguishing feature from embolic stroke.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
