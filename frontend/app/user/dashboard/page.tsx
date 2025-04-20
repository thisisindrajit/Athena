import { Metadata } from "next";
import { APP_NAME } from "@/constants/common";
import SnippetCard from "@/components/SnippetCard";
import TitleHolder from "@/components/holders/TitleHolder";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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
      <div className="flex flex-col gap-4">
        <TitleHolder
          lightText="Welcome"
          boldText={(session?.user.name.split(" ")[0] ?? "User") + " 😄"}
          lightTextFirst
          makeBoldTextUppercase
        />
        <div className="h-56 flex items-center justify-center m-auto text-muted-foreground text-center leading-relaxed">
          User courses and completed percentage will be shown here.
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4">
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
    </>
  );
};

export default Dashboard;
