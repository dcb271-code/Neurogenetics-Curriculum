# /goal Command Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a `/goal` slash command that drives one focused iterative improvement to the neurogenetics curriculum per invocation, durable across sessions via an improvement log and a coverage checklist.

**Architecture:** Three markdown files: a slash-command prompt at `.claude/commands/goal.md`, an append-only improvement log at `docs/improvement-log.md`, and a reverse-engineered coverage checklist at `docs/curriculum-coverage.md`. No code. The prompt does the work by reading the two state files plus the repo (modules, git log, build output) and proposing 2–3 candidate tasks each invocation.

**Tech Stack:** Markdown only. No build/test changes. Claude Code project slash command format (markdown file in `.claude/commands/` with optional `description` frontmatter).

**Spec:** `docs/superpowers/specs/2026-05-22-goal-command-design.md`

---

## File Structure

| File | Responsibility |
|------|----------------|
| `docs/curriculum-coverage.md` | North-star checklist: every topic the curriculum should cover, grouped into 5 domains, marked ✅ / ⚠️ / ❌ / ➖, linked to module(s). Hand-edited by dylan over time; updated by /goal when coverage gaps close. |
| `docs/improvement-log.md` | Append-only durable memory. `## Queued` (next ideas) + `## History` (what's been done). Read by /goal at boot; appended to at end of each run. |
| `.claude/commands/goal.md` | The slash-command prompt. Encodes the entire flow: read state, triage, propose, scope, execute, log. |
| `docs/superpowers/specs/2026-05-22-goal-command-design.md` | Design spec (already committed in `ce91a80`). |

---

## Task 1: Bootstrap the curriculum coverage checklist

**Files:**
- Create: `docs/curriculum-coverage.md`

This is the most substantive task. The engineer reads all 23 module JSONs, extracts section titles, groups them into 5 domains, and produces a single checklist. Use the exact domain-to-module mapping below; do not invent groupings.

**Domain → module mapping (use exactly this):**

- **Foundations:** `intro-neurogenetics`, `central-dogma`, `chromosomes-iscn`, `epigenetics`, `mosaicism`
- **Methods:** `variant-interpretation`, `cnv-interpretation`, `diagnostic-yields`, `genetic-counseling`
- **Disease groups:** `epilepsy`, `neurodevelopmental-disorders`, `dystonia`, `cerebral-palsy`, `ataxia`, `iem`, `neuromuscular`, `mitochondrial`, `stroke`, `dual-diagnosis`
- **Cross-cutting:** `neuroimaging`, `pharmacogenetics`, `therapies`, `virtual-cases`
- **Clinical reasoning & management:** *(no module yet — populate with the 8 starter items below, all marked ❌)*

- [ ] **Step 1: Read every module's section titles**

For each module ID in the mapping above, read `data/modules/<id>.json` and extract every entry from `sections[].title`. Use the Read tool or, for efficiency, dispatch a single subagent (Explore) to gather all 23 lists in one go.

- [ ] **Step 2: Create the coverage doc with this exact structure**

Write `docs/curriculum-coverage.md` with this template, filling in each domain's bullets from Step 1. Use one bullet per section title, prefixing with the module ID in backticks.

````markdown
# Curriculum Coverage Checklist

> The north-star map of topics this curriculum should cover. Updated by `/goal` when coverage gaps close, and hand-edited by dylan when the target outline evolves.

**Status legend:** ✅ covered  ⚠️ partial  ❌ missing  ➖ out of scope

**Last bootstrap:** YYYY-MM-DD (replace with today's date)

---

## Foundations

- ✅ `intro-neurogenetics` — What is Neurogenetics?
- ✅ `intro-neurogenetics` — Genetic Architecture of Neurological Disease
- ✅ `intro-neurogenetics` — Common Neurogenetic Disease Categories
- ✅ `intro-neurogenetics` — The Neurogenetic History and Examination
- ✅ `central-dogma` — <section title>
- ... (one bullet per section across all 5 Foundations modules)

## Methods

- ✅ `variant-interpretation` — <section title>
- ... (one bullet per section across all 4 Methods modules)

## Disease groups

- ✅ `epilepsy` — <section title>
- ... (one bullet per section across all 10 Disease group modules)

## Cross-cutting

- ✅ `neuroimaging` — <section title>
- ... (one bullet per section across all 4 Cross-cutting modules)

## Clinical reasoning & management

*Not tied to any single disease — the heuristics, decision frameworks, and management principles that connect genetic findings to clinical care. This domain has no dedicated module yet; coverage here will tend to mean adding cross-cutting sections to existing modules or eventually building a dedicated module.*

- ❌ When to send a genetic panel vs. exome vs. genome (decision tree)
- ❌ Interpreting a VUS in the clinic — what to tell the family, when to re-contact
- ❌ Reproductive counseling decision points (prenatal vs preimplantation vs cascade testing)
- ❌ Symptomatic vs disease-modifying treatment choices in genetic disease
- ❌ When a "negative" result isn't negative (re-analysis, deeper sequencing, methylation, repeat expansions)
- ❌ Surveillance schedules for known syndromes (cancer-predisposition overlaps, cardiac, cognitive)
- ❌ Communicating prognosis under genotype–phenotype uncertainty
- ❌ Multidisciplinary care coordination (genetics + neuro + PT/OT/SLP + palliative)
````

Default status for every section extracted in Step 1 is ✅ (it exists, so it's at minimum present). Dylan will downgrade specific entries to ⚠️ over time as he reviews. The Clinical reasoning & management items stay ❌.

- [ ] **Step 3: Verify**

Open the file. Count bullets per domain:
- Foundations: should equal total sections across 5 modules
- Methods: across 4 modules
- Disease groups: across 10 modules
- Cross-cutting: across 4 modules
- Clinical reasoning & management: exactly 8 items

If counts are off, you missed sections — re-read the modules and add them.

- [ ] **Step 4: Commit**

```bash
git add docs/curriculum-coverage.md
git commit -m "docs: bootstrap curriculum coverage checklist

Reverse-engineered from 23 module JSONs. Five domains: Foundations,
Methods, Disease groups, Cross-cutting, and Clinical reasoning &
management (8 starter items, all marked missing — this is the domain
the existing modules don't yet cover)."
```

---

## Task 2: Seed the improvement log

**Files:**
- Create: `docs/improvement-log.md`

- [ ] **Step 1: Get the last 5 meaningful commits for seeding History**

Run: `git log --pretty=format:'%h|%ad|%s' --date=short -15`

From the output, pick the 5 most recent commits that represent real curriculum work (not "fix typo" or merge commits). Likely candidates already in this repo:
- `325082a` 2026-05-XX accuracy review (35 corrections)
- `747b8e0` 2026-05-XX SLC6A1 vs SSADH fix
- `8646ef3` admin editing feature merge
- `dde3566` retake shuffle fix
- `2b1d17f` admin badge UI

Adjust based on actual log output and dates.

- [ ] **Step 2: Write the log with this exact structure**

````markdown
# Curriculum Improvement Log

> Append-only record of iterative improvements. `## Queued` lists next-up ideas. `## History` is what's been shipped. Maintained by `/goal`.

## Queued

*(empty — first run of /goal will start populating this)*

## History

### 2026-05-XX — content quality
**Target:** epilepsy module — SLC6A1 vs SSADH treatment claim
**Change:** Corrected incorrect treatment attribution; SLC6A1-related epilepsy doesn't respond to vigabatrin in the way SSADH deficiency does.
**Outcome:** Committed as `747b8e0`
**Followups added to queue:** none (retrospective entry)

### 2026-05-XX — content quality
**Target:** 21 modules — accuracy sweep
**Change:** 35 targeted corrections across the curriculum (full list in commit body).
**Outcome:** Committed as `325082a`
**Followups added to queue:** none (retrospective entry)

(... continue with 3 more retrospective entries from Step 1, oldest at the bottom)
````

For each retrospective entry, fill the dates from `git log` output. The `Change:` line should be specific — pull from the commit subject and body. If you can't write a specific Change line from the commit message, skip that commit and pick a different one.

- [ ] **Step 3: Commit**

```bash
git add docs/improvement-log.md
git commit -m "docs: seed curriculum improvement log

Initial structure with empty Queued section and 5 retrospective History
entries from recent commits. /goal will append from here forward."
```

---

## Task 3: Write the /goal slash command prompt

**Files:**
- Create: `.claude/commands/goal.md`

- [ ] **Step 1: Verify Claude Code project command format**

Project slash commands live in `.claude/commands/<name>.md`. The file is plain markdown with optional YAML frontmatter for `description`. The body is the prompt that runs when the user types `/<name>`. Arguments after the command name are appended.

- [ ] **Step 2: Write the prompt**

Write `.claude/commands/goal.md` with this exact content:

````markdown
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
- Check slide manifests: `for f in public/slides/*/manifest.json; do ...`  — does each referenced slide file exist on disk?
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
````

- [ ] **Step 3: Sanity check the file**

Verify the file is at `.claude/commands/goal.md`, has YAML frontmatter with a `description`, and the body is the prompt above.

- [ ] **Step 4: Commit**

```bash
git add .claude/commands/goal.md
git commit -m "feat: add /goal slash command for iterative curriculum improvement

Reads improvement-log.md and curriculum-coverage.md, triages content
quality / coverage / housekeeping, proposes 2-3 candidates, scopes
tightly (\"done when X\"), executes, then appends a templated log entry.
Bans vague entries, silent re-treads, and scope creep past \"done when\"."
```

---

## Task 4: Dogfood the command and tighten

This task validates the prompt works end-to-end and surfaces things to fix.

- [ ] **Step 1: Run /goal in a fresh Claude Code session**

Open a new chat in this repo. Type `/goal`. Observe whether Claude:
- Reads the three sources without being told
- Presents queued items (none yet) OR moves to triage
- Proposes 2–3 candidates in the exact format
- Doesn't start working before stating "Done when X"

- [ ] **Step 2: Note what didn't work**

Likely failure modes to watch for:
- Skips reading one of the state files
- Proposes vague candidates ("audit epilepsy")
- Starts executing before scoping
- Forgets to update the log at the end
- Bundles multiple improvements
- Invents coverage topics

For each one observed, decide: is it a prompt clarity issue (tighten the language) or a Claude judgement issue (no fix possible, accept).

- [ ] **Step 3: Tighten `.claude/commands/goal.md` for the prompt-clarity issues**

Make targeted edits. Keep the prompt under ~150 lines — it has to fit in Claude's working memory each invocation.

- [ ] **Step 4: Commit the tightening**

```bash
git add .claude/commands/goal.md
git commit -m "tune(goal): tighten <specific section> based on first dogfood run"
```

- [ ] **Step 5: One more dogfood run, this time completing a real improvement end-to-end**

Pick a small coverage gap (one of the 8 Clinical reasoning ❌ items, or a ⚠️ that dylan flags) and run /goal through to a real append in `docs/improvement-log.md`. This is the proof that the loop closes.

---

## Self-review

Checked against the spec:

| Spec requirement | Task |
|---|---|
| Three files: command + log + coverage | Tasks 1, 2, 3 |
| Coverage doc with 5 domains incl. Clinical reasoning | Task 1, Step 2 template |
| Reverse-engineer coverage from 23 modules | Task 1, Steps 1–2 |
| Improvement log with Queued + History | Task 2, Step 2 |
| Seed log with last ~5 commits | Task 2, Steps 1–2 |
| Boot flow reads log + coverage + git log | Task 3, "Read state first" |
| Branch on queued items | Task 3, Step 1 |
| Triage signals for 3 areas | Task 3, Step 1 triage section |
| 2–3 candidates with one-line rationale | Task 3, "Present candidates" |
| Tight scoping ("Done when X") before execute | Task 3, Step 2 |
| Templated log entry | Task 3, Step 4a |
| Update coverage marks when coverage touched | Task 3, Step 4b |
| Queued additions during work | Task 3, Step 4c |
| Suggest commit message, don't commit | Task 3, Step 4d |
| Banned behaviors enforced in prompt | Task 3, "Banned behaviors" |
| Arg form: `/goal <area>` | Task 3, "Args" |
| Bootstrap: write coverage, seed log, write prompt | Tasks 1, 2, 3 in that order |

No spec gaps. No placeholders. Type/name consistency: `Queued` and `History` H2 names, area names (`content`, `coverage`, `housekeeping`), file paths (`docs/improvement-log.md`, `docs/curriculum-coverage.md`, `.claude/commands/goal.md`) all match across tasks.
