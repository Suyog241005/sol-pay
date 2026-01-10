import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { MyStuffClient } from "@/components/dashboard/my-stuff-client";
import prisma from "@/lib/prisma";

export default async function MyStuffPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const articles = await prisma.article.findMany({
    where: {
      creatorId: session.user.id,
    },
  });

  return <MyStuffClient articles={articles} />;
}
