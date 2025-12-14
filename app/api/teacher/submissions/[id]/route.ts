import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET submission details
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const submission = await prisma.submission.findUnique({
    where: { id: params.id },
    include: { student: true, assignment: true },
  });

  if (!submission) return NextResponse.json({ error: "Submission not found" }, { status: 404 });
  return NextResponse.json(submission);
}

// PATCH to update grade and feedback
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { grade, } = body;

  const updated = await prisma.submission.update({
    where: { id: params.id },
    data: { grade },
  });

  return NextResponse.json(updated);
}
