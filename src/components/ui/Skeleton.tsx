export function CardSkeleton() {
  return (
    <div className="glass-card p-6 animate-pulse">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#1a1a3e]" />
        <div className="flex-1">
          <div className="h-5 bg-[#1a1a3e] rounded w-3/4 mb-2" />
          <div className="h-3 bg-[#1a1a3e] rounded w-1/2" />
        </div>
      </div>
      <div className="h-3 bg-[#1a1a3e] rounded w-full mb-2" />
      <div className="h-3 bg-[#1a1a3e] rounded w-2/3" />
    </div>
  );
}

export function VideoCardSkeleton() {
  return (
    <div className="glass-card overflow-hidden animate-pulse">
      <div className="aspect-video bg-[#1a1a3e]" />
      <div className="p-4">
        <div className="h-4 bg-[#1a1a3e] rounded w-3/4 mb-2" />
        <div className="h-3 bg-[#1a1a3e] rounded w-1/2 mb-3" />
        <div className="flex gap-2">
          <div className="h-3 bg-[#1a1a3e] rounded w-16" />
          <div className="h-3 bg-[#1a1a3e] rounded w-12" />
        </div>
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="h-8 bg-[#1a1a3e] rounded w-1/3 mb-4 animate-pulse" />
      <div className="h-4 bg-[#1a1a3e] rounded w-2/3 mb-8 animate-pulse" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => <VideoCardSkeleton key={i} />)}
      </div>
    </div>
  );
}
