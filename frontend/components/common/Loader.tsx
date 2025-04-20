import { cn } from "@/lib/utils";
import { FC } from "react";

interface ILoaderProps {
  loadingText?: string;
  className?: string;
}
const Loader: FC<ILoaderProps> = ({ loadingText, className }) => {
  return (
    <div
      className={cn("m-auto flex items-center justify-center gap-3", className)}
    >
      <div
        className="border-t-2 rounded-full border-primary animate-spin
aspect-square size-6 flex justify-center items-center"
      ></div>
      <span>{loadingText ?? "Loading"}...</span>
    </div>
  );
};

export default Loader;
