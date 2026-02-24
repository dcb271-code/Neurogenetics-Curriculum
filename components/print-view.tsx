"use client";

import { useEffect } from "react";
import { Printer } from "lucide-react";
import { Module } from "@/lib/types";

export function PrintView({ module: mod }: { module: Module }) {
  // Auto-trigger print dialog when the page loads
  useEffect(() => {
    // Small delay so styles fully paint before the dialog opens
    const t = setTimeout(() => window.print(), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="print-page min-h-screen bg-white text-black">
      {/* Print button — hidden during actual print via CSS */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
        >
          <Printer className="h-4 w-4" />
          Print / Save PDF
        </button>
        <button
          onClick={() => window.close()}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
        >
          Close
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-10 py-14">
        {/* Header */}
        <header className="mb-10 pb-6 border-b-2 border-gray-200">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
              NeuroGenetics Curriculum
            </span>
            <span className="text-gray-300">·</span>
            <span className="text-[10px] text-gray-400 capitalize">
              {mod.difficulty}
            </span>
            <span className="text-gray-300">·</span>
            <span className="text-[10px] text-gray-400">{mod.duration}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{mod.title}</h1>
          <p className="text-sm text-gray-600 leading-relaxed">{mod.description}</p>
          <p className="mt-2 text-[10px] text-gray-400">
            Tags: {mod.tags.join(" · ")}
          </p>
        </header>

        {/* Learning Objectives */}
        <section className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
            Learning Objectives
          </h2>
          <ol className="space-y-2">
            {mod.learningObjectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="shrink-0 font-bold text-gray-400 tabular-nums w-4">
                  {i + 1}.
                </span>
                <span className="leading-relaxed">{obj}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Sections */}
        {mod.sections.map((section, i) => (
          <section key={i} className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-sm font-mono text-gray-400 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              {section.title}
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              {section.content}
            </p>
            {section.keyPoints.length > 0 && (
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
                  Key Points
                </p>
                <ul className="space-y-2">
                  {section.keyPoints.map((kp, ki) => (
                    <li key={ki} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
                      <span className="leading-relaxed">{kp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}

        {/* Quiz */}
        <section className="mt-12 pt-8 border-t-2 border-gray-200">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">
            Quiz Questions
          </h2>
          <div className="space-y-8">
            {mod.quiz.map((q, i) => (
              <div key={i}>
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  {i + 1}. {q.question}
                </p>
                <ol className="space-y-1.5 ml-4">
                  {q.options.map((opt, oi) => (
                    <li
                      key={oi}
                      className={`text-sm flex items-start gap-2 ${
                        oi === q.answer ? "font-semibold text-gray-900" : "text-gray-600"
                      }`}
                    >
                      <span className="font-mono shrink-0">
                        {String.fromCharCode(65 + oi)}.
                      </span>
                      <span>{opt}</span>
                      {oi === q.answer && (
                        <span className="text-[10px] font-bold text-green-600 shrink-0 mt-0.5">
                          ✓
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
                <p className="mt-2 ml-4 text-xs text-gray-500 italic leading-relaxed">
                  {q.explanation}
                </p>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-14 pt-6 border-t border-gray-200 text-center">
          <p className="text-[10px] text-gray-400">
            NeuroGenetics Curriculum · neurogenetics-curriculum.vercel.app
          </p>
        </footer>
      </div>
    </div>
  );
}
