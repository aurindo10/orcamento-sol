"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { inferRouterOutputs } from "@trpc/server";
import { RoofSelector } from "components/molecules/RoofSelector";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlusCircle } from "react-icons/fi";
import { AppRouter } from "server/api/root";
import { api } from "utils/api";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(4, "Nome deve ter no mínimo 4 caracteres"),
  price: z.string().min(0, "Preço deve ser maior que 0"),
  generation: z.string().min(3, "Geração deve ter no mínimo 3 caracteres"),
  inverterBrand: z.string().min(3, "Marca deve ter no mínimo 3 caracteres"),
  panelBrand: z.string().min(3, "Marca deve ter no mínimo 3 caracteres"),
  power: z.string().min(0, "Potência deve ser maior que 0"),
  roofType: z
    .string()
    .min(3, "Tipo de telhado deve ter no mínimo 3 caracteres"),
});
type Product = z.infer<typeof schema>;

export default function ProductCreateModal() {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createProduct } =
    api.product.createProduct.useMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(schema),
  });
  function removeFormatting(value: string) {
    return value.replace(/\./g, "").replace(/,/g, ".");
  }

  const onSubmit = async (data: any) => {
    // Convertendo os valores de string para número
    data.power = parseFloat(removeFormatting(data.power));
    data.price = parseFloat(removeFormatting(data.price));
    console.log(data.price);
    console.log(data.power);
    const productCreated = await createProduct(data);
    if (!productCreated) return alert("Error creating product");
    if (productCreated) setOpen(false);
    if (productCreated) router.refresh();
    reset();
  };
  function handlePriceInput(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/\D/g, "");
    let len = value.length;

    if (len <= 2) {
      value = value.padStart(3, "0");
    } else {
      value = value.replace(/^0+/, ""); // Remove os zeros à esquerda
    }

    value = value.replace(/(\d{1})(\d{2})$/, "$1,$2");
    value = value.replace(/(\d)(?=(\d{3})+\,)/g, "$1.");

    e.target.value = value;
  }
  function formatPotenciaInput(e: React.ChangeEvent<HTMLInputElement>) {
    const regex = /^[0-9]*[,]{0,1}[0-9]*$/;
    if (!regex.test(e.target.value)) {
      e.target.value = e.target.value.substring(0, e.target.value.length - 1);
    }
  }
  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger asChild>
        <button
          className="btn-secondary btn-square  btn border-blue-500 bg-blue-500"
          onClick={() => setOpen(true)}
        >
          <FiPlusCircle size={32} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-blackA9 data-[state=open]:animate-overlayShow " />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh]  w-[90vw] max-w-[350px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-slate-800 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog.Title className="m-0 text-[17px]  font-medium text-slate-50">
              Criar Produto
            </Dialog.Title>
            <Dialog.Description className="mb-5 mt-[10px] text-right text-[15px] leading-normal text-slate-400">
              Coloque as informações do produto
            </Dialog.Description>
            <div className="space-y-1">
              <fieldset className="px-4">
                <div>
                  <label
                    className=" w-14 text-start text-[15px] text-slate-50"
                    htmlFor="name"
                  >
                    Descrição
                  </label>
                  <input
                    className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] bg-slate-700 px-[10px] text-[15px] leading-none text-slate-50 shadow-[0_0_0_1px] shadow-slate-500 outline-none focus:shadow-[0_0_0_2px] focus:shadow-slate-400"
                    id="name"
                    {...register("name")}
                  />
                </div>
                <div className="h-[10px]">
                  {errors.name && (
                    <p className="text-[10px] text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </fieldset>
              <fieldset className="px-4">
                <label
                  className="w-14 text-start text-[15px] text-slate-50"
                  htmlFor="panelBrand"
                >
                  Painel
                </label>
                <input
                  className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] bg-slate-700 px-[10px] text-[15px] leading-none text-slate-50 shadow-[0_0_0_1px] shadow-slate-500 outline-none focus:shadow-[0_0_0_2px] focus:shadow-slate-400"
                  id="panelBrand"
                  {...register("panelBrand")}
                />
                <div className="h-[10px]">
                  {errors.panelBrand && (
                    <p className="text-[10px] text-red-500">
                      {errors.panelBrand.message}
                    </p>
                  )}
                </div>
              </fieldset>

              <fieldset className="px-4">
                <label
                  className=" w-14 text-start text-[15px] text-slate-50"
                  htmlFor="inverterBrand"
                >
                  Inversor
                </label>
                <input
                  className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] bg-slate-700 px-[10px] text-[15px] leading-none text-slate-50 shadow-[0_0_0_1px] shadow-slate-500 outline-none focus:shadow-[0_0_0_2px] focus:shadow-slate-400"
                  id="inverterBrand"
                  {...register("inverterBrand")}
                />
                <div className="h-[10px]">
                  {errors.inverterBrand && (
                    <p className="text-[10px] text-red-500">
                      {errors.inverterBrand.message}
                    </p>
                  )}
                </div>
              </fieldset>
              <fieldset className="px-4">
                <label
                  className=" w-14 text-start text-[15px] text-slate-50"
                  htmlFor="generation"
                >
                  Geração (kWh)
                </label>
                <input
                  type="number"
                  className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] bg-slate-700 px-[10px] text-[15px] leading-none text-slate-50 shadow-[0_0_0_1px] shadow-slate-500 outline-none focus:shadow-[0_0_0_2px] focus:shadow-slate-400"
                  id="generation"
                  {...register("generation")}
                />
                <div className="h-[10px]">
                  {errors.generation && (
                    <p className="text-[10px] text-red-500">
                      {errors.generation.message}
                    </p>
                  )}
                </div>
              </fieldset>
              <fieldset className="px-4">
                <label
                  className="tex-start w-14 text-[15px] text-slate-50"
                  htmlFor="power"
                >
                  Potência (kWp)
                </label>
                <input
                  type="text"
                  className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] bg-slate-700 px-[10px] text-[15px] leading-none text-slate-50 shadow-[0_0_0_1px] shadow-slate-500 outline-none focus:shadow-[0_0_0_2px] focus:shadow-slate-400"
                  id="power"
                  {...register("power")}
                  onInput={formatPotenciaInput}
                />
                <div className="h-[10px]">
                  {errors.power && (
                    <p className="text-[10px] text-red-500">
                      {errors.power.message}
                    </p>
                  )}
                </div>
              </fieldset>

              <fieldset className="px-4">
                <label
                  className="tex-start w-14 text-[15px] text-slate-50"
                  htmlFor="price"
                >
                  Preço (R$)
                </label>
                <input
                  type="text"
                  className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] bg-slate-700 px-[10px] text-[15px] leading-none text-slate-50 shadow-[0_0_0_1px] shadow-slate-500 outline-none focus:shadow-[0_0_0_2px] focus:shadow-slate-400"
                  id="price"
                  {...register("price")}
                  onInput={handlePriceInput}
                />
                <div className="h-[10px]">
                  {errors.price && (
                    <p className="text-[10px] text-red-500">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </fieldset>
            </div>
            <fieldset className="mb-4  mt-2  space-y-1 px-4">
              <div className="flex justify-end">
                <label
                  className=" tex-start mr-2 mt-[-2px] w-14 text-start text-[15px] text-slate-50"
                  htmlFor="roofType"
                >
                  Telhado:
                </label>
                <RoofSelector
                  setValue={setValue}
                  keySelector={"roofType"}
                ></RoofSelector>
              </div>
              <div className="mb-2 flex h-[10px] justify-end">
                {errors.roofType && (
                  <p className="text-[10px] text-red-500">
                    {errors.roofType.message}
                  </p>
                )}
              </div>
            </fieldset>
            <div className="mt-[1px] flex justify-end">
              <Dialog.Close asChild>
                <button
                  type="submit"
                  className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-green4 px-[15px] font-medium leading-none text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 focus:outline-none"
                >
                  Criar Produto
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button
                onClick={() => setOpen(false)}
                className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
                aria-label="Close"
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
