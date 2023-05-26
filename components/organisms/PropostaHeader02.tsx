import Image from "next/image";

import right from "../../public/right.png";
import left from "../../public/left.png";
import logo from "../../public/logo.png";
import efeito from "../../public/efeito.png";
import { useRouter } from "next/router";

export const PropostaHeader02 = () => {
  const router = useRouter();
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
        <Image
          src={efeito}
          alt="Sistema fotovoltaico"
          width={300}
          className="opacity-50"
        />
      </div>
      <div className="py-8">
        <div className="px-8 font-poppins text-[30px] font-semibold text-black">
          Detalhes da Proposta
        </div>
        <div className="mt-2 px-8 font-poppins text-[22.5px] font-semibold  text-black ">
          <span className="border-b-[0.1px] border-slate-500">
            {`Cliente: ${router.query.name}`}
          </span>
        </div>
        <div className="mt-2 px-8 text-[22.5px] font-bold text-black">
          <span className="border-b-[0.1px] border-slate-500 font-poppins font-semibold">
            {`Localidade da usina: ${router.query.city}`}
          </span>
        </div>
        <div className="mt-2 px-8 font-poppins text-[22.5px] font-semibold text-black">
          <span className="border-b-[0.1px] border-slate-500">
            {`Tipo de estrutura: ${router.query.roofType}`}
          </span>
        </div>
        <div className="mt-2 px-8 font-poppins text-[22.5px] font-semibold text-black">
          <span className="border-b-[0.1px] border-slate-500">
            {`Potência do sistema dimensionado: ${router.query.productName}`}
          </span>
        </div>
        <div className="mt-2 px-8 font-poppins text-[22.5px] font-semibold text-black">
          <span className="border-b-[0.1px] border-slate-500">
            {`Energia estimada a ser gerada (média anual): ${router.query.generation}kWh/mês`}
          </span>
        </div>
        <div className="mt-2 px-8 font-poppins text-[22.5px] font-semibold text-black">
          <span className="border-b-[0.1px] border-slate-500">
            {`Área útil necessária para a instalação (estimada): ${`XX`}`}
          </span>
        </div>
      </div>
      <div className="mt-6 px-8 font-poppins text-[30px] font-semibold text-black">
        Sistema Proposto
      </div>
      <div className="mt-4 grid grid-cols-12 justify-around font-poppins text-[20px] font-semibold text-black">
        <div className="col col-span-4 ml-8 text-start">Produto</div>
        <div>Unid.</div>
        <div className="text-center">Qtde</div>
        <div className="col-span-3 text-center">Valor</div>
        <div className="col-span-3 text-center">Valor á vista</div>
        <div className="col-span-12 px-8">
          <div className=" h-[0.5px] border-slate-400 bg-slate-400"></div>
        </div>
        <div className="col-span-4  ml-8 text-start text-[16px]">
          {router.query.productName}
        </div>
        <div className=" ">Unid.</div>
        <div className=" text-center">1</div>
        <div className=" col-span-3 text-center">
          {Number(router.query.value).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
        <div className=" col-span-3 col-start-10 text-center ">
          {(Number(router.query.value) * 0.95).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
      </div>
      <div className="mt-10 px-8 font-poppins text-[30px] font-semibold text-black">
        Detalhes do Sistema
      </div>
      <div className="mt-2 px-8 font-poppins text-[18px] font-semibold text-black">
        <span className="border-b-[0.1px] border-slate-500">
          {`Inversor: ${router.query.inverter}`}
        </span>
      </div>
      <div className="mt-2 px-8 font-poppins text-[18px] font-semibold text-black">
        <span className="border-b-[0.1px] border-slate-500">
          {`Painel: ${router.query.panel}`}
        </span>
      </div>
      <div className="mt-2 px-8 font-poppins text-[18px] font-semibold text-black">
        <span className="border-b-[0.1px] border-slate-500">
          Estrutura: Alumínio
        </span>
      </div>
      <div className="mt-10 px-8 font-poppins text-[30px] font-semibold text-black">
        Garantia
      </div>
      <div className="mt-2 px-8 font-poppins text-[18px] font-semibold text-black">
        <span className="border-b-[0.1px] border-slate-500">
          Instalação: 5 anos
        </span>
      </div>
      <div className="mt-2 px-8 font-poppins text-[18px] font-semibold text-black">
        <span className="border-b-[0.1px] border-slate-500">
          Inversor: 10 anos
        </span>
      </div>
      <div className="mt-2 px-8 font-poppins text-[18px] font-semibold text-black">
        <div className=" w-3/4 border-b-[0.1px] border-slate-500">
          Painel: 10 anos com rendimento de até 100% e 25 anos para rendimento
          de até 80%
        </div>
      </div>
    </div>
  );
};
