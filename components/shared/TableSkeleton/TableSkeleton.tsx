import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonProps {
  rows?: number;
}

export function TableSkeleton({ rows = 4 }: TableSkeletonProps) {
  return (
    <div className="p-6">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="mb-4 h-12 w-full" />
      ))}
    </div>
  );
}
