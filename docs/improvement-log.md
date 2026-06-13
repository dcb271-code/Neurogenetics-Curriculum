# Curriculum Improvement Log

> Append-only record of iterative improvements. `## Queued` lists next-up ideas. `## History` is what's been shipped. Maintained by `/goal`.

## Queued

- [content] Add the PNH-vs-TSC subependymal-nodule imaging distinction to the `neuroimaging` MCD section (PNH nodules isointense to gray matter on all sequences vs. TSC nodules T1-/FLAIR-bright) — high-yield don't-confuse-these pearl deferred from the 2026-05-23 cross-walk
- [coverage] Decide whether forebrain induction (HPE/SOD) and corpus-callosum malformations — covered richly in `docs/sources/brain_development_malformations.docx` but absent from the curriculum — warrant a new coverage line/section
- [content] Review the remaining size-based framing in the `cnv-interpretation` slides (the "Size Rule of Thumb" slide and decision-tree step 3 "size and gene content") for consistency with the 2019 ACMG/ClinGen gene-content-first scoring — surfaced during the 2026-06-09 accuracy sweep
- [housekeeping] Optional polish from the consistency review: add explicit `slideDistribution` to the 3 modules whose deck doesn't divide evenly across sections (`chromosomes-iscn` 9/5, `clinical-reasoning` 14/6, `genetic-counseling` 11/6) — cosmetic slide↔section mapping only
## History

### 2026-06-13 — content (consistency review Tier 2 + quiz shuffle)
**Target:** `diagnostic-yields.json`, `dual-diagnosis.json`, `variant-interpretation.json`, `cnv-interpretation.json`, `pharmacogenetics.json`, `therapies.json`, `intro-neurogenetics.json`, `neurodevelopmental-disorders.json`; quizzes in `central-dogma`/`chromosomes-iscn`/`iem`/`mitochondrial`/`therapies`
**Change:** Three batches. (1) **Quiz shuffle** — 5 quizzes had every correct answer at index 1 ("always B"); redistributed correct options across indices (2,0,3,1,2) via a swap script so residents can't pattern-match. (2) **Terminology/style** — tempered bare superlatives (cnv "highest yield for any single variant class" → "among the highest-yielding"; pharmacogenetics "the most critical drug contraindication" → "one of the most important"; intro "the highest-yield 'test'" → "one of the highest-yield 'tests'"); changed patient-descriptor "dysmorphic/dysmorphism" → "distinctive features" (variant-interpretation, diagnostic-yields) while keeping pathology terms ("dysmorphic neurons") and category shorthand ("MCA/dysmorphism"); normalized ES/GS → WES/WGS (intro); lowercased "syndrome" in Fragile X / Rett prose (kept title-case headings); standardized Williams → Williams-Beuren (dual-diagnosis); module title "Gene and Molecular Therapies" → "Gene & Molecular Therapies". (3) **Citations** — converted 17 plain-text citations in diagnostic-yields + 1 in dual-diagnosis to linked `[Author Year](PubMed)`; every PMID independently WebSearch-verified. Caught and fixed two factual misattributions in the process: the pooled WGS "~41%, not significantly different vs WES" row was mis-cited to Nurchis 2023 (whose actual finding is WGS *higher*, OR ~1.7–2.4) — re-attributed to Clark 2018, the true source; and the DDD/Wright 2023 entry was relabeled "trio WGS" → "exome + microarray" (correct method). Build passes.
**Outcome:** committed (quiz shuffle, terminology, citations — 3 commits) on `master`; pushed
**Followups added to queue:** the optional `slideDistribution` polish (above)

