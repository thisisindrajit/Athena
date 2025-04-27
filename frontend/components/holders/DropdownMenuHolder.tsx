import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FC } from "react";

interface IDropdownMenuHolderProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const DropdownMenuHolder: FC<IDropdownMenuHolderProps> = ({
  trigger,
  children,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      {children}
    </DropdownMenu>
  );
};

export default DropdownMenuHolder;
