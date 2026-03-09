/**
 * scripts/gen-pharmacogenetics.mjs
 *
 * Generates 15 slides for the Pharmacogenetics in Neurology module.
 * Sections align exactly with data/modules/pharmacogenetics.json:
 *   S0 (slides 1-3): Principles of Pharmacogenetics
 *   S1 (slides 4-6): CYP450 Enzymes Most Relevant to Neurology
 *   S2 (slides 7-9): HLA Alleles and Serious Drug Hypersensitivity
 *   S3 (slides 10-12): Antiepileptic Drug Pharmacogenomics
 *   S4 (slides 13-15): Clinical Implementation of Pharmacogenetic Testing
 *
 * Run: node scripts/gen-pharmacogenetics.mjs
 */

import {
  slideHTML, titleSlideHTML, takeawaysSlideHTML,
  MODULE_COLORS, COLORS,
} from "./slide-design-system.mjs";
import { renderSlides } from "./render-slides.mjs";

const MOD = "pharmacogenetics";
const mc = MODULE_COLORS[MOD];
const TOTAL = 15;

const slides = [];

// ============================================================================
// S0: Principles of Pharmacogenetics (slides 1-3)
// ============================================================================

// ── Slide 1: Title ──────────────────────────────────────────────────────────
slides.push(titleSlideHTML(MOD, {
  title: "Pharmacogenetics in Neurology",
  subtitle: "Optimizing drug selection and dosing through genetic testing",
  totalSlides: TOTAL,
  topics: [
    "PK vs PD & metabolizer phenotypes",
    "CYP450 enzymes in neurology",
    "HLA alleles & SJS/TEN risk",
    "AED pharmacogenomics (SCN1A, POLG)",
    "Clinical implementation & CPIC",
  ],
}));

// ── Slide 2: PK vs PD & Metabolizer Phenotypes ─────────────────────────────
slides.push(slideHTML(MOD, 2, TOTAL, `
  <h1>Principles of Pharmacogenetics</h1>
  <div class="section-label">Pharmacokinetics vs Pharmacodynamics</div>

  <div class="two-col" style="margin-bottom:24px;">
    <div>
      <div class="card card-accent" style="min-height:260px;">
        <div class="card-title" style="font-size:34px;">Pharmacokinetics (PK)</div>
        <div class="card-body" style="font-size:27px;">
          <strong>&ldquo;What the body does to the drug&rdquo;</strong>
          <br><br>
          <strong>A</strong>bsorption &rarr; <strong>D</strong>istribution &rarr; <strong>M</strong>etabolism &rarr; <strong>E</strong>xcretion
          <br><br>
          Phase I: <strong>CYP450 enzymes</strong> (CYP1A2, CYP2C9, CYP2C19, CYP2D6, CYP3A4/5)<br>
          Phase II: UGT enzymes (lamotrigine, valproate)
        </div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="min-height:260px;">
        <div class="card-title" style="font-size:34px;">Pharmacodynamics (PD)</div>
        <div class="card-body" style="font-size:27px;">
          <strong>&ldquo;What the drug does to the body&rdquo;</strong>
          <br><br>
          Drug&ndash;receptor &amp; immune-mediated interactions
          <br><br>
          PD variants: <strong>HLA alleles</strong> (immune-mediated hypersensitivity)<br>
          PK = dose adjustment may work; PD = <strong>drug must be avoided</strong>
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">CPIC (cpicpgx.org)</div>
    <div class="value" style="font-size:31px;">Clinical Pharmacogenetics Implementation Consortium &mdash; free, evidence-based prescribing guidelines based on genotype</div>
  </div>
`));

