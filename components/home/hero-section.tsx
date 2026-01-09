"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const HeroSection = () => {
  const router = useRouter();
  return (
    <section className="text-center py-20 px-4">
      <h1 className="text-6xl font-bold mb-6">SolPay</h1>
      <p className="text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Sell prompts, articles, or ideas — paid instantly in SOL.
      </p>
      <Button
        size="lg"
        className="text-lg px-8 py-3"
        onClick={() => router.push("/create")}
      >
        Create a paid prompt / article
      </Button>
    </section>
  );
};
