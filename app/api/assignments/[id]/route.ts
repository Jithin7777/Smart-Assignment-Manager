import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

function handleError(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong";
}

// ========== GET one assignment ==========
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }  // Note: params is a Promise
) {
  try {
    // Await the params first!
    const { id } = await context.params;
    console.log("📌 ID received in API:", id);

    if (!id) {
      return NextResponse.json(
        { error: "Assignment ID is required" },
        { status: 400 }
      );
    }

    const assignment = await prisma.assignment.findUnique({
      where: { id },
      include: { teacher: true, submissions: true },
    });

    if (!assignment) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(assignment);
  } catch (error) {
    console.error("❌ API ERROR:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// ========== UPDATE assignment ==========
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }  // Note: params is a Promise
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "TEACHER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Await the params first!
    const { id } = await context.params;
    
    if (!id) {
      return NextResponse.json(
        { error: "Assignment ID is required" },
        { status: 400 }
      );
    }

    const { title, description } = await req.json();

    const existing = await prisma.assignment.findUnique({ where: { id } });
    if (!existing || existing.teacherId !== user.id) {
      return NextResponse.json(
        { error: "Unauthorized or assignment not found" },
        { status: 403 }
      );
    }

    const updated = await prisma.assignment.update({
      where: { id },
      data: { title, description },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: handleError(error) }, { status: 500 });
  }
}

// ========== DELETE assignment ==========
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }  // Note: params is a Promise
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "TEACHER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Await the params first!
    const { id } = await context.params;
    
    if (!id) {
      return NextResponse.json(
        { error: "Assignment ID is required" },
        { status: 400 }
      );
    }

    const existing = await prisma.assignment.findUnique({ where: { id } });
    if (!existing || existing.teacherId !== user.id) {
      return NextResponse.json(
        { error: "Unauthorized or assignment not found" },
        { status: 403 }
      );
    }

    await prisma.assignment.delete({ where: { id } });

    return NextResponse.json({ message: "Assignment deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: handleError(error) }, { status: 500 });
  }
}