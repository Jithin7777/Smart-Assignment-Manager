import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} from "@/features/assignments/service";

async function getCurrentUser() {
  const session = await auth();
  console.log("SESSION:", session);
  return session?.user;
}

function handleError(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong";
}

// ========== GET one assignment ==========
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Assignment ID is required" },
        { status: 400 }
      );
    }

    const assignment = await getAssignmentById(id);

    if (!assignment) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(assignment);
  } catch (error) {
    return NextResponse.json(
      { error: handleError(error) },
      { status: 500 }
    );
  }
}

// ========== UPDATE assignment ==========
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "TEACHER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    const { title, description } = await req.json();

    const existing = await getAssignmentById(id);
    if (!existing || existing.teacherId !== user.id) {
      return NextResponse.json(
        { error: "Unauthorized or assignment not found" },
        { status: 403 }
      );
    }

    const updated = await updateAssignment(id, title, description);

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: handleError(error) },
      { status: 500 }
    );
  }
}

// ========== DELETE assignment ==========
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "TEACHER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    const existing = await getAssignmentById(id);
    if (!existing || existing.teacherId !== user.id) {
      return NextResponse.json(
        { error: "Unauthorized or assignment not found" },
        { status: 403 }
      );
    }

    await deleteAssignment(id);

    return NextResponse.json({
      message: "Assignment deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: handleError(error) },
      { status: 500 }
    );
  }
}