// ── Slide 3: Star Alleles & Metabolizer Phenotypes ──────────────────────────
slides.push(slideHTML(MOD, 3, TOTAL, `
  <h1>Star Alleles &amp; Metabolizer Phenotypes</h1>
  <div class="section-label">Genotype-to-Phenotype Translation</div>

  <div class="card card-accent" style="margin-bottom:18px;">
    <div class="card-title">Star (*) Allele Nomenclature</div>
    <div class="card-body" style="font-size:27px;">
      <strong>*1</strong> = reference allele (normal function) &nbsp;&bull;&nbsp;
      <strong>*2, *3</strong> = loss-of-function variants &nbsp;&bull;&nbsp;
      <strong>*1xN</strong> = gene duplication (CYP2D6 ultra-rapid)
    </div>
  </div>

  <table style="margin-bottom:18px;">
    <thead>
      <tr><th>Phenotype</th><th>Enzyme Activity</th><th>Example Genotype</th><th>Clinical Effect</th></tr>
    </thead>
    <tbody>
      <tr>
        <td style="color:${COLORS.red};">Ultra-Rapid (UM)</td>
        <td>Greatly increased</td>
        <td>CYP2D6 *1/*1xN</td>
        <td>Drug cleared too fast &mdash; treatment failure</td>
      </tr>
      <tr>
        <td style="color:${COLORS.green};">Normal (NM/EM)</td>
        <td>Expected activity</td>
        <td>CYP2C19 *1/*1</td>
        <td>Standard dosing appropriate</td>
      </tr>
      <tr>
        <td style="color:${COLORS.amber};">Intermediate (IM)</td>
        <td>Decreased</td>
        <td>CYP2C19 *1/*2</td>
        <td>Consider dose reduction</td>
      </tr>
      <tr>
        <td style="color:${COLORS.red};">Poor (PM)</td>
        <td>Minimal / none</td>
        <td>CYP2C19 *2/*2</td>
        <td>High toxicity risk &mdash; avoid or reduce dose</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box">
    <div class="label">Copy Number Variation</div>
    <div class="value" style="font-size:31px;">CYP2D6 gene can be deleted (PM), duplicated (UM), or multiplied (&gt;2 copies). CNV is critical for accurate phenotype prediction.</div>
  </div>
`));

// ============================================================================
// S1: CYP450 Enzymes Most Relevant to Neurology (slides 4-6)
// ============================================================================

// ── Slide 4: CYP2C9 & CYP2C19 ─────────────────────────────────────────────
slides.push(slideHTML(MOD, 4, TOTAL, `
  <h1>CYP2C9 &amp; CYP2C19 in Neurology</h1>
  <div class="section-label">Key Pharmacokinetic Enzymes</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div>
      <div class="card card-red" style="min-height:310px;">
        <div class="card-title" style="font-size:31px;">CYP2C9 &amp; Phenytoin</div>
        <div class="card-body" style="font-size:25px;">
          Poor metabolizers (*2/*3 compound het) have <strong>dramatically reduced phenytoin clearance</strong>
          <br><br>
          &bull; Phenytoin has narrow therapeutic index<br>
          &bull; Toxicity at standard doses: nystagmus, ataxia, lethargy<br>
          &bull; CPIC: <strong>25&ndash;50% dose reduction</strong> in PMs<br>
          &bull; ~1% of Europeans are CYP2C9 PMs
        </div>
      </div>
    </div>
    <div>
      <div class="card card-accent" style="min-height:310px;">
        <div class="card-title" style="font-size:31px;">CYP2C19 &amp; Clopidogrel</div>
        <div class="card-body" style="font-size:25px;">
          Clopidogrel is a <strong>prodrug requiring CYP2C19 activation</strong>
          <br><br>
          &bull; PMs (*2/*3) cannot convert to active thienopyridine<br>
          &bull; Increased stroke/MI risk in PMs<br>
          &bull; Loss-of-function alleles in ~50% of Asians<br>
          &bull; Use <strong>prasugrel or ticagrelor</strong> for PMs
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Population Variation</div>
    <div class="value" style="font-size:31px;">CYP2C19 PM: ~2&ndash;5% of Europeans, but 15&ndash;20% of East Asians &mdash; ancestry-based risk assessment is essential</div>
  </div>
`));

