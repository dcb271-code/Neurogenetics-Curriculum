"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  CheckCircle2,
  Clock,
  Target,
  Trophy,
  Lock,
  LogOut,
  Trash2,
} from "lucide-react";
import { getAllModules } from "@/lib/modules";
import { ProgressRing } from "@/components/progress-ring";
import { cn } from "@/lib/utils";

// ── Auth gate ────────────────────────────────────────────────────────────────
// Simple hash-based PD login for dashboard access.

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

const EXPECTED_USER_HASH =
  "1282cda5409ac5a4db55717d49e0837424c526dfac6ad03ddc8a3b9a18be167a";
const EXPECTED_PASS_HASH =
  "55af1bf48423f1ceafafcd7cacfff51e382649e5792495442458a90a1f20d8b7";

const AUTH_SESSION_KEY = "neurogenetics-dashboard-auth";

function LoginGate({ onAuth }: { onAuth: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    setError(false);

    const [userHash, passHash] = await Promise.all([
      sha256(user.trim()),
      sha256(pass),
    ]);

    if (userHash === EXPECTED_USER_HASH && passHash === EXPECTED_PASS_HASH) {
      sessionStorage.setItem(AUTH_SESSION_KEY, "1");
      onAuth();
    } else {
      setError(true);
    }
    setChecking(false);
  };

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
      <div className="w-full max-w-sm mx-auto px-4">
        <div className="rounded-xl border bg-card p-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Lock className="h-4.5 w-4.5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Dashboard</h1>
              <p className="text-[11px] text-muted-foreground">
                Sign in to view resident progress
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="dash-user"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
                Username
              </label>
              <input
                id="dash-user"
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                autoComplete="username"
                autoFocus
              />
            </div>
            <div>
              <label
                htmlFor="dash-pass"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
                Password
              </label>
              <input
                id="dash-pass"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 font-medium">
                Invalid username or password.
              </p>
            )}

            <button
              type="submit"
              disabled={checking || !user.trim() || !pass}
              className="w-full rounded-lg bg-primary text-primary-foreground py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {checking ? "Checking..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface ResidentData {
  id: string;
  username: string;
  displayName: string;
  role: string;
  createdAt: string;
  modulesStarted: number;
  modulesCompleted: number;
  avgQuizScore: number | null;
  totalAttempts: number;
  progress: Record<
    string,
    {
      slidesCompleted: boolean;
      quizCompleted: boolean;
      quizScore: number | null;
      sectionsRead: number;
    }
  >;
}

// ── Dashboard content ─────────────────────────────────────────────────────────

function DashboardContent({ onLogout }: { onLogout: () => void }) {
  const modules = getAllModules();
  const [residents, setResidents] = useState<ResidentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string, displayName: string) => {
    if (!confirm(`Remove ${displayName} and all their progress? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      const res = await fetch("/api/admin/residents", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setResidents((prev) => prev.filter((r) => r.id !== id));
        if (expandedId === id) setExpandedId(null);
      }
    } catch { /* ignore */ }
    setDeleting(null);
  };

  useEffect(() => {
    fetch("/api/admin/residents")
      .then((r) => r.json())
      .then((d) => setResidents(d.residents ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="container mx-auto max-w-5xl px-4 py-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Modules
          </Link>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2.5">
            <Users className="h-6 w-6 text-primary" />
            Resident Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            Track progress across all residents.{" "}
            {residents.length > 0 &&
              `${residents.length} resident${residents.length !== 1 ? "s" : ""} registered.`}
          </p>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          title="Sign out"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
        </div>
      ) : residents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-dashed">
          <Users className="h-10 w-10 text-muted-foreground/20 mb-4" />
          <p className="text-sm font-medium text-muted-foreground mb-1">
            No residents yet
          </p>
          <p className="text-xs text-muted-foreground/70 max-w-sm">
            Residents are created when someone registers via the Log In button
            in the navigation bar.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {residents.map((r) => {
            const isExpanded = expandedId === r.id;
            const pct =
              modules.length > 0
                ? Math.round((r.modulesCompleted / modules.length) * 100)
                : 0;
            return (
              <div
                key={r.id}
                className="rounded-xl border bg-card overflow-hidden relative group"
              >
                {/* Summary row */}
                <button
                  onClick={() =>
                    setExpandedId(isExpanded ? null : r.id)
                  }
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-accent/30 transition-colors text-left"
                >
                  <ProgressRing
                    value={pct}
                    size={44}
                    strokeWidth={4}
                    showLabel
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">
                      {r.displayName}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {r.modulesCompleted}/{modules.length} modules completed
                      {r.avgQuizScore !== null && ` · Avg quiz: ${r.avgQuizScore}`}
                      {r.role && r.role !== "resident" && ` · ${r.role}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {r.modulesStarted} started
                    </span>
                    <span className="flex items-center gap-1">
                      <Trophy className="h-3 w-3" />
                      {r.modulesCompleted} done
                    </span>
                  </div>
                </button>
                {/* Delete button */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(r.id, r.displayName); }}
                  disabled={deleting === r.id}
                  className="absolute top-3 right-3 p-1.5 rounded-md text-muted-foreground/40 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                  title={`Remove ${r.displayName}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="border-t px-5 py-4 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {modules.map((m) => {
                        const mp = r.progress[m.id];
                        const slidesComplete = mp?.slidesCompleted ?? false;
                        const quizComplete = mp?.quizCompleted ?? false;
                        const sectionsRead = mp?.sectionsRead ?? 0;
                        const pctMod = slidesComplete
                          ? 100
                          : m.sections.length > 0
                          ? Math.round(
                              (sectionsRead / m.sections.length) * 100
                            )
                          : 0;
                        return (
                          <div
                            key={m.id}
                            className={cn(
                              "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs",
                              pctMod === 100
                                ? "bg-green-500/5"
                                : pctMod > 0
                                ? "bg-primary/5"
                                : "bg-muted/30"
                            )}
                          >
                            <div className="flex-1 min-w-0 truncate">
                              {m.title}
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {slidesComplete && (
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                              )}
                              {quizComplete && (
                                <Target className="h-3 w-3 text-amber-500" />
                              )}
                              {mp?.quizScore != null && (
                                <span className="text-[10px] tabular-nums text-muted-foreground">
                                  {mp.quizScore}/{m.quiz.length}
                                </span>
                              )}
                              {!slidesComplete &&
                                !quizComplete &&
                                pctMod > 0 && (
                                  <span className="text-[10px] tabular-nums text-muted-foreground">
                                    {pctMod}%
                                  </span>
                                )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

// ── Page wrapper ──────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(AUTH_SESSION_KEY) === "1") {
      setAuthed(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    setAuthed(false);
  };

  if (!authed) {
    return <LoginGate onAuth={() => setAuthed(true)} />;
  }

  return <DashboardContent onLogout={handleLogout} />;
}
