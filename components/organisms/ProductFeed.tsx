import { Product } from "@prisma/client";

interface ProductFeedProps {
  product: Product[];
}

export const ProductFeed = ({ product }: ProductFeedProps) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  return (
    <div>
      {product.map((product) => {
        return (
          <div
            className="card my-4 max-w-lg bg-base-100 shadow-xl"
            key={product.id}
          >
            <figure>
              <img
                src="https://www.aldo.com.br/cdn-cgi/image/fit=contain,format=auto,metadata=none,onerror=redirect,quality=70,width=2560/OldSite/images/203323_100223171850.jpg"
                alt="Shoes"
              />
            </figure>
            <div className="card-body flex flex-row justify-around">
              <div>
                <h2 className="card-title text-slate-50">{product.name}</h2>
                <p className="text-[14px] text-slate-50">{`Tipe de telhado: ${product.roofType}`}</p>
                <p className="text-slate-50">{`Inversor: ${product.inverterBrand}`}</p>
                <p className="text-slate-50">{`Painel: ${product.panelBrand}`}</p>
                <p className="text-slate-50">{`Potência: ${product.power} kWp`}</p>
              </div>
              <h2 className="flex items-center text-lg text-green-500">
                {formatter.format(product.price)}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};
