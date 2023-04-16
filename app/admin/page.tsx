import { prisma } from "server/db";
import { currentUser } from "@clerk/nextjs/app-beta";

export default async function Page() {
  const user = await currentUser();

  const allUsers = await prisma.user.findMany({});
  console.log(allUsers);
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
            <div className="max-w-80 h-18 card  flex w-full justify-between bg-neutral py-2 text-neutral-content">
              <div className="flex justify-around">
                <label className="card-title">Aurindo Neto</label>
                <label className="label cursor-pointer ">
                  <input type="checkbox" className="toggle" />
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
