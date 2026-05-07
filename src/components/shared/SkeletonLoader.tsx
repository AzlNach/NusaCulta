export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-gray-200 rounded-[14px] animate-pulse ${className}`} />
  );
}

export function SkeletonText({ width = "w-full", height = "h-4" }: { width?: string; height?: string }) {
  return <div className={`bg-gray-200 rounded animate-pulse ${width} ${height}`} />;
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 p-4 border-b border-gray-100">
      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonText width="w-1/3" />
        <SkeletonText width="w-1/2" height="h-3" />
      </div>
      <SkeletonText width="w-16" height="h-6" />
    </div>
  );
}

export function SkeletonProductCard() {
  return (
    <div className="bg-white rounded-[14px] p-4 space-y-3 animate-pulse" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
      <div className="h-36 bg-gray-200 rounded-[10px]" />
      <SkeletonText width="w-3/4" />
      <SkeletonText width="w-1/2" height="h-3" />
      <SkeletonText width="w-1/3" />
    </div>
  );
}
