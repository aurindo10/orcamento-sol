import { Terminal } from "@phosphor-icons/react";
import { api } from "utils/api";

export const DashBoardHeader = () => {
  const { data: numberOfPropostas, status } =
    api.proposta.getNumberOfPropostasOfToday.useQuery();
  if (status === "loading")
    return <div className="text-slate-50">Carregando...</div>;
  return (
    <div className="flex justify-around">
      <div className="max-w-40 flex h-32 flex-col justify-center gap-3 rounded-xl bg-neutral-700 px-2 py-4">
        <label className="text-center text-[12px] font-bold text-neutral-400">
          Consultas
        </label>
        <div className="stat-value  flex justify-center gap-4 text-[50px] font-bold text-orange-600">
          {numberOfPropostas}
          <Terminal size={40} />
        </div>
        <label className="text-center text-[14px] font-bold text-neutral-400">
          Consultas de hoje
        </label>
      </div>
      <div className="max-w-40 flex h-32 flex-col justify-center gap-3 rounded-xl bg-neutral-700 px-2 py-4">
        <label className="text-center text-[12px] font-bold text-neutral-400">
          Mais consultado
        </label>
        <div className="stat-value flex justify-center gap-4 text-[34px] font-bold text-orange-600">
          <span>800kWh</span>
        </div>
        <label className="text-center text-[14px] font-bold text-neutral-400">
          Consultas de hoje
        </label>
      </div>
    </div>
  );
};
