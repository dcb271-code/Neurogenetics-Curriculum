import { notFound } from "next/navigation";
import { getModuleById, getAllModules } from "@/lib/modules";
import { ModuleDetail } from "@/components/module-detail";

interface Props {
  params: { moduleId: string };
}

export default function ModulePage({ params }: Props) {
  const mod = getModuleById(params.moduleId);
  if (!mod) notFound();
  return <ModuleDetail module={mod} />;
}

export function generateStaticParams() {
  return getAllModules().map((m) => ({ moduleId: m.id }));
}
