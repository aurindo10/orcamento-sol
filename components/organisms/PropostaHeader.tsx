import Image from "next/image";
import kleiton from "../../public/kleiton.png";
import laranja from "../../public/laranja.png";
import pretomaior from "../../public/pretomaior.png";
import pretomenor from "../../public/premenor.png";
import logo from "../../public/logo.png";
import { useRouter } from "next/router";
import { format } from "date-fns";

export const PropostaHeader = () => {
  const now = new Date();
  const validUntil = new Date();
  validUntil.setDate(now.getDate() + 3);
  const formattedDate = format(validUntil, "dd/MM/yyyy");
  const router = useRouter();
  return (
    <div className="relative h-[1123px] w-[794px] bg-white">
      <Image
        src={kleiton}
        alt="Sistema fotovoltaico"
        width={794}
        className="absolute"
      />
      <div className="relative ml-10 flex  flex-col pt-24">
        <p className=" mb-[-10px] h-auto font-poppins text-[70px] font-bold text-slate-50">
          Proposta
        </p>
        <p className=" mt-[-10px] font-poppins text-[70px] font-bold  text-slate-50">
          Comercial
        </p>
      </div>
      <div className="mt-[300px]">
        <Image
          src={laranja}
          alt="Sistema fotovoltaico"
          width={794}
          className="absolute"
        />
      </div>
      <div className="absolute bottom-[140px]">
        <Image src={pretomaior} alt="Sistema fotovoltaico" width={794} />
      </div>
      <div className="absolute bottom-[120px]">
        <Image src={pretomenor} alt="Sistema fotovoltaico" width={400} />
      </div>
      <div className="absolute bottom-[12px] right-4">
        <Image src={logo} alt="Sistema fotovoltaico" width={170} />
      </div>
      <div className="absolute bottom-[25px] left-4 flex flex-col font-semibold text-black">
        <label className="font-poppins text-[40px] ">{router.query.name}</label>
        <label className="font-poppins text-[20px]">
          {`Proposta válida até dia ${formattedDate}`}
        </label>
      </div>
    </div>
  );
};
