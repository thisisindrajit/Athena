"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Session, signOut } from "@/lib/client";
import { toast } from "sonner";

interface ICUserMenuProps {
  session?: Session;
}

const CUserMenu: FC<ICUserMenuProps> = ({ session }) => {
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  const router = useRouter();

  const signOutFromAthena = async () => {
    await signOut({
      fetchOptions: {
        onRequest: () => {
          // Show logging out in button
          setIsSigningOut(true);
        },
        onSuccess: () => {
          toast.success("You have been logged out successfully!");
          router.refresh();
          setIsSigningOut(false);
        },
        onError: (error) => {
          console.log("Error during logout:", error);
          toast.error("An error occurred while logging out. Please try again.");
          setIsSigningOut(false);
        },
      },
    });
  };

  return (
    <>
      {isSigningOut && (
        <div className="border border-foreground/50 border-dashed text-sm h-8 rounded-md p-2 flex items-center justify-center">
          Logging out...
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-8 cursor-pointer">
            <AvatarImage src={session?.user?.image ?? undefined} />
            <AvatarFallback>
              {session?.user?.name.substring(0, 1) ?? ":)"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="min-w-56 rounded-lg"
          align="end"
          sideOffset={8}
        >
          <DropdownMenuLabel>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {session?.user?.name ?? "Athena User"}
              </span>
              {session?.user?.email && (
                <span className="truncate text-xs text-muted-foreground">
                  {session.user.email}
                </span>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={signOutFromAthena}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CUserMenu;
