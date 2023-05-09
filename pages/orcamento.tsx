import { ReactElement, useContext, useEffect } from "react";
import { NextPageWithLayout } from "./_app";
import Drawer from "components/molecules/Drawer";
import { OrcamentoPage } from "˜/withsidebar/orcamento/page";
import { trpc } from "contexts/ClientProvider";
import { api } from "utils/api";

const Page: NextPageWithLayout = () => {
  const { mutateAsync: getAuthenthicationFromFortlev } =
    api.fortlev.getAuthenthication.useMutation();
  const { mutateAsync: getProducts } = api.fortlev.getProducts.useMutation();
  const handleGetToken = async () => {
    const token = await getAuthenthicationFromFortlev();
    console.log(token);
  };
  const handlegetProducts = async () => {
    const allProducts = await getProducts();
    console.log(allProducts);
  };
  const handlegetAllSurfaces = async () => {};
  return (
    <div>
      <OrcamentoPage></OrcamentoPage>
      <button className="btn-primary btn" onClick={handleGetToken}>
        Obter Token
      </button>
      <button className="btn-primary btn" onClick={handlegetProducts}>
        Obter Produtos
      </button>
      <button className="btn-primary btn" onClick={handlegetAllSurfaces}>
        Obter Telhados
      </button>
    </div>
  );
};
Page.getLayout = function IndexPage(page: ReactElement) {
  return <Drawer>{page}</Drawer>;
};
export default Page;
