"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useWallet } from "@solana/wallet-adapter-react";

export function CreateArticleForm() {
  const { connected } = useWallet();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0.02");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !price) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TODO: Save to database
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
      
      setTimeout(() => {
        setTitle("");
        setContent("");
        setDescription("");
        setPrice("0.02");
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to create article:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-2">Article Published!</h2>
          <p className="text-muted-foreground">
            Your article is now live and ready for purchase.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Paid Article</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="article-title">Article Title</Label>
            <Input
              id="article-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Next.js + Solana Integration Guide"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="article-description">Short Description (Optional)</Label>
            <Input
              id="article-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of your article..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="article-content">Article Content</Label>
            <Textarea
              id="article-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article content here (supports Markdown)..."
              rows={12}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="article-price">Price in SOL</Label>
            <Input
              id="article-price"
              type="number"
              step="0.001"
              min="0.001"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Preview Section */}
          {(title || content) && (
            <div className="border rounded-lg p-4 bg-muted/50">
              <h3 className="font-semibold mb-2">Preview</h3>
              <div className="space-y-2">
                <h4 className="font-medium">{title || "Untitled Article"}</h4>
                {description && (
                  <p className="text-sm text-muted-foreground">{description}</p>
                )}
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {content.slice(0, 200)}{content.length > 200 ? "..." : ""}
                </p>
                <p className="text-primary font-bold">{price} SOL</p>
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            size="lg" 
            className="w-full"
            disabled={!connected || isSubmitting}
          >
            {isSubmitting ? "Publishing..." : "Publish & Lock Behind Paywall"}
          </Button>
          
          {!connected && (
            <p className="text-sm text-muted-foreground text-center">
              Connect your wallet to publish content
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}