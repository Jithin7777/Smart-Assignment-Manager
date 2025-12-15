import Link from "next/link";
import { Clock, FileText, CheckCircle, User, Calendar, ChevronRight, Eye, Upload } from "lucide-react";

interface Submission {
  studentId: string;
  grade: number | null;
  createdAt: string;
}

interface Teacher {
  name: string;
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

export default function AssignmentCard({ assignment, studentId }: AssignmentCardProps) {
  const mySubmission = assignment.submissions.find(s => s.studentId === studentId);

  return (
    <div className="p-6 hover:bg-slate-50/50 transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        <div className="flex-1">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${
              !mySubmission ? 'bg-gradient-to-br from-red-50 to-red-100 border border-red-200' :
              mySubmission?.grade === null ? 'bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200' :
              'bg-gradient-to-br from-green-50 to-green-100 border border-green-200'
            }`}>
              {!mySubmission ? <Clock className="w-6 h-6 text-red-500" /> :
               mySubmission?.grade === null ? <FileText className="w-6 h-6 text-amber-500" /> :
               <CheckCircle className="w-6 h-6 text-green-500" />}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h3 className="text-lg font-semibold text-slate-800">{assignment.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  !mySubmission ? 'bg-red-100 text-red-800' :
                  mySubmission?.grade === null ? 'bg-amber-100 text-amber-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {!mySubmission ? 'Pending Submission' : 
                   mySubmission?.grade === null ? 'Under Review' : 
                   `Graded: ${mySubmission.grade}%`}
                </span>
              </div>

              <p className="text-slate-600 mb-4">{assignment.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Instructor: {assignment.teacher?.name}</span>
                </div>
                {mySubmission && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Submitted: {new Date(mySubmission.createdAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-48 flex flex-col gap-3">
          {!mySubmission ? (
            <Link
              href={`/student/assignments/${assignment.id}`}
              className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium shadow-sm hover:shadow-md"
            >
              <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Start Assignment
            </Link>
          ) : (
            <div className="space-y-3">
              <Link
                href={`/student/assignments/${assignment.id}`}
                className="group inline-flex items-center justify-center gap-2 border border-blue-200 text-blue-600 px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors font-medium"
              >
                <Eye className="w-4 h-4" />
                View Details
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              {mySubmission.grade !== null && (
                <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                  <div className="text-2xl font-bold text-green-700">{mySubmission.grade}%</div>
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
