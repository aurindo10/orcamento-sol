import { AdminToggle } from "components/molecules/Admintoggle";
import { prisma } from "server/db";
import { api } from "utils/api";

export default async function Page() {
  const allUsers = await prisma.user.findMany();
  return (
    <div className="flex justify-center px-2 py-4 md:px-4">
      <div className="w-full space-y-2">
        <div className="flex w-full">
          <span className="label-text w-1/2 text-center text-neutral-content">
            Usuário
          </span>
          <span className="label-text w-1/2 text-center text-neutral-content">
            Funcionário
          </span>
        </div>
        {allUsers.map((user) => {
          return (
            <AdminToggle
              user={{
                userId: user.clerkId!,
                name: user.firstName!,
                isWorker: user.workers!,
              }}
              key={user.clerkId!}
            ></AdminToggle>
          );
        })}
      </div>
    </div>
  );
}
