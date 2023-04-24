import { usePrecificationStore } from "bearStore";
import { useEffect } from "react";
import { api } from "utils/api";

export const TableOfParameters = () => {
  const [precifications, setPrecifications, addPrecifications] =
    usePrecificationStore((state) => [
      state.precifications,
      state.setPrecifications,
      state.addPrecifications,
    ]);
  const { data, status } = api.precificaca.getAllPrecifications.useQuery();
  useEffect(() => {
    if (data) {
      setPrecifications(data);
    }
  }, [status, data]);
  return (
    <div>
      {precifications.map((item) => {
        if (item.type === "perKwp") {
          return (
            <div className="card" key={item.id}>
              <div className="card-body"> {item.descricao}</div>
            </div>
          );
        } else {
          return null;
        }
      })}
      {precifications.map((item) => {
        if (item.type === "perRangeKwp") {
          return (
            <div className="card bg-slate-600" key={item.id}>
              <div className="card-body">
                <div className="card-title h-8 text-slate-50">
                  {item.descricao}
                </div>
                <div className="grid grid-cols-2">
                  <label>{`Min kWp: ${item.minPower}`}</label>
                  <label>Max kWp: {item.maxPower}</label>
                  <label>Valor:{item.price}</label>
                  <label>Por faixa de kWp</label>
                </div>
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
            <div className="card" key={item.id}>
              <div className="card-body"> {item.descricao}</div>
            </div>
          );
        } else {
          return null;
        }
      })}
      {precifications.map((item) => {
        if (item.type === "percentByTotal") {
          return (
            <div className="card" key={item.id}>
              <div className="card-body"> {item.descricao}</div>
            </div>
          );
        } else {
          return null;
        }
      })}
      {precifications.map((item) => {
        if (item.type === "amountPanel") {
          return (
            <div className="card" key={item.id}>
              <div className="card-body"> {item.descricao}</div>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};
