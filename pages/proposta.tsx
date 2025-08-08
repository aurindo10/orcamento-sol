import { PropostaHeader } from "components/organisms/PropostaHeader";
import { PropostaHeader02 } from "components/organisms/PropostaHeader02";
import { PropostaSimulacao } from "components/organisms/PropostaSimulacao";
import { useRouter } from "next/router";
const Proposta = () => {
  const router = useRouter();
  const includeSimulation =
    (router.query.includeSimulation as string) === "true";
  return (
    <>
      <PropostaHeader></PropostaHeader>
      <div style={{ pageBreakAfter: "always" }}></div>
      <PropostaHeader02></PropostaHeader02>
      {includeSimulation && (
        <>
          <PropostaSimulacao></PropostaSimulacao>
          <div style={{ pageBreakAfter: "always" }}></div>
        </>
      )}
    </>
  );
};

export default Proposta;
