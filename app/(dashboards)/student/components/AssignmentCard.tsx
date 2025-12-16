import Link from "next/link";
import {
  Clock,
  FileText,
  CheckCircle,
  Calendar,
  ChevronRight,
  Eye,
  Upload,
  Mail,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Submission {
  studentId: string;
  grade: number | null;
  createdAt: string;
}

interface Teacher {
  id: string;
  name: string;
  email?: string;
  image?: string;
}

interface AssignmentCardProps {
  assignment: {
    id: string;
    title: string;
    description: string;
    submissions: Submission[];
    teacher?: Teacher;
  };
  studentId: string;
}

export default function AssignmentCard({
  assignment,
  studentId,
}: AssignmentCardProps) {
  const mySubmission = assignment.submissions.find(
    (s) => s.studentId === studentId
  );

  const getAvatarInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // avatar color based on teacher ID
  const getAvatarColor = (id: string) => {
    const colors = [
      "bg-blue-500 text-white",
      "bg-green-500 text-white",
      "bg-purple-500 text-white",
      "bg-rose-500 text-white",
      "bg-indigo-500 text-white",
    ];
    const index =
      id?.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      colors.length;
    return colors[index];
  };

  const teacherInitials = assignment.teacher?.name
    ? getAvatarInitials(assignment.teacher.name)
    : "T";
  const avatarColor = assignment.teacher?.id
    ? getAvatarColor(assignment.teacher.id)
    : "bg-gray-500 text-white";

  return (
    <div className="group p-6 hover:bg-slate-50/50 transition-colors border-b">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        <div className="flex-1">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                <AvatarImage
                  src={assignment.teacher?.image}
                  alt={assignment.teacher?.name}
                />
                <AvatarFallback className={`${avatarColor} font-semibold`}>
                  {teacherInitials}
                </AvatarFallback>
              </Avatar>

              {/* Status Indicator */}
              <div
                className={`p-2 rounded-full ${
                  !mySubmission
                    ? "bg-red-100 text-red-600"
                    : mySubmission?.grade === null
                    ? "bg-amber-100 text-amber-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {!mySubmission ? (
                  <Clock className="w-4 h-4" />
                ) : mySubmission?.grade === null ? (
                  <FileText className="w-4 h-4" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
              </div>
            </div>

            {/* Assignment Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {assignment.title}
                </h3>
                <Badge
                  variant={
                    !mySubmission
                      ? "destructive"
                      : mySubmission?.grade === null
                      ? "outline"
                      : "default"
                  }
                  className="font-medium"
                >
                  {!mySubmission
                    ? "Pending"
                    : mySubmission?.grade === null
                    ? "Under Review"
                    : `Graded: ${mySubmission.grade}%`}
                </Badge>
              </div>

              <p className="text-slate-600 mb-4 line-clamp-2">
                {assignment.description}
              </p>

              {/* Teacher & Submission Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={assignment.teacher?.image}
                        alt={assignment.teacher?.name}
                      />
                      <AvatarFallback className={`${avatarColor} text-xs`}>
                        {assignment.teacher?.name?.charAt(0) || "T"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-slate-700">
                      {assignment.teacher?.name || "Instructor"}
                    </span>
                  </div>
                  {assignment.teacher?.email && (
                    <a
                      href={`mailto:${assignment.teacher.email}`}
                      className="text-blue-500 hover:text-blue-600 hover:underline ml-1"
                      title="Email instructor"
                    >
                      <Mail className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {mySubmission && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Submitted:{" "}
                      {new Date(mySubmission.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="lg:w-48 flex flex-col gap-3">
          {!mySubmission ? (
            <Button
              asChild
              className="gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <Link href={`/student/assignments/${assignment.id}`}>
                <Upload className="w-4 h-4" />
                Start Assignment
              </Link>
            </Button>
          ) : (
            <div className="space-y-3">
              <Button variant="outline" asChild className="w-full gap-2">
                <Link href={`/student/assignments/${assignment.id}`}>
                  <Eye className="w-4 h-4" />
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
              {mySubmission.grade !== null && (
                <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">
                    {mySubmission.grade}%
                  </div>
                  <div className="text-xs text-green-600">Final Grade</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
