/**
 * scripts/gen-chromosomes-iscn.mjs
 *
 * Generates 10 slides for the Chromosomes & ISCN module (5 sections × 2 slides each).
 * Uses puppeteer HTML rendering via the shared design system.
 *
 * Run: node scripts/gen-chromosomes-iscn.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS, imageDataUri,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const karyotypeImg = imageDataUri("public/images/sourced/karyotype-46XY.svg");

const MOD = "chromosomes-iscn";
const mc = MODULE_COLORS[MOD];
const TOTAL = 9;

const slides = [];

// ── Section 0: Chromosome Morphology and G-Banding ─────────────────────────

// Slide 1 (Section 0, Slide 1): Title
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

// Slide 2 (Section 0, Slide 2): Chromosome Morphology & G-Banding
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Chromosome Morphology &amp; G-Banding</h1>
  <div class="section-label">Section 1 of 5</div>

  <div class="two-col">
    <div>
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
            <td>Off-center &mdash; p shorter than q</td>
            <td>2, 4&ndash;12, X</td>
          </tr>
          <tr>
            <td>Acrocentric</td>
            <td>Near tip &mdash; very short p arm</td>
            <td>13, 14, 15, 21, 22, Y</td>
          </tr>
        </tbody>
      </table>

      <div class="card card-accent" style="margin-top:16px;">
        <div class="card-title">Arm Notation</div>
        <div class="card-body">
          <p style="font-size:28px; margin-bottom:4px;"><strong>p</strong> = petite (short arm) &nbsp;|&nbsp; <strong>q</strong> = queue (long arm)</p>
        </div>
      </div>
      <div class="card card-green" style="margin-top:12px;">
        <div class="card-title">G-Banding Resolution</div>
        <div class="card-body">
          <p style="font-size:24px; margin-bottom:4px;"><strong>400 bands</strong> &mdash; standard metaphase</p>
          <p style="font-size:24px; margin-bottom:4px;"><strong>550 bands</strong> &mdash; prometaphase (routine clinical)</p>
          <p style="font-size:24px;"><strong>850 bands</strong> &mdash; high-resolution (early prophase)</p>
        </div>
      </div>
    </div>
    <div>
      <div class="image-panel" style="margin-bottom:16px;">
        <img src="${karyotypeImg}" style="width:100%; height:auto; max-height:420px; object-fit:contain; padding:12px; background:white;" />
        <div class="image-caption">G-banded human male karyotype (46,XY) <span class="image-credit">\u2014 Public Domain, NHGRI</span></div>
      </div>
      <div class="card card-amber">
        <div class="card-title">Clinical Pearl</div>
        <div class="card-body" style="font-size:24px;">G-banding detects rearrangements &ge;5&ndash;10 Mb. G-dark bands are AT-rich and gene-poor; G-light bands are GC-rich and gene-dense.</div>
      </div>
    </div>
  </div>
`));

// ── Section 1: ISCN Karyotype Notation ──────────────────────────────────────

// Slide 3 (Section 1, Slide 1): The Basics
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>ISCN Karyotype Notation: Basics</h1>
  <div class="section-label">Section 2 of 5</div>

  <h3>Three Mandatory Components</h3>
  <div class="three-col" style="margin-bottom:24px;">
    <div class="card card-accent">
      <div class="card-title">1. Total Chromosome #</div>
      <div class="card-body" style="font-size:28px;">46 (diploid normal)</div>
    </div>
    <div class="card card-green">
      <div class="card-title">2. Sex Chromosomes</div>
      <div class="card-body" style="font-size:28px;">XX or XY</div>
    </div>
    <div class="card card-violet">
      <div class="card-title">3. Abnormalities</div>
      <div class="card-body" style="font-size:28px;">Listed after sex chromosomes</div>
    </div>
  </div>

  <div class="two-col">
    <div>
      <div class="highlight-box">
        <div class="label">Normal Female</div>
        <div class="value" style="font-size:42px; font-family:monospace;">46,XX</div>
      </div>
      <div class="highlight-box" style="margin-top:12px;">
        <div class="label">Normal Male</div>
        <div class="value" style="font-size:42px; font-family:monospace;">46,XY</div>
      </div>
    </div>
    <div>
      <div class="card card-amber">
        <div class="card-title">Band Nomenclature Example</div>
        <div class="card-body">
          <p style="font-size:39px; font-family:monospace; font-weight:700; margin-bottom:12px; color:${mc.dark};">7q11.23</p>
          <p style="font-size:25px; margin-bottom:4px;"><strong>7</strong> = chromosome 7</p>
          <p style="font-size:25px; margin-bottom:4px;"><strong>q</strong> = long arm</p>
          <p style="font-size:25px; margin-bottom:4px;"><strong>1</strong> = region 1</p>
          <p style="font-size:25px; margin-bottom:4px;"><strong>1</strong> = band 1</p>
          <p style="font-size:25px; margin-bottom:4px;"><strong>.23</strong> = sub-band 23</p>
          <p style="font-size:24px; color:${COLORS.muted}; margin-top:8px;">Williams-Beuren syndrome locus</p>
        </div>
      </div>
    </div>
  </div>
`));

// Slide 4 (Section 1, Slide 2): Band Numbering Detail
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>ISCN: Format &amp; Conventions</h1>
  <div class="section-label">Section 2 of 5 &mdash; Notation Rules</div>

  <div class="card card-accent" style="margin-bottom:20px;">
    <div class="card-title">Karyotype String Format</div>
    <div class="card-body" style="font-size:28px; font-family:monospace;">
      [total count],[sex chr],[abnormality 1],[abnormality 2],...
    </div>
  </div>

  <h3>Key Conventions</h3>
  <div class="two-col">
    <div>
      <div class="card card-green" style="margin-bottom:16px;">
        <div class="card-title">Band Numbering</div>
        <div class="card-body">Bands are numbered from the centromere outward. Region 1, band 1 immediately flanks the centromere; numbers increase toward the telomere.</div>
      </div>
      <div class="card card-amber">
        <div class="card-title">Derivative Chromosomes</div>
        <div class="card-body">Listed by the chromosome that contributes the centromere. <span style="font-family:monospace;">der(14)</span> = derivative chromosome with chromosome 14's centromere.</div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="margin-bottom:16px;">
        <div class="card-title">Breakpoint Notation</div>
        <div class="card-body">Breakpoints in parentheses: <span style="font-family:monospace;">t(9;22)(q34;q11.2)</span> = translocation between 9q34 and 22q11.2 (Philadelphia chromosome).</div>
      </div>
      <div class="card card-red">
        <div class="card-title">Order Rule</div>
        <div class="card-body">Multiple abnormalities listed in order: sex chromosome abnormalities first, then autosomes in numerical order.</div>
      </div>
    </div>
  </div>
`));

// ── Section 2: Numerical and Structural Abnormalities ───────────────────────

// Slide 5 (Section 2, Slide 1): Numerical & Structural
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>Numerical &amp; Structural Abnormalities</h1>
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
        <td>Translocation</td>
        <td style="font-family:monospace; font-weight:700; color:${COLORS.violet};">t</td>
        <td style="font-family:monospace;">46,XY,t(11;22)(q23;q11)</td>
        <td>Balanced carrier</td>
      </tr>
    </tbody>
  </table>
`, `
  table { font-size:24px; }
  thead th { font-size:21px; padding: 12px 16px; }
  tbody td { font-size:22px; padding: 12px 16px; }
`));

// Slide 6 (Section 2, Slide 2): More Structural Types
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Structural Abnormalities (continued)</h1>
  <div class="section-label">Section 3 of 5 &mdash; Additional Types</div>

  <table style="margin-bottom:24px;">
    <thead>
      <tr>
        <th>Abnormality</th>
        <th>ISCN Symbol</th>
        <th>Example</th>
        <th>Clinical Significance</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Inversion</td>
        <td style="font-family:monospace; font-weight:700; color:${COLORS.violet};">inv</td>
        <td style="font-family:monospace;">46,XX,inv(9)(p11q13)</td>
        <td>Usually benign variant</td>
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
      <tr>
        <td>Robertsonian</td>
        <td style="font-family:monospace; font-weight:700; color:${mc.accent};">rob</td>
        <td style="font-family:monospace;">45,XX,rob(14;21)(q10;q10)</td>
        <td>Balanced; risk of trisomy 21</td>
      </tr>
    </tbody>
  </table>

  <div class="card card-red">
    <div class="card-title">Clinical Pearl: Balanced vs Unbalanced</div>
    <div class="card-body">Balanced rearrangements (inversions, reciprocal translocations) usually do not cause phenotypic abnormalities in the carrier. However, they increase the risk of <strong>unbalanced offspring</strong> through abnormal segregation during meiosis. Robertsonian translocation carriers have a 10&ndash;15% empiric risk of trisomy in offspring.</div>
  </div>
`, `
  table { font-size:24px; }
  thead th { font-size:21px; padding: 12px 16px; }
  tbody td { font-size:22px; padding: 12px 16px; }
`));

// ── Section 3: Mosaicism and Special Notations ──────────────────────────────

// Slide 7 (Section 3, Slide 1): Mosaicism
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Mosaicism &amp; Special Notations</h1>
  <div class="section-label">Section 4 of 5</div>

  <div class="highlight-box" style="margin-bottom:24px;">
    <div class="label">Mosaic Turner Syndrome</div>
    <div class="value" style="font-size:45px; font-family:monospace;">45,X[12]/46,XX[18]</div>
    <p style="font-size:25px; margin-top:10px; color:${COLORS.body};">12 cells with monosomy X / 18 cells with normal 46,XX &mdash; clone counts in brackets</p>
  </div>

  <div class="three-col" style="margin-bottom:24px;">
    <div class="card card-accent">
      <div class="card-title">mos</div>
      <div class="card-body">
        <p style="font-size:27px; margin-bottom:4px;">Prefix indicating mosaicism</p>
        <p style="font-size:24px; color:${COLORS.muted};">mos 47,XXY[8]/46,XY[22]</p>
      </div>
    </div>
    <div class="card card-violet">
      <div class="card-title">idic</div>
      <div class="card-body">
        <p style="font-size:27px; margin-bottom:4px;">Isodicentric chromosome</p>
        <p style="font-size:24px; color:${COLORS.muted};">idic(15)(q13) &mdash; dup15q syndrome</p>
      </div>
    </div>
    <div class="card card-amber">
      <div class="card-title">mar</div>
      <div class="card-body">
        <p style="font-size:27px; margin-bottom:4px;">Marker chromosome (unidentified)</p>
        <p style="font-size:24px; color:${COLORS.muted};">47,XY,+mar &mdash; requires FISH/array</p>
      </div>
    </div>
  </div>
`));

// Slide 8 (Section 3, Slide 2): Low-Level Mosaicism Detection
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Mosaicism Detection Limits</h1>
  <div class="section-label">Section 4 of 5 &mdash; Sensitivity</div>

  <div class="card card-red" style="margin-bottom:20px;">
    <div class="card-title">Standard Karyotype Sensitivity</div>
    <div class="card-body" style="font-size:28px;">20 metaphase cells analyzed &rarr; detects mosaicism &ge;15% at 95% confidence. Low-level mosaicism (&lt;10%) requires FISH on 100+ cells or SNP array.</div>
  </div>

  <div class="two-col" style="margin-bottom:20px;">
    <div class="card card-accent">
      <div class="card-title">Tissue-Specific Mosaicism</div>
      <div class="card-body">Mosaicism confined to brain or gonadal tissue may be completely undetectable in blood. Skin fibroblast culture or tissue biopsy may be required for confirmation.</div>
    </div>
    <div class="card card-green">
      <div class="card-title">Minimum Cell Count Rules</div>
      <div class="card-body">
        <p style="font-size:25px; margin-bottom:6px;"><strong>20 cells</strong> &mdash; routine constitutional</p>
        <p style="font-size:25px; margin-bottom:6px;"><strong>30 cells</strong> &mdash; suspected mosaicism</p>
        <p style="font-size:25px;"><strong>100+ cells</strong> &mdash; FISH for low-level mosaicism</p>
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Clinical Pearl</div>
    <div class="value" style="font-size:31px;">When clinical features suggest a chromosomal disorder but blood karyotype is normal, consider FISH on additional cell types or SNP-array for low-level mosaicism</div>
  </div>
`));

// ── Section 4: Array Cytogenomics CNV Nomenclature ──────────────────────────

// Slide 9 (Section 4, Slide 1): Array Nomenclature
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Array Cytogenomics CNV Nomenclature</h1>
  <div class="section-label">Section 5 of 5</div>

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
        <td style="font-family:monospace; font-size:22px;">arr[GRCh38] 22q11.21(18,912,231&ndash;21,465,659)&times;1</td>
      </tr>
      <tr>
        <td>Duplication</td>
        <td style="font-weight:700; color:${COLORS.amber};">&times;3</td>
        <td style="font-family:monospace; font-size:22px;">arr[GRCh38] 17p12(14,083,054&ndash;15,492,868)&times;3</td>
      </tr>
      <tr>
        <td>Copy-Neutral LOH</td>
        <td style="font-weight:700; color:${COLORS.violet};">hmz</td>
        <td style="font-family:monospace; font-size:22px;">arr[GRCh38] 15q11.2q13.1(25,049,002&ndash;32,444,043)hmz</td>
      </tr>
    </tbody>
  </table>

  <div class="two-col" style="margin-top:20px;">
    <div class="card card-accent">
      <div class="card-title">Format Components</div>
      <div class="card-body">
        <p style="font-size:25px; margin-bottom:6px;"><strong>arr</strong> &mdash; indicates array platform</p>
        <p style="font-size:25px; margin-bottom:6px;"><strong>[GRCh38]</strong> &mdash; genome build</p>
        <p style="font-size:25px; margin-bottom:6px;"><strong>Band(coordinates)</strong> &mdash; location</p>
        <p style="font-size:25px;"><strong>&times;N or hmz</strong> &mdash; copy state</p>
      </div>
    </div>
    <div class="card card-green">
      <div class="card-title">Why Copy-Neutral LOH Matters</div>
      <div class="card-body">Distinguishes <strong>UPD-associated Angelman/Prader-Willi</strong> from deletion cases &mdash; different recurrence risk and mechanism.</div>
    </div>
  </div>
`));

// ── Render ──────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
