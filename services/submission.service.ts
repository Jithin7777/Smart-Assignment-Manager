import prisma from "@/lib/prisma";

// CREATE a submission
export async function createSubmission(
  assignmentId: string,
  studentId: string,
  content: string
) {
  return prisma.submission.create({
    data: {
      content,
      assignment: { connect: { id: assignmentId } },
      student: { connect: { id: studentId } },
    },
  });
}

// GET all submissions for a student
export async function getStudentSubmissions(studentId: string) {
  return prisma.submission.findMany({
    where: { studentId },
    include: { assignment: true },
    orderBy: { createdAt: "desc" },
  });
}

// GET submissions for an assignment (optional, for teacher view)
export async function getAssignmentSubmissions(assignmentId: string) {
  return prisma.submission.findMany({
    where: { assignmentId },
    include: { student: true },
    orderBy: { createdAt: "desc" },
  });
}

// UPDATE submission (e.g., grade by teacher)
export async function updateSubmissionGrade(submissionId: string, grade: number) {
  return prisma.submission.update({
    where: { id: submissionId },
    data: { grade },
  });
}
