import { ReactElement, useContext, useEffect } from "react";
import { NextPageWithLayout } from "../_app";
import Drawer from "components/molecules/Drawer";
import { UltimosOrcamentosTab } from "components/templates/UltimosOrcamentosTab";
import { useUser } from "@clerk/nextjs";

const Page: NextPageWithLayout = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="text-slate-50">loading</div>;
  }
  if (!user!.publicMetadata.worker) return <div>Not authorized</div>;
  return <UltimosOrcamentosTab></UltimosOrcamentosTab>;
};
Page.getLayout = function IndexPage(page: ReactElement) {
  return <Drawer>{page}</Drawer>;
};
export default Page;
