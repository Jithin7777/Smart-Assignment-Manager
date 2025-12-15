import { FileText } from "lucide-react";

export function EmptyState() {
  return (
    <div className="text-center py-8">
      <FileText className="mx-auto text-slate-400" />
      <p className="mt-2 text-slate-600">No submissions yet</p>
    </div>
  );
}
