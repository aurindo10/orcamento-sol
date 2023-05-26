/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { usePropostaStore } from "bearStore";
import { RoofSelector } from "components/molecules/RoofSelector";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiEdit } from "react-icons/fi";
import { api } from "utils/api";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(4, "Nome deve ter no mínimo 4 caracteres"),
  city: z.string(),
});
type Proposta = z.infer<typeof schema>;
export interface createPropostaModal {
  propostaInfo: {
    productName: string;
    roofType: string;
    power: string;
    generation: string;
    inverter: string;
    panel: string;
    value: string;
  };
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreatePropostaModal({
  propostaInfo,
  open,
  setOpen,
}: createPropostaModal) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Proposta>({
    resolver: zodResolver(schema),
  });
  const [clientName] = usePropostaStore((state) => [state.clientName]);
  useEffect(() => {
    setValue("name", clientName);
  }, [open]);
  const { mutateAsync: createPdf } = api.proposta.getPdf.useMutation();
  const [loading, setLoading] = useState("");
  const onSubmit = async () => {
    const handleCreatePdf = async () => {
      setLoading("loading");
      function base64ToBlob(base64: string, type: string): Blob {
        const binStr = atob(base64);
        const len = binStr.length;
        const arr = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          arr[i] = binStr.charCodeAt(i);
        }
        return new Blob([arr], { type });
      }
      const pdfInBase64 = await createPdf({
        productName: propostaInfo.productName,
        name: getValues("name"),
        generation: propostaInfo.generation.toString(),
        inverter: propostaInfo.inverter,
        roofType: propostaInfo.roofType,
        power: propostaInfo.power.toString(),
        city: getValues("city"),
        panel: propostaInfo.panel,
        area: "xx",
        value: propostaInfo.value.toString(),
      });
      if (pdfInBase64) {
        const pdfBlob = base64ToBlob(pdfInBase64, "application/pdf");
        const objectUrl = URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = objectUrl;
        link.download = "file.pdf";
        link.click();
        URL.revokeObjectURL(objectUrl);
        setLoading("");
      }
    };
    handleCreatePdf();
  };
  return (
    <Dialog.Root open={open} onOpenChange={() => setOpen(!open)}>
      <div></div>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-blackA9 data-[state=open]:animate-overlayShow" />
        <Dialog.Content
          onOpenAutoFocus={(event) => event.preventDefault()}
          className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-neutral p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow"
        >
          <form className="grid" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mb-4 text-lg font-bold text-white">
              Crie uma proposta
            </h3>
            <div className="flex gap-4">
              <div className="form-control w-2/3">
                <label className="label">
                  <span className="label-text">Nome do Cliente</span>
                </label>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Digite o nome do Cliente"
                      className="input-bordered input w-full text-white"
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="form-control w-2/3">
                <label className="label">
                  <span className="label-text">Nome da Cidade</span>
                </label>
                <Controller
                  name="city"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Digite o nome da Cidade"
                      className="input-bordered input w-full text-white"
                    />
                  )}
                />
              </div>
            </div>
            <span className="text-center text-xs text-red-600">
              {errors.name?.message || errors.city?.message}
            </span>
            <div className="flex justify-end gap-6">
              <button
                className="btn-secondary btn mt-4"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </button>
              <button
                className={`btn-success btn mt-4 ${loading}`}
                id="ola"
                onClick={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
              >
                Baixar
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
