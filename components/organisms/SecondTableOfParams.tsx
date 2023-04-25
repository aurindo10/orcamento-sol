import { usePrecificationSecondStore } from "bearStore";
import { PrecificacaoForm } from "components/templates/PrecificacaoForm";
import { useEffect, useState } from "react";
import { api } from "utils/api";

export const SecondTableOfParams = () => {
  const [name, setName] = useState("");
  const [descricao, setDescricao] = useState("");
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
          <div className="collapse" key={descricao.id}>
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              {descricao.name}
            </div>
            <div className="collapse-content" key={descricao.id}>
              <button
                className="btn-square btn"
                onClick={() => {
                  setDescricao(descricao.id);
                  setOpen(!open);
                }}
              >
                criar
              </button>
              {descricao.Precificacao.map((precificacao) => {
                return (
                  <div key={precificacao.id}>
                    <p>{precificacao.type}</p>
                    <p>{precificacao.descricao}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <PrecificacaoForm descricao={descricao} open={open}></PrecificacaoForm>
    </div>
  );
};
