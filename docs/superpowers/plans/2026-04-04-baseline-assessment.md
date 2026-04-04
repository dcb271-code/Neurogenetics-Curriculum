# Baseline Assessment & Assessment Hub — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 25-question no-feedback baseline pretest, an assessments hub page, and relocate the existing comprehensive exam under the new `/assessments` route tree.

**Architecture:** New `/assessments` route with two children (`baseline`, `comprehensive`). The baseline page reuses the exam component pattern but strips all per-question feedback. The front page card now links to the hub. Dashboard and admin API are extended to show baseline data alongside comprehensive exam data.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Supabase (quiz_attempts table)

**Spec:** `docs/superpowers/specs/2026-04-04-baseline-assessment-design.md`

---

### Task 1: Create baseline assessment question data

**Files:**
- Create: `data/baseline-assessment.json`

- [ ] **Step 1: Write the 25-question baseline JSON**

Create `data/baseline-assessment.json` with this structure. Questions should be board-style, high-yield, covering all major curriculum areas. No `explanation` field. Each question has: `id`, `question`, `options` (4 choices), `answer` (0-based index), `sourceModules`, `difficulty`, `category`.

```json
{
  "title": "Pre-Curriculum Baseline Assessment",
  "description": "25-question baseline assessment to gauge starting knowledge",
  "questions": [
    {
      "id": 1,
      "question": "A 6-month-old boy with hypotonia and tongue fasciculations is found to have homozygous SMN1 deletion. SMN2 copy number is 2. Which statement about this child's prognosis is most accurate?",
      "options": [
        "With 2 copies of SMN2, the child is expected to have a normal lifespan without treatment",
        "Without disease-modifying therapy, most children with this genotype will not sit independently and have a life expectancy under 2 years",
        "SMN2 copy number does not influence disease severity in spinal muscular atrophy",
        "Homozygous SMN1 deletion is a benign carrier state requiring no intervention"
      ],
      "answer": 1,
      "sourceModules": ["neuromuscular", "therapies"],
      "difficulty": "intermediate",
      "category": "Clinical Vignette"
    },
    {
      "id": 2,
      "question": "A 10-year-old girl with intellectual disability, obesity, small hands and feet, and neonatal hypotonia history is evaluated. Methylation analysis of 15q11-13 shows only the maternal pattern. What is the most likely diagnosis?",
      "options": [
        "Angelman syndrome",
        "Prader-Willi syndrome",
        "Fragile X syndrome",
        "Rett syndrome"
      ],
      "answer": 1,
      "sourceModules": ["epigenetics", "neurodevelopmental-disorders"],
      "difficulty": "intermediate",
      "category": "Clinical Vignette"
    },
    {
      "id": 3,
      "question": "Which inheritance pattern is associated with mitochondrial DNA disorders such as MELAS?",
      "options": [
        "Autosomal dominant with variable expressivity",
        "Autosomal recessive with carrier parents",
        "Maternal inheritance — all children of an affected mother may inherit mutant mtDNA",
        "X-linked recessive — primarily affecting males"
      ],
      "answer": 2,
      "sourceModules": ["mitochondrial"],
      "difficulty": "beginner",
      "category": "Knowledge"
    },
    {
      "id": 4,
      "question": "A child with drug-resistant focal epilepsy undergoes surgical resection. Histopathology shows focal cortical dysplasia type II. Standard blood-based exome sequencing was negative. What is the most likely genetic mechanism?",
      "options": [
        "Autosomal recessive inheritance with incomplete penetrance",
        "Brain-restricted somatic mosaicism for an mTOR pathway variant not detectable in blood",
        "Mitochondrial DNA heteroplasmy causing focal cortical malformation",
        "Trinucleotide repeat expansion below the detection threshold of exome sequencing"
      ],
      "answer": 1,
      "sourceModules": ["mosaicism", "epilepsy"],
      "difficulty": "advanced",
      "category": "Clinical Vignette"
    },
    {
      "id": 5,
      "question": "A pathogenic heterozygous frameshift variant in a haploinsufficiency gene creates a premature termination codon in exon 2 of 12 exons. What is the most likely molecular consequence?",
      "options": [
        "Production of a truncated but partially functional protein",
        "Exon skipping that restores the reading frame",
        "Nonsense-mediated mRNA decay, resulting in loss of function from the affected allele",
        "Activation of an alternative start codon downstream of the frameshift"
      ],
      "answer": 2,
      "sourceModules": ["central-dogma", "variant-interpretation"],
      "difficulty": "intermediate",
      "category": "Knowledge"
    },
    {
      "id": 6,
      "question": "A 7-year-old boy with Duchenne muscular dystrophy has a deletion of DMD exons 45-50. An exon-skipping antisense oligonucleotide therapy is being considered. What is the therapeutic rationale?",
      "options": [
        "Skipping an adjacent exon to restore the reading frame, converting the out-of-frame deletion to an in-frame deletion that produces a partially functional dystrophin",
        "Replacing the deleted exons with synthetic DNA sequences via homologous recombination",
        "Upregulating utrophin to compensate for absent dystrophin without targeting the DMD gene",
        "Silencing the remaining DMD allele to prevent dominant-negative effects"
      ],
      "answer": 0,
      "sourceModules": ["neuromuscular", "therapies"],
      "difficulty": "intermediate",
      "category": "Knowledge"
    },
    {
      "id": 7,
      "question": "A chromosomal microarray in a child with developmental delay reveals a 500 kb deletion classified as a variant of uncertain significance (VUS). Which next step is most appropriate?",
      "options": [
        "Report the deletion as pathogenic based on the child's phenotype alone",
        "Perform parental testing to determine if the deletion is de novo or inherited, which informs classification",
        "Repeat the microarray at a different laboratory for confirmation",
        "Disregard the finding because deletions under 1 Mb are always benign"
      ],
      "answer": 1,
      "sourceModules": ["cnv-interpretation", "variant-interpretation"],
      "difficulty": "intermediate",
      "category": "Clinical Vignette"
    },
    {
      "id": 8,
      "question": "A 5-year-old girl with diurnal fluctuation of limb tone — worse in the evening and improved after sleep — has been labeled with cerebral palsy. What diagnosis should be excluded before accepting this label?",
      "options": [
        "Myasthenia gravis",
        "Dopa-responsive dystonia (GCH1), which responds dramatically to low-dose levodopa",
        "Spinal muscular atrophy",
        "Friedreich ataxia"
      ],
      "answer": 1,
      "sourceModules": ["dystonia", "cerebral-palsy"],
      "difficulty": "intermediate",
      "category": "Clinical Vignette"
    },
    {
      "id": 9,
      "question": "Which pharmacogenomic test is recommended before prescribing carbamazepine to a patient of Southeast Asian ancestry?",
      "options": [
        "CYP2D6 genotyping",
        "HLA-B*15:02 genotyping to assess risk of Stevens-Johnson syndrome",
        "UGT1A1 genotyping for Gilbert syndrome",
        "POLG sequencing to rule out mitochondrial disease"
      ],
      "answer": 1,
      "sourceModules": ["pharmacogenetics"],
      "difficulty": "intermediate",
      "category": "Knowledge"
    },
    {
      "id": 10,
      "question": "An infant presents with epileptic encephalopathy. Genetic testing reveals a de novo heterozygous SCN1A loss-of-function variant consistent with Dravet syndrome. Which medication class is contraindicated?",
      "options": [
        "Benzodiazepines",
        "Sodium channel blockers (carbamazepine, lamotrigine, phenytoin)",
        "Valproic acid",
        "Cannabidiol"
      ],
      "answer": 1,
      "sourceModules": ["epilepsy", "pharmacogenetics"],
      "difficulty": "intermediate",
      "category": "Clinical Vignette"
    },
    {
      "id": 11,
      "question": "What is the primary purpose of trio exome sequencing (proband + both parents) compared to singleton exome?",
      "options": [
        "It triples the genomic coverage and detects three times as many variants",
        "It enables identification of de novo variants and phase determination, greatly improving diagnostic yield",
        "It is required only for X-linked conditions",
        "It reduces sequencing cost by batching samples"
      ],
      "answer": 1,
      "sourceModules": ["diagnostic-yields"],
      "difficulty": "beginner",
      "category": "Knowledge"
    },
    {
      "id": 12,
      "question": "A previously healthy 40-year-old woman presents with recurrent subcortical lacunar strokes, migraine with aura, and progressive cognitive decline. Her father had early-onset dementia. MRI shows characteristic white matter changes in the anterior temporal lobes and external capsules. What is the most likely diagnosis?",
      "options": [
        "Multiple sclerosis",
        "CADASIL (NOTCH3 arteriopathy)",
        "Primary CNS vasculitis",
        "Susac syndrome"
      ],
      "answer": 1,
      "sourceModules": ["stroke"],
      "difficulty": "intermediate",
      "category": "Clinical Vignette"
    },
    {
      "id": 13,
      "question": "Which feature most strongly suggests a genetic rather than acquired etiology in a child diagnosed with cerebral palsy?",
      "options": [
        "History of premature birth at 28 weeks with grade III intraventricular hemorrhage",
        "Normal brain MRI, term birth without perinatal complications, and additional features such as intellectual disability and epilepsy",
        "Spastic diplegia with periventricular leukomalacia on MRI",
        "Birth asphyxia with Apgar scores of 1 and 3 at 1 and 5 minutes"
      ],
      "answer": 1,
      "sourceModules": ["cerebral-palsy", "diagnostic-yields"],
      "difficulty": "intermediate",
      "category": "Clinical Vignette"
    },
    {
      "id": 14,
      "question": "A variant in a known disease gene is found at an allele frequency of 8% in gnomAD. Under ACMG/AMP guidelines, what classification does this frequency most directly support?",
      "options": [
        "Likely pathogenic — rare variants in disease genes are presumed pathogenic",
        "Variant of uncertain significance — population frequency alone cannot classify",
        "Benign (BA1 stand-alone) — frequency above 5% in a population database excludes pathogenicity for rare disease",
        "Pathogenic — high frequency indicates a founder effect"
      ],
      "answer": 2,
      "sourceModules": ["variant-interpretation"],
      "difficulty": "intermediate",
      "category": "Interpretation"
    },
    {
      "id": 15,
      "question": "A neonate with seizures has a CSF glucose of 22 mg/dL with simultaneous blood glucose of 85 mg/dL. Which diagnosis and treatment are most appropriate?",
      "options": [
        "Bacterial meningitis — empiric antibiotics",
        "GLUT1 deficiency syndrome — ketogenic diet to provide alternative brain fuel",
        "Galactosemia — galactose-free formula",
        "Maple syrup urine disease — leucine-restricted diet"
      ],
      "answer": 1,
      "sourceModules": ["iem", "epilepsy"],
      "difficulty": "intermediate",
      "category": "Clinical Vignette"
    },
    {
      "id": 16,
      "question": "A 12-year-old boy with intellectual disability has a maternal uncle with similar features. The boy has a long face, prominent ears, and macroorchidism. What is the most likely diagnosis and the appropriate diagnostic test?",
      "options": [
        "Klinefelter syndrome — karyotype showing 47,XXY",
        "Fragile X syndrome — FMR1 CGG repeat analysis",
        "Angelman syndrome — 15q11 methylation analysis",
        "Down syndrome — karyotype showing trisomy 21"
      ],
      "answer": 1,
      "sourceModules": ["neurodevelopmental-disorders", "diagnostic-yields"],
      "difficulty": "beginner",
      "category": "Clinical Vignette"
    },
    {
      "id": 17,
      "question": "A couple who are both carriers of an autosomal recessive condition wish to avoid prenatal diagnosis with possible pregnancy termination. Which reproductive option best addresses their preference?",
      "options": [
        "Adoption as the only alternative to prenatal diagnosis",
        "Preimplantation genetic testing (PGT-M) with IVF, selecting unaffected embryos before pregnancy",
        "Conceive naturally and perform newborn screening after delivery",
        "Donor gametes from a non-carrier, eliminating the need for genetic testing"
      ],
      "answer": 1,
      "sourceModules": ["genetic-counseling"],
      "difficulty": "intermediate",
      "category": "Ethics"
    },
    {
      "id": 18,
      "question": "An MRI shows bilateral symmetric T2 hyperintensity in the putamen, caudate, and periaqueductal gray with elevated blood lactate. This pattern is most consistent with which diagnosis?",
      "options": [
        "Wilson disease",
        "Leigh syndrome (subacute necrotizing encephalopathy)",
        "Huntington disease",
        "Acute disseminated encephalomyelitis (ADEM)"
      ],
      "answer": 1,
      "sourceModules": ["neuroimaging", "mitochondrial"],
      "difficulty": "intermediate",
      "category": "Clinical Vignette"
    },
    {
      "id": 19,
      "question": "What does the Genetic Information Nondiscrimination Act (GINA) protect against in the United States?",
      "options": [
        "Discrimination by all types of insurance companies based on genetic information",
        "Discrimination by health insurers and employers, but NOT life, disability, or long-term care insurers",
        "Discrimination only in employment, with no insurance protections",
        "Mandatory genetic testing by employers for occupational health screening"
      ],
      "answer": 1,
      "sourceModules": ["genetic-counseling"],
      "difficulty": "beginner",
      "category": "Ethics"
    },
    {
      "id": 20,
      "question": "A 15-year-old with progressive gait ataxia, scoliosis, absent ankle reflexes, and hypertrophic cardiomyopathy has a negative exome sequencing result. What is the most appropriate next test?",
      "options": [
        "Brain MRI with spectroscopy",
        "FXN GAA repeat expansion testing — the most common hereditary ataxias are caused by repeat expansions not detected by standard exome sequencing",
        "Lumbar puncture for CSF protein",
        "Muscle biopsy with electron microscopy"
      ],
      "answer": 1,
      "sourceModules": ["ataxia", "diagnostic-yields"],
      "difficulty": "intermediate",
      "category": "Clinical Vignette"
    },
    {
      "id": 21,
      "question": "A karyotype report reads 47,XXY. What is the associated clinical syndrome?",
      "options": [
        "Turner syndrome",
        "Klinefelter syndrome — tall stature, small testes, gynecomastia, and possible learning difficulties",
        "Down syndrome",
        "Edwards syndrome"
      ],
      "answer": 1,
      "sourceModules": ["chromosomes-iscn"],
      "difficulty": "beginner",
      "category": "Knowledge"
    },
    {
      "id": 22,
      "question": "A child with epilepsy and developmental regression is being considered for valproate therapy. Testing for variants in which gene should be performed first due to the risk of fatal hepatotoxicity?",
      "options": [
        "SCN1A",
        "POLG (mitochondrial DNA polymerase gamma)",
        "MECP2",
        "TSC2"
      ],
      "answer": 1,
      "sourceModules": ["mitochondrial", "pharmacogenetics"],
      "difficulty": "intermediate",
      "category": "Clinical Vignette"
    },
    {
      "id": 23,
      "question": "A child with autism spectrum disorder and intellectual disability has a negative chromosomal microarray. The geneticist recommends exome sequencing. Why is this complementary rather than redundant?",
      "options": [
        "Exome sequencing detects the same variants as microarray but with higher resolution",
        "Microarray detects copy number variants (deletions/duplications) while exome detects single nucleotide variants and small indels — they cover different variant classes",
        "Exome sequencing replaces the need for any prior microarray testing",
        "Microarray is only useful for detecting aneuploidies, not intragenic changes"
      ],
      "answer": 1,
      "sourceModules": ["diagnostic-yields", "cnv-interpretation"],
      "difficulty": "beginner",
      "category": "Knowledge"
    },
    {
      "id": 24,
      "question": "Two clinically unaffected parents have a second child with the same apparently de novo autosomal dominant condition. Standard blood sequencing shows neither parent carries the variant. What is the most likely explanation?",
      "options": [
        "Independent recurrent de novo mutation in both children by chance",
        "Germline mosaicism in one parent — the variant is present in gonadal cells but undetectable in blood",
        "Non-paternity explaining the discrepancy in inheritance",
        "Epigenetic modification causing the same phenotype without a DNA sequence change"
      ],
      "answer": 1,
      "sourceModules": ["mosaicism", "genetic-counseling"],
      "difficulty": "intermediate",
      "category": "Clinical Vignette"
    },
    {
      "id": 25,
      "question": "A 15-year-old boy with known 22q11.2 deletion syndrome presents with 4 months of social withdrawal, declining school performance, and paranoid ideation. His parents attribute these changes to adolescent behavior. What is the most appropriate response?",
      "options": [
        "Reassurance that behavioral changes are normal during adolescence",
        "Referral for neuropsychological testing to update his cognitive baseline",
        "Urgent psychiatric evaluation — 22q11.2 deletion carries a 25-30% lifetime risk of schizophrenia-spectrum disorders",
        "Brain MRI to evaluate for a structural lesion"
      ],
      "answer": 2,
      "sourceModules": ["dual-diagnosis", "cnv-interpretation"],
      "difficulty": "intermediate",
      "category": "Clinical Vignette"
    }
  ]
}
```

