"use client";

import { useState } from "react";
import { X, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/lib/use-auth";
import { cn } from "@/lib/utils";

export function LoginDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  const reset = () => {
    setUsername("");
    setPassword("");
    setDisplayName("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);

    const result =
      mode === "login"
        ? await login(username, password)
        : await register(username, password, displayName || username);

    setBusy(false);
    if (result.ok) {
      reset();
      onClose();
    } else {
      setError(result.error ?? "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm mx-4 rounded-2xl border bg-background shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-sm font-semibold">
            {mode === "login" ? "Sign In" : "Create Account"}
          </h2>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-accent transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3">
          {mode === "register" && (
            <div>
              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                Display Name
              </label>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                autoFocus
              />
            </div>
          )}
          <div>
            <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              autoFocus={mode === "login"}
              autoComplete="username"
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={busy || !username || !password}
            className={cn(
              "w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors",
              "bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
            )}
          >
            {mode === "login" ? (
              <><LogIn className="h-4 w-4" /> Sign In</>
            ) : (
              <><UserPlus className="h-4 w-4" /> Create Account</>
            )}
          </button>
        </form>

        {/* Toggle */}
        <div className="px-5 pb-4 text-center">
          <button
            type="button"
            onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {mode === "login" ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
