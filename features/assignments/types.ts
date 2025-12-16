export type Teacher = {
  id: string;
  name: string;
  email?: string;
};

export type SubmissionItem = {
  id: string;
  content: string;
  studentId: string;
  grade?: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export type AssignmentItem = {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  teacher?: Teacher;
  submissions?: SubmissionItem[];
  createdAt: Date;
  updatedAt: Date;
};
