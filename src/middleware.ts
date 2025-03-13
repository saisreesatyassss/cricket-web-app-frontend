import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value || ""; // Get role from cookies
  const { pathname } = req.nextUrl; // Get current path

  // Routes allowed for empty role (not logged in)
  const publicRoutes = ["/", "/login"];

  // If role is empty and user tries to access a protected route
  if (!role && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If role is "user" and trying to access /admin
  if (role === "user" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If role is "admin", allow everything
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/settings/:path*", "/"],
};
