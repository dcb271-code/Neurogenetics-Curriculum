"use client";

import { useState, useEffect, useCallback } from "react";
import { ImageOff, Info, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface Manifest {
  count: number;
  moduleId: string;
  format?: string;
  generatedAt?: string;
}

interface Props {
  moduleId: string;
}

export function SlideGallery({ moduleId }: Props) {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/slides/${moduleId}/manifest.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        setManifest(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [moduleId]);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  const goNext = useCallback(() => {
    if (manifest && lightboxIdx !== null) {
      setLightboxIdx((lightboxIdx + 1) % manifest.count);
    }
  }, [manifest, lightboxIdx]);

  const goPrev = useCallback(() => {
    if (manifest && lightboxIdx !== null) {
      setLightboxIdx((lightboxIdx - 1 + manifest.count) % manifest.count);
    }
  }, [manifest, lightboxIdx]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx, closeLightbox, goNext, goPrev]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    if (lightboxIdx !== null) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [lightboxIdx]);

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
          No slides available yet
        </p>
      </div>
    );
  }

  // ── Gallery ─────────────────────────────────────────────────────────────────
  const ext = manifest.format || "jpg";
  const slides = Array.from({ length: manifest.count }, (_, i) => {
    const num = String(i + 1).padStart(3, "0");
    return `/slides/${moduleId}/slide-${num}.${ext}`;
  });

  return (
    <>
      <div className="space-y-4">
        {/* Meta strip */}
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Info className="h-3 w-3 shrink-0" />
          <span>
            {manifest.count} slide{manifest.count !== 1 ? "s" : ""}
            {manifest.generatedAt &&
              ` · generated ${new Date(manifest.generatedAt).toLocaleDateString()}`}
          </span>
          <span className="ml-auto text-muted-foreground/50">
            Tap any slide to expand
          </span>
        </div>

        {/* Image list */}
        {slides.map((src, i) => (
          <button
            key={src}
            onClick={() => setLightboxIdx(i)}
            className="relative w-full overflow-hidden rounded-xl bg-white shadow-sm border border-border/50 group cursor-pointer text-left block"
          >
            {/* Slide number badge */}
            <span className="absolute top-2 left-2 z-10 rounded-md bg-black/40 px-1.5 py-0.5 text-[10px] font-mono text-white/80 leading-none">
              {i + 1}
            </span>

            {/* Expand hint */}
            <span className="absolute top-2 right-2 z-10 rounded-md bg-black/40 p-1 opacity-0 group-hover:opacity-100 transition-opacity sm:block hidden">
              <Maximize2 className="h-3.5 w-3.5 text-white/80" />
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
          </button>
        ))}
      </div>

      {/* ── Lightbox overlay ────────────────────────────────────────────────── */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 rounded-full bg-white/10 hover:bg-white/20 p-2 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-white" />
          </button>

          {/* Slide counter */}
          <div className="absolute top-4 left-4 z-50 text-white/60 text-sm font-mono">
            {lightboxIdx + 1} / {manifest.count}
          </div>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-2 sm:left-4 z-50 rounded-full bg-white/10 hover:bg-white/20 p-2 sm:p-3 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-2 sm:right-4 z-50 rounded-full bg-white/10 hover:bg-white/20 p-2 sm:p-3 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </button>

          {/* Slide image - full size, pinch-zoomable on mobile */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slides[lightboxIdx]}
            alt={`Slide ${lightboxIdx + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[95vw] object-contain select-none touch-pinch-zoom"
            style={{ touchAction: "pinch-zoom" }}
            draggable={false}
          />
        </div>
      )}
    </>
  );
}
