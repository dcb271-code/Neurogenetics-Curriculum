/**
 * Module Registry
 *
 * To add a new module:
 * 1. Create a JSON file in this directory following the Module schema in lib/types.ts
 * 2. Import it below
 * 3. Add it to the `modules` array in curriculum order
 *
 * No other code changes are required.
 */

import { Module } from "@/lib/types";

// ── Core curriculum track ──────────────────────────────────────────────────────
import introNeurogenetics from "./intro-neurogenetics.json";
import centralDogma from "./central-dogma.json";
import chromosomesIscn from "./chromosomes-iscn.json";
import cnvInterpretation from "./cnv-interpretation.json";
import variantInterpretation from "./variant-interpretation.json";

// ── Clinical neurogenetics modules ────────────────────────────────────────────
import ataxia from "./ataxia.json";
import epilepsy from "./epilepsy.json";
import mitochondrial from "./mitochondrial.json";
import mosaicism from "./mosaicism.json";
import methylation from "./methylation.json";
import dystonia from "./dystonia.json";
import iem from "./iem.json";
import neuromuscular from "./neuromuscular.json";
import stroke from "./stroke.json";
import cerebralPalsy from "./cerebral-palsy.json";
import dualDiagnosis from "./dual-diagnosis.json";

// ── Pharmacology & therapeutics ────────────────────────────────────────────────
import pharmacogenetics from "./pharmacogenetics.json";
import therapies from "./therapies.json";

// ── Supplementary modules ─────────────────────────────────────────────────────
import introGenetics from "./intro-genetics.json";
import neuronalSignaling from "./neuronal-signaling.json";
import epigeneticsNeurology from "./epigenetics-neurology.json";

// ── Clinical decision-making ──────────────────────────────────────────────────
import diagnosticYields from "./diagnostic-yields.json";

export const modules: Module[] = [
  // ── Foundation ───────────────────────────────────────────────────────────────
  introNeurogenetics as unknown as Module,
  introGenetics as unknown as Module,
  centralDogma as unknown as Module,
  chromosomesIscn as unknown as Module,
  mosaicism as unknown as Module,
  methylation as unknown as Module,

  // ── Variant interpretation ────────────────────────────────────────────────────
  cnvInterpretation as unknown as Module,
  variantInterpretation as unknown as Module,

  // ── Clinical syndromes ────────────────────────────────────────────────────────
  ataxia as unknown as Module,
  epilepsy as unknown as Module,
  mitochondrial as unknown as Module,
  dystonia as unknown as Module,
  neuromuscular as unknown as Module,
  stroke as unknown as Module,
  cerebralPalsy as unknown as Module,
  dualDiagnosis as unknown as Module,

  // ── Mechanisms & therapeutics ─────────────────────────────────────────────────
  iem as unknown as Module,
  pharmacogenetics as unknown as Module,
  therapies as unknown as Module,
  epigeneticsNeurology as unknown as Module,
  neuronalSignaling as unknown as Module,

  // ── Clinical decision-making ──────────────────────────────────────────────────
  diagnosticYields as unknown as Module,
];
