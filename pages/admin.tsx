import { ReactElement, useContext, useEffect } from "react";
import { NextPageWithLayout } from "./_app";
import Drawer from "components/molecules/Drawer";
import { AdminPage } from "˜/withsidebar/(adminPages)/admin/page";

const Page: NextPageWithLayout = () => {
  return <AdminPage></AdminPage>;
};
Page.getLayout = function IndexPage(page: ReactElement) {
  return <Drawer>{page}</Drawer>;
};
export default Page;
