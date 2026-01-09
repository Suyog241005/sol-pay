"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsOverview } from "./stats-overview";
import { ContentList } from "./content-list";
import { useWallet } from "@solana/wallet-adapter-react";

export function MyStuffClient() {
  const { publicKey, connected } = useWallet();
  const [activeTab, setActiveTab] = useState("articles");

  // Mock data - replace with real data
  const stats = {
    totalEarnings: 0.125,
    totalSales: 8,
    publishedItems: 5,
    drafts: 2,
  };

  const articles = [
    {
      id: "1",
      title: "Next.js + Solana Integration Guide",
      type: "Article",
      price: 0.02,
      purchases: 5,
      earned: 0.1,
      status: "Published",
      created: "2024-01-09",
    },
    {
      id: "2",
      title: "Perfect Hackathon Pitch Template",
      type: "Article",
      price: 0.015,
      purchases: 3,
      earned: 0.045,
      status: "Published",
      created: "2024-01-08",
    },
  ];

  const prompts = [
    {
      id: "3",
      title: "Write a Perfect Hackathon Pitch",
      type: "Prompt",
      price: 0.01,
      purchases: 0,
      earned: 0,
      status: "Published",
      created: "2024-01-07",
    },
  ];

  const drafts = [
    {
      id: "4",
      title: "GSoC Proposal Checklist",
      type: "Article",
      price: 0.025,
      purchases: 0,
      earned: 0,
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
