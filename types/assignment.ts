// // types/assignment.ts
// export type AssignmentItem = {
//   id: string;
//   title: string;
//   description: string;
// };



// types/assignment.ts

  export type Teacher = {
    id: string;
    name: string;
  };

  export type SubmissionItem = {
    id: string;
    content: string;
    studentId: string;
    grade?: number | null;
    createdAt: Date;
    updatedAt:Date;
  };

  export type AssignmentItem = {
    id: string;
    title: string;
    description: string;
    teacherId: string;
    teacher?: Teacher;               // Optional, included if you fetch with teacher
    submissions?: SubmissionItem[];  // Optional, included if you fetch submissions
    createdAt: Date;
    updatedAt: Date;
  };
