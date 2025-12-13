// import  { DefaultSession, DefaultUser } from "next-auth";
// import "next-auth";
// import { Role } from "@prisma/client"; 
// declare module "next-auth" {
//   interface Session {
//     user: {
//       role?: string; // add your role type here
//     } & DefaultSession["user"];
//   }

//   interface User extends DefaultUser {
//     role?: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     role?: string;
//   }
// }

// declare module "next-auth" {
//   interface User {
//     role: Role;
//   }
  
// interface Session {
//     user: {
//       id: string;
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//       role: Role;
//     };
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     role: Role;
//   }
// }


import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: "TEACHER" | "STUDENT";
    };
  }

  interface User {
    id: string;
    role: "TEACHER" | "STUDENT";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "TEACHER" | "STUDENT";
  }
}
