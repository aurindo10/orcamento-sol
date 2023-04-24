import { ReactElement, useContext, useEffect } from "react";
import { NextPageWithLayout } from "./_app";
import Drawer from "components/molecules/Drawer";
import { ProductPage } from "˜/withsidebar/(adminPages)/produtos/page";
import { PrecificacaoForm } from "components/templates/PrecificacaoForm";

const Page: NextPageWithLayout = () => {
  return <PrecificacaoForm></PrecificacaoForm>;
};
Page.getLayout = function IndexPage(page: ReactElement) {
  return <Drawer>{page}</Drawer>;
};
export default Page;
