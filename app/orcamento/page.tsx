import { isWorker } from "components/molecules/isWorker";
import { OrcamentoForm } from "components/templates/OrcamentoForm";
import { prisma } from "server/db";

export default async function Page() {
  const worker = await isWorker();
  return (
    <div>
      {worker ? (
        <OrcamentoForm></OrcamentoForm>
      ) : (
        <div> Você não é um trabalhador </div>
      )}
    </div>
  );
}
