"use client";
import { Product } from "@prisma/client";
import { ProductFeed } from "components/organisms/ProductFeed";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "utils/api";
import { useState } from "react";
import { z } from "zod";
// import { Kafka } from "@upstash/kafka";
import { useUser } from "@clerk/nextjs";

// const kafka = new Kafka({
//   url: "https://evolved-toad-5826-us1-rest-kafka.upstash.io",
//   username: "ZXZvbHZlZC10b2FkLTU4MjYkQSkI789q3N4nRDTHDUktLIcBDIureSPBSMORyoA",
//   password: "2e231c364d1044f99a4b584d309a43fa",
// });
// export const p = kafka.producer();
// export const c = kafka.consumer();

const FormSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  telefone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .regex(
      /^\d{2}-\d{5}-\d{4}$/,
      "Formato do telefone inválido: 00-00000-0000"
    ),
  consumo: z.number().min(1, "Consumo é obrigatório e deve ser maior que 0"),
  roofType: z.string().min(1, "Tipo de telhado é obrigatório"),
});
type FormData = z.infer<typeof FormSchema>;

export function OrcamentoForm() {
  const { data: allSurfaces, status: statusAllSurfaces } =
    api.fortlev.getAllSurfaces.useQuery();
  const { user } = useUser();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any>([]);

  // const { mutateAsync: lookForProductByPower } =
  //   api.product.lookForProductByPowerAndRoof.useMutation();
  const { mutateAsync: getPricesFromFortlev } =
    api.fortlev.getPricesFromFortlev.useMutation();
  const { mutateAsync: creatProposta } =
    api.proposta.creatProposta.useMutation();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const { nome, telefone, consumo } = data;
    const message = [
      { userId: user?.id },
      { cliente: data.nome },
      { telefone: data.telefone },
      { consumo: data.consumo },
    ];
    // const res = await p.produce("logs", message);
    const createdClient = await creatProposta({
      firstName: nome,
      consumo: consumo,
      roofType: data.roofType,
      phone: telefone,
    });
    const foundProducts = await getPricesFromFortlev({
      power: consumo,
      roofType: data.roofType,
    });
    setLoading(false);
    setProducts(foundProducts!);
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D+/g, "");
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (match) {
      const formatted = [match[1], match[2], match[3]]
        .filter(Boolean)
        .join("-");
      return formatted.slice(0, 13); // Limitar a 13 caracteres
    }
    return value;
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md-px-4 flex h-full flex-col items-center "
    >
      {/* Nome field */}
      <div>
        <label className="label">
          <span className="label-text">Nome do Cliente</span>
        </label>
        <Controller
          name="nome"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <label className="input-group flex justify-center">
              <span className="w-24 text-slate-50">Nome</span>
              <input
                {...field}
                type="text"
                placeholder="Nome do Cliente"
                className="input-bordered input text-slate-50"
              />
            </label>
          )}
        />
        {errors.nome && <p className="text-red-600">{errors.nome.message}</p>}
      </div>

      {/* Telefone field */}
      <div>
        <label className="label">
          <span className="label-text">Telefone do Cliente</span>
        </label>
        <Controller
          name="telefone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <label className="input-group flex justify-center">
              <span className="w-24 text-slate-50">Telefone</span>
              <input
                {...field}
                type="tel"
                maxLength={13}
                placeholder="Telefone do cliente"
                className="input-bordered input text-slate-50"
                onChange={(e) =>
                  field.onChange(formatPhoneNumber(e.target.value))
                }
              />
            </label>
          )}
        />
        {errors.telefone && (
          <p className="text-red-600">{errors.telefone.message}</p>
        )}
      </div>

      {/* Consumo field */}
      <div>
        <label className="label">
          <span className="label-text">Energia Consumida em kWh</span>
        </label>
        <Controller
          name="consumo"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <label className="input-group flex justify-center">
              <span className="w-24 text-slate-50">Consumo</span>
              <input
                {...field}
                type="number"
                placeholder="Energia consumida"
                className="input-bordered input text-slate-50"
                onChange={(e) =>
                  field.onChange(e.target.value ? parseInt(e.target.value) : "")
                }
              />
            </label>
          )}
        />
        {errors.consumo && (
          <p className="text-red-600">{errors.consumo.message}</p>
        )}
      </div>
      <div>
        <label className="label">
          <span className="label-text">Tipo de Telhado</span>
        </label>
        <Controller
          name="roofType"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select
              {...field}
              className="select-error select w-full max-w-xs text-slate-50"
              onChange={(e) => {
                field.onChange(e.target.value ? e.target.value : "");
              }}
            >
              <option
                className="text-slate-50 disabled:text-slate-50"
                value={""}
                disabled
              >
                Selecione
              </option>
              {statusAllSurfaces === "loading"
                ? "carregando..."
                : allSurfaces.docs.map((surface: any) => {
                    return (
                      <option
                        className="text-slate-50 disabled:text-slate-50"
                        value={surface._id}
                        key={surface._id}
                      >
                        {surface.name}
                      </option>
                    );
                  })}
            </select>
          )}
        />
        {errors.roofType && (
          <p className="text-red-600">{errors.roofType.message}</p>
        )}
      </div>
      <button type="submit" className="btn-primary btn my-4">
        Procurar Sistema
      </button>
      <div>
        {loading ? (
          <button className="loading btn">Carregando</button>
        ) : (
          <ProductFeed product={products}></ProductFeed>
        )}
      </div>
    </form>
  );
}
