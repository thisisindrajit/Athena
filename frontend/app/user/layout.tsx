import CUserLayout from "@/components/user/CUserLayout";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If user is not authenticated, navigate to home page
  if (!session) {
    redirect("/");
  }

  return <CUserLayout userId={session.user.id}>{children}</CUserLayout>
};

export default UserLayout;
