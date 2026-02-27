"use client";

import { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (task: Task) => void;
  index: number;
}

const statusConfig = {
  pending: {
    label: "Pending",
    dotColor: "bg-amber-400",
    bgColor: "bg-amber-400/10",
    textColor: "text-amber-400",
  },
  "in-progress": {
    label: "In Progress",
    dotColor: "bg-sky-400",
    bgColor: "bg-sky-400/10",
    textColor: "text-sky-400",
  },
  completed: {
    label: "Completed",
    dotColor: "bg-emerald-400",
    bgColor: "bg-emerald-400/10",
    textColor: "text-emerald-400",
  },
};

const priorityConfig = {
  low: {
    label: "Low",
    color: "text-emerald-400",
    border: "border-emerald-400/20",
  },
  medium: {
    label: "Medium",
    color: "text-amber-400",
    border: "border-amber-400/20",
  },
  high: {
    label: "High",
    color: "text-red-400",
    border: "border-red-400/20",
  },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function isOverdue(dueDate?: string): boolean {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggleStatus,
}: TaskCardProps) {
  const status = statusConfig[task.status];
  const priority = priorityConfig[task.priority];
  const overdue = isOverdue(task.dueDate) && task.status !== "completed";

  return (
    <div
      className={`group relative glass glass-hover rounded-2xl p-5 ${
        task.status === "completed" ? "opacity-60" : ""
      }`}
    >
      {/* Top Row: Status & Priority */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => onToggleStatus(task)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${status.bgColor} ${status.textColor}`}
          title="Click to change status"
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${status.dotColor}`}
          ></span>
          {status.label}
        </button>

        <span
          className={`text-xs font-medium ${priority.color} border ${priority.border} px-2 py-0.5 rounded-md`}
        >
          {priority.label}
        </span>
      </div>

      {/* Title */}
      <h3
        className={`text-base font-semibold mb-1.5 text-foreground leading-snug ${
          task.status === "completed" ? "line-through" : ""
        }`}
      >
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-muted-light mb-3 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Meta Row */}
      <div className="flex items-center gap-3 flex-wrap mt-3">
        {task.category && (
          <span className="text-xs text-muted glass-subtle px-2.5 py-1 rounded-md">
            {task.category}
          </span>
        )}

        {task.dueDate && (
          <span
            className={`text-xs flex items-center gap-1 ${
              overdue ? "text-danger font-medium" : "text-muted"
            }`}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {overdue ? "Overdue: " : ""}
            {formatDate(task.dueDate)}
          </span>
        )}

        <span className="text-xs text-muted ml-auto">
          {formatDate(task.createdAt)}
        </span>
      </div>

      {/* Action Buttons (visible on hover) */}
      <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => onEdit(task)}
          className="p-1.5 rounded-lg text-muted hover:text-accent hover:bg-white/5 transition-all duration-200"
          title="Edit task"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="p-1.5 rounded-lg text-muted hover:text-danger hover:bg-red-500/10 transition-all duration-200"
          title="Delete task"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
