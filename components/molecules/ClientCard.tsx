import {
  ArrowRight,
  CalendarBlank,
  CaretDown,
  Phone,
  User,
} from "@phosphor-icons/react";
import { PostCreateInput } from "components/organisms/Calendar";
import dayjs from "dayjs";
import { useState } from "react";

interface ClientCardProps {
  proposta: PostCreateInput[0];
}
export const ClientCard = ({ proposta }: ClientCardProps) => {
  const dataFormatada = dayjs(proposta.createdAt).format("DD/MM/YYYY");
  const [open, setOpen] = useState("collapse-close");
  return (
    <div className={`collapse ${open}`}>
      <div className="container">
        <div
          className="card grid  w-full grid-cols-3 grid-rows-1  px-2 py-4 shadow-xl"
          key={proposta.id}
          onClick={() => {
            setOpen((prev) => {
              if (prev === "collapse-close") return "collapse-open";
              else return "collapse-close";
            });
          }}
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
              <h3 className="text-[14px] text-slate-200">{`${dataFormatada}`}</h3>
            </div>
            <div className="flex items-end gap-2">
              <Phone size={22} color="white" />
              <h3 className="text-[14px] text-slate-200">{`${proposta.phone}`}</h3>
            </div>
          </div>
          <div className="col-start-3 flex w-full flex-col items-center justify-center gap-3">
            <div className="badge-secondary badge">{`${proposta.Proposta.length} propostas`}</div>
            <div className="btn-accent btn-xs btn flex gap-2">
              Ver
              <CaretDown size={18} />
            </div>
          </div>
        </div>
      </div>
      <div className="collapse-content">
        {proposta.Proposta.map((consulta) => {
          const dataFormatada = dayjs(consulta.createdAt).format("DD/MM/YYYY");
          return (
            <div className="flex justify-between px-6 py-1" key={consulta.id}>
              <h1 className="text-[14px] text-slate-50">{dataFormatada}</h1>
              <h3 className="text-[16px] text-slate-50">{`${consulta.consumo}kWh`}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};
