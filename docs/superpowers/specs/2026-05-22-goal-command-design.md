# /goal — Curriculum iterative-improvement command

**Date:** 2026-05-22
**Author:** dylan (with Claude)
**Status:** Draft spec, pending review

## Purpose

A single slash command that drives one focused, well-scoped improvement to the neurogenetics curriculum per invocation. The command is durable across sessions — it remembers what it has already worked on, what's queued, and where the curriculum has gaps — so that running `/goal` regularly compounds into continuous improvement rather than amnesiac re-treads.

## Scope (what /goal works on)

Three areas, each tied to a concrete signal Claude can read:

| Area | Signal source | Example task |
|------|---------------|--------------|
| **Content quality** | Module JSON, `git log` (when was each module last touched), targeted re-reads | "The dystonia module hasn't been audited since Feb — spot-check for outdated claims" |
| **Coverage** | `docs/curriculum-coverage.md` (the north-star checklist) vs. what modules contain | "MELAS is marked ⚠️ partial in mitochondrial — flesh out clinical features" |
| **Housekeeping** | `npm run build`, lint, slide manifest integrity, git status, TODO/FIXME grep | "3 ataxia slides referenced by manifest are missing — regenerate" |

Out of scope (for v1):
- Resident-data-driven improvement (reading Supabase quiz attempts to find weak questions). Defer until there's enough resident traffic to make this signal meaningful. The command's structure should allow adding this as a fourth area later without redesign.

## Components

### 1. `.claude/commands/goal.md` — the slash command prompt

The prompt itself. Invoked as `/goal` (no args) or `/goal <area>` to force an area. The prompt instructs Claude to follow this flow:

1. **Boot.** Read `docs/improvement-log.md` and `docs/curriculum-coverage.md`. Skim recent `git log` (last 10 commits) to know what was just shipped.
2. **Decide what to work on.**
   - If `docs/improvement-log.md` has items in its `## Queued` section, ask: "We have N queued items. Pick one, or scan for something new?" — present the queued items.
   - Otherwise (or if user picks "something new"), run lightweight triage in each area and propose 2–3 candidate tasks with one-line rationale each.
