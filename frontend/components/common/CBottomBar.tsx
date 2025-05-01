"use client"

import { House, TrendingUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const CBottomBar = () => {
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
        // TODO: Uncomment after save logic is developed
        // {
        //     label: "Saved",
        //     icon: Bookmark,
        //     href: "/user/saved",
        //     active: pathname === "/user/saved",
        // },
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    {/* Bottom Bar (For sizes smaller than lg) */ }
    return <>
        {(pathname.includes("/user") || pathname.includes("/course")) && (
            <div className="bottom-bar fixed lg:hidden bottom-0 left-0 right-0 px-4 bg-background flex items-center justify-between gap-2 w-full border-t text-sm text-muted-foreground dark:text-foreground">
                {routes.map((route) => (
                    <Link href={route.href} key={route.href} className="w-full">
                        <div
                            className={`p-3 rounded-md flex items-center justify-center gap-2 font-medium ${route.active
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
        )}
    </>
}

export default CBottomBar;