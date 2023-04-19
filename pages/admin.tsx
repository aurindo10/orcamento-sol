import { ReactElement, useContext, useEffect } from "react";
import { NextPageWithLayout } from "./_app";
import Drawer from "components/molecules/Drawer";
import { ProductPage } from "˜/withsidebar/(adminPages)/produtos/page";
import { OrcamentoPage } from "˜/withsidebar/orcamento/page";

const Page: NextPageWithLayout = () => {
  return <OrcamentoPage></OrcamentoPage>;
};
Page.getLayout = function IndexPage(page: ReactElement) {
  return <Drawer>{page}</Drawer>;
};
export default Page;
