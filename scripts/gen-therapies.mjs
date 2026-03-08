/**
 * scripts/gen-therapies.mjs
 *
 * Generates 16 clean, readable slides for the Therapies for Neurogenetic Diseases module.
 * Covers ASOs, gene therapy, gene editing, SMA as a paradigm, and equitable delivery.
 *
 * Run: node scripts/gen-therapies.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "therapies";
const mc = MODULE_COLORS[MOD];
const TOTAL = 16;

const slides = [];

// ── Slide 1: Title ──────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Therapies for Neurogenetic Diseases",
  subtitle: "ASOs, Gene Therapy & Beyond",
  totalSlides: TOTAL,
  topics: [
    "Newborn screening criteria",
    "SMA genetics & approved therapies",
    "Antisense oligonucleotides (ASOs)",
    "Viral vectors & gene replacement",
    "CRISPR/Cas9 & gene editing",
    "Equitable delivery challenges",
  ],
}));

// ── Slide 2: Learning Objectives ────────────────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Learning Objectives</h1>
  <div class="section-label">What You Will Learn</div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${mc.accent};">1</div>
    <div>
      <strong style="font-size:22px;">Newborn Screening Criteria</strong><br>
      <span style="font-size:19px; color:${COLORS.body};">Apply Wilson &amp; Jungner criteria to determine when a condition warrants population-level screening</span>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.violet};">2</div>
    <div>
      <strong style="font-size:22px;">SMA Genetics &amp; Nusinersen Mechanism</strong><br>
      <span style="font-size:19px; color:${COLORS.body};">Explain the SMN1/SMN2 locus, the splicing defect, and how nusinersen restores SMN protein</span>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.green};">3</div>
    <div>
      <strong style="font-size:22px;">Compare Therapeutic Modalities</strong><br>
      <span style="font-size:19px; color:${COLORS.body};">Distinguish ASOs, CRISPR/Cas9, gene replacement, and protein replacement by mechanism, durability, and limitations</span>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.amber};">4</div>
    <div>
      <strong style="font-size:22px;">Equitable Delivery of Genetic Therapies</strong><br>
      <span style="font-size:19px; color:${COLORS.body};">Identify barriers to equitable access including cost, infrastructure, and representation in clinical trials</span>
    </div>
  </div>
`));

// ── Slide 3: Case Presentation ──────────────────────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Case Presentation</h1>
  <div class="section-label">Clinical Scenario</div>

  <div class="card card-accent" style="margin-bottom:24px;">
    <div class="card-title" style="font-size:24px;">4-Week-Old Female</div>
    <div class="card-body" style="font-size:20px;">
      Referred after a <strong>positive newborn screening</strong> result for spinal muscular atrophy (SMA).<br>
      Currently asymptomatic. Born at term with normal Apgar scores.
    </div>
  </div>

  <div class="two-col">
    <div class="card card-rose">
      <div class="card-title">NBS Findings</div>
      <div class="card-body" style="font-size:18px;">
        &bull; Homozygous deletion of <strong>SMN1</strong> exon 7<br>
        &bull; Confirmed by MLPA<br>
        &bull; <strong>2 copies of SMN2</strong> detected
      </div>
    </div>

    <div class="card card-violet">
      <div class="card-title">Key Questions</div>
      <div class="card-body" style="font-size:18px;">
        &bull; What is the expected clinical course?<br>
        &bull; What treatment options are available?<br>
        &bull; Why is presymptomatic treatment critical?
      </div>
    </div>
  </div>
`));

// ── Slide 4: SMA Genetics ───────────────────────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>SMA Genetics</h1>
  <div class="section-label">Chromosome 5q13 &mdash; SMN1 &amp; SMN2</div>

  <div class="two-col">
    <div>
      <div class="card card-accent" style="margin-bottom:16px;">
        <div class="card-title">SMN1 (Telomeric)</div>
        <div class="card-body" style="font-size:18px;">
          &bull; Produces full-length SMN protein<br>
          &bull; <strong>Biallelic loss</strong> causes SMA<br>
          &bull; ~95% of cases: homozygous deletion of exon 7<br>
          &bull; ~5%: deletion + point mutation (compound het)
        </div>
      </div>

      <div class="card card-violet">
        <div class="card-title">SMN2 (Centromeric)</div>
        <div class="card-body" style="font-size:18px;">
          &bull; Nearly identical paralog &mdash; differs by <strong>1 base</strong> at exon 7<br>
          &bull; Produces mostly truncated, unstable protein<br>
          &bull; Only ~10% of transcripts include exon 7<br>
          &bull; Copy number modifies severity
        </div>
      </div>
    </div>

    <div>
      <div class="card card-green" style="margin-bottom:16px;">
        <div class="card-title">Autosomal Recessive Inheritance</div>
        <div class="card-body" style="font-size:18px;">
          &bull; Carrier frequency: ~1 in 40&ndash;60<br>
          &bull; Incidence: ~1 in 10,000 live births<br>
          &bull; Both parents must carry a pathogenic allele
        </div>
      </div>

      <div class="highlight-box">
        <div class="label">Therapeutic Target</div>
        <div class="value" style="font-size:22px;">SMN2 is the key modifier &mdash; all three approved therapies exploit this backup gene</div>
      </div>
    </div>
  </div>
`));

// ── Slide 5: SMN1 vs SMN2 Splicing ─────────────────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>SMN1 vs SMN2 Splicing</h1>
  <div class="section-label">A Single Nucleotide Determines Exon 7 Inclusion</div>

  <div class="two-col" style="margin-bottom:24px;">
    <div class="card card-accent">
      <div class="card-title">SMN1 &mdash; C at position 6 (exon 7)</div>
      <div class="card-body" style="font-size:18px;">
        &bull; <strong>C</strong> creates an exonic splicing enhancer (ESE)<br>
        &bull; Binds SF2/ASF splicing factor<br>
        &bull; <strong>100% exon 7 inclusion</strong><br>
        &bull; Full-length, functional SMN protein
      </div>
    </div>

    <div class="card card-red">
      <div class="card-title">SMN2 &mdash; T at position 6 (exon 7)</div>
      <div class="card-body" style="font-size:18px;">
        &bull; C&rarr;<strong>T</strong> transition disrupts the ESE<br>
        &bull; Creates an exonic splicing silencer (ESS)<br>
        &bull; Binds hnRNP A1 &rarr; exon 7 skipping<br>
        &bull; <strong>~90% of transcripts lack exon 7</strong>
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Clinical Implication</div>
    <div class="value" style="font-size:22px;">Nusinersen and risdiplam both work by shifting SMN2 splicing toward exon 7 inclusion, increasing full-length SMN protein</div>
  </div>
`));

// ── Slide 6: SMN2 Copy Number & Severity ────────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>SMN2 Copy Number &amp; Severity</h1>
  <div class="section-label">More SMN2 Copies = More Residual SMN Protein</div>

  <table>
    <thead>
      <tr>
        <th style="width:18%;">SMA Type</th>
        <th style="width:18%;">SMN2 Copies</th>
        <th style="width:22%;">Onset</th>
        <th style="width:22%;">Motor Milestone</th>
        <th style="width:20%;">Severity</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Type 0</td>
        <td>1</td>
        <td>Prenatal</td>
        <td>None</td>
        <td style="color:${COLORS.red}; font-weight:700;">Most severe</td>
      </tr>
      <tr>
        <td>Type I</td>
        <td>2</td>
        <td>&lt; 6 months</td>
        <td>Never sits</td>
        <td style="color:${COLORS.red};">Severe</td>
      </tr>
      <tr>
        <td>Type II</td>
        <td>3</td>
        <td>6&ndash;18 months</td>
        <td>Sits, never walks</td>
        <td style="color:${COLORS.amber};">Intermediate</td>
      </tr>
      <tr>
        <td>Type III</td>
        <td>3&ndash;4</td>
        <td>&gt; 18 months</td>
        <td>Walks, may lose</td>
        <td style="color:${COLORS.green};">Mild</td>
      </tr>
      <tr>
        <td>Type IV</td>
        <td>&gt; 4</td>
        <td>Adulthood</td>
        <td>Walks independently</td>
        <td style="color:${COLORS.green};">Mildest</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box">
    <div class="label">Our Patient</div>
    <div class="value" style="font-size:22px;">2 SMN2 copies &rarr; predicted Type I without treatment &mdash; underscores urgency of early intervention</div>
  </div>
`));

// ── Slide 7: Three Approved SMA Therapies ───────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Three Approved SMA Therapies</h1>
  <div class="section-label">Each Targets SMN Deficiency by a Different Mechanism</div>

  <div class="three-col">
    <div class="card card-accent">
      <div class="card-title" style="font-size:20px;">Onasemnogene Abeparvovec</div>
      <div class="card-body" style="font-size:17px;">
        <strong>Zolgensma</strong><br><br>
        &bull; AAV9 gene replacement<br>
        &bull; Delivers functional <em>SMN1</em> transgene<br>
        &bull; <strong>Single IV infusion</strong><br>
        &bull; Age &lt; 2 years<br>
        &bull; Crosses blood&ndash;brain barrier
      </div>
    </div>

    <div class="card card-violet">
      <div class="card-title" style="font-size:20px;">Nusinersen</div>
      <div class="card-body" style="font-size:17px;">
        <strong>Spinraza</strong><br><br>
        &bull; Antisense oligonucleotide (ASO)<br>
        &bull; Modifies SMN2 exon 7 splicing<br>
        &bull; <strong>Intrathecal injection</strong><br>
        &bull; Loading doses &rarr; q4 month maintenance<br>
        &bull; All ages
      </div>
    </div>

    <div class="card card-green">
      <div class="card-title" style="font-size:20px;">Risdiplam</div>
      <div class="card-body" style="font-size:17px;">
        <strong>Evrysdi</strong><br><br>
        &bull; Small molecule splicing modifier<br>
        &bull; Promotes SMN2 exon 7 inclusion<br>
        &bull; <strong>Daily oral liquid</strong><br>
        &bull; Age &ge; 2 months<br>
        &bull; Systemic distribution
      </div>
    </div>
  </div>
`));

// ── Slide 8: Treatment Efficacy ─────────────────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Treatment Efficacy</h1>
  <div class="section-label">Presymptomatic Treatment Outcomes</div>

  <div class="stats-row" style="margin-bottom:20px;">
    <div class="stat-card" style="background:${COLORS.violetLight}; border-color:${COLORS.violet};">
      <div class="stat-label">Nusinersen</div>
      <div class="stat-value">88% walking</div>
    </div>
    <div class="stat-card" style="background:${mc.light}; border-color:${mc.accent};">
      <div class="stat-label">Onasemnogene (OA)</div>
      <div class="stat-value">71% walking</div>
    </div>
    <div class="stat-card" style="background:${COLORS.greenLight}; border-color:${COLORS.green};">
      <div class="stat-label">Risdiplam</div>
      <div class="stat-value">50% walking</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-red">
      <div class="card-title">Without Treatment (Type I)</div>
      <div class="card-body" style="font-size:18px;">
        &bull; Never sit independently<br>
        &bull; Progressive weakness &amp; respiratory failure<br>
        &bull; Median survival &lt; 2 years
      </div>
    </div>

    <div class="card card-accent">
      <div class="card-title">Key Principle</div>
      <div class="card-body" style="font-size:18px;">
        &bull; <strong>Earlier treatment = better outcomes</strong><br>
        &bull; Motor neuron loss is irreversible<br>
        &bull; Presymptomatic treatment before denervation is critical
      </div>
    </div>
  </div>

  <div class="attribution">Data from NURTURE, SPR1NT, RAINBOWFISH trials (presymptomatic cohorts)</div>
`));

// ── Slide 9: Classic NBS Criteria ───────────────────────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Newborn Screening Criteria</h1>
  <div class="section-label">Wilson &amp; Jungner (1968) &mdash; WHO Framework</div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">

    <div class="card card-accent">
      <div class="card-title" style="font-size:20px;">1. Identifiable Condition</div>
      <div class="card-body" style="font-size:17px;">Well-defined disease with known natural history</div>
    </div>

    <div class="card card-green">
      <div class="card-title" style="font-size:20px;">2. Accepted Treatment</div>
      <div class="card-body" style="font-size:17px;">Effective intervention must exist for detected cases</div>
    </div>

    <div class="card card-violet">
      <div class="card-title" style="font-size:20px;">3. Facilities Available</div>
      <div class="card-body" style="font-size:17px;">Infrastructure for diagnosis and treatment must be in place</div>
    </div>

    <div class="card card-amber">
      <div class="card-title" style="font-size:20px;">4. Latent / Early Stage</div>
      <div class="card-body" style="font-size:17px;">Recognizable presymptomatic phase exists before irreversible damage</div>
    </div>

    <div class="card card-rose">
      <div class="card-title" style="font-size:20px;">5. Suitable Test</div>
      <div class="card-body" style="font-size:17px;">Simple, valid, and acceptable screening test available</div>
    </div>

    <div class="card card-blue">
      <div class="card-title" style="font-size:20px;">6. Accepted by Population</div>
      <div class="card-body" style="font-size:17px;">Screening procedure is acceptable to the target population</div>
    </div>

  </div>

  <div class="highlight-box" style="margin-top:10px;">
    <div class="label">SMA &amp; NBS</div>
    <div class="value" style="font-size:20px;">SMA meets all criteria &mdash; added to US RUSP in 2018; presymptomatic treatment transforms outcomes</div>
  </div>
`));

// ── Slide 10: Viral Vectors ─────────────────────────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Viral Vectors for Gene Therapy</h1>
  <div class="section-label">Delivery Vehicles for Transgenes</div>

  <div class="two-col">
    <div class="card card-accent" style="min-height:320px;">
      <div class="card-title" style="font-size:22px;">Adeno-Associated Virus (AAV)</div>
      <div class="card-body" style="font-size:18px;">
        &bull; <strong>Non-integrating</strong> &mdash; episomal persistence<br>
        &bull; Serotype determines tissue tropism<br>
        &bull; <strong>AAV9</strong> crosses blood&ndash;brain barrier<br>
        &bull; Small cargo limit: <strong>~4.7 kb</strong><br>
        &bull; Low immunogenicity (but pre-existing Ab)<br>
        &bull; Example: <strong>Zolgensma</strong> (SMA)
      </div>
    </div>

    <div class="card card-violet" style="min-height:320px;">
      <div class="card-title" style="font-size:22px;">Lentivirus</div>
      <div class="card-body" style="font-size:18px;">
        &bull; <strong>Integrating</strong> &mdash; stable genomic insertion<br>
        &bull; Large cargo capacity: <strong>~8&ndash;10 kb</strong><br>
        &bull; Used primarily <strong>ex vivo</strong> (HSC transduction)<br>
        &bull; Risk of insertional mutagenesis<br>
        &bull; Cannot cross BBB &mdash; requires cell transplant<br>
        &bull; Example: <strong>Skysona</strong> (X-ALD)
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Design Trade-off</div>
    <div class="value" style="font-size:20px;">AAV: safe but limited cargo &amp; transient in dividing cells &nbsp;|&nbsp; Lentivirus: durable but integration risk</div>
  </div>
`));

// ── Slide 11: ASOs — RNA Modulation ─────────────────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Antisense Oligonucleotides (ASOs)</h1>
  <div class="section-label">RNA-Level Modulation &mdash; 15&ndash;25 nt Synthetic Nucleic Acids</div>

  <div class="three-col" style="margin-bottom:20px;">
    <div class="card card-accent">
      <div class="card-title" style="font-size:20px;">RNA Degradation</div>
      <div class="card-body" style="font-size:17px;">
        ASO binds mRNA &rarr; recruits <strong>RNase H</strong> &rarr; target transcript cleaved and destroyed
      </div>
    </div>

    <div class="card card-violet">
      <div class="card-title" style="font-size:20px;">Splice Modification</div>
      <div class="card-body" style="font-size:17px;">
        ASO masks splicing silencer or enhancer &rarr; <strong>exon inclusion or skipping</strong> (e.g., nusinersen)
      </div>
    </div>

    <div class="card card-green">
      <div class="card-title" style="font-size:20px;">Translation Blocking</div>
      <div class="card-body" style="font-size:17px;">
        ASO binds 5&prime; UTR or start codon &rarr; <strong>ribosome cannot translate</strong> &rarr; protein reduced
      </div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-amber">
      <div class="card-title">Nusinersen Mechanism</div>
      <div class="card-body" style="font-size:18px;">
        Binds intronic splicing silencer (ISS-N1) in SMN2 intron 7 &rarr; blocks hnRNP A1 &rarr; promotes exon 7 inclusion &rarr; more full-length SMN protein
      </div>
    </div>

    <div class="card card-rose">
      <div class="card-title">Key ASO Properties</div>
      <div class="card-body" style="font-size:18px;">
        &bull; Chemically modified for stability (2&prime;-MOE, PS backbone)<br>
        &bull; Do not cross BBB well &rarr; intrathecal delivery<br>
        &bull; Reversible / redosable &mdash; not permanent
      </div>
    </div>
  </div>
`));

// ── Slide 12: Gene Editing (CRISPR/Cas9) ───────────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>Gene Editing: CRISPR/Cas9</h1>
  <div class="section-label">Precise Genomic Modification</div>

  <div class="two-col" style="margin-bottom:16px;">
    <div>
      <div class="card card-accent" style="margin-bottom:14px;">
        <div class="card-title">How It Works</div>
        <div class="card-body" style="font-size:18px;">
          &bull; Guide RNA directs Cas9 to target DNA<br>
          &bull; Cas9 creates a <strong>double-strand break</strong> (DSB)<br>
          &bull; Cutting DNA is easy &mdash; <strong>fixing DSBs is hard</strong>
        </div>
      </div>

      <div class="card card-red">
        <div class="card-title">DSB Repair Pathways</div>
        <div class="card-body" style="font-size:18px;">
          <strong>NHEJ:</strong> error-prone, insertions/deletions (good for knockouts)<br>
          <strong>HDR:</strong> precise correction, but very low efficiency in post-mitotic neurons
        </div>
      </div>
    </div>

    <div>
      <div class="card card-violet" style="margin-bottom:14px;">
        <div class="card-title">Next-Generation Editors</div>
        <div class="card-body" style="font-size:18px;">
          <strong>Base editing:</strong> C&rarr;T or A&rarr;G without DSB<br>
          <strong>Prime editing:</strong> search-and-replace, any small edit without DSB
        </div>
      </div>

      <div class="card card-amber">
        <div class="card-title">CNS Delivery Challenges</div>
        <div class="card-body" style="font-size:18px;">
          &bull; Must cross BBB or use direct injection<br>
          &bull; Large CRISPR machinery hard to package<br>
          &bull; Post-mitotic neurons: HDR is very inefficient<br>
          &bull; Off-target edits raise safety concerns
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 13: Comparison of Approaches ──────────────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Comparison of Therapeutic Approaches</h1>
  <div class="section-label">Matching Strategy to Disease</div>

  <table>
    <thead>
      <tr>
        <th style="width:20%;">Approach</th>
        <th style="width:28%;">Mechanism</th>
        <th style="width:26%;">Advantages</th>
        <th style="width:26%;">Disadvantages</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Gene Replacement</td>
        <td>Deliver functional gene via viral vector</td>
        <td>Potentially one-time; addresses root cause</td>
        <td>Cargo size limits; immunogenicity; cost</td>
      </tr>
      <tr>
        <td>Gene Editing</td>
        <td>CRISPR/base/prime editing of genomic DNA</td>
        <td>Permanent correction at DNA level</td>
        <td>Off-target risk; low HDR in neurons; delivery</td>
      </tr>
      <tr>
        <td>ASOs</td>
        <td>RNA-level modulation (splicing, degradation)</td>
        <td>Reversible; redosable; rapid N-of-1 development</td>
        <td>Repeated dosing; limited BBB penetration</td>
      </tr>
      <tr>
        <td>Protein Replacement</td>
        <td>Exogenous recombinant protein (e.g., ERT)</td>
        <td>Well-established; predictable pharmacology</td>
        <td>Does not cross BBB; frequent infusions; immune response</td>
      </tr>
    </tbody>
  </table>
`, `
  tbody td { font-size:17px; padding:14px 18px; }
  thead th { font-size:16px; padding:14px 18px; }
`));

// ── Slide 14: ASO vs Gene Therapy ───────────────────────────────────────────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>ASO vs Gene Therapy</h1>
  <div class="section-label">Head-to-Head Comparison</div>

  <div class="two-col">
    <div class="card card-violet" style="min-height:340px;">
      <div class="card-title" style="font-size:22px;">Antisense Oligonucleotides</div>
      <div class="card-body" style="font-size:18px;">
        &bull; <strong>Transient effect</strong> &mdash; redosable, reversible<br>
        &bull; Limited BBB penetration &rarr; intrathecal delivery<br>
        &bull; Rapid <strong>N-of-1 development</strong> possible<br>
        &bull; Well-characterized safety profile<br>
        &bull; Requires repeated administration<br>
        &bull; Can target gain-of-function diseases
      </div>
    </div>

    <div class="card card-accent" style="min-height:340px;">
      <div class="card-title" style="font-size:22px;">Gene Therapy (AAV)</div>
      <div class="card-body" style="font-size:18px;">
        &bull; <strong>Potentially durable</strong> &mdash; one-time treatment<br>
        &bull; AAV9 crosses blood&ndash;brain barrier<br>
        &bull; <strong>Immunogenicity</strong> &mdash; pre-existing antibodies can block<br>
        &bull; Cannot easily re-dose (anti-AAV immunity)<br>
        &bull; Cargo size limit (~4.7 kb for AAV)<br>
        &bull; Higher upfront cost ($2M+)
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Emerging Approach</div>
    <div class="value" style="font-size:20px;">Combination therapies (e.g., gene therapy + ASO maintenance) may optimize long-term outcomes for severe diseases</div>
  </div>
`));

// ── Slide 15: Challenges to Equitable Delivery ──────────────────────────────
slides.push(slideHTML(MOD, 15, TOTAL, `
  <h1>Challenges to Equitable Delivery</h1>
  <div class="section-label">Barriers to Global Access</div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">

    <div class="card card-red">
      <div class="card-title" style="font-size:20px;">Cost Barriers</div>
      <div class="card-body" style="font-size:18px;">
        Gene therapies cost <strong>$2M+</strong> per patient. ASOs require lifelong dosing at ~$375K/year. Pricing excludes most of the world.
      </div>
    </div>

    <div class="card card-amber">
      <div class="card-title" style="font-size:20px;">Diagnostic Access</div>
      <div class="card-body" style="font-size:18px;">
        NBS for genetic conditions unavailable in most countries. Late diagnosis eliminates the presymptomatic treatment window.
      </div>
    </div>

    <div class="card card-violet">
      <div class="card-title" style="font-size:20px;">Underrepresented Communities</div>
      <div class="card-body" style="font-size:18px;">
        Clinical trials lack diversity. Variant databases biased toward European ancestry. Risk of misclassification and delayed diagnosis.
      </div>
    </div>

    <div class="card card-accent">
      <div class="card-title" style="font-size:20px;">Diverse Stakeholders</div>
      <div class="card-body" style="font-size:18px;">
        Patients, families, insurers, regulators, pharma, and advocacy groups must align. Outcomes-based reimbursement models are emerging.
      </div>
    </div>

  </div>

  <div class="highlight-box" style="margin-top:12px;">
    <div class="label">Ethical Imperative</div>
    <div class="value" style="font-size:20px;">Genetic therapies must not widen health disparities &mdash; equitable access is a prerequisite, not an afterthought</div>
  </div>
`));

// ── Slide 16: Key Takeaways ─────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 16, TOTAL, [
  {
    title: "SMA is the paradigm for neurogenetic therapy",
    body: "Three approved therapies (gene replacement, ASO, small molecule) targeting the same pathway demonstrate the power of understanding disease biology.",
  },
  {
    title: "Presymptomatic treatment is transformative",
    body: "NBS enables treatment before motor neuron loss. SMA meets Wilson & Jungner criteria and was added to the US RUSP in 2018.",
  },
  {
    title: "Know the mechanism trade-offs",
    body: "Gene therapy: durable but immunogenic and cargo-limited. ASOs: reversible and redosable but require repeated dosing. Gene editing: permanent but delivery and safety challenges remain.",
  },
  {
    title: "One nucleotide changes everything",
    body: "The C\u2192T change in SMN2 exon 7 shifts splicing from 100% to ~10% exon inclusion \u2014 and is the precise target of nusinersen and risdiplam.",
  },
  {
    title: "Equity must accompany innovation",
    body: "Cost ($2M+ per treatment), limited NBS infrastructure, and trial diversity gaps threaten to restrict these therapies to wealthy populations.",
  },
]));

// ── Render ───────────────────────────────────────────────────────────────────
await renderSlides("therapies", slides);
