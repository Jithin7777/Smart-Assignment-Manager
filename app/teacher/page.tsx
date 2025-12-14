// app/teacher/page.tsx
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

  // Fetch dashboard stats
  const [assignments, submissions] = await Promise.all([
    prisma.assignment.findMany({ where: { teacherId }, select: { id: true, title: true } }),
    prisma.submission.findMany({
      where: { assignment: { teacherId } },
      include: { student: true, assignment: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const totalAssignments = assignments.length;
  const pendingReviews = submissions.filter((s) => s.grade === null).length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
        <LogoutButton />
      </div>

      <p className="text-lg mb-4">
        Welcome, <span className="font-semibold">{session.user.name}</span>
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-blue-100 border border-blue-300 rounded-xl shadow">
          <p className="text-xl font-bold">{totalAssignments}</p>
          <p className="text-gray-700">Assignments</p>
        </div>

        <div className="p-4 bg-green-100 border border-green-300 rounded-xl shadow">
          <p className="text-xl font-bold">{submissions.length}</p>
          <p className="text-gray-700">Recent Submissions</p>
        </div>

        <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-xl shadow">
          <p className="text-xl font-bold">{pendingReviews}</p>
          <p className="text-gray-700">Pending Reviews</p>
        </div>
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

      {/* Recent Submissions */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Recent Submissions</h2>
        {submissions.length === 0 ? (
          <p className="text-gray-600">No submissions yet.</p>
        ) : (
          <div className="space-y-3">
            {submissions.map((s) => (
              <div key={s.id} className="p-4 border rounded bg-white shadow">
                <p className="font-medium">
                  {s.student.name} submitted <b>{s.assignment.title}</b>
                </p>
                <p className="text-gray-600 text-sm">
                  {new Date(s.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
