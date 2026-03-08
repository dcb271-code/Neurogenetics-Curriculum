/**
 * scripts/gen-neuroimaging.mjs
 *
 * Generates 8 clean, readable slides for the Neuroimaging Pattern Recognition module.
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
const TOTAL = 8;

const slides = [];

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Neuroimaging<br>Pattern Recognition",
  subtitle: "MRI signatures that narrow the differential before genetic testing",
  totalSlides: TOTAL,
  topics: [
    "Basal ganglia &amp; deep gray matter patterns",
    "White matter / leukodystrophy patterns",
    "Malformations of cortical development",
    "Posterior fossa &amp; cerebellar patterns",
    "MR spectroscopy quick reference",
  ],
}));

// ── Slide 2: Basal Ganglia & Deep Gray Matter Patterns ─────────────────────
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
        <td>Bilateral symmetric basal ganglia &amp; brainstem T2 hyperintensity</td>
        <td style="font-weight:700; color:${COLORS.red};">MT-ATP6, SURF1, NDUF genes</td>
      </tr>
      <tr>
        <td>NBIA / PANK2</td>
        <td>&ldquo;Eye of the tiger&rdquo; sign &mdash; central T2 hyperintensity in globus pallidus</td>
        <td style="font-weight:700; color:${COLORS.amber};">PANK2</td>
      </tr>
      <tr>
        <td>Wilson Disease</td>
        <td>&ldquo;Face of the giant panda&rdquo; sign in midbrain on T2</td>
        <td style="font-weight:700; color:${COLORS.violet};">ATP7B</td>
      </tr>
      <tr>
        <td>Glutaric Aciduria Type 1</td>
        <td>Wide Sylvian fissures, bilateral striatal necrosis</td>
        <td style="font-weight:700; color:${COLORS.teal};">GCDH</td>
      </tr>
    </tbody>
  </table>

  <div class="card card-accent" style="margin-top:12px;">
    <div class="card-title">Clinical Pearl</div>
    <div class="card-body">Bilateral symmetric T2 signal in the basal ganglia is a hallmark of <strong>mitochondrial disease</strong> and <strong>organic acidurias</strong> &mdash; always check lactate and urine organic acids.</div>
  </div>
`));

// ── Slide 3: White Matter / Leukodystrophy Patterns ────────────────────────
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
        <td>Posterior-predominant confluent white matter disease</td>
        <td style="font-weight:700; color:${COLORS.red};">ARSA</td>
      </tr>
      <tr>
        <td>Krabbe</td>
        <td>Posterior WM changes + cranial nerve enhancement</td>
        <td style="font-weight:700; color:${COLORS.amber};">GALC</td>
      </tr>
      <tr>
        <td>X-ALD</td>
        <td>Posterior periventricular WM with contrast-enhancing leading edge</td>
        <td style="font-weight:700; color:${COLORS.violet};">ABCD1</td>
      </tr>
      <tr>
        <td>Alexander</td>
        <td>Frontal-predominant WM disease, macrocephaly</td>
        <td style="font-weight:700; color:${COLORS.teal};">GFAP</td>
      </tr>
      <tr>
        <td>Vanishing WM</td>
        <td>Diffuse WM signal; MRS shows decreased metabolites</td>
        <td style="font-weight:700; color:${COLORS.blue};">EIF2B1&ndash;5</td>
      </tr>
    </tbody>
  </table>

  <div class="card card-green" style="margin-top:8px;">
    <div class="card-title">Key Distinction</div>
    <div class="card-body"><strong>Posterior-predominant</strong> (MLD, Krabbe, X-ALD) vs <strong>frontal-predominant</strong> (Alexander) &mdash; distribution pattern is the single most useful initial discriminator.</div>
  </div>
`));

// ── Slide 4: Malformations of Cortical Development ─────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Malformations of Cortical Development</h1>
  <div class="section-label">Section 3 of 5</div>

  <table>
    <thead>
      <tr>
        <th>Malformation</th>
        <th>MRI Appearance</th>
        <th>Gene(s)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Lissencephaly</td>
        <td>Smooth brain (LIS1 = posterior; DCX = anterior predominance)</td>
        <td style="font-weight:700; color:${COLORS.red};">LIS1, DCX, ARX</td>
      </tr>
      <tr>
        <td>Tubulinopathies</td>
        <td>Complex malformations with dysmorphic basal ganglia</td>
        <td style="font-weight:700; color:${COLORS.amber};">TUBA1A, TUBB2B, TUBB3</td>
      </tr>
      <tr>
        <td>PV Nodular Heterotopia</td>
        <td>Gray-matter nodules lining the ventricles</td>
        <td style="font-weight:700; color:${COLORS.violet};">FLNA (X-linked)</td>
      </tr>
      <tr>
        <td>Bilateral PMG</td>
        <td>Irregular cortical surface, overfolded appearance</td>
        <td style="font-weight:700; color:${COLORS.teal};">Multiple genes</td>
      </tr>
      <tr>
        <td>FCD / mTOR</td>
        <td>Focal cortical thickening with T2/FLAIR signal change</td>
        <td style="font-weight:700; color:${COLORS.blue};">MTOR, TSC1/2, DEPDC5</td>
      </tr>
    </tbody>
  </table>

  <div class="card card-amber" style="margin-top:8px;">
    <div class="card-title">Clinical Pearl</div>
    <div class="card-body">mTOR-pathway variants (somatic or germline) underlie FCD, TSC, and hemimegalencephaly &mdash; consider <strong>brain-tissue sequencing</strong> when blood testing is negative.</div>
  </div>
`));

// ── Slide 5: Posterior Fossa & Cerebellar Patterns ─────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Posterior Fossa &amp; Cerebellar Patterns</h1>
  <div class="section-label">Section 4 of 5</div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title">Joubert Syndrome</div>
        <div class="card-body"><strong>&ldquo;Molar tooth&rdquo; sign</strong> &mdash; elongated superior cerebellar peduncles on axial MRI. Ciliopathy genes: <em>CC2D2A, TMEM67</em>, and others.</div>
      </div>

      <div class="card card-violet" style="margin-bottom:16px;">
        <div class="card-title">Dandy-Walker Malformation</div>
        <div class="card-body">Large posterior fossa cyst with vermian hypoplasia. Variable genetic etiologies; may be part of broader syndromes.</div>
      </div>
    </div>

    <div>
      <div class="card card-red" style="margin-bottom:16px;">
        <div class="card-title">Pontocerebellar Hypoplasia</div>
        <div class="card-body"><strong>&ldquo;Dragonfly&rdquo; appearance</strong> &mdash; flat cerebellar hemispheres with preserved vermis. Multiple PCH genes (TSEN54, EXOSC3, etc.).</div>
      </div>

      <div class="card card-amber" style="margin-bottom:16px;">
        <div class="card-title">SCA Patterns</div>
        <div class="card-body">Progressive cerebellar atrophy patterns vary by SCA subtype. Olivopontocerebellar atrophy (SCA1/2/3/7) vs pure cerebellar (SCA6).</div>
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Diagnostic Tip</div>
    <div class="value">Static vs progressive cerebellar findings</div>
    <p style="font-size:17px; margin-top:8px; color:${COLORS.body};">Malformations (Joubert, Dandy-Walker) are <strong>non-progressive</strong>, while degenerations (SCA, PCH) show <strong>progressive atrophy</strong> on serial imaging.</p>
  </div>
`));

// ── Slide 6: Stroke-Like & Vascular Patterns ───────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Stroke-Like &amp; Vascular Patterns</h1>
  <div class="section-label">Section 4 of 5 &mdash; Vascular</div>

  <div class="two-col">
    <div>
      <div class="card card-red" style="margin-bottom:16px;">
        <div class="card-title">MELAS</div>
        <div class="card-body">Stroke-like lesions that <strong>cross vascular territories</strong> &mdash; the key distinguishing feature from embolic stroke. Gene: <em>MT-TL1</em> (m.3243A&gt;G).</div>
      </div>

      <div class="card card-amber" style="margin-bottom:16px;">
        <div class="card-title">Homocystinuria</div>
        <div class="card-body">Early-onset stroke with lens subluxation and marfanoid habitus. Gene: <em>CBS</em>. Check plasma homocysteine levels.</div>
      </div>
    </div>

    <div>
      <div class="card card-violet" style="margin-bottom:16px;">
        <div class="card-title">Fabry Disease</div>
        <div class="card-body">White matter lesions + posterior circulation strokes in young adults. Gene: <em>GLA</em> (X-linked). Check &alpha;-galactosidase A activity.</div>
      </div>

      <div class="card card-teal" style="margin-bottom:16px;">
        <div class="card-title">Moyamoya</div>
        <div class="card-body">Progressive stenosis of ICA bifurcation with &ldquo;puff of smoke&rdquo; collaterals on angiography. Genes: <em>RNF213, ACTA2</em>.</div>
      </div>
    </div>
  </div>

  <div class="card card-accent" style="margin-top:4px;">
    <div class="card-title">When to Think Genetic</div>
    <div class="card-body">Young-onset stroke, recurrent events without traditional risk factors, multi-system involvement, or family history &mdash; all warrant genetic evaluation.</div>
  </div>
`));

// ── Slide 7: MR Spectroscopy Quick Reference ───────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>MR Spectroscopy Quick Reference</h1>
  <div class="section-label">Section 5 of 5</div>

  <table>
    <thead>
      <tr>
        <th>Metabolite Abnormality</th>
        <th>Suggests</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="color:${COLORS.red};">Elevated lactate</td>
        <td>Mitochondrial disease (lactate doublet at 1.33 ppm)</td>
      </tr>
      <tr>
        <td style="color:${COLORS.amber};">Elevated NAA</td>
        <td>Canavan disease (ASPA gene) &mdash; uniquely elevated, not decreased</td>
      </tr>
      <tr>
        <td style="color:${COLORS.violet};">Decreased NAA + elevated choline</td>
        <td>Active demyelination / neurodegeneration</td>
      </tr>
      <tr>
        <td style="color:${COLORS.teal};">Elevated glutamine / glutamate</td>
        <td>Urea cycle disorders, hepatic encephalopathy</td>
      </tr>
      <tr>
        <td style="color:${COLORS.blue};">Elevated myo-inositol</td>
        <td>Gliosis, Alexander disease</td>
      </tr>
    </tbody>
  </table>

  <div class="two-col" style="margin-top:16px;">
    <div class="card card-accent">
      <div class="card-title">When to Order MRS</div>
      <div class="card-body">Unexplained white matter disease, suspected metabolic etiology, or when conventional MRI pattern is non-specific.</div>
    </div>
    <div class="card card-red">
      <div class="card-title">Canavan: The Exception</div>
      <div class="card-body">NAA is typically a neuronal integrity marker (decreases in disease). <strong>Elevated NAA</strong> is virtually pathognomonic for Canavan disease.</div>
    </div>
  </div>
`));

// ── Slide 8: Key Takeaways ─────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 8, TOTAL, [
  {
    title: "Pattern recognition narrows the differential",
    body: "MRI pattern + clinical context often points to a small number of candidate genes before any genetic test is ordered.",
  },
  {
    title: "Anterior vs posterior WM distribution matters",
    body: "Posterior-predominant (MLD, Krabbe, X-ALD) vs frontal-predominant (Alexander) is the key initial discriminator for leukodystrophies.",
  },
  {
    title: "Pathognomonic signs are high-yield",
    body: "\"Eye of the tiger\" (PANK2), \"molar tooth\" (Joubert), and \"face of the giant panda\" (Wilson) should trigger immediate genetic workup.",
  },
  {
    title: "MRS adds a chemical dimension",
    body: "Lactate peaks (mitochondrial), elevated NAA (Canavan), and glutamine (urea cycle) provide diagnostic clues beyond structural imaging.",
  },
  {
    title: "Correlate imaging with clinical timeline",
    body: "Static malformations vs progressive degeneration — this distinction guides both the differential diagnosis and urgency of workup.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
