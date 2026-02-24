import { notFound } from "next/navigation";
import { getModuleById, getAllModules } from "@/lib/modules";
import { ModuleTabs } from "@/components/module-tabs";

interface Props {
  params: { moduleId: string };
}

export default function ModulePage({ params }: Props) {
  const mod = getModuleById(params.moduleId);
  if (!mod) notFound();
  return <ModuleTabs module={mod} />;
}

export function generateStaticParams() {
  return getAllModules().map((m) => ({ moduleId: m.id }));
}
