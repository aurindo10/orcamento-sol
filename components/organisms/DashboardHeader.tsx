import { Terminal } from "@phosphor-icons/react";
import { Skeleton } from "components/molecules/skeleton";
import { api } from "utils/api";

export const DashBoardHeader = () => {
  const { data: numberOfPropostas, status } =
    api.proposta.getNumberOfPropostasOfToday.useQuery();
  const {
    data: amountOfPropostasPerMonth,
    status: amountOfPropostasPerMonthStatus,
  } = api.proposta.getAmountOfPropostasPerMOnth.useQuery();

  return (
    <div className="flex justify-around">
      {status === "loading" ? (
        <div className="max-w-40 flex h-32 w-36 flex-col items-center gap-3 rounded-lg bg-slate-600 px-2 py-4">
          <Skeleton className="h-3 w-24 bg-slate-400"></Skeleton>
          <div className="flex w-full items-center justify-around gap-2">
            <Skeleton className="h-12 w-14 bg-slate-400"></Skeleton>
            <Skeleton className="h-12 w-14 bg-slate-400"></Skeleton>
          </div>
          <Skeleton className="h-3 w-24 bg-slate-400"></Skeleton>
        </div>
      ) : (
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
      )}
      {amountOfPropostasPerMonthStatus === "loading" ? (
        <div className="max-w-40 flex h-32 w-36 flex-col items-center gap-3 rounded-lg bg-slate-600 px-2 py-4">
          <Skeleton className="h-3 w-24 bg-slate-400"></Skeleton>
          <div className="flex w-full items-center justify-around gap-2">
            <Skeleton className="h-12 w-14 bg-slate-400"></Skeleton>
            <Skeleton className="h-12 w-14 bg-slate-400"></Skeleton>
          </div>
          <Skeleton className="h-3 w-24 bg-slate-400"></Skeleton>
        </div>
      ) : (
        <div className="max-w-40 flex h-32 flex-col justify-center gap-3 rounded-xl bg-neutral-700 px-2 py-4">
          <label className="text-center text-[12px] font-bold text-neutral-400">
            Propostas neste mês
          </label>
          <div className="stat-value flex justify-center gap-4 text-[34px] font-bold text-orange-600">
            <span>{amountOfPropostasPerMonth}</span>
          </div>
          <label className="text-center text-[14px] font-bold text-neutral-400">
            Total
          </label>
        </div>
      )}
    </div>
  );
};
