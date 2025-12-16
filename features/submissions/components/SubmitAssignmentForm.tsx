"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

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

    try {
      const res = await fetch("/api/student/submissions", {
        method: "POST",
        body: JSON.stringify({ assignmentId, content }),
      });

      if (!res.ok) {
        alert("Submission failed");
        return;
      }

      router.refresh();
      setContent("");
      alert("Submitted successfully!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Submit Assignment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter your submission..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
          className="min-h-[150px]"
        />
        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={loading || !content.trim()}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
