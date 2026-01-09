import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CreatePageClient } from "@/components/create/create-page-client";

export default async function CreatePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session) {
    redirect("/sign-in");
  }
  
  return <CreatePageClient />;
}