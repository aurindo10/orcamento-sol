import { currentUser } from "@clerk/nextjs/app-beta";
import { OrcamentoForm } from "components/templates/OrcamentoForm";
import { prisma } from "server/db";

export default async function Page() {
  const user = await currentUser();

  return (
    <div>
      {/* {worker ? ( */}
      <OrcamentoForm></OrcamentoForm>
      {/* ) : (
        <div> Você não é um trabalhador </div>
      )} */}
    </div>
  );
}
