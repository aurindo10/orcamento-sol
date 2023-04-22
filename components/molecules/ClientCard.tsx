import { ArrowRight, CalendarBlank, Phone, User } from "@phosphor-icons/react";
import { PostCreateInput } from "components/organisms/Calendar";

interface ClientCardProps {
  proposta: PostCreateInput[0];
}
export const ClientCard = ({ proposta }: ClientCardProps) => {
  return (
    <div className="container">
      <div
        className="card grid  w-full grid-cols-3 grid-rows-1  px-2 py-4 shadow-xl"
        key={proposta.id}
      >
        <div className="col-span-2 col-start-1 flex flex-col gap-1">
          <div className="flex gap-2 text-[19px] font-bold">
            <div className="w-[22px]">
              <User size={22} color="white" />
            </div>
            <h1 className="text-slate-50">{proposta.firstName}</h1>
          </div>
          <div className="calendar flex h-auto items-end gap-2">
            <CalendarBlank size={22} color="white" />
            <h3 className="text-[14px] text-slate-200">{`${"20/04/2023"}`}</h3>
          </div>
          <div className="flex items-end gap-2">
            <Phone size={22} color="white" />
            <h3 className="text-[14px] text-slate-200">{`${"86 9 8161-8474"}`}</h3>
          </div>
        </div>
        <div className="col-start-3 flex w-full flex-col items-center justify-center gap-3">
          <div className="badge-secondary badge">{`${proposta.Proposta.length} propostas`}</div>
          <div className="btn-accent btn-xs btn flex gap-2">
            Ver
            <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};
