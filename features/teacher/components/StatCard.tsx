import React from "react";

export function StatCard({
  title,
  value,
  icon,
  color,
  showAlert = false,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "blue" | "purple" | "amber" | "green";
  showAlert?: boolean;
}) {
  const colors = {
    blue: "bg-blue-50 border-blue-200 text-blue-600",
    purple: "bg-purple-50 border-purple-200 text-purple-600",
    amber: "bg-amber-50 border-amber-200 text-amber-600",
    green: "bg-green-50 border-green-200 text-green-600",
  };

  return (
    <div className={`border rounded-xl p-4 ${colors[color]}`}>
      <div className="flex justify-between">
        {icon}
        {showAlert && <span className="w-2 h-2 bg-red-500 rounded-full" />}
      </div>
      <p className="text-2xl font-bold text-slate-900 mt-3">{value}</p>
      <p className="text-sm text-slate-600">{title}</p>
    </div>
  );
}
