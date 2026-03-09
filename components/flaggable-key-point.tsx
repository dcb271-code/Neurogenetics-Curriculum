"use client";

import { Bookmark } from "lucide-react";
import { useFlags } from "@/lib/flags";
import { cn } from "@/lib/utils";

interface Props {
  keyPoint: string;
  moduleId: string;
  moduleTitle: string;
  sectionTitle: string;
}

export function FlaggableKeyPoint({
  keyPoint,
  moduleId,
  moduleTitle,
  sectionTitle,
}: Props) {
  const { isFlagged, toggle } = useFlags();
  const flagged = isFlagged(moduleId, sectionTitle, keyPoint);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggle({ moduleId, moduleTitle, sectionTitle, keyPoint });
  };

  return (
    <li className="flex items-start gap-2.5 text-sm group/kp">
      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
      <span className="flex-1 text-foreground/80 leading-relaxed">{keyPoint}</span>
      <button
        onClick={handleToggle}
        title={flagged ? "Remove from review deck" : "Flag for spaced review"}
        className={cn(
          "shrink-0 mt-0.5 rounded-md p-1 transition-all",
          "sm:opacity-0 sm:group-hover/kp:opacity-100 focus-visible:opacity-100",
          flagged
            ? "opacity-100 text-amber-500 hover:text-amber-600"
            : "text-muted-foreground/40 hover:text-amber-500 hover:bg-amber-500/10"
        )}
      >
        <Bookmark
          className={cn(
            "h-3.5 w-3.5 transition-all",
            flagged && "fill-amber-500"
          )}
        />
      </button>
    </li>
  );
}
