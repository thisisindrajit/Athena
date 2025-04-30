"use client";

import TitleHolder from "@/components/holders/TitleHolder";
import { useSession } from "@/hooks/auth-hooks";
import Loader from "@/components/common/Loader";
import Error from "../common/Error";
import CUserCourses from "./CUserCourses";
import CUserModules from "./CUserModules";

const CDashboard = () => {
  const { data: session, isPending, isError, error } = useSession();

  if (isPending) {
    return <Loader loadingText="Loading dashboard" />;
  }

  if (isError) {
    console.log(error);
    return <Error errorText="Error while loading user session!" />;
  }

  return (
    <>
      <div className="text-xl sm:text-2xl font-bold text-primary">
        Welcome {(session?.user.name.split(" ")[0] ?? "User") + "! 😄"}
      </div>
      <div className="flex flex-col gap-4">
        <TitleHolder
          lightText="Your"
          boldText="Courses 📚"
          lightTextFirst
          makeBoldTextUppercase
        />
        {/* TODO: Remove showSave=false after developing save logic */}
        <CUserCourses userId={session.user.id} showSave={false} /> 
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <TitleHolder
          boldText="Modules"
          lightText="for you 🤩"
          makeBoldTextUppercase
        />
        <CUserModules userId={session.user.id} />
      </div>
    </>
  );
};

export default CDashboard;
