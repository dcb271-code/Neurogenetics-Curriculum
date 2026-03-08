/**
 * Module Registry
 *
 * To add a new module:
 * 1. Create a JSON file in this directory following the Module schema in lib/types.ts
 * 2. Import it below
 * 3. Add it to the `modules` array in curriculum order
 *
 * No other code changes are required.
 *
 * Curriculum is structured as 10 one-hour blocks (23 modules, ~630 min total).
 */

import { Module } from "@/lib/types";

// ── Block 1: Foundations of Genetics ─────────────────────────────────────────
import introNeurogenetics from "./intro-neurogenetics.json";
import centralDogma from "./central-dogma.json";
import chromosomesIscn from "./chromosomes-iscn.json";

// ── Block 2: Epigenetics & Mosaicism ─────────────────────────────────────────
import epigenetics from "./epigenetics.json";
import mosaicism from "./mosaicism.json";

// ── Block 3: Variant Interpretation ──────────────────────────────────────────
import variantInterpretation from "./variant-interpretation.json";
import cnvInterpretation from "./cnv-interpretation.json";

// ── Block 4: Test Selection & Counseling ─────────────────────────────────────
import diagnosticYields from "./diagnostic-yields.json";
import geneticCounseling from "./genetic-counseling.json";
import neuroimaging from "./neuroimaging.json";

// ── Block 5: Epilepsy & Pharmacogenomics ─────────────────────────────────────
import epilepsy from "./epilepsy.json";
import pharmacogenetics from "./pharmacogenetics.json";

// ── Block 6: Neurodevelopmental Disorders ────────────────────────────────────
import neurodevelopmentalDisorders from "./neurodevelopmental-disorders.json";
import cerebralPalsy from "./cerebral-palsy.json";

// ── Block 7: Movement Disorders & IEM ────────────────────────────────────────
import dystonia from "./dystonia.json";
import iem from "./iem.json";

// ── Block 8: Neuromuscular & Ataxia ──────────────────────────────────────────
import neuromuscular from "./neuromuscular.json";
import ataxia from "./ataxia.json";

// ── Block 9: Stroke, Mitochondrial & Dual Diagnosis ─────────────────────────
import mitochondrial from "./mitochondrial.json";
import stroke from "./stroke.json";
import dualDiagnosis from "./dual-diagnosis.json";

// ── Block 10: Therapies & Integration ────────────────────────────────────────
import therapies from "./therapies.json";
import virtualCases from "./virtual-cases.json";

export const modules: Module[] = [
  // ── Block 1: Foundations of Genetics ─────────────────────────────────────────
  introNeurogenetics as unknown as Module,
  centralDogma as unknown as Module,
  chromosomesIscn as unknown as Module,

  // ── Block 2: Epigenetics & Mosaicism ────────────────────────────────────────
  epigenetics as unknown as Module,
  mosaicism as unknown as Module,

  // ── Block 3: Variant Interpretation ─────────────────────────────────────────
  variantInterpretation as unknown as Module,
  cnvInterpretation as unknown as Module,

  // ── Block 4: Test Selection & Counseling ────────────────────────────────────
  diagnosticYields as unknown as Module,
  geneticCounseling as unknown as Module,
  neuroimaging as unknown as Module,

  // ── Block 5: Epilepsy & Pharmacogenomics ────────────────────────────────────
  epilepsy as unknown as Module,
  pharmacogenetics as unknown as Module,

  // ── Block 6: Neurodevelopmental Disorders ───────────────────────────────────
  neurodevelopmentalDisorders as unknown as Module,
  cerebralPalsy as unknown as Module,

  // ── Block 7: Movement Disorders & IEM ───────────────────────────────────────
  dystonia as unknown as Module,
  iem as unknown as Module,

  // ── Block 8: Neuromuscular & Ataxia ─────────────────────────────────────────
  neuromuscular as unknown as Module,
  ataxia as unknown as Module,

  // ── Block 9: Stroke, Mitochondrial & Dual Diagnosis ────────────────────────
  mitochondrial as unknown as Module,
  stroke as unknown as Module,
  dualDiagnosis as unknown as Module,

  // ── Block 10: Therapies & Integration ───────────────────────────────────────
  therapies as unknown as Module,
  virtualCases as unknown as Module,
];
