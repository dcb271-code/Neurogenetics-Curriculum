"use client";

import { useState, useEffect, useCallback } from "react";

const RESIDENTS_KEY = "neurogenetics-residents";
const ACTIVE_KEY = "neurogenetics-active-resident";

export interface Resident {
  id: string;
  name: string;
  passwordHash: string;
  role?: string;
  createdAt: string;
}

/** SHA-256 hash a string (returns hex). */
export async function hashPassword(password: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function getResidents(): Resident[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(RESIDENTS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveResidents(residents: Resident[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(RESIDENTS_KEY, JSON.stringify(residents));
}

export function getActiveResidentId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACTIVE_KEY);
}

export function setActiveResidentId(id: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACTIVE_KEY, id);
}

export async function addResident(
  name: string,
  password: string,
  role?: string
): Promise<Resident> {
  const residents = getResidents();
  const base =
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `r-${Date.now()}`;
  let id = base;
  let counter = 1;
  while (residents.some((r) => r.id === id)) {
    id = `${base}-${counter++}`;
  }
  const passwordHash = await hashPassword(password);
  const resident: Resident = {
    id,
    name,
    passwordHash,
    role,
    createdAt: new Date().toISOString(),
  };
  saveResidents([...residents, resident]);
  return resident;
}

/** Verify a resident's password. Returns true if correct. */
export async function verifyResident(
  id: string,
  password: string
): Promise<boolean> {
  const resident = getResidents().find((r) => r.id === id);
  if (!resident) return false;
  const hash = await hashPassword(password);
  return hash === resident.passwordHash;
}

export function removeResident(id: string): void {
  saveResidents(getResidents().filter((r) => r.id !== id));
  if (typeof window !== "undefined") {
    localStorage.removeItem(`neurogenetics-progress-${id}`);
    localStorage.removeItem(`neurogenetics-flags-${id}`);
    if (getActiveResidentId() === id) {
      localStorage.removeItem(ACTIVE_KEY);
    }
  }
}

/** Migrate legacy un-namespaced data to a default resident profile. */
export function ensureMigrated(): void {
  if (typeof window === "undefined") return;
  const residents = getResidents();
  if (residents.length > 0) return;

  const legacyProgress = localStorage.getItem("neurogenetics-progress");
  const legacyFlags = localStorage.getItem("neurogenetics-flags");

  if (legacyProgress || legacyFlags) {
    // Legacy data gets a blank passwordHash — they'll be prompted to set one
    const resident: Resident = {
      id: "resident-1",
      name: "Resident 1",
      passwordHash: "",
      createdAt: new Date().toISOString(),
    };
    saveResidents([resident]);
    setActiveResidentId(resident.id);

    if (legacyProgress) {
      localStorage.setItem(
        `neurogenetics-progress-${resident.id}`,
        legacyProgress
      );
      localStorage.removeItem("neurogenetics-progress");
    }
    if (legacyFlags) {
      localStorage.setItem(
        `neurogenetics-flags-${resident.id}`,
        legacyFlags
      );
      localStorage.removeItem("neurogenetics-flags");
    }
  }
}

/** Export a resident's full data for cross-device sharing. */
export function exportResidentData(id: string) {
  const residents = getResidents();
  const resident = residents.find((r) => r.id === id);
  if (!resident) return null;
  const progress = localStorage.getItem(`neurogenetics-progress-${id}`);
  const flags = localStorage.getItem(`neurogenetics-flags-${id}`);
  // Omit passwordHash from export
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _omit, ...safeResident } = resident;
  return {
    resident: safeResident,
    progress: progress ? JSON.parse(progress) : {},
    flags: flags ? JSON.parse(flags) : [],
    exportedAt: new Date().toISOString(),
  };
}

/** Import a resident's data (merges into local storage). */
export function importResidentData(data: {
  resident: Omit<Resident, "passwordHash"> & { passwordHash?: string };
  progress: Record<string, unknown>;
  flags: unknown[];
}): Resident {
  const residents = getResidents();
  const existing = residents.find((r) => r.id === data.resident.id);
  const full: Resident = {
    ...data.resident,
    passwordHash: data.resident.passwordHash ?? "",
  };
  if (!existing) {
    saveResidents([...residents, full]);
  }
  localStorage.setItem(
    `neurogenetics-progress-${data.resident.id}`,
    JSON.stringify(data.progress)
  );
  localStorage.setItem(
    `neurogenetics-flags-${data.resident.id}`,
    JSON.stringify(data.flags)
  );
  return full;
}

export function useResidents() {
  const [residents, setResidentsState] = useState<Resident[]>([]);
  const [activeId, setActiveIdState] = useState<string | null>(null);

  useEffect(() => {
    ensureMigrated();
    setResidentsState(getResidents());
    setActiveIdState(getActiveResidentId());
  }, []);

  const refresh = useCallback(() => {
    setResidentsState(getResidents());
    setActiveIdState(getActiveResidentId());
  }, []);

  const add = useCallback(
    async (name: string, password: string, role?: string) => {
      const r = await addResident(name, password, role);
      setActiveResidentId(r.id);
      refresh();
      return r;
    },
    [refresh]
  );

  const switchTo = useCallback((id: string) => {
    setActiveResidentId(id);
    setActiveIdState(id);
    window.location.reload();
  }, []);

  const remove = useCallback(
    (id: string) => {
      removeResident(id);
      refresh();
    },
    [refresh]
  );

  const active = residents.find((r) => r.id === activeId) ?? null;

  return { residents, active, activeId, add, switchTo, remove, refresh };
}
