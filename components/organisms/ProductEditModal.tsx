/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { RoofSelector } from "components/molecules/RoofSelector";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit } from "react-icons/fi";
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
interface ProductEditModalProps {
  editProduct: Product;
}

export default function ProductEditModal({ editProduct }: any) {
  const [open, setOpen] = useState(false);
  const { mutateAsync: updateProduct } =
    api.product.updateProduct.useMutation();
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
    data.id = editProduct.id;
    data.power = parseFloat(removeFormatting(data.power));
    data.price = parseFloat(removeFormatting(data.price));
    data.id = editProduct.id;
    const productCreated = await updateProduct(data);
    if (!productCreated) return alert("Error creating product");
    if (productCreated) setOpen(false);
    if (productCreated) router.refresh();
    reset();
  };
  useEffect(() => {
    setValue("name", editProduct.name);
    setValue("price", editProduct.price);
    setValue("generation", editProduct.generation);
    setValue("inverterBrand", editProduct.inverterBrand);
    setValue("panelBrand", editProduct.panelBrand);
    setValue("power", editProduct.power);
    setValue("roofType", editProduct.roofType);
  }, [open]);
  function handlePriceInput(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/\D/g, "");
    const len = value.length;

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
          className="btn-square btn-sm btn border-blue-500 bg-blue-500 text-slate-50"
          onClick={() => setOpen(true)}
        >
          <FiEdit size={12}></FiEdit>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-blackA9 data-[state=open]:animate-overlayShow " />
        <Dialog.Content
          onOpenAutoFocus={(event) => event.preventDefault()}
          className="fixed left-[50%] top-[50%] max-h-[85vh] w-full max-w-[90%] -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-slate-800 px-4 py-6 text-slate-50 shadow-lg md:max-w-[350px] md:px-8 md:py-10"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-1 px-2 py-4">
              <div className="Descrição flex w-full justify-between px-4">
                <fieldset className="mr-4 flex w-full flex-col justify-start">
                  <label
                    className=" w-14 text-start text-[15px] text-slate-50"
                    htmlFor="name"
                  >
                    Descrição
                  </label>
                  <input
                    className="inline-flex h-[35px] w-full items-center justify-center rounded-[4px] bg-slate-700 pl-[10px] text-[15px] leading-none text-slate-50 shadow-[0_0_0_1px] shadow-slate-500 outline-none focus:shadow-[0_0_0_2px] focus:shadow-slate-400"
                    id="name"
                    {...register("name")}
                  />
                  <div className="h-[10px]">
                    {errors.name && (
                      <p className="text-[10px] text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </fieldset>
                <fieldset className="flex flex-col items-center justify-center">
                  <label
                    className="tex-start w-14 text-[15px] text-slate-50"
                    htmlFor="power"
                  >
                    P(kWp)
                  </label>
                  <input
                    type="text"
                    className="inline-flex h-[35px] w-16 flex-1 items-center justify-center rounded-[4px] bg-slate-700 px-[10px] text-[15px] leading-none text-slate-50 shadow-[0_0_0_1px] shadow-slate-500 outline-none focus:shadow-[0_0_0_2px] focus:shadow-slate-400"
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
              </div>
              <div className="segundo flex h-[70px] w-full justify-between px-4 ">
                <fieldset className="mr-4 flex w-full flex-col justify-start">
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
                <fieldset className="flex h-auto w-36 flex-col items-start">
                  <label
                    className="w-32  text-start text-[15px] text-slate-50"
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
              </div>
              <div className="terceiro flex h-[70px] justify-between px-4">
                <fieldset className=" flex flex-col justify-start">
                  <label
                    className=" mr-4 text-start text-[15px] text-slate-50"
                    htmlFor="generation"
                  >
                    Geração(kWh)
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
                <fieldset className="ml-4 flex flex-col justify-start">
                  <label
                    className="tex-start w-18 text-[15px] text-slate-50"
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
            </div>
            <fieldset className="mb-1  space-y-1 px-6">
              <div className="flex justify-end">
                <label
                  className=" tex-start mr-2 w-14 text-start text-[15px] text-slate-50"
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
            <div className="mt-[1px] flex justify-end px-6">
              <Dialog.Close asChild>
                <button
                  type="submit"
                  className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-green4 px-[15px] font-medium leading-none text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 focus:outline-none"
                >
                  Atualizar Produto
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
