export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  category?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  category: string;
  dueDate: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
