import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const submission = await prisma.submission.findUnique({
      where: { id },
      include: { student: true, assignment: true },
    });

    if (!submission)
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    return NextResponse.json(submission);
  } catch (error) {
    console.error("GET submission error:", error);
    return NextResponse.json(
      { error: "Failed to fetch submission" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json();
    const { grade } = body;

    if (grade === undefined) {
      return NextResponse.json({ error: "Grade is required" }, { status: 400 });
    }

    const updated = await prisma.submission.update({
      where: { id },
      data: { grade: Number(grade) },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH submission error:", error);
    return NextResponse.json(
      { error: "Failed to update submission" },
      { status: 500 }
    );
  }
}
