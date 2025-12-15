import { Calendar, GraduationCap, User } from "lucide-react";
import LogoutButton from "@/features/components/auth/LogoutButton";

interface HeaderProps {
  user: { name: string; id?: string };
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Student Portal</h1>
              <div className="flex items-center gap-2 text-slate-600 mt-1">
                <User className="w-4 h-4" />
                <span className="text-sm md:text-base">{user.name}</span>
                <span className="hidden md:inline">• Student ID: {user.id?.slice(0, 8)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block px-4 py-3 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
