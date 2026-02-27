"use client";

import { useState, useEffect, useCallback } from "react";
import { Task, TaskFormData, ApiResponse } from "@/types/task";

const API_URL = "/api/tasks";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    search: "",
    sort: "-createdAt",
  });

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (filters.status !== "all") params.set("status", filters.status);
      if (filters.priority !== "all") params.set("priority", filters.priority);
      if (filters.search) params.set("search", filters.search);
      if (filters.sort) params.set("sort", filters.sort);

      const res = await fetch(`${API_URL}?${params.toString()}`);
      const data: ApiResponse<Task[]> = await res.json();

      if (data.success && data.data) {
        setTasks(data.data);
      } else {
        setError(data.error || "Failed to fetch tasks");
      }
    } catch {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (taskData: TaskFormData): Promise<boolean> => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      const data: ApiResponse<Task> = await res.json();

      if (data.success) {
        await fetchTasks();
        return true;
      } else {
        setError(data.error || "Failed to create task");
        return false;
      }
    } catch {
      setError("Failed to create task");
      return false;
    }
  };

  const updateTask = async (
    id: string,
    taskData: Partial<TaskFormData>
  ): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      const data: ApiResponse<Task> = await res.json();

      if (data.success) {
        await fetchTasks();
        return true;
      } else {
        setError(data.error || "Failed to update task");
        return false;
      }
    } catch {
      setError("Failed to update task");
      return false;
    }
  };

  const deleteTask = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      const data: ApiResponse<null> = await res.json();

      if (data.success) {
        await fetchTasks();
        return true;
      } else {
        setError(data.error || "Failed to delete task");
        return false;
      }
    } catch {
      setError("Failed to delete task");
      return false;
    }
  };

  const toggleStatus = async (task: Task): Promise<boolean> => {
    const statusOrder: Task["status"][] = [
      "pending",
      "in-progress",
      "completed",
    ];
    const currentIndex = statusOrder.indexOf(task.status);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    return updateTask(task._id, { status: nextStatus });
  };

  return {
    tasks,
    loading,
    error,
    filters,
    setFilters,
    createTask,
    updateTask,
    deleteTask,
    toggleStatus,
    refetch: fetchTasks,
  };
}
