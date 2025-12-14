"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AssignmentItem } from "@/features/assignments/types";
import CreateAssignmentForm from "@/features/assignments/components/CreateAssignmentForm";

export default function EditAssignmentPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [assignment, setAssignment] = useState<AssignmentItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/assignments/${id}`)
      .then((res) => res.json())
      .then((data) => setAssignment(data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async (data: { title: string; description: string }) => {
    const res = await fetch(`/api/assignments/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      alert("Update failed");
      return;
    }

    router.push("/teacher/assignments");
  };

  if (loading) return <div className="p-6">Loading…</div>;
  if (!assignment) return <div className="p-6">Not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Assignment</h1>

      <CreateAssignmentForm initialData={assignment} onSubmit={handleUpdate} />
    </div>
  );
}
