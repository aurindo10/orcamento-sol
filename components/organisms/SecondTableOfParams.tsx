import { usePrecificationSecondStore } from "bearStore";
import { DeleteModalParametroMaster } from "components/molecules/DeleteModalDescricao";
import { DeleteModalParam } from "components/molecules/DeleteParmModal";
import { DescricaoCard } from "components/molecules/DescricaoCard";
import { PrecificacaoForm } from "components/templates/PrecificacaoForm";
import { useEffect, useState } from "react";
import { api } from "utils/api";

export const SecondTableOfParams = () => {
  const [name, setName] = useState("");
  const [openModaldelete, setOpenModaldelete] = useState(false);
  const [idParametroMaster, setIdParametroMaster] = useState("");
  const [btnLoading, setBtnLoading] = useState("");
  const [openModaldeleteparametroMaster, setOpenModaldeleteParametroMaster] =
    useState(false);
  const [idParametro, setIdParametro] = useState("");
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
    if (allDescricaoFromDB) {
      setDescricoes(allDescricaoFromDB);
    }
  }, [status, allDescricaoFromDB]);
  if (status === "loading")
    return <div className="text-slate-50">Carregando...</div>;
  return (
    <div className="py-4">
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            value={name}
            placeholder="Descrição..."
            required
            className="input-bordered input w-full max-w-lg text-slate-50"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <button
            className={`btn-primary btn ${btnLoading}`}
            onClick={async () => {
              if (name) {
                setBtnLoading("loading");
                const createdDescricao = await createDescricao({
                  name: name,
                });
                if (createdDescricao) {
                  addDescricoes(createdDescricao);
                  setName("");
                  setBtnLoading("");
                }
              } else {
                alert("Preencha o campo de descrição");
              }
            }}
          >
            Cadastrar
          </button>
        </div>
      </div>
      {descricoes.map((descricao) => {
        return (
          <DescricaoCard
            key={descricao.id}
            descricaoInfo={descricao}
            setOpenModaldelete={setOpenModaldelete}
            setIdParametro={setIdParametro}
            setOpen={setOpen}
            setDescricao={setDescricao}
            open={open}
            setIdParametroMaster={setIdParametroMaster}
            setOpenModaldeleteParametroMaster={
              setOpenModaldeleteParametroMaster
            }
          ></DescricaoCard>
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
      <DeleteModalParametroMaster
        id={idParametroMaster}
        setOpenModaldeleteParametroMaster={setOpenModaldeleteParametroMaster}
        openModaldeleteparametroMaster={openModaldeleteparametroMaster}
      ></DeleteModalParametroMaster>
    </div>
  );
};
