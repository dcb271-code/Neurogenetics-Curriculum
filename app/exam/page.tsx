import { redirect } from "next/navigation";

export default function ExamRedirect() {
  redirect("/assessments/comprehensive");
}
