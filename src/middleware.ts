import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || "";
  const currentPath = request.nextUrl.pathname;
  const isPublicPath =
    currentPath === "/" ||
    currentPath === "/login" ||
    currentPath === "/signup" ||
    currentPath.startsWith("/verify");
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// matching the routes
export const config = {
  matcher: ["/", "/login", "/signup", "/profile", "/verify:token*"],
};
