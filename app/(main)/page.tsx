import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Header } from "@/components/home/header";
import { Separator } from "@/components/ui/separator";
import { HeroSection } from "@/components/home/hero-section";
import { ContentSection } from "@/components/home/content-section";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return redirect("/sign-in");
  }

  const creator = await prisma.creator.upsert({
    create: {
      name: session.user.name,
      userId: session.user.id,
    },
    where: {
      userId: session.user.id,
    },
    update: {
      name: session.user.name,
    },
  });

  return (
    <div className="h-full w-full flex flex-col">
      <Header />
      <Separator />
      <main className="flex-1">
        <HeroSection />
        <ContentSection />
      </main>
    </div>
  );
}
