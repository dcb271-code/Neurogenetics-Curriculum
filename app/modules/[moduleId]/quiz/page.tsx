import { notFound } from "next/navigation";
import { getModuleById } from "@/lib/modules";
import { QuizComponent } from "@/components/quiz-component";

interface Props {
  params: { moduleId: string };
}

export default function QuizPage({ params }: Props) {
  const mod = getModuleById(params.moduleId);
  if (!mod) notFound();
  return <QuizComponent module={mod} />;
}
