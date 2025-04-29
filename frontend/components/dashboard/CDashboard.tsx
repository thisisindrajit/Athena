"use client";

import SnippetCard from "@/components/common/SnippetCard";
import TitleHolder from "@/components/holders/TitleHolder";
import { useSession } from "@/hooks/auth-hooks";
import Loader from "@/components/common/Loader";
import CourseCard from "../common/CourseCard";

const CDashboard = () => {
  const { data: session, isPending, error } = useSession();

  if (isPending) {
    return <Loader loadingText="Loading dashboard" />;
  }

  if (error) {
    return (
      <div className="m-auto text-destructive">
        Error while loading user session!
      </div>
    );
  }

  return (
    <>
      <div className="text-xl sm:text-2xl font-bold text-primary">
        Welcome {(session?.user.name.split(" ")[0] ?? "User") + " 😄"}
      </div>
      <div className="flex flex-col gap-4">
        <TitleHolder
          lightText="Your"
          boldText="Courses 📚"
          lightTextFirst
          makeBoldTextUppercase
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
          <CourseCard showSaveAndShare />
          <CourseCard showSaveAndShare />
          <CourseCard showSaveAndShare />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <TitleHolder
          boldText="Snippets"
          lightText="for you 🤩"
          makeBoldTextUppercase
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
          <SnippetCard showSaveAndShare />
          <SnippetCard showSaveAndShare />
          <SnippetCard showSaveAndShare />
          <SnippetCard showSaveAndShare />
          <SnippetCard showSaveAndShare />
        </div>
      </div>
    </>
  );
};

export default CDashboard;
