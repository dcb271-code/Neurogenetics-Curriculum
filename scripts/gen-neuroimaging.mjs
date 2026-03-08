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

// Slide 5: Neuroembryological Timing + MCD Genetics
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Malformations of Cortical Development</h1>
  <div class="section-label">Section 3 of 5 &mdash; Developmental Timing &amp; Genetics</div>

  <table style="margin-bottom:12px;">
    <thead>
      <tr>
        <th style="width:14%;">Timing</th>
        <th style="width:22%;">Process</th>
        <th style="width:30%;">Malformations</th>
        <th style="width:34%;">Key Genes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>3&ndash;4 wk</td>
        <td>Neural tube closure</td>
        <td>Anencephaly, myelomeningocele, encephalocele</td>
        <td style="font-weight:600; color:${COLORS.muted};">Multifactorial (folate)</td>
      </tr>
      <tr>
        <td>4&ndash;6 wk</td>
        <td>Forebrain cleavage</td>
        <td>HPE, Dandy-Walker</td>
        <td style="font-weight:700; color:${COLORS.violet};">SHH, ZIC2, SIX3</td>
      </tr>
      <tr>
        <td>6&ndash;16 wk</td>
        <td>Proliferation</td>
        <td>Microcephaly, megalencephaly</td>
        <td style="font-weight:700; color:${COLORS.blue};">ASPM; PIK3CA / PTEN / AKT3 (mTOR)</td>
      </tr>
      <tr>
        <td>12&ndash;24 wk</td>
        <td>Migration</td>
        <td>Lissencephaly, PNH, PMG, cobblestone</td>
        <td style="font-weight:700; color:${COLORS.red};">LIS1, DCX, FLNA; dystroglycanopathies</td>
      </tr>
      <tr>
        <td>24 wk&ndash;PN</td>
        <td>Organization</td>
        <td>FCD (somatic MTOR), cortical dysplasia</td>
        <td style="font-weight:700; color:${COLORS.amber};">MTOR, DEPDC5, TSC1/2</td>
      </tr>
      <tr>
        <td>24 wk&ndash;2 yr</td>
        <td>Myelination</td>
        <td>PMD, leukodystrophies, PVL</td>
        <td style="font-weight:700; color:${COLORS.teal};">PLP1, ARSA, GALC</td>
      </tr>
    </tbody>
  </table>

  <div class="two-col">
    <div class="card card-red" style="padding:16px 20px;">
      <div class="card-title" style="font-size:19px;">Migration Pearls</div>
      <div class="card-body" style="font-size:16px;">
        <strong>LIS1:</strong> posterior &gt; anterior gradient.
        <strong>DCX:</strong> anterior &gt; posterior; females = band heterotopia (milder).<br>
        <strong>FLNA (PNH):</strong> X-linked, females (males lethal). Nodules isointense to gray on ALL sequences. Distinguish from TSC subependymal nodules (T1-bright).
      </div>
    </div>
    <div class="card card-violet" style="padding:16px 20px;">
      <div class="card-title" style="font-size:19px;">Overgrowth &amp; Cobblestone</div>
      <div class="card-body" style="font-size:16px;">
        <strong>Cobblestone lissencephaly:</strong> dystroglycanopathies (POMT1/2, FKTN, FKRP). Walker-Warburg most severe. CK elevated.<br>
        <strong>HME:</strong> somatic mosaic PIK3CA/AKT3/MTOR. Hemispherotomy for refractory epilepsy. Test resected brain tissue.<br>
        <strong>PMG:</strong> PIK3R2, TUBB2B. Bilateral perisylvian = pseudobulbar palsy + drooling + epilepsy.
      </div>
    </div>
  </div>
