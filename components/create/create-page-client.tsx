"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreatePromptForm } from "./create-prompt-form";
import { CreateArticleForm } from "./create-article-form";
import { ConnectedWallet } from "@/components/connected-wallet";

export function CreatePageClient() {
  const [activeTab, setActiveTab] = useState("prompt");

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="prompt">Create Prompt</TabsTrigger>
            <TabsTrigger value="article">Create Article</TabsTrigger>
            <TabsTrigger value="link" disabled>
              Create Paid Link (Coming Soon)
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <TabsContent value="prompt" className="mt-8">
            <CreatePromptForm />
          </TabsContent>

          <TabsContent value="article" className="mt-8">
            <CreateArticleForm />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
