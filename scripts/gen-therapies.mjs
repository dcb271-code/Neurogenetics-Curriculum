/**
 * scripts/gen-therapies.mjs
 *
 * Generates 15 slides for the Gene and Molecular Therapies module.
 * Aligned to JSON section structure (5 sections, 3 slides each).
 *
 * distributeSlides(15, 5) = 3 per section, 0 remainder
 *   S0 (Categories of Gene and Molecular Therapy):   slides 1–3
 *   S1 (AAV Vector Biology and CNS Delivery):        slides 4–6
 *   S2 (Approved Neurological Gene Therapies):       slides 7–9
 *   S3 (Antisense Oligonucleotide Therapies):        slides 10–12
 *   S4 (Practical Considerations & Future):          slides 13–15
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
const TOTAL = 15;

const slides = [];

// ═══════════════════════════════════════════════════════════════════════════
// S0: Categories of Gene and Molecular Therapy — slides 1–3
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 1: Title ──────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Gene &amp; Molecular Therapies<br>in Neurogenetics",
  subtitle: "From gene replacement to CRISPR — mechanisms, approved treatments, and future directions",
  totalSlides: TOTAL,
  topics: [
    "Categories of Gene & Molecular Therapy",
    "AAV Vector Biology & CNS Delivery",
    "Approved Neurological Gene Therapies",
    "Antisense Oligonucleotide Therapies",
    "Practical Considerations & Future Directions",
  ],
}));

// ── Slide 2: Gene Addition & Gene Silencing ─────────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Gene Addition &amp; Gene Silencing</h1>
  <div class="section-label">Two Core Strategies</div>

  <div class="two-col">
    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Gene Addition / Replacement</div>
      <div class="card-body" style="font-size:18px; margin-top:8px;">
        Deliver a functional gene copy via viral vector (AAV) or non-viral carrier.
      </div>
      <div style="margin-top:16px; padding:14px 18px; background:rgba(5,150,105,0.06); border-radius:8px;">
        <div style="font-size:17px; color:${mc.dark}; line-height:1.6;">
          &bull; For <strong>recessive loss-of-function</strong> disorders<br>
          &bull; Transgene remains <strong>episomal</strong> in neurons<br>
          &bull; Does not alter genomic DNA<br>
          &bull; Examples: Zolgensma (SMA), Luxturna (LCA)
        </div>
      </div>
    </div>

    <div>
      <div class="card card-violet" style="padding:24px; margin-bottom:16px;">
        <div class="card-title" style="font-size:20px;">ASO Silencing</div>
        <div class="card-body" style="font-size:17px;">
          18&ndash;25 nt synthetic single-stranded DNA &rarr; binds target mRNA via Watson-Crick base pairing &rarr; <strong>RNaseH-mediated degradation</strong> or steric blockade of splicing/translation. Examples: nusinersen (SMA), tofersen (SOD1-ALS).
        </div>
      </div>
      <div class="card card-rose" style="padding:24px;">
        <div class="card-title" style="font-size:20px;">RNAi Silencing</div>
        <div class="card-body" style="font-size:17px;">
          siRNA/shRNA triggers <strong>RISC complex</strong> to cleave complementary mRNA. Examples: patisiran (TTR-siRNA for hATTR, IV lipid nanoparticle), inclisiran (PCSK9-targeting siRNA).
        </div>
      </div>
    </div>
  </div>
`));

// ── Slide 3: Gene Editing & mRNA Therapeutics ───────────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Gene Editing &amp; mRNA Therapeutics</h1>
  <div class="section-label">Emerging Modalities</div>

  <div class="card card-accent" style="padding:28px; margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">Gene Editing &mdash; CRISPR-Cas9</div>
    <div class="card-body" style="font-size:18px; margin-top:8px;">
      Guided by sgRNA, creates double-strand break at a specific genomic locus.
    </div>
    <div style="margin-top:14px; font-size:17px; line-height:1.6; color:${COLORS.body};">
      &bull; <strong>HDR:</strong> precise correction (in dividing cells)<br>
      &bull; <strong>NHEJ:</strong> indels for knockouts (in post-mitotic neurons &mdash; limited HDR)<br>
      &bull; <strong>Base editors &amp; prime editors:</strong> avoid DSBs entirely<br>
      &bull; <strong>Casgevy</strong> (sickle cell / beta-thal) &mdash; first approved CRISPR therapy (2023)
    </div>
  </div>

  <div class="two-col">
    <div class="card card-green" style="padding:24px;">
      <div class="card-title">mRNA Therapeutics</div>
      <div class="card-body" style="font-size:18px;">
        Modified mRNA encoding the therapeutic protein. Transient expression, no genomic integration. Lipid nanoparticle delivery. OTC deficiency trials underway; neurological applications emerging.
      </div>
    </div>
    <div class="card card-amber" style="padding:24px;">
      <div class="card-title">Matching Strategy to Disease</div>
      <div class="card-body" style="font-size:18px;">
        <strong>Loss-of-function</strong> &rarr; gene addition or mRNA<br>
        <strong>Gain-of-function</strong> &rarr; gene silencing (ASO/RNAi)<br>
        <strong>Specific point mutation</strong> &rarr; gene editing
      </div>
    </div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// S1: AAV Vector Biology and CNS Delivery — slides 4–6
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 4: AAV Structure & Serotypes ──────────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>AAV Vector Biology</h1>
  <div class="section-label">Serotypes &amp; Tropism</div>

  <div class="card card-accent" style="padding:28px; margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">Adeno-Associated Virus (AAV)</div>
    <div class="card-body" style="font-size:19px;">
      Small (25 nm), non-enveloped, ssDNA virus. Naturally replication-deficient. Recombinant AAV retains only <strong>inverted terminal repeats (ITRs)</strong> flanking the therapeutic transgene &mdash; all viral coding sequences removed.
    </div>
  </div>

  <div class="two-col">
    <div class="card card-violet" style="padding:24px;">
      <div class="card-title">AAV9 &amp; AAVrh10 (CNS Preferred)</div>
      <div class="card-body" style="font-size:17px;">
        &bull; Cross the <strong>blood-brain barrier</strong> after IV (most efficiently in neonates)<br>
        &bull; Transduce both neurons and astrocytes<br>
        &bull; Used in SMA (Zolgensma), Batten disease, MLD trials
      </div>
    </div>
    <div class="card card-amber" style="padding:24px;">
      <div class="card-title">Cargo Capacity: ~4.7 kb</div>
      <div class="card-body" style="font-size:17px;">
        &bull; DMD full-length cDNA = 14 kb (too large) &rarr; <strong>micro-dystrophin</strong> constructs<br>
        &bull; Suitable: SMN1 (1.7 kb), MECP2 (1.5 kb), ARSA (MLD), CLN genes (Batten)
      </div>
    </div>
  </div>
`));

// ── Slide 5: Episomal Persistence & Administration Routes ───────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>AAV Persistence &amp; Administration Routes</h1>
  <div class="section-label">Delivery to the CNS</div>

  <div class="card card-accent" style="padding:24px; margin-bottom:20px;">
    <div class="card-title">Episomal Persistence</div>
    <div class="card-body" style="font-size:18px;">
      rAAV DNA remains largely <strong>episomal (non-integrating)</strong> in post-mitotic neurons &mdash; stable long-term expression without insertional mutagenesis risk. In rapidly dividing cells, expression is lost with each division.
    </div>
  </div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
    <div class="card card-green" style="padding:20px;">
      <div class="card-title" style="font-size:20px;">Intravenous (IV)</div>
      <div class="card-body" style="font-size:17px;">Crosses BBB in young patients. Requires high dose. Used for Zolgensma in infants.</div>
    </div>
    <div class="card card-violet" style="padding:20px;">
      <div class="card-title" style="font-size:20px;">Intrathecal / ICV</div>
      <div class="card-body" style="font-size:17px;">Reduces dose needed. Bypasses BBB. Spreads via CSF distribution.</div>
    </div>
    <div class="card card-amber" style="padding:20px;">
      <div class="card-title" style="font-size:20px;">Intraparenchymal</div>
      <div class="card-body" style="font-size:17px;">Direct focal delivery. Used in Parkinson and Alzheimer trials.</div>
    </div>
    <div class="card card-rose" style="padding:20px;">
      <div class="card-title" style="font-size:20px;">Intravitreal</div>
      <div class="card-body" style="font-size:17px;">Eye diseases &mdash; LCA / RPE65 (Luxturna).</div>
    </div>
  </div>
`));

// ── Slide 6: Immune Responses to AAV ────────────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>Immune Responses to AAV</h1>
  <div class="section-label">The Major Barrier to AAV Gene Therapy</div>

  <div class="stats-row" style="margin-bottom:24px;">
    <div class="stat-card" style="border-color:${COLORS.red}; background:${COLORS.redLight};">
      <div class="stat-label">AAV9 NAb Seropositive (Adults)</div>
      <div class="stat-value">40&ndash;70%</div>
    </div>
    <div class="stat-card" style="border-color:${COLORS.amber}; background:${COLORS.amberLight};">
      <div class="stat-label">NAb Titer Exclusion</div>
      <div class="stat-value">&ge;1:50</div>
    </div>
    <div class="stat-card" style="border-color:${mc.accent}; background:${mc.light};">
      <div class="stat-label">Immunosuppression</div>
      <div class="stat-value">Essential</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card card-red" style="padding:24px;">
      <div class="card-title">Pre-Existing Neutralizing Antibodies</div>
      <div class="card-body" style="font-size:18px;">
        From natural AAV infection. NAb seropositivity may <strong>exclude patients</strong> from IV gene therapy trials. Prevalence increases with age.
      </div>
    </div>
    <div class="card card-amber" style="padding:24px;">
      <div class="card-title">Complement Activation (CARPA)</div>
      <div class="card-body" style="font-size:18px;">
        Complement-mediated pseudo-allergic reaction is a risk with high-dose IV AAV. Immunosuppression protocols (prednisolone &plusmn; rituximab) are essential.
      </div>
    </div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// S2: Approved Neurological Gene Therapies — slides 7–9
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 7: Zolgensma & Luxturna ───────────────────────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>Zolgensma &amp; Luxturna</h1>
  <div class="section-label">First Approved In Vivo Gene Therapies</div>

  <div class="two-col">
    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Onasemnogene Abeparvovec (Zolgensma)</div>
      <div class="card-body" style="font-size:17px; margin-top:8px;">
        <strong>AAV9-SMN1</strong> | Single IV infusion | FDA 2019
      </div>
      <div style="margin-top:14px; font-size:17px; line-height:1.6;">
        &bull; SMA patients &lt;2 years<br>
        &bull; <strong>$2.1M</strong> one-time dose<br>
        &bull; Presymptomatic Tx near-normalizes motor outcomes<br>
        &bull; DRG toxicity seen in primate studies &mdash; clinical monitoring required
      </div>
    </div>

    <div class="card card-violet" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Voretigene Neparvovec (Luxturna)</div>
      <div class="card-body" style="font-size:17px; margin-top:8px;">
        <strong>AAV2-RPE65</strong> | Subretinal injection | FDA 2017
      </div>
      <div style="margin-top:14px; font-size:17px; line-height:1.6;">
        &bull; RPE65-related Leber congenital amaurosis<br>
        &bull; Bilateral treatment<br>
        &bull; Sustained visual improvement<br>
        &bull; <strong>$425K per eye</strong> &mdash; first approved in vivo AAV in the US
      </div>
    </div>
  </div>
`));

// ── Slide 8: Elevidys, Libmeldy & Lentiviral Platform ───────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>Elevidys &amp; Lentiviral Gene Therapies</h1>
  <div class="section-label">Expanding the Approved Portfolio</div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${mc.accent};">1</div>
    <div class="card card-accent" style="flex:1; margin-bottom:0; padding:20px 24px;">
      <div class="card-title" style="font-size:20px;">Delandistrogene Moxeparvovec (Elevidys)</div>
      <div class="card-body" style="font-size:17px;"><strong>AAVrh74-micro-dystrophin</strong> | IV infusion | FDA 2023 (accelerated) for DMD ages 4&ndash;5 years. Uses engineered micro-dystrophin (138 kDa functional mini-protein). Ongoing trials in older patients.</div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.violet};">2</div>
    <div class="card card-violet" style="flex:1; margin-bottom:0; padding:20px 24px;">
      <div class="card-title" style="font-size:20px;">Atidarsagene Autotemcel (Libmeldy)</div>
      <div class="card-body" style="font-size:17px;"><strong>Ex vivo autologous HSC + lentiviral ARSA</strong> | EMA 2020 for metachromatic leukodystrophy in pre-symptomatic or early symptomatic patients. Longest follow-up &gt;10 years &mdash; no neurological progression vs. natural history.</div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.green};">3</div>
    <div class="card card-green" style="flex:1; margin-bottom:0; padding:20px 24px;">
      <div class="card-title" style="font-size:20px;">Zynteglo &amp; Skysona</div>
      <div class="card-body" style="font-size:17px;">Ex vivo HSC gene therapy for beta-thalassemia and cerebral adrenoleukodystrophy &mdash; establishing the <strong>lentiviral HSC platform</strong> for CNS demyelinating leukodystrophies.</div>
    </div>
  </div>
`));

// ── Slide 9: Approved Gene Therapies Summary Table ──────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Approved Gene Therapies at a Glance</h1>
  <div class="section-label">Quick Reference</div>

  <table>
    <thead>
      <tr>
        <th style="width:20%;">Product</th>
        <th style="width:15%;">Vector</th>
        <th style="width:18%;">Disease</th>
        <th style="width:15%;">Route</th>
        <th style="width:15%;">Approval</th>
        <th style="width:17%;">Key Lesson</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Zolgensma</td>
        <td>AAV9</td>
        <td>SMA</td>
        <td>IV</td>
        <td>FDA 2019</td>
        <td>Presymptomatic Tx</td>
      </tr>
      <tr>
        <td>Luxturna</td>
        <td>AAV2</td>
        <td>RPE65-LCA</td>
        <td>Subretinal</td>
        <td>FDA 2017</td>
        <td>First in vivo AAV</td>
      </tr>
      <tr>
        <td>Elevidys</td>
        <td>AAVrh74</td>
        <td>DMD</td>
        <td>IV</td>
        <td>FDA 2023</td>
        <td>Micro-dystrophin</td>
      </tr>
      <tr>
        <td>Libmeldy</td>
        <td>Lentiviral</td>
        <td>MLD</td>
        <td>Ex vivo HSC</td>
        <td>EMA 2020</td>
        <td>HSC lentiviral platform</td>
      </tr>
      <tr>
        <td>Skysona</td>
        <td>Lentiviral</td>
        <td>c-ALD</td>
        <td>Ex vivo HSC</td>
        <td>FDA 2022</td>
        <td>CNS leukodystrophy</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:12px;">
    <div class="label">Common Theme</div>
    <div class="value" style="font-size:22px;">Earlier treatment = better outcomes. Patient selection (age, weight, immune status) is critical.</div>
  </div>
`, `
  tbody td { font-size:16px; padding:12px 16px; }
  thead th { font-size:15px; padding:12px 16px; }
`));

// ═══════════════════════════════════════════════════════════════════════════
// S3: Antisense Oligonucleotide Therapies — slides 10–12
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 10: ASO Mechanism & Chemistry ─────────────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>Antisense Oligonucleotides (ASOs)</h1>
  <div class="section-label">Mechanism &amp; Chemical Modifications</div>

  <div class="card card-accent" style="padding:28px; margin-bottom:20px;">
    <div class="card-title" style="font-size:22px;">What Are ASOs?</div>
    <div class="card-body" style="font-size:19px;">
      Synthetic oligonucleotides (18&ndash;25 nt) designed to bind specific RNA sequences via complementary base pairing, modulating RNA fate by multiple mechanisms.
    </div>
  </div>

  <div class="three-col">
    <div class="card card-green" style="padding:22px;">
      <div class="card-title" style="font-size:20px;">RNaseH Degradation</div>
      <div class="card-body" style="font-size:17px;">ASO&ndash;mRNA hybrid recruits RNaseH &rarr; target mRNA cleaved and destroyed (e.g., tofersen for SOD1)</div>
    </div>
    <div class="card card-violet" style="padding:22px;">
      <div class="card-title" style="font-size:20px;">Splice Modulation</div>
      <div class="card-body" style="font-size:17px;">Blocks splicing silencer/enhancer &rarr; forces exon inclusion or skipping (e.g., nusinersen for SMA)</div>
    </div>
    <div class="card card-amber" style="padding:22px;">
      <div class="card-title" style="font-size:20px;">Chemical Modifications</div>
      <div class="card-body" style="font-size:17px;">Phosphorothioate backbone, 2&rsquo;-O-methyl, LNA, PMO &mdash; protect from nucleases, improve affinity</div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">CNS Delivery</div>
    <div class="value" style="font-size:22px;">Intrathecal ASOs distribute broadly through CSF and penetrate neurons and glia &mdash; no viral vector needed</div>
  </div>
`));

// ── Slide 11: Nusinersen & Tofersen ─────────────────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>Nusinersen &amp; Tofersen</h1>
  <div class="section-label">Two Paradigm-Shifting ASOs</div>

  <div class="two-col">
    <div class="card card-accent" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Nusinersen (Spinraza)</div>
      <div class="card-body" style="font-size:17px; margin-top:8px;">
        <strong>Intrathecal ASO</strong> | Approved 2016
      </div>
      <div style="margin-top:14px; font-size:17px; line-height:1.6;">
        &bull; Targets <strong>ISS-N1</strong> in SMN2 intron 7<br>
        &bull; Blocks hnRNP binding &rarr; forces exon 7 inclusion<br>
        &bull; Increases full-length SMN2 mRNA<br>
        &bull; Loading doses then q4 months maintenance<br>
        &bull; ENDEAR &amp; CHERISH trials: transformative in infantile-onset SMA
      </div>
    </div>

    <div class="card card-violet" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Tofersen (Qalsody)</div>
      <div class="card-body" style="font-size:17px; margin-top:8px;">
        <strong>Intrathecal ASO</strong> | FDA 2023
      </div>
      <div style="margin-top:14px; font-size:17px; line-height:1.6;">
        &bull; Targets <strong>SOD1 mRNA</strong><br>
        &bull; RNaseH-mediated cleavage reduces SOD1 protein<br>
        &bull; First approved Tx for a <strong>monogenic ALS subtype</strong><br>
        &bull; Reduces CSF/plasma NfL (neurofilament light) biomarker<br>
        &bull; Pharmacodynamic biomarker demonstrates slowed neurodegeneration
      </div>
    </div>
  </div>
`));

// ── Slide 12: Other ASO Programs ────────────────────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>Expanding the ASO Landscape</h1>
  <div class="section-label">Approved &amp; Emerging ASO Programs</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div class="card card-green" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">Inotersen &amp; Eplontersen</div>
      <div class="card-body" style="font-size:18px; margin-top:8px;">
        RNaseH ASO targeting <strong>TTR mRNA</strong> (both mutant and wild-type). Reduce TTR production. Subcutaneous injection. Approved for hereditary transthyretin amyloid polyneuropathy (hATTR-PN).
      </div>
      <div style="margin-top:12px; font-size:17px; color:${COLORS.muted};">
        Patisiran (siRNA) has a similar mechanism and indication.
      </div>
    </div>

    <div class="card card-amber" style="padding:28px;">
      <div class="card-title" style="font-size:22px;">UBE3A-ATS ASO for Angelman Syndrome</div>
      <div class="card-body" style="font-size:18px; margin-top:8px;">
        Targets the non-coding antisense transcript that silences paternal <strong>UBE3A</strong> in neurons. Phase 1/2 trials show paternal UBE3A protein restoration.
      </div>
      <div style="margin-top:12px; font-size:17px; color:${COLORS.muted};">
        Toxicity in primates caused temporary pause &mdash; development ongoing with modified dosing.
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">ASO Advantages</div>
    <div class="value" style="font-size:22px;">Reversible, redosable, rapid N-of-1 development possible. Ideal for gain-of-function and splice-modulation targets.</div>
  </div>
`));

// ═══════════════════════════════════════════════════════════════════════════
// S4: Practical Considerations & Future Directions — slides 13–15
// ═══════════════════════════════════════════════════════════════════════════

// ── Slide 13: Immunosuppression & Durability ────────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Immunosuppression &amp; Durability Challenges</h1>
  <div class="section-label">Practical Barriers to Gene Therapy</div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.red};">1</div>
    <div class="card card-red" style="flex:1; margin-bottom:0; padding:20px 24px;">
      <div class="card-title" style="font-size:20px;">Pre-Existing AAV Neutralizing Antibodies</div>
      <div class="card-body" style="font-size:17px;">AAV9 NAb &ge;1:50 typically excludes patients from IV gene therapy. Prevalence increases with age (40&ndash;70% of adults). Plasmapheresis to reduce titers is experimental.</div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${COLORS.amber};">2</div>
    <div class="card card-amber" style="flex:1; margin-bottom:0; padding:20px 24px;">
      <div class="card-title" style="font-size:20px;">Immunosuppression Protocols</div>
      <div class="card-body" style="font-size:17px;">Prednisolone 1 mg/kg/day initiated before and continued weeks after AAV administration to suppress T-cell response to capsid. Anti-CD20 (rituximab) added in high-risk protocols. Liver enzyme monitoring essential.</div>
    </div>
  </div>

  <div class="numbered-item">
    <div class="number-circle" style="background:${mc.accent};">3</div>
    <div class="card card-accent" style="flex:1; margin-bottom:0; padding:20px 24px;">
      <div class="card-title" style="font-size:20px;">Episomal Dilution in Growing Livers</div>
      <div class="card-body" style="font-size:17px;">In infants, rapidly dividing hepatocytes dilute episomal rAAV &rarr; decreasing expression over years. Critical limitation for early-treated SMA patients approaching adolescence &mdash; combination with ASO may address durability.</div>
    </div>
  </div>
`));

// ── Slide 14: Re-Dosing & Emerging Targets ──────────────────────────────────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>Re-Dosing Challenges &amp; Emerging Targets</h1>
  <div class="section-label">Next-Generation Approaches</div>

  <div class="card card-red" style="padding:24px; margin-bottom:20px;">
    <div class="card-title">Re-Dosing: The Unsolved Problem</div>
    <div class="card-body" style="font-size:18px;">
      Once immune response to AAV capsid develops, subsequent doses of the same serotype are inefficient. Cross-reactive immunity complicates switching. <strong>Next-gen solutions:</strong> ML-designed capsids, deimmunized capsids.
    </div>
  </div>

  <h3>Emerging Neurological Gene Therapy Targets</h3>
  <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px;">
    <div class="card card-accent" style="padding:20px;">
      <div class="card-title" style="font-size:18px;">Huntington Disease</div>
      <div class="card-body" style="font-size:16px;">HTT lowering via ASO, siRNA, and CRISPR &mdash; clinical trials underway</div>
    </div>
    <div class="card card-violet" style="padding:20px;">
      <div class="card-title" style="font-size:18px;">Parkinson Disease</div>
      <div class="card-body" style="font-size:16px;">AADC and GAD1/2 gene therapy for symptom modification</div>
    </div>
    <div class="card card-green" style="padding:20px;">
      <div class="card-title" style="font-size:18px;">Rett Syndrome</div>
      <div class="card-body" style="font-size:16px;">MECP2 AAV &mdash; dose-sensitive, narrow therapeutic window</div>
    </div>
    <div class="card card-amber" style="padding:20px;">
      <div class="card-title" style="font-size:18px;">Batten Disease / NCL</div>
      <div class="card-body" style="font-size:16px;">CLN2 AAV; cerliponase alfa (intrathecal ERT) approved for CLN2</div>
    </div>
    <div class="card card-rose" style="padding:20px;">
      <div class="card-title" style="font-size:18px;">Alzheimer Disease</div>
      <div class="card-body" style="font-size:16px;">APOE4 gene editing. Note: lecanemab is anti-A&beta; mAb, NOT gene therapy</div>
    </div>
    <div class="card card-blue" style="padding:20px;">
      <div class="card-title" style="font-size:18px;">GM1/GM2 Gangliosidosis</div>
      <div class="card-body" style="font-size:16px;">Multiple AAV gene therapy programs in clinical trials</div>
    </div>
  </div>
`));

// ── Slide 15: Key Takeaways ─────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 15, TOTAL, [
  {
    title: "Match the modality to the disease mechanism",
    body: "Gene addition for recessive loss-of-function; ASO/RNAi for gain-of-function silencing; CRISPR for specific point mutations; mRNA for transient protein replacement.",
  },
  {
    title: "AAV9 is the dominant CNS vector — but has limits",
    body: "~4.7 kb cargo capacity, pre-existing NAb in 40–70% of adults, episomal dilution in growing tissues, and re-dosing blocked by anti-capsid immunity.",
  },
  {
    title: "Five gene therapies are now approved for neuro disorders",
    body: "Zolgensma (SMA), Luxturna (LCA), Elevidys (DMD), Libmeldy (MLD), Skysona (cALD). Earlier treatment = better outcomes in all cases.",
  },
  {
    title: "ASOs provide a versatile, redosable platform",
    body: "Nusinersen (SMA splice modulation) and tofersen (SOD1-ALS mRNA degradation) are approved. IT delivery bypasses BBB without viral vectors.",
  },
  {
    title: "Practical challenges remain formidable",
    body: "Cost ($2M+), immunogenicity, durability, re-dosing limitations, and global access inequity must be addressed alongside scientific advances.",
  },
]));

// ── Render ───────────────────────────────────────────────────────────────────
await renderSlides(MOD, slides);
