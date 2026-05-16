"use client";

import { EditStatus } from "@/lib/module-overrides";
import { cn } from "@/lib/utils";

export function AdminBadge({
  status,
  className,
}: {
  status: EditStatus;
  className?: string;
}) {
  if (status === "original") return null;
  const isDraft = status === "draft";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        isDraft
          ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
          : "bg-green-500/15 text-green-700 dark:text-green-300 border border-green-500/30",
        className,
      )}
    >
      {isDraft ? "Draft" : "Edited"}
    </span>
  );
}
