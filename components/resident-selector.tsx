"use client";

import { useState, useRef, useEffect } from "react";
import { Users, ChevronDown, Plus, Check, X, Lock } from "lucide-react";
import { useResidents, verifyResident } from "@/lib/residents";
import { cn } from "@/lib/utils";

export function ResidentSelector() {
  const { residents, active, add, switchTo } = useResidents();
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPass, setNewPass] = useState("");
  // Password prompt when switching to another resident
  const [switchTarget, setSwitchTarget] = useState<string | null>(null);
  const [switchPass, setSwitchPass] = useState("");
  const [switchError, setSwitchError] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const switchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        resetState();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Auto-focus inputs
  useEffect(() => {
    if (adding) inputRef.current?.focus();
  }, [adding]);
  useEffect(() => {
    if (switchTarget) switchInputRef.current?.focus();
  }, [switchTarget]);

  const resetState = () => {
    setOpen(false);
    setAdding(false);
    setNewName("");
    setNewPass("");
    setSwitchTarget(null);
    setSwitchPass("");
    setSwitchError(false);
  };

  const handleAdd = async () => {
    const trimmedName = newName.trim();
    if (!trimmedName || !newPass) return;
    await add(trimmedName, newPass);
    resetState();
  };

  const handleSwitch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!switchTarget) return;
    setSwitchError(false);

    // Residents with empty passwordHash (migrated legacy) let anyone in
    const resident = residents.find((r) => r.id === switchTarget);
    if (resident && !resident.passwordHash) {
      switchTo(switchTarget);
      return;
    }

    const ok = await verifyResident(switchTarget, switchPass);
    if (ok) {
      switchTo(switchTarget);
    } else {
      setSwitchError(true);
    }
  };

  // If no residents yet, show a setup button that opens the add form
  if (residents.length === 0 && !open) {
    return (
      <div ref={ref} className="relative">
        <button
          onClick={() => {
            setOpen(true);
            setAdding(true);
          }}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-md hover:bg-accent"
        >
          <Users className="h-3.5 w-3.5" />
          <span className="hidden sm:block">Set Up Profile</span>
        </button>
        {open && dropdownPanel()}
      </div>
    );
  }

  function dropdownPanel() {
    return (
      <div className="absolute right-0 top-full mt-1 w-64 rounded-xl border bg-popover shadow-lg z-50 overflow-hidden animate-fade-in">
        {/* Resident list (hidden when adding or switching) */}
        {!adding && !switchTarget && (
          <div className="p-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2.5 py-1.5">
              Residents
            </p>
            {residents.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  if (r.id === active?.id) {
                    resetState();
                  } else {
                    setSwitchTarget(r.id);
                    setSwitchPass("");
                    setSwitchError(false);
                  }
                }}
                className={cn(
                  "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs transition-colors text-left",
                  r.id === active?.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground hover:bg-accent"
                )}
              >
                <span className="flex-1 truncate">{r.name}</span>
                {r.role && (
                  <span className="text-[10px] text-muted-foreground">
                    {r.role}
                  </span>
                )}
                {r.id === active?.id ? (
                  <Check className="h-3 w-3 text-primary shrink-0" />
                ) : (
                  <Lock className="h-3 w-3 text-muted-foreground/40 shrink-0" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Password prompt for switching */}
        {switchTarget && (
          <div className="p-3">
            <p className="text-xs font-medium mb-2">
              Sign in as{" "}
              <span className="text-primary">
                {residents.find((r) => r.id === switchTarget)?.name}
              </span>
            </p>
            <form onSubmit={handleSwitch} className="space-y-2">
              <input
                ref={switchInputRef}
                type="password"
                value={switchPass}
                onChange={(e) => {
                  setSwitchPass(e.target.value);
                  setSwitchError(false);
                }}
                placeholder="Password"
                className="w-full rounded-lg border bg-background px-2.5 py-1.5 text-xs outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                autoComplete="current-password"
              />
              {switchError && (
                <p className="text-[10px] text-red-500 font-medium">
                  Wrong password.
                </p>
              )}
              <div className="flex gap-1.5">
                <button
                  type="submit"
                  disabled={!switchPass}
                  className="flex-1 rounded-lg bg-primary text-primary-foreground py-1.5 text-xs font-medium hover:bg-primary/90 disabled:opacity-40 transition-colors"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSwitchTarget(null);
                    setSwitchPass("");
                    setSwitchError(false);
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-accent transition-colors"
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Add resident form */}
        <div className="border-t p-1.5">
          {adding ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAdd();
              }}
              className="px-2 py-1 space-y-2"
            >
              <input
                ref={inputRef}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground/50 py-1.5 border-b border-border/50 focus:border-primary transition-colors"
                maxLength={50}
              />
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Choose a password"
                className="w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground/50 py-1.5 border-b border-border/50 focus:border-primary transition-colors"
                autoComplete="new-password"
              />
              <div className="flex items-center gap-1.5 pt-1">
                <button
                  type="submit"
                  disabled={!newName.trim() || !newPass}
                  className="flex-1 rounded-lg bg-primary text-primary-foreground py-1.5 text-xs font-medium hover:bg-primary/90 disabled:opacity-40 transition-colors"
                >
                  Create Profile
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAdding(false);
                    setNewName("");
                    setNewPass("");
                  }}
                  className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          ) : (
            !switchTarget && (
              <button
                onClick={() => setAdding(true)}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Resident
              </button>
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-md hover:bg-accent"
      >
        <Users className="h-3.5 w-3.5" />
        <span className="hidden sm:block max-w-[100px] truncate">
          {active?.name ?? "Select"}
        </span>
        <ChevronDown className="h-3 w-3 opacity-50" />
      </button>

      {open && dropdownPanel()}
    </div>
  );
}
