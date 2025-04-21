"use client";

import { APP_NAME } from "@/constants/common";
import CDialogHolder from "../holders/DialogHolder";
import { usePathname } from "next/navigation";
import { Bookmark, House, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";

const CFooterAndBottomBar = () => {
  const pathname = usePathname();
  const routes = [
    {
      label: "Home",
      icon: House,
      href: "/user/dashboard",
      active: pathname === "/user/dashboard",
    },
    {
      label: "Trending",
      icon: TrendingUp,
      href: "/user/trending",
      active: pathname === "/user/trending",
    },
    {
      label: "Saved",
      icon: Bookmark,
      href: "/user/saved",
      active: pathname === "/user/saved",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div className="hidden lg:flex items-center justify-center gap-2 bg-primary/5 text-primary m-auto w-full p-4 rounded-t-lg text-sm border-t border-primary/50 border-dashed">
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
      {/* Bottom bar (For size upto lg) */}
      <div className="sticky lg:hidden left-0 p-1.5 px-4 bg-background flex items-start justify-between gap-2 w-full border-t text-sm text-muted-foreground dark:text-foreground pb-safe bottom-0 h-[calc(4.35rem+env(safe-area-inset-bottom))]">
        {routes.map((route) => (
          <Link href={route.href} key={route.href} className="w-full">
            <div
              className={`w-full p-3 rounded-md flex items-center justify-center gap-2 font-medium ${
                route.active
                  ? "text-primary bg-primary/10"
                  : "transition-all cursor-pointer"
              }`}
            >
              <route.icon className="h-4 w-4" />
              <span className="hidden xs:block">{route.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CFooterAndBottomBar;