`));

// Slide 6: HPE Spectrum + Corpus Callosum
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>HPE Spectrum &amp; Corpus Callosum</h1>
  <div class="section-label">Section 3 of 5 &mdash; MCD Continued</div>

  <table style="margin-bottom:12px;">
    <thead>
      <tr>
        <th style="width:18%;">HPE Type</th>
        <th style="width:42%;">MRI Features</th>
        <th style="width:40%;">Genetics &amp; Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Alobar</td>
        <td>Single monoventricle, fused thalami, no falx</td>
        <td style="font-weight:700; color:${COLORS.red};"><em>SHH</em> most common gene; trisomy 13 most common chromosomal</td>
      </tr>
      <tr>
        <td>Semilobar</td>
        <td>Partial separation posteriorly, fused anteriorly</td>
        <td style="font-weight:600; color:${COLORS.violet};">ZIC2, SIX3; intermediate severity</td>
      </tr>
      <tr>
        <td>Lobar</td>
        <td>Near-complete separation; may have near-normal cognition</td>
        <td style="font-weight:600; color:${COLORS.teal};">Mildest form; may be incidental finding</td>
      </tr>
      <tr>
        <td style="color:${COLORS.red}; font-weight:800;">SOD</td>
        <td>Absent septum pellucidum + small optic nerves + pituitary dysfunction</td>
        <td style="font-weight:700; color:${COLORS.red};">ENDOCRINE EMERGENCY &mdash; GH deficiency causes life-threatening hypoglycemia</td>
      </tr>
    </tbody>
  </table>

  <div class="card card-accent" style="margin-bottom:12px; padding:16px 22px;">
    <div class="card-title" style="font-size:20px;">Corpus Callosum Malformations</div>
    <div class="card-body" style="font-size:17px;">
      <strong>Formation order:</strong> genu &rarr; body &rarr; splenium &rarr; rostrum
      (<span style="color:${COLORS.red}; font-weight:700;">ROSTRUM IS LAST</span> despite being anterior).<br>
      <strong>&ldquo;Sunburst&rdquo;</strong> radial gyral pattern on coronal = reliable ACC sign.
      <strong>Probst bundles:</strong> longitudinal WM that &ldquo;should have crossed.&rdquo;<br>
      <strong>Isolated ACC:</strong> ~20% normal neurodevelopment prenatally; always send CMA + WES.
    </div>
  </div>

  <div class="two-col">
    <div class="card card-red" style="padding:14px 20px;">
      <div class="card-title" style="font-size:18px;">Aicardi Syndrome</div>
      <div class="card-body" style="font-size:16px;">Girls only. ACC + chorioretinal lacunae + infantile spasms. Nearly always de novo. X-linked dominant, male-lethal.</div>
    </div>
    <div class="highlight-box" style="margin:0; padding:14px 20px;">
      <div class="label" style="font-size:13px;">Board Pearl</div>
      <div class="value" style="font-size:18px;">Rostrum of CC forms LAST despite being anterior &mdash; partial ACC spares it last</div>
    </div>
  </div>
`));

// ── Section 4: Posterior Fossa & Cerebellar Patterns ─────────────────────────