### 2026-06-13 — content (consistency review Tier 1: cross-module numeric conflicts)
**Target:** `iem.json`, `mosaicism.json`, `intro-neurogenetics.json`, `neurodevelopmental-disorders.json` (+ `gen-neurodevelopmental-disorders.mjs`), `cerebral-palsy.json`
**Change:** Fixed the learner-facing numeric conflicts surfaced by a 3-dimension consistency review. (1) **GLUT1 CSF:serum glucose ratio** — `iem` table + quiz said `<0.45` while its own prose and the rest of the curriculum (epilepsy/ataxia/CP) said `<0.4`; standardized `iem` to `<0.4`. (2) **DMD germline mosaicism** — `mosaicism` keyPoint conflated "~10% of apparently de novo cases" with the quiz's per-pregnancy figure; reworded to "~1/3 are de novo; recurrence after an apparently de novo case ~7–14% per pregnancy," consistent with the quiz explanation's denominators. (3) **CMA detection floor** — `intro` outlier `≥10–200 kb` → `≥50–200 kb` to match cnv-interpretation/diagnostic-yields/chromosomes-iscn. (4) **FMR1 alleles** — added the 45–54 intermediate/gray zone to `intro`'s quiz to match `neurodevelopmental-disorders`. (5) **Vigabatrin in TSC spasms** — `neurodevelopmental-disorders` `~95%` → `~90–95%` (JSON keyPoint + the module's slide deck, regenerated) to match `epilepsy`. (6) **CP CMA yield** — `cerebral-palsy` keyPoint orphan `~7–11%` → `~8–15% across cohorts (~5% pooled meta)`, matching its own content prose. Left genuinely source-distinct idiopathic-CP yield ranges (combined vs exome-only vs general) intact — the module explicitly teaches that yields vary by selection. Build passes.
**Outcome:** committed `251d96f` on `master`; pushed
**Followups added to queue:** Tier 2 (style/terminology) and Tier 3 (quiz answer-key shuffle) consistency items — see Queued above

### 2026-06-13 — feature (dedicated "Slides" tab on the module page)
**Target:** `components/module-tabs.tsx`
**Change:** Added a **Slides** tab (Learn · **Slides** · Notes · Quiz; Learn stays default) so residents can review the full deck end-to-end before/independently of the integrated Learn read-through. Wired in the pre-existing but previously-unused `SlideGallery` component (vertical slide list + full-screen keyboard/pinch-zoom lightbox), wrapped in a scrollable `max-w-4xl` container. Pure viewer — slide-completion tracking stays on the Learn view per design decision. Verified end-to-end against a production build (tab renders, gallery loads all 13 variant-interpretation slides via manifest). Build passes.
**Outcome:** committed `aed6332` on `master`; pushed
**Followups added to queue:** none (resolved same session — see consolidation entry below)

### 2026-06-13 — housekeeping (consolidate the duplicate /slides route onto the tabbed module page)
**Target:** `next.config.mjs`; `app/modules/[moduleId]/slides/page.tsx` (deleted); `app/page.tsx`, `app/review/page.tsx`, `components/continue-banner.tsx`, `components/module-detail.tsx`, `components/search-dialog.tsx`
**Change:** The standalone `/modules/[id]/slides` route rendered a tab-less `ContentReader` (a misnamed duplicate of the Learn tab) and was the target of 5 "resume/open" links — so users arriving via Continue Learning, Search, Review, the continue banner, or module detail never saw the new tab bar. Repointed all 5 links to the tabbed page `/modules/[id]`, deleted the standalone `/slides` route, and added a permanent (308) `redirects()` rule in `next.config.mjs` mapping `/modules/:moduleId/slides` → `/modules/:moduleId` so old bookmarks/links still resolve. Now every module entry point lands on the tabbed shell (Learn default) with Slides/Notes/Quiz reachable. Verified against a production build: old `/slides` URL returns 308 → `/modules/[id]`; tabbed page 200; build passes.
**Outcome:** _pending commit this session_
**Followups added to queue:** none

### 2026-06-13 — content refinement (survivorship slide: real cited image + professional language)
**Target:** `public/images/sourced/survivorship-bias.svg` (new); `scripts/slide-design-system.mjs`; `scripts/gen-variant-interpretation.mjs`; `scripts/gen-gdd-id-asd.mjs`; slide 5 of both decks
**Change:** Per dylan's feedback, replaced the hand-drawn inline-SVG plane (felt amateurish) with the canonical survivorship-bias diagram (McGeddon, CC BY-SA 4.0, via Wikimedia Commons), downloaded to `public/images/sourced/` and embedded via `imageDataUri()` with an on-slide attribution + a caption that explains the concept (clear areas = damage that downed planes, so it never entered the data). Removed the now-unused `survivorshipPlaneSVG()` helper. Rewrote both slides' card text to be professional and accurate for residents — dropped cutesy/confusing phrasing ("test the trio", "key design choice") and the unexplained "OR ~2.04, Clark 2018" stat; the gdd-id-asd third card now plainly states why a trio is informative (it shows which variants are new in the child). Tightened the matching JSON prose in both modules. Decks regenerated; build passes.
**Outcome:** _pending commit this session_
**Followups added to queue:** none

