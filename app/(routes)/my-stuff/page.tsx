import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { MyStuffClient } from "@/components/dashboard/my-stuff-client";

export default async function MyStuffPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session) {
    redirect("/sign-in");
  }
  
  return <MyStuffClient />;
}