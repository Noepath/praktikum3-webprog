export default function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="w-20 h-20 mb-6 rounded-2xl glass flex items-center justify-center">
        <svg
          className="w-10 h-10 text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">
        {hasFilters ? "No tasks match your filters" : "No tasks yet"}
      </h3>
      <p className="text-sm text-muted max-w-xs text-center">
        {hasFilters
          ? "Try adjusting your search or filter criteria."
          : "Create your first task to get started with organizing your work."}
      </p>
    </div>
  );
}
