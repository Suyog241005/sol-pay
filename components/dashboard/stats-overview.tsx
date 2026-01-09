import { Card, CardContent } from "@/components/ui/card";

interface StatsOverviewProps {
  stats: {
    totalEarnings: number;
    totalSales: number;
    publishedItems: number;
    drafts: number;
  };
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const statCards = [
    {
      title: "Total Earnings",
      value: `${stats.totalEarnings.toFixed(4)} SOL`,
      change: null
    },
    {
      title: "Total Sales", 
      value: stats.totalSales.toString(),
      change: null
    },
    {
      title: "Published Items",
      value: stats.publishedItems.toString(),
      change: null
    },
    {
      title: "Drafts",
      value: stats.drafts.toString(),
      change: null
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </p>
                <p className="text-2xl font-bold">
                  {card.value}
                </p>
              </div>
              <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center">
                {index === 0 && "₿"}
                {index === 1 && "📊"}
                {index === 2 && "📝"}
                {index === 3 && "📄"}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}