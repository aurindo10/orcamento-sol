import { useUser } from "@clerk/nextjs";
import { CursorClick, Eye, UserCircle } from "@phosphor-icons/react";
import { usePropostaStore } from "bearStore";
import { UserInfoHeaderSkeleton } from "components/Skeletons/UserInfoHeaderSkeleton";
import { Skeleton } from "components/molecules/skeleton";
import { stat } from "fs";
// import { c } from "components/templates/OrcamentoForm";
import { useRouter } from "next/router";
import { api } from "utils/api";

export const UserInfoHeader = () => {
  const router = useRouter();
  const { name, userId } = router.query;

  const { data: numberOfPropostas, status } =
    api.proposta.getNumberOfPropostasByUser.useQuery({
      userId: userId ? (userId as string) : "",
    });
  const {
    data: amountOfPropostasPerMonthByUser,
    status: amountOfPropostasByUserPerMounth,
  } = api.proposta.getAmountOfPropostasPerMOnthByUser.useQuery({
    userId: userId?.toString() ?? "",
  });
  if (status === "loading") {
    return <UserInfoHeaderSkeleton></UserInfoHeaderSkeleton>;
  }
  return (
    <div className="container">
      <div className="mt-2 flex  items-center justify-between px-4 py-2 md:justify-center">
        <label className="text-[40px] font-bold text-slate-50">{`${name}!`}</label>
        <div className="text-slate-50">
          <UserCircle size={77} />
        </div>
      </div>
      <div className="min-w-36 mt-6 flex justify-between gap-6 md:justify-center">
        <div className="max-w-40 flex h-32 flex-col justify-center gap-3 rounded-xl bg-neutral-700 px-2 py-4">
          <label className="text-center text-[14px] font-bold text-neutral-400">
            Propostas de hoje
          </label>
          <div className="stat-value flex justify-around gap-4 text-[38px] font-bold text-orange-600">
            <span className="flex w-full items-center justify-around gap-2">
              {numberOfPropostas}
              <Eye size={32} />
            </span>
          </div>
          <label className="text-center text-[14px] font-bold text-neutral-400">
            Consultas de hoje
          </label>
        </div>
        <div className="flex h-32 min-w-[140px] max-w-[140px] flex-col justify-center gap-3 rounded-xl bg-neutral-700 px-2 py-4">
          <label className="text-center text-[14px] font-bold text-neutral-400">
            Propostas no mês
          </label>
          <div className="stat-value flex justify-center gap-4 text-[38px] font-bold text-orange-600">
            <span className="flex w-full items-center justify-around gap-2">
              {amountOfPropostasPerMonthByUser}
              <CursorClick size={32} />
            </span>
          </div>
          <label className="text-center text-[14px] font-bold text-neutral-400">
            Total
          </label>
        </div>
      </div>
    </div>
  );
};
