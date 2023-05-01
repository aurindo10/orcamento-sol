import { UserCircle } from "@phosphor-icons/react";
import { SubUserInfobodySkeleton } from "components/Skeletons/SubUserInfobodySkeleton";
import { UserInfobodySkeleton } from "components/Skeletons/UserInfobodySkeleton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RouterOutputs, api } from "utils/api";

export type LookForPropostaByDate =
  RouterOutputs["proposta"]["lookForPropostaByDate"];

export const UserInfobody = () => {
  const [days, setDays] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [propostas, setPropostas] = useState<LookForPropostaByDate>();
  const router = useRouter();
  const { userId } = router.query;
  useEffect(() => {
    const lookForProposta = async () => {
      const data = await lookForPropostaByDate({
        userId: userId as string,
        days: days,
      });
      setPropostas(data);
      setIsLoading(false);
    };
    lookForProposta();
  }, [days]);
  if (!userId) return <div className="text-slate-50">Carregando...</div>;
  const { mutateAsync: lookForPropostaByDate, status } =
    api.proposta.lookForPropostaByDate.useMutation();

  const handleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDays(Number(e.target.value));
    const data = await lookForPropostaByDate({
      userId: userId as string,
      days: Number(e.target.value),
    });
    setPropostas(data);
  };
  if (isLoading) return <UserInfobodySkeleton></UserInfobodySkeleton>;
  return (
    <div className="mt-8">
      <div className="subHeader flex justify-between">
        <label className="text-[32px] font-bold text-slate-50">Propostas</label>
        <select
          className="select-warning select w-28 text-slate-50 "
          onChange={handleSelect}
        >
          <option disabled selected>
            Dias
          </option>
          <option className="" value={1}>
            Hoje
          </option>
          <option value={3}>3 dias</option>
          <option value={7}>7 dias</option>
        </select>
      </div>
      {status === "loading" ? (
        <SubUserInfobodySkeleton></SubUserInfobodySkeleton>
      ) : (
        propostas?.map((proposta) => {
          return (
            <div className="grid grid-cols-3" key={proposta.id}>
              <div className="col-span-2 mt-2 flex items-center gap-2">
                <UserCircle size={45} color="white" />
                <div className="flex flex-col">
                  <label className="text-[24px] font-bold text-orange-600">
                    {proposta?.ClientInterested?.firstName}
                  </label>
                  <label className="text-[12px] text-slate-50">
                    Telefone: {proposta?.ClientInterested?.phone}
                  </label>
                  <label className="text-[12px] text-slate-50">
                    Telhado: {proposta?.roofType}
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-end text-center text-[22px] font-bold text-slate-50">
                {`${proposta.consumo} kWh`}
              </div>
              <div className="col-span-3 mt-2 h-[0.4px] bg-neutral-600"></div>
            </div>
          );
        })
      )}
    </div>
  );
};