3. **User picks** one candidate (or types their own task).
4. **Scope tightly.** Before any work, state out loud: "We'll know we're done when X." Keep X to something achievable in 30–60 min. If the task is bigger, decompose and pick one piece.
5. **Execute.** Use whichever superpowers skill fits (brainstorming if it's a new section, systematic-debugging if it's a bug, TDD if it's code). Default to small, reviewable diffs.
6. **Close the loop.** Append an entry to `docs/improvement-log.md` under `## History`. If the work touched a coverage topic, update the status mark in `docs/curriculum-coverage.md`. If new ideas surfaced during the work, add 1–2 of them to the `## Queued` section. Suggest a commit message but don't commit unless asked.

The prompt explicitly bans these failure modes:
- "I made some unspecified improvements" log entries — entry template is required.
- Re-proposing a task already in `## History` from the last 30 days without flagging it as a re-visit.
- Working past the stated "done when X" without checking in with the user.
- Inventing coverage topics that aren't in the coverage doc — coverage claims must cite the doc.

### 2. `docs/improvement-log.md` — durable cross-session memory

Append-only log. Two sections:

```markdown
# Curriculum Improvement Log

## Queued
- [coverage] MELAS clinical features missing from mitochondrial module
- [content] Re-audit epilepsy module for ILAE 2022 classification updates
- [housekeeping] 3 ataxia slides in manifest don't exist on disk

## History

### 2026-05-22 — content quality
**Target:** epilepsy module, SLC6A1 vs SSADH treatment claim
**Change:** Fixed incorrect treatment attribution; SLC6A1-related epilepsy doesn't respond to vigabatrin the way SSADH deficiency does
**Outcome:** Committed as 747b8e0
**Followups added to queue:** none

### 2026-05-16 — content quality
**Target:** 21 modules, accuracy sweep
**Change:** 35 targeted corrections (full list in commit body)
**Outcome:** Committed as 325082a
**Followups added to queue:** Audit dystonia for newer functional movement disorder framing
```

Format is enforced by the command prompt giving Claude a literal template to fill in.

### 3. `docs/curriculum-coverage.md` — north-star coverage checklist

Reverse-engineered from the existing 23 modules in a one-time bootstrap step (see Bootstrap below). Structure:

```markdown
# Curriculum Coverage Checklist

Status legend: ✅ covered  ⚠️ partial  ❌ missing  ➖ out of scope

## Foundations
- ✅ Central dogma — `central-dogma`
- ✅ Chromosomes & ISCN nomenclature — `chromosomes-iscn`
- ⚠️ Epigenetics — `epigenetics` (covers imprinting, missing X-inactivation depth)
- ✅ Mosaicism — `mosaicism`

## Methods
- ✅ Variant interpretation (ACMG) — `variant-interpretation`
- ✅ CNV interpretation — `cnv-interpretation`
- ✅ Diagnostic yields by phenotype — `diagnostic-yields`
- ⚠️ Genetic counseling — `genetic-counseling` (missing pediatric-specific scripts)

## Disease groups
- ✅ Epilepsy — `epilepsy`
- ...

## Cross-cutting
- ✅ Neuroimaging genotype–phenotype — `neuroimaging`
- ...

## Clinical reasoning & management
*Not tied to any single disease — the heuristics, decision frameworks, and management principles that connect genetic findings to clinical care.*
- ❌ When to send a genetic panel vs. exome vs. genome (decision tree)
- ❌ Interpreting a VUS in the clinic — what to tell the family, when to re-contact
- ❌ Reproductive counseling decision points (prenatal vs preimplantation vs cascade testing)
- ❌ Symptomatic vs disease-modifying treatment choices in genetic disease
- ❌ When a "negative" result isn't negative (re-analysis, deeper sequencing, methylation, repeat expansions)
- ❌ Surveillance schedules for known syndromes (cancer-predisposition overlaps, cardiac, cognitive)
- ❌ Communicating prognosis under genotype–phenotype uncertainty
- ❌ Multidisciplinary care coordination (genetics + neuro + PT/OT/SLP + palliative)
```

This domain is likely where the most ❌ items will live initially, since the existing 23 modules are organized by *content* (what to know) rather than *how to use it clinically*. /goal coverage work in this domain will tend to mean adding cross-cutting sections to existing modules, or creating a dedicated "clinical reasoning" module.

The doc is editable by the user — it's the authoritative source of "what should this curriculum cover." /goal reads it to find ⚠️/❌ items for coverage work, and updates status marks when work closes a gap.

## Bootstrap (one-time setup before /goal is usable)

These three steps happen once, in order, before /goal becomes a working tool:

1. **Draft the coverage doc** by reading each of the 23 module JSONs, extracting section titles, grouping into domains (Foundations / Methods / Disease groups / Cross-cutting). Initial status for everything is ✅ unless the bootstrap reviewer (dylan) flags it as partial. This is *not* meant to be exhaustive — partial coverage will surface naturally as /goal runs.
2. **Seed the improvement log** with an empty `## Queued` and `## History` containing the last ~5 meaningful commits as retrospective entries, so the log starts non-empty.
3. **Write `.claude/commands/goal.md`** with the prompt described above, the literal log entry template, and the explicit bans on failure modes.

## How the three pieces fit together

```
                     ┌─────────────────────────────────┐
   user runs         │  .claude/commands/goal.md       │
   /goal       ────▶ │  (the prompt — Claude reads it) │
                     └─────────────────────────────────┘
                                  │
                  ┌───────────────┼───────────────┐
                  ▼               ▼               ▼
       improvement-log.md  curriculum-     repo state
       (what's been done   coverage.md     (git log,
        + what's queued)   (what should    npm build,
                            exist)         module JSONs)
                  │               │               │
                  └───────────────┼───────────────┘
                                  ▼
                       proposes 2–3 candidates
                                  │
                          user picks one
                                  │
                            execute work
                                  │
                       updates log + coverage
```

## Success criteria

`/goal` is working if, after 5 runs:
- The improvement log has 5+ distinct, specific entries (not "general cleanup")
- At least one coverage status mark has changed from ⚠️ → ✅
- No entry was a duplicate of one from the prior 30 days
- The user feels each session shipped something concrete in under an hour

## Non-goals

- Automating commits or PRs. /goal proposes commit messages; the user runs `git commit`.
- Long-running multi-session epics. /goal is one focused unit per run. Multi-step work goes in `## Queued` for future runs.
- Replacing user judgement on what matters. /goal proposes; user picks. /goal never picks a task without explicit user confirmation.
- Resident-data-driven improvement in v1 (see Scope).

## Open questions

None — ready for review.
