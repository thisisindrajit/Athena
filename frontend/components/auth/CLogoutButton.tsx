"use client";

import { Button } from "../ui/button";
import { useState } from "react";
import { signOut } from "@/lib/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CLogoutButton = () => {
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
    <Button
      variant="secondary"
      onClick={isSigningOut ? () => {} : signOutFromAthena}
    >
      {isSigningOut ? "Logging out..." : "Logout"}
    </Button>
  );
};

export default CLogoutButton;
