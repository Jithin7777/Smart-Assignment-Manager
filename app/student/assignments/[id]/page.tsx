// app/student/assignments/[id]/page.tsx
import { auth } from "@/auth";
import { getAssignmentById } from "@/services/assignment.service";
import SubmitAssignmentForm from "@/components/student/SubmitAssignmentForm";

export default async function StudentAssignmentPage({
  params,
}: {
  params: Promise<{ id: string }>; // Note: params is now a Promise
}) {
  // Await the params Promise first
  const { id } = await params;
  
  const session = await auth();
  if (!session) return <p>You are not logged in.</p>;

  // Now use the unwrapped id
  const assignment = await getAssignmentById(id);
  if (!assignment) return <p>Assignment not found</p>;

  const existingSubmission = assignment.submissions?.find(
    (s) => s.studentId === session.user.id
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">{assignment.title}</h1>

      <p className="mt-2 text-gray-700">{assignment.description}</p>

      <p className="mt-2 text-sm text-gray-500">
        Teacher: {assignment.teacher.name}
      </p>

      <div className="mt-6">
       {existingSubmission ? (
  <div className="p-4 bg-green-50 rounded-lg">
    <p className="font-semibold text-green-700">Submitted Answer:</p>
    <p className="mt-2 text-gray-800">{existingSubmission.content}</p>
  </div>
) : (
  <SubmitAssignmentForm assignmentId={assignment.id} />
)}

      </div>
    </div>
  );
}