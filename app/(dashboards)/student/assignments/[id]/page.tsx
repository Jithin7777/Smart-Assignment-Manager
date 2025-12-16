import { auth } from "@/auth";
import { getAssignmentById } from "@/features/assignments/service";
import SubmitAssignmentForm from "@/features/submissions/components/SubmitAssignmentForm";
import { CheckCircle, Mail, Calendar, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function StudentAssignmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth();
  if (!session)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Please log in to view this assignment.</p>
      </div>
    );

  const assignment = await getAssignmentById(id);
  if (!assignment)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Assignment not found.</p>
      </div>
    );

  const existingSubmission = assignment.submissions?.find(
    (s) => s.studentId === session.user.id
  );

  const getAvatarInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (id: string) => {
    const colors = [
      "bg-blue-500 text-white",
      "bg-green-500 text-white",
      "bg-purple-500 text-white",
      // 'bg-amber-500 text-white',
      "bg-rose-500 text-white",
      "bg-indigo-500 text-white",
    ];
    const index =
      id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      colors.length;
    return colors[index];
  };

  const avatarColor = getAvatarColor(assignment.teacher.id);
  const teacherInitials = getAvatarInitials(
    assignment.teacher.name || "Teacher"
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className={`${avatarColor} font-semibold`}>
                  {teacherInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{assignment.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <User className="h-4 w-4" />
                  {assignment.teacher.name}
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="h-fit">
              {existingSubmission ? "Submitted" : "Pending"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{assignment.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {existingSubmission ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                Your Submission
              </>
            ) : (
              "Submit Assignment"
            )}
          </CardTitle>
          <CardDescription>
            {existingSubmission
              ? "You have already submitted this assignment"
              : "Submit your work below"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {existingSubmission ? (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-gray-800 whitespace-pre-wrap">
                  {existingSubmission.content}
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Submitted:{" "}
                    {new Date(existingSubmission.createdAt).toLocaleString()}
                  </span>
                </div>
                {existingSubmission.grade && (
                  <Badge variant="secondary" className="ml-4">
                    Grade: {existingSubmission.grade}%
                  </Badge>
                )}
              </div>
            </div>
          ) : (
            <SubmitAssignmentForm assignmentId={assignment.id} />
          )}
        </CardContent>
      </Card>

      {/* Teacher Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Instructor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className={`${avatarColor} text-xl font-bold`}>
                {teacherInitials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">
                {assignment.teacher.name}
              </h3>

              {assignment.teacher.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">
                    {assignment.teacher.email}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="ml-2 h-6 px-2"
                    asChild
                  >
                    <a href={`mailto:${assignment.teacher.email}`}></a>
                  </Button>
                </div>
              )}

              <div className="pt-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Assignment created:{" "}
                    {new Date(assignment.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