// ── Slide 5: CYP2C19 & Clobazam, CYP2D6 & TCAs ────────────────────────────
slides.push(slideHTML(MOD, 5, TOTAL, `
  <h1>CYP2C19 (Clobazam) &amp; CYP2D6 (TCAs)</h1>
  <div class="section-label">Drug-Specific Metabolizer Consequences</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div>
      <div class="card card-amber" style="min-height:280px;">
        <div class="card-title" style="font-size:31px;">CYP2C19 &amp; Clobazam</div>
        <div class="card-body" style="font-size:25px;">
          Clobazam &rarr; N-desmethylclobazam (active metabolite) cleared by <strong>CYP2C19</strong>
          <br><br>
          &bull; PMs have <strong>5-fold higher metabolite levels</strong><br>
          &bull; Increased sedation, toxicity risk<br>
          &bull; FDA: start at 5 mg/day; max half standard dose<br>
          &bull; Monitor N-desmethylclobazam levels
        </div>
      </div>
    </div>
    <div>
      <div class="card card-violet" style="min-height:280px;">
        <div class="card-title" style="font-size:31px;">CYP2D6 &amp; Tricyclic Antidepressants</div>
        <div class="card-body" style="font-size:25px;">
          Amitriptyline &amp; nortriptyline primarily metabolized by CYP2D6
          <br><br>
          &bull; <strong>PMs:</strong> very high plasma levels &rarr; cardiac arrhythmia, anticholinergic toxicity<br>
          &bull; <strong>UMs:</strong> subtherapeutic levels &rarr; treatment failure<br>
          &bull; CPIC: use alternative antidepressant for PMs/UMs<br>
          &bull; CYP2D6 PM: ~7&ndash;10% of Europeans
        </div>
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Remember</div>
    <div class="value" style="font-size:31px;">Metabolizer phenotypes are substrate-specific &mdash; same gene, different recommendations per drug</div>
  </div>
`));

// ── Slide 6: CYP3A4/5 & Drug Interactions ──────────────────────────────────
slides.push(slideHTML(MOD, 6, TOTAL, `
  <h1>CYP3A4/5 &amp; Carbamazepine</h1>
  <div class="section-label">Autoinduction &amp; Complex Drug Interactions</div>

  <div class="card card-accent" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:31px;">CYP3A4/5 in Neurology</div>
    <div class="card-body" style="font-size:27px;">
      CYP3A4/5 metabolizes <strong>carbamazepine, oxcarbazepine, statins</strong>. Carbamazepine induces its own metabolism (autoinduction) and affects other CYP3A4 substrates.
    </div>
  </div>

  <table style="margin-bottom:18px;">
    <thead>
      <tr><th>CYP Enzyme</th><th>Key Neurological Substrates</th><th>PM Prevalence</th><th>Clinical Impact</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>CYP2C9</td>
        <td>Phenytoin, valproate, losartan</td>
        <td>~1% European</td>
        <td style="color:${COLORS.red}; font-weight:700;">Phenytoin toxicity at standard doses</td>
      </tr>
      <tr>
        <td>CYP2C19</td>
        <td>Clopidogrel, clobazam, diazepam</td>
        <td>2&ndash;5% European; 15&ndash;20% Asian</td>
        <td style="color:${COLORS.red}; font-weight:700;">Clopidogrel failure; clobazam toxicity</td>
      </tr>
      <tr>
        <td>CYP2D6</td>
        <td>TCAs, opioids, atomoxetine, antipsychotics</td>
        <td>7&ndash;10% European</td>
        <td style="color:${COLORS.amber}; font-weight:700;">TCA toxicity (PM) or failure (UM)</td>
      </tr>
      <tr>
        <td>CYP3A4/5</td>
        <td>Carbamazepine, oxcarbazepine, statins</td>
        <td>Variable</td>
        <td style="color:${COLORS.amber}; font-weight:700;">Complex DDIs; autoinduction</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box">
    <div class="label">CYP3A4 Limitation</div>
    <div class="value" style="font-size:31px;">CYP3A5*3 reduces activity, but clinical impact of CYP3A genotyping is less predictive than for CYP2D6 or CYP2C19</div>
  </div>
`));

// ============================================================================
// S2: HLA Alleles and Serious Drug Hypersensitivity (slides 7-9)
// ============================================================================

