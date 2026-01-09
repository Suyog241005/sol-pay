import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { MoreHorizontal, Eye, Edit, Link2, Power } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ContentItem {
  id: string;
  title: string;
  type: "Article" | "Prompt";
  price: number;
  purchases: number;
  earned: number;
  status: "Published" | "Draft";
  created: string;
}

interface ContentListProps {
  items: {
    id: string;
    title: string;
    type: string;
    price: number;
    purchases: number;
    earned: number;
    status: string;
    created: string;
  }[];
}

export function ContentList({ items }: ContentListProps) {
  const handleCopyLink = (itemId: string) => {
    const link = `${window.location.origin}/content/${itemId}`;
    navigator.clipboard.writeText(link);
    // TODO: Show toast
  };

  if (items.length === 0) {
    return (
      <Card className="text-center py-16">
        <CardContent>
          <div className="text-muted-foreground text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">
            You haven't created anything yet.
          </h3>
          <p className="text-muted-foreground mb-6">
            Start by creating your first paid article or prompt.
          </p>
          <Button onClick={() => window.location.href = "/create"}>
            Create your first paid article
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Purchases</TableHead>
              <TableHead>Earned</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.title}
                </TableCell>
                <TableCell>
                  <Badge variant={item.type === "Article" ? "default" : "secondary"}>
                    {item.type}
                  </Badge>
                </TableCell>
                <TableCell>{item.price.toFixed(4)} SOL</TableCell>
                <TableCell>{item.purchases}</TableCell>
                <TableCell className="font-mono">
                  {item.earned.toFixed(4)} SOL
                </TableCell>
                <TableCell>
                  <Badge variant={item.status === "Published" ? "default" : "secondary"}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.created}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link2 className="h-4 w-4 mr-2" />
                        Copy Paid Link
                      </DropdownMenuItem>
                      {item.status === "Published" && (
                        <DropdownMenuItem className="text-orange-600">
                          <Power className="h-4 w-4 mr-2" />
                          Unpublish
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}