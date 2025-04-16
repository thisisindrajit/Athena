import SnippetCard from "@/components/SnippetCard";
import { Separator } from "@/components/ui/separator";
import { APP_DESCRIPTION, APP_NAME } from "@/constants/common";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

const Home = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  /// If user is authenticated, navigate to dashboard page
  if (session) {
    redirect("/user/dashboard");
  }

  return (
    <>
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
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="text-lg md:text-xl min-w-fit">
            <span className="font-bold uppercase">Trending</span> Snippets
          </div>
          <Separator className="shrink-1 bg-gradient-to-r from-primary to-transparent" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <SnippetCard />
          <SnippetCard />
          <SnippetCard />
          <SnippetCard />
          <SnippetCard />
        </div>
      </div>
    </>
  );
};

export default Home;
