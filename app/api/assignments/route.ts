import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// Helper function to get current user
async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

// GET all assignments
export async function GET() {
  try {
    const assignments = await prisma.assignment.findMany({
      orderBy: { createdAt: "desc" },
      include: { teacher: true, submissions: true },
    });
    return NextResponse.json(assignments);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch assignments" }, { status: 500 });
  }
}

// POST - create new assignment (TEACHER only)
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "TEACHER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { title, description } = data;

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description required" }, { status: 400 });
    }

    const assignment = await prisma.assignment.create({
      data: {
        title,
        description,
        teacher: { connect: { id: user.id } },
      },
    });

    return NextResponse.json(assignment);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create assignment" }, { status: 500 });
  }
}

