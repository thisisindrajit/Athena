import CThemeToggle from "@/components/TopBar/CThemeToggle";
import Link from "next/link";
import { APP_NAME } from "@/constants/common";
import CLoginButton from "../auth/CLoginButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Script from "next/script";
import CUserMenu from "./CUserMenu";

const TopBar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <Script id="top-bar-script">
        {`
          window.onscroll = () => {
            if (window.scrollY > 10) {
              document.querySelector(".top-bar").classList.add("top-bar-active");
            } else {
              document.querySelector(".top-bar").classList.remove("top-bar-active");
            }
          };
        `}
      </Script>
      <div className="top-bar flex items-center justify-between sticky top-4 z-25 transition-all">
        <Link href={session ? "dashboard" : "/"}>
          <div className="font-semibold uppercase underline-offset-4 bg-background/80 backdrop-blur-xl py-1.5 px-3 rounded-md text-sm border border-primary">
            {APP_NAME}
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <CThemeToggle />
          {session ? (
            <CUserMenu session={session ?? undefined} />
          ) : (
            <CLoginButton />
          )}
        </div>
      </div>
    </>
  );
};

export default TopBar;
