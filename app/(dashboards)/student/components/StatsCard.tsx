import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: number | string;
  description?: string;
  colorFrom: string;
  colorTo: string;
}

export default function StatsCard({ icon: Icon, title, value, description, colorFrom, colorTo }: StatsCardProps) {
  return (
    <div className={`bg-gradient-to-br ${colorFrom} ${colorTo} border border-transparent rounded-2xl p-6 shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-white rounded-lg shadow-xs">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
      </div>
      <div className="text-3xl font-bold text-slate-800 mb-2">{value}</div>
      <div className="text-sm font-medium text-slate-700">{title}</div>
      {description && <div className="text-xs text-slate-500 mt-2">{description}</div>}
    </div>
  );
}