// Slide 7: Joubert & Dandy-Walker
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Posterior Fossa Malformations</h1>
  <div class="section-label">Section 4 of 5 &mdash; Joubert &amp; Dandy-Walker</div>

  <div class="two-col" style="margin-bottom:14px;">
    <div>
      <div class="card card-accent" style="padding:16px 20px; margin-bottom:10px;">
        <div class="card-title" style="font-size:20px;">Joubert Syndrome (JBTS)</div>
        <div class="card-body" style="font-size:16px;">
          <strong>MRI:</strong> Molar tooth sign &mdash; elongated SCPs + deep interpeduncular fossa + vermian hypoplasia.<br>
          <strong>Genes:</strong> &gt;40 ciliopathy genes (CC2D2A, CEP290, AHI1, TMEM67, NPHP1). All encode ciliary proteins. AR.<br>
          <strong>Core features:</strong> Hypotonia, oculomotor apraxia, breathing dysregulation (pathognomonic), DD, ataxia.
        </div>
      </div>
      <div class="card card-violet" style="padding:16px 20px;">
        <div class="card-title" style="font-size:20px;">Dandy-Walker Malformation</div>
        <div class="card-body" style="font-size:16px;">
          Vermian hypoplasia + cystic 4th ventricle + enlarged PF + elevated torcula.<br>
          Chromosomal in ~30% (monosomy X, trisomy 18/13/21). ZIC1/ZIC4 deletions.<br>
          <strong>Prognosis:</strong> Determined by associated anomalies, not DWM itself.
        </div>
      </div>
    </div>

    <div>
      <div class="card card-red" style="padding:16px 20px; margin-bottom:10px;">
        <div class="card-title" style="font-size:20px;">Joubert Surveillance Protocol</div>
        <div class="card-body" style="font-size:16px;">
          <strong style="color:${COLORS.red};">Ophthalmology:</strong> ERG annually &mdash; CEP290 &rarr; Leber CGA<br>
          <strong style="color:${COLORS.blue};">Renal:</strong> US + Cr annually &mdash; nephronophthisis (NPHP1)<br>
          <strong style="color:${COLORS.amber};">Hepatic:</strong> LFTs + US &mdash; TMEM67 &rarr; COACH / hepatic fibrosis
        </div>
      </div>
      <div class="card card-amber" style="padding:16px 20px;">
        <div class="card-title" style="font-size:20px;">Genotype-Phenotype Map</div>
        <div class="card-body" style="font-size:16px;">
          <strong>CEP290</strong> &rarr; retinal (Leber congenital amaurosis)<br>
          <strong>TMEM67</strong> &rarr; liver (COACH syndrome / hepatic fibrosis)<br>
          <strong>AHI1</strong> &rarr; retinal dystrophy<br>
          <strong>NPHP1</strong> &rarr; renal (nephronophthisis)
        </div>
      </div>
    </div>
  </div>
`));

// Slide 8: PCH + Cerebellar Framework
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>PCH &amp; Cerebellar Diagnostic Framework</h1>
  <div class="section-label">Section 4 of 5 &mdash; Posterior Fossa Continued</div>

  <div class="card card-red" style="padding:16px 22px; margin-bottom:16px;">
    <div class="card-title" style="font-size:20px;">Pontocerebellar Hypoplasia (PCH)</div>
    <div class="card-body" style="font-size:17px;">
      Small pons + cerebellum. Severe NDD, microcephaly, early epilepsy.<br>
      <strong>PCH2 (TSEN54):</strong> &ldquo;Dragonfly&rdquo; pattern &mdash; flat cerebellar hemispheres with relatively preserved vermis.<br>
      <strong>PCH1 (VRK1):</strong> + anterior horn cell disease (SMA-like weakness).
    </div>
  </div>

  <div class="two-col" style="margin-bottom:14px;">
    <div class="card card-green" style="padding:18px 22px;">
      <div class="card-title" style="font-size:20px;">Static (Malformations)</div>
      <div class="card-body" style="font-size:17px;">
        <strong>Joubert:</strong> molar tooth sign. Congenital.<br>
        <strong>Dandy-Walker:</strong> 4th ventricle cyst. Congenital.<br>
        <strong>PCH:</strong> dragonfly pattern. Non-progressive on serial imaging.
      </div>
    </div>
    <div class="card card-amber" style="padding:18px 22px;">
      <div class="card-title" style="font-size:20px;">Progressive (Degenerations)</div>
      <div class="card-body" style="font-size:17px;">
        <strong>SCA types:</strong> progressive cerebellar atrophy. SCA6 (CACNA1A) = pure cerebellar.<br>
        <strong>AT (ATM):</strong> cerebellar atrophy + elevated AFP + oculomotor apraxia + immunodeficiency.
      </div>
    </div>
  </div>

  <div class="highlight-box" style="padding:16px 22px;">
    <div class="label">Ataxia-Telangiectasia Clue</div>
    <div class="value" style="font-size:20px;">Progressive cerebellar atrophy + elevated alpha-fetoprotein + immunodeficiency = ATM</div>
    <p style="font-size:16px; margin-top:6px; color:${COLORS.body};">AFP and radiosensitivity testing aid rapid clinical diagnosis before genetic confirmation.</p>
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
