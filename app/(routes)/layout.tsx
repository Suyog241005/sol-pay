import { Header } from "@/components/home/header";
import { Separator } from "@/components/ui/separator";

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full flex flex-col">
      <Header />
      <Separator />
      <main className="flex-1">{children}</main>
    </div>
  );
}
