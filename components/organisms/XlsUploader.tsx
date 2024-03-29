"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { api } from "utils/api";
import { useUploadThing } from "utils/lib/uploadThing2";
import * as XLSX from "xlsx";

interface Product {
  name: string;
  price: number;
  discount: number;
  power: number;
  roofType: string;
  generation: number;
  panelBrand: string;
  inverterBrand: string;
  whoCreatedId: string;
}

const ExcelToJson: React.FC = () => {
  const router = useRouter();
  const [jsonData, setJsonData] = useState<Product[]>([]);
  const [status, setStatus] = useState("Aguardando envio...");

  const { isLoaded, isSignedIn, user } = useUser();
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [isThereFile, setIsThereFile] = useState(true); // [
  const [isFileSent, setIsFileSent] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFileLoading(true);
    setStatus("Carregando arquivo...");
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setIsFileLoading(false);
      return;
    } else {
      setIsThereFile(false);
      console.log(file);
      setStatus("Enviando para a nuvem...");
      startUpload([file]);
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setIsFileLoading(false);
      const data = event.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      if (sheetName) {
        const worksheet = workbook.Sheets[sheetName];
        if (worksheet) {
          const json = XLSX.utils.sheet_to_json<Product>(worksheet);
          console.log(json);
          setJsonData(json);
        } else {
          alert("Não foi possível encontrar a planilha no arquivo fornecido.");
        }
      } else {
        alert("Não foi possível encontrar a planilha no arquivo fornecido.");
      }
    };
    reader.readAsBinaryString(file);
  };
  const { mutateAsync: createManyProducts } =
    api.product.createManyProducts.useMutation();
  const { mutateAsync: deleteAllProducts } =
    api.product.deleteAllProducts.useMutation();
  const handleSaveToDatabase = async () => {
    setStatus("Gravando produtos no banco de dados...");
    try {
      const products = jsonData.map((item) => {
        return {
          name: item.name,
          price: item.price,
          discount: item.discount,
          power: item.power,
          roofType: item.roofType,
          generation: item.generation,
          panelBrand: item.panelBrand,
          inverterBrand: item.inverterBrand,
          whoCreatedId: isLoaded ? user!.id : "", // Ajuste conforme necessário para fornecer um ID de usuário válido
        };
      });
      const deletedProducts = await deleteAllProducts();
      if (deletedProducts) console.log("produtos deletados com sucesso");
      const createdProducts = await createManyProducts({
        data: products,
      });
      if (createdProducts) {
        setIsFileSent(false);
        router.push("/");
        console.log("produtos carregados com sucesso");
      }
      // alert("Produtos salvos no banco de dados com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar produtos no banco de dados:", error);
      alert("Erro ao salvar produtos no banco de dados.");
    }
  };

  const { startUpload, isUploading } = useUploadThing("pdfUploader", {
    onClientUploadComplete: async () => {
      setStatus("Gravar preços");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
  });

  return (
    <div className="flex w-full flex-col items-end">
      <div className="flex w-full items-center justify-end">
        <button
          className={`${
            isUploading ? "loading" : ""
          } btn-primary btn ml-2 mt-2 max-w-md`}
          disabled={status !== "Gravar preços"}
          onClick={handleSaveToDatabase}
        >
          {status}
        </button>
      </div>
      <input
        type="file"
        accept=".xls,.xlsx"
        onChange={handleFileChange}
        className="file-input-bordered file-input-primary file-input mt-2 w-full max-w-xs"
      />
    </div>
  );
};

export default ExcelToJson;
