"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { FiPlusCircle } from "react-icons/fi";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(4, "Nome deve ter no mínimo 4 caracteres"),
  brand: z.string().min(2, "Marca deve ter no mínimo 2 caracteres"),
});
type Product = z.infer<typeof schema>;
interface Produto {
  product: {
    id_produto: number;
    nome: string;
    Marca: string;
  };
}
export default function AddProductModal({ product }: Produto) {
  const [open, setOpen] = useState(false);
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
  //   const onSubmit = async (data: Product) => {
  //     if (!productCreated) return alert("Error creating product");
  //     if (productCreated) setOpen(false);
  //     if (productCreated) router.refresh();
  //     reset();
  //   };
  return (
    <div>
      <button
        className="p-2 text-slate-50 hover:bg-slate-700 hover:text-slate-50"
        onClick={() => setOpen(true)}
      >
        <FiPlusCircle size={32} />
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        Criar Produto Coloque as informações do produto
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
            htmlFor="marca"
          >
            Marca
          </label>
          <input
            className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-slate-50 shadow-[0_0_0_1px] shadow-slate-500 outline-none focus:shadow-[0_0_0_2px] focus:shadow-slate-400"
            id="marca"
            {...register("brand")}
          />
        </fieldset>
        <div className="min-h-6 w-full">
          {errors.brand && (
            <p className="text-center text-sm text-red-500">
              {errors.brand.message}
            </p>
          )}
        </div>
        <div className="mt-[1px] flex justify-end">
          <button
            type="submit"
            className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-green4 px-[15px] font-medium leading-none text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 focus:outline-none"
          >
            Criar Produto
          </button>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
          aria-label="Close"
        >
          <Cross2Icon />
        </button>
      </form>
    </div>
  );
}
