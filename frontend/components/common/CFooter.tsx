"use client";

import { APP_NAME } from "@/constants/common";
import CDialogHolder from "../holders/DialogHolder";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const CFooter = () => {
  const pathname = usePathname();
  const isUserRoute = pathname?.includes("user");

  return (
    <div
      className={cn(
        "bg-primary/5 text-primary m-auto w-full p-4 rounded-t-lg text-sm border-t border-primary/50 border-dashed flex items-center justify-center gap-2",
        isUserRoute && "mb-[calc(4.25rem+env(safe-area-inset-bottom))] lg:mb-0"
      )}
    >
      <CDialogHolder
        trigger={
          <div className="underline underline-offset-4 font-bold cursor-pointer">
            What is {APP_NAME}?
          </div>
        }
        title={`What is ${APP_NAME}?`}
      >
        <div className="h-[100dvh] text-sm flex items-center justify-center">
          This is the dialog
        </div>
      </CDialogHolder>
      <div className="hidden xsm:block">|</div>
      <div className="hidden xsm:block">
        Created by <span className="font-bold">Dhilip</span>
        {" and "}
        <span className="font-bold">Indrajit</span>
      </div>
    </div>
  );
};

export default CFooter;
