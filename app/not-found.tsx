import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dna } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
        <Dna className="h-6 w-6 text-muted-foreground" />
      </div>
      <h2 className="mb-2 text-xl font-semibold">Module not found</h2>
      <p className="mb-6 text-sm text-muted-foreground max-w-xs">
        This module doesn&apos;t exist or may have been removed.
      </p>
      <Button asChild size="sm">
        <Link href="/">Back to Curriculum</Link>
      </Button>
    </div>
  );
}
