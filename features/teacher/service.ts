// features/teacher/service.ts
import prisma from "@/lib/prisma";

export async function getTeacherDashboardData(teacherId: string) {
  const assignments = await prisma.assignment.findMany({
    where: { teacherId },
    select: { id: true, title: true },
  });

  const submissionsRaw = await prisma.submission.findMany({
    where: { assignment: { teacherId } },
    select: {
      id: true,
      content: true,
      grade: true,
      createdAt: true,
      student: { select: { name: true } },
      assignment: { select: { title: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // Convert Date to string
  const submissions = submissionsRaw.map(s => ({
    ...s,
    createdAt: s.createdAt.toISOString(),
  }));

  return { assignments, submissions };
}
