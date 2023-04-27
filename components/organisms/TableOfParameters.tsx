import { usePrecificationStore } from "bearStore";
import { useEffect } from "react";
import { api } from "utils/api";

export const TableOfParameters = () => {
  const [
    precifications,
    setPrecifications,
    addPrecifications,
    deleteOnedPrecification,
  ] = usePrecificationStore((state) => [
    state.precifications,
    state.setPrecifications,
    state.addPrecifications,
    state.deleteOnedPrecification,
  ]);
  const { mutateAsync: dellPrecification } =
    api.precificaca.dellPrecification.useMutation();
  const { data, status } = api.precificaca.getAllPrecifications.useQuery();
  useEffect(() => {
    if (data) {
      setPrecifications(data);
    }
  }, [status, data]);
  const handleDelete = async (id: string) => {
    const deletedPrecification = await dellPrecification({
      id,
    });
    if (deletedPrecification) {
      deleteOnedPrecification(deletedPrecification);
    }
  };
  return (
    <div className="mt-2 flex flex-col gap-2">
      {precifications.map((item) => {
        if (item.type === "perKwp") {
          return (
            <div
              className="card grid max-w-xl  grid-cols-2 bg-slate-600 px-4 py-2"
              key={item.id}
            >
              <div className="flex flex-col items-center gap-1  font-cabin font-bold text-slate-50">
                <label className="text-[12px]">Descrição:</label>
                <label>{item.descricao}</label>
                <div className="flex flex-col items-start gap-2 px-4">
                  <label className="badge badge-md text-center">{`Min: ${item.minPower}kWp`}</label>
                  <label className="badge badge-md row-start-2">{`Max: ${item.maxPower}kWp`}</label>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 font-cabin font-bold">
                <span className="text-[12px] text-slate-50">Tipo:</span>
                <span className=" text-slate-50">Por kWp</span>
                <label className="badge-secondary  badge col-start-2 px-4 text-center font-bold">{`Valor: R$${item.price}`}</label>
                <button
                  className="btn-error btn-xs btn w-16"
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  Apagar
                </button>
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
      {precifications.map((item) => {
        if (item.type === "perRangeKwp") {
          return (
            <div
              className="card grid max-w-xl  grid-cols-2 bg-slate-600 px-4 py-2"
              key={item.id}
            >
              <div className="flex flex-col items-center gap-1  font-cabin font-bold text-slate-50">
                <label className="text-[12px]">Descrição:</label>
                <label>{item.descricao}</label>
                <div className="flex flex-col items-start gap-2 px-4">
                  <label className="badge badge-md text-center">{`Min: ${item.minPower}kWp`}</label>
                  <label className="badge badge-md row-start-2">{`Max: ${item.maxPower}kWp`}</label>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 font-cabin font-bold">
                <span className="text-[12px] text-slate-50">Tipo:</span>
                <span className=" text-slate-50">Por faixa de kWp</span>
                <label className="badge-secondary  badge col-start-2 px-4 text-center font-bold">{`Valor: R$${item.price}`}</label>
                <button
                  className="btn-error btn-xs btn w-16"
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  Apagar
                </button>
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
      {precifications.map((item) => {
        if (item.type === "fixedValue") {
          return (
            <div
              className="card grid max-w-xl  grid-cols-2 bg-slate-600 px-4 py-2"
              key={item.id}
            >
              <div className="flex flex-col items-center gap-1  font-cabin font-bold text-slate-50">
                <label className="text-[12px]">Descrição:</label>
                <label>{item.descricao}</label>
                <div className="flex flex-col items-start gap-2 px-4">
                  <label className="badge badge-md text-center">{`Min: ${item.minPower}kWp`}</label>
                  <label className="badge badge-md row-start-2">{`Max: ${item.maxPower}kWp`}</label>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 font-cabin font-bold">
                <span className="text-[12px] text-slate-50">Tipo:</span>
                <span className=" text-slate-50">Valor fixo</span>
                <label className="badge-secondary  badge col-start-2 px-4 text-center font-bold">{`Valor: R$${item.price}`}</label>
                <button
                  className="btn-error btn-xs btn w-16"
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  Apagar
                </button>
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
      {precifications.map((item) => {
        if (item.type === "percentByTotal") {
          return (
            <div
              className="card grid max-w-xl  grid-cols-2 bg-slate-600 px-4 py-2"
              key={item.id}
            >
              <div className="flex flex-col items-center gap-1  font-cabin font-bold text-slate-50">
                <label className="text-[12px]">Descrição:</label>
                <label>{item.descricao}</label>
                <div className="flex flex-col items-start gap-2 px-4">
                  <label className="badge badge-md text-center">{`Min: ${item.minPower}kWp`}</label>
                  <label className="badge badge-md row-start-2">{`Max: ${item.maxPower}kWp`}</label>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 font-cabin font-bold">
                <span className="text-[12px] text-slate-50">Tipo:</span>
                <span className=" text-slate-50">Percentual sobre o total</span>
                <label className="badge-secondary  badge col-start-2 px-4 text-center font-bold">{`Valor: R$${item.price}`}</label>
                <button
                  className="btn-error btn-xs btn w-16"
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  Apagar
                </button>
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
      {precifications.map((item) => {
        if (item.type === "amountPanel") {
          return (
            <div
              className="card grid max-w-xl  grid-cols-2 bg-slate-600 px-4 py-2"
              key={item.id}
            >
              <div className="flex flex-col items-center gap-1  font-cabin font-bold text-slate-50">
                <label className="text-[12px]">Descrição:</label>
                <label>{item.descricao}</label>
                <div className="flex flex-col items-start gap-2 px-4">
                  <label className="badge badge-md text-center">{`Min: ${item.minPower}kWp`}</label>
                  <label className="badge badge-md row-start-2">{`Max: ${item.maxPower}kWp`}</label>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 font-cabin font-bold">
                <span className="text-[12px] text-slate-50">Tipo:</span>
                <span className=" text-slate-50">
                  Pela quantidade de paineis
                </span>
                <label className="badge-secondary  badge col-start-2 px-4 text-center font-bold">{`Valor: R$${item.price}`}</label>
                <button
                  className="btn-error btn-xs btn w-16"
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  Apagar
                </button>
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};
