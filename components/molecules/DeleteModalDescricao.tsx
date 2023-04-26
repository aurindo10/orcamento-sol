import { usePrecificationSecondStore } from "bearStore";
import { api } from "utils/api";
interface DeleteModalParamProps {
  id: string;
  openModaldeleteparametroMaster: boolean;
  setOpenModaldeleteParametroMaster: (state: boolean) => void;
}
export const DeleteModalParametroMaster = ({
  id,
  openModaldeleteparametroMaster,
  setOpenModaldeleteParametroMaster,
}: DeleteModalParamProps) => {
  const [deleteOnedDescricao] = usePrecificationSecondStore((state) => [
    state.deleteOnedDescricao,
  ]);
  const { mutateAsync: dellDescricao } =
    api.descricao.deleteDescricao.useMutation();
  const handleDelete = async () => {
    const deleteDescricao = await dellDescricao({ id: id });
    if (deleteDescricao) {
      deleteOnedDescricao(deleteDescricao);
    }
  };
  return (
    <div>
      <input
        type="checkbox"
        id="my-modal-3"
        className="modal-toggle"
        checked={openModaldeleteparametroMaster}
        readOnly
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn-sm btn-circle btn absolute right-2 top-2"
            onClick={() => setOpenModaldeleteParametroMaster(false)}
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-slate-50">
            Você tem certeza que deseja deletar?
          </h3>
          <button
            className="btn-primary btn"
            onClick={() => setOpenModaldeleteParametroMaster(false)}
          >
            Não
          </button>
          <button
            className="btn-primary btn"
            onClick={() => {
              handleDelete(), setOpenModaldeleteParametroMaster(false);
            }}
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};
