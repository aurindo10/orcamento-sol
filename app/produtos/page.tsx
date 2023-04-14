import ProductCreateModal from "components/organisms/ProductCreateModal";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/Ai";
import { prisma } from "server/db";

export default async function Page() {
  const products = await prisma.product.findMany({});
  console.log(products);
  return (
    <div className="space-y-4 px-4 py-2 md:px-6">
      <div className="createBUtton flex w-full justify-end">
        <ProductCreateModal></ProductCreateModal>
      </div>
      <div className="tableContainer w-full rounded-tl-lg rounded-tr-lg bg-slate-200">
        <div className="tableHeader flex h-12 items-center">
          <label className=" w-1/2 text-center text-slate-500">Produto</label>
          <label className=" w-1/2 text-center text-slate-500">Valor</label>
        </div>
        <div className="tableBody w-full space-y-0 ">
          {products.map((product) => {
            return (
              <div className="tableRow flex items-center bg-slate-300 py-2">
                <div className="info flex w-1/2 flex-col justify-center pl-2">
                  <label className="text-[16px] font-bold text-slate-500">
                    {`Kit: ${product.power}kWp`}
                  </label>
                  <label className=" text-[10px] text-slate-500">
                    {`Geração: ${product.generation}kWh`}
                  </label>
                  <label className=" text-[10px] text-slate-500">
                    Marca do Painel: Jinko
                  </label>
                  <label className=" text-[10px] text-slate-500">
                    Marca do Inversor: Growatt
                  </label>
                </div>
                <div className="valorContainer flex w-1/2 flex-col items-center">
                  <label className="text-sm font-bold text-red-500">
                    R$ 28.500,00
                  </label>
                  <div className="actions flex flex-col items-center">
                    <label className=" text-[14px] text-black">Ações</label>
                    <div className="icons flex w-full justify-around gap-6">
                      <label className="btn-bg-red-500 btn-square btn-sm btn">
                        <FiEdit size={12}></FiEdit>
                      </label>
                      <label className=" btn-square btn-sm btn">
                        <AiOutlineDelete size={12}></AiOutlineDelete>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
