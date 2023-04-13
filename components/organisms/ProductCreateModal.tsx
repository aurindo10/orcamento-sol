"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { inferRouterOutputs } from "@trpc/server";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlusCircle } from "react-icons/fi";
import { AppRouter } from "server/api/root";
import { api } from "utils/api";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(4, "Nome deve ter no mínimo 4 caracteres"),
  price: z.number().min(0, "Preço deve ser maior que 0"),
  generation: z.string().min(3, "Geração deve ter no mínimo 3 caracteres"),
  inverterBrand: z.string().min(3, "Marca deve ter no mínimo 3 caracteres"),
  panelBrand: z.string().min(3, "Marca deve ter no mínimo 3 caracteres"),
  power: z.number().min(0, "Potência deve ser maior que 0"),
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
  const onSubmit = async (data: Product) => {
    const productCreated = await createProduct(data);
    if (!productCreated) return alert("Error creating product");
    if (productCreated) setOpen(false);
    if (productCreated) router.refresh();
    reset();
  };
  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger asChild>
        <button
          className="w-8 p-2  hover:bg-slate-700 hover:text-slate-50 text-slate-50 "
          onClick={() => setOpen(true)}
        >
          <FiPlusCircle size={32} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%]  max-h-[85vh] w-[90vw] max-w-[350px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-slate-800 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog.Title className="m-0 text-[17px]  text-slate-50 font-medium">
              Criar Produto
            </Dialog.Title>
            <Dialog.Description className="mb-5 w-24 mt-[10px] text-[15px] leading-normal text-slate-400">
              Coloque as informações do produto
            </Dialog.Description>
            <fieldset className="mb-[1px] flex items-center gap-5 px-4">
              <label
                className=" text-right text-[15px] text-slate-50"
                htmlFor="name"
              >
                Nome
              </label>
              <input
                className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-slate-50 shadow-[0_0_0_1px] shadow-slate-500 outline-none focus:shadow-[0_0_0_2px] focus:shadow-slate-400"
                id="name"
                {...register("name")}
              />
            </fieldset>
            <div className="min-h-6 w-full">
              {errors.name && (
                <p className="text-center text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <fieldset className="mb-[1px] flex items-center gap-5 px-4">
              <label
                className=" text-right text-[15px] text-slate-50"
                htmlFor="panelBrand"
              >
                Painel
              </label>
              <input
                className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-slate-50 shadow-[0_0_0_1px] shadow-slate-500 outline-none focus:shadow-[0_0_0_2px] focus:shadow-slate-400"
                id="panelBrand"
                {...register("panelBrand")}
              />
            </fieldset>
            <div className="min-h-6 w-full">
              {errors.panelBrand && (
                <p className="text-center text-sm text-red-500">
                  {errors.panelBrand.message}
                </p>
              )}
            </div>
            <fieldset className="mb-[1px] flex items-center gap-5 px-4">
              <label
                className=" text-right text-[15px] text-slate-50"
                htmlFor="inverterBrand"
              >
                Inversor
              </label>
              <input
                className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-slate-50 shadow-[0_0_0_1px] shadow-slate-500 outline-none focus:shadow-[0_0_0_2px] focus:shadow-slate-400"
                id="inverterBrand"
                {...register("inverterBrand")}
              />
            </fieldset>
            <div className="min-h-6 w-full">
              {errors.inverterBrand && (
                <p className="text-center text-sm text-red-500">
                  {errors.inverterBrand.message}
                </p>
              )}
            </div>
            <fieldset className="mb-[1px] flex items-center gap-5 px-4">
              <label
                className=" text-right text-[15px] text-slate-50"
                htmlFor="generation"
              >
                Geração
              </label>
              <input
                className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-slate-50 shadow-[0_0_0_1px] shadow-slate-500 outline-none focus:shadow-[0_0_0_2px] focus:shadow-slate-400"
                id="generation"
                {...register("generation")}
              />
            </fieldset>
            <div className="min-h-6 w-full">
              {errors.generation && (
                <p className="text-center text-sm text-red-500">
                  {errors.generation.message}
                </p>
              )}
            </div>
            <fieldset className="mb-[1px] flex items-center gap-5 px-4">
              <label
                className=" text-right text-[15px] text-slate-50"
                htmlFor="power"
              >
                Potência
              </label>
              <input
                className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-slate-50 shadow-[0_0_0_1px] shadow-slate-500 outline-none focus:shadow-[0_0_0_2px] focus:shadow-slate-400"
                id="power"
                {...register("power")}
              />
            </fieldset>
            <div className="min-h-6 w-full">
              {errors.power && (
                <p className="text-center text-sm text-red-500">
                  {errors.power.message}
                </p>
              )}
            </div>
            <fieldset className="mb-[1px] flex items-center gap-5 px-4">
              <label
                className=" text-right text-[15px] text-slate-50"
                htmlFor="roofType"
              >
                Telhado
              </label>
              <input
                className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-slate-50 shadow-[0_0_0_1px] shadow-slate-500 outline-none focus:shadow-[0_0_0_2px] focus:shadow-slate-400"
                id="roofType"
                {...register("roofType")}
              />
            </fieldset>
            <div className="min-h-6 w-full">
              {errors.roofType && (
                <p className="text-center text-sm text-red-500">
                  {errors.roofType.message}
                </p>
              )}
            </div>
            <fieldset className="mb-[1px] flex items-center gap-5 px-4">
              <label
                className=" text-right text-[15px] text-slate-50"
                htmlFor="price"
              >
                Preço
              </label>
              <input
                className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-slate-50 shadow-[0_0_0_1px] shadow-slate-500 outline-none focus:shadow-[0_0_0_2px] focus:shadow-slate-400"
                id="price"
                {...register("price")}
              />
            </fieldset>
            <div className="min-h-6 w-full">
              {errors.price && (
                <p className="text-center text-sm text-red-500">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div className="mt-[1px] flex justify-end">
              <Dialog.Close asChild>
                <button
                  type="submit"
                  className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
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
