"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  moduleId: string;
}

// ── Empty / loading states ─────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="flex flex-col h-full bg-neutral-950 animate-pulse">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-3/4 rounded-xl bg-neutral-800" style={{ aspectRatio: "16/9" }} />
      </div>
      <div className="h-16 bg-neutral-900" />
      <div className="h-20 bg-neutral-900/80 border-t border-neutral-800" />
    </div>
  );
}

function EmptyState({ moduleId }: { moduleId: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-neutral-950 text-center px-6 py-20">
      <ImageOff className="h-12 w-12 text-neutral-600 mb-5" />
      <p className="text-sm font-medium text-neutral-300 mb-2">
        No slides extracted yet
      </p>
      <p className="text-xs text-neutral-500 mb-4 max-w-sm leading-relaxed">
        Run the slide extractor to generate images for this module, then commit
        them to git so Vercel can serve them.
      </p>
      <code className="rounded-lg bg-neutral-900 border border-neutral-700 px-4 py-2 text-[11px] font-mono text-neutral-400 max-w-sm break-all">
        npm run extract-slides &quot;pdfs/slides/…pdf&quot; {moduleId}
      </code>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function SlidePresenter({ moduleId }: Props) {
  const [slides, setSlides] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(true); // fade toggle

  const thumbStripRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Fetch manifest ───────────────────────────────────────────────────────────
  useEffect(() => {
    fetch(`/slides/${moduleId}/manifest.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { count: number } | null) => {
        if (data && data.count > 0) {
          setSlides(
            Array.from({ length: data.count }, (_, i) =>
              `/slides/${moduleId}/slide-${String(i + 1).padStart(3, "0")}.png`
            )
          );
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [moduleId]);

  // ── Navigation with fade ────────────────────────────────────────────────────
  const goTo = useCallback(
    (idx: number) => {
      if (slides.length === 0) return;
      const target = Math.max(0, Math.min(idx, slides.length - 1));
      if (target === current) return;

      setVisible(false);
      setTimeout(() => {
        setCurrent(target);
        setVisible(true);
        // Scroll thumb into view
        const strip = thumbStripRef.current;
        if (strip) {
          const thumb = strip.children[target] as HTMLElement | undefined;
          thumb?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
        }
      }, 140);
    },
    [current, slides.length]
  );

  const next = useCallback(
    () => goTo(current < slides.length - 1 ? current + 1 : current),
    [current, goTo, slides.length]
  );
  const prev = useCallback(() => goTo(current > 0 ? current - 1 : 0), [current, goTo]);

  // ── Autoplay ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!autoplay || slides.length === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrent((c) => {
        const nextIdx = c < slides.length - 1 ? c + 1 : 0;
        const strip = thumbStripRef.current;
        if (strip) {
          const thumb = strip.children[nextIdx] as HTMLElement | undefined;
          thumb?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
        }
        return nextIdx;
      });
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoplay, slides.length]);

  // ── Keyboard ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === " ") {
        e.preventDefault();
        setAutoplay((a) => !a);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  // ── Render ───────────────────────────────────────────────────────────────────
  if (!loaded) return <Skeleton />;
  if (slides.length === 0) return <EmptyState moduleId={moduleId} />;

  return (
    <div className="flex flex-col h-full bg-neutral-950 select-none">
      {/* ── Main slide area ─────────────────────────────────────────────────── */}
      <div
        className="flex-1 flex items-center justify-center px-8 py-5 cursor-pointer overflow-hidden"
        onClick={next}
        title="Click to advance"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={slides[current]}
          src={slides[current]}
          alt={`Slide ${current + 1}`}
          draggable={false}
          className={cn(
            "max-w-full max-h-full rounded-xl object-contain shadow-2xl transition-opacity duration-150",
            visible ? "opacity-100" : "opacity-0"
          )}
          style={{ maxHeight: "calc(100vh - 14rem)" }}
        />
      </div>

      {/* ── Controls bar ────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-3 px-4 py-3 bg-neutral-900/90 backdrop-blur border-t border-neutral-800">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Previous (←)"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <span className="w-20 text-center text-sm tabular-nums font-medium text-neutral-300">
          {current + 1} / {slides.length}
        </span>

        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Next (→)"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="w-px h-5 bg-neutral-700 mx-1" />

        <button
          onClick={() => setAutoplay((a) => !a)}
          className={cn(
            "flex items-center gap-1.5 px-3 h-8 rounded-lg text-xs font-medium transition-colors",
            autoplay
              ? "bg-primary/20 text-primary hover:bg-primary/30"
              : "text-neutral-400 hover:text-white hover:bg-neutral-800"
          )}
          title="Toggle autoplay (Space)"
        >
          {autoplay ? (
            <>
              <Pause className="h-3.5 w-3.5" />
              Pause
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5" />
              Autoplay
            </>
          )}
        </button>

        <span className="text-[10px] text-neutral-600 ml-1 hidden sm:block">
          ← → space
        </span>
      </div>

      {/* ── Thumbnail strip ──────────────────────────────────────────────────── */}
      <div
        ref={thumbStripRef}
        className="flex gap-1.5 px-3 py-2.5 overflow-x-auto bg-neutral-900 border-t border-neutral-800 scrollbar-thin"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {slides.map((src, i) => (
          <button
            key={src}
            onClick={() => goTo(i)}
            style={{ scrollSnapAlign: "center" }}
            className={cn(
              "shrink-0 rounded-md overflow-hidden border-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary",
              i === current
                ? "border-primary opacity-100 scale-105 shadow-lg shadow-primary/20"
                : "border-transparent opacity-35 hover:opacity-70 hover:border-neutral-600"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Slide ${i + 1}`}
              loading="lazy"
              className="h-11 w-[74px] object-cover block bg-neutral-800"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
