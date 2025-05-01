"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Bookmark, House, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import CSelectHolder from "@/components/holders/CSelectHolder";
import { PREFERENCES, PREFERENCES_WITH_EMOJIS } from "@/constants/common";
import { TGenerateCourseRequest } from "@/types/TGenerateCourseRequest";
import { FC } from "react"
import { toast } from "sonner";

interface ICUserLayoutProps {
    userId?: string;
    children: React.ReactNode
}

const CUserLayout: FC<ICUserLayoutProps> = ({ userId, children }) => {
    const pathname = usePathname();

    const [searchTopic, setSearchTopic] = useState("");
    const [preferences, setPreferences] = useState({
        level: PREFERENCES["LEVEL"][0],
        duration: PREFERENCES["DURATION"][0],
        focus: PREFERENCES["FOCUS"][0],
    });

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

    const handlePreferenceChange = (key: "LEVEL" | "DURATION" | "FOCUS", value: string) => {
        const preferenceValueWithoutEmoji = PREFERENCES[key].find((pref) =>
            value.toLowerCase().includes(pref.toLowerCase())
        ) || PREFERENCES[key][0];
        setPreferences((prev) => ({ ...prev, [key.toLowerCase()]: preferenceValueWithoutEmoji }));
    };

    const handleSearch = async (e: React.FormEvent) => {
        if (searchTopic.trim().length == 0) {
            alert("Please enter a search topic!");
        }

        e.preventDefault();
        if (searchTopic.trim()) {
            try {
                await fetch(`/api/v1/courses/generate`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userId,
                        topic: searchTopic,
                        preferences: preferences
                    } as TGenerateCourseRequest)
                });

                toast.info(`Your course request for the topic '${searchTopic}' has started generating. Once it's generated, you will be able to see the course in 'Your Courses' section.`);

                setSearchTopic("");
                setPreferences({
                    level: PREFERENCES["LEVEL"][0],
                    duration: PREFERENCES["DURATION"][0],
                    focus: PREFERENCES["FOCUS"][0],
                });
            } catch (error) {
                console.error('Failed to generate course:', error);
                toast.error("An error occurred while generating the course. Please try again.");
            }
        }
    };

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
                <form
                    onSubmit={handleSearch}
                    className="flex flex-col gap-4 w-full md:w-[80%] mt-2"
                >
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
                                value={searchTopic}
                                onChange={(e) => setSearchTopic(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="rounded-md min-h-12 min-w-12 bg-background border border-primary/25 text-primary flex items-center justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all"
                            >
                                <ArrowRight />
                            </button>
                        </div>
                    </div>
                    {/* Preferences */}
                    <div className="flex gap-2 justify-items-stretch m-auto overflow-auto pt-2 pb-4 max-w-full no-scrollbar">
                        <CSelectHolder
                            label="Level"
                            placeholder="Select level"
                            values={PREFERENCES_WITH_EMOJIS["LEVEL"]}
                            onValueChange={(value: string) => handlePreferenceChange("LEVEL", value)}
                        />
                        <CSelectHolder
                            label="Duration"
                            placeholder="Select duration"
                            values={PREFERENCES_WITH_EMOJIS["DURATION"]}
                            onValueChange={(value: string) => handlePreferenceChange("DURATION", value)}
                        />
                        <CSelectHolder
                            label="Focus"
                            placeholder="Select focus"
                            values={PREFERENCES_WITH_EMOJIS["FOCUS"]}
                            onValueChange={(value: string) => handlePreferenceChange("FOCUS", value)}
                        />
                    </div>
                </form>
            </div>
            <div className="flex gap-4">
                {/* Sidebar (For size lg and greater) */}
                <div className="hidden lg:block h-fit min-w-72 rounded-xl sticky top-21 mt-1.25 border bg-primary/5 border-primary/25 text-primary overflow-hidden">
                    <div className="flex flex-col gap-2 overflow-auto h-[calc(100dvh-22rem)] max-h-80 p-3">
                        {routes.map((route) => (
                            <Link href={route.href} key={route.href}>
                                <div
                                    className={`w-full p-3 rounded-md flex items-center gap-3 font-medium select-none ${route.active
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
                <div className="w-full flex flex-col gap-8 min-h-[calc(100dvh-32rem)] xl:min-h-[calc(100dvh-22rem)]">
                    {children}
                </div>
            </div>
        </>
    );
}

export default CUserLayout