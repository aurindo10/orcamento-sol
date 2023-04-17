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
  return (
    <h1 className="font-cabin  text-3xl font-bold text-slate-50">
      {`Olá ${user?.firstName}`}{" "}
    </h1>
  );
}
