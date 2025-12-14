"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Submission } from "@/features/submissions/types";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ReviewSubmission({ params }: Props) {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [submissionId, setSubmissionId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    // Unwrap the params promise
    async function getParams() {
      const unwrappedParams = await params;
      setSubmissionId(unwrappedParams.id);
    }
    getParams();
  }, [params]);

  useEffect(() => {
    async function fetchSubmission() {
      if (!submissionId) return;
      
      try {
        const res = await fetch(`/api/student/submissions/${submissionId}`);
        if (!res.ok) throw new Error("Failed to fetch submission");
        const data = await res.json();
        setSubmission(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSubmission();
  }, [submissionId]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/student/submissions/${submissionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grade, feedback }),
      });

      if (!res.ok) throw new Error("Failed to update submission");

      router.push("/teacher");
      router.refresh();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (!submission) return <p className="p-6">Loading submission...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Review Submission</h1>

      <p><strong>Student:</strong> {submission.student.name}</p>
      <p><strong>Assignment:</strong> {submission.assignment.title}</p>
      
      <p className="mt-4"><strong>Answer:</strong></p>
      <p className="p-4 bg-gray-100 rounded">{submission.content}</p>

      <div className="mt-6 space-y-3">
        <input
          type="text"
          placeholder="Grade (e.g. 90/100)"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
}