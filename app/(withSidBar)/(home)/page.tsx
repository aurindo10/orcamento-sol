import { prisma } from "server/db";
import { currentUser } from "@clerk/nextjs/app-beta";
import { RegisterUser } from "components/molecules/userRegister";

export default async function Page() {
  const user = await currentUser();

  const workers = await prisma.user.findFirst({
    where: {
      clerkId: user?.id,
      workers: true,
    },
  });
  console.log(workers);
  // if (!isUserSolWorker) return <div>Você não trabalha na Sol :/</div>;
  return <div>{workers ? <div>Olá</div> : <RegisterUser></RegisterUser>}</div>;
}
