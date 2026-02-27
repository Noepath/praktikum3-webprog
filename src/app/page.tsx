"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { Task, TaskFormData } from "@/types/task";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import FilterBar from "@/components/FilterBar";
import Modal from "@/components/Modal";
import ConfirmDialog from "@/components/ConfirmDialog";
import EmptyState from "@/components/EmptyState";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import StatsBar from "@/components/StatsBar";
import StarsBackground from "@/components/StarsBackground";

export default function Home() {
  const {
    tasks,
    loading,
    error,
    filters,
    setFilters,
    createTask,
    updateTask,
    deleteTask,
    toggleStatus,
  } = useTasks();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleCreate = async (data: TaskFormData): Promise<boolean> => {
    const success = await createTask(data);
    if (success) setShowCreateModal(false);
    return success;
  };

  const handleUpdate = async (data: TaskFormData): Promise<boolean> => {
    if (!editingTask) return false;
    const success = await updateTask(editingTask._id, data);
    if (success) setEditingTask(null);
    return success;
  };

  const handleDelete = async () => {
    if (!deletingTaskId) return;
    setDeleteLoading(true);
    await deleteTask(deletingTaskId);
    setDeleteLoading(false);
    setDeletingTaskId(null);
  };

  const hasFilters =
    filters.status !== "all" ||
    filters.priority !== "all" ||
    filters.search !== "";

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Animated Glass Background */}
      <div className="glass-bg">
        <div className="glass-orb glass-orb-1" />
        <div className="glass-orb glass-orb-2" />
        <div className="glass-orb glass-orb-3" />
        <div className="glass-orb glass-orb-4" />
      </div>

      {/* Twinkling Stars */}
      <StarsBackground />

      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong border-b border-white/6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl glass flex items-center justify-center border border-accent/20">
                <svg
                  className="w-4.5 h-4.5 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h1 className="text-lg font-semibold text-foreground tracking-tight">
                Tugas orang hidup
              </h1>
            </div>

            {/* Add Task Button */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 glass-btn text-background text-sm font-medium rounded-xl"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="hidden sm:inline">New Task</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1 w-full relative z-10">
        {/* Error Banner */}
        {error && (
          <div className="animate-slide-up glass rounded-2xl px-4 py-3 text-sm text-red-400 flex items-center gap-2 border border-red-500/10">
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        )}

        {/* Stats Bar */}
        {!loading && tasks.length > 0 && <StatsBar tasks={tasks} />}

        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          taskCount={tasks.length}
        />

        {/* Task Grid */}
        {loading ? (
          <LoadingSkeleton />
        ) : tasks.length === 0 ? (
          <EmptyState hasFilters={hasFilters} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
            {tasks.map((task, index) => (
              <TaskCard
                key={task._id}
                task={task}
                index={index}
                onEdit={setEditingTask}
                onDelete={setDeletingTaskId}
                onToggleStatus={toggleStatus}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="glass-subtle border-t border-white/4 mt-auto relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-xs text-muted">
            &copy; 2026 Farid. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Task"
      >
        <TaskForm
          onSubmit={handleCreate}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        title="Edit Task"
      >
        {editingTask && (
          <TaskForm
            initialData={{
              title: editingTask.title,
              description: editingTask.description || "",
              status: editingTask.status,
              priority: editingTask.priority,
              category: editingTask.category || "",
              dueDate: editingTask.dueDate || "",
            }}
            onSubmit={handleUpdate}
            onCancel={() => setEditingTask(null)}
            isEditing
          />
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingTaskId}
        onClose={() => setDeletingTaskId(null)}
        onConfirm={handleDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        loading={deleteLoading}
      />
    </div>
  );
}
