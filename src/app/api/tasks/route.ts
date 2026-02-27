import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";

// GET /api/tasks - Get all tasks with optional filters
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "-createdAt";

    // Build filter object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {};

    if (status && status !== "all") {
      filter.status = status;
    }

    if (priority && priority !== "all") {
      filter.priority = priority;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const tasks = await Task.find(filter).sort(sort).lean();

    return NextResponse.json({ success: true, data: tasks }, { status: 200 });
  } catch (error) {
    console.error("GET /api/tasks error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

// POST /api/tasks - Create a new task
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const task = await Task.create(body);

    return NextResponse.json({ success: true, data: task }, { status: 201 });
  } catch (error) {
    console.error("POST /api/tasks error:", error);

    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to create task" },
      { status: 500 }
    );
  }
}
