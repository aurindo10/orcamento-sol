import { usePrecificationSecondStore } from "bearStore";
import { useState } from "react";
import { api } from "utils/api";
interface DeleteModalParamProps {
  id: string;
  openModaldelete: boolean;
  setOpenModaldelete: (state: boolean) => void;
}
export const DeleteModalParam = ({
  id,
  openModaldelete,
  setOpenModaldelete,
}: DeleteModalParamProps) => {
  const [deleteParameter] = usePrecificationSecondStore((state) => [
    state.deleteParameter,
  ]);
  const [btnLoading, setBtnLoading] = useState("");

  const { mutateAsync: dellPrecification } =
    api.precificaca.dellPrecification.useMutation();
  const handleDelete = async () => {
    setBtnLoading("loading");
    const deletedParametro = await dellPrecification({ id: id });
    if (deletedParametro) {
      setBtnLoading("");
      deleteParameter(deletedParametro);
      setOpenModaldelete(false);
    }
  };
  return (
    <div>
      <input
        type="checkbox"
        id="my-modal-3"
        className="modal-toggle"
        checked={openModaldelete}
        readOnly
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn-sm btn-circle btn absolute right-2 top-2"
            onClick={() => setOpenModaldelete(false)}
          >
            ✕
          </label>
          <h3 className="max-w-md text-lg font-bold text-slate-50">
            Você tem certeza que deseja deletar este parâmetro?
          </h3>
          <div className="flex justify-end gap-2 py-4">
            <button
              className="btn-primary btn"
              onClick={() => setOpenModaldelete(false)}
            >
              Não
            </button>
            <button
              className={`btn-primary btn ${btnLoading}`}
              onClick={() => {
                handleDelete();
              }}
            >
              Deletar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
