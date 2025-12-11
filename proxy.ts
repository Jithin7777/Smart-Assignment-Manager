// proxy.ts (middleware for role check)
import { auth } from "./auth";

export const config = {
  matcher: ["/teacher/:path*", "/student/:path*"],
};

export const runtime = "nodejs";

export default auth((req) => {
  const token = req.auth;
  const path = req.nextUrl.pathname;

  if (!token) return Response.redirect(new URL("/auth/login", req.url));

  const role = token.user?.role;
  if (path.startsWith("/teacher") && role !== "TEACHER")
    return Response.redirect(new URL("/auth/login", req.url));
  if (path.startsWith("/student") && role !== "STUDENT")
    return Response.redirect(new URL("/auth/login", req.url));
});
