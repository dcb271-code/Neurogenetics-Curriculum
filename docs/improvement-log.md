# Curriculum Improvement Log

> Append-only record of iterative improvements. `## Queued` lists next-up ideas. `## History` is what's been shipped. Maintained by `/goal`.

## Queued

- [content] `cnv-interpretation` accuracy review — only module not touched in the 2026-05-16 accuracy sweep
- [content] Add the PNH-vs-TSC subependymal-nodule imaging distinction to the `neuroimaging` MCD section (PNH nodules isointense to gray matter on all sequences vs. TSC nodules T1-/FLAIR-bright) — high-yield don't-confuse-these pearl deferred from the 2026-05-23 cross-walk
- [coverage] Decide whether forebrain induction (HPE/SOD) and corpus-callosum malformations — covered richly in `docs/sources/brain_development_malformations.docx` but absent from the curriculum — warrant a new coverage line/section

## History

### 2026-05-23 — content quality
**Target:** `neuroimaging` module, "Malformations of Cortical Development" section (`data/modules/neuroimaging.json`)
**Change:** Cross-walked the section against `docs/sources/brain_development_malformations.docx` and closed two missing MCD categories. Added cobblestone (Type 2) lissencephaly — α-dystroglycan O-mannosylation defect; POMT1/2, POMGNT1, FKTN, FKRP, LARGE1; Walker-Warburg / Fukuyama / muscle-eye-brain spectrum; ↑CK + congenital muscular dystrophy → dystroglycanopathy panel — and hemimegalencephaly (somatic mosaic PIK3CA/AKT3/MTOR, unilateral overgrowth with dysmorphic ipsilateral ventricle, refractory focal epilepsy, hemispherotomy as primary treatment). Section grew 2137 → 3178 chars; `npm run build` passes.
**Outcome:** uncommitted
**Followups added to queue:** PNH-vs-TSC imaging distinction; decide whether HPE/SOD + corpus-callosum malformations warrant new coverage

### 2026-05-22 — housekeeping
**Target:** 5 untracked files at repo root and `docs/superpowers/plans/`
**Change:** Identified 4 root-level `.docx` files as PGY-3/4 Child Neurology Residency Manual reference source documents (brain development & malformations, cerebral palsy, movement disorders, neurometabolic disorders); moved them to a new `docs/sources/` directory. Separately committed the orphaned `2026-05-22-goal-command.md` plan doc alongside its three peers in `docs/superpowers/plans/`.
**Outcome:** Committed as `a0a1bab` (plan doc) and `acabf51` (sources relocation)
**Followups added to queue:** cross-walk brain-development source doc against neuroimaging MCD section


### 2026-05-16 — housekeeping
**Target:** quiz retake flow
**Change:** Fixed retake shuffle being clobbered when admin overrides resolved mid-session — now the shuffled order is preserved across the override merge.
**Outcome:** Committed as `dde3566`
**Followups added to queue:** none (retrospective entry)

### 2026-05-16 — housekeeping
**Target:** admin inline content editing — multi-commit feature merge
**Change:** Shipped admin-editing feature stack: section_overrides + quiz_overrides tables, admin GET/PUT/DELETE/publish endpoints with `verifyAdmin()` enforcement, `useModuleContent` merge hook, AdminBadge + EditPencil components, SectionEditModal + QuizEditModal, ContentReader wiring.
**Outcome:** Merged as `8646ef3` (subsumes ~15 prior commits on `feature/admin-editing`)
**Followups added to queue:** none (retrospective entry)

### 2026-05-16 — content quality
**Target:** epilepsy module — SLC6A1 vs SSADH treatment claim
**Change:** Corrected incorrect treatment attribution; SLC6A1-related epilepsy doesn't respond to vigabatrin in the way SSADH deficiency does.
**Outcome:** Committed as `747b8e0`
**Followups added to queue:** none (retrospective entry)

### 2026-05-16 — content quality
**Target:** 21 modules — accuracy sweep
**Change:** 35 targeted corrections across the curriculum (full list in the commit body).
**Outcome:** Committed as `325082a`
**Followups added to queue:** none (retrospective entry)
