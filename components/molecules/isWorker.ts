import { auth } from "@clerk/nextjs/app-beta";
import { prisma } from "server/db";

export const isWorker = async () => {
  const { userId } = auth();
  const isThereUser = await prisma.user.findFirst({
    where: {
      clerkId: userId,
      workers: true,
    },
  });
  if (isThereUser) {
    return true;
  } else {
    return false;
  }
};
