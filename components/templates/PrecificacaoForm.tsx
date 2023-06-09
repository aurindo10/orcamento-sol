import { zodResolver } from "@hookform/resolvers/zod";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { usePrecificationSecondStore, usePrecificationStore } from "bearStore";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { AppRouter } from "server/api/root";
import { api } from "utils/api";
import { z } from "zod";

export type {};
type RouterInput = inferRouterInputs<AppRouter>;
export type CreateParameter = RouterInput["precificaca"]["createParameter"];
const FormSchema = z.object({
  price: z.number().min(1, "Valor é obrigatório"),
  type: z.string().min(1, "Tipo é obrigatório"),
  minPower: z.number().min(0, "Potência mínima é obrigatório"),
  maxPower: z.number().min(0, "Potência máxima é obrigatório"),
  percent: z.number().min(0, "Percentual é obrigatório"),
});
type FormData = z.infer<typeof FormSchema>;
interface PrecificacaoForm {
  descricao: string;
  open: boolean;
  setOpen: (state: boolean) => void;
}
export const PrecificacaoForm = ({
  descricao,
  open,
  setOpen,
}: PrecificacaoForm) => {
  const [btnLoading, setBtnLoading] = useState("");
  const [addPrecifications] = usePrecificationStore((state) => [
    state.addPrecifications,
  ]);
  const [addParameter] = usePrecificationSecondStore((state) => [
    state.addParameter,
  ]);
  const { mutateAsync: createParameter } =
    api.precificaca.createParameter.useMutation();
  const {
    handleSubmit,
    control,
    // formState: { errors },
    reset,
  } = useForm<CreateParameter>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: FormData) => {
    setBtnLoading("loading");
    const createdParameter = await createParameter({
      descricaoId: descricao,
      ...data,
    });
    if (createdParameter) {
      setBtnLoading("");
      setOpen(false);
      addParameter(createdParameter);
      addPrecifications(createdParameter);
      reset();
    } else {
      alert("Erro ao criar parâmetro");
    }
  };
  return (
    <div key={descricao}>
      <input
        type="checkbox"
        id="my-modal-3"
        className="modal-toggle"
        checked={open}
        readOnly
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn-sm btn-circle btn absolute right-2 top-2"
            onClick={() => setOpen(false)}
          >
            ✕
          </label>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full flex-col items-start">
              <label className="label">
                <span className="label-text">Escolha o tipo de parâmetro</span>
              </label>
              <Controller
                name="type"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select
                    className="select-bordered select w-full max-w-xl text-slate-50"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value ? e.target.value : "")
                    }
                  >
                    <option disabled value="">
                      Escolha um
                    </option>
                    <option value={"fixedValue"}>Valor Fixo</option>
                    <option value={"percentByTotal"}>
                      Percentual sobre o total
                    </option>
                    <option value={"perKwp"}>Por kWp</option>
                    <option value={"perRangeKwp"}>Faixa de potência</option>
                    <option value={"amountPanel"}>Quantidade de módulos</option>
                  </select>
                )}
              />
              <label className="label">
                <span className="label-text">Informe a potência</span>
              </label>
              <label className="input-group w-full max-w-xl  text-slate-50">
                <Controller
                  name="minPower"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      placeholder="0.01"
                      onChange={(e) => {
                        if (e.target.value) {
                          field.onChange(parseFloat(e.target.value));
                        } else {
                          field.onChange(e.target.value);
                        }
                      }}
                      className="input-bordered input w-full  text-slate-50"
                    />
                  )}
                />
                <span>Min</span>
                <Controller
                  name="maxPower"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      placeholder="0.01"
                      onChange={(e) => {
                        if (e.target.value) {
                          field.onChange(parseFloat(e.target.value));
                        } else {
                          field.onChange(e.target.value);
                        }
                      }}
                      className="input-bordered input w-full text-slate-50"
                    />
                  )}
                />
                <span>Max</span>
              </label>
              <label className="label">
                <span className="label-text">Valor</span>
              </label>
              <label className="input-group max-w-xl  text-slate-50">
                <Controller
                  name="price"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      onChange={(e) => {
                        if (e.target.value) {
                          field.onChange(parseFloat(e.target.value));
                        } else {
                          field.onChange(e.target.value);
                        }
                      }}
                      placeholder="0.01"
                      className="input-bordered input w-full  text-slate-50"
                    />
                  )}
                />
                <span>R$</span>
                <Controller
                  name="percent"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      onChange={(e) => {
                        if (e.target.value) {
                          field.onChange(parseFloat(e.target.value));
                        } else {
                          field.onChange(e.target.value);
                        }
                      }}
                      placeholder="0.01"
                      className="input-bordered input w-full  text-slate-50"
                    />
                  )}
                />
                <span>%</span>
              </label>
              <div className="flex w-full max-w-xl justify-center">
                <button
                  className={`btn-primary btn mt-4 max-w-md  text-slate-50 ${btnLoading}`}
                  type="submit"
                  key={descricao}
                >
                  Cadastrar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
<label htmlFor="my-modal-3" className="btn">
  open modal
</label>;