### 2026-06-13 — content + bugfix (italic rendering; survivorship-bias gene-constraint slide)
**Target:** `components/formatted-content.tsx`; `scripts/slide-design-system.mjs`; `scripts/gen-variant-interpretation.mjs` + `data/modules/variant-interpretation.json`; `scripts/gen-gdd-id-asd.mjs` + `data/modules/gdd-id-asd.json`
**Change:** (1) **Bugfix** — the reading-view renderer only handled `**bold**`, so every intentional `*italic*` emphasis (e.g., Latin terms like *in trans*, light emphasis) across all modules displayed as literal asterisks. Added `*italic*` support to the split regex + an `<em>` handler; verified the tokenizer still isolates `**bold**`, `[[wiki-links]]`, and `[label](url)` citations (lone `*` left as text). DRY fix — corrects every module at once. (2) **New teaching artifact** — added a high-fidelity inline-SVG top-down WWII aircraft (red bullet-holes clustered on wings/fuselage/tail, engine + cockpit deliberately clear) as a shared `survivorshipPlaneSVG()` helper in the design system, used to teach **gene constraint as survivorship bias** (gnomAD = the planes that returned; constrained genes = the engine; lethal LoF is missing from the *population*, not reality → recurs as de novo). Added as a real slide to **variant-interpretation** (new slide 5; deck 12→13; `slideDistribution` [2,7,0,0,1,2]→[2,8,0,0,1,2]) under the constraint discussion, and a de-novo-framed version to **gdd-id-asd** (new slide 5 "Why De Novo Dominates Severe NDD"; deck 10→11; added `slideDistribution` [2,3,2,2,2]). Deepened the reading-view prose in both modules (variant-interp constraint subsection; gdd-id-asd architecture section, with a cross-link back to variant-interpretation). Both decks regenerated; `npm run build` passes.
**Outcome:** Uncommitted (working tree) — on `master`
**Followups added to queue:** none

### 2026-06-11 — content (module-by-module depth + verified PubMed citation pass — COMPLETE, all 25 modules)
**Target:** Every `data/modules/*.json` section `content` string (web-reader prose) across all 25 modules; `keyPoints`/quizzes/slides untouched
**Change:** Deepened the reading-view prose of every module so it teaches *beyond* a verbatim retelling of the slide bullets — adding the "why," mechanism, clinical-reasoning, and nuance/caveats the slides don't carry — and added ~2 PubMed citations per module (avg) for genuinely archetypal/landmark facts, formatted inline as `[Author Year](https://pubmed.ncbi.nlm.nih.gov/PMID/)` (external-link support was added to `formatted-content.tsx` earlier). **Every PMID was independently verified against title/journal/year via WebSearch before commit** — subagents drafted prose + proposed landmark citations with evidence, I re-verified each PMID and trimmed weak ones. Citations span seminal disease-gene discoveries (MECP2/Amir, NOTCH3/Joutel, frataxin/Campuzano, dystrophin/Monaco, SMN1/Lefebvre, etc.), major guidelines (ACMG variant interpretation/Richards, ClinGen CNV/Riggs, ACMG array/Miller, TSC surveillance/Northrup), and landmark trials (SMA: Mendell/Finkel; FRDA: Lynch MOXIe; KCNQ2: Pisano). Shipped in 8 batches; 24 content modules + the earlier gdd-id-asd module.
**Outcome:** Committed across 8 commits ending `a19ba78` on `master`; pushed
**Followups added to queue:** none

