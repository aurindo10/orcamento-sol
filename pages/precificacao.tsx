import { ReactElement, useContext, useEffect } from "react";
import { NextPageWithLayout } from "./_app";
import Drawer from "components/molecules/Drawer";
import { ProductPage } from "˜/withsidebar/(adminPages)/produtos/page";
import { PrecificacaoForm } from "components/templates/PrecificacaoForm";
import { TableOfParameters } from "components/organisms/TableOfParameters";
import { SecondTableOfParams } from "components/organisms/SecondTableOfParams";

const Page: NextPageWithLayout = () => {
  return (
    <div>
      {/* <PrecificacaoForm></PrecificacaoForm> */}
      <SecondTableOfParams></SecondTableOfParams>
      {/* <TableOfParameters></TableOfParameters> */}
    </div>
  );
};
Page.getLayout = function IndexPage(page: ReactElement) {
  return <Drawer>{page}</Drawer>;
};
export default Page;
