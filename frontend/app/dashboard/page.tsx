"use client";

import CTopBar from "@/components/CTopBar";
import Loader from "@/components/Loader";
import { useSession } from "@/lib/client";

const Dashboard = () => {
  const { data: session, isPending } = useSession();

  return (
    <>
      {/* Top Bar */}
      <CTopBar />
      {isPending ? (
        <Loader loadingText="Loading dashboard" />
      ) : (
        <div className="text-xl font-bold m-auto">
          Welcome {session?.user.name}!
        </div>
      )}
    </>
  );
};

export default Dashboard;
