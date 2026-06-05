import { redirect } from "next/navigation";
import Homepage from "@/components/backup/pages/Homepage";

export default function BackupPage() {
  if (process.env.NODE_ENV === "production") {
    redirect("/");
  }

  return <Homepage />;
}
