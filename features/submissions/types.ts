// features/submissions/types.ts

export interface Student {
  id: string;
  name: string;
}

export interface Assignment {
  id: string;
  title: string;
}

export interface Submission {
  id: string;
  content: string;
  grade: string | null;
  feedback: string | null;
  createdAt: string;
  student: Student;
  assignment: Assignment;
}
