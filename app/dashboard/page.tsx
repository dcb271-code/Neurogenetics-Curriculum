"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Download,
  Upload,
  Trash2,
  CheckCircle2,
  Clock,
  Target,
  Trophy,
  Lock,
  LogOut,
} from "lucide-react";
import { getAllModules } from "@/lib/modules";
import {
  getProgressForResident,
  getOverallStats,
  CurriculumProgress,
} from "@/lib/progress";
import {
  getResidents,
  exportResidentData,
  importResidentData,
  removeResident,
  Resident,
} from "@/lib/residents";
import { ProgressRing } from "@/components/progress-ring";
import { cn } from "@/lib/utils";

// ── Auth ──────────────────────────────────────────────────────────────────────
// Simple client-side gate. Credentials are hashed so they're not plaintext in
// the bundle — but this is NOT a security boundary (no backend).

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// sha256("dyl") and sha256("NGRules")
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

// ── Dashboard content ─────────────────────────────────────────────────────────

interface ResidentRow {
  resident: Resident;
  progress: CurriculumProgress;
  stats: { started: number; completed: number; percent: number };
  quizAvg: number | null;
}

function DashboardContent({ onLogout }: { onLogout: () => void }) {
  const modules = getAllModules();
  const [rows, setRows] = useState<ResidentRow[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refresh = () => {
    const residents = getResidents();
    const data: ResidentRow[] = residents.map((r) => {
      const progress = getProgressForResident(r.id);
      const stats = getOverallStats(progress, modules.length);
      const scores = Object.values(progress)
        .filter((p) => p.quizCompleted && p.quizScore !== undefined)
        .map((p) => p.quizScore!);
      const quizAvg =
        scores.length > 0
          ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
          : null;
      return { resident: r, progress, stats, quizAvg };
    });
    setRows(data);
  };

  useEffect(refresh, [modules.length]);

  const handleExport = (residentId: string) => {
    const data = exportResidentData(residentId);
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `neurogenetics-${data.resident.name.replace(/\s+/g, "-").toLowerCase()}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (data.resident && data.progress) {
          importResidentData(data);
          refresh();
        }
      } catch {
        alert("Invalid progress file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleRemove = (id: string, name: string) => {
    if (!confirm(`Remove ${name} and all their progress data?`)) return;
    removeResident(id);
    refresh();
  };

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
            {rows.length > 0 &&
              `${rows.length} resident${rows.length !== 1 ? "s" : ""} tracked.`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border hover:bg-accent transition-colors"
          >
            <Upload className="h-3.5 w-3.5" />
            Import
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            title="Sign out"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </button>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-dashed">
          <Users className="h-10 w-10 text-muted-foreground/20 mb-4" />
          <p className="text-sm font-medium text-muted-foreground mb-1">
            No residents yet
          </p>
          <p className="text-xs text-muted-foreground/70 max-w-sm">
            Residents are created when someone sets up their profile via the
            resident selector in the nav bar. You can also import progress
            files.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map(({ resident, progress, stats, quizAvg }) => {
            const isExpanded = expandedId === resident.id;
            return (
              <div
                key={resident.id}
                className="rounded-xl border bg-card overflow-hidden"
              >
                {/* Summary row */}
                <button
                  onClick={() =>
                    setExpandedId(isExpanded ? null : resident.id)
                  }
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-accent/30 transition-colors text-left"
                >
                  <ProgressRing
                    value={stats.percent}
                    size={44}
                    strokeWidth={4}
                    showLabel
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">
                      {resident.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {stats.completed}/{modules.length} modules completed
                      {quizAvg !== null && ` · Avg quiz: ${quizAvg}`}
                      {resident.role && ` · ${resident.role}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {stats.started} started
                    </span>
                    <span className="flex items-center gap-1">
                      <Trophy className="h-3 w-3" />
                      {stats.completed} done
                    </span>
                  </div>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="border-t px-5 py-4 animate-fade-in">
                    {/* Module progress grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
                      {modules.map((m) => {
                        const mp = progress[m.id];
                        const sectionsRead = mp?.sectionsRead ?? [];
                        const slidesComplete =
                          mp?.slidesCompleted ?? false;
                        const quizComplete =
                          mp?.quizCompleted ?? false;
                        const pct = slidesComplete
                          ? 100
                          : m.sections.length > 0
                          ? Math.round(
                              (sectionsRead.length / m.sections.length) *
                                100
                            )
                          : 0;
                        return (
                          <div
                            key={m.id}
                            className={cn(
                              "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs",
                              pct === 100
                                ? "bg-green-500/5"
                                : pct > 0
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
                              {mp?.quizScore !== undefined && (
                                <span className="text-[10px] tabular-nums text-muted-foreground">
                                  {mp.quizScore}/{m.quiz.length}
                                </span>
                              )}
                              {!slidesComplete &&
                                !quizComplete &&
                                pct > 0 && (
                                  <span className="text-[10px] tabular-nums text-muted-foreground">
                                    {pct}%
                                  </span>
                                )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2 border-t border-border/40">
                      <button
                        onClick={() => handleExport(resident.id)}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-lg hover:bg-accent"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Export Progress
                      </button>
                      <button
                        onClick={() =>
                          handleRemove(resident.id, resident.name)
                        }
                        className="flex items-center gap-1.5 text-xs text-red-500/70 hover:text-red-500 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-red-500/5 ml-auto"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Remove
                      </button>
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
