"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsOverview } from "./stats-overview";
import { ContentList } from "./content-list";
import { useWallet } from "@solana/wallet-adapter-react";

export function MyStuffClient({ articles }: { articles: any[] }) {
  const { publicKey, connected } = useWallet();
  const [activeTab, setActiveTab] = useState("articles");

  // Mock data - replace with real data
  const stats = {
    totalEarnings: 0.125,
    totalSales: 8,
    publishedItems: 5,
    drafts: 2,
  };

  const prompts = [
    {
      id: "3",
      title: "Write a Perfect Hackathon Pitch",
      type: "Prompt",
      status: "Published",
      created: "2024-01-07",
    },
  ];

  const drafts = [
    {
      id: "4",
      title: "GSoC Proposal Checklist",
      type: "Article",
      status: "Draft",
      created: "2024-01-06",
    },
  ];

  const getTabContent = () => {
    switch (activeTab) {
      case "articles":
        return articles;
      case "prompts":
        return prompts;
      case "drafts":
        return drafts;
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <StatsOverview stats={stats} />

        {/* Content Tabs */}
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="prompts">Prompts</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <ContentList items={getTabContent()} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
