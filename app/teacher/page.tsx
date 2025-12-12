import { auth } from "@/auth";
import LogoutButton from "@/components/auth/LogoutButton";

export default async function TeacherPage() {
  const session = await auth();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Teacher Dashboard</h1>

      {session ? (
        <div>
          <p>Welcome, {session.user?.name}!</p>
          <p>Your role: {session.user?.role}</p>
          <p>Email: {session.user?.email}</p>

          <LogoutButton />
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}
