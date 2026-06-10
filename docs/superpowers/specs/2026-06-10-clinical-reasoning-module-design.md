# Design: `clinical-reasoning` module — Clinical Decision-Making in Neurogenetics

**Date:** 2026-06-10
**Status:** Approved (design) — ready for implementation plan
**Origin:** Closes the only wholesale gap in `docs/curriculum-coverage.md` — the "Clinical reasoning & management" domain, all 8 items currently ❌.

---

## 1. Purpose

The curriculum has 23 disease/method modules, all marked ✅, but the final coverage
domain — the cross-cutting clinical *reasoning* that connects genetic findings to care —
has no home. This module is that home.

It is deliberately an **integration layer**, not a new body of facts. Most underlying
facts already live in sibling modules (`diagnostic-yields` owns test yields,
`genetic-counseling` owns reproductive counseling, `variant-interpretation` owns VUS
classification, `therapies` owns gene/molecular therapy). This module teaches the
**decision logic and clinic-facing heuristics** that tie those threads together, and
cross-links out for the detail rather than re-teaching it.

## 2. Identity

- **id:** `clinical-reasoning`
- **title:** "Clinical Decision-Making in Neurogenetics"
- **description:** A decision-making framework that follows the patient journey — choosing
  the first test, reading an ambiguous report, acting on (or re-opening) a result, managing
  the diagnosis, and counseling the family — connecting the genetic findings taught
  elsewhere in the curriculum to real clinical care.
- **tags:** `["Neurogenetics", "Clinical Decision-Making"]`
- **difficulty:** `advanced`
- **duration:** `~25 min`
- **color:** `teal` (unused by Block 10 neighbors)
- **Placement:** Block 10, immediately before `virtual-cases` in `data/modules/index.ts`
  (reasoning frameworks → then applied to the integrative cases).

## 3. Pedagogical spine

The six sections trace one clinical arc so the module reads as a coherent journey rather
than a grab-bag of eight reasoning topics:

> **choose the test → read the result → act on the result → manage the diagnosis →
> counsel the family → communicate & coordinate**

## 4. Section breakdown

All 8 coverage-doc items are mapped; none dropped.

| # | Section title | Coverage item(s) closed | Visual hook |
|---|---------------|-------------------------|-------------|
| 1 | Choosing the First Test: Panel vs. Exome vs. Genome | "When to send a genetic panel vs. exome vs. genome (decision tree)" | A real decision tree (phenotype → test), color-coded cards |
| 2 | Reading the Report: Living with a VUS | "Interpreting a VUS in the clinic — what to tell the family, when to re-contact" | "What to say / what NOT to say" two-column contrast |
| 3 | When "Negative" Isn't Negative | "When a negative result isn't negative (re-analysis, deeper sequencing, methylation, repeat expansions)" | A "blind spots" table: what each platform misses + the fix |
| 4 | After the Diagnosis: Treatment & Surveillance | "Symptomatic vs disease-modifying treatment choices" + "Surveillance schedules for known syndromes" | Surveillance-schedule table + treatment-tier cards |
| 5 | The Family: Reproductive & Cascade Decisions | "Reproductive counseling decision points (prenatal vs preimplantation vs cascade testing)" | Decision-point cards keyed to where the family is |
| 6 | Communicating Uncertainty & Coordinating Care | "Communicating prognosis under genotype–phenotype uncertainty" + "Multidisciplinary care coordination" | Care-team map + a "how to phrase it" panel |

### Section content notes

- **§1** — anchor on the `diagnostic-yields` numbers already verified (CMA ~10%, WES ~36%,
  WGS ~41%; trio OR ~2.04). The *new* content is the branching logic: phenotype specificity,
  trio availability, repeat-disorder suspicion, CMA-first scenarios (MCA, IESS), turnaround
  urgency (rWGS in NICU). Cross-link `[[diagnostic-yields]]`.
- **§2** — the decision is *communication*, not classification. What a VUS means for the
  family, why most VUS drift toward benign, the re-contact / reanalysis trigger, and the
  harm of acting on a VUS. Cross-link `[[variant-interpretation]]`.
- **§3** — the highest-yield "don't close the case" section. Reanalysis (~10–25% of unsolved
  at 12–24 mo), repeat-expansion blind spot (Friedreich, SCA, CANVAS, FXTAS, DM1, HD,
  C9orf72), methylation-specific disorders (Angelman/PWS, imprinting), deep/long-read
  sequencing, mosaicism needing tissue. Cross-link `[[diagnostic-yields]]`,
  `[[mosaicism]]`, `[[epigenetics]]`.
