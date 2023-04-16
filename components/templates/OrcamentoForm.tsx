"use client";

import { Product } from "@prisma/client";
import { ProductFeed } from "components/organisms/ProductFeed";
import { useState } from "react";
import { api } from "utils/api";

export function OrcamentoForm() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [consumo, setConsumo] = useState(0);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const { mutateAsync: createClient } = api.client.createClient.useMutation();
  const { mutateAsync: updateClient } = api.client.updateClient.useMutation();
  const { mutateAsync: lookForProductByPower } =
    api.product.lookForProductByPower.useMutation();
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();
    const createdClient = await createClient({
      name: nome,
      phone: telefone,
    });
    if (createdClient) {
      console.log(consumo);
      const foundProducts = await lookForProductByPower({
        power: consumo,
      });
      setLoading(false);
      setProducts(foundProducts!);
      console.log(foundProducts);
      if (foundProducts[0]) {
        setLoading(false);
        const updatedCLient = await updateClient({
          id: createdClient.id,
          productId: foundProducts[0]!.id,
        });
        console.log(updatedCLient);
      }
    }
  };
  return (
    <div className="md-px-4 flex flex-col items-center justify-center">
      <div>
        <label className="label">
          <span className="label-text">Nome do Cliente</span>
        </label>
        <label className="input-group flex justify-center">
          <span className="w-24 text-slate-50">Nome</span>
          <input
            type="text"
            placeholder="Nome do Cliente"
            className="input-bordered input text-slate-50"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label className="label">
          <span className="label-text">Telefone do Cliente</span>
        </label>
        <label className="input-group flex justify-center">
          <span className="w-24 text-slate-50">Telefone</span>
          <input
            type="text"
            placeholder="Telefone do cliente"
            className="input-bordered input text-slate-50"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label className="label">
          <span className="label-text">Energia Consumida em kWh</span>
        </label>
        <label className="input-group flex justify-center">
          <span className="w-24 text-slate-50">Consumo</span>
          <input
            type="number"
            placeholder="Energia consumida"
            className="input-bordered input text-slate-50"
            value={consumo}
            onChange={(e) => setConsumo(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <button className="btn-primary btn my-4" onClick={handleSubmit}>
        Procurar Sistema
      </button>
      <div>
        {loading ? (
          <button className="loading btn">Carregando</button>
        ) : (
          <ProductFeed product={products}></ProductFeed>
        )}
      </div>
    </div>
  );
}
