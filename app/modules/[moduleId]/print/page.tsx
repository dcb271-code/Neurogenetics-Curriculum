import { notFound } from "next/navigation";
import { getAllModules, getModuleById } from "@/lib/modules";
import { PrintView } from "@/components/print-view";

interface Props {
  params: { moduleId: string };
}

export default function PrintPage({ params }: Props) {
  const mod = getModuleById(params.moduleId);
  if (!mod) notFound();
  return <PrintView module={mod} />;
}

export function generateStaticParams() {
  return getAllModules().map((m) => ({ moduleId: m.id }));
}

export const metadata = {
  title: "Print",
};
