"use client";

export const ContentSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">Examples</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="font-semibold mb-2">
              Write a perfect hackathon pitch
            </h3>
            <p className="text-primary font-bold">0.01 SOL</p>
          </div>
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="font-semibold mb-2">
              Next.js + Solana starter template
            </h3>
            <p className="text-primary font-bold">0.02 SOL</p>
          </div>
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="font-semibold mb-2">GSoC proposal checklist</h3>
            <p className="text-primary font-bold">0.015 SOL</p>
          </div>
        </div>
      </div>
    </section>
  );
};
