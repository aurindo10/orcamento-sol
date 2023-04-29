import { useUser } from "@clerk/nextjs";
import { ArrowRight, UserCircle } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { api } from "utils/api";

export const Dashboardbody = () => {
  const { user } = useUser();
  const router = useRouter();
  const { data: allUsers, status } = api.user.getAllUsers.useQuery();
  if (status === "loading") return <div>Carregando...</div>;
  return (
    <div className="py-4">
      <label className="text-[32px] font-bold text-slate-50">
        Lista de Usuários
      </label>
      <div className="mt-4 space-y-2">
        {allUsers?.map((user) => {
          return (
            <div className="user flex justify-between">
              {}
              <div className="flex">
                <UserCircle size={55} color="white" />
                <div className="ml-2">
                  <div className="text-[24px] font-bold text-orange-600">
                    {user.firstName}
                  </div>
                  <div className="text-[10px] text-neutral-400">
                    Ultima consulta: 10/12/2023
                  </div>
                </div>
              </div>
              <div
                className="mr-2 flex flex-col items-center"
                onClick={() => {
                  router.push({
                    pathname: "/dashboard/userinfo/[pid]",
                    query: { userId: user.id, name: user.firstName },
                  });
                }}
              >
                <ArrowRight size={35} className="text-orange-600" />
                <label className="text-[12px] text-neutral-600">
                  Verificar
                </label>
              </div>
            </div>
          );
        })}
        <div className="h-[0.2px] w-full bg-neutral-600"></div>
      </div>
    </div>
  );
};
