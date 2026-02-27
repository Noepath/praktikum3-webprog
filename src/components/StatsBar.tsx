import { Task } from "@/types/task";

interface StatsBarProps {
  tasks: Task[];
}

export default function StatsBar({ tasks }: StatsBarProps) {
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "pending").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    { label: "Total", value: total, color: "text-foreground" },
    { label: "Pending", value: pending, color: "text-amber-400" },
    { label: "In Progress", value: inProgress, color: "text-sky-400" },
    { label: "Completed", value: completed, color: "text-emerald-400" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glass glass-hover rounded-2xl p-4 text-center"
          >
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      {total > 0 && (
        <div className="mt-3 glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted">Completion Progress</span>
            <span className="text-xs font-medium text-accent">
              {completionRate}%
            </span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-700 ease-out"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