// ── Slide 7: HLA-B*15:02 & Carbamazepine SJS/TEN ───────────────────────────
slides.push(slideHTML(MOD, 7, TOTAL, `
  <h1>HLA-B*15:02 &amp; SJS/TEN</h1>
  <div class="section-label">FDA Boxed Warning for Carbamazepine</div>

  <div class="card card-red" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:34px;">FDA Black Box Warning: Carbamazepine</div>
    <div class="card-body" style="font-size:28px;">
      HLA-B*15:02 carriers have <strong>&gt;10-fold increased risk</strong> of carbamazepine-induced <strong>Stevens-Johnson Syndrome (SJS)</strong> and <strong>toxic epidermal necrolysis (TEN)</strong> &mdash; potentially fatal immune-mediated skin reactions.
    </div>
  </div>

  <div class="two-col">
    <div class="card card-amber">
      <div class="card-title">At-Risk Populations</div>
      <div class="card-body" style="font-size:25px;">
        HLA-B*15:02 prevalence:<br><br>
        &bull; <strong>Han Chinese, Thai, Southeast Asian:</strong> 8&ndash;10%<br>
        &bull; <strong>South Asian:</strong> 2&ndash;5%<br>
        &bull; <strong>European:</strong> &lt;0.1% (rare)
        <br><br>
        <strong>FDA mandates testing</strong> before carbamazepine in high-risk Asian ancestry patients.
      </div>
    </div>
    <div class="card card-accent">
      <div class="card-title">This Is a PD Reaction</div>
      <div class="card-body" style="font-size:25px;">
        Immune-mediated, <strong>NOT dose-dependent</strong>. HLA-B*15:02 presents drug-modified peptides to T-cells &rarr; severe cutaneous reaction.
        <br><br>
        <strong>Dose reduction does NOT eliminate risk.</strong><br>
        The drug must be <strong>avoided entirely</strong> in carriers.
      </div>
    </div>
  </div>
`));

// ── Slide 8: HLA-A*31:01 & Cross-Reactivity ────────────────────────────────
slides.push(slideHTML(MOD, 8, TOTAL, `
  <h1>HLA-A*31:01 &amp; Cross-Reactivity</h1>
  <div class="section-label">Carbamazepine DRESS &amp; Related AED Risks</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div>
      <div class="card card-violet" style="min-height:260px;">
        <div class="card-title" style="font-size:31px;">HLA-A*31:01 &amp; Carbamazepine</div>
        <div class="card-body" style="font-size:25px;">
          &bull; Common in Northern Europeans (~5%), Japanese<br>
          &bull; Associated with carbamazepine <strong>DRESS</strong> (drug reaction with eosinophilia and systemic symptoms)<br>
          &bull; Also maculopapular exanthem<br>
          &bull; Less severe than SJS/TEN but clinically significant
        </div>
      </div>
    </div>
    <div>
      <div class="card card-red" style="min-height:260px;">
        <div class="card-title" style="font-size:31px;">Oxcarbazepine Cross-Reactivity</div>
        <div class="card-body" style="font-size:25px;">
          &bull; HLA-B*15:02 carriers with carbamazepine SJS are at risk with <strong>oxcarbazepine</strong> and structurally related AEDs<br>
          &bull; <strong>Avoid in B*15:02 carriers</strong><br>
          &bull; Lamotrigine: weaker HLA-B*15:02 association<br>
          &bull; <strong>Lacosamide, levetiracetam:</strong> no known HLA association
        </div>
      </div>
    </div>
  </div>

  <table>
    <thead>
      <tr><th>HLA Allele</th><th>Drug</th><th>Reaction</th><th>At-Risk Populations</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>HLA-B*15:02</td>
        <td>Carbamazepine, oxcarbazepine</td>
        <td style="color:${COLORS.red}; font-weight:700;">SJS/TEN</td>
        <td>Southeast Asian, South Asian</td>
      </tr>
      <tr>
        <td>HLA-A*31:01</td>
        <td>Carbamazepine</td>
        <td style="color:${COLORS.amber}; font-weight:700;">DRESS</td>
        <td>Northern European, Japanese</td>
      </tr>
      <tr>
        <td>HLA-B*58:01</td>
        <td>Allopurinol</td>
        <td style="color:${COLORS.red}; font-weight:700;">SJS/TEN</td>
        <td>Han Chinese (6&ndash;8%)</td>
      </tr>
    </tbody>
  </table>
`));

