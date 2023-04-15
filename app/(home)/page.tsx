import { prisma } from "server/db";
import { currentUser } from "@clerk/nextjs/app-beta";
import { RegisterUser } from "components/molecules/userRegister";

export default async function Page() {
  const user = await currentUser();

  const isUserSolWorker = await prisma.user.findFirst({
    where: {
      clerkId: user?.id,
      workers: true,
    },
  });
  // if (!isUserSolWorker) return <div>Você não trabalha na Sol :/</div>;
  return (
    <div>
      <RegisterUser></RegisterUser>
    </div>
  );
}
