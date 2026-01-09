"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useWallet } from "@solana/wallet-adapter-react";

export function CreatePromptForm() {
  const { connected } = useWallet();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("0.01");
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
      // For now, just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setTitle("");
        setContent("");
        setPrice("0.01");
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to create prompt:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-2">Prompt Published!</h2>
          <p className="text-muted-foreground">
            Your prompt is now live and ready for purchase.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Paid Prompt</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="prompt-title">Prompt Title</Label>
            <Input
              id="prompt-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Write a perfect hackathon pitch"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt-content">Prompt Content</Label>
            <Textarea
              id="prompt-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your detailed prompt here..."
              rows={8}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt-price">Price in SOL</Label>
            <Input
              id="prompt-price"
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
                <h4 className="font-medium">{title || "Untitled Prompt"}</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {content || "Prompt content will appear here..."}
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