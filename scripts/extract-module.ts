#!/usr/bin/env node
/**
 * extract-module.ts
 *
 * Extracts text from a PDF lecture-slide deck (using pdf-parse v2) and outputs
 * a JSON skeleton matching the neurogenetics-curriculum Module schema.
 *
 * Usage:
 *   npx tsx scripts/extract-module.ts ./pdfs/ataxia.pdf --module-id=ataxia
 *   npx tsx scripts/extract-module.ts ./pdfs/ataxia.pdf --module-id=ataxia --out=data/modules/ataxia.json
 *
 * Options:
 *   --module-id=<id>   Required. The id field for the output module (kebab-case).
 *   --out=<path>       Optional. Write JSON to file instead of stdout.
 *   --difficulty=<d>   Optional. beginner | intermediate | advanced  (default: intermediate)
 *   --color=<c>        Optional. blue | violet | amber | green | rose (default: blue)
 *   --duration=<str>   Optional. e.g. "45 min"  (default: "45 min")
 *
 * Heuristics:
 *   Page 1           → cover slide → module title + description
 *   "Objectives" pp  → learningObjectives[]
 *   All other pages  → sections[] (first line = title, bullets = keyPoints, prose = content)
 *   References / acknowledgements pages → skipped automatically
 */

import fs from "fs";
import path from "path";
import { createRequire } from "module";

// pdf-parse v2 is CJS — use createRequire to get reliable access in ESM/tsx context
const require = createRequire(import.meta.url);
const { PDFParse } = require("pdf-parse") as {
  PDFParse: new (opts: { data: Uint8Array }) => {
    getText(): Promise<{
      pages: Array<{ num: number; text: string }>;
      getPageText(n: number): string;
    }>;
    destroy(): Promise<void>;
  };
};

// ── Types (mirrors lib/types.ts, no Next.js path dependencies) ───────────────

type Tag = "Basic Genetics" | "Neurogenetics" | "Advanced";
type Difficulty = "beginner" | "intermediate" | "advanced";
type Color = "blue" | "violet" | "amber" | "green" | "rose";

interface Section {
  title: string;
  content: string;
  keyPoints: string[];
}

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  tags: Tag[];
  difficulty: Difficulty;
  duration: string;
  color: Color;
  learningObjectives: string[];
  sections: Section[];
  quiz: QuizQuestion[];
}

// ── CLI argument parsing ──────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);

  const pdfPath = args.find((a) => !a.startsWith("--"));
  if (!pdfPath) {
    fatal(
      "Missing PDF path.\nUsage: npx tsx scripts/extract-module.ts <pdf> --module-id=<id>"
    );
  }

  const get = (flag: string) => {
    const found = args.find((a) => a.startsWith(`--${flag}=`));
    return found ? found.slice(`--${flag}=`.length) : undefined;
  };

  const moduleId = get("module-id");
  if (!moduleId) {
    fatal(
      "--module-id is required.\nUsage: npx tsx scripts/extract-module.ts <pdf> --module-id=<id>"
    );
  }

  const difficulty = (get("difficulty") ?? "intermediate") as Difficulty;
  if (!["beginner", "intermediate", "advanced"].includes(difficulty)) {
    fatal("--difficulty must be one of: beginner, intermediate, advanced");
  }

  const color = (get("color") ?? "blue") as Color;
  if (!["blue", "violet", "amber", "green", "rose"].includes(color)) {
    fatal("--color must be one of: blue, violet, amber, green, rose");
  }

  return {
    pdfPath: pdfPath!,
    moduleId: moduleId!,
    outPath: get("out"),
    difficulty,
    color,
    duration: get("duration") ?? "45 min",
  };
}

// ── Text cleaning helpers ─────────────────────────────────────────────────────

/** Split raw page text into trimmed, non-empty lines. */
function lines(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
}

/** True if a line looks like a bullet point. */
function isBullet(line: string): boolean {
  return /^[•\-–*▪▸►◦→]\s+/.test(line) || /^\d+[.)]\s+/.test(line);
}

/** Strip the leading bullet character from a line. */
function stripBullet(line: string): string {
  return line.replace(/^[•\-–*▪▸►◦→]\s+/, "").replace(/^\d+[.)]\s+/, "").trim();
}

/** True if the page looks like a learning-objectives slide. */
function isObjectivesPage(raw: string): boolean {
  const first = lines(raw)[0] ?? "";
  return /objectiv|learning goal|by the end|upon completion/i.test(first);
}

/** True if the page is a thin cover/agenda slide (≤5 non-empty lines). */
function isCoverPage(raw: string): boolean {
  return lines(raw).length <= 5;
}

/** True if the page is a references / thanks / Q&A slide to skip. */
function isSkippablePage(raw: string): boolean {
  const first = lines(raw)[0] ?? "";
  return /^(references?|bibliography|acknowledgements?|further reading|thank you|questions?\??|disclosures?)\s*$/i.test(
    first
  );
}

// ── Heuristic parsers ─────────────────────────────────────────────────────────

function parseCover(
  raw: string,
  moduleId: string
): { title: string; description: string } {
  const ls = lines(raw);
  const title =
    ls[0] ??
    moduleId
      .split("-")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");

  const description =
    ls.slice(1).join(" ").trim() || `TODO: add description for ${moduleId}.`;

  return { title, description };
}

