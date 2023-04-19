import { auth, currentUser } from "@clerk/nextjs/app-beta";
import ResponsiveDrawer from "components/molecules/Drawer";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { prisma } from "server/db";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResponsiveDrawer>
      <div className="bg-slate-900 py-8 md:py-12">{children}</div>
    </ResponsiveDrawer>
  );
}
