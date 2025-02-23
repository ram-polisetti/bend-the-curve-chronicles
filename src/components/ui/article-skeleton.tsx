
import { Skeleton } from "@/components/ui/skeleton";

export const ArticleSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  );
};
