import { ReactElement, useContext, useEffect } from "react";
import { NextPageWithLayout } from "../_app";
import Drawer from "components/molecules/Drawer";
import { AdminPage } from "˜/withsidebar/(adminPages)/admin/page";
import { Dashboardbody } from "components/organisms/DashboardBody";
import { DashBoardHeader } from "components/organisms/DashboardHeader";

const Page: NextPageWithLayout = () => {
  return (
    <div>
      <DashBoardHeader></DashBoardHeader>
      <Dashboardbody></Dashboardbody>
    </div>
  );
};
Page.getLayout = function IndexPage(page: ReactElement) {
  return <Drawer>{page}</Drawer>;
};
export default Page;