// ── Slide 9: Pre-Prescription HLA Testing Algorithm ─────────────────────────
slides.push(slideHTML(MOD, 9, TOTAL, `
  <h1>Pre-Prescription HLA Testing</h1>
  <div class="section-label">Preventing Severe Hypersensitivity Reactions</div>

  <div style="display:flex; align-items:center; gap:16px; margin-bottom:28px;">
    <div class="flow-box" style="background:${mc.accent};">Prescribing CBZ<br>or OXC?</div>
    <div class="flow-connector">&rarr;</div>
    <div class="flow-box" style="background:${COLORS.amber};">Assess<br>ancestry</div>
    <div class="flow-connector">&rarr;</div>
    <div class="flow-box" style="background:${COLORS.red};">Test HLA-B*15:02<br>if at risk</div>
    <div class="flow-connector">&rarr;</div>
    <div class="flow-box" style="background:${COLORS.green};">Positive? Avoid.<br>Use alternative.</div>
  </div>

  <div class="two-col" style="margin-bottom:18px;">
    <div class="card card-green">
      <div class="card-title">Safe Alternatives (No HLA Association)</div>
      <div class="card-body" style="font-size:27px;">
        &bull; <strong>Levetiracetam</strong> &mdash; no known HLA risk<br>
        &bull; <strong>Lacosamide</strong> &mdash; no known HLA risk<br>
        &bull; <strong>Valproate</strong> (if POLG excluded)<br>
        &bull; <strong>Clobazam</strong> (monitor CYP2C19 status)
      </div>
    </div>
    <div class="card card-red">
      <div class="card-title">High-Risk Drugs Requiring HLA Testing</div>
      <div class="card-body" style="font-size:27px;">
        &bull; <strong>Carbamazepine</strong> (HLA-B*15:02 mandatory in Asian ancestry)<br>
        &bull; <strong>Oxcarbazepine</strong> (cross-reactive with B*15:02)<br>
        &bull; <strong>Phenytoin</strong> (HLA-B*15:02 + CYP2C9 testing)<br>
        &bull; <strong>Allopurinol</strong> (HLA-B*58:01 in Asian ancestry)
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">HLA-B*57:01 &amp; Abacavir</div>
    <div class="value" style="font-size:31px;">100% negative predictive value when absent. Mandated pre-prescription testing prevents hypersensitivity in ~5% of HIV+ patients.</div>
  </div>
`));

// ============================================================================
// S3: Antiepileptic Drug Pharmacogenomics (slides 10-12)
// ============================================================================

// ── Slide 10: SCN1A & Sodium-Channel Blockers ──────────────────────────────
slides.push(slideHTML(MOD, 10, TOTAL, `
  <h1>SCN1A &amp; Sodium-Channel AEDs</h1>
  <div class="section-label">Pharmacodynamic Drug Contraindication</div>

  <div class="card card-red" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:34px;">Critical: Dravet Syndrome &amp; Sodium-Channel Blockers</div>
    <div class="card-body" style="font-size:28px;">
      Dravet syndrome is caused by <strong>SCN1A loss-of-function</strong> (Nav1.1 haploinsufficiency). Sodium channel-blocking AEDs <strong>paradoxically worsen seizures</strong> by further reducing sodium channel activity &mdash; potentially causing status epilepticus.
    </div>
  </div>

  <div class="two-col">
    <div class="card card-amber">
      <div class="card-title" style="font-size:31px;">AVOID in SCN1A Loss-of-Function</div>
      <div class="card-body" style="font-size:27px;">
        &bull; <strong>Carbamazepine</strong><br>
        &bull; <strong>Phenytoin</strong><br>
        &bull; <strong>Lamotrigine</strong><br>
        &bull; Any sodium-channel blocker
      </div>
    </div>
    <div class="card card-green">
      <div class="card-title" style="font-size:31px;">PREFERRED for Dravet Syndrome</div>
      <div class="card-body" style="font-size:27px;">
        &bull; <strong>Valproate</strong><br>
        &bull; <strong>Clobazam</strong><br>
        &bull; <strong>Stiripentol, fenfluramine</strong><br>
        &bull; <strong>Cannabidiol</strong>
      </div>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Pharmacogenomic Principle</div>
    <div class="value" style="font-size:31px;">This is a pharmacodynamic (drug-target) interaction &mdash; the genetic variant alters the drug target, not drug metabolism</div>
  </div>
`));

