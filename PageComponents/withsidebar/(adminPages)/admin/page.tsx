import { useUser } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/app-beta";
import { clerkClient } from "@clerk/nextjs/server";
import { AdminToggle2 } from "components/molecules/Admin2Toggle";
import { AdminToggle } from "components/molecules/Admintoggle";
import { AdminToggle3 } from "components/molecules/MasterAdmin";
import { api } from "utils/api";

export const AdminPage = () => {
  const { isLoaded, user } = useUser();
  const { data: allUsers, status } = api.user.getAllUsers.useQuery();
  if (!user!.publicMetadata.masterAdmin)
    return (
      <div className="text-white"> Você não é um administrador Master</div>
    );
  if (status === "loading" || !isLoaded)
    return <div className="text-white">Carregando...</div>;
  if (!allUsers)
    return <div className="text-white"> Não há usuários cadastrados</div>;
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
};
