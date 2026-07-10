/** Skeleton de carregamento no formato dos cards de produto. */
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[3/4] rounded-lg bg-cloud" />
          <div className="mt-3 h-3 w-16 rounded bg-cloud" />
          <div className="mt-2 h-4 w-3/4 rounded bg-cloud" />
          <div className="mt-2 h-4 w-24 rounded bg-cloud" />
          <div className="mt-3 h-10 rounded-lg bg-cloud" />
        </div>
      ))}
    </div>
  );
}
