// app/student/page.tsx
import { auth } from "@/auth";
import { getAllAssignments } from "@/features/assignments/service";
import LogoutButton from "@/features/components/auth/LogoutButton";
import Link from "next/link";

export default async function StudentPage() {
  const session = await auth();

  if (!session) {
    return <p className="p-6">You are not logged in.</p>;
  }

  const assignments = await getAllAssignments();

  const submittedCount = assignments.filter((a) =>
    a.submissions.some((s) => s.studentId === session.user.id)
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
        Welcome, <span className="font-semibold">{session.user.name}</span>
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat title="Assigned Tasks" value={assignments.length} />
        <Stat title="Submitted" value={submittedCount} />
        <Stat title="Pending" value={pendingCount} />
      </div>

      {/* Assignments */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">All Assignments</h2>

        {assignments.length === 0 ? (
          <p className="text-gray-500">No assignments available.</p>
        ) : (
          <ul className="space-y-4">
            {assignments.map((assignment) => {
              const mySubmission = assignment.submissions.find(
                (s) => s.studentId === session.user.id
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

                      {/* Status */}
                      <p className="mt-2 font-semibold">
                        {!mySubmission && (
                          <span className="text-red-600">Pending</span>
                        )}

                        {mySubmission && mySubmission.grade === null && (
                          <span className="text-yellow-600">
                            Submitted (Waiting for grading)
                          </span>
                        )}

                        {mySubmission && mySubmission.grade !== null && (
                          <span className="text-green-600">
                            Graded — {mySubmission.grade}
                          </span>
                        )}
                      </p>

                      {/* Feedback */}
                      {/* {mySubmission?.feedback && (
                        <p className="mt-2 text-sm text-gray-700">
                          <b>Teacher Feedback:</b>{" "}
                          {mySubmission.feedback}
                        </p>
                      )} */}
                    </div>
                    

                    {/* Action */}
                    {!mySubmission ? (
                      <Link
                        href={`/student/assignments/${assignment.id}`}
                        className="text-blue-600 underline text-sm"
                      >
                        View & Submit
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-400">
                        Submission locked
                      </span>
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

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className="p-4 border rounded-lg bg-gray-50 text-center shadow">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-gray-600">{title}</p>
    </div>
  );
}
