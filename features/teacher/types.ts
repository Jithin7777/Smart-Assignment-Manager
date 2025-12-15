export type Submission = {
  id: string;
  content: string;
  grade: number | null;
  createdAt: string;
  student: {
    name: string;
  };
  assignment: {
    title: string;
  };
};
