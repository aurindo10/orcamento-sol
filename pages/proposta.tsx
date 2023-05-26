import { PropostaHeader } from "components/organisms/PropostaHeader";
import { PropostaHeader02 } from "components/organisms/PropostaHeader02";
const Proposta = () => {
  return (
    <>
      <PropostaHeader></PropostaHeader>
      <div style={{ pageBreakAfter: "always" }}></div>
      <PropostaHeader02></PropostaHeader02>
    </>
  );
};

export default Proposta;