// ── Slide 11: POLG & Valproate Hepatotoxicity ──────────────────────────────
slides.push(slideHTML(MOD, 11, TOTAL, `
  <h1>POLG &amp; Valproate Contraindication</h1>
  <div class="section-label">The Most Critical Drug-Gene Interaction in Pediatric Neurology</div>

  <div class="card card-red" style="margin-bottom:20px;">
    <div class="card-title" style="font-size:34px;">POLG Mutations + Valproate = Fatal Hepatotoxicity</div>
    <div class="card-body" style="font-size:28px;">
      POLG-related disorders (Alpers syndrome, POLG-spectrum) &mdash; valproate causes <strong>fulminant hepatotoxicity</strong> and neurological deterioration. <strong>MUST screen for POLG</strong> before valproate in children with developmental regression or mitochondrial features.
    </div>
  </div>

  <div class="two-col" style="margin-bottom:18px;">
    <div class="card card-amber">
      <div class="card-title">UGT1A4 &amp; Lamotrigine in Pregnancy</div>
      <div class="card-body" style="font-size:25px;">
        Pregnancy induces UGT1A4 &rarr; <strong>40&ndash;60% decrease</strong> in lamotrigine levels. Dose may need to double. Serum monitoring essential.
      </div>
    </div>
    <div class="card card-violet">
      <div class="card-title">Valproate &amp; Urea Cycle</div>
      <div class="card-body" style="font-size:25px;">
        Valproate inhibits urea cycle &rarr; hyperammonemia in <strong>partial UCD carriers</strong> (NAGS/CPS1). Evaluate before valproate if unexplained hyperammonemia.
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">CYP2C9 &amp; Phenytoin Toxicity</div>
    <div class="value" style="font-size:31px;">~1% of Europeans are CYP2C9 PMs. Toxicity (nystagmus, ataxia, lethargy) at standard doses should prompt genotyping and dose reduction.</div>
  </div>
`));

// ── Slide 12: AED Pharmacogenomics Summary Table ────────────────────────────
slides.push(slideHTML(MOD, 12, TOTAL, `
  <h1>AED Pharmacogenomics Summary</h1>
  <div class="section-label">Key Drug-Gene Interactions for Epilepsy</div>

  <table>
    <thead>
      <tr><th>Drug</th><th>Gene / Enzyme</th><th>Mechanism</th><th>Action</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>Carbamazepine</td>
        <td>HLA-B*15:02</td>
        <td>PD (immune)</td>
        <td style="color:${COLORS.red}; font-weight:700;">Avoid if HLA positive (SJS/TEN)</td>
      </tr>
      <tr>
        <td>Phenytoin</td>
        <td>CYP2C9 + HLA-B*15:02</td>
        <td>PK + PD</td>
        <td style="color:${COLORS.red}; font-weight:700;">Dose by CYP2C9; HLA test</td>
      </tr>
      <tr>
        <td>Clobazam</td>
        <td>CYP2C19</td>
        <td>PK</td>
        <td style="color:${COLORS.amber}; font-weight:700;">Start 5 mg/day in PMs</td>
      </tr>
      <tr>
        <td>Na-channel AEDs</td>
        <td>SCN1A (Dravet)</td>
        <td>PD (target)</td>
        <td style="color:${COLORS.red}; font-weight:700;">Contraindicated in SCN1A LOF</td>
      </tr>
      <tr>
        <td>Valproate</td>
        <td>POLG</td>
        <td>Metabolic</td>
        <td style="color:${COLORS.red}; font-weight:700;">Absolute contraindication</td>
      </tr>
      <tr>
        <td>Lamotrigine</td>
        <td>UGT1A4</td>
        <td>PK</td>
        <td style="color:${COLORS.amber}; font-weight:700;">Monitor levels in pregnancy</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight-box" style="margin-top:16px;">
    <div class="label">Integration</div>
    <div class="value" style="font-size:31px;">AED pharmacogenomics spans both PK (how drug is metabolized) and PD (how target responds) &mdash; both must be considered</div>
  </div>
`));

// ============================================================================
// S4: Clinical Implementation of Pharmacogenetic Testing (slides 13-15)
// ============================================================================

// ── Slide 13: Preemptive vs Reactive Testing ────────────────────────────────
slides.push(slideHTML(MOD, 13, TOTAL, `
  <h1>Preemptive vs Reactive Testing</h1>
  <div class="section-label">Clinical Implementation Strategies</div>

  <div class="two-col" style="margin-bottom:24px;">
    <div>
      <div class="card card-accent" style="min-height:280px;">
        <div class="card-title" style="font-size:31px;">Preemptive Panel Testing</div>
        <div class="card-body" style="font-size:25px;">
          Test at first clinical encounter; store results in EHR for all future prescribing
          <br><br>
          &bull; Multi-gene panel covering actionable variants<br>
          &bull; More <strong>cost-effective over time</strong><br>
          &bull; No delay when prescribing decision needed<br>
          &bull; Results are <strong>lifelong</strong>
        </div>
      </div>
    </div>
    <div>
      <div class="card card-amber" style="min-height:280px;">
        <div class="card-title" style="font-size:31px;">Reactive Testing</div>
        <div class="card-body" style="font-size:25px;">
          Test at time of prescribing a specific drug
          <br><br>
          &bull; Requires fast turnaround (days to weeks)<br>
          &bull; <strong>May delay treatment</strong><br>
          &bull; Tests only relevant gene(s)<br>
          &bull; Current standard for HLA testing before CBZ
        </div>
      </div>
    </div>
  </div>

  <div class="card card-green">
    <div class="card-title">Test Report Interpretation</div>
    <div class="card-body" style="font-size:27px;">
      Reports include: <strong>gene name</strong>, <strong>diplotype</strong> (e.g., CYP2D6*1/*4), <strong>predicted phenotype</strong> (PM/IM/NM/UM), and <strong>drug-specific recommendations</strong>. Phenotypes are substrate-specific.
    </div>
  </div>
`));

