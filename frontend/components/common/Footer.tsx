import { APP_NAME } from "@/constants/common";
import CDialogHolder from "../holders/CDialogHolder";

const Footer = () => {
  return (
    <div className="hidden lg:flex items-center justify-center gap-2 bg-primary/5 text-primary w-full p-4 rounded-t-lg text-sm border-t border-x border-primary/50 border-dashed">
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

export default Footer;
