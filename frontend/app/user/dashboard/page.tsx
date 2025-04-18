import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { APP_NAME } from "@/constants/common";
import SnippetCard from "@/components/SnippetCard";
import { Input } from "@/components/ui/input";
import TitleHolder from "@/components/holders/TitleHolder";

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
        {/* Sidebar */}
        <div className="hidden lg:flex h-[calc(100vh-16rem)] shadow-xl min-w-80 p-4 rounded-lg sticky top-22 items-center justify-center mt-1 border bg-primary/5 border-primary/25 text-primary">
          This is the sidebar
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
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
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
