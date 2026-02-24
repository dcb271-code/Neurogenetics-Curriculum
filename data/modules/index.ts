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

// ── Curriculum track ──────────────────────────────────────────────────────────
import introNeurogenetics from "./intro-neurogenetics.json";
import centralDogma from "./central-dogma.json";
import chromosomesIscn from "./chromosomes-iscn.json";
import cnvInterpretation from "./cnv-interpretation.json";
import variantInterpretation from "./variant-interpretation.json";

// ── Clinical neurogenetics modules ────────────────────────────────────────────
import ataxia from "./ataxia.json";
import epilepsy from "./epilepsy.json";
import mitochondrial from "./mitochondrial.json";

// ── Supplementary modules ─────────────────────────────────────────────────────
import introGenetics from "./intro-genetics.json";
import neuronalSignaling from "./neuronal-signaling.json";
import epigeneticsNeurology from "./epigenetics-neurology.json";

export const modules: Module[] = [
  // Core curriculum (progression order)
  introNeurogenetics as unknown as Module,
  centralDogma as unknown as Module,
  chromosomesIscn as unknown as Module,
  cnvInterpretation as unknown as Module,
  variantInterpretation as unknown as Module,

  // Clinical neurogenetics
  ataxia as unknown as Module,
  epilepsy as unknown as Module,
  mitochondrial as unknown as Module,

  // Supplementary
  introGenetics as unknown as Module,
  neuronalSignaling as unknown as Module,
  epigeneticsNeurology as unknown as Module,
];
