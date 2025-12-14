'use client'
import CreateAssignmentForm from "@/features/assignments/components/CreateAssignmentForm";
import { useRouter } from "next/navigation";

export default function NewAssignmentPage() {
  const router = useRouter();

  const handleCreate = async (data: { title: string; description: string }) => {
    const res = await fetch("/api/assignments", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      alert("Failed to create assignment");
      return;
    }

    router.push("/teacher/assignments");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Assignment</h1>

      <CreateAssignmentForm initialData={null} onSubmit={handleCreate} />
    </div>
  );
}
