import { PropostaHeader } from "components/organisms/PropostaHeader";
import { PropostaHeader02 } from "components/organisms/PropostaHeader02";
import { PropostaSimulacao } from "components/organisms/PropostaSimulacao";

type PropostaPageProps = { includeSimulation: boolean };

const Proposta = ({ includeSimulation }: PropostaPageProps) => {
  return (
    <div
      id="proposta-root"
      style={{
        // força cada .pdf-page quebrar depois, exceto a última
        // html2pdf respeita pagebreak: css
        pageBreakInside: "avoid",
      }}
    >
      <div className="pdf-page">
        <PropostaHeader></PropostaHeader>
      </div>
      <div className="pdf-page">
        <PropostaHeader02></PropostaHeader02>
      </div>
      {includeSimulation && (
        <div className="pdf-page">
          <PropostaSimulacao></PropostaSimulacao>
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const includeSimulation = context?.query?.includeSimulation === "true";
  return { props: { includeSimulation } };
}

export default Proposta;
