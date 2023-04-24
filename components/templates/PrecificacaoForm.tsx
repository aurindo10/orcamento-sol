import { zodResolver } from "@hookform/resolvers/zod";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
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
  descricao: z.string().min(1, "Descrição é obrigatório"),
  percent: z.number().min(0, "Percentual é obrigatório"),
});
type FormData = z.infer<typeof FormSchema>;

export const PrecificacaoForm = () => {
  const { mutateAsync: createParameter } =
    api.precificaca.createParameter.useMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CreateParameter>({
    resolver: zodResolver(FormSchema),
  });
  const onSubmit = async (data: FormData) => {
    console.log("ssasa");
    const createdParameter = await createParameter(data);
    reset();
  };
  console.log(errors);
  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full flex-col items-start">
        <label className="label">
          <span className="label-text">Descrição</span>
        </label>
        <Controller
          name="descricao"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="0.01"
              className=" input w-full max-w-xl"
            />
          )}
        />

        <label className="label">
          <span className="label-text">Escolha o tipo de parâmetro</span>
        </label>
        <Controller
          name="type"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select
              className="select-bordered select w-full max-w-xl"
              {...field}
              onChange={(e) =>
                field.onChange(e.target.value ? e.target.value : "")
              }
            >
              <option disabled value="">
                Escolha um
              </option>
              <option value={"fixedValue"}>Valor Fixo</option>
              <option value={"percentByTotal"}>Percentual sobre o total</option>
              <option value={"perKwp"}>Por kWp</option>
              <option value={"perRangeKwp"}>Faixa de potência</option>
              <option value={"amountPanel"}>Quantidade de módulos</option>
            </select>
          )}
        />
        <label className="label">
          <span className="label-text">Informe a potência</span>
        </label>
        <label className="input-group w-full max-w-xl">
          <Controller
            name="minPower"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                placeholder="0.01"
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                className="input-bordered input w-full"
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
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                className="input-bordered input w-full"
              />
            )}
          />
          <span>Max</span>
        </label>
        <label className="label">
          <span className="label-text">Valor</span>
        </label>
        <label className="input-group max-w-xl">
          <Controller
            name="price"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                placeholder="0.01"
                className="input-bordered input w-full"
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
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                placeholder="0.01"
                className="input-bordered input w-full"
              />
            )}
          />

          <span>%</span>
        </label>
        <div className="flex w-full max-w-xl justify-center">
          <button className="btn-primary btn mt-4 max-w-md" type="submit">
            Cadastrar
          </button>
        </div>
      </div>
    </form>
  );
};
