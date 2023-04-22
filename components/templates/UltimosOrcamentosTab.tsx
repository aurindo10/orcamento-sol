import { ArrowRight, CalendarBlank, Phone, User } from "@phosphor-icons/react";
import * as Tabs from "@radix-ui/react-tabs";
import { DateCalendarServerRequest } from "components/organisms/Calendar";
import { api } from "utils/api";
export const UltimosOrcamentosTab = () => {
  const { data: allPropostasByUser, status } =
    api.proposta.lookForAllProposta.useQuery();
  if (status === "loading") return <div>Carregando...</div>;
  return (
    <Tabs.Root className="flex flex-col items-center">
      <Tabs.List className="mb-2 space-x-2">
        <Tabs.Trigger value="today" className="">
          <div className="flex flex-col items-center">
            <span className="btn-outline btn-accent  btn-xs btn mb-0  rounded-t-lg px-2">
              Hoje
            </span>
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger value="threeDays">
          <div className="flex flex-col items-center">
            <span className="btn-outline btn-accent  btn-xs btn mb-0 rounded-t-lg  px-2">
              3 dias
            </span>
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger value="sevenDays">
          <div className="flex flex-col items-center">
            <span className="btn-outline btn-accent  btn-xs btn mb-0 rounded-t-lg  px-2">
              7 dias
            </span>
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger value="pickTheDay">
          <div className="flex flex-col items-center">
            <span className="btn-outline btn-accent  btn-xs btn mb-0 rounded-t-lg  px-2">
              Escolha o dia
            </span>
          </div>
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="today" className="w-full">
        <div className="card h-full bg-slate-600 px-4 py-4">
          {allPropostasByUser?.today.map((proposta) => {
            return (
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
            );
          })}
        </div>
      </Tabs.Content>
      <Tabs.Content value="threeDays" className="h-full w-full">
        <div className="card h-full bg-slate-600 px-4 py-4">
          {allPropostasByUser?.threeDays.map((proposta) => {
            return (
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
            );
          })}
        </div>
      </Tabs.Content>
      <Tabs.Content value="sevenDays" className="h-full w-full">
        <div className="card h-full bg-slate-600 px-4 py-4">
          {allPropostasByUser?.sevenDays.map((proposta) => {
            return (
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
            );
          })}
        </div>
      </Tabs.Content>
      <Tabs.Content value="pickTheDay" className="h-96 w-full">
        <div className="card flex h-full w-full items-center bg-base-100 shadow-xl">
          Escolha o dia
          <DateCalendarServerRequest></DateCalendarServerRequest>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
};
