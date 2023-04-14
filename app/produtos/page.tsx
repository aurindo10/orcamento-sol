import ProductCreateModal from "components/organisms/ProductCreateModal";
import { AiOutlineDelete } from "react-icons/ai";
import { prisma } from "server/db";
import { PaginationButton } from "components/molecules/paginationButton";
import ProductEditModal from "components/organisms/ProductEditModal";

interface PageProps {
  searchParams: { take: number; skipNumber: string };
}
export default async function page({ searchParams }: PageProps) {
  console.log(searchParams.skipNumber);
  const numberOfProducts = await prisma.product.count();
  const products = await prisma.product.findMany({
    take: 5,
    skip:
      searchParams.skipNumber === undefined
        ? 0
        : parseFloat(searchParams.skipNumber) < 0
        ? 0
        : parseFloat(searchParams.skipNumber),
    orderBy: {
      createdAt: "desc", // Use 'asc' para ordem crescente e 'desc' para ordem decrescente
    },
  });
  return (
    <div className="space-y-4 px-4 py-4 md:px-6">
      <div className="createBUtton flex w-full justify-end pr-2">
        <ProductCreateModal></ProductCreateModal>
      </div>
      <div className="tableContainer w-full rounded-lg  bg-slate-200">
        <div className="tableHeader flex h-12 items-center">
          <label className=" w-1/2 text-center font-cabin font-bold text-slate-500">
            Produto
          </label>
          <label className=" w-1/2 text-center font-cabin font-bold text-slate-500">
            Valor
          </label>
        </div>
        <div className="tableBody w-full space-y-0 ">
          {products.map((product, index) => {
            const formatPrice = (price: number) => {
              const formatter = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
              });

              return formatter.format(price);
            };
            const formatedPrice = formatPrice(product.price);
            const rowBgColor =
              index % 2 === 0 ? "bg-slate-300" : "bg-slate-100";
            return (
              <div
                className={`tableRow flex items-center py-2 ${rowBgColor}`}
                key={product.id}
              >
                <div className="info flex w-1/2 flex-col justify-center pl-2">
                  <label className="font-cabin text-[16px]  font-bold text-slate-500">
                    {`Kit: ${product.power}kWp`}
                  </label>
                  <label className=" font-cabin text-[10px] text-slate-500">
                    {`Geração: ${product.generation}kWh`}
                  </label>
                  <label className=" font-cabin text-[10px] text-slate-500">
                    {`Marca do Painel: ${product.panelBrand}`}
                  </label>
                  <label className=" font-cabin text-[10px] text-slate-500">
                    {`Marca do Inversor: ${product.inverterBrand}`}
                  </label>
                  <label className=" font-cabin text-[10px] text-slate-500">
                    {`Tipo de Telhador: ${product.roofType}`}
                  </label>
                </div>
                <div className="valorContainer flex w-1/2 flex-col items-center">
                  <label className="font-cabin text-sm font-bold text-red-500">
                    {`${formatedPrice}`}
                  </label>
                  <div className="actions flex flex-col items-center">
                    <label className=" font-cabin text-[14px] text-black">
                      Ações
                    </label>
                    <div className="icons flex w-full justify-around gap-6">
                      <ProductEditModal
                        editProduct={product}
                      ></ProductEditModal>
                      <label className="btn-square btn-sm btn border-red-500 bg-red-500 text-slate-50">
                        <AiOutlineDelete size={12}></AiOutlineDelete>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div>
            <PaginationButton
              skip={
                searchParams.skipNumber === undefined
                  ? "0"
                  : searchParams.skipNumber
              }
              numberOfProducts={numberOfProducts}
            ></PaginationButton>
          </div>
        </div>
      </div>
    </div>
  );
}