### 2026-06-11 — content + structure (new GDD/ID/ASD module; extract from archetypal; block reorg)
**Target:** New `data/modules/gdd-id-asd.json` + `scripts/gen-gdd-id-asd.mjs`; reverted the embedded section from `neurodevelopmental-disorders` (renamed to "Archetypal Neurogenetic Disorders"); `data/modules/index.ts` + `app/page.tsx` block reorg
**Change:** Per dylan's redesign: (1) Extracted the "Broader Genetic Architecture" section (+ quiz items + 2 slides) out of the archetypal module, restoring it to 6 sections / 12 slides, and renamed it "Archetypal Neurogenetic Disorders". (2) Built a new dedicated module **"Evaluating Developmental Delay, ID & Autism"** (`gdd-id-asd`) — 5 sections framed as a clinical approach: definitions & the diagnostic shift; the genetic architecture; exam findings that shift yield (head circumference macro/micro, hypotonia, growth, regression — explicitly NOT minor dysmorphism like epicanthal folds); the 'subtly syndromic' genes (SHANK3, ARID1B, PTEN, MTOR, 16p11.2, SON/ZTTK, ADNP); and a modern testing strategy (CMA + Fragile X historically, now exome/genome increasingly first-line WITH pretest genetic counseling/CGC; CMA + FraX still needed since exome misses CNVs and the FMR1 repeat). 5 inline + 6 final quiz vignettes, 10-slide deck; numbers matched to diagnostic-yields. (3) Reorganized the homepage blocks: Block 4 now Genetic Counseling · Diagnostic Yields · Medication Implications & Pharmacogenomics; Block 5 now Archetypal NDD · the new GDD/ID/ASD module · Epilepsy. Module count 24→25.
**Outcome:** Committed across `0abd729`-revert + new commits on `master`; pushed
**Followups added to queue:** none

### 2026-06-10 — housekeeping (readability sweep, part 2 — completed)
**Target:** Remaining single-paragraph "wall of text" sections across `iem` (2), `cerebral-palsy` (3), `neuromuscular` (2), `mosaicism` (4), `dystonia` (2), `intro-neurogenetics` (2), `mitochondrial` (1), `central-dogma` (1), `epilepsy` (2), `therapies` (1), `pharmacogenetics` (1), `dual-diagnosis` (1) — 22 sections
**Change:** Reformatted via 4 parallel formatting-only editors (bold, bullets, sub-headings, paragraph breaks); facts preserved and spot-verified; a precise check confirmed no wiki-links inside any table row across all modules. Completes the density-scan sweep started earlier today (neuroimaging/epigenetics/virtual-cases). The remaining scan hits (variant-interpretation, NDD Rett) are already structured — not walls.
**Outcome:** Committed `cea8406` on `master`; pushed
**Followups added to queue:** none



### 2026-06-10 — content + housekeeping (module reframes, new NDD section, readability)
**Target:** `pharmacogenetics`, `dual-diagnosis`, `neurodevelopmental-disorders`, all 24 module descriptions, and dense sections in `neuroimaging`/`epigenetics`/`virtual-cases` (+ matching slide generators)
**Change:** (1) Retitled pharmacogenetics → "Medication Implications & Pharmacogenomics" and tempered the PGx-testing framing (combinatorial panels like GeneSight are oversold and not guideline-endorsed; categorical 'red'/'caution' results usually mean consider dose adjustment, not contraindication; PGx is a refinement, not a panacea) — kept the high-value specific pairs (HLA-B*15:02/CBZ, POLG/valproate, CYP2C9/phenytoin). (2) Retitled dual-diagnosis → "Neuropsychiatric Comorbidity in Neurogenetics" and replaced all "dual diagnosis" framing with "neuropsychiatric comorbidity / comorbidity" (per-instance, titles + objectives + content + quiz + slides + footer label). (3) Added a 7th section "The Broader Genetic Architecture of ID and Autism" to the NDD module (de novo dominant, CNVs, monogenic/X-linked, yield-by-phenotype, first-tier work-up, recurrence) with index-aligned inline quiz + final quiz + 2 slides (deck 12→14); numbers cross-checked against diagnostic-yields/mosaicism. (4) Rewrote all 24 module `description` fields to concise, professional one-liners (no homepage-card ellipsis) and verified the ACMG SF list is current (v3.3, 84 genes) when adding the genetic-counseling §4 Secondary Findings full gene table earlier today. (5) Reformatted the worst wall-of-text sections in neuroimaging (5), epigenetics (5), and virtual-cases (6) — formatting only (bold/bullets/paragraphs), facts preserved and spot-verified.
**Outcome:** Committed across several commits on `master` (87d0e1c…HEAD); pushed.
**Followups added to queue:** continue readability sweep on the ~25 remaining smaller single-paragraph sections

