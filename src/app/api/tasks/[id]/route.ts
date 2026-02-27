import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";

// GET /api/tasks/[id] - Get a single task
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const task = await Task.findById(id).lean();

    if (!task) {
      return NextResponse.json(
        { success: false, error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: task }, { status: 200 });
  } catch (error) {
    console.error("GET /api/tasks/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch task" },
      { status: 500 }
    );
  }
}

// PUT /api/tasks/[id] - Update a task
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const task = await Task.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!task) {
      return NextResponse.json(
        { success: false, error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: task }, { status: 200 });
  } catch (error) {
    console.error("PUT /api/tasks/[id] error:", error);

    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to update task" },
      { status: 500 }
    );
  }
}

// DELETE /api/tasks/[id] - Delete a task
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const task = await Task.findByIdAndDelete(id).lean();

    if (!task) {
      return NextResponse.json(
        { success: false, error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/tasks/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
