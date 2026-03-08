/**
 * scripts/gen-chromosomes-iscn.mjs
 *
 * Generates 7 clean, readable slides for the Chromosomes & ISCN module.
 * Uses puppeteer HTML rendering via the shared design system.
 *
 * Run: node scripts/gen-chromosomes-iscn.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "chromosomes-iscn";
const mc = MODULE_COLORS[MOD];
const TOTAL = 7;

const slides = [];

// ── Slide 1: Title ─────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Human Chromosome<br>Nomenclature (ISCN)",
  subtitle: "The universal language of cytogenetic reporting",
  totalSlides: TOTAL,
  topics: [
    "Chromosome morphology & G-banding",
    "ISCN karyotype notation",
    "Numerical & structural abnormalities",
    "Mosaicism & special notations",
    "Array cytogenomics CNV nomenclature",
  ],
}));

// ── Slide 2: Chromosome Morphology & G-Banding ────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Chromosome Morphology & G-Banding</h1>
  <div class="section-label">Section 1 of 5</div>

  <table>
    <thead>
      <tr>
        <th>Morphology</th>
        <th>Centromere Position</th>
        <th>Chromosomes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Metacentric</td>
        <td>Near center &mdash; arms roughly equal</td>
        <td>1, 3, 16, 19, 20</td>
      </tr>
      <tr>
        <td>Submetacentric</td>
        <td>Off-center &mdash; p arm shorter than q</td>
        <td>2, 4&ndash;12, X</td>
      </tr>
      <tr>
        <td>Acrocentric</td>
        <td>Near tip &mdash; very short p arm + satellite stalks</td>
        <td>13, 14, 15, 21, 22, Y</td>
      </tr>
    </tbody>
  </table>

  <div class="two-col" style="margin-top:20px;">
    <div class="card card-accent">
      <div class="card-title">Arm Notation</div>
      <div class="card-body">
        <p style="font-size:22px; margin-bottom:6px;"><strong>p</strong> = petite (short arm)</p>
        <p style="font-size:22px;"><strong>q</strong> = queue (long arm)</p>
      </div>
    </div>
    <div class="card card-green">
      <div class="card-title">G-Banding Resolution</div>
      <div class="card-body">
        <p style="font-size:19px; margin-bottom:6px;"><strong>400 bands</strong> &mdash; standard metaphase</p>
        <p style="font-size:19px; margin-bottom:6px;"><strong>550 bands</strong> &mdash; prometaphase (routine clinical)</p>
        <p style="font-size:19px;"><strong>850 bands</strong> &mdash; high-resolution (early prophase)</p>
      </div>
    </div>
  </div>

  <div class="card card-amber" style="margin-top:16px;">
    <div class="card-title">Clinical Pearl</div>
    <div class="card-body">G-banding detects rearrangements &ge;5&ndash;10 Mb. Submicroscopic deletions/duplications require FISH, microarray, or genome sequencing.</div>
  </div>
`));

// ── Slide 3: ISCN Karyotype Notation ──────────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>ISCN Karyotype Notation</h1>
  <div class="section-label">Section 2 of 5</div>

  <h3>Three Mandatory Components</h3>
  <div class="three-col" style="margin-bottom:24px;">
    <div class="card card-accent">
      <div class="card-title">1. Total Chromosome #</div>
      <div class="card-body" style="font-size:20px;">46 (diploid normal)</div>
    </div>
    <div class="card card-green">
      <div class="card-title">2. Sex Chromosomes</div>
      <div class="card-body" style="font-size:20px;">XX or XY</div>
    </div>
    <div class="card card-violet">
      <div class="card-title">3. Abnormalities</div>
      <div class="card-body" style="font-size:20px;">Listed after sex chromosomes</div>
    </div>
  </div>

  <div class="two-col">
    <div>
      <div class="highlight-box">
        <div class="label">Normal Female</div>
        <div class="value" style="font-size:30px; font-family:monospace;">46,XX</div>
      </div>
      <div class="highlight-box" style="margin-top:12px;">
        <div class="label">Normal Male</div>
        <div class="value" style="font-size:30px; font-family:monospace;">46,XY</div>
      </div>
    </div>
    <div>
      <div class="card card-amber">
        <div class="card-title">Band Nomenclature Example</div>
        <div class="card-body">
          <p style="font-size:28px; font-family:monospace; font-weight:700; margin-bottom:12px; color:${mc.dark};">7q11.23</p>
          <p style="font-size:18px; margin-bottom:4px;"><strong>7</strong> = chromosome 7</p>
          <p style="font-size:18px; margin-bottom:4px;"><strong>q</strong> = long arm</p>
          <p style="font-size:18px; margin-bottom:4px;"><strong>1</strong> = region 1</p>
          <p style="font-size:18px; margin-bottom:4px;"><strong>1</strong> = band 1</p>
          <p style="font-size:18px; margin-bottom:4px;"><strong>.23</strong> = sub-band 23</p>
          <p style="font-size:17px; color:${COLORS.muted}; margin-top:8px;">Williams-Beuren syndrome locus</p>
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 4: Numerical & Structural Abnormalities ─────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>Numerical & Structural Abnormalities</h1>
  <div class="section-label">Section 3 of 5</div>

  <table>
    <thead>
      <tr>
        <th>Abnormality</th>
        <th>ISCN Symbol</th>
        <th>Example</th>
        <th>Associated Disorder</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Trisomy</td>
        <td style="font-family:monospace; font-weight:700; color:${COLORS.red};">+</td>
        <td style="font-family:monospace;">47,XX,+21</td>
        <td>Down syndrome</td>
      </tr>
      <tr>
        <td>Monosomy</td>
        <td style="font-family:monospace; font-weight:700; color:${COLORS.red};">&minus;</td>
        <td style="font-family:monospace;">45,X</td>
        <td>Turner syndrome</td>
      </tr>
      <tr>
        <td>Deletion</td>
        <td style="font-family:monospace; font-weight:700; color:${COLORS.amber};">del</td>
        <td style="font-family:monospace;">46,XX,del(5)(p15.2)</td>
        <td>Cri du chat</td>
      </tr>
      <tr>
        <td>Duplication</td>
        <td style="font-family:monospace; font-weight:700; color:${COLORS.amber};">dup</td>
        <td style="font-family:monospace;">46,XY,dup(17)(p12)</td>
        <td>CMT1A</td>
      </tr>
      <tr>
        <td>Inversion</td>
        <td style="font-family:monospace; font-weight:700; color:${COLORS.violet};">inv</td>
        <td style="font-family:monospace;">46,XX,inv(9)(p11q13)</td>
        <td>Usually benign variant</td>
      </tr>
      <tr>
        <td>Translocation</td>
        <td style="font-family:monospace; font-weight:700; color:${COLORS.violet};">t</td>
        <td style="font-family:monospace;">46,XY,t(11;22)(q23;q11)</td>
        <td>Balanced carrier</td>
      </tr>
      <tr>
        <td>Ring</td>
        <td style="font-family:monospace; font-weight:700; color:${COLORS.teal};">r</td>
        <td style="font-family:monospace;">46,XX,r(20)(p13q13.3)</td>
        <td>Ring chr 20 epilepsy</td>
      </tr>
      <tr>
        <td>Isochromosome</td>
        <td style="font-family:monospace; font-weight:700; color:${COLORS.teal};">i</td>
        <td style="font-family:monospace;">46,X,i(Xq)</td>
        <td>Turner variant</td>
      </tr>
    </tbody>
  </table>
`, `
  table { font-size: 17px; }
  thead th { font-size: 15px; padding: 12px 16px; }
  tbody td { font-size: 16px; padding: 12px 16px; }
`));

// ── Slide 5: Mosaicism & Special Notations ────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Mosaicism & Special Notations</h1>
  <div class="section-label">Section 4 of 5</div>

  <div class="highlight-box" style="margin-bottom:24px;">
    <div class="label">Mosaic Turner Syndrome</div>
    <div class="value" style="font-size:32px; font-family:monospace;">45,X[12]/46,XX[18]</div>
    <p style="font-size:18px; margin-top:10px; color:${COLORS.body};">12 cells with monosomy X / 18 cells with normal 46,XX &mdash; clone counts in brackets</p>
  </div>

  <div class="three-col" style="margin-bottom:24px;">
    <div class="card card-accent">
      <div class="card-title">mos</div>
      <div class="card-body">
        <p style="font-size:19px; margin-bottom:4px;">Prefix indicating mosaicism</p>
        <p style="font-size:17px; color:${COLORS.muted};">mos 47,XXY[8]/46,XY[22]</p>
      </div>
    </div>
    <div class="card card-violet">
      <div class="card-title">idic</div>
      <div class="card-body">
        <p style="font-size:19px; margin-bottom:4px;">Isodicentric chromosome</p>
        <p style="font-size:17px; color:${COLORS.muted};">idic(15)(q13) &mdash; dup15q syndrome</p>
      </div>
    </div>
    <div class="card card-amber">
      <div class="card-title">mar</div>
      <div class="card-body">
        <p style="font-size:19px; margin-bottom:4px;">Marker chromosome (unidentified)</p>
        <p style="font-size:17px; color:${COLORS.muted};">47,XY,+mar &mdash; requires FISH/array</p>
      </div>
    </div>
  </div>

  <div class="card card-red">
    <div class="card-title">Clinical Pearl: Low-Level Mosaicism</div>
    <div class="card-body">Standard karyotype (20 cells) detects mosaicism &ge;15% at 95% confidence. Low-level mosaicism (&lt;10%) may require FISH on 100+ cells or SNP array. Tissue-specific mosaicism (e.g., brain only) may be undetectable in blood.</div>
  </div>
`));

// ── Slide 6: Array Cytogenomics CNV Nomenclature ──────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Array Cytogenomics CNV Nomenclature</h1>
  <div class="section-label">Section 5 of 5</div>

  <p style="margin-bottom:24px; font-size:21px;">
    <strong>ISCN 2020</strong> standardizes reporting of microarray results, bridging traditional cytogenetics with genomic coordinates.
  </p>

  <table>
    <thead>
      <tr>
        <th>CNV Type</th>
        <th>Copy Number</th>
        <th>ISCN Array Notation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Heterozygous Deletion</td>
        <td style="font-weight:700; color:${COLORS.red};">&times;1</td>
        <td style="font-family:monospace; font-size:16px;">arr[GRCh38] 22q11.21(18,912,231&ndash;21,465,659)&times;1</td>
      </tr>
      <tr>
        <td>Duplication</td>
        <td style="font-weight:700; color:${COLORS.amber};">&times;3</td>
        <td style="font-family:monospace; font-size:16px;">arr[GRCh38] 17p12(14,083,054&ndash;15,492,868)&times;3</td>
      </tr>
      <tr>
        <td>Copy-Neutral LOH</td>
        <td style="font-weight:700; color:${COLORS.violet};">hmz</td>
        <td style="font-family:monospace; font-size:16px;">arr[GRCh38] 15q11.2q13.1(25,049,002&ndash;32,444,043)hmz</td>
      </tr>
    </tbody>
  </table>

  <div class="two-col" style="margin-top:20px;">
    <div class="card card-accent">
      <div class="card-title">Format Components</div>
      <div class="card-body">
        <p style="font-size:18px; margin-bottom:6px;"><strong>arr</strong> &mdash; indicates array platform</p>
        <p style="font-size:18px; margin-bottom:6px;"><strong>[GRCh38]</strong> &mdash; genome build</p>
        <p style="font-size:18px; margin-bottom:6px;"><strong>Band(coordinates)</strong> &mdash; location</p>
        <p style="font-size:18px;"><strong>&times;N or hmz</strong> &mdash; copy state</p>
      </div>
    </div>
    <div class="card card-green">
      <div class="card-title">Why It Matters</div>
      <div class="card-body">Copy-neutral LOH (hmz) at 15q11&ndash;q13 distinguishes <strong>UPD-associated Angelman/Prader-Willi</strong> from deletion cases &mdash; different recurrence risk and mechanism.</div>
    </div>
  </div>
`));

// ── Slide 7: Key Takeaways ────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 7, TOTAL, [
  {
    title: "Chromosome structure determines arm ratio",
    body: "Metacentric, submetacentric, and acrocentric classifications define centromere position and arm lengths.",
  },
  {
    title: "ISCN provides universal cytogenetic notation",
    body: "Total count, sex chromosomes, then abnormalities — a standardized language understood worldwide.",
  },
  {
    title: "Symbols encode specific abnormality types",
    body: "del, dup, inv, t, r, i — each with precise ISCN formatting rules for breakpoints and coordinates.",
  },
  {
    title: "Mosaicism notation conveys clone proportions",
    body: "Bracket counts (e.g., [12]/[18]) are critical for clinical interpretation and recurrence risk counseling.",
  },
  {
    title: "Array ISCN bridges cytogenetics with genomics",
    body: "ISCN 2020 format integrates array coordinates and copy states, unifying traditional and modern approaches.",
  },
]));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
