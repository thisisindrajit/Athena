import { FC } from "react";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

interface ITitleHolderProps {
  lightText: string;
  boldText: string;
  className?: string;
  lightTextFirst?: boolean;
  makeBoldTextUppercase?: boolean;
}

const TitleHolder: FC<ITitleHolderProps> = ({
  lightText,
  boldText,
  className,
  lightTextFirst = false,
  makeBoldTextUppercase = false,
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className={cn("text-lg md:text-xl min-w-fit", className)}>
        {lightTextFirst ? (
          <>
            {lightText}{" "}
            <span
              className={cn("font-bold", makeBoldTextUppercase && "uppercase")}
            >
              {boldText}
            </span>
          </>
        ) : (
          <>
            <span
              className={cn("font-bold", makeBoldTextUppercase && "uppercase")}
            >
              {boldText}
            </span>{" "}
            {lightText}
          </>
        )}
      </div>
      <Separator className="shrink-1 bg-gradient-to-r from-foreground to-transparent" />
    </div>
  );
};

export default TitleHolder;
