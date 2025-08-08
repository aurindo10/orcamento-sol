import { PropostaHeader } from "components/organisms/PropostaHeader";
import { PropostaHeader02 } from "components/organisms/PropostaHeader02";
import { PropostaSimulacao } from "components/organisms/PropostaSimulacao";

type PropostaPageProps = { includeSimulation: boolean };

const Proposta = ({ includeSimulation }: PropostaPageProps) => {
  return (
    <>
      <PropostaHeader></PropostaHeader>
      <div style={{ pageBreakAfter: "always" }}></div>
      <PropostaHeader02></PropostaHeader02>
      {includeSimulation && <PropostaSimulacao></PropostaSimulacao>}
    </>
  );
};

export async function getServerSideProps(context: any) {
  const includeSimulation = context?.query?.includeSimulation === "true";
  return { props: { includeSimulation } };
}

export default Proposta;
