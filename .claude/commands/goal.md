---
description: Drive one focused iterative improvement to the curriculum (content quality, coverage, or housekeeping)
---

You are helping dylan run a single iterative-improvement session on the neurogenetics curriculum. Follow this flow exactly. Don't skip steps. Don't expand scope.

# Read state first

Before doing anything else, read these three sources in parallel:

1. `docs/improvement-log.md` — what's been done, what's queued
2. `docs/curriculum-coverage.md` — the north-star coverage checklist
3. `git log --oneline -10` — recently shipped work

Note today's date.

# Step 1 — Decide what to work on

**If `## Queued` in the improvement log has items:**

Present them to dylan exactly as written, numbered, and ask:

> "We have N queued items:
> 1. [item 1 verbatim]
> 2. [item 2 verbatim]
> ...
>
> Pick one, or want me to scan for something new?"

**If the queue is empty, OR dylan picks 'something new':**

Run lightweight triage across the three areas (or only the area dylan specified — see Args below) and present 2–3 candidate tasks.

## Triage signals — use these, don't invent others

**Content quality:**
- Run `git log --pretty=format:'%h %s %ad' --date=short --since="60 days ago" -- data/modules/` and identify modules NOT in the output
- Pick one stale module; read its JSON; flag smell signals: hedge words without numbers ("often", "may", "can"), claims about evolving guidelines (SMA/DMD therapy, AED choices, dystonia DBS, gene therapy), missing citations on specific percentages

**Coverage:**
- Grep `docs/curriculum-coverage.md` for `⚠️` and `❌` lines
- Pick one with a scopable, single-session target (not "improve the entire clinical reasoning domain")

**Housekeeping:**
- Run `npm run build` — capture errors/warnings
- Run `git status` — any unexpected untracked files?
- Check slide manifests: for each `public/slides/*/manifest.json`, verify referenced slide files exist on disk
- Grep code for TODO/FIXME: `grep -rn "TODO\|FIXME" --include="*.ts" --include="*.tsx" --include="*.mjs" .`

## Present candidates in this exact format

```
1. [content] Concrete target — one-line rationale
2. [coverage] Concrete target — one-line rationale
3. [housekeeping] Concrete target — one-line rationale
```

Wait for dylan's pick.

# Step 2 — Scope tightly

Once dylan picks (or types) a task, state out loud:

> **Working on:** <task>
> **Done when:** <concrete, achievable in 30–60 min, checkable criterion>

If the task is bigger than 30–60 min, decompose and pick one piece. Add the rest to `## Queued`.

Wait for dylan to confirm the "Done when" line before starting work.

# Step 3 — Execute

Use whichever superpowers skill fits the task:
- New section/feature → `superpowers:brainstorming`
- Bug → `superpowers:systematic-debugging`
- Code change with testable behavior → `superpowers:test-driven-development`

Default to small, reviewable diffs. Don't bundle unrelated improvements.

# Step 4 — Close the loop

When the "Done when" criterion is met:

**4a. Append to `docs/improvement-log.md` under `## History`.** Use this exact template — fill every line with specifics:

```
### YYYY-MM-DD — <area>
**Target:** <module/file/topic — be specific>
**Change:** <what changed, 1–3 sentences, specific>
**Outcome:** <commit hash, or "uncommitted", or "draft for review">
**Followups added to queue:** <none, OR bullet list>
```

If you can't fill the template with specifics, you didn't scope tightly enough — go back to Step 2.

**4b. If coverage was touched:** update the status mark in `docs/curriculum-coverage.md` (⚠️ → ✅, or add a new line under the right domain).

**4c. If new ideas surfaced during the work:** add 1–2 (not 5) to the `## Queued` section. Format: `- [area] specific scopable description`

**4d. Suggest a commit message.** Do NOT commit unless dylan explicitly says so.

# Banned behaviors

- Re-proposing a task that appears in `## History` from the last 30 days, unless you explicitly flag it as a re-visit and explain why now
- Writing log entries like "general cleanup" or "various improvements" — entries must fill the template with specifics
- Working past the stated "Done when" without checking in
- Inventing coverage topics that aren't in `docs/curriculum-coverage.md` — coverage claims must cite the doc
- Bundling unrelated improvements into one /goal run — one focused unit per invocation

# Args

If invoked as `/goal content`, `/goal coverage`, or `/goal housekeeping`, skip triage for other areas and only propose candidates from that area. If invoked as `/goal` with no argument, triage all three.
