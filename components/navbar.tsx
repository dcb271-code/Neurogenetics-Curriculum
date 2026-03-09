"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Dna,
  Bookmark,
  LayoutDashboard,
  LogIn,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchDialog } from "@/components/search-dialog";
import { LoginDialog } from "@/components/login-dialog";
import { useAuth } from "@/lib/use-auth";
import { useFlags } from "@/lib/flags";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { user, loading, logout } = useAuth();
  const { count } = useFlags();
  const [loginOpen, setLoginOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
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

            <SearchDialog />

            {/* Auth button */}
            {!loading && (
              user ? (
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen((o) => !o)}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-md hover:bg-accent"
                  >
                    <User className="h-3.5 w-3.5" />
                    <span className="hidden sm:block max-w-[100px] truncate">
                      {user.displayName}
                    </span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 top-full mt-1 w-48 rounded-xl border bg-popover shadow-lg z-50 overflow-hidden animate-fade-in p-1.5">
                      <div className="px-2.5 py-2 text-xs text-muted-foreground border-b mb-1">
                        Signed in as <span className="font-medium text-foreground">{user.username}</span>
                      </div>
                      <button
                        onClick={() => { logout(); setMenuOpen(false); }}
                        className={cn(
                          "w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs",
                          "text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                        )}
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setLoginOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors px-2.5 py-1.5 rounded-md hover:bg-primary/10"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  <span className="hidden sm:block">Log In</span>
                </button>
              )
            )}

            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-md hover:bg-accent"
              title="Resident Dashboard"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span className="hidden sm:block">Dashboard</span>
            </Link>

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

      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}

export default Navbar;
