import mongoose, { Schema, Document, Model } from "mongoose";

// ============================================
// Task Schema for MongoDB
// ============================================
// Collection: tasks
//
// Fields:
//   - title:       String   (required, max 100 chars)
//   - description: String   (optional, max 500 chars)
//   - status:      String   (enum: "pending", "in-progress", "completed")
//   - priority:    String   (enum: "low", "medium", "high")
//   - category:    String   (optional, max 50 chars)
//   - dueDate:     Date     (optional)
//   - createdAt:   Date     (auto-generated)
//   - updatedAt:   Date     (auto-generated)
// ============================================

export interface ITask extends Document {
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  category?: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "in-progress", "completed"],
        message: "{VALUE} is not a valid status",
      },
      default: "pending",
    },
    priority: {
      type: String,
      enum: {
        values: ["low", "medium", "high"],
        message: "{VALUE} is not a valid priority",
      },
      default: "medium",
    },
    category: {
      type: String,
      trim: true,
      maxlength: [50, "Category cannot exceed 50 characters"],
      default: "",
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Indexes for better query performance
TaskSchema.index({ status: 1 });
TaskSchema.index({ priority: 1 });
TaskSchema.index({ createdAt: -1 });
TaskSchema.index({ dueDate: 1 });

const Task: Model<ITask> =
  mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);

export default Task;
