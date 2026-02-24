import { notFound } from "next/navigation";
import { getAllModules, getModuleById } from "@/lib/modules";
import { ContentReader } from "@/components/content-reader";

interface Props {
  params: { moduleId: string };
}

export default function SlidesPage({ params }: Props) {
  const mod = getModuleById(params.moduleId);
  if (!mod) notFound();
  return <ContentReader module={mod} />;
}

export function generateStaticParams() {
  return getAllModules().map((m) => ({ moduleId: m.id }));
}
