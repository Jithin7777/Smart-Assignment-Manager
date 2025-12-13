"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubmitAssignmentForm({
  assignmentId,
}: {
  assignmentId: string;
}) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!content.trim()) return alert("Content required");

    setLoading(true);

    const res = await fetch("/api/student/submissions", {
      method: "POST",
      body: JSON.stringify({ assignmentId, content }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Submission failed");
      return;
    }

    router.refresh();
  };

  return (
    <div className="border p-4 rounded">
      <textarea
        className="w-full border p-2 rounded"
        rows={5}
        placeholder="Enter your submission..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
