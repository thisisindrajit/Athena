"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bookmark, House, Search, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import CSelectHolder from "@/components/holders/CSelectHolder";
import { PREFERENCES } from "@/constants/common";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
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
      {/* Search bar */}
      <div className="h-56 md:h-48 w-full bg-dot-black/[0.2] dark:bg-dot-white/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)]"></div>
        {/* Content */}
        <div className="flex flex-col gap-4 w-full md:w-[80%] mt-2">
          {/* Search bar */}
          <div className="flex flex-col md:inline-flex md:flex-row items-center justify-center gap-3 text-xl/snug xs:text-2xl/snug lg:text-3xl/snug font-bold self-center w-[95%] sm:w-[90%] xl:w-[80%]">
            <span className="min-w-fit">
              Build a{" "}
              <span className="underline underline-offset-4 decoration-primary">
                learning path
              </span>{" "}
              for{" "}
            </span>
            <div className="flex gap-2 min-w-full md:min-w-[65%]">
              <Input
                type="text"
                placeholder="Type in any TOPIC..."
                className="text-lg lg:text-xl"
              />
              <div className="rounded-md min-h-12 min-w-12 bg-background border border-primary/25 text-primary flex items-center justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all">
                <Search />
              </div>
            </div>
          </div>
          {/* Preferences */}
          <div className="flex gap-2 justify-items-stretch m-auto overflow-auto pt-2 pb-4 max-w-full no-scrollbar">
            <CSelectHolder
              label="Level"
              placeholder="Select level"
              values={PREFERENCES["LEVEL"]}
            />
            <CSelectHolder
              label="Duration"
              placeholder="Select duration"
              values={PREFERENCES["DURATION"]}
            />
            <CSelectHolder
              label="Focus"
              placeholder="Select focus"
              values={PREFERENCES["FOCUS"]}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        {/* Sidebar (For size lg and greater) */}
        <div className="hidden lg:block h-fit min-w-72 rounded-xl sticky top-21 mt-1.25 border bg-primary/5 border-primary/25 text-primary overflow-hidden">
          <div className="flex flex-col gap-2 overflow-auto h-[calc(100dvh-22rem)] max-h-80 p-3">
            {routes.map((route) => (
              <Link href={route.href} key={route.href}>
                <div
                  className={`w-full p-3 rounded-md flex items-center gap-3 font-medium select-none ${
                    route.active
                      ? "text-primary-foreground bg-primary"
                      : "text-primary hover:bg-primary/10 transition-all cursor-pointer"
                  }`}
                >
                  <route.icon className="h-5 w-5" />
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Main content */}
        <div className="w-full flex flex-col gap-8 min-h-[calc(100dvh-28rem)]">
          {children}
        </div>
      </div>
      {/* Bottom Bar (For sizes smaller than lg) */}
      <div className="bottom-bar fixed lg:hidden bottom-0 left-0 right-0 px-4 bg-background flex items-center justify-between gap-2 w-full border-t text-sm text-muted-foreground dark:text-foreground">
        {routes.map((route) => (
          <Link href={route.href} key={route.href} className="w-full">
            <div
              className={`p-3 rounded-md flex items-center justify-center gap-2 font-medium ${
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

export default DashboardLayout;
