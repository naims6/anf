import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function PageFallback() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-10 w-72" />
      <Card>
        <CardContent className="p-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="mb-4 h-12 w-full" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
