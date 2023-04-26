import { usePrecificationSecondStore } from "bearStore";
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
  const { mutateAsync: dellPrecification } =
    api.precificaca.dellPrecification.useMutation();
  const handleDelete = async () => {
    const deletedParametro = await dellPrecification({ id: id });
    if (deletedParametro) {
      deleteParameter(deletedParametro);
    }
  };
  return (
    <div>
      <input
        type="checkbox"
        id="my-modal-3"
        className="modal-toggle"
        checked={openModaldelete}
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
          <h3 className="text-lg font-bold">
            Você tem certeza que deseja deletar este parâmetro?
          </h3>
          <button
            className="btn-primary btn"
            onClick={() => setOpenModaldelete(false)}
          >
            Não
          </button>
          <button
            className="btn-primary btn"
            onClick={() => {
              handleDelete(), setOpenModaldelete(false);
            }}
          >
            {" "}
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};