// ── Slide 14: Evidence Tiers, Limitations & EHR Integration ─────────────────
slides.push(slideHTML(MOD, 14, TOTAL, `
  <h1>Evidence Tiers &amp; Limitations</h1>
  <div class="section-label">CPIC Grading &amp; Implementation Challenges</div>

  <div class="two-col" style="margin-bottom:20px;">
    <div>
      <div class="card card-accent" style="margin-bottom:14px;">
        <div class="card-title">CPIC Evidence Tiers</div>
        <div class="card-body" style="font-size:25px;">
          &bull; <strong>Level A:</strong> Action required &mdash; prescribing change recommended<br>
          &bull; <strong>Level B:</strong> Consider modification &mdash; strong supporting evidence<br>
          &bull; <strong>Level C:</strong> Informative/optional &mdash; weak or emerging evidence
          <br><br>
          Not all variants require prescribing changes.
        </div>
      </div>
    </div>
    <div>
      <div class="card card-red" style="margin-bottom:14px;">
        <div class="card-title">Key Limitations</div>
        <div class="card-body" style="font-size:25px;">
          &bull; Most panels optimized for <strong>European populations</strong><br>
          &bull; Lower sensitivity for non-European ancestries<br>
          &bull; Structural variants (CYP2D6 CNV, CYP2D6-CYP2D7 hybrids) may be missed by SNP arrays<br>
          &bull; *1/*1 call assumes absence of untested variants
        </div>
      </div>
    </div>
  </div>

  <div class="card card-green" style="margin-bottom:14px;">
    <div class="card-title">EHR Integration Is Critical</div>
    <div class="card-body" style="font-size:27px;">
      <strong>Clinical decision support (CDS) alerts</strong> at point of prescribing are most effective. Passive reporting without alerts has minimal impact on practice. CPIC guidelines are designed for EHR-based CDS implementation.
    </div>
  </div>

  <div class="highlight-box">
    <div class="label">Reimbursement</div>
    <div class="value" style="font-size:31px;">Coverage varies: HLA testing before carbamazepine is widely reimbursed; multi-gene preemptive panels face inconsistent payer policies</div>
  </div>
`));

// ── Slide 15: Key Takeaways ─────────────────────────────────────────────────
slides.push(takeawaysSlideHTML(MOD, 15, TOTAL, [
  {
    title: "PK variants adjust dose; PD variants require drug avoidance",
    body: "CYP450 variants affect drug levels (dose-adjustable). HLA variants trigger immune reactions (drug must be avoided entirely).",
  },
  {
    title: "HLA-B*15:02 testing is mandatory before carbamazepine in Asian ancestry",
    body: "FDA boxed warning: >10-fold SJS/TEN risk in carriers. Oxcarbazepine cross-reacts. Lacosamide and levetiracetam have no HLA association.",
  },
  {
    title: "SCN1A LOF contraindicates sodium-channel blockers",
    body: "Carbamazepine, phenytoin, lamotrigine worsen Dravet seizures. Use valproate, clobazam, stiripentol, fenfluramine instead.",
  },
  {
    title: "POLG + valproate = fatal hepatotoxicity",
    body: "Screen for POLG before valproate in any child with developmental regression or suspected mitochondrial disease.",
  },
  {
    title: "Preemptive PGx testing provides lifelong prescribing guidance",
    body: "CPIC guidelines translate genotype into action. EHR-integrated CDS alerts maximize clinical impact.",
  },
]));

// ── Render ───────────────────────────────────────────────────────────────────
await renderSlides("pharmacogenetics", slides);
