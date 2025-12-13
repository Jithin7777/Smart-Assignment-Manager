import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

// GET all assignments assigned to the student
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const assignments = await prisma.assignment.findMany({
      include: {
        teacher: true,
        submissions: { where: { studentId: user.id } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(assignments);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch assignments" }, { status: 500 });
  }
}
