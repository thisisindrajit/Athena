import CThemeToggle from "@/components/CThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { APP_NAME } from "@/constants/common";
import CLoginButton from "./auth/CLoginButton";
import CLogoutButton from "./auth/CLogoutButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const TopBar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex items-center justify-between sticky top-4 lg:top-6">
      <Link href={session ? "dashboard" : "/"}>
        <div className="font-semibold uppercase underline-offset-4 bg-background/80 backdrop-blur-xl py-1.5 px-3 rounded-lg text-sm border">
          {APP_NAME}
        </div>
      </Link>
      <div className="flex items-center gap-2">
        <CThemeToggle />
        {session ? (
          <>
            <Avatar className="size-8">
              <AvatarImage src={session.user?.image ?? undefined} />
              <AvatarFallback>
                {session.user?.name.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
            <CLogoutButton />
          </>
        ) : (
          <CLoginButton />
        )}
      </div>
    </div>
  );
};

export default TopBar;
