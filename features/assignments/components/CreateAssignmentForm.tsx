"use client";

import { useState } from "react";
import { AssignmentItem } from "@/features/assignments/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, FileText } from "lucide-react";

interface Props {
  initialData?: AssignmentItem | null;
  onSubmit: (data: { title: string; description: string }) => Promise<void>;
}

export default function CreateAssignmentForm({ initialData, onSubmit }: Props) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit({ title, description });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl md:text-2xl">
                  {initialData ? "Edit Assignment" : "Create New Assignment"}
                </CardTitle>
                <CardDescription>
                  {initialData
                    ? "Update the assignment details below"
                    : "Fill in the details to create a new assignment for your students"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Assignment Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Enter assignment title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="text-base h-12"
                  disabled={loading}
                />
                <p className="text-xs text-slate-500">
                  Choose a clear, descriptive title for your assignment
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed instructions for students..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="min-h-[150px] resize-y text-base"
                  disabled={loading}
                />
                <p className="text-xs text-slate-500">
                  Include all necessary instructions, requirements, and
                  evaluation criteria
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Due Date Field (optional) */}
                <div className="space-y-2">
                  <Label htmlFor="dueDate" className="text-sm font-medium">
                    Due Date (Optional)
                  </Label>
                  <Input
                    id="dueDate"
                    type="datetime-local"
                    className="h-12"
                    disabled={true} // Temporarily disabled
                  />
                  <p className="text-xs text-slate-500">
                    Set a deadline for submissions
                  </p>
                </div>

                {/* Points Field (optional) */}
                <div className="space-y-2">
                  <Label htmlFor="points" className="text-sm font-medium">
                    Total Points (Optional)
                  </Label>
                  <Input
                    id="points"
                    type="number"
                    placeholder="100"
                    className="h-12"
                    disabled={true} // Temporarily disabled
                  />
                  <p className="text-xs text-slate-500">
                    Maximum score for this assignment
                  </p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between pt-6 border-t">
              <div className="text-sm text-slate-500">
                <p>
                  All fields marked with <span className="text-red-500">*</span>{" "}
                  are required
                </p>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 sm:flex-none"
                  disabled={loading}
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading || !title.trim() || !description.trim()}
                  className="flex-1 sm:flex-none"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {initialData ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      {initialData ? "Update Assignment" : "Create Assignment"}
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
