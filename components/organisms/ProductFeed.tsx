import { useUser } from "@clerk/nextjs";
import { Product } from "@prisma/client";

interface ProductFeedProps {
  product: Product[];
}

export const ProductFeed = ({ product }: any) => {
  const { user } = useUser();
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  return (
    <div>
      {product.map((product: any, index: number) => {
        return (
          <div
            className="card my-4 w-full max-w-lg bg-base-100 shadow-xl"
            key={index}
          >
            <figure>
              <div className="flex w-full justify-center gap-3 px-4 py-4">
                <img
                  src={product.inverterImage}
                  alt="Shoes"
                  className="h-[20rem] w-auto"
                />
                <img
                  src={product.panelImage}
                  alt="Shoes"
                  className="h-[20rem] w-auto"
                />
              </div>
            </figure>
            <div className="card-body flex flex-row justify-around">
              <div>
                <h2 className="card-title text-slate-50">{product.name}</h2>
                <p className="text-[14px] text-slate-50">{`Tipe de telhado: ${product.roofType}`}</p>
                <p className="text-slate-50">{`Inversor: ${product.inverterBrand}`}</p>
                <p className="text-slate-50">{`Painel: ${product.panelBrand}`}</p>
                <p className="text-slate-50">{`Potência: ${product.power} kWp`}</p>
              </div>
              <div className="space-y-4">
                <h2 className=" rounded-lg bg-red-500 px-2 py-2 text-white">
                  {formatter.format(product.price)}
                </h2>
                <div className=" rounded-lg  bg-green-500 px-2 py-2">
                  <label className="h-10 w-52 text-[20px] text-slate-50">{`Geração: ${product.generation.toFixed(
                    2
                  )}kWh`}</label>
                </div>
                {user?.publicMetadata.admin ? (
                  <div className=" rounded-lg  bg-yellow-300 px-2 py-2 ">
                    <label className="h-10 w-52 text-[14px] text-slate-900">{`Valor de custo: ${formatter.format(
                      product.coastValue
                    )}`}</label>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
