import { ArrowRight, CalendarBlank, Phone, User } from "@phosphor-icons/react";
import * as Tabs from "@radix-ui/react-tabs";
import { useStore } from "bearStore";
import { ClientCard } from "components/molecules/ClientCard";
import { DateCalendarServerRequest } from "components/organisms/Calendar";
import { useState } from "react";
import { api } from "utils/api";
export const UltimosOrcamentosTab = () => {
  const [propostas, updatePropostas, updateLoading, loadingClient] = useStore(
    (state) => [
      state.propostas,
      state.updatePropostas,
      state.updateLoading,
      state.loadingClient,
    ]
  );
  const { data: allPropostasByUser, status } =
    api.proposta.lookForAllProposta.useQuery();
  const [value, setValue] = useState("today");
  if (status === "loading")
    return <div className="text-slate-50">Carregando propostas...</div>;
  return (
    <Tabs.Root
      className="flex flex-col items-center"
      defaultValue="today"
      onValueChange={(value: string) => {
        setValue(value);
      }}
    >
      <Tabs.List className="mb-2 space-x-2">
        <Tabs.Trigger value="today" className="">
          <div className="flex flex-col items-center">
            <span
              className={`olaaa btn-outline btn-accent btn-xs btn mb-0 rounded-t-lg px-2 ${
                value === "today" ? "btn-active" : ""
              }`}
            >
              Hoje
            </span>
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger value="threeDays">
          <div className="flex flex-col items-center">
            <span
              className={`btn-outline btn-accent  btn-xs btn mb-0 rounded-t-lg  px-2 ${
                value === "threeDays" ? "btn-active" : ""
              }`}
            >
              3 dias
            </span>
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger value="sevenDays">
          <div className="flex flex-col items-center">
            <span
              className={`btn-outline btn-accent  btn-xs btn mb-0 rounded-t-lg  px-2 ${
                value === "sevenDays" ? "btn-active" : ""
              }`}
            >
              7 dias
            </span>
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger value="pickTheDay">
          <div className="flex flex-col items-center">
            <span
              className={`btn-outline btn-accent  btn-xs btn mb-0 rounded-t-lg  px-2 ${
                value === "pickTheDay" ? "btn-active" : ""
              }`}
            >
              Escolha o dia
            </span>
          </div>
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="today" className="w-full">
        <div className="card h-full bg-base-100 px-4 py-4">
          {allPropostasByUser?.today.length === 0 ? (
            <div className="text-slate-50"> Você não fez propostas hoje...</div>
          ) : (
            allPropostasByUser?.today.map((proposta) => {
              return (
                <ClientCard proposta={proposta} key={proposta.id}></ClientCard>
              );
            })
          )}
        </div>
      </Tabs.Content>
      <Tabs.Content value="threeDays" className="h-full w-full">
        <div className="card h-full bg-base-100 px-4 py-4">
          {allPropostasByUser?.threeDays.length === 0 ? (
            <div className="text-slate-50"> Você não fez propostas hoje...</div>
          ) : (
            allPropostasByUser?.threeDays.map((proposta) => {
              return (
                <ClientCard proposta={proposta} key={proposta.id}></ClientCard>
              );
            })
          )}
        </div>
      </Tabs.Content>
      <Tabs.Content value="sevenDays" className="h-full w-full">
        <div className="card h-full bg-base-100 px-4 py-4">
          {allPropostasByUser?.sevenDays.length === 0 ? (
            <div className="text-slate-50"> Você não fez propostas hoje...</div>
          ) : (
            allPropostasByUser?.sevenDays.map((proposta) => {
              return (
                <ClientCard proposta={proposta} key={proposta.id}></ClientCard>
              );
            })
          )}
        </div>
      </Tabs.Content>
      <Tabs.Content value="pickTheDay" className="h-full w-full">
        <div className="card flex h-full w-full items-center bg-base-100 shadow-xl">
          <DateCalendarServerRequest></DateCalendarServerRequest>
        </div>
        {loadingClient ? (
          <div className="text-slate-50">Carregando propostas...</div>
        ) : propostas.length === 0 ? (
          <div className="mt-2 text-slate-50">
            Você não fez propostas neste dia...
          </div>
        ) : (
          propostas.map((proposta) => {
            return (
              <ClientCard proposta={proposta} key={proposta.id}></ClientCard>
            );
          })
        )}
      </Tabs.Content>
    </Tabs.Root>
  );
};
