import { currentUser } from "@clerk/nextjs/app-beta";
import React from "react";
import { prisma } from "server/db";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
