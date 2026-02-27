"use client";

import GlassDropdown from "@/components/GlassDropdown";

interface FilterBarProps {
  filters: {
    status: string;
    priority: string;
    search: string;
    sort: string;
  };
  onFilterChange: (filters: {
    status: string;
    priority: string;
    search: string;
    sort: string;
  }) => void;
  taskCount: number;
}

export default function FilterBar({
  filters,
  onFilterChange,
  taskCount,
}: FilterBarProps) {
  const updateFilter = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  const priorityOptions = [
    { value: "all", label: "All Priority" },
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const sortOptions = [
    { value: "-createdAt", label: "Newest First" },
    { value: "createdAt", label: "Oldest First" },
    { value: "dueDate", label: "Due Date" },
    { value: "-priority", label: "Priority" },
    { value: "title", label: "Title A-Z" },
  ];

  return (
    <div className="animate-fade-in space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-11 pr-4 py-3 glass-input rounded-2xl text-foreground placeholder-muted"
        />
        {filters.search && (
          <button
            onClick={() => updateFilter("search", "")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status Filter */}
        <div className="flex items-center gap-1.5 glass rounded-xl p-1">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateFilter("status", option.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                filters.status === option.value
                  ? "glass-btn text-background"
                  : "text-muted hover:text-foreground hover:bg-white/5"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Priority Filter */}
        <GlassDropdown
          value={filters.priority}
          onChange={(val) => updateFilter("priority", val)}
          options={priorityOptions}
          className="w-36"
        />

        {/* Sort */}
        <GlassDropdown
          value={filters.sort}
          onChange={(val) => updateFilter("sort", val)}
          options={sortOptions}
          className="w-40"
        />

        {/* Task Count */}
        <span className="ml-auto text-sm text-muted">
          {taskCount} task{taskCount !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
