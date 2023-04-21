import { ReactElement, useContext, useEffect } from "react";
import { NextPageWithLayout } from "./_app";
import Drawer from "components/molecules/Drawer";
import { UltimosOrcamentosTab } from "components/templates/UltimosOrcamentosTab";

const Page: NextPageWithLayout = () => {
  return <UltimosOrcamentosTab></UltimosOrcamentosTab>;
};
Page.getLayout = function IndexPage(page: ReactElement) {
  return <Drawer>{page}</Drawer>;
};
export default Page;
