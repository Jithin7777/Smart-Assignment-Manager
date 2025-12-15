// lib/types.ts
export type UserRole = "TEACHER" | "STUDENT";

// Optional: You can also add these if needed
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}