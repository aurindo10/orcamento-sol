import { ReactElement, useContext, useEffect } from "react";
import { NextPageWithLayout } from "./_app";
import Drawer from "components/molecules/Drawer";
import { OrcamentoPage } from "˜/withsidebar/orcamento/page";
import { trpc } from "contexts/ClientProvider";
import { api } from "utils/api";
import axios from "axios";

const Page: NextPageWithLayout = () => {
  const handleTurnThePdfServerOn = async () => {
    const response = await axios(
      "https://pdfgeneratoraurindo.herokuapp.com/turnon"
    );
    return response.status;
  };
  useEffect(() => {
    handleTurnThePdfServerOn();
  });
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
