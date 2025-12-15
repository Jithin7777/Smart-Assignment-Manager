import { auth } from "@/auth";
import { getAllAssignments } from "@/features/assignments/service";
import Header from "./components/Header";
import NotLoggedIn from "./components/NotLoggedIn";
import ProgressOverview from "./components/ProgressOverview";
import StatsCard from "./components/StatsCard";
import AssignmentCard from "./components/AssignmentCard";
import Footer from "./components/Footer";
import { BookOpen, CheckCircle, Clock } from "lucide-react";

export default async function StudentPage() {
  const session = await auth();

  if (!session) return <NotLoggedIn />;

  //  Fetch assignments
  const assignmentsRaw = await getAllAssignments();

  //  Convert all Date fields to strings
  const assignments = assignmentsRaw.map((a) => ({
    ...a,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
    submissions: a.submissions.map((s) => ({
      ...s,
      createdAt: s.createdAt.toISOString(),
    })),
  }));

  //  Calculate submitted / pending / graded counts
  const submittedAssignments = assignments.filter((a) =>
    a.submissions.some((s) => s.studentId === session.user.id)
  );

  const gradedAssignments = submittedAssignments.filter((a) =>
    a.submissions.some(
      (s) => s.studentId === session.user.id && s.grade !== null
    )
  );

  const submittedCount = submittedAssignments.length;
  const pendingCount = assignments.length - submittedCount;
  const gradedCount = gradedAssignments.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header user={session.user} />
        <ProgressOverview
          total={assignments.length}
          submitted={submittedCount}
          pending={pendingCount}
          graded={gradedCount}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            icon={BookOpen}
            title="Active Assignments"
            value={assignments.length}
            description="Currently assigned by teachers"
            colorFrom="from-blue-50"
            colorTo="to-blue-100"
          />
          <StatsCard
            icon={CheckCircle}
            title="Completed Work"
            value={submittedCount}
            description="Successfully submitted"
            colorFrom="from-green-50"
            colorTo="to-green-100"
          />
          <StatsCard
            icon={Clock}
            title="Pending Tasks"
            value={pendingCount}
            description="Awaiting your submission"
            colorFrom="from-amber-50"
            colorTo="to-amber-100"
          />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {assignments.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                No Assignments Yet
              </h3>
              <p className="text-slate-500 max-w-md mx-auto">
                You don&apos;t have any assigned work at the moment.
              </p>
            </div>
          ) : (
            assignments.map((a) => (
              <AssignmentCard
                key={a.id}
                assignment={a}
                studentId={session.user.id}
              />
            ))
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
