import { FileText, Calendar, User } from "lucide-react";

export function DashboardHeader({ name }: { name: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-600 rounded-lg">
          <FileText className="w-5 h-5 text-white" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Teacher Dashboard
          </h1>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <User className="w-4 h-4" />
            <span>{name}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Calendar className="w-4 h-4" />
        <span>
          {new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}
