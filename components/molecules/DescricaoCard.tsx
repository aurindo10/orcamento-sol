import { ArrowDown, ArrowUp, Trash } from "@phosphor-icons/react";
import { useState } from "react";
import { RouterOutputs } from "utils/api";

export type DescricaoType = RouterOutputs["descricao"]["getAllDescricao"];
interface DescricaoCardProps {
  descricaoInfo: DescricaoType[0];
  setIdParametro: (id: string) => void;
  setOpenModaldelete: (open: boolean) => void;
  setDescricao: (id: string) => void;
  setOpen: (open: boolean) => void;
  open: boolean;
  setIdParametroMaster: (id: string) => void;
  setOpenModaldeleteParametroMaster: (open: boolean) => void;
}
export const DescricaoCard = ({
  descricaoInfo,
  setIdParametro,
  setOpenModaldelete,
  setOpen,
  setDescricao,
  open,
  setOpenModaldeleteParametroMaster,
  setIdParametroMaster,
}: DescricaoCardProps) => {
  const [collapsed, setCollapsed] = useState("collapse-close");
  return (
    <div className="py-2">
      <div className={`collapse ${collapsed} rounded-xl bg-slate-700`}>
        <div className="card-compact card">
          <div className=" grid grid-cols-2 px-4 py-2">
            <h1 className="col-start-1 text-left text-slate-50">
              {descricaoInfo.name}
            </h1>
            <div className="buttons flex items-center justify-center gap-2">
              <button
                className="btn-primary btn-xs btn-square btn h-10 w-10 text-[9px]"
                onClick={() => {
                  setIdParametroMaster(descricaoInfo.id);
                  setOpenModaldeleteParametroMaster(true);
                }}
              >
                <Trash size={20} />
              </button>
              <button
                className="btn-primary btn-xs btn-square btn h-10 w-10 text-[9px]"
                onClick={() => {
                  setDescricao(descricaoInfo.id);
                  setOpen(!open);
                }}
              >
                criar
              </button>
              <button
                className="btn-primary btn-xs btn-square btn h-10 w-10"
                onClick={() => {
                  setCollapsed((prev) => {
                    if (prev === "collapse-close") return "collapse-open";
                    else return "collapse-close";
                  });
                }}
              >
                {collapsed === "collapse-close" ? (
                  <ArrowDown size={20} />
                ) : (
                  <ArrowUp size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="collapse-content" key={descricaoInfo.id}>
          <div className="rounded-lg  px-2">
            {descricaoInfo.Precificacao.map((precificacao) => {
              return (
                <div
                  key={precificacao.id}
                  className="mt-2 grid grid-cols-2 rounded-lg bg-slate-600 px-4 py-4"
                >
                  <div className="">
                    <p>{`Tipo: ${
                      precificacao.type === "perKwp"
                        ? "Por kWp"
                        : precificacao.type === "perRangeKwp"
                        ? "Por faixa de Potência"
                        : precificacao.type === "fixedValue"
                        ? "Valor fixo"
                        : precificacao.type === "percentByTotal"
                        ? "Percentual sobre o total"
                        : precificacao.type === "amountPanel"
                        ? "Quantidade de paineis"
                        : ""
                    }`}</p>
                    <p>{`Min: ${precificacao.minPower} kWp`}</p>
                    <p>{`Max: ${precificacao.maxPower} kWp`}</p>
                    <p>{`Valor: R$ ${precificacao.price}`}</p>
                    <p>{`% sobre total:  ${precificacao.percent}`}</p>
                  </div>
                  <div className="flex w-full justify-end">
                    <button
                      className="btn-xs btn-square btn h-10 w-10"
                      onClick={() => {
                        setIdParametro(precificacao.id);
                        setOpenModaldelete(true);
                      }}
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
