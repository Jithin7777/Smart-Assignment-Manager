interface ProgressOverviewProps {
  total: number;
  submitted: number;
  pending: number;
  graded: number;
}

export default function ProgressOverview({ total, submitted, pending, graded }: ProgressOverviewProps) {
  const completion = total > 0 ? Math.round((submitted / total) * 100) : 0;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800">Learning Progress</h2>
        <span className="text-sm text-slate-500">{completion}% complete</span>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Assignment Completion</span>
            <span className="text-sm font-bold text-blue-600">{submitted}/{total}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-slate-800 mb-1">{total}</div>
            <div className="text-xs text-slate-500">Total Assigned</div>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-green-600 mb-1">{submitted}</div>
            <div className="text-xs text-slate-500">Submitted</div>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-amber-600 mb-1">{pending}</div>
            <div className="text-xs text-slate-500">Pending</div>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-purple-600 mb-1">{graded}</div>
            <div className="text-xs text-slate-500">Graded</div>
          </div>
        </div>
      </div>
    </div>
  );
}
