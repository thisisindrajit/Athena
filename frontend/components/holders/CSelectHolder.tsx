"use client";

import { useId } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ICSelectHolderProps {
  label: string;
  placeholder: string;
  values: string[];
}

const CSelectHolder: React.FC<ICSelectHolderProps> = ({
  label,
  placeholder,
  values,
}) => {
  const id = useId();

  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50 uppercase"
      >
        {label}
      </label>
      <Select defaultValue={values[0]}>
        <SelectTrigger
          id={id}
          className="bg-background shadow-lg min-w-36"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {values.map((val: string, index: number) => {
            return (
              <SelectItem key={index} value={val}>
                {val}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CSelectHolder;
