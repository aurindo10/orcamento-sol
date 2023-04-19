import { clerkClient } from "@clerk/nextjs/server";
import { AdminToggle2 } from "components/molecules/Admin2Toggle";
import { AdminToggle } from "components/molecules/Admintoggle";
import { AdminToggle3 } from "components/molecules/MasterAdmin";
import { prisma } from "server/db";
import { api } from "utils/api";

export default async function Page() {
  const allUsers = await clerkClient.users.getUserList();
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
                userId: user.id,
                name: user.firstName!,
              }}
              key={user.id}
            ></AdminToggle>
          );
        })}
        <div>admin</div>
        <div>
          {allUsers.map((user) => {
            return (
              <AdminToggle2
                user={{
                  userId: user.id,
                  name: user.firstName!,
                }}
                key={user.id}
              ></AdminToggle2>
            );
          })}
        </div>
        <div>Master admin</div>
        <div>
          {allUsers.map((user) => {
            return (
              <AdminToggle3
                user={{
                  userId: user.id,
                  name: user.firstName!,
                }}
                key={user.id}
              ></AdminToggle3>
            );
          })}
        </div>
      </div>
    </div>
  );
}
