"use client";

import { usePathname } from "next/navigation";
// import { Bookmark, House, TrendingUp } from "lucide-react";
import { useEffect } from "react";
// import Link from "next/link";

const CBottomBar = () => {
  const pathname = usePathname();
  const isUserRoute = pathname.startsWith("/user");
  //   const routes = [
  //     {
  //       label: "Home",
  //       icon: House,
  //       href: "/user/dashboard",
  //       active: pathname === "/user/dashboard",
  //     },
  //     {
  //       label: "Trending",
  //       icon: TrendingUp,
  //       href: "/user/trending",
  //       active: pathname === "/user/trending",
  //     },
  //     {
  //       label: "Saved",
  //       icon: Bookmark,
  //       href: "/user/saved",
  //       active: pathname === "/user/saved",
  //     },
  //   ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  /* Bottom bar (For size upto lg) */
  return isUserRoute ? (
    // <div className="sticky lg:hidden left-0 pt-2 px-4 bg-background flex items-start justify-between gap-2 w-full border-t text-sm text-muted-foreground dark:text-foreground pb-safe bottom-0 h-[calc(4.75rem+env(safe-area-inset-bottom))]">
    //   {routes.map((route) => (
    //     <Link href={route.href} key={route.href} className="w-full">
    //       <div
    //         className={`w-full p-3 rounded-md flex items-center justify-center gap-2 font-medium ${
    //           route.active
    //             ? "text-primary bg-primary/10"
    //             : "transition-all cursor-pointer"
    //         }`}
    //       >
    //         <route.icon className="h-4 w-4" />
    //         <span className="hidden xs:block">{route.label}</span>
    //       </div>
    //     </Link>
    //   ))}
    // </div>
    <div className="dock bg-background">
      <button>
        <svg
          className="size-[1.2em]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
            <polyline
              points="1 11 12 2 23 11"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="2"
            ></polyline>
            <path
              d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7"
              fill="none"
              stroke="currentColor"
              strokeLinecap="square"
              strokeMiterlimit="10"
              strokeWidth="2"
            ></path>
            <line
              x1="12"
              y1="22"
              x2="12"
              y2="18"
              fill="none"
              stroke="currentColor"
              strokeLinecap="square"
              strokeMiterlimit="10"
              strokeWidth="2"
            ></line>
          </g>
        </svg>
        <span className="dock-label">Home</span>
      </button>
      <button>
        <svg
          className="size-[1.2em]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
            <polyline
              points="3 14 9 14 9 17 15 17 15 14 21 14"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="2"
            ></polyline>
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2"
              ry="2"
              fill="none"
              stroke="currentColor"
              strokeLinecap="square"
              strokeMiterlimit="10"
              strokeWidth="2"
            ></rect>
          </g>
        </svg>
        <span className="dock-label">Inbox</span>
      </button>

      <button>
        <svg
          className="size-[1.2em]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
            <circle
              cx="12"
              cy="12"
              r="3"
              fill="none"
              stroke="currentColor"
              strokeLinecap="square"
              strokeMiterlimit="10"
              strokeWidth="2"
            ></circle>
            <path
              d="m22,13.25v-2.5l-2.318-.966c-.167-.581-.395-1.135-.682-1.654l.954-2.318-1.768-1.768-2.318.954c-.518-.287-1.073-.515-1.654-.682l-.966-2.318h-2.5l-.966,2.318c-.581.167-1.135.395-1.654.682l-2.318-.954-1.768,1.768.954,2.318c-.287.518-.515,1.073-.682,1.654l-2.318.966v2.5l2.318.966c.167.581.395,1.135.682,1.654l-.954,2.318,1.768,1.768,2.318-.954c.518.287,1.073.515,1.654.682l.966,2.318h2.5l.966-2.318c.581-.167,1.135-.395,1.654-.682l2.318.954,1.768-1.768-.954-2.318c.287-.518.515-1.073.682-1.654l2.318-.966Z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="square"
              strokeMiterlimit="10"
              strokeWidth="2"
            ></path>
          </g>
        </svg>
        <span className="dock-label">Settings</span>
      </button>
    </div>
  ) : null;
};

export default CBottomBar;
