import { auth, currentUser } from "@clerk/nextjs/app-beta";
import ResponsiveDrawer from "components/molecules/Drawer";
import Drawer02 from "components/molecules/Drawer02";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { prisma } from "server/db";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  console.log(user);
  if (user?.id === undefined) {
    redirect("/login");
  }
  const isThereUser = await prisma.user.findFirst({
    where: {
      clerkId: user?.id,
    },
  });
  if (!isThereUser) {
    const userCreated = await prisma.user.create({
      data: {
        clerkId: user?.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
      },
    });
  }

  const isSolWorker = await prisma.user.findFirst({
    where: {
      clerkId: user?.id,
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
  return (
    // <ResponsiveDrawer admin={isThereUser?.admin}>
    <Drawer02>
      <div className="bg-slate-900 py-8 md:py-12">{children}</div>
    </Drawer02>
    // </ResponsiveDrawer>
  );
}
