"use client";

import { useState, useRef, useEffect } from "react";
import { Users, ChevronDown, Plus, Check, X } from "lucide-react";
import { useResidents } from "@/lib/residents";
import { cn } from "@/lib/utils";

export function ResidentSelector() {
  const { residents, active, add, switchTo } = useResidents();
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setAdding(false);
        setNewName("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Auto-focus input when adding
  useEffect(() => {
    if (adding) inputRef.current?.focus();
  }, [adding]);

  const handleAdd = () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    add(trimmed);
    setNewName("");
    setAdding(false);
    setOpen(false);
  };

  // If no residents yet, show a setup button
  if (residents.length === 0) {
    return (
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

      {open && (
        <div className="absolute right-0 top-full mt-1 w-56 rounded-xl border bg-popover shadow-lg z-50 overflow-hidden animate-fade-in">
          <div className="p-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2.5 py-1.5">
              Residents
            </p>
            {residents.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  if (r.id !== active?.id) switchTo(r.id);
                  setOpen(false);
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
                {r.id === active?.id && (
                  <Check className="h-3 w-3 text-primary shrink-0" />
                )}
              </button>
            ))}
          </div>

          <div className="border-t p-1.5">
            {adding ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAdd();
                }}
                className="flex items-center gap-1.5 px-2"
              >
                <input
                  ref={inputRef}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Resident name..."
                  className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground/50 py-1.5"
                  maxLength={50}
                />
                <button
                  type="submit"
                  disabled={!newName.trim()}
                  className="text-primary hover:text-primary/80 disabled:opacity-30 transition-colors"
                >
                  <Check className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAdding(false);
                    setNewName("");
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setAdding(true)}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Resident
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