### 2026-06-10 — coverage + content (new section: genetic-counseling §4 Secondary Findings)

### 2026-06-10 — coverage + content (new section: genetic-counseling §4 Secondary Findings)
**Target:** `data/modules/genetic-counseling.json` (new "Secondary Findings" section + inline + final quiz item) + `scripts/gen-genetic-counseling.mjs` (new slide 7, renumber, 11-slide deck); also rewrote all 24 module `description` fields to concise, professional one-liners (no card ellipsis).
**Change:** Added a 6th genetic-counseling section on secondary/incidental findings — the ACMG SF list (verified current as **v3.3, 2025, 84 genes** against the ACMG statement; refreshed the module's two stale "v3.2" references), the **consent duty to OFFER** (ACMG supports opt-out at consent but labs vary and many require explicit opt-in — provider must offer and document), and the pediatric adult-onset return-of-results tension (BRCA from a child's exome), framed as the debated area it is. Inserted an index-aligned inline-quiz item (the inline "Check Your Understanding" is paired to sections by array index in `content-reader.tsx`, so a section insert requires a matching inline insert at the same index) plus a final-quiz vignette. Regenerated the deck (10→11 slides). Web-verified SF facts; `npm run build` passes.
**Outcome:** Uncommitted (working tree) — on `master`
**Followups added to queue:** none

### 2026-06-10 — content quality (accuracy: SLC6A1 / vigabatrin verification)
**Target:** `data/modules/diagnostic-yields.json` (Summary "Clinical utility" line) + `scripts/gen-diagnostic-yields.mjs` (slide 6 "Precision Therapy Examples") + re-rendered diagnostic-yields slides
**Change:** Verified the SLC6A1/SSADH/vigabatrin claims against GeneReviews and primary literature. Findings: (1) **SSADH/ALDH5A1 → avoid vigabatrin (paradoxical GABA elevation)** is CORRECT and current — GeneReviews (NBK1195) states vigabatrin "is not generally recommended" because it "may result in elevated GABA and exacerbation of manifestations, and its clinical utility has been inconsistent" (the older "tried as a therapy to lower GHB" story has resolved to a clear avoid). So `epilepsy.json` and `clinical-reasoning.json` were already accurate — no change. (2) **SLC6A1 → valproate first-line** is CORRECT (valproate is the most consistently effective ASM in SLC6A1-related disorder). (3) **SLC6A1 → avoid vigabatrin** in `diagnostic-yields.json` was a MISATTRIBUTION — the "avoid vigabatrin" pearl belongs to SSADH; for SLC6A1, vigabatrin avoidance is only a theoretical paradox, not established guidance. Corrected `diagnostic-yields.json` and its slide-6 example to "SLC6A1 → valproate first-line", aligning all four modules; re-rendered the 12 diagnostic-yields slides.
**Outcome:** Uncommitted (working tree) — on `master`
**Followups added to queue:** none

### 2026-06-10 — coverage (new module: clinical-reasoning)
**Target:** New `data/modules/clinical-reasoning.json` ("Clinical Decision-Making in Neurogenetics", Block 10, before `virtual-cases`) + `scripts/gen-clinical-reasoning.mjs` + `MODULE_COLORS` entry in `scripts/slide-design-system.mjs`
**Change:** Built a 6-section integration module that closes all 8 ❌ items in the "Clinical reasoning & management" coverage domain: (§1) choosing the first test — panel/exome/genome/trio/CMA-first/rapid decision logic; (§2) living with a VUS — communication + the do-not-act-on-a-VUS rule (ACMG/AMP 2015); (§3) when "negative" isn't negative — reanalysis, repeat-expansion, methylation/imprinting, and mosaicism blind spots; (§4) treatment & surveillance — disease-modifying vs precision symptomatic + a TSC surveillance table verified against Northrup 2021; (§5) reproductive & cascade decisions; (§6) communicating under uncertainty + MDT coordination. Cross-links sibling modules rather than re-teaching (numbers reused verbatim from `diagnostic-yields`/`epilepsy`/`iem`/`mosaicism`/`genetic-counseling`). Added 6 inline + 7 final board-style quiz vignettes and a 14-slide deck. Built via subagent-driven development with per-section accuracy review; two defects caught and fixed in review (wiki-links inside a markdown table cell broke rendering; all 7 final-quiz answers were keyed to one position).
**Outcome:** Uncommitted on branch `feature/clinical-reasoning-module` (commits 87d0e1c…5cb76cc); spec `docs/superpowers/specs/2026-06-10-clinical-reasoning-module-design.md`, plan `docs/superpowers/plans/2026-06-10-clinical-reasoning-module.md`
**Followups added to queue:** fix the contradictory "SLC6A1 → avoid vigabatrin" line in `diagnostic-yields.json` (surfaced during §4 accuracy work)

