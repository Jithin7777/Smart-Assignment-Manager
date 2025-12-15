export default function Footer() {
  return (
    <div className="mt-8 text-center">
      <div className="inline-flex items-center gap-6 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span>Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
          <span>Submitted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Graded</span>
        </div>
      </div>
      <p className="text-sm text-slate-400 mt-4">
        © {new Date().getFullYear()} Student Portal • All academic work is confidential
      </p>
    </div>
  );
}
