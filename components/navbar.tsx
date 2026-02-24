"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dna, Bookmark } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useFlags } from "@/lib/flags";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { count } = useFlags();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-sm print:hidden">
      <div className="container mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
            <Dna className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="hidden sm:block">NeuroGenetics</span>
        </Link>

        <nav className="flex items-center gap-1">
          {!isHome && (
            <Link
              href="/"
              className="mr-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-accent"
            >
              ← All Modules
            </Link>
          )}

          <Link
            href="/review"
            className="relative flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-md hover:bg-accent"
            title="Review Dashboard"
          >
            <Bookmark className="h-3.5 w-3.5" />
            <span className="hidden sm:block">Review</span>
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white leading-none">
                {count > 99 ? "99" : count}
              </span>
            )}
          </Link>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
