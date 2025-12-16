export interface Student {
  id?: string;
  name: string;
}

export interface Assignment {
  id: string;
  title: string;
}

export interface Submission {
  id: string;
  content: string;
  grade: number | null;
  // feedback: string | null;
  createdAt: Date;
  student: Student;
  assignment: Assignment;
}
