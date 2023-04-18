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
  const { userId, session } = auth();
  const user = await currentUser();
  if (!userId) {
    redirect("/login");
  }
  const isThereUser = await prisma.user.findFirst({
    where: {
      clerkId: userId,
    },
  });
  if (!isThereUser) {
    const userCreated = await prisma.user.create({
      data: {
        clerkId: userId,
        firstName: user?.firstName,
        lastName: user?.lastName,
      },
    });
  }

  const isSolWorker = await prisma.user.findFirst({
    where: {
      clerkId: userId,
      workers: true,
    },
  });
  if (!isSolWorker) {
    return (
      <div>
        Sinto muito, mas você não tem permissão para acessar essa página. Você
        não trabalha na sol
      </div>
    );
  }
  console.log("fui executado");
  return (
    <ResponsiveDrawer admin={isThereUser?.admin}>
      <div className="bg-slate-900 py-8 md:py-12">{children}</div>
    </ResponsiveDrawer>
  );
}
