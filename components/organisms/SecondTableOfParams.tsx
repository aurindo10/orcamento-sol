import { usePrecificationSecondStore } from "bearStore";
import { DeleteModalParam } from "components/molecules/DeleteParmModal";
import { PrecificacaoForm } from "components/templates/PrecificacaoForm";
import { useEffect, useState } from "react";
import { api } from "utils/api";

export const SecondTableOfParams = () => {
  const [name, setName] = useState("");
  const [openModaldelete, setOpenModaldelete] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [idParametro, setIdParametro] = useState("");
  const [open, setOpen] = useState(false);
  const [descricoes, setDescricoes, deleteOnedDescricao, addDescricoes] =
    usePrecificationSecondStore((state) => [
      state.descricoes,
      state.setDescricoes,
      state.deleteOnedDescricao,
      state.addDescricoes,
    ]);
  const { data: allDescricaoFromDB, status } =
    api.descricao.getAllDescricao.useQuery();
  const { mutateAsync: createDescricao } =
    api.descricao.createDescricao.useMutation();
  useEffect(() => {
    console.log(allDescricaoFromDB);
    if (allDescricaoFromDB) {
      setDescricoes(allDescricaoFromDB);
    }
  }, [status, allDescricaoFromDB]);
  return (
    <div className="py-4">
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            value={name}
            placeholder="Descrição..."
            className="input-bordered input w-full max-w-lg"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <button
            className="btn-primary btn"
            onClick={async () => {
              const createdDescricao = await createDescricao({
                name: name,
              });
              if (createdDescricao) {
                addDescricoes(createdDescricao);
                setName("");
              }
            }}
          >
            Cadastrar
          </button>
        </div>
      </div>
      {descricoes.map((descricao) => {
        return (
          <div
            tabIndex={0}
            className="collapse-arrow rounded-box collapse my-4 border border-base-300 bg-base-100"
          >
            <div className="card card-compact grid grid-cols-3">
              <div className="card-body col-span-2 w-full text-center">
                <div className="card-title justify-center text-slate-50">
                  {descricao.name}
                </div>
              </div>
              <div className="col-start-3 flex w-full items-center justify-center">
                <button
                  className="btn-secondary btn-square btn"
                  onClick={() => {
                    setDescricao(descricao.id);
                    setOpen(!open);
                  }}
                >
                  criar
                </button>
              </div>
            </div>
            <div className="collapse-content " key={descricao.id}>
              {descricao.Precificacao.map((precificacao) => {
                return (
                  <div key={precificacao.id} className="grid grid-cols-2">
                    <div className="">
                      <p>{`Tipo: ${
                        precificacao.type === "perKwp" ? "Por kWp" : ""
                      }`}</p>
                      <p>{`Min: R$ ${precificacao.minPower}`}</p>
                      <p>{`Max: R$ ${precificacao.maxPower}`}</p>
                      <p>{`Valor: R$ ${precificacao.price}`}</p>
                      <p>{`% sobre total:  ${precificacao.percent}`}</p>
                    </div>
                    <div className="flex w-full justify-center">
                      <button
                        className="btn-square btn"
                        onClick={() => {
                          setIdParametro(precificacao.id);
                          setOpenModaldelete(true);
                        }}
                      >
                        Del
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <DeleteModalParam
        id={idParametro}
        openModaldelete={openModaldelete}
        setOpenModaldelete={setOpenModaldelete}
      ></DeleteModalParam>
      <PrecificacaoForm
        descricao={descricao}
        open={open}
        setOpen={setOpen}
      ></PrecificacaoForm>
    </div>
  );
};
