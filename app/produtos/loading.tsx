import { ProductGridSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <div className="mb-8 animate-pulse space-y-3">
        <div className="h-3 w-24 rounded bg-cloud" />
        <div className="h-10 w-72 rounded bg-cloud" />
        <div className="h-4 w-96 max-w-full rounded bg-cloud" />
      </div>
      <ProductGridSkeleton count={12} />
    </div>
  );
}
