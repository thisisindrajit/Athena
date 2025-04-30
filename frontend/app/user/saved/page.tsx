import { Metadata } from "next";
import { APP_NAME } from "@/constants/common";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CSaved from "@/components/user/CSaved";

export async function generateMetadata(): Promise<Metadata> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    title: `${session?.user.name}'s saved items - ${APP_NAME}`,
    description: `${session?.user.name}'s saved items on ${APP_NAME}`,
  };
}

const Saved = () => {
  return <CSaved />;
};

export default Saved;
