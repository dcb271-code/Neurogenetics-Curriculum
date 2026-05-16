"use client";

import { useModuleNote } from "@/lib/notes";
import { cn } from "@/lib/utils";

interface Props {
  moduleId: string;
  moduleTitle: string;
  /** When true (drawer/dark surface), use dark textarea colors. */
  dark?: boolean;
  /** Override default placeholder. */
  placeholder?: string;
  /** Override default min height (Tailwind class, e.g. "min-h-[160px]"). */
  minHeightClass?: string;
}

const MAX_CHARS = 20_000;

export function NoteEditor({
  moduleId,
  moduleTitle,
  dark = false,
  placeholder = "Jot anything you want to remember about this module…",
  minHeightClass = "min-h-[200px]",
}: Props) {
  const { content, setContent, status, loaded } = useModuleNote(
    moduleId,
    moduleTitle
  );

  return (
    <div className="flex flex-col gap-2 w-full">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value.slice(0, MAX_CHARS))}
        placeholder={loaded ? placeholder : "Loading…"}
        disabled={!loaded}
        maxLength={MAX_CHARS}
        spellCheck
        className={cn(
          "w-full resize-y rounded-lg border p-3 text-sm leading-relaxed",
          "whitespace-pre-wrap font-sans focus:outline-none focus:ring-2 focus:ring-primary/40",
          minHeightClass,
          dark
            ? "bg-neutral-900 border-neutral-700 text-neutral-100 placeholder:text-neutral-500"
            : "bg-background border-border text-foreground placeholder:text-muted-foreground"
        )}
      />
      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
        <span>
          {status === "saving" && "Saving…"}
          {status === "saved" && "Saved"}
          {status === "idle" && content.length > 0 && " "}
        </span>
        <span className="tabular-nums">
          {content.length} / {MAX_CHARS.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
