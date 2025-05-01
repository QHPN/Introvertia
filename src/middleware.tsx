import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define all routes that require authentication
const isProtectedRoute = createRouteMatcher([
  "/settings(.*)", 
  "/",
  "/profile(.*)",
  "/friends(.*)",
  "/friend-requests(.*)", 
  "/activity(.*)",
  "/notifications(.*)",
  "/events(.*)",
  "/stories(.*)",
  "/post/(.*)" // Posts now require authentication
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect routes that need auth
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
