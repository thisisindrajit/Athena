import { APP_DESCRIPTION, APP_NAME } from "@/constants/common";
import SnippetCard from "@/components/common/SnippetCard";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import TitleHolder from "@/components/holders/TitleHolder";
import CourseCard from "@/components/common/CourseCard";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

const Home = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If user is authenticated, navigate to dashboard page
  if (session) {
    redirect("/user/dashboard");
  }

  return (
    <>
      {/* Motto */}
      <div className="h-48 md:h-42 w-full bg-dot-black/[0.2] dark:bg-dot-white/[0.2] relative flex items-center justify-center text-2xl/snug xxs:text-3xl/snug lg:text-4xl/snug font-bold self-center text-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)]"></div>
        <div className="hidden xxs:block md:hidden">
          <div>Where Knowledge is </div>
          <div className="text-primary">Crafted for you.</div>
        </div>
        <div className="block xxs:hidden md:block">
          Where Knowledge is{" "}
          <span className="text-primary">Crafted for You.</span>
        </div>
      </div>
      {/* Trending courses */}
      <div className="flex flex-col gap-4">
        <TitleHolder
          boldText="Trending"
          lightText="Courses 📚"
          makeBoldTextUppercase
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </div>
      {/* Trending snippets */}
      <div className="flex flex-col gap-4">
        <TitleHolder
          boldText="Trending"
          lightText="Snippets 📈"
          makeBoldTextUppercase
        />
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
