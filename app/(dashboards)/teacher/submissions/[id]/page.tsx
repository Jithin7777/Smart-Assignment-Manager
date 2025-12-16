"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Submission } from "@/features/submissions/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, User, FileText, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ReviewSubmission({ params }: Props) {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [submissionId, setSubmissionId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function getParams() {
      try {
        const unwrappedParams = await params;
        setSubmissionId(unwrappedParams.id);
      } catch (err) {
        setError("Failed to load submission parameters");
      }
    }
    getParams();
  }, [params]);

  useEffect(() => {
    async function fetchSubmission() {
      if (!submissionId) return;

      setLoading(true);
      try {
        const res = await fetch(`/api/student/submissions/${submissionId}`);
        if (!res.ok) throw new Error("Failed to fetch submission");
        const data = await res.json();
        setSubmission(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Unable to load submission. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchSubmission();
  }, [submissionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

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
      setError("Failed to save review. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    router.push("/teacher");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading submission...</p>
        </div>
      </div>
    );
  }

  if (error && !submission) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={handleGoBack} variant="outline" className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Teacher Dashboard
        </Button>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Alert>
          <AlertDescription>No submission found.</AlertDescription>
        </Alert>
        <Button onClick={handleGoBack} variant="outline" className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Teacher Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Review Submission</h1>
          <p className="text-muted-foreground">
            Evaluate student work and provide feedback
          </p>
        </div>
        <Button onClick={handleGoBack} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submission Information Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Submission Details</CardTitle>
            <CardDescription>Student and assignment information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Student</span>
              </div>
              <p className="text-lg font-semibold">{submission.student.name}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Assignment</span>
              </div>
              <p className="text-lg font-semibold">{submission.assignment.title}</p>
              {/* <p className="text-sm text-muted-foreground">
                Submitted on: {new Date(submission.submittedAt).toLocaleDateString()}
              </p> */}
            </div>

            {submission.grade && (
              <>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="current-grade">Current Grade</Label>
                  <Input
                    id="current-grade"
                    value={submission.grade}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Review Form Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Student&apos;s Answer</CardTitle>
            <CardDescription>Review the submission content below</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted rounded-lg border min-h-[200px]">
              <p className="whitespace-pre-wrap">{submission.content}</p>
            </div>

            <Separator className="my-6" />

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Input
                    id="grade"
                    placeholder="Enter grade (e.g., 90/100, A, 4.0)"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Provide a grade that reflects the student&apos;s performance
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Provide constructive feedback to help the student improve..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[150px]"
                  />
                  <p className="text-sm text-muted-foreground">
                    Aim for specific, actionable feedback that highlights strengths and areas for improvement
                  </p>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="sm:flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving Review...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoBack}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}