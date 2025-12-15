

// import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       name: string;
//       email: string;
//       role: "TEACHER" | "STUDENT";
//     };
//   }

//   interface User {
//     id: string;
//     role: "TEACHER" | "STUDENT";
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     role: "TEACHER" | "STUDENT";
//   }
// }




// types/next-auth.d.ts
import "next-auth";
import { UserRole } from "../lib/types"; // Import from lib/types

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
  }
}