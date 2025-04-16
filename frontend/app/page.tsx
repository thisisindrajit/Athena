"use client";

import CTopBar from "@/components/CTopBar";
import Loader from "@/components/Loader";
import { Separator } from "@/components/ui/separator";
import { useSession } from "@/lib/client";
import { redirect } from "next/navigation";

const Home = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <>
        <CTopBar showOnlyLogo />
        <Loader />
      </>
    );
  }

  /// If user is authenticated, navigate to dashboard page
  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      {/* Top Bar */}
      <CTopBar />
      {/* Motto */}
      <div className="text-2xl/snug xs:text-3xl/snug lg:text-4xl/snug font-bold self-center text-center my-2 sm:my-4 lg:my-6">
        <div className="hidden xs:block sm:hidden">
          <div>Where Knowledge is </div>
          <div className="text-primary">Crafted for you.</div>
        </div>
        <div className="block xs:hidden sm:block">
          Where Knowledge is{" "}
          <span className="text-primary">Crafted for You.</span>
        </div>
      </div>
      {/* Trending snippets */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="text-lg md:text-xl min-w-fit">
            <span className="font-bold uppercase">Trending</span> Snippets
          </div>
          <Separator className="shrink-1 bg-gradient-to-r from-primary to-transparent" />
        </div>
        <div className="h-[100vh] w-full flex items-center justify-center bg-foreground/5">
          Content
        </div>
      </div>
    </>
  );
};

export default Home;