- [ ] **Step 2: Verify JSON is valid**

Run: `node -e "const d = require('./data/baseline-assessment.json'); console.log(d.questions.length + ' questions loaded')"`
Expected: `25 questions loaded`

- [ ] **Step 3: Commit**

```bash
git add data/baseline-assessment.json
git commit -m "Add 25-question baseline assessment data"
```

---

### Task 2: Create the assessments hub page

**Files:**
- Create: `app/assessments/page.tsx`

- [ ] **Step 1: Create the assessments hub page**

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  ClipboardList,
  FileQuestion,
} from "lucide-react";

interface AttemptInfo {
  score: number;
  totalQuestions: number;
  completedAt: string;
}

export default function AssessmentsPage() {
  const [baseline, setBaseline] = useState<AttemptInfo | null>(null);
  const [comprehensive, setComprehensive] = useState<AttemptInfo | null>(null);

  useEffect(() => {
    fetch("/api/quiz-attempts?moduleId=baseline-assessment")
      .then((r) => r.json())
      .then((d) => {
        if (d.attempts?.length > 0) setBaseline(d.attempts[0]);
      })
      .catch(() => {});

    fetch("/api/quiz-attempts?moduleId=comprehensive-exam")
      .then((r) => r.json())
      .then((d) => {
        if (d.attempts?.length > 0) setComprehensive(d.attempts[0]);
      })
      .catch(() => {});
  }, []);

  return (
    <main className="container mx-auto max-w-2xl px-4 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All Modules
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          Test Your Knowledge
        </h1>
        <p className="text-sm text-muted-foreground">
          Measure where you start and how far you&apos;ve come.
        </p>
      </div>

      <div className="space-y-4">
        {/* Baseline */}
        <Link
          href="/assessments/baseline"
          className="group flex items-center gap-4 rounded-xl border bg-card p-5 hover:border-primary/30 transition-colors"
        >
          <div className="h-10 w-10 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center shrink-0">
            <FileQuestion className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">
              Pre-Curriculum Baseline Assessment
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              25 questions &mdash; gauge your starting knowledge (no feedback
              provided)
            </p>
            {baseline && (
              <p className="text-[11px] text-muted-foreground/70 mt-1">
                Last attempt: {baseline.score}/{baseline.totalQuestions} (
                {Math.round(
                  (baseline.score / baseline.totalQuestions) * 100
                )}
                %) &mdash;{" "}
                {new Date(baseline.completedAt).toLocaleDateString()}
              </p>
            )}
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
        </Link>

        {/* Comprehensive */}
        <Link
          href="/assessments/comprehensive"
          className="group flex items-center gap-4 rounded-xl border bg-card p-5 hover:border-primary/30 transition-colors"
        >
          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">
              Post-Curriculum Comprehensive Assessment
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              50 board-style questions &mdash; 76% to pass
            </p>
            {comprehensive && (
              <p className="text-[11px] text-muted-foreground/70 mt-1">
                Last attempt: {comprehensive.score}/
                {comprehensive.totalQuestions} (
                {Math.round(
                  (comprehensive.score / comprehensive.totalQuestions) *
                    100
                )}
                %) &mdash;{" "}
                {new Date(comprehensive.completedAt).toLocaleDateString()}
              </p>
            )}
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
        </Link>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/assessments/page.tsx
git commit -m "Add assessments hub page with baseline and comprehensive cards"
```

---

### Task 3: Create the baseline assessment page (no-feedback exam)

**Files:**
- Create: `app/assessments/baseline/page.tsx`

- [ ] **Step 1: Create the baseline assessment page**

This is modeled on `app/exam/page.tsx` but strips all per-question feedback. No green/red, no explanation, no category badges during the quiz. Results screen shows total score only — no per-question breakdown.

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ArrowLeft,
  FileQuestion,
  RotateCcw,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import baselineData from "@/data/baseline-assessment.json";

interface BaselineQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
  sourceModules: string[];
  difficulty: string;
  category: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function BaselinePage() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<BaselineQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const allQuestions = baselineData.questions as BaselineQuestion[];

  const startAssessment = () => {
    setQuestions(shuffleArray(allQuestions));
    setQuestionIndex(0);
    setSelected(null);
    setAnswers([]);
    setSelectedAnswers([]);
    setFinished(false);
    setScore(0);
    setStarted(true);
  };

  const handleSelect = (index: number) => {
    setSelected(index);
  };

  const handleNext = () => {
    if (selected === null) return;
    const correct = selected === questions[questionIndex].answer;
    const newAnswers = [...answers, correct];
    const newScore = newAnswers.filter(Boolean).length;
    const newSelectedAnswers = [...selectedAnswers, selected];

    if (questionIndex === questions.length - 1) {
      setScore(newScore);
      setAnswers(newAnswers);
      setSelectedAnswers(newSelectedAnswers);
      setFinished(true);

      const records = questions.map((q, i) => ({
        questionIndex: i,
        questionText: q.question,
        selectedAnswer: newSelectedAnswers[i],
        correctAnswer: q.answer,
        correct: newAnswers[i],
      }));
      fetch("/api/quiz-attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleId: "baseline-assessment",
          score: newScore,
          totalQuestions: questions.length,
          answers: records,
        }),
      }).catch(() => {});
    } else {
      setAnswers(newAnswers);
      setSelectedAnswers(newSelectedAnswers);
      setQuestionIndex(questionIndex + 1);
      setSelected(null);
    }
  };

  // ── Start screen ──────────────────────────────────────────────────────────────
  if (!started) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-lg text-center animate-fade-in">
          <div className="mb-6 flex justify-center">
            <div className="h-16 w-16 rounded-2xl bg-violet-500/10 text-violet-500 flex items-center justify-center">
              <FileQuestion className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Baseline Assessment</h1>
          <p className="text-muted-foreground mb-2 text-sm">
            {allQuestions.length} questions to gauge your starting knowledge
          </p>
          <p className="text-muted-foreground mb-6 text-xs">
            No feedback is provided during this assessment. You will see your
            total score at the end.
          </p>

          <div className="flex gap-3 justify-center">
            <Button variant="outline" size="sm" asChild>
              <Link href="/assessments">
                <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                Back
              </Link>
            </Button>
            <Button size="sm" onClick={startAssessment}>
              Begin Assessment
              <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Results screen ────────────────────────────────────────────────────────────
  if (finished) {
    const pct = Math.round((score / questions.length) * 100);

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-2xl px-4 py-10">
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="mb-4 flex justify-center">
              <div className="h-16 w-16 rounded-2xl bg-violet-500/10 text-violet-500 flex items-center justify-center">
                <BarChart3 className="h-8 w-8" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Baseline Complete</h2>
            <p className="text-muted-foreground text-sm mb-4">
              You scored{" "}
              <span className="font-semibold text-foreground">
                {score} out of {questions.length}
              </span>{" "}
              ({pct}%)
            </p>
            <p className="text-muted-foreground text-xs max-w-md mx-auto">
              This is your starting point. Work through the curriculum modules,
              then take the comprehensive assessment to measure your growth.
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="outline" size="sm" onClick={startAssessment}>
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
              Retake
            </Button>
            <Button size="sm" asChild>
              <Link href="/">
                Start Learning
                <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Active quiz (no feedback) ───────────────────────────────────────────��─────
  const question = questions[questionIndex];
  const isLast = questionIndex === questions.length - 1;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-2xl px-4 py-10">
        <Link
          href="/assessments"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Baseline Assessment
        </Link>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
            <div
              className="h-full bg-violet-500 rounded-full transition-all duration-300"
              style={{
                width: `${(questionIndex / questions.length) * 100}%`,
              }}
            />
          </div>
          <span className="text-xs text-muted-foreground tabular-nums shrink-0">
            {questionIndex + 1} / {questions.length}
          </span>
        </div>

        <div className="animate-fade-in" key={questionIndex}>
          <div className="mb-1">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Question {questionIndex + 1}
            </span>
          </div>
          <h2 className="text-lg font-semibold mb-6 leading-snug">
            {question.question}
          </h2>

          <div className="space-y-3 mb-6">
            {question.options.map((option, i) => {
              const isSelected = selected === i;

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={cn(
                    "w-full text-left rounded-xl border p-4 text-sm transition-all duration-150 cursor-pointer",
                    isSelected
                      ? "border-violet-500 bg-violet-500/5"
                      : "border-border hover:border-violet-500/40 hover:bg-accent/50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-colors",
                        isSelected
                          ? "border-violet-500 text-violet-500"
                          : "border-border text-muted-foreground"
                      )}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="leading-relaxed">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleNext}
              disabled={selected === null}
              size="sm"
            >
              {isLast ? "View Results" : "Next"}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/assessments/baseline/page.tsx
git commit -m "Add baseline assessment page with no per-question feedback"
```

---

### Task 4: Move comprehensive exam to new route

**Files:**
- Create: `app/assessments/comprehensive/page.tsx` (moved from `app/exam/page.tsx`)
- Modify: `app/exam/page.tsx` (replace with redirect)

- [ ] **Step 1: Copy the existing exam page to the new route**

Copy the full contents of `app/exam/page.tsx` to `app/assessments/comprehensive/page.tsx`. Then make two small edits in the new file:

1. Change the "Back" link target from `"/"` to `"/assessments"` (appears 3 times: start screen back button, active quiz back link, results "All Modules" button).
2. Change the active quiz back link text from `"Comprehensive Exam"` to `"Assessments"`.

The start screen Back button (line ~149 equivalent):
```tsx
<Link href="/assessments">
```

The active quiz back link (line ~272 equivalent):
```tsx
<Link
  href="/assessments"
  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-8 transition-colors"
>
  <ArrowLeft className="h-3.5 w-3.5" />
  Assessments
</Link>
```

The results "All Modules" button stays linking to `"/"` — that makes sense as a post-exam action.

- [ ] **Step 2: Replace the old exam page with a redirect**

Replace `app/exam/page.tsx` with:

```tsx
import { redirect } from "next/navigation";

export default function ExamRedirect() {
  redirect("/assessments/comprehensive");
}
```

- [ ] **Step 3: Commit**

```bash
git add app/assessments/comprehensive/page.tsx app/exam/page.tsx
git commit -m "Move comprehensive exam to /assessments/comprehensive with redirect from /exam"
```

---

### Task 5: Update front page card

**Files:**
- Modify: `app/page.tsx:202-219` (the exam CTA section)

- [ ] **Step 1: Update the front page card**

Replace the existing exam CTA section (lines 202-219) with:

```tsx
      {/* Assessments CTA */}
      <section className="mb-10">
        <Link
          href="/assessments"
          className="group flex items-center gap-4 rounded-xl border bg-card p-5 hover:border-primary/30 transition-colors"
        >
          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">Test Your Knowledge</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Pre-curriculum baseline and post-curriculum comprehensive assessments
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
        </Link>
      </section>
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "Update front page card to link to assessments hub"
```

---

### Task 6: Update admin API to include baseline data

**Files:**
- Modify: `app/api/admin/residents/route.ts:64-100`

- [ ] **Step 1: Add baseline extraction alongside comprehensive exam**

In the `residents.map()` callback, after the line that extracts `examAttempts`, add extraction for baseline attempts. Then add a `baseline` field to the return object with the same shape as `exam`.

After this line:
```ts
const examAttempts = attempts.filter((a) => a.module_id === "comprehensive-exam");
```

Add:
```ts
const baselineAttempts = attempts.filter((a) => a.module_id === "baseline-assessment");
```

Also update `moduleAttempts` to exclude baseline too:
```ts
const moduleAttempts = attempts.filter((a) => a.module_id !== "comprehensive-exam" && a.module_id !== "baseline-assessment");
```

After the `bestExam`/`latestExam` block, add:
```ts
    const bestBaseline = baselineAttempts.length > 0
      ? baselineAttempts.reduce((best, cur) =>
          (cur.score as number) > (best.score as number) ? cur : best
        )
      : null;
    const latestBaseline = baselineAttempts.length > 0 ? baselineAttempts[0] : null;
```

In the return object, after the `exam` field, add:
```ts
      baseline: latestBaseline
        ? {
            attempts: baselineAttempts.length,
            latestScore: latestBaseline.score as number,
            latestTotal: latestBaseline.total_questions as number,
            latestDate: latestBaseline.completed_at as string,
            bestScore: bestBaseline!.score as number,
            bestTotal: bestBaseline!.total_questions as number,
          }
        : null,
```

- [ ] **Step 2: Commit**

```bash
git add app/api/admin/residents/route.ts
git commit -m "Include baseline assessment data in admin API response"
```

---

### Task 7: Update dashboard to show baseline alongside comprehensive

**Files:**
- Modify: `app/dashboard/page.tsx`

- [ ] **Step 1: Add baseline to the ResidentData type**

In the `ResidentData` interface, after the `exam` field, add:

```ts
  baseline: {
    attempts: number;
    latestScore: number;
    latestTotal: number;
    latestDate: string;
    bestScore: number;
    bestTotal: number;
  } | null;
```

- [ ] **Step 2: Add baseline to the summary row**

In the summary row (the `<p>` tag that shows modules completed, avg quiz, and final score), add baseline info. After the existing `r.exam &&` line, add:

```tsx
{r.baseline && ` · Baseline: ${r.baseline.bestScore}/${r.baseline.bestTotal}`}
```

- [ ] **Step 3: Add baseline row to the expanded assessments card**

In the expanded detail section, the current "Final Exam" card becomes an "Assessments" section with two rows. Replace the single card with a wrapper that contains both baseline and comprehensive:

Replace the `{/* Final Exam */}` card (the entire `<div>` from the comment to its closing `</div>`) with:

```tsx
                    {/* Assessments */}
                    <div className="rounded-lg border px-4 py-3 space-y-2">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Assessments
                      </span>

                      {/* Baseline */}
                      <div className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-2">
                          <FileQuestion className="h-3.5 w-3.5 text-violet-500" />
                          <span className="text-xs">Baseline</span>
                        </div>
                        {r.baseline ? (
                          <div className="flex items-center gap-3 text-xs">
                            <span className="tabular-nums text-muted-foreground">
                              {r.baseline.bestScore}/{r.baseline.bestTotal} (
                              {Math.round(
                                (r.baseline.bestScore / r.baseline.bestTotal) *
                                  100
                              )}
                              %)
                            </span>
                            {r.baseline.attempts > 1 && (
                              <span className="text-muted-foreground">
                                {r.baseline.attempts} attempts
                              </span>
                            )}
                            <span className="text-muted-foreground/60">
                              {new Date(
                                r.baseline.latestDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-muted-foreground/50">
                            Not attempted
                          </span>
                        )}
                      </div>

                      {/* Comprehensive */}
                      <div className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-2">
                          <FileCheck
                            className={cn(
                              "h-3.5 w-3.5",
                              r.exam
                                ? r.exam.bestScore >= EXAM_PASSING_SCORE
                                  ? "text-green-500"
                                  : "text-amber-500"
                                : "text-muted-foreground/40"
                            )}
                          />
                          <span className="text-xs">Comprehensive</span>
                        </div>
                        {r.exam ? (
                          <div className="flex items-center gap-3 text-xs">
                            <span
                              className={cn(
                                "font-semibold tabular-nums",
                                r.exam.bestScore >= EXAM_PASSING_SCORE
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-amber-600 dark:text-amber-400"
                              )}
                            >
                              {r.exam.bestScore >= EXAM_PASSING_SCORE
                                ? "PASSED"
                                : "NOT YET PASSED"}
                            </span>
                            <span className="tabular-nums text-muted-foreground">
                              {r.exam.bestScore}/{r.exam.bestTotal} (
                              {Math.round(
                                (r.exam.bestScore / r.exam.bestTotal) * 100
                              )}
                              %)
                            </span>
                            {r.exam.attempts > 1 && (
                              <span className="text-muted-foreground">
                                {r.exam.attempts} attempts
                              </span>
                            )}
                            <span className="text-muted-foreground/60">
                              {new Date(
                                r.exam.latestDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-muted-foreground/50">
                            Not attempted
                          </span>
                        )}
                      </div>
                    </div>
```

- [ ] **Step 4: Add the FileQuestion import**

In the lucide-react import at the top of the dashboard file, add `FileQuestion` to the existing import list (it already has `FileCheck`).

- [ ] **Step 5: Commit**

```bash
git add app/dashboard/page.tsx
git commit -m "Add baseline assessment row to admin dashboard"
```

---

### Task 8: Build and verify

- [ ] **Step 1: Run the build**

Run: `npx next build`
Expected: Clean build with no errors. New routes visible in output:
- `○ /assessments`
- `○ /assessments/baseline`
- `○ /assessments/comprehensive`
- `ƒ /exam` (redirect)

- [ ] **Step 2: Spot-check routes**

Run: `npx next dev &` then verify these URLs load:
- `http://localhost:3000/assessments` — hub with two cards
- `http://localhost:3000/assessments/baseline` — start screen, begin assessment, answer a question with no feedback
- `http://localhost:3000/assessments/comprehensive` — existing exam behavior
- `http://localhost:3000/exam` — redirects to `/assessments/comprehensive`
- `http://localhost:3000/` — "Test Your Knowledge" card links to `/assessments`

- [ ] **Step 3: Final commit if any fixes needed**

```bash
git add -A
git commit -m "Fix any build/route issues from assessment migration"
```
