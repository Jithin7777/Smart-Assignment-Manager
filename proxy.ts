// // middleware
// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export const config = {
//   matcher: ["/teacher/:path*", "/student/:path*"],
// };

// export async function proxy(req:NextRequest) {
//   const token = await getToken({ req, secret: process.env.AUTH_SECRET });
//   const path = req.nextUrl.pathname;

//   // Not logged in
//   if (!token) return NextResponse.redirect(new URL("/login", req.url));

//   // Teacher-only
//   if (path.startsWith("/teacher") && token.role !== "TEACHER")
//     return NextResponse.redirect(new URL("/login", req.url));

//   // Student-only
//   if (path.startsWith("/student") && token.role !== "STUDENT")
//     return NextResponse.redirect(new URL("/login", req.url));

//   return NextResponse.next();
// }



// proxy.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/teacher/:path*", "/student/:path*"],
};

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const path = req.nextUrl.pathname;

  const loginUrl = "https://smart-assignment-manager.vercel.app/login";

  if (!token) return NextResponse.redirect(loginUrl);
  if (path.startsWith("/teacher") && token.role !== "TEACHER")
    return NextResponse.redirect(loginUrl);
  if (path.startsWith("/student") && token.role !== "STUDENT")
    return NextResponse.redirect(loginUrl);

  return NextResponse.next();
}

// Then export it as default for Next.js 16+ Proxy
export default proxy;
