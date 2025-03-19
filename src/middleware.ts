import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value || ""; // Get role from cookies
  const { pathname } = req.nextUrl; // Get current path

  // Routes allowed for users without a role
  const publicRoutes = ["/", "/login"];

  // Redirect users without a role trying to access restricted pages
  if (!role && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Prevent "user" from accessing "/admin"
  if (role === "user" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Prevent logged-in users (user/admin) from going to "/login"
  if (role && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow all other requests
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/settings/:path*", "/login", "/"],
};
