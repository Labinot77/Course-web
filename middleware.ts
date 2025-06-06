import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const hasSession = !!req.cookies.get("session")?.value;
  const pathname = req.nextUrl.pathname;

  // Protect both /courses and /privacy paths
  const isProtectedPath =
    pathname.startsWith("/courses") || pathname === "/privacy";

  if (isProtectedPath && !hasSession) {
    return NextResponse.redirect(new URL("/no-access", req.url));
  }

  return NextResponse.next();
}

// Tell Next.js which paths this middleware should run on
export const config = {
  matcher: ["/courses/:path*", "/privacy"],
};
