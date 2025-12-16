import prisma from "@/lib/prisma";

//  GET all assignments

export async function getAllAssignments() {
  return prisma.assignment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      teacher: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      submissions: {
        select: {
          id: true,
          studentId: true,
          grade: true,
          // feedback: true,
          createdAt: true,
        },
      },
    },
  });
}

/* 
   GET assignments for a student
    */
export async function getAssignmentsForStudent(studentId: string) {
  return prisma.assignment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      teacher: {
        select: {
          id: true,
          name: true,
        },
      },
      submissions: {
        where: { studentId },
        select: {
          id: true,
          grade: true,
          // feedback: true,
          createdAt: true,
        },
      },
    },
  });
}

/* 
   GET assignment by ID
 */
export async function getAssignmentById(id: string) {
  return prisma.assignment.findUnique({
    where: { id },
    include: {
      teacher: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      submissions: true,
    },
  });
}

/* 
   CREATE assignment
    */
export async function createAssignment(
  title: string,
  description: string,
  teacherId: string
) {
  return prisma.assignment.create({
    data: {
      title,
      description,
      teacher: {
        connect: { id: teacherId },
      },
    },
  });
}

/* 
   UPDATE assignment
  */
export async function updateAssignment(
  id: string,
  title: string,
  description: string
) {
  return prisma.assignment.update({
    where: { id },
    data: { title, description },
  });
}

/* =======================
   DELETE assignment
   ======================= */
export async function deleteAssignment(id: string) {
  return prisma.assignment.delete({
    where: { id },
  });
}
