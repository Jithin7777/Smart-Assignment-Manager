import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function NotLoggedIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="text-center p-8">
        <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Access Required</h2>
        <p className="text-slate-600 mb-6">Please login to continue to your dashboard</p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium shadow-sm hover:shadow-md"
        >
          Sign In to Continue
        </Link>
      </div>
    </div>
  );
}
