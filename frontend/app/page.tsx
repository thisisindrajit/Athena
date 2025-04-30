import { APP_DESCRIPTION, APP_NAME } from "@/constants/common";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CHome from "@/components/CHome";

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

  return <CHome />;
};

export default Home;
