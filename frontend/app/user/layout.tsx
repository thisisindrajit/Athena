"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bookmark, House, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

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
      <div className="h-48 md:h-42 w-full bg-dot-black/[0.2] dark:bg-dot-white/[0.2] relative flex items-center justify-center text-xl/snug xs:text-2xl/snug lg:text-3xl/snug font-bold self-center text-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]"></div>
        <div className="flex flex-col md:inline-flex md:flex-row items-center justify-center gap-2 md:gap-3 w-[90%] xsm:w-4/5 xl:w-3/5 mb-2 md:mb-0">
          <span className="min-w-fit">Build a learning path for </span>
          <Input
            type="text"
            placeholder="Type in any TOPIC..."
            className="w-full xsm:w-4/5 md:w-full text-lg lg:text-xl shadow-lg text-primary"
          />
        </div>
      </div>
      <div className="flex gap-4">
        {/* Sidebar (For size lg and greater) */}
        <div className="hidden lg:flex lg:flex-col gap-2 h-[calc(100dvh-18rem)] min-w-80 max-h-96 p-3 rounded-xl sticky top-21 mt-1 border bg-primary/5 border-primary/25 text-primary">
          {routes.map((route) => (
            <Link href={route.href} key={route.href}>
              <div
                className={`w-full p-3 rounded-md flex items-center gap-3 font-medium ${
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
        {/* Main content */}
        <div className="w-full flex flex-col gap-4">{children}</div>
      </div>
      {/* Bottom bar (For size upto lg) */}
      <div className="fixed lg:hidden left-0 bottom-0 p-3 h-14 bg-background flex items-center justify-between gap-2 w-full border-t text-sm text-muted-foreground dark:text-foreground">
        {routes.map((route) => (
          <Link href={route.href} key={route.href} className="w-full">
            <div
              className={`w-full p-2 rounded-md flex items-center justify-center gap-2 font-medium ${
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
