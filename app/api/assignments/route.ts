import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  getAllAssignments,
  createAssignment,
} from "@/features/assignments/service";

// Helper function to get current user
async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

export async function GET() {
  try {
    const assignments = await getAllAssignments();
    return NextResponse.json(assignments);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch assignments" },
      { status: 500 }
    );
  }
}

// POST - (TEACHER only)
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "TEACHER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description required" },
        { status: 400 }
      );
    }

    const assignment = await createAssignment(
      title,
      description,
      user.id
    );

    return NextResponse.json(assignment);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create assignment" },
      { status: 500 }
    );
  }
}
