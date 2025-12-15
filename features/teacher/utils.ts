import { Submission } from "./types";

export function calculateDashboardStats(submissions: Submission[]) {
  const pendingReviews = submissions.filter(s => s.grade === null).length;

  const graded = submissions.filter(s => s.grade !== null);
  const gradedCount = graded.length;

  const averageGrade =
    gradedCount > 0
      ? Math.round(
          graded.reduce((acc, s) => acc + (s.grade ?? 0), 0) / gradedCount
        )
      : 0;

  return {
    pendingReviews,
    averageGrade,
  };
}
