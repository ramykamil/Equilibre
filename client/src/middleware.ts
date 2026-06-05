import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Middleware to protect dashboard routes.
 * Redirects unauthenticated users to the landing page.
 *
 * NOTE: This uses the Supabase anon key to verify the session token
 * from the request cookies. If no valid session exists, the user
 * is redirected to the root page.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /dashboard routes
  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  // Check for Supabase auth tokens in cookies
  // Supabase stores auth in cookies with various naming patterns
  const cookies = request.cookies;
  const hasAuthToken =
    cookies.has("sb-access-token") ||
    cookies.has("sb-refresh-token") ||
    // Supabase JS client stores tokens with project-ref prefix
    Array.from(cookies.getAll()).some(
      (cookie) =>
        cookie.name.startsWith("sb-") &&
        (cookie.name.endsWith("-auth-token") ||
          cookie.name.endsWith("-auth-token.0") ||
          cookie.name.endsWith("-auth-token.1"))
    );

  // Also check for the Supabase auth storage key pattern in cookies
  // The JS client may store a base64 JSON session
  const hasSupabaseSession = Array.from(cookies.getAll()).some((cookie) => {
    if (!cookie.name.startsWith("sb-")) return false;
    try {
      // Try to parse the cookie value — valid sessions are base64 JSON
      const decoded = atob(cookie.value);
      const parsed = JSON.parse(decoded);
      return parsed?.access_token && parsed?.refresh_token;
    } catch {
      return false;
    }
  });

  if (!hasAuthToken && !hasSupabaseSession) {
    // No auth tokens found — redirect to landing page
    const loginUrl = new URL("/", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Match all dashboard routes
  matcher: ["/dashboard/:path*"],
};
