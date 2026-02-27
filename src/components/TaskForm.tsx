"use client";

import { useState, useMemo, FormEvent } from "react";
import { TaskFormData } from "@/types/task";
import GlassDropdown from "@/components/GlassDropdown";

interface TaskFormProps {
  initialData?: Partial<TaskFormData>;
  onSubmit: (data: TaskFormData) => Promise<boolean>;
  onCancel: () => void;
  isEditing?: boolean;
}

const defaultFormData: TaskFormData = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  category: "",
  dueDate: "",
};

function buildInitialFormData(initialData?: Partial<TaskFormData>): TaskFormData {
  if (!initialData) return { ...defaultFormData };
  return {
    ...defaultFormData,
    ...initialData,
    dueDate: initialData.dueDate
      ? new Date(initialData.dueDate).toISOString().split("T")[0]
      : "",
  };
}

export default function TaskForm({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}: TaskFormProps) {
  const computedInitial = useMemo(() => buildInitialFormData(initialData), [initialData]);
  const [formData, setFormData] = useState<TaskFormData>(computedInitial);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title cannot exceed 100 characters";
    }
    if (formData.description && formData.description.length > 500) {
      newErrors.description = "Description cannot exceed 500 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const success = await onSubmit(formData);
    setSubmitting(false);

    if (success) {
      setFormData(defaultFormData);
    }
  };

  return (
    <div className="animate-scale-in">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-muted-light mb-2">
            Title <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="What needs to be done?"
            className={`w-full px-4 py-3 glass-input rounded-xl text-foreground placeholder-muted ${
              errors.title ? "border-danger!" : ""
            }`}
          />
          {errors.title && (
            <p className="mt-1.5 text-sm text-danger">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-muted-light mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Add more details..."
            rows={3}
            className={`w-full px-4 py-3 glass-input rounded-xl text-foreground placeholder-muted resize-none ${
              errors.description ? "border-danger!" : ""
            }`}
          />
          <div className="flex justify-between mt-1">
            {errors.description && (
              <p className="text-sm text-danger">{errors.description}</p>
            )}
            <p className="text-xs text-muted ml-auto">
              {formData.description?.length || 0}/500
            </p>
          </div>
        </div>

        {/* Status & Priority Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-light mb-2">
              Status
            </label>
            <GlassDropdown
              value={formData.status}
              onChange={(val) =>
                setFormData({
                  ...formData,
                  status: val as TaskFormData["status"],
                })
              }
              options={[
                { value: "pending", label: "Pending" },
                { value: "in-progress", label: "In Progress" },
                { value: "completed", label: "Completed" },
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-light mb-2">
              Priority
            </label>
            <GlassDropdown
              value={formData.priority}
              onChange={(val) =>
                setFormData({
                  ...formData,
                  priority: val as TaskFormData["priority"],
                })
              }
              options={[
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
              ]}
            />
          </div>
        </div>

        {/* Category & Due Date Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-light mb-2">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              placeholder="e.g. Work, Personal"
              className="w-full px-4 py-3 glass-input rounded-xl text-foreground placeholder-muted"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-light mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              className="w-full px-4 py-3 glass-input rounded-xl text-foreground"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 px-6 py-3 glass-btn text-background font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting
              ? "Saving..."
              : isEditing
              ? "Update Task"
              : "Create Task"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 glass-input rounded-xl text-muted-light hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
