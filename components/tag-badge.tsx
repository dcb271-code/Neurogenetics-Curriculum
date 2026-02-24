import { cn } from "@/lib/utils";
import { Tag } from "@/lib/types";

const tagConfig: Record<
  Tag,
  { label: string; className: string }
> = {
  "Basic Genetics": {
    label: "Basic Genetics",
    className:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  Neurogenetics: {
    label: "Neurogenetics",
    className:
      "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  },
  Advanced: {
    label: "Advanced",
    className:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
};

interface TagBadgeProps {
  tag: Tag;
  className?: string;
}

export function TagBadge({ tag, className }: TagBadgeProps) {
  const config = tagConfig[tag];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
