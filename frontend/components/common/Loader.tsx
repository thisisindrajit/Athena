import { FC } from "react";

interface ILoaderProps {
  loadingText?: string;
}
const Loader: FC<ILoaderProps> = ({ loadingText }) => {
  return (
    <div className="m-auto h-full flex items-center justify-center gap-3">
      <div
        className="border-t-2 rounded-full border-primary animate-spin
aspect-square size-6 flex justify-center items-center"
      ></div>
      <span>{loadingText ?? "Loading"}...</span>
    </div>
  );
};

export default Loader;
