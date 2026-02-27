export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="glass rounded-2xl p-5 animate-pulse"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="h-6 w-20 glass-shimmer rounded-full" />
            <div className="h-5 w-14 glass-shimmer rounded-md" />
          </div>
          <div className="h-5 w-3/4 glass-shimmer rounded mb-2" />
          <div className="h-4 w-full glass-shimmer rounded mb-1" />
          <div className="h-4 w-2/3 glass-shimmer rounded mb-3" />
          <div className="flex gap-2 mt-3">
            <div className="h-5 w-16 glass-shimmer rounded-md" />
            <div className="h-5 w-24 glass-shimmer rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
