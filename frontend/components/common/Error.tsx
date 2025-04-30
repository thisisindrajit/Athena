import { cn } from "@/lib/utils";
import { FC } from "react";

interface IErrorProps {
    errorText?: string;
    className?: string;
}

const Error: FC<IErrorProps> = ({ errorText, className }) => {
    return <div
        className={cn("m-auto flex items-center justify-center gap-3 text-destructive", className)}
    >
        <span>{errorText ?? "Some error occurred! Please try again!"}</span>
    </div>;
}

export default Error