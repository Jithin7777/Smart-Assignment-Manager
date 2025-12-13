import { auth } from "@/auth";
import LogoutButton from "@/components/auth/LogoutButton";

export default async function StudentPage() {
  const session = await auth();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <LogoutButton />
      </div>

      {session ? (
        <div>
          <p className="text-lg mb-4">
            Welcome, <span className="font-semibold">{session.user?.name}</span>
          </p>

          {/* Dashboard Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-purple-100 border border-purple-300 rounded-xl shadow">
              <p className="text-xl font-bold">5</p>
              <p className="text-gray-700">Assigned Tasks</p>
            </div>

            <div className="p-4 bg-blue-100 border border-blue-300 rounded-xl shadow">
              <p className="text-xl font-bold">3</p>
              <p className="text-gray-700">Submitted</p>
            </div>

            <div className="p-4 bg-red-100 border border-red-300 rounded-xl shadow">
              <p className="text-xl font-bold">2</p>
              <p className="text-gray-700">Pending</p>
            </div>
          </div>

          {/* Future Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">My Recent Submissions</h2>
            <p className="text-gray-600">Coming soon…</p>
          </div>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}
