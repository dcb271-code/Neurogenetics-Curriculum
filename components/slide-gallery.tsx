"use client";

import { useState, useEffect } from "react";
import { ImageOff, Info } from "lucide-react";

interface Manifest {
  count: number;
  moduleId: string;
  generatedAt?: string;
}

interface Props {
  moduleId: string;
}

export function SlideGallery({ moduleId }: Props) {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/slides/${moduleId}/manifest.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        setManifest(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [moduleId]);

  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="space-y-4 py-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-full rounded-xl bg-muted animate-pulse"
            style={{ aspectRatio: "16/9" }}
          />
        ))}
      </div>
    );
  }

  // ── Empty state ─────────────────────────────────────────────────────────────
  if (!manifest || manifest.count === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-dashed">
        <ImageOff className="h-10 w-10 text-muted-foreground/20 mb-4" />
        <p className="text-sm font-medium text-muted-foreground mb-1">
          No slides extracted yet
        </p>
        <p className="text-xs text-muted-foreground/60 max-w-xs leading-relaxed">
          Run the extractor to generate slide images for this module:
        </p>
        <code className="mt-3 block rounded-md bg-muted px-4 py-2 text-[11px] font-mono text-muted-foreground max-w-sm break-all">
          {`npx tsx scripts/extract-slides.ts "pdfs/slides/<file>.pdf" ${moduleId}`}
        </code>
      </div>
    );
  }

  // ── Gallery ─────────────────────────────────────────────────────────────────
  const slides = Array.from({ length: manifest.count }, (_, i) => {
    const num = String(i + 1).padStart(3, "0");
    return `/slides/${moduleId}/slide-${num}.png`;
  });

  return (
    <div className="space-y-4">
      {/* Meta strip */}
      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <Info className="h-3 w-3 shrink-0" />
        <span>
          {manifest.count} slide{manifest.count !== 1 ? "s" : ""}
          {manifest.generatedAt &&
            ` · extracted ${new Date(manifest.generatedAt).toLocaleDateString()}`}
        </span>
      </div>

      {/* Image list */}
      {slides.map((src, i) => (
        <div
          key={src}
          className="relative overflow-hidden rounded-xl bg-white shadow-sm border border-border/50"
        >
          {/* Slide number badge */}
          <span className="absolute top-2 left-2 z-10 rounded-md bg-black/40 px-1.5 py-0.5 text-[10px] font-mono text-white/80 leading-none">
            {i + 1}
          </span>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`Slide ${i + 1}`}
            loading="lazy"
            decoding="async"
            className="w-full h-auto block"
            style={{ display: "block" }}
          />
        </div>
      ))}
    </div>
  );
}
