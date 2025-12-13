// app/student/page.tsx
import { auth } from "@/auth";
import LogoutButton from "@/components/auth/LogoutButton";
import { getAllAssignments } from "@/services/assignment.service";
import { AssignmentItem } from "@/types/assignment";
import Link from "next/link";

export default async function StudentPage() {
  const session = await auth();

  if (!session) {
    return <p className="p-6">You are not logged in.</p>;
  }

  // Fetch all assignments (global)
  const assignments: AssignmentItem[] = await getAllAssignments();

  // Calculate submitted & pending
  const submittedCount = assignments.filter((assignment) =>
    assignment.submissions?.some(
      (submission) => submission.studentId === session.user.id
    )
  ).length;

  const pendingCount = assignments.length - submittedCount;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <LogoutButton />
      </div>

      {/* Welcome */}
      <p className="text-lg mb-6">
        Welcome,{" "}
        <span className="font-semibold">{session.user.name}</span>
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-purple-100 border border-purple-300 rounded-xl shadow">
          <p className="text-2xl font-bold">{assignments.length}</p>
          <p className="text-gray-700">Assigned Tasks</p>
        </div>

        <div className="p-4 bg-blue-100 border border-blue-300 rounded-xl shadow">
          <p className="text-2xl font-bold">{submittedCount}</p>
          <p className="text-gray-700">Submitted</p>
        </div>

        <div className="p-4 bg-red-100 border border-red-300 rounded-xl shadow">
          <p className="text-2xl font-bold">{pendingCount}</p>
          <p className="text-gray-700">Pending</p>
        </div>
      </div>

      {/* Assignment List */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">
          All Assignments
        </h2>

        {assignments.length === 0 ? (
          <p className="text-gray-500">No assignments available.</p>
        ) : (
          <ul className="space-y-4">
            {assignments.map((assignment) => {
              const isSubmitted = assignment.submissions?.some(
                (submission) =>
                  submission.studentId === session.user.id
              );

              return (
                <li
                  key={assignment.id}
                  className="p-4 border rounded-lg bg-white shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold">
                        {assignment.title}
                      </h3>

                      <p className="text-gray-600 mt-1">
                        {assignment.description}
                      </p>

                      <p className="text-sm text-gray-500 mt-2">
                        Teacher: {assignment.teacher?.name}
                      </p>

                      <p
                        className={`mt-2 font-semibold ${
                          isSubmitted
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {isSubmitted ? "Submitted" : "Pending"}
                      </p>
                    </div>

                    {!isSubmitted && (
                      <Link
                        href={`/student/assignments/${assignment.id}`}
                        className="text-blue-600 underline text-sm"
                      >
                        View & Submit
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
