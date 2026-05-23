# Curriculum Improvement Log

> Append-only record of iterative improvements. `## Queued` lists next-up ideas. `## History` is what's been shipped. Maintained by `/goal`.

## Queued

*(empty — first run of `/goal` will start populating this)*

## History

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
