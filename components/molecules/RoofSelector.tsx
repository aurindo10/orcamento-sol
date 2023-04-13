import React from "react";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

interface SelectRoofProps {
  setValue: any;
  keySelector: string;
}
type RoofType = {
  [key: string]: string;
};
export const RoofSelector = ({ setValue, keySelector }: SelectRoofProps) => {
  const [roof, setRoof] = React.useState("");
  const roofs: RoofType = { ceramico: "Cerâmico", metalico: "Metálico" };
  return (
    <Select.Root
      onValueChange={(roof) => {
        setValue(keySelector, roof), setRoof(roof);
      }}
    >
      <Select.Trigger
        className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-slate-700 px-[15px] text-[13px] leading-none text-slate-50 shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-slate-400 data-[placeholder]:text-slate-50"
        aria-label="Food"
      >
        <div className="w-36">
          <Select.Value
            placeholder="Selecione um telhado "
            className=" text-white"
            aria-label={roof}
          >
            <div className="w-36">{roofs[roof]}</div>
          </Select.Value>
        </div>
        <Select.Icon className="text-slate-50">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-md bg-slate-800 shadow-[0px_10px_38px_-10px_hsl(206_22%_7%_/_35%),0px_10px_20px_-15px_hsl(206_22%_7%_/_20%)]">
          <Select.Viewport className="p-[5px]">
            <Select.Item
              value="ceramico"
              className="relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-slate-50 data-[disabled]:pointer-events-none data-[highlighted]:bg-slate-700 data-[disabled]:text-mauve8 data-[highlighted]:text-slate-50 data-[highlighted]:outline-none"
            >
              <Select.ItemText>Cerâmico</Select.ItemText>
              <Select.ItemIndicator className="absolute left-0 inline-flex w-full items-center justify-center">
                <CheckIcon />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item
              value="metalico"
              className="relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-slate-50 data-[disabled]:pointer-events-none data-[highlighted]:bg-slate-700 data-[disabled]:text-mauve8 data-[highlighted]:text-slate-50 data-[highlighted]:outline-none"
            >
              <Select.ItemText>Metálico</Select.ItemText>
              <Select.ItemIndicator className="absolute left-0 inline-flex w-full items-center justify-center">
                <CheckIcon />
              </Select.ItemIndicator>
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
