// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// // GET submission details
// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//   const submission = await prisma.submission.findUnique({
//     where: { id: params.id },
//     include: { student: true, assignment: true },
//   });

//   if (!submission) return NextResponse.json({ error: "Submission not found" }, { status: 404 });
//   return NextResponse.json(submission);
// }

// // PATCH to update grade and feedback
// export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
//   const body = await req.json();
//   const { grade, } = body;

//   const updated = await prisma.submission.update({
//     where: { id: params.id },
//     data: { grade },
//   });

//   return NextResponse.json(updated);
// }



import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET submission details
export async function GET(
  req: NextRequest, 
  // 1. Update type definition to expect a Promise
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    // 2. Await the params object to extract the id
    const { id } = await params;
    
    const submission = await prisma.submission.findUnique({
      where: { id }, // Use the awaited 'id'
      include: { student: true, assignment: true },
    });

    if (!submission) return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    return NextResponse.json(submission);
  } catch (error) {
    console.error("GET submission error:", error);
    return NextResponse.json({ error: "Failed to fetch submission" }, { status: 500 });
  }
}

// PATCH to update grade and feedback
export async function PATCH(
  req: NextRequest, 
  // 1. Update type definition to expect a Promise
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 2. Await the params object to extract the id
    const { id } = await params;
    
    const body = await req.json();
    const { grade } = body;

    // Optional: Add basic validation for grade
    if (grade === undefined) {
      return NextResponse.json({ error: "Grade is required" }, { status: 400 });
    }

    const updated = await prisma.submission.update({
      where: { id }, // Use the awaited 'id'
      data: { grade: Number(grade) }, // Ensure grade is stored as a number
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH submission error:", error);
    return NextResponse.json({ error: "Failed to update submission" }, { status: 500 });
  }
}