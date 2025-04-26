"use client";

import { usePathname } from "next/navigation";
import { Bookmark, House, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";

const CBottomBar = () => {
  const pathname = usePathname();
  const isUserRoute = pathname.startsWith("/user");
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

  /* Bottom bar (For size upto lg) */
  return isUserRoute ? (
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
  ) : null;
};

export default CBottomBar;
