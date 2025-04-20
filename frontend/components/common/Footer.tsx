import { APP_NAME } from "@/constants/common";
import CDialogHolder from "../holders/DialogHolder";

const Footer = () => {
  return (
    <div className="bg-primary/5 text-primary m-auto w-full p-4 rounded-t-lg text-sm border-t border-primary/50 border-dashed mb-14 lg:mb-0 flex items-center justify-center gap-2">
      <CDialogHolder
        trigger={
          <div className="underline underline-offset-4 font-bold cursor-pointer">
            What is {APP_NAME}?
          </div>
        }
        title={`What is ${APP_NAME}?`}
      >
        <div className="h-[100vh] text-sm flex items-center justify-center">
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