- **§4** — heaviest factual load; gets the most accuracy scrutiny. Symptomatic vs
  disease-modifying framing with named examples (SMN-directed therapy in SMA, exon-skipping
  in DMD, ASO programs — cross-link `[[therapies]]`); precision-treatment examples
  (ketogenic diet for GLUT1, B6 for PDE, avoid sodium-channel blockers in SCN1A — cross-link
  `[[epilepsy]]`, `[[iem]]`). Surveillance tied to **named guidelines** (e.g., 2021
  International TSC Surveillance & Management consensus) — no invented intervals.
- **§5** — the reproductive decision points: prenatal diagnosis (CVS/amnio) vs PGT-M vs
  cascade testing of relatives vs donor gametes, keyed to family stage and the specific
  variant's inheritance/penetrance. Cross-link `[[genetic-counseling]]`.
- **§6** — heuristics, low factual risk: framing prognosis honestly under
  genotype–phenotype uncertainty (variable expressivity, incomplete penetrance, n-of-few
  genotypes), and the multidisciplinary team map (genetics + neuro + PT/OT/SLP + cardiology
  + palliative as relevant).

## 5. Accuracy approach (top priority)

- Every numeric claim (yields, surveillance intervals, recurrence/penetrance figures)
  carries an inline source in the existing house style ("Clark 2018", "Maron JAMA 2023",
  "2021 TSC consensus").
- Reuse already-verified numbers from sibling modules rather than re-deriving them; where a
  number is restated, it must match the source module exactly.
- Surveillance intervals and treatment claims tie to named guidelines/trials. Anything that
  cannot be sourced is cut, not hedged with "often/may/can."
- Fast-evolving claims (SMA/DMD therapy, ASOs, AED choices) are stated with the
  guideline/approval they rest on, consistent with the curriculum's accuracy-sweep standard.

## 6. Visual approach (keep it interesting)

Uses the existing `scripts/slide-design-system.mjs` vocabulary — color-coded cards
(accent/green/amber/red/violet/blue/rose/teal), two/three-col grids, tables, title and
takeaways slides. Each section leads with a distinct visual hook (see table) so the deck
varies slide-to-slide: a decision tree, a say/don't-say contrast, a blind-spots table, a
surveillance table, decision-point cards, and a care-team map. Slides generated via a new
`scripts/gen-clinical-reasoning.mjs` following the established per-module generator pattern,
then rendered with `scripts/render-slides.mjs`.

## 7. Assessment

- `inlineQuiz`: 6 items, one per section, each a short vignette testing the *decision*
  (e.g., "negative WES in progressive ataxia → next step?"), not flat recall.
- `quiz`: 6–7 board-style vignettes mirroring the inline ones, matching sibling-module
  convention (e.g., `diagnostic-yields` has 6 inline + 7 final).
- Distractors are plausible and teach via the explanation, per the existing MCQ standard.

## 8. Out of scope (YAGNI)

- No new slide-design primitives or component changes — reuse the existing system.
- No re-teaching of facts that sibling modules already own; cross-link instead.
- No dedicated "clinical reasoning" software feature — this is content only.

## 9. Done-when

1. `data/modules/clinical-reasoning.json` exists with 6 sections + inlineQuiz + quiz,
   schema-valid, registered in `data/modules/index.ts` (Block 10, before `virtual-cases`).
2. `npm run build` passes.
3. Slides generated (`scripts/gen-clinical-reasoning.mjs`) and rendered to
   `public/slides/clinical-reasoning/`.
4. All 8 lines under "Clinical reasoning & management" in `docs/curriculum-coverage.md`
   flip ❌ → ✅ with the new module id cited.
5. Every numeric/guideline claim carries an inline source.

## 10. Implementation sequencing (checkpointable)

Content is the long pole; slides/render are mechanical. Suggested order so work is
reviewable in chunks:

1. Write JSON sections 1–3 (test selection, VUS, negative-isn't-negative) + their inline quiz.
2. Write JSON sections 4–6 (treatment/surveillance, reproductive, communication) + inline quiz.
3. Write the final `quiz` bank.
4. Register in `index.ts`; `npm run build`.
5. Author `gen-clinical-reasoning.mjs`; render slides.
6. Update `curriculum-coverage.md` and the improvement log.
