import Image from "next/image";
import right from "../../public/right.png";
import left from "../../public/left.png";
import logo from "../../public/logo.png";
import efeito from "../../public/efeito.png";
import { useRouter } from "next/router";

export const PropostaSimulacao = () => {
  const router = useRouter();

  const formatCurrency = (value: any) => {
    const num = Number(value);
    if (Number.isNaN(num)) return "-";
    return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const jurosPercent = router.query.jurosMensalPercent as string | undefined;
  const parcelas = router.query.numParcelas as string | undefined;
  const principal = router.query.simPrincipal as string | undefined;
  const valorFinal = router.query.valorFinalSimulacao as string | undefined;
  const parcelaMensal = router.query.monthlyPaymentSimulacao as
    | string
    | undefined;

  return (
    <div className="relative h-[1123px] w-[794px] bg-white">
      <div className="absolute right-[-1px] top-[-1px]">
        <Image src={right} alt="Sistema fotovoltaico" width={250} />
      </div>
      <div className="absolute bottom-[-1px] left-[-1px]">
        <Image src={left} alt="Sistema fotovoltaico" width={250} />
      </div>
      <div className="absolute bottom-[12px] right-4">
        <Image src={logo} alt="Sistema fotovoltaico" width={170} />
      </div>
      <div className="absolute bottom-[0px] right-0">
        <Image src={efeito} alt="Sistema fotovoltaico" width={300} className="opacity-50" />
      </div>

      <div className="py-8">
        <div className="px-8 font-poppins text-[30px] font-semibold text-black">
          Simulação de Financiamento
        </div>
        <div className="mt-2 px-8 font-poppins text-[22.5px] font-semibold text-black ">
          <span className="border-b-[0.1px] border-slate-500">
            {`Cliente: ${router.query.name ?? ""}`}
          </span>
        </div>
      </div>

      <div className="mt-6 px-8 font-poppins text-[28px] font-semibold text-black">
        Parâmetros da Simulação
      </div>
      <div className="mt-4 grid grid-cols-12 gap-y-3 px-8 font-poppins text-[20px] font-semibold text-black">
        <div className="col-span-6">Valor base</div>
        <div className="col-span-6 text-right">{formatCurrency(principal)}</div>
        <div className="col-span-12 h-[0.5px] bg-slate-400" />
        <div className="col-span-6">Juros mensal</div>
        <div className="col-span-6 text-right">{jurosPercent ? `${jurosPercent}%` : "-"}</div>
        <div className="col-span-12 h-[0.5px] bg-slate-400" />
        <div className="col-span-6">Quantidade de parcelas</div>
        <div className="col-span-6 text-right">{parcelas ?? "-"}</div>
        <div className="col-span-12 h-[0.5px] bg-slate-400" />
        <div className="col-span-6">Parcela mensal (Price)</div>
        <div className="col-span-6 text-right">{formatCurrency(parcelaMensal)}</div>
        <div className="col-span-12 h-[0.5px] bg-slate-400" />
        <div className="col-span-6">Valor final</div>
        <div className="col-span-6 text-right">{formatCurrency(valorFinal)}</div>
      </div>

      <div className="mt-10 px-8 font-poppins text-[16px] text-slate-700">
        <div className="w-5/6">
          Cálculo baseado em capitalização composta mensal: Valor final = Valor base × (1 + juros mensal) ^ número de parcelas.
        </div>
      </div>
    </div>
  );
};

export default PropostaSimulacao;
