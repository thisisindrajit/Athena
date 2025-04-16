"use client";

import CThemeToggle from "@/components/CThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CSignInWithGoogleBox from "./auth/CSignInWithGoogleBox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FC, useState } from "react";
import { signOut, useSession } from "@/lib/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

interface ITopBarProps {
  showOnlyLogo?: boolean;
}

const CTopBar: FC<ITopBarProps> = ({ showOnlyLogo = false }) => {
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  const { data: session, isPending } = useSession();
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
        },
      },
    });
  };

  return (
    <div className="flex items-center justify-between">
      <Link href="/">
        <div className="font-medium uppercase underline underline-offset-4">
          Athena
        </div>
      </Link>
      <div className="flex items-center gap-2">
        <CThemeToggle />
        {!showOnlyLogo &&
          !isPending &&
          (session ? (
            <>
              <Avatar className="size-8">
                <AvatarImage src={session.user?.image ?? undefined} />
                <AvatarFallback>
                  {session.user?.name.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                onClick={isSigningOut ? () => {} : signOutFromAthena}
              >
                {isSigningOut ? "Logging out..." : "Logout"}
              </Button>
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="font-semibold">
                  Login
                </Button>
              </DialogTrigger>
              <DialogContent
                className="dark:bg-neutral-900"
                // This is to prevent the dialog from closing when clicking on the toast
                onInteractOutside={(e) => {
                  const { originalEvent } = e.detail;
                  if (
                    originalEvent.target instanceof Element &&
                    originalEvent.target.closest(".group.toast")
                  ) {
                    e.preventDefault();
                  }
                }}
              >
                <div className="flex flex-col items-center gap-4">
                  <DialogHeader>
                    <DialogTitle>Welcome!</DialogTitle>
                    <DialogDescription className="font-medium">
                      Just login with your Google account – quick, simple, and
                      hassle-free ✨
                    </DialogDescription>
                  </DialogHeader>
                  <CSignInWithGoogleBox />
                </div>
              </DialogContent>
            </Dialog>
          ))}
      </div>
    </div>
  );
};

export default CTopBar;
