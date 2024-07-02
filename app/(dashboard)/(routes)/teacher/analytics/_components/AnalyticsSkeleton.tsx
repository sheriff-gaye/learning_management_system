import { Skeleton } from "@/components/ui/skeleton";

const AnalyticsPageSkeleton = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Skeleton className="w-full h-24" />
        <Skeleton className="w-full h-24" />
        <Skeleton className="w-full h-24" />
        <Skeleton className="w-full h-24" />
      </div>
      <Skeleton className="w-full h-64" />
    </div>
  );
};

export default AnalyticsPageSkeleton;