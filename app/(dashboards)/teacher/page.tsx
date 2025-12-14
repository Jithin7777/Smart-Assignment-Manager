// app/(dashboards)/teacher/page.tsx
export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import LogoutButton from "@/features/components/auth/LogoutButton";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function TeacherDashboard() {
  const session = await auth();

  if (!session) {
    return <div className="p-6">You are not logged in.</div>;
  }

  const teacherId = session.user.id;

  const [assignments, submissions] = await Promise.all([
    prisma.assignment.findMany({
      where: { teacherId },
      select: { id: true, title: true },
    }),
    prisma.submission.findMany({
      where: {
        assignment: { teacherId },
      },
      include: {
        student: { select: { name: true } },
        assignment: { select: { title: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const pendingReviews = submissions.filter((s) => s.grade === null).length;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
        <LogoutButton />
      </div>

      <p className="mb-6">
        Welcome, <b>{session.user.name}</b>
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <Stat title="Assignments" value={assignments.length} />
        <Stat title="Submissions" value={submissions.length} />
        <Stat title="Pending Reviews" value={pendingReviews} />
      </div>
  {/* Quick Actions */}
      <div className="mt-8 flex gap-4">
        <Link
          href="/teacher/assignments/new"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Create Assignment
        </Link>

        <Link
          href="/teacher/assignments"
          className="px-4 py-2 bg-gray-200 rounded"
        >
          View Assignments
        </Link>
      </div>
      {/* Submissions */}
      <h2 className="text-xl font-semibold mb-4">Submissions</h2>

      {submissions.length === 0 ? (
        <p>No submissions yet</p>
      ) : (
        <div className="space-y-4">
          {submissions.map((s) => (
            <div key={s.id} className="border p-4 rounded shadow bg-white">
              <p>
                <b>{s.student.name}</b> → {s.assignment.title}
              </p>

              <p className="mt-2 text-gray-700">
                <b>Answer:</b> {s.content}
              </p>

              <p className="mt-2 text-sm">
                Status:{" "}
                {s.grade !== null ? (
                  <span className="text-green-600">Graded ({s.grade})</span>
                ) : (
                  <span className="text-red-600">Pending</span>
                )}
              </p>

              {s.grade === null && (
                <Link
                  href={`/teacher/submissions/${s.id}`}
                  className="inline-block mt-3 px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Review
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className="border rounded p-4 bg-gray-50 text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-gray-600">{title}</p>
    </div>
  );
}
