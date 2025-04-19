import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { APP_NAME } from "@/constants/common";
import SnippetCard from "@/components/SnippetCard";
import { Input } from "@/components/ui/input";
import TitleHolder from "@/components/holders/TitleHolder";
import { Bookmark, House, TrendingUp } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    title: `${session?.user.name}'s Dashboard - ${APP_NAME}`,
    description: `This is the ${APP_NAME} dashboard for ${session?.user.name}`,
  };
}

const Dashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <div className="h-48 md:h-42 w-full bg-dot-black/[0.2] dark:bg-dot-white/[0.2] relative flex items-center justify-center text-xl/snug xs:text-2xl/snug lg:text-3xl/snug font-bold self-center text-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]"></div>
        <div className="flex flex-col md:inline-flex md:flex-row items-center justify-center gap-2 md:gap-3 w-4/5 xl:w-3/5">
          <span className="min-w-fit">I want to know about </span>
          <Input
            type="text"
            placeholder="Type in any TOPIC..."
            className="w-full xsm:w-4/5 md:w-full text-lg lg:text-xl shadow-lg text-primary"
          />
        </div>
      </div>
      {/* User dashboard */}
      <div className="flex gap-4">
        {/* Sidebar (For size lg and greater) */}
        <div className="hidden lg:flex lg:flex-col gap-2 h-[calc(100vh-18rem)] min-w-80 max-h-80 p-3 rounded-xl sticky top-20 mt-1 border bg-primary/5 border-primary/25 text-primary">
          <div className="text-primary-foreground bg-primary w-full p-3 rounded-md flex items-center gap-3 font-medium">
            <House className="h-5 w-5" />
            Home
          </div>
          <div className="text-primary w-full p-3 rounded-md flex items-center gap-3 font-medium hover:bg-primary/10 transition-all cursor-pointer">
            <TrendingUp className="h-5 w-5" />
            Trending
          </div>
          <div className="text-primary w-full p-3 rounded-md flex items-center gap-3 font-medium hover:bg-primary/10 transition-all cursor-pointer">
            <Bookmark className="h-5 w-5" />
            Saved
          </div>
        </div>
        {/* Bottom bar (For size upto lg) */}
        <div className="fixed lg:hidden left-0 bottom-0 p-3 h-12 bg-secondary text-secondary-foreground flex items-center justify-center w-full">
          Bottom bar
        </div>
        {/* Right side */}
        <div className="w-full">
          <div className="flex flex-col gap-4">
            <TitleHolder
              lightText="Welcome"
              boldText={(session?.user.name.split(" ")[0] ?? "User") + " 😄"}
              className="text-lg md:text-2xl"
              lightTextFirst
              makeBoldTextUppercase
            />
            <div className="h-56 flex items-center justify-center m-auto text-muted-foreground text-center leading-relaxed">
              User courses and completed percentage will be shown here.
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <TitleHolder
              lightText="Snippets"
              boldText="for you 🤩"
              lightTextFirst
              makeBoldTextUppercase
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
              <SnippetCard />
              <SnippetCard />
              <SnippetCard />
              <SnippetCard />
              <SnippetCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
