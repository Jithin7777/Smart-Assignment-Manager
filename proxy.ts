import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/teacher/:path*", "/student/:path*"],
};

export async function proxy(req: NextRequest) {
  const session = await auth();
  const path = req.nextUrl.pathname;

  // Not logged in
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Teacher-only
  if (path.startsWith("/teacher") && session.user.role !== "TEACHER") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Student-only
  if (path.startsWith("/student") && session.user.role !== "STUDENT") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}