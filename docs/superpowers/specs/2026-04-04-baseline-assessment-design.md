# Baseline Assessment & Assessment Hub

**Date:** 2026-04-04
**Status:** Approved

## Problem

Residents start the curriculum with no measurement of their baseline knowledge. The comprehensive exam exists only as a post-curriculum assessment. There is no way to measure improvement over time. The front page links directly to the comprehensive exam with no framing as part of a pre/post assessment strategy.

## Design

### Front Page Card

Replace the "Comprehensive Examination" card on `/` with a **"Test Your Knowledge"** hub card linking to `/assessments`.

- Icon: same `ClipboardList`
- Title: "Test Your Knowledge"
- Subtitle: "Pre-curriculum baseline and post-curriculum comprehensive assessments"

### Assessments Hub (`/assessments/page.tsx`)

Simple page with two assessment cards:

1. **Pre-Curriculum Baseline Assessment** — links to `/assessments/baseline`
   - "25 questions — gauge your starting knowledge"
   - No feedback provided during the test
2. **Post-Curriculum Comprehensive Assessment** — links to `/assessments/comprehensive`
   - "50 board-style questions — 76% to pass"
   - Full feedback and explanations

Each card shows the user's most recent attempt (score, date) if available, fetched from `/api/quiz-attempts`.

### Baseline Assessment (`/assessments/baseline/page.tsx`)

**Data file:** `data/baseline-assessment.json`
- 25 board-style questions covering the curriculum broadly at high-yield level
- Same shape as comprehensive exam questions: `id`, `question`, `options`, `answer`, `sourceModules`, `difficulty`, `category`
- No `explanation` field — explanations are intentionally omitted

**UX:**
- Questions shuffled on start (Fisher-Yates, same as comprehensive)
- No per-question feedback — select answer, press Next, move on
- No green/red coloring on selection, no explanation box
- Progress bar shown for orientation
- Results screen shows total score only (X/25, percentage)
- No per-question audit trail on results (preserves retest integrity)
- Encouraging message pointing toward the curriculum
- "Retake" and "All Modules" buttons on results screen
- Saved to `quiz_attempts` with `moduleId: "baseline-assessment"`

### Comprehensive Assessment (`/assessments/comprehensive/page.tsx`)

The existing `/exam` page moved to the new route. Identical behavior — full per-question feedback, explanations, audit trail, pass/fail with 38/50 threshold.

### Redirect (`/exam`)

`app/exam/page.tsx` becomes a client redirect to `/assessments/comprehensive` for backward compatibility.

### Admin Dashboard Updates

The final exam card in the expanded resident detail becomes an "Assessments" section showing two rows:

- **Baseline:** score and date if attempted, "Not attempted" otherwise
- **Comprehensive:** PASSED/NOT YET PASSED, best score, attempts, date (existing behavior)

### API Updates (`app/api/admin/residents/route.ts`)

The existing `exam` field in the response is extended. The API already fetches all `quiz_attempts` — it now also extracts `baseline-assessment` attempts alongside `comprehensive-exam` attempts, returning:

```typescript
baseline: {
  attempts: number;
  latestScore: number;
  latestTotal: number;
  latestDate: string;
  bestScore: number;
  bestTotal: number;
} | null;
```

## File Changes

| Action | File |
|--------|------|
| Create | `data/baseline-assessment.json` |
| Create | `app/assessments/page.tsx` |
| Create | `app/assessments/baseline/page.tsx` |
| Create | `app/assessments/comprehensive/page.tsx` (moved from exam) |
| Edit | `app/exam/page.tsx` (redirect to `/assessments/comprehensive`) |
| Edit | `app/page.tsx` (card text + link) |
| Edit | `app/dashboard/page.tsx` (add baseline row) |
| Edit | `app/api/admin/residents/route.ts` (include baseline data) |

## Question Design Principles (Baseline)

- 25 questions covering all major curriculum areas
- Board-style clinical vignettes and knowledge questions
- High-yield topics that a neurology resident might partially know before formal training
- No overlap with the 50 comprehensive exam questions (different clinical scenarios)
- Difficulty skewed toward intermediate — the goal is discrimination, not discouragement
