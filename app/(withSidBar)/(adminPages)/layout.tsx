import { auth, currentUser } from "@clerk/nextjs/app-beta";
import ResponsiveDrawer from "components/molecules/Drawer";
import { redirect } from "next/navigation";
import React from "react";
import { prisma } from "server/db";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const { userId, session } = auth();
  console.log(userId);
  console.log(user?.id);
  await prisma.user.update({
    where: {
      clerkId: user?.id,
    },
    data: {
      admin: true,
    },
  });
  const isSolWorker = await prisma.user.findFirst({
    where: {
      clerkId: user?.id,
      admin: true,
    },
  });
  if (!isSolWorker) {
    return (
      <div>
        Sinto muito, mas você não tem permissão para acessar essa página. Você
        não é um administrador
      </div>
    );
  }
  return <div>{children}</div>;
}
