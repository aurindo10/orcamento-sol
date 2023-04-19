import { getAuth, withClerkMiddleware } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "server/db";

export default withClerkMiddleware(async (req: NextRequest) => {
  const { userId, user } = getAuth(req);
  return NextResponse.next();
});

// Stop Middleware running on static files
export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};
