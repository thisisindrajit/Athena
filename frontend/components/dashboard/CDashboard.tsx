"use client";

import SnippetCard from "@/components/common/SnippetCard";
import TitleHolder from "@/components/holders/TitleHolder";
import { useSession } from "@/hooks/auth-hooks";
import Loader from "@/components/common/Loader";

const CDashboard = () => {
  const { data: session, isPending, error } = useSession();

  if (isPending) {
    return (
      <Loader
        loadingText="Loading user details"
        className="h-[calc(100dvh-22rem)] lg:h-auto"
      />
    );
  }

  if (error) {
    return (
      <div className="m-auto text-destructive h-[calc(100dvh-22rem)] lg:h-auto flex items-center justify-center">
        Error while loading user session!
      </div>
    );
  }

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

export default CDashboard;
