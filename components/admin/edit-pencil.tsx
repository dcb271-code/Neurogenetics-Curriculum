"use client";

import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

export function EditPencil({
  onClick,
  title,
  className,
}: {
  onClick: () => void;
  title?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title ?? "Edit"}
      className={cn(
        "inline-flex h-6 w-6 items-center justify-center rounded-md",
        "text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
        className,
      )}
    >
      <Pencil className="h-3.5 w-3.5" />
    </button>
  );
}
