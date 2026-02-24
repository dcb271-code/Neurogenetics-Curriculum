import { modules } from "@/data/modules/index";
import { Module, Tag } from "@/lib/types";

export function getAllModules(): Module[] {
  return modules;
}

export function getModuleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

export function getModulesByTag(tag: Tag): Module[] {
  return modules.filter((m) => m.tags.includes(tag));
}
