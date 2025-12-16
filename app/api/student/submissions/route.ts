import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { assignmentId, content } = await req.json();

    if (!assignmentId || !content) {
      return NextResponse.json({ error: "Assignment ID and content required" }, { status: 400 });
    }

    const submission = await prisma.submission.create({
      data: {
        assignmentId,
        content,
        studentId: user.id,
      },
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to submit assignment" }, { status: 500 });
  }
}