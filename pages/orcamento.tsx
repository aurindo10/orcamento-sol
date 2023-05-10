import { ReactElement, useContext, useEffect } from "react";
import { NextPageWithLayout } from "./_app";
import Drawer from "components/molecules/Drawer";
import { OrcamentoPage } from "˜/withsidebar/orcamento/page";
import { trpc } from "contexts/ClientProvider";
import { api } from "utils/api";

const Page: NextPageWithLayout = () => {
  return (
    <div>
      <OrcamentoPage></OrcamentoPage>
    </div>
  );
};
Page.getLayout = function IndexPage(page: ReactElement) {
  return <Drawer>{page}</Drawer>;
};
export default Page;