### 2026-06-09 — content quality (accuracy: cnv-interpretation sweep)
**Target:** `data/modules/cnv-interpretation.json` + `scripts/generate-cnv-slides.mjs` — the one clinical module never covered by the 2026-05-16 accuracy sweep
**Change:** Physician-level verification of the ACMG/ClinGen CNV framework, dosage-sensitivity scoring, recurrent genomic disorders, and all 11 quiz items — all confirmed accurate. Two corrections: (1) the evidence-domain-1 description (JSON keyPoint + slide-5 table) called Section 1 "size of CNV and gene content," perpetuating pre-2019 size-based thinking — reworded to reflect that the 2019 framework (Riggs et al.) scores on gene content / dosage sensitivity, not CNV length. (2) Slide-5 classification cards showed the benign-side cutoffs as positive (Likely Benign "0.90–0.98", Benign "≥0.99"), losing the sign that distinguishes them from the pathogenic side — corrected to −0.90 to −0.98 and ≤−0.99. Re-rendered the 10 CNV slides via the correct `gen-cnv-interpretation.mjs` (puppeteer-html); note the legacy canvas `generate-cnv-slides.mjs` is NOT the active generator.
**Outcome:** Uncommitted (working tree)
**Followups added to queue:** review remaining size-based framing in CNV slides ("Size Rule of Thumb", decision-tree step 3)

### 2026-06-09 — content quality (accuracy: precision-nit sweep)
**Target:** GLUT1 ratio (`iem.json`), FRDA GAA ranges (`ataxia.json`), vigabatrin TSC rate (`neurodevelopmental-disorders.json`), DMD exon-51 skipping (`neuromuscular.json`) + matching slide generators
**Change:** (1) GLUT1 CSF:blood glucose ratio unified to <0.4 (was <0.45 in IEM, <0.4 elsewhere) per Klepper 2020 Glut1DS study group / GeneReviews; added "CSF glucose <40 mg/dL". (2) FRDA GAA sizing: added the omitted intermediate/"mutable normal" 34–65 zone and 44–66 borderline incomplete-penetrance note; corrected normal to 5–33, pathogenic to 66–1300 (most 600–1200) per GeneReviews. (3) Vigabatrin ~95% TSC response VERIFIED CORRECT (Hancock & Osborne 1999, 73/77 = 95%; flag was a false positive) — added the ~50% non-TSC contrast for precision. (4) DMD exon-51 skipping explanation VERIFIED CORRECT (del 48–50 + skip 51 = 630 nt, in-frame, eteplirsen-amenable; flag was a false positive) — no change. Re-rendered iem (15) + ataxia (15) slides.
**Outcome:** Uncommitted (working tree)
**Followups added to queue:** none

### 2026-05-23 — content quality
**Target:** `neuroimaging` module, "Malformations of Cortical Development" section (`data/modules/neuroimaging.json`)
**Change:** Cross-walked the section against `docs/sources/brain_development_malformations.docx` and closed two missing MCD categories. Added cobblestone (Type 2) lissencephaly — α-dystroglycan O-mannosylation defect; POMT1/2, POMGNT1, FKTN, FKRP, LARGE1; Walker-Warburg / Fukuyama / muscle-eye-brain spectrum; ↑CK + congenital muscular dystrophy → dystroglycanopathy panel — and hemimegalencephaly (somatic mosaic PIK3CA/AKT3/MTOR, unilateral overgrowth with dysmorphic ipsilateral ventricle, refractory focal epilepsy, hemispherotomy as primary treatment). Section grew 2137 → 3178 chars; `npm run build` passes.
**Outcome:** Committed as `01e3a11`
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
