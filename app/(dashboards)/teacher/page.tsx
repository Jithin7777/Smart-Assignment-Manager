export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import LogoutButton from "@/features/components/auth/LogoutButton";
import { getTeacherDashboardData } from "@/features/teacher/service";
import { calculateDashboardStats } from "@/features/teacher/utils";
import { StatCard } from "@/features/teacher/components/StatCard";
import { SubmissionList } from "@/features/teacher/components/SubmissionList";
import { ActionCard } from "@/features/teacher/components/ActionCard";
import { DashboardHeader } from "@/features/teacher/components/DashboardHeader";
import { FolderOpen, FileText, Clock, Star } from "lucide-react";

export default async function TeacherDashboard() {
  const session = await auth();
  if (!session) return <p>Not logged in</p>;

  const { assignments, submissions } = await getTeacherDashboardData(
    session.user.id
  );

  const { pendingReviews, averageGrade } = calculateDashboardStats(submissions);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <DashboardHeader name={session.user.name!} />
          <LogoutButton />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Assignments"
            value={assignments.length}
            icon={<FolderOpen className="w-5 h-5" />}
            color="blue"
          />
          <StatCard
            title="Submissions"
            value={submissions.length}
            icon={<FileText className="w-5 h-5" />}
            color="purple"
          />
          <StatCard
            title="Pending"
            value={pendingReviews}
            icon={<Clock className="w-5 h-5" />}
            color="amber"
            showAlert={pendingReviews > 0}
          />
          <StatCard
            title="Avg Grade"
            value={`${averageGrade}%`}
            icon={<Star className="w-5 h-5" />}
            color="green"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActionCard
            title="Create Assignment"
            description="Publish a new task"
            icon={<FileText />}
            href="/teacher/assignments/new"
            primary
          />
          <ActionCard
            title="Manage Assignments"
            description="View all assignments"
            icon={<FolderOpen />}
            href="/teacher/assignments"
          />
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Submissions</h2>

          <SubmissionList submissions={submissions} />
        </div>
      </div>
    </div>
  );
}