function parseObjectives(raw: string): string[] {
  return lines(raw)
    .slice(1) // skip slide title
    .filter((l) => isBullet(l) || l.length > 10)
    .map((l) => (isBullet(l) ? stripBullet(l) : l))
    .filter((l) => l.length > 0);
}

function parseSection(raw: string, index: number): Section {
  const ls = lines(raw);

  if (ls.length === 0) {
    return {
      title: `Section ${index + 1}`,
      content: "TODO: add content.",
      keyPoints: [],
    };
  }

  const title = ls[0];
  const body = ls.slice(1);

  const keyPoints: string[] = [];
  const proseParts: string[] = [];

  for (const line of body) {
    if (isBullet(line)) {
      keyPoints.push(stripBullet(line));
    } else if (line.length > 20) {
      proseParts.push(line);
    }
    // Short non-bullet lines (page numbers, running headers) are discarded
  }

  const content =
    proseParts.join(" ").trim() ||
    (keyPoints.length > 0
      ? `${title} — see key points below.`
      : "TODO: add content.");

  return { title, content, keyPoints };
}

// ── Quiz stub generator ───────────────────────────────────────────────────────

function makeQuizStubs(count = 5): QuizQuestion[] {
  return Array.from({ length: count }, (_, i) => ({
    question: `TODO: Quiz question ${i + 1}`,
    options: [
      "TODO: option A",
      "TODO: option B",
      "TODO: option C",
      "TODO: option D",
    ],
    answer: 0,
    explanation: "TODO: explain the correct answer.",
  }));
}

// ── Utilities ─────────────────────────────────────────────────────────────────

function fatal(msg: string): never {
  process.stderr.write(`\nERROR: ${msg}\n\n`);
  process.exit(1);
}

function info(msg: string): void {
  process.stderr.write(`[extract-module] ${msg}\n`);
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const { pdfPath, moduleId, outPath, difficulty, color, duration } = parseArgs();

  const absPath = path.resolve(pdfPath);
  if (!fs.existsSync(absPath)) {
    fatal(`File not found: ${absPath}`);
  }

  info(`Reading ${absPath} …`);
  const buffer = fs.readFileSync(absPath);
  const uint8 = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);

  info("Parsing PDF (pdf-parse v2) …");
  const parser = new PDFParse({ data: uint8 });
  let textResult: Awaited<ReturnType<typeof parser.getText>>;
  try {
    textResult = await parser.getText();
  } finally {
    await parser.destroy().catch(() => undefined);
  }

  const pageTexts = textResult.pages.map((p) => p.text);
  const totalPages = pageTexts.length;
  info(`Found ${totalPages} page(s).`);

  if (totalPages === 0) {
    fatal(
      "No pages extracted — the PDF may be image-only (scanned). Cannot extract text."
    );
  }

  // ── Parse cover ────────────────────────────────────────────────────────────
  const { title, description } = parseCover(pageTexts[0], moduleId);
  info(`Title: "${title}"`);

  // ── Walk remaining pages ───────────────────────────────────────────────────
  let learningObjectives: string[] = [];
  const sections: Section[] = [];
  let objectivesFound = false;

  for (let i = 1; i < totalPages; i++) {
    const raw = pageTexts[i];

    if (isSkippablePage(raw)) {
      info(`  Page ${i + 1}: skipped (references/acknowledgements)`);
      continue;
    }

    if (!objectivesFound && isObjectivesPage(raw)) {
      learningObjectives = parseObjectives(raw);
      objectivesFound = true;
      info(
        `  Page ${i + 1}: objectives slide (${learningObjectives.length} objective(s))`
      );
      continue;
    }

    if (isCoverPage(raw) && i < 3) {
      info(`  Page ${i + 1}: secondary cover/agenda slide — skipped`);
      continue;
    }

    const section = parseSection(raw, sections.length);
    sections.push(section);
    info(
      `  Page ${i + 1}: section "${section.title}" (${section.keyPoints.length} key point(s))`
    );
  }

  if (sections.length === 0) {
    info(
      "WARNING: No sections extracted. The PDF may have unusual text layout."
    );
  }

  if (learningObjectives.length === 0) {
    info(
      "WARNING: No objectives slide detected — populating learningObjectives with TODOs."
    );
    learningObjectives = Array.from(
      { length: 3 },
      (_, i) => `TODO: learning objective ${i + 1}`
    );
  }

  // ── Assemble Module skeleton ───────────────────────────────────────────────
  const mod: Module = {
    id: moduleId,
    title,
    description,
    tags: ["Neurogenetics"], // TODO: adjust tags
    difficulty,
    duration,
    color,
    learningObjectives,
    sections,
    quiz: makeQuizStubs(),
  };

  // ── Output ─────────────────────────────────────────────────────────────────
  const json = JSON.stringify(mod, null, 2);

  if (outPath) {
    const absOut = path.resolve(outPath);
    fs.mkdirSync(path.dirname(absOut), { recursive: true });
    fs.writeFileSync(absOut, json + "\n", "utf-8");
    info(`Written to ${absOut}`);
    info(
      "Done. Review the JSON, fill in quiz TODOs, and add to data/modules/index.ts."
    );
  } else {
    process.stdout.write(json + "\n");
    info("Done. Pipe or re-run with --out=<path> to save.");
  }
}

main().catch((err: unknown) => {
  fatal(err instanceof Error ? err.message : String(err));
});
