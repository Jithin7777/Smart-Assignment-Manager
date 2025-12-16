import Link from "next/link";
import { Eye, Clock, CheckCircle } from "lucide-react";
import { Submission } from "../types";

export function SubmissionList({ submissions }: { submissions: Submission[] }) {
  return (
    <div className="space-y-4">
      {submissions.map((s) => {
        const isPending = s.grade === null;

        return (
          <div
            key={s.id}
            className="border p-4 rounded-lg flex justify-between items-start"
          >
            <div>
              <p className="font-medium">
                {s.student.name} → {s.assignment.title}
              </p>

              <p className="text-sm text-slate-600 line-clamp-2">{s.content}</p>

              <div className="mt-2 text-sm">
                {isPending ? (
                  <span className="text-amber-600 flex items-center gap-1">
                    <Clock size={14} />
                    Pending Review
                  </span>
                ) : (
                  <span className="text-green-600 flex items-center gap-1 font-medium">
                    <CheckCircle size={14} />
                    Grade: {s.grade}%
                  </span>
                )}
                <p className="text-xs text-slate-500 mt-1">
                  {new Date(s.createdAt).toLocaleDateString("en-IN")}
                </p>
              </div>
            </div>

            <Link
              href={`/teacher/submissions/${s.id}`}
              className="text-blue-600 text-sm flex items-center gap-1"
            >
              <Eye size={14} />
              {isPending ? "Review" : "View"}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
